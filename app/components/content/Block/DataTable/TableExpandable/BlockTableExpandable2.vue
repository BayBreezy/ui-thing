<template>
  <!--
    Grouped budget table with collapsible sections
    Features: Department group rows with subtotals, indented team rows, collapse each group, grand total in the footer and spend versus budget badges
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Department</UiTableHead>
            <UiTableHead class="text-right">Budget</UiTableHead>
            <UiTableHead class="text-right">Spent</UiTableHead>
            <UiTableHead class="hidden text-right sm:table-cell">Used</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="group in groups" :key="group.name">
            <UiTableRow class="bg-muted/50 hover:bg-muted/50 font-medium">
              <UiTableCell>
                <button
                  type="button"
                  class="flex items-center gap-2"
                  :aria-expanded="!collapsed.includes(group.name)"
                  @click="toggle(group.name)"
                >
                  <Icon
                    name="lucide:chevron-down"
                    class="size-4 transition-transform"
                    :class="collapsed.includes(group.name) ? '-rotate-90' : ''"
                  />
                  {{ group.name }}
                  <UiBadge variant="secondary">{{ group.teams.length }}</UiBadge>
                </button>
              </UiTableCell>
              <UiTableCell class="text-right tabular-nums">
                {{ money.format(sum(group.teams, "budget")) }}
              </UiTableCell>
              <UiTableCell class="text-right tabular-nums">
                {{ money.format(sum(group.teams, "spent")) }}
              </UiTableCell>
              <UiTableCell class="hidden text-right sm:table-cell">
                {{ percent(sum(group.teams, "spent"), sum(group.teams, "budget")) }}%
              </UiTableCell>
            </UiTableRow>
            <template v-if="!collapsed.includes(group.name)">
              <UiTableRow v-for="team in group.teams" :key="team.name">
                <UiTableCell class="pl-10">{{ team.name }}</UiTableCell>
                <UiTableCell class="text-right tabular-nums">{{
                  money.format(team.budget)
                }}</UiTableCell>
                <UiTableCell class="text-right tabular-nums">{{
                  money.format(team.spent)
                }}</UiTableCell>
                <UiTableCell class="hidden text-right sm:table-cell">
                  <UiBadge
                    variant="soft"
                    :color="percent(team.spent, team.budget) > 100 ? 'red' : 'green'"
                    shape="pill"
                  >
                    {{ percent(team.spent, team.budget) }}%
                  </UiBadge>
                </UiTableCell>
              </UiTableRow>
            </template>
          </template>
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell class="font-medium">Total</UiTableCell>
            <UiTableCell class="text-right font-medium tabular-nums">
              {{ money.format(grand.budget) }}
            </UiTableCell>
            <UiTableCell class="text-right font-medium tabular-nums">
              {{ money.format(grand.spent) }}
            </UiTableCell>
            <UiTableCell class="hidden text-right sm:table-cell">
              {{ percent(grand.spent, grand.budget) }}%
            </UiTableCell>
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Team = { name: string; budget: number; spent: number };
  type Group = { name: string; teams: Team[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      groups?: Group[];
    }>(),
    {
      title: "Budget by department",
      description: "Collapse a department to focus on the rest.",
      groups: () => [
        {
          name: "Engineering",
          teams: [
            { name: "Platform", budget: 220000, spent: 198400 },
            { name: "Web", budget: 140000, spent: 151200 },
            { name: "Mobile", budget: 120000, spent: 96500 },
          ],
        },
        {
          name: "Marketing",
          teams: [
            { name: "Growth", budget: 90000, spent: 84300 },
            { name: "Content", budget: 45000, spent: 39800 },
          ],
        },
        {
          name: "Operations",
          teams: [
            { name: "Support", budget: 75000, spent: 71200 },
            { name: "Finance", budget: 52000, spent: 48900 },
          ],
        },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const collapsed = ref<string[]>([]);

  function toggle(name: string) {
    collapsed.value = collapsed.value.includes(name)
      ? collapsed.value.filter((item) => item !== name)
      : [...collapsed.value, name];
  }

  function sum(teams: Team[], key: "budget" | "spent") {
    return teams.reduce((total, team) => total + team[key], 0);
  }

  function percent(value: number, total: number) {
    return total ? Math.round((value / total) * 100) : 0;
  }

  const grand = computed(() => {
    const teams = props.groups.flatMap((group) => group.teams);
    return { budget: sum(teams, "budget"), spent: sum(teams, "spent") };
  });
</script>
