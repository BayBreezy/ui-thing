<template>
  <Primitive
    data-slot="message-footer"
    v-bind="forwarded"
    :class="messageFooterStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const messageFooterStyles = tv({
    base: "text-muted-foreground flex max-w-full min-w-0 items-center px-3 text-xs font-medium group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
  });

  export type MessageFooterProps = PrimitiveProps & {
    /** Additional classes to apply to the footer. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageFooterProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
