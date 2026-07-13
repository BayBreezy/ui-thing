<template>
  <Primitive
    data-slot="message-group"
    v-bind="forwarded"
    :class="messageGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageGroupStyles = tv({
    base: "flex min-w-0 flex-col gap-2",
  });

  export type MessageGroupProps = PrimitiveProps & {
    /** Additional classes to apply to the group root. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageGroupProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
