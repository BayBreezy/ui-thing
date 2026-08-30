<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="direction"
    :items="items"
    shortcuts="letters"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="direction" required>
      <UiQuestionnaireTitle>What should the agent build next?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription
        >Choose a direction or describe another task.</UiQuestionnaireDescription
      >
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tool-calls">
          <span class="font-medium">Tool call timeline</span>
          <span class="text-muted-foreground">Show what the agent ran and what came back.</span>
        </UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="approvals">
          <span class="font-medium">Approval checkpoints</span>
          <span class="text-muted-foreground">Ask before sensitive or destructive actions.</span>
        </UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="handoffs">
          <span class="font-medium">Sub-agent handoffs</span>
          <span class="text-muted-foreground"
            >Make delegated work and results easier to follow.</span
          >
        </UiQuestionnaireChoice>
        <UiQuestionnaireInput
          aria-label="Another agent feature"
          placeholder="Describe another feature…"
        />
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="signals" multiple>
      <UiQuestionnaireTitle>What should every progress update include?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription
        >Select all that apply, or skip this question.</UiQuestionnaireDescription
      >
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="progress">Progress</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="decisions">Decisions</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="risks">Risks</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="next-step">Next step</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="timing" required>
      <UiQuestionnaireTitle>When should work begin?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription
        >Choose when the agent should begin the work.</UiQuestionnaireDescription
      >
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="now">Start now</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="next-cycle">Next development cycle</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="backlog">Add it to the backlog</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireSkip />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Save plan</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    {
      choices: [{ value: "tool-calls" }, { value: "approvals" }, { value: "handoffs" }],
      name: "direction",
      required: true,
    },
    {
      choices: [
        { value: "progress" },
        { value: "decisions" },
        { value: "risks" },
        { value: "next-step" },
      ],
      name: "signals",
    },
    {
      choices: [{ value: "now" }, { value: "next-cycle" }, { value: "backlog" }],
      name: "timing",
      required: true,
    },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const signals = formData.getAll("signals");

    useSonner("Agent plan saved", {
      description: `Direction: ${formData.get("direction") ?? "None"} · Progress signals: ${signals.join(", ") || "None"} · Timing: ${formData.get("timing") ?? "None"}`,
    });
  }
</script>
