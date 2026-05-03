<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, y: 30 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.15),
          type: 'spring',
          stiffness: 200,
          damping: 25,
        },
      },
    }"
  >
    <UiCard class="overflow-hidden shadow-xs">
      <Motion
        :variants="{
          initial: { opacity: 0, scale: 0.8 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: {
              when: 'beforeChildren',
            },
          },
        }"
        class="to-primary/40 mx-auto flex size-16 items-center justify-center rounded-full bg-radial via-transparent"
      >
        <Motion
          as-child
          :variants="{
            initial: { scale: 0, rotate: -180 },
            animate: {
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 200, damping: 15 },
            },
          }"
        >
          <Icon name="lucide:mail-open" class="text-primary dark:text-foreground size-6" />
        </Motion>
      </Motion>

      <UiCardContent class="pt-2">
        <Motion
          as="h3"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="text-center text-2xl font-bold"
        >
          Stay in the loop
        </Motion>
        <Motion
          as="p"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="text-muted-foreground mt-2 mb-6 text-center"
        >
          Get notified about new articles, tutorials, and exclusive content delivered straight to
          your inbox.
        </Motion>

        <form class="space-y-4">
          <Motion
            :variants="{
              initial: { opacity: 0, x: -20 },
              animate: {
                opacity: 1,
                x: 0,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              },
            }"
          >
            <UiVeeInput required placeholder="Your email address" aria-label="Email address" />
          </Motion>
          <Motion
            :variants="{
              initial: { opacity: 0, x: 20 },
              animate: {
                opacity: 1,
                x: 0,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              },
            }"
          >
            <UiButton size="lg" class="w-full" type="submit">
              <Icon name="lucide:send" class="size-4" />
              Subscribe now
            </UiButton>
          </Motion>
        </form>

        <Motion
          :variants="{
            initial: { opacity: 0, x: -10 },
            animate: {
              opacity: 1,
              x: 0,
              transition: { type: 'spring', stiffness: 200, damping: 20 },
            },
          }"
          class="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-xs"
        >
          <Icon name="lucide:shield-check" class="size-4" />
          <span>We respect your privacy. Unsubscribe anytime.</span>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
