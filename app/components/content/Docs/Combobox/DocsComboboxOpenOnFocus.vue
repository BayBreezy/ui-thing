<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="open-on-focus">Open on focus</UiLabel>
      <UiCombobox v-model="focusValue" open-on-focus>
        <UiComboboxAnchor>
          <UiComboboxInput id="open-on-focus" placeholder="Focus me to see the options" />
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No matches</UiComboboxEmpty>
          <UiComboboxItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>

    <div class="space-y-2">
      <UiLabel for="open-on-click">Open on click</UiLabel>
      <UiCombobox v-model="clickValue" open-on-click>
        <UiComboboxAnchor>
          <UiComboboxInput id="open-on-click" placeholder="Click me to see the options" />
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxEmpty class="p-4 text-center text-sm">No matches</UiComboboxEmpty>
          <UiComboboxItem v-for="s in sizes" :key="s" :value="s">{{ s }}</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["Extra small", "Small", "Medium", "Large", "Extra large"];

  const focusValue = ref<string>();
  const clickValue = ref<string>();
</script>
