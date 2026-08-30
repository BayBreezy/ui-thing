<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    :items="items"
    shortcuts="letters"
    @submit="handleSubmit"
  >
    <UiQuestionnaireItem name="approach" required>
      <UiQuestionnaireTitle>How should the agent approach this refactor?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Choose a strategy or write a more specific instruction.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="incremental"
          >Make the smallest safe change</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="module">Refactor one module at a time</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="rewrite"
          >Replace the implementation completely</UiQuestionnaireChoice
        >
        <UiQuestionnaireInput
          aria-label="Another refactoring approach"
          placeholder="Describe another approach…"
        />
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnaireSubmit>Use this approach</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    {
      choices: [{ value: "incremental" }, { value: "module" }, { value: "rewrite" }],
      name: "approach",
      required: true,
    },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const approach = new FormData(event.target as HTMLFormElement).get("approach");

    useSonner("Approach selected", {
      description: `Approach: ${approach ?? "None"}`,
    });
  }
</script>
