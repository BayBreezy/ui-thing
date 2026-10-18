<template>
  <!--
    Forgot password as one interactive flow
    Features: Email form that swaps to a check your inbox state in place, resend with cooldown, use a different email action, validation
  -->
  <div class="bg-muted/30 flex min-h-screen items-center justify-center px-5 py-12">
    <UiCard class="w-full max-w-md shadow-sm">
      <UiCardContent class="p-6 sm:p-8">
        <template v-if="!sent">
          <div class="text-center">
            <div
              class="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full"
            >
              <Icon class="text-primary size-7" name="lucide:key-round" />
            </div>
            <h1 class="text-2xl font-bold tracking-tight">Forgot your password?</h1>
            <p class="text-muted-foreground mt-2 text-sm">
              Enter the email you signed up with and we'll send you a reset link.
            </p>
          </div>

          <form class="mt-8" @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
              <UiButton class="w-full" type="submit">Send reset link</UiButton>
            </fieldset>
          </form>
        </template>

        <div v-else class="text-center">
          <div
            class="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full"
          >
            <Icon class="text-primary size-7" name="lucide:mail-check" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight">Check your inbox</h1>
          <p class="text-muted-foreground mt-2 text-sm">
            We sent a reset link to
            <span class="text-foreground font-medium">{{ email }}</span
            >. It expires in 24 hours.
          </p>
          <div class="mt-8 grid gap-3">
            <UiButton variant="outline" :disabled="cooldown > 0" @click="resend()">
              {{ cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email" }}
            </UiButton>
            <UiButton variant="ghost" @click="sent = false">Use a different email</UiButton>
          </div>
        </div>

        <p class="mt-8 text-center text-sm">
          <NuxtLink
            class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
            to="#"
          >
            <Icon name="lucide:arrow-left" class="size-4" />
            Back to log in
          </NuxtLink>
        </p>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const ForgotSchema = object({
    email: string().email().required().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof ForgotSchema>>({
    validationSchema: ForgotSchema,
  });

  const sent = ref(false);
  const email = ref("");
  const cooldown = ref(0);

  let timer: ReturnType<typeof setInterval> | undefined;
  const startCooldown = () => {
    cooldown.value = 30;
    clearInterval(timer);
    timer = setInterval(() => {
      cooldown.value -= 1;
      if (cooldown.value <= 0) clearInterval(timer);
    }, 1000);
  };
  onBeforeUnmount(() => clearInterval(timer));

  const submit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    email.value = values.email;
    sent.value = true;
    startCooldown();
  });

  const resend = () => {
    startCooldown();
    useSonner.success("Reset link sent again");
  };
</script>
