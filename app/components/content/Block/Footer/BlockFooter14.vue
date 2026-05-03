<template>
  <footer class="border-t">
    <UiContainer class="py-12">
      <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <!-- Logo -->
        <NuxtLink to="#" class="flex items-center gap-2">
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-7 object-contain"
          />
          <span class="font-semibold">{{ COMPANY_NAME }}</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <NuxtLink
            v-for="item in ['About', 'Features', 'Pricing', 'Blog', 'Docs', 'Contact']"
            :key="item"
            class="text-muted-foreground hover:text-primary transition-colors"
            to="#"
          >
            {{ item }}
          </NuxtLink>
        </nav>

        <!-- Copyright -->
        <p class="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
