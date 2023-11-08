<template>
  <div class="flex items-center justify-center">
    <UIList class="max-w-[250px] rounded-lg border bg-background">
      <template v-for="n in navList" :key="n.title">
        <UIListItem :to="n.link" class="">
          <Icon :name="n.icon" class="h-5 w-5 text-muted-foreground" />
          <UIListContent>
            <UIListTitle :title="n.title" class="text-sm font-medium" />
          </UIListContent>
          <span class="ml-auto shrink-0 self-center rounded-full text-muted-foreground/70">
            <Icon name="lucide:chevron-right" />
          </span>
        </UIListItem>
      </template>
    </UIList>
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
