<template>
  <UiButton
    data-slot="input-group-button"
    v-bind="forwarded"
    :data-size="size"
    :class="inputGroupButtonVariants({ class: normalizeClass(props.class) || undefined, size })"
  >
    <slot />
  </UiButton>
</template>

<script lang="ts">
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";

  import type { ButtonProps } from "@/components/Ui/Button.vue";

  export const inputGroupButtonVariants = tv({
    base: "flex items-center gap-2 text-sm shadow-none",
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  });

  export type InputGroupAddonVariants = Omit<ButtonProps, "size"> & {
    /**
     * The size of the button within the input group.
     * @default "xs"
     */
    size?: VariantProps<typeof inputGroupButtonVariants>["size"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<InputGroupAddonVariants>(), {
    size: "xs",
    variant: "ghost",
    type: "button",
  });

  const forwarded = reactiveOmit(props, ["size", "class"]);
</script>
