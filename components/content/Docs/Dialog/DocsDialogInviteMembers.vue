<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Invite members" />
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user-round-plus" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="*:text-left">
            <UiDialogTitle>Invite team members</UiDialogTitle>
            <UiDialogDescription>Invite teammates to earn free components.</UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <UiLabel>Invite via email</UiLabel>

          <fieldset :disabled="isSubmitting" class="mt-2 grid grid-cols-1 gap-4">
            <UiScrollArea type="auto" class="max-h-[300px] pr-3">
              <TransitionSlide
                :offset="[0, 16]"
                :move-duration="300"
                group
                class="grid grid-cols-1 p-1"
              >
                <template v-for="(field, idx) in fields" :key="field.key">
                  <div class="flex items-center gap-2 pb-4">
                    <UiVeeInput
                      v-model="field.value as string"
                      placeholder="hi@mycompany.com"
                      type="email"
                      required
                    />
                    <UiButton
                      v-if="fields.length > 1"
                      class="shrink-0"
                      size="icon"
                      variant="ghost"
                      @click="remove(idx)"
                    >
                      <span class="sr-only">Delete this record</span>
                      <Icon class="text-muted-foreground" name="lucide:trash-2" size="16" />
                    </UiButton>
                  </div>
                </template>
              </TransitionSlide>
            </UiScrollArea>
            <div>
              <button
                type="button"
                class="text-sm underline underline-offset-2 hover:no-underline"
                @click="prepend('')"
              >
                <span>+ Add another</span>
              </button>
            </div>
            <UiButton type="submit" class="w-full" text="Send invites" />
          </fieldset>
        </form>
        <UiDivider class="mt-2" />
        <UiVeeInput
          label="Invite via magic link"
          readonly
          model-value="https://ui-thing.com/refer/87689"
        >
          <template #trailingIcon>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center justify-center disabled:opacity-100"
                  :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
                  :disabled="copied"
                  @click="copy('https://ui-thing.com/refer/87689')"
                >
                  <TransitionScale mode="out-in">
                    <Icon
                      v-if="!copied"
                      class="text-muted-foreground/60"
                      name="lucide:copy"
                      size="16"
                      aria-hidden="true"
                    />
                    <Icon
                      v-else
                      name="lucide:check"
                      size="16"
                      aria-hidden="true"
                      class="text-emerald-500"
                    />
                  </TransitionScale>
                </button>
              </UiTooltipTrigger>
              <UiTooltipContent align="center" class="px-2 py-1 text-xs">
                Click to copy
              </UiTooltipContent>
            </UiTooltip>
          </template>
        </UiVeeInput>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { copied, copy } = useClipboard();
  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-invite-members",
    initialValues: {
      members: ["", "mur@ha.pw"],
    },
    validationSchema: toTypedSchema(
      z.object({
        members: z.array(z.string().email()).min(1),
      })
    ),
  });

  const { remove, fields, prepend } = useFieldArray("members");
  const open = defineModel<boolean>({ default: false });
  const submit = handleSubmit(async (v) => {
    try {
      useSonner.success("Invitations Sent", {
        description: `${v.members.length} invitations were successfully sent`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while sending invitations", {
        description: error.message,
      });
    }
  });
</script>
