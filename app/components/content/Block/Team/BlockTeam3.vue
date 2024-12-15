<template>
  <UiContainer class="pb-10">
    <UiContainer class="py-16 text-center lg:py-24">
      <slot name="headline">
        <p v-if="headline" class="font-semibold text-primary">{{ headline }}</p>
      </slot>
      <slot name="title">
        <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
      </slot>
      <slot name="description">
        <p class="mx-auto max-w-[768px] text-lg text-muted-foreground lg:text-xl">
          {{ description }}
        </p>
      </slot>
      <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
        <UiButton variant="outline">About us</UiButton>
        <UiButton>Open positions</UiButton>
      </div>
    </UiContainer>
    <section class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
      <template v-for="n in 8" :key="n">
        <div class="flex flex-col">
          <UiAvatar
            class="mb-5 h-72 w-full rounded-none ring-1 ring-ring/20"
            src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
          />
          <p class="text-lg font-semibold">Jane Doe</p>
          <p class="text-primary">Marketing Manager</p>
          <p class="mt-2 text-muted-foreground">
            Lead engineering teams at Figma, Pitch, and Protocol Labs.
          </p>
        </div>
      </template>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  const headline = "We're hiring!";
  const title = "Meet our team";
  const description =
    "Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.";
</script>
