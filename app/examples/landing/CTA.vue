<template>
  <section class="container py-20 md:py-32">
    <UiCard
      class="border-primary/20 from-primary/10 via-primary/5 to-background relative overflow-hidden bg-gradient-to-br"
    >
      <div
        class="bg-primary/20 absolute top-0 right-0 size-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />
      <div
        class="absolute bottom-0 left-0 size-64 translate-x-[-50%] translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl"
      />

      <UiCardContent class="relative flex flex-col items-center gap-8 py-16 text-center md:py-24">
        <div class="space-y-4">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to build something amazing?
          </h2>
          <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join thousands of developers building beautiful interfaces with UI Thing. Start your
            project today and ship faster than ever.
          </p>
        </div>

        <div class="flex flex-col gap-4 sm:flex-row">
          <UiButton size="lg" to="/getting-started/setup">
            Get Started for Free
            <UiIcon name="lucide:arrow-right" class="ml-2 size-4" />
          </UiButton>
          <UiButton
            size="lg"
            variant="outline"
            to="https://github.com/BayBreezy/ui-thing"
            target="_blank"
          >
            <UiIcon name="lucide:github" class="mr-2 size-4" />
            View on GitHub
          </UiButton>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-8 pt-4">
          <div class="text-center">
            <div class="text-3xl font-bold">60+</div>
            <div class="text-muted-foreground text-sm">Components</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">100+</div>
            <div class="text-muted-foreground text-sm">Blocks</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">10K+</div>
            <div class="text-muted-foreground text-sm">Developers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">100%</div>
            <div class="text-muted-foreground text-sm">Open Source</div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </section>
</template>
