<template>
  <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
    <UiCard
      v-for="section in sections"
      :key="section.label"
      class="w-full overflow-hidden rounded-3xl py-0"
      :class="section.className"
    >
      <UiSidebarProvider class="min-h-0">
        <UiSidebar collapsible="none" class="w-full bg-transparent">
          <UiSidebarContent class="gap-0 overflow-hidden">
            <UiSidebarGroup>
              <UiSidebarGroupLabel>{{ section.label }}</UiSidebarGroupLabel>
              <UiSidebarGroupContent>
                <UiSidebarMenu class="gap-1">
                  <UiSidebarMenuItem v-for="item in section.items" :key="item.label">
                    <UiSidebarMenuButton :is-active="item.isActive">
                      <Icon :name="item.icon" />
                      {{ item.label }}
                    </UiSidebarMenuButton>
                  </UiSidebarMenuItem>
                </UiSidebarMenu>
              </UiSidebarGroupContent>
            </UiSidebarGroup>
          </UiSidebarContent>
        </UiSidebar>
      </UiSidebarProvider>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  interface Section {
    label: string;
    className: string;
    items: { icon: string; label: string; isActive?: boolean }[];
  }

  const sections: Section[] = [
    {
      label: "Overview",
      className: "xl:col-start-1 xl:row-start-2",
      items: [
        { icon: "lucide:chart-line", label: "Analytics", isActive: true },
        { icon: "lucide:arrow-left-right", label: "Transactions" },
        { icon: "lucide:trending-up", label: "Investments" },
        { icon: "lucide:landmark", label: "Accounts" },
        { icon: "lucide:chart-pie", label: "Spending" },
      ],
    },
    {
      label: "Planning",
      className: "xl:col-start-1 xl:row-start-1",
      items: [
        { icon: "lucide:file-text", label: "Documents" },
        { icon: "lucide:wallet", label: "Budget" },
        { icon: "lucide:chart-no-axes-combined", label: "Reports" },
        { icon: "lucide:target", label: "Goals" },
        { icon: "lucide:calendar", label: "Calendar" },
      ],
    },
    {
      label: "Support",
      className: "flex xl:col-start-2 xl:row-start-1",
      items: [
        { icon: "lucide:circle-help", label: "Help Center" },
        { icon: "lucide:book-open", label: "Docs" },
        { icon: "lucide:message-square", label: "Contact Us" },
        { icon: "lucide:activity", label: "Status" },
        { icon: "lucide:globe", label: "Community" },
      ],
    },
    {
      label: "Account",
      className: "flex xl:col-start-2 xl:row-start-2",
      items: [
        { icon: "lucide:user", label: "Profile" },
        { icon: "lucide:credit-card", label: "Billing", isActive: true },
        { icon: "lucide:bell", label: "Notifications" },
        { icon: "lucide:shield", label: "Security" },
        { icon: "lucide:paintbrush", label: "Appearance" },
      ],
    },
  ];
</script>
