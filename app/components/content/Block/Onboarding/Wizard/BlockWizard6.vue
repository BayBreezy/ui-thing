<template>
  <!--
    Onboarding wizard inside a dialog
    Features: Trigger button that opens a modal wizard, three steps with a progress bar, back and next buttons, skip for now, focus stays in the dialog and it resets when closed
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-md text-center">
      <h1 class="text-2xl font-bold tracking-tight">Finish setting up</h1>
      <p class="text-muted-foreground mt-2">
        Open the quick setup in a dialog without leaving the page.
      </p>
      <UiDialog v-model:open="open">
        <UiDialogTrigger as-child>
          <UiButton class="mt-6">
            <Icon name="lucide:wand-sparkles" class="size-4" />
            Start quick setup
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-md">
          <UiDialogHeader>
            <UiDialogTitle>{{ steps[step]!.title }}</UiDialogTitle>
            <UiDialogDescription>{{ steps[step]!.description }}</UiDialogDescription>
          </UiDialogHeader>
          <UiProgress
            :model-value="((step + 1) / steps.length) * 100"
            class="h-1.5"
            aria-label="Setup progress"
          />

          <div class="grid gap-4 py-2">
            <template v-if="step === 0">
              <div class="grid gap-2">
                <UiLabel for="md-name">Your name</UiLabel>
                <UiInput id="md-name" v-model="form.name" placeholder="Jane Doe" />
              </div>
              <div class="grid gap-2">
                <UiLabel for="md-role">Role</UiLabel>
                <UiNativeSelect id="md-role" v-model="form.role">
                  <option v-for="role in roles" :key="role">{{ role }}</option>
                </UiNativeSelect>
              </div>
            </template>
            <template v-else-if="step === 1">
              <label
                v-for="option in sources"
                :key="option"
                :for="`md-${option}`"
                class="has-data-[state=checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm"
              >
                <UiCheckbox
                  :id="`md-${option}`"
                  :model-value="form.sources.includes(option)"
                  @update:model-value="toggle(option)"
                />
                {{ option }}
              </label>
            </template>
            <template v-else>
              <p class="text-sm">
                Thanks {{ form.name || "there" }}! We will tailor the app for a
                {{ form.role.toLowerCase() }}
                <span v-if="form.sources.length">
                  who found us through {{ form.sources.join(", ").toLowerCase() }}</span
                >.
              </p>
            </template>
          </div>

          <UiDialogFooter class="gap-2 sm:justify-between">
            <UiButton variant="ghost" @click="open = false">Skip for now</UiButton>
            <div class="flex gap-2">
              <UiButton v-if="step > 0" variant="outline" @click="step--">Back</UiButton>
              <UiButton v-if="step < steps.length - 1" @click="step++">Next</UiButton>
              <UiButton v-else @click="finish">Done</UiButton>
            </div>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const steps = [
    { title: "About you", description: "Two quick questions to personalise your account." },
    { title: "How did you hear about us?", description: "Pick everything that applies." },
    { title: "You are ready", description: "Here is what we will set up." },
  ];

  const roles = ["Founder", "Engineer", "Designer", "Product manager", "Marketer"];
  const sources = ["Search", "A friend", "Social media", "A newsletter"];

  const open = ref(false);
  const step = ref(0);
  const form = reactive({ name: "", role: roles[0]!, sources: [] as string[] });

  function toggle(option: string) {
    form.sources = form.sources.includes(option)
      ? form.sources.filter((item) => item !== option)
      : [...form.sources, option];
  }

  function finish() {
    open.value = false;
    useSonner.success("Quick setup complete");
  }

  // Start from the first step every time the dialog opens again.
  watch(open, (value) => {
    if (!value) step.value = 0;
  });
</script>
