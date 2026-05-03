<template>
  <footer class="bg-slate-50 dark:bg-slate-950">
    <UiContainer class="py-16 lg:py-20">
      <div class="mb-12 text-center lg:mb-16">
        <NuxtLink to="#" class="mb-4 inline-flex items-center gap-3">
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-12 object-contain"
          />
        </NuxtLink>
        <p class="text-muted-foreground mx-auto mb-8 max-w-md">
          Building the future of digital experiences, one product at a time.
        </p>

        <!-- Main Navigation -->
        <nav class="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <NuxtLink
            v-for="item in ['Home', 'Products', 'Solutions', 'Developers', 'Company', 'Support']"
            :key="item"
            class="hover:text-primary font-medium transition-colors"
            to="#"
          >
            {{ item }}
          </NuxtLink>
        </nav>

        <!-- Social Links -->
        <div class="mb-8 flex items-center justify-center gap-4">
          <NuxtLink
            v-for="social in [
              'logos:facebook',
              'logos:twitter',
              'ri:instagram-fill',
              'logos:linkedin-icon',
              'ri:github-fill',
              'logos:youtube-icon',
            ]"
            :key="social"
            to="#"
            class="hover:border-primary hover:bg-primary/5 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all hover:scale-110"
          >
            <Icon :name="social" class="size-5" />
          </NuxtLink>
        </div>

        <!-- Legal Links -->
        <div class="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
          <NuxtLink to="#" class="hover:text-primary transition-colors">Privacy Policy</NuxtLink>
          <span>•</span>
          <NuxtLink to="#" class="hover:text-primary transition-colors">Terms of Service</NuxtLink>
          <span>•</span>
          <NuxtLink to="#" class="hover:text-primary transition-colors">Cookie Settings</NuxtLink>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t pt-8 text-center">
        <p class="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}, Inc. All rights reserved
          worldwide.
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
