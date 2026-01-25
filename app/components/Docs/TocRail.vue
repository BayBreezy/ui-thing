<template>
  <div ref="wrap" class="relative pl-5">
    <DocsZigZagRail
      v-if="railHeight > 0 && pathD && activeHeight > 0"
      :height="railHeight"
      :active-top="activeTop"
      :active-height="activeHeight"
      :path-d="pathD"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
  const wrap = ref<HTMLElement | null>(null);

  const railHeight = ref(0);
  const activeTop = ref(0);
  const activeHeight = ref(0);
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
      activeTop.value = 0;
      activeHeight.value = 0;
      pathD.value = "";
      return;
    }

    // height covers list
    const last = links[links.length - 1]!;
    railHeight.value = Math.ceil(last.offsetTop + last.offsetHeight);

    // diagonal depth-aware rail
    pathD.value = buildDepthPath(links, railHeight.value);

    // active highlight range (active + children until depth <= activeDepth)
    const activeIndex = links.findIndex((a) => a.getAttribute("data-active") === "true");
    if (activeIndex === -1) {
      activeTop.value = 0;
      activeHeight.value = 0;
      return;
    }

    const startEl = links[activeIndex]!;
    const startDepth = Number(startEl.dataset.depth ?? "0");

    let endEl = startEl;
    for (let i = activeIndex + 1; i < links.length; i++) {
      const d = Number(links[i]!.dataset.depth ?? "0");
      if (d <= startDepth) break;
      endEl = links[i]!;
    }

    const top = startEl.offsetTop;
    const bottom = endEl.offsetTop + endEl.offsetHeight;

    activeTop.value = Math.max(0, top);
    activeHeight.value = Math.max(0, bottom - top);
  };

  function buildDepthPath(els: HTMLElement[], height: number) {
    // anchor transitions at row center for smooth visuals
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

    const DIAG = 8; // diagonal height

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

      // diagonal transition at y:
      // go down to y - DIAG, then diagonal into (xNext, y)
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
