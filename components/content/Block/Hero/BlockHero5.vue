<template>
  <UiContainer
    class="relative flex flex-col gap-y-5 py-10 md:flex-row md:gap-10 md:py-0 lg:h-[720px]"
  >
    <div
      class="absolute inset-0 z-[-2] h-full w-full bg-transparent bg-[radial-gradient(circle,_theme(colors.border)_3px,_transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle,#000,_transparent_80%)]"
    />
    <div
      class="absolute inset-y-0 right-5 -z-[1] hidden h-full md:block md:w-[450px] lg:w-[700px] xl:w-[800px]"
    >
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full rounded-lg object-cover shadow"
        src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section one styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section one header`"
      />
    </div>
    <div class="flex h-full items-center justify-center md:w-[550px] lg:w-[768px]">
      <div>
        <h1 class="mb-4 text-4xl font-bold md:text-5xl lg:mb-6 lg:mt-5 xl:text-6xl">
          Customer service software for customer-first teams
        </h1>
        <p class="max-w-[560px] text-lg text-muted-foreground lg:text-xl">
          The best customer service software for customer-first teams. Industry-leading email and
          live chat support.
        </p>
        <form
          class="mt-8 flex flex-col gap-3 md:w-[80%] lg:mt-12 lg:w-full lg:flex-row lg:items-center"
        >
          <div class="w-full lg:w-[40%]">
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </div>
          <p class="my-2 text-sm text-muted-foreground lg:hidden">
            We care about your data in our privacy policy.
          </p>
          <div>
            <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit"
              >Get started</UiButton
            >
          </div>
        </form>
        <p class="mt-3 hidden text-sm text-muted-foreground lg:block">
          We care about your data in our privacy policy.
        </p>

        <div class="mt-10 flex flex-col gap-5 md:flex-row md:items-center">
          <div class="flex items-center -space-x-1">
            <template v-for="n in 5" :key="n">
              <UiAvatar
                class="bg-background ring-2 ring-ring/30 transition hover:ring-ring dark:ring-ring/20 dark:hover:ring-ring"
                src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
              />
            </template>
          </div>

          <div class="flex items-center gap-1 md:flex-col md:items-start">
            <div>
              <template v-for="s in 5" :key="s">
                <Icon
                  name="material-symbols:kid-star"
                  class="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              </template>
            </div>
            <p class="text-sm text-muted-foreground">from 1,000+ customers</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[300px] md:hidden">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full rounded-bl-[70px] rounded-tr-[70px] object-cover"
        src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
