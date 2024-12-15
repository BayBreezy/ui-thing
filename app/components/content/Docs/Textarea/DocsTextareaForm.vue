<template>
  <form @submit="onSubmit">
    <Field v-slot="{ componentField }" name="bio">
      <UiFormItem label="Tell us about yourself" description="Feel free to @mention others">
        <UiTextarea v-bind="componentField" />
      </UiFormItem>
    </Field>
    <div class="mt-5">
      <UiButton type="submit">Submit</UiButton>
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
    toast({
      title: "Success!",
      description: h("pre", null, JSON.stringify(values, null, 2)),
      variant: "success",
      duration: 5000,
    });
  });
</script>
