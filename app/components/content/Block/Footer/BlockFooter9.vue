<template>
  <footer class="bg-muted/50 border-t">
    <UiContainer class="py-16 lg:py-24">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Company Info -->
        <div class="lg:col-span-1">
          <NuxtLink to="#" class="mb-5 flex items-center gap-3">
            <img
              src="/icon.png"
              fit="contain"
              alt="Company Logo"
              title="Company Logo"
              class="h-8 object-contain"
            />
            <span class="text-xl font-semibold">{{ COMPANY_NAME }}</span>
          </NuxtLink>
          <p class="text-muted-foreground mb-5">
            Making the world a better place through constructing elegant hierarchies.
          </p>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-radial via-transparent to-black/40 dark:to-white/20"
            >
              <Icon name="logos:facebook" class="size-5" />
            </NuxtLink>
            <NuxtLink
              to="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-radial via-transparent to-black/40 dark:to-white/20"
            >
              <Icon name="logos:twitter" class="size-5" />
            </NuxtLink>
            <NuxtLink
              to="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-radial via-transparent to-black/40 dark:to-white/20"
            >
              <Icon name="logos:linkedin-icon" class="size-5" />
            </NuxtLink>
            <NuxtLink
              to="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-radial via-transparent to-black/40 dark:to-white/20"
            >
              <Icon name="ri:github-fill" class="size-5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Solutions -->
        <div>
          <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Solutions</h3>
          <ul class="space-y-3">
            <li v-for="item in ['Marketing', 'Analytics', 'Commerce', 'Insights']" :key="item">
              <NuxtLink class="text-muted-foreground hover:text-primary transition-colors" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Support</h3>
          <ul class="space-y-3">
            <li v-for="item in ['Pricing', 'Documentation', 'Guides', 'API Status']" :key="item">
              <NuxtLink class="text-muted-foreground hover:text-primary transition-colors" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Company</h3>
          <ul class="space-y-3">
            <li v-for="item in ['About', 'Blog', 'Jobs', 'Press']" :key="item">
              <NuxtLink class="text-muted-foreground hover:text-primary transition-colors" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 border-t pt-8 lg:mt-16">
        <p class="text-muted-foreground text-center text-sm">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}, Inc. All rights reserved.
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
