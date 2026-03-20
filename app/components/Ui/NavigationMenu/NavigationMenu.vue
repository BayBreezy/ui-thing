<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
    :data-viewport="viewport"
  >
    <slot />
    <slot name="viewport">
      <UiNavigationMenuViewport v-if="viewport" />
    </slot>
  </NavigationMenuRoot>
</template>

<script lang="ts" setup>
  import { NavigationMenuRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      NavigationMenuRootProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        viewport?: boolean;
      }
    >(),
    {
      viewport: true,
    }
  );
  const emits = defineEmits<NavigationMenuRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
  });
</script>
