<template>
  <UiContainer
    class="relative flex flex-col items-center justify-between gap-y-12 py-16 lg:h-[720px] lg:flex-row lg:pt-24"
  >
    <div class="flex h-full items-center justify-center">
      <div>
        <h3 class="text-center text-3xl font-semibold lg:text-left lg:text-5xl">
          Growth performance tracking made easy
        </h3>
        <p class="my-5 text-center text-lg text-muted-foreground md:text-xl lg:my-8 lg:text-left">
          Start your 30-day free trial today.
        </p>
        <div class="grid gap-2 md:flex md:justify-center lg:justify-start">
          <UiButton variant="outline" class="h-11">
            <Icon name="mdi:apple" class="h-6 w-6" />
            <span>Download for iOS</span>
          </UiButton>
          <UiButton variant="outline" class="h-11">
            <Icon name="ion:logo-google-playstore" class="h-6 w-6" />
            <span>Download for Android</span>
          </UiButton>
        </div>
      </div>
    </div>
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <img
      src="/phone-mockup.png"
      alt="Mobile phone mockup"
      class="mx-auto h-[360px] w-full object-cover object-top sm:w-[400px] lg:h-[640px] lg:w-full lg:object-contain"
    />
  </UiContainer>
</template>

<script lang="ts" setup></script>
