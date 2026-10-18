<template>
  <!--
    Public link settings
    Features: A switch that turns the public link on or off, the link with a copy button, a permission select, optional password protection with a show and hide button, an expiry select, an allow download switch, a view counter and a reset link action with a confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl gap-0 py-0">
      <div class="flex items-center justify-between gap-4 px-6 py-5">
        <div>
          <h1 class="font-semibold">Public link</h1>
          <p class="text-muted-foreground text-sm">Anyone with the link can open this file.</p>
        </div>
        <UiSwitch v-model="enabled" aria-label="Enable public link" />
      </div>

      <div v-if="enabled" class="space-y-5 border-t px-6 py-5">
        <div class="space-y-2">
          <UiLabel for="public-link">Link</UiLabel>
          <div class="flex gap-2">
            <UiInput id="public-link" :model-value="link" readonly class="font-mono text-sm" />
            <UiButton variant="outline" @click="copy(link)"
              ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />{{
                copied ? "Copied" : "Copy"
              }}</UiButton
            >
          </div>
          <p class="text-muted-foreground text-xs">{{ views }} views in the last 30 days</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <UiLabel for="link-permission">Permission</UiLabel>
            <UiSelect v-model="permission">
              <UiSelectTrigger id="link-permission"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="view">Can view</UiSelectItem>
                <UiSelectItem value="comment">Can comment</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="link-expiry">Link expires</UiLabel>
            <UiSelect v-model="expiry">
              <UiSelectTrigger id="link-expiry"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="never">Never</UiSelectItem>
                <UiSelectItem value="1">In 1 day</UiSelectItem>
                <UiSelectItem value="7">In 7 days</UiSelectItem>
                <UiSelectItem value="30">In 30 days</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>
        <p class="text-muted-foreground -mt-2 text-xs" aria-live="polite">{{ expiryText }}</p>

        <div class="space-y-3">
          <div class="flex items-center justify-between gap-4">
            <UiLabel for="link-password-toggle" class="font-normal">Require a password</UiLabel>
            <UiSwitch id="link-password-toggle" v-model="protect" />
          </div>
          <div v-if="protect" class="space-y-1.5">
            <UiLabel for="link-password">Password</UiLabel>
            <div class="relative">
              <UiInput
                id="link-password"
                v-model="password"
                :type="reveal ? 'text' : 'password'"
                class="pr-10"
                autocomplete="new-password"
                :aria-invalid="!!passwordError"
              />
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="absolute top-1/2 right-1 size-7 -translate-y-1/2"
                :aria-label="reveal ? 'Hide password' : 'Show password'"
                :aria-pressed="reveal"
                @click="reveal = !reveal"
                ><Icon :name="reveal ? 'lucide:eye-off' : 'lucide:eye'" class="size-4"
              /></UiButton>
            </div>
            <p v-if="passwordError" class="text-destructive text-sm">{{ passwordError }}</p>
          </div>
          <div class="flex items-center justify-between gap-4">
            <UiLabel for="link-download" class="font-normal">Allow downloads</UiLabel>
            <UiSwitch id="link-download" v-model="download" />
          </div>
        </div>
      </div>
      <div v-else class="text-muted-foreground border-t px-6 py-10 text-center text-sm">
        <Icon name="lucide:link-2-off" class="mx-auto mb-2 size-6" />
        The public link is off. Nobody can open this file with a link.
      </div>

      <div class="flex items-center justify-between gap-3 border-t px-6 py-4">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="ghost" size="sm" class="text-destructive" :disabled="!enabled"
              >Reset link</UiButton
            >
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Reset the public link?</UiAlertDialogTitle>
              <UiAlertDialogDescription
                >The old link will stop working and a new one is created. People who have the old
                link lose access.</UiAlertDialogDescription
              >
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction @click="resetLink">Reset link</UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
        <UiButton size="sm" @click="save">Save settings</UiButton>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      baseLink?: string;
      views?: number;
    }>(),
    {
      baseLink: "https://files.example.com/s/",
      views: 128,
    }
  );

  const enabled = ref(true);
  const token = ref("q3-report-8f2a");
  const permission = ref("view");
  const expiry = ref("never");
  const protect = ref(false);
  const password = ref("");
  const reveal = ref(false);
  const download = ref(true);
  const passwordError = ref("");

  const link = computed(() => `${props.baseLink}${token.value}`);
  const expiryText = computed(() =>
    expiry.value === "never"
      ? "The link works until you turn it off."
      : `The link stops working ${expiry.value === "1" ? "after 1 day" : `after ${expiry.value} days`}.`
  );
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function resetLink() {
    token.value = Math.random().toString(36).slice(2, 10);
    useSonner.success("A new link was created");
  }

  function save() {
    if (enabled.value && protect.value && password.value.length < 6) {
      passwordError.value = "Use at least 6 characters.";
      return;
    }
    passwordError.value = "";
    useSonner.success("Link settings saved");
  }
</script>
