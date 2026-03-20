<template>
  <!-- 
    Error page with split image layout
    Features: Two-column split, decorative image, animated content
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
          delayChildren: stagger(0.15),
        },
      },
    }"
  >
    <div class="relative flex min-h-screen items-center overflow-x-hidden">
      <div class="container flex w-full items-center justify-center md:w-1/2">
        <div>
          <Motion
            as="p"
            :variants="childVariant"
            class="mb-5 font-bold tracking-tight text-primary"
          >
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
        </div>
      </div>
      <Motion
        :variants="{
          initial: { opacity: 0, x: 30 },
          animate: {
            opacity: 1,
            x: 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 25,
            },
          },
        }"
        class="hidden h-screen md:block md:w-1/2 lg:w-1/2"
      >
        <img
          src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Error page image"
          class="size-full object-cover"
        />
      </Motion>
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
</script>
