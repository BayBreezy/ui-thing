<template>
  <span
    v-for="(s, i) in meteorStyles"
    :key="i"
    :class="localStyles().wrapper({ class: normalizeClass(props.class) || undefined })"
    :style="s"
  >
    <div :class="localStyles().tail()" />
  </span>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { CSSProperties, HTMLAttributes } from "vue";

  interface MeteorsProps {
    number?: number;
    minDelay?: number;
    maxDelay?: number;
    minDuration?: number;
    maxDuration?: number;
    angle?: number;
    class?: HTMLAttributes["class"];
  }

  const props = withDefaults(defineProps<MeteorsProps>(), {
    number: 20,
    minDelay: 0.2,
    maxDelay: 1.2,
    minDuration: 2,
    maxDuration: 10,
    angle: 215,
  });

  const meteorStyles = ref<CSSProperties[]>(
    [...Array.from({ length: props.number })].map(() => ({
      "--angle": -props.angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (props.maxDelay - props.minDelay) + props.minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (props.maxDuration - props.minDuration) + props.minDuration) +
        "s",
    }))
  );

  const setStyles = () => {
    const styles = [...new Array(props.number)].map(() => ({
      "--angle": -props.angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (props.maxDelay - props.minDelay) + props.minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (props.maxDuration - props.minDuration) + props.minDuration) +
        "s",
    }));
    meteorStyles.value = styles;
  };

  setStyles();

  watch(
    () => [
      props.number,
      props.minDelay,
      props.maxDelay,
      props.minDuration,
      props.maxDuration,
      props.angle,
    ],
    setStyles
  );

  const localStyles = tv({
    slots: {
      wrapper:
        "pointer-events-none absolute size-0.5 rotate-(--angle) animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
      tail: "pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent",
    },
  });
</script>
