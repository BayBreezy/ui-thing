<template>
  <div class="flex w-full justify-center">
    <form @submit="onSubmit">
      <Field v-slot="{ componentField }" name="type">
        <UiFormItem class="space-y-5">
          <p class="font-medium">What type of notifications should we send?</p>
          <UiRadioGroup v-bind="componentField">
            <UiFormItem
              hide-message
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="All notifications"
            >
              <UiRadioGroupItem value="all" />
            </UiFormItem>
            <UiFormItem
              hide-message
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Only mentions"
            >
              <UiRadioGroupItem value="mentions" />
            </UiFormItem>
            <UiFormItem
              hide-message
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Nothing"
            >
              <UiRadioGroupItem value="none" />
            </UiFormItem>
          </UiRadioGroup>
        </UiFormItem>
      </Field>
      <div class="mt-6">
        <UiButton type="submit">Update settings</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        type: z.enum(["all", "mentions", "none"], {
          required_error: "You need to select a notification type.",
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    toast({
      title: "Settings updated",
      description: h("pre", { class: "p-2" }, JSON.stringify(values, null, 2)),
      variant: "success",
    });
  });
</script>
