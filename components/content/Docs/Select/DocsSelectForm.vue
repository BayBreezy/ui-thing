<template>
  <div class="flex w-full justify-center">
    <form class="w-full" @submit="onSubmit">
      <Field name="email" v-slot="{ componentField }">
        <UIFormItem label="Primary email" description="This will be shown to the public">
          <UISelect v-bind="componentField">
            <UISelectTrigger placeholder="Select primary email" />
            <UISelectContent>
              <UISelectGroup>
                <UISelectItem v-for="(e, i) in emails" :key="i" :value="e" :text="e" />
              </UISelectGroup>
            </UISelectContent>
          </UISelect>
        </UIFormItem>
      </Field>
      <div class="mt-4">
        <UIButton type="submit"> Update profile </UIButton>
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
    alert(JSON.stringify(data, null, 2));
  });
</script>
