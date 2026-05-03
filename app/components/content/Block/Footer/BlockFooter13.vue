<template>
  <footer>
    <UiContainer class="py-16 lg:py-24">
      <!-- Main Content -->
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <!-- Left Section - About -->
        <div class="lg:col-span-5">
          <NuxtLink to="#" class="mb-5 inline-flex items-center gap-3">
            <img
              src="/icon.png"
              fit="contain"
              alt="Company Logo"
              title="Company Logo"
              class="h-10 object-contain"
            />
            <span class="text-2xl font-bold">{{ COMPANY_NAME }}</span>
          </NuxtLink>
          <p class="text-muted-foreground mb-6">
            We're on a mission to transform the way teams collaborate and build products together.
            Join us in shaping the future of work.
          </p>

          <!-- App Download Buttons -->
          <div class="mb-6 flex flex-col gap-3 sm:flex-row">
            <NuxtLink
              to="#"
              class="hover:border-primary hover:bg-primary/5 flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors"
            >
              <Icon name="logos:apple-app-store" class="size-6" />
              <div class="text-left">
                <p class="text-muted-foreground text-xs">Download on the</p>
                <p class="text-sm font-semibold">App Store</p>
              </div>
            </NuxtLink>
            <NuxtLink
              to="#"
              class="hover:border-primary hover:bg-primary/5 flex items-center gap-3 rounded-lg border px-4 py-2.5 transition-colors"
            >
              <Icon name="logos:google-play-icon" class="size-6" />
              <div class="text-left">
                <p class="text-muted-foreground text-xs">Get it on</p>
                <p class="text-sm font-semibold">Google Play</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Social Links -->
          <div>
            <p class="mb-3 text-sm font-semibold">Follow us</p>
            <div class="flex gap-3">
              <NuxtLink
                v-for="social in [
                  'logos:facebook',
                  'logos:twitter',
                  'ri:instagram-fill',
                  'logos:linkedin-icon',
                  'logos:youtube-icon',
                ]"
                :key="social"
                to="#"
                class="hover:border-primary hover:bg-primary/5 flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-110"
              >
                <Icon :name="social" class="h-5 w-5" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Section - Links -->
        <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
          <div>
            <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Platform</h3>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Overview',
                  'Features',
                  'Integrations',
                  'Pricing',
                  'Changelog',
                  'Status',
                ]"
                :key="item"
              >
                <NuxtLink
                  class="text-muted-foreground hover:text-primary text-sm transition-colors"
                  to="#"
                >
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Resources</h3>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Documentation',
                  'API Reference',
                  'Guides',
                  'Blog',
                  'Community',
                  'Support',
                ]"
                :key="item"
              >
                <NuxtLink
                  class="text-muted-foreground hover:text-primary text-sm transition-colors"
                  to="#"
                >
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul class="space-y-3">
              <li
                v-for="item in ['About Us', 'Careers', 'Press Kit', 'Partners', 'Contact', 'Legal']"
                :key="item"
              >
                <NuxtLink
                  class="text-muted-foreground hover:text-primary text-sm transition-colors"
                  to="#"
                >
                  {{ item }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 lg:mt-16 lg:flex-row"
      >
        <p class="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}, Inc. All rights reserved.
        </p>
        <div class="text-muted-foreground flex flex-wrap gap-6 text-sm">
          <NuxtLink to="#" class="hover:text-primary transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="#" class="hover:text-primary transition-colors">Terms of Service</NuxtLink>
          <NuxtLink to="#" class="hover:text-primary transition-colors">Cookie Policy</NuxtLink>
        </div>
      </div>
    </UiContainer>
  </footer>
</template>
