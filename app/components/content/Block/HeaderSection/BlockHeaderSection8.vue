<template>
  <UiContainer class="py-16 lg:py-24">
    <slot name="headline">
      <p class="font-semibold text-primary">{{ headline }}</p>
    </slot>
    <slot name="title">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
    </slot>
    <slot name="description">
      <p class="max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        {{ description }}
      </p>
    </slot>
    <div class="mt-5 flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row">
      <slot>
        <UiTabs class="mt-5 w-full md:mt-7 md:w-[450px]" default-value="monthly">
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
      </slot>
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
      headline: "Pricing",
      description: "Simple pricing that scales with you. Choose a plan that works for you.",
      title: "Simple pricing that scales with you",
    }
  );
</script>
