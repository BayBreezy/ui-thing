<template>
  <Primitive
    data-slot="message-avatar"
    v-bind="forwarded"
    :class="messageAvatarStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageAvatarStyles = tv({
    base: "bg-muted flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full group-has-data-[slot=message-footer]/message:-translate-y-8",
  });

  export type MessageAvatarProps = PrimitiveProps & {
    /** Additional classes to apply to the avatar wrapper. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageAvatarProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
