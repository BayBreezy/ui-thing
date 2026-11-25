<template>
  <div class="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
    <UiButton variant="outline" @click="open = true">Open actions</UiButton>
    <UiContextMenu v-model:open="open">
      <UiContextMenuTrigger
        class="grid h-28 w-full place-items-center rounded-md border border-dashed text-sm"
      >
        Right-click for actions
      </UiContextMenuTrigger>
      <UiContextMenuContent>
        <UiContextMenuItem title="Close actions" @select="open = false" />
      </UiContextMenuContent>
    </UiContextMenu>
  </div>
</template>

<script setup lang="ts">
  const open = ref(false);
</script>
