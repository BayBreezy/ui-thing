<template>
  <form class="mx-auto max-w-xs" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeInput label="Email" name="email" type="email" />
      <UiVeePasswordInput label="Password" name="password" placeholder="Enter your password" />
      <UiButton :loading="isSubmitting" type="submit"> Sign in </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const schema = object({
    email: string().required().label("Email").email(),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    await promiseTimeout(2000);
    useSonner.success("Signed in");
  });
</script>
