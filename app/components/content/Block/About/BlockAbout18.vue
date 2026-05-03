<template>
  <!-- 
    FAQ About Section
    Features: Frequently asked questions with collapsible answers
  -->
  <div class="container py-16 md:py-24">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
        <p class="text-muted-foreground mt-4 text-lg">
          Everything you need to know about our company
        </p>
      </div>

      <div class="mt-12 space-y-4">
        <UiCard v-for="faq in faqs" :key="faq.question" class="gap-0 overflow-hidden py-0">
          <UiCollapsible v-slot="{ open }">
            <UiCollapsibleTrigger
              class="hover:bg-muted/50 flex w-full items-start justify-between gap-4 p-6 text-left transition-colors"
            >
              <div>
                <h3 class="font-semibold">{{ faq.question }}</h3>
              </div>
              <Icon
                name="lucide:chevron-down"
                class="text-muted-foreground size-5 shrink-0 transition-transform"
                :class="{ 'rotate-180': open }"
              />
            </UiCollapsibleTrigger>
            <UiCollapsibleContent>
              <div class="text-muted-foreground px-6 pt-0 pb-6 text-sm">
                {{ faq.answer }}
              </div>
            </UiCollapsibleContent>
          </UiCollapsible>
        </UiCard>
      </div>

      <div class="bg-card mt-12 rounded-2xl border p-8 text-center">
        <Icon name="lucide:help-circle" class="text-primary mx-auto size-12" />
        <h3 class="mt-4 text-xl font-bold">Still have questions?</h3>
        <p class="text-muted-foreground mt-2">
          Can't find the answer you're looking for? Our team is here to help.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <UiButton>Contact Support</UiButton>
          <UiButton variant="outline">Schedule a Call</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const faqs = [
    {
      question: "What is your company's background and history?",
      answer:
        "We were founded in 2015 with a mission to revolutionize the industry through innovative technology. Starting with just three people in a garage, we've grown to a team of over 500 employees across 10 global offices, serving thousands of customers worldwide.",
    },
    {
      question: "What makes your company different from competitors?",
      answer:
        "Our commitment to innovation, customer-first approach, and proven track record set us apart. We invest heavily in R&D, maintain the highest security standards, and provide 24/7 support. Our solutions are built on cutting-edge technology while remaining intuitive and user-friendly.",
    },
    {
      question: "What are your company values?",
      answer:
        "We're guided by five core values: Customer Obsession, Innovation First, Integrity Always, Collaborative Spirit, and Excellence Driven. These principles shape our culture, guide our decisions, and define how we work with customers and each other.",
    },
    {
      question: "How large is your team and where are you located?",
      answer:
        "We have over 500 employees working across 10 offices globally, including San Francisco (HQ), London, Singapore, Berlin, Tokyo, and Sydney. We also support remote work, allowing us to attract top talent from around the world.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve a diverse range of industries including technology, finance, healthcare, retail, manufacturing, and education. Our solutions are designed to be flexible and scalable, adapting to the unique needs of different sectors.",
    },
    {
      question: "Are you hiring?",
      answer:
        "Yes! We're always looking for talented individuals to join our team. We offer competitive compensation, comprehensive benefits, opportunities for growth, and a culture that celebrates diversity and innovation. Check our careers page for current openings.",
    },
    {
      question: "How do you ensure data security and privacy?",
      answer:
        "Security is our top priority. We're SOC 2 Type II certified, GDPR compliant, and ISO 27001 certified. We use end-to-end encryption, conduct regular security audits, and maintain strict access controls. Your data is protected by enterprise-grade security measures.",
    },
    {
      question: "What is your company's commitment to sustainability?",
      answer:
        "We're committed to sustainable growth and environmental responsibility. Our offices use renewable energy, we've implemented carbon offset programs, and we're working toward becoming carbon neutral by 2025. We believe in building a business that's good for both people and the planet.",
    },
  ];
</script>
