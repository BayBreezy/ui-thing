<template>
  <Motion
    initial="initial"
    while-in-view="animate"
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
    <div
      class="overflow-hidden rounded-2xl border-2 bg-background shadow-md transition-all hover:border-primary/50 hover:shadow-xl"
    >
      <div class="flex flex-col md:flex-row">
        <Motion
          as-child
          :variants="{
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
          }"
          class="md:w-2/5"
        >
          <NuxtLink :to="link" class="relative block overflow-hidden">
            <img
              v-if="image"
              :src="image"
              :alt="alt"
              class="h-[200px] w-full object-cover transition-transform duration-500 hover:scale-110 md:h-full"
            />
            <Motion
              :variants="{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: 0.3 } },
              }"
              class="absolute bottom-3 left-3"
            >
              <UiBadge variant="default" class="shadow-lg">
                <Icon name="lucide:bookmark" class="size-3" />
                {{ headline }}
              </UiBadge>
            </Motion>
          </NuxtLink>
        </Motion>

        <div class="flex flex-1 flex-col justify-between p-6 md:w-3/5">
          <div>
            <Motion
              as="div"
              :variants="{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
              }"
              class="mb-3 flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Icon name="lucide:calendar" class="size-3.5" />
              <span>{{ date }}</span>
              <span class="mx-1">•</span>
              <Icon name="lucide:clock" class="size-3.5" />
              <span>{{ readTime }}</span>
            </Motion>

            <Motion as-child :variants="childVariant">
              <NuxtLink :to="link">
                <h3 class="mb-3 text-2xl font-bold transition-colors hover:text-primary">
                  {{ title }}
                </h3>
              </NuxtLink>
            </Motion>

            <Motion
              v-if="description"
              as="p"
              :variants="childVariant"
              class="mb-4 line-clamp-2 text-muted-foreground"
            >
              {{ description }}
            </Motion>
          </div>

          <Motion :variants="childVariant" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UiAvatar v-if="userImage" :src="userImage" :alt="userName" class="size-9" />
              <span v-if="userName" class="text-sm font-medium">{{ userName }}</span>
            </div>
            <NuxtLink :to="link">
              <UiButton size="sm" variant="ghost" class="group">
                Read more
                <Icon
                  name="lucide:chevron-right"
                  class="size-4 transition-transform group-hover:translate-x-1"
                />
              </UiButton>
            </NuxtLink>
          </Motion>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  withDefaults(
    defineProps<{
      image?: string;
      alt?: string;
      headline?: string;
      description?: string;
      title?: string;
      userImage?: string;
      userName?: string;
      date?: string;
      readTime?: string;
      link?: string;
    }>(),
    {
      headline: "Featured",
      title: "Building Scalable Design Systems",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
      alt: "Building Scalable Design Systems",
      description:
        "Learn how to create and maintain a design system that scales with your organization and keeps your team aligned.",
      date: "22 Mar 2024",
      userImage: "https://i.pravatar.cc/300?img=8",
      userName: "Michael Rodriguez",
      readTime: "12 min read",
      link: "#",
    }
  );
</script>
