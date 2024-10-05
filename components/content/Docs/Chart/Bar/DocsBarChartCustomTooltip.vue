<template>
  <UiChartBar
    :data="data"
    index="name"
    :categories="['Total', 'Predicted']"
    :rounded-corners="4"
    :custom-tooltip="CustomChartTooltip"
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
          : '';
      }
    "
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CustomChartTooltip } from "#components";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
          Predicted: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
    },
    { default: () => [] }
  );
</script>
