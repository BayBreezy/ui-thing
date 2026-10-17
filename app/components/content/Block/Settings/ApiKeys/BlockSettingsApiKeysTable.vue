<template>
  <!--
    API keys management
    Features: Create key dialog with scope select, one-time secret reveal with copy, masked keys table, last used time, revoke with confirmation
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
      <UiCardAction>
        <UiDialog v-model:open="createOpen" @update:open="onDialogChange">
          <UiDialogTrigger as-child>
            <UiButton size="sm">
              <Icon name="lucide:plus" class="size-4" />
              Create key
            </UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-md">
            <UiDialogHeader>
              <UiDialogTitle>{{ secret ? "Copy your key" : "Create API key" }}</UiDialogTitle>
              <UiDialogDescription>
                {{
                  secret
                    ? "This is the only time you will see this key. Store it somewhere safe."
                    : "Give the key a name and choose what it can access."
                }}
              </UiDialogDescription>
            </UiDialogHeader>

            <div v-if="secret" class="space-y-4">
              <div class="bg-muted flex items-center gap-2 rounded-lg border p-2 pl-3">
                <code class="flex-1 truncate font-mono text-sm">{{ secret }}</code>
                <UiButton size="sm" variant="outline" @click="copy(secret)">
                  <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
                  {{ copied ? "Copied" : "Copy" }}
                </UiButton>
              </div>
              <UiDialogFooter>
                <UiDialogClose as-child>
                  <UiButton>Done</UiButton>
                </UiDialogClose>
              </UiDialogFooter>
            </div>

            <form v-else class="grid gap-4" @submit.prevent="create">
              <div class="grid gap-2">
                <UiLabel for="key-name">Name</UiLabel>
                <UiInput id="key-name" v-model="draft.name" placeholder="e.g. Production server" />
              </div>
              <div class="grid gap-2">
                <UiLabel for="key-scope">Permissions</UiLabel>
                <UiNativeSelect id="key-scope" v-model="draft.scope">
                  <option>Read only</option>
                  <option>Read & write</option>
                  <option>Admin</option>
                </UiNativeSelect>
              </div>
              <UiDialogFooter>
                <UiDialogClose as-child>
                  <UiButton type="button" variant="outline">Cancel</UiButton>
                </UiDialogClose>
                <UiButton type="submit" :disabled="!draft.name.trim()">Create key</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </UiCardAction>
    </UiCardHeader>
    <UiCardContent class="p-0">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-6">Name</UiTableHead>
            <UiTableHead>Key</UiTableHead>
            <UiTableHead>Permissions</UiTableHead>
            <UiTableHead>Last used</UiTableHead>
            <UiTableHead class="w-12 pr-6" />
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="key in keys" :key="key.id">
            <UiTableCell class="pl-6 font-medium">{{ key.name }}</UiTableCell>
            <UiTableCell>
              <code class="text-muted-foreground font-mono text-xs">{{ key.prefix }}••••••••</code>
            </UiTableCell>
            <UiTableCell>
              <UiBadge variant="outline">{{ key.scope }}</UiBadge>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground">{{ key.lastUsed }}</UiTableCell>
            <UiTableCell class="pr-6 text-right">
              <UiAlertDialog>
                <UiAlertDialogTrigger as-child>
                  <UiButton
                    variant="ghost"
                    size="icon-sm"
                    class="text-destructive hover:text-destructive"
                    :aria-label="`Revoke ${key.name}`"
                  >
                    <Icon name="lucide:trash-2" class="size-4" />
                  </UiButton>
                </UiAlertDialogTrigger>
                <UiAlertDialogContent>
                  <UiAlertDialogHeader>
                    <UiAlertDialogTitle>Revoke "{{ key.name }}"?</UiAlertDialogTitle>
                    <UiAlertDialogDescription>
                      Anything using this key will immediately lose access. This can't be undone.
                    </UiAlertDialogDescription>
                  </UiAlertDialogHeader>
                  <UiAlertDialogFooter>
                    <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                    <UiAlertDialogAction @click="revoke(key.id)">Revoke key</UiAlertDialogAction>
                  </UiAlertDialogFooter>
                </UiAlertDialogContent>
              </UiAlertDialog>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!keys.length" :colspan="5">No API keys yet.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  type ApiKey = { id: number; name: string; prefix: string; scope: string; lastUsed: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "API keys",
      description: "Keys let your servers talk to the API. Treat them like passwords.",
    }
  );

  const keys = ref<ApiKey[]>([
    {
      id: 1,
      name: "Production server",
      prefix: "sk_live_4f9a",
      scope: "Read & write",
      lastUsed: "2 minutes ago",
    },
    {
      id: 2,
      name: "CI pipeline",
      prefix: "sk_live_91bc",
      scope: "Read only",
      lastUsed: "Yesterday",
    },
    { id: 3, name: "Local development", prefix: "sk_test_c07d", scope: "Admin", lastUsed: "Never" },
  ]);

  const createOpen = ref(false);
  const draft = reactive({ name: "", scope: "Read only" });
  const secret = ref("");
  const copied = ref(false);

  function randomToken(length: number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      ""
    );
  }

  function create() {
    const token = randomToken(32);
    keys.value.unshift({
      id: Date.now(),
      name: draft.name.trim(),
      prefix: `sk_live_${token.slice(0, 4)}`,
      scope: draft.scope,
      lastUsed: "Never",
    });
    secret.value = `sk_live_${token}`;
    useSonner.success("API key created");
  }

  function onDialogChange(open: boolean) {
    if (open) return;
    // Reset after the close animation so the form does not flash back mid-transition.
    setTimeout(() => {
      secret.value = "";
      copied.value = false;
      Object.assign(draft, { name: "", scope: "Read only" });
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

  function revoke(id: number) {
    keys.value = keys.value.filter((key) => key.id !== id);
    useSonner.success("API key revoked");
  }
</script>
