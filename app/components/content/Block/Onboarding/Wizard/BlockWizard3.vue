<template>
  <!--
    Full height wizard with a sidebar and progress bar
    Features: Sidebar with brand, step list and a progress bar, finished steps marked with a check, main area with a heading and form, sticky footer actions and a stacked layout on small screens
  -->
  <div class="flex min-h-[640px] flex-col md:flex-row">
    <aside
      class="bg-muted/40 w-full shrink-0 border-b p-6 md:w-72 md:border-r md:border-b-0 md:p-8"
    >
      <div class="flex items-center gap-2 font-semibold">
        <span class="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md">
          <Icon name="lucide:layers" class="size-4" />
        </span>
        {{ brand }}
      </div>
      <UiProgress :model-value="progress" class="mt-6 h-1.5" aria-label="Setup progress" />
      <p class="text-muted-foreground mt-2 text-xs">Step {{ step }} of {{ steps.length }}</p>
      <ol class="mt-6 hidden space-y-1 md:block">
        <li v-for="(item, index) in steps" :key="item.title">
          <button
            type="button"
            class="focus-visible:ring-ring/50 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60"
            :class="index + 1 === step ? 'bg-background shadow-xs' : 'hover:bg-background/60'"
            :disabled="index + 1 > step"
            :aria-current="index + 1 === step ? 'step' : undefined"
            @click="step = index + 1"
          >
            <span
              class="grid size-6 shrink-0 place-items-center rounded-full border text-xs font-semibold"
              :class="index + 1 < step ? 'bg-primary text-primary-foreground border-primary' : ''"
            >
              <Icon v-if="index + 1 < step" name="lucide:check" class="size-3.5" />
              <template v-else>{{ index + 1 }}</template>
            </span>
            {{ item.title }}
          </button>
        </li>
      </ol>
    </aside>

    <main class="flex flex-1 flex-col p-6 md:p-12">
      <div class="mx-auto w-full max-w-lg flex-1">
        <h1 class="text-2xl font-bold tracking-tight">{{ steps[step - 1]!.heading }}</h1>
        <p class="text-muted-foreground mt-1">{{ steps[step - 1]!.hint }}</p>

        <div class="mt-8 grid gap-5">
          <template v-if="step === 1">
            <div class="grid gap-2">
              <UiLabel for="sb-name">Workspace name</UiLabel>
              <UiInput id="sb-name" v-model="form.name" placeholder="Acme Inc." />
            </div>
            <div class="grid gap-2">
              <UiLabel for="sb-url">Workspace URL</UiLabel>
              <div class="flex">
                <span
                  class="bg-muted text-muted-foreground flex items-center rounded-l-md border border-r-0 px-3 text-sm"
                >
                  acme.app/
                </span>
                <UiInput
                  id="sb-url"
                  v-model="form.slug"
                  class="rounded-l-none"
                  placeholder="acme"
                />
              </div>
            </div>
          </template>
          <template v-else-if="step === 2">
            <UiRadioGroup v-model="form.goal" class="grid gap-3" aria-label="Primary goal">
              <label
                v-for="option in goals"
                :key="option"
                :for="`goal-${option}`"
                class="has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm"
              >
                <UiRadioGroupItem :id="`goal-${option}`" :value="option" />
                {{ option }}
              </label>
            </UiRadioGroup>
          </template>
          <template v-else-if="step === 3">
            <div class="grid gap-2">
              <UiLabel for="sb-invites">Invite teammates</UiLabel>
              <UiTextarea
                id="sb-invites"
                v-model="form.invites"
                :rows="3"
                placeholder="One email per line"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col items-center py-8 text-center">
              <span
                class="grid size-14 place-items-center rounded-full bg-green-500/10 text-green-600"
              >
                <Icon name="lucide:check" class="size-7" />
              </span>
              <p class="mt-4 text-lg font-semibold">{{ form.name || "Your workspace" }} is ready</p>
            </div>
          </template>
        </div>
      </div>

      <div class="mx-auto mt-8 flex w-full max-w-lg justify-between border-t pt-6">
        <UiButton variant="ghost" :disabled="step === 1" @click="step--">Back</UiButton>
        <UiButton v-if="step < steps.length" @click="step++">Continue</UiButton>
        <UiButton v-else @click="useSonner.success('Welcome aboard')">Open workspace</UiButton>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      brand?: string;
    }>(),
    { brand: "Acme" }
  );

  const steps = [
    {
      title: "Workspace",
      heading: "Name your workspace",
      hint: "This is how your team will find you.",
    },
    {
      title: "Goals",
      heading: "What is your main goal?",
      hint: "We will set up the right defaults.",
    },
    { title: "Team", heading: "Invite your team", hint: "Collaboration is better together." },
    { title: "Done", heading: "All done", hint: "Everything is ready to go." },
  ];

  const goals = [
    "Ship product faster",
    "Keep customers happy",
    "Organise company knowledge",
    "Report on progress",
  ];

  const step = ref(1);
  const form = reactive({ name: "", slug: "", goal: goals[0]!, invites: "" });

  const progress = computed(() => ((step.value - 1) / (steps.length - 1)) * 100);
</script>
