<template>
  <section class="container py-20 md:py-32">
    <div class="mx-auto max-w-4xl">
      <div class="mb-12 text-center">
        <UiBadge variant="outline" size="lg" class="mb-4">
          <span>FAQ</span>
        </UiBadge>
        <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Frequently asked questions
        </h2>
        <p class="text-muted-foreground text-lg">Everything you need to know about UI Thing</p>
      </div>

      <UiAccordion type="single" collapsible class="w-full">
        <UiAccordionItem v-for="(faq, index) in faqs" :key="index" :value="`item-${index}`">
          <UiAccordionTrigger class="text-left">{{ faq.question }}</UiAccordionTrigger>
          <UiAccordionContent>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </div>
  </section>
</template>

<script setup lang="ts">
  const faqs = [
    {
      question: "What is UI Thing?",
      answer:
        "UI Thing is a comprehensive component library built with Nuxt, Vue, and TailwindCSS. It provides 60+ accessible, customizable UI components that you can copy and paste into your projects.",
    },
    {
      question: "Do I need to install it as a package?",
      answer:
        "No! UI Thing uses a copy-paste approach. You simply copy the component code you need and paste it into your project. This means no additional dependencies and complete control over the code.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes! UI Thing is completely free and open source under the MIT license. You can use it in personal and commercial projects without any restrictions.",
    },
    {
      question: "Does it support TypeScript?",
      answer:
        "Absolutely! All components are written in TypeScript with full type definitions. You'll get autocomplete and type safety out of the box.",
    },
    {
      question: "Can I customize the components?",
      answer:
        "Yes! Since you own the code, you can customize everything. Components are built with TailwindCSS, making it easy to change colors, spacing, and styles to match your brand.",
    },
    {
      question: "Is dark mode supported?",
      answer:
        "Yes! All components support dark mode out of the box. You can switch between light and dark themes, and there are multiple theme presets available.",
    },
    {
      question: "Are the components accessible?",
      answer:
        "Yes! Accessibility is a top priority. All components follow WAI-ARIA design patterns, are keyboard navigable, and include proper ARIA attributes.",
    },
    {
      question: "What frameworks does it work with?",
      answer:
        "UI Thing is built specifically for Nuxt 3 and Vue 3. While the components use Vue, you can adapt the patterns to other frameworks with some modifications.",
    },
  ];
</script>
