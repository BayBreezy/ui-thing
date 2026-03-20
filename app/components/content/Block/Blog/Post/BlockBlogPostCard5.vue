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
          delayChildren: stagger(0.12),
        },
      },
    }"
  >
    <div
      class="group relative overflow-hidden rounded-xl border bg-background shadow-lg transition-all hover:shadow-xl"
    >
      <Motion
        as-child
        :variants="{
          initial: { opacity: 0, scale: 1.1 },
          animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }"
        class="block"
      >
        <NuxtLink :to="link" class="relative block overflow-hidden">
          <img
            v-if="image"
            :src="image"
            :alt="alt"
            class="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
        </NuxtLink>
      </Motion>

      <div class="p-6">
        <div class="mb-3 flex items-center gap-2">
          <Motion
            v-if="headline"
            as-child
            :variants="{
              initial: { opacity: 0, scale: 0 },
              animate: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              },
            }"
          >
            <UiBadge variant="secondary" class="text-xs">
              {{ headline }}
            </UiBadge>
          </Motion>
          <Motion
            v-if="readTime"
            as="span"
            :variants="{
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
            }"
            class="text-xs text-muted-foreground"
          >
            {{ readTime }}
          </Motion>
        </div>

        <Motion as-child :variants="childVariant">
          <NuxtLink :to="link">
            <h3 class="mb-3 text-xl font-bold transition-colors hover:text-primary lg:text-2xl">
              {{ title }}
            </h3>
          </NuxtLink>
        </Motion>

        <Motion
          v-if="description"
          as="p"
          :variants="childVariant"
          class="mb-5 line-clamp-3 text-ellipsis text-muted-foreground"
        >
          {{ description }}
        </Motion>

        <Motion :variants="childVariant" class="flex items-center justify-between">
          <div class="flex items-center">
            <UiAvatar
              v-if="userImage"
              :src="userImage"
              :alt="userName"
              class="mr-3 size-10 ring-2 ring-background"
            />
            <div>
              <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
              <p v-if="date" class="text-xs text-muted-foreground">{{ date }}</p>
            </div>
          </div>
          <Icon
            name="lucide:arrow-right"
            class="size-5 text-muted-foreground transition-transform group-hover:translate-x-1"
          />
        </Motion>
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
      headline: "Technology",
      title: "The Future of Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      alt: "The Future of Web Development",
      description:
        "Explore the latest trends and technologies shaping the future of web development and how they impact our digital experiences.",
      date: "15 Feb 2024",
      userImage: "https://i.pravatar.cc/300?img=12",
      userName: "Sarah Chen",
      readTime: "8 min read",
      link: "#",
    }
  );
</script>
