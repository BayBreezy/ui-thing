<template>
  <!-- 
    Two-column FAQ with categories
    Features: Split layout, category tabs, accordion per category, search bar
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
    <UiContainer class="py-16 lg:py-24">
      <div class="mb-8 text-center">
        <Motion
          as="h2"
          :variants="childVariant"
          class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:text-5xl"
        >
          How can we help?
        </Motion>

        <Motion
          as="p"
          :variants="childVariant"
          class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
        >
          Search our FAQ or browse by category below.
        </Motion>

        <Motion as-child :variants="childVariant">
          <div class="mx-auto mt-8 max-w-lg">
            <UiVeeInput
              v-model="searchQuery"
              icon="lucide:search"
              placeholder="Search for answers..."
            />
          </div>
        </Motion>
      </div>

      <Motion :variants="childVariant">
        <UiTabs default-value="general" class="mx-auto w-full max-w-lg">
          <UiTabsList class="mx-auto mb-8 grid w-full grid-cols-3">
            <UiTabsTrigger value="general">General</UiTabsTrigger>
            <UiTabsTrigger value="billing">Billing</UiTabsTrigger>
            <UiTabsTrigger value="technical">Technical</UiTabsTrigger>
          </UiTabsList>

          <UiTabsContent value="general">
            <section class="mx-auto">
              <UiAccordion type="single" collapsible>
                <UiAccordionItem v-for="i in generalFaqs" :key="i.value" :value="i.value">
                  <UiAccordionHeader>
                    <UiAccordionTrigger class="text-base hover:text-primary">{{
                      i.title
                    }}</UiAccordionTrigger>
                  </UiAccordionHeader>
                  <UiAccordionContent>
                    <p class="text-base text-muted-foreground">{{ i.content }}</p>
                  </UiAccordionContent>
                </UiAccordionItem>
              </UiAccordion>
            </section>
          </UiTabsContent>

          <UiTabsContent value="billing">
            <section class="mx-auto">
              <UiAccordion type="single" collapsible>
                <UiAccordionItem v-for="i in billingFaqs" :key="i.value" :value="i.value">
                  <UiAccordionHeader>
                    <UiAccordionTrigger class="text-base hover:text-primary">{{
                      i.title
                    }}</UiAccordionTrigger>
                  </UiAccordionHeader>
                  <UiAccordionContent>
                    <p class="text-base text-muted-foreground">{{ i.content }}</p>
                  </UiAccordionContent>
                </UiAccordionItem>
              </UiAccordion>
            </section>
          </UiTabsContent>

          <UiTabsContent value="technical">
            <section class="mx-auto">
              <UiAccordion type="single" collapsible>
                <UiAccordionItem v-for="i in technicalFaqs" :key="i.value" :value="i.value">
                  <UiAccordionHeader>
                    <UiAccordionTrigger class="text-base hover:text-primary">{{
                      i.title
                    }}</UiAccordionTrigger>
                  </UiAccordionHeader>
                  <UiAccordionContent>
                    <p class="text-base text-muted-foreground">{{ i.content }}</p>
                  </UiAccordionContent>
                </UiAccordionItem>
              </UiAccordion>
            </section>
          </UiTabsContent>
        </UiTabs>
      </Motion>

      <Motion as-child :variants="childVariant">
        <section
          class="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-6 rounded-lg bg-muted/50 py-8 text-center dark:bg-muted/20"
        >
          <p class="text-lg font-semibold">Still need help?</p>
          <p class="text-muted-foreground">Our support team is here to answer your questions.</p>
          <UiButton>
            Contact Support
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

  const searchQuery = ref("");

  const generalFaqs = [
    {
      value: "gen-1",
      title: "What is your product?",
      content:
        "Our product is a comprehensive solution that helps teams collaborate more effectively and get work done faster.",
    },
    {
      value: "gen-2",
      title: "Who can use this product?",
      content:
        "Anyone! Our product is designed for teams of all sizes, from startups to large enterprises.",
    },
    {
      value: "gen-3",
      title: "Is there a mobile app?",
      content:
        "Yes, we offer mobile apps for both iOS and Android devices with full feature parity.",
    },
  ];

  const billingFaqs = [
    {
      value: "bill-1",
      title: "What payment methods do you accept?",
      content:
        "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
    },
    {
      value: "bill-2",
      title: "Can I get a refund?",
      content:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
    },
    {
      value: "bill-3",
      title: "Do you offer discounts for nonprofits?",
      content:
        "Yes, we offer special pricing for nonprofit organizations and educational institutions.",
    },
  ];

  const technicalFaqs = [
    {
      value: "tech-1",
      title: "What are the system requirements?",
      content:
        "Our product works on all modern browsers and requires a stable internet connection.",
    },
    {
      value: "tech-2",
      title: "How do I integrate with other tools?",
      content: "We offer integrations with popular tools through our API and native connectors.",
    },
    {
      value: "tech-3",
      title: "Is my data backed up?",
      content:
        "Yes, we perform automated backups every hour and store them in multiple geographic locations.",
    },
  ];
</script>
