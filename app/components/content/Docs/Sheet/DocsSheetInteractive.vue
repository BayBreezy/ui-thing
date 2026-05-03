<template>
  <div>
    <UiCard
      class="mx-auto max-w-md"
      title="Configure Sheet"
      description="Use the controls below to customize the sheet's behavior."
    >
      <template #content>
        <UiCardContent class="grid gap-4">
          <UiVeeSelect v-model="variant" label="Variant">
            <option value="" disabled>Select a variant</option>
            <option v-for="option in variantOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>
          <UiVeeSelect v-model="side" label="Side">
            <option value="" disabled>Select a side</option>
            <option v-for="option in sideOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </UiVeeSelect>

          <div>
            <UiLabel for="blur-switch" class="mb-2 block">Blur Background</UiLabel>
            <UiSwitch id="blur-switch" v-model="isBlurred" />
          </div>
        </UiCardContent>
      </template>
    </UiCard>

    <div class="mt-6 flex w-full justify-center">
      <UiSheet>
        <UiSheetTrigger as-child>
          <UiButton variant="outline">Open Interactive Sheet</UiButton>
        </UiSheetTrigger>

        <UiSheetContent
          :side="side"
          :variant="variant"
          :is-blurred="isBlurred"
          title="Interactive Sheet"
          description="Configure the sheet using the controls above"
        >
          <template #content>
            <UiGradientDivider class="-my-2" />
            <div class="space-y-4 p-4">
              <div class="border-border bg-muted/30 rounded-lg border p-3">
                <h4 class="mb-2 text-sm font-medium">Current Settings</h4>
                <ul class="text-muted-foreground space-y-1 text-sm">
                  <li>
                    <span class="font-medium">Variant:</span>
                    {{ variantOptions.find((opt) => opt.value === variant)?.label || "Default" }}
                  </li>
                  <li>
                    <span class="font-medium">Side:</span>
                    {{ sideOptions.find((opt) => opt.value === side)?.label || "Right" }}
                  </li>
                  <li>
                    <span class="font-medium">Blur:</span>
                    {{ isBlurred ? "Yes" : "No" }}
                  </li>
                </ul>
              </div>
              <p class="text-muted-foreground text-sm">
                Try changing the controls above and reopening the sheet to see the different
                configurations in action.
              </p>
            </div>
          </template>
          <template #footer>
            <UiSheetFooter>
              <UiSheetClose as-child>
                <UiButton>Close</UiButton>
              </UiSheetClose>
            </UiSheetFooter>
          </template>
        </UiSheetContent>
      </UiSheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variant = ref<"default" | "floating">("floating");
  const side = ref<"left" | "right" | "top" | "bottom">("right");
  const isBlurred = ref(true);

  const variantOptions = [
    { label: "Default", value: "default" },
    { label: "Floating", value: "floating" },
  ];

  const sideOptions = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];
</script>
