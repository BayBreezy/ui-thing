<template>
  <!-- 
    Meet the Founders About Section
    Features: Detailed founder stories
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Meet Our Founders</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        The visionaries behind our success story
      </p>
    </div>

    <div class="mt-12 space-y-16">
      <div
        v-for="(founder, index) in founders"
        :key="founder.name"
        class="grid gap-8 lg:grid-cols-2 lg:gap-12"
        :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
      >
        <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
          <div class="overflow-hidden rounded-2xl lg:aspect-square">
            <img
              :src="founder.image"
              :alt="founder.name"
              class="size-[300px] rounded-2xl object-cover lg:size-full"
            />
          </div>
        </div>

        <div class="flex flex-col justify-center" :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <UiBadge class="w-fit">{{ founder.role }}</UiBadge>
          <h3 class="mt-4 text-3xl font-bold">{{ founder.name }}</h3>
          <p class="text-primary mt-2">{{ founder.title }}</p>

          <div class="text-muted-foreground mt-6 space-y-4">
            <p v-for="paragraph in founder.bio" :key="paragraph">{{ paragraph }}</p>
          </div>

          <div class="mt-6 space-y-4">
            <div>
              <h4 class="text-sm font-semibold">Background</h4>
              <ul class="text-muted-foreground mt-2 space-y-1 text-sm">
                <li v-for="item in founder.background" :key="item" class="flex items-start gap-2">
                  <Icon name="lucide:check" class="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-sm font-semibold">Specialties</h4>
              <div class="mt-2 flex flex-wrap gap-2">
                <UiBadge
                  v-for="specialty in founder.specialties"
                  :key="specialty"
                  variant="secondary"
                >
                  {{ specialty }}
                </UiBadge>
              </div>
            </div>
          </div>

          <div class="mt-6 flex gap-1">
            <UiButton
              v-for="social in founder.socials"
              :key="social.platform"
              variant="ghost"
              size="icon-sm"
            >
              <Icon :name="social.icon" class="size-5" />
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const founders = [
    {
      name: "Emma Thompson",
      role: "Co-Founder",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
      bio: [
        "Emma's entrepreneurial journey began at MIT, where she developed a passion for building technology that solves real-world problems. After leading product teams at Fortune 500 companies, she decided to start her own venture.",
        "With over 15 years in the tech industry, Emma brings a unique blend of technical expertise and business acumen. Her vision has been instrumental in shaping our company's direction and culture.",
      ],
      background: [
        "BS in Computer Science, MIT",
        "Former VP of Product at TechGiant Inc.",
        "Forbes 30 Under 30 recipient",
        "Published author on product strategy",
      ],
      specialties: ["Product Strategy", "Leadership", "Innovation"],
      socials: [
        { platform: "twitter", icon: "logos:twitter" },
        { platform: "linkedin", icon: "logos:linkedin-icon" },
        { platform: "github", icon: "simple-icons:github" },
      ],
    },
    {
      name: "Marcus Chen",
      role: "Co-Founder",
      title: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      bio: [
        "Marcus is a technology visionary who has been coding since the age of 12. His expertise in distributed systems and AI has been crucial in building our robust and scalable platform.",
        "Before co-founding the company, Marcus was a principal engineer at a leading cloud infrastructure company. He holds multiple patents in distributed computing and has contributed to several open-source projects.",
      ],
      background: [
        "PhD in Computer Science, Stanford",
        "Former Principal Engineer at CloudScale",
        "10+ patents in distributed systems",
        "Open-source contributor with 50k+ GitHub stars",
      ],
      specialties: ["System Architecture", "AI/ML", "Cloud Infrastructure"],
      socials: [
        { platform: "github", icon: "simple-icons:github" },
        { platform: "linkedin", icon: "logos:linkedin-icon" },
        { platform: "twitter", icon: "logos:twitter" },
      ],
    },
  ];
</script>
