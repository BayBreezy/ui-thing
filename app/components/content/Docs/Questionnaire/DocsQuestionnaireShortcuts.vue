<template>
  <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
    <UiNativeSelect v-model="mode" class="absolute end-0 top-0 w-32" aria-label="Shortcut style">
      <option value="none">No shortcuts</option>
      <option value="letters">Letters</option>
      <option value="numbers">Numbers</option>
    </UiNativeSelect>

    <UiQuestionnaire class="mt-auto" :items="items" :shortcuts="shortcuts" @submit="handleSubmit">
      <UiQuestionnaireItem name="action" required>
        <UiQuestionnaireTitle>What should the agent do next?</UiQuestionnaireTitle>
        <UiQuestionnaireDescription>
          Use the displayed shortcut or navigate with the keyboard.
        </UiQuestionnaireDescription>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="inspect">Inspect the implementation</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="tests">Run the relevant tests</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="patch">Prepare the patch</UiQuestionnaireChoice>
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireActions>
        <UiQuestionnaireSubmit>Confirm action</UiQuestionnaireSubmit>
      </UiQuestionnaireActions>
    </UiQuestionnaire>
  </div>
</template>

<script lang="ts" setup>
  import type { QuestionnaireShortcutMode } from "~/utils/questionnaire";

  const items = [
    {
      choices: [{ value: "inspect" }, { value: "tests" }, { value: "patch" }],
      name: "action",
      required: true,
    },
  ] as const;

  const mode = ref<"letters" | "numbers" | "none">("letters");

  const shortcuts = computed<QuestionnaireShortcutMode | undefined>(() =>
    mode.value === "none" ? undefined : mode.value
  );

  function handleSubmit(event: Event) {
    event.preventDefault();

    const action = new FormData(event.target as HTMLFormElement).get("action");

    useSonner("Next action selected", {
      description: `Action: ${action ?? "None"} · Shortcuts: ${shortcuts.value ?? "none"}`,
    });
  }
</script>
