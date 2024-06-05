<template>
  <div class="flex w-full justify-center gap-4">
    <UiInput v-model="text" type="number" class="w-20" />
    <UiChip class="bg-sky-500 text-white" size="2xl" :text="text?.toString()">
      <UiButton size="icon" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>

<script lang="ts" setup>
  const text = ref(3);
</script>
