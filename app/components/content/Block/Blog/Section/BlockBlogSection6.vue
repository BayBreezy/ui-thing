<template>
  <!-- 
    Newsletter-integrated blog section with subscription card
    Features: Blog cards with stats, inline newsletter signup, animated badge
  -->
  <DefineCard>
    <UiCard class="group overflow-hidden py-0 shadow-xs transition-all">
      <div class="relative overflow-hidden">
        <img
          :src="image"
          :alt="alt"
          class="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <UiCardContent class="space-y-3 pb-5">
        <div class="flex items-center gap-2">
          <UiBadge variant="secondary">{{ headline }}</UiBadge>
          <UiSeparator orientation="vertical" class="h-4" />
          <span class="text-muted-foreground text-xs">5 min read</span>
        </div>
        <NuxtLink :to="link">
          <h4 class="hover:text-primary text-lg font-semibold transition-colors">
            {{ title }}
          </h4>
        </NuxtLink>
        <p class="text-muted-foreground line-clamp-2 text-sm">{{ description }}</p>
        <UiDivider />
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UiAvatar :src="userImage" :alt="userName" size="xs" />
            <span class="text-xs font-medium">{{ userName }}</span>
          </div>
          <div class="text-muted-foreground flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1">
              <Icon name="lucide:heart" class="h-3 w-3" />
              124
            </span>
            <span class="flex items-center gap-1">
              <Icon name="lucide:message-circle" class="h-3 w-3" />
              12
            </span>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </DefineCard>
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
      <!-- Centered header -->
      <div class="mx-auto max-w-3xl text-center">
        <Motion
          :variants="childVariant"
          as="div"
          class="bg-primary/10 mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <Motion
            :variants="{
              initial: { scale: 1 },
              animate: {
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              },
            }"
            class="bg-primary h-2 w-2 rounded-full"
          ></Motion>
          <span class="text-primary text-sm font-semibold">Weekly updates</span>
        </Motion>
        <Motion as="h3" :variants="childVariant" class="mb-3 text-3xl font-semibold lg:text-4xl">
          Stories worth reading
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-muted-foreground text-lg lg:text-xl">
          Expert insights and practical tips for modern teams
        </Motion>
      </div>

      <!-- Grid with newsletter card -->
      <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        <!-- Blog cards -->
        <Motion v-for="item in 2" :key="item" :variants="childVariant">
          <BlogCard />
        </Motion>

        <!-- Newsletter signup card -->
        <Motion :variants="childVariant">
          <UiCard class="border-primary/30 relative h-full overflow-hidden border-2 border-dashed">
            <div
              class="from-primary/20 absolute top-0 right-0 h-32 w-32 bg-linear-to-br to-transparent blur-3xl"
            ></div>
            <UiCardContent class="relative flex h-full flex-col justify-center p-6 text-center">
              <Motion
                :variants="{
                  initial: { scale: 1, rotate: 0 },
                  animate: {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop',
                    },
                  },
                }"
                class="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <Icon name="lucide:mail" class="text-primary h-8 w-8" />
              </Motion>
              <h4 class="mb-2 text-lg font-semibold">Never miss a post</h4>
              <p class="text-muted-foreground mb-4 text-sm">
                Get the latest articles delivered to your inbox weekly
              </p>
              <UiInput placeholder="Enter your email" class="mb-3" />
              <UiButton class="w-full">Subscribe now</UiButton>
              <p class="text-muted-foreground mt-3 text-xs">Join 10,000+ subscribers</p>
            </UiCardContent>
          </UiCard>
        </Motion>

        <!-- More blog cards -->
        <Motion v-for="item in 3" :key="`extra-${item}`" :variants="childVariant">
          <BlogCard />
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

  const [DefineCard, BlogCard] = createReusableTemplate();

  const headline = "Product";
  const title = "Building better products with user feedback";
  const image =
    "https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=1974&auto=format&fit=crop";
  const alt = "Product development";
  const description =
    "Discover how continuous user feedback shapes product development and drives innovation.";
  const userImage = "https://i.pravatar.cc/300?img=25";
  const userName = "Maria Garcia";
  const link = "#";
</script>
