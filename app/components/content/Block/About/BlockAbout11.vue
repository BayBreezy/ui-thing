<template>
  <!-- 
    Testimonials About Section
    Features: Customer testimonials with avatars
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">What People Say About Us</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Trusted by companies worldwide
      </p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UiCard v-for="testimonial in testimonials" :key="testimonial.name">
        <UiCardContent>
          <div class="flex items-center gap-1 text-yellow-500">
            <Icon v-for="i in 5" :key="i" name="lucide:star" class="size-4 fill-current" />
          </div>
          <p class="mt-4 text-sm text-muted-foreground">"{{ testimonial.quote }}"</p>
          <div class="mt-6 flex items-center gap-3">
            <UiAvatar :src="testimonial.avatar" :alt="testimonial.name" class="size-10" />
            <div>
              <p class="text-sm font-semibold">{{ testimonial.name }}</p>
              <p class="text-xs text-muted-foreground">{{ testimonial.role }}</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="mx-auto mt-12 max-w-3xl text-center">
      <div class="inline-flex items-center gap-8 rounded-2xl border bg-card p-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-3xl font-bold text-primary">{{ stat.value }}</div>
          <div class="mt-1 text-sm text-muted-foreground">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/75.jpg",
      quote:
        "This company transformed how we operate. Their solutions are intuitive, powerful, and have saved us countless hours.",
    },
    {
      name: "Michael Brown",
      role: "CTO, InnovateLabs",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "Outstanding service and support. They truly understand our needs and deliver beyond expectations every time.",
    },
    {
      name: "Emily Davis",
      role: "Director, GlobalTech",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg",
      quote:
        "A game-changer for our business. The ROI has been incredible and their team is always there when we need them.",
    },
    {
      name: "David Wilson",
      role: "Founder, StartupXYZ",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
      quote:
        "From implementation to ongoing support, everything has been seamless. I recommend them to everyone I meet.",
    },
    {
      name: "Lisa Anderson",
      role: "VP Operations, MegaCorp",
      avatar: "https://randomuser.me/api/portraits/women/78.jpg",
      quote:
        "Their platform scales beautifully with our growth. The feature set is comprehensive and constantly improving.",
    },
    {
      name: "James Martinez",
      role: "Head of IT, Enterprise Co",
      avatar: "https://randomuser.me/api/portraits/men/79.jpg",
      quote:
        "Security, reliability, and performance - they excel in all areas. We couldn't be happier with our decision.",
    },
  ];

  const stats = [
    { value: "10k+", label: "Happy Customers" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "99%", label: "Satisfaction" },
  ];
</script>
