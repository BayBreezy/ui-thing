<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody class="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
        <UiTableRow
          v-for="item in data"
          :key="item.id"
          class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
        >
          <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <UiTableFooter class="bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="4">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with vertical lines</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 5 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      }));
    },
    { default: () => [] }
  );

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
