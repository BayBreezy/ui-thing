<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 5 }, (item, index) => {
        return {
          id: index + 1,
          name: faker.person.fullName(),
          username: faker.internet.username().toLowerCase(),
          image: faker.image.avatar().toLowerCase(),
          email: faker.internet.email()?.toLowerCase(),
          location: faker.location.city(),
          status: faker.helpers.arrayElement(["Active", "Inactive"]),
          balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
        };
      });
    },
    { default: () => [] }
  );

  type Item = (typeof data.value)[0];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      {
        title: "Name",
        data: null,
        render: {
          _: "name",
          display: "#name",
        },
        searchable: false,
      },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable :data="data" :options>
    <template #name="{ cellData }: { cellData: Item }">
      <div class="flex items-center gap-3">
        <UiAvatar class="size-10" :src="cellData.image" :alt="cellData.name" />
        <div>
          <div class="font-medium">{{ cellData.name }}</div>
          <span class="mt-0.5 text-xs text-muted-foreground">@{{ cellData.username }}</span>
        </div>
      </div>
    </template>
  </UiDatatable>
</template>
