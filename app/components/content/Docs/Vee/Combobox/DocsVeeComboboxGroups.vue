<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- Options with the same `group` are rendered together under a label -->
      <UiVeeCombobox
        name="timezone"
        label="Timezone"
        placeholder="Select a timezone"
        :options="timezones"
        empty-text="No timezone found"
        show-trigger
      />
      <UiButton type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const timezones = [
    { value: "EST", label: "Eastern Standard Time (EST)", group: "North America" },
    { value: "CST", label: "Central Standard Time (CST)", group: "North America" },
    { value: "PST", label: "Pacific Standard Time (PST)", group: "North America" },
    { value: "GMT", label: "Greenwich Mean Time (GMT)", group: "Europe & Africa" },
    { value: "CET", label: "Central European Time (CET)", group: "Europe & Africa" },
    { value: "EAT", label: "East Africa Time (EAT)", group: "Europe & Africa" },
    { value: "IST", label: "India Standard Time (IST)", group: "Asia" },
    { value: "JST", label: "Japan Standard Time (JST)", group: "Asia" },
    { value: "AEST", label: "Australian Eastern Standard Time (AEST)", group: "Australia" },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ timezone: string().label("Timezone").required("Please select a timezone") })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `Timezone: ${values.timezone}` });
  });
</script>
