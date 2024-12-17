<template>
  <div class="flex flex-col items-center gap-20">
    <div ref="trigger">
      <UiButton variant="outline" size="sm">Hover Me</UiButton>
    </div>
    <p ref="target" class="text-sm font-medium">All the magic is here!</p>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const target = ref();
  const trigger = ref();

  useTippy(target, {
    interactive: true,
    triggerTarget: trigger,
    content: "Look at me, I'm a tippy!",
  });
</script>
