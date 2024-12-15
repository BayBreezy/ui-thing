<template>
  <UiContainer class="flex flex-col gap-x-16 py-16 lg:flex-row lg:py-24">
    <div class="w-full pb-16 lg:w-1/2 lg:pb-0">
      <UiContainer class="text-center lg:text-left">
        <p class="font-semibold text-primary">We're hiring!</p>
        <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">Join our team</h2>
        <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
          Our philosophy is simple — hire a team of diverse, passionate people and foster a culture
          that empowers you to do your best work.
        </p>
      </UiContainer>
    </div>

    <ul class="flex w-full flex-col gap-8 lg:w-1/2">
      <li v-for="n in 4" :key="n" class="border-t pt-6">
        <div class="flex items-center">
          <span class="text-lg font-semibold">Product Designer </span
          ><UiBadge class="ml-3 text-sm font-medium" variant="outline">Design</UiBadge>
        </div>
        <p class="mt-2 text-muted-foreground">
          We're looking for a mid-level product designer to join our team.
        </p>
        <ul class="mt-5 flex flex-wrap items-center gap-5">
          <li class="flex items-center gap-2 text-muted-foreground">
            <Icon class="opacity-80" name="heroicons:map-pin" /> Remote
          </li>
          <li class="flex items-center gap-2 text-muted-foreground">
            <Icon class="opacity-80" name="heroicons:clock" /> Full-time
          </li>
        </ul>
      </li>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup></script>
