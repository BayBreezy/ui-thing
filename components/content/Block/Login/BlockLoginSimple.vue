<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-[330px] px-5">
      <h1 class="text-3xl font-bold tracking-tight">Log in</h1>
      <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>

      <form @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <div>
            <UiVeeInput label="Email" type="email" name="email" />
          </div>
          <div>
            <UiVeeInput label="Password" type="password" name="password" />
          </div>
          <div>
            <UiButton type="submit" text="Log in" />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (values) => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in.",
    });
  });
</script>
