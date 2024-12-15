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
                <div class="flex items-center gap-5">
                  <UiAvatar class="size-8" :src="p.avatar" />
                  <div class="text-sm">
                    <p class="font-medium">{{ p.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ p.email }}</p>
                  </div>
                </div>
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
    return Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));
  };

  const { data: people } = await useAsyncData("listOfPeopleObjects", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref(people.value?.[3]);

  const filteredPeople = computed(() => {
    return people.value?.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()));
  });
</script>
