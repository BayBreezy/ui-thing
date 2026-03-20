<template>
  <div class="flex justify-center">
    <form class="w-full max-w-lg space-y-4" @submit="onSubmit">
      <div class="rounded-xl border bg-card p-5 shadow-sm">
        <UiVeeSwitch
          name="airplaneMode"
          label="Airplane mode"
          hint="Disable wireless connections while still allowing access to offline content."
          class="justify-between"
        >
          <template #label="{ errorMessage }">
            <div class="grid gap-1 pr-4">
              <UiLabel :class="[errorMessage && 'text-destructive']">Airplane mode</UiLabel>
              <p class="text-sm text-muted-foreground">
                Disable wireless connections while still allowing access to offline content.
              </p>
            </div>
          </template>
          <template #hint />
        </UiVeeSwitch>
      </div>
      <UiButton type="submit">Update settings</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        airplaneMode: boolean().label("Airplane mode"),
      })
    ),
    initialValues: {
      airplaneMode: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Settings saved", {
      description: `Airplane mode is ${values.airplaneMode ? "on" : "off"}.`,
    });
  });
</script>
