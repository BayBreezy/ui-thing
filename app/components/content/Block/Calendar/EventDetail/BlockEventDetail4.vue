<template>
  <!--
    Attendee list
    Features: Search by name, filter tabs with counts for going, maybe and declined, avatar rows with role and status badges, a host label, remove and message actions and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Attendees</h1>
          <p class="text-muted-foreground text-sm">{{ people.length }} people invited</p>
        </div>
        <UiButton size="sm" @click="useSonner.info('Open your invite form here')"
          ><Icon name="lucide:user-plus" class="size-4" />Invite</UiButton
        >
      </div>

      <div class="relative mt-5">
        <Icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          v-model="query"
          class="pl-9"
          placeholder="Search people"
          aria-label="Search attendees"
        />
      </div>

      <UiTabs v-model="tab" class="mt-4">
        <UiTabsList class="w-full">
          <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value" class="flex-1"
            >{{ item.label
            }}<span class="text-muted-foreground ml-1.5 text-xs">{{
              count(item.value)
            }}</span></UiTabsTrigger
          >
        </UiTabsList>
      </UiTabs>

      <ul v-if="visible.length" class="mt-4 divide-y rounded-xl border" aria-live="polite">
        <li v-for="person in visible" :key="person.id" class="flex items-center gap-3 px-4 py-3">
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${person.avatar}`"
            :fallback="person.name.slice(0, 1)"
            class="size-10"
          />
          <div class="min-w-0 flex-1">
            <p class="flex items-center gap-2 truncate text-sm font-medium">
              {{ person.name }}
              <UiBadge v-if="person.host" variant="soft" color="violet" shape="pill">Host</UiBadge>
            </p>
            <p class="text-muted-foreground truncate text-xs">{{ person.role }}</p>
          </div>
          <UiBadge variant="soft" shape="pill" :color="statusColor[person.status]">{{
            statusLabel[person.status]
          }}</UiBadge>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" :aria-label="`Actions for ${person.name}`"
                ><Icon name="lucide:ellipsis" class="size-4"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem @select="useSonner.info(`Message ${person.name}`)"
                ><Icon name="lucide:message-circle" class="size-4" />Message</UiDropdownMenuItem
              >
              <UiDropdownMenuItem
                v-if="!person.host"
                class="text-destructive"
                @select="remove(person.id)"
                ><Icon name="lucide:user-minus" class="size-4" />Remove</UiDropdownMenuItem
              >
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </li>
      </ul>
      <div
        v-else
        class="text-muted-foreground mt-4 rounded-xl border border-dashed py-12 text-center text-sm"
        aria-live="polite"
      >
        <Icon name="lucide:users" class="mx-auto mb-2 size-6" />
        Nobody matches.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "going" | "maybe" | "declined";
  type Person = {
    id: string;
    name: string;
    role: string;
    avatar: number;
    status: Status;
    host?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      attendees?: Person[];
    }>(),
    {
      attendees: () => [
        {
          id: "a1",
          name: "Maya Patel",
          role: "Product designer",
          avatar: 32,
          status: "going",
          host: true,
        },
        { id: "a2", name: "Leo Fischer", role: "Engineer", avatar: 12, status: "going" },
        { id: "a3", name: "Sofia Alvarez", role: "Product manager", avatar: 45, status: "going" },
        { id: "a4", name: "Noah Kim", role: "Engineering manager", avatar: 15, status: "maybe" },
        { id: "a5", name: "Priya Nair", role: "Data analyst", avatar: 44, status: "maybe" },
        { id: "a6", name: "Tom Becker", role: "Support lead", avatar: 33, status: "declined" },
        { id: "a7", name: "Ines Costa", role: "Marketing", avatar: 47, status: "going" },
      ],
    }
  );

  const tabs = [
    { value: "all", label: "All" },
    { value: "going", label: "Going" },
    { value: "maybe", label: "Maybe" },
    { value: "declined", label: "Declined" },
  ];
  const statusLabel: Record<Status, string> = {
    going: "Going",
    maybe: "Maybe",
    declined: "Declined",
  };
  const statusColor: Record<Status, string> = { going: "green", maybe: "amber", declined: "red" };

  const people = ref<Person[]>(props.attendees.map((person) => ({ ...person })));
  const tab = ref("all");
  const query = ref("");

  const count = (value: string) =>
    value === "all"
      ? people.value.length
      : people.value.filter((person) => person.status === value).length;

  const visible = computed(() =>
    people.value
      .filter((person) => tab.value === "all" || person.status === tab.value)
      .filter((person) => person.name.toLowerCase().includes(query.value.trim().toLowerCase()))
  );

  function remove(id: string) {
    const person = people.value.find((item) => item.id === id);
    people.value = people.value.filter((item) => item.id !== id);
    if (person) useSonner.success(`Removed ${person.name}`);
  }
</script>
