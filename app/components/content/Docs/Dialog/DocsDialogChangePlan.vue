<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Change plan" />
      </UiDialogTrigger>

      <UiDialogContent class="max-w-[400px]">
        <div class="mb-2 flex flex-col gap-2">
          <UiFancyIcon circle class="mb-2">
            <Icon name="lucide:refresh-ccw" class="size-5 opacity-80" />
          </UiFancyIcon>
          <UiDialogHeader>
            <UiDialogTitle class="text-left">Change your plan</UiDialogTitle>
            <UiDialogDescription class="text-left">
              Pick one of the following plans.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <UiRadioGroup class="gap-2" default-value="plan-02">
            <div
              v-for="(plan, index) in plans"
              :key="index"
              class="relative flex w-full items-center gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent md:gap-2"
            >
              <UiRadioGroupItem
                :id="plan.value"
                :value="plan.value"
                :aria-labelledby="`${plan.value}-description`"
                class="order-1 after:absolute after:inset-0"
              />
              <div class="grid grow gap-1">
                <UiLabel class="text-base md:text-base" :for="plan.value">{{ plan.name }}</UiLabel>
                <p :id="`${plan.value}-description`" class="text-muted-foreground md:text-sm">
                  {{ plan.price }}
                </p>
              </div>
            </div>
          </UiRadioGroup>

          <div class="space-y-3">
            <p>
              <strong class="font-medium md:text-sm">Features include:</strong>
            </p>
            <ul class="flex flex-col gap-3 text-muted-foreground md:text-sm">
              <li v-for="f in features" :key="f" class="flex gap-2">
                <Icon
                  name="lucide:circle-check"
                  class="mt-0.5 size-6 shrink-0 text-primary md:size-4"
                  aria-hidden="true"
                />
                {{ f }}
              </li>
            </ul>
          </div>

          <div class="grid gap-2">
            <UiButton type="button" class="w-full"> Change plan </UiButton>
            <UiDialogClose as-child>
              <UiButton type="button" variant="ghost" class="w-full"> Cancel </UiButton>
            </UiDialogClose>
          </div>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const plans = [
    { name: "Essential", price: "$4 per member/month", value: "plan-01" },
    { name: "Standard", price: "$19 per member/month", value: "plan-02" },
    { name: "Enterprise", price: "$32 per member/month", value: "plan-03" },
  ];

  const features = [
    "Create unlimited projects.",
    "Remove watermarks.",
    "Add unlimited users and free viewers.",
    "Upload unlimited files.",
    "7-day money back guarantee.",
    "Advanced permissions.",
  ];

  const open = defineModel<boolean>({ default: false });
</script>
