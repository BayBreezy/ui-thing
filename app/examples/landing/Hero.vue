<template>
  <section class="relative container py-20 md:py-32">
    <div class="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
      <UiBadge variant="secondary" size="lg">
        <UiIcon name="lucide:sparkles" class="size-4" />
        <span>Introducing UI Thing v2</span>
      </UiBadge>

      <div class="space-y-4">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Build beautiful interfaces
          <span class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            in minutes
          </span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          A comprehensive component library built with Nuxt, Vue, and TailwindCSS. Copy, paste, and
          ship production-ready interfaces faster than ever.
        </p>
      </div>

      <div class="flex flex-col gap-4 sm:flex-row">
        <UiButton size="lg" to="/getting-started/setup">
          Get Started
          <UiIcon name="lucide:arrow-right" class="ml-2 size-4" />
        </UiButton>
        <UiButton size="lg" variant="outline" to="/components/button"> Browse Components </UiButton>
      </div>

      <div
        class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
      >
        <div class="flex items-center gap-2">
          <UiIcon name="lucide:check-circle-2" class="size-4 text-primary" />
          <span>60+ Components</span>
        </div>
        <div class="flex items-center gap-2">
          <UiIcon name="lucide:check-circle-2" class="size-4 text-primary" />
          <span>100+ Blocks</span>
        </div>
        <div class="flex items-center gap-2">
          <UiIcon name="lucide:check-circle-2" class="size-4 text-primary" />
          <span>Dark Mode</span>
        </div>
        <div class="flex items-center gap-2">
          <UiIcon name="lucide:check-circle-2" class="size-4 text-primary" />
          <span>TypeScript</span>
        </div>
      </div>
    </div>
  </section>
</template>
