<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <Motion :variants="parentVariant" initial="initial" animate="animate">
      <UiCard class="w-full max-w-lg">
        <UiCardContent class="flex flex-col items-center gap-6 text-center">
          <Motion :variants="childVariant" class="relative rounded-full">
            <div class="bg-muted rounded-full p-6">
              <Icon :name="icon" class="text-muted-foreground size-6" />
            </div>
          </Motion>
          <div class="flex flex-col gap-2">
            <slot name="title">
              <Motion
                v-if="title"
                as="h3"
                :variants="childVariant"
                class="text-xl font-bold tracking-tight"
              >
                {{ title }}
              </Motion>
            </slot>
            <slot name="description">
              <Motion
                v-if="description"
                as="p"
                :variants="childVariant"
                class="text-muted-foreground text-sm"
              >
                {{ description }}
              </Motion>
            </slot>
          </div>
          <div class="flex w-full flex-col gap-2">
            <slot name="primaryButton">
              <Motion :variants="childVariant" class="relative rounded-md">
                <UiButton class="w-full">
                  <Icon :name="primaryIcon" class="size-4" />
                  <span v-html="primaryText" />
                </UiButton>
                <UiBorderBeam :duration="15" />
              </Motion>
            </slot>
            <slot name="secondaryButton">
              <Motion :variants="childVariant">
                <UiButton variant="ghost" class="w-full">
                  <Icon :name="secondaryIcon" class="size-4" />
                  <span v-html="secondaryText" />
                </UiButton>
              </Motion>
            </slot>
          </div>
        </UiCardContent>
      </UiCard>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { delayChildren: stagger(0.2) } },
  };
  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { type: "keyframes", duration: 0.3 } },
  };
  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      primaryText?: string;
      primaryIcon?: string;
      secondaryText?: string;
      secondaryIcon?: string;
    }>(),
    {
      title: "No projects yet",
      description: "Get started by creating your first project. You can always add more later.",
      icon: "lucide:folder-open",
      primaryText: "Create project",
      primaryIcon: "lucide:plus",
      secondaryText: "Import existing",
      secondaryIcon: "lucide:upload",
    }
  );
</script>
