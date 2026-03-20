<template>
  <div ref="wrap" class="relative pl-5">
    <DocsZigZagRail
      v-if="railHeight > 0 && pathD"
      :height="railHeight"
      :path-d="pathD"
      :segments="segments"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  type RailSegment = {
    top: number;
    height: number;
  };

  const wrap = ref<HTMLElement | null>(null);

  const railHeight = ref(0);
  const segments = ref<RailSegment[]>([]);
  const pathD = ref("");

  const WIDTH = 12;
  const X_OUTER = 1;
  const X_INNER_MAX = WIDTH - 1;

  const rafMeasure = () => requestAnimationFrame(measure);

  const measure = () => {
    const el = wrap.value;
    if (!el) return;

    const links = Array.from(el.querySelectorAll<HTMLElement>('[data-toc-link="true"]'));
    if (!links.length) {
      railHeight.value = 0;
      segments.value = [];
      pathD.value = "";
      return;
    }

    const last = links[links.length - 1]!;
    railHeight.value = Math.ceil(last.offsetTop + last.offsetHeight);
    pathD.value = buildDepthPath(links, railHeight.value);
    segments.value = buildSegments(links);
  };

  function buildSegments(links: HTMLElement[]) {
    const nextSegments: RailSegment[] = [];

    let rangeStart = -1;
    let rangeEnd = -1;

    const pushRange = () => {
      if (rangeStart === -1 || rangeEnd === -1) return;

      const startEl = links[rangeStart]!;
      const endEl = links[rangeEnd]!;
      const top = Math.max(0, startEl.offsetTop);
      const bottom = endEl.offsetTop + endEl.offsetHeight;

      nextSegments.push({
        top,
        height: Math.max(0, bottom - top),
      });

      rangeStart = -1;
      rangeEnd = -1;
    };

    links.forEach((link, index) => {
      const isActive = link.getAttribute("data-active") === "true";
      if (!isActive) {
        pushRange();
        return;
      }

      if (rangeStart === -1) {
        rangeStart = index;
      }

      rangeEnd = index;
    });

    pushRange();

    return nextSegments;
  }

  function buildDepthPath(els: HTMLElement[], height: number) {
    const items = els.map((node) => {
      const top = Math.round(node.offsetTop);
      const h = Math.round(node.offsetHeight || 0);
      const y = top + Math.round(h / 2);
      return { y, depth: Number(node.dataset.depth ?? "0") };
    });

    const depths = items.map((i) => i.depth);
    const baseDepth = Math.min(...depths);
    const maxDepth = Math.max(...depths);
    const levels = Math.max(1, maxDepth - baseDepth);

    const indentStep = (X_INNER_MAX - X_OUTER) / levels;

    const xForDepth = (depth: number) => {
      const idx = Math.max(0, depth - baseDepth);
      const x = X_OUTER + idx * indentStep;
      return Math.round(Math.min(X_INNER_MAX, Math.max(X_OUTER, x)));
    };

    const DIAG = 8;

    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

    let x = xForDepth(items[0]?.depth ?? baseDepth);
    let yPrev = 0;

    let d = `M ${x} 0`;

    for (let i = 0; i < items.length; i++) {
      const y = clamp(items[i]!.y, 0, height);
      const xNext = xForDepth(items[i]!.depth);

      if (xNext === x) {
        if (y > yPrev) d += ` L ${x} ${y}`;
        yPrev = Math.max(yPrev, y);
        continue;
      }

      const y0 = clamp(y - DIAG, yPrev, height);

      if (y0 > yPrev) d += ` L ${x} ${y0}`;
      d += ` L ${xNext} ${y}`;

      x = xNext;
      yPrev = y;
    }

    if (height > yPrev) d += ` L ${x} ${height}`;
    return d;
  }

  onMounted(async () => {
    await nextTick();
    measure();
  });

  useMutationObserver(wrap, () => rafMeasure(), {
    subtree: true,
    attributes: true,
    childList: true,
    attributeFilter: ["data-active", "class", "style"],
  });

  useResizeObserver(wrap, () => rafMeasure());
  useEventListener(window, "resize", () => rafMeasure());
</script>
