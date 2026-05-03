<template>
  <div class="relative flex min-h-screen items-center justify-center p-4">
    <!-- Grid Background -->
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,white,transparent_90%)] bg-size-[100px_100px]"
    />

    <div class="relative z-2 w-full max-w-md">
      <div class="mb-8 text-center">
        <div class="mb-4 flex justify-center">
          <div class="bg-primary/10 flex size-16 items-center justify-center rounded-2xl">
            <Icon class="text-primary size-8" name="lucide:smartphone" />
          </div>
        </div>
        <h1 class="mb-2 text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground text-sm">{{ description }}</p>
      </div>

      <form class="space-y-6" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-6">
          <UiCard>
            <UiCardContent>
              <div class="mb-4 flex items-center gap-3">
                <div class="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                  <Icon class="text-primary size-5" name="lucide:mail" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">Email Verification</p>
                  <p class="text-muted-foreground text-xs">We'll send you a 6-digit code</p>
                </div>
                <label
                  for="emailMethod"
                  class="cursor-pointer"
                  title="Click to send verification code via Email"
                >
                  <Icon
                    :class="[
                      'size-5 transition-all',
                      selectedMethod === 'email' ? 'text-primary' : 'text-muted-foreground/40',
                    ]"
                    name="lucide:circle-check-big"
                  />
                  <span class="sr-only"> Select Email verification method </span>
                </label>
              </div>
              <input
                id="emailMethod"
                v-model="selectedMethod"
                type="radio"
                name="method"
                value="email"
                class="sr-only"
                hidden
              />
              <AnimatePresence>
                <Motion
                  v-if="selectedMethod === 'email'"
                  :initial="{ opacity: 0, height: 0 }"
                  :animate="{ opacity: 1, height: 'auto' }"
                  :exit="{ opacity: 0, height: 0 }"
                >
                  <UiVeeInput
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                </Motion>
              </AnimatePresence>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardContent>
              <div class="mb-4 flex items-center gap-3">
                <div class="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                  <Icon class="text-primary size-5" name="lucide:message-square" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">SMS Verification</p>
                  <p class="text-muted-foreground text-xs">We'll text you a 6-digit code</p>
                </div>
                <label
                  for="smsMethod"
                  class="cursor-pointer"
                  title="Click to send verification code via SMS"
                >
                  <Icon
                    :class="[
                      'size-5 transition-all',
                      selectedMethod === 'sms' ? 'text-primary' : 'text-muted-foreground/40',
                    ]"
                    name="lucide:circle-check-big"
                  />
                  <span class="sr-only"> Select SMS verification method </span>
                </label>
              </div>
              <input
                id="smsMethod"
                v-model="selectedMethod"
                type="radio"
                name="method"
                value="sms"
                class="sr-only"
                hidden
              />
              <AnimatePresence>
                <Motion
                  v-if="selectedMethod === 'sms'"
                  :initial="{ opacity: 0, height: 0 }"
                  :animate="{ opacity: 1, height: 'auto' }"
                  :exit="{ opacity: 0, height: 0 }"
                >
                  <UiVeeInput
                    label="Phone number"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                  />
                </Motion>
              </AnimatePresence>
            </UiCardContent>
          </UiCard>

          <UiButton class="w-full" size="lg" type="submit">
            Continue
            <Icon class="ml-2" name="lucide:arrow-right" />
          </UiButton>
        </fieldset>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink
          class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          to="#"
        >
          <Icon name="lucide:arrow-left" />
          Back to Log in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Verify your identity";
  const description = "Choose how you want to receive your verification code.";

  useSeoMeta({ title, description });

  const selectedMethod = ref("email");

  const TwoStepSchema = object({
    method: string().required().label("Verification method"),
    email: string().when("method", {
      is: "email",
      then: (schema) => schema.email().required().label("Email address"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: string().when("method", {
      is: "sms",
      then: (schema) => schema.required().label("Phone number"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof TwoStepSchema>>({
    validationSchema: TwoStepSchema,
    initialValues: {
      method: "email",
    },
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner.success("Code sent", {
      description: `Verification code sent to your ${values.method === "email" ? "email" : "phone"}.`,
    });
  });
</script>
