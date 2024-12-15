<template>
  <div>
    <UiListbox>
      <UiListboxContent>
        <UiListboxVirtualizer v-slot="{ option }" :options="people">
          <UiListboxItem :value="option">
            <span>{{ option }}</span>
          </UiListboxItem>
        </UiListboxVirtualizer>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const genPeople = async () => {
    return Array.from({ length: 2000 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("virtualListOfStrings", async () => genPeople(), {
    default: () => [],
  });
</script>
