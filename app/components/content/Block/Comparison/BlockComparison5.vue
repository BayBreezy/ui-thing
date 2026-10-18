<template>
  <!--
    Checklist columns
    Features: One column for each plan with a checklist of what is included and what is not, a highlighted popular plan, a show all features button that expands each list and a call to action for each plan
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">What you get</h1>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
          Every plan can be cancelled at any time.
        </p>
      </div>

      <div class="mt-10 grid items-start gap-6 md:grid-cols-3">
        <UiCard
          v-for="plan in plans"
          :key="plan.name"
          class="gap-4"
          :class="plan.popular ? 'border-primary' : ''"
        >
          <UiCardHeader>
            <div class="flex items-center justify-between">
              <UiCardTitle>{{ plan.name }}</UiCardTitle>
              <UiBadge v-if="plan.popular" variant="soft" color="blue" shape="pill"
                >Popular</UiBadge
              >
            </div>
            <UiCardDescription>{{ plan.blurb }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <ul class="space-y-2.5 text-sm" :aria-label="`${plan.name} features`">
              <li
                v-for="item in shown(plan)"
                :key="item.text"
                class="flex items-start gap-2.5"
                :class="item.included ? '' : 'text-muted-foreground'"
              >
                <Icon
                  :name="item.included ? 'lucide:circle-check' : 'lucide:circle-x'"
                  class="mt-0.5 size-4 shrink-0"
                  :class="item.included ? 'text-green-500' : 'text-muted-foreground/60'"
                />
                <span
                  >{{ item.text
                  }}<span class="sr-only">{{
                    item.included ? ", included" : ", not included"
                  }}</span></span
                >
              </li>
            </ul>
            <UiButton
              v-if="plan.features.length > 5"
              variant="link"
              size="sm"
              class="mt-3 h-auto p-0"
              :aria-expanded="open"
              @click="open = !open"
            >
              {{ open ? "Show fewer features" : `Show all ${plan.features.length} features` }}
            </UiButton>
          </UiCardContent>
          <UiCardFooter>
            <UiButton
              class="w-full"
              :variant="plan.popular ? 'default' : 'outline'"
              @click="useSonner.success(`${plan.name} selected`)"
              >{{ plan.cta }}</UiButton
            >
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = {
    name: string;
    blurb: string;
    cta: string;
    popular?: boolean;
    features: { text: string; included: boolean }[];
  };

  withDefaults(
    defineProps<{
      plans?: Plan[];
    }>(),
    {
      plans: () => [
        {
          name: "Free",
          blurb: "Try it out on a side project.",
          cta: "Start free",
          features: [
            { text: "3 projects", included: true },
            { text: "1 team member", included: true },
            { text: "Community support", included: true },
            { text: "7 days of history", included: true },
            { text: "Custom domains", included: false },
            { text: "Advanced analytics", included: false },
            { text: "Single sign on", included: false },
          ],
        },
        {
          name: "Pro",
          blurb: "For people who ship every week.",
          cta: "Get Pro",
          popular: true,
          features: [
            { text: "Unlimited projects", included: true },
            { text: "10 team members", included: true },
            { text: "Email support", included: true },
            { text: "30 days of history", included: true },
            { text: "Custom domains", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Single sign on", included: false },
          ],
        },
        {
          name: "Business",
          blurb: "For teams with security needs.",
          cta: "Contact sales",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "Unlimited team members", included: true },
            { text: "Priority support", included: true },
            { text: "1 year of history", included: true },
            { text: "Custom domains", included: true },
            { text: "Advanced analytics", included: true },
            { text: "Single sign on", included: true },
          ],
        },
      ],
    }
  );

  const open = ref(false);
  const shown = (plan: Plan) => (open.value ? plan.features : plan.features.slice(0, 5));
</script>
