<template>
  <UiContainer class="relative py-16 lg:py-24">
    <div class="mx-auto max-w-[760px] text-center">
      <p class="font-semibold text-primary">Pricing</p>
      <h2 class="mb-4 mt-3 text-3xl font-semibold lg:mb-6 lg:text-4xl">
        Compare our plans and find yours
      </h2>
      <p class="text-lg text-muted-foreground lg:text-xl">
        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
      </p>
    </div>

    <UiTabs class="mx-auto mt-5 w-full md:w-[450px] lg:mt-7" default-value="monthly">
      <UiTabsList class="grid h-auto w-full grid-cols-2">
        <UiTabsTrigger class="h-10" value="monthly">Monthly billing</UiTabsTrigger>
        <UiTabsTrigger class="h-10" value="annual"
          >Annual Billing
          <UiBadge class="ml-2 hidden lg:block" variant="outline">Save 20%</UiBadge></UiTabsTrigger
        >
      </UiTabsList>
    </UiTabs>

    <div class="grid grid-cols-1 gap-y-5 py-10 lg:grid-cols-4 lg:gap-x-10 lg:py-20">
      <template v-for="(p, i) in prices" :key="i">
        <div class="lg:first:col-start-2">
          <p class="text-xl font-semibold">{{ p.title }}</p>
          <div class="mt-10 flex items-end">
            <p class="text-3xl font-semibold lg:text-5xl">${{ p.price }}</p>
            <p class="ml-1 text-muted-foreground">per user / month</p>
          </div>
          <p class="mt-6 text-sm text-muted-foreground">{{ p.description }}</p>
          <div class="mt-7 flex flex-col gap-3">
            <UiButton class="w-full">Get started</UiButton>
            <UiButton variant="outline" class="w-full">Contact sales</UiButton>
          </div>

          <div class="mt-10 grid gap-5 lg:hidden">
            <div>
              <p class="mb-4 text-sm font-semibold text-primary">Overview</p>
              <ul>
                <li class="grid grid-cols-2">
                  <template v-for="(o, k) in p.overview" :key="`overview-${k}`">
                    <p
                      class="px-3 py-6 text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.text }}
                    </p>
                    <p
                      v-if="typeof o.value === 'string'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.value }}
                    </p>
                    <p
                      v-if="typeof o.value === 'boolean'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      <Icon
                        v-if="o.value"
                        name="heroicons:check-circle"
                        class="h-6 w-6 text-green-500"
                      />
                      <span v-else>--</span>
                    </p>
                  </template>
                </li>
              </ul>
            </div>
            <div>
              <p class="mb-4 text-sm font-semibold text-primary">Reporting and analytics</p>
              <ul>
                <li class="grid grid-cols-2">
                  <template v-for="(o, k) in p.reporting" :key="`reporting-${k}`">
                    <p
                      class="px-3 py-6 text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.text }}
                    </p>
                    <p
                      v-if="typeof o.value === 'string'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.value }}
                    </p>
                    <p
                      v-if="typeof o.value === 'boolean'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      <Icon
                        v-if="o.value"
                        name="heroicons:check-circle"
                        class="h-6 w-6 text-green-500"
                      />
                      <span v-else>--</span>
                    </p>
                  </template>
                </li>
              </ul>
            </div>
            <div>
              <p class="mb-4 text-sm font-semibold text-primary">User access</p>
              <ul>
                <li class="grid grid-cols-2">
                  <template v-for="(o, k) in p.access" :key="`access-${k}`">
                    <p
                      class="px-3 py-6 text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.text }}
                    </p>
                    <p
                      v-if="typeof o.value === 'string'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      {{ o.value }}
                    </p>
                    <p
                      v-if="typeof o.value === 'boolean'"
                      class="px-3 py-6 text-center text-sm font-medium"
                      :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                    >
                      <Icon
                        v-if="o.value"
                        name="heroicons:check-circle"
                        class="h-6 w-6 text-green-500"
                      />
                      <span v-else>--</span>
                    </p>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="hidden lg:block">
      <div>
        <p class="mb-4 text-sm font-semibold text-primary">Overview</p>
        <ul>
          <li class="grid grid-cols-2 lg:grid-cols-4">
            <template
              v-for="(o, k) in prices[0].overview.map((x) => x.text)"
              :key="`prices-overview-${k}`"
            >
              <p
                class="text-sm font-medium lg:px-3 lg:py-6"
                :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
              >
                {{ o }}
              </p>
              <template v-for="(p, i) in prices" :key="i">
                <p
                  v-if="typeof p.overview.find((x) => x.text == o)?.value === 'string'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  {{ p.overview.find((x) => x.text == o)?.value }}
                </p>
                <p
                  v-if="typeof p.overview.find((x) => x.text == o)?.value === 'boolean'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  <Icon
                    v-if="p.overview.find((x) => x.text == o)?.value"
                    name="heroicons:check-circle"
                    class="h-6 w-6 text-green-500"
                  />
                  <span v-else>--</span>
                </p>
              </template>
            </template>
          </li>
        </ul>
      </div>
      <div class="mt-10">
        <p class="mb-4 text-sm font-semibold text-primary">Reporting and analytics</p>
        <ul>
          <li class="grid grid-cols-2 lg:grid-cols-4">
            <template
              v-for="(o, k) in prices[0].reporting.map((x) => x.text)"
              :key="`prices-reporting-${k}`"
            >
              <p
                class="text-sm font-medium lg:px-3 lg:py-6"
                :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
              >
                {{ o }}
              </p>
              <template v-for="(p, i) in prices" :key="i">
                <p
                  v-if="typeof p.reporting.find((x) => x.text == o)?.value === 'string'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  {{ p.reporting.find((x) => x.text == o)?.value }}
                </p>
                <p
                  v-if="typeof p.reporting.find((x) => x.text == o)?.value === 'boolean'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  <Icon
                    v-if="p.reporting.find((x) => x.text == o)?.value"
                    name="heroicons:check-circle"
                    class="h-6 w-6 text-green-500"
                  />
                  <span v-else>--</span>
                </p>
              </template>
            </template>
          </li>
        </ul>
      </div>
      <div class="mt-10">
        <p class="mb-4 text-sm font-semibold text-primary">User access</p>
        <ul>
          <li class="grid grid-cols-2 lg:grid-cols-4">
            <template
              v-for="(o, k) in prices[0].access.map((x) => x.text)"
              :key="`prices-access-${k}`"
            >
              <p
                class="text-sm font-medium lg:px-3 lg:py-6"
                :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
              >
                {{ o }}
              </p>
              <template v-for="(p, i) in prices" :key="i">
                <p
                  v-if="typeof p.access.find((x) => x.text == o)?.value === 'string'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  {{ p.access.find((x) => x.text == o)?.value }}
                </p>
                <p
                  v-if="typeof p.access.find((x) => x.text == o)?.value === 'boolean'"
                  class="text-center text-sm font-medium lg:px-3 lg:py-6"
                  :class="[k % 2 == 0 ? 'bg-muted dark:bg-muted/40' : '']"
                >
                  <Icon
                    v-if="p.access.find((x) => x.text == o)?.value"
                    name="heroicons:check-circle"
                    class="h-6 w-6 text-green-500"
                  />
                  <span v-else>--</span>
                </p>
              </template>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const prices = [
    {
      title: "Basic",
      description: "Basic features for up to 10 employees with everything you need.",
      price: 10,
      overview: [
        { text: "Basic features", value: true },
        { text: "Users", value: "10" },
        { text: "Individual data", value: "20GB" },
        { text: "Support", value: true },
        { text: "Automated workflows", value: false },
        { text: "Integrations", value: false },
      ],
      reporting: [
        { text: "Analytics", value: "Basic" },
        { text: "Export reports", value: true },
        { text: "Scheduled reports", value: true },
        { text: "API access", value: false },
        { text: "Advanced reports", value: false },
        { text: "Saved reports", value: false },
        { text: "Custom properties", value: false },
        { text: "Custom fields", value: false },
      ],
      access: [
        { text: "SSO/SAML authentication", value: true },
        { text: "Advanced permissions", value: false },
        { text: "Audit log", value: false },
        { text: "Data history", value: false },
      ],
    },
    {
      title: "Business",
      description: "Advanced features and reporting, better workflows and automation.",
      price: 20,
      overview: [
        { text: "Basic features", value: true },
        { text: "Users", value: "20" },
        { text: "Individual data", value: "40GB" },
        { text: "Support", value: true },
        { text: "Automated workflows", value: true },
        { text: "Integrations", value: true },
      ],
      reporting: [
        { text: "Analytics", value: "Advanced" },
        { text: "Export reports", value: true },
        { text: "Scheduled reports", value: true },
        { text: "API access", value: true },
        { text: "Advanced reports", value: true },
        { text: "Saved reports", value: true },
        { text: "Custom properties", value: false },
        { text: "Custom fields", value: false },
      ],
      access: [
        { text: "SSO/SAML authentication", value: true },
        { text: "Advanced permissions", value: true },
        { text: "Audit log", value: false },
        { text: "Data history", value: false },
      ],
    },
    {
      title: "Enterprise",
      description: "Personalized service and enterprise security for large teams.",
      price: 40,
      overview: [
        { text: "Basic features", value: true },
        { text: "Users", value: "Unlimited" },
        { text: "Individual data", value: "Unlimited" },
        { text: "Support", value: true },
        { text: "Automated workflows", value: true },
        { text: "Integrations", value: true },
      ],
      reporting: [
        { text: "Analytics", value: "Advanced" },
        { text: "Export reports", value: true },
        { text: "Scheduled reports", value: true },
        { text: "API access", value: true },
        { text: "Advanced reports", value: true },
        { text: "Saved reports", value: true },
        { text: "Custom properties", value: true },
        { text: "Custom fields", value: true },
      ],
      access: [
        { text: "SSO/SAML authentication", value: true },
        { text: "Advanced permissions", value: true },
        { text: "Audit log", value: true },
        { text: "Data history", value: true },
      ],
    },
  ];
</script>
