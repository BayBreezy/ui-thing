<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center lg:py-24">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">
        Frequently asked questions
      </h2>

      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        Everything you need to know about the product and billing.
      </p>
    </UiContainer>
    <section class="mx-auto max-w-[768px]">
      <UiAccordion :default-value="['item-4']" type="multiple">
        <template v-for="i in items" :key="i.value">
          <UiAccordionItem :value="i.value">
            <UiAccordionHeader>
              <UiAccordionTrigger class="text-lg">{{ i.title }}</UiAccordionTrigger>
            </UiAccordionHeader>
            <UiAccordionContent>
              <p class="text-base text-muted-foreground">{{ i.content }}</p>
            </UiAccordionContent>
          </UiAccordionItem>
        </template>
      </UiAccordion>
    </section>

    <section
      class="mx-auto mt-16 flex flex-col items-center gap-6 rounded-lg bg-muted/50 py-8 text-center dark:bg-muted/20"
    >
      <p class="text-lg font-semibold">Still have questions?</p>
      <p class="text-muted-foreground">
        Can't find the answer you're looking for? Please chat to our friendly team.
      </p>
      <UiButton>Get in touch</UiButton>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  const items = [
    {
      value: "item-1",
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      title: "Is it unstyled?",
      content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    },
    {
      value: "item-3",
      title: "Can it be animated?",
      content: "Yes! You can use the transition prop to configure the animation.",
    },
    {
      value: "item-4",
      title: "Is there a free trial available?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];
</script>
