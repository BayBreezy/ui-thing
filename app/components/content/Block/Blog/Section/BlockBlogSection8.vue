<template>
  <!-- 
    Compact blog section with horizontal scroll on mobile
    Features: Scrollable cards, gradient fade edges, view counter, bookmark action
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
    <div class="overflow-hidden py-16 lg:py-24">
      <UiContainer>
        <!-- Header -->
        <div class="mb-8 flex items-end justify-between lg:mb-12">
          <div>
            <Motion
              as="h3"
              :variants="childVariant"
              class="mb-2 text-3xl font-semibold lg:text-4xl"
            >
              Trending articles
            </Motion>
            <Motion as="p" :variants="childVariant" class="text-muted-foreground">
              Most popular posts this week
            </Motion>
          </div>
          <Motion :variants="childVariant">
            <UiButton variant="ghost" class="hidden md:flex">
              View all
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </UiButton>
          </Motion>
        </div>
      </UiContainer>

      <!-- Scrollable container -->
      <Motion :variants="childVariant" class="relative">
        <!-- Gradient fade on edges (desktop only) -->
        <div
          class="from-background pointer-events-none absolute top-0 left-0 z-10 hidden h-full w-20 bg-linear-to-r to-transparent lg:block"
        ></div>
        <div
          class="from-background pointer-events-none absolute top-0 right-0 z-10 hidden h-full w-20 bg-linear-to-l to-transparent lg:block"
        ></div>

        <!-- Horizontal scroll -->
        <UiScrollArea orientation="horizontal" class="w-full whitespace-nowrap">
          <div class="flex gap-6 px-4 pb-4 lg:px-12">
            <Motion
              v-for="item in 6"
              :key="item"
              :variants="{
                initial: { opacity: 0, scale: 0.9 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: item * 0.05,
                  },
                },
              }"
              class="inline-block w-[320px] shrink-0 lg:w-[380px]"
            >
              <UiCard class="group h-full overflow-hidden py-0 transition-all hover:shadow-xl">
                <!-- Image with overlay badge -->
                <div class="relative overflow-hidden">
                  <img
                    :src="image"
                    :alt="alt"
                    class="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    class="from-background/90 via-background/40 absolute inset-0 bg-linear-to-t to-transparent"
                  ></div>

                  <!-- Trending badge -->
                  <div
                    class="bg-background/90 absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm"
                  >
                    <Motion
                      :variants="{
                        initial: {},
                        animate: {
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        },
                      }"
                    >
                      <Icon name="lucide:trending-up" class="text-primary h-4 w-4" />
                    </Motion>
                    <span class="text-xs font-semibold">Trending</span>
                  </div>

                  <!-- Stats overlay -->
                  <div class="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                    <div class="text-foreground flex items-center gap-3 text-xs">
                      <span class="flex items-center gap-1">
                        <Icon name="lucide:eye" class="h-3.5 w-3.5" />
                        2.4k
                      </span>
                      <span class="flex items-center gap-1">
                        <Icon name="lucide:clock" class="h-3.5 w-3.5" />
                        5 min
                      </span>
                    </div>
                    <UiButton
                      size="icon"
                      variant="secondary"
                      class="h-7 w-7 rounded-full shadow-lg"
                    >
                      <Icon name="lucide:bookmark" class="h-3.5 w-3.5" />
                    </UiButton>
                  </div>
                </div>

                <!-- Content -->
                <UiCardContent class="space-y-3 pb-5">
                  <UiBadge variant="outline" size="sm">{{ headline }}</UiBadge>
                  <NuxtLink :to="link" class="block">
                    <h4
                      class="hover:text-primary line-clamp-2 text-lg font-semibold transition-colors"
                    >
                      {{ title }}
                    </h4>
                  </NuxtLink>
                  <p class="text-muted-foreground line-clamp-2 text-sm">{{ description }}</p>
                  <UiDivider class="my-3!" />
                  <div class="flex items-center gap-2">
                    <UiAvatar :src="userImage" :alt="userName" size="xs" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-xs font-medium">{{ userName }}</p>
                      <p class="text-muted-foreground text-xs">{{ date }}</p>
                    </div>
                  </div>
                </UiCardContent>
              </UiCard>
            </Motion>
          </div>
        </UiScrollArea>
      </Motion>

      <!-- Mobile view all button -->
      <UiContainer>
        <Motion :variants="childVariant" class="mt-6 md:hidden">
          <UiButton variant="outline" class="w-full">
            View all articles
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </UiButton>
        </Motion>
      </UiContainer>
    </div>
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

  const headline = "Tutorial";
  const title = "Getting started with modern web development";
  const image =
    "https://images.unsplash.com/photo-1627637820550-423ab938955c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=3132";
  const alt = "Web development";
  const description =
    "A comprehensive guide to building modern web applications with the latest tools and frameworks.";
  const date = "May 8, 2024";
  const userImage = "https://i.pravatar.cc/300?img=35";
  const userName = "Emma Wilson";
  const link = "#";
</script>
