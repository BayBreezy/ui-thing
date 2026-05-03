<template>
  <!-- 
    Leadership Team About Section
    Features: Detailed leadership profiles
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Leadership Team</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        Meet the visionaries driving our company forward
      </p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-2">
      <UiCard v-for="leader in leaders" :key="leader.name">
        <UiCardContent class="flex flex-col gap-6 sm:flex-row">
          <UiAvatar :src="leader.image" :alt="leader.name" class="size-24 shrink-0 sm:size-32" />
          <div class="flex-1">
            <h3 class="text-xl font-semibold">{{ leader.name }}</h3>
            <p class="text-primary text-sm">{{ leader.role }}</p>
            <p class="text-muted-foreground mt-3 text-sm">{{ leader.bio }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <UiBadge v-for="skill in leader.expertise" :key="skill" variant="secondary">
                {{ skill }}
              </UiBadge>
            </div>
            <div class="mt-4 flex gap-3">
              <a
                v-for="social in leader.socials"
                :key="social.platform"
                :href="social.url"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon :name="social.icon" class="size-5" />
              </a>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const leaders = [
    {
      name: "Alexandra Martinez",
      role: "Chief Executive Officer",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      bio: "Alexandra brings over 20 years of experience in tech leadership. She's passionate about building inclusive teams and creating products that make a real difference. Under her leadership, the company has grown 300%.",
      expertise: ["Strategy", "Leadership", "Product Vision"],
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "James Wilson",
      role: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      bio: "James is a technology visionary with a track record of building scalable systems. He's led engineering teams at Fortune 500 companies and holds multiple patents in distributed computing.",
      expertise: ["Architecture", "Cloud", "AI/ML"],
      socials: [
        { platform: "github", icon: "simple-icons:github", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Sophia Chen",
      role: "Chief Marketing Officer",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      bio: "Sophia has revolutionized how we connect with customers. Her data-driven approach to marketing has helped us reach new markets and build a brand that resonates globally.",
      expertise: ["Brand Strategy", "Growth", "Analytics"],
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Robert Taylor",
      role: "Chief Financial Officer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Robert ensures our financial health while driving strategic growth. With experience in both startups and public companies, he brings a balanced perspective to our financial strategy.",
      expertise: ["Finance", "Strategy", "M&A"],
      socials: [{ platform: "linkedin", icon: "logos:linkedin-icon", url: "#" }],
    },
  ];
</script>
