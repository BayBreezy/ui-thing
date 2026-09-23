<template>
  <div
    data-slot="demo"
    class="flex w-full max-w-none flex-col gap-(--gap) [--gap:--spacing(6)] min-[1900px]:[--gap:--spacing(8)]"
  >
    <div class="mx-auto grid gap-(--gap) **:data-[slot=card]:w-full md:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col items-start gap-(--gap)">
        <DocsCardsUiElements />
        <DocsCardsSidebarNav />
        <DocsCardsSavingsTargets />
        <DocsCardsEmptyDistributeTrack />
        <DocsCardsAnalyticsCard />
        <DocsCardsNewMilestone />
      </div>
      <div class="flex flex-col gap-(--gap)">
        <DocsCardsContributionHistory />
        <DocsCardsClaimableBalance />
        <DocsCardsDividendIncome />
        <DocsCardsNotificationSettings />
        <DocsCardsPowerUsage />
      </div>
      <div class="flex flex-col gap-(--gap)">
        <DocsCardsQrConnect />
        <div class="**:[.text-center.text-xs]:hidden">
          <DocsMessageScrollerDemo />
        </div>
        <DocsCardsPayments />
        <DocsCardsPayoutThreshold />
        <DocsCardsAccountAccess />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
