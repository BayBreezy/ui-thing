<template>
  <UiContainer class="relative flex flex-col items-center py-10 text-center lg:py-20">
    <div>
      <UiBadge to="#" variant="outline" class="px-3 py-1.5 text-sm font-normal lg:py-2"
        >New feature! Check out our new dashboard
        <Icon class="ml-3 h-4 w-4" name="lucide:arrow-right"
      /></UiBadge>
    </div>

    <h1 class="mb-4 mt-7 text-4xl font-bold lg:mb-6 lg:mt-5 lg:text-center lg:text-5xl xl:text-6xl">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      High-performing remote teams.<br />The future of work.
    </h1>
    <p class="mx-auto max-w-[760px] text-lg text-muted-foreground lg:text-center lg:text-xl">
      Powerful, self-serve team engagement tools and analytics. Supercharge your managers & keep
      employees engaged from anywhere.
    </p>

    <div class="mt-8 grid w-full grid-cols-1 items-center gap-3 sm:flex sm:justify-center lg:mt-10">
      <UiButton size="lg" variant="outline"> <Icon name="lucide:play-circle" /> Demo </UiButton>
      <UiButton size="lg">Sign up</UiButton>
    </div>

    <div
      class="mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-md lg:mt-10 lg:h-[520px] lg:w-[900px] lg:rounded-lg"
    >
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/oYEtLQ3lEH0?si=fQ6bK1XLkFAQBePK"
        :title="`${COMPANY_NAME} hero section seven video`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup></script>
