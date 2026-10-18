<template>
  <!--
    Hiring call to action with open roles
    Features: Dark panel with an overlapping avatar strip, heading, call to action and a list of open positions with team, location and an apply link
  -->
  <UiContainer class="py-14 lg:py-20">
    <div
      class="relative overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white ring-1 ring-white/15 sm:p-12"
    >
      <div
        class="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-indigo-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <UiAvatarGroup>
            <UiAvatar v-for="m in props.members.slice(0, 6)" :key="m.name" class="size-11">
              <UiAvatarImage :src="m.avatar" :alt="m.name" />
              <UiAvatarFallback>{{ m.name[0] }}</UiAvatarFallback>
            </UiAvatar>
          </UiAvatarGroup>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ props.title }}
          </h2>
          <p class="mt-4 text-lg text-neutral-400">{{ props.description }}</p>
          <UiButton class="mt-6 bg-white text-neutral-950 hover:bg-white/90">
            See all {{ props.roles.length }} open roles
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </div>
        <ul class="divide-y divide-white/10 self-center rounded-2xl border border-white/10">
          <li v-for="role in props.roles" :key="role.title">
            <a
              href="#"
              class="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-white/5"
            >
              <div>
                <p class="font-semibold">{{ role.title }}</p>
                <p class="text-sm text-neutral-400">{{ role.team }} · {{ role.location }}</p>
              </div>
              <Icon
                name="lucide:arrow-up-right"
                class="size-5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
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
    defineProps<{
      title?: string;
      description?: string;
      members?: Member[];
      roles?: { title: string; team: string; location: string }[];
    }>(),
    {
      title: "Come build with us",
      description:
        "We are growing carefully and hiring people who care about craft and each other.",
      roles: () => [
        { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote, Europe" },
        { title: "Product Designer", team: "Design", location: "Remote, Americas" },
        { title: "Developer Advocate", team: "Growth", location: "Remote, Worldwide" },
        { title: "Customer Success Manager", team: "Growth", location: "Remote, Asia Pacific" },
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
