<template>
  <!--
    Confirmation shown after a reset email is sent
    Features: Mail icon, the address the email was sent to, open email app button, resend link with cooldown, back to log in link
  -->
  <div class="relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,white,transparent_90%)] bg-size-[100px_100px]"
    />
    <div class="relative z-2 w-full max-w-sm text-center">
      <div
        class="bg-background mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border"
      >
        <Icon class="size-6" name="lucide:mail-check" />
      </div>

      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="text-muted-foreground mt-2">
        We sent password reset instructions to
        <span class="text-foreground font-medium">{{ email }}</span
        >.
      </p>

      <div class="mt-8 grid gap-3">
        <UiButton to="mailto:">
          <Icon class="size-4" name="lucide:mail-open" />
          Open email app
        </UiButton>
      </div>

      <p class="text-muted-foreground mt-6 text-sm">
        Didn't get the email?
        <button
          type="button"
          class="text-foreground font-semibold underline-offset-4 enabled:hover:underline disabled:opacity-60"
          :disabled="cooldown > 0"
          @click="resend()"
        >
          {{ cooldown > 0 ? `Resend in ${cooldown}s` : "Click to resend" }}
        </button>
      </p>

      <p class="mt-8 text-sm">
        <NuxtLink
          class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
          to="#"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Back to log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ email?: string }>(), {
    email: "you@example.com",
  });

  const title = "Check your inbox";
  useSeoMeta({ title, description: "We've sent you an email with instructions." });

  const email = computed(() => props.email);
  const cooldown = ref(0);

  let timer: ReturnType<typeof setInterval> | undefined;
  const resend = () => {
    cooldown.value = 30;
    clearInterval(timer);
    timer = setInterval(() => {
      cooldown.value -= 1;
      if (cooldown.value <= 0) clearInterval(timer);
    }, 1000);
    useSonner.success("Email sent again");
  };
  onBeforeUnmount(() => clearInterval(timer));
</script>
