<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">FAQs</h2>

      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Everything you need to know about the product and billing.
      </p>
    </UiContainer>
    <section class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
      <template v-for="n in 9" :key="n">
        <div class="flex flex-col">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg border">
            <Icon name="lucide:heart" class="h-6 w-6" />
          </div>
          <p class="mt-5 text-lg font-semibold">Is there a free trial available?</p>
          <p class="mt-2 text-muted-foreground">
            Yes, you can try us for free for 30 days. Our friendly team will work with you to get
            you up and running as soon as possible.
          </p>
        </div>
      </template>
    </section>

    <section
      class="mx-auto mt-16 flex flex-col items-center justify-between gap-6 rounded-lg bg-muted/50 p-8 py-8 text-center dark:bg-muted/20 lg:flex-row lg:text-left"
    >
      <div>
        <p class="mb-3 text-lg font-semibold">Still have questions?</p>
        <p class="text-muted-foreground">
          Can't find the answer you're looking for? Please chat to our friendly team.
        </p>
      </div>
      <UiButton>Get in touch</UiButton>
    </section>
  </UiContainer>
</template>
