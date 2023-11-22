<template>
  <form @submit="onSubmit" class="flex w-full justify-center">
    <div class="w-full">
      <Field name="mode" v-slot="{ handleChange, value }">
        <UiFormItem class="flex flex-col">
          <div class="flex items-center gap-3">
            <UiSwitch :checked="value" @update:checked="handleChange" />
            <UiFormLabel class="w-auto"> Airplane mode </UiFormLabel>
          </div>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit" size="sm"> Update </UiButton>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        mode: z.literal(true, {
          errorMap: (iss, ctx) => {
            return { message: "Please turn on airplane mode" };
          },
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    useSonner.success("Mode changed", {
      description: `Airplane mode is ${data.mode ? "on" : "off"}`,
    });
  });
</script>
