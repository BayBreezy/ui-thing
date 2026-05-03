<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md space-y-4">
      <UiVeeSwitch
        v-model="enabled"
        name="notifications"
        label="Push notifications"
        hint="Turn on push notifications for mentions and replies."
      />
      <p class="text-muted-foreground text-sm">
        Notifications are currently
        <span class="text-foreground font-medium">{{ enabled ? "on" : "off" }}</span
        >.
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const enabled = ref(true);
</script>
