<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="space-y-2">
      <UiLabel for="disabled-combobox">Disabled combobox</UiLabel>
      <UiCombobox model-value="Medium" disabled>
        <UiComboboxAnchor class="has-disabled:cursor-not-allowed has-disabled:opacity-50">
          <UiComboboxInput id="disabled-combobox" />
          <UiComboboxTrigger disabled>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
      </UiCombobox>
    </div>

    <div class="space-y-2">
      <UiLabel for="disabled-items">Disabled items</UiLabel>
      <UiCombobox>
        <UiComboboxAnchor>
          <UiComboboxInput id="disabled-items" placeholder="Pick a plan" />
          <UiComboboxTrigger>
            <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </UiComboboxAnchor>
        <UiComboboxContent>
          <UiComboboxItem value="Free">Free</UiComboboxItem>
          <UiComboboxItem value="Pro">Pro</UiComboboxItem>
          <UiComboboxItem value="Team" disabled>Team (coming soon)</UiComboboxItem>
          <UiComboboxItem value="Enterprise" disabled>Enterprise (coming soon)</UiComboboxItem>
        </UiComboboxContent>
      </UiCombobox>
    </div>
  </div>
</template>
