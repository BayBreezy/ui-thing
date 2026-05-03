<template>
  <div class="flex flex-col gap-10 gap-y-10 divide-y *:pb-10 *:last:pb-0">
    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="step in steps"
          :key="step"
          :step="step"
          :class="step !== steps.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger>
            <UiStepperIndicator>{{ step }}</UiStepperIndicator>
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with numbers only
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="step in steps"
          :key="step"
          :step="step"
          :class="step !== steps.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger>
            <UiStepperIndicator />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with numbers and checkmarks
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="step in steps"
          :key="step"
          :step="step"
          :class="step !== steps.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger>
            <UiStepperIndicator
              class="group-data-[state=active]/step:border-primary size-4 group-data-[state=active]/step:border-2 group-data-[state=active]/step:bg-transparent [&_span]:sr-only [&_svg]:size-3"
            />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with tiny buttons and checkmarks
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper v-model="currentStep">
        <UiStepperItem
          v-for="step in steps"
          :key="step"
          :step="step"
          :class="step !== steps.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger as-child>
            <UiStepperIndicator />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <div class="flex justify-center space-x-4">
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep === 1"
          @click="currentStep = currentStep - 1"
        >
          Prev step
        </UiButton>
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep >= steps.length"
          @click="currentStep = currentStep + 1"
        >
          Next step
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Controlled stepper with checkmarks
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper v-model="currentStep">
        <UiStepperItem
          v-for="step in steps"
          :key="step"
          :step="step"
          :class="step !== steps.length ? 'flex-1' : ''"
          :data-loading="isLoading && step === currentStep ? 'true' : undefined"
        >
          <UiStepperTrigger as-child>
            <UiStepperIndicator :is-loading="isLoading" />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <div class="flex justify-center space-x-4">
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep === 1"
          @click="currentStep = currentStep - 1"
        >
          Prev step
        </UiButton>
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep >= steps.length"
          @click="handleNextStep"
        >
          Next step
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Controlled stepper with checkmarks and loading state
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem :step="1" class="not-last:flex-1">
          <UiStepperTrigger>
            <UiStepperIndicator as-child>
              <img
                class="rounded-full"
                src="https://i.pravatar.cc/300"
                width="32"
                height="32"
                alt="Mike Palmer"
              />
            </UiStepperIndicator>
          </UiStepperTrigger>
          <UiStepperSeparator />
        </UiStepperItem>
        <UiStepperItem :step="2" class="not-last:flex-1" data-loading>
          <UiStepperTrigger>
            <UiStepperIndicator :is-loading="true" />
          </UiStepperTrigger>
          <UiStepperSeparator />
        </UiStepperItem>
        <UiStepperItem :step="3">
          <UiStepperTrigger>
            <UiStepperIndicator as-child>
              <div>
                <Icon name="lucide:shuffle" aria-hidden="true" class="size-3.5" />
                <span class="sr-only">Shuffle</span>
              </div>
            </UiStepperIndicator>
          </UiStepperTrigger>
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with mixed elements
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2" class="items-start gap-4">
        <UiStepperItem v-for="{ step, title } in steps2" :key="step" :step="step" class="flex-1">
          <UiStepperTrigger class="w-full flex-col items-start gap-2 rounded">
            <UiStepperIndicator class="bg-border h-1 w-full">
              <span class="sr-only">{{ step }}</span>
            </UiStepperIndicator>
            <div class="space-y-0.5">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
            </div>
          </UiStepperTrigger>
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with labels
      </p>
    </div>

    <div class="space-y-8 text-center">
      <div class="flex items-center gap-2">
        <UiButton
          class="shrink-0"
          variant="ghost"
          size="icon"
          :disabled="currentStep === 1"
          aria-label="Prev step"
          @click="currentStep = currentStep - 1"
        >
          <Icon name="lucide:chevron-left" :size="16" aria-hidden="true" />
        </UiButton>
        <UiStepper v-model="currentStep" class="gap-1">
          <UiStepperItem v-for="step in steps" :key="step" :step="step" class="flex-1">
            <UiStepperTrigger class="w-full flex-col items-start gap-2" as-child>
              <UiStepperIndicator class="bg-border h-1 w-full">
                <span class="sr-only">{{ step }}</span>
              </UiStepperIndicator>
            </UiStepperTrigger>
          </UiStepperItem>
        </UiStepper>
        <UiButton
          class="shrink-0"
          variant="ghost"
          size="icon"
          aria-label="Next step"
          :disabled="currentStep === steps.length"
          @click="currentStep = currentStep + 1"
        >
          <Icon name="lucide:chevron-right" :size="16" aria-hidden="true" />
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Paginated stepper
      </p>
    </div>

    <div class="space-y-8 text-center">
      <div class="space-y-3">
        <UiStepper v-model="currentStep">
          <UiStepperItem v-for="step in steps" :key="step" :step="step" class="flex-1">
            <UiStepperTrigger class="w-full flex-col items-start gap-2" as-child>
              <UiStepperIndicator class="bg-border h-2 w-full rounded-none">
                <span class="sr-only">{{ step }}</span>
              </UiStepperIndicator>
            </UiStepperTrigger>
          </UiStepperItem>
        </UiStepper>
        <div class="text-muted-foreground text-sm font-medium tabular-nums">
          Step {{ currentStep }} of {{ steps.length }}
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep === 1"
          @click="currentStep = currentStep - 1"
        >
          Prev step
        </UiButton>
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep >= steps.length"
          @click="currentStep = currentStep + 1"
        >
          Next step
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Progress stepper
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="{ step, title, description } in steps3"
          :key="step"
          :step="step"
          class="relative flex-1 flex-col!"
        >
          <UiStepperTrigger class="flex-col gap-3 rounded">
            <UiStepperIndicator />
            <div class="space-y-0.5 px-2">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
              <UiStepperDescription class="max-sm:hidden">
                {{ description }}
              </UiStepperDescription>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator
            v-if="step < steps3.length"
            class="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none"
          />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with titles and descriptions
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="{ step, title } in steps3"
          :key="step"
          :step="step"
          class="max-md:items-start"
          :class="step !== steps3.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger class="rounded max-md:flex-col">
            <UiStepperIndicator />
            <div class="text-center md:text-left">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps3.length" class="max-md:mt-3.5 md:mx-4" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with inline titles
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="{ step, title, description } in steps3"
          :key="step"
          :step="step"
          class="max-md:items-start"
          :class="step !== steps3.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger class="rounded max-md:flex-col">
            <UiStepperIndicator />
            <div class="text-center text-[13px] md:text-left">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
              <UiStepperDescription class="truncate text-xs max-sm:hidden">
                {{ description }}
              </UiStepperDescription>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps3.length" class="max-md:mt-3.5 md:mx-4" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with inline titles and descriptions
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2">
        <UiStepperItem
          v-for="{ step, title, description } in steps3"
          :key="step"
          :step="step"
          class="max-md:items-start"
          :class="step !== steps3.length ? 'flex-1' : ''"
        >
          <UiStepperTrigger class="gap-4 rounded max-md:flex-col">
            <UiStepperIndicator />
            <div class="text-center md:-order-1 md:text-left">
              <UiStepperTitle class="text-[13px]">{{ title }}</UiStepperTitle>
              <UiStepperDescription class="text-xs max-sm:hidden">
                {{ description }}
              </UiStepperDescription>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps3.length" class="max-md:mt-3.5 md:mx-4" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Stepper with inline titles and descriptions
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2" orientation="vertical">
        <UiStepperItem v-for="step in steps" :key="step" :step="step" class="not-last:flex-1">
          <UiStepperTrigger>
            <UiStepperIndicator />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Vertical stepper with numbers and checkmarks
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper v-model="currentStep" orientation="vertical">
        <UiStepperItem v-for="step in steps" :key="step" :step="step" class="not-last:flex-1">
          <UiStepperTrigger as-child>
            <UiStepperIndicator />
          </UiStepperTrigger>
          <UiStepperSeparator v-if="step < steps.length" />
        </UiStepperItem>
      </UiStepper>
      <div class="flex justify-center space-x-4">
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep === 1"
          @click="currentStep = currentStep - 1"
        >
          Prev step
        </UiButton>
        <UiButton
          variant="outline"
          class="w-32"
          :disabled="currentStep > steps.length"
          @click="currentStep = currentStep + 1"
        >
          Next step
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Controlled vertical stepper with checkmarks
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2" orientation="vertical">
        <UiStepperItem
          v-for="{ step, title } in steps2"
          :key="step"
          :step="step"
          class="relative items-start not-last:flex-1"
        >
          <UiStepperTrigger class="items-start rounded pb-12 last:pb-0">
            <UiStepperIndicator />
            <div class="mt-0.5 px-2 text-left">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator
            v-if="step < steps2.length"
            class="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]"
          />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Vertical stepper with inline titles
      </p>
    </div>

    <div class="space-y-8 text-center">
      <UiStepper :default-value="2" orientation="vertical">
        <UiStepperItem
          v-for="{ step, title, description } in steps3"
          :key="step"
          :step="step"
          class="relative items-start not-last:flex-1"
        >
          <UiStepperTrigger class="items-start rounded pb-12 last:pb-0">
            <UiStepperIndicator />
            <div class="mt-0.5 space-y-0.5 px-2 text-left">
              <UiStepperTitle>{{ title }}</UiStepperTitle>
              <UiStepperDescription>{{ description }}</UiStepperDescription>
            </div>
          </UiStepperTrigger>
          <UiStepperSeparator
            v-if="step < steps3.length"
            class="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]"
          />
        </UiStepperItem>
      </UiStepper>
      <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
        Vertical stepper with inline titles and descriptions
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const steps = [1, 2, 3, 4];
  const steps2 = [
    { step: 1, title: "Step One" },
    { step: 2, title: "Step Two" },
    { step: 3, title: "Step Three" },
    { step: 4, title: "Step Four" },
  ];
  const steps3 = [
    { step: 1, title: "Step One", description: "Desc for step one" },
    { step: 2, title: "Step Two", description: "Desc for step two" },
    { step: 3, title: "Step Three", description: "Desc for step three" },
  ];
  const currentStep = ref(2);
  const isLoading = ref(false);

  const handleNextStep = () => {
    isLoading.value = true;
    setTimeout(() => {
      currentStep.value = currentStep.value + 1;
      isLoading.value = false;
    }, 1000);
  };
</script>
