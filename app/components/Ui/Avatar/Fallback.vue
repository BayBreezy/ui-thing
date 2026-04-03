<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot>
      {{ fallback }}
    </slot>
  </AvatarFallback>
</template>

<script lang="ts" setup>
  import { AvatarFallback } from "reka-ui";
  import type { AvatarFallbackProps } from "reka-ui";
  import { normalizeClass } from "vue";

  const props = defineProps<
    AvatarFallbackProps & {
      /** The text to display inside the avatar */
      fallback?: string;
      /** Custom class(es) to add to the element */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "fallback");
  const styles = tv({
    base: "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
  });
</script>
