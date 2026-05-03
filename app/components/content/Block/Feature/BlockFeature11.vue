<template>
  <Motion initial="initial" while-in-view="animate" as-child :variants="parentVariant">
    <UiContainer class="py-16 lg:py-24">
      <div class="mx-auto max-w-[760px]">
        <Motion :variants="childVariant" class="text-center">
          <UiBadge variant="outline" class="gap-2 px-3 py-1.5 text-sm font-normal">
            Integrations
          </UiBadge>
        </Motion>
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-3 mb-4 text-center text-3xl font-semibold lg:mt-7 lg:mb-5 lg:text-4xl"
        >
          Get more value from your tools
        </Motion>
        <Motion
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mx-auto max-w-[760px] text-center text-lg lg:text-xl"
        >
          Connect your tools, connect your teams. With over 100 apps already available in our
          directory, your team's favourite tools are just a click away.
        </Motion>
      </div>

      <Motion
        as="div"
        class="my-12 grid grid-cols-1 gap-y-10 lg:my-24 lg:grid-cols-3 lg:gap-8 lg:gap-y-16"
        :variants="parentVariant"
        initial="initial"
        while-in-view="animate"
      >
        <Motion
          v-for="(f, i) in features"
          :key="i"
          class="group flex flex-col items-center"
          :variants="childVariant"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-md border">
            <Icon
              :name="f.icon"
              class="group-hover:text-primary h-5 w-5 transition-colors lg:h-6 lg:w-6"
            />
          </div>
          <h3 class="mt-4 text-center text-lg font-semibold text-balance lg:mt-5 lg:text-xl">
            {{ f.title }} integration
          </h3>
          <p class="text-muted-foreground mt-1 max-w-[650px] text-center text-balance lg:mt-2">
            Work faster and smarter by integrating directly with {{ f.title }}, right in the app.
          </p>
          <NuxtLink
            class="text-primary mt-4 inline-flex items-center gap-2 font-semibold underline-offset-2 hover:underline lg:mt-5"
            to="#"
            >View integration
            <Icon
              name="heroicons:arrow-right"
              class="size-4 transition-transform group-hover:translate-x-1"
          /></NuxtLink>
        </Motion>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

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
  const features = [
    { icon: "logos:notion-icon", title: "Notion" },
    { icon: "logos:slack-icon", title: "Slack" },
    { icon: "logos:figma", title: "Figma" },
    { icon: "logos:google-analytics", title: "Google Analytics" },
    { icon: "logos:google-drive", title: "Google Drive" },
    { icon: "logos:jira", title: "Jira" },
  ];
</script>
