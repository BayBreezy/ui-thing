<template>
  <div class="flex items-center justify-center">
    <form>
      <UiCard class="w-[380px] max-w-sm">
        <UiCardHeader>
          <UiCardTitle>Create account</UiCardTitle>
          <UiCardAction>
            <UiButton variant="ghost" size="sm" as-child class="-mr-2">
              <NuxtLink to="#">Log in</NuxtLink>
            </UiButton>
          </UiCardAction>
          <UiCardDescription>Enter your details below to create your account.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid w-full items-center gap-4">
            <UiVeeInput name="name" label="Name" required />
            <UiVeeInput
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <UiVeeInput name="password" label="Password" type="password" required />
            <div class="flex items-start gap-2 pt-1 text-sm">
              <UiVeeCheckbox class="gap-2" label="I agree to the terms and privacy policy." />
            </div>
          </div>
        </UiCardContent>

        <UiCardFooter class="flex-col gap-4">
          <UiButton class="w-full" effect="ringHover" type="submit">Create account</UiButton>
          <UiDivider><span class="text-muted-foreground text-sm">or</span></UiDivider>
          <UiButton variant="outline" class="w-full">
            <Icon name="logos:google-icon" />
            <span>Continue with Google</span>
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>
