<template>
  <UiButton
    variant="outline"
    :class="randomButtonStyles({ class: normalizeClass(props.class) || undefined })"
    @click="shuffle"
  >
    <span class="w-full truncate text-center font-medium">Shuffle</span>
  </UiButton>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const randomButtonStyles = tv({
    base: "hover:bg-muted! touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none pointer-coarse:h-10!",
  });

  export type TypesetRandomButtonProps = {
    /** Additional classes to apply to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetRandomButtonProps>();

  const { shuffle } = useTypesetShuffle();
</script>
