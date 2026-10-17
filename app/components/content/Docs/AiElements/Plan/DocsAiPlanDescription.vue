<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:route" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Plan: add dark mode</UiTraceTitle>
          <UiTraceDescription>1 of {{ steps.length }} done</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-3">
        <p>
          Store the theme in a cookie so the server renders the right one and the page does not
          flash on load.
        </p>
        <UiTrace>
          <UiTraceLine
            v-for="(step, index) in steps"
            :key="step"
            :status="index > 0 ? 'pending' : undefined"
          >
            <UiTraceIcon>
              <Icon v-if="index === 0" name="lucide:circle-check" class="size-4" />
              <Icon v-else name="lucide:circle" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>{{ step }}</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const steps = [
    "Add a dark variant to the theme tokens",
    "Read the theme from a cookie on the server",
    "Add a toggle to the settings page",
    "Check contrast on the charts",
  ];
</script>
