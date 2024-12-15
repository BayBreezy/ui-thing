<template>
  <div class="flex w-full items-center justify-center">
    <UiCommand class="max-w-[450px] rounded-lg border shadow-md">
      <UiCommandInput placeholder="Type a command or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="(item, label, i) in items" :key="i">
          <UiCommandGroup :heading="label">
            <UiCommandItem
              v-for="(child, k) in item"
              :key="k"
              :text="child.label"
              :icon="child.icon"
              :value="child.label"
              :shortcut="child.shortcut"
              @select="
                child.perform?.();
                $event.preventDefault();
              "
            />
          </UiCommandGroup>
          <UiCommandSeparator class="last:hidden" />
        </template>
      </UiCommandList>
    </UiCommand>
  </div>
</template>

<script lang="ts" setup>
  const items = {
    Suggestions: [
      {
        label: "Calendar",
        icon: "lucide:calendar",
        perform: () => useSonner("Now performing the action: Calendar"),
      },
      {
        label: "Search Emoji",
        icon: "lucide:smile",
        perform: () => useSonner("Now performing the action: Smile"),
      },
      {
        label: "Calculator",
        icon: "lucide:calculator",
        perform: () => useSonner("Now performing the action: Calculator"),
      },
    ],
    Settings: [
      {
        label: "Profile",
        icon: "lucide:user",
        perform: () => useSonner("Now performing the action: User profile"),
        shortcut: "⌘P",
      },
      {
        label: "Billing",
        icon: "lucide:credit-card",
        perform: () => useSonner("Now performing the action: Billing"),
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        icon: "lucide:settings",
        perform: () => useSonner("Now performing the action: Settings"),
        shortcut: "⌘S",
      },
    ],
  };
</script>
