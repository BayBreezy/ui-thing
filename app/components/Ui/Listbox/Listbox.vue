<template>
  <ListboxRoot
    v-slot="{ modelValue }"
    data-slot="listbox"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :model-value="modelValue" />
  </ListboxRoot>
</template>

<script lang="ts" setup>
  import { ListboxRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxRootEmits, ListboxRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<ListboxRootProps & { class?: HTMLAttributes["class"] }>();
  const emits = defineEmits<ListboxRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "relative flex flex-col gap-4",
  });
</script>
