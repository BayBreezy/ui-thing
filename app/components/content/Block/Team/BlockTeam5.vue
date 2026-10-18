<template>
  <!--
    Company stats above a portrait grid
    Features: Heading and call to action beside four stat tiles with fancy icons, then a grid of portrait cards with name and role on a gradient
  -->
  <section class="bg-muted/40 py-16 lg:py-24">
    <UiContainer>
      <div class="grid items-end gap-10 lg:grid-cols-2">
        <div>
          <p class="text-primary text-sm font-semibold">Join our team</p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ props.title }}
          </h2>
          <p class="text-muted-foreground mt-4 text-lg">{{ props.description }}</p>
          <UiButton class="mt-6">
            View open positions
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </div>
        <ul class="grid grid-cols-2 gap-4">
          <li
            v-for="stat in props.stats"
            :key="stat.label"
            class="bg-card flex items-center gap-4 rounded-2xl border p-4"
          >
            <UiFancyIcon :icon="stat.icon" theme="light" :color="stat.color" />
            <div>
              <p class="text-2xl font-bold tracking-tight">{{ stat.value }}</p>
              <p class="text-muted-foreground text-xs">{{ stat.label }}</p>
            </div>
          </li>
        </ul>
      </div>
      <ul class="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        <li
          v-for="m in props.members"
          :key="m.name"
          class="relative aspect-4/5 overflow-hidden rounded-2xl"
        >
          <img :src="m.avatar" :alt="m.name" class="size-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-linear-to-t from-black/75 to-transparent to-60%" />
          <div class="absolute bottom-0 p-4 text-white">
            <p class="font-semibold">{{ m.name }}</p>
            <p class="text-sm text-white/75">{{ m.role }}</p>
          </div>
        </li>
      </ul>
    </UiContainer>
  </section>
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
    defineProps<{
      title?: string;
      description?: string;
      members?: Member[];
      stats?: {
        value: string;
        label: string;
        icon: string;
        color: "primary" | "gray" | "error" | "warning" | "success" | "info";
      }[];
    }>(),
    {
      title: "Work with talented people from around the world",
      description:
        "We are a diverse team of designers, engineers and dreamers. Remote first, mission driven and always learning.",
      stats: () => [
        { value: "48", label: "Team members", icon: "lucide:users", color: "info" },
        { value: "19", label: "Countries", icon: "lucide:globe", color: "success" },
        { value: "100%", label: "Remote", icon: "lucide:house", color: "warning" },
        { value: "4.9", label: "Glassdoor rating", icon: "lucide:star", color: "primary" },
      ],
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
</script>
