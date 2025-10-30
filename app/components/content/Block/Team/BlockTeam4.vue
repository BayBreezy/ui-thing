<template>
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <Motion as-child :variants="childVariant">
        <div class="mb-12 text-center">
          <p class="mb-3 font-semibold text-primary">Our Leadership</p>
          <h2 class="mb-4 text-4xl font-bold lg:text-5xl">Meet the team</h2>
          <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
            Passionate experts dedicated to building the future of technology
          </p>
        </div>
      </Motion>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="(member, index) in teamMembers"
          :key="index"
          as-child
          :variants="cardVariant"
        >
          <UiCard class="overflow-hidden py-0">
            <div class="aspect-square overflow-hidden">
              <img
                :src="`https://i.pravatar.cc/400?img=${index + 20}`"
                :alt="member.name"
                class="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div class="p-6 pt-0">
              <h3 class="mb-1 text-xl font-semibold">{{ member.name }}</h3>
              <p class="mb-3 text-sm text-primary">{{ member.role }}</p>
              <p class="mb-4 text-sm text-muted-foreground">{{ member.bio }}</p>
              <div class="flex items-center gap-3">
                <a href="#" class="text-muted-foreground transition-colors hover:text-primary">
                  <Icon name="logos:twitter" class="size-5" />
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-primary">
                  <Icon name="logos:linkedin-icon" class="size-5" />
                </a>
                <a href="#" class="text-muted-foreground transition-colors hover:text-primary">
                  <Icon name="logos:whatsapp-icon" class="size-5" />
                </a>
              </div>
            </div>
          </UiCard>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      bio: "Former VP at Google. Passionate about building products that scale.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Ex-lead engineer at Meta. Loves solving complex technical challenges.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Award-winning designer with 10+ years at leading tech companies.",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Previously built engineering teams at Stripe and Uber.",
    },
    {
      name: "Lisa Wang",
      role: "Head of Product",
      bio: "Product leader who launched multiple successful B2B SaaS products.",
    },
    {
      name: "James Taylor",
      role: "Head of Marketing",
      bio: "Growth expert who scaled startups to unicorn status.",
    },
  ];

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const cardVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
