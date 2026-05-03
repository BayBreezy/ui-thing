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
      class="group bg-background hover:border-primary/50 overflow-hidden rounded-xl border transition-all hover:shadow-xl"
    >
      <div class="relative">
        <Motion
          as-child
          :variants="{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.5 } },
          }"
        >
          <NuxtLink :to="link" class="group/img relative block">
            <Motion
              :variants="{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 0.5 } },
              }"
              class="relative overflow-hidden"
            >
              <img
                v-if="image"
                :src="image"
                :alt="alt"
                class="h-[200px] w-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Motion>

            <Motion
              :variants="{
                initial: { scale: 0, rotate: -180 },
                animate: {
                  scale: 1,
                  rotate: 0,
                  transition: { delay: 0.3, type: 'spring', stiffness: 200, damping: 15 },
                },
              }"
              class="bg-background absolute top-4 right-4 flex size-10 items-center justify-center rounded-full shadow-lg group-hover/img:scale-110"
            >
              <Icon name="lucide:arrow-up-right" class="text-primary size-5" />
            </Motion>
          </NuxtLink>
        </Motion>
      </div>

      <div class="p-5">
        <div class="mb-4 flex items-center justify-between">
          <Motion
            v-if="headline"
            as-child
            :variants="{
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiBadge variant="outline" class="text-primary text-xs font-semibold">
              {{ headline }}
            </UiBadge>
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, x: 10 },
              animate: { opacity: 1, x: 0 },
            }"
            class="text-muted-foreground flex items-center gap-1 text-xs"
          >
            <Icon name="lucide:clock" class="size-3.5" />
            <span>{{ readTime }}</span>
          </Motion>
        </div>

        <Motion as-child :variants="childVariant">
          <NuxtLink :to="link">
            <h3
              class="hover:text-primary mb-2 text-lg leading-tight font-bold transition-colors lg:text-xl"
            >
              {{ title }}
            </h3>
          </NuxtLink>
        </Motion>

        <Motion
          v-if="description"
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mb-4 line-clamp-3 text-sm"
        >
          {{ description }}
        </Motion>

        <Motion :variants="childVariant">
          <UiDivider class="my-4" />
        </Motion>

        <Motion :variants="childVariant" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UiAvatar v-if="userImage" :src="userImage" :alt="userName" size="sm" />
            <div class="flex flex-col">
              <span v-if="userName" class="text-xs font-semibold">{{ userName }}</span>
              <span v-if="date" class="text-muted-foreground text-xs">{{ date }}</span>
            </div>
          </div>
          <div class="text-muted-foreground flex items-center gap-3 text-xs">
            <div class="flex items-center gap-1">
              <Icon name="lucide:heart" class="size-3.5" />
              <span>{{ likes }}</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lucide:bookmark" class="size-3.5" />
              <span>{{ bookmarks }}</span>
            </div>
          </div>
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
      likes?: string;
      bookmarks?: string;
      link?: string;
    }>(),
    {
      headline: "Development",
      title: "Modern JavaScript Patterns You Should Know",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
      alt: "Modern JavaScript Patterns",
      description:
        "Learn essential JavaScript design patterns that will make your code more maintainable and efficient in modern applications.",
      date: "10 May 2024",
      userImage: "https://i.pravatar.cc/300?img=18",
      userName: "Lisa Anderson",
      readTime: "10 min read",
      likes: "156",
      bookmarks: "89",
      link: "#",
    }
  );
</script>
