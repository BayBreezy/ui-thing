<script setup lang="ts">
  const items = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto flex w-full max-w-xs flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-4 h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-4</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade scroll-fade-24 h-48 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-24</p>
    </div>
  </div>
</template>
