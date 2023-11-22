<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-[250px] rounded-lg border bg-background">
      <template v-for="n in navList" :key="n.title">
        <UiListItem :to="n.link" class="">
          <Icon :name="n.icon" class="h-5 w-5 text-muted-foreground" />
          <UiListContent>
            <UiListTitle :title="n.title" class="text-sm font-medium" />
          </UiListContent>
          <span class="ml-auto shrink-0 self-center rounded-full text-muted-foreground/70">
            <Icon name="lucide:chevron-right" />
          </span>
        </UiListItem>
      </template>
    </UiList>
  </div>
</template>

<script lang="ts" setup>
  const navList = [
    { title: "Avatar", icon: "lucide:circle", link: "/components/avatar" },
    { title: "Card", icon: "lucide:square", link: "/components/card" },
    { title: "Checkbox", icon: "lucide:check-square", link: "/components/checkbox" },
    { title: "Dialog", icon: "lucide:square-asterisk", link: "/components/dialog" },
    { title: "Select", icon: "lucide:text-cursor-input", link: "/components/select" },
    { title: "Switch", icon: "lucide:toggle-left", link: "/components/switch" },
    { title: "Tooltip", icon: "lucide:message-circle", link: "/components/tooltip" },
  ];
</script>
