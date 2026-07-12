<script setup lang="ts">
  const items = [
    "Inbox triage",
    "Design review",
    "API contract",
    "QA pass",
    "Launch notes",
    "Metrics follow-up",
  ];

  const tags = [
    "Design",
    "Engineering",
    "Marketing",
    "Product",
    "Research",
    "Sales",
    "Support",
    "Operations",
  ];
</script>

<template>
  <div class="mx-auto flex max-w-xs min-w-0 flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-t h-36 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-t</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-b h-36 scrollbar-none overflow-y-auto">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-b</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-s scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in tags"
              :key="tag"
              class="bg-muted shrink-0 rounded-xl px-4 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-s</p>
    </div>
    <div class="flex flex-col gap-3">
      <div class="overflow-hidden rounded-2xl border">
        <div class="scroll-fade-e scrollbar-none overflow-x-auto">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in tags"
              :key="tag"
              class="bg-muted shrink-0 rounded-xl px-4 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-e</p>
    </div>
  </div>
</template>
