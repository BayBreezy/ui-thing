<template>
  <CheckboxIndicator
    data-slot="checkbox-indicator"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>
      <Icon
        :name="state == 'indeterminate' ? indeterminateIcon : icon"
        :class="[state == 'indeterminate' ? 'size-3' : 'size-3.5']"
      />
    </slot>
  </CheckboxIndicator>
</template>

<script lang="ts" setup>
  import { CheckboxIndicator } from "reka-ui";
  import type { CheckboxCheckedState, CheckboxIndicatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      CheckboxIndicatorProps & {
        /** The state of the checkbox. */
        modelValue?: CheckboxCheckedState;
        /** The state of the checkbox. */
        state?: CheckboxCheckedState;
        /** Custom class(es) to add to the element. */
        class?: HTMLAttributes["class"];
        /**
         * Icon to display when the checkbox is checked.
         *
         * @default lucide:check
         */
        icon?: string;
        /**
         * Icon to display when the checkbox is in indeterminate state.
         *
         * @default lucide:minus
         */
        indeterminateIcon?: string;
      }
    >(),
    {
      icon: "lucide:check",
      indeterminateIcon: "lucide:minus",
    }
  );
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "group flex items-center justify-center text-current transition-none",
  });
</script>
