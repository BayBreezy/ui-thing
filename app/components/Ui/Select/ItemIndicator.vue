<template>
  <SelectItemIndicator
    data-slot="select-item-indicator"
    v-bind="forwarded"
    class="flex items-center justify-center"
  >
    <slot>
      <Icon
        :class="styles({ class: normalizeClass(props.class) || undefined })"
        :name="icon || 'lucide:check'"
      />
    </slot>
  </SelectItemIndicator>
</template>

<script lang="ts" setup>
  import { SelectItemIndicator } from "reka-ui";
  import type { SelectItemIndicatorProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    SelectItemIndicatorProps & {
      /** Icon to render. */
      icon?: string;
      /** Custom class(es) to add to the parent. */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "size-4",
  });
</script>
