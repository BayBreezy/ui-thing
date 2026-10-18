<template>
  <!--
    Table toolbar with faceted filter popovers
    Features: Role and status facet popovers with checkbox lists and counts, selected count badges, reset button and a members table that updates as you filter
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 flex flex-wrap items-center gap-2">
      <UiPopover v-for="facet in facets" :key="facet.key">
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" size="sm" class="border-dashed">
            <Icon name="lucide:circle-plus" class="size-4" />
            {{ facet.label }}
            <UiBadge v-if="selected[facet.key].length" variant="secondary" class="ml-1">
              {{ selected[facet.key].length }}
            </UiBadge>
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent align="start" class="w-52 p-2">
          <ul class="space-y-1">
            <li v-for="option in options(facet.key)" :key="option.value">
              <div class="hover:bg-accent flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
                <UiCheckbox
                  :id="`${facet.key}-${option.value}`"
                  :model-value="selected[facet.key].includes(option.value)"
                  @update:model-value="toggle(facet.key, option.value)"
                />
                <UiLabel :for="`${facet.key}-${option.value}`" class="flex-1 cursor-pointer">
                  {{ option.value }}
                </UiLabel>
                <span class="text-muted-foreground text-xs tabular-nums">{{ option.count }}</span>
              </div>
            </li>
          </ul>
        </UiPopoverContent>
      </UiPopover>
      <UiButton v-if="hasFilters" variant="ghost" size="sm" @click="reset">
        Reset
        <Icon name="lucide:x" class="size-4" />
      </UiButton>
    </div>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Member</UiTableHead>
            <UiTableHead>Role</UiTableHead>
            <UiTableHead>Status</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="member in rows" :key="member.email">
            <UiTableCell>
              <div class="flex items-center gap-3">
                <UiAvatar :src="member.avatar" :fallback="initials(member.name)" />
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ member.name }}</p>
                  <p class="text-muted-foreground truncate text-xs">{{ member.email }}</p>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell>{{ member.role }}</UiTableCell>
            <UiTableCell>
              <UiBadge
                variant="soft"
                :color="member.status === 'Active' ? 'green' : 'amber'"
                shape="pill"
              >
                {{ member.status }}
              </UiBadge>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="3"
            >No members match these filters.</UiTableEmpty
          >
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type FacetKey = "role" | "status";

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
      members?: Member[];
    }>(),
    {
      title: "Members",
      description: "Combine facets to find exactly who you are looking for.",
      members: () => [
        {
          name: "Maya Chen",
          email: "maya@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=47",
          role: "Owner",
          status: "Active",
        },
        {
          name: "Liam Carter",
          email: "liam@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=12",
          role: "Admin",
          status: "Active",
        },
        {
          name: "Sofia Alvarez",
          email: "sofia@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=32",
          role: "Editor",
          status: "Active",
        },
        {
          name: "Noah Williams",
          email: "noah@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=15",
          role: "Editor",
          status: "Invited",
        },
        {
          name: "Aisha Khan",
          email: "aisha@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=45",
          role: "Viewer",
          status: "Active",
        },
        {
          name: "Ethan Brooks",
          email: "ethan@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=33",
          role: "Viewer",
          status: "Invited",
        },
      ],
    }
  );

  const facets: { key: FacetKey; label: string }[] = [
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const selected = reactive<Record<FacetKey, string[]>>({ role: [], status: [] });

  const hasFilters = computed(() => selected.role.length > 0 || selected.status.length > 0);

  function options(key: FacetKey) {
    const counts = new Map<string, number>();
    for (const member of props.members) {
      counts.set(member[key], (counts.get(member[key]) ?? 0) + 1);
    }
    return [...counts.entries()].map(([value, count]) => ({ value, count }));
  }

  function toggle(key: FacetKey, value: string) {
    selected[key] = selected[key].includes(value)
      ? selected[key].filter((item) => item !== value)
      : [...selected[key], value];
  }

  function reset() {
    selected.role = [];
    selected.status = [];
  }

  const rows = computed(() =>
    props.members.filter(
      (member) =>
        (!selected.role.length || selected.role.includes(member.role)) &&
        (!selected.status.length || selected.status.includes(member.status))
    )
  );

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }
</script>
