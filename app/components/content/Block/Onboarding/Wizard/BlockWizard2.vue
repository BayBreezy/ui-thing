<template>
  <!--
    Vertical stepper wizard with titles and descriptions
    Features: Vertical stepper on the left with a title and short description per step, content on the right, finished steps can be revisited and a progress summary under the list
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto grid max-w-4xl gap-10 md:grid-cols-[16rem_1fr]">
      <div>
        <UiStepper v-model="step" orientation="vertical" class="gap-0">
          <UiStepperItem
            v-for="(item, index) in steps"
            :key="item.title"
            :step="index + 1"
            :disabled="index + 1 > furthest"
            class="relative items-start gap-4 pb-8 last:pb-0"
          >
            <UiStepperTrigger class="items-start gap-4 text-left">
              <UiStepperIndicator />
              <span class="flex flex-col">
                <UiStepperTitle>{{ item.title }}</UiStepperTitle>
                <UiStepperDescription>{{ item.description }}</UiStepperDescription>
              </span>
            </UiStepperTrigger>
            <UiStepperSeparator
              v-if="index < steps.length - 1"
              class="absolute top-7 bottom-1 left-3 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-auto"
            />
          </UiStepperItem>
        </UiStepper>
        <p class="text-muted-foreground mt-8 text-sm" aria-live="polite">
          {{ Math.round(((furthest - 1) / steps.length) * 100) }}% complete
        </p>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>{{ steps[step - 1]!.title }}</UiCardTitle>
          <UiCardDescription>{{ steps[step - 1]!.description }}</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="grid gap-5">
          <template v-if="step === 1">
            <div class="grid gap-2">
              <UiLabel for="vw-project">Project name</UiLabel>
              <UiInput id="vw-project" v-model="form.project" placeholder="Website redesign" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="vw-desc">Description</UiLabel>
              <UiTextarea
                id="vw-desc"
                v-model="form.description"
                :rows="3"
                placeholder="What are you building?"
              />
            </div>
          </template>
          <template v-else-if="step === 2">
            <div class="grid gap-2">
              <UiLabel for="vw-template">Starting point</UiLabel>
              <UiNativeSelect id="vw-template" v-model="form.template">
                <option v-for="template in templates" :key="template">{{ template }}</option>
              </UiNativeSelect>
            </div>
            <p class="text-muted-foreground text-sm">
              Templates come with sample tasks, views and automations you can delete at any time.
            </p>
          </template>
          <template v-else-if="step === 3">
            <div class="grid gap-2">
              <UiLabel for="vw-members">Invite teammates</UiLabel>
              <UiInput
                id="vw-members"
                v-model="form.members"
                placeholder="sofia@acme.dev, liam@acme.dev"
              />
              <p class="text-muted-foreground text-xs">
                Separate addresses with commas. You can skip this.
              </p>
            </div>
          </template>
          <template v-else>
            <dl class="divide-y rounded-lg border text-sm">
              <div v-for="row in summary" :key="row.label" class="flex justify-between gap-4 p-3">
                <dt class="text-muted-foreground">{{ row.label }}</dt>
                <dd class="text-right font-medium">{{ row.value || "Not set" }}</dd>
              </div>
            </dl>
          </template>
        </UiCardContent>
        <UiCardFooter class="justify-between">
          <UiButton variant="outline" :disabled="step === 1" @click="step--">Back</UiButton>
          <UiButton @click="advance">{{
            step === steps.length ? "Create project" : "Continue"
          }}</UiButton>
        </UiCardFooter>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const steps = [
    { title: "Basics", description: "Name your project" },
    { title: "Template", description: "Pick a starting point" },
    { title: "Team", description: "Invite collaborators" },
    { title: "Review", description: "Check and create" },
  ];

  const templates = ["Blank project", "Product launch", "Marketing campaign", "Sprint board"];

  const step = ref(1);
  const furthest = ref(1);

  const form = reactive({ project: "", description: "", template: templates[0]!, members: "" });

  const summary = computed(() => [
    { label: "Project", value: form.project },
    { label: "Description", value: form.description },
    { label: "Template", value: form.template },
    { label: "Teammates", value: form.members },
  ]);

  function advance() {
    if (step.value === steps.length) {
      useSonner.success("Project created");
      return;
    }
    step.value++;
    furthest.value = Math.max(furthest.value, step.value);
  }
</script>
