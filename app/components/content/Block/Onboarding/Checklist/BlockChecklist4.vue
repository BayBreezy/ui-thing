<template>
  <!--
    Milestone trail with rewards
    Features: Horizontal trail of milestones with locked, current and done states, a badge reward per milestone, progress line that fills as you go and a button that completes the current milestone
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground mt-2">{{ description }}</p>

      <ol class="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-4">
        <div
          class="bg-border absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 md:block"
          aria-hidden="true"
        >
          <div
            class="bg-primary h-full transition-all duration-500"
            :style="{ width: `${(Math.max(reached - 1, 0) / (milestones.length - 1)) * 100}%` }"
          />
        </div>
        <li
          v-for="(milestone, index) in milestones"
          :key="milestone.title"
          class="relative flex items-center gap-4 md:flex-col md:text-center"
          :aria-current="index + 1 === reached + 1 ? 'step' : undefined"
        >
          <span
            class="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 transition"
            :class="
              index < reached
                ? 'bg-primary text-primary-foreground border-primary'
                : index === reached
                  ? 'bg-background border-primary text-primary'
                  : 'bg-background text-muted-foreground'
            "
          >
            <Icon
              :name="
                index < reached
                  ? 'lucide:check'
                  : index === reached
                    ? milestone.icon
                    : 'lucide:lock'
              "
              class="size-5"
            />
          </span>
          <div class="md:mt-3">
            <p class="font-semibold" :class="index > reached ? 'text-muted-foreground' : ''">
              {{ milestone.title }}
            </p>
            <p class="text-muted-foreground text-sm">{{ milestone.description }}</p>
            <UiBadge
              v-if="index < reached"
              class="mt-2"
              variant="soft"
              color="amber"
              shape="pill"
              icon="lucide:award"
            >
              {{ milestone.reward }}
            </UiBadge>
          </div>
        </li>
      </ol>

      <div class="mt-12 flex items-center justify-center gap-3">
        <UiButton :disabled="reached >= milestones.length" @click="reached++">
          {{
            reached >= milestones.length
              ? "All milestones reached"
              : `Complete “${milestones[reached]?.title}”`
          }}
        </UiButton>
        <UiButton variant="ghost" :disabled="!reached" @click="reached = 0">Reset</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Milestone = { title: string; description: string; icon: string; reward: string };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      milestones?: Milestone[];
    }>(),
    {
      title: "Your journey",
      description: "Hit each milestone to unlock a badge and new features.",
      milestones: () => [
        {
          title: "First project",
          description: "Create something.",
          icon: "lucide:folder-plus",
          reward: "Builder",
        },
        {
          title: "First teammate",
          description: "Invite a colleague.",
          icon: "lucide:user-plus",
          reward: "Collaborator",
        },
        {
          title: "First automation",
          description: "Save an hour a week.",
          icon: "lucide:workflow",
          reward: "Optimizer",
        },
        {
          title: "First launch",
          description: "Share it with the world.",
          icon: "lucide:rocket",
          reward: "Maker",
        },
      ],
    }
  );

  const reached = ref(1);
</script>
