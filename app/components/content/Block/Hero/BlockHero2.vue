<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :variants="parentVariant"
    class="@container relative mx-auto flex w-full max-w-[1536px] flex-col gap-y-5 overflow-x-hidden px-5 py-10 sm:px-10 md:flex-row md:gap-10 md:px-0 md:py-0 lg:h-dvh"
  >
    <div
      class="flex h-full items-center justify-center md:w-2/3 @3xl:pl-10 @5xl:pl-16 @7xl:w-1/2 @7xl:pl-20"
    >
      <div class="text-center md:text-left">
        <Motion as-child :variants="childVariant">
          <UiBadge
            to="#"
            variant="secondary"
            class="px-3 py-1.5 text-xs font-normal md:text-sm lg:py-2"
            >We're hiring! Join our remote team <Icon class="ml-3 size-4" name="lucide:arrow-right"
          /></UiBadge>
        </Motion>
        <Motion
          as="h1"
          :variants="childVariant"
          class="mt-7 mb-4 text-4xl font-bold md:text-5xl lg:mt-5 lg:mb-6 xl:text-6xl"
        >
          People who care about your growth
        </Motion>
        <Motion as="p" :variants="childVariant" class="text-muted-foreground text-lg lg:text-xl">
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain
          more.
        </Motion>
        <div class="mt-8 grid grid-cols-1 gap-3 md:flex lg:mt-12">
          <Motion :variants="childVariant" class="w-full *:w-full md:w-auto">
            <UiButton size="lg" variant="outline">
              <Icon name="lucide:play-circle" /> Demo
            </UiButton>
          </Motion>
          <Motion :variants="childVariant" class="w-full *:w-full md:w-auto">
            <UiButton size="lg">Sign up</UiButton>
          </Motion>
        </div>
        <Motion as="p" :variants="childVariant" class="text-muted-foreground mt-5 text-sm">
          We care about your data in our privacy policy.
        </Motion>
      </div>
    </div>
    <Motion
      :variants="{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            type: 'keyframes',
            duration: 0.6,
            delay: isDesktop ? -0.1 : 0,
          },
        },
      }"
      class="h-[350px] md:h-full md:w-1/3 xl:w-1/2"
    >
      <img
        class="h-full w-full rounded-lg object-cover md:rounded-none lg:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section two styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section two header`"
      />
    </Motion>
  </Motion>
</template>

<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core";
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const bp = useBreakpoints(breakpointsTailwind);

  const isDesktop = bp.greater("lg");

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
