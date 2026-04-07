<template>
  <Primitive
    data-slot="command-footer"
    :as
    :as-child
    :class="styles({ class: normalizeClass(props.class) })"
  >
    <slot>
      <slot name="navigate">
        <div class="flex items-center gap-1">
          <UiKbd variant="outline">↑</UiKbd>
          <UiKbd variant="outline">↓</UiKbd>
          <span class="text-xs">to navigate</span>
        </div>
      </slot>
      <slot name="escape">
        <div class="flex items-center gap-1">
          <UiKbd variant="outline">esc</UiKbd>
          <span class="text-xs">to close</span>
        </div>
      </slot>
    </slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive, type PrimitiveProps } from "reka-ui";
  import { normalizeClass, type HTMLAttributes } from "vue";
  export type CommandFooterProps = PrimitiveProps & {
    /** Custom class(es) to add to the element */
    class?: HTMLAttributes["class"];
  };
  const styles = tv({
    base: "z-5 flex items-center gap-2 border-t bg-input/30 p-2 px-3 text-sm",
  });
</script>

<script lang="ts" setup>
  const props = defineProps<CommandFooterProps>();
</script>
