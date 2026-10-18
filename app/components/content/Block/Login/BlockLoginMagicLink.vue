<template>
  <!--
    Passwordless login with a magic link
    Features: Email only form, passkey option, confirmation state with resend and change email actions, validation
  -->
  <div class="flex min-h-screen items-center justify-center px-5 py-12">
    <div class="w-full max-w-sm">
      <template v-if="!sent">
        <div class="text-center">
          <div
            class="bg-primary/10 mx-auto mb-5 flex size-12 items-center justify-center rounded-full"
          >
            <Icon name="lucide:wand-sparkles" class="text-primary size-6" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in without a password</h1>
          <p class="text-muted-foreground mt-2">
            We'll email you a link that signs you in instantly.
          </p>
        </div>

        <form class="mt-8" @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
            <UiButton class="w-full" type="submit">
              <Icon name="lucide:mail" class="size-4" />
              Email me a login link
            </UiButton>
            <UiDivider label="or" />
            <UiButton variant="outline" type="button" @click="usePasskey()">
              <Icon name="lucide:fingerprint" class="size-4" />
              Log in with a passkey
            </UiButton>
          </fieldset>
        </form>

        <p class="text-muted-foreground mt-8 text-center text-sm">
          Prefer a password?
          <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
            Log in with password
          </NuxtLink>
        </p>
      </template>

      <div v-else class="text-center">
        <div
          class="bg-primary/10 mx-auto mb-5 flex size-12 items-center justify-center rounded-full"
        >
          <Icon name="lucide:mail-check" class="text-primary size-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Check your inbox</h1>
        <p class="text-muted-foreground mt-2">
          We sent a login link to
          <span class="text-foreground font-medium">{{ email }}</span
          >. It expires in 15 minutes.
        </p>
        <div class="mt-8 grid gap-3">
          <UiButton variant="outline" :disabled="cooldown > 0" @click="resend()">
            {{ cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email" }}
          </UiButton>
          <UiButton variant="ghost" @click="sent = false">Use a different email</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const LoginSchema = object({
    email: string().email().required().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
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
    useSonner.success("Login link sent again");
  };

  const usePasskey = () => {
    useSonner("Passkey", { description: "Call navigator.credentials.get() here." });
  };
</script>
