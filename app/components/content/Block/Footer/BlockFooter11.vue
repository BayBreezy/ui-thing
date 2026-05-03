<template>
  <footer class="border-t">
    <UiContainer class="py-12 lg:py-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Left Section - Logo and Description -->
        <div class="lg:col-span-2">
          <NuxtLink to="#" class="mb-4 inline-flex items-center gap-3">
            <img
              src="/icon.png"
              fit="contain"
              alt="Company Logo"
              title="Company Logo"
              class="h-8 object-contain"
            />
            <span class="text-xl font-semibold">{{ COMPANY_NAME }}</span>
          </NuxtLink>
          <p class="text-muted-foreground mb-6 max-w-md">
            Building exceptional digital products that help businesses grow and succeed in the
            modern world.
          </p>
          <div class="flex flex-wrap gap-6">
            <NuxtLink
              v-for="item in ['About', 'Features', 'Pricing', 'Blog', 'Contact', 'Careers']"
              :key="item"
              class="hover:text-primary text-sm font-medium transition-colors"
              to="#"
            >
              {{ item }}
            </NuxtLink>
          </div>
        </div>

        <!-- Right Section - Social and Legal -->
        <div class="flex flex-col justify-between">
          <div>
            <p class="mb-3 text-sm font-semibold">Follow us</p>
            <div class="flex gap-3">
              <NuxtLink
                to="#"
                class="hover:border-primary hover:bg-primary/5 flex size-9 items-center justify-center rounded-md border transition-colors"
              >
                <Icon name="logos:facebook" class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="hover:border-primary hover:bg-primary/5 flex size-9 items-center justify-center rounded-md border transition-colors"
              >
                <Icon name="logos:twitter" class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="hover:border-primary hover:bg-primary/5 flex size-9 items-center justify-center rounded-md border transition-colors"
              >
                <Icon name="logos:linkedin-icon" class="size-4" />
              </NuxtLink>
              <NuxtLink
                to="#"
                class="hover:border-primary hover:bg-primary/5 flex size-9 items-center justify-center rounded-md border transition-colors"
              >
                <Icon name="ri:instagram-fill" class="size-4" />
              </NuxtLink>
            </div>
          </div>
          <div class="text-muted-foreground mt-6 flex flex-wrap gap-4 text-sm lg:mt-0">
            <NuxtLink to="#" class="hover:text-primary transition-colors">Privacy Policy</NuxtLink>
            <span>•</span>
            <NuxtLink to="#" class="hover:text-primary transition-colors"
              >Terms of Service</NuxtLink
            >
            <span>•</span>
            <NuxtLink to="#" class="hover:text-primary transition-colors">Cookies</NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t pt-6 lg:mt-12">
        <p class="text-muted-foreground text-center text-sm lg:text-left">
          &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
        </p>
      </div>
    </UiContainer>
  </footer>
</template>
