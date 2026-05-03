<template>
  <div
    class="bg-background text-foreground relative min-h-screen overflow-hidden [--color-primary:#7c3aed] [--primary:#7c3aed] [--radius:8px] [--ring:#7c3aed]"
  >
    <!-- Subtle radial gradient background -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,color-mix(in_srgb,#7c3aed_14%,transparent),transparent_72%)]"
    />

    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="parentVariant"
    >
      <UiContainer
        class="relative z-10 flex min-h-screen flex-col items-center justify-center py-20 text-center"
      >
        <!-- Badge / pill label -->
        <Motion as-child :variants="childVariant">
          <UiBadge
            variant="outline"
            class="mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-[#7c3aed] opacity-75"
              />
              <span class="relative inline-flex size-2 rounded-full bg-[#7c3aed]" />
            </span>
            Now in public beta
          </UiBadge>
        </Motion>

        <!-- Headline -->
        <Motion as-child :variants="childVariant">
          <h1
            class="mx-auto mb-5 max-w-4xl text-4xl leading-tight font-bold tracking-tight lg:text-5xl xl:text-6xl xl:leading-[1.1]"
          >
            Ship products your users will
            <span
              class="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
              >absolutely love</span
            >
          </h1>
        </Motion>

        <!-- Supporting paragraph -->
        <Motion as-child :variants="childVariant">
          <p class="text-muted-foreground mx-auto max-w-2xl text-lg lg:text-xl">
            The all-in-one platform for modern product teams. Design, build, and iterate faster than
            ever — from first idea to production in days, not months.
          </p>
        </Motion>

        <!-- CTA buttons -->
        <Motion as-child :variants="childVariant">
          <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <UiButton size="lg" class="min-w-36">
              <Icon name="heroicons:rocket-launch" />
              Get Started Free
            </UiButton>
            <UiButton size="lg" variant="outline" class="min-w-36">
              <Icon name="heroicons:play-circle" />
              See a Demo
            </UiButton>
          </div>
        </Motion>

        <!-- Dashboard mockup placeholder -->
        <Motion as-child :variants="mockupVariant">
          <div
            class="border-border/60 bg-card mx-auto mt-16 w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
          >
            <!-- Browser chrome bar -->
            <div class="border-border/60 bg-muted/50 flex items-center gap-2 border-b px-4 py-3">
              <span class="size-3 rounded-full bg-red-400/80" />
              <span class="size-3 rounded-full bg-yellow-400/80" />
              <span class="size-3 rounded-full bg-green-400/80" />
              <div class="bg-muted ml-4 h-5 max-w-xs flex-1 rounded-md" />
            </div>

            <!-- Mockup body: sidebar + main -->
            <div class="divide-border/40 grid grid-cols-4 divide-x">
              <!-- Sidebar skeleton -->
              <div class="bg-muted/20 col-span-1 hidden flex-col gap-2 p-4 sm:flex">
                <div class="mb-3 h-7 w-24 rounded-md bg-[#7c3aed]/20" />
                <div class="h-4 w-full rounded bg-[#7c3aed]/25" />
                <div class="bg-muted h-4 w-4/5 rounded" />
                <div class="bg-muted h-4 w-full rounded" />
                <div class="bg-muted h-4 w-3/5 rounded" />
                <div class="bg-border/60 mt-4 h-px w-full" />
                <div class="bg-muted/60 mt-2 h-4 w-full rounded" />
                <div class="bg-muted/60 h-4 w-4/5 rounded" />
                <div class="bg-muted/60 h-4 w-full rounded" />
              </div>

              <!-- Main content skeleton -->
              <div class="col-span-4 flex flex-col gap-4 p-5 sm:col-span-3">
                <!-- KPI cards row -->
                <div class="grid grid-cols-3 gap-3">
                  <div class="border-border/60 bg-background rounded-xl border p-3 shadow-sm">
                    <div class="bg-muted mb-2 h-3 w-14 rounded" />
                    <div class="h-6 w-20 rounded bg-[#7c3aed]/20" />
                    <div class="mt-2 h-2 w-10 rounded bg-green-400/50" />
                  </div>
                  <div class="border-border/60 bg-background rounded-xl border p-3 shadow-sm">
                    <div class="bg-muted mb-2 h-3 w-14 rounded" />
                    <div class="h-6 w-20 rounded bg-violet-400/20" />
                    <div class="mt-2 h-2 w-10 rounded bg-violet-400/50" />
                  </div>
                  <div class="border-border/60 bg-background rounded-xl border p-3 shadow-sm">
                    <div class="bg-muted mb-2 h-3 w-14 rounded" />
                    <div class="h-6 w-20 rounded bg-pink-400/20" />
                    <div class="mt-2 h-2 w-10 rounded bg-pink-400/50" />
                  </div>
                </div>

                <!-- Bar chart placeholder -->
                <div class="border-border/60 bg-background rounded-xl border p-4 shadow-sm">
                  <div class="mb-4 flex items-center justify-between">
                    <div class="bg-muted h-4 w-28 rounded" />
                    <div class="bg-muted/60 h-4 w-16 rounded" />
                  </div>
                  <div class="flex h-28 items-end gap-1.5">
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/25" style="height: 45%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/35" style="height: 65%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/40" style="height: 50%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/50" style="height: 80%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/60" style="height: 60%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/70" style="height: 90%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]" style="height: 75%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/80" style="height: 85%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/60" style="height: 55%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/45" style="height: 70%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/55" style="height: 95%" />
                    <div class="flex-1 rounded-t-sm bg-[#7c3aed]/35" style="height: 65%" />
                  </div>
                </div>

                <!-- List rows placeholder -->
                <div class="border-border/60 bg-background rounded-xl border p-4 shadow-sm">
                  <div class="bg-muted mb-3 h-4 w-24 rounded" />
                  <div class="flex flex-col gap-2.5">
                    <div class="flex items-center gap-3">
                      <div class="size-6 rounded-full bg-[#7c3aed]/20" />
                      <div class="bg-muted h-3 flex-1 rounded" />
                      <div class="h-3 w-12 rounded bg-green-400/40" />
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="size-6 rounded-full bg-violet-400/20" />
                      <div class="bg-muted h-3 flex-1 rounded" />
                      <div class="bg-muted/60 h-3 w-12 rounded" />
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="size-6 rounded-full bg-pink-400/20" />
                      <div class="bg-muted h-3 flex-1 rounded" />
                      <div class="h-3 w-12 rounded bg-yellow-400/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </UiContainer>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.12),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 22,
      },
    },
  };

  const mockupVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 48, scale: 0.97 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 24,
        delay: 0.55,
      },
    },
  };
</script>
