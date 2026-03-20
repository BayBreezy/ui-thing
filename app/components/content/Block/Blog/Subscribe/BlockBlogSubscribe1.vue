<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.1), type: 'keyframes' },
      },
    }"
  >
    <UiCard class="shadow-xs">
      <UiCardContent>
        <Motion
          :variants="{
            initial: { scale: 0, y: 20 },
            animate: { scale: 1, y: 0 },
          }"
          class="inline-flex size-16 items-center justify-center rounded-full bg-linear-to-b from-primary/50 text-primary"
        >
          <Icon name="lucide:send" class="h-6 w-6" />
        </Motion>

        <Motion
          as="h3"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="mt-6 mb-2 text-2xl font-semibold"
          >Weekly newsletter</Motion
        >
        <Motion
          as="p"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="mb-6 text-muted-foreground"
        >
          No spam. Just the latest releases and tips, interesting articles, and exclusive interviews
          in your inbox every week.
        </Motion>
        <form>
          <Motion
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            class="w-full"
          >
            <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
          </Motion>
          <Motion
            as="p"
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
            class="my-4 text-sm text-muted-foreground"
          >
            Read about our privacy policy <a href="#" class="text-primary">here</a>.
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }"
          >
            <UiButton size="lg" class="w-full whitespace-nowrap" type="submit">Subscribe</UiButton>
          </Motion>
        </form>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
