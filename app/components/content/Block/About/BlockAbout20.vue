<template>
  <!-- 
    Full Page About Section
    Features: Comprehensive about page layout
  -->
  <div>
    <!-- Hero Section -->
    <div class="bg-muted/30 border-b">
      <div class="container py-16 md:py-24">
        <div class="mx-auto max-w-3xl text-center">
          <UiBadge class="mb-4">About Us</UiBadge>
          <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Building the Future, Together
          </h1>
          <p class="text-muted-foreground mt-6 text-xl">
            We're on a mission to empower businesses with technology that transforms how they work,
            grow, and succeed.
          </p>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="border-b">
      <div class="container py-12">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-primary text-4xl font-bold">{{ stat.value }}</div>
            <div class="text-muted-foreground mt-2 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Story Section -->
    <div class="container py-16 md:py-24">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-3xl font-bold">Our Story</h2>
          <div class="text-muted-foreground mt-6 space-y-4">
            <p>
              Founded in 2015, we started with a simple idea: technology should empower people, not
              complicate their lives. What began as a small team working from a garage has grown
              into a global company serving thousands of customers.
            </p>
            <p>
              Our journey hasn't always been easy, but it's been driven by an unwavering commitment
              to innovation, customer success, and building a workplace where talented people can do
              their best work.
            </p>
            <p>
              Today, we're proud to be recognized as industry leaders, but we're even prouder of the
              relationships we've built and the impact we've made on businesses around the world.
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
            alt="Team collaboration"
            class="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-muted/30 border-y">
      <div class="container py-16 md:py-24">
        <div class="text-center">
          <h2 class="text-3xl font-bold">Our Values</h2>
          <p class="text-muted-foreground mt-4">The principles that guide everything we do</p>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UiCard v-for="value in values" :key="value.title">
            <UiCardContent>
              <div class="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
                <Icon :name="value.icon" class="text-primary size-6" />
              </div>
              <h3 class="mt-4 font-bold">{{ value.title }}</h3>
              <p class="text-muted-foreground mt-2 text-sm">{{ value.description }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="container py-16 md:py-24">
      <div class="text-center">
        <h2 class="text-3xl font-bold">Leadership Team</h2>
        <p class="text-muted-foreground mt-4">Meet the people driving our vision</p>
      </div>
      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="leader in leaders" :key="leader.name" class="text-center">
          <UiAvatar :src="leader.image" :alt="leader.name" class="mx-auto size-24" />
          <h3 class="mt-4 font-semibold">{{ leader.name }}</h3>
          <p class="text-primary text-sm">{{ leader.role }}</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-muted/30 border-t">
      <div class="container py-16 md:py-24">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold">Ready to Get Started?</h2>
          <p class="text-muted-foreground mt-4 text-lg">
            Join thousands of companies already using our platform to transform their business.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <UiButton size="lg">Start Free Trial</UiButton>
            <UiButton variant="outline" size="lg">Contact Sales</UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const stats = [
    { value: "10+", label: "Years in Business" },
    { value: "500+", label: "Team Members" },
    { value: "10k+", label: "Customers Worldwide" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  const values = [
    {
      icon: "lucide:heart",
      title: "Customer First",
      description: "Every decision we make starts with our customers' needs and success in mind.",
    },
    {
      icon: "lucide:zap",
      title: "Innovation",
      description:
        "We constantly push boundaries and challenge the status quo to deliver better solutions.",
    },
    {
      icon: "lucide:shield-check",
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and ethical practices in everything we do.",
    },
    {
      icon: "lucide:users",
      title: "Collaboration",
      description:
        "We believe in the power of diverse perspectives working together toward common goals.",
    },
    {
      icon: "lucide:trophy",
      title: "Excellence",
      description:
        "We set high standards and are committed to delivering quality in every interaction.",
    },
    {
      icon: "lucide:leaf",
      title: "Sustainability",
      description:
        "We're building a business that's good for people, planet, and long-term success.",
    },
  ];

  const leaders = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Emma Williams",
      role: "Chief Product Officer",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      name: "David Martinez",
      role: "Chief Revenue Officer",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
  ];
</script>
