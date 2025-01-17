<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

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
  const tableRef = shallowRef<InstanceType<typeof DataTable<Item[]>> | null>(null);
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

  const options: Config = {
    dom: `<'relative'r<'flex flex-col gap-4 md:flex-row md:items-center justify-between mb-5'fB><'overflow-auto border rounded-md't><'mt-4 px-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4'<l><'flex flex-col gap-4 md:flex-row md:items-center md:gap-8'<i><p>>>>`,
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
</script>

<template>
  <UiDatatable :options @ready="tableRef = $event">
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
  :deep(.dataTable) {
    .dt-select-checkbox {
      @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
    }
  }
  :deep(button.dt-paging-button) {
    @apply rounded-md border border-border;
  }
</style>
