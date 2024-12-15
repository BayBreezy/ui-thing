<template>
  <div>
    <UiListbox v-model="selected">
      <UiListboxFilter v-model="search" placeholder="Search..." />
      <UiListboxContent>
        <UiListboxGroup>
          <template v-if="filteredPeople?.length > 0">
            <UiListboxGroupLabel>People</UiListboxGroupLabel>
            <template v-for="p in filteredPeople" :key="p.id">
              <UiListboxItem :value="p">
                <span>{{ p }}</span>
              </UiListboxItem>
            </template>
          </template>
          <template v-else>
            <div class="flex items-center justify-center py-5 text-sm font-medium">
              <p>No results found</p>
            </div>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const genPeople = async () => {
    return Array.from({ length: 20 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("listOfPeopleBasic", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref(people.value?.[3]);

  const filteredPeople = ref<string[]>([]);
  watchDebounced(
    search,
    (v) => {
      if (!v) {
        filteredPeople.value = useCloned(people).cloned.value;
      }
      filteredPeople.value = people.value.filter((p) => p.toLowerCase().includes(v.toLowerCase()));
    },
    { debounce: 300, maxWait: 2000, immediate: true }
  );
</script>
