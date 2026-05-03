<template>
  <footer class="bg-slate-900 text-slate-50">
    <UiContainer class="py-16 lg:py-24">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <!-- Product -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Product</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="item in ['Features', 'Integrations', 'Pricing', 'Changelog']" :key="item">
              <NuxtLink class="text-slate-400 transition-colors hover:text-white" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Resources</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="item in ['Blog', 'Newsletter', 'Events', 'Help center']" :key="item">
              <NuxtLink class="text-slate-400 transition-colors hover:text-white" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Company</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="item in ['About us', 'Careers', 'Press', 'Contact']" :key="item">
              <NuxtLink class="text-slate-400 transition-colors hover:text-white" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Legal</h3>
          <ul class="space-y-3 text-sm">
            <li v-for="item in ['Privacy', 'Terms', 'Cookie policy', 'Licenses']" :key="item">
              <NuxtLink class="text-slate-400 transition-colors hover:text-white" to="#">
                {{ item }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-span-2 md:col-span-3 lg:col-span-1">
          <h3 class="mb-4 text-sm font-semibold">Subscribe to our newsletter</h3>
          <p class="mb-4 text-sm text-slate-400">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form class="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              class="focus:border-primary focus:ring-primary rounded-md border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-400 focus:ring-2 focus:outline-none"
            />
            <UiButton size="sm" class="w-full">Subscribe</UiButton>
          </form>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 lg:mt-16 lg:flex-row"
      >
        <div class="flex items-center gap-3">
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-8 object-contain"
          />
          <span class="text-lg font-semibold">{{ COMPANY_NAME }}</span>
        </div>
        <p class="text-sm text-slate-400">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink to="#" class="opacity-70 transition-opacity hover:opacity-100">
            <Icon name="logos:facebook" class="size-5" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 transition-opacity hover:opacity-100">
            <Icon name="logos:twitter" class="size-5" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 transition-opacity hover:opacity-100">
            <Icon name="logos:linkedin-icon" class="size-5" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 transition-opacity hover:opacity-100">
            <Icon name="ri:github-fill" class="size-5" />
          </NuxtLink>
        </div>
      </div>
    </UiContainer>
  </footer>
</template>
