<template>
  <UiChartDonut
    index="name"
    :category="'Total'"
    :data="data"
    :custom-tooltip="CustomChartTooltip"
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CustomChartTooltip } from "#components";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 7 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.int({ min: 500, max: 2500 }),
        };
      });
    },
    { default: () => [] }
  );
</script>
