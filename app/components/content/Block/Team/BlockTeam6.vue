<template>
  <Motion
    initial="initial"
    while-in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="parentVariant"
  >
    <UiContainer class="py-16 lg:py-24">
      <Motion as-child :variants="childVariant">
        <div class="mb-12">
          <p class="mb-3 text-center font-semibold text-primary">The Team</p>
          <h2 class="mb-4 text-center text-4xl font-bold lg:text-5xl">
            Meet the people making it happen
          </h2>
        </div>
      </Motion>

      <div class="space-y-16">
        <Motion
          v-for="department in departments"
          :key="department.name"
          as-child
          :variants="sectionVariant"
        >
          <div>
            <h3 class="mb-6 text-2xl font-bold">{{ department.name }}</h3>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="member in department.members"
                :key="member.name"
                class="group flex flex-col items-center text-center"
              >
                <div class="relative mb-4">
                  <UiAvatar
                    class="h-32 w-32 ring-2 ring-ring/20 transition-all group-hover:ring-4 group-hover:ring-primary/50"
                    :src="member.avatar"
                  />
                  <div
                    class="absolute -right-2 -bottom-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                  >
                    {{ member.badge }}
                  </div>
                </div>
                <p class="mb-1 font-semibold">{{ member.name }}</p>
                <p class="mb-2 text-sm text-primary">{{ member.role }}</p>
                <p class="text-xs text-muted-foreground">{{ member.location }}</p>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const departments = [
    {
      name: "Leadership",
      members: [
        {
          name: "Sarah Johnson",
          role: "CEO",
          location: "San Francisco, US",
          badge: "Founder",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
          name: "Michael Chen",
          role: "CTO",
          location: "Singapore, SG",
          badge: "Founder",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        {
          name: "Emily Davis",
          role: "COO",
          location: "London, UK",
          badge: "New",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        {
          name: "David Kim",
          role: "CFO",
          location: "Seoul, KR",
          badge: "New",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
      ],
    },
    {
      name: "Engineering",
      members: [
        {
          name: "Alex Martinez",
          role: "Lead Engineer",
          location: "Barcelona, ES",
          badge: "Team Lead",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        {
          name: "Lisa Wang",
          role: "Senior Developer",
          location: "Toronto, CA",
          badge: "Core",
          avatar: "https://i.pravatar.cc/150?img=6",
        },
        {
          name: "James Brown",
          role: "DevOps Engineer",
          location: "Berlin, DE",
          badge: "Core",
          avatar: "https://i.pravatar.cc/150?img=7",
        },
        {
          name: "Maria Garcia",
          role: "QA Engineer",
          location: "Mexico City, MX",
          badge: "New",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
      ],
    },
  ];

  const parentVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.15),
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

  const sectionVariant: MotionProps["variants"] = {
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
