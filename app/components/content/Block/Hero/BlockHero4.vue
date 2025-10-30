<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1) },
      },
    }"
  >
    <UiContainer
      class="relative flex flex-col gap-y-5 py-10 lg:h-screen lg:flex-row lg:gap-10 lg:py-0"
    >
      <div
        class="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(#000,transparent_80%)] bg-size-[80px_80px]"
      />

      <div class="relative z-10 flex h-full items-center justify-center lg:w-[768px]">
        <div>
          <Motion
            as="h1"
            :variants="textVariants"
            class="mb-4 text-4xl font-bold md:text-5xl lg:mt-5 lg:mb-6 xl:text-6xl"
          >
            Customer service software for customer-first teams
          </Motion>
          <Motion
            as="p"
            :variants="textVariants"
            class="max-w-[560px] text-lg text-muted-foreground lg:text-xl"
          >
            The best customer service software for customer-first teams. Industry-leading email and
            live chat support.
          </Motion>
          <Motion :variants="textVariants" class="mt-8 grid grid-cols-1 gap-3 md:flex lg:mt-10">
            <UiButton size="lg" variant="outline">
              <Icon name="lucide:play-circle" /> Demo
            </UiButton>
            <UiButton size="lg">Sign up</UiButton>
          </Motion>
          <Motion as="p" :variants="textVariants" class="mt-5 text-sm text-muted-foreground">
            We care about your data in our privacy policy.
          </Motion>
        </div>
      </div>
      <Motion
        :variants="imageVariant"
        class="absolute inset-y-0 right-5 hidden h-full lg:block lg:w-[500px] xl:-right-20 xl:w-[800px]"
      >
        <img
          class="h-full w-full object-cover shadow xl:rounded-tr-[150px] xl:rounded-bl-[150px]"
          src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero section one styles"
          loading="eager"
          width="700"
          height="800"
          :title="`${COMPANY_NAME} hero section one header`"
        />
      </Motion>

      <Motion :variants="imageVariant" class="z-10 h-[300px] lg:hidden">
        <img
          class="h-full w-full rounded-tr-[40px] rounded-bl-[40px] object-cover"
          src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero section four styles"
          loading="eager"
          width="700"
          height="300"
          :title="`${COMPANY_NAME} hero section four header`"
        />
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const textVariants: MotionProps["variants"] = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20 },
    },
  };

  const imageVariant: MotionProps["variants"] = {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50, damping: 20, delay: 0.2 },
    },
  };
</script>
