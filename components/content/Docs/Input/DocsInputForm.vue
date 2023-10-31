<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form @submit="onSubmit" class="w-full space-y-4">
      <Field name="username" v-slot="{ componentField }">
        <UIFormItem label="Username" description="Others will be able to see this">
          <UIInput v-bind="componentField" />
        </UIFormItem>
      </Field>
      <div>
        <UIButton type="submit">Update</UIButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        username: z
          .string({
            required_error: "Username is required",
          })
          .min(3, "Username must be at least 3 characters long")
          .max(20, "Username must be at most 20 characters long"),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
