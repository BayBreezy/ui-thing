<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="verification"
    :items="items"
    @reset="useSonner('Saved answers restored')"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="change" required>
      <UiQuestionnaireTitle>What kind of migration is this?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        This answer was saved during the previous session.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="incremental" default-checked
          >Incremental migration</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="cutover">Single cutover</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="verification" multiple required>
      <UiQuestionnaireTitle>How should the migration be verified?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        These checks were selected during the previous session.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tests" default-checked
          >Run migration tests</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="typecheck" default-checked
          >Run the typecheck</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="manual">Perform a manual smoke test</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="notes">
      <UiQuestionnaireTitle>Anything else the agent should remember?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>This note was saved with the draft.</UiQuestionnaireDescription>
      <UiQuestionnaireInput
        aria-label="Saved migration note"
        default-value="Keep the existing public API stable."
      />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiButton type="reset" variant="outline">Reset changes</UiButton>
      <UiQuestionnairePrevious />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Update draft</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    { name: "change", required: true },
    { name: "verification", required: true },
    { name: "notes" },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const verification = formData.getAll("verification");

    useSonner("Draft updated", {
      description: `Migration: ${formData.get("change") ?? "None"} · Verification: ${verification.join(", ") || "None"} · Notes: ${formData.get("notes") || "None"}`,
    });
  }
</script>
