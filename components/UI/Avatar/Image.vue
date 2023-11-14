<template>
  <AvatarImage v-bind="props" :class="styles({ class: props.class })" :alt="alt" />
</template>

<script lang="ts" setup>
  import { AvatarImage } from "radix-vue";
  import type { AvatarImageEmits, AvatarImageProps } from "radix-vue";

  const props = defineProps<
    AvatarImageProps & {
      alt?: string;
      class?: any;
    }
  >();
  const emits = defineEmits<AvatarImageEmits>();

  const styles = tv({
    base: "aspect-square h-full w-full object-cover",
  });
</script>
