<template>
  <!--
    Integrations as a list with status and configure actions
    Features: Rows with app icon, status dot and last sync time, connect or manage buttons, disconnect confirmation
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="divide-y p-0">
      <div v-for="app in apps" :key="app.id" class="flex flex-wrap items-center gap-4 px-6 py-4">
        <div class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg border">
          <Icon :name="app.icon" class="size-6" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium">{{ app.name }}</p>
          <p class="text-muted-foreground flex items-center gap-1.5 text-sm">
            <span
              class="size-1.5 rounded-full"
              :class="app.connected ? 'bg-green-500' : 'bg-muted-foreground/40'"
            />
            {{ app.connected ? `Synced ${app.lastSync}` : "Not connected" }}
          </p>
        </div>
        <div class="flex gap-2">
          <template v-if="app.connected">
            <UiButton variant="outline" size="sm">Configure</UiButton>
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="ghost" size="sm" class="text-destructive hover:text-destructive">
                  Disconnect
                </UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Disconnect {{ app.name }}?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    Automations that use {{ app.name }} will stop running until you reconnect.
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction @click="setConnected(app, false)">
                    Disconnect
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>
          </template>
          <UiButton v-else size="sm" @click="setConnected(app, true)">Connect</UiButton>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type App = { id: string; name: string; icon: string; connected: boolean; lastSync: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Connected apps",
      description: "See what's connected to your workspace and when it last synced.",
    }
  );

  const apps = reactive<App[]>([
    {
      id: "slack",
      name: "Slack",
      icon: "logos:slack-icon",
      connected: true,
      lastSync: "2 minutes ago",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "logos:github-icon",
      connected: true,
      lastSync: "1 hour ago",
    },
    { id: "figma", name: "Figma", icon: "logos:figma", connected: false, lastSync: "" },
    { id: "notion", name: "Notion", icon: "logos:notion-icon", connected: false, lastSync: "" },
  ]);

  function setConnected(app: App, value: boolean) {
    app.connected = value;
    app.lastSync = value ? "just now" : "";
    useSonner[value ? "success" : "info"](
      value ? `${app.name} connected` : `${app.name} disconnected`
    );
  }
</script>
