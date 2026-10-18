<template>
  <!--
    Welcome screen with quick start actions
    Features: Friendly greeting with the user name, three quick start cards with icons, a primary action, skip for now link and a checkmark badge on completed actions
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl text-center">
      <span class="bg-primary/10 text-primary mx-auto grid size-14 place-items-center rounded-2xl">
        <Icon name="lucide:party-popper" class="size-7" />
      </span>
      <h1 class="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Welcome to {{ product }}, {{ name }}
      </h1>
      <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg text-balance">
        Your workspace is ready. Pick a place to start and you will be up and running in minutes.
      </p>
    </div>

    <ul class="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
      <li v-for="action in actions" :key="action.title">
        <button
          type="button"
          class="hover:border-primary/50 hover:bg-muted/40 focus-visible:ring-ring/50 group relative flex h-full w-full flex-col items-start rounded-xl border p-5 text-left transition outline-none focus-visible:ring-[3px]"
          @click="done.includes(action.title) ? undefined : done.push(action.title)"
        >
          <span
            class="bg-muted group-hover:bg-primary/10 grid size-10 place-items-center rounded-lg"
          >
            <Icon :name="action.icon" class="size-5" />
          </span>
          <span class="mt-4 font-semibold">{{ action.title }}</span>
          <span class="text-muted-foreground mt-1 text-sm">{{ action.description }}</span>
          <span
            v-if="done.includes(action.title)"
            class="absolute top-4 right-4 grid size-6 place-items-center rounded-full bg-green-500 text-white"
          >
            <Icon name="lucide:check" class="size-3.5" />
            <span class="sr-only">Done</span>
          </span>
        </button>
      </li>
    </ul>

    <div class="mt-10 flex flex-col items-center gap-3">
      <UiButton size="lg" @click="useSonner.success('Taking you to your dashboard')">
        Go to dashboard
        <Icon name="lucide:arrow-right" class="size-4" />
      </UiButton>
      <UiButton
        variant="link"
        class="text-muted-foreground"
        @click="useSonner.info('Skipped for now')"
      >
        Skip for now
      </UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Action = { title: string; description: string; icon: string };

  withDefaults(
    defineProps<{
      name?: string;
      product?: string;
      actions?: Action[];
    }>(),
    {
      name: "Maya",
      product: "Acme",
      actions: () => [
        {
          title: "Create a project",
          description: "Start from a blank canvas or a template.",
          icon: "lucide:folder-plus",
        },
        {
          title: "Invite your team",
          description: "Collaborate in real time with teammates.",
          icon: "lucide:users",
        },
        {
          title: "Connect a tool",
          description: "Bring in data from the apps you already use.",
          icon: "lucide:plug",
        },
      ],
    }
  );

  const done = ref<string[]>([]);
</script>
