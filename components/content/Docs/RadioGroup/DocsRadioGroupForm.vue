<template>
  <div class="flex w-full justify-center">
    <form @submit="onSubmit">
      <Field name="type" v-slot="{ componentField }">
        <UIFormItem class="space-y-5">
          <p class="font-medium">What type of notifications should we send?</p>
          <UIRadioGroup v-bind="componentField">
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="All notifications"
            >
              <UIRadioGroupItem value="all" />
            </UIFormItem>
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Only mentions"
            >
              <UIRadioGroupItem value="mentions" />
            </UIFormItem>
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Nothing"
            >
              <UIRadioGroupItem value="none" />
            </UIFormItem>
          </UIRadioGroup>
        </UIFormItem>
      </Field>
      <div class="mt-6">
        <UIButton type="submit">Update settings</UIButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        type: z.enum(["all", "mentions", "none"], {
          required_error: "You need to select a notification type.",
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
