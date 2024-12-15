<template>
  <UiContainer class="pb-10">
    <UiContainer class="py-16 text-center">
      <slot name="headline">
        <p v-if="headline" class="font-semibold text-primary">{{ headline }}</p>
      </slot>
      <slot name="title">
        <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
      </slot>
      <slot name="description">
        <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
          {{ description }}
        </p>
      </slot>
    </UiContainer>
    <section class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <template v-for="c in contactInfo" :key="c.title">
        <div class="flex flex-col items-center gap-2">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Icon :name="c.icon" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="mt-4 text-lg font-medium lg:text-xl">{{ c.title }}</h3>
          <p class="text-center text-muted-foreground">
            {{ c.description }}
          </p>
          <a :href="c.link" target="_blank" class="font-medium text-primary">
            {{ c.value }}
          </a>
        </div>
      </template>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  const contactInfo = [
    {
      title: "Email",
      description: "Our friendly team is here to help.",
      value: "admin@marketplace.com",
      icon: "heroicons:envelope",
      link: "mailto:admin@marketplace.com",
    },
    {
      title: "Office",
      description: "Come say hello at our office HQ.",
      value: "100 West Road, Cityvale, SomeCountry",
      icon: "heroicons:map-pin",
      link: "#",
    },
    {
      title: "Phone",
      description: "Mon-Fri from 8am to 5pm.",
      value: "1-800-123-4567",
      icon: "heroicons:phone",
      link: "tel:1-800-123-4567",
    },
  ];

  const headline = "Contact us";
  const title = "We'd love to hear from you";
  const description = "Our friendly team is always here to chat.";
</script>
