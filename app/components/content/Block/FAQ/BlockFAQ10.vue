<template>
  <!--
    FAQ with support contact card
    Features: Grouped accordions with expand all and collapse all, sticky support card with team avatars, response time and contact actions
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-bold lg:text-4xl">Questions about pricing and plans</h2>
        <p class="text-muted-foreground mt-3 text-lg">
          The quick answers. For anything else, our team replies within a few hours.
        </p>
      </div>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div class="min-w-0">
          <div class="flex items-center justify-between gap-3">
            <p class="text-muted-foreground text-sm" role="status">
              {{ open.length }} of {{ total }} open
            </p>
            <div class="flex gap-2">
              <UiButton
                variant="outline"
                size="sm"
                :disabled="open.length === total"
                @click="expandAll"
              >
                Expand all
              </UiButton>
              <UiButton variant="outline" size="sm" :disabled="!open.length" @click="open = []">
                Collapse all
              </UiButton>
            </div>
          </div>

          <UiAccordion v-model="open" type="multiple" class="mt-4 space-y-6">
            <section v-for="group in groups" :key="group.title" :aria-label="group.title">
              <h3 class="text-muted-foreground mb-1 text-sm font-semibold tracking-wide uppercase">
                {{ group.title }}
              </h3>
              <UiAccordionItem v-for="item in group.items" :key="item.value" :value="item.value">
                <UiAccordionHeader>
                  <UiAccordionTrigger class="text-base hover:no-underline">{{
                    item.question
                  }}</UiAccordionTrigger>
                </UiAccordionHeader>
                <UiAccordionContent>
                  <p class="text-muted-foreground">{{ item.answer }}</p>
                </UiAccordionContent>
              </UiAccordionItem>
            </section>
          </UiAccordion>
        </div>

        <aside class="lg:sticky lg:top-6 lg:self-start">
          <UiCard>
            <UiCardHeader>
              <div class="flex -space-x-2" aria-hidden="true">
                <UiAvatar
                  v-for="member in team"
                  :key="member.name"
                  class="ring-card size-10 ring-2"
                >
                  <UiAvatarImage :src="member.avatar" :alt="member.name" />
                  <UiAvatarFallback>{{ member.name.slice(0, 1) }}</UiAvatarFallback>
                </UiAvatar>
              </div>
              <UiCardTitle class="mt-3">Still have questions?</UiCardTitle>
              <UiCardDescription>
                {{ team.map((member) => member.name).join(", ") }} are online now.
              </UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-3">
              <p class="text-muted-foreground flex items-center gap-2 text-sm">
                <Icon name="lucide:clock" class="size-4" />Replies in about {{ responseTime }}
              </p>
              <UiButton class="w-full"
                ><Icon name="lucide:message-circle" class="size-4" />Start a chat</UiButton
              >
              <UiButton variant="outline" class="w-full"
                ><Icon name="lucide:calendar" class="size-4" />Book a call</UiButton
              >
            </UiCardContent>
          </UiCard>
        </aside>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { value: string; question: string; answer: string };
  type Group = { title: string; items: Item[] };
  type Member = { name: string; avatar: string };

  const props = withDefaults(
    defineProps<{
      groups?: Group[];
      team?: Member[];
      responseTime?: string;
    }>(),
    {
      groups: () => [
        {
          title: "Plans",
          items: [
            {
              value: "plans-1",
              question: "What is included in the Starter plan?",
              answer:
                "Starter covers up to 5 members, 10 active projects and community support. It is free, with no card needed.",
            },
            {
              value: "plans-2",
              question: "Can I switch plans later?",
              answer:
                "Yes. Upgrades apply immediately and we prorate the difference. Downgrades take effect at the next billing date.",
            },
          ],
        },
        {
          title: "Billing",
          items: [
            {
              value: "billing-1",
              question: "Which payment methods do you accept?",
              answer:
                "All major credit cards, plus bank transfer on annual plans. Invoices are issued in your local currency.",
            },
            {
              value: "billing-2",
              question: "Do you charge for guests?",
              answer:
                "No. Guests can view and comment on shared projects for free, and you only pay for full members.",
            },
          ],
        },
        {
          title: "Security",
          items: [
            {
              value: "security-1",
              question: "Where is my data stored?",
              answer:
                "You can choose between the United States and the European Union when you create a workspace.",
            },
          ],
        },
      ],
      team: () => [
        { name: "Maya", avatar: "https://i.pravatar.cc/80?img=47" },
        { name: "Leo", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Sana", avatar: "https://i.pravatar.cc/80?img=32" },
      ],
      responseTime: "2 hours",
    }
  );

  const open = ref<string[]>([props.groups[0]?.items[0]?.value ?? ""].filter(Boolean));
  const allValues = computed(() =>
    props.groups.flatMap((group) => group.items.map((i) => i.value))
  );
  const total = computed(() => allValues.value.length);

  function expandAll() {
    open.value = [...allValues.value];
  }
</script>
