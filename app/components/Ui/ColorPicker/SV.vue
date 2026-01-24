<template>
  <div
    ref="svBoxRef"
    data-slot="color-picker-sv"
    class="relative h-40 w-60 cursor-crosshair touch-none overflow-hidden rounded-md select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    tabindex="0"
    :style="{ backgroundColor: `hsl(${ctx.hue.value}, 100%, 50%)` }"
    @pointerdown="onPointerDown"
    @keydown="onKeydown"
  >
    <div class="absolute inset-0 rounded-md bg-linear-to-r from-white to-transparent"></div>
    <div class="absolute inset-0 rounded-md bg-linear-to-t from-black to-transparent"></div>

    <div
      class="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white shadow-lg ring-1 ring-black/20"
      :style="{
        left: `${thumbPx.x}px`,
        top: `${thumbPx.y}px`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: ctx.currentColor.value.toHex(),
      }"
    />
  </div>
</template>

<script lang="ts" setup>
  const ctx = inject(COLOR_PICKER_CTX);
  if (!ctx) throw new Error("UiColorPickerSV must be used inside UiColorPickerRoot");

  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

  const svBoxRef = ref<HTMLElement | null>(null);
  const { left, top, width, height } = useElementBounding(svBoxRef);

  const THUMB_R = 8;

  const thumbPx = computed(() => {
    const w = width.value || 0;
    const h = height.value || 0;

    const x = (clamp(ctx.saturation.value, 0, 100) / 100) * w;
    const y = (1 - clamp(ctx.value.value, 0, 100) / 100) * h;

    return {
      x: clamp(x, THUMB_R, Math.max(THUMB_R, w - THUMB_R)),
      y: clamp(y, THUMB_R, Math.max(THUMB_R, h - THUMB_R)),
    };
  });

  const dragging = ref(false);
  const activePointerId = ref<number | null>(null);

  const updateFromPointer = (e: PointerEvent) => {
    const w = width.value || 0;
    const h = height.value || 0;
    if (!w || !h) return;

    const x = clamp(e.clientX - left.value, 0, w);
    const y = clamp(e.clientY - top.value, 0, h);

    const s01 = x / w;
    const v01 = 1 - y / h;

    ctx.setSV01(s01, v01);
  };

  const onPointerDown = (e: PointerEvent) => {
    dragging.value = true;
    activePointerId.value = e.pointerId;
    (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
    updateFromPointer(e);
  };

  useEventListener(window, "pointermove", (e: PointerEvent) => {
    if (!dragging.value) return;
    if (activePointerId.value != null && e.pointerId !== activePointerId.value) return;
    updateFromPointer(e);
  });

  useEventListener(window, "pointerup", (e: PointerEvent) => {
    if (activePointerId.value != null && e.pointerId !== activePointerId.value) return;
    dragging.value = false;
    activePointerId.value = null;
  });

  // Keyboard support
  const onKeydown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 5 : 1;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ctx.stepSV(-step, 0);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      ctx.stepSV(step, 0);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      ctx.stepSV(0, step);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      ctx.stepSV(0, -step);
    }
  };
</script>
