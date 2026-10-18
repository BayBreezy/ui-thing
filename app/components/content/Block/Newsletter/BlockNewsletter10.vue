<template>
  <!--
    Two step newsletter signup
    Features: Email first with validation, then a quick interests step with a progress dots indicator, back button, final thank you state with the choices summarized
  -->
  <UiContainer class="py-14 lg:py-20">
    <div class="bg-card mx-auto max-w-xl overflow-hidden rounded-3xl border shadow-sm">
      <div class="flex items-center justify-between border-b px-6 py-4">
        <p class="text-sm font-semibold">{{ step === 3 ? "All done" : "Join the newsletter" }}</p>
        <div
          class="flex gap-1.5"
          role="progressbar"
          aria-valuemin="1"
          aria-valuemax="2"
          :aria-valuenow="Math.min(step, 2)"
        >
          <span
            v-for="n in 2"
            :key="n"
            class="h-1.5 w-8 rounded-full transition-colors"
            :class="n <= Math.min(step, 2) || step === 3 ? 'bg-primary' : 'bg-muted'"
          />
        </div>
      </div>

      <div class="p-6 sm:p-8">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-200"
          enter-from-class="translate-x-3 opacity-0"
          leave-active-class="transition duration-150"
          leave-to-class="-translate-x-3 opacity-0"
        >
          <div v-if="step === 1" key="one">
            <h2 class="text-2xl font-bold tracking-tight">{{ props.title }}</h2>
            <p class="text-muted-foreground mt-2">{{ props.description }}</p>
            <form class="mt-6 space-y-3" novalidate @submit.prevent="next">
              <UiInput
                v-model="email"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                class="h-11"
                :aria-invalid="!!error"
              />
              <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
              <UiButton type="submit" size="lg" class="w-full">
                Continue
                <Icon name="lucide:arrow-right" class="size-4" />
              </UiButton>
            </form>
          </div>

          <div v-else-if="step === 2" key="two">
            <h2 class="text-2xl font-bold tracking-tight">What should we send you?</h2>
            <p class="text-muted-foreground mt-2">Pick at least one. You can change this later.</p>
            <ul class="mt-6 grid gap-3">
              <li v-for="topic in topics" :key="topic.value">
                <label
                  class="flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors"
                  :class="
                    chosen.includes(topic.value)
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  "
                >
                  <UiCheckbox
                    :model-value="chosen.includes(topic.value)"
                    :aria-label="topic.label"
                    @update:model-value="toggle(topic.value)"
                  />
                  <span class="flex-1">
                    <span class="block font-medium">{{ topic.label }}</span>
                    <span class="text-muted-foreground text-sm">{{ topic.text }}</span>
                  </span>
                </label>
              </li>
            </ul>
            <p v-if="error" class="text-destructive mt-3 text-sm">{{ error }}</p>
            <div class="mt-6 grid grid-cols-2 gap-3">
              <UiButton variant="outline" size="lg" @click="step = 1">
                <Icon name="lucide:arrow-left" class="size-4" />
                Back
              </UiButton>
              <UiButton size="lg" :disabled="loading" @click="finish">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Subscribe
              </UiButton>
            </div>
          </div>

          <div v-else key="three" class="py-4 text-center" role="status">
            <div
              class="mx-auto flex size-14 items-center justify-center rounded-full bg-green-500/10"
            >
              <Icon name="lucide:party-popper" class="size-7 text-green-600 dark:text-green-400" />
            </div>
            <h2 class="mt-4 text-2xl font-bold tracking-tight">You're subscribed</h2>
            <p class="text-muted-foreground mt-2">
              We'll send <span class="text-foreground font-medium">{{ summary }}</span> to
              <span class="text-foreground font-medium">{{ email }}</span
              >.
            </p>
            <UiButton variant="ghost" class="mt-5" @click="restart"
              >Subscribe another email</UiButton
            >
          </div>
        </Transition>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Get the best of the week",
    description: "Start with your email, then tell us what you like.",
  });

  const topics = [
    { value: "essays", label: "Essays", text: "One long read every Friday." },
    { value: "links", label: "Link roundup", text: "Five links worth your time." },
    { value: "product", label: "Product updates", text: "What shipped and what's next." },
  ];

  const step = ref(1);
  const email = ref("");
  const chosen = ref<string[]>(["essays"]);
  const error = ref("");
  const loading = ref(false);

  const summary = computed(() => {
    const names = topics
      .filter((t) => chosen.value.includes(t.value))
      .map((t) => t.label.toLowerCase());
    return names.length > 1
      ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
      : (names[0] ?? "updates");
  });

  function next() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    step.value = 2;
  }

  function toggle(value: string) {
    chosen.value = chosen.value.includes(value)
      ? chosen.value.filter((item) => item !== value)
      : [...chosen.value, value];
  }

  async function finish() {
    if (!chosen.value.length) {
      error.value = "Choose at least one topic.";
      return;
    }
    error.value = "";
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 700));
    loading.value = false;
    step.value = 3;
  }

  function restart() {
    email.value = "";
    chosen.value = ["essays"];
    step.value = 1;
  }
</script>
