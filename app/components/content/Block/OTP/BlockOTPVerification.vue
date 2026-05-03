<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle,transparent_25%,var(--color-border)_100%)] bg-size-[100px_100px]"
    />
    <div class="relative z-2 w-full max-w-[400px] px-5">
      <div
        class="bg-background mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border"
      >
        <Icon class="size-6" name="lucide:shield-check" />
      </div>

      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
        <p class="text-muted-foreground mt-1">{{ description }}</p>
        <div
          class="from-muted ring-muted mt-4 w-full rounded-md bg-linear-to-b p-2 text-center text-sm font-medium shadow-xs ring-1"
        >
          john@example.com
        </div>
      </div>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-6">
          <UiVeePinInput
            aria-label="Verification Code"
            name="code"
            :input-count="6"
            type="text"
            otp
            placeholder="0"
            class="justify-center **:data-[slot=pin-input-input]:size-12 [&_p:first-of-type]:text-center"
            hint="Enter the 6-digit code that we sent to your email"
          />
          <UiButton class="w-full" type="submit" text="Verify Code" />
        </fieldset>
      </form>

      <div class="mt-6 text-center">
        <p class="text-muted-foreground text-sm">
          Didn't receive the code?
          <button
            type="button"
            class="text-primary font-semibold underline-offset-2 hover:underline"
            @click="resendCode"
          >
            Resend
          </button>
        </p>
      </div>

      <p class="mt-8 text-center text-sm">
        <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
          >Back to Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Verify Your Email";
  const description = "We've sent a verification code to your email.";

  useSeoMeta({ title, description });

  const OTPSchema = object({
    code: array()
      .of(string().required())
      .min(6, "Please enter all 6 digits")
      .required()
      .label("Verification Code"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof OTPSchema>>({
    validationSchema: OTPSchema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner("Code verified", {
      description: "Your email has been verified successfully.",
    });
  });

  const resendCode = () => {
    useSonner("Code resent", {
      description: "A new verification code has been sent to your email.",
    });
  };
</script>
