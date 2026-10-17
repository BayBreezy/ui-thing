<template>
  <!--
    Notification preferences as grouped switches with descriptions
    Features: Two-column rows with a switch on the right, grouped sections, pause-all master switch that disables the rest
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction class="flex items-center gap-2">
        <UiLabel for="pause-all" class="text-muted-foreground text-sm">Pause all</UiLabel>
        <UiSwitch id="pause-all" v-model="paused" />
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-8" :class="paused && 'pointer-events-none opacity-50'">
      <section v-for="group in groups" :key="group.title" class="space-y-1">
        <h3 class="text-sm font-semibold">{{ group.title }}</h3>
        <div class="divide-y">
          <div
            v-for="item in group.items"
            :key="item.id"
            class="flex items-start justify-between gap-6 py-4"
          >
            <div>
              <UiLabel :for="item.id" class="text-sm font-medium">{{ item.label }}</UiLabel>
              <p class="text-muted-foreground mt-0.5 text-sm">{{ item.hint }}</p>
            </div>
            <UiSwitch :id="item.id" v-model="item.enabled" :disabled="paused" />
          </div>
        </div>
      </section>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Cancel</UiButton>
      <UiButton @click="useSonner.success('Notification settings saved')">Save changes</UiButton>
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
      title: "Notification settings",
      description: "Decide which updates reach you.",
    }
  );

  const paused = ref(false);

  const groups = reactive([
    {
      title: "Activity",
      items: [
        {
          id: "n-comments",
          label: "Comments and replies",
          hint: "When someone comments on something you own or follow.",
          enabled: true,
        },
        {
          id: "n-mentions",
          label: "Mentions",
          hint: "When someone @mentions you directly.",
          enabled: true,
        },
        {
          id: "n-follows",
          label: "New followers",
          hint: "When someone starts following your work.",
          enabled: false,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          id: "n-security",
          label: "Security alerts",
          hint: "Sign-ins from new devices and password changes.",
          enabled: true,
        },
        {
          id: "n-billing",
          label: "Billing and invoices",
          hint: "Receipts, upcoming renewals and failed payments.",
          enabled: true,
        },
        {
          id: "n-product",
          label: "Product news",
          hint: "Occasional emails about new features.",
          enabled: false,
        },
      ],
    },
  ]);
</script>
