<template>
  <!-- 
    Error page with helpful links
    Features: Grid pattern, quick navigation links, staggered animations
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
    <div class="relative flex min-h-screen items-center">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,--alpha(var(--color-border)/80%)_1px,transparent_1px),linear-gradient(to_bottom,--alpha(var(--color-border)/80%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_0%,#000_70%,transparent_110%)] bg-size-[60px_60px]"
      />
      <div class="relative z-1 container">
        <Motion as="p" :variants="childVariant" class="mb-5 font-bold tracking-tight text-primary">
          {{ statusCode }} error
        </Motion>
        <Motion
          as="h1"
          :variants="childVariant"
          class="text-4xl font-bold tracking-tight lg:text-5xl"
        >
          {{ title }}
        </Motion>
        <Motion :variants="childVariant">
          <UiButton class="mt-5" @click="clearError({ redirect: '#' })">
            Take me home
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </UiButton>
        </Motion>
        <ul class="mt-10 flex flex-col gap-5">
          <Motion v-for="(l, i) in links" :key="i" :variants="childVariant" as="li">
            <NuxtLink class="group inline-flex flex-col gap-0.5" :to="l.href">
              <span
                class="font-bold text-primary underline-offset-2 transition-all group-hover:translate-x-1 group-hover:underline"
              >
                {{ l.title }}
                <Icon
                  name="lucide:arrow-right"
                  class="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
              <span class="text-sm text-muted-foreground">{{ l.text }}</span>
            </NuxtLink>
          </Motion>
        </ul>
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

  const links = [
    { title: "Documentation", href: "#", text: "Learn more about the error" },
    { title: "Contact support", href: "#", text: "Get help from our support team" },
    { title: "Our blog", href: "#", text: "Read the latest news" },
  ];
</script>
