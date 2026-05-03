<template>
  <UiContainer class="py-16 text-center lg:py-24">
    <slot name="headline">
      <p v-if="headline" class="text-primary font-semibold">{{ headline }}</p>
    </slot>
    <slot name="title">
      <h2 class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl">{{ title }}</h2>
    </slot>
    <slot name="description">
      <p class="text-muted-foreground mx-auto max-w-[800px] text-lg lg:text-xl">
        {{ description }}
      </p>
    </slot>
    <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 lg:w-auto lg:flex-row">
      <slot />
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
      headline: "About us",
      description:
        "Learn more about our creative agency from the inside out. We take pride in offering the best services to our clients and partners.",
      title: "We are a creative agency",
    }
  );
</script>
