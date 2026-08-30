<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem :class="itemClass" name="task" required>
      <UiQuestionnaireTitle>What should the agent do?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>Choose the task for this run.</UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="implement"
          >Implement the requested change</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="debug">Debug the current behavior</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="review">Review the implementation</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem :class="itemClass" name="review" required>
      <UiQuestionnaireTitle>How should the work be reviewed?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>Select the verification depth.</UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="targeted">Targeted checks</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="complete">Complete test suite</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="manual">Tests and manual QA</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem :class="itemClass" name="delivery" required>
      <UiQuestionnaireTitle>How should the result be delivered?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>Choose the final handoff format.</UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="summary">Concise summary</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="diff">Summary and changed files</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="handoff">Detailed review handoff</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Save workflow</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    { name: "task", required: true },
    { name: "review", required: true },
    { name: "delivery", required: true },
  ] as const;

  const itemClass =
    "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Agent workflow saved", {
      description: `Task: ${formData.get("task") ?? "None"} · Review: ${formData.get("review") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
    });
  }
</script>
