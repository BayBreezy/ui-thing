<template>
  <UiQuestionnaire
    v-model:item="item"
    class="mx-auto max-w-md"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem
      name="permission"
      required
      @update:status="setStatus('permission', $event)"
    >
      <UiQuestionnaireTitle>What may the agent modify?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Next is intentionally disabled until an answer is selected.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="files">Project files</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="tests">Project files and tests</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="config"
          >Files, tests, and configuration</UiQuestionnaireChoice
        >
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem
      name="verification"
      required
      @update:status="setStatus('verification', $event)"
    >
      <UiQuestionnaireTitle>What must pass before completion?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tests">Tests</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="types">Tests and types</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="all">Tests, types, and visual QA</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireNext
        class="data-[status=unanswered]:opacity-50"
        :disabled="unanswered"
        variant="secondary"
      >
        Next
      </UiQuestionnaireNext>
      <UiQuestionnaireSubmit :disabled="unanswered">Save permissions</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  import type { QuestionnaireItemStatus } from "~/utils/questionnaire";

  type ItemName = "permission" | "verification";

  const items = [
    { name: "permission", required: true },
    { name: "verification", required: true },
  ] as const;

  const item = ref<ItemName>("permission");
  const statuses = ref<Record<ItemName, QuestionnaireItemStatus>>({
    permission: "unanswered",
    verification: "unanswered",
  });

  const unanswered = computed(() => statuses.value[item.value] === "unanswered");

  function setStatus(name: ItemName, status: QuestionnaireItemStatus) {
    statuses.value = { ...statuses.value, [name]: status };
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Permissions saved", {
      description: `Permission: ${formData.get("permission") ?? "None"} · Verification: ${formData.get("verification") ?? "None"}`,
    });
  }
</script>
