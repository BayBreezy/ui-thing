<template>
  <!-- 
    Modern career page with team culture showcase
    Features: Gradient header, team stats, perks highlights, accordion job listings
  -->
  <Motion
    initial="initial"
    in-view="animate"
    :in-view-options="{ once: true }"
    as-child
    :variants="{
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          delayChildren: stagger(0.1),
        },
      },
    }"
  >
    <div class="py-16 lg:py-24">
      <!-- Gradient hero section -->
      <Motion
        :variants="childVariant"
        class="relative mb-16 overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:mb-24 lg:p-16"
      >
        <UiContainer class="relative z-10 text-center">
          <h1 class="mb-4 text-4xl font-bold lg:text-6xl">Join our mission</h1>
          <p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
            We're building the future of technology. Come help us make a difference.
          </p>

          <!-- Team stats -->
          <div class="mx-auto flex max-w-2xl flex-wrap justify-center gap-8 lg:gap-12">
            <div class="text-center">
              <p class="text-3xl font-bold lg:text-4xl">150+</p>
              <p class="text-sm text-muted-foreground">Team members</p>
            </div>
            <UiSeparator orientation="vertical" class="hidden h-auto md:block" />
            <div class="text-center">
              <p class="text-3xl font-bold lg:text-4xl">25+</p>
              <p class="text-sm text-muted-foreground">Countries</p>
            </div>
            <UiSeparator orientation="vertical" class="hidden h-auto md:block" />
            <div class="text-center">
              <p class="text-3xl font-bold lg:text-4xl">100%</p>
              <p class="text-sm text-muted-foreground">Remote</p>
            </div>
          </div>
        </UiContainer>
      </Motion>

      <UiContainer>
        <!-- Perks section -->
        <Motion :variants="childVariant" class="mb-16">
          <h2 class="mb-8 text-center text-2xl font-semibold lg:text-3xl">Why join us?</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Motion
              v-for="(perk, index) in perks"
              :key="perk.title"
              :variants="{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                  },
                },
              }"
            >
              <UiCard class="py-0 text-center">
                <UiCardContent class="p-6">
                  <div
                    class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                  >
                    <Icon :name="perk.icon" class="h-6 w-6 text-primary" />
                  </div>
                  <h3 class="mb-2 line-clamp-2 font-semibold">{{ perk.title }}</h3>
                  <p :title="perk.description" class="line-clamp-2 text-sm text-muted-foreground">
                    {{ perk.description }}
                  </p>
                </UiCardContent>
              </UiCard>
            </Motion>
          </div>
        </Motion>

        <!-- Job listings with accordion -->
        <Motion :variants="childVariant">
          <h2 class="mb-8 text-2xl font-semibold">Open positions</h2>

          <UiAccordion type="single" collapsible class="space-y-4">
            <Motion
              v-for="n in 6"
              :key="n"
              :variants="childVariant"
              :transition="{
                delay: n * 0.05,
              }"
            >
              <UiAccordionItem :value="`item-${n}`" class="rounded-lg border border-b! px-6">
                <UiAccordionTrigger class="py-6 hover:no-underline">
                  <div class="flex flex-1 items-start justify-between pr-4 text-left">
                    <div class="flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="text-lg font-semibold">Senior Full Stack Developer</h3>
                        <UiBadge variant="secondary" size="sm">Engineering</UiBadge>
                      </div>
                      <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span class="flex items-center gap-1">
                          <Icon name="lucide:map-pin" class="h-3.5 w-3.5" />
                          Remote
                        </span>
                        <span class="flex items-center gap-1">
                          <Icon name="lucide:briefcase" class="h-3.5 w-3.5" />
                          Full-time
                        </span>
                        <span class="flex items-center gap-1">
                          <Icon name="lucide:calendar" class="h-3.5 w-3.5" />
                          Posted 2 days ago
                        </span>
                      </div>
                    </div>
                  </div>
                </UiAccordionTrigger>
                <UiAccordionContent class="pt-2 pb-6">
                  <div class="space-y-4">
                    <div>
                      <h4 class="mb-2 font-semibold">About the role</h4>
                      <p class="text-sm text-muted-foreground">
                        We're looking for a talented full stack developer to join our growing
                        engineering team. You'll work on building and scaling our core platform.
                      </p>
                    </div>

                    <div>
                      <h4 class="mb-2 font-semibold">Requirements</h4>
                      <ul class="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>5+ years of professional development experience</li>
                        <li>Strong proficiency in React, Node.js, and TypeScript</li>
                        <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
                        <li>Excellent communication skills</li>
                      </ul>
                    </div>

                    <div class="flex flex-wrap gap-2 pt-2">
                      <UiBadge variant="outline">React</UiBadge>
                      <UiBadge variant="outline">Node.js</UiBadge>
                      <UiBadge variant="outline">TypeScript</UiBadge>
                      <UiBadge variant="outline">AWS</UiBadge>
                    </div>

                    <div class="flex gap-3 pt-4">
                      <UiButton>
                        Apply now
                        <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
                      </UiButton>
                      <UiButton variant="outline">Share job</UiButton>
                    </div>
                  </div>
                </UiAccordionContent>
              </UiAccordionItem>
            </Motion>
          </UiAccordion>
        </Motion>

        <!-- CTA -->
        <Motion :variants="childVariant" class="mt-16 text-center">
          <UiCard class="bg-muted/50">
            <UiCardContent class="p-8">
              <h3 class="mb-2 text-2xl font-semibold">Don't see a perfect fit?</h3>
              <p class="mb-6 text-muted-foreground">
                We're always looking for talented people. Send us your resume and we'll keep you in
                mind for future opportunities.
              </p>
              <UiButton size="lg">Send your resume</UiButton>
            </UiCardContent>
          </UiCard>
        </Motion>
      </UiContainer>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

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

  const perks = [
    {
      icon: "lucide:heart",
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs for you and your family",
    },
    {
      icon: "lucide:globe",
      title: "Work from Anywhere",
      description: "100% remote work with flexible hours to fit your lifestyle",
    },
    {
      icon: "lucide:trending-up",
      title: "Career Growth",
      description: "Continuous learning opportunities and clear career progression paths",
    },
  ];
</script>
