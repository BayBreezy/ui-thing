<template>
  <UiCard
    class="mx-auto max-w-sm"
    title="Profile"
    description="Update your profile information below"
  >
    <template #content>
      <UiCardContent as="form" class="flex flex-col gap-4" @submit="onSubmit">
        <Field v-slot="{ componentField }" name="fullName">
          <UiFormItem label="Full name" description="This will be displayed to the public">
            <UiInput v-bind="componentField" />
          </UiFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="email">
          <UiFormItem label="Email">
            <UiInput type="email" v-bind="componentField" />
          </UiFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="phone">
          <UiFormItem hint="Optional" label="Phone">
            <UiInput type="tel" v-bind="componentField" />
          </UiFormItem>
        </Field>
        <div>
          <UiButton type="submit">Update profile</UiButton>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        fullName: z
          .string({
            required_error: "Full name is required",
          })
          .min(3, "Full name must be at least 3 characters"),
        email: z
          .string({
            required_error: "Email is required",
          })
          .email("Email must be a valid email"),
        phone: z
          .string()
          .transform((value) => (!value ? null : value))
          .refine((value) => !value || value.length === 10, {
            message: "Phone must be 10 digits",
          })
          .nullish(),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
