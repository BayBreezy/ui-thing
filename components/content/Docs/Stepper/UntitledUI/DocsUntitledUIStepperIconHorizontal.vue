<template>
  <div>
    <UiStepper class="flex w-full items-start gap-2">
      <UiStepperItem
        v-for="step in steps"
        :key="step.step"
        v-slot="{ state }"
        class="group relative flex w-full flex-col items-center justify-center"
        :step="step.step"
      >
        <UiStepperSeparator
          v-if="step.step != steps[steps.length - 1].step"
          class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />
        <UiStepperTrigger as-child>
          <UiButton
            :variant="state == 'completed' || state == 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 rounded-full"
            :class="[state == 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <TransitionScale mode="out-in" :scale="0.8">
              <Icon v-if="state == 'completed'" name="lucide:check" class="size-5" />
              <Icon v-if="state == 'active'" name="lucide:circle" class="size-5" />
              <Icon v-if="state == 'inactive'" name="lucide:dot" class="size-10" />
            </TransitionScale>
          </UiButton>
        </UiStepperTrigger>

        <div class="mt-5 flex flex-col items-center text-center">
          <UiStepperTitle
            :class="[state == 'active' && 'text-primary']"
            class="text-sm font-semibold transition lg:text-base"
            >{{ step.title }}</UiStepperTitle
          >
          <UiStepperDescription
            :class="[state == 'active' && 'text-primary']"
            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >{{ step.description }}</UiStepperDescription
          >
        </div>
      </UiStepperItem>
    </UiStepper>
  </div>
</template>

<script lang="ts" setup>
  const steps = [
    {
      step: 1,
      title: "Your details",
      description: "Provide your name and email",
    },
    {
      step: 2,
      title: "Company details",
      description: "A few details about your company",
    },
    {
      step: 3,
      title: "Invite your team",
      description: "Start collaborating with your team",
    },
  ];
</script>
