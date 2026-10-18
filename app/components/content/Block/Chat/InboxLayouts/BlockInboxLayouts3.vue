<template>
  <!--
    Support helpdesk with a customer panel
    Features: Ticket queue with status and priority filters, selected ticket thread with a reply box and canned replies, customer details panel with plan and recent tickets and status changes that update the queue
  -->
  <div
    class="mx-auto grid h-[42rem] w-full max-w-6xl overflow-hidden rounded-xl border md:grid-cols-[18rem_1fr] lg:grid-cols-[20rem_1fr_16rem]"
  >
    <section class="flex min-h-0 flex-col border-r" aria-label="Ticket queue">
      <div class="space-y-2 border-b p-3">
        <h1 class="font-semibold">Tickets</h1>
        <UiToggleGroup
          v-model="filter"
          type="single"
          variant="outline"
          size="sm"
          class="w-full"
          aria-label="Filter tickets"
        >
          <UiToggleGroupItem
            v-for="item in filters"
            :key="item"
            :value="item"
            class="flex-1 px-2 text-xs capitalize"
            >{{ item }}</UiToggleGroupItem
          >
        </UiToggleGroup>
      </div>
      <ul class="min-h-0 flex-1 divide-y overflow-y-auto" role="list">
        <li v-for="ticket in queue" :key="ticket.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 w-full px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            :class="ticket.id === activeId ? 'bg-muted' : ''"
            :aria-current="ticket.id === activeId ? 'true' : undefined"
            @click="activeId = ticket.id"
          >
            <span class="flex items-center justify-between gap-2">
              <span class="truncate text-sm font-medium">{{ ticket.subject }}</span>
              <UiBadge variant="soft" :color="priorities[ticket.priority]" shape="pill">{{
                ticket.priority
              }}</UiBadge>
            </span>
            <span class="text-muted-foreground mt-0.5 flex items-center justify-between text-xs">
              {{ ticket.customer.name }}
              <span class="capitalize">{{ ticket.status }}</span>
            </span>
          </button>
        </li>
        <li v-if="!queue.length" class="text-muted-foreground px-4 py-12 text-center text-sm">
          No tickets in this view.
        </li>
      </ul>
    </section>

    <section class="flex min-h-0 flex-col" aria-label="Ticket">
      <template v-if="active">
        <div class="flex items-center gap-3 border-b px-4 py-3">
          <div class="min-w-0 flex-1">
            <h2 class="truncate font-semibold">{{ active.subject }}</h2>
            <p class="text-muted-foreground text-xs">
              #{{ active.id }} · {{ active.customer.name }}
            </p>
          </div>
          <UiNativeSelect
            v-model="active.status"
            class="h-8 w-32 capitalize"
            aria-label="Ticket status"
          >
            <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
          </UiNativeSelect>
        </div>
        <div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          <UiMessage
            v-for="(message, index) in active.messages"
            :key="index"
            :align="message.agent ? 'end' : 'start'"
          >
            <UiMessageContent>
              <UiBubble
                :variant="message.agent ? 'default' : 'muted'"
                :align="message.agent ? 'end' : 'start'"
              >
                <UiBubbleContent>{{ message.text }}</UiBubbleContent>
              </UiBubble>
            </UiMessageContent>
          </UiMessage>
        </div>
        <form class="space-y-2 border-t p-3" @submit.prevent="reply">
          <div class="flex flex-wrap gap-1.5">
            <UiButton
              v-for="canned in cannedReplies"
              :key="canned"
              type="button"
              variant="outline"
              size="sm"
              class="h-7 text-xs"
              @click="draft = canned"
              >{{ canned }}</UiButton
            >
          </div>
          <div class="flex items-center gap-2">
            <UiLabel for="inbox3" class="sr-only">Reply</UiLabel>
            <UiInput
              id="inbox3"
              v-model="draft"
              placeholder="Reply to the customer"
              autocomplete="off"
            />
            <UiButton type="submit" :disabled="!draft.trim()">Send</UiButton>
          </div>
        </form>
      </template>
    </section>

    <aside
      v-if="active"
      class="bg-muted/20 hidden space-y-5 overflow-y-auto border-l p-4 lg:block"
      aria-label="Customer details"
    >
      <div class="flex flex-col items-center text-center">
        <UiAvatar
          :src="active.customer.avatar"
          :fallback="active.customer.name[0]"
          class="size-14"
        />
        <p class="mt-2 font-semibold">{{ active.customer.name }}</p>
        <p class="text-muted-foreground text-xs">{{ active.customer.email }}</p>
      </div>
      <dl class="space-y-3 text-sm">
        <div class="flex justify-between">
          <dt class="text-muted-foreground">Plan</dt>
          <dd class="font-medium">{{ active.customer.plan }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-muted-foreground">Customer since</dt>
          <dd class="font-medium">{{ active.customer.since }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-muted-foreground">Open tickets</dt>
          <dd class="font-medium">{{ openCount(active.customer.name) }}</dd>
        </div>
      </dl>
    </aside>
  </div>
</template>

<script lang="ts" setup>
  type Status = "open" | "pending" | "solved";
  type Ticket = {
    id: string;
    subject: string;
    priority: "high" | "medium" | "low";
    status: Status;
    customer: { name: string; email: string; avatar: string; plan: string; since: string };
    messages: { text: string; agent?: boolean }[];
  };

  const props = withDefaults(
    defineProps<{
      tickets?: Ticket[];
    }>(),
    {
      tickets: () => [
        {
          id: "4821",
          subject: "Charged twice this month",
          priority: "high",
          status: "open",
          customer: {
            name: "Hannah Lee",
            email: "hannah@globex.example",
            avatar: "https://i.pravatar.cc/80?img=47",
            plan: "Business",
            since: "Feb 2024",
          },
          messages: [
            { text: "Hi, I was charged twice for my subscription this month." },
            { text: "Sorry about that. I am checking your billing history now.", agent: true },
          ],
        },
        {
          id: "4820",
          subject: "Cannot export to CSV",
          priority: "medium",
          status: "pending",
          customer: {
            name: "Marco Rossi",
            email: "marco@initech.example",
            avatar: "https://i.pravatar.cc/80?img=12",
            plan: "Team",
            since: "Jan 2025",
          },
          messages: [
            { text: "The export button spins forever on large reports." },
            { text: "Thanks. Could you share roughly how many rows the report has?", agent: true },
          ],
        },
        {
          id: "4818",
          subject: "How do I add a teammate?",
          priority: "low",
          status: "solved",
          customer: {
            name: "Priya Nair",
            email: "priya@umbrella.example",
            avatar: "https://i.pravatar.cc/80?img=32",
            plan: "Starter",
            since: "Aug 2023",
          },
          messages: [
            { text: "Where can I invite my colleague?" },
            { text: "Go to Settings, then Members, and press Invite.", agent: true },
            { text: "Found it, thank you!" },
          ],
        },
        {
          id: "4817",
          subject: "SSO login loops back",
          priority: "high",
          status: "open",
          customer: {
            name: "Lukas Meyer",
            email: "lukas@hooli.example",
            avatar: "https://i.pravatar.cc/80?img=15",
            plan: "Business",
            since: "Mar 2026",
          },
          messages: [{ text: "After signing in with SSO I land back on the login page." }],
        },
      ],
    }
  );

  const statuses: Status[] = ["open", "pending", "solved"];
  const filters = ["all", "open", "pending", "solved"];
  const priorities = { high: "red", medium: "amber", low: "slate" } as const;
  const cannedReplies = [
    "Thanks for reaching out!",
    "Could you share a screenshot?",
    "I have escalated this to our team.",
  ];

  const tickets = ref<Ticket[]>(
    props.tickets.map((ticket) => ({
      ...ticket,
      customer: { ...ticket.customer },
      messages: ticket.messages.map((message) => ({ ...message })),
    }))
  );
  const filter = ref("all");
  const activeId = ref(tickets.value[0]?.id ?? "");
  const draft = ref("");

  const queue = computed(() =>
    filter.value === "all" || !filter.value
      ? tickets.value
      : tickets.value.filter((ticket) => ticket.status === filter.value)
  );
  const active = computed(() => tickets.value.find((ticket) => ticket.id === activeId.value));
  const openCount = (name: string) =>
    tickets.value.filter((ticket) => ticket.customer.name === name && ticket.status !== "solved")
      .length;

  function reply() {
    const text = draft.value.trim();
    if (!text || !active.value) return;
    active.value.messages.push({ text, agent: true });
    draft.value = "";
  }
</script>
