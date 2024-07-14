<template>
  <div>
    <UiStepper
      orientation="vertical"
      class="mx-auto flex w-full max-w-md flex-col justify-start gap-10"
    >
      <UiStepperItem
        v-for="step in steps"
        :key="step.step"
        v-slot="{ state }"
        class="group relative flex w-full items-start gap-6"
        :step="step.step"
      >
        <UiStepperSeparator
          v-if="step.step != steps[steps.length - 1].step"
          class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />
        <UiStepperTrigger as-child>
          <UiButton
            :variant="state == 'completed' || state == 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 shrink-0 rounded-full"
            :class="[state == 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <TransitionScale mode="out-in" :scale="0.8">
              <Icon v-if="state == 'completed'" name="lucide:check" class="size-5" />
              <Icon v-if="state == 'active'" name="lucide:circle" class="size-5" />
              <Icon v-if="state == 'inactive'" name="lucide:dot" class="size-10" />
            </TransitionScale>
          </UiButton>
        </UiStepperTrigger>

        <div class="flex flex-col gap-1">
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
      </UiStepperItem>
    </UiStepper>
  </div>
</template>

<script lang="ts" setup>
  const steps = [
    {
      step: 1,
      title: "Your details",
      description:
        "Provide your name and email address. We will use this information to create your account",
    },
    {
      step: 2,
      title: "Company details",
      description: "A few details about your company will help us personalize your experience",
    },
    {
      step: 3,
      title: "Invite your team",
      description:
        "Start collaborating with your team by inviting them to join your account. You can skip this step and invite them later",
    },
  ];
</script>
