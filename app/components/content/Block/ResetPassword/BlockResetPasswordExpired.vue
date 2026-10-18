<template>
  <!--
    Reset link expired
    Features: A clear message that the link has expired or was already used, a form to request a new link, a confirmation with a resend cooldown after sending, a help link and a back to log in link
  -->
  <div class="bg-muted/30 flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md shadow-sm">
      <div class="p-6 lg:p-8">
        <div class="mb-6 flex justify-center">
          <div class="flex size-14 items-center justify-center rounded-full bg-amber-500/10">
            <Icon
              class="size-7 text-amber-600"
              :name="sent ? 'lucide:mail-check' : 'lucide:link-2-off'"
            />
          </div>
        </div>

        <template v-if="!sent">
          <div class="mb-8 text-center">
            <h1 class="mb-2 text-2xl font-bold tracking-tight">This link has expired</h1>
            <p class="text-muted-foreground text-sm">
              Reset links work for 24 hours and only once. Enter your email and we will send you a
              new one.
            </p>
          </div>
          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
              <UiButton class="w-full" size="lg" type="submit">Send a new link</UiButton>
            </fieldset>
          </form>
        </template>

        <div v-else class="text-center" role="status">
          <h1 class="mb-2 text-2xl font-bold tracking-tight">Check your inbox</h1>
          <p class="text-muted-foreground text-sm">
            We sent a new reset link to <span class="text-foreground font-medium">{{ sentTo }}</span
            >.
          </p>
          <p class="text-muted-foreground mt-6 text-sm">
            Still nothing?
            <button
              type="button"
              class="text-foreground font-semibold underline-offset-4 enabled:hover:underline disabled:opacity-60"
              :disabled="cooldown > 0"
              @click="resend"
            >
              {{ cooldown > 0 ? `Resend in ${cooldown}s` : "Send it again" }}
            </button>
          </p>
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
        <p class="text-muted-foreground mt-4 text-center text-xs">
          Need help?
          <NuxtLink class="text-foreground font-medium underline underline-offset-4" to="#"
            >Contact support</NuxtLink
          >
        </p>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Reset link expired",
    description: "Request a new password reset link.",
  });

  const sent = ref(false);
  const sentTo = ref("");
  const cooldown = ref(0);

  const { pause, resume } = useIntervalFn(
    () => {
      if (cooldown.value > 0) cooldown.value--;
      else pause();
    },
    1000,
    { immediate: false }
  );

  const EmailSchema = object({
    email: string().required().email().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof EmailSchema>>({
    validationSchema: EmailSchema,
  });

  const submit = handleSubmit(async (values) => {
    sentTo.value = values.email;
    sent.value = true;
    cooldown.value = 30;
    resume();
  });

  function resend() {
    cooldown.value = 30;
    resume();
    useSonner.success("A new link is on its way");
  }
</script>
