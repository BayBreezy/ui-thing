<template>
  <UiContainer as="footer" class="py-16 lg:py-24">
    <section class="grid grid-cols-2 gap-8 lg:grid-cols-6">
      <template v-for="n in 6" :key="n">
        <div>
          <p class="text-muted-foreground mb-4 text-sm">Product</p>
          <ul class="flex flex-col gap-3">
            <li v-for="k in 6" :key="k">
              <NuxtLink class="hover:text-primary font-semibold" to="#">Link item {{ k }}</NuxtLink>
            </li>
          </ul>
        </div>
      </template>
    </section>

    <section class="mt-12 flex flex-col justify-between gap-5 border-t pt-8 lg:mt-16 lg:flex-row">
      <NuxtLink to="#" class="flex items-center gap-3">
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
