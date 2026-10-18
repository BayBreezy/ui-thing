<template>
  <!--
    Invite teammates with email chips
    Features: Type or paste several emails, press enter or comma to add, invalid addresses flagged, per person role select, remove buttons, copy invite link and a send button with a count
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-xl">
      <h1 class="text-3xl font-bold tracking-tight">Invite your teammates</h1>
      <p class="text-muted-foreground mt-2">
        Work is better together. Add the people you work with.
      </p>

      <div class="mt-8 grid gap-2">
        <UiLabel for="invite-input">Email addresses</UiLabel>
        <div class="flex gap-2">
          <UiInput
            id="invite-input"
            v-model="draft"
            type="email"
            placeholder="name@company.com"
            @keydown.enter.prevent="add"
            @keydown.,.prevent="add"
            @paste="onPaste"
          />
          <UiButton variant="outline" @click="add">Add</UiButton>
        </div>
        <p v-if="error" class="text-destructive text-sm" role="alert">{{ error }}</p>
        <p v-else class="text-muted-foreground text-xs">
          Press enter or comma to add. You can paste a list too.
        </p>
      </div>

      <ul v-if="invites.length" class="mt-6 divide-y rounded-lg border">
        <li v-for="invite in invites" :key="invite.email" class="flex items-center gap-3 p-3">
          <UiAvatar :fallback="invite.email[0]!.toUpperCase()" />
          <span class="min-w-0 flex-1 truncate text-sm">{{ invite.email }}</span>
          <UiNativeSelect
            v-model="invite.role"
            class="h-8 w-28"
            :aria-label="`Role for ${invite.email}`"
          >
            <option v-for="role in roles" :key="role">{{ role }}</option>
          </UiNativeSelect>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Remove ${invite.email}`"
            @click="remove(invite.email)"
          >
            <Icon name="lucide:x" class="size-4" />
          </UiButton>
        </li>
      </ul>

      <div class="bg-muted/50 mt-6 flex items-center gap-3 rounded-lg border p-3 text-sm">
        <Icon name="lucide:link" class="text-muted-foreground size-4 shrink-0" />
        <span class="text-muted-foreground min-w-0 flex-1 truncate">{{ link }}</span>
        <UiButton variant="outline" size="sm" @click="copyLink">{{
          copied ? "Copied" : "Copy link"
        }}</UiButton>
      </div>

      <div class="mt-8 flex items-center justify-between">
        <UiButton variant="ghost" @click="useSonner.info('Skipped')">Skip for now</UiButton>
        <UiButton :disabled="!invites.length" @click="send">
          Send {{ invites.length || "" }} {{ invites.length === 1 ? "invite" : "invites" }}
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      link?: string;
    }>(),
    { link: "https://acme.app/join/k3x9-p2mv" }
  );

  const roles = ["Admin", "Member", "Viewer"];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const draft = ref("");
  const error = ref("");
  const invites = ref<{ email: string; role: string }[]>([]);

  function addEmail(raw: string) {
    const email = raw.trim().toLowerCase();
    if (!email) return true;
    if (!emailPattern.test(email)) {
      error.value = `${raw.trim()} is not a valid email address.`;
      return false;
    }
    if (!invites.value.some((invite) => invite.email === email)) {
      invites.value.push({ email, role: "Member" });
    }
    return true;
  }

  function add() {
    error.value = "";
    if (addEmail(draft.value)) draft.value = "";
  }

  function onPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData("text") ?? "";
    if (!/[\s,;]/.test(text.trim())) return;
    event.preventDefault();
    error.value = "";
    text
      .split(/[\s,;]+/)
      .filter(Boolean)
      .forEach(addEmail);
  }

  function remove(email: string) {
    invites.value = invites.value.filter((invite) => invite.email !== email);
  }

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function copyLink() {
    copy(props.link);
  }

  function send() {
    useSonner.success(
      `Sent ${invites.value.length} ${invites.value.length === 1 ? "invite" : "invites"}`
    );
    invites.value = [];
  }
</script>
