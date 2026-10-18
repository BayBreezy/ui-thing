<template>
  <!--
    Calendar connections
    Features: Cards for Google, Outlook and Apple calendars with connected and not connected states, a check for conflicts switch, a choice of which calendar receives new bookings, a confirmation dialog before disconnecting and a last synced time
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">Calendar connections</h1>
      <p class="text-muted-foreground mt-1 text-sm">
        Connected calendars are checked for conflicts so nobody can book a time you are busy.
      </p>

      <ul class="mt-6 space-y-4">
        <li v-for="item in providers" :key="item.id">
          <UiCard class="gap-0 py-0">
            <div class="flex items-center gap-4 p-5">
              <span class="bg-muted grid size-11 shrink-0 place-items-center rounded-lg"
                ><Icon :name="item.icon" class="size-6"
              /></span>
              <div class="min-w-0 flex-1">
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-muted-foreground truncate text-sm">
                  {{ item.connected ? item.account : "Not connected" }}
                </p>
              </div>
              <UiBadge v-if="item.connected" variant="soft" color="green" shape="pill"
                >Connected</UiBadge
              >
              <UiButton
                v-if="!item.connected"
                size="sm"
                :loading="connecting === item.id"
                @click="connect(item)"
                >Connect</UiButton
              >
              <UiAlertDialog v-else>
                <UiAlertDialogTrigger as-child>
                  <UiButton variant="outline" size="sm">Disconnect</UiButton>
                </UiAlertDialogTrigger>
                <UiAlertDialogContent>
                  <UiAlertDialogHeader>
                    <UiAlertDialogTitle>Disconnect {{ item.name }}?</UiAlertDialogTitle>
                    <UiAlertDialogDescription>
                      Events in {{ item.account }} will no longer block your availability.
                    </UiAlertDialogDescription>
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
            </div>
            <div v-if="item.connected" class="space-y-4 border-t px-5 py-4">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <UiLabel :for="`conflicts-${item.id}`">Check for conflicts</UiLabel>
                  <p class="text-muted-foreground text-xs">
                    Busy events hide those times on your booking page.
                  </p>
                </div>
                <UiSwitch :id="`conflicts-${item.id}`" v-model="item.conflicts" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <UiLabel :for="`target-${item.id}`">Add new bookings to</UiLabel>
                <UiSelect v-model="item.target">
                  <UiSelectTrigger :id="`target-${item.id}`" class="w-48"
                    ><UiSelectValue
                  /></UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="calendar in item.calendars"
                      :key="calendar"
                      :value="calendar"
                      >{{ calendar }}</UiSelectItem
                    >
                  </UiSelectContent>
                </UiSelect>
              </div>
              <p class="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Icon name="lucide:refresh-cw" class="size-3.5" />Last synced {{ item.synced }}
              </p>
            </div>
          </UiCard>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Provider = {
    id: string;
    name: string;
    icon: string;
    account: string;
    connected: boolean;
    conflicts: boolean;
    calendars: string[];
    target: string;
    synced: string;
  };

  const props = withDefaults(
    defineProps<{
      connections?: Provider[];
    }>(),
    {
      connections: () => [
        {
          id: "google",
          name: "Google Calendar",
          icon: "logos:google-calendar",
          account: "alex@example.com",
          connected: true,
          conflicts: true,
          calendars: ["Work", "Personal", "Birthdays"],
          target: "Work",
          synced: "2 minutes ago",
        },
        {
          id: "outlook",
          name: "Outlook Calendar",
          icon: "logos:microsoft-icon",
          account: "",
          connected: false,
          conflicts: true,
          calendars: ["Calendar", "Team"],
          target: "Calendar",
          synced: "just now",
        },
        {
          id: "apple",
          name: "iCloud Calendar",
          icon: "logos:apple",
          account: "",
          connected: false,
          conflicts: true,
          calendars: ["Home", "Work"],
          target: "Home",
          synced: "just now",
        },
      ],
    }
  );

  const providers = ref<Provider[]>(
    props.connections.map((item) => ({ ...item, calendars: [...item.calendars] }))
  );
  const connecting = ref("");

  function connect(item: Provider) {
    connecting.value = item.id;
    setTimeout(() => {
      item.connected = true;
      item.account = "alex@example.com";
      connecting.value = "";
      useSonner.success(`${item.name} connected`);
    }, 700);
  }

  function disconnect(item: Provider) {
    item.connected = false;
    item.account = "";
    useSonner.success(`${item.name} disconnected`);
  }
</script>
