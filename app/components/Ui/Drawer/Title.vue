<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="props"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      {{ props.text }}
    </slot>
  </DrawerTitle>
</template>

<script lang="ts" setup>
  import { DrawerTitle } from "vaul-vue";
  import type { DrawerTitleProps } from "vaul-vue";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    DrawerTitleProps & {
      /**
       * Custom class(es) to add to the parent.
       */
      class?: HTMLAttributes["class"];
      /**
       * The text content of the title.
       */
      text?: string;
    }
  >();

  const styles = tv({
    base: "text-lg leading-none font-semibold tracking-tight",
  });
</script>
