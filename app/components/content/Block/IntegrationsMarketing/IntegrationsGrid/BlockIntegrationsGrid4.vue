<template>
  <!--
    Connected and available integrations
    Features: Cards with a connected or not connected state, connect and disconnect buttons with a confirmation, tabs for all, connected and available with counts, a last synced time and a settings button for connected tools
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-2xl font-bold tracking-tight">Your integrations</h1>
      <UiTabs v-model="tab" class="mt-5">
        <UiTabsList>
          <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value"
            >{{ item.label
            }}<span class="text-muted-foreground ml-1.5 text-xs">{{
              count(item.value)
            }}</span></UiTabsTrigger
          >
        </UiTabsList>
      </UiTabs>

      <ul
        v-if="visible.length"
        class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
      >
        <li v-for="item in visible" :key="item.id">
          <UiCard class="h-full gap-3">
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <span class="bg-muted grid size-11 place-items-center rounded-lg"
                  ><Icon
                    :name="item.icon"
                    class="size-6 shrink-0 rounded-md dark:bg-zinc-100 dark:p-1"
                /></span>
                <div class="min-w-0 flex-1">
                  <UiCardTitle class="text-base">{{ item.name }}</UiCardTitle>
                  <p class="text-muted-foreground text-xs">
                    {{ item.connected ? `Synced ${item.synced}` : "Not connected" }}
                  </p>
                </div>
                <UiBadge v-if="item.connected" variant="soft" color="green" shape="pill"
                  >Connected</UiBadge
                >
              </div>
            </UiCardHeader>
            <UiCardContent class="text-muted-foreground text-sm">{{
              item.description
            }}</UiCardContent>
            <UiCardFooter class="gap-2">
              <template v-if="item.connected">
                <UiButton
                  variant="outline"
                  size="sm"
                  @click="useSonner.info(`Open ${item.name} settings here`)"
                  >Settings</UiButton
                >
                <UiAlertDialog>
                  <UiAlertDialogTrigger as-child>
                    <UiButton variant="ghost" size="sm" class="text-destructive"
                      >Disconnect</UiButton
                    >
                  </UiAlertDialogTrigger>
                  <UiAlertDialogContent>
                    <UiAlertDialogHeader>
                      <UiAlertDialogTitle>Disconnect {{ item.name }}?</UiAlertDialogTitle>
                      <UiAlertDialogDescription
                        >Data already synced stays in Acme, but new changes will stop
                        syncing.</UiAlertDialogDescription
                      >
                    </UiAlertDialogHeader>
                    <UiAlertDialogFooter>
                      <UiAlertDialogCancel>Keep connected</UiAlertDialogCancel>
                      <UiAlertDialogAction
                        class="bg-destructive hover:bg-destructive/90 text-white"
                        @click="disconnect(item)"
                        >Disconnect</UiAlertDialogAction
                      >
                    </UiAlertDialogFooter>
                  </UiAlertDialogContent>
                </UiAlertDialog>
              </template>
              <UiButton v-else size="sm" :loading="busy === item.id" @click="connect(item)"
                >Connect</UiButton
              >
            </UiCardFooter>
          </UiCard>
        </li>
      </ul>
      <p
        v-else
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-12 text-center text-sm"
        aria-live="polite"
      >
        {{ tab === "connected" ? "Nothing is connected yet." : "Everything is connected." }}
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = {
    id: string;
    name: string;
    icon: string;
    description: string;
    connected: boolean;
    synced?: string;
  };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          id: "slack",
          name: "Slack",
          icon: "logos:slack-icon",
          description: "Alerts and summaries in your channels.",
          connected: true,
          synced: "2 minutes ago",
        },
        {
          id: "github",
          name: "GitHub",
          icon: "logos:github-icon",
          description: "Link pull requests to tasks.",
          connected: true,
          synced: "just now",
        },
        {
          id: "notion",
          name: "Notion",
          icon: "logos:notion-icon",
          description: "Embed live views in your pages.",
          connected: false,
        },
        {
          id: "stripe",
          name: "Stripe",
          icon: "logos:stripe",
          description: "See payments next to customers.",
          connected: false,
        },
        {
          id: "drive",
          name: "Google Drive",
          icon: "logos:google-drive",
          description: "Attach files from Drive.",
          connected: true,
          synced: "1 hour ago",
        },
        {
          id: "zoom",
          name: "Zoom",
          icon: "logos:zoom-icon",
          description: "Add meeting links to events.",
          connected: false,
        },
      ],
    }
  );

  const tabs = [
    { value: "all", label: "All" },
    { value: "connected", label: "Connected" },
    { value: "available", label: "Available" },
  ];

  const items = ref<Item[]>(props.items.map((item) => ({ ...item })));
  const tab = ref("all");
  const busy = ref("");

  const matches = (item: Item, value: string) =>
    value === "all" || (value === "connected" ? item.connected : !item.connected);
  const count = (value: string) => items.value.filter((item) => matches(item, value)).length;
  const visible = computed(() => items.value.filter((item) => matches(item, tab.value)));

  function connect(item: Item) {
    busy.value = item.id;
    setTimeout(() => {
      item.connected = true;
      item.synced = "just now";
      busy.value = "";
      useSonner.success(`${item.name} connected`);
    }, 700);
  }

  function disconnect(item: Item) {
    item.connected = false;
    useSonner.success(`${item.name} disconnected`);
  }
</script>
