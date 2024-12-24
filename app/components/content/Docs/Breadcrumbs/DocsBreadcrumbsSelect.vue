<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #select>
      <UiSelect default-value="s1">
        <UiSelectTrigger class="h-9 w-36" />
        <UiSelectContent>
          <UiSelectItem value="s1">Orion</UiSelectItem>
          <UiSelectItem value="s2">Sigma</UiSelectItem>
          <UiSelectItem value="s3">Dorado</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [{ label: "Databases" }, { slot: "select" }];
</script>
