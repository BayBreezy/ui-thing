<template>
  <UiCard>
    <UiCardHeader>
      <UiCardDescription>Claimable Balance</UiCardDescription>
      <UiCardTitle class="text-4xl tabular-nums">
        ${{ formatCurrency(totalClaimable) }}
      </UiCardTitle>
      <UiBadge variant="outline">
        <span class="bg-primary size-2 rounded-full" />
        Pending Setup
      </UiBadge>
    </UiCardHeader>
    <UiCardContent class="flex flex-1 flex-col justify-end">
      <UiItem variant="muted" class="flex-col items-stretch">
        <UiItemContent class="gap-3">
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground text-sm">Net Royalties</span>
            <span class="text-sm font-medium tabular-nums"
              >${{ formatCurrency(netRoyalties) }}</span
            >
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground text-sm">Processing Fee</span>
            <span class="text-sm font-medium tabular-nums">
              -${{ formatCurrency(processingFee) }}
            </span>
          </div>
          <UiSeparator />
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground text-sm">Total Ready to Claim</span>
            <span class="text-sm font-semibold tabular-nums">
              ${{ formatCurrency(totalClaimable) }} USD
            </span>
          </div>
        </UiItemContent>
      </UiItem>
    </UiCardContent>
    <UiCardFooter>
      <UiCardDescription>
        Once your bank is connected, balances over $10.00 are automatically eligible for monthly
        distribution on the 15th of each month.
      </UiCardDescription>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const netRoyalties = 1248.75;
  const processingFee = 37.46;
  const totalClaimable = netRoyalties - processingFee;

  function formatCurrency(amount: number) {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
</script>
