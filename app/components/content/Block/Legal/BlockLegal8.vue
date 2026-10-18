<template>
  <!--
    Document header with downloads and contents chips
    Features: Header with last updated date, version picker, print and download buttons and a row of jump to chips, above a readable document
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <UiBadge variant="secondary">Legal</UiBadge>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {{ props.title }}
          </h1>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline" size="sm">
                Version {{ version }}
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem
                v-for="v in versions"
                :key="v"
                :title="`Version ${v}`"
                @select="version = v"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiButton variant="outline" size="sm" @click="print">
            <Icon name="lucide:printer" class="size-4" />
            Print
          </UiButton>
          <UiButton size="sm" @click="useSonner.success('Download started')">
            <Icon name="lucide:download" class="size-4" />
            PDF
          </UiButton>
        </div>
      </div>
      <p class="text-muted-foreground mt-3 text-sm">
        Last updated {{ props.updated }} · Effective immediately
      </p>

      <nav class="mt-8 flex flex-wrap gap-2" aria-label="Jump to section">
        <a
          v-for="section in props.sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="hover:bg-muted rounded-full border px-3 py-1 text-xs font-medium transition-colors"
        >
          {{ section.title }}
        </a>
      </nav>

      <div class="mt-10 space-y-10">
        <section
          v-for="section in props.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-24"
        >
          <h2 class="text-xl font-semibold tracking-tight">{{ section.title }}</h2>
          <p
            v-for="p in section.paragraphs"
            :key="p"
            class="text-muted-foreground mt-3 leading-relaxed"
          >
            {{ p }}
          </p>
          <ul
            v-if="section.list"
            class="text-muted-foreground mt-3 list-disc space-y-1.5 pl-6 leading-relaxed"
          >
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
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

  const versions = ["3.2", "3.1", "3.0", "2.4"];
  const version = ref(versions[0]!);

  function print() {
    window.print();
  }
</script>
