<template>
  <div class="text-center">
    <div class="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
      <UiButton
        class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Upvote"
        @click="increment"
      >
        <Icon name="lucide:chevron-up" class="size-4" :aria-hidden="true" />
      </UiButton>
      <span class="flex items-center border border-input px-3 text-sm font-medium">{{
        counter
      }}</span>
      <UiButton
        class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        variant="outline"
        size="icon"
        aria-label="Downvote"
        @click="decrement"
      >
        <Icon name="lucide:chevron-down" class="size-4" :aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const counter = ref(256);
  const increment = () => counter.value++;
  const decrement = () => counter.value--;
</script>
