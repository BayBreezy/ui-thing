---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
label: New
---

`Questionnaire` renders a real `<form>` and every item renders a `<fieldset>` with a `<legend>`, so answers submit with `FormData` and no extra state is needed. It handles one question at a time, with progress, keyboard navigation, and validation built in.

## Source code

Click :SourceCodeLink{component="Questionnaire"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add questionnaire"}

## Usage

```vue
<template>
  <UiQuestionnaire :items="items" @submit="handleSubmit">
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="direction" required>
      <UiQuestionnaireTitle>What should the agent build next?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>Choose a direction.</UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tool-calls">Tool call timeline</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="approvals">Approval checkpoints</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="timing" required>
      <UiQuestionnaireTitle>When should work begin?</UiQuestionnaireTitle>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="now">Start now</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="backlog">Add it to the backlog</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireSkip />
      <UiQuestionnaireNext />
      <UiQuestionnaireSubmit />
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    { name: "direction", required: true },
    { name: "timing", required: true },
  ];

  function handleSubmit(event: Event) {
    event.preventDefault();

    const answers = new FormData(event.target as HTMLFormElement);
    console.log(Object.fromEntries(answers));
  }
</script>
```

## Composition

Use the following composition to build a questionnaire:

```sh
UiQuestionnaire
├── UiQuestionnaireProgress
├── UiQuestionnaireItem
│   ├── UiQuestionnaireTitle
│   ├── UiQuestionnaireDescription
│   ├── UiQuestionnaireChoices
│   │   ├── UiQuestionnaireChoice
│   │   │   └── UiQuestionnaireChoiceDescription
│   │   └── UiQuestionnaireInput
│   └── UiQuestionnaireError
└── UiQuestionnaireActions
    ├── UiQuestionnairePrevious
    ├── UiQuestionnaireSkip
    ├── UiQuestionnaireNext
    └── UiQuestionnaireSubmit
```

## Server Rendering

Pass `items` to server-render the active item, progress, actions, and answer shortcuts. Without it the questionnaire only learns its order once the items have mounted on the client.

## Features

- One question at a time, with progress, navigation, and validation handled for you
- Single-choice, multiple-choice, freeform, and intentionally skipped answers
- Keyboard shortcuts for choices, plus arrow key navigation between questions and answers
- Declarative `items` for item order, conditional items, and stable shortcut assignment
- Controlled navigation with `v-model:item` for custom validation flows
- Native form reset restores the answers you marked as defaults

## Examples

### Multiple Selection

Use `multiple` for an item that accepts more than one fixed answer.

::prose-show-case

:DocsQuestionnaireMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireMultiple.vue" code lang="vue" -->

```vue [DocsQuestionnaireMultiple.vue]
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
```

<!-- /automd -->

::

### Freeform Answer

Compose `UiQuestionnaireInput` with fixed choices when the user can provide another answer.

::prose-show-case

:DocsQuestionnaireFreeform

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireFreeform.vue" code lang="vue" -->

```vue [DocsQuestionnaireFreeform.vue]
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
```

<!-- /automd -->

::

### Explicit Skip

Add `UiQuestionnaireSkip` when an optional item may be intentionally left unanswered.

::prose-show-case

:DocsQuestionnaireSkip

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireSkip.vue" code lang="vue" -->

```vue [DocsQuestionnaireSkip.vue]
<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    @submit="handleSubmit"
  >
    <UiQuestionnaireProgress />

    <UiQuestionnaireItem name="task" required>
      <UiQuestionnaireTitle>What kind of change is this?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription
        >Choose the category that best describes the work.</UiQuestionnaireDescription
      >
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="feature">New feature</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="fix">Bug fix</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="refactor">Refactor</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="constraints" @update:status="constraintStatus = $event">
      <UiQuestionnaireTitle>Are there any implementation constraints?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Answer if needed, or intentionally skip this question.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="no-dependencies"
          >Do not add dependencies</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="no-migrations"
          >Do not change the database</UiQuestionnaireChoice
        >
        <UiQuestionnaireChoice value="preserve-api">Preserve the public API</UiQuestionnaireChoice>
        <UiQuestionnaireInput
          aria-label="Another implementation constraint"
          placeholder="Describe another constraint…"
        />
      </UiQuestionnaireChoices>
    </UiQuestionnaireItem>

    <UiQuestionnaireItem name="review" required>
      <UiQuestionnaireTitle>How should the work be reviewed?</UiQuestionnaireTitle>
      <UiQuestionnaireDescription>
        Choose the checks the agent should complete before handoff.
      </UiQuestionnaireDescription>
      <UiQuestionnaireChoices>
        <UiQuestionnaireChoice value="tests">Run the test suite</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="diff">Review the final diff</UiQuestionnaireChoice>
        <UiQuestionnaireChoice value="both">Tests and diff review</UiQuestionnaireChoice>
      </UiQuestionnaireChoices>
      <UiQuestionnaireError />
    </UiQuestionnaireItem>

    <UiQuestionnaireActions>
      <UiQuestionnairePrevious />
      <UiQuestionnaireSkip />
      <UiQuestionnaireNext>Next</UiQuestionnaireNext>
      <UiQuestionnaireSubmit>Submit brief</UiQuestionnaireSubmit>
    </UiQuestionnaireActions>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  import type { QuestionnaireItemStatus } from "~/utils/questionnaire";

  const items = [
    { name: "task", required: true },
    { name: "constraints" },
    { name: "review", required: true },
  ] as const;

  const constraintStatus = ref<QuestionnaireItemStatus>("unanswered");

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const constraints =
      constraintStatus.value === "skipped" ? "Skipped" : (formData.get("constraints") ?? "None");

    useSonner("Agent brief submitted", {
      description: `Task: ${formData.get("task") ?? "None"} · Constraints: ${constraints} · Review: ${formData.get("review") ?? "None"}`,
    });
  }
</script>
```

<!-- /automd -->

::

### Shortcuts

Assign a letter or number key to each answer with `shortcuts`. Declare `choices` on `items` so the keys stay stable regardless of the render order.

::prose-show-case

:DocsQuestionnaireShortcuts

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireShortcuts.vue" code lang="vue" -->

```vue [DocsQuestionnaireShortcuts.vue]
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
```

<!-- /automd -->

::

### Custom Validation

Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error.

::prose-show-case

:DocsQuestionnaireValidation

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireValidation.vue" code lang="vue" -->

```vue [DocsQuestionnaireValidation.vue]
<template>
  <UiQuestionnaire
    v-model:item="item"
    class="mx-auto max-w-md"
    :items="items"
    @submit="handleSubmit"
  >
    <UiCard class="w-full">
      <UiQuestionnaireItem :invalid="Boolean(errors.detail)" name="detail" required>
        <UiCardHeader>
          <UiQuestionnaireTitle>How much detail should the answer include?</UiQuestionnaireTitle>
          <UiQuestionnaireDescription>Choose the response depth.</UiQuestionnaireDescription>
          <UiCardAction>
            <UiQuestionnaireProgress v-slot="{ current, total }" class="min-w-0">
              {{ current }} / {{ total }}
            </UiQuestionnaireProgress>
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="summary" @change="clearError('detail')">
              Concise summary
            </UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="complete" @change="clearError('detail')">
              Complete answer
            </UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError>
            <template v-if="errors.detail">
              {{ errors.detail }}
            </template>
          </UiQuestionnaireError>
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiQuestionnaireItem :invalid="Boolean(errors.audience)" name="audience" required>
        <UiCardHeader>
          <UiQuestionnaireTitle>Who will read the answer?</UiQuestionnaireTitle>
          <UiQuestionnaireDescription
            >Public answers require complete context.</UiQuestionnaireDescription
          >
          <UiCardAction>
            <UiQuestionnaireProgress v-slot="{ current, total }" class="min-w-0">
              {{ current }} / {{ total }}
            </UiQuestionnaireProgress>
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="team" @change="clearError('audience')"
              >My team</UiQuestionnaireChoice
            >
            <UiQuestionnaireChoice value="public" @change="clearError('audience')">
              Public audience
            </UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError>
            <template v-if="errors.audience">
              {{ errors.audience }}
            </template>
          </UiQuestionnaireError>
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiCardFooter>
        <UiQuestionnaireActions>
          <UiQuestionnairePrevious />
          <UiQuestionnaireNext>Next</UiQuestionnaireNext>
          <UiQuestionnaireSubmit>Validate answers</UiQuestionnaireSubmit>
        </UiQuestionnaireActions>
      </UiCardFooter>
    </UiCard>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  type ItemName = "detail" | "audience";

  const items = [
    { name: "detail", required: true },
    { name: "audience", required: true },
  ] as const;

  const questionnaireSchema = z
    .object({
      detail: z.enum(["summary", "complete"]),
      audience: z.enum(["team", "public"]),
    })
    .superRefine((answers, context) => {
      if (answers.audience === "public" && answers.detail === "summary") {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Public answers need enough context. Choose a complete answer.",
          path: ["detail"],
        });
      }
    });

  const item = ref<string>("detail");
  const errors = ref<Partial<Record<ItemName, string>>>({});

  function clearError(name: ItemName) {
    if (errors.value[name]) {
      errors.value = { ...errors.value, [name]: undefined };
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const result = questionnaireSchema.safeParse(Object.fromEntries(formData));

    if (result.success) {
      errors.value = {};
      useSonner("Agent response configured", {
        description: `Detail: ${result.data.detail} · Audience: ${result.data.audience}`,
      });
      return;
    }

    const nextErrors: Partial<Record<ItemName, string>> = {};

    for (const issue of result.error.issues) {
      const name = issue.path[0];

      if ((name === "detail" || name === "audience") && !nextErrors[name]) {
        nextErrors[name] = issue.message;
      }
    }

    const firstInvalidItem = result.error.issues[0]?.path[0];

    errors.value = nextErrors;

    if (firstInvalidItem === "detail" || firstInvalidItem === "audience") {
      item.value = firstInvalidItem;
    }
  }
</script>
```

<!-- /automd -->

::

`UiQuestionnaireError` falls back to a built-in message, so only render your own message when you have one:

```vue
<UiQuestionnaireError>
  <template v-if="errors.detail">
    {{ errors.detail }}
  </template>
</UiQuestionnaireError>
```

### Controlled

Control the active item from host state, such as returning to an invalid step. Use `v-model:item`.

::prose-show-case

:DocsQuestionnaireControlled

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireControlled.vue" code lang="vue" -->

```vue [DocsQuestionnaireControlled.vue]
<template>
  <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
    <p class="text-muted-foreground absolute end-0 top-0 text-sm" role="status">
      Current checkpoint: {{ label }}
    </p>

    <UiQuestionnaire v-model:item="item" class="mt-auto" :items="items" @submit="handleSubmit">
      <UiQuestionnaireProgress />

      <UiQuestionnaireItem name="scope" required>
        <UiQuestionnaireTitle>What may the agent change?</UiQuestionnaireTitle>
        <UiQuestionnaireDescription>
          The host stores the active checkpoint while Questionnaire navigates.
        </UiQuestionnaireDescription>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="component">Only the target component</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="tests">Component and related tests</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="feature">The complete feature area</UiQuestionnaireChoice>
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="checks" required>
        <UiQuestionnaireTitle>Which verification level should it use?</UiQuestionnaireTitle>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="targeted">Targeted tests</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="package">Package tests and typecheck</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="full">Full workspace verification</UiQuestionnaireChoice>
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="output" required>
        <UiQuestionnaireTitle>What should the agent return when finished?</UiQuestionnaireTitle>
        <UiQuestionnaireChoices>
          <UiQuestionnaireChoice value="summary">Concise summary</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="diff">Summary with changed files</UiQuestionnaireChoice>
          <UiQuestionnaireChoice value="handoff"
            >Detailed implementation handoff</UiQuestionnaireChoice
          >
        </UiQuestionnaireChoices>
        <UiQuestionnaireError />
      </UiQuestionnaireItem>

      <UiQuestionnaireActions>
        <UiQuestionnairePrevious />
        <UiQuestionnaireNext>Next</UiQuestionnaireNext>
        <UiQuestionnaireSubmit>Save workflow</UiQuestionnaireSubmit>
      </UiQuestionnaireActions>
    </UiQuestionnaire>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { name: "scope", required: true },
    { name: "checks", required: true },
    { name: "output", required: true },
  ] as const;

  const itemLabels: Record<string, string> = {
    scope: "Change scope",
    checks: "Verification",
    output: "Final output",
  };

  const item = ref("scope");
  const label = computed(() => itemLabels[item.value]);

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Agent workflow configured", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("checks") ?? "None"} · Output: ${formData.get("output") ?? "None"}`,
    });
  }
</script>
```

<!-- /automd -->

::

### Resume

Restore a saved active item and default answers, then reset changes back to that saved state.

::prose-show-case

:DocsQuestionnaireResume

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireResume.vue" code lang="vue" -->

```vue [DocsQuestionnaireResume.vue]
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
```

<!-- /automd -->

::

### Conditional Items

Disable items that do not apply to the user's earlier answers.

::prose-show-case

:DocsQuestionnaireConditional

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireConditional.vue" code lang="vue" -->

```vue [DocsQuestionnaireConditional.vue]
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
```

<!-- /automd -->

::

### Navigation State

Read item status to opt into disabled navigation and custom action styling. Listen to `@update:status` on the items you want to track.

::prose-show-case

:DocsQuestionnaireNavigationState

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireNavigationState.vue" code lang="vue" -->

```vue [DocsQuestionnaireNavigationState.vue]
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
```

<!-- /automd -->

::

### Custom Progress

Use the progress slot state to build a custom progress indicator. `UiQuestionnaireProgress` exposes `current`, `total`, `first`, and `last`.

::prose-show-case

:DocsQuestionnaireProgress

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireProgress.vue" code lang="vue" -->

```vue [DocsQuestionnaireProgress.vue]
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
```

<!-- /automd -->

::

### Animated Items

Animate the active item while keeping progress and navigation stationary. The active item is marked with `data-active`.

::prose-show-case

:DocsQuestionnaireAnimated

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireAnimated.vue" code lang="vue" -->

```vue [DocsQuestionnaireAnimated.vue]
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
```

<!-- /automd -->

::

### Card

Compose Questionnaire with Card slots while keeping the question title and description semantic. Use `as-child` to render a part as another component:

```vue
<UiQuestionnaireTitle as-child>
  <UiCardTitle>What should the agent work on?</UiCardTitle>
</UiQuestionnaireTitle>
```

::prose-show-case

:DocsQuestionnaireCard

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireCard.vue" code lang="vue" -->

```vue [DocsQuestionnaireCard.vue]
<template>
  <UiQuestionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    shortcuts="numbers"
    @submit="handleSubmit"
  >
    <UiCard>
      <UiQuestionnaireItem name="task" required>
        <UiCardHeader>
          <UiQuestionnaireTitle as-child>
            <UiCardTitle>What should the agent work on?</UiCardTitle>
          </UiQuestionnaireTitle>
          <UiQuestionnaireDescription as-child>
            <UiCardDescription>Choose the task that should be handled next.</UiCardDescription>
          </UiQuestionnaireDescription>
          <UiCardAction>
            <UiQuestionnaireProgress />
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="fix">Fix the failing tests</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="refactor">Refactor the data layer</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="docs">Update the integration guide</UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiQuestionnaireItem name="output" required>
        <UiCardHeader>
          <UiQuestionnaireTitle as-child>
            <UiCardTitle>What should the final handoff include?</UiCardTitle>
          </UiQuestionnaireTitle>
          <UiQuestionnaireDescription as-child>
            <UiCardDescription>Pick the level of detail needed for review.</UiCardDescription>
          </UiQuestionnaireDescription>
          <UiCardAction>
            <UiQuestionnaireProgress />
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent>
          <UiQuestionnaireChoices>
            <UiQuestionnaireChoice value="summary">Summary only</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="files">Summary and changed files</UiQuestionnaireChoice>
            <UiQuestionnaireChoice value="review">Full review handoff</UiQuestionnaireChoice>
          </UiQuestionnaireChoices>
          <UiQuestionnaireError />
        </UiCardContent>
      </UiQuestionnaireItem>

      <UiCardFooter>
        <UiQuestionnaireActions class="w-full">
          <UiQuestionnairePrevious />
          <UiQuestionnaireNext>Next</UiQuestionnaireNext>
          <UiQuestionnaireSubmit>Create task</UiQuestionnaireSubmit>
        </UiQuestionnaireActions>
      </UiCardFooter>
    </UiCard>
  </UiQuestionnaire>
</template>

<script lang="ts" setup>
  const items = [
    {
      choices: [{ value: "fix" }, { value: "refactor" }, { value: "docs" }],
      name: "task",
      required: true,
    },
    {
      choices: [{ value: "summary" }, { value: "files" }, { value: "review" }],
      name: "output",
      required: true,
    },
  ] as const;

  function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    useSonner("Agent task created", {
      description: `Task: ${formData.get("task") ?? "None"} · Handoff: ${formData.get("output") ?? "None"}`,
    });
  }
</script>
```

<!-- /automd -->

::

`UiQuestionnaireProgress`, `UiQuestionnaireTitle`, `UiQuestionnaireDescription`, `UiQuestionnaireChoices`, `UiQuestionnaireError`, `UiQuestionnaireActions`, and the four navigation buttons all accept `as` and `as-child`. `as-child` on the title replaces the `legend` that names the item, so the item labels itself with the rendered title instead. The title and description keep the id of the child they render.

### Dialog

Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.

::prose-show-case

:DocsQuestionnaireDialog

#code

<!-- automd:file src="../../app/components/content/Docs/Questionnaire/DocsQuestionnaireDialog.vue" code lang="vue" -->

```vue [DocsQuestionnaireDialog.vue]
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
```

<!-- /automd -->

::

## Keyboard navigation

| Key                          | Description                                                                |
| ----------------------------- | --------------------------------------------------------------------------- |
| `Arrow Down`                 | Moves focus to the next answer.                                            |
| `Arrow Up`                   | Moves focus to the previous answer.                                        |
| `Arrow Right`                | Moves to the next question once the current one is answered.              |
| `Arrow Left`                 | Moves to the previous question.                                            |
| `Enter`                      | Confirms the focused answer and moves on, or submits on the last question. |
| `Meta+Enter` / `Ctrl+Enter`  | Confirms the active question from anywhere in the form.                   |
| `A` – `Z` / `1` – `9`        | Selects the matching choice when `shortcuts` is set.                      |

## Accessibility

`UiQuestionnaireItem` renders a `fieldset` with a `legend`, so every question is announced with its answers. Descriptions and errors are associated with the item through `aria-describedby`, and an invalid item exposes `aria-invalid`.

`UiQuestionnaireProgress` renders a named `progressbar` that announces the current question. Inactive items are `hidden` and `inert`, so they stay out of the tab order and the accessibility tree.

Navigation actions are real buttons. `UiQuestionnaireSubmit` submits the form, so a questionnaire keeps working with browser autofill and native form submission.

## API Reference

### Questionnaire

The root form. Manages the active item, progress, validation, and keyboard navigation.

| Prop          | Type                           | Default | Description                                                                        |
| ------------- | ------------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `items`       | `QuestionnaireItemDefinition[]` | -       | Declares item order, `required`, `disabled`, and the `choices` used for shortcuts. |
| `item`        | `string`                        | -       | The active item. Use with `v-model:item`.                                          |
| `defaultItem` | `string`                        | -       | The item shown first. Ignored when `item` is provided.                             |
| `shortcuts`   | `"letters" \| "numbers"`        | -       | Assigns a keyboard shortcut to every choice.                                       |
| `noValidate`  | `boolean`                       | `true`  | Set to `false` to run native constraint validation on answered items.              |
| `class`       | `HTMLAttributes["class"]`       | -       | Additional classes to apply to the form.                                           |

| Emit          | Payload  | Description                                                              |
| ------------- | -------- | -------------------------------------------------------------------------- |
| `update:item` | `string` | The active item changed.                                                 |
| `submit`      | `Event`  | Every item is valid. Call `event.preventDefault()` to handle it yourself. |
| `reset`       | `Event`  | The form was reset. Call `event.preventDefault()` to keep the answers.   |

### QuestionnaireProgress

A `progressbar` announcing the active question. Exposes `current`, `total`, `first`, and `last` to its default slot.

| Prop      | Type                      | Default | Description                                     |
| --------- | -------------------------- | ------- | -------------------------------------------------- |
| `class`   | `HTMLAttributes["class"]` | -       | Additional classes to apply to the progress bar. |
| `as`      | `AsTag \| Component`      | `"div"` | The element or component to render as.          |
| `asChild` | `boolean`                 | `false` | Render the child element instead.               |

### QuestionnaireItem

A single question, rendered as a `fieldset`. Only the active item is visible.

| Prop       | Type                      | Default | Description                                                                |
| ---------- | -------------------------- | ------- | ----------------------------------------------------------------------------- |
| `name`     | `string`                  | -       | Required. The name the answer submits under.                              |
| `required` | `boolean`                 | `false` | Requires an answer before the questionnaire can continue.                 |
| `multiple` | `boolean`                 | `false` | Renders choices as checkboxes and keeps every selected answer.            |
| `disabled` | `boolean`                 | `false` | Removes the item from the flow without unmounting it.                     |
| `invalid`  | `boolean`                 | `false` | Marks the item invalid from outside, for example after schema validation. |
| `class`    | `HTMLAttributes["class"]` | -       | Additional classes to apply to the item.                                  |

| Emit            | Payload                                   | Description              |
| --------------- | ------------------------------------------ | --------------------------- |
| `update:status` | `"unanswered" \| "answered" \| "skipped"` | The item status changed. |

### QuestionnaireTitle

The question, rendered as a `legend`.

| Prop      | Type                      | Default    | Description                              |
| --------- | -------------------------- | ---------- | ------------------------------------------- |
| `class`   | `HTMLAttributes["class"]` | -          | Additional classes to apply to the title. |
| `as`      | `AsTag \| Component`      | `"legend"` | The element or component to render as.   |
| `asChild` | `boolean`                 | `false`    | Render the child element instead.        |

### QuestionnaireDescription

Help text associated with the item through `aria-describedby`.

| Prop      | Type                      | Default | Description                                     |
| --------- | -------------------------- | ------- | --------------------------------------------------- |
| `id`      | `string`                  | -       | Overrides the generated id.                     |
| `as`      | `AsTag \| Component`      | `"p"`   | The element or component to render as.          |
| `asChild` | `boolean`                 | `false` | Render the child element instead.               |
| `class`   | `HTMLAttributes["class"]` | -       | Additional classes to apply to the description. |

### QuestionnaireChoices

The answer list. Wraps choices and an optional freeform input.

| Prop      | Type                      | Default | Description                             |
| --------- | -------------------------- | ------- | ------------------------------------------- |
| `class`   | `HTMLAttributes["class"]` | -       | Additional classes to apply to the list. |
| `as`      | `AsTag \| Component`      | `"div"` | The element or component to render as.  |
| `asChild` | `boolean`                 | `false` | Render the child element instead.       |

### QuestionnaireChoice

A single answer, rendered as a radio or a checkbox depending on the item.

| Prop             | Type                      | Default | Description                                               |
| ----------------- | -------------------------- | ------- | -------------------------------------------------------------- |
| `value`          | `string`                  | -       | Required. The submitted value.                            |
| `checked`        | `boolean`                 | -       | Controlled checked state. Use with `v-model:checked`.     |
| `defaultChecked` | `boolean`                 | `false` | Checks the choice on mount and after a native form reset. |
| `disabled`       | `boolean`                 | `false` | Disables the choice.                                       |
| `class`          | `HTMLAttributes["class"]` | -       | Additional classes to apply to the choice.                |

| Emit             | Payload   | Description                       |
| ----------------- | --------- | ------------------------------------ |
| `update:checked` | `boolean` | The choice was checked or cleared. |
| `change`         | `Event`   | The native change event.          |

### QuestionnaireChoiceDescription

Secondary text inside a choice.

| Prop    | Type                      | Default | Description                                     |
| ------- | -------------------------- | ------- | --------------------------------------------------- |
| `class` | `HTMLAttributes["class"]` | -       | Additional classes to apply to the description. |

### QuestionnaireInput

A freeform answer. Answers the item while it holds a value, and submits under the item name.

| Prop           | Type                      | Default  | Description                                         |
| -------------- | -------------------------- | -------- | ------------------------------------------------------- |
| `modelValue`   | `string \| number`        | -        | Controlled value. Use with `v-model`.               |
| `defaultValue` | `string \| number`        | -        | Fills the answer on mount and after a native reset. |
| `type`         | `QuestionnaireInputType`  | `"text"` | The input type.                                     |
| `disabled`     | `boolean`                 | `false`  | Disables the input.                                 |
| `class`        | `HTMLAttributes["class"]` | -        | Additional classes to apply to the input.           |

### QuestionnaireError

The item error. Hidden until the item is invalid, and falls back to a built-in message.

| Prop      | Type                      | Default | Description                             |
| --------- | -------------------------- | ------- | ------------------------------------------- |
| `id`      | `string`                  | -       | Overrides the generated id.             |
| `as`      | `AsTag \| Component`      | `"p"`   | The element or component to render as.  |
| `asChild` | `boolean`                 | `false` | Render the child element instead.       |
| `class`   | `HTMLAttributes["class"]` | -       | Additional classes to apply to the error. |

### QuestionnaireActions

The navigation row.

| Prop      | Type                      | Default | Description                            |
| --------- | -------------------------- | ------- | ------------------------------------------ |
| `class`   | `HTMLAttributes["class"]` | -       | Additional classes to apply to the row. |
| `as`      | `AsTag \| Component`      | `"div"` | The element or component to render as.  |
| `asChild` | `boolean`                 | `false` | Render the child element instead.       |

### QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, and QuestionnaireSubmit

Navigation buttons. Each one hides itself when it does not apply: `QuestionnairePrevious` on the first item, `QuestionnaireSkip` on required items, `QuestionnaireNext` on the last item, and `QuestionnaireSubmit` everywhere but the last item.

| Prop       | Type                        | Default                   | Description                             |
| ---------- | ----------------------------- | ---------------------------- | -------------------------------------------- |
| `variant`  | `ButtonVariants["variant"]`  | `"outline"` / `"default"` | The button variant.                     |
| `size`     | `ButtonVariants["size"]`     | `"default"`                | The button size.                        |
| `disabled` | `boolean`                    | `false`                    | Disables the button.                    |
| `as`       | `AsTag \| Component`         | `"button"`                 | The element or component to render as.  |
| `asChild`  | `boolean`                    | `false`                    | Render the child element instead.       |
| `class`    | `HTMLAttributes["class"]`    | -                           | Additional classes to apply to the button. |
