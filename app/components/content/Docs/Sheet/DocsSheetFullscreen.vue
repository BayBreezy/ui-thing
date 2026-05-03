<template>
  <div class="space-y-4">
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

          <div>
            <UiLabel for="fullscreen-switch" class="mb-2 block">Fullscreen Background</UiLabel>
            <UiSwitch id="fullscreen-switch" v-model="fullscreen" />
          </div>
        </UiCardContent>
      </template>
    </UiCard>

    <div class="flex w-full justify-center gap-3">
      <UiSheet>
        <UiSheetTrigger as-child>
          <UiButton>Open Sheet</UiButton>
        </UiSheetTrigger>

        <UiSheetContent
          :side="side"
          :variant="variant"
          :is-blurred="isBlurred"
          :fullscreen="fullscreen"
          title="Fullscreen Sheet"
          :description="
            variant === 'floating'
              ? 'Floating fullscreen adds margin around edges'
              : 'Default fullscreen sits flush to the viewport'
          "
        >
          <template #content>
            <div class="space-y-4 p-4">
              <p class="text-muted-foreground text-sm">
                Toggle fullscreen to make the sheet occupy the screen. Choose the floating variant
                to keep a margin around the edges when fullscreen is on.
              </p>
              <div class="border-border bg-muted/40 rounded-lg border p-3 text-sm">
                <div class="font-medium">Current settings</div>
                <ul class="text-muted-foreground space-y-1">
                  <li>Variant: {{ variant }}</li>
                  <li>Side: {{ side }}</li>
                  <li>Blur: {{ isBlurred ? "Yes" : "No" }}</li>
                  <li>Fullscreen: {{ fullscreen ? "Yes" : "No" }}</li>
                </ul>
              </div>
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
  const fullscreen = ref(true);
  const variant = ref<"default" | "floating">("default");
  const side = ref<"left" | "right" | "top" | "bottom">("left");
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
