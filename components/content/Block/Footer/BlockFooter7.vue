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

    <p class="text-muted-foreground">
      &copy; {{ new Date().getFullYear() }} {{ COMPANY_NAME }}. All rights reserved.
    </p>
  </UiContainer>
</template>

<script lang="ts" setup></script>
