<template>
  <div class="flex w-full items-center justify-center">
    <UICommand class="max-w-[450px] rounded-lg border shadow-md">
      <UICommandInput placeholder="Type a command or search..." />
      <UICommandList>
        <UICommandEmpty>No results found.</UICommandEmpty>
        <template v-for="(item, label, i) in items" :key="i">
          <UICommandGroup :heading="label">
            <UICommandItem
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
          </UICommandGroup>
          <UICommandSeparator class="last:hidden" />
        </template>
      </UICommandList>
    </UICommand>
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
