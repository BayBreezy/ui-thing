<template>
  <!--
    Role permissions matrix
    Features: Permissions by role table with checkboxes, locked owner column, grouped permission rows, save and reset
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="p-0">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-6">Permission</UiTableHead>
            <UiTableHead v-for="role in roles" :key="role" class="w-24 text-center">
              {{ role }}
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="group in groups" :key="group.title">
            <UiTableRow class="bg-muted/40 hover:bg-muted/40">
              <UiTableCell
                :colspan="roles.length + 1"
                class="text-muted-foreground pl-6 text-xs font-semibold tracking-wide uppercase"
              >
                {{ group.title }}
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-for="permission in group.items" :key="permission.id">
              <UiTableCell class="pl-6">
                <p class="font-medium">{{ permission.label }}</p>
                <p class="text-muted-foreground text-xs">{{ permission.hint }}</p>
              </UiTableCell>
              <UiTableCell v-for="role in roles" :key="role" class="text-center">
                <UiCheckbox
                  v-model="permission.roles[role]"
                  :disabled="role === 'Owner'"
                  :aria-label="`${permission.label} for ${role}`"
                />
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Reset to defaults</UiButton>
      <UiButton @click="useSonner.success('Permissions saved')">Save permissions</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  type Role = "Owner" | "Admin" | "Member" | "Viewer";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Roles & permissions",
      description: "Control what each role can do. Owners always have full access.",
    }
  );

  const roles: Role[] = ["Owner", "Admin", "Member", "Viewer"];

  const row = (admin: boolean, member: boolean, viewer: boolean): Record<Role, boolean> => ({
    Owner: true,
    Admin: admin,
    Member: member,
    Viewer: viewer,
  });

  const groups = reactive([
    {
      title: "Content",
      items: [
        {
          id: "view",
          label: "View content",
          hint: "Read projects and files.",
          roles: row(true, true, true),
        },
        {
          id: "edit",
          label: "Edit content",
          hint: "Create and change projects.",
          roles: row(true, true, false),
        },
        {
          id: "delete",
          label: "Delete content",
          hint: "Permanently remove projects.",
          roles: row(true, false, false),
        },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          id: "invite",
          label: "Invite members",
          hint: "Add people to the workspace.",
          roles: row(true, false, false),
        },
        {
          id: "billing",
          label: "Manage billing",
          hint: "Change plans and payment methods.",
          roles: row(false, false, false),
        },
        {
          id: "integrations",
          label: "Manage integrations",
          hint: "Connect third party apps.",
          roles: row(true, false, false),
        },
      ],
    },
  ]);
</script>
