<template>
  <AvatarImage v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { AvatarImage, useForwardPropsEmits } from "radix-vue";
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

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "aspect-square h-full w-full object-cover",
  });
</script>
