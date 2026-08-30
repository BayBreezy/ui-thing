<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="scope"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress v-slot="{ current, total }" class="w-full">
      <div aria-hidden="true" class="mb-2 flex gap-1.5">
        <span
          v-for="step in total"
          :key="step"
          class="h-1.5 flex-1 rounded-full"
          :class="step <= current ? 'bg-primary' : 'bg-muted'"
        />
      </div>
      <span>Checkpoint {{ current }} of {{ total }}</span>
    </UiQuestionnaireProgress>

    <UiQuestionnaireItem name="scope" required>
      <UiQuestionnaireTitle>How large is the change?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="small">Small patch</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="medium">Feature-sized change</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="large">Cross-package change</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="strategy" required>
      <UiQuestionnaireTitle>How should commits be organized?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="single">Single commit</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="logical">Logical commits</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="squash">Squash before review</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="tests" required>
      <UiQuestionnaireTitle>Which tests should run?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="targeted">Targeted tests</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="package">Package suite</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="workspace">Full workspace</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="delivery" required>
      <UiQuestionnaireTitle>How should the work be delivered?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="patch">Patch only</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="commit">Committed locally</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="branch">Push a review branch</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Finish plan</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    { name: "scope", required: true },
    { name: "strategy", required: true },
    { name: "tests", required: true },
    { name: "delivery", required: true },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Pull request plan ready", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Commits: ${formData.get("strategy") ?? "None"} · Tests: ${formData.get("tests") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
    });
  }
</script>
