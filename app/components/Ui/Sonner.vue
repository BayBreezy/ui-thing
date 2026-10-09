<template>
  <ClientOnly>
    <Toaster
      v-bind="forwarded"
      :class="classes"
      :theme="props.theme ?? ($colorMode.value == 'dark' ? 'dark' : 'light')"
      :style="styles"
      :toast-options="mergedToastOptions"
    />
  </ClientOnly>
</template>

<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { normalizeClass, type HTMLAttributes } from "vue";
  import { Toaster } from "vue-sonner";
  import type { ToasterProps } from "vue-sonner";

  export type SonnerProps = Omit<ToasterProps, "class"> & {
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<SonnerProps>(), {
    visibleToasts: 5,
    closeButton: true,
    duration: 7000,
  });

  const forwarded = reactiveOmit(props, "class", "style", "theme", "toastOptions");

  const classes = computed(() => normalizeClass(["toaster group", props.class]));

  const styles = computed(() => ({
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
    ...(props.style as Record<string, any>),
  }));

  // User supplied options win, `classes` are merged per slot so a single slot can be overridden
  // without losing the rest of the defaults.
  const mergedToastOptions = computed(() => ({
    ...props.toastOptions,
    // Reka sets `pointer-events: none` on <body> while a modal is open, toasts must opt back in.
    class: normalizeClass(["items-start!", "pointer-events-auto!", props.toastOptions?.class]),
    classes: {
      icon: "mt-0.5",
      toast:
        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      description: "group-[.toast]:text-muted-foreground",
      actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      ...props.toastOptions?.classes,
    },
  }));
</script>
