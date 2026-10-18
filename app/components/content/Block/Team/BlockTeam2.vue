<template>
  <!--
    Team grid with bios and social links
    Features: Four column grid of portraits with name, role, short bio and X, LinkedIn or GitHub links, cards stagger in on scroll
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      <Motion
        v-for="(m, i) in props.members"
        :key="m.name"
        as="li"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.4, delay: (i % 4) * 0.07 }"
      >
        <UiAvatar :src="m.avatar" :fallback="m.name[0]" class="size-20" />
        <p class="mt-4 text-lg font-semibold">{{ m.name }}</p>
        <p class="text-primary text-sm font-medium">{{ m.role }}</p>
        <p class="text-muted-foreground mt-2 text-sm">{{ m.bio }}</p>
        <div class="mt-4 flex items-center gap-3">
          <a
            v-if="m.x"
            :href="m.x"
            :aria-label="`${m.name} on X`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="simple-icons:x" class="size-4"
          /></a>
          <a
            v-if="m.linkedin"
            :href="m.linkedin"
            :aria-label="`${m.name} on LinkedIn`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="mdi:linkedin" class="size-5"
          /></a>
          <a
            v-if="m.github"
            :href="m.github"
            :aria-label="`${m.name} on GitHub`"
            class="text-muted-foreground hover:text-foreground transition-colors"
            ><Icon name="mdi:github" class="size-5"
          /></a>
        </div>
      </Motion>
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
      title: "The people you will be working with",
      description: "We are fully remote and love what we do. Come say hello.",
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
