<template>
  <header class="sticky top-0 border-b bg-background/80 backdrop-blur">
    <div class="container flex h-14 items-center">
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="text-lg font-bold">UI Thing</NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink to="/" class="text-foreground/60 transition-colors hover:text-foreground"
            >Components</NuxtLink
          >
          <NuxtLink
            to="/examples/cards"
            class="text-foreground/60 transition-colors hover:text-foreground"
            >Examples</NuxtLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>
