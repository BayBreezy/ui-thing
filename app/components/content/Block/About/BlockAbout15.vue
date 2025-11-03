<template>
  <!-- 
    Awards & Recognition About Section
    Features: Showcase achievements and awards
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Awards & Recognition</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Honored by industry leaders and innovation champions
      </p>
    </div>

    <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <UiCard v-for="award in awards" :key="award.title" class="group">
        <UiCardContent>
          <div class="flex items-start justify-between">
            <div
              class="flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110"
            >
              <Icon :name="award.icon" class="size-7 text-primary" />
            </div>
            <UiBadge variant="outline">{{ award.year }}</UiBadge>
          </div>
          <h3 class="mt-4 font-bold">{{ award.title }}</h3>
          <p class="mt-1 text-sm text-primary">{{ award.organization }}</p>
          <p class="mt-3 text-sm text-muted-foreground">{{ award.description }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="mt-16">
      <h3 class="text-center text-2xl font-bold">Certifications & Partnerships</h3>
      <div class="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="cert in certifications"
          :key="cert.name"
          class="flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-colors hover:border-primary/50"
        >
          <div class="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Icon :name="cert.icon" class="size-8 text-primary" />
          </div>
          <h4 class="mt-4 text-sm font-semibold">{{ cert.name }}</h4>
          <p class="mt-1 text-xs text-muted-foreground">{{ cert.type }}</p>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-16 max-w-3xl text-center">
      <UiCard class="bg-primary/5">
        <UiCardContent>
          <Icon name="lucide:award" class="mx-auto size-12 text-primary" />
          <h3 class="mt-4 text-xl font-bold">Industry Recognition</h3>
          <p class="mt-2 text-muted-foreground">
            Featured in Forbes, TechCrunch, and The Wall Street Journal as one of the most
            innovative companies reshaping the industry.
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div
              v-for="mention in mediaMentions"
              :key="mention"
              class="text-sm font-semibold text-muted-foreground"
            >
              {{ mention }}
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const awards = [
    {
      icon: "lucide:trophy",
      title: "Best SaaS Product of the Year",
      organization: "Tech Innovation Awards",
      year: "2024",
      description:
        "Recognized for outstanding innovation and user experience in the SaaS category.",
    },
    {
      icon: "lucide:star",
      title: "Top 100 Companies to Watch",
      organization: "Business Weekly",
      year: "2024",
      description: "Named among the most promising companies driving industry transformation.",
    },
    {
      icon: "lucide:zap",
      title: "Innovation Excellence Award",
      organization: "Global Tech Summit",
      year: "2023",
      description: "Honored for breakthrough AI-powered features and technical excellence.",
    },
    {
      icon: "lucide:award",
      title: "Customer Choice Award",
      organization: "G2 Software Reviews",
      year: "2023",
      description: "Voted #1 by customers for satisfaction, ease of use, and value for money.",
    },
    {
      icon: "lucide:users",
      title: "Best Place to Work",
      organization: "Tech Employers Association",
      year: "2023",
      description: "Recognized for exceptional workplace culture and employee satisfaction.",
    },
    {
      icon: "lucide:shield-check",
      title: "Security Excellence Award",
      organization: "Cybersecurity Alliance",
      year: "2022",
      description: "Awarded for maintaining the highest standards in data security and privacy.",
    },
  ];

  const certifications = [
    {
      name: "ISO 27001",
      type: "Security",
      icon: "lucide:shield-check",
    },
    {
      name: "SOC 2 Type II",
      type: "Compliance",
      icon: "lucide:file-check",
    },
    {
      name: "GDPR Compliant",
      type: "Privacy",
      icon: "lucide:lock",
    },
    {
      name: "AWS Partner",
      type: "Technology",
      icon: "lucide:cloud",
    },
  ];

  const mediaMentions = ["Forbes", "TechCrunch", "WSJ", "Bloomberg", "CNBC"];
</script>
