<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- The `search` event fires as the user types. The server filters, hence `ignore-filter`. -->
      <UiVeeCombobox
        name="city"
        label="City"
        placeholder="Search for a city..."
        hint="Options are loaded from the server as you type."
        :options="results"
        :empty-text="loading ? 'Searching...' : 'No cities found'"
        ignore-filter
        required
        @search="search = $event"
      >
        <template #icon>
          <Icon
            :name="loading ? 'lucide:loader-circle' : 'lucide:map-pin'"
            :class="['text-muted-foreground/70 mr-2 size-4 shrink-0', loading && 'animate-spin']"
          />
        </template>
      </UiVeeCombobox>
      <UiButton type="submit">Continue</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const allCities = [
    "Amsterdam",
    "Athens",
    "Austin",
    "Barcelona",
    "Berlin",
    "Boston",
    "Brussels",
    "Chicago",
    "Copenhagen",
    "Dublin",
    "Lisbon",
    "London",
    "Los Angeles",
    "Madrid",
    "Paris",
    "Prague",
    "Rome",
    "San Francisco",
    "Vienna",
  ];

  const results = ref<string[]>([]);
  const loading = ref(false);
  const search = ref("");

  const schema = object({ city: string().label("City").required("Please select a city") });
  const { handleSubmit } = useForm({ validationSchema: toTypedSchema(schema) });

  // Simulates an API call
  const fetchCities = async (term: string) => {
    await promiseTimeout(600);
    return allCities.filter((c) => c.toLowerCase().includes(term.toLowerCase())).slice(0, 6);
  };

  watchDebounced(
    search,
    async (term) => {
      if (!term.trim()) {
        results.value = [];
        return;
      }
      loading.value = true;
      try {
        results.value = await fetchCities(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `City: ${values.city}` });
  });
</script>
