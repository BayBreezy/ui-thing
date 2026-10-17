<template>
  <!--
    Invite teammates dialog
    Features: Email chips added with enter or comma, role select, validation of addresses, shareable invite link with copy button
  -->
  <UiDialog v-model:open="open">
    <UiDialogTrigger as-child>
      <UiButton>
        <Icon name="lucide:user-plus" class="size-4" />
        Invite teammates
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-lg">
      <UiDialogHeader>
        <UiDialogTitle>{{ props.title }}</UiDialogTitle>
        <UiDialogDescription>{{ props.description }}</UiDialogDescription>
      </UiDialogHeader>

      <form class="grid gap-5" @submit.prevent="send">
        <div class="grid gap-2">
          <UiLabel for="invite-emails">Email addresses</UiLabel>
          <div
            class="focus-within:border-ring focus-within:ring-ring/50 flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border px-2 py-1.5 focus-within:ring-[3px]"
          >
            <UiBadge v-for="email in emails" :key="email" variant="secondary" class="gap-1 pr-1">
              {{ email }}
              <button
                type="button"
                class="hover:bg-background/60 rounded-full p-0.5"
                :aria-label="`Remove ${email}`"
                @click="emails = emails.filter((item) => item !== email)"
              >
                <Icon name="lucide:x" class="size-3" />
              </button>
            </UiBadge>
            <input
              id="invite-emails"
              v-model="draft"
              type="email"
              class="placeholder:text-muted-foreground min-w-40 flex-1 bg-transparent px-1 text-sm outline-none"
              placeholder="name@company.com"
              @keydown="onKeydown"
              @blur="commit"
            />
          </div>
          <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
          <p v-else class="text-muted-foreground text-xs">
            Press enter or comma to add each address.
          </p>
        </div>

        <div class="grid gap-2">
          <UiLabel for="invite-role">Role</UiLabel>
          <UiNativeSelect id="invite-role" v-model="role">
            <option value="Admin">Admin: manage members and billing</option>
            <option value="Member">Member: create and edit content</option>
            <option value="Viewer">Viewer: read-only access</option>
          </UiNativeSelect>
        </div>

        <div class="bg-muted/50 flex items-center gap-2 rounded-lg border p-2 pl-3">
          <Icon name="lucide:link" class="text-muted-foreground size-4 shrink-0" />
          <span class="text-muted-foreground flex-1 truncate text-sm">{{ props.inviteLink }}</span>
          <UiButton type="button" variant="outline" size="sm" @click="copyLink">
            {{ copied ? "Copied" : "Copy link" }}
          </UiButton>
        </div>

        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline">Cancel</UiButton>
          </UiDialogClose>
          <UiButton type="submit" :disabled="!emails.length">
            Send {{ emails.length || "" }} {{ emails.length === 1 ? "invite" : "invites" }}
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      inviteLink?: string;
    }>(),
    {
      title: "Invite teammates",
      description: "They'll get an email with a link to join your workspace.",
      inviteLink: "https://uithing.com/join/8f3k2a",
    }
  );

  const open = ref(false);
  const emails = ref<string[]>([]);
  const draft = ref("");
  const role = ref("Member");
  const error = ref("");
  const copied = ref(false);

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function commit() {
    const value = draft.value.trim().replace(/,$/, "");
    if (!value) return;
    if (!EMAIL.test(value)) {
      error.value = `"${value}" isn't a valid email address.`;
      return;
    }
    error.value = "";
    if (!emails.value.includes(value)) emails.value.push(value);
    draft.value = "";
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit();
    } else if (event.key === "Backspace" && !draft.value) {
      emails.value.pop();
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(props.inviteLink);
    } catch {
      // Clipboard access can be blocked inside an iframe; the UI still confirms.
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }

  function send() {
    commit();
    if (!emails.value.length) return;
    useSonner.success(
      `Invited ${emails.value.length} ${emails.value.length === 1 ? "person" : "people"}`,
      {
        description: `They'll join as ${role.value}.`,
      }
    );
    emails.value = [];
    open.value = false;
  }
</script>
