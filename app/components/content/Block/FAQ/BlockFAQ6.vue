<template>
  <!-- 
    Minimal two-column FAQ
    Features: Side-by-side layout, compact design, visual hierarchy
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
    <UiContainer class="py-16">
      <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Motion as-child :variants="childVariant">
          <div class="lg:sticky lg:top-16 lg:self-start">
            <UiBadge class="mb-4">FAQ</UiBadge>
            <h2 class="mb-4 text-4xl font-bold lg:text-5xl">Questions & Answers</h2>
            <p class="mb-8 text-lg text-muted-foreground">
              Everything you need to know about our product and how it works.
            </p>
            <UiButton variant="outline">
              Contact Support
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </UiButton>
          </div>
        </Motion>

        <ul class="space-y-8">
          <Motion
            v-for="(faq, idx) in faqs"
            :key="idx"
            as="li"
            :variants="childVariant"
            class="border-b pb-8 last:border-0"
          >
            <h3 class="mb-3 font-bold text-pretty">{{ faq.question }}</h3>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </Motion>
        </ul>
      </div>
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
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Of course! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your subscription at any time with no penalties. Your account will remain active until the end of your billing period.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, you can add custom information to your invoices such as PO numbers, tax IDs, or billing addresses.",
    },
    {
      question: "How does billing work?",
      answer:
        "We bill you automatically at the start of each billing period. You'll receive an invoice via email.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "You can update your email address in your account settings. We'll send a verification email to confirm.",
    },
  ];
</script>
