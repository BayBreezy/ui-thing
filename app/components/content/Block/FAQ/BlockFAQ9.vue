<template>
  <!--
    FAQ accordion with helpful votes
    Features: Accordion answers with "Was this helpful?" thumbs up and down, thank you message, follow up link after a negative vote, vote tally per answer
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">Frequently asked questions</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          Tell us whether an answer helped. It shapes what we write next.
        </p>
      </div>

      <UiAccordion type="single" collapsible default-value="q-1" class="mt-10">
        <UiAccordionItem v-for="faq in faqs" :key="faq.id" :value="`q-${faq.id}`">
          <UiAccordionHeader>
            <UiAccordionTrigger class="text-base hover:no-underline">{{
              faq.question
            }}</UiAccordionTrigger>
          </UiAccordionHeader>
          <UiAccordionContent>
            <p class="text-muted-foreground">{{ faq.answer }}</p>

            <div class="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
              <template v-if="!votes[faq.id]">
                <span class="text-sm font-medium">Was this helpful?</span>
                <div class="flex gap-2">
                  <UiButton variant="outline" size="sm" @click="vote(faq.id, 'yes')">
                    <Icon name="lucide:thumbs-up" class="size-4" />Yes
                  </UiButton>
                  <UiButton variant="outline" size="sm" @click="vote(faq.id, 'no')">
                    <Icon name="lucide:thumbs-down" class="size-4" />No
                  </UiButton>
                </div>
              </template>
              <p v-else class="flex flex-wrap items-center gap-2 text-sm" role="status">
                <Icon
                  :name="votes[faq.id] === 'yes' ? 'lucide:circle-check' : 'lucide:message-circle'"
                  class="text-primary size-4"
                />
                <span v-if="votes[faq.id] === 'yes'"
                  >Glad that helped. Thanks for the feedback.</span
                >
                <span v-else
                  >Sorry about that.
                  <a href="#contact" class="text-primary underline underline-offset-4"
                    >Ask our team</a
                  >
                  and we will improve this answer.</span
                >
                <UiButton variant="link" size="sm" class="h-auto p-0" @click="undo(faq.id)"
                  >Undo</UiButton
                >
              </p>
              <span class="text-muted-foreground ml-auto text-xs"
                >{{ tally(faq) }}% found this helpful</span
              >
            </div>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Faq = { id: number; question: string; answer: string; yes: number; no: number };

  withDefaults(
    defineProps<{
      faqs?: Faq[];
    }>(),
    {
      faqs: () => [
        {
          id: 1,
          question: "Is there a free plan?",
          answer:
            "Yes. The free plan includes three projects and one teammate, with no time limit and no credit card required.",
          yes: 92,
          no: 8,
        },
        {
          id: 2,
          question: "Can I cancel at any time?",
          answer:
            "You can cancel from Billing in two clicks. Your plan stays active until the end of the period you already paid for.",
          yes: 86,
          no: 14,
        },
        {
          id: 3,
          question: "How is my data protected?",
          answer:
            "Data is encrypted in transit and at rest, backups run every night, and we are audited each year against SOC 2.",
          yes: 78,
          no: 22,
        },
        {
          id: 4,
          question: "Do you offer discounts for nonprofits?",
          answer:
            "Registered nonprofits and open source projects get 50% off any paid plan. Send us your registration details to apply.",
          yes: 64,
          no: 36,
        },
      ],
    }
  );

  const votes = ref<Record<number, "yes" | "no" | undefined>>({});

  function vote(id: number, value: "yes" | "no") {
    votes.value = { ...votes.value, [id]: value };
  }

  function undo(id: number) {
    votes.value = { ...votes.value, [id]: undefined };
  }

  function tally(faq: Faq) {
    const mine = votes.value[faq.id];
    const yes = faq.yes + (mine === "yes" ? 1 : 0);
    const total = faq.yes + faq.no + (mine ? 1 : 0);
    return Math.round((yes / total) * 100);
  }
</script>
