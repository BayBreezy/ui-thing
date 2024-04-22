<template>
  <UiContainer
    as="footer"
    class="flex flex-col items-center justify-between gap-7 py-12 lg:flex-row"
  >
    <NuxtLink to="#" class="flex items-center gap-3">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="/icon.png"
        fit="contain"
        alt="Company Logo"
        title="Company Logo"
        class="h-10 object-contain lg:h-8"
      />
      <span class="text-xl font-semibold lg:text-lg">{{ COMPANY_NAME }}</span>
    </NuxtLink>
    <ul class="flex flex-wrap gap-5">
      <li v-for="k in ['Home', 'About us', 'Contact', 'Projects']" :key="k">
        <NuxtLink class="hover:text-primary" to="#">{{ k }}</NuxtLink>
      </li>
    </ul>

    <p class="text-muted-foreground">&copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}.</p>
  </UiContainer>
</template>
