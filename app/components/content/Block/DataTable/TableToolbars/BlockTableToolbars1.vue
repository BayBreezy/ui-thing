<template>
  <!--
    Table toolbar with search and removable filter chips
    Features: Search field, status toggle chips with pressed state, active filter chips that can be dismissed one by one, clear all and a live result count
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 flex flex-col gap-3">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative sm:w-72">
          <UiLabel for="tickets-search" class="sr-only">Search tickets</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput id="tickets-search" v-model="query" placeholder="Search tickets" class="pl-9" />
        </div>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          <UiButton
            v-for="status in statuses"
            :key="status"
            size="sm"
            :variant="active.includes(status) ? 'default' : 'outline'"
            :aria-pressed="active.includes(status)"
            @click="toggle(status)"
          >
            {{ status }}
          </UiButton>
        </div>
      </div>

      <div v-if="query || active.length" class="flex flex-wrap items-center gap-2">
        <span class="text-muted-foreground text-sm">Filters:</span>
        <UiBadge v-if="query" variant="secondary" class="gap-1.5 pr-1">
          Search: {{ query }}
          <button type="button" aria-label="Remove search filter" @click="query = ''">
            <Icon name="lucide:x" class="size-3" />
          </button>
        </UiBadge>
        <UiBadge v-for="status in active" :key="status" variant="secondary" class="gap-1.5 pr-1">
          Status: {{ status }}
          <button type="button" :aria-label="`Remove ${status} filter`" @click="toggle(status)">
            <Icon name="lucide:x" class="size-3" />
          </button>
        </UiBadge>
        <UiButton variant="link" size="sm" class="h-auto p-0" @click="clear">Clear all</UiButton>
      </div>
    </div>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Ticket</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Requester</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden text-right md:table-cell">Opened</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="ticket in rows" :key="ticket.id">
            <UiTableCell>
              <p class="font-medium">{{ ticket.subject }}</p>
              <p class="text-muted-foreground text-xs">{{ ticket.id }}</p>
            </UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ ticket.requester }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="colors[ticket.status]" shape="pill">
                {{ ticket.status }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden text-right md:table-cell">
              {{ ticket.opened }}
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4">
            No tickets match these filters.
          </UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      {{ rows.length }} of {{ tickets.length }} tickets
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Open" | "Pending" | "Resolved";

  type Ticket = { id: string; subject: string; requester: string; status: Status; opened: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      tickets?: Ticket[];
    }>(),
    {
      title: "Support tickets",
      description: "Narrow the queue with search and status filters.",
      tickets: () => [
        {
          id: "TCK-2041",
          subject: "Cannot reset my password",
          requester: "Hannah Lee",
          status: "Open",
          opened: "Oct 17",
        },
        {
          id: "TCK-2040",
          subject: "Invoice shows the wrong VAT number",
          requester: "Marco Rossi",
          status: "Pending",
          opened: "Oct 16",
        },
        {
          id: "TCK-2037",
          subject: "Export to CSV never finishes",
          requester: "Priya Nair",
          status: "Open",
          opened: "Oct 15",
        },
        {
          id: "TCK-2033",
          subject: "How do I add a teammate?",
          requester: "Lukas Meyer",
          status: "Resolved",
          opened: "Oct 13",
        },
        {
          id: "TCK-2029",
          subject: "Webhook retries are failing",
          requester: "Chloe Martin",
          status: "Pending",
          opened: "Oct 11",
        },
        {
          id: "TCK-2024",
          subject: "Dark mode flickers on load",
          requester: "Tomás Silva",
          status: "Resolved",
          opened: "Oct 9",
        },
      ],
    }
  );

  const statuses: Status[] = ["Open", "Pending", "Resolved"];
  const colors = { Open: "blue", Pending: "amber", Resolved: "green" } as const;

  const query = ref("");
  const active = ref<Status[]>([]);

  function toggle(status: Status) {
    active.value = active.value.includes(status)
      ? active.value.filter((item) => item !== status)
      : [...active.value, status];
  }

  function clear() {
    query.value = "";
    active.value = [];
  }

  const rows = computed(() => {
    const term = query.value.trim().toLowerCase();
    return props.tickets.filter(
      (ticket) =>
        (!active.value.length || active.value.includes(ticket.status)) &&
        (!term ||
          ticket.subject.toLowerCase().includes(term) ||
          ticket.requester.toLowerCase().includes(term) ||
          ticket.id.toLowerCase().includes(term))
    );
  });
</script>
