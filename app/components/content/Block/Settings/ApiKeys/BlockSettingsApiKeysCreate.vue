<template>
  <!--
    Create API key flow
    Features: A dialog with a name, a test or live environment, an expiry select and an optional IP allow list, validation for names and IP ranges, a second step that shows the secret once with a copy button and a confirmation checkbox that unlocks the done button
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>API keys</UiCardTitle>
      <UiCardDescription
        >Create a key for each app or server so you can revoke them one by one.</UiCardDescription
      >
      <UiCardAction>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton size="sm"><Icon name="lucide:plus" class="size-4" />Create key</UiButton>
          </UiDialogTrigger>
          <UiDialogContent
            class="sm:max-w-md"
            @interact-outside="(event) => secret && event.preventDefault()"
          >
            <template v-if="!secret">
              <UiDialogHeader>
                <UiDialogTitle>Create API key</UiDialogTitle>
                <UiDialogDescription
                  >Name the key and decide where it can be used.</UiDialogDescription
                >
              </UiDialogHeader>
              <form class="grid gap-4" novalidate @submit.prevent="create">
                <div class="grid gap-2">
                  <UiLabel for="ck-name">Name</UiLabel>
                  <UiInput
                    id="ck-name"
                    v-model="form.name"
                    placeholder="For example Production server"
                    :aria-invalid="!!errors.name"
                  />
                  <p v-if="errors.name" class="text-destructive text-sm">{{ errors.name }}</p>
                </div>
                <div class="grid gap-2">
                  <p id="ck-env" class="text-sm font-medium">Environment</p>
                  <UiToggleGroup
                    :model-value="form.env"
                    type="single"
                    variant="outline"
                    class="w-full"
                    aria-labelledby="ck-env"
                    @update:model-value="
                      (value) => (form.env = (value as 'test' | 'live') || 'test')
                    "
                  >
                    <UiToggleGroupItem value="test" class="flex-1">Test</UiToggleGroupItem>
                    <UiToggleGroupItem value="live" class="flex-1">Live</UiToggleGroupItem>
                  </UiToggleGroup>
                </div>
                <div class="grid gap-2">
                  <UiLabel for="ck-expiry">Expires</UiLabel>
                  <UiSelect v-model="form.expiry">
                    <UiSelectTrigger id="ck-expiry"><UiSelectValue /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="30">In 30 days</UiSelectItem>
                      <UiSelectItem value="90">In 90 days</UiSelectItem>
                      <UiSelectItem value="365">In 1 year</UiSelectItem>
                      <UiSelectItem value="never">Never</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
                <div class="grid gap-2">
                  <UiLabel for="ck-ips">IP allow list (optional)</UiLabel>
                  <UiTextarea
                    id="ck-ips"
                    v-model="form.ips"
                    :rows="3"
                    placeholder="One address or range per line, for example 203.0.113.0/24"
                    :aria-invalid="!!errors.ips"
                  />
                  <p v-if="errors.ips" class="text-destructive text-sm">{{ errors.ips }}</p>
                  <p v-else class="text-muted-foreground text-xs">
                    Leave it empty to allow every address.
                  </p>
                </div>
                <UiDialogFooter>
                  <UiButton type="button" variant="outline" @click="open = false">Cancel</UiButton>
                  <UiButton type="submit">Create key</UiButton>
                </UiDialogFooter>
              </form>
            </template>
            <template v-else>
              <UiDialogHeader>
                <UiDialogTitle>Copy your new key</UiDialogTitle>
                <UiDialogDescription
                  >This is the only time you will see it. Store it in a password manager or a secret
                  store.</UiDialogDescription
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
              <div class="flex items-start gap-2">
                <UiCheckbox id="ck-saved" v-model="saved" class="mt-0.5" />
                <UiLabel for="ck-saved" class="font-normal"
                  >I saved this key somewhere safe.</UiLabel
                >
              </div>
              <UiDialogFooter>
                <UiButton :disabled="saved !== true" @click="open = false">Done</UiButton>
              </UiDialogFooter>
            </template>
          </UiDialogContent>
        </UiDialog>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="p-0">
      <ul class="divide-y border-t" aria-live="polite">
        <li v-for="key in keys" :key="key.id" class="flex flex-wrap items-center gap-3 px-6 py-3">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium">{{ key.name }}</p>
            <p class="text-muted-foreground font-mono text-xs">{{ key.prefix }}••••••••</p>
          </div>
          <UiBadge variant="soft" shape="pill" :color="key.env === 'live' ? 'green' : 'blue'">{{
            key.env
          }}</UiBadge>
          <span class="text-muted-foreground text-xs">{{ key.expires }}</span>
          <span v-if="key.ips" class="text-muted-foreground flex items-center gap-1 text-xs"
            ><Icon name="lucide:shield" class="size-3.5" />{{ key.ips }} IP rules</span
          >
        </li>
        <li v-if="!keys.length" class="text-muted-foreground px-6 py-8 text-center text-sm">
          No keys yet.
        </li>
      </ul>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type Key = {
    id: number;
    name: string;
    prefix: string;
    env: "test" | "live";
    expires: string;
    ips: number;
  };

  const props = withDefaults(
    defineProps<{
      initial?: Key[];
    }>(),
    {
      initial: () => [
        {
          id: 1,
          name: "Production server",
          prefix: "sk_live_4f9a",
          env: "live",
          expires: "Expires in 80 days",
          ips: 2,
        },
        {
          id: 2,
          name: "Staging",
          prefix: "sk_test_91bc",
          env: "test",
          expires: "Never expires",
          ips: 0,
        },
      ],
    }
  );

  const keys = ref<Key[]>(props.initial.map((key) => ({ ...key })));
  const open = ref(false);
  const secret = ref("");
  const copied = ref(false);
  const saved = ref<boolean | "indeterminate">(false);
  const form = reactive({ name: "", env: "test" as "test" | "live", expiry: "90", ips: "" });
  const errors = reactive({ name: "", ips: "" });

  const cidr = /^(\d{1,3}\.){3}\d{1,3}(\/(\d|[12]\d|3[0-2]))?$/;

  function create() {
    errors.name = form.name.trim().length >= 3 ? "" : "Use a name with at least 3 characters.";
    const lines = form.ips
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const bad = lines.find(
      (line) =>
        !cidr.test(line) ||
        line
          .split("/")[0]!
          .split(".")
          .some((part) => Number(part) > 255)
    );
    errors.ips = bad ? `${bad} is not a valid address or range.` : "";
    if (errors.name || errors.ips) return;
    const token = Array.from(
      { length: 32 },
      () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]
    ).join("");
    keys.value.unshift({
      id: Date.now(),
      name: form.name.trim(),
      prefix: `sk_${form.env}_${token.slice(0, 4)}`,
      env: form.env,
      expires: form.expiry === "never" ? "Never expires" : `Expires in ${form.expiry} days`,
      ips: lines.length,
    });
    secret.value = `sk_${form.env}_${token}`;
    useSonner.success("API key created");
  }

  watch(open, (value) => onOpen(value));

  function onOpen(value: boolean) {
    if (value) return;
    setTimeout(() => {
      secret.value = "";
      copied.value = false;
      saved.value = false;
      Object.assign(form, { name: "", env: "test", expiry: "90", ips: "" });
      Object.assign(errors, { name: "", ips: "" });
    }, 200);
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
