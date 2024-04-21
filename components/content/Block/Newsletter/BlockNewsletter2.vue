<template>
  <UiContainer class="flex flex-col justify-between gap-10 py-16 lg:flex-row lg:py-24">
    <div>
      <h3 class="mb-4 text-3xl font-semibold md:mb-5 md:text-4xl">Sign up for our newsletter</h3>
      <p class="text-lg text-muted-foreground md:text-xl">
        Be the first to know about releases and industry news and insights.
      </p>
    </div>
    <div>
      <form class="flex w-full flex-col gap-3 sm:w-[500px] lg:flex-row lg:items-center">
        <div class="w-full lg:w-[300px] xl:w-[400px]">
          <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
        </div>
        <p class="my-2 text-sm text-muted-foreground lg:hidden">
          We care about your data in our privacy policy.
        </p>
        <div>
          <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit">Subscribe</UiButton>
        </div>
      </form>
      <p class="mt-3 hidden text-sm text-muted-foreground lg:block">
        We care about your data in our privacy policy.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
