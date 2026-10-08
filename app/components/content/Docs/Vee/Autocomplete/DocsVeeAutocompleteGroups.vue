<template>
  <form class="mx-auto max-w-sm space-y-5" @submit="onSubmit">
    <!-- Options with the same `group` are rendered together under a label. -->
    <UiVeeAutocomplete
      name="timezone"
      label="Time zone"
      placeholder="Search time zones..."
      :options="timezones"
      empty-text="No time zone found"
      open-on-focus
      required
    />
    <UiButton type="submit">Save</UiButton>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const timezones = [
    { value: "UTC", group: "Universal" },
    { value: "GMT", group: "Universal" },
    { value: "America/New_York", group: "Americas" },
    { value: "America/Chicago", group: "Americas" },
    { value: "America/Los_Angeles", group: "Americas" },
    { value: "America/Sao_Paulo", group: "Americas" },
    { value: "Europe/London", group: "Europe" },
    { value: "Europe/Paris", group: "Europe" },
    { value: "Europe/Berlin", group: "Europe" },
    { value: "Europe/Moscow", group: "Europe", disabled: true },
    { value: "Asia/Tokyo", group: "Asia" },
    { value: "Asia/Singapore", group: "Asia" },
    { value: "Asia/Kolkata", group: "Asia" },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(object({ timezone: string().label("Time zone").required() })),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", { description: `Time zone: ${values.timezone}` });
  });
</script>
