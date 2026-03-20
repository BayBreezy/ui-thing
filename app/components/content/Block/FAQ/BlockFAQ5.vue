<template>
  <!-- 
    Card-based FAQ with search
    Features: FAQ cards with hover effects, search filter, category badges
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
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
        >
          Frequently Asked Questions
        </Motion>

        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
        >
          Find answers to common questions about our service.
        </Motion>

        <Motion as-child :variants="childVariant">
          <div class="mx-auto mt-8 max-w-lg">
            <UiVeeInput v-model="searchQuery" icon="lucide:search" placeholder="Search FAQs..." />
          </div>
        </Motion>
      </div>

      <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Motion v-for="faq in filteredFaqs" :key="faq.id" :variants="childVariant" class="h-full">
          <UiCard
            as-child
            class="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <NuxtLink :to="faq.link || '#'" class="block h-full">
              <UiCardHeader>
                <div class="mb-3 flex items-center gap-2">
                  <UiBadge variant="outline" class="text-xs">{{ faq.category }}</UiBadge>
                </div>
                <UiCardTitle class="text-xl group-hover:text-primary">{{
                  faq.question
                }}</UiCardTitle>
              </UiCardHeader>
              <UiCardContent>
                <p class="text-muted-foreground">{{ faq.answer }}</p>
              </UiCardContent>
            </NuxtLink>
          </UiCard>
        </Motion>
      </section>

      <Motion as-child :variants="childVariant">
        <section
          class="mx-auto mt-16 flex flex-col items-center gap-6 rounded-lg border bg-muted/30 py-12 text-center dark:bg-muted/10"
        >
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Icon name="lucide:message-circle" class="h-7 w-7 text-primary" />
          </div>
          <div>
            <p class="mb-2 text-xl font-semibold">Can't find what you're looking for?</p>
            <p class="text-muted-foreground">
              Our team is always happy to help you find the answers you need.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <UiButton>
              <Icon name="lucide:mail" class="mr-2 h-4 w-4" />
              Email Us
            </UiButton>
            <UiButton variant="outline">
              <Icon name="lucide:phone" class="mr-2 h-4 w-4" />
              Call Support
            </UiButton>
          </div>
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

  const searchQuery = ref("");

  const faqs = [
    {
      id: 1,
      category: "General",
      question: "How do I get started?",
      answer:
        "Sign up for a free account, complete the onboarding, and you'll be ready to go in minutes.",
      link: "/getting-started/introduction",
    },
    {
      id: 2,
      category: "Billing",
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise plans.",
      link: "",
    },
    {
      id: 3,
      category: "Features",
      question: "Can I collaborate with my team?",
      answer: "Yes! You can invite unlimited team members and collaborate in real-time.",
      link: "",
    },
    {
      id: 4,
      category: "Security",
      question: "How secure is my data?",
      answer: "We use bank-level encryption and security measures to protect all your data.",
      link: "",
    },
    {
      id: 5,
      category: "Support",
      question: "Do you offer 24/7 support?",
      answer: "Yes, our support team is available around the clock via email and live chat.",
      link: "",
    },
    {
      id: 6,
      category: "Integration",
      question: "Does it integrate with other tools?",
      answer:
        "We integrate with over 50+ popular tools including Slack, Google Workspace, and more.",
      link: "",
    },
  ];

  const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqs;
    const query = searchQuery.value.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
    );
  });
</script>
