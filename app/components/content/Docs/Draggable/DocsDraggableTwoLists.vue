<template>
  <div class="mx-auto flex max-w-lg items-start gap-6">
    <ui-draggable
      group="two-lists"
      :list="names1"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names1.length === 0 ? 'border-muted rounded-md border-2 border-dashed p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="bg-background cursor-grab rounded-md border p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
    <ui-draggable
      group="two-lists"
      :list="names2"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names2.length === 0 ? 'border-muted rounded-md border-2 border-dashed p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="bg-background cursor-grab rounded-md border p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () => {
    const list1 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    const list2 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    return { list1, list2 };
  });
  const names1 = ref(data.value?.list1 || []);
  const names2 = ref(data.value?.list2 || []);
</script>
