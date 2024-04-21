<template>
  <UiContainer class="flex flex-col gap-y-16 py-10 lg:h-[720px] lg:flex-row lg:gap-10">
    <div class="flex h-full items-center justify-center lg:w-2/3 xl:w-1/2">
      <div>
        <h1 class="mb-4 mt-7 text-4xl font-semibold lg:mb-6 lg:mt-5 lg:text-5xl xl:text-6xl">
          Be the first to know when we launch
        </h1>
        <p class="text-lg text-muted-foreground lg:text-xl">
          We're still building. Subscribe for updates and 20% off when we launch. No spam, we
          promise!
        </p>
        <form
          class="mt-8 flex w-full flex-col gap-3 sm:w-[500px] lg:mt-12 lg:w-full lg:flex-row lg:items-center"
        >
          <div class="w-full lg:w-[60%]">
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
    </div>
    <div class="h-[350px] lg:h-full lg:w-1/3 xl:w-1/2">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section one styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} newsletter image`"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
