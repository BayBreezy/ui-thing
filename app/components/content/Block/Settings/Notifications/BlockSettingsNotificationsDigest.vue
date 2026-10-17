<template>
  <!--
    Notification delivery schedule
    Features: Frequency radio cards (instant, hourly, daily, weekly), quiet hours with time inputs, weekend toggle
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-8">
      <div class="space-y-3">
        <UiLabel>Delivery frequency</UiLabel>
        <UiRadioGroup v-model="frequency" class="grid gap-3 sm:grid-cols-2">
          <label
            v-for="option in options"
            :key="option.value"
            class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
            :class="
              frequency === option.value ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
            "
          >
            <UiRadioGroupItem :value="option.value" class="mt-0.5" />
            <span>
              <span class="block text-sm font-medium">{{ option.label }}</span>
              <span class="text-muted-foreground block text-sm">{{ option.hint }}</span>
            </span>
          </label>
        </UiRadioGroup>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium">Quiet hours</p>
            <p class="text-muted-foreground text-sm">Hold push and SMS notifications overnight.</p>
          </div>
          <UiSwitch v-model="quiet.enabled" aria-label="Enable quiet hours" />
        </div>
        <div
          class="grid gap-4 sm:grid-cols-2"
          :class="!quiet.enabled && 'pointer-events-none opacity-50'"
        >
          <div class="grid gap-2">
            <UiLabel for="quiet-from">From</UiLabel>
            <UiInput id="quiet-from" v-model="quiet.from" type="time" :disabled="!quiet.enabled" />
          </div>
          <div class="grid gap-2">
            <UiLabel for="quiet-to">Until</UiLabel>
            <UiInput id="quiet-to" v-model="quiet.to" type="time" :disabled="!quiet.enabled" />
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm">
          <UiCheckbox v-model="quiet.weekends" />
          Also stay quiet on weekends
        </label>
      </div>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Cancel</UiButton>
      <UiButton @click="useSonner.success('Schedule saved')">Save schedule</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Delivery schedule",
      description: "Batch notifications into a digest or silence them at night.",
    }
  );

  const options = [
    { value: "instant", label: "Instant", hint: "Send every notification as it happens." },
    { value: "hourly", label: "Hourly", hint: "One summary at the top of each hour." },
    { value: "daily", label: "Daily digest", hint: "A single email every morning." },
    { value: "weekly", label: "Weekly digest", hint: "A recap every Monday." },
  ];

  const frequency = ref("daily");

  const quiet = reactive({
    enabled: true,
    from: "22:00",
    to: "07:00",
    weekends: false,
  });
</script>
