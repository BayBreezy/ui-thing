<template>
  <div class="flex w-full justify-center">
    <form class="w-full" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="email">
        <UiFormItem label="Primary email" description="This will be shown to the public">
          <UiSelect v-bind="componentField">
            <UiSelectTrigger placeholder="Select primary email" />
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="(e, i) in emails" :key="i" :value="e" :text="e" />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit"> Update profile </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const emails = ["m@support.com", "m@google.com", "m@example.com"];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z
          .string({
            required_error: "Please select an email",
          })
          .email(),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    toast({
      title: "Profile updated",
      description: h("pre", { class: "p-2" }, JSON.stringify(data, null, 2)),
      variant: "success",
    });
  });
</script>
