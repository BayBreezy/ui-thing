<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="task" required>
      <UiQuestionnaireTitle>What kind of change is this?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription
        >Choose the category that best describes the work.</UiQuestionnaireDescription
      >
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="feature">New feature</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="fix">Bug fix</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="refactor">Refactor</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="constraints" @update:status="constraintStatus = $event">
      <UiQuestionnaireTitle>Are there any implementation constraints?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Answer if needed, or intentionally skip this question.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="no-dependencies"
          >Do not add dependencies</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="no-migrations"
          >Do not change the database</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="preserve-api">Preserve the public API</UiQuestionnaireChoice>
        <UiQuestionnaireInput
          aria-label="Another implementation constraint"
          placeholder="Describe another constraint…"
        />
      </UiQuestionnaireChoices>
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="review" required>
      <UiQuestionnaireTitle>How should the work be reviewed?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Choose the checks the agent should complete before handoff.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tests">Run the test suite</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="diff">Review the final diff</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="both">Tests and diff review</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireSkip />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Submit brief</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  import type { QuestionnaireItemStatus } from "~/utils/questionnaire";

  const items = [
    { name: "task", required: true },
    { name: "constraints" },
    { name: "review", required: true },
  ] as const;

  const constraintStatus = ref<QuestionnaireItemStatus>("unanswered");

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const constraints =
      constraintStatus.value === "skipped" ? "Skipped" : (formData.get("constraints") ?? "None");

    useSonner("Agent brief submitted", {
      description: `Task: ${formData.get("task") ?? "None"} · Constraints: ${constraints} · Review: ${formData.get("review") ?? "None"}`,
    });
  }
</script>
