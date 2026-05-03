<template>
  <!-- 
    Split Content About Section
    Features: Alternating content sections
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Why Choose Us</h2>
      <p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
        What sets us apart from the competition
      </p>
    </div>

    <div class="mt-12 space-y-24">
      <div
        v-for="(section, index) in sections"
        :key="section.title"
        class="grid gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
          <div class="overflow-hidden rounded-2xl">
            <img :src="section.image" :alt="section.title" class="aspect-4/3 w-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col justify-center" :class="index % 2 === 1 ? 'lg:order-1' : ''">
          <UiBadge class="w-fit">{{ section.category }}</UiBadge>
          <h3 class="mt-4 text-3xl font-bold">{{ section.title }}</h3>
          <p class="text-muted-foreground mt-4 text-lg">{{ section.description }}</p>

          <ul class="mt-6 space-y-4">
            <li v-for="feature in section.features" :key="feature.title" class="flex gap-3">
              <div
                class="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg"
              >
                <Icon :name="feature.icon" class="text-primary size-5" />
              </div>
              <div>
                <h4 class="font-semibold">{{ feature.title }}</h4>
                <p class="text-muted-foreground text-sm">{{ feature.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sections = [
    {
      category: "Innovation",
      title: "Cutting-Edge Technology",
      description:
        "We leverage the latest technologies and methodologies to deliver solutions that are not just current, but future-ready.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      features: [
        {
          icon: "lucide:cpu",
          title: "AI-Powered Solutions",
          description: "Intelligent automation that learns and adapts to your needs",
        },
        {
          icon: "lucide:rocket",
          title: "Continuous Innovation",
          description: "Regular updates and new features based on user feedback",
        },
        {
          icon: "lucide:zap",
          title: "Lightning Fast",
          description: "Optimized performance delivering results in milliseconds",
        },
      ],
    },
    {
      category: "Support",
      title: "World-Class Customer Service",
      description:
        "Our dedicated support team is available 24/7 to ensure you get the help you need, when you need it.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
      features: [
        {
          icon: "lucide:headphones",
          title: "24/7 Support",
          description: "Round-the-clock assistance across all time zones",
        },
        {
          icon: "lucide:graduation-cap",
          title: "Comprehensive Training",
          description: "Onboarding and ongoing education for your team",
        },
        {
          icon: "lucide:users",
          title: "Dedicated Success Manager",
          description: "Personal advisor to help you achieve your goals",
        },
      ],
    },
    {
      category: "Security",
      title: "Enterprise-Grade Security",
      description:
        "Your data security is our top priority. We employ industry-leading security measures to protect your information.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      features: [
        {
          icon: "lucide:shield",
          title: "SOC 2 Certified",
          description: "Independently verified security controls and compliance",
        },
        {
          icon: "lucide:lock",
          title: "End-to-End Encryption",
          description: "Military-grade encryption for all data in transit and at rest",
        },
        {
          icon: "lucide:eye",
          title: "Privacy First",
          description: "GDPR compliant with transparent data practices",
        },
      ],
    },
  ];
</script>
