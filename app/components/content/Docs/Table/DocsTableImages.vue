<template>
  <div>
    <UiTable>
      <UiTableHeader>
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
          <UiTableCell>
            <div class="flex items-center gap-3">
              <UiAvatar class="size-10" :src="item.image" :alt="item.name" />
              <div>
                <div class="font-medium">{{ item.name }}</div>
                <span class="mt-0.5 text-xs text-muted-foreground">@{{ item.username }}</span>
              </div>
            </div>
          </UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with images</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
