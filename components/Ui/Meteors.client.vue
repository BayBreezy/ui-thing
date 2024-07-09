<template>
  <span v-for="(s, i) in meteorStyles" :key="i" :class="localStyles().wrapper()" :style="s">
    <div :class="localStyles().tail()" />
  </span>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  const props = withDefaults(
    defineProps<{
      number?: number;
      class?: any;
    }>(),
    {
      number: 20,
    }
  );
  const meteorStyles = ref<CSSProperties[]>(
    [...Array.from({ length: props.number })].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }))
  );

  const setStyles = () => {
    const styles = [...new Array(props.number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    meteorStyles.value = styles;
  };

  setStyles();

  watch(() => props.number, setStyles, { immediate: true });

  const localStyles = tv({
    slots: {
      wrapper:
        "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-muted-foreground shadow-[0_0_0_1px_#ffffff10]",
      tail: "pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-muted-foreground to-transparent",
    },
  });
</script>
