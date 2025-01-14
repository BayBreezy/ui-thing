<template>
  <div>
    <div class="[&>div]:max-h-96">
      <UiTable
        class="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none"
      >
        <UiTableHeader class="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
          <UiTableRow class="hover:bg-transparent">
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>
            <UiTableHead>Location</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Balance</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="item in data" :key="item.id">
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
    </div>
    <p class="mt-8 text-center text-sm text-muted-foreground">Table with sticky header</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 15 }, (item, index) => ({
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
