<template>
  <UICard
    class="mx-auto max-w-sm"
    title="Profile"
    description="Update your profile information below"
  >
    <template #content>
      <UICardContent as="form" @submit="onSubmit" class="flex flex-col gap-4">
        <Field v-slot="{ componentField }" name="fullName">
          <UIFormItem label="Full name" description="This will be displayed to the public">
            <UIInput v-bind="componentField" />
          </UIFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="email">
          <UIFormItem label="Email">
            <UIInput type="email" v-bind="componentField" />
          </UIFormItem>
        </Field>
        <Field v-slot="{ componentField }" name="phone">
          <UIFormItem hint="Optional" label="Phone">
            <UIInput type="tel" v-bind="componentField" />
          </UIFormItem>
        </Field>
        <div>
          <UIButton type="submit">Update profile</UIButton>
        </div>
      </UICardContent>
    </template>
  </UICard>
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
          .transform((value) => (!!!value ? null : value))
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
