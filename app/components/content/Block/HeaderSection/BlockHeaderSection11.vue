<template>
  <UiContainer class="py-16 lg:py-24">
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div class="basis-1/2">
        <slot name="headline">
          <p class="font-semibold text-primary">{{ headline }}</p>
        </slot>
        <slot name="title">
          <h2 class="mt-2 text-balance text-4xl font-bold md:mt-3 md:text-5xl">
            {{ title }}
          </h2>
        </slot>
      </div>
      <slot name="description">
        <p
          class="max-w-[700px] basis-1/2 text-balance text-lg text-muted-foreground md:text-right lg:text-xl"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <div class="mt-5 flex w-full flex-col-reverse gap-3 lg:w-auto lg:flex-row">
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
