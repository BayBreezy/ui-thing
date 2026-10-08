<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="search" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a user..." />
        <Icon
          v-if="loading"
          name="lucide:loader-circle"
          class="text-muted-foreground size-4 shrink-0 animate-spin"
        />
        <Icon v-else name="lucide:search" class="text-muted-foreground size-4 shrink-0" />
      </UiAutocompleteAnchor>

      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          {{ loading ? "Searching..." : "No users found" }}
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup v-if="users.length">
          <UiAutocompleteLabel>Users</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="u in users" :key="u.id" :value="u.name" :disabled="u.disabled">
            <div class="flex items-center gap-3">
              <UiAvatar class="size-7" :src="u.image" />
              <p :class="[u.disabled && 'line-through']">{{ u.name }}</p>
            </div>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { promiseTimeout } from "@vueuse/core";

  type Person = {
    id: number;
    name: string;
    image: string;
    disabled?: boolean;
  };

  const loading = ref(false);
  const search = ref("");
  const users = ref<Person[]>([]);

  // Simulates a request to your API. The server is responsible for filtering the results.
  const fetchUsers = async (term: string): Promise<Person[]> => {
    await promiseTimeout(800);
    return Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: `${term} ${faker.person.lastName()}`,
      image: faker.image.avatar(),
      disabled: i === 3,
    }));
  };

  watchDebounced(
    search,
    async (term) => {
      if (!term.trim()) {
        users.value = [];
        return;
      }
      loading.value = true;
      try {
        users.value = await fetchUsers(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );
</script>
