<template>
  <!--
    Accept terms after reading
    Features: Scrollable agreement with a progress bar, a consent checkbox that unlocks at the end of the document, and an accept button with a success state
  -->
  <UiContainer class="py-16 lg:py-24">
    <UiCard class="mx-auto max-w-2xl overflow-hidden">
      <div class="border-b p-6">
        <h1 class="text-2xl font-bold tracking-tight">{{ props.title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm">Please read to the end before continuing.</p>
      </div>
      <div class="bg-muted h-1">
        <div class="bg-primary h-full transition-all" :style="{ width: `${progress}%` }" />
      </div>
      <div
        ref="scroller"
        class="focus-visible:ring-ring h-80 space-y-6 overflow-y-auto p-6 outline-none focus-visible:ring-2 focus-visible:ring-inset"
        tabindex="0"
        role="region"
        aria-label="Terms of service"
        @scroll.passive="update"
      >
        <section v-for="(section, i) in props.sections" :key="section.id">
          <h2 class="font-semibold">{{ i + 1 }}. {{ section.title }}</h2>
          <p
            v-for="p in section.paragraphs"
            :key="p"
            class="text-muted-foreground mt-2 text-sm leading-relaxed"
          >
            {{ p }}
          </p>
          <ul
            v-if="section.list"
            class="text-muted-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed"
          >
            <li v-for="item in section.list" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
      <div class="border-t p-6">
        <div v-if="!accepted" class="space-y-4">
          <label class="flex items-start gap-3 text-sm" :class="reachedEnd ? '' : 'opacity-60'">
            <UiCheckbox
              v-model="agree"
              :disabled="!reachedEnd"
              aria-label="I have read and agree to the terms"
            />
            <span>I have read and agree to the Terms of Service and Privacy Policy.</span>
          </label>
          <p v-if="!reachedEnd" class="text-muted-foreground text-xs">
            Scroll to the end of the document to enable this checkbox.
          </p>
          <div class="flex justify-end gap-3">
            <UiButton variant="outline">Decline</UiButton>
            <UiButton :disabled="!agree" @click="accepted = true">Accept and continue</UiButton>
          </div>
        </div>
        <div v-else class="flex items-center gap-3 text-sm" role="status">
          <Icon name="lucide:circle-check" class="size-5 text-green-600 dark:text-green-400" />
          <p class="font-medium">Thanks, you accepted the terms.</p>
          <UiButton variant="ghost" size="sm" class="ml-auto" @click="reset">Undo</UiButton>
        </div>
      </div>
    </UiCard>
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

  const scroller = ref<HTMLElement | null>(null);
  const progress = ref(0);
  const reachedEnd = ref(false);
  const agree = ref(false);
  const accepted = ref(false);

  function update() {
    const el = scroller.value;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    progress.value = max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 100;
    if (progress.value >= 98) reachedEnd.value = true;
  }
  function reset() {
    accepted.value = false;
    agree.value = false;
  }
  onMounted(update);
</script>
