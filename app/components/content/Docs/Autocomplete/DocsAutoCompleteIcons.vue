<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <Icon name="lucide:map-pin" class="text-muted-foreground mr-2 size-4 shrink-0" />
        <UiAutocompleteInput placeholder="Search for a country" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm">No country found</UiAutocompleteEmpty>
        <UiAutocompleteItem v-for="c in countries" :key="c.name" :value="c.name">
          <div class="flex w-full items-center gap-3">
            <span class="text-base">{{ c.flag }}</span>
            <span>{{ c.name }}</span>
            <span class="text-muted-foreground ml-auto text-xs">{{ c.capital }}</span>
          </div>
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const countries = [
    { name: "Australia", capital: "Canberra", flag: "🇦🇺" },
    { name: "Brazil", capital: "Brasília", flag: "🇧🇷" },
    { name: "Canada", capital: "Ottawa", flag: "🇨🇦" },
    { name: "France", capital: "Paris", flag: "🇫🇷" },
    { name: "Germany", capital: "Berlin", flag: "🇩🇪" },
    { name: "Japan", capital: "Tokyo", flag: "🇯🇵" },
    { name: "Mexico", capital: "Mexico City", flag: "🇲🇽" },
    { name: "Spain", capital: "Madrid", flag: "🇪🇸" },
    { name: "United Kingdom", capital: "London", flag: "🇬🇧" },
    { name: "United States", capital: "Washington, D.C.", flag: "🇺🇸" },
  ];
</script>
