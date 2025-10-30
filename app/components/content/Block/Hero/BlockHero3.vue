<template>
  <Motion
    while-in-view="animate"
    initial="initial"
    :in-view-options="{ once: true }"
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1) },
      },
    }"
    class="mx-auto flex max-w-[1536px] flex-col gap-y-5 overflow-hidden px-5 py-10 md:flex-row md:gap-10 md:px-0 md:py-0 lg:h-screen"
  >
    <div class="flex h-full items-center justify-center md:w-2/3 md:pl-10 lg:pl-16 xl:w-1/2">
      <div>
        <Motion
          as="h1"
          :variants="textVariants"
          class="mb-4 text-4xl font-bold md:text-5xl lg:mt-5 lg:mb-6 xl:text-6xl"
        >
          People who care about your growth
        </Motion>
        <Motion as="p" :variants="textVariants" class="text-lg text-muted-foreground lg:text-xl">
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain
          more.
        </Motion>
        <form class="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:items-center">
          <Motion :variants="textVariants" class="w-full lg:w-[50%]">
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </Motion>
          <Motion
            as="p"
            :variants="textVariants"
            class="my-2 text-sm text-muted-foreground lg:hidden"
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
          class="mt-3 hidden text-sm text-muted-foreground lg:block"
        >
          We care about your data in our privacy policy.
        </Motion>

        <div class="mt-10 flex items-center gap-7">
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
            <Motion as="p" :variants="textVariants" class="text-sm text-muted-foreground"
              >from 1,000+ customers</Motion
            >
          </div>
        </div>
      </div>
    </div>
    <Motion
      :variants="{
        initial: { opacity: 0, x: 10 },
        animate: {
          opacity: 1,
          x: 0,
          transition: { type: 'keyframes', duration: 0.6, delay: 0.3 },
        },
      }"
      class="h-[350px] md:h-full md:w-1/3 xl:w-1/2"
    >
      <img
        class="h-full w-full rounded-tl-[60px] object-cover lg:rounded-tl-[160px]"
        src="https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero section three styles"
        loading="eager"
        width="700"
        height="800"
        :title="`${COMPANY_NAME} hero section three header`"
      />
    </Motion>
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
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20 },
    },
  };
</script>
