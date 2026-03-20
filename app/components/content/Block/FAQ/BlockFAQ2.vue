<template>
  <!-- 
    Grid FAQ with left-aligned cards
    Features: Three-column grid, left-aligned text, icon cards, horizontal CTA
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
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <UiContainer class="pb-16">
      <UiContainer class="py-16 text-center lg:py-24">
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
        >
          FAQs
        </Motion>

        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
        >
          Everything you need to know about the product and billing.
        </Motion>
      </UiContainer>
      <section class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
        <Motion v-for="(faq, n) in faqs" :key="n" :variants="childVariant" class="flex flex-col">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary/5 transition-colors hover:bg-primary/10"
          >
            <Icon :name="faq.icon" class="h-6 w-6 text-primary" />
          </div>
          <p class="mt-5 text-lg font-semibold">{{ faq.question }}</p>
          <p class="mt-2 text-muted-foreground">
            {{ faq.answer }}
          </p>
        </Motion>
      </section>

      <Motion as-child :variants="childVariant">
        <section
          class="mx-auto mt-16 flex flex-col items-center justify-between gap-6 rounded-lg bg-muted/50 p-8 py-8 text-center lg:flex-row lg:text-left dark:bg-muted/20"
        >
          <div>
            <p class="mb-3 text-lg font-semibold">Still have questions?</p>
            <p class="text-muted-foreground">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
          </div>
          <UiButton class="shrink-0">
            Get in touch
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </UiButton>
        </section>
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

  const faqs = [
    {
      icon: "lucide:sparkles",
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.",
    },
    {
      icon: "lucide:credit-card",
      question: "Can I change my plan later?",
      answer:
        "Of course! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      icon: "lucide:users",
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your subscription at any time. Your account will remain active until the end of your billing period.",
    },
    {
      icon: "lucide:lock",
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security measures to protect your data at all times.",
    },
    {
      icon: "lucide:headphones",
      question: "Do you offer customer support?",
      answer:
        "Yes! Our support team is available 24/7 via email and live chat to help you with any questions or issues.",
    },
    {
      icon: "lucide:zap",
      question: "How do I get started?",
      answer:
        "Simply sign up for an account, choose your plan, and you'll be up and running in minutes with our quick onboarding process.",
    },
  ];
</script>
