<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <div class="flex justify-center">
        <UiTabsList class="h-12 p-0.5">
          <UiTooltip v-for="t in tabs" :key="t.title">
            <UiTooltipTrigger as-child>
              <span class="h-full">
                <UiTabsTrigger :value="t.title" class="h-full">
                  <UiChip
                    v-if="t.badge"
                    class="bg-primary text-primary-foreground"
                    :text="t.badge?.toString()"
                    size="lg"
                  >
                    <Icon :name="t.icon" class="size-5 shrink-0" />
                  </UiChip>
                  <Icon v-else :name="t.icon" class="size-5 shrink-0" />
                </UiTabsTrigger>
              </span>
            </UiTooltipTrigger>
            <UiTooltipContent class="px-2 py-1 text-xs">{{ t.title }}</UiTooltipContent>
          </UiTooltip>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="mx-auto text-pretty p-4 text-center text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
