<template>
  <!--
    Table with a sticky header
    Features: A long comparison table in a scroll area where the plan names and buttons stay at the top while you scroll, a first column that stays in view on small screens, group headings, a highlighted plan and a jump menu to a group
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Full comparison</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            Scroll the table. The plan names stay in view.
          </p>
        </div>
        <UiSelect :model-value="jump" @update:model-value="(value) => go(String(value))">
          <UiSelectTrigger class="w-48" aria-label="Jump to a group"
            ><UiSelectValue placeholder="Jump to a group"
          /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="group in groups" :key="group.name" :value="group.name">{{
              group.name
            }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div
        ref="scroller"
        class="relative mt-6 max-h-[32rem] overflow-auto rounded-xl border"
        tabindex="0"
        role="region"
        aria-label="Plan comparison table"
      >
        <table class="w-full min-w-[40rem] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th scope="col" class="bg-background sticky top-0 left-0 z-30 border-b p-4 text-left">
                <span class="sr-only">Feature</span>
              </th>
              <th
                v-for="plan in plans"
                :key="plan.name"
                scope="col"
                class="sticky top-0 z-20 border-b p-4 text-center"
                :class="plan.popular ? 'bg-secondary' : 'bg-background'"
              >
                <p class="font-semibold">{{ plan.name }}</p>
                <p class="text-muted-foreground text-xs font-normal">{{ plan.price }}</p>
                <UiButton
                  size="sm"
                  class="mt-2"
                  :variant="plan.popular ? 'default' : 'outline'"
                  @click="useSonner.success(`${plan.name} selected`)"
                  >Choose</UiButton
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="group in groups" :key="group.name">
              <tr :id="`group-${slug(group.name)}`">
                <th
                  :colspan="plans.length + 1"
                  scope="colgroup"
                  class="bg-muted text-muted-foreground border-b px-4 py-2 text-left text-xs font-semibold tracking-wide uppercase"
                >
                  {{ group.name }}
                </th>
              </tr>
              <tr v-for="row in group.rows" :key="row.name">
                <th
                  scope="row"
                  class="bg-background sticky left-0 z-10 border-b px-4 py-3 text-left font-medium"
                >
                  {{ row.name }}
                </th>
                <td
                  v-for="(value, index) in row.values"
                  :key="index"
                  class="border-b px-4 py-3 text-center"
                  :class="plans[index]?.popular ? 'bg-secondary/60' : ''"
                >
                  <template v-if="typeof value === 'boolean'">
                    <Icon
                      :name="value ? 'lucide:check' : 'lucide:minus'"
                      class="mx-auto size-4"
                      :class="value ? 'text-green-500' : 'text-muted-foreground'"
                    />
                    <span class="sr-only">{{ value ? "Included" : "Not included" }}</span>
                  </template>
                  <span v-else>{{ value }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Plan = { name: string; price: string; popular?: boolean };
  type Group = { name: string; rows: { name: string; values: (boolean | string)[] }[] };

  withDefaults(
    defineProps<{
      plans?: Plan[];
      groups?: Group[];
    }>(),
    {
      plans: () => [
        { name: "Starter", price: "$9 / month" },
        { name: "Team", price: "$29 / month", popular: true },
        { name: "Scale", price: "$79 / month" },
      ],
      groups: () => [
        {
          name: "Projects",
          rows: [
            { name: "Active projects", values: ["10", "Unlimited", "Unlimited"] },
            { name: "Archived projects", values: ["Unlimited", "Unlimited", "Unlimited"] },
            { name: "Templates", values: ["5", "50", "Unlimited"] },
            { name: "Custom fields", values: [false, true, true] },
            { name: "Automation rules", values: ["3", "25", "Unlimited"] },
          ],
        },
        {
          name: "Collaboration",
          rows: [
            { name: "Seats", values: ["1", "10", "50"] },
            { name: "Guests", values: [false, "20", "200"] },
            { name: "Comments", values: [true, true, true] },
            { name: "Shared views", values: [false, true, true] },
            { name: "Approvals", values: [false, false, true] },
          ],
        },
        {
          name: "Data",
          rows: [
            { name: "Storage", values: ["10 GB", "200 GB", "2 TB"] },
            { name: "Import", values: ["CSV", "CSV and JSON", "CSV, JSON and API"] },
            { name: "Export", values: [true, true, true] },
            { name: "Backups", values: [false, "Daily", "Hourly"] },
            { name: "Data residency", values: [false, false, true] },
          ],
        },
        {
          name: "Security",
          rows: [
            { name: "Two factor authentication", values: [true, true, true] },
            { name: "Single sign on", values: [false, false, true] },
            { name: "Audit log", values: [false, "30 days", "1 year"] },
            { name: "IP allow list", values: [false, false, true] },
          ],
        },
      ],
    }
  );

  const scroller = useTemplateRef<HTMLElement>("scroller");
  const jump = ref<string>();
  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  function go(name: string) {
    jump.value = name;
    const target = scroller.value?.querySelector<HTMLElement>(`#group-${slug(name)}`);
    if (target && scroller.value)
      scroller.value.scrollTo({ top: target.offsetTop - 110, behavior: "smooth" });
  }
</script>
