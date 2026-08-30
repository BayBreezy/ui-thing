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
