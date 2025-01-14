<template>
  <UiTable>
    <UiTableHeader>
      <UiTableRow
        class="border-y-0 *:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
      >
        <UiTableCell />
        <UiTableHead class="border-b border-border text-center" colspan="5">
          <Icon name="lucide:monitor" class="inline-flex size-4" aria-hidden="true" />
          <span class="sr-only">Desktop browsers</span>
        </UiTableHead>
        <UiTableHead class="border-b border-border text-center" colspan="5">
          <Icon name="lucide:smartphone" class="inline-flex size-4" aria-hidden="true" />
          <span class="sr-only">Mobile browsers</span>
        </UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableHeader>
      <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
        <UiTableCell />

        <UiTableHead
          v-for="browser in items?.[0]?.desktop"
          :key="browser.name"
          class="h-auto rotate-180 py-3 text-foreground [writing-mode:vertical-lr]"
        >
          {{ browser.name }}
        </UiTableHead>
        <UiTableHead
          v-for="browser in items?.[0]?.mobile"
          :key="browser.name"
          class="h-auto rotate-180 py-3 text-foreground [writing-mode:vertical-lr]"
        >
          {{ browser.name }}
        </UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableBody>
      <UiTableRow
        v-for="item in items"
        :key="item.feature"
        class="*:border-border [&>:not(:last-child)]:border-r"
      >
        <UiTableHead class="whitespace-nowrap font-medium text-foreground">{{
          item.feature
        }}</UiTableHead>
        <UiTableCell
          v-for="(browser, index) in [...item.desktop, ...item.mobile]"
          :key="`${browser.name}-${index}`"
          class="space-y-1 text-center"
        >
          <Icon
            v-if="browser.supported"
            name="lucide:check"
            class="inline-flex size-4 text-emerald-600"
            aria-hidden="true"
          />
          <Icon
            v-else
            name="lucide:x"
            class="inline-flex size-4 text-destructive"
            aria-hidden="true"
          />

          <span class="sr-only">{{ browser.supported ? "Supported" : "Not supported" }}</span>
          <div class="text-xs font-medium text-muted-foreground">{{ browser.version }}</div>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>

<script lang="ts" setup>
  const items = [
    {
      feature: "scroll-timeline",
      desktop: [
        { name: "Chrome", supported: true, version: "115" },
        { name: "Edge", supported: true, version: "115" },
        { name: "Firefox", supported: false, version: "111" },
        { name: "Opera", supported: true, version: "101" },
        { name: "Safari", supported: false, version: "No" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "115" },
        { name: "Firefox Android", supported: false, version: "No" },
        { name: "Opera Android", supported: true, version: "77" },
        { name: "Safari iOS", supported: false, version: "No" },
        { name: "Samsung Internet", supported: true, version: "23" },
      ],
    },
    {
      feature: "view-timeline",
      desktop: [
        { name: "Chrome", supported: true, version: "115" },
        { name: "Edge", supported: true, version: "115" },
        { name: "Firefox", supported: false, version: "114" },
        { name: "Opera", supported: true, version: "101" },
        { name: "Safari", supported: false, version: "No" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "115" },
        { name: "Firefox Android", supported: false, version: "No" },
        { name: "Opera Android", supported: true, version: "77" },
        { name: "Safari iOS", supported: false, version: "No" },
        { name: "Samsung Internet", supported: true, version: "23" },
      ],
    },
    {
      feature: "font-size-adjust",
      desktop: [
        { name: "Chrome", supported: true, version: "127" },
        { name: "Edge", supported: true, version: "127" },
        { name: "Firefox", supported: false, version: "3" },
        { name: "Opera", supported: true, version: "113" },
        { name: "Safari", supported: true, version: "16.4" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "127" },
        { name: "Firefox Android", supported: true, version: "4" },
        { name: "Opera Android", supported: true, version: "84" },
        { name: "Safari iOS", supported: true, version: "16.4" },
        { name: "Samsung Internet", supported: false, version: "No" },
      ],
    },
  ];
</script>
