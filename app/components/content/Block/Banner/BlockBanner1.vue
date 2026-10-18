<template>
  <!--
    Slim announcement bar for the top of a page
    Features: Full width brand colored bar, short message with an arrow link, dismiss button that collapses the bar, show again link for previews
  -->
  <div>
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <div class="bg-primary text-primary-foreground relative px-10 py-2.5 text-center text-sm">
          <slot>
            <p class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <Icon :name="props.icon" class="size-4 shrink-0" />
              <span class="font-medium">{{ props.message }}</span>
              <NuxtLink
                :to="props.link"
                class="group inline-flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                {{ props.cta }}
                <Icon
                  name="lucide:arrow-right"
                  class="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </NuxtLink>
            </p>
          </slot>
          <button
            type="button"
            class="hover:bg-primary-foreground/15 absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss announcement"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="p-4 text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      message?: string;
      cta?: string;
      link?: string;
      icon?: string;
    }>(),
    {
      message: "We've just announced our Series A.",
      cta: "Read the announcement",
      link: "#",
      icon: "lucide:sparkles",
    }
  );

  const visible = ref(true);
</script>
