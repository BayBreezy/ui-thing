<template>
  <form @submit="onSubmit">
    <Field name="bio" v-slot="{ componentField }">
      <UIFormItem label="Tell us about yourself" description="Feel free to @mention others">
        <UITextarea v-bind="componentField" />
      </UIFormItem>
    </Field>
    <div class="mt-5">
      <UIButton type="submit">Submit</UIButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        bio: z
          .string({
            required_error: "Please tell us about yourself",
          })
          .min(10, "At least 10 characters please")
          .max(1000),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
