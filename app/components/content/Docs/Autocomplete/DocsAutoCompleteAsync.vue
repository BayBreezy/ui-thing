<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="selectedUser" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput
          v-model="search"
          :display-value="displaySelected"
          placeholder="Search for user..."
        />
        <UiAutocompleteTrigger :disabled="loading">
          <Icon v-if="!loading" name="lucide:chevron-down" class="text-muted-foreground size-4" />
          <Icon
            v-else
            name="lucide:loader-circle"
            class="text-muted-foreground size-4 animate-spin"
          />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          v-if="!users.length"
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          <p v-if="search && loading">Please wait while we get your users</p>
          <p v-else>Please enter the name of a user to start searching</p>
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup v-else>
          <UiAutocompleteLabel>Results</UiAutocompleteLabel>
          <template v-for="(p, i) in users" :key="i">
            <UiAutocompleteItem
              class="mb-1 last:mb-0"
              :disabled="p.disabled"
              :value="p"
              icon="lucide:check"
            >
              <div class="flex items-center gap-3">
                <UiAvatar class="size-7" :src="p.image" />
                <p :class="[p.disabled ? 'line-through' : '']">{{ p.name }}</p>
              </div>
            </UiAutocompleteItem>
          </template>
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
  const search = ref<string>();
  const selectedUser = ref<Person>();
  const users = ref<Person[]>([]);

  const getUsers = async () => {
    // if user list is empty, make API call
    if (users.value.length) return;
    // simulate making an api call
    await promiseTimeout(2000);
    //  create 6 random users. Acts as response from API call
    users.value = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      disabled: faker.datatype.boolean(0.5),
    }));
  };

  watchDebounced(
    search,
    async () => {
      loading.value = true;
      await getUsers();
      loading.value = false;
    },
    { debounce: 300 }
  );

  const displaySelected = (p: Person) => {
    return p?.name;
  };
</script>
