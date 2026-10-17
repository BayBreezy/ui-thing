<template>
  <!--
    Two-factor authentication methods
    Features: Master toggle, selectable methods (authenticator, SMS, passkey) with status badges, recovery codes action
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <UiSwitch v-model="enabled" aria-label="Enable two-factor authentication" />
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-3" :class="!enabled && 'pointer-events-none opacity-50'">
      <div
        v-for="method in methods"
        :key="method.id"
        class="flex items-center gap-4 rounded-lg border p-4"
      >
        <div class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
          <Icon :name="method.icon" class="size-5" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium">{{ method.name }}</p>
            <UiBadge v-if="method.recommended" variant="secondary">Recommended</UiBadge>
          </div>
          <p class="text-muted-foreground text-sm">{{ method.description }}</p>
        </div>
        <UiButton
          size="sm"
          :variant="method.configured ? 'outline' : 'default'"
          @click="toggle(method)"
        >
          {{ method.configured ? "Remove" : "Set up" }}
        </UiButton>
      </div>
    </UiCardContent>
    <UiCardFooter class="justify-between gap-4 border-t">
      <p class="text-muted-foreground text-sm">
        Save your recovery codes somewhere safe in case you lose access to a device.
      </p>
      <UiButton variant="outline" size="sm" :disabled="!enabled" @click="downloadCodes">
        <Icon name="lucide:download" class="size-4" />
        Recovery codes
      </UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  type Method = {
    id: string;
    name: string;
    description: string;
    icon: string;
    configured: boolean;
    recommended?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Two-factor authentication",
      description: "Add a second step when you sign in to keep your account safe.",
    }
  );

  const enabled = ref(true);

  const methods = reactive<Method[]>([
    {
      id: "app",
      name: "Authenticator app",
      description: "Use a code from an app like 1Password or Authy.",
      icon: "lucide:smartphone",
      configured: true,
      recommended: true,
    },
    {
      id: "passkey",
      name: "Passkey",
      description: "Sign in with Face ID, Touch ID or a security key.",
      icon: "lucide:fingerprint",
      configured: false,
    },
    {
      id: "sms",
      name: "Text message",
      description: "Get a code by SMS. Less secure than the options above.",
      icon: "lucide:message-square",
      configured: false,
    },
  ]);

  function toggle(method: Method) {
    method.configured = !method.configured;
    useSonner.success(method.configured ? `${method.name} added` : `${method.name} removed`);
  }

  function downloadCodes() {
    useSonner.info("Recovery codes downloaded");
  }
</script>
