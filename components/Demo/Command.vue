<template>
  <div>
    <Heading title="Command" subtext="Displays a command palette" />

    <UICommand class="rounded-lg border bg-background shadow-md">
      <UICommandInput placeholder="Search for an item..." />
      <UICommandList>
        <UICommandEmpty />
        <template v-for="(group, header) of items">
          <UICommandGroup :heading="header">
            <template v-for="(child, k) in group" :key="k">
              <UICommandItem
                :label="child.label"
                :icon="child.icon"
                :perform="child.perform"
                :shortcut="child.shortcut"
              />
            </template>
          </UICommandGroup>
        </template>
      </UICommandList>
    </UICommand>
  </div>
</template>

<script lang="ts" setup>
  const items = {
    Suggestions: [
      { label: "Calendar", icon: "lucide:calendar", perform: () => alert("Calendar") },
      { label: "Search Emoji", icon: "lucide:smile", perform: () => alert("Smile") },
      { label: "Calculator", icon: "lucide:calculator", perform: () => alert("Calculator") },
    ],
    Settings: [
      {
        label: "Profile",
        icon: "lucide:user",
        perform: () => alert("User profile"),
        shortcut: "⌘P",
      },
      {
        label: "Billing",
        icon: "lucide:credit-card",
        perform: () => alert("Billing"),
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        icon: "lucide:settings",
        perform: () => alert("Settings"),
        shortcut: "⌘S",
      },
    ],
  };
</script>
