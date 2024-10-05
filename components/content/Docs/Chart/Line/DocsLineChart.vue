<template>
  <UiChartLine
    :data="data"
    index="year"
    :categories="['Export Growth Rate', 'Import Growth Rate']"
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
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 40 }, (_, i) => {
        const year = dayjs().subtract(i, "year").format("YYYY");
        return {
          year,
          "Export Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
          "Import Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
        };
      }).reverse();
    },
    { default: () => [] }
  );
</script>
