<template>
  <!--
    Next steps grid after setup
    Features: Success heading, six next step cards with icons and arrows, each card is a real link target, a recommended badge on the best first move and a skip to dashboard link
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div class="text-center">
        <span
          class="mx-auto grid size-12 place-items-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:check" class="size-6" />
        </span>
        <h1 class="mt-4 text-3xl font-bold tracking-tight">
          You are in. What would you like to do first?
        </h1>
        <p class="text-muted-foreground mx-auto mt-2 max-w-xl">
          Pick a place to start. Everything is just a click away from your dashboard too.
        </p>
      </div>

      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="step in steps" :key="step.title">
          <a
            :href="step.href"
            class="hover:border-primary/50 hover:bg-muted/40 focus-visible:ring-ring/50 group relative flex h-full flex-col rounded-xl border p-5 transition outline-none focus-visible:ring-[3px]"
            @click.prevent="useSonner.info(`Opening: ${step.title}`)"
          >
            <UiBadge
              v-if="step.recommended"
              class="absolute top-4 right-4"
              variant="soft"
              color="primary"
              shape="pill"
            >
              Recommended
            </UiBadge>
            <span
              class="bg-muted group-hover:bg-primary/10 grid size-10 place-items-center rounded-lg"
            >
              <Icon :name="step.icon" class="size-5" />
            </span>
            <span class="mt-4 font-semibold">{{ step.title }}</span>
            <span class="text-muted-foreground mt-1 flex-1 text-sm">{{ step.description }}</span>
            <span class="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
              Get started
              <Icon
                name="lucide:arrow-right"
                class="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </li>
      </ul>

      <p class="mt-8 text-center">
        <UiButton
          variant="link"
          class="text-muted-foreground"
          @click="useSonner.info('Going to the dashboard')"
        >
          Skip and go to dashboard
        </UiButton>
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Step = {
    title: string;
    description: string;
    icon: string;
    href: string;
    recommended?: boolean;
  };

  withDefaults(
    defineProps<{
      steps?: Step[];
    }>(),
    {
      steps: () => [
        {
          title: "Create your first project",
          description: "Start from a template or a blank page.",
          icon: "lucide:folder-plus",
          href: "#project",
          recommended: true,
        },
        {
          title: "Invite teammates",
          description: "Bring in the people you work with.",
          icon: "lucide:user-plus",
          href: "#invite",
        },
        {
          title: "Explore templates",
          description: "Ready made setups for common workflows.",
          icon: "lucide:layout-template",
          href: "#templates",
        },
        {
          title: "Watch a 3 minute tour",
          description: "See the essentials in action.",
          icon: "lucide:circle-play",
          href: "#tour",
        },
        {
          title: "Customize your workspace",
          description: "Colors, logo and notifications.",
          icon: "lucide:palette",
          href: "#customize",
        },
        {
          title: "Join the community",
          description: "Ask questions and share ideas.",
          icon: "lucide:messages-square",
          href: "#community",
        },
      ],
    }
  );
</script>
