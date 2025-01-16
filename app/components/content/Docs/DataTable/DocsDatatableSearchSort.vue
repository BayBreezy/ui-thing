<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 8 }, (item, index) => ({
        id: index + 1,
        keyword: faker.lorem.sentence({ min: 3, max: 5 }),
        intents: faker.helpers.arrayElements(
          ["Informational", "Navigational", "Commercial", "Transactional"],
          { min: 1, max: 2 }
        ),
        volume: faker.number.int({ max: 2000, min: 100 }),
        cpc: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
        traffic: faker.number.int({ max: 100, min: 10 }),
        link: faker.internet.url({ protocol: "https" }),
      }));
    },
    { default: () => [] }
  );

  type Item = (typeof data.value)[0];
  const search = ref("");

  const filteredData = computed(() => {
    if (!search.value) return data.value;
    return data.value.filter((item) =>
      item.keyword.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  const styles = {
    Informational: "bg-indigo-400/20 text-indigo-500",
    Navigational: "bg-emerald-400/20 text-emerald-500",
    Commercial: "bg-amber-400/20 text-amber-500",
    Transactional: "bg-rose-400/20 text-rose-500",
  } as const;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'overflow-hidden rounded-lg border border-border bg-background'<'${tw`overflow-auto`}'t>>`,
    paging: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Keyword", data: "keyword", className: "font-semibold" },
      {
        title: "Intents",
        searchable: false,
        orderable: false,
        data: null,
        render: {
          _: "intents",
          display: "#intents",
        },
      },
      { data: "volume", title: "Volume" },
      {
        data: "cpc",
        title: "CPC",
        render(d) {
          return formatCurrency(d);
        },
      },
      { data: "traffic", title: "Traffic" },
      {
        title: "Link",
        orderable: false,
        data: null,
        render: {
          _: "link",
          display: "#link",
        },
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    order: [[1, "asc"]],
    language: {
      search: "",
      searchPlaceholder: "Search by keyword",
    },
  };
</script>

<template>
  <div>
    <div class="mb-6 flex items-center">
      <div class="w-full md:max-w-sm">
        <!-- You can use the built in search as well -->
        <UiVeeInput
          v-model="search"
          label="Keyword"
          placeholder="Search by keyword"
          icon="lucide:search"
        />
      </div>
    </div>

    <UiDatatable :data="filteredData" :options>
      <template #intents="{ cellData }: { cellData: Item }">
        <div class="flex gap-2">
          <span
            v-for="intent in cellData.intents"
            :key="intent"
            :class="[
              styles[intent],
              'flex size-5 items-center justify-center rounded text-xs font-medium',
            ]"
          >
            {{ intent[0] }}
          </span>
        </div>
      </template>
      <template #link="{ cellData }: { cellData: Item }">
        <a :href="cellData.link" target="_blank" class="hover:text-sky-500 hover:underline">
          {{ cellData.link }}
        </a>
      </template>
    </UiDatatable>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
</style>
