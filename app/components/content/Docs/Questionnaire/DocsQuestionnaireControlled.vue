<template>
  <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
    <p class="text-muted-foreground absolute end-0 top-0 text-sm" role="status">
      Current checkpoint: {{ label }}
    </p>

    <UiQuestionnaire v-model:item="item" class="mt-auto" :items="items" @submit="handleSubmit">
      <UiQuestionnaireProgress />

      <UiQuestionnaireItem name="scope" required>
        <UiQuestionnaireTitle>What may the agent change?</UiQuestionnaireTitle>
        <UiQuestionnaireDescription>
          The host stores the active checkpoint while Questionnaire navigates.
        </UiQuestionnaireDescription>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="component">Only the target component</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="tests">Component and related tests</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="feature">The complete feature area</UiQuestionnaireChoice>
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="checks" required>
        <UiQuestionnaireTitle>Which verification level should it use?</UiQuestionnaireTitle>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="targeted">Targeted tests</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="package">Package tests and typecheck</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="full">Full workspace verification</UiQuestionnaireChoice>
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="output" required>
        <UiQuestionnaireTitle>What should the agent return when finished?</UiQuestionnaireTitle>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="summary">Concise summary</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="diff">Summary with changed files</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="handoff"
            >Detailed implementation handoff</UiQuestionnaireChoice
          >
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireActions>
        <UiQuestionnairePrevious />
        <UiQuestionnaireNext>Next</UiQuestionnaireNext>
        <UiQuestionnaireSubmit>Save workflow</UiQuestionnaireSubmit>
      </UiQuestionnaireActions>
    </UiQuestionnaire>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { name: "scope", required: true },
    { name: "checks", required: true },
    { name: "output", required: true },
  ] as const;

  const itemLabels: Record<string, string> = {
    scope: "Change scope",
    checks: "Verification",
    output: "Final output",
  };

  const item = ref("scope");
  const label = computed(() => itemLabels[item.value]);

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Agent workflow configured", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("checks") ?? "None"} · Output: ${formData.get("output") ?? "None"}`,
    });
  }
</script>
