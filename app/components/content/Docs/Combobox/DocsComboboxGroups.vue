<template>
  <div class="mx-auto max-w-sm">
    <UiCombobox v-model="value">
      <UiComboboxAnchor>
        <UiComboboxInput placeholder="Select a timezone" />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No timezone found.
        </UiComboboxEmpty>
        <UiComboboxGroup v-for="group in timezones" :key="group.label">
          <UiComboboxLabel>{{ group.label }}</UiComboboxLabel>
          <UiComboboxItem v-for="tz in group.items" :key="tz" :value="tz">
            {{ tz }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>
  </div>
</template>

<script lang="ts" setup>
  const value = ref<string>();

  const timezones = [
    {
      label: "North America",
      items: [
        "Eastern Standard Time (EST)",
        "Central Standard Time (CST)",
        "Mountain Standard Time (MST)",
        "Pacific Standard Time (PST)",
        "Alaska Standard Time (AKST)",
        "Hawaii Standard Time (HST)",
      ],
    },
    {
      label: "Europe & Africa",
      items: [
        "Greenwich Mean Time (GMT)",
        "Central European Time (CET)",
        "Eastern European Time (EET)",
        "Western European Summer Time (WEST)",
        "Central Africa Time (CAT)",
        "East Africa Time (EAT)",
      ],
    },
    {
      label: "Asia",
      items: [
        "Moscow Time (MSK)",
        "India Standard Time (IST)",
        "China Standard Time (CST)",
        "Japan Standard Time (JST)",
        "Korea Standard Time (KST)",
        "Indonesia Central Standard Time (WITA)",
      ],
    },
    {
      label: "Australia & Pacific",
      items: [
        "Australian Western Standard Time (AWST)",
        "Australian Central Standard Time (ACST)",
        "Australian Eastern Standard Time (AEST)",
        "New Zealand Standard Time (NZST)",
        "Fiji Time (FJT)",
      ],
    },
  ];
</script>
