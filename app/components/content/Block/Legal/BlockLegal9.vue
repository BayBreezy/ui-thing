<template>
  <!--
    Data rights request form
    Features: Explains privacy rights with three cards, then a validated request form with request type cards, details and a confirmation state with a reference number
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div class="max-w-2xl">
        <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-4 text-lg">
          Under laws like the GDPR and CCPA you can ask what we hold about you, have it corrected or
          have it deleted. We reply within 30 days.
        </p>
      </div>
      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <ul class="space-y-4">
          <li v-for="item in rights" :key="item.title" class="flex gap-4">
            <UiFancyIcon :icon="item.icon" theme="light" :color="item.color" />
            <div>
              <p class="font-semibold">{{ item.title }}</p>
              <p class="text-muted-foreground text-sm">{{ item.text }}</p>
            </div>
          </li>
        </ul>

        <UiCard>
          <UiCardContent>
            <form v-if="!reference" class="space-y-5" novalidate @submit.prevent="submit">
              <fieldset class="space-y-3">
                <legend class="text-sm font-medium">Request type</legend>
                <UiRadioGroup v-model="type" class="grid gap-2 sm:grid-cols-3">
                  <label
                    v-for="option in types"
                    :key="option.value"
                    class="flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors"
                    :class="
                      type === option.value ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    "
                  >
                    <UiRadioGroupItem :value="option.value" class="sr-only" />
                    {{ option.label }}
                  </label>
                </UiRadioGroup>
              </fieldset>
              <div class="grid gap-2">
                <UiLabel for="legal-name">Full name</UiLabel>
                <UiInput
                  id="legal-name"
                  v-model="name"
                  placeholder="Jane Doe"
                  :aria-invalid="!!errors.name"
                />
                <p v-if="errors.name" class="text-destructive text-sm">{{ errors.name }}</p>
              </div>
              <div class="grid gap-2">
                <UiLabel for="legal-email">Account email</UiLabel>
                <UiInput
                  id="legal-email"
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  :aria-invalid="!!errors.email"
                />
                <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
              </div>
              <div class="grid gap-2">
                <UiLabel for="legal-details">Details (optional)</UiLabel>
                <UiTextarea
                  id="legal-details"
                  v-model="details"
                  :rows="3"
                  placeholder="Anything that helps us find your data"
                />
              </div>
              <UiButton type="submit" class="w-full" :disabled="loading">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Submit request
              </UiButton>
            </form>
            <div v-else class="py-6 text-center" role="status">
              <div
                class="mx-auto flex size-14 items-center justify-center rounded-full bg-green-500/10"
              >
                <Icon
                  name="lucide:circle-check"
                  class="size-7 text-green-600 dark:text-green-400"
                />
              </div>
              <h2 class="mt-4 text-xl font-semibold">Request received</h2>
              <p class="text-muted-foreground mt-1 text-sm">
                We will email {{ email }} within 30 days. Your reference is
                <span class="text-foreground font-mono">{{ reference }}</span
                >.
              </p>
              <UiButton variant="ghost" size="sm" class="mt-4" @click="reset"
                >Submit another request</UiButton
              >
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string }>(), {
    title: "Your data, your choice",
  });

  const rights = [
    {
      title: "Access",
      text: "Get a copy of the personal data we hold about you.",
      icon: "lucide:file-search",
      color: "info" as const,
    },
    {
      title: "Correction",
      text: "Ask us to fix anything that is inaccurate.",
      icon: "lucide:pencil-line",
      color: "warning" as const,
    },
    {
      title: "Deletion",
      text: "Have your account and personal data erased.",
      icon: "lucide:trash-2",
      color: "error" as const,
    },
  ];
  const types = [
    { value: "access", label: "Access" },
    { value: "correct", label: "Correct" },
    { value: "delete", label: "Delete" },
  ];

  const type = ref("access");
  const name = ref("");
  const email = ref("");
  const details = ref("");
  const errors = reactive({ name: "", email: "" });
  const loading = ref(false);
  const reference = ref("");

  async function submit() {
    errors.name = name.value.trim() ? "" : "Enter your full name.";
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
      ? ""
      : "Enter a valid email address.";
    if (errors.name || errors.email) return;
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 800));
    loading.value = false;
    reference.value = `DSR-${Math.floor(10000 + Math.random() * 90000)}`;
  }
  function reset() {
    reference.value = "";
    name.value = "";
    email.value = "";
    details.value = "";
    type.value = "access";
  }
</script>
