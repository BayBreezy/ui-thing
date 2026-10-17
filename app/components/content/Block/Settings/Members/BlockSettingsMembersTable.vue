<template>
  <!--
    Team members table with roles and row actions
    Features: Avatar and email cell, inline role select, status badges, search, row action menu, member count header
  -->
  <UiCard>
    <UiCardHeader>
      <div class="flex items-center gap-2">
        <UiCardTitle>{{ props.title }}</UiCardTitle>
        <UiBadge variant="secondary">{{ members.length }}</UiBadge>
      </div>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <UiButton size="sm" @click="useSonner.info('Open your invite dialog here')">
          <Icon name="lucide:user-plus" class="size-4" />
          Invite member
        </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-4 p-0">
      <div class="px-6">
        <div class="relative max-w-xs">
          <Icon
            name="lucide:search"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput v-model="query" placeholder="Search members" class="pl-9" />
        </div>
      </div>
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-6">Name</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead>Role</UiTableHead>
            <UiTableHead class="w-12 pr-6" />
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="member in filtered" :key="member.email">
            <UiTableCell class="pl-6">
              <div class="flex items-center gap-3">
                <UiAvatar :src="member.avatar" :fallback="initials(member.name)" />
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ member.name }}</p>
                  <p class="text-muted-foreground truncate text-xs">{{ member.email }}</p>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell>
              <UiBadge :variant="member.status === 'Active' ? 'success' : 'outline'">
                {{ member.status }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell>
              <UiNativeSelect
                v-model="member.role"
                class="h-8 w-32"
                :disabled="member.role === 'Owner'"
                :aria-label="`Role for ${member.name}`"
              >
                <option v-for="role in roles" :key="role">{{ role }}</option>
              </UiNativeSelect>
            </UiTableCell>
            <UiTableCell class="pr-6 text-right">
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`Actions for ${member.name}`"
                  >
                    <Icon name="lucide:ellipsis" class="size-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem @select="useSonner.info(`Reminder sent to ${member.name}`)">
                    <Icon name="lucide:mail" class="size-4" />
                    Resend invite
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem @select="useSonner.info('Open permissions here')">
                    <Icon name="lucide:shield" class="size-4" />
                    Permissions
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    variant="destructive"
                    :disabled="member.role === 'Owner'"
                    @select="remove(member.email)"
                  >
                    <Icon name="lucide:trash-2" class="size-4" />
                    Remove
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!filtered.length" :colspan="4">No members found.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Member = {
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: "Active" | "Invited";
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Team members",
      description: "Manage who has access to this workspace and what they can do.",
    }
  );

  const roles = ["Owner", "Admin", "Member", "Viewer"];

  const members = ref<Member[]>([
    {
      name: "Maya Chen",
      email: "maya@uithing.com",
      avatar: "https://i.pravatar.cc/80?img=47",
      role: "Owner",
      status: "Active",
    },
    {
      name: "Liam Carter",
      email: "liam@uithing.com",
      avatar: "https://i.pravatar.cc/80?img=12",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Priya Nair",
      email: "priya@uithing.com",
      avatar: "https://i.pravatar.cc/80?img=45",
      role: "Member",
      status: "Active",
    },
    {
      name: "Sam Okafor",
      email: "sam@uithing.com",
      avatar: "https://i.pravatar.cc/80?img=32",
      role: "Viewer",
      status: "Invited",
    },
  ]);

  const query = ref("");

  const filtered = computed(() =>
    members.value.filter((member) =>
      `${member.name} ${member.email}`.toLowerCase().includes(query.value.toLowerCase())
    )
  );

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }

  function remove(email: string) {
    members.value = members.value.filter((member) => member.email !== email);
    useSonner.success("Member removed");
  }
</script>
