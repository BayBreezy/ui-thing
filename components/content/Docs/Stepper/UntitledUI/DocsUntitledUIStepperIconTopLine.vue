<template>
  <div>
    <UiStepper class="flex w-full items-start gap-4">
      <UiStepperItem
        v-for="step in steps"
        :key="step.step"
        v-slot="{ state }"
        class="group w-full"
        :step="step.step"
      >
        <UiStepperTrigger
          class="relative flex w-full flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-[10px] focus-visible:ring-offset-background"
        >
          <UiStepperSeparator
            class="block h-1 w-full shrink-0 rounded-full bg-muted group-data-[state=active]:bg-primary group-data-[state=completed]:bg-primary"
          />

          <div class="mt-5 flex flex-col items-start text-left">
            <UiStepperTitle
              :class="[state == 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
              >{{ step.title }}</UiStepperTitle
            >
            <UiStepperDescription
              :class="[state == 'active' && 'text-primary']"
              class="text-xs text-muted-foreground transition lg:text-sm"
              >{{ step.description }}</UiStepperDescription
            >
          </div>
        </UiStepperTrigger>
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
