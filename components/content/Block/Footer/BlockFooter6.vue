<template>
  <UiContainer as="footer" class="pb-10 lg:pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="/icon.png"
        fit="contain"
        alt="Company Logo"
        title="Company Logo"
        class="mx-auto mb-5 h-10 object-contain lg:h-14"
      />
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Let's get started on something great
      </h2>

      <p class="text-lg text-muted-foreground lg:text-xl">
        We are here to help you with your project
      </p>

      <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
        <UiButton size="lg" variant="outline">View Demo</UiButton>
        <UiButton size="lg">Get started</UiButton>
      </div>
    </UiContainer>
    <section class="flex flex-col justify-between gap-5 border-t pt-8 lg:flex-row">
      <p class="text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
      </p>
      <div class="flex items-center gap-2">
        <Icon name="logos:facebook" class="h-7 w-7" />
        <Icon name="logos:twitter" class="h-7 w-7" />
        <Icon name="lucide:instagram" class="h-7 w-7" />
      </div>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup></script>
