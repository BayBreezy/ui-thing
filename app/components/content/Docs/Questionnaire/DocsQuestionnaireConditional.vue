<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="runtime"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="runtime" required>
      <UiQuestionnaireTitle>Where should the agent run?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Cloud runs add an environment question to this flow.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice
          :checked="runtime === 'local'"
          value="local"
          @change="runtime = 'local'"
        >
          Local workspace
        </UiQuestionnaireChoice>
        <UiQuestionnaireChoice
          :checked="runtime === 'cloud'"
          value="cloud"
          @change="runtime = 'cloud'"
        >
          Cloud workspace
        </UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="environment" :disabled="runtime !== 'cloud'" required>
      <UiQuestionnaireTitle>Which cloud environment should it use?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="preview">Preview</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="staging">Staging</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="isolated">Isolated sandbox</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="approval" required>
      <UiQuestionnaireTitle>When should the agent request approval?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="writes">Before writing files</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="commands">Before running commands</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="sensitive">Only for sensitive actions</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Save execution plan</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const runtime = ref("local");

  const items = computed(() => [
    { name: "runtime", required: true },
    { disabled: runtime.value !== "cloud", name: "environment", required: true },
    { name: "approval", required: true },
  ]);

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Execution plan saved", {
      description: `Runtime: ${formData.get("runtime") ?? "None"} · Environment: ${formData.get("environment") ?? "Not applicable"} · Approval: ${formData.get("approval") ?? "None"}`,
    });
  }
</script>
