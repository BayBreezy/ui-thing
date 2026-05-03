<template>
  <div class="overflow-y-auto">
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Users</h1>
        <p class="text-muted-foreground text-sm">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm">Add user</UiButton>
      </div>
    </div>

    <div class="mt-10 [&>div]:max-h-[500px]">
      <UiTable class="">
        <UiTableHeader class="bg-background/90 sticky top-0 z-10 backdrop-blur-sm">
          <UiTableRow>
            <UiTableHead class="text-foreground pl-0 font-semibold backdrop-blur">Name</UiTableHead>
            <UiTableHead
              class="bg-background/90 text-foreground hidden pl-0 font-semibold backdrop-blur lg:table-cell"
              >Title</UiTableHead
            >
            <UiTableHead
              class="bg-background/90 text-foreground hidden pl-0 font-semibold backdrop-blur md:table-cell"
              >Email</UiTableHead
            >
            <UiTableHead class="text-foreground pl-0 font-semibold backdrop-blur">Role</UiTableHead>
            <UiTableHead class="pl-0 backdrop-blur">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="user in users" :key="user.id">
            <UiTableRow>
              <UiTableCell class="pl-0">
                <div class="flex flex-col">
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-muted-foreground lg:hidden">{{ user.title }}</p>
                  <p class="text-muted-foreground md:hidden">{{ user.email }}</p>
                </div>
              </UiTableCell>
              <UiTableCell class="text-muted-foreground hidden pl-0 lg:table-cell">{{
                user.title
              }}</UiTableCell>
              <UiTableCell class="text-muted-foreground hidden pl-0 md:table-cell">{{
                user.email
              }}</UiTableCell>
              <UiTableCell class="text-muted-foreground pl-0">{{ user.role }}</UiTableCell>
              <UiTableCell class="pl-0 text-right">
                <UiButton size="sm" variant="linkHover2">Edit</UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: users } = useAsyncData(async () => {
    return Array.from({ length: 20 }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        title: faker.person.jobTitle(),
        email: email.toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
      };
    });
  });
</script>
