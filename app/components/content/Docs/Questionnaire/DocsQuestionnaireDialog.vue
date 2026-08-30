<template>
  <UiDialog v-model:open="open">
    <UiDialogTrigger as-child>
      <UiButton variant="outline">Open clarification</UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiQuestionnaire default-item="scope" :items="items" @submit="handleSubmit">
        <UiQuestionnaireItem name="scope" required>
          <UiDialogHeader>
            <UiQuestionnaireProgress />
            <UiQuestionnaireTitle as-child>
              <UiDialogTitle>Which files are in scope?</UiDialogTitle>
            </UiQuestionnaireTitle>
            <UiQuestionnaireDescription as-child>
              <UiDialogDescription>
                Choose how broadly the agent can update the workspace.
              </UiDialogDescription>
            </UiQuestionnaireDescription>
          </UiDialogHeader>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="component">Component only</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="feature"
              >Complete feature directory</UiQuestionnaireChoice
            >
            <UiQuestionnaireChoice value="workspace"
              >Any related workspace file</UiQuestionnaireChoice
            >
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiQuestionnaireItem>

        <UiQuestionnaireItem name="tests" required>
          <UiDialogHeader>
            <UiQuestionnaireProgress />
            <UiQuestionnaireTitle as-child>
              <UiDialogTitle>How much verification is needed?</UiDialogTitle>
            </UiQuestionnaireTitle>
            <UiQuestionnaireDescription as-child>
              <UiDialogDescription>
                Choose the checks the agent should run before handoff.
              </UiDialogDescription>
            </UiQuestionnaireDescription>
          </UiDialogHeader>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="targeted">Targeted tests</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="package">Package tests</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="full">Full workspace verification</UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiQuestionnaireItem>

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline">Cancel</UiButton>
          </UiDialogClose>
          <UiQuestionnaireActions>
            <UiQuestionnairePrevious />
            <UiQuestionnaireNext>Next</UiQuestionnaireNext>
            <UiQuestionnaireSubmit>Send answer</UiQuestionnaireSubmit>
          </UiQuestionnaireActions>
        </UiDialogFooter>
      </UiQuestionnaire>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  const items = [
    { name: "scope", required: true },
    { name: "tests", required: true },
  ] as const;

  const open = ref(false);

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    open.value = false;
    useSonner("Clarification sent", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("tests") ?? "None"}`,
    });
  }
</script>
