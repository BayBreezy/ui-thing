<template>
  <UiCard
    as="form"
    title="Create an account"
    description="Enter your email below to create your account"
    @submit="submitCard"
  >
    <template #content>
      <UiCardContent class="grid gap-4">
        <!-- Social Login buttons -->
        <div class="grid grid-cols-2 gap-4">
          <UiButton variant="outline" class="w-full"
            ><Icon class="size-4" name="logos:github-icon" /> Github</UiButton
          >
          <UiButton variant="outline" class="w-full"
            ><Icon class="size-4" name="logos:google-icon" /> Google</UiButton
          >
        </div>
        <!-- Separator -->
        <UiDivider>
          <span class="text-muted-foreground text-xs uppercase">or continue with</span>
        </UiDivider>
        <!-- Form -->
        <UiVeeInput
          placeholder="example@uithing.com"
          type="email"
          label="Email"
          name="email"
          hint="Enter your email"
        />
        <UiVeeInput
          placeholder="••••••••"
          label="Password"
          name="password"
          type="password"
          hint="8 characters or more"
        />
      </UiCardContent>
    </template>
    <template #footer>
      <UiCardFooter>
        <UiButton type="submit" class="w-full">Create account</UiButton>
      </UiCardFooter>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const CardSchema = object({
    email: string().label("Email").required().email(),
    password: string()
      .required()
      .label("Password")
      .min(8)
      .max(50)
      .test({
        message: "Add at least one uppercase & lowercase letter",
        test: (v) => /^(?=.*[a-z])(?=.*[A-Z])/.test(v || ""),
      })
      .test({
        message: "Add at least one number",
        test: (v) => /^(?=.*[0-9])/.test(v || ""),
      }),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(CardSchema),
  });

  const submitCard = handleSubmit(async () => {
    const id = useSonner.loading("Please wait while we create your account...");
    await promiseTimeout(2000);
    useSonner.dismiss(id);
    useSonner.success("Account Created", {
      description: "You may now log in to your account.",
    });
  });
</script>
