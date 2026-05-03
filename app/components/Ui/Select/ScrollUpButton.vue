<template>
  <SelectScrollUpButton
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="select-scroll-up-button"
    v-bind="forwarded"
  >
    <slot>
      <Icon :name="icon || 'lucide:chevron-up'" class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>

<script lang="ts" setup>
  import { SelectScrollUpButton } from "reka-ui";
  import type { SelectScrollUpButtonProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectScrollUpButtonProps & {
      /** Icon to render. */
      icon?: string;
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "icon");
  const styles = tv({
    base: "flex cursor-default items-center justify-center py-1",
  });
</script>
