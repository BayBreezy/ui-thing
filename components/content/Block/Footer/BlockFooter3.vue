<template>
  <UiContainer as="footer" class="py-16 lg:py-24">
    <section class="grid grid-cols-2 gap-8 lg:grid-cols-6">
      <div class="col-span-full pb-10 lg:col-span-2">
        <NuxtLink to="#" class="flex items-center gap-3">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-7 object-contain lg:h-10"
          />
          <span class="text-xl font-semibold">{{ COMPANY_NAME }}</span>
        </NuxtLink>
        <p class="mt-5 text-muted-foreground">
          Design amazing digital experiences that create more happy in the world.
        </p>
      </div>
      <template v-for="n in 2" :key="n">
        <div>
          <p class="mb-4 text-sm text-muted-foreground">Product</p>
          <ul class="flex flex-col gap-3">
            <li v-for="k in 6" :key="k">
              <NuxtLink class="font-semibold hover:text-primary" to="#">Link item {{ k }}</NuxtLink>
            </li>
          </ul>
        </div>
      </template>
      <div class="col-span-full lg:col-span-2">
        <form class="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div class="w-full lg:w-[70%]">
            <UiVeeInput
              label="Stay up to date"
              required
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
          </div>
          <div>
            <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit">Subscribe</UiButton>
          </div>
        </form>
      </div>
    </section>

    <section class="mt-12 flex flex-col justify-between gap-5 border-t pt-8 lg:mt-16 lg:flex-row">
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
