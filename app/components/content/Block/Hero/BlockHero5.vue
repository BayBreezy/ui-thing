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
        class="absolute inset-0 h-full w-full bg-transparent bg-[radial-gradient(circle,var(--color-border)_3px,transparent_1px)] mask-[radial-gradient(circle,#000,transparent_80%)] bg-size-[30px_30px]"
      />

      <div class="relative z-10 flex h-full items-center justify-center md:w-[550px] lg:w-[768px]">
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
            class="text-muted-foreground max-w-[560px] text-lg lg:text-xl"
          >
            The best customer service software for customer-first teams. Industry-leading email and
            live chat support.
          </Motion>
          <form
            class="mt-8 flex flex-col gap-3 md:w-[80%] lg:mt-12 lg:w-full lg:flex-row lg:items-center"
          >
            <Motion :variants="textVariants" class="w-full lg:w-[40%]">
              <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
            </Motion>
            <Motion
              as="p"
              :variants="textVariants"
              class="text-muted-foreground my-2 text-sm lg:hidden"
            >
              We care about your data in our privacy policy.
            </Motion>
            <Motion :variants="textVariants" class="w-full lg:w-auto">
              <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit"
                >Get started</UiButton
              >
            </Motion>
          </form>
          <Motion
            as="p"
            :variants="textVariants"
            class="text-muted-foreground mt-3 hidden text-sm lg:block"
          >
            We care about your data in our privacy policy.
          </Motion>

          <div class="mt-10 flex flex-col gap-5 md:flex-row md:items-center">
            <Motion :variants="textVariants" class="flex items-center *:-mr-2 [&_img]:size-10">
              <UiAnimatedTooltip :items="people" />
            </Motion>

            <div class="flex flex-col gap-1">
              <div>
                <template v-for="s in 5" :key="s">
                  <Motion :variants="textVariants" as-child>
                    <Icon
                      name="material-symbols:kid-star"
                      class="inline size-5 fill-yellow-400 text-yellow-400"
                    />
                  </Motion>
                </template>
              </div>
              <Motion as="p" :variants="textVariants" class="text-muted-foreground text-sm"
                >from 1,000+ customers</Motion
              >
            </div>
          </div>
        </div>
      </div>
      <Motion
        :variants="imageVariant"
        class="absolute inset-y-0 right-5 hidden h-full lg:block lg:w-[500px] xl:-right-20 xl:w-[800px]"
      >
        <img
          class="h-full w-full rounded-lg object-cover shadow"
          src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero section one styles"
          loading="eager"
          width="700"
          height="800"
          :title="`${COMPANY_NAME} hero section one header`"
        />
      </Motion>

      <Motion :variants="imageVariant" class="h-[300px] md:h-[500px] lg:hidden">
        <img
          class="h-full w-full rounded-tr-[70px] rounded-bl-[70px] object-cover"
          src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

  const people = [
    {
      title: "Alice Johnson",
      description: "Product Manager at TechCorp",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      title: "Bob Smith",
      description: "Lead Developer at DevSolutions",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      title: "Catherine Lee",
      description: "UX Designer at CreativeStudio",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      title: "David Brown",
      description: "Marketing Head at MarketMinds",
      image: "https://i.pravatar.cc/150?img=14",
    },
    {
      title: "Eva Green",
      description: "Data Scientist at DataWorks",
      image: "https://i.pravatar.cc/150?img=15",
    },
  ];

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
