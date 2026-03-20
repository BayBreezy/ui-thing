<template>
  <ListboxItemIndicator data-slot="listbox-indicator" v-bind="forwarded">
    <slot>
      <Icon
        :class="styles({ class: normalizeClass(props.class) || undefined })"
        :name="icon || 'lucide:check'"
      />
    </slot>
  </ListboxItemIndicator>
</template>

<script lang="ts" setup>
  import { ListboxItemIndicator, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxItemIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    ListboxItemIndicatorProps & { class?: HTMLAttributes["class"]; icon?: string }
  >();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"));

  const styles = tv({
    base: "size-4 shrink-0 text-primary",
  });
</script>
