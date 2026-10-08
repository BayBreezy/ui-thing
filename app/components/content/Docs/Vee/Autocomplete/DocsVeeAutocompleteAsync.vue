<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeAutocomplete
        name="city"
        label="City"
        placeholder="Start typing a city..."
        hint="Suggestions are loaded from the server as you type."
        :options="results"
        :empty-text="loading ? 'Searching...' : 'No cities found, your text will be used as is'"
        ignore-filter
        required
      >
        <template #icon>
          <Icon
            :name="loading ? 'lucide:loader-circle' : 'lucide:map-pin'"
            :class="['text-muted-foreground/70 mr-2 size-4 shrink-0', loading && 'animate-spin']"
          />
        </template>
      </UiVeeAutocomplete>
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

  const schema = object({ city: string().label("City").required().min(2) });
  const { handleSubmit, values } = useForm({ validationSchema: toTypedSchema(schema) });

  // Simulates an API call. The server does the filtering, hence `ignore-filter` above.
  const search = async (term: string) => {
    await promiseTimeout(600);
    return allCities.filter((c) => c.toLowerCase().includes(term.toLowerCase())).slice(0, 6);
  };

  watchDebounced(
    () => values.city,
    async (term) => {
      if (!term?.trim()) {
        results.value = [];
        return;
      }
      loading.value = true;
      try {
        results.value = await search(term.trim());
      } finally {
        loading.value = false;
      }
    },
    { debounce: 300 }
  );

  const onSubmit = handleSubmit((vals) => {
    useSonner.success("Saved", { description: `City: ${vals.city}` });
  });
</script>
