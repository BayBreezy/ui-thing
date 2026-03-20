<template>
  <!-- 
    Interactive error page with search
    Features: Inline search, recent pages, quick actions
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
          delayChildren: stagger(0.12),
        },
      },
    }"
  >
    <div class="flex min-h-screen items-center">
      <div class="container max-w-3xl py-16">
        <Motion as="div" :variants="childVariant" class="mb-10 text-center">
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5"
          >
            <Icon name="lucide:alert-circle" class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium text-primary">Error {{ statusCode }}</span>
          </div>
          <h1 class="mb-3 text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
          <p class="text-muted-foreground">
            We couldn't find what you're looking for. Try searching or explore our popular pages
            below.
          </p>
        </Motion>

        <Motion as-child :variants="childVariant">
          <UiCard class="mb-8">
            <UiCardHeader>
              <UiCardTitle class="text-lg">Search for what you need</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div class="relative">
                <Icon
                  name="lucide:search"
                  class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <UiInput
                  v-model="searchQuery"
                  placeholder="Search documentation, guides, articles..."
                  class="pl-10"
                />
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>

        <Motion as="div" :variants="childVariant" class="mb-8">
          <h2 class="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Popular Pages
          </h2>
          <div class="grid gap-3 sm:grid-cols-2">
            <Motion v-for="(page, i) in popularPages" :key="i" :variants="childVariant">
              <UiCard
                class="group cursor-pointer transition-shadow hover:shadow-md"
                @click="clearError({ redirect: page.href })"
              >
                <UiCardHeader>
                  <div class="flex items-start justify-between">
                    <div class="flex items-center gap-3">
                      <div class="rounded-lg bg-primary/10 p-2">
                        <Icon :name="page.icon" class="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <UiCardTitle class="text-base">{{ page.title }}</UiCardTitle>
                        <UiCardDescription class="text-sm">{{
                          page.description
                        }}</UiCardDescription>
                      </div>
                    </div>
                    <Icon
                      name="lucide:arrow-right"
                      class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </UiCardHeader>
              </UiCard>
            </Motion>
          </div>
        </Motion>

        <Motion as="div" :variants="childVariant" class="flex justify-center">
          <UiButton variant="outline" @click="clearError({ redirect: '#' })">
            <Icon name="lucide:home" class="mr-2 h-4 w-4" />
            Back to Homepage
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
    initial: { opacity: 0, y: 15 },
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
      message: "Page Not Found",
      data: undefined,
      cause: undefined,
    }
  );

  const title = computed(() => {
    if (!props.message) return "Error";
    return props.message;
  });

  useSeoMeta({ title });

  const searchQuery = ref("");

  const popularPages = [
    {
      icon: "lucide:book-open",
      title: "Documentation",
      description: "Complete guides and references",
      href: "#",
    },
    {
      icon: "lucide:rocket",
      title: "Getting Started",
      description: "Quick start tutorials",
      href: "#",
    },
    {
      icon: "lucide:puzzle",
      title: "Components",
      description: "UI component library",
      href: "#",
    },
    {
      icon: "lucide:life-buoy",
      title: "Support",
      description: "Get help from our team",
      href: "#",
    },
  ];
</script>
