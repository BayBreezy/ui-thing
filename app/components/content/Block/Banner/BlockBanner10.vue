<template>
  <!--
    Cookie consent banner with preferences
    Features: Floating card, accept all and reject all actions, customize panel with category switches, necessary cookies locked on, saves a choice and slides away
  -->
  <div class="relative min-h-72">
    <AnimatePresence>
      <Motion
        v-if="!choice"
        class="fixed inset-x-4 bottom-4 z-50 sm:right-auto sm:max-w-md"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: 24 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 26 }"
      >
        <div
          class="bg-card rounded-2xl border p-5 shadow-xl"
          role="dialog"
          aria-label="Cookie preferences"
        >
          <div class="flex items-start gap-3">
            <UiFancyIcon icon="lucide:cookie" theme="light" color="warning" size="md" />
            <div>
              <slot name="title">
                <h3 class="font-semibold">{{ props.title }}</h3>
              </slot>
              <p class="text-muted-foreground mt-1 text-sm">
                {{ props.description }}
                <NuxtLink to="#" class="text-foreground font-medium underline underline-offset-4">
                  Cookie policy
                </NuxtLink>
              </p>
            </div>
          </div>

          <div v-if="customizing" class="mt-4 space-y-3 border-t pt-4">
            <div
              v-for="item in categories"
              :key="item.id"
              class="flex items-start justify-between gap-4"
            >
              <div>
                <UiLabel :for="item.id" class="text-sm font-medium">{{ item.label }}</UiLabel>
                <p class="text-muted-foreground text-xs">{{ item.hint }}</p>
              </div>
              <UiSwitch
                :id="item.id"
                :model-value="item.locked ? true : prefs[item.id]"
                :disabled="item.locked"
                @update:model-value="prefs[item.id] = $event === true"
              />
            </div>
          </div>

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <UiButton v-if="!customizing" variant="ghost" size="sm" @click="customizing = true">
              Customize
            </UiButton>
            <UiButton v-else variant="ghost" size="sm" @click="save">Save choices</UiButton>
            <div class="ml-auto flex gap-2">
              <UiButton variant="outline" size="sm" @click="reject">Reject all</UiButton>
              <UiButton size="sm" @click="acceptAll">Accept all</UiButton>
            </div>
          </div>
        </div>
      </Motion>
    </AnimatePresence>

    <div v-if="choice" class="flex flex-col items-center gap-3 p-8 text-center">
      <p class="text-muted-foreground text-sm">
        Choice saved: <span class="text-foreground font-medium">{{ choice }}</span>
      </p>
      <UiButton variant="outline" size="sm" @click="reset">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "We value your privacy",
      description: "We use cookies to keep the site working and to understand how it's used.",
    }
  );

  const categories = [
    {
      id: "necessary",
      label: "Strictly necessary",
      hint: "Needed for the site to work.",
      locked: true,
    },
    { id: "analytics", label: "Analytics", hint: "Helps us improve with anonymous usage data." },
    { id: "marketing", label: "Marketing", hint: "Lets us show you relevant offers." },
  ] as {
    id: "necessary" | "analytics" | "marketing";
    label: string;
    hint: string;
    locked?: boolean;
  }[];

  const prefs = reactive({ necessary: true, analytics: false, marketing: false });
  const customizing = ref(false);
  const choice = ref("");

  function acceptAll() {
    prefs.analytics = true;
    prefs.marketing = true;
    choice.value = "Accepted all";
  }
  function reject() {
    prefs.analytics = false;
    prefs.marketing = false;
    choice.value = "Rejected non-essential";
  }
  function save() {
    const on = [prefs.analytics && "analytics", prefs.marketing && "marketing"].filter(Boolean);
    choice.value = on.length ? `Allowed ${on.join(" and ")}` : "Necessary only";
  }
  function reset() {
    choice.value = "";
    customizing.value = false;
  }
</script>
