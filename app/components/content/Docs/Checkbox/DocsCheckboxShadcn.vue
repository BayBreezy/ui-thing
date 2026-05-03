<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <UiCheckbox id="terms" />
        <UiLabel for="terms">Accept terms and conditions</UiLabel>
      </div>
      <div class="flex items-start gap-3">
        <UiCheckbox id="terms-2" default-value />
        <div class="grid gap-2">
          <UiLabel for="terms-2">Accept terms and conditions</UiLabel>
          <p class="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <UiCheckbox id="toggle" disabled />
        <UiLabel for="toggle">Enable notifications</UiLabel>
      </div>
      <UiLabel
        class="hover:bg-accent/50 flex items-start justify-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
      >
        <UiCheckbox
          id="toggle-2"
          default-value="indeterminate"
          class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div class="grid gap-1.5 font-normal">
          <p class="text-sm leading-none font-medium">Enable notifications</p>
          <p class="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
