<template>
  <!--
    Subscribe to status updates
    Features: Tabs for email, webhook and RSS, a list of components to follow with select all, email and webhook validation, a confirmation state with the chosen components and a copy button for the feed address
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-lg">
      <UiCardHeader>
        <UiCardTitle>Subscribe to updates</UiCardTitle>
        <UiCardDescription>Get notified when an incident is created or resolved.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="done" class="space-y-3 text-center" role="status">
          <span
            class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
            ><Icon name="lucide:check" class="size-6"
          /></span>
          <p class="font-medium">You are subscribed</p>
          <p class="text-muted-foreground text-sm">{{ done }}</p>
          <UiButton variant="outline" size="sm" @click="done = ''">Change subscription</UiButton>
        </div>
        <UiTabs v-else v-model="tab">
          <UiTabsList class="grid w-full grid-cols-3">
            <UiTabsTrigger value="email">Email</UiTabsTrigger>
            <UiTabsTrigger value="webhook">Webhook</UiTabsTrigger>
            <UiTabsTrigger value="rss">RSS</UiTabsTrigger>
          </UiTabsList>

          <UiTabsContent value="email" class="space-y-4">
            <form class="space-y-4" novalidate @submit.prevent="subscribeEmail">
              <div class="space-y-1.5">
                <UiLabel for="status-email">Email address</UiLabel>
                <UiInput
                  id="status-email"
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  :aria-invalid="!!errors.email"
                />
                <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
              </div>
              <fieldset class="space-y-2">
                <legend class="text-sm font-medium">Components</legend>
                <div class="flex items-center gap-2">
                  <UiCheckbox
                    id="status-all"
                    :model-value="all ? true : picked.size ? 'indeterminate' : false"
                    @update:model-value="toggleAll"
                  />
                  <UiLabel for="status-all" class="font-normal">All components</UiLabel>
                </div>
                <div v-for="item in components" :key="item" class="flex items-center gap-2 pl-6">
                  <UiCheckbox
                    :id="`status-${item}`"
                    :model-value="picked.has(item)"
                    @update:model-value="toggle(item)"
                  />
                  <UiLabel :for="`status-${item}`" class="font-normal">{{ item }}</UiLabel>
                </div>
                <p v-if="errors.components" class="text-destructive text-sm">
                  {{ errors.components }}
                </p>
              </fieldset>
              <UiButton type="submit" class="w-full">Subscribe</UiButton>
            </form>
          </UiTabsContent>

          <UiTabsContent value="webhook" class="space-y-4">
            <form class="space-y-3" novalidate @submit.prevent="subscribeWebhook">
              <div class="space-y-1.5">
                <UiLabel for="status-webhook">Endpoint URL</UiLabel>
                <UiInput
                  id="status-webhook"
                  v-model="webhook"
                  type="url"
                  placeholder="https://example.com/hooks/status"
                  :aria-invalid="!!errors.webhook"
                />
                <p v-if="errors.webhook" class="text-destructive text-sm">{{ errors.webhook }}</p>
              </div>
              <p class="text-muted-foreground text-xs">
                We send a JSON POST request with the incident and the affected components.
              </p>
              <UiButton type="submit" class="w-full">Add webhook</UiButton>
            </form>
          </UiTabsContent>

          <UiTabsContent value="rss" class="space-y-3">
            <UiLabel for="status-rss">Feed address</UiLabel>
            <div class="flex gap-2">
              <UiInput id="status-rss" :model-value="rss" readonly class="font-mono text-sm" />
              <UiButton variant="outline" @click="copy(rss)"
                ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />{{
                  copied ? "Copied" : "Copy"
                }}</UiButton
              >
            </div>
            <p class="text-muted-foreground text-xs">Add this address to your feed reader.</p>
          </UiTabsContent>
        </UiTabs>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      components?: string[];
      rss?: string;
    }>(),
    {
      components: () => ["API", "Dashboard", "Webhooks", "Email delivery"],
      rss: "https://status.example.com/history.rss",
    }
  );

  const tab = ref("email");
  const email = ref("");
  const webhook = ref("");
  const picked = ref(new Set<string>(props.components));
  const errors = reactive({ email: "", components: "", webhook: "" });
  const done = ref("");
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const all = computed(() => picked.value.size === props.components.length);

  function toggle(item: string) {
    const next = new Set(picked.value);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    picked.value = next;
  }

  function toggleAll() {
    picked.value = all.value ? new Set() : new Set(props.components);
  }

  function subscribeEmail() {
    errors.email = /^\S+@\S+\.\S+$/.test(email.value.trim()) ? "" : "Enter a valid email address.";
    errors.components = picked.value.size ? "" : "Pick at least one component.";
    if (errors.email || errors.components) return;
    done.value = `We will email ${email.value.trim()} about ${all.value ? "all components" : [...picked.value].join(", ")}.`;
  }

  function subscribeWebhook() {
    let url: URL | null = null;
    try {
      url = new URL(webhook.value.trim());
    } catch {
      url = null;
    }
    errors.webhook = url && url.protocol === "https:" ? "" : "Enter an https URL.";
    if (errors.webhook) return;
    done.value = `We will send updates to ${url!.hostname}.`;
  }
</script>
