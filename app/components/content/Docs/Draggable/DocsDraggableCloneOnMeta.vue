<template>
  <div class="mx-auto flex max-w-lg flex-col gap-6">
    <div class="text-sm font-medium">
      <p v-if="meta" class="text-emerald-500">Items will be cloned</p>
      <p v-else class="text-muted-foreground">Items will be moved</p>
    </div>
    <div class="flex items-start gap-6">
      <ui-draggable
        :group="{
          name: groupeName,
          pull: customCloneFn(),
        }"
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
        :group="groupeName"
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
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const groupeName = "clone-on-control-lists";

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

  const { meta } = useMagicKeys();
  const customCloneFn = () => {
    return meta?.value ? "clone" : true;
  };
</script>
