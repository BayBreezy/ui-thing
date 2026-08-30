<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    :items="items"
    shortcuts="letters"
    @submit="handleSubmit"
  >
    <UiQuestionnaireItem name="context" multiple required>
      <UiQuestionnaireTitle>What context should the agent inspect?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Select every source that may affect the implementation.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="source">Relevant source files</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="tests">Existing tests</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="docs">Architecture documentation</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="history">Recent commit history</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnaireSubmit>Share context</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    {
      choices: [{ value: "source" }, { value: "tests" }, { value: "docs" }, { value: "history" }],
      name: "context",
      required: true,
    },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const context = new FormData(event.target as HTMLFormElement).getAll("context");

    useSonner("Context selected", {
      description: `Context: ${context.join(", ") || "None"}`,
    });
  }
</script>
