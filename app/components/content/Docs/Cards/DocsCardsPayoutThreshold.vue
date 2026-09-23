<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Payout Threshold</UiCardTitle>
      <UiCardDescription>
        Set the minimum balance required before a payout is triggered.
      </UiCardDescription>
      <UiCardAction>
        <UiButton
          variant="ghost"
          size="icon-sm"
          class="bg-muted"
          aria-label="Dismiss payout threshold"
        >
          <Icon name="lucide:x" />
        </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent>
      <UiFieldGroup>
        <UiField>
          <UiFieldLabel for="preferred-currency">Preferred Currency</UiFieldLabel>
          <UiSelect default-value="usd">
            <UiSelectTrigger id="preferred-currency" class="w-full">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="item in currencies" :key="item.value" :value="item.value">
                  {{ item.label }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiField>
        <UiField>
          <div class="flex items-baseline justify-between">
            <UiFieldLabel id="min-payout-label">Minimum Payout Amount</UiFieldLabel>
            <span class="text-2xl font-semibold tabular-nums">$2500.00</span>
          </div>
          <UiProgress
            :model-value="25"
            aria-labelledby="min-payout-label"
            aria-valuetext="$2,500 of $10,000"
          />
          <div class="flex items-center justify-between">
            <UiFieldDescription>$50 (MIN)</UiFieldDescription>
            <UiFieldDescription>$10,000 (MAX)</UiFieldDescription>
          </div>
        </UiField>
        <UiField>
          <UiFieldLabel for="payout-notes">Notes</UiFieldLabel>
          <UiTextarea
            id="payout-notes"
            placeholder="Add any notes for this payout configuration..."
            class="min-h-[100px]"
          />
        </UiField>
      </UiFieldGroup>
    </UiCardContent>
    <UiCardFooter>
      <UiButton class="w-full"> Save Threshold </UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const currencies = [
    { label: "USD — United States Dollar", value: "usd" },
    { label: "EUR — Euro", value: "eur" },
    { label: "GBP — British Pound", value: "gbp" },
    { label: "JPY — Japanese Yen", value: "jpy" },
  ];
</script>
