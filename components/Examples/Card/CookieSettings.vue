<template>
  <UICard description="Manage your cookie settings here.">
    <template #title>
      <UICardTitle class="text-xl">Cookie Settings</UICardTitle>
    </template>
    <template #content>
      <UICardContent class="grid gap-6">
        <div class="flex justify-between space-x-2">
          <UILabel for="necessary" class="flex flex-col space-y-1">
            <span>Strictly Necessary</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies are essential in order to use the website and use its features.
            </span>
          </UILabel>
          <UISwitch id="necessary" checked />
        </div>
        <div class="flex justify-between space-x-2">
          <UILabel for="functional" class="flex flex-col space-y-1">
            <span>Functional Cookies</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies allow the website to provide personalized functionality.
            </span>
          </UILabel>
          <UISwitch id="functional" />
        </div>
        <div class="flex justify-between space-x-2">
          <UILabel for="performance" class="flex flex-col space-y-1">
            <span>Performance Cookies</span>
            <span class="font-normal leading-snug text-muted-foreground">
              These cookies help to improve the performance of the website.
            </span>
          </UILabel>
          <UISwitch id="performance" />
        </div>
      </UICardContent>
    </template>
    <template #footer>
      <UICardFooter class="justify-between">
        <UIButton variant="outline" class="w-full">Save preferences</UIButton>
      </UICardFooter>
    </template>
  </UICard>
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
