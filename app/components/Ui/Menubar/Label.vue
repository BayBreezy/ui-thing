<template>
  <MenubarLabel
    data-slot="menubar-label"
    :class="styles({ inset, class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </MenubarLabel>
</template>

<script lang="ts" setup>
  import { MenubarLabel } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarLabelProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    MenubarLabelProps & {
      class?: HTMLAttributes["class"];
      inset?: boolean;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "inset");
  const styles = tv({
    base: "px-2 py-1.5 text-sm font-medium data-[inset=true]:pl-8",
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  });
</script>
