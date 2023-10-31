<template>
  <Form @submit="submitReport" :validation-schema="ReportSchema" v-slot="{ handleReset }">
    <UICard description="What area are you having problems with?">
      <template #title>
        <UICardTitle class="text-xl"> Report an issue </UICardTitle>
      </template>
      <template #content>
        <UICardContent class="grid gap-6">
          <div class="grid grid-cols-2 gap-4">
            <UIFormSelect label="Area" name="area" placeholder="Area">
              <template #content>
                <UISelectContent>
                  <UISelectItem
                    v-for="m in areaOptions"
                    :key="m"
                    :value="m"
                    :text-value="m"
                    :text="m"
                  />
                </UISelectContent>
              </template>
            </UIFormSelect>
            <UIFormSelect label="Security Level" name="securityLevel" placeholder="Level">
              <template #content>
                <UISelectContent>
                  <UISelectItem
                    v-for="m in securityLevels"
                    :key="m"
                    :value="m"
                    :text-value="m"
                    :text="m"
                  />
                </UISelectContent>
              </template>
            </UIFormSelect>
          </div>
          <UIFormInput label="Subject" name="subject" placeholder="I need help with..." />
          <UIFormTextarea
            label="Description"
            name="description"
            placeholder="Please include all information relevant to your issue."
          />
        </UICardContent>
      </template>
      <template #footer>
        <UICardFooter class="justify-between">
          <UIButton @click="handleReset()" variant="ghost">Cancel</UIButton>
          <UIButton type="submit">Continue</UIButton>
        </UICardFooter>
      </template>
    </UICard>
  </Form>
</template>

<script lang="ts" setup>
  import { addYears } from "date-fns";
  import { z } from "zod";

  const ReportSchema = z.object({
    area: z.string({ required_error: "Area is required" }),
    securityLevel: z.string({ required_error: "Security level is required" }),
    subject: z.string({ required_error: "Subject is required" }),
    description: z.string({ required_error: "Description is required" }),
  });

  const submitReport = (values: any) => {
    console.log(values);
  };

  const areaOptions = ["Team", "Billing", "Account", "Deployments", "Support"];
  const securityLevels = [
    "Severity 1 (Highest)",
    "Severity 2",
    "Severity 3",
    "Severity 4 (Lowest)",
  ];
</script>
