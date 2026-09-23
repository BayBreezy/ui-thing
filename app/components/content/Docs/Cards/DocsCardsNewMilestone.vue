<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Set a new milestone</UiCardTitle>
      <UiCardDescription>
        Define your financial target and we'll help you pace your savings.
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <UiFieldGroup>
        <UiField>
          <UiFieldLabel for="goal-name">Goal Name</UiFieldLabel>
          <UiInput id="goal-name" placeholder="e.g. New Car, Home Downpayment" />
        </UiField>
        <div class="grid grid-cols-2 gap-3">
          <UiField>
            <UiFieldLabel for="target-amount">Target Amount</UiFieldLabel>
            <UiInput id="target-amount" default-value="$15,000" />
          </UiField>
          <UiField>
            <UiFieldLabel for="target-date">Target Date</UiFieldLabel>
            <UiInput id="target-date" default-value="Dec 2025" />
          </UiField>
        </div>
      </UiFieldGroup>
    </UiCardContent>
    <UiCardFooter class="flex-col gap-2">
      <UiButton class="w-full"> Create Goal </UiButton>
      <UiButton variant="outline" class="w-full"> Cancel </UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup></script>
