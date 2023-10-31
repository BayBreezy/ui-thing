<template>
  <div class="flex items-center justify-center">
    <UIDropdownMenu>
      <UIDropdownMenuTrigger asChild>
        <UIButton variant="outline">Open menu</UIButton>
      </UIDropdownMenuTrigger>
      <UIDropdownMenuContent class="w-56">
        <template v-for="(item, i) in menuitems" :key="i">
          <UIDropdownMenuLabel v-if="item.label" :label="item.label" />
          <UIDropdownMenuSeparator v-else-if="item.divider" />
          <UIDropdownMenuItem
            v-else-if="item.title && !item.items"
            :title="item.title"
            :icon="item.icon"
            :shortcut="item.shortcut"
            :disabled="item.disabled"
          />
          <UIDropdownMenuSub v-else-if="item.title && item.items">
            <UIDropdownMenuSubTrigger
              :title="item.title"
              :icon="item.icon"
              :textValue="item.title"
            />
            <UIDropdownMenuSubContent>
              <template v-for="(child, k) in item.items" :key="`child-${k}`">
                <UIDropdownMenuSeparator v-if="child.divider" />
                <UIDropdownMenuItem
                  v-else
                  :title="child.title"
                  :icon="child.icon"
                  :shortcut="child.shortcut"
                />
              </template>
            </UIDropdownMenuSubContent>
          </UIDropdownMenuSub>
        </template>
      </UIDropdownMenuContent>
    </UIDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");

  const menuitems = [
    { label: "My Account" },
    { divider: true },
    { title: "Profile", icon: "ph:user", shortcut: "⇧⌘P" },
    { title: "Billing", icon: "ph:credit-card", shortcut: "⌘B" },
    { title: "Settings", icon: "ph:gear", shortcut: "⌘S" },
    { title: "Keyboard shortcuts", icon: "ph:keyboard", shortcut: "⌘K" },
    { divider: true },
    { title: "Team", icon: "ph:users", shortcut: "⇧⌘T" },
    {
      title: "Invite Users",
      icon: "ph:user-plus",
      items: [
        { title: "Email", icon: "ph:envelope", shortcut: "⇧⌘E" },
        { title: "Facebook", icon: "logos:facebook", shortcut: "⇧⌘F" },
        { title: "Twitter", icon: "logos:twitter", shortcut: "⇧⌘T" },
        { divider: true },
        { title: "More", icon: "ph:plus-circle" },
      ],
    },
    { title: "Settings", icon: "ph:gear", shortcut: "⌘S" },
    { title: "Keyboard shortcuts", icon: "ph:keyboard", shortcut: "⌘K" },
    { divider: true },
    { title: "Github", icon: "logos:github-icon" },
    { title: "Support", icon: "ph:lifebuoy" },
    { title: "API", icon: "ph:cloud", disabled: true },
    { divider: true },
    { title: "Sign out", icon: "ph:sign-out" },
  ];
</script>
