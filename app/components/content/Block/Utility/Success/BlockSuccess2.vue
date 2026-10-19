<template>
  <!--
    Form submitted
    Features: Confirmation with reference number and copy button, submitted answers summary, what happens next steps, one tap rating of the form
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="text-center">
        <span
          class="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-full"
        >
          <Icon name="lucide:send" class="size-6" />
        </span>
        <h1 class="mt-5 text-3xl font-bold tracking-tight lg:text-4xl">{{ title }}</h1>
        <p class="text-muted-foreground mt-3 text-lg">{{ description }}</p>
        <p class="mt-4 inline-flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">Reference</span>
          <span class="font-mono font-medium">{{ reference }}</span>
          <UiButton
            variant="ghost"
            size="icon-xs"
            :aria-label="copied ? 'Reference copied' : 'Copy reference'"
            @click="copy(reference)"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
          </UiButton>
        </p>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle class="text-base">What you sent</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <dl class="space-y-3 text-sm">
              <div v-for="answer in answers" :key="answer.label">
                <dt class="text-muted-foreground text-xs">{{ answer.label }}</dt>
                <dd class="mt-0.5 font-medium">{{ answer.value }}</dd>
              </div>
            </dl>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle class="text-base">What happens next</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <ol class="space-y-4">
              <li v-for="(step, index) in steps" :key="step.title" class="flex gap-3 text-sm">
                <span
                  class="bg-muted grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold"
                  >{{ index + 1 }}</span
                >
                <span>
                  <span class="block font-medium">{{ step.title }}</span>
                  <span class="text-muted-foreground block text-xs">{{ step.text }}</span>
                </span>
              </li>
            </ol>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="mt-6 rounded-xl border p-4 text-center" role="group" aria-label="Rate this form">
        <template v-if="!rating">
          <p class="text-sm font-medium">How easy was that form?</p>
          <div class="mt-3 flex justify-center gap-1">
            <UiButton
              v-for="option in options"
              :key="option.value"
              variant="outline"
              size="icon"
              :aria-label="option.label"
              @click="rating = option.value"
            >
              <Icon :name="option.icon" class="size-5" />
            </UiButton>
          </div>
        </template>
        <p v-else class="text-sm" role="status">
          Thanks for rating it “{{ options.find((o) => o.value === rating)?.label.toLowerCase() }}”.
          <UiButton variant="link" size="sm" class="h-auto p-0" @click="rating = ''"
            >Change</UiButton
          >
        </p>
      </div>

      <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <UiButton variant="outline">Submit another response</UiButton>
        <UiButton>Back to home</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Answer = { label: string; value: string };
  type Step = { title: string; text: string };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      reference?: string;
      answers?: Answer[];
      steps?: Step[];
    }>(),
    {
      title: "Thanks, we got your message",
      description: "A real person reads every submission. Expect a reply within one working day.",
      reference: "SUP-2026-1842",
      answers: () => [
        { label: "Name", value: "Alex Rivera" },
        { label: "Email", value: "alex@example.com" },
        { label: "Topic", value: "Billing question" },
        { label: "Message", value: "I was charged twice for the annual plan." },
      ],
      steps: () => [
        { title: "We review your message", text: "Usually within a few hours." },
        { title: "You get a reply by email", text: "From a member of our support team." },
        { title: "We follow up if needed", text: "Reply to that email to add details." },
      ],
    }
  );

  const rating = ref("");
  const options = [
    { value: "hard", label: "Hard", icon: "lucide:frown" },
    { value: "okay", label: "Okay", icon: "lucide:meh" },
    { value: "easy", label: "Easy", icon: "lucide:smile" },
  ];

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });
</script>
