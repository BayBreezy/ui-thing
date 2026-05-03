<template>
  <div class="border-border/50 rounded-md border">
    <ui-table>
      <ui-table-header>
        <ui-table-row>
          <ui-table-head class="bg-background/50 sticky left-0 w-10 backdrop-blur-md">
            <span class="sr-only">Drag handle</span>
          </ui-table-head>
          <ui-table-head>Name</ui-table-head>
          <ui-table-head>Country</ui-table-head>
          <ui-table-head>Phone</ui-table-head>
          <ui-table-head>Email</ui-table-head>
          <ui-table-head>
            <span class="sr-only">Table actions</span>
          </ui-table-head>
        </ui-table-row>
      </ui-table-header>
      <ui-draggable handle=".handle" tag="tbody" :list="people" item-key="id">
        <template #item="{ element }">
          <ui-table-row>
            <ui-table-cell class="bg-background/50 sticky left-0 w-10 backdrop-blur-md">
              <ui-fancy-icon
                size="sm"
                class="handle size-7 cursor-grab rounded-md border-none"
                icon="lucide:grip-vertical"
                aria-hidden="true"
                aria-label="Drag handle"
              />
            </ui-table-cell>
            <ui-table-cell>{{ element.name }}</ui-table-cell>
            <ui-table-cell>{{ element.country }}</ui-table-cell>
            <ui-table-cell>{{ element.phone }}</ui-table-cell>
            <ui-table-cell>{{ element.email }}</ui-table-cell>
          </ui-table-row>
        </template>
      </ui-draggable>
    </ui-table>
    <p class="text-muted-foreground py-4 text-center text-sm">Drag and drop to reorder rows</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 5 }, () => ({
      id: useId(),
      name: faker.person.fullName(),
      country: faker.location.country(),
      phone: faker.phone.number({ style: "national" }),
      email: faker.internet.email().toLowerCase(),
    }))
  );

  const people = ref(data.value || []);
</script>
