<template>
  <!--
    Multi step form with validation on every step
    Features: One vee-validate form with a yup schema per step, errors shown under each field, Continue only moves on when the step is valid, values kept when going back and a submit state on the last step
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-lg">
      <div class="mb-8">
        <div class="text-muted-foreground flex justify-between text-sm">
          <span>Step {{ Math.min(step, 3) }} of 3</span>
          <span>{{ labels[Math.min(step, 3) - 1] }}</span>
        </div>
        <UiProgress :model-value="(Math.min(step, 4) - 1) * 33.3 + 33.3" class="mt-2 h-1.5" />
      </div>

      <template v-if="step <= 3">
        <h1 class="text-2xl font-bold tracking-tight">{{ labels[step - 1] }}</h1>
        <form class="mt-6" novalidate @submit="next">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <template v-if="step === 1">
              <UiVeeInput required label="Full name" name="name" placeholder="Jane Doe" />
              <UiVeeInput
                required
                label="Email"
                type="email"
                name="email"
                placeholder="jane@acme.dev"
              />
            </template>
            <template v-else-if="step === 2">
              <UiVeeInput required label="Company" name="company" placeholder="Acme Inc." />
              <UiVeeInput
                label="Website"
                name="website"
                placeholder="https://acme.dev"
                hint="Optional"
              />
            </template>
            <template v-else>
              <UiVeeTextarea
                required
                label="What do you want to achieve?"
                name="goal"
                :rows="4"
                hint="At least 10 characters."
              />
            </template>
            <div class="flex justify-between">
              <UiButton type="button" variant="outline" :disabled="step === 1" @click="step--"
                >Back</UiButton
              >
              <UiButton type="submit">
                <UiLoader v-if="isSubmitting" />
                {{ step === 3 ? "Submit" : "Continue" }}
              </UiButton>
            </div>
          </fieldset>
        </form>
      </template>

      <div v-else class="flex flex-col items-center py-10 text-center">
        <span class="grid size-14 place-items-center rounded-full bg-green-500/10 text-green-600">
          <Icon name="lucide:check" class="size-7" />
        </span>
        <h1 class="mt-4 text-2xl font-bold tracking-tight">Thanks, we have it from here</h1>
        <p class="text-muted-foreground mt-2">We will email you within one business day.</p>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const labels = ["About you", "Your company", "Your goals"];

  const step = ref(1);

  const schemas = [
    object({
      name: string().required().label("Full name").min(2),
      email: string().email().required().label("Email"),
    }),
    object({
      company: string().required().label("Company"),
      website: string().url().label("Website"),
    }),
    object({ goal: string().required().label("Goal").min(10) }),
  ];

  // Each step validates only its own fields, and values survive the step changing.
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: computed(() => schemas[Math.min(step.value, 3) - 1]),
    keepValuesOnUnmount: true,
  });

  const next = handleSubmit(async () => {
    if (step.value === 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      useSonner.success("Application sent");
    }
    step.value += 1;
  });
</script>
