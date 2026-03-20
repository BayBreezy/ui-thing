<template>
  <!-- 
    Interactive collapsible FAQ cards
    Features: Animated expand/collapse, card hover, toggle icons
  -->
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.08),
        },
      },
    }"
  >
    <UiContainer class="pb-16">
      <div class="py-16 text-center lg:py-24">
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:text-5xl"
        >
          Got Questions?
        </Motion>

        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
        >
          We've got answers. Browse our most common questions below.
        </Motion>
      </div>
      <section class="mx-auto max-w-3xl space-y-4">
        <Motion v-for="(faq, idx) in faqs" :key="idx" :variants="childVariant">
          <UiCard
            class="cursor-pointer gap-0 transition-all hover:shadow-md"
            :class="[openIndex === idx ? 'border-primary' : '']"
            @click="toggleFaq(idx)"
          >
            <UiCardHeader>
              <div class="flex items-center justify-between gap-4">
                <UiCardTitle class="text-lg">{{ faq.question }}</UiCardTitle>
                <Icon
                  :name="openIndex === idx ? 'lucide:minus' : 'lucide:plus'"
                  class="h-5 w-5 shrink-0 text-primary transition-transform"
                />
              </div>
            </UiCardHeader>

            <AnimatePresence>
              <Motion
                v-if="openIndex === idx"
                :initial="{ opacity: 0, height: 0 }"
                :animate="{ opacity: 1, height: 'auto' }"
                :exit="{ height: 0, opacity: 0 }"
              >
                <UiCardContent class="mt-3">
                  <p class="text-muted-foreground">{{ faq.answer }}</p>
                </UiCardContent>
              </Motion>
            </AnimatePresence>
          </UiCard>
        </Motion>
      </section>

      <Motion as-child :variants="childVariant">
        <div class="mx-auto mt-16 max-w-2xl text-center">
          <p class="mb-4 text-lg font-semibold">Still have a question?</p>
          <p class="mb-6 text-muted-foreground">
            If you can't find the answer you're looking for, please reach out to our support team.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <UiButton>
              <Icon name="lucide:headphones" class="mr-2 h-4 w-4" />
              Live Chat
            </UiButton>
            <UiButton variant="outline">
              <Icon name="lucide:mail" class="mr-2 h-4 w-4" />
              Send Email
            </UiButton>
          </div>
        </div>
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const openIndex = ref<number | null>(0);

  const toggleFaq = (idx: number) => {
    openIndex.value = openIndex.value === idx ? null : idx;
  };

  const faqs = [
    {
      question: "What makes your product different?",
      answer:
        "Our product combines powerful features with an intuitive interface, making it easier for teams to collaborate and achieve their goals.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees. You only pay for your chosen plan, and you can start using the product immediately after signing up.",
    },
    {
      question: "Do you offer training or onboarding?",
      answer:
        "Yes, we provide comprehensive onboarding for all new customers, including live training sessions and detailed documentation.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Absolutely! You can export all your data at any time in multiple formats including CSV, JSON, and Excel.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We offer 24/7 email support for all plans, with priority live chat and phone support available on premium plans.",
    },
    {
      question: "Do you have an API?",
      answer:
        "Yes, we provide a comprehensive REST API that allows you to integrate our platform with your existing tools and workflows.",
    },
  ];
</script>
