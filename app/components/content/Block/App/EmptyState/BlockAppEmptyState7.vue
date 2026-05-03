<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <Motion
      :variants="parentVariant"
      initial="initial"
      animate="animate"
      class="flex w-full max-w-xl flex-col gap-8"
    >
      <Motion :variants="headerVariant" class="flex items-start gap-4">
        <div
          class="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-lg"
        >
          <Icon :name="icon" class="size-6" />
        </div>
        <div class="flex flex-1 flex-col gap-0.5">
          <slot name="title">
            <h1 v-if="title" class="text-xl font-bold tracking-tight">
              <span v-html="title" />
            </h1>
          </slot>
          <slot name="description">
            <p v-if="description" class="text-muted-foreground text-[15px]">
              <span v-html="description" />
            </p>
          </slot>
        </div>
      </Motion>

      <Motion :variants="cardsVariant" class="grid gap-3 sm:grid-cols-2">
        <slot name="card1">
          <Motion :variants="cardVariant">
            <UiCard class="hover:bg-muted/50 cursor-pointer transition-colors">
              <UiCardContent class="flex items-start gap-3">
                <div class="bg-primary/10 rounded-md p-2">
                  <Icon :name="card1Icon" class="text-primary size-5" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold" v-html="card1Title" />
                  <p class="text-muted-foreground mt-1 text-sm" v-html="card1Description" />
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>
        </slot>
        <slot name="card2">
          <Motion :variants="cardVariant">
            <UiCard class="hover:bg-muted/50 cursor-pointer transition-colors">
              <UiCardContent class="flex items-start gap-3">
                <div class="bg-primary/10 rounded-md p-2">
                  <Icon :name="card2Icon" class="text-primary size-5" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold" v-html="card2Title" />
                  <p class="text-muted-foreground mt-1 text-sm" v-html="card2Description" />
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>
        </slot>
      </Motion>

      <Motion :variants="footerVariant" class="flex items-center gap-2">
        <slot name="helpText">
          <Icon name="lucide:info" class="text-muted-foreground size-4" />
          <p v-if="helpText" class="text-muted-foreground text-sm" v-html="helpText" />
        </slot>
      </Motion>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.2) } },
  };

  const headerVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 25 } },
  };

  const cardsVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delayChildren: stagger(0.2) } },
  };

  const cardVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" },
    },
  };

  const footerVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      card1Title?: string;
      card1Description?: string;
      card1Icon?: string;
      card2Title?: string;
      card2Description?: string;
      card2Icon?: string;
      helpText?: string;
    }>(),
    {
      title: "Choose how to get started",
      description: "Select an option below to begin working on your project.",
      icon: "lucide:rocket",
      card1Title: "Start from scratch",
      card1Description: "Create a new project with custom settings",
      card1Icon: "lucide:file-plus",
      card2Title: "Use a template",
      card2Description: "Choose from pre-built templates",
      card2Icon: "lucide:layout-template",
      helpText: "You can always change these settings later",
    }
  );
</script>
