<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps">
      <UiCheckboxIndicator v-bind="slotProps" :icon :indeterminate-icon />
    </slot>
  </CheckboxRoot>
</template>

<script lang="ts" setup>
  import { CheckboxRoot, useForwardPropsEmits } from "reka-ui";
  import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    CheckboxRootProps & {
      /** Custom class(es) to add to the element. */
      class?: HTMLAttributes["class"];
      /** ID of the checkbox. */
      id?: string;
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
  >();

  const emit = defineEmits<CheckboxRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emit);

  const styles = tv({
    base: "peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
