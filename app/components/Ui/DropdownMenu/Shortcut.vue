<template>
  <Primitive
    data-slot="dropdown-menu-shortcut"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        /**
         * The variant of the item.
         *
         * @default "default"
         */
        variant?: "default" | "destructive";
      }
    >(),
    {
      as: "span",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "ml-auto text-xs tracking-widest",
    variants: {
      variant: {
        default: "text-muted-foreground",
        destructive: "text-destructive",
      },
    },
  });
</script>
