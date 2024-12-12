<template>
  <div class="text-center">
    <UiButton
      class="group rounded-full"
      variant="outline"
      size="icon"
      :aria-expanded="open"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <Icon
        name="lucide:plus"
        class="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
      />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
