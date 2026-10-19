<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  type Item = {
    id: number;
    name: string;
    email: string;
    location: {
      city: string;
      country: string;
      flag: string;
    };
    status: string;
    balance: number;
  };
  const tableRef = shallowRef();
  const userDialog = ref(false);
  const submit = () => {
    userDialog.value = false;
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const sharedExport = {
    columns: ":not(.no-export)",
    trim: true,
    stripHtml: true,
    format: {
      body: (data: any) => {
        const htmlString = data.outerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        return htmlString ? doc?.body?.textContent : data;
      },
    },
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: {
        topStart: "search",
        topEnd: "buttons",
        bottomStart: "pageLength",
        bottomEnd: ["info", "paging"],
      },
      pagingType: "full",
      language: {
        info: "<p class='inline-flex gap-1'><span class='font-medium text-foreground'>_START_-_END_</span> of <span class='font-medium text-foreground'>_TOTAL_</span></p>",
        lengthMenu: "<span class='font-medium text-foreground'>Rows per page</span> _MENU_",
        search: "",
        searchPlaceholder: "Search...",
      },
      lengthMenu: [7, 25, 50, 75, 100],
      select: {
        style: "multi",
        selector: "td:first-child",
      },
      order: [[2, "asc"]],
      buttons: [
        {
          extend: "colvis",
          text: "View",
          columns: ":not(.no-column)",
        },
        {
          extend: "print",
          text: "Print",
          title: `Users - ${useDateFormat(new Date(), "MMM DD, YYYY").value}`,
          exportOptions: sharedExport,
        },
        {
          text: "Add User",
          action: () => {
            userDialog.value = true;
          },
        },
      ],
      columns: [
        {
          data: null,
          searchable: false,
          className: "no-column no-print",
          orderable: false,
          render: DataTable?.render?.select(),
        },
        { title: "ID", data: "id", visible: false },
        { title: "Name", data: "name" },
        { title: "Email", data: "email" },
        {
          title: "Location",
          searchable: false,
          orderable: false,
          data: null,
          render: {
            _: "location.city",
            display: "#location",
          },
        },
        {
          title: "Status",
          data: null,
          render: {
            _: "status",
            display: "#status",
          },
        },
        {
          title: "Balance",
          data: "balance",
          className: `text-right`,
          render: (data: number) => formatCurrency(data),
        },
      ],
      serverSide: true,
      processing: true,
      async ajax(data: any, callback: any) {
        // sleep for 1 second to simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // fetch data from API
        const res = Array.from({ length: 100 }, (item, index) => ({
          id: index + 1,
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          location: {
            city: faker.location.city(),
            country: faker.location.country(),
            flag: faker.helpers.arrayElement(["🇺🇸", "🇨🇦", "🇬🇧", "🇦🇺", "🇳🇿"]),
          },
          status: faker.helpers.arrayElement(["Active", "Inactive"]),
          balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
        }));
        callback({
          // always pass back draw from data
          draw: Number(data.draw),
          // the data to be displayed (paginated from sever)
          data: res.slice(data.start, data.start + data.length),
          // the total number of records in the dataset, not just the number returned
          recordsTotal: res.length,
          // the total number of records after filtering (if any filtering)
          recordsFiltered: res.length,
        });
      },
    };
  });
</script>

<template>
  <UiDatatable v-if="options" :options @ready="tableRef = $event">
    <template #status="{ cellData }">
      <UiBadge :variant="cellData.status == 'Inactive' ? 'outline' : 'default'">{{
        cellData.status
      }}</UiBadge>
    </template>
    <template #location="{ cellData }: { cellData: Item }">
      <span
        >{{ cellData.location.flag }} {{ cellData.location.city }},
        {{ cellData.location.country }}</span
      >
    </template>
  </UiDatatable>
  <UiDialog v-model:open="userDialog">
    <UiDialogContent class="max-w-md">
      <UiDialogHeader>
        <UiDialogTitle>Create User</UiDialogTitle>
        <UiDialogDescription description="Populate the form below to create a new user." />
      </UiDialogHeader>
      <form @submit.prevent="submit">
        <fieldset class="grid grid-cols-1 gap-5">
          <UiVeeInput label="Name" icon="lucide:user" />
          <UiVeeInput label="Email" icon="lucide:mail" />
          <UiVeeTextarea label="About" />
          <UiDialogFooter>
            <UiDialogClose as-child>
              <UiButton variant="outline" text="Cancel" />
            </UiDialogClose>
            <UiButton type="submit" text="Create" />
          </UiDialogFooter>
        </fieldset>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>
  :deep(button.dt-paging-button) {
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
  }
</style>
