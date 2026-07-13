<template>
  <UiButton
    data-slot="attachment-action"
    :variant="variant"
    :size="size"
    :class="normalizeClass(props.class) || undefined"
  >
    <slot />
  </UiButton>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { buttonStyles } from "~/components/Ui/Button.vue";

  const props = withDefaults(
    defineProps<{
      /**
       * The button variant.
       *
       * @default "ghost"
       */
      variant?: VariantProps<typeof buttonStyles>["variant"];
      /**
       * The button size.
       *
       * @default "icon-xs"
       */
      size?: VariantProps<typeof buttonStyles>["size"];
      /** Additional classes to apply to the action. */
      class?: HTMLAttributes["class"];
    }>(),
    {
      variant: "ghost",
      size: "icon-xs",
    }
  );
</script>
