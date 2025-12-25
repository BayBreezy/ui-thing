<template>
  <!-- 
    Dark theme blog page with gradient accents
    Features: Gradient header, author spotlight, card hover effects, dark aesthetic
  -->
  <Motion
    initial="initial"
    in-view="animate"
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
    <div class="min-h-screen bg-background py-16 lg:py-24">
      <!-- Gradient header section -->
      <Motion
        :variants="childVariant"
        class="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:p-16"
      >
        <UiContainer>
          <div class="relative z-10">
            <Motion
              as="div"
              :variants="{
                initial: { scale: 1 },
                animate: {
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop',
                  },
                },
              }"
              class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
            ></Motion>
            <Motion
              as="div"
              :variants="{
                initial: { scale: 1 },
                animate: {
                  scale: [1, 1.3, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'loop',
                  },
                },
              }"
              class="absolute bottom-0 -left-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
            ></Motion>

            <div class="relative text-center">
              <h1 class="mb-4 text-4xl font-bold lg:text-6xl">Insights & Stories</h1>
              <p class="mx-auto max-w-2xl text-lg text-muted-foreground lg:text-xl">
                Exploring ideas at the intersection of technology, design, and human experience
              </p>
            </div>
          </div>
        </UiContainer>
      </Motion>

      <UiContainer class="mt-16 lg:mt-24">
        <!-- Featured authors section -->
        <Motion :variants="childVariant" class="mb-12">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-semibold">Featured authors</h2>
            <UiButton variant="ghost" size="sm">View all</UiButton>
          </div>

          <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            <Motion
              v-for="n in 4"
              :key="n"
              :variants="{
                initial: { opacity: 0, scale: 0.9 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: n * 0.05,
                  },
                },
              }"
            >
              <UiCard
                class="group cursor-pointer overflow-hidden pb-0 transition-all hover:shadow-lg"
              >
                <UiCardContent class="p-6 pt-0 text-center">
                  <UiAvatar :src="userImage" :alt="userName" size="lg" class="mx-auto mb-3" />
                  <p class="mb-1 font-semibold">{{ userName }}</p>
                  <p class="mb-2 text-xs text-muted-foreground">{{ n * 12 }} articles</p>
                  <UiButton size="sm" variant="outline" class="w-full">Follow</UiButton>
                </UiCardContent>
              </UiCard>
            </Motion>
          </div>
        </Motion>

        <!-- Filter tabs with gradient indicator -->
        <Motion :variants="childVariant" class="mb-8">
          <UiTabs default-value="all">
            <UiTabsList class="w-fit justify-start overflow-x-auto">
              <UiTabsTrigger value="all">All posts</UiTabsTrigger>
              <UiTabsTrigger value="tech">Technology</UiTabsTrigger>
              <UiTabsTrigger value="design">Design</UiTabsTrigger>
              <UiTabsTrigger value="business">Business</UiTabsTrigger>
              <UiTabsTrigger value="culture">Culture</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </Motion>

        <!-- Articles grid with enhanced cards -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Motion
            v-for="n in 9"
            :key="n"
            :variants="childVariant"
            :transition="{
              delay: n * 0.05,
            }"
          >
            <UiCard
              class="group h-full overflow-hidden border-0 bg-muted/30 py-0 shadow transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="image"
                  :alt="alt"
                  class="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                ></div>

                <!-- Hover overlay with action button -->
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <UiButton size="sm" class="shadow-lg">
                    Read article
                    <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
                  </UiButton>
                </div>
              </div>

              <UiCardContent class="p-6 pt-0">
                <div class="mb-3 flex items-center gap-2">
                  <UiBadge variant="secondary" size="sm">{{ headline }}</UiBadge>
                  <span class="text-xs text-muted-foreground">· 6 min read</span>
                </div>

                <NuxtLink :to="link">
                  <h3
                    class="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary"
                  >
                    {{ title }}
                  </h3>
                </NuxtLink>

                <p class="mb-4 line-clamp-2 text-sm text-muted-foreground">{{ description }}</p>

                <UiDivider class="my-4" />

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <UiAvatar :src="userImage" :alt="userName" size="xs" />
                    <span class="text-xs font-medium">{{ userName }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-xs text-muted-foreground">
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:heart" class="h-3.5 w-3.5" />
                      {{ n * 42 }}
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:message-circle" class="h-3.5 w-3.5" />
                      {{ n * 8 }}
                    </span>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>
        </div>

        <!-- Pagination -->
        <Motion :variants="childVariant" class="mt-12 flex justify-center gap-2">
          <UiPagination :items-per-page="5" :total="20" />
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

  const headline = "Innovation";
  const title = "The art of building products people love";
  const image =
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop";
  const alt = "Product design";
  const description =
    "Understanding the principles and practices that drive successful product development in the modern era.";
  const userImage = "https://i.pravatar.cc/300?img=30";
  const userName = "Sarah Williams";
  const link = "#";
</script>
