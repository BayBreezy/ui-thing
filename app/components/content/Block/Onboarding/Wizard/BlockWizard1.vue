<template>
  <!--
    Horizontal stepper wizard with a card per step
    Features: Numbered stepper with check marks for finished steps, clickable finished steps, back and next buttons, a final success step and plain state so you can add validation your own way
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl">
      <UiStepper v-model="step" class="mb-10">
        <UiStepperItem
          v-for="(item, index) in steps"
          :key="item.title"
          :step="index + 1"
          :disabled="index + 1 > step"
          :class="index < steps.length - 1 ? 'flex-1' : ''"
        >
          <UiStepperTrigger class="flex-col gap-2">
            <UiStepperIndicator />
            <UiStepperTitle class="hidden text-xs sm:block">{{ item.title }}</UiStepperTitle>
          </UiStepperTrigger>
          <UiStepperSeparator v-if="index < steps.length - 1" />
        </UiStepperItem>
      </UiStepper>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>{{ current.title }}</UiCardTitle>
          <UiCardDescription>{{ current.description }}</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="grid gap-5">
          <template v-if="step === 1">
            <div class="grid gap-2">
              <UiLabel for="wizard-name">Full name</UiLabel>
              <UiInput id="wizard-name" v-model="form.name" placeholder="Jane Doe" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="wizard-email">Work email</UiLabel>
              <UiInput
                id="wizard-email"
                v-model="form.email"
                type="email"
                placeholder="jane@acme.dev"
              />
            </div>
          </template>
          <template v-else-if="step === 2">
            <div class="grid gap-2">
              <UiLabel for="wizard-company">Company</UiLabel>
              <UiInput id="wizard-company" v-model="form.company" placeholder="Acme Inc." />
            </div>
            <div class="grid gap-2">
              <UiLabel for="wizard-size">Team size</UiLabel>
              <UiNativeSelect id="wizard-size" v-model="form.size">
                <option v-for="size in sizes" :key="size">{{ size }}</option>
              </UiNativeSelect>
            </div>
          </template>
          <template v-else-if="step === 3">
            <div class="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <UiLabel for="wizard-news" class="font-medium">Product updates</UiLabel>
                <p class="text-muted-foreground text-sm">Occasional news about new features.</p>
              </div>
              <UiSwitch id="wizard-news" v-model="form.news" />
            </div>
            <div class="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <UiLabel for="wizard-tips" class="font-medium">Tips and tutorials</UiLabel>
                <p class="text-muted-foreground text-sm">
                  Short guides to get more out of the app.
                </p>
              </div>
              <UiSwitch id="wizard-tips" v-model="form.tips" />
            </div>
          </template>
          <div v-else class="flex flex-col items-center py-6 text-center">
            <span
              class="grid size-14 place-items-center rounded-full bg-green-500/10 text-green-600"
            >
              <Icon name="lucide:check" class="size-7" />
            </span>
            <p class="mt-4 text-lg font-semibold">You are all set, {{ form.name || "friend" }}!</p>
            <p class="text-muted-foreground mt-1 text-sm">
              We sent a confirmation to {{ form.email || "your inbox" }}.
            </p>
          </div>
        </UiCardContent>
        <UiCardFooter v-if="step <= steps.length" class="justify-between">
          <UiButton variant="outline" :disabled="step === 1" @click="step--">Back</UiButton>
          <UiButton @click="step++">
            {{ step === steps.length ? "Finish" : "Continue" }}
          </UiButton>
        </UiCardFooter>
        <UiCardFooter v-else class="justify-center">
          <UiButton variant="outline" @click="restart">Start over</UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const steps = [
    { title: "Account", description: "Tell us who you are." },
    { title: "Company", description: "A little about your team." },
    { title: "Preferences", description: "Choose what you hear from us." },
  ];

  const sizes = ["Just me", "2 to 10", "11 to 50", "51 to 200", "201 or more"];

  const step = ref(1);

  const form = reactive({
    name: "",
    email: "",
    company: "",
    size: sizes[1]!,
    news: true,
    tips: false,
  });

  const current = computed(
    () => steps[step.value - 1] ?? { title: "Done", description: "Your account is ready." }
  );

  function restart() {
    Object.assign(form, {
      name: "",
      email: "",
      company: "",
      size: sizes[1]!,
      news: true,
      tips: false,
    });
    step.value = 1;
  }
</script>
