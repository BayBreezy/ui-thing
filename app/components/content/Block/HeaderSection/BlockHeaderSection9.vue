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
        <div class="md:w-[480px]">
          <form class="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div class="w-full lg:w-[335px]">
              <UiVeeInput required placeholder="Enter your email" aria-label="Enter your email" />
            </div>
            <p class="my-2 text-sm text-muted-foreground lg:hidden">
              We care about your data in our privacy policy.
            </p>
            <div>
              <UiButton class="w-full whitespace-nowrap lg:w-auto" type="submit"
                >Get started</UiButton
              >
            </div>
          </form>
          <p class="mt-3 hidden text-left text-sm text-muted-foreground lg:block">
            We care about your data in our privacy policy.
          </p>
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
      headline: "About us",
      description:
        "Learn more about our creative agency from the inside out. We take pride in offering the best services to our clients and partners.",
      title: "We are a creative agency",
    }
  );
</script>
