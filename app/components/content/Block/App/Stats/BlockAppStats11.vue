<template>
  <!--
    Stat group joined in a single card
    Features: Four stats in one card with hairline dividers that stay correct as the grid reflows, light fancy icons in different colors, trend text, hover highlight per stat
  -->
  <UiCard class="overflow-hidden py-0">
    <div class="bg-border grid gap-px sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in props.stats"
        :key="stat.label"
        class="bg-card hover:bg-muted flex flex-col gap-4 p-5 transition-colors"
      >
        <div class="flex items-center justify-between">
          <UiFancyIcon :icon="stat.icon" theme="light" :color="stat.color" size="md" />
          <span
            class="flex items-center gap-0.5 text-xs font-medium"
            :class="
              stat.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            "
          >
            <Icon
              :name="stat.up ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'"
              class="size-3.5"
            />
            {{ stat.change }}
          </span>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">{{ stat.label }}</p>
          <p class="mt-1 text-2xl font-bold tracking-tight tabular-nums">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";

  const props = withDefaults(
    defineProps<{
      stats?: {
        label: string;
        value: string;
        change: string;
        up: boolean;
        icon: string;
        color: Color;
      }[];
    }>(),
    {
      stats: () => [
        {
          label: "Revenue",
          value: "$48.2k",
          change: "12.4%",
          up: true,
          icon: "lucide:wallet",
          color: "success",
        },
        {
          label: "Customers",
          value: "2,840",
          change: "8.1%",
          up: true,
          icon: "lucide:users",
          color: "info",
        },
        {
          label: "Orders",
          value: "1,467",
          change: "3.2%",
          up: true,
          icon: "lucide:shopping-bag",
          color: "warning",
        },
        {
          label: "Refunds",
          value: "42",
          change: "1.4%",
          up: false,
          icon: "lucide:undo-2",
          color: "error",
        },
      ],
    }
  );
</script>
