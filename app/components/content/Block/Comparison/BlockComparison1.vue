<template>
  <!--
    Feature comparison matrix
    Features: A table with a column for each plan and features grouped by category, checks and dashes that have text for screen readers, short values like limits, a highlighted recommended plan and a call to action for each plan
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight lg:text-4xl">Compare plans</h1>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl">
          See what is included in each plan and pick the one that fits.
        </p>
      </div>

      <div class="relative mt-10 overflow-x-auto rounded-xl border">
        <UiTable class="min-w-[40rem]">
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="w-1/3"><span class="sr-only">Feature</span></UiTableHead>
              <UiTableHead
                v-for="plan in plans"
                :key="plan.name"
                class="text-center"
                :class="plan.recommended ? 'bg-primary/5' : ''"
              >
                <p class="text-foreground text-base font-semibold">{{ plan.name }}</p>
                <p class="text-muted-foreground text-sm font-normal">{{ plan.price }}</p>
                <UiBadge
                  v-if="plan.recommended"
                  variant="soft"
                  color="blue"
                  shape="pill"
                  class="mt-1"
                  >Recommended</UiBadge
                >
              </UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <template v-for="group in groups" :key="group.name">
              <UiTableRow class="bg-muted/40 hover:bg-muted/40">
                <UiTableCell
                  :colspan="plans.length + 1"
                  class="text-xs font-semibold tracking-wide uppercase"
                  >{{ group.name }}</UiTableCell
                >
              </UiTableRow>
              <UiTableRow v-for="feature in group.features" :key="feature.name">
                <UiTableCell class="font-medium">{{ feature.name }}</UiTableCell>
                <UiTableCell
                  v-for="(value, index) in feature.values"
                  :key="index"
                  class="text-center"
                  :class="plans[index]?.recommended ? 'bg-primary/5' : ''"
                >
                  <template v-if="value === true"
                    ><Icon name="lucide:check" class="mx-auto size-5 text-green-500" /><span
                      class="sr-only"
                      >Included</span
                    ></template
                  >
                  <template v-else-if="value === false"
                    ><Icon name="lucide:minus" class="text-muted-foreground mx-auto size-5" /><span
                      class="sr-only"
                      >Not included</span
                    ></template
                  >
                  <span v-else class="text-sm">{{ value }}</span>
                </UiTableCell>
              </UiTableRow>
            </template>
            <UiTableRow>
              <UiTableCell />
              <UiTableCell
                v-for="plan in plans"
                :key="plan.name"
                class="text-center"
                :class="plan.recommended ? 'bg-primary/5' : ''"
              >
                <UiButton
                  :variant="plan.recommended ? 'default' : 'outline'"
                  size="sm"
                  @click="useSonner.success(`${plan.name} selected`)"
                  >{{ plan.cta }}</UiButton
                >
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = { name: string; price: string; cta: string; recommended?: boolean };
  type Group = { name: string; features: { name: string; values: (boolean | string)[] }[] };

  withDefaults(
    defineProps<{
      plans?: Plan[];
      groups?: Group[];
    }>(),
    {
      plans: () => [
        { name: "Free", price: "$0 per month", cta: "Start free" },
        { name: "Pro", price: "$12 per month", cta: "Get Pro", recommended: true },
        { name: "Business", price: "$39 per month", cta: "Contact sales" },
      ],
      groups: () => [
        {
          name: "Core",
          features: [
            { name: "Projects", values: ["3", "Unlimited", "Unlimited"] },
            { name: "Team members", values: ["1", "10", "Unlimited"] },
            { name: "Storage", values: ["1 GB", "100 GB", "2 TB"] },
            { name: "Version history", values: ["7 days", "30 days", "1 year"] },
          ],
        },
        {
          name: "Collaboration",
          features: [
            { name: "Comments and mentions", values: [true, true, true] },
            { name: "Shared workspaces", values: [false, true, true] },
            { name: "Guest access", values: [false, true, true] },
            { name: "Approval workflows", values: [false, false, true] },
          ],
        },
        {
          name: "Security and support",
          features: [
            { name: "Two factor authentication", values: [true, true, true] },
            { name: "Single sign on", values: [false, false, true] },
            { name: "Audit log", values: [false, false, true] },
            { name: "Support", values: ["Community", "Email", "Priority and phone"] },
          ],
        },
      ],
    }
  );
</script>
