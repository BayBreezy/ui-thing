<template>
  <!--
    Notification preferences for new users
    Features: Email and in app switches grouped by topic, a digest frequency radio group, quiet hours with time inputs that only show when enabled, a save button and a recommended defaults shortcut
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Stay in the loop</h1>
          <p class="text-muted-foreground mt-2">Choose how and when we should reach you.</p>
        </div>
        <UiButton variant="outline" size="sm" @click="useRecommended">Use recommended</UiButton>
      </div>

      <UiCard class="mt-8">
        <UiCardHeader>
          <UiCardTitle>Topics</UiCardTitle>
          <UiCardDescription>Pick the channels for each kind of update.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div
            class="text-muted-foreground mb-2 grid grid-cols-[1fr_4rem_4rem] text-xs font-medium"
          >
            <span />
            <span class="text-center">Email</span>
            <span class="text-center">In app</span>
          </div>
          <div class="divide-y">
            <div
              v-for="topic in topics"
              :key="topic.key"
              class="grid grid-cols-[1fr_4rem_4rem] items-center py-3"
            >
              <div>
                <p class="text-sm font-medium">{{ topic.label }}</p>
                <p class="text-muted-foreground text-xs">{{ topic.description }}</p>
              </div>
              <div class="flex justify-center">
                <UiSwitch
                  v-model="prefs[topic.key]!.email"
                  :aria-label="`${topic.label} by email`"
                />
              </div>
              <div class="flex justify-center">
                <UiSwitch
                  v-model="prefs[topic.key]!.app"
                  :aria-label="`${topic.label} in the app`"
                />
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="mt-6">
        <UiCardHeader>
          <UiCardTitle>Email digest</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="grid gap-6">
          <UiRadioGroup
            v-model="digest"
            class="grid gap-2 sm:grid-cols-3"
            aria-label="Digest frequency"
          >
            <label
              v-for="option in digests"
              :key="option"
              :for="`digest-${option}`"
              class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm"
            >
              <UiRadioGroupItem :id="`digest-${option}`" :value="option" />
              {{ option }}
            </label>
          </UiRadioGroup>

          <div class="flex items-center justify-between gap-4">
            <div>
              <UiLabel for="quiet" class="font-medium">Quiet hours</UiLabel>
              <p class="text-muted-foreground text-sm">Pause notifications while you rest.</p>
            </div>
            <UiSwitch id="quiet" v-model="quiet" />
          </div>
          <div v-if="quiet" class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <UiLabel for="quiet-from">From</UiLabel>
              <UiInput id="quiet-from" v-model="from" type="time" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="quiet-to">Until</UiLabel>
              <UiInput id="quiet-to" v-model="to" type="time" />
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter class="justify-end">
          <UiButton @click="useSonner.success('Preferences saved')">Save preferences</UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const topics = [
    { key: "mentions", label: "Mentions", description: "When someone tags you." },
    { key: "assigned", label: "Assignments", description: "When work is assigned to you." },
    { key: "comments", label: "Comments", description: "Replies on things you follow." },
    { key: "product", label: "Product news", description: "New features and tips." },
  ];

  const digests = ["Daily", "Weekly", "Never"];

  const prefs = reactive<Record<string, { email: boolean; app: boolean }>>({
    mentions: { email: true, app: true },
    assigned: { email: true, app: true },
    comments: { email: false, app: true },
    product: { email: false, app: false },
  });

  const digest = ref("Weekly");
  const quiet = ref(false);
  const from = ref("22:00");
  const to = ref("07:00");

  function useRecommended() {
    prefs.mentions = { email: true, app: true };
    prefs.assigned = { email: true, app: true };
    prefs.comments = { email: false, app: true };
    prefs.product = { email: false, app: false };
    digest.value = "Weekly";
    quiet.value = false;
    useSonner.info("Recommended settings applied");
  }
</script>
