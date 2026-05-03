<template>
  <!-- 
    Magazine-style blog page with featured grid
    Features: Large featured post, mixed grid layout, statistics bar, author highlights
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <UiContainer class="py-16 lg:py-24">
      <!-- Header with stats -->
      <div
        class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center lg:mb-16"
      >
        <div>
          <Motion as="h1" :variants="childVariant" class="mb-2 text-4xl font-bold lg:text-5xl">
            The Magazine
          </Motion>
          <Motion as="p" :variants="childVariant" class="text-muted-foreground text-lg">
            Stories that matter. Ideas that inspire.
          </Motion>
        </div>

        <!-- Stats bar -->
        <Motion :variants="childVariant" class="flex gap-6">
          <div class="text-center">
            <p class="text-2xl font-bold">500+</p>
            <p class="text-muted-foreground text-sm">Articles</p>
          </div>
          <UiSeparator orientation="vertical" class="h-auto" />
          <div class="text-center">
            <p class="text-2xl font-bold">50K+</p>
            <p class="text-muted-foreground text-sm">Readers</p>
          </div>
          <UiSeparator orientation="vertical" class="h-auto" />
          <div class="text-center">
            <p class="text-2xl font-bold">100+</p>
            <p class="text-muted-foreground text-sm">Authors</p>
          </div>
        </Motion>
      </div>

      <!-- Featured section - Magazine grid layout -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <!-- Large featured post (left side) -->
        <Motion :variants="childVariant" class="lg:col-span-7">
          <UiCard
            class="group sticky top-0 overflow-hidden border-0 py-0 shadow-lg transition-shadow hover:shadow-xl"
          >
            <div class="relative overflow-hidden">
              <img
                :src="image"
                :alt="alt"
                class="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-[500px]"
              />
              <div
                class="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent"
              ></div>
              <div class="absolute right-0 bottom-0 left-0 p-6 lg:p-8">
                <UiBadge class="bg-primary text-primary-foreground mb-3">Featured</UiBadge>
                <NuxtLink :to="link">
                  <h2
                    class="hover:text-primary mb-3 text-2xl font-bold transition-colors lg:text-3xl"
                  >
                    {{ title }}
                  </h2>
                </NuxtLink>
                <p class="text-muted-foreground mb-4 line-clamp-2 lg:text-lg">{{ description }}</p>
                <div class="flex items-center gap-3">
                  <UiAvatar :src="userImage" :alt="userName" />
                  <div>
                    <p class="font-semibold">{{ userName }}</p>
                    <p class="text-muted-foreground text-sm">{{ date }} · 8 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </UiCard>
        </Motion>

        <!-- Sidebar posts (right side) -->
        <div class="space-y-6 lg:col-span-5">
          <Motion :variants="childVariant">
            <h3 class="mb-4 text-xl font-semibold">Trending now</h3>
          </Motion>

          <Motion
            v-for="n in 4"
            :key="n"
            :variants="childVariant"
            :transition="{
              delay: n * 0.05,
            }"
          >
            <UiCard class="group overflow-hidden p-2 transition-all hover:shadow-md">
              <div class="flex gap-4">
                <img
                  :src="image"
                  :alt="alt"
                  class="h-24 w-24 shrink-0 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div class="min-w-0 flex-1">
                  <UiBadge variant="secondary" size="sm" class="mb-2">{{ headline }}</UiBadge>
                  <NuxtLink :to="link" class="block">
                    <h4
                      class="hover:text-primary mb-1 line-clamp-2 font-semibold transition-colors"
                    >
                      {{ title }}
                    </h4>
                  </NuxtLink>
                  <p class="text-muted-foreground text-xs">{{ date }} · 5 min</p>
                </div>
              </div>
            </UiCard>
          </Motion>
        </div>
      </div>

      <!-- Latest articles grid -->
      <Motion :variants="childVariant" class="mt-16 lg:mt-24">
        <div class="mb-8 flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Latest articles</h2>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline" size="sm">
                Sort by
                <Icon name="lucide:chevron-down" class="ml-2 h-4 w-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent>
              <UiDropdownMenuItem>Most recent</UiDropdownMenuItem>
              <UiDropdownMenuItem>Most popular</UiDropdownMenuItem>
              <UiDropdownMenuItem>Trending</UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </Motion>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="n in 6"
          :key="n"
          :variants="childVariant"
          :transition="{
            delay: n * 0.05,
          }"
        >
          <UiCard
            class="group h-full overflow-hidden py-0 shadow-xs transition-all hover:shadow-lg"
          >
            <div class="relative overflow-hidden">
              <img
                :src="image"
                :alt="alt"
                class="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <UiCardContent class="p-6 pt-0">
              <UiBadge variant="outline" size="sm" class="mb-3">{{ headline }}</UiBadge>
              <NuxtLink :to="link">
                <h4 class="hover:text-primary mb-2 font-semibold transition-colors">
                  {{ title }}
                </h4>
              </NuxtLink>
              <p class="text-muted-foreground mb-4 line-clamp-2 text-sm">{{ description }}</p>
              <div class="flex items-center gap-2">
                <UiAvatar :src="userImage" :alt="userName" size="xs" />
                <span class="text-xs font-medium">{{ userName }}</span>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const headline = "Technology";
  const title = "Building the future of digital products";
  const image =
    "https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=1974&auto=format&fit=crop";
  const alt = "Digital products";
  const description =
    "Discover how modern teams are leveraging cutting-edge technology to create exceptional digital experiences.";
  const date = "Apr 20, 2024";
  const userImage = "https://i.pravatar.cc/300?img=25";
  const userName = "Michael Rodriguez";
  const link = "#";
</script>
