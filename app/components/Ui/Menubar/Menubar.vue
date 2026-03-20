<template>
  <MenubarRoot
    data-slot="menubar"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </MenubarRoot>
</template>

<script lang="ts" setup>
  import { MenubarRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarRootEmits, MenubarRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      MenubarRootProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      loop: true,
    }
  );

  const emits = defineEmits<MenubarRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
  });
</script>
