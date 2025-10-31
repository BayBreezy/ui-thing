<template>
  <div>
    <div class="flex flex-col items-center justify-center text-center">
      <h1 class="text-3xl font-bold tracking-tighter lg:text-4xl">
        Build your <span class="text-brand-nuxt">Nuxt</span> applications with ease
      </h1>
      <p class="mt-2 text-center text-lg text-pretty text-muted-foreground">
        Awesome components that you can copy and paste into your Nuxt applications.
      </p>
      <div class="mt-6 grid w-full grid-cols-1 gap-3 sm:flex sm:w-fit sm:items-center">
        <ui-button
          class="[--primary:var(--color-brand-nuxt)] [--ring:var(--color-brand-nuxt)]"
          to="/getting-started/introduction"
          >Get Started</ui-button
        >
        <ui-button
          external
          href="https://github.com/BayBreezy/ui-thing"
          target="_blank"
          variant="outline"
          >Github</ui-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
