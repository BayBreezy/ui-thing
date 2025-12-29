<template>
  <AvatarRoot
    data-slot="avatar"
    :as="as"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <slot>
      <slot name="image">
        <UiAvatarImage
          v-if="src"
          :src="src"
          :alt="alt"
          :class="imageClass"
          @loading-status-change="emits('loadingStatusChange', $event)"
        />
      </slot>
      <slot name="fallback">
        <UiAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />
      </slot>
    </slot>
  </AvatarRoot>
</template>

<script lang="ts">
  import { AvatarRoot } from "reka-ui";
  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export type AvatarProps = AvatarRootProps &
    Partial<AvatarImageProps> & {
      /**
       * Class to add to the root element
       */
      class?: HTMLAttributes["class"];
      /**
       * Class to pass to the image element
       */
      imageClass?: HTMLAttributes["class"];
      /**
       * Class to pass to the fallback element
       */
      fallbackClass?: HTMLAttributes["class"];
      /**
       * The `alt` attribute value for the image
       */
      alt?: string;
      /**
       * The fallback text to display when the image fails to load
       */
      fallback?: string;
      /**
       * Useful for delaying rendering so it only appears for those with slower connections.
       */
      delayMs?: number;
    };
</script>

<script lang="ts" setup>
  const props = defineProps<AvatarProps>();

  const emits = defineEmits<AvatarImageEmits>();
  const styles = tv({
    base: "relative flex size-8 shrink-0 overflow-hidden rounded-full",
  });
</script>
