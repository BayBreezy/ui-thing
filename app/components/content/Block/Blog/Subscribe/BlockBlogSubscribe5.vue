<template>
  <Motion
    as-child
    initial="initial"
    while-in-view="animate"
    :variants="{
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { when: 'beforeChildren', delayChildren: stagger(0.12), duration: 0.5 },
      },
    }"
  >
    <UiCard
      class="ring-muted/30 dark:from-primary/10 dark:via-background dark:to-background dark:ring-primary/5 border-none shadow-sm ring-1 dark:bg-linear-to-br"
    >
      <UiCardContent>
        <div class="mb-6 flex items-center gap-4">
          <Motion
            :variants="{
              initial: { scale: 0, opacity: 0 },
              animate: {
                scale: 1,
                opacity: 1,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              },
            }"
            class="from-primary/20 flex size-12 shrink-0 items-center justify-center rounded-md bg-linear-to-br"
          >
            <Icon name="lucide:book-open" class="text-primary dark:text-foreground size-6" />
          </Motion>
          <div class="flex-1">
            <Motion
              as="h3"
              :variants="{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0, transition: { type: 'keyframes' } },
              }"
              class="text-lg font-bold"
            >
              Subscribe to our blog
            </Motion>
            <Motion
              as="p"
              :variants="{
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0, transition: { type: 'keyframes' } },
              }"
              class="text-muted-foreground text-sm"
            >
              Fresh content every week
            </Motion>
          </div>
        </div>

        <Motion
          as="p"
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="text-muted-foreground mb-6"
        >
          Don't miss out on our latest posts, tutorials, and industry insights. Get them delivered
          to your inbox.
        </Motion>

        <form>
          <div class="flex gap-2">
            <Motion
              :variants="{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
              }"
              class="flex-1"
            >
              <UiVeeInput required placeholder="you@example.com" aria-label="Email address" />
            </Motion>
            <Motion
              :variants="{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
              }"
            >
              <UiButton size="default" type="submit">
                <Icon name="lucide:send" class="size-4" />
                <span class="hidden sm:inline">Subscribe</span>
              </UiButton>
            </Motion>
          </div>
          <Motion
            as="p"
            :variants="{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
            }"
            class="text-muted-foreground mt-3 text-xs"
          >
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </Motion>
        </form>

        <Motion
          :variants="{
            initial: { opacity: 0, scaleX: 0 },
            animate: { opacity: 1, scaleX: 1, transition: { delay: 0.5, duration: 0.5 } },
          }"
          class="from-primary/50 via-primary/20 mt-6 h-px origin-left bg-linear-to-r"
        />

        <Motion
          :variants="{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
          }"
          class="text-muted-foreground mt-4 flex items-center justify-center gap-6 text-xs"
        >
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:users" class="size-3.5" />
            <span>12K+ subscribers</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:star" class="size-3.5 fill-yellow-500 text-yellow-500" />
            <span>Rated 4.9/5</span>
          </div>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
</script>
