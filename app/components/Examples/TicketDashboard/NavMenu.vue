<template>
  <template v-for="(item, index) in items" :key="index">
    <template v-if="!item.items">
      <NuxtLink
        v-tippy.right="isCollapsed ? item.title : ''"
        :to="item.link"
        class="group mb-2 flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition hover:bg-accent"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="size-4 shrink-0 transition group-hover:text-primary"
        />
        <span
          class="transition group-hover:text-primary group-data-[state=collapsed]/splitter:hidden"
          >{{ item.title }}</span
        >
      </NuxtLink>
    </template>
    <template v-else>
      <UiCollapsible>
        <UiCollapsibleTrigger
          v-tippy.right="isCollapsed ? item.title : ''"
          class="group mb-2 flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm transition hover:bg-accent"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="size-4 shrink-0 transition group-hover:text-primary"
          />
          <span
            class="transition group-hover:text-primary group-data-[state=collapsed]/splitter:hidden"
            >{{ item.title }}</span
          >
          <Icon
            name="solar:alt-arrow-down-broken"
            class="ml-auto size-4 shrink-0 transition group-hover:text-primary group-data-[state=collapsed]/splitter:hidden group-data-[state=open]:rotate-180"
          />
        </UiCollapsibleTrigger>
        <UiCollapsibleContent class="pl-4 group-data-[state=collapsed]/splitter:hidden">
          <ExamplesTicketDashboardNavMenu :items="item.items" />
        </UiCollapsibleContent>
      </UiCollapsible>
    </template>
  </template>
</template>
<script lang="ts" setup>
  type Item = {
    title: string;
    icon?: string;
    items?: {
      title: string;
      link: string;
      icon?: string;
    }[];
    link?: string;
  };
  defineProps<{
    items: Item[];
    isCollapsed?: boolean;
  }>();
</script>
