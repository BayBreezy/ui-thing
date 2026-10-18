<template>
  <!--
    Team directory list with contact buttons
    Features: Divided list rows with avatar, name, role, department badge and location, plus an email button that appears on hover, stacked on small screens
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {{ props.title }}
          </h2>
          <p class="text-muted-foreground mt-3 text-lg">{{ props.description }}</p>
        </div>
        <UiButton variant="outline">
          <Icon name="lucide:users" class="size-4" />
          Open positions
        </UiButton>
      </div>
      <ul class="mt-10 divide-y rounded-2xl border">
        <li
          v-for="m in props.members"
          :key="m.name"
          class="hover:bg-muted/40 group flex flex-col gap-3 p-4 transition-colors sm:flex-row sm:items-center sm:gap-4"
        >
          <div class="flex min-w-0 flex-1 items-center gap-4">
            <UiAvatar :src="m.avatar" :fallback="m.name[0]" class="size-11" />
            <div class="min-w-0">
              <p class="truncate font-semibold">{{ m.name }}</p>
              <p class="text-muted-foreground truncate text-sm">{{ m.role }}</p>
            </div>
          </div>
          <UiBadge variant="secondary" class="w-fit">{{ m.department }}</UiBadge>
          <p class="text-muted-foreground flex items-center gap-1 text-sm sm:w-40">
            <Icon name="lucide:map-pin" class="size-4 shrink-0" />
            {{ m.location }}
          </p>
          <UiButton
            variant="ghost"
            size="sm"
            class="sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          >
            <Icon name="lucide:mail" class="size-4" />
            Say hello
          </UiButton>
        </li>
      </ul>
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
    defineProps<{ title?: string; description?: string; members?: Member[] }>(),
    {
      title: "Our directory",
      description: "Everyone on the team, where they are and what they do.",
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
