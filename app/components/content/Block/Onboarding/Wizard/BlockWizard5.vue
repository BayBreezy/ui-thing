<template>
  <!--
    Review and confirm step
    Features: Summary cards grouped by section, an edit link on each section that jumps back, terms checkbox that gates the confirm button, confirm with a short loading state and a success message
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl">
      <template v-if="!confirmed">
        <p class="text-muted-foreground text-sm font-medium">Final step</p>
        <h1 class="mt-1 text-3xl font-bold tracking-tight">Review your setup</h1>
        <p class="text-muted-foreground mt-2">
          Check everything looks right before we create your workspace.
        </p>

        <div class="mt-8 space-y-4">
          <UiCard v-for="section in sections" :key="section.title">
            <UiCardHeader>
              <UiCardTitle class="text-base">{{ section.title }}</UiCardTitle>
              <UiCardAction>
                <UiButton variant="link" size="sm" class="h-auto p-0" @click="edit(section.title)">
                  Edit
                  <span class="sr-only">{{ section.title }}</span>
                </UiButton>
              </UiCardAction>
            </UiCardHeader>
            <UiCardContent>
              <dl class="grid gap-3 text-sm sm:grid-cols-2">
                <div v-for="row in section.rows" :key="row.label">
                  <dt class="text-muted-foreground">{{ row.label }}</dt>
                  <dd class="font-medium">{{ row.value }}</dd>
                </div>
              </dl>
            </UiCardContent>
          </UiCard>
        </div>

        <div class="mt-6 flex items-start gap-3">
          <UiCheckbox id="review-terms" v-model="accepted" class="mt-0.5" />
          <UiLabel for="review-terms" class="text-sm leading-snug font-normal">
            I agree to the terms of service and the privacy policy.
          </UiLabel>
        </div>

        <div class="mt-8 flex justify-end">
          <UiButton size="lg" :disabled="!accepted || loading" @click="confirm">
            <UiLoader v-if="loading" />
            Confirm and create
          </UiButton>
        </div>
      </template>

      <div v-else class="flex flex-col items-center py-12 text-center" role="status">
        <span class="grid size-16 place-items-center rounded-full bg-green-500/10 text-green-600">
          <Icon name="lucide:check" class="size-8" />
        </span>
        <h1 class="mt-5 text-2xl font-bold tracking-tight">Workspace created</h1>
        <p class="text-muted-foreground mt-2">Acme Inc. is ready. Welcome aboard!</p>
        <UiButton class="mt-6" variant="outline" @click="reset">Review again</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Section = { title: string; rows: { label: string; value: string }[] };

  withDefaults(
    defineProps<{
      sections?: Section[];
    }>(),
    {
      sections: () => [
        {
          title: "Account",
          rows: [
            { label: "Name", value: "Maya Chen" },
            { label: "Email", value: "maya@acme.dev" },
          ],
        },
        {
          title: "Workspace",
          rows: [
            { label: "Name", value: "Acme Inc." },
            { label: "URL", value: "acme.app/acme" },
            { label: "Region", value: "United States" },
            { label: "Team size", value: "11 to 50" },
          ],
        },
        {
          title: "Plan",
          rows: [
            { label: "Plan", value: "Pro" },
            { label: "Billing", value: "Yearly, $10 per user per month" },
          ],
        },
      ],
    }
  );

  const accepted = ref(false);
  const loading = ref(false);
  const confirmed = ref(false);

  function edit(title: string) {
    useSonner.info(`Jump back to the ${title.toLowerCase()} step here`);
  }

  async function confirm() {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 600));
    loading.value = false;
    confirmed.value = true;
  }

  function reset() {
    confirmed.value = false;
    accepted.value = false;
  }
</script>
