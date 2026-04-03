<template>
  <!-- 
    Newsletter signup CTA
    Features: Email input with inline button, badge, animated entrance
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
    <UiContainer class="py-16 text-center lg:py-24">
      <Motion as-child :variants="childVariant">
        <UiBadge variant="outline" class="mb-4">Newsletter</UiBadge>
      </Motion>
      <Motion
        as="h3"
        :variants="childVariant"
        class="mb-4 text-3xl font-semibold md:mb-5 md:text-4xl"
      >
        Stay up to date
      </Motion>
      <Motion
        as="p"
        :variants="childVariant"
        class="mx-auto mb-8 max-w-[600px] text-lg text-muted-foreground md:text-xl"
      >
        Subscribe to our newsletter to get the latest news and updates.
      </Motion>
      <Motion :variants="childVariant" class="mx-auto max-w-[500px]">
        <form class="flex flex-col gap-3 md:flex-row" @submit.prevent="handleSubmit">
          <UiInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="flex-1"
          />
          <UiButton type="submit" class="md:w-auto">
            Subscribe
            <Icon name="lucide:send" class="ml-2 h-4 w-4" />
          </UiButton>
        </form>
        <p class="mt-3 text-sm text-muted-foreground">
          We care about your data. Read our
          <a href="#" class="underline hover:text-primary">Privacy Policy</a>.
        </p>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";
  import { ref } from "vue";

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

  const email = ref("");

  const handleSubmit = () => {
    useSonner.success("Subscribed!", {
      description: "You've been added to our newsletter.",
    });
    email.value = "";
  };
</script>
