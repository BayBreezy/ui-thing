<template>
  <!-- 
    Accordion FAQ layout
    Features: Classic accordion with expand/collapse, centered layout, animated content
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
          Frequently asked questions
        </Motion>

        <Motion
          as="p"
          :variants="childVariant"
          class="text-muted-foreground mx-auto max-w-[800px] text-lg lg:text-xl"
        >
          Everything you need to know about the product and billing.
        </Motion>
      </UiContainer>
      <Motion as-child :variants="childVariant">
        <section class="mx-auto max-w-[768px]">
          <UiAccordion :default-value="['item-1']" type="multiple">
            <UiAccordionItem v-for="i in items" :key="i.value" :value="i.value">
              <UiAccordionHeader>
                <UiAccordionTrigger class="hover:text-primary text-lg">{{
                  i.title
                }}</UiAccordionTrigger>
              </UiAccordionHeader>
              <UiAccordionContent>
                <p class="text-muted-foreground text-base">{{ i.content }}</p>
              </UiAccordionContent>
            </UiAccordionItem>
          </UiAccordion>
        </section>
      </Motion>

      <Motion as-child :variants="childVariant">
        <section
          class="bg-muted/50 dark:bg-muted/20 mx-auto mt-16 flex flex-col items-center gap-6 rounded-lg py-8 text-center"
        >
          <p class="text-lg font-semibold">Still have questions?</p>
          <p class="text-muted-foreground">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <UiButton>
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

  const items = [
    {
      value: "item-1",
      title: "Is there a free trial available?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      value: "item-2",
      title: "Can I change my plan later?",
      content:
        "Of course! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences.",
    },
    {
      value: "item-3",
      title: "What is your cancellation policy?",
      content:
        "You can cancel your subscription at any time with no penalties. Your account will remain active until the end of your current billing period.",
    },
    {
      value: "item-4",
      title: "Can other info be added to an invoice?",
      content:
        "Yes, you can add custom information to your invoices such as PO numbers, tax IDs, or billing addresses through your account settings.",
    },
    {
      value: "item-5",
      title: "How does billing work?",
      content:
        "We bill you automatically at the start of each billing period. You'll receive an invoice via email, and payment will be processed using your saved payment method.",
    },
    {
      value: "item-6",
      title: "How do I change my account email?",
      content:
        "You can update your email address in your account settings. We'll send a verification email to your new address to confirm the change.",
    },
  ];
</script>
