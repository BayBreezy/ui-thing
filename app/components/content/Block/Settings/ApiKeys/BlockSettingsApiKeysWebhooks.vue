<template>
  <!--
    Webhook endpoints
    Features: A list of endpoints with the events they receive, an enabled switch, a send test button with a result, remove with a confirmation, an add endpoint dialog with https validation and an events checklist that shows the signing secret once, and a list of recent deliveries with status codes
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Webhooks</UiCardTitle>
      <UiCardDescription
        >Get an HTTP request when something happens in your workspace.</UiCardDescription
      >
      <UiCardAction>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton size="sm"><Icon name="lucide:plus" class="size-4" />Add endpoint</UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-md">
            <template v-if="!secret">
              <UiDialogHeader>
                <UiDialogTitle>Add endpoint</UiDialogTitle>
                <UiDialogDescription
                  >We send a signed JSON POST request to this address.</UiDialogDescription
                >
              </UiDialogHeader>
              <form class="grid gap-4" novalidate @submit.prevent="add">
                <div class="grid gap-2">
                  <UiLabel for="wh-url">Endpoint URL</UiLabel>
                  <UiInput
                    id="wh-url"
                    v-model="form.url"
                    type="url"
                    placeholder="https://example.com/webhooks"
                    :aria-invalid="!!errors.url"
                  />
                  <p v-if="errors.url" class="text-destructive text-sm">{{ errors.url }}</p>
                </div>
                <fieldset class="grid gap-2">
                  <legend class="mb-1 text-sm font-medium">Events</legend>
                  <div v-for="event in events" :key="event" class="flex items-center gap-2">
                    <UiCheckbox
                      :id="`wh-${event}`"
                      :model-value="form.events.includes(event)"
                      @update:model-value="toggleEvent(event)"
                    />
                    <UiLabel :for="`wh-${event}`" class="font-mono text-xs font-normal">{{
                      event
                    }}</UiLabel>
                  </div>
                  <p v-if="errors.events" class="text-destructive text-sm">{{ errors.events }}</p>
                </fieldset>
                <UiDialogFooter>
                  <UiButton type="button" variant="outline" @click="open = false">Cancel</UiButton>
                  <UiButton type="submit">Add endpoint</UiButton>
                </UiDialogFooter>
              </form>
            </template>
            <template v-else>
              <UiDialogHeader>
                <UiDialogTitle>Signing secret</UiDialogTitle>
                <UiDialogDescription
                  >Use it to check the signature header on every request. You will not see it
                  again.</UiDialogDescription
                >
              </UiDialogHeader>
              <div class="bg-muted flex items-center gap-2 rounded-lg border p-2 pl-3">
                <code class="min-w-0 flex-1 truncate font-mono text-sm">{{ secret }}</code>
                <UiButton size="sm" variant="outline" @click="copy(secret)"
                  ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />{{
                    copied ? "Copied" : "Copy"
                  }}</UiButton
                >
              </div>
              <UiDialogFooter><UiButton @click="open = false">Done</UiButton></UiDialogFooter>
            </template>
          </UiDialogContent>
        </UiDialog>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="space-y-6 p-0">
      <ul class="divide-y border-t" aria-live="polite">
        <li
          v-for="endpoint in endpoints"
          :key="endpoint.id"
          class="flex flex-wrap items-center gap-3 px-6 py-4"
        >
          <div class="min-w-0 flex-1">
            <p class="truncate font-mono text-sm">{{ endpoint.url }}</p>
            <div class="mt-1.5 flex flex-wrap gap-1.5">
              <UiBadge
                v-for="event in endpoint.events"
                :key="event"
                variant="outline"
                class="font-mono text-[11px]"
                >{{ event }}</UiBadge
              >
            </div>
            <p
              v-if="endpoint.result"
              class="mt-1.5 text-xs"
              :class="
                endpoint.result.ok ? 'text-green-600 dark:text-green-400' : 'text-destructive'
              "
              role="status"
            >
              {{ endpoint.result.text }}
            </p>
          </div>
          <UiButton
            variant="outline"
            size="sm"
            :loading="testing === endpoint.id"
            :disabled="!endpoint.enabled"
            @click="test(endpoint)"
            >Send test</UiButton
          >
          <UiSwitch
            :model-value="endpoint.enabled"
            :aria-label="`${endpoint.enabled ? 'Disable' : 'Enable'} ${endpoint.url}`"
            @update:model-value="endpoint.enabled = $event"
          />
          <UiAlertDialog>
            <UiAlertDialogTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="text-destructive"
                :aria-label="`Remove ${endpoint.url}`"
                ><Icon name="lucide:trash-2" class="size-4"
              /></UiButton>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent>
              <UiAlertDialogHeader>
                <UiAlertDialogTitle>Remove this endpoint?</UiAlertDialogTitle>
                <UiAlertDialogDescription
                  >{{ endpoint.url }} will stop receiving events.</UiAlertDialogDescription
                >
              </UiAlertDialogHeader>
              <UiAlertDialogFooter>
                <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                <UiAlertDialogAction
                  @click="endpoints = endpoints.filter((item) => item.id !== endpoint.id)"
                  >Remove</UiAlertDialogAction
                >
              </UiAlertDialogFooter>
            </UiAlertDialogContent>
          </UiAlertDialog>
        </li>
        <li v-if="!endpoints.length" class="text-muted-foreground px-6 py-8 text-center text-sm">
          No endpoints yet.
        </li>
      </ul>

      <section class="px-6 pb-6" aria-label="Recent deliveries">
        <h3 class="mb-2 text-sm font-semibold">Recent deliveries</h3>
        <ul class="divide-y rounded-lg border text-sm">
          <li
            v-for="delivery in deliveries"
            :key="delivery.id"
            class="flex items-center gap-3 px-4 py-2.5"
          >
            <UiBadge
              variant="soft"
              shape="pill"
              :color="delivery.status < 300 ? 'green' : 'red'"
              class="tabular-nums"
              >{{ delivery.status }}</UiBadge
            >
            <span class="flex-1 truncate font-mono text-xs">{{ delivery.event }}</span>
            <span class="text-muted-foreground text-xs">{{ delivery.when }}</span>
          </li>
        </ul>
      </section>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Endpoint = {
    id: number;
    url: string;
    events: string[];
    enabled: boolean;
    result?: { ok: boolean; text: string };
  };
  type Delivery = { id: number; status: number; event: string; when: string };

  const props = withDefaults(
    defineProps<{
      initial?: Endpoint[];
      deliveries?: Delivery[];
    }>(),
    {
      initial: () => [
        {
          id: 1,
          url: "https://api.example.com/hooks/acme",
          events: ["project.created", "member.invited"],
          enabled: true,
        },
        {
          id: 2,
          url: "https://hooks.example.org/billing",
          events: ["invoice.paid"],
          enabled: false,
        },
      ],
      deliveries: () => [
        { id: 1, status: 200, event: "project.created", when: "2 minutes ago" },
        { id: 2, status: 200, event: "member.invited", when: "1 hour ago" },
        { id: 3, status: 500, event: "project.created", when: "Yesterday" },
      ],
    }
  );

  const events = ["project.created", "project.deleted", "member.invited", "invoice.paid"];
  const endpoints = ref<Endpoint[]>(
    props.initial.map((endpoint) => ({ ...endpoint, events: [...endpoint.events] }))
  );
  const open = ref(false);
  const secret = ref("");
  const copied = ref(false);
  const testing = ref(0);
  const form = reactive({ url: "", events: [] as string[] });
  const errors = reactive({ url: "", events: "" });

  function toggleEvent(event: string) {
    form.events = form.events.includes(event)
      ? form.events.filter((item) => item !== event)
      : [...form.events, event];
  }

  function add() {
    let url: URL | null = null;
    try {
      url = new URL(form.url.trim());
    } catch {
      url = null;
    }
    errors.url = url && url.protocol === "https:" ? "" : "Enter an address that starts with https.";
    errors.events = form.events.length ? "" : "Choose at least one event.";
    if (errors.url || errors.events) return;
    endpoints.value.push({
      id: Date.now(),
      url: form.url.trim(),
      events: [...form.events],
      enabled: true,
    });
    secret.value = `whsec_${Math.random().toString(36).slice(2, 12)}${Math.random().toString(36).slice(2, 12)}`;
  }

  watch(open, (value) => onOpen(value));

  function onOpen(value: boolean) {
    if (value) return;
    setTimeout(() => {
      secret.value = "";
      copied.value = false;
      Object.assign(form, { url: "", events: [] });
      Object.assign(errors, { url: "", events: "" });
    }, 200);
  }

  function test(endpoint: Endpoint) {
    testing.value = endpoint.id;
    endpoint.result = undefined;
    setTimeout(() => {
      testing.value = 0;
      const ok = !endpoint.url.includes("example.org");
      endpoint.result = ok
        ? { ok, text: "Test event delivered. Your server answered 200." }
        : { ok, text: "Your server answered 500. Check the endpoint logs." };
    }, 700);
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard access can be blocked inside an iframe; the UI still confirms.
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }
</script>
