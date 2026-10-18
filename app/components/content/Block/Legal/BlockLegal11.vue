<template>
  <!--
    Cookie consent banner with customize dialog
    Features: Bottom card banner with accept, reject and customize actions, a dialog with category switches, and a link to reopen it so the preview is repeatable
  -->
  <div class="relative min-h-[28rem] p-6">
    <div class="mx-auto max-w-3xl">
      <p class="text-muted-foreground text-center text-sm">Your page content goes here.</p>
      <div class="mt-6 flex justify-center">
        <UiButton v-if="!visible" variant="outline" size="sm" @click="visible = true"
          >Show cookie banner again</UiButton
        >
      </div>
    </div>

    <AnimatePresence>
      <Motion
        v-if="visible"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 24 }"
        :transition="{ duration: 0.3 }"
        class="bg-card absolute inset-x-4 bottom-4 mx-auto max-w-3xl rounded-2xl border p-5 shadow-lg sm:p-6"
        role="dialog"
        aria-label="Cookie consent"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div
            class="bg-primary/10 text-primary hidden size-11 shrink-0 items-center justify-center rounded-xl sm:flex"
          >
            <Icon name="lucide:cookie" class="size-5" />
          </div>
          <div class="flex-1">
            <p class="font-semibold">We value your privacy</p>
            <p class="text-muted-foreground mt-1 text-sm">
              We use cookies to keep the site working and, with your consent, to understand usage.
              Read our
              <a href="#" class="text-foreground underline underline-offset-4">Cookie Policy</a>.
            </p>
          </div>
          <div class="flex flex-wrap gap-2 sm:flex-col lg:flex-row">
            <UiButton variant="outline" size="sm" @click="settings = true">Customize</UiButton>
            <UiButton variant="outline" size="sm" @click="decide(false)">Reject</UiButton>
            <UiButton size="sm" @click="decide(true)">Accept all</UiButton>
          </div>
        </div>
      </Motion>
    </AnimatePresence>

    <UiDialog v-model:open="settings">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Cookie preferences</UiDialogTitle>
          <UiDialogDescription
            >Choose which cookies you allow. You can change this later.</UiDialogDescription
          >
        </UiDialogHeader>
        <ul class="divide-y">
          <li
            v-for="cat in categories"
            :key="cat.id"
            class="flex items-start justify-between gap-4 py-3"
          >
            <div>
              <p class="text-sm font-medium">{{ cat.title }}</p>
              <p class="text-muted-foreground text-xs">{{ cat.text }}</p>
            </div>
            <UiSwitch
              v-model="choices[cat.id]"
              :disabled="cat.locked"
              :aria-label="`${cat.title} cookies`"
            />
          </li>
        </ul>
        <UiDialogFooter>
          <UiButton variant="outline" @click="settings = false">Cancel</UiButton>
          <UiButton @click="save">Save preferences</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const visible = ref(true);
  const settings = ref(false);

  const categories = [
    {
      id: "necessary",
      title: "Strictly necessary",
      text: "Required for the site to work.",
      locked: true,
    },
    { id: "analytics", title: "Analytics", text: "Anonymous usage statistics.", locked: false },
    {
      id: "marketing",
      title: "Marketing",
      text: "Campaign measurement and relevant content.",
      locked: false,
    },
  ];
  const choices = reactive<Record<string, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  function decide(accept: boolean) {
    choices.analytics = accept;
    choices.marketing = accept;
    visible.value = false;
    useSonner.success(accept ? "All cookies accepted" : "Optional cookies rejected");
  }
  function save() {
    settings.value = false;
    visible.value = false;
    useSonner.success("Cookie preferences saved");
  }
</script>
