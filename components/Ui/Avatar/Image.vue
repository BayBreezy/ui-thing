<template>
  <AvatarImage v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { AvatarImage } from "radix-vue";
  import type { AvatarImageEmits, AvatarImageProps } from "radix-vue";

  const props = defineProps<
    AvatarImageProps & {
      /** The alt text for the image */
      alt?: string;
      /** Custom class(es) to add to the element */
      class?: any;
    }
  >();
  const emits = defineEmits<AvatarImageEmits>();

  const styles = tv({
    base: "aspect-square h-full w-full object-cover",
  });
</script>
