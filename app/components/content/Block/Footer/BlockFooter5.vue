<template>
  <UiContainer as="footer" class="py-16 lg:py-24">
    <div class="flex flex-col justify-between gap-5 border-b pb-10 lg:flex-row lg:pb-16">
      <div>
        <NuxtLink to="#" class="flex items-center gap-3">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-6 object-contain lg:h-8"
          />
          <span class="text-lg font-semibold">{{ COMPANY_NAME }}</span>
        </NuxtLink>
        <ul class="mt-5 flex flex-wrap gap-5 lg:pl-2">
          <li v-for="k in ['Home', 'About us', 'Contact', 'Projects']" :key="k">
            <NuxtLink class="hover:text-primary" to="#">{{ k }}</NuxtLink>
          </li>
        </ul>
      </div>
      <form class="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div class="w-full lg:w-[70%]">
          <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
        </div>
        <div>
          <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit">Subscribe</UiButton>
        </div>
      </form>
    </div>
    <section class="flex flex-col justify-between gap-5 pt-8 lg:flex-row">
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
