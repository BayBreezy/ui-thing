<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Q2 Dividend Income</UiCardTitle>
      <UiCardDescription>
        Quarterly dividend payouts across your portfolio holdings.
      </UiCardDescription>
      <UiCardAction>
        <UiButton
          variant="ghost"
          size="icon-sm"
          class="bg-muted"
          aria-label="Dismiss dividend income"
        >
          <Icon name="lucide:x" />
        </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent>
      <UiItemGroup class="gap-4">
        <UiItem v-for="holding in holdings" :key="holding.name" role="listitem" variant="muted">
          <UiItemContent>
            <UiItemTitle>{{ holding.name }}</UiItemTitle>
            <UiItemDescription>{{ holding.shares }}</UiItemDescription>
          </UiItemContent>
          <div
            class="hidden h-8 w-24 items-end gap-1 md:flex"
            role="img"
            :aria-label="`${holding.name} quarterly dividends`"
          >
            <div
              v-for="item in holding.data"
              :key="item.q"
              class="bg-primary min-h-1 flex-1 rounded-t-sm"
              :style="{
                height: `${(item.value / maxValue(holding.data)) * 100}%`,
              }"
            />
          </div>
        </UiItem>
      </UiItemGroup>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  interface Holding {
    name: string;
    shares: string;
    amount: string;
    data: { q: string; value: number }[];
  }

  const holdings: Holding[] = [
    {
      name: "Vanguard",
      shares: "450 Shares",
      amount: "$1,842.10",
      data: [
        { q: "Q1", value: 380 },
        { q: "Q2", value: 420 },
        { q: "Q3", value: 390 },
        { q: "Q4", value: 652 },
      ],
    },
    {
      name: "S&P 500 VOO",
      shares: "112 Shares",
      amount: "$928.40",
      data: [
        { q: "Q1", value: 180 },
        { q: "Q2", value: 210 },
        { q: "Q3", value: 320 },
        { q: "Q4", value: 218 },
      ],
    },
    {
      name: "Apple AAPL",
      shares: "85 Shares",
      amount: "$340.00",
      data: [
        { q: "Q1", value: 60 },
        { q: "Q2", value: 70 },
        { q: "Q3", value: 120 },
        { q: "Q4", value: 90 },
      ],
    },
    {
      name: "Realty Income",
      shares: "320 Shares",
      amount: "$1,139.50",
      data: [
        { q: "Q1", value: 240 },
        { q: "Q2", value: 260 },
        { q: "Q3", value: 280 },
        { q: "Q4", value: 360 },
      ],
    },
  ];

  const maxValue = (data: Holding["data"]) => Math.max(...data.map((point) => point.value));
</script>
