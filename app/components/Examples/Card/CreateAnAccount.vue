<template>
  <form @submit="submitCard">
    <UiCard description="Enter your email below to create your account">
      <template #title>
        <UiCardTitle class="text-xl"> Create an account </UiCardTitle>
      </template>
      <template #content>
        <UiCardContent class="grid gap-4">
          <!-- Login buttons -->
          <div class="flex items-center gap-4">
            <UiButton variant="outline" class="w-full"
              ><Icon class="h-4 w-4" name="mdi:github" /> Github</UiButton
            >
            <UiButton variant="outline" class="w-full"
              ><Icon class="h-4 w-4" name="uim:google" /> Google</UiButton
            >
          </div>
          <!-- Separator -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <UiSeparator />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>
          <!-- Form -->
          <UiVeeInput type="email" label="Email" name="email" hint="Enter your email" />
          <UiVeeInput
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
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const CardSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password is too short"),
  });

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(CardSchema),
  });

  const submitCard = handleSubmit(async () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Creating your account...",
        success: (_) => {
          res();
          return "Your account has been created!";
        },
        error: (e) => {
          rej(e);
          return "Error! Your account could not be created!";
        },
      });
    });
  });
</script>
