<template>
  <section class="border-y bg-muted/50 py-20 md:py-32">
    <div class="container">
      <div class="mx-auto max-w-4xl text-center">
        <UiBadge variant="outline" size="lg" class="mb-4">
          <span>Testimonials</span>
        </UiBadge>
        <h2 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Loved by developers
        </h2>
        <p class="mb-12 text-lg text-muted-foreground">
          See what developers are saying about UI Thing
        </p>
      </div>

      <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UiCard v-for="testimonial in testimonials" :key="testimonial.author" class="flex flex-col">
          <UiCardHeader>
            <div class="flex items-center gap-4">
              <UiAvatar>
                <UiAvatarImage :src="testimonial.avatar" :alt="testimonial.author" />
                <UiAvatarFallback>{{ testimonial.initials }}</UiAvatarFallback>
              </UiAvatar>
              <div>
                <UiCardTitle class="text-base">{{ testimonial.author }}</UiCardTitle>
                <UiCardDescription class="text-sm">{{ testimonial.role }}</UiCardDescription>
              </div>
            </div>
          </UiCardHeader>
          <UiCardContent class="flex-1">
            <p class="text-sm text-muted-foreground">{{ testimonial.content }}</p>
          </UiCardContent>
          <UiCardFooter>
            <UiRating :model-value="5" icon="material-symbols:star-rate" />
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const testimonials = [
    {
      author: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "SC",
      content:
        "UI Thing has dramatically reduced our development time. The components are well-documented and easy to customize. A must-have for any Nuxt project!",
    },
    {
      author: "Michael Torres",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/150?img=2",
      initials: "MT",
      content:
        "Finally, a component library that doesn't fight against you. The design system is consistent and the dark mode implementation is flawless.",
    },
    {
      author: "Emma Wilson",
      role: "Frontend Lead",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "EW",
      content:
        "We switched to UI Thing for our dashboard rebuild and haven't looked back. The accessibility features are excellent and the components are production-ready.",
    },
    {
      author: "David Park",
      role: "Indie Developer",
      avatar: "https://i.pravatar.cc/150?img=4",
      initials: "DP",
      content:
        "As a solo developer, UI Thing saves me countless hours. I can focus on building features instead of styling components from scratch.",
    },
    {
      author: "Lisa Anderson",
      role: "Tech Lead",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "LA",
      content:
        "The TypeScript support is fantastic. Our team loves the autocomplete and type safety. The documentation is also top-notch.",
    },
    {
      author: "James Rodriguez",
      role: "Senior Engineer",
      avatar: "https://i.pravatar.cc/150?img=6",
      initials: "JR",
      content:
        "Best component library for Nuxt, hands down. The copy-paste approach means no bloat in our bundle. Highly recommended!",
    },
  ];
</script>
