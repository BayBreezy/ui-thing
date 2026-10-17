<template>
  <!--
    Language and region preferences
    Features: Language, timezone and date format selects, 12 or 24 hour toggle, week start radio, live preview of the formatted date
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-6">
      <div class="grid gap-5 sm:grid-cols-2">
        <div class="grid gap-2">
          <UiLabel for="pref-language">Language</UiLabel>
          <UiNativeSelect id="pref-language" v-model="prefs.language">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.label }}
            </option>
          </UiNativeSelect>
        </div>
        <div class="grid gap-2">
          <UiLabel for="pref-timezone">Timezone</UiLabel>
          <UiNativeSelect id="pref-timezone" v-model="prefs.timezone">
            <option v-for="zone in timezones" :key="zone" :value="zone">{{ zone }}</option>
          </UiNativeSelect>
        </div>
        <div class="grid gap-2">
          <UiLabel for="pref-date">Date format</UiLabel>
          <UiNativeSelect id="pref-date" v-model="prefs.dateStyle">
            <option value="medium">Jan 5, 2026</option>
            <option value="short">1/5/26</option>
            <option value="long">January 5, 2026</option>
          </UiNativeSelect>
        </div>
        <div class="grid gap-2">
          <UiLabel>First day of the week</UiLabel>
          <UiRadioGroup v-model="prefs.weekStart" class="flex gap-5 pt-2">
            <label class="flex items-center gap-2 text-sm">
              <UiRadioGroupItem value="sunday" />
              Sunday
            </label>
            <label class="flex items-center gap-2 text-sm">
              <UiRadioGroupItem value="monday" />
              Monday
            </label>
          </UiRadioGroup>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 rounded-lg border p-4">
        <div>
          <p class="text-sm font-medium">24-hour clock</p>
          <p class="text-muted-foreground text-sm">Show times as 14:30 instead of 2:30 PM.</p>
        </div>
        <UiSwitch v-model="prefs.hour24" aria-label="24-hour clock" />
      </div>

      <div class="bg-muted/50 rounded-lg p-4 text-sm">
        <p class="text-muted-foreground">Preview</p>
        <p class="mt-1 font-medium">{{ preview }}</p>
      </div>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Cancel</UiButton>
      <UiButton @click="useSonner.success('Preferences saved')">Save changes</UiButton>
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
      title: "Language & region",
      description: "Choose how dates, times and text are shown to you.",
    }
  );

  const languages = [
    { code: "en-US", label: "English (US)" },
    { code: "en-GB", label: "English (UK)" },
    { code: "de-DE", label: "Deutsch" },
    { code: "fr-FR", label: "Français" },
    { code: "es-ES", label: "Español" },
    { code: "ja-JP", label: "日本語" },
  ];

  const timezones = [
    "America/Los_Angeles",
    "America/New_York",
    "Europe/London",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Australia/Melbourne",
  ];

  const prefs = reactive({
    language: "en-US",
    timezone: "Australia/Melbourne",
    dateStyle: "medium" as "short" | "medium" | "long",
    weekStart: "monday",
    hour24: false,
  });

  const preview = computed(() => {
    try {
      return new Intl.DateTimeFormat(prefs.language, {
        dateStyle: prefs.dateStyle,
        timeStyle: "short",
        hour12: !prefs.hour24,
        timeZone: prefs.timezone,
      }).format(new Date());
    } catch {
      return "—";
    }
  });
</script>
