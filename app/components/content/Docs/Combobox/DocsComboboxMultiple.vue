<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value" multiple>
      <UiComboboxAnchor as-child>
        <UiTagsInput
          v-model="value"
          delimiter=""
          class="h-auto! min-h-9 w-full gap-1.5 px-3! py-1.5"
        >
          <UiTagsInputItem v-for="item in value" :key="item" :value="item" />
          <UiComboboxInput v-model="searchTerm" as-child>
            <UiTagsInputInput
              placeholder="Select languages..."
              class="min-w-24 flex-1 p-0"
              @keydown.enter.prevent
            />
          </UiComboboxInput>
          <UiComboboxTrigger class="ml-auto">
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiTagsInput>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No language found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="language in languages"
            :key="language"
            :value="language"
            @select="searchTerm = ''"
          >
            {{ language }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ value.length || "none" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Rust",
    "Ruby",
    "PHP",
    "Java",
    "Kotlin",
    "Swift",
    "C#",
    "Elixir",
  ];

  const value = ref<string[]>(["TypeScript", "Rust"]);
  const searchTerm = ref("");
</script>
