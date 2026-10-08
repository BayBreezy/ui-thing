<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete model-value="Vue" disabled>
      <UiAutocompleteAnchor class="has-disabled:cursor-not-allowed has-disabled:opacity-50">
        <UiAutocompleteInput placeholder="Pick a framework" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteItem v-for="f in frameworks" :key="f" :value="f">
          {{ f }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = ["Vue", "React", "Svelte", "Solid", "Angular"];
</script>
