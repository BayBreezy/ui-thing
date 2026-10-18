<template>
  <!--
    Ask a question form with suggestions
    Features: Question field that suggests matching existing answers as you type, expandable suggestion answers, email and details fields, validation, confirmation state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">Ask us anything</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          Start typing. We will check whether someone already asked.
        </p>
      </div>

      <UiCard class="mt-8">
        <UiCardContent v-if="sent" class="space-y-3 py-6 text-center" role="status">
          <span
            class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
            ><Icon name="lucide:check" class="size-6"
          /></span>
          <p class="text-lg font-semibold">Question received</p>
          <p class="text-muted-foreground text-sm">
            We will reply to
            <span class="text-foreground font-medium">{{ email.trim() }}</span> within one working
            day.
          </p>
          <UiButton variant="outline" @click="reset">Ask another question</UiButton>
        </UiCardContent>

        <UiCardContent v-else>
          <form class="grid gap-5" novalidate @submit.prevent="submit">
            <div class="grid gap-2">
              <UiLabel for="ask-question">Your question</UiLabel>
              <UiInput
                id="ask-question"
                v-model="question"
                placeholder="How do I export my data?"
                autocomplete="off"
                :aria-invalid="!!errors.question"
              />
              <p v-if="errors.question" class="text-destructive text-sm">{{ errors.question }}</p>
            </div>

            <div v-if="suggestions.length" class="grid gap-2" aria-live="polite">
              <p class="text-sm font-medium">Maybe one of these answers it</p>
              <ul class="divide-y rounded-lg border">
                <li v-for="item in suggestions" :key="item.id">
                  <button
                    type="button"
                    class="hover:bg-muted/50 flex w-full items-center justify-between gap-3 p-3 text-left text-sm transition-colors"
                    :aria-expanded="shown === item.id"
                    @click="shown = shown === item.id ? null : item.id"
                  >
                    <span class="font-medium">{{ item.question }}</span>
                    <Icon
                      name="lucide:chevron-down"
                      class="text-muted-foreground size-4 shrink-0 transition-transform"
                      :class="shown === item.id ? 'rotate-180' : ''"
                    />
                  </button>
                  <p v-if="shown === item.id" class="text-muted-foreground px-3 pb-3 text-sm">
                    {{ item.answer }}
                  </p>
                </li>
              </ul>
            </div>

            <div class="grid gap-2">
              <UiLabel for="ask-email">Email</UiLabel>
              <UiInput
                id="ask-email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
                :aria-invalid="!!errors.email"
              />
              <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
            </div>

            <div class="grid gap-2">
              <UiLabel for="ask-details">More details (optional)</UiLabel>
              <UiTextarea
                id="ask-details"
                v-model="details"
                :rows="3"
                placeholder="Anything that helps us answer faster."
              />
            </div>

            <UiButton type="submit" size="lg">Send question</UiButton>
          </form>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Faq = { id: number; question: string; answer: string };

  const props = withDefaults(
    defineProps<{
      faqs?: Faq[];
    }>(),
    {
      faqs: () => [
        {
          id: 1,
          question: "How do I export my data?",
          answer:
            "Open Settings and Data, then choose Export. You will get an email with a download link for a CSV or JSON archive.",
        },
        {
          id: 2,
          question: "How do I delete my account?",
          answer:
            "Go to Settings and Account, then Delete account. Your data is removed within 30 days and cannot be recovered.",
        },
        {
          id: 3,
          question: "How do I change my plan?",
          answer:
            "Visit Billing and pick a new plan. Upgrades apply right away and downgrades start at the next renewal.",
        },
        {
          id: 4,
          question: "How do I connect Slack?",
          answer:
            "Open Integrations, choose Slack and approve the connection. Then pick the channel for notifications.",
        },
        {
          id: 5,
          question: "Can I export a single project?",
          answer:
            "Yes. Open the project menu and choose Export project to download just that project's data.",
        },
      ],
    }
  );

  const question = ref("");
  const email = ref("");
  const details = ref("");
  const errors = reactive({ question: "", email: "" });
  const sent = ref(false);
  const shown = ref<number | null>(null);

  const suggestions = computed(() => {
    const words = question.value
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length > 3);
    if (!words.length) return [];
    return props.faqs
      .map((faq) => ({
        faq,
        score: words.filter((word) => faq.question.toLowerCase().includes(word)).length,
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((entry) => entry.faq);
  });

  function submit() {
    errors.question =
      question.value.trim().length >= 8 ? "" : "Write a question of at least 8 characters.";
    errors.email = /^\S+@\S+\.\S+$/.test(email.value.trim()) ? "" : "Enter a valid email address.";
    if (errors.question || errors.email) return;
    sent.value = true;
  }

  function reset() {
    question.value = "";
    email.value = "";
    details.value = "";
    shown.value = null;
    sent.value = false;
  }
</script>
