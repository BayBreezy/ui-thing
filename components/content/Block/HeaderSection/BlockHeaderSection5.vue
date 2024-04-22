<template>
  <UiContainer class="py-16 text-center lg:py-24">
    <slot name="headline">
      <p class="font-semibold text-primary">{{ headline }}</p>
    </slot>
    <slot name="title">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
    </slot>
    <slot name="description">
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        {{ description }}
      </p>
    </slot>
    <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
      <slot>
        <div class="lg:w-[380px]">
          <form class="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row lg:items-center">
            <div class="w-full">
              <UiVeeInput
                icon="lucide:search"
                required
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </form>
        </div>
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
      headline: "Resources",
      description:
        "We have a lot of resources for you. Check them out and let us know if you need help.",
      title: "We are a creative agency",
    }
  );
</script>
