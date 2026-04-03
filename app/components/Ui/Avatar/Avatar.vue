<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
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
  import { normalizeClass } from "vue";

  export type AvatarProps = AvatarRootProps &
    Partial<AvatarImageProps> & {
      /**
       * Class to add to the root element
       */
      class?: any;
      /**
       * Class to pass to the image element
       */
      imageClass?: any;
      /**
       * Class to pass to the fallback element
       */
      fallbackClass?: any;
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
      /**
       * The size of the avatar
       *
       * @default "default"
       */
      size?: "default" | "sm" | "lg";
    };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<AvatarProps>(), {
    size: "default",
  });

  const emits = defineEmits<AvatarImageEmits>();
  const styles = tv({
    base: "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
  });
</script>
