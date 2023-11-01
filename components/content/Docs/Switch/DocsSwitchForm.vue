<template>
  <form @submit="onSubmit" class="flex w-full justify-center">
    <div class="w-full">
      <Field name="mode" v-slot="{ handleChange, value }">
        <UIFormItem class="flex flex-col">
          <div class="flex items-center gap-3">
            <UISwitch :checked="value" @update:checked="handleChange" />
            <UIFormLabel class="w-auto"> Airplane mode </UIFormLabel>
          </div>
        </UIFormItem>
      </Field>
      <div class="mt-4">
        <UIButton type="submit" size="sm"> Update </UIButton>
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
