<template>
  <div class="flex flex-col gap-4">
    <UiColorPicker v-model="color" />
    <div class="text-muted-foreground text-sm">
      Selected color: <span class="font-mono font-semibold">{{ color }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const color = ref("#FF5833");
</script>
