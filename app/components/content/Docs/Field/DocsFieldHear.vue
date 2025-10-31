<template>
  <div class="mx-auto w-full max-w-md">
    <UiCard class="py-4 shadow-none">
      <UiCardContent class="px-4">
        <form>
          <UiFieldGroup>
            <UiFieldSet class="gap-4">
              <UiFieldLegend>How did you hear about us?</UiFieldLegend>
              <UiFieldDescription class="line-clamp-1">
                Select the option that best describes how you heard about us.
              </UiFieldDescription>
              <UiFieldGroup class="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
                <UiFieldLabel
                  v-for="option in options"
                  :key="option.value"
                  :for="option.value"
                  class="w-fit!"
                >
                  <UiField
                    orientation="horizontal"
                    class="gap-1.5 overflow-hidden px-3! py-1.5! transition-all duration-100 ease-linear group-has-data-[state=checked]/field-label:px-2!"
                  >
                    <UiCheckbox
                      :id="option.value"
                      :value="option.value"
                      :default-value="option.value === 'social-media'"
                      class="-ml-6 -translate-x-1 rounded-full transition-all duration-100 ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
                    />
                    <UiFieldTitle>{{ option.label }}</UiFieldTitle>
                  </UiField>
                </UiFieldLabel>
              </UiFieldGroup>
            </UiFieldSet>
          </UiFieldGroup>
        </form>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const options = [
    { label: "Social Media", value: "social-media" },
    { label: "Search Engine", value: "search-engine" },
    { label: "Referral", value: "referral" },
    { label: "Other", value: "other" },
  ];
</script>
