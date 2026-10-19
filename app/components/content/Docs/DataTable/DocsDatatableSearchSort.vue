<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 8 }, (item, index) => ({
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
      })),
    { default: () => [] }
  );

  type Item = (typeof data.value)[number];
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
  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
    } as Config;
  });
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

    <div class="border-border bg-background overflow-hidden rounded-lg border">
      <UiDatatable v-if="options" :data="filteredData" :options>
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
          <a :href="cellData.link" target="_blank" class="hover:underline">
            {{ cellData.link }}
          </a>
        </template>
      </UiDatatable>
    </div>
  </div>
</template>
