<template>
  <div data-slot="floating-dock-root">
    <div
      data-slot="floating-dock-desktop"
      :class="desktopDockStyles({ class: normalizeClass(props.desktopClass) || undefined })"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <NuxtLink
        v-for="(item, index) in props.items"
        :key="item.title"
        :to="item.href"
        :target="item.target"
        :rel="item.rel"
        class="block"
      >
        <motion.div
          :ref="setDesktopItemRef(index)"
          data-slot="floating-dock-item"
          :animate="getItemAnimate(index)"
          :transition="itemSpringTransition"
          :class="
            hasCustomItemSlot
              ? 'relative flex aspect-square items-center justify-center'
              : 'relative flex aspect-square items-center justify-center rounded-full border border-border/70 bg-background/5 shadow-xs transition-colors duration-300 hover:bg-background/90'
          "
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <AnimatePresence>
            <motion.div
              v-if="hoveredIndex === index"
              data-slot="floating-dock-tooltip"
              :initial="{ opacity: 0, y: 10, x: '-50%' }"
              :animate="{ opacity: 1, y: 0, x: '-50%' }"
              :exit="{ opacity: 0, y: 2, x: '-50%' }"
              :class="
                hasCustomItemSlot
                  ? 'absolute -top-9 left-1/2 z-20 w-fit rounded-full border border-border bg-background px-3 py-1 text-xs whitespace-nowrap text-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-lg'
                  : 'absolute -top-11 left-1/2 z-20 w-fit rounded-full border border-border bg-background px-3 py-1 text-xs whitespace-nowrap text-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-lg'
              "
            >
              {{ item.title }}

              <span
                aria-hidden="true"
                class="absolute top-full left-1/2 h-2 w-4 -translate-x-1/2 -translate-y-px rounded-b-full bg-background"
              />
              <span
                aria-hidden="true"
                class="absolute top-full left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] border-r border-b border-border bg-background"
              />
            </motion.div>
          </AnimatePresence>

          <motion.div
            data-slot="floating-dock-icon"
            :animate="hasCustomItemSlot ? getCustomItemAnimate(index) : getIconAnimate(index)"
            :transition="iconSpringTransition"
            class="flex origin-center items-center justify-center text-foreground"
          >
            <slot name="item" :item="item" :index="index" :is-mobile="false">
              <Icon v-if="item.icon && isIconName(item.icon)" :name="item.icon" class="size-full" />
              <component :is="item.icon" v-else-if="item.icon" class="size-full" />
            </slot>
          </motion.div>

          <motion.div
            v-if="item.active"
            data-slot="floating-dock-active-dot"
            :animate="getDotAnimate(index)"
            :transition="dotSpringTransition"
            class="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary"
          />
        </motion.div>
      </NuxtLink>
    </div>

    <div
      data-slot="floating-dock-mobile"
      :class="mobileDockStyles({ class: normalizeClass(props.mobileClass) || undefined })"
    >
      <AnimatePresence>
        <motion.div
          v-if="open"
          data-slot="floating-dock-mobile-items"
          layout
          class="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
        >
          <motion.div
            v-for="(item, index) in props.items"
            :key="item.title"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: 10, transition: { delay: index * 0.05 } }"
            :transition="{ delay: (props.items.length - 1 - index) * 0.05 }"
          >
            <NuxtLink
              :to="item.href"
              :target="item.target"
              :rel="item.rel"
              :class="
                hasCustomItemSlot
                  ? 'relative flex size-12 items-center justify-center'
                  : 'relative flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-xs'
              "
              @click="open = false"
            >
              <slot name="item" :item="item" :index="index" :is-mobile="true">
                <Icon
                  v-if="item.icon && isIconName(item.icon)"
                  :name="item.icon"
                  class="size-5 text-foreground"
                />
                <component :is="item.icon" v-else-if="item.icon" class="size-5 text-foreground" />
              </slot>

              <span
                v-if="item.active"
                data-slot="floating-dock-active-dot"
                class="absolute bottom-1 left-1/2 z-10 size-1 -translate-x-1/2 rounded-full bg-primary"
              />
            </NuxtLink>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button
        data-slot="floating-dock-mobile-trigger"
        type="button"
        aria-label="Toggle floating dock"
        class="flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/95 shadow-xs"
        @click="open = !open"
      >
        <Icon
          name="lucide:panel-bottom-open"
          class="size-5 text-muted-foreground transition-transform duration-300"
          :class="{ 'rotate-180': open }"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { AnimatePresence, motion } from "motion-v";
  import { normalizeClass } from "vue";
  import type { Component, ComponentPublicInstance, HTMLAttributes } from "vue";

  export type FloatingDockItem = {
    title: string;
    icon?: string | Component;
    href: string;
    active?: boolean;
    target?: string;
    rel?: string;
    [key: string]: unknown;
  };

  export const desktopDockStyles = tv({
    base: "mx-auto hidden h-16 items-end gap-4 rounded-2xl border bg-muted/10 px-4 pb-3 backdrop-blur-lg md:flex",
  });

  export const mobileDockStyles = tv({
    base: "relative block md:hidden",
  });
</script>

<script lang="ts" setup>
  const slots = useSlots();

  defineSlots<{
    item(props: { item: FloatingDockItem; index: number; isMobile: boolean }): unknown;
  }>();

  const props = defineProps<{
    items: FloatingDockItem[];
    desktopClass?: HTMLAttributes["class"];
    mobileClass?: HTMLAttributes["class"];
  }>();

  const open = ref(false);
  const hoveredIndex = ref<number | null>(null);
  const mouseX = ref(Number.POSITIVE_INFINITY);
  const desktopItemRefs = ref<(HTMLElement | undefined)[]>([]);
  const hasCustomItemSlot = computed(() => Boolean(slots.item));

  const itemSpringTransition = {
    type: "spring",
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  } as const;

  const iconSpringTransition = {
    type: "spring",
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  } as const;

  const dotSpringTransition = {
    type: "spring",
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  } as const;

  const isIconName = (icon: FloatingDockItem["icon"]): icon is string => typeof icon === "string";

  const resolveElement = (element: Element | ComponentPublicInstance | null) => {
    if (!element) {
      return undefined;
    }

    if (element instanceof HTMLElement) {
      return element;
    }

    if ("$el" in element && element.$el instanceof HTMLElement) {
      return element.$el;
    }

    return undefined;
  };

  const setDesktopItemRef =
    (index: number) => (element: Element | ComponentPublicInstance | null) => {
      desktopItemRefs.value[index] = resolveElement(element);
    };

  const handleMouseMove = (event: MouseEvent) => {
    mouseX.value = event.clientX;
  };

  const handleMouseLeave = () => {
    mouseX.value = Number.POSITIVE_INFINITY;
    hoveredIndex.value = null;
  };

  const interpolate = (
    value: number,
    input: [number, number, number],
    output: [number, number, number]
  ) => {
    const [inputMin, inputMid, inputMax] = input;
    const [outputMin, outputMid, outputMax] = output;

    if (value <= inputMin) return outputMin;
    if (value >= inputMax) return outputMax;

    if (value <= inputMid) {
      const progress = (value - inputMin) / (inputMid - inputMin);
      return outputMin + (outputMid - outputMin) * progress;
    }

    const progress = (value - inputMid) / (inputMax - inputMid);
    return outputMid + (outputMax - outputMid) * progress;
  };

  const getDistance = (index: number) => {
    const element = desktopItemRefs.value[index];

    if (!element || !Number.isFinite(mouseX.value)) {
      return Number.POSITIVE_INFINITY;
    }

    const bounds = element.getBoundingClientRect();

    return mouseX.value - bounds.x - bounds.width / 2;
  };

  const getItemSize = (index: number) => {
    const distance = getDistance(index);

    if (!Number.isFinite(distance)) {
      return 40;
    }

    return interpolate(distance, [-150, 0, 150], [40, 80, 40]);
  };

  const getIconSize = (index: number) => {
    const distance = getDistance(index);

    if (!Number.isFinite(distance)) {
      return 20;
    }

    return interpolate(distance, [-150, 0, 150], [20, 40, 20]);
  };

  const getDotSize = (index: number) => {
    const distance = getDistance(index);

    if (!Number.isFinite(distance)) {
      return 4;
    }

    return interpolate(distance, [-150, 0, 150], [4, 5.5, 4]);
  };

  const getDotOffset = (index: number) => {
    const distance = getDistance(index);

    if (!Number.isFinite(distance)) {
      return -9;
    }

    return interpolate(distance, [-150, 0, 150], [-9, -11, -9]);
  };

  const getItemAnimate = (index: number) => {
    const size = getItemSize(index);

    return {
      width: size,
      height: size,
    };
  };

  const getIconAnimate = (index: number) => {
    const size = getIconSize(index);

    return {
      width: size,
      height: size,
    };
  };

  const getCustomItemAnimate = (index: number) => {
    const distance = getDistance(index);

    if (!Number.isFinite(distance)) {
      return {
        scale: 1,
      };
    }

    return {
      scale: interpolate(distance, [-150, 0, 150], [1, 1.35, 1]),
    };
  };

  const getDotAnimate = (index: number) => {
    const size = getDotSize(index);

    return {
      width: size,
      height: size,
      bottom: getDotOffset(index),
    };
  };
</script>
