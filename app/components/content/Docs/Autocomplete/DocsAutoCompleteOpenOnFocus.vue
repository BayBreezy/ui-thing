<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="open-on-focus">Open on focus</UiLabel>
      <UiAutocomplete v-model="focusValue" open-on-focus>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="open-on-focus" placeholder="Focus me to see suggestions" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">No matches</UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="l in languages" :key="l" :value="l">
            {{ l }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>

    <div class="space-y-2">
      <UiLabel for="open-on-click">Open on click</UiLabel>
      <UiAutocomplete v-model="clickValue" open-on-click>
        <UiAutocompleteAnchor>
          <UiAutocompleteInput id="open-on-click" placeholder="Click me to see suggestions" />
        </UiAutocompleteAnchor>
        <UiAutocompleteContent>
          <UiAutocompleteEmpty class="p-4 text-center text-sm">No matches</UiAutocompleteEmpty>
          <UiAutocompleteItem v-for="l in languages" :key="l" :value="l">
            {{ l }}
          </UiAutocompleteItem>
        </UiAutocompleteContent>
      </UiAutocomplete>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const focusValue = ref("");
  const clickValue = ref("");

  const languages = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Swift", "Kotlin", "Ruby"];
</script>
