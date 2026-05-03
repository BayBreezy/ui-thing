<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,white,transparent_90%)] bg-size-[100px_100px]"
    />
    <div class="relative z-2 w-full max-w-[340px] px-5">
      <div
        class="bg-background mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border"
      >
        <Icon class="size-6" name="lucide:mail" />
      </div>

      <div class="flex flex-col items-center text-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
        <p class="text-muted-foreground mt-1">{{ description }}</p>
      </div>

      <div class="mt-10">
        <UiButton to="#" class="w-full" type="submit">
          <Icon class="size-5" name="lucide:arrow-left" />
          <span>Resend instructions</span>
        </UiButton>
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
  const title = "Check your inbox";
  const description = "We've sent you an email with instructions to reset your password.";

  useSeoMeta({ title, description });
</script>
