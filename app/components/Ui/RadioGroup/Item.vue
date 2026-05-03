<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <UiRadioGroupIndicator :icon="props.icon" />
    </slot>
  </RadioGroupItem>
</template>

<script lang="ts" setup>
  import { RadioGroupItem } from "reka-ui";
  import type { RadioGroupItemProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    RadioGroupItemProps & {
      /** Class to apply to the item. */
      class?: HTMLAttributes["class"];
      /** Icon to show. */
      icon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
