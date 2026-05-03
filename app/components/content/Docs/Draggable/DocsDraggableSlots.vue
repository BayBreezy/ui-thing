<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5">
    <ui-draggable :list="names" item-key="id" class="grid grid-cols-1 gap-2">
      <template #header>
        <div class="py-4">
          <p class="text-muted-foreground mb-3 text-sm">Drag and drop to reorder items</p>
          <ui-gradient-divider />
        </div>
      </template>
      <template #footer>
        <div class="py-4">
          <ui-gradient-divider />
          <p class="text-muted-foreground mt-3 text-sm">Drag and drop to reorder items</p>
        </div>
      </template>
      <template #item="{ element }">
        <div
          :class="[
            'bg-background flex cursor-grab items-center justify-between gap-3 rounded-md border p-3 shadow-xs',
          ]"
        >
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }))
  );
  const names = ref(data.value || []);
</script>
