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
            variant="outline"
            class="px-3 py-1.5 text-xs font-normal md:py-2 md:text-sm"
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
        <Motion as="p" :variants="childVariant" class="text-lg text-muted-foreground lg:text-xl">
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain
          more.
        </Motion>
        <form class="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:items-center">
          <Motion :variants="childVariant" class="w-full lg:w-[50%]">
            <UiVeeInput
              icon="lucide:mail"
              required
              placeholder="Enter your email"
              aria-label="Enter your email"
            />
          </Motion>
          <Motion
            as="p"
            :variants="childVariant"
            class="my-2 text-left text-sm text-muted-foreground md:hidden"
          >
            We care about your data in our privacy policy.
          </Motion>
          <Motion :variants="childVariant">
            <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit"
              >Get started</UiButton
            >
          </Motion>
        </form>
        <Motion
          as="p"
          :variants="childVariant"
          class="mt-3 hidden text-sm text-muted-foreground md:block"
        >
          We care about your data in our privacy policy.
        </Motion>
      </div>
    </div>
    <Motion
      :variants="{
        initial: { opacity: 0, x: isDesktop ? 50 : 0, y: isTablet || isMobile ? 30 : 0 },
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
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
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section one styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section one header`"
      />
    </Motion>
  </Motion>
</template>

<script lang="ts" setup>
  import { breakpointsTailwind } from "@vueuse/core";
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const bp = useBreakpoints(breakpointsTailwind);

  const isTablet = bp.between("md", "lg");
  const isDesktop = bp.greater("lg");
  const isMobile = bp.smallerOrEqual("md");

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
