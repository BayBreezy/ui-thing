<template>
  <div class="flex items-center justify-center">
    <UiCard
      class="w-[380px] max-w-sm"
      title="Notifications"
      description="You have 3 unread messages."
    >
      <template #content>
        <UiCardContent>
          <div class="flex items-center gap-3 rounded-lg border p-3">
            <div class="shrink-0 self-start">
              <Icon name="lucide:bell" class="h-6 w-6" />
            </div>
            <UiLabel for="push" class="flex flex-col items-start text-sm">
              <p class="font-medium">Push Notifications</p>
              <p class="text-muted-foreground">Send notifications to device.</p>
            </UiLabel>
            <div class="ml-auto">
              <UiSwitch id="push" v-model:checked="push" />
            </div>
          </div>

          <ul class="mt-7 flex flex-col gap-6 pl-2">
            <li v-for="(item, i) in items" :key="i" class="flex items-start gap-4">
              <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
              <div class="flex flex-col gap-px text-sm">
                <p class="font-medium leading-none">{{ item.text }}</p>
                <span class="text-muted-foreground">{{ item.time }}</span>
              </div>
            </li>
          </ul>
        </UiCardContent>
      </template>

      <template #footer>
        <UiCardFooter>
          <UiButton
            class="w-full"
            @click="useSonner.success('Updated', { description: 'All items were marked as read.' })"
          >
            <Icon name="lucide:check" /> Mark all as read
          </UiButton>
        </UiCardFooter>
      </template>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const push = ref(false);

  const items = [
    { text: "Your call has been confirmed.", time: "2m ago" },
    { text: "You have a new message.", time: "1h ago" },
    { text: "Your order has been shipped.", time: "2h ago" },
  ];
</script>
