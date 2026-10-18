<template>
  <!--
    Team cards that open a full profile
    Features: Compact portrait cards that open a dialog with the full bio, location, department and social links, keyboard and screen reader friendly
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
      <li v-for="m in props.members" :key="m.name">
        <button
          type="button"
          class="group focus-visible:ring-ring w-full rounded-2xl text-left outline-none focus-visible:ring-2"
          :aria-label="`View profile of ${m.name}`"
          @click="selected = m"
        >
          <div class="aspect-square overflow-hidden rounded-2xl">
            <img
              :src="m.avatar"
              :alt="m.name"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 font-semibold">{{ m.name }}</p>
          <p class="text-muted-foreground text-sm">{{ m.role }}</p>
        </button>
      </li>
    </ul>

    <UiDialog :open="!!selected" @update:open="(v) => !v && (selected = null)">
      <UiDialogContent v-if="selected" class="sm:max-w-md">
        <UiDialogHeader class="items-center text-center">
          <UiAvatar :src="selected.avatar" :fallback="selected.name[0]" class="size-24" />
          <UiDialogTitle class="mt-2">{{ selected.name }}</UiDialogTitle>
          <UiDialogDescription>{{ selected.role }} · {{ selected.location }}</UiDialogDescription>
        </UiDialogHeader>
        <p class="text-muted-foreground text-center text-sm">{{ selected.bio }}</p>
        <div class="flex justify-center">
          <UiBadge variant="secondary">{{ selected.department }}</UiBadge>
        </div>
        <div class="flex items-center justify-center gap-4">
          <a
            v-if="selected.x"
            :href="selected.x"
            :aria-label="`${selected.name} on X`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="simple-icons:x" class="size-4"
          /></a>
          <a
            v-if="selected.linkedin"
            :href="selected.linkedin"
            :aria-label="`${selected.name} on LinkedIn`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="mdi:linkedin" class="size-5"
          /></a>
          <a
            v-if="selected.github"
            :href="selected.github"
            :aria-label="`${selected.name} on GitHub`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="mdi:github" class="size-5"
          /></a>
        </div>
      </UiDialogContent>
    </UiDialog>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Member = {
    name: string;
    role: string;
    department: string;
    location: string;
    bio: string;
    avatar: string;
    x?: string;
    linkedin?: string;
    github?: string;
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; members?: Member[] }>(),
    {
      title: "Click a face to learn more",
      description: "Everyone has a story. Open a card to read theirs.",
      members: () => [
        {
          name: "Maya Chen",
          role: "Co-founder & CEO",
          department: "Leadership",
          location: "San Francisco, US",
          bio: "Former product lead who has launched three companies. Obsessed with calm software.",
          avatar: "https://i.pravatar.cc/400?img=47",
          x: "#",
          linkedin: "#",
        },
        {
          name: "Liam O'Connor",
          role: "Co-founder & CTO",
          department: "Leadership",
          location: "Dublin, IE",
          bio: "Spent a decade building distributed systems before deciding they should be friendlier.",
          avatar: "https://i.pravatar.cc/400?img=12",
          github: "#",
          linkedin: "#",
        },
        {
          name: "Priya Nair",
          role: "Head of Design",
          department: "Design",
          location: "Bengaluru, IN",
          bio: "Leads a small team that sweats the details, from icons to onboarding.",
          avatar: "https://i.pravatar.cc/400?img=45",
          x: "#",
          linkedin: "#",
        },
        {
          name: "Noah Fischer",
          role: "Staff Engineer",
          department: "Engineering",
          location: "Berlin, DE",
          bio: "Performance nerd. If it takes more than 100ms, he has already opened a pull request.",
          avatar: "https://i.pravatar.cc/400?img=53",
          github: "#",
          x: "#",
        },
        {
          name: "Ana Souza",
          role: "Engineering Manager",
          department: "Engineering",
          location: "São Paulo, BR",
          bio: "Coaches engineers, unblocks teams and keeps releases boring in the best way.",
          avatar: "https://i.pravatar.cc/400?img=44",
          linkedin: "#",
          github: "#",
        },
        {
          name: "Sam Okafor",
          role: "Product Designer",
          department: "Design",
          location: "Lagos, NG",
          bio: "Turns messy ideas into clear flows. Collects keyboards and board games.",
          avatar: "https://i.pravatar.cc/400?img=32",
          x: "#",
          linkedin: "#",
        },
        {
          name: "Hannah Lee",
          role: "Head of Growth",
          department: "Growth",
          location: "Seoul, KR",
          bio: "Builds the playbooks that bring the right customers through the door.",
          avatar: "https://i.pravatar.cc/400?img=49",
          linkedin: "#",
          x: "#",
        },
        {
          name: "Diego Alvarez",
          role: "Customer Success Lead",
          department: "Growth",
          location: "Mexico City, MX",
          bio: "First to answer, last to give up. Our customers have his number on speed dial.",
          avatar: "https://i.pravatar.cc/400?img=33",
          linkedin: "#",
        },
      ],
    }
  );

  const selected = ref<Member | null>(null);
</script>
