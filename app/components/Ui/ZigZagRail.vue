<template>
  <div
    ref="wrap"
    data-slot="zigzag-rail"
    :class="styles.base({ class: normalizeClass(props.class) || undefined })"
  >
    <div
      v-if="railHeight > 0 && pathD"
      aria-hidden="true"
      data-slot="zigzag-rail-track"
      :class="styles.rail()"
      :style="{ width: `${width}px`, height: `${railHeight}px` }"
    >
      <div :class="styles.track()" :style="trackMaskStyle" />
      <div data-slot="zigzag-rail-active" class="absolute inset-0" :style="segmentMaskStyle">
        <div
          v-for="(segment, index) in segments"
          :key="index"
          :class="styles.segment()"
          :style="{ top: `${segment.top}px`, height: `${segment.height}px` }"
        />
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type ZigZagRailSegment = {
    top: number;
    height: number;
  };

  export const zigZagRailStyles = tv({
    slots: {
      base: "relative ps-7",
      rail: "pointer-events-none absolute inset-s-0 top-0 rtl:-scale-x-100",
      track: "bg-foreground/20 absolute inset-0",
      segment:
        "bg-primary absolute w-full transition-[top,height] duration-200 ease-out motion-reduce:transition-none",
    },
  });
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * CSS selector for the links the rail follows. Each match should set `data-depth` (nesting
       * level) and `data-active="true"` when active, which `UiScrollspy` already does.
       *
       * @default "[data-scrollspy-anchor]"
       */
      selector?: string;
      /** Render the track as a dashed line. */
      dashed?: boolean;
      /** Width of the rail in px. */
      width?: number;
      /** Vertical distance in px over which the line bends between two depths. */
      curveSpan?: number;
      /** Custom class for the wrapper. */
      class?: HTMLAttributes["class"];
    }>(),
    {
      selector: "[data-scrollspy-anchor]",
      dashed: false,
      width: 20,
      curveSpan: 8,
    }
  );

  const styles = zigZagRailStyles();

  const wrap = ref<HTMLElement | null>(null);
  const railHeight = ref(0);
  const segments = ref<ZigZagRailSegment[]>([]);
  const pathD = ref("");

  const X_OUTER = 1;

  type Item = { top: number; height: number; depth: number; active: boolean };

  const rafMeasure = () => requestAnimationFrame(measure);

  function measure() {
    const el = wrap.value;
    if (!el) return;

    const origin = el.getBoundingClientRect().top;
    const items: Item[] = Array.from(el.querySelectorAll<HTMLElement>(props.selector)).map(
      (node) => {
        const rect = node.getBoundingClientRect();
        return {
          top: Math.round(rect.top - origin),
          height: Math.round(rect.height),
          depth: Number(node.dataset.depth ?? "0") || 0,
          active: node.getAttribute("data-active") === "true",
        };
      }
    );

    if (!items.length) {
      railHeight.value = 0;
      segments.value = [];
      pathD.value = "";
      return;
    }

    const last = items[items.length - 1]!;
    railHeight.value = Math.ceil(last.top + last.height);
    pathD.value = buildDepthPath(items, railHeight.value);
    segments.value = buildSegments(items);
  }

  function buildSegments(items: Item[]) {
    const next: ZigZagRailSegment[] = [];
    let start = -1;
    let end = -1;

    const flush = () => {
      if (start === -1) return;
      const top = Math.max(0, items[start]!.top);
      const bottom = items[end]!.top + items[end]!.height;
      next.push({ top, height: Math.max(0, bottom - top) });
      start = -1;
      end = -1;
    };

    items.forEach((item, index) => {
      if (!item.active) return flush();
      if (start === -1) start = index;
      end = index;
    });
    flush();

    return next;
  }

  function buildDepthPath(items: Item[], height: number) {
    const xInnerMax = props.width - 1;
    const depths = items.map((i) => i.depth);
    const baseDepth = Math.min(...depths);
    const levels = Math.max(1, Math.max(...depths) - baseDepth);
    const indentStep = (xInnerMax - X_OUTER) / levels;

    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
    const xForDepth = (depth: number) =>
      Math.round(clamp(X_OUTER + Math.max(0, depth - baseDepth) * indentStep, X_OUTER, xInnerMax));

    let x = xForDepth(items[0]!.depth);
    let yPrev = 0;
    let d = `M ${x} 0`;

    for (const item of items) {
      const y = clamp(item.top + Math.round(item.height / 2), 0, height);
      const xNext = xForDepth(item.depth);

      if (xNext === x) {
        if (y > yPrev) d += ` L ${x} ${y}`;
        yPrev = Math.max(yPrev, y);
        continue;
      }

      const y0 = clamp(y - props.curveSpan, yPrev, height);
      const midY = (y0 + y) / 2;
      if (y0 > yPrev) d += ` L ${x} ${y0}`;
      d += ` C ${x} ${midY} ${xNext} ${midY} ${xNext} ${y}`;

      x = xNext;
      yPrev = y;
    }

    if (height > yPrev) d += ` L ${x} ${height}`;
    return d;
  }

  function buildMaskUrl(dashed: boolean) {
    const h = Math.max(1, Math.round(railHeight.value));
    const dashAttr = dashed ? ` stroke-dasharray="3 3"` : "";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${props.width} ${h}"><path d="${pathD.value}" stroke="black" stroke-width="1" fill="none"${dashAttr}/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  function maskStyle(dashed: boolean) {
    const image = buildMaskUrl(dashed);
    return {
      WebkitMaskImage: image,
      maskImage: image,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%",
    };
  }

  const trackMaskStyle = computed(() => maskStyle(props.dashed));
  const segmentMaskStyle = computed(() => maskStyle(false));

  onMounted(async () => {
    await nextTick();
    measure();
  });

  watch(() => [props.selector, props.width, props.curveSpan], rafMeasure);

  useMutationObserver(wrap, rafMeasure, {
    subtree: true,
    attributes: true,
    childList: true,
    attributeFilter: ["data-active", "data-depth", "class", "style"],
  });
  useResizeObserver(wrap, rafMeasure);
  useEventListener(window, "resize", rafMeasure);

  defineExpose({ measure });
</script>
