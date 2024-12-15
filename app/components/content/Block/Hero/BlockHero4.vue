<template>
  <UiContainer
    class="relative flex flex-col gap-y-5 py-10 md:flex-row md:gap-10 md:py-0 lg:h-[720px]"
  >
    <div
      class="absolute inset-0 z-[-2] h-full w-full bg-transparent bg-[linear-gradient(to_right,_theme(colors.border)_1px,_transparent_1px),linear-gradient(to_bottom,_theme(colors.border)_1px,_transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(#000,_transparent_80%)]"
    />
    <div
      class="absolute inset-y-0 right-5 -z-[1] hidden h-full md:block md:w-[400px] lg:w-[700px] xl:w-[800px]"
    >
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full object-cover shadow lg:rounded-bl-[150px] lg:rounded-tr-[150px]"
        src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section one styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section one header`"
      />
    </div>
    <div class="flex h-full items-center justify-center lg:w-[768px]">
      <div>
        <h1 class="mb-4 text-4xl font-bold md:text-5xl lg:mb-6 lg:mt-5 xl:text-6xl">
          Customer service software for customer-first teams
        </h1>
        <p class="max-w-[560px] text-lg text-muted-foreground lg:text-xl">
          The best customer service software for customer-first teams. Industry-leading email and
          live chat support.
        </p>
        <div class="mt-8 grid grid-cols-1 gap-3 md:flex lg:mt-10">
          <UiButton size="lg" variant="outline"> <Icon name="lucide:play-circle" /> Demo </UiButton>
          <UiButton size="lg">Sign up</UiButton>
        </div>
        <p class="mt-5 text-sm text-muted-foreground">
          We care about your data in our privacy policy.
        </p>
      </div>
    </div>
    <div class="h-[300px] md:hidden">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full rounded-bl-[40px] rounded-tr-[40px] object-cover"
        src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section four styles"
        loading="eager"
        width="700"
        height="300"
        :title="`${COMPANY_NAME} hero section four header`"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
