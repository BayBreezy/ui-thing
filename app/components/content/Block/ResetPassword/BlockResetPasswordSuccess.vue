<template>
  <!--
    Confirmation shown after a password is reset
    Features: Success icon, short explanation, continue to log in button, centered card on a soft background
  -->
  <div class="bg-muted/30 flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md shadow-sm">
      <div class="p-6 text-center lg:p-8">
        <div
          class="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500/10"
        >
          <Icon class="size-7 text-green-600" name="lucide:circle-check" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Password reset</h1>
        <p class="text-muted-foreground mt-2 text-sm">
          Your password has been updated. You can now log in with your new password.
        </p>
        <UiButton class="mt-8 w-full" size="lg" to="#">Continue to log in</UiButton>
        <p class="text-muted-foreground mt-6 text-xs">
          Didn't make this change?
          <NuxtLink class="text-foreground font-medium underline underline-offset-4" to="#">
            Contact support
          </NuxtLink>
        </p>
      </div>
    </UiCard>
  </div>
</template>
