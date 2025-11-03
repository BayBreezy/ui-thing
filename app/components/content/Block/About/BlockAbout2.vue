<template>
  <!-- 
    Team Grid About Section
    Features: Grid layout with team member cards
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Meet Our Team</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        The talented individuals who make everything possible
      </p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="member in teamMembers" :key="member.name" class="text-center">
        <UiAvatar :src="member.image" :alt="member.name" class="mx-auto size-24 md:size-32" />
        <h3 class="mt-4 text-lg font-semibold">{{ member.name }}</h3>
        <p class="text-sm text-primary">{{ member.role }}</p>
        <p class="mt-2 text-sm text-balance text-muted-foreground">{{ member.bio }}</p>
        <div class="mt-4 flex justify-center gap-3">
          <a
            v-for="social in member.socials"
            :key="social.platform"
            :href="social.url"
            class="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon :name="social.icon" class="size-4" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      bio: "Visionary leader with 15+ years in tech",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Tech innovator passionate about AI",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "github", icon: "simple-icons:github", url: "#" },
      ],
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://randomuser.me/api/portraits/women/76.jpg",
      bio: "Award-winning designer focused on UX",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "dribbble", icon: "logos:dribbble-icon", url: "#" },
      ],
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      bio: "Building scalable systems at scale",
      socials: [
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
        { platform: "github", icon: "simple-icons:github", url: "#" },
      ],
    },
  ];
</script>
