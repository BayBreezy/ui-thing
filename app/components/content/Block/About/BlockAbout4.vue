<template>
  <!-- 
    Two Column About Section
    Features: Split layout with image and content
  -->
  <div class="container py-16 md:py-24">
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted lg:aspect-auto">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
          alt="Team collaboration"
          class="size-full object-cover"
        />
      </div>

      <div class="flex flex-col justify-center">
        <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Building the Future Together</h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Since 2015, we've been on a mission to transform how businesses operate in the digital
          age. Our team of experts combines creativity with technical excellence to deliver
          solutions that drive real results.
        </p>

        <div class="mt-8 space-y-6">
          <div v-for="(item, i) in items" :key="i" class="flex gap-4">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-primary/50 via-transparent"
            >
              <Icon :name="item.icon" class="size-5 text-primary" />
            </div>
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      icon: "lucide:users",
      title: "People-First Approach",
      description:
        "We believe in putting people at the center of everything we do, from our team to our customers.",
    },
    {
      icon: "lucide:lightbulb",
      title: "Innovation Driven",
      description:
        "Constantly pushing boundaries and exploring new technologies to stay ahead of the curve.",
    },
    {
      icon: "lucide:target",
      title: "Results Focused",
      description:
        "Delivering measurable outcomes that make a real difference to our clients' success.",
    },
  ];
</script>
