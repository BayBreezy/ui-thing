<template>
  <TagGroupItemText
    data-slot="tag-group-item-text"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </TagGroupItemText>
</template>

<script lang="ts" setup>
  import { TagGroupItemText } from "reka-ui";
  import type { TagGroupItemTextProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    TagGroupItemTextProps & {
      /** Custom class(es) to add to the text. */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");
  const styles = tv({ base: "truncate" });
</script>
