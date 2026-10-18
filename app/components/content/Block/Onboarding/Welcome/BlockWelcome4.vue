<template>
  <!--
    Use case picker with multi select cards
    Features: Checkbox cards with icons, pick as many as you like, live selected count, continue button disabled until one is chosen and a select none shortcut
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <p class="text-muted-foreground text-sm font-medium">Step 2 of 3</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight">What do you want to get done?</h1>
      <p class="text-muted-foreground mt-2">
        Choose everything that applies. You can change this later.
      </p>

      <ul class="mt-8 grid gap-3 sm:grid-cols-2">
        <li v-for="option in options" :key="option.value">
          <label
            :for="`use-${option.value}`"
            class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex h-full cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
          >
            <UiCheckbox
              :id="`use-${option.value}`"
              class="mt-1"
              :model-value="selected.includes(option.value)"
              @update:model-value="toggle(option.value)"
            />
            <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg">
              <Icon :name="option.icon" class="size-5" />
            </span>
            <span>
              <span class="block font-medium">{{ option.label }}</span>
              <span class="text-muted-foreground block text-sm">{{ option.description }}</span>
            </span>
          </label>
        </li>
      </ul>

      <div class="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3 text-sm">
          <span class="text-muted-foreground" aria-live="polite"
            >{{ selected.length }} selected</span
          >
          <UiButton v-if="selected.length" variant="link" class="h-auto p-0" @click="selected = []">
            Clear
          </UiButton>
        </div>
        <UiButton :disabled="!selected.length" @click="useSonner.success('Preferences saved')">
          Continue
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Option = { value: string; label: string; description: string; icon: string };

  withDefaults(
    defineProps<{
      options?: Option[];
    }>(),
    {
      options: () => [
        {
          value: "projects",
          label: "Manage projects",
          description: "Plan work and hit deadlines.",
          icon: "lucide:kanban",
        },
        {
          value: "docs",
          label: "Write docs",
          description: "Capture knowledge in one place.",
          icon: "lucide:file-text",
        },
        {
          value: "crm",
          label: "Track customers",
          description: "Keep every conversation in view.",
          icon: "lucide:contact",
        },
        {
          value: "reports",
          label: "Build reports",
          description: "Share metrics with the team.",
          icon: "lucide:chart-column",
        },
        {
          value: "automation",
          label: "Automate workflows",
          description: "Remove repetitive steps.",
          icon: "lucide:workflow",
        },
        {
          value: "support",
          label: "Support users",
          description: "Answer questions faster.",
          icon: "lucide:life-buoy",
        },
      ],
    }
  );

  const selected = ref<string[]>([]);

  function toggle(value: string) {
    selected.value = selected.value.includes(value)
      ? selected.value.filter((item) => item !== value)
      : [...selected.value, value];
  }
</script>
