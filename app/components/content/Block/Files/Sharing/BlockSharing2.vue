<template>
  <!--
    Access list
    Features: Everyone with access listed with a role select, an owner row that cannot be changed, pending invitations with resend and cancel, a remove action with an undo and a count of people by role
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">People with access</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">{{ summary }}</p>
        </div>
        <UiButton size="sm" @click="useSonner.info('Open the invite dialog here')"
          ><Icon name="lucide:user-plus" class="size-4" />Invite</UiButton
        >
      </div>

      <ul class="mt-6 divide-y rounded-xl border" aria-live="polite">
        <li
          v-for="person in people"
          :key="person.email"
          class="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:flex-nowrap"
        >
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${person.avatar}`"
            :fallback="person.name.slice(0, 1)"
            class="size-10"
          />
          <div class="min-w-0 flex-1 basis-40">
            <p class="flex items-center gap-2 truncate text-sm font-medium">
              {{ person.name }}
              <UiBadge v-if="person.pending" variant="soft" color="amber" shape="pill"
                >Pending</UiBadge
              >
            </p>
            <p class="text-muted-foreground truncate text-xs">{{ person.email }}</p>
          </div>
          <span v-if="person.owner" class="text-muted-foreground text-sm">Owner</span>
          <div v-else class="ml-auto flex items-center gap-2">
            <UiButton v-if="person.pending" variant="ghost" size="sm" @click="resend(person)"
              >Resend</UiButton
            >
            <UiSelect v-model="person.role">
              <UiSelectTrigger class="h-8 w-32" :aria-label="`Role for ${person.name}`"
                ><UiSelectValue
              /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="viewer">Viewer</UiSelectItem>
                <UiSelectItem value="commenter">Commenter</UiSelectItem>
                <UiSelectItem value="editor">Editor</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="`${person.pending ? 'Cancel invitation for' : 'Remove'} ${person.name}`"
              @click="remove(person)"
              ><Icon name="lucide:x" class="size-4"
            /></UiButton>
          </div>
        </li>
        <li v-if="!people.length" class="text-muted-foreground px-4 py-10 text-center text-sm">
          Nobody has access yet.
        </li>
      </ul>

      <div
        v-if="removed"
        class="bg-muted/60 mt-4 flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm"
        role="status"
      >
        <span>Removed {{ removed.person.name }}.</span>
        <UiButton variant="link" size="sm" class="h-auto p-0" @click="undo">Undo</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Role = "viewer" | "commenter" | "editor";
  type Person = {
    name: string;
    email: string;
    avatar: number;
    role: Role;
    owner?: boolean;
    pending?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      people?: Person[];
    }>(),
    {
      people: () => [
        { name: "Alex Rivera", email: "alex@example.com", avatar: 32, role: "editor", owner: true },
        { name: "Sofia Alvarez", email: "sofia@example.com", avatar: 45, role: "editor" },
        { name: "Noah Kim", email: "noah@example.com", avatar: 15, role: "commenter" },
        { name: "Priya Nair", email: "priya@example.com", avatar: 44, role: "viewer" },
        { name: "Tom Becker", email: "tom@example.com", avatar: 33, role: "viewer", pending: true },
      ],
    }
  );

  const people = ref<Person[]>(props.people.map((person) => ({ ...person })));
  const removed = ref<{ person: Person; index: number } | null>(null);

  const summary = computed(() => {
    const active = people.value.filter((person) => !person.pending);
    const editors = active.filter((person) => person.role === "editor").length;
    const pending = people.value.length - active.length;
    return `${active.length} ${active.length === 1 ? "person" : "people"}, ${editors} ${editors === 1 ? "editor" : "editors"}${pending ? `, ${pending} pending` : ""}`;
  });

  function remove(person: Person) {
    const index = people.value.findIndex((item) => item.email === person.email);
    removed.value = { person, index };
    people.value.splice(index, 1);
  }

  function undo() {
    if (!removed.value) return;
    people.value.splice(removed.value.index, 0, removed.value.person);
    removed.value = null;
  }

  function resend(person: Person) {
    useSonner.success(`Invitation sent again to ${person.email}`);
  }
</script>
