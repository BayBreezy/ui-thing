<template>
  <!--
    Plain English side by side
    Features: Each section pairs a short plain language summary with the full legal text, so people can skim first and read the detail only where they need it
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-5xl">
      <div>
        <UiBadge variant="secondary">Legal</UiBadge>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-3 text-sm">Last updated {{ props.updated }}</p>
      </div>
      <p class="text-muted-foreground mt-6 max-w-2xl text-lg">
        Legal text is hard to read. We added a plain English summary next to every section. The full
        text is what counts, the summary is just here to help.
      </p>
      <div class="mt-12 divide-y border-y">
        <section
          v-for="section in props.sections"
          :key="section.id"
          class="grid gap-4 py-8 md:grid-cols-[1fr_2fr] md:gap-10"
        >
          <div>
            <h2 class="font-semibold">{{ section.title }}</h2>
            <div
              class="bg-primary/5 border-primary/20 mt-3 flex gap-2 rounded-xl border p-3 text-sm"
            >
              <Icon name="lucide:message-circle" class="text-primary mt-0.5 size-4 shrink-0" />
              <p>{{ section.summary }}</p>
            </div>
          </div>
          <div>
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
          </div>
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
      title: "Terms of Service, in plain English",
      updated: "October 17, 2026",
      sections: () => [
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
    }
  );
</script>
