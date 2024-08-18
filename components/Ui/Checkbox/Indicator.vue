<template>
  <CheckboxIndicator :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>
      <Icon :name="checked == 'indeterminate' ? 'lucide:minus' : icon" class="h-4 w-4" />
    </slot>
  </CheckboxIndicator>
</template>

<script lang="ts" setup>
  import { CheckboxIndicator } from "radix-vue";
  import type { CheckboxIndicatorProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      CheckboxIndicatorProps & {
        /** The state of the checkbox */
        checked?: boolean | "indeterminate";
        /** Custom class(es) to add to the element */
        class?: any;
        /**
         * Icon to display when the checkbox is checked
         * @default lucide:check
         */
        icon?: string;
      }
    >(),
    {
      icon: "lucide:check",
    }
  );
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "flex items-center justify-center text-current",
  });
</script>
