<template>
  <ToggleGroupItem v-bind="forwarded" :class="styles({ class: props.class, size, variant })">
    <slot>
      <Icon v-if="icon" class="size-4" :name="icon" />
    </slot>
  </ToggleGroupItem>
</template>

<script lang="ts" setup>
  import { ToggleGroupItem, useForwardProps } from "radix-vue";
  import type { ToggleGroupItemProps } from "radix-vue";

  const props = defineProps<
    ToggleGroupItemProps & {
      /** custom class to add to the toggle */
      class?: any;
      /** icon to display */
      icon?: string;
      /** variant of the toggle */
      variant?: VariantProps<typeof styles>["variant"];
      /** size of the toggle */
      size?: VariantProps<typeof styles>["size"];
    }
  >();

  const forwarded = useForwardProps(reactiveOmit(props, "class"));

  const styles = tv({
    base: "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground sm:text-sm",
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });
</script>
