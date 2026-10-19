<template>
  <!--
    Followers and following list
    Features: Tabs with counts, search filter, follow and unfollow buttons, mutual badge, load more button, empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-lg gap-4">
      <UiCardHeader>
        <UiCardTitle>Connections</UiCardTitle>
      </UiCardHeader>
      <UiCardContent class="space-y-4">
        <UiTabs v-model="tab">
          <UiTabsList class="grid w-full grid-cols-2">
            <UiTabsTrigger value="followers">Followers ({{ totals.followers }})</UiTabsTrigger>
            <UiTabsTrigger value="following">Following ({{ totals.following }})</UiTabsTrigger>
          </UiTabsList>
        </UiTabs>

        <div class="relative">
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            v-model="query"
            type="search"
            aria-label="Search people"
            placeholder="Search people"
            class="pl-9"
          />
        </div>

        <p class="text-muted-foreground text-sm" role="status">
          {{ filtered.length }} {{ filtered.length === 1 ? "person" : "people" }}
        </p>

        <ul v-if="shown.length" class="divide-y rounded-lg border">
          <li v-for="person in shown" :key="person.handle" class="flex items-center gap-3 p-3">
            <UiAvatar class="size-10">
              <UiAvatarImage :src="person.avatar" :alt="person.name" />
              <UiAvatarFallback>{{ person.name.slice(0, 1) }}</UiAvatarFallback>
            </UiAvatar>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ person.name }}</p>
              <p class="text-muted-foreground truncate text-xs">
                @{{ person.handle }} · {{ person.role }}
              </p>
              <UiBadge v-if="person.mutual" variant="secondary" size="sm" class="mt-1"
                >Mutual</UiBadge
              >
            </div>
            <UiButton
              size="sm"
              :variant="isFollowing(person) ? 'outline' : 'default'"
              :aria-pressed="isFollowing(person)"
              :aria-label="`${isFollowing(person) ? 'Unfollow' : 'Follow'} ${person.name}`"
              @click="toggle(person)"
            >
              {{ isFollowing(person) ? "Following" : "Follow" }}
            </UiButton>
          </li>
        </ul>
        <div v-else class="rounded-lg border border-dashed p-8 text-center text-sm">
          <p class="font-medium">No one found</p>
          <p class="text-muted-foreground mt-1">Try a different name or handle.</p>
        </div>

        <UiButton
          v-if="filtered.length > limit"
          variant="outline"
          class="w-full"
          @click="limit += pageSize"
        >
          Show {{ Math.min(pageSize, filtered.length - limit) }} more
        </UiButton>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Person = { name: string; handle: string; role: string; avatar: string; mutual: boolean };

  const props = withDefaults(
    defineProps<{
      followers?: Person[];
      following?: Person[];
      pageSize?: number;
    }>(),
    {
      followers: () =>
        [
          ["Maya Chen", "mayachen", "Product designer", 47, true],
          ["Leo Martins", "leomartins", "Staff engineer", 12, true],
          ["Sana Ali", "sanaali", "Product manager", 32, false],
          ["Omar Haddad", "omarh", "Frontend engineer", 15, false],
          ["Priya Nair", "priyanair", "Brand designer", 45, true],
          ["Tom Becker", "tombecker", "Support lead", 33, false],
          ["Ines Ramos", "inesramos", "Data analyst", 44, false],
        ].map(([name, handle, role, img, mutual]) => ({
          name: name as string,
          handle: handle as string,
          role: role as string,
          avatar: `https://i.pravatar.cc/80?img=${img}`,
          mutual: mutual as boolean,
        })),
      following: () =>
        [
          ["Maya Chen", "mayachen", "Product designer", 47, true],
          ["Leo Martins", "leomartins", "Staff engineer", 12, true],
          ["Priya Nair", "priyanair", "Brand designer", 45, true],
          ["Jonas Weber", "jonasw", "Illustrator", 51, false],
        ].map(([name, handle, role, img, mutual]) => ({
          name: name as string,
          handle: handle as string,
          role: role as string,
          avatar: `https://i.pravatar.cc/80?img=${img}`,
          mutual: mutual as boolean,
        })),
      pageSize: 4,
    }
  );

  const tab = ref("followers");
  const query = ref("");
  const limit = ref(props.pageSize);

  // Everyone in the following list starts as followed. The state is shared by handle across tabs.
  const followed = ref(new Set<string>([...props.following.map((person) => person.handle)]));
  const unfollowed = ref(new Set<string>());

  const totals = computed(() => ({
    followers: props.followers.length,
    following: props.following.filter((person) => !unfollowed.value.has(person.handle)).length,
  }));

  const list = computed(() => (tab.value === "followers" ? props.followers : props.following));
  const filtered = computed(() => {
    const needle = query.value.trim().toLowerCase();
    return needle
      ? list.value.filter((person) =>
          `${person.name} ${person.handle}`.toLowerCase().includes(needle)
        )
      : list.value;
  });
  const shown = computed(() => filtered.value.slice(0, limit.value));

  watch([tab, query], () => (limit.value = props.pageSize));

  const isFollowing = (person: Person) => followed.value.has(person.handle);

  function toggle(person: Person) {
    const next = new Set(followed.value);
    const gone = new Set(unfollowed.value);
    if (next.has(person.handle)) {
      next.delete(person.handle);
      gone.add(person.handle);
    } else {
      next.add(person.handle);
      gone.delete(person.handle);
    }
    followed.value = next;
    unfollowed.value = gone;
  }
</script>
