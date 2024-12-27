---
title: Stepper
description: A set of steps that are used to indicate progress through a multi-step process.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/stepper.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/stepper.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Stepper"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add stepper
```

## Introduction

So steppers are weird to add a general style to. I really don't see the point in giving your stepper just one style. It would be more beneficial to look at how other component libraries style their steppers and then just create a custom one that you like with the components provided by Radix Vue.

## Untitled UI

Now we will look at how Jordan from [Untitled UI](https://www.untitledui.com/) styled the steppers in his design system. You can view them here: [Steppers - Untitled UI](https://www.untitledui.com/components/progress-steps)

### Stepper with Icon - Horizontal

So here is how I think this should be implemented. Take a look at the source code. Feel free to move things around and try out different things. Of course, you can turn this into a component if you want to.

::ShowCase

:DocsUntitledU_IStepperIconHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/Stepper/UntitledUI/DocsUntitledUIStepperIconHorizontal.vue" code lang="vue" -->

```vue [DocsUntitledUIStepperIconHorizontal.vue]
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
```

<!-- /automd -->

::

### Stepper with Icon - Vertical

For the vertical variation, this is how I think it should be implemented.

::ShowCase

:DocsUntitledU_IStepperIconVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Stepper/UntitledUI/DocsUntitledUIStepperIconVertical.vue" code lang="vue" -->

```vue [DocsUntitledUIStepperIconVertical.vue]
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
```

<!-- /automd -->

::

### Stepper with Top Line

::ShowCase

:DocsUntitledU_IStepperIconTopLine

#code

<!-- automd:file src="../../app/components/content/Docs/Stepper/UntitledUI/DocsUntitledUIStepperIconTopLine.vue" code lang="vue" -->

```vue [DocsUntitledUIStepperIconTopLine.vue]
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
```

<!-- /automd -->

::

## Vuetify

Now our friends over at [Vuetify](https://vuetifyjs.com/en/components/steppers/) takes a different approach to the whole stepper thing.

::ShowCase

:DocsVuetifyStepper

#code

<!-- automd:file src="../../app/components/content/Docs/Stepper/Vuetify/DocsVuetifyStepper.vue" code lang="vue" -->

```vue [DocsVuetifyStepper.vue]
<template>
  <div>
    <UiCard>
      <UiStepper
        v-model="stepper"
        class="flex w-full items-start justify-between gap-2 border-b p-6"
      >
        <UiStepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="group relative w-full"
          :step="step.step"
          :class="[isLastItem(step.step) && '!w-fit']"
        >
          <UiStepperTrigger
            as="div"
            class="flex items-center gap-3"
            :class="[isLastItem(step.step) && 'justify-end']"
          >
            <UiButton
              :variant="state == 'completed' || state == 'active' ? 'default' : 'outline'"
              size="icon-sm"
              class="z-10 size-8 shrink-0 rounded-full"
              :class="[
                state == 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
              ]"
            >
              <TransitionScale mode="out-in" :scale="0.8" :duration="100">
                <Icon v-if="state == 'active'" name="lucide:pen" class="size-4" />
                <Icon v-else-if="state == 'completed'" name="lucide:check" class="size-4" />
                <span v-else>{{ step.step }}</span>
              </TransitionScale>
            </UiButton>
            <UiStepperTitle
              :class="[state == 'active' && 'text-primary']"
              class="sr-only font-medium transition md:not-sr-only"
              >{{ step.title }}</UiStepperTitle
            >
            <UiStepperSeparator
              v-if="step.step != steps[steps.length - 1].step"
              class="h-0.5 shrink-0 grow rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
            <VisuallyHidden as-child>
              <UiStepperDescription>{{ step.description }}</UiStepperDescription>
            </VisuallyHidden>
          </UiStepperTrigger>
        </UiStepperItem>
      </UiStepper>

      <div class="overflow-hidden">
        <TransitionSlide
          mode="out-in"
          :duration="100"
          :offset="{
            enter: ['10%', 0],
            leave: ['-10%', 0],
          }"
        >
          <UiCardContent v-if="stepper == 1">
            <UiCardTitle class="">Order</UiCardTitle>
            <div class="mt-6 overflow-x-auto rounded-md border">
              <UiTable>
                <UiTableHeader>
                  <UiTableRow>
                    <UiTableHead>Description</UiTableHead>
                    <UiTableHead class="text-end">Quantity</UiTableHead>
                    <UiTableHead class="text-end">Price</UiTableHead>
                  </UiTableRow>
                </UiTableHeader>
                <UiTableBody>
                  <template v-for="(product, index) in products" :key="index">
                    <UiTableRow>
                      <UiTableCell class="font-medium">{{ product.name }} </UiTableCell>
                      <UiTableCell class="text-end">{{ product.quantity }}</UiTableCell>
                      <UiTableCell class="text-end">{{
                        formatPrice(product.price * product.quantity)
                      }}</UiTableCell>
                    </UiTableRow>
                  </template>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Total</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end font-semibold">
                      {{ subTotal }}
                    </UiTableCell>
                  </UiTableRow>
                </UiTableBody>
              </UiTable>
            </div>
          </UiCardContent>
          <UiCardContent v-if="stepper == 2" class="pb-10">
            <UiCardTitle class="">Shipping</UiCardTitle>
            <UiRadioGroup v-model="shippingMethod" class="mt-6">
              <div v-for="m in shippingMethods" :key="m.name" class="flex items-center gap-3">
                <!-- @vue-expect-error - we are storing the price as the value which is a number -->
                <UiRadioGroupItem :id="m.name" :value="m.price" />
                <UiLabel class="gap-3 !text-base" :for="m.name"
                  >{{ m.name }}
                  <span class="text-muted-foreground">{{ formatPrice(m.price) }}</span></UiLabel
                >
              </div>
            </UiRadioGroup>
          </UiCardContent>
          <UiCardContent v-if="stepper == 3">
            <UiCardTitle class="">Submit</UiCardTitle>
            <div class="mt-6 overflow-x-auto rounded-md border">
              <UiTable>
                <UiTableHeader>
                  <UiTableRow>
                    <UiTableHead>Description</UiTableHead>
                    <UiTableHead class="text-end">Quantity</UiTableHead>
                    <UiTableHead class="text-end">Price</UiTableHead>
                  </UiTableRow>
                </UiTableHeader>
                <UiTableBody>
                  <template v-for="(product, index) in products" :key="index">
                    <UiTableRow>
                      <UiTableCell class="font-medium">{{ product.name }} </UiTableCell>
                      <UiTableCell class="text-end">{{ product.quantity }}</UiTableCell>
                      <UiTableCell class="text-end">{{
                        formatPrice(product.price * product.quantity)
                      }}</UiTableCell>
                    </UiTableRow>
                  </template>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Shipping</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end">{{ formatPrice(shippingMethod) }}</UiTableCell>
                  </UiTableRow>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Total</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end font-semibold">
                      {{ total }}
                    </UiTableCell>
                  </UiTableRow>
                </UiTableBody>
              </UiTable>
            </div>
          </UiCardContent>
        </TransitionSlide>
      </div>

      <UiCardFooter class="flex items-center justify-between gap-5">
        <UiButton :disabled="!canGoBack" variant="outline" size="sm" @click="goBack">Back</UiButton>
        <div class="flex items-center gap-3">
          <UiButton v-if="stepper != 3" :disabled="!canGoNext" size="sm" @click="goNext"
            >Next</UiButton
          >
          <UiButton v-if="stepper == 3" size="sm" @click="useSonner.success('Order submitted')"
            >Submit</UiButton
          >
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { get, set } from "@vueuse/core";
  import { VisuallyHidden } from "radix-vue";

  const stepper = ref(1);
  const steps = [
    {
      step: 1,
      title: "Review Order",
      description: "Ensure your order is correct",
    },
    {
      step: 2,
      title: "Select Shipping",
      description: "Choose the best shipping option for you",
    },
    {
      step: 3,
      title: "Submit",
      description: "Complete your order",
    },
  ];

  const products = ref([
    {
      name: "Product 1",
      price: 10,
      quantity: 2,
    },
    {
      name: "Product 2",
      price: 15,
      quantity: 10,
    },
  ]);

  const shippingMethod = ref(0);

  const shippingMethods = ref([
    { name: "Express Shipping", price: 10 },
    { name: "Standard Shipping", price: 5 },
    { name: "Free Shipping", price: 0 },
  ]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  const subTotal = computed(() =>
    formatPrice(products.value.reduce((acc, product) => acc + product.price * product.quantity, 0))
  );

  const total = computed(() =>
    formatPrice(
      products.value.reduce((acc, product) => acc + product.price * product.quantity, 0) +
        shippingMethod.value
    )
  );

  const isLastItem = (step: number) => step === steps.length;

  const canGoNext = computed(() => stepper.value < steps.length);
  const canGoBack = computed(() => stepper.value > 1);
  const goNext = () => {
    if (get(canGoNext)) {
      set(stepper, stepper.value + 1);
    }
  };
  const goBack = () => {
    if (get(canGoBack)) {
      set(stepper, stepper.value - 1);
    }
  };
</script>
```

<!-- /automd -->

::
