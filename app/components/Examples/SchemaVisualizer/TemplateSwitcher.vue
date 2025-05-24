<template>
  <UiBreadcrumbs class="w-fit" :items="items">
    <template #template>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger class="flex items-center gap-1 text-sm font-medium text-foreground">
          {{ activeTemplate }}
          <Icon name="lucide:chevron-down" class="-me-1 size-4 opacity-60" aria-hidden="true" />
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent :side-offset="10">
          <UiDropdownMenuRadioGroup v-model="activeTemplate">
            <UiDropdownMenuRadioItem
              v-for="item in templates"
              :key="item.name"
              :value="item.name"
              :title="item.name"
              :text-value="item.name"
            />
          </UiDropdownMenuRadioGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  const items = [{ label: "Templates" }, { slot: "template" }];

  const templates = [
    {
      name: "Schema-Visualizer",
      href: "/templates/schema-visualizer",
    },
    {
      name: "Component-Explorer",
      href: "/templates/component-explorer",
    },
    {
      name: "Dashboard-Builder",
      href: "/templates/dashboard-builder",
    },
    {
      name: "Form-Generator",
      href: "/templates/form-generator",
    },
  ];
  const activeTemplate = ref("Schema-Visualizer");
</script>
