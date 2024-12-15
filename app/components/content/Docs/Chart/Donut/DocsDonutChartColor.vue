<template>
  <UiChartDonut
    index="name"
    :category="'Total'"
    :data="data"
    :value-formatter="valueFormatter"
    :colors="['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']"
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const valueFormatter = (tick: number | Date) =>
    typeof tick === "number" ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}` : "";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 7 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
    },
    { default: () => [] }
  );
</script>
