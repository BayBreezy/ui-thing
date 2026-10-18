<template>
  <!--
    Integration setup steps
    Features: A vertical list of steps for connecting a tool, each step opens when the one before is done, a connect account step, a channel select, a test message step with a result, an overall progress bar and a done state with an option to start again
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center gap-4">
        <span class="bg-card grid size-14 shrink-0 place-items-center rounded-xl border"
          ><Icon :name="icon" class="size-8"
        /></span>
        <div class="min-w-0 flex-1">
          <h1 class="text-2xl font-bold tracking-tight">Connect {{ name }}</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ done }} of {{ steps.length }} steps complete
          </p>
        </div>
      </div>
      <UiProgress
        :model-value="(done / steps.length) * 100"
        class="mt-4 h-1.5"
        aria-label="Setup progress"
      />

      <ol class="mt-8 space-y-4">
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="rounded-xl border p-5"
          :class="current === index ? 'border-primary/50 bg-primary/5' : ''"
          :aria-current="current === index ? 'step' : undefined"
        >
          <div class="flex items-start gap-4">
            <span
              class="grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold"
              :class="
                index < current
                  ? 'border-green-500 bg-green-500 text-white'
                  : current === index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
              "
            >
              <Icon v-if="index < current" name="lucide:check" class="size-4" /><template v-else>{{
                index + 1
              }}</template>
            </span>
            <div class="min-w-0 flex-1">
              <h2 class="font-medium" :class="index > current ? 'text-muted-foreground' : ''">
                {{ step.title }}
              </h2>
              <p class="text-muted-foreground mt-0.5 text-sm">
                {{ index < current ? step.done : step.body }}
              </p>

              <div v-if="current === index" class="mt-4">
                <template v-if="step.id === 'account'">
                  <UiButton :loading="busy" @click="connect">Connect {{ name }} account</UiButton>
                </template>
                <template v-else-if="step.id === 'channel'">
                  <div class="space-y-2">
                    <UiLabel for="setup-channel">Channel</UiLabel>
                    <UiSelect v-model="channel">
                      <UiSelectTrigger id="setup-channel" class="max-w-xs"
                        ><UiSelectValue placeholder="Choose a channel"
                      /></UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem v-for="item in channels" :key="item" :value="item">{{
                          item
                        }}</UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                    <div>
                      <UiButton :disabled="!channel" @click="current++">Save channel</UiButton>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <UiButton :loading="busy" @click="test">Send a test message</UiButton>
                  <p v-if="failed" class="text-destructive mt-2 text-sm" role="alert">
                    The test failed. Check that the bot is in {{ channel }} and try again.
                  </p>
                </template>
              </div>
            </div>
          </div>
        </li>
      </ol>

      <div
        v-if="current >= steps.length"
        class="mt-6 rounded-xl border border-green-500/40 bg-green-500/5 p-6 text-center"
        role="status"
      >
        <span class="mx-auto grid size-12 place-items-center rounded-full bg-green-500 text-white"
          ><Icon name="lucide:check" class="size-6"
        /></span>
        <p class="mt-3 font-semibold">{{ name }} is connected</p>
        <p class="text-muted-foreground mt-1 text-sm">Alerts will post to {{ channel }}.</p>
        <UiButton variant="outline" size="sm" class="mt-4" @click="restart">Set up again</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      name?: string;
      icon?: string;
      channels?: string[];
    }>(),
    {
      name: "Slack",
      icon: "logos:slack-icon",
      channels: () => ["#general", "#product", "#alerts", "#engineering"],
    }
  );

  const steps = [
    {
      id: "account",
      title: "Connect your account",
      body: "Sign in and allow Acme to post messages.",
      done: "Account connected.",
    },
    {
      id: "channel",
      title: "Choose a channel",
      body: "Pick where alerts should appear.",
      done: "Channel saved.",
    },
    {
      id: "test",
      title: "Send a test message",
      body: "Make sure everything works before you go live.",
      done: "Test message delivered.",
    },
  ];

  const current = ref(0);
  const channel = ref("");
  const busy = ref(false);
  const failed = ref(false);
  let attempts = 0;

  const done = computed(() => Math.min(current.value, steps.length));

  function connect() {
    busy.value = true;
    setTimeout(() => {
      busy.value = false;
      current.value = 1;
    }, 600);
  }

  function test() {
    busy.value = true;
    failed.value = false;
    attempts++;
    setTimeout(() => {
      busy.value = false;
      // The first attempt fails on purpose to show the error state.
      if (attempts === 1) failed.value = true;
      else current.value = 3;
    }, 600);
  }

  function restart() {
    current.value = 0;
    channel.value = "";
    failed.value = false;
    attempts = 0;
  }
</script>
