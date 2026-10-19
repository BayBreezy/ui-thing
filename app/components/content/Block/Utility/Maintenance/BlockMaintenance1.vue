<template>
  <!--
    Maintenance mode page
    Features: Centered notice with progress steps, estimated return time, check again button with last checked time, email me when we are back form
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl text-center">
      <span class="bg-primary/10 text-primary mx-auto grid size-16 place-items-center rounded-2xl">
        <Icon name="lucide:wrench" class="size-8" />
      </span>
      <h1 class="mt-6 text-3xl font-bold tracking-tight lg:text-4xl">{{ title }}</h1>
      <p class="text-muted-foreground mt-3 text-lg">{{ description }}</p>

      <ol class="mx-auto mt-8 max-w-sm space-y-3 text-left" aria-label="Maintenance progress">
        <li v-for="step in steps" :key="step.label" class="flex items-center gap-3 text-sm">
          <Icon
            :name="
              step.status === 'done'
                ? 'lucide:circle-check'
                : step.status === 'active'
                  ? 'lucide:loader-circle'
                  : 'lucide:circle'
            "
            class="size-5 shrink-0"
            :class="[
              step.status === 'done' ? 'text-primary' : 'text-muted-foreground',
              step.status === 'active' ? 'text-primary motion-safe:animate-spin' : '',
            ]"
          />
          <span :class="step.status === 'pending' ? 'text-muted-foreground' : 'font-medium'">{{
            step.label
          }}</span>
          <span class="sr-only">{{ step.status }}</span>
        </li>
      </ol>

      <div class="bg-muted/50 mt-8 rounded-xl p-4 text-sm">
        <p>
          Estimated return: <span class="font-semibold">{{ eta }}</span>
        </p>
        <p class="text-muted-foreground mt-1" role="status">{{ lastChecked }}</p>
        <UiButton variant="outline" size="sm" class="mt-3" :disabled="checking" @click="check">
          <Icon
            name="lucide:refresh-cw"
            class="size-4"
            :class="checking ? 'motion-safe:animate-spin' : ''"
          />{{ checking ? "Checking" : "Check again" }}
        </UiButton>
      </div>

      <form
        v-if="!done"
        class="mx-auto mt-8 max-w-md text-left"
        novalidate
        @submit.prevent="submit"
      >
        <UiLabel for="maint-email">Email me when we are back</UiLabel>
        <div class="mt-2 flex flex-col gap-2 sm:flex-row">
          <UiInput
            id="maint-email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            class="flex-1"
            :aria-invalid="!!error"
          />
          <UiButton type="submit">Notify me</UiButton>
        </div>
        <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
      </form>
      <p
        v-else
        class="mt-8 flex items-center justify-center gap-2 text-sm font-medium"
        role="status"
      >
        <Icon name="lucide:bell-ring" class="text-primary size-4" />
        We will email {{ email.trim() }} as soon as we are back.
      </p>

      <p class="text-muted-foreground mt-8 text-sm">
        Questions? Read the
        <a href="#status" class="text-primary underline underline-offset-4">status page</a> or email
        <a href="mailto:support@example.com" class="text-primary underline underline-offset-4"
          >support@example.com</a
        >.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Step = { label: string; status: "done" | "active" | "pending" };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      eta?: string;
      steps?: Step[];
    }>(),
    {
      title: "We are making things better",
      description:
        "The app is down for planned maintenance. Your data is safe and nothing is lost.",
      eta: "Today at 14:00 UTC",
      steps: () => [
        { label: "Back up your data", status: "done" },
        { label: "Upgrade the database", status: "active" },
        { label: "Run final checks", status: "pending" },
      ],
    }
  );

  const email = ref("");
  const error = ref("");
  const done = ref(false);
  const checking = ref(false);
  const checks = ref(0);

  const lastChecked = computed(() =>
    checks.value
      ? `Checked just now. Still working on it (${checks.value} ${checks.value === 1 ? "check" : "checks"}).`
      : "We check automatically every minute."
  );

  function check() {
    checking.value = true;
    setTimeout(() => {
      checks.value += 1;
      checking.value = false;
    }, 700);
  }

  function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }
</script>
