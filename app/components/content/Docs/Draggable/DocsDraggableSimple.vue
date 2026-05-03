<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5">
    <div class="grid grid-cols-3 gap-2 md:flex md:items-center">
      <ui-button :disabled="names.length >= 6" size="sm" @click="addName">Add</ui-button>

      <ui-button variant="ghost" size="sm" @click="toggledState = !toggledState">
        {{ toggledState ? "Disable" : "Enable" }}
      </ui-button>
    </div>

    <ui-draggable
      :disabled="!toggledState"
      :list="names"
      item-key="id"
      class="grid grid-cols-1 gap-2"
    >
      <template #item="{ element }">
        <div
          :class="[
            'bg-background flex cursor-grab items-center justify-between gap-3 rounded-md border p-3 shadow-xs',
            toggledState ? '' : 'cursor-not-allowed opacity-50',
          ]"
        >
          <span class="text-sm font-medium">{{ element.name }}</span>
          <ui-button
            v-tippy="'Remove item'"
            :disabled="!toggledState"
            size="icon-sm"
            variant="ghost"
            @click="removeItem(element.id)"
          >
            <icon name="lucide:trash-2" class="text-destructive size-4" />
            <span class="sr-only">Remove item</span>
          </ui-button>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const toggledState = ref(true);

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }))
  );
  const names = ref(data.value || []);
  const addName = () => {
    if (!names.value) names.value = [];
    if (names.value.length >= 6) return;
    names.value?.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    });
  };
  const removeItem = (id: string) => {
    names.value = names.value?.filter((n) => n.id !== id);
  };
</script>
