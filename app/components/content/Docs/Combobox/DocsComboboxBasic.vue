<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value">
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a fruit" />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No fruit found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem v-for="f in fruits" :key="f" :value="f">
            {{ f }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected: <span class="text-foreground font-medium">{{ value ?? "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string>();

  const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Papaya",
    "Raspberry",
    "Strawberry",
    "Watermelon",
  ];
</script>
