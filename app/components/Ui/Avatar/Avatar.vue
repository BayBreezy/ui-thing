<template>
  <AvatarRoot :as="as" :as-child="asChild" :class="styles({ class: props.class })">
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

<script lang="ts" setup>
  import { AvatarRoot } from "radix-vue";
  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      AvatarRootProps &
        Partial<AvatarImageProps> & {
          class?: any;
          imageClass?: any;
          fallbackClass?: any;
          alt?: string;
          fallback?: string;
          delayMs?: number;
        }
    >(),
    {
      class: undefined,
      imageClass: undefined,
      fallbackClass: undefined,
      alt: undefined,
      fallback: undefined,
      delayMs: undefined,
    }
  );

  const emits = defineEmits<AvatarImageEmits>();
  const styles = tv({
    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  });
</script>
