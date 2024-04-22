<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">Open positions</h2>
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        We're a 100% remote team spread all across the world. Join us!
      </p>
    </UiContainer>

    <ul class="mx-auto flex max-w-[768px] flex-col gap-8">
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
