<template>
  <!--
    Master detail split with a list and a detail panel
    Features: Selectable table rows with keyboard support, a sticky detail card with contact info and recent activity, stacks on small screens and keeps the first row selected
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 grid gap-6 lg:grid-cols-5">
      <div class="overflow-hidden rounded-xl border lg:col-span-3">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Contact</UiTableHead>
              <UiTableHead class="hidden sm:table-cell">Company</UiTableHead>
              <UiTableHead>Stage</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow
              v-for="contact in contacts"
              :key="contact.id"
              tabindex="0"
              class="cursor-pointer"
              :data-state="contact.id === selectedId ? 'selected' : undefined"
              :aria-selected="contact.id === selectedId"
              @click="selectedId = contact.id"
              @keydown.enter.prevent="selectedId = contact.id"
              @keydown.space.prevent="selectedId = contact.id"
            >
              <UiTableCell>
                <div class="flex items-center gap-3">
                  <UiAvatar :src="contact.avatar" :fallback="contact.name[0]" />
                  <span class="font-medium">{{ contact.name }}</span>
                </div>
              </UiTableCell>
              <UiTableCell class="text-muted-foreground hidden sm:table-cell">
                {{ contact.company }}
              </UiTableCell>
              <UiTableCell>
                <UiBadge
                  variant="soft"
                  :color="contact.stage === 'Customer' ? 'green' : 'blue'"
                  shape="pill"
                >
                  {{ contact.stage }}
                </UiBadge>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>

      <UiCard v-if="selected" class="h-fit lg:sticky lg:top-6 lg:col-span-2" aria-live="polite">
        <UiCardHeader>
          <div class="flex items-center gap-3">
            <UiAvatar :src="selected.avatar" :fallback="selected.name[0]" class="size-12" />
            <div>
              <UiCardTitle>{{ selected.name }}</UiCardTitle>
              <UiCardDescription>{{ selected.role }} at {{ selected.company }}</UiCardDescription>
            </div>
          </div>
        </UiCardHeader>
        <UiCardContent class="space-y-4 text-sm">
          <div class="space-y-2">
            <p class="flex items-center gap-2">
              <Icon name="lucide:mail" class="text-muted-foreground size-4" />
              {{ selected.email }}
            </p>
            <p class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="text-muted-foreground size-4" />
              {{ selected.location }}
            </p>
          </div>
          <UiSeparator />
          <div>
            <h2 class="mb-2 font-semibold">Recent activity</h2>
            <ul class="text-muted-foreground space-y-2">
              <li v-for="item in selected.activity" :key="item" class="flex gap-2">
                <Icon name="lucide:dot" class="mt-0.5 size-4 shrink-0" />
                {{ item }}
              </li>
            </ul>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Contact = {
    id: string;
    name: string;
    role: string;
    company: string;
    email: string;
    location: string;
    avatar: string;
    stage: "Lead" | "Customer";
    activity: string[];
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      contacts?: Contact[];
    }>(),
    {
      title: "Contacts",
      description: "Pick a row and the details appear next to the list.",
      contacts: () => [
        {
          id: "c1",
          name: "Hannah Lee",
          role: "VP Product",
          company: "Globex",
          email: "hannah@globex.example",
          location: "San Francisco, US",
          avatar: "https://i.pravatar.cc/120?img=47",
          stage: "Customer",
          activity: [
            "Renewed the annual plan",
            "Opened a support ticket about SSO",
            "Invited 4 teammates",
          ],
        },
        {
          id: "c2",
          name: "Marco Rossi",
          role: "CTO",
          company: "Initech",
          email: "marco@initech.example",
          location: "Milan, IT",
          avatar: "https://i.pravatar.cc/120?img=12",
          stage: "Lead",
          activity: ["Booked a demo for Thursday", "Downloaded the security whitepaper"],
        },
        {
          id: "c3",
          name: "Priya Nair",
          role: "Head of Ops",
          company: "Umbrella Labs",
          email: "priya@umbrella.example",
          location: "Bengaluru, IN",
          avatar: "https://i.pravatar.cc/120?img=32",
          stage: "Customer",
          activity: ["Upgraded to the Team plan", "Exported her first report"],
        },
        {
          id: "c4",
          name: "Lukas Meyer",
          role: "Engineering Manager",
          company: "Hooli",
          email: "lukas@hooli.example",
          location: "Berlin, DE",
          avatar: "https://i.pravatar.cc/120?img=15",
          stage: "Lead",
          activity: ["Started a free trial", "Viewed the pricing page twice"],
        },
      ],
    }
  );

  const selectedId = ref(props.contacts[0]?.id ?? "");

  const selected = computed(() =>
    props.contacts.find((contact) => contact.id === selectedId.value)
  );
</script>
