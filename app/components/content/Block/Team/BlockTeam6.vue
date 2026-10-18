<template>
  <!--
    Team directory with department tabs
    Features: Tabs that filter the team by department with an animated grid, a member count per tab and compact cards with role and location
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <UiTabs v-model="active" class="mt-10">
      <div class="flex justify-center overflow-x-auto">
        <UiTabsList>
          <UiTabsTrigger v-for="d in departments" :key="d" :value="d" class="gap-2">
            {{ d }}
            <UiBadge variant="secondary" class="h-5 px-1.5 text-xs">{{ count(d) }}</UiBadge>
          </UiTabsTrigger>
        </UiTabsList>
      </div>
    </UiTabs>
    <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        <Motion
          v-for="m in filtered"
          :key="m.name"
          as="li"
          layout
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.95 }"
          :transition="{ duration: 0.25 }"
          class="bg-card rounded-2xl border p-5 text-center"
        >
          <UiAvatar :src="m.avatar" :fallback="m.name[0]" class="mx-auto size-20" />
          <p class="mt-4 font-semibold">{{ m.name }}</p>
          <p class="text-muted-foreground text-sm">{{ m.role }}</p>
          <p class="text-muted-foreground mt-2 flex items-center justify-center gap-1 text-xs">
            <Icon name="lucide:map-pin" class="size-3" />
            {{ m.location }}
          </p>
        </Motion>
      </AnimatePresence>
    </ul>
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
      title: "Find your people",
      description: "Browse the team by department.",
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

  const active = ref("All");
  const departments = computed(() => ["All", ...new Set(props.members.map((m) => m.department))]);
  const filtered = computed(() =>
    active.value === "All"
      ? props.members
      : props.members.filter((m) => m.department === active.value)
  );
  const count = (d: string) =>
    d === "All" ? props.members.length : props.members.filter((m) => m.department === d).length;
</script>
