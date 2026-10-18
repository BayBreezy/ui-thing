<template>
  <!--
    Team directory table with department filter and row actions
    Features: Card wrapper with member count, department select filter, avatar with title cell, location column, row action menu and an invite button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard>
      <UiCardHeader>
        <div class="flex items-center gap-2">
          <UiCardTitle>{{ title }}</UiCardTitle>
          <UiBadge variant="secondary">{{ rows.length }}</UiBadge>
        </div>
        <UiCardDescription>{{ description }}</UiCardDescription>
        <UiCardAction>
          <UiButton size="sm" @click="useSonner.info('Open your invite dialog here')">
            <Icon name="lucide:user-plus" class="size-4" />
            Invite
          </UiButton>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent class="space-y-4 p-0">
        <div class="px-6">
          <UiSelect v-model="department">
            <UiSelectTrigger class="w-full sm:w-52" aria-label="Filter by department">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="all">All departments</UiSelectItem>
              <UiSelectItem v-for="name in departments" :key="name" :value="name">
                {{ name }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="pl-6">Member</UiTableHead>
              <UiTableHead class="hidden sm:table-cell">Department</UiTableHead>
              <UiTableHead class="hidden md:table-cell">Location</UiTableHead>
              <UiTableHead class="w-12 pr-6"><span class="sr-only">Actions</span></UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="member in rows" :key="member.email">
              <UiTableCell class="pl-6">
                <div class="flex items-center gap-3">
                  <UiAvatar :src="member.avatar" :fallback="initials(member.name)" />
                  <div class="min-w-0">
                    <p class="truncate font-medium">{{ member.name }}</p>
                    <p class="text-muted-foreground truncate text-xs">{{ member.title }}</p>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="hidden sm:table-cell">
                <UiBadge variant="outline">{{ member.department }}</UiBadge>
              </UiTableCell>
              <UiTableCell class="text-muted-foreground hidden md:table-cell">
                {{ member.location }}
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
                    <UiDropdownMenuItem @select="useSonner.info(`Emailing ${member.email}`)">
                      <Icon name="lucide:mail" class="size-4" />
                      Send email
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem @select="useSonner.info(`Opening ${member.name}`)">
                      <Icon name="lucide:user" class="size-4" />
                      View profile
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTableCell>
            </UiTableRow>
            <UiTableEmpty v-if="!rows.length" :colspan="4"
              >No members in this department.</UiTableEmpty
            >
          </UiTableBody>
        </UiTable>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Member = {
    name: string;
    email: string;
    avatar: string;
    title: string;
    department: string;
    location: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      members?: Member[];
    }>(),
    {
      title: "Team directory",
      description: "Find the right person and reach out in a click.",
      members: () => [
        {
          name: "Maya Chen",
          email: "maya@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=47",
          title: "Chief Executive Officer",
          department: "Leadership",
          location: "San Francisco, US",
        },
        {
          name: "Liam Carter",
          email: "liam@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=12",
          title: "Staff Engineer",
          department: "Engineering",
          location: "Toronto, CA",
        },
        {
          name: "Sofia Alvarez",
          email: "sofia@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=32",
          title: "Product Designer",
          department: "Design",
          location: "Madrid, ES",
        },
        {
          name: "Noah Williams",
          email: "noah@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=15",
          title: "Frontend Engineer",
          department: "Engineering",
          location: "London, UK",
        },
        {
          name: "Aisha Khan",
          email: "aisha@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=45",
          title: "Head of Marketing",
          department: "Marketing",
          location: "Dubai, AE",
        },
        {
          name: "Ethan Brooks",
          email: "ethan@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=33",
          title: "Design Lead",
          department: "Design",
          location: "Austin, US",
        },
      ],
    }
  );

  const department = ref("all");

  const departments = computed(() => [...new Set(props.members.map((m) => m.department))]);

  const rows = computed(() =>
    department.value === "all"
      ? props.members
      : props.members.filter((member) => member.department === department.value)
  );

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }
</script>
