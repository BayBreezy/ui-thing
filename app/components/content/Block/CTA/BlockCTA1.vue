<template>
  <UiContainer class="py flex flex-col items-center py-16 text-center lg:py-24">
    <h3 class="mb-4 text-3xl font-semibold md:mb-5 md:text-4xl">Start your free trial</h3>
    <p class="text-lg text-muted-foreground md:text-xl">
      Join over 4,000+ startups already growing with {{ COMPANY_NAME }}.
    </p>
    <div class="mt-8 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
      <UiButton size="lg" class="w-full lg:w-auto" variant="outline">Learn more</UiButton>
      <UiButton size="lg" class="w-full whitespace-nowrap md:w-auto">Get started</UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
