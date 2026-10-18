<template>
  <!--
    FAQ search with highlighted matches
    Features: Search field with clear button, popular topic chips, matched words highlighted in questions and answers, live result count, no results state with support link
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">How can we help?</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          Search the help center or pick a popular topic.
        </p>
      </div>

      <div class="relative mt-8">
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          v-model="query"
          type="search"
          aria-label="Search questions"
          placeholder="Search for refunds, invoices, passwords..."
          class="h-11 px-9"
        />
        <UiButton
          v-if="query"
          variant="ghost"
          size="icon-sm"
          class="absolute top-1/2 right-1.5 -translate-y-1/2"
          aria-label="Clear search"
          @click="query = ''"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiButton>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span class="text-muted-foreground text-sm">Popular:</span>
        <UiButton
          v-for="topic in topics"
          :key="topic"
          variant="outline"
          size="xs"
          class="rounded-full"
          @click="query = topic"
        >
          {{ topic }}
        </UiButton>
      </div>

      <p class="text-muted-foreground mt-8 text-sm" role="status">
        {{
          term
            ? `${results.length} ${results.length === 1 ? "result" : "results"} for "${term}"`
            : `${results.length} questions`
        }}
      </p>

      <ul v-if="results.length" class="mt-3 grid gap-3">
        <li v-for="faq in results" :key="faq.id" class="rounded-xl border p-5">
          <UiBadge variant="secondary" size="sm">{{ faq.category }}</UiBadge>
          <h3 class="mt-2 font-semibold">
            <template v-for="(part, index) in split(faq.question)" :key="index"
              ><mark v-if="part.hit" class="bg-primary/20 text-foreground rounded px-0.5">{{
                part.text
              }}</mark
              ><template v-else>{{ part.text }}</template></template
            >
          </h3>
          <p class="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            <template v-for="(part, index) in split(faq.answer)" :key="index"
              ><mark v-if="part.hit" class="bg-primary/20 text-foreground rounded px-0.5">{{
                part.text
              }}</mark
              ><template v-else>{{ part.text }}</template></template
            >
          </p>
        </li>
      </ul>

      <div v-else class="mt-3 rounded-xl border border-dashed p-10 text-center">
        <p class="font-medium">Nothing found for "{{ term }}"</p>
        <p class="text-muted-foreground mt-1 text-sm">
          Check the spelling, try a broader word, or ask our team directly.
        </p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <UiButton variant="outline" size="sm" @click="query = ''">Clear search</UiButton>
          <UiButton size="sm"><Icon name="lucide:mail" class="size-4" />Contact support</UiButton>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Faq = { id: number; category: string; question: string; answer: string };

  const props = withDefaults(
    defineProps<{
      faqs?: Faq[];
      topics?: string[];
    }>(),
    {
      faqs: () => [
        {
          id: 1,
          category: "Billing",
          question: "How do I download an invoice?",
          answer:
            "Open Settings, choose Billing and select any past payment. Each invoice can be saved as a PDF with your company details.",
        },
        {
          id: 2,
          category: "Billing",
          question: "Can I get a refund?",
          answer:
            "Yes. Annual plans can be refunded in full within 30 days of purchase. Monthly plans are refunded for the current month only.",
        },
        {
          id: 3,
          category: "Account",
          question: "How do I reset my password?",
          answer:
            "Use the Forgot password link on the sign in page. We email a reset link that stays valid for one hour.",
        },
        {
          id: 4,
          category: "Account",
          question: "Can I change the email on my account?",
          answer:
            "You can change it under Settings and Profile. We send a confirmation link to the new address before the change applies.",
        },
        {
          id: 5,
          category: "Teams",
          question: "How do I invite teammates?",
          answer:
            "Go to Members and choose Invite. Teammates receive an email, and you can set their role before they join.",
        },
        {
          id: 6,
          category: "Teams",
          question: "What happens to data when someone leaves?",
          answer:
            "Their work stays in the workspace. An admin can reassign ownership of projects and remove the member in one step.",
        },
        {
          id: 7,
          category: "Security",
          question: "Do you support two factor authentication?",
          answer:
            "Yes. Turn on an authenticator app or a security key under Settings and Security. Admins can require it for the whole team.",
        },
      ],
      topics: () => ["invoice", "refund", "password", "invite"],
    }
  );

  const query = ref("");
  const term = computed(() => query.value.trim());

  const results = computed(() => {
    const needle = term.value.toLowerCase();
    if (!needle) return props.faqs;
    return props.faqs.filter((faq) =>
      `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(needle)
    );
  });

  function split(text: string) {
    const needle = term.value;
    if (!needle) return [{ text, hit: false }];
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text
      .split(new RegExp(`(${escaped})`, "gi"))
      .filter(Boolean)
      .map((part) => ({ text: part, hit: part.toLowerCase() === needle.toLowerCase() }));
  }
</script>
