<template>
  <!--
    Contacts list with alphabetical groups
    Features: Sticky letter headings, online status dots, search that filters while keeping groups, message and call buttons per contact and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl border">
      <div class="space-y-3 border-b p-4">
        <h1 class="text-lg font-semibold">Contacts</h1>
        <div class="relative">
          <UiLabel for="contact-search" class="sr-only">Search contacts</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput id="contact-search" v-model="query" placeholder="Search contacts" class="pl-9" />
        </div>
      </div>
      <UiScrollArea class="h-96">
        <section
          v-for="group in groups"
          :key="group.letter"
          :aria-label="`Contacts starting with ${group.letter}`"
        >
          <h2
            class="bg-background text-muted-foreground sticky top-0 z-10 border-b px-4 py-1.5 text-xs font-semibold"
          >
            {{ group.letter }}
          </h2>
          <ul class="divide-y" role="list">
            <li
              v-for="contact in group.items"
              :key="contact.name"
              class="flex items-center gap-3 px-4 py-3"
            >
              <span class="relative">
                <UiAvatar :src="contact.avatar" :fallback="contact.name[0]" class="size-10" />
                <span
                  class="ring-background absolute right-0 bottom-0 size-3 rounded-full ring-2"
                  :class="contact.online ? 'bg-green-500' : 'bg-muted-foreground/40'"
                />
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate font-medium">{{ contact.name }}</p>
                <p class="text-muted-foreground truncate text-xs">
                  {{ contact.role }} · {{ contact.online ? "Online" : "Offline" }}
                </p>
              </div>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Message ${contact.name}`"
                @click="useSonner.info(`Messaging ${contact.name}`)"
              >
                <Icon name="lucide:message-circle" class="size-4" />
              </UiButton>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Call ${contact.name}`"
                @click="useSonner.info(`Calling ${contact.name}`)"
              >
                <Icon name="lucide:phone" class="size-4" />
              </UiButton>
            </li>
          </ul>
        </section>
        <p v-if="!groups.length" class="text-muted-foreground px-4 py-12 text-center text-sm">
          No contacts match “{{ query }}”.
        </p>
      </UiScrollArea>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Contact = { name: string; role: string; avatar: string; online: boolean };

  const props = withDefaults(
    defineProps<{
      contacts?: Contact[];
    }>(),
    {
      contacts: () => [
        {
          name: "Aisha Khan",
          role: "Marketing",
          avatar: "https://i.pravatar.cc/80?img=44",
          online: false,
        },
        {
          name: "Amir Hassan",
          role: "Sales",
          avatar: "https://i.pravatar.cc/80?img=51",
          online: true,
        },
        {
          name: "Ben Taylor",
          role: "Support",
          avatar: "https://i.pravatar.cc/80?img=52",
          online: true,
        },
        {
          name: "Chloe Martin",
          role: "Finance",
          avatar: "https://i.pravatar.cc/80?img=26",
          online: false,
        },
        {
          name: "Ethan Brooks",
          role: "Design",
          avatar: "https://i.pravatar.cc/80?img=33",
          online: true,
        },
        {
          name: "Liam Carter",
          role: "Engineering",
          avatar: "https://i.pravatar.cc/80?img=12",
          online: true,
        },
        {
          name: "Maya Chen",
          role: "CEO",
          avatar: "https://i.pravatar.cc/80?img=45",
          online: false,
        },
        {
          name: "Noah Williams",
          role: "Engineering",
          avatar: "https://i.pravatar.cc/80?img=15",
          online: false,
        },
        {
          name: "Sofia Alvarez",
          role: "Design",
          avatar: "https://i.pravatar.cc/80?img=32",
          online: true,
        },
      ],
    }
  );

  const query = ref("");

  const groups = computed(() => {
    const term = query.value.trim().toLowerCase();
    const matches = props.contacts
      .filter(
        (contact) =>
          !term ||
          contact.name.toLowerCase().includes(term) ||
          contact.role.toLowerCase().includes(term)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    const byLetter = new Map<string, Contact[]>();
    for (const contact of matches) {
      const letter = contact.name[0]!.toUpperCase();
      byLetter.set(letter, [...(byLetter.get(letter) ?? []), contact]);
    }
    return [...byLetter.entries()].map(([letter, items]) => ({ letter, items }));
  });
</script>
