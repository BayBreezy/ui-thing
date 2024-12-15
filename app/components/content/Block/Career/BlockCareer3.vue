<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <p class="font-semibold text-primary">We're hiring!</p>
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">Join our team</h2>
      <p class="mx-auto max-w-[768px] text-lg text-muted-foreground lg:text-xl">
        Our philosophy is simple — hire a team of diverse, passionate people and foster a culture
        that empowers you to do your best work.
      </p>
    </UiContainer>
    <div class="flex flex-col gap-x-16 gap-y-16 lg:flex-row">
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
      <div class="w-full lg:w-1/2">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Careers image"
          height="650"
          width="600"
          loading="lazy"
          class="h-[250px] w-full object-cover lg:h-full"
        />
      </div>
    </div>
  </UiContainer>
</template>
