<template>
  <!--
    Role picker with selectable cards
    Features: Radio group styled as large cards, icon and description for each role, highlighted selected card, continue button that stays disabled until a role is chosen
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl">
      <p class="text-muted-foreground text-sm font-medium">Step 1 of 3</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight">What best describes your role?</h1>
      <p class="text-muted-foreground mt-2">
        We will tailor your workspace and suggestions to match.
      </p>

      <UiRadioGroup v-model="role" class="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Your role">
        <label
          v-for="option in roles"
          :key="option.value"
          :for="`role-${option.value}`"
          class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
        >
          <UiRadioGroupItem :id="`role-${option.value}`" :value="option.value" class="mt-1" />
          <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg">
            <Icon :name="option.icon" class="size-5" />
          </span>
          <span>
            <span class="block font-medium">{{ option.label }}</span>
            <span class="text-muted-foreground block text-sm">{{ option.description }}</span>
          </span>
        </label>
      </UiRadioGroup>

      <div class="mt-8 flex items-center justify-between">
        <UiButton variant="ghost" @click="useSonner.info('Skipped')">Skip</UiButton>
        <UiButton :disabled="!role" @click="useSonner.success(`Saved role: ${role}`)">
          Continue
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Role = { value: string; label: string; description: string; icon: string };

  withDefaults(
    defineProps<{
      roles?: Role[];
    }>(),
    {
      roles: () => [
        {
          value: "founder",
          label: "Founder",
          description: "Running the whole show.",
          icon: "lucide:rocket",
        },
        {
          value: "engineer",
          label: "Engineer",
          description: "Building and shipping product.",
          icon: "lucide:code-xml",
        },
        {
          value: "designer",
          label: "Designer",
          description: "Crafting how it looks and feels.",
          icon: "lucide:pen-tool",
        },
        {
          value: "product",
          label: "Product manager",
          description: "Deciding what to build next.",
          icon: "lucide:compass",
        },
        {
          value: "marketing",
          label: "Marketing",
          description: "Telling the story and growing.",
          icon: "lucide:megaphone",
        },
        {
          value: "other",
          label: "Something else",
          description: "None of the above fits.",
          icon: "lucide:sparkles",
        },
      ],
    }
  );

  const role = ref<string>();
</script>
