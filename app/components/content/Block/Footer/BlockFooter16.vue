<template>
  <footer class="bg-muted/30 border-t">
    <UiContainer class="py-12 lg:py-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Left - Logo and tagline -->
        <div>
          <NuxtLink to="#" class="mb-3 inline-flex items-center gap-3">
            <img
              src="/icon.png"
              fit="contain"
              alt="Company Logo"
              title="Company Logo"
              class="h-8 object-contain"
            />
            <span class="text-xl font-semibold">{{ COMPANY_NAME }}</span>
          </NuxtLink>
          <p class="text-muted-foreground text-sm">
            Making the world a better place through technology.
          </p>
        </div>

        <!-- Center - Quick Links -->
        <div class="flex items-center justify-center">
          <nav class="flex flex-wrap gap-4 text-sm">
            <NuxtLink
              v-for="item in ['About', 'Blog', 'Jobs', 'Press', 'Partners']"
              :key="item"
              class="text-muted-foreground hover:text-primary transition-colors"
              to="#"
            >
              {{ item }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Right - Newsletter -->
        <div>
          <p class="mb-2 text-sm font-semibold">Subscribe to our newsletter</p>
          <form class="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              class="bg-background focus:border-primary focus:ring-primary/20 h-8 flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
            <UiButton size="sm" type="submit">
              <Icon name="heroicons:paper-airplane" class="h-4 w-4" />
            </UiButton>
          </form>
        </div>
      </div>

      <UiDivider class="my-8" />

      <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <p class="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
        </p>

        <div class="flex items-center gap-6">
          <NuxtLink
            to="#"
            class="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Privacy
          </NuxtLink>
          <NuxtLink
            to="#"
            class="text-muted-foreground hover:text-primary text-sm transition-colors"
          >
            Terms
          </NuxtLink>
          <div class="flex items-center gap-3">
            <NuxtLink to="#" class="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="logos:facebook" class="size-5" />
            </NuxtLink>
            <NuxtLink to="#" class="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="logos:twitter" class="size-5" />
            </NuxtLink>
            <NuxtLink to="#" class="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="logos:linkedin-icon" class="size-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </UiContainer>
  </footer>
</template>
