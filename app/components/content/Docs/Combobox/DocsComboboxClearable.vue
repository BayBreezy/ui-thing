<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value" reset-model-value-on-clear>
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a country" />
        <UiComboboxCancel
          v-if="value"
          class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiComboboxCancel>
        <UiComboboxTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No country found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem v-for="c in countries" :key="c" :value="c">
            {{ c }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string | null>("Canada");

  const countries = [
    "Australia",
    "Brazil",
    "Canada",
    "France",
    "Germany",
    "Japan",
    "Mexico",
    "Spain",
    "United Kingdom",
    "United States",
  ];
</script>
