<template>
  <form @submit="submitCard">
    <UICard description="Enter your email below to create your account">
      <template #title>
        <UICardTitle class="text-xl"> Create an account </UICardTitle>
      </template>
      <template #content>
        <UICardContent class="grid gap-4">
          <!-- Login buttons -->
          <div class="flex items-center gap-4">
            <UIButton variant="outline" class="w-full"
              ><Icon class="h-4 w-4" name="mdi:github" /> Github</UIButton
            >
            <UIButton variant="outline" class="w-full"
              ><Icon class="h-4 w-4" name="uim:google" /> Google</UIButton
            >
          </div>
          <!-- Separator -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <UISeparator />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>
          <!-- Form -->
          <UIVeeInput type="email" label="Email" name="email" hint="Enter your email" />
          <UIVeeInput
            label="Password"
            name="password"
            type="password"
            hint="8 characters or more"
          />
        </UICardContent>
      </template>
      <template #footer>
        <UICardFooter>
          <UIButton type="submit" class="w-full">Create account</UIButton>
        </UICardFooter>
      </template>
    </UICard>
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

  const submitCard = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Creating your account...",
        success: (d) => {
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
