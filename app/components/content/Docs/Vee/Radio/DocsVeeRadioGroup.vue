<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeRadioGroup name="notify" label="Select how you want to be notified">
        <template v-for="(opt, i) in options" :key="i">
          <div class="mb-2 flex items-center gap-3">
            <UiRadioGroupItem :id="opt.value" :value="opt.value" />
            <UiLabel :for="opt.value">{{ opt.text }}</UiLabel>
          </div>
        </template>
      </UiVeeRadioGroup>
      <UiButton type="submit"> Update settings </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const options = [
    { text: "Send me emails only", value: "email" },
    { text: "Send me SMS only", value: "sms" },
    { text: "Call me", value: "call" },
    { text: "Don't notify me", value: "none" },
  ] as const;

  const schema = z.object({
    notify: z.enum(["email", "sms", "call", "none"], {
      required_error: "Please select a notification method",
    }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Updating your settings...",
        success: (_) => {
          res();
          return values.notify === "none"
            ? "You will no longer receive notifications"
            : `You will be notified by ${values.notify}`;
        },
        error: (e) => {
          rej(e);
          return "Error! Your information could not be sent to our servers!";
        },
      });
    });
  });
</script>
