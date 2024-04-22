<template>
  <UiContainer as="footer" class="py-16 lg:py-24">
    <div class="flex flex-col justify-between gap-5 border-b pb-10 lg:flex-row lg:pb-16">
      <div>
        <p class="mb-3 text-lg font-semibold lg:text-xl">Join our newsletter</p>
        <p class="text-muted-foreground">We'll send you a nice letter once per week. No spam.</p>
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
    <section class="mt-10 grid grid-cols-2 gap-8 lg:mt-16 lg:grid-cols-6">
      <template v-for="n in 6" :key="n">
        <div>
          <p class="mb-4 text-sm text-muted-foreground">Product</p>
          <ul class="flex flex-col gap-3">
            <li v-for="k in 6" :key="k">
              <NuxtLink class="font-semibold hover:text-primary" to="#">Link item {{ k }}</NuxtLink>
            </li>
          </ul>
        </div>
      </template>
    </section>

    <section class="mt-12 flex flex-col justify-between gap-5 border-t pt-8 lg:mt-16 lg:flex-row">
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
      <p class="text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
      </p>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup></script>
