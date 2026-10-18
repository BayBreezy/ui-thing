<template>
  <!--
    Celebration screen with a summary of what was set up
    Features: Gradient hero with a trophy icon, recap list with check marks, time taken stat, share action and a continue button
  -->
  <UiContainer class="py-16 lg:py-24">
    <UiCard class="mx-auto max-w-2xl gap-0 overflow-hidden pt-0">
      <div
        class="from-primary/20 via-primary/10 to-background bg-linear-to-b px-6 py-12 text-center"
      >
        <span class="bg-background mx-auto grid size-16 place-items-center rounded-2xl shadow-sm">
          <Icon name="lucide:trophy" class="text-primary size-8" />
        </span>
        <h1 class="mt-5 text-3xl font-bold tracking-tight">Setup complete, {{ name }}!</h1>
        <p class="text-muted-foreground mt-2">
          You finished in {{ minutes }} minutes. That is faster than most teams.
        </p>
      </div>
      <UiCardContent class="py-6">
        <h2 class="text-sm font-semibold">What you set up</h2>
        <ul class="mt-3 grid gap-2 sm:grid-cols-2">
          <li v-for="item in recap" :key="item" class="flex items-center gap-2 text-sm">
            <span class="grid size-5 place-items-center rounded-full bg-green-500 text-white">
              <Icon name="lucide:check" class="size-3" />
            </span>
            {{ item }}
          </li>
        </ul>
      </UiCardContent>
      <UiCardFooter class="flex-col gap-3 sm:flex-row sm:justify-between">
        <UiButton variant="outline" class="w-full sm:w-auto" @click="share">
          <Icon name="lucide:share-2" class="size-4" />
          {{ copied ? "Link copied" : "Share with your team" }}
        </UiButton>
        <UiButton class="w-full sm:w-auto" @click="useSonner.success('Welcome aboard')">
          Continue to Acme
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      name?: string;
      minutes?: number;
      recap?: string[];
      link?: string;
    }>(),
    {
      name: "Maya",
      minutes: 4,
      recap: () => [
        "Created your workspace",
        "Uploaded a logo",
        "Invited 3 teammates",
        "Connected Slack",
        "Imported 120 contacts",
        "Chose notification settings",
      ],
      link: "https://acme.app/join/k3x9-p2mv",
    }
  );

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function share() {
    copy(props.link);
  }
</script>
