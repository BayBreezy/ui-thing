<template>
  <MenubarItemIndicator
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" class="size-4" />
    </slot>
  </MenubarItemIndicator>
</template>

<script lang="ts" setup>
  import { MenubarItemIndicator } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarItemIndicatorProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarItemIndicatorProps & {
      /** The icon to display */
      icon?: string;
      /** The class(es) to apply to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");
  const styles = tv({
    base: "flex shrink-0 items-center justify-center",
  });
</script>
