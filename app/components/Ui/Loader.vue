<template>
  <AnimatePresence>
    <motion.div
      v-if="fullPage && open"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0, scale: 0.95 }"
      :class="loaderStyles().backdrop({ class: backdropClass, fullPage })"
    >
      <Icon :class="loaderStyles().icon({ class: props.class })" :name="props.icon" />
      <slot :open>{{ text }}</slot>
    </motion.div>
    <motion.div
      v-if="!fullPage && open"
      :initial="{ opacity: 0 }"
      :exit="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.5 }"
      :class="loaderStyles().backdrop({ class: props.backdropClass, fullPage })"
    >
      <Icon :class="loaderStyles().icon({ class: props.class })" :name="props.icon" />
      <slot :open>{{ text }}</slot>
    </motion.div>
  </AnimatePresence>
</template>

<script lang="ts">
  import { useMagicKeys } from "@vueuse/core";
  import { AnimatePresence, motion } from "motion-v";
  import { useBodyScrollLock } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { HtmlHTMLAttributes } from "vue";

  export type LoaderProps = PrimitiveProps & {
    /**
     * The icon to display in the loader.
     *
     * @default "svg-spinners:bars-rotate-fade"
     */
    icon?: string;
    /**
     * The class to apply to the loader Icon
     */
    class?: HtmlHTMLAttributes["class"];
    /**
     * The class to apply to the backdrop
     */
    backdropClass?: HtmlHTMLAttributes["class"];
    /**
     * Whether the loader should take up the full page.
     *
     * When this is `true`, the loader will be displayed in a fixed position that covers the entire page. You can press the `esc` key to close the loader.
     */
    fullPage?: boolean;
    /**
     * Whether to lock the scroll when the loader is open.
     *
     * @default true
     */
    lockScroll?: boolean;
    /**
     * The role of the component.
     *
     * @default "progressbar"
     */
    role?: string;
    /**
     * The text to display in the loader.
     *
     * This is displayed below the loader icon.
     */
    text?: string;
    /**
     * Whether to close the loader when the `esc` key is pressed.
     *
     * @default true
     */
    closeOnEscape?: boolean;
  };

  export const loaderStyles = tv({
    slots: {
      icon: "size-5",
      backdrop: "flex flex-col items-center justify-center gap-3",
    },
    variants: {
      fullPage: {
        true: {
          backdrop:
            "pointer-events-auto fixed inset-0 z-999 size-full bg-background/80 backdrop-blur-md",
        },
        false: {
          backdrop: "relative",
        },
      },
    },
  });
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<LoaderProps>(), {
    icon: "svg-spinners:bars-rotate-fade",
    role: "progressbar",
    closeOnEscape: true,
  });

  const open = defineModel<boolean>({ default: true });
  const isLocked = useBodyScrollLock();

  const { escape } = useMagicKeys();

  watchEffect(() => {
    if (props.fullPage && open.value && escape?.value && props.closeOnEscape) {
      open.value = false;
    }
    if (props.lockScroll && !open.value) {
      isLocked.value = false;
    }
    if (props.lockScroll && open.value) {
      isLocked.value = true;
    }
  });
</script>
