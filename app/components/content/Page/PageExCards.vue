<template>
  <div class="py-5 min-[1440px]:container max-[1440px]:px-4">
    <div class="grid grid-cols-1 items-start justify-center gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div class="grid gap-6">
        <!-- Create account -->
        <ExamplesCardCreateAnAccount />
        <!-- Payment Method -->
        <ExamplesCardPaymentMethod />
      </div>

      <div class="grid gap-6">
        <!-- Team Members -->
        <ExamplesCardTeamMembers />
        <!-- SHare document -->
        <ExamplesCardShareDocument />
        <!-- Pick a date -->
        <ExamplesCardPickDate />
        <!-- Notifications -->
        <ExamplesCardNotifications />
      </div>
      <div class="grid gap-6">
        <!-- Report issue -->
        <ExamplesCardReportIssue />
        <!-- Github card -->
        <ExamplesCardGithubCard />
        <!-- Cookie settings -->
        <ExamplesCardCookieSettings />
      </div>
    </div>
  </div>
</template>
