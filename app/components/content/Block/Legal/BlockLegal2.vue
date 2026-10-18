<template>
  <!--
    Terms of service with a scroll spy contents list
    Features: Two column layout with a sticky table of contents that highlights the section you are reading and scrolls smoothly on click, stacked on mobile
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <p class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          On this page
        </p>
        <nav class="mt-3" aria-label="Table of contents">
          <ul class="border-l">
            <li v-for="section in props.sections" :key="section.id">
              <a
                :href="`#${section.id}`"
                class="-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors"
                :class="
                  active === section.id
                    ? 'border-primary text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                "
                :aria-current="active === section.id ? 'location' : undefined"
                @click.prevent="go(section.id)"
              >
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <article ref="root" class="max-w-3xl">
        <div>
          <UiBadge variant="secondary">Legal</UiBadge>
          <h1 class="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {{ props.title }}
          </h1>
          <p class="text-muted-foreground mt-3 text-sm">Last updated {{ props.updated }}</p>
        </div>
        <div class="mt-10 space-y-12">
          <section
            v-for="section in props.sections"
            :id="section.id"
            :key="section.id"
            data-section
            class="scroll-mt-24"
          >
            <h2 class="text-2xl font-semibold tracking-tight">{{ section.title }}</h2>
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
    defineProps<{ title?: string; updated?: string; sections?: Section[] }>(),
    {
      title: "Terms of Service",
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

  const root = ref<HTMLElement | null>(null);
  const active = ref(props.sections[0]?.id ?? "");
  let observer: IntersectionObserver | undefined;

  let locked = false;

  function go(id: string) {
    active.value = id;
    locked = true;
    setTimeout(() => (locked = false), 900);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !locked) active.value = entry.target.id;
        }
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    root.value?.querySelectorAll("[data-section]").forEach((el) => observer?.observe(el));
  });
  onBeforeUnmount(() => observer?.disconnect());
</script>
