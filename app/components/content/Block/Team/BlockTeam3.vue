<template>
  <!--
    Photo cards that reveal a bio on hover
    Features: Square portraits with a gradient overlay, name and role always visible and a bio with social links sliding up on hover or focus, plus two heading buttons
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
      <div class="mt-6 flex justify-center gap-3">
        <UiButton variant="outline">About us</UiButton>
        <UiButton>Open positions</UiButton>
      </div>
    </div>
    <ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="m in props.members"
        :key="m.name"
        class="group focus-within:ring-ring relative aspect-square overflow-hidden rounded-2xl focus-within:ring-2"
      >
        <img
          :src="m.avatar"
          :alt="m.name"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 p-4 text-white">
          <p class="font-semibold">{{ m.name }}</p>
          <p class="text-sm text-white/75">{{ m.role }}</p>
          <div
            class="grid grid-rows-[0fr] transition-all duration-300 group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]"
          >
            <div class="overflow-hidden">
              <p class="mt-3 text-sm text-white/85">{{ m.bio }}</p>
              <div class="mt-3 flex items-center gap-3">
                <a
                  v-if="m.x"
                  :href="m.x"
                  :aria-label="`${m.name} on X`"
                  class="text-white/80 hover:text-white"
                  ><Icon name="simple-icons:x" class="size-4"
                /></a>
                <a
                  v-if="m.linkedin"
                  :href="m.linkedin"
                  :aria-label="`${m.name} on LinkedIn`"
                  class="text-white/80 hover:text-white"
                  ><Icon name="mdi:linkedin" class="size-5"
                /></a>
                <a
                  v-if="m.github"
                  :href="m.github"
                  :aria-label="`${m.name} on GitHub`"
                  class="text-white/80 hover:text-white"
                  ><Icon name="mdi:github" class="size-5"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </li>
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
      title: "Meet our team",
      description:
        "Our philosophy is simple: hire diverse, passionate people and build a culture that helps them do their best work.",
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
