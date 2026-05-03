<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between border border-b-0">
        <p class="font-semibold">UI Thing</p>
        <nav class="hidden items-center gap-5 sm:flex">
          <NuxtLink
            v-for="l in ['Home', 'About', 'Contact', 'Projects']"
            :key="l"
            class="text-muted-foreground hover:text-foreground text-sm transition-colors"
            to="/"
            >{{ l }}</NuxtLink
          >
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
