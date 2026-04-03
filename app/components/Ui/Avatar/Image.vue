<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { AvatarImage, useForwardPropsEmits } from "reka-ui";
  import type { AvatarImageEmits, AvatarImageProps } from "reka-ui";
  import { normalizeClass } from "vue";

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
    base: "aspect-square size-full rounded-full object-cover",
  });
</script>
