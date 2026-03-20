<template>
  <ToggleRoot
    v-slot="slotProps"
    data-slot="toggle"
    v-bind="forwarded"
    :class="toggleStyles({ variant, size, class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </ToggleRoot>
</template>

<script lang="ts">
  import { Toggle as ToggleRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ToggleEmits, ToggleProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const toggleStyles = tv({
    base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        xs: "h-7 min-w-7 px-2",
        default: "h-9 min-w-9 px-3",
        sm: "h-8 min-w-8 px-2.5",
        lg: "h-10 min-w-10 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  export type ToggleVariants = VariantProps<typeof toggleStyles>;
</script>

<script lang="ts" setup>
  const props = defineProps<
    ToggleProps & {
      /** Additional classes for the toggle */
      class?: HTMLAttributes["class"];
      /** Variant of the toggle */
      variant?: ToggleVariants["variant"];
      /** Size of the toggle */
      size?: ToggleVariants["size"];
    }
  >();

  const emits = defineEmits<ToggleEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emits);
</script>
