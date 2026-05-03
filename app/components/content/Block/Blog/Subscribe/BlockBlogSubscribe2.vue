<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, scale: 0.9, y: 10 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.2), type: 'keyframes' },
      },
    }"
  >
    <UiCard class="relative rounded-none shadow-xs">
      <Motion
        class="bg-primary absolute top-0 h-0.5 w-full"
        :variants="{
          initial: { scaleX: 0 },
          animate: { scaleX: 1, transition: { duration: 1, ease: 'easeOut' } },
        }"
      />
      <UiCardContent>
        <Motion
          :variants="{
            initial: { opacity: 0, scale: 0 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', stiffness: 200, damping: 20 },
            },
          }"
          class="from-primary/40 text-primary inline-flex size-14 items-center justify-center rounded-md bg-linear-to-b"
        >
          <Icon name="lucide:mail" class="size-6" />
        </Motion>

        <Motion as="h3" :variants="childVariant" class="mt-8 mb-2 text-2xl font-semibold"
          >Weekly newsletter</Motion
        >
        <Motion as="p" :variants="childVariant" class="text-muted-foreground mb-6">
          No spam. Just the latest releases and tips, interesting articles, and exclusive interviews
          in your inbox every week.
        </Motion>
        <form>
          <Motion :variants="childVariant" class="w-full">
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </Motion>
          <Motion as="p" :variants="childVariant" class="text-muted-foreground my-4 text-sm">
            Read about our privacy policy <a href="#" class="text-primary">here</a>.
          </Motion>
          <Motion :variants="childVariant">
            <UiButton size="lg" class="w-full whitespace-nowrap" type="submit">Subscribe</UiButton>
          </Motion>
        </form>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  };
</script>
