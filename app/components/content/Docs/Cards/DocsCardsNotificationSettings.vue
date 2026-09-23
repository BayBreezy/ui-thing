<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Notifications</UiCardTitle>
      <UiCardDescription>Choose which email and push alerts you want to receive.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <UiFieldGroup>
        <UiField v-for="n in notifications" :key="n.id" orientation="horizontal">
          <UiCheckbox :id="`notify-${n.id}`" :default-value="n.defaultChecked" />
          <UiFieldContent>
            <UiFieldLabel :for="`notify-${n.id}`">{{ n.label }}</UiFieldLabel>
            <UiFieldDescription>{{ n.description }}</UiFieldDescription>
          </UiFieldContent>
        </UiField>
      </UiFieldGroup>
    </UiCardContent>
    <UiCardFooter>
      <UiButton class="w-full"> Save Preferences </UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const notifications = [
    {
      id: "transactions",
      label: "Transaction alerts",
      description: "Deposits, withdrawals, and transfers.",
      defaultChecked: true,
    },
    {
      id: "security",
      label: "Security alerts",
      description: "Login attempts and account changes.",
      defaultChecked: true,
    },
    {
      id: "goals",
      label: "Goal milestones",
      description: "Updates at 25%, 50%, 75%, and 100%.",
      defaultChecked: false,
    },
    {
      id: "market",
      label: "Market updates",
      description: "Daily portfolio summary and price alerts.",
      defaultChecked: false,
    },
  ];
</script>
