<template>
  <!--
    One legal center with tabs
    Features: Tabs switch between Terms of Service, Privacy Policy and Cookie Policy on one page, each with its own last updated date and numbered sections
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <UiBadge variant="secondary">Legal</UiBadge>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-3 text-lg">
          The agreements and policies that govern how we work together.
        </p>
      </div>
      <UiTabs v-model="tab" class="mt-10">
        <div class="flex justify-center overflow-x-auto">
          <UiTabsList>
            <UiTabsTrigger v-for="doc in props.documents" :key="doc.value" :value="doc.value">{{
              doc.label
            }}</UiTabsTrigger>
          </UiTabsList>
        </div>
      </UiTabs>
      <article :key="current.value" class="mt-10">
        <p class="text-muted-foreground text-sm">Last updated {{ current.updated }}</p>
        <div class="mt-6 space-y-8">
          <section v-for="(section, i) in current.sections" :key="section.id">
            <h2 class="text-xl font-semibold">{{ i + 1 }}. {{ section.title }}</h2>
            <p
              v-for="p in section.paragraphs"
              :key="p"
              class="text-muted-foreground mt-2 leading-relaxed"
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
      </article>
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
    defineProps<{
      title?: string;
      documents?: { value: string; label: string; updated: string; sections: Section[] }[];
    }>(),
    {
      title: "Legal center",
      documents: () => [
        {
          value: "terms",
          label: "Terms of Service",
          updated: "October 17, 2026",
          sections: [
            {
              id: "acceptance",
              title: "Acceptance of terms",
              summary: "Using the service means you agree to these terms.",
              paragraphs: [
                "By creating an account or using the service you agree to these Terms of Service and our Privacy Policy. If you are using the service on behalf of an organization, you confirm you have authority to bind it.",
              ],
            },
            {
              id: "accounts",
              title: "Your account",
              summary: "Keep your login safe and your details accurate.",
              paragraphs: [
                "You are responsible for the activity on your account and for keeping your credentials secure. Provide accurate information and let us know right away if you suspect unauthorized access.",
              ],
            },
            {
              id: "use",
              title: "Acceptable use",
              summary: "Be respectful and do not misuse the service.",
              paragraphs: [
                "You agree to use the service lawfully and not to interfere with it or with other people's use of it. You will not:",
              ],
              list: [
                "Attempt to gain unauthorized access to systems or data",
                "Upload malware or content that is unlawful or infringing",
                "Resell or sublicense the service without written permission",
                "Use the service to send spam or harass others",
              ],
            },
            {
              id: "content",
              title: "Content and ownership",
              summary: "You own your content. We own the product.",
              paragraphs: [
                "You keep all rights to the content you create. You grant us a limited license to host and process it so we can provide the service. We and our licensors retain all rights to the product, its design and its code.",
              ],
            },
            {
              id: "billing",
              title: "Payment and billing",
              summary: "Paid plans renew until you cancel.",
              paragraphs: [
                "Paid plans are billed in advance on a recurring basis and renew automatically until cancelled. You can cancel at any time and your plan will remain active until the end of the billing period. Fees are non refundable except where required by law.",
              ],
            },
            {
              id: "termination",
              title: "Termination",
              summary: "Either of us can end things at any time.",
              paragraphs: [
                "You may stop using the service and delete your account whenever you like. We may suspend or terminate access if you breach these terms or if we are required to by law. On termination, your right to use the service ends immediately.",
              ],
            },
            {
              id: "liability",
              title: "Disclaimers and liability",
              summary: "The service is provided as is, with limited liability.",
              paragraphs: [
                "The service is provided as is and as available without warranties of any kind. To the extent permitted by law, our total liability for any claim is limited to the amount you paid us in the twelve months before the claim arose.",
              ],
            },
            {
              id: "changes",
              title: "Changes and contact",
              summary: "We will tell you before material changes take effect.",
              paragraphs: [
                "We may update these terms from time to time. If a change is material we will notify you at least 30 days in advance. Questions about these terms can be sent to legal@uithing.com.",
              ],
            },
          ],
        },
        {
          value: "privacy",
          label: "Privacy Policy",
          updated: "October 17, 2026",
          sections: [
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
        },
        {
          value: "cookies",
          label: "Cookie Policy",
          updated: "September 2, 2026",
          sections: [
            {
              id: "what",
              title: "What are cookies",
              summary: "Small files that remember your visit.",
              paragraphs: [
                "Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences over time.",
              ],
            },
            {
              id: "how",
              title: "How we use cookies",
              summary: "To sign you in, remember settings and measure usage.",
              paragraphs: [
                "We use cookies to keep you signed in, remember your preferences, measure how the product is used and, with your consent, show relevant content.",
              ],
            },
            {
              id: "manage",
              title: "Managing cookies",
              summary: "Change your choices at any time.",
              paragraphs: [
                "You can change your cookie preferences at any time from the cookie settings link in the footer, or through your browser. Blocking some cookies may affect how the product works.",
              ],
            },
          ],
        },
      ],
    }
  );

  const tab = ref(props.documents[0]!.value);
  const current = computed(
    () => props.documents.find((d) => d.value === tab.value) ?? props.documents[0]!
  );
</script>
