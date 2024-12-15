<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Sign up</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col items-center gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="mb-6">
            <UiDialogTitle class="sm:text-center">Sign up UI Thing</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              We just need a few details to get you started.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-4">
            <UiVeeInput label="Full name" placeholder="John Doe" name="fullName" required />
            <UiVeeInput
              label="Email"
              placeholder="hi@mycompany.com"
              name="email"
              type="email"
              required
            />
            <UiVeeInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
            />
            <UiButton type="submit" class="w-full"> Sign up </UiButton>
            <UiDivider label="Or" />
            <UiButton variant="outline" type="button" class="w-full"
              ><Icon name="logos:google-icon" /> Continue with Google</UiButton
            >
          </fieldset>
        </form>
        <p class="text-center text-xs text-muted-foreground">
          By signing up you agree to our <a class="underline hover:no-underline" href="#">Terms</a>.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-sign-up",
    validationSchema: toTypedSchema(
      z.object({
        fullName: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
      })
    ),
  });

  const open = defineModel<boolean>({ default: false });

  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("You have successfully signed up", {
        description: `Welcome ${values.fullName}`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while signing up", {
        description: error.message,
      });
    }
  });
</script>
