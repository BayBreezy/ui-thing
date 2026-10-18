<template>
  <!--
    Change password while signed in
    Features: Current, new and confirm password with show and hide toggles, a strength meter, a check that the new password is different from the current one, an option to sign out of other devices and a success message
  -->
  <div class="bg-muted/30 flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md shadow-sm">
      <div class="p-6 lg:p-8">
        <div class="mb-8">
          <h1 class="mb-1 text-2xl font-bold tracking-tight">Change password</h1>
          <p class="text-muted-foreground text-sm">
            Use a password that you do not use anywhere else.
          </p>
        </div>

        <UiAlert
          v-if="saved"
          class="mb-6"
          icon="lucide:circle-check"
          title="Password updated"
          description="Your password was changed. Other devices were signed out if you chose that."
          role="status"
        />

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeePasswordInput
              label="Current password"
              name="current"
              placeholder="Enter your current password"
            />
            <UiVeePasswordInput
              show-strength
              label="New password"
              name="password"
              placeholder="Enter a new password"
              hint="At least 8 characters, with a number and a symbol."
            />
            <UiVeePasswordInput
              label="Confirm new password"
              name="confirmPassword"
              placeholder="Repeat your new password"
            />
            <UiVeeCheckbox label="Sign out of all other devices" name="signOutOthers" />
            <div class="flex gap-2">
              <UiButton class="flex-1" type="submit">Update password</UiButton>
              <UiButton type="button" variant="outline" @click="resetForm()">Reset</UiButton>
            </div>
          </fieldset>
        </form>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Change password",
    description: "Update the password for your account.",
  });

  const saved = ref(false);

  const ChangeSchema = object({
    current: string().required().label("Current password"),
    password: string()
      .required()
      .label("New password")
      .min(8)
      .matches(/[0-9]/, "Password needs a number")
      .matches(/[^A-Za-z0-9]/, "Password needs a special character")
      .notOneOf([yupRef("current")], "The new password must be different from the current one"),
    confirmPassword: string()
      .required()
      .label("Confirmation")
      .oneOf([yupRef("password")], "Passwords must match"),
    signOutOthers: boolean().default(false),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm<InferType<typeof ChangeSchema>>({
    validationSchema: ChangeSchema,
  });

  const submit = handleSubmit(async (values) => {
    saved.value = true;
    useSonner.success("Password updated", {
      description: values.signOutOthers
        ? "You were signed out of your other devices."
        : "Your other devices stay signed in.",
    });
    resetForm();
  });
</script>
