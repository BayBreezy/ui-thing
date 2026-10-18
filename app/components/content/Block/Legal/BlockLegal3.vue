<template>
  <!--
    Privacy at a glance with expandable details
    Features: Three highlight cards with fancy icons summarizing the policy, then every section as an accordion with an expand all control
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <div>
        <UiBadge variant="secondary">Legal</UiBadge>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-3 text-sm">Last updated {{ props.updated }}</p>
      </div>
      <ul class="mt-10 grid gap-4 sm:grid-cols-3">
        <li v-for="card in highlights" :key="card.title" class="bg-card rounded-2xl border p-5">
          <UiFancyIcon :icon="card.icon" theme="light" :color="card.color" />
          <p class="mt-4 font-semibold">{{ card.title }}</p>
          <p class="text-muted-foreground mt-1 text-sm">{{ card.text }}</p>
        </li>
      </ul>

      <div class="mt-12 flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold">The full policy</h2>
        <UiButton variant="ghost" size="sm" @click="toggleAll">
          {{ open.length === props.sections.length ? "Collapse all" : "Expand all" }}
        </UiButton>
      </div>
      <UiAccordion v-model="open" type="multiple" class="mt-2">
        <UiAccordionItem v-for="section in props.sections" :key="section.id" :value="section.id">
          <UiAccordionHeader>
            <UiAccordionTrigger class="text-base">{{ section.title }}</UiAccordionTrigger>
          </UiAccordionHeader>
          <UiAccordionContent>
            <p
              v-for="p in section.paragraphs"
              :key="p"
              class="text-muted-foreground leading-relaxed"
            >
              {{ p }}
            </p>
            <ul
              v-if="section.list"
              class="text-muted-foreground mt-3 list-disc space-y-1.5 pl-6 leading-relaxed"
            >
              <li v-for="item in section.list" :key="item">{{ item }}</li>
            </ul>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Section = {
    id: string;
    title: string;
    summary: string;
    paragraphs: string[];
    list?: string[];
  };

  const props = withDefaults(
    defineProps<{ title?: string; updated?: string; sections?: Section[] }>(),
    {
      title: "Privacy Policy",
      updated: "October 17, 2026",
      sections: () => [
        {
          id: "collect",
          title: "Information we collect",
          summary: "We collect what you give us and basic usage data.",
          paragraphs: [
            "We collect information you provide directly, such as when you create an account, update your profile or contact support. We also collect some information automatically when you use the service.",
          ],
          list: [
            "Account details such as your name, email address and password",
            "Billing information handled by our payment processor",
            "Usage data such as pages viewed, features used and device type",
            "Messages you send to our support team",
          ],
        },
        {
          id: "use",
          title: "How we use information",
          summary: "To run, improve and protect the product, never to sell your data.",
          paragraphs: [
            "We use your information to provide and maintain the service, to improve it, to communicate with you and to keep it secure. We do not sell your personal information.",
          ],
          list: [
            "Provide, maintain and personalize the service",
            "Send receipts, security alerts and product updates",
            "Detect, prevent and respond to fraud or abuse",
            "Understand how the product is used so we can improve it",
          ],
        },
        {
          id: "share",
          title: "How we share information",
          summary: "Only with trusted providers and when the law requires it.",
          paragraphs: [
            "We share information with service providers who help us run the product, such as hosting, payments and analytics. They may only use it to perform services for us and must protect it.",
            "We may also disclose information if required by law, or to protect the rights, safety and property of our users and company.",
          ],
        },
        {
          id: "cookies",
          title: "Cookies and similar technologies",
          summary: "A few cookies keep you signed in and help us measure usage.",
          paragraphs: [
            "We use cookies and similar technologies to keep you signed in, remember your preferences and understand how the product is used. You can control cookies through your browser settings and our cookie preferences.",
          ],
        },
        {
          id: "retention",
          title: "Data retention",
          summary: "We keep data only as long as we need it.",
          paragraphs: [
            "We keep your information for as long as your account is active or as needed to provide the service. When you delete your account we remove or anonymize your data within 30 days, except where we must keep it for legal reasons.",
          ],
        },
        {
          id: "rights",
          title: "Your rights and choices",
          summary: "You can access, fix, export or delete your data.",
          paragraphs: [
            "Depending on where you live, you may have rights over your personal information. You can exercise them at any time from your account settings or by contacting us.",
          ],
          list: [
            "Access and download a copy of your data",
            "Correct information that is inaccurate",
            "Delete your account and associated data",
            "Object to or restrict certain processing",
          ],
        },
        {
          id: "security",
          title: "Security",
          summary: "Encryption, access controls and regular audits.",
          paragraphs: [
            "We use industry standard safeguards including encryption in transit and at rest, strict access controls and regular security reviews. No system is perfectly secure, so we also encourage you to use a strong, unique password and two factor authentication.",
          ],
        },
        {
          id: "contact",
          title: "Contact us",
          summary: "Questions go to privacy@uithing.com.",
          paragraphs: [
            "If you have questions about this policy or how we handle your data, email privacy@uithing.com or write to Acme Inc., 100 Market Street, San Francisco, CA 94105.",
          ],
        },
      ],
    }
  );

  const highlights = [
    {
      title: "We never sell your data",
      text: "Your information is used to run the product, nothing else.",
      icon: "lucide:shield-check",
      color: "success" as const,
    },
    {
      title: "You are in control",
      text: "Access, export or delete your data whenever you like.",
      icon: "lucide:sliders-horizontal",
      color: "info" as const,
    },
    {
      title: "Protected by default",
      text: "Encrypted in transit and at rest with strict access.",
      icon: "lucide:lock-keyhole",
      color: "primary" as const,
    },
  ];

  const open = ref<string[]>([]);
  function toggleAll() {
    open.value = open.value.length === props.sections.length ? [] : props.sections.map((s) => s.id);
  }
</script>
