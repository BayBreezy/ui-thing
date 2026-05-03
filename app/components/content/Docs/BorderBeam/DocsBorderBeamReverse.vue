<template>
  <UiCard class="border-border/30 relative mx-auto w-[350px] overflow-hidden">
    <UiCardHeader>
      <UiCardTitle>Login</UiCardTitle>
      <UiCardDescription> Enter your credentials to access your account. </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <UiLabel :for="emailId">Email</UiLabel>
            <UiInput :id="emailId" type="email" placeholder="Enter your email" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel :for="passwordId">Password</UiLabel>
            <UiInput :id="passwordId" type="password" placeholder="Enter your password" />
          </div>
        </div>
      </form>
    </UiCardContent>
    <UiCardFooter class="flex justify-between">
      <UiButton variant="outline">Register</UiButton>
      <UiButton>Login</UiButton>
    </UiCardFooter>
    <UiBorderBeam
      :duration="4"
      :size="300"
      reverse
      class="from-transparent via-green-500 to-transparent"
    />
  </UiCard>
</template>

<script lang="ts" setup>
  const emailId = useId();
  const passwordId = useId();
</script>
