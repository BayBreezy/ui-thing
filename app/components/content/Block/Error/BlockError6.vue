<template>
  <!-- 
    Error page with helpful suggestions carousel
    Features: Swiper carousel, helpful links, search suggestion
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <div class="relative flex min-h-screen items-center">
      <div
        class="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[20px_20px]"
      />
      <div class="relative z-1 container max-w-4xl">
        <Motion as="div" :variants="childVariant" class="text-center">
          <p class="mb-3 text-6xl font-bold text-primary lg:text-8xl">{{ statusCode }}</p>
          <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">{{ title }}</h1>
        </Motion>

        <Motion as="div" :variants="childVariant" class="mt-8">
          <p class="mb-4 text-center text-sm font-medium text-muted-foreground">
            Here are some helpful resources:
          </p>
          <swiper-container
            :autoplay="{ delay: 3500 }"
            :speed="800"
            loop
            grab-cursor
            :slides-per-view="1"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }"
            class="pb-2!"
          >
            <swiper-slide v-for="(item, i) in suggestions" :key="i">
              <UiCard class="h-full transition-shadow hover:shadow-lg">
                <UiCardHeader class="flex flex-col">
                  <div class="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon :name="item.icon" class="h-5 w-5 text-primary" />
                  </div>
                  <UiCardTitle class="text-lg">{{ item.title }}</UiCardTitle>
                  <UiCardDescription>{{ item.description }}</UiCardDescription>
                </UiCardHeader>
                <UiCardFooter>
                  <UiButton variant="ghost" size="sm" as="a" :href="item.href" class="w-full">
                    {{ item.action }}
                    <Icon name="lucide:arrow-right" class="ml-2 h-3 w-3" />
                  </UiButton>
                </UiCardFooter>
              </UiCard>
            </swiper-slide>
          </swiper-container>
        </Motion>

        <Motion :variants="childVariant">
          <UiButton class="mt-8 w-full sm:w-auto" @click="clearError({ redirect: '#' })">
            <Icon name="lucide:home" class="mr-2 h-4 w-4" />
            Return to Homepage
          </UiButton>
        </Motion>
      </div>
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

  const props = withDefaults(
    defineProps<{
      statusCode?: number;
      fatal?: boolean;
      unhandled?: boolean;
      statusMessage?: string;
      message?: string;
      data?: unknown;
      cause?: unknown;
    }>(),
    {
      statusCode: 404,
      fatal: false,
      unhandled: false,
      statusMessage: "",
      message: "We can't find this page",
      data: undefined,
      cause: undefined,
    }
  );

  const title = computed(() => {
    if (!props.message) return "Error";
    return props.message;
  });

  useSeoMeta({ title });

  const suggestions = [
    {
      icon: "lucide:book-open",
      title: "Documentation",
      description: "Browse our comprehensive guides and API reference",
      action: "View Docs",
      href: "#",
    },
    {
      icon: "lucide:message-circle",
      title: "Get Help",
      description: "Contact our support team for assistance",
      action: "Contact Us",
      href: "#",
    },
    {
      icon: "lucide:search",
      title: "Search",
      description: "Find what you're looking for across the site",
      action: "Start Search",
      href: "#",
    },
    {
      icon: "lucide:compass",
      title: "Explore",
      description: "Discover popular pages and features",
      action: "Browse All",
      href: "#",
    },
  ];
</script>
