<template>
  <form @submit="submitReport">
    <UiCard description="What area are you having problems with?">
      <template #title>
        <UiCardTitle class="text-xl"> Report an issue </UiCardTitle>
      </template>
      <template #content>
        <UiCardContent class="grid gap-6">
          <div class="grid grid-cols-2 gap-4">
            <UiFormSelect label="Area" name="area" placeholder="Area">
              <template #content>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="m in areaOptions"
                    :key="m"
                    :value="m"
                    :text-value="m"
                    :text="m"
                  />
                </UiSelectContent>
              </template>
            </UiFormSelect>
            <UiFormSelect label="Security Level" name="securityLevel" placeholder="Level">
              <template #content>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="m in securityLevels"
                    :key="m"
                    :value="m"
                    :text-value="m"
                    :text="m"
                  />
                </UiSelectContent>
              </template>
            </UiFormSelect>
          </div>
          <UiVeeInput label="Subject" name="subject" placeholder="I need help with..." />
          <UiVeeTextarea
            label="Description"
            name="description"
            placeholder="Please include all information relevant to your issue."
          />
        </UiCardContent>
      </template>
      <template #footer>
        <UiCardFooter class="justify-between">
          <UiButton variant="ghost" @click="handleReset()">Cancel</UiButton>
          <UiButton type="submit">Continue</UiButton>
        </UiCardFooter>
      </template>
    </UiCard>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const ReportSchema = z.object({
    area: z.string({ required_error: "Area is required" }),
    securityLevel: z.string({ required_error: "Security level is required" }),
    subject: z.string({ required_error: "Subject is required" }),
    description: z.string({ required_error: "Description is required" }),
  });

  const { handleSubmit, handleReset } = useForm({
    validationSchema: toTypedSchema(ReportSchema),
  });

  const submitReport = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Submitting your report...",
        success: (_) => {
          res();
          return "Your report has been submitted!";
        },
        error: (e) => {
          rej(e);
          return "Error! Your report could not be sent to our servers!";
        },
      });
    });
  });

  const areaOptions = ["Team", "Billing", "Account", "Deployments", "Support"];
  const securityLevels = [
    "Severity 1 (Highest)",
    "Severity 2",
    "Severity 3",
    "Severity 4 (Lowest)",
  ];
</script>
