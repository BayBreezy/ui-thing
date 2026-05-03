<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div class="basis-1/2">
        <slot name="headline">
          <p class="text-primary font-semibold">{{ headline }}</p>
        </slot>
        <slot name="title">
          <h2 class="mt-2 text-4xl font-bold text-balance md:mt-3 md:text-5xl">
            {{ title }}
          </h2>
        </slot>
      </div>
      <slot name="description">
        <p
          class="text-muted-foreground max-w-[700px] basis-1/2 text-lg text-balance md:text-right lg:text-xl"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <div class="mt-8 flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
      <UiTabs class="w-full md:w-[450px]" default-value="monthly">
        <UiTabsList class="grid h-auto w-full grid-cols-2">
          <UiTabsTrigger class="h-10" value="monthly">Monthly billing</UiTabsTrigger>
          <UiTabsTrigger class="h-10" value="annual"
            >Annual Billing
            <UiBadge class="ml-2 hidden lg:block" variant="outline"
              >Save 20%</UiBadge
            ></UiTabsTrigger
          >
        </UiTabsList>
      </UiTabs>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      headline?: string;
      description?: string;
      title?: string;
    }>(),
    {
      headline: "Our Pricing",
      description: "Choose the plan that works for you. All plans include a 14-day free trial.",
      title: "Simple Pricing",
    }
  );
</script>
