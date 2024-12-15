<template>
  <UiContainer class="flex flex-col gap-y-5 py-10 md:flex-row md:gap-10 md:py-0 lg:h-[720px]">
    <div class="flex h-full items-center justify-center md:w-2/3 xl:w-1/2">
      <div>
        <h1 class="mb-4 text-4xl font-bold md:text-5xl lg:mb-6 lg:mt-5 xl:text-6xl">
          People who care about your growth
        </h1>
        <p class="text-lg text-muted-foreground lg:text-xl">
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain
          more.
        </p>
        <form class="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:items-center">
          <div class="w-full lg:w-[60%]">
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

        <div class="mt-10 flex items-center gap-5">
          <div class="flex items-center -space-x-1">
            <template v-for="n in 5" :key="n">
              <UiAvatar
                class="bg-background ring-2 ring-ring/30 transition hover:ring-ring dark:ring-ring/20 dark:hover:ring-ring"
                src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
              />
            </template>
          </div>

          <div class="flex flex-col gap-1">
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
    <div class="h-[350px] md:h-full md:w-1/3 xl:w-1/2">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        class="h-full w-full rounded-tl-[60px] object-cover lg:rounded-tl-[160px]"
        src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section three styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section three header`"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
