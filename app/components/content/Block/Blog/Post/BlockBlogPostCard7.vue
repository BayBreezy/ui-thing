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
      class="group relative overflow-hidden rounded-xl bg-linear-to-br from-violet-500 via-pink-500/50 to-orange-500/50 p-0.5"
    >
      <div class="overflow-hidden rounded-lg bg-background">
        <Motion
          as-child
          :variants="{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }"
        >
          <NuxtLink :to="link" class="relative block overflow-hidden rounded-t-lg">
            <img
              v-if="image"
              :src="image"
              :alt="alt"
              class="h-[240px] w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
            />
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100"
            >
              <Motion
                :initial="{ scale: 0 }"
                :animate="{ scale: 1 }"
                :transition="{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }"
                class="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
              >
                <Icon name="lucide:arrow-right" class="size-6" />
              </Motion>
            </div>
          </NuxtLink>
        </Motion>

        <div class="p-5">
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <Motion
              v-for="(tag, i) in tags"
              :key="tag"
              as-child
              :variants="{
                initial: { opacity: 0, scale: 0 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 },
                },
              }"
            >
              <UiBadge variant="secondary" class="text-xs">
                {{ tag }}
              </UiBadge>
            </Motion>
          </div>

          <Motion as-child :variants="childVariant">
            <NuxtLink :to="link">
              <h3 class="mb-2 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
                {{ title }}
              </h3>
            </NuxtLink>
          </Motion>

          <Motion
            v-if="description"
            as="p"
            :variants="childVariant"
            class="mb-4 line-clamp-2 text-sm text-muted-foreground"
          >
            {{ description }}
          </Motion>

          <Motion :variants="childVariant" class="flex items-center justify-between border-t pt-4">
            <div class="flex items-center gap-3">
              <UiAvatar v-if="userImage" :src="userImage" :alt="userName" class="size-8" />
              <div>
                <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
                <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{{ date }}</span>
                  <span v-if="readTime">• {{ readTime }}</span>
                </div>
              </div>
            </div>
            <UiButton
              size="icon-sm"
              variant="ghost"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="lucide:bookmark" class="size-5" />
            </UiButton>
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
      description?: string;
      title?: string;
      userImage?: string;
      userName?: string;
      date?: string;
      readTime?: string;
      tags?: string[];
      link?: string;
    }>(),
    {
      title: "Mastering CSS Grid Layouts",
      image:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop",
      alt: "Mastering CSS Grid Layouts",
      description:
        "Deep dive into CSS Grid and learn how to create complex, responsive layouts with ease using modern techniques.",
      date: "5 Apr 2024",
      userImage: "https://i.pravatar.cc/300?img=22",
      userName: "Emma Wilson",
      readTime: "6 min read",
      tags: () => ["CSS", "Web Design", "Tutorial"],
      link: "#",
    }
  );
</script>
