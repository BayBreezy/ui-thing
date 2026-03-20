<template>
  <ListboxContent
    data-slot="listbox-content"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ListboxContent>
</template>

<script lang="ts" setup>
  import { ListboxContent, useForwardProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ListboxContentProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>();
  const forwarded = useForwardProps(reactiveOmit(props));

  const styles = tv({
    base: "max-h-[300px] w-full overflow-y-auto rounded-md border bg-popover px-3 py-1.5",
  });
</script>
