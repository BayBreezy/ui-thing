<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    shortcuts="numbers"
    @submit="handleSubmit"
  >
    <UiCard>
      <UiQuestionnaireItem name="task" required>
        <UiCardHeader>
          <UiQuestionnaireTitle as-child>
            <UiCardTitle>What should the agent work on?</UiCardTitle>
          </UiQuestionnaireTitle>
          <UiQuestionnaireDescription as-child>
            <UiCardDescription>Choose the task that should be handled next.</UiCardDescription>
          </UiQuestionnaireDescription>
          <UiCardAction>
            <UiQuestionnaireProgress />
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="fix">Fix the failing tests</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="refactor">Refactor the data layer</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="docs">Update the integration guide</UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="output" required>
        <UiCardHeader>
          <UiQuestionnaireTitle as-child>
            <UiCardTitle>What should the final handoff include?</UiCardTitle>
          </UiQuestionnaireTitle>
          <UiQuestionnaireDescription as-child>
            <UiCardDescription>Pick the level of detail needed for review.</UiCardDescription>
          </UiQuestionnaireDescription>
          <UiCardAction>
            <UiQuestionnaireProgress />
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="summary">Summary only</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="files">Summary and changed files</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="review">Full review handoff</UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiCardFooter>
        <UiQuestionnaireActions class="w-full">
          <UiQuestionnairePrevious />
          <UiQuestionnaireNext>Next</UiQuestionnaireNext>
          <UiQuestionnaireSubmit>Create task</UiQuestionnaireSubmit>
        </UiQuestionnaireActions>
      </UiCardFooter>
    </UiCard>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    {
      choices: [{ value: "fix" }, { value: "refactor" }, { value: "docs" }],
      name: "task",
      required: true,
    },
    {
      choices: [{ value: "summary" }, { value: "files" }, { value: "review" }],
      name: "output",
      required: true,
    },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Agent task created", {
      description: `Task: ${formData.get("task") ?? "None"} · Handoff: ${formData.get("output") ?? "None"}`,
    });
  }
</script>
