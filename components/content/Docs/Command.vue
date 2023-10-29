<template>
  <div>
    <Heading title="Command" subtext="Displays a command palette" />

    <UICommand class="max-w-[450px] rounded-lg border shadow-md">
      <UICommandInput placeholder="Type a command or search..." />
      <UICommandList>
        <UICommandEmpty>No results found.</UICommandEmpty>
        <UICommandGroup heading="Suggestions">
          <UICommandItem value="Calendar">
            <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </UICommandItem>
          <UICommandItem value="Search Emoji">
            <Icon name="lucide:smile" class="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </UICommandItem>
          <UICommandItem value="Calculator">
            <Icon name="lucide:calculator" class="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </UICommandItem>
        </UICommandGroup>
        <UICommandSeparator />
        <UICommandGroup heading="Settings">
          <UICommandItem value="Profile">
            <Icon name="lucide:user" class="mr-2 h-4 w-4" />
            <span>Profile</span>
            <UICommandShortcut>⌘P</UICommandShortcut>
          </UICommandItem>
          <UICommandItem value="Billing">
            <Icon name="lucide:credit-card" class="mr-2 h-4 w-4" />
            <span>Billing</span>
            <UICommandShortcut>⌘B</UICommandShortcut>
          </UICommandItem>
          <UICommandItem value="Settings">
            <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
            <span>Settings</span>
            <UICommandShortcut>⌘S</UICommandShortcut>
          </UICommandItem>
        </UICommandGroup>
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
