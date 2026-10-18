<template>
  <!--
    Invite and finish
    Features: Success message, a short invite form with email and role, list of pending invites with remove buttons, a copy invite link row and a finish button that works with or without invites
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-lg">
      <div class="text-center">
        <span
          class="mx-auto grid size-14 place-items-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:check" class="size-7" />
        </span>
        <h1 class="mt-4 text-3xl font-bold tracking-tight">Your workspace is ready</h1>
        <p class="text-muted-foreground mt-2">
          One last thing: invite the people you will work with.
        </p>
      </div>

      <form class="mt-8 flex flex-col gap-2 sm:flex-row" novalidate @submit.prevent="add">
        <div class="grid flex-1 gap-1.5">
          <UiLabel for="finish-email" class="sr-only">Email address</UiLabel>
          <UiInput
            id="finish-email"
            v-model="email"
            type="email"
            placeholder="name@company.com"
            :aria-invalid="Boolean(error)"
          />
        </div>
        <UiNativeSelect v-model="role" class="sm:w-28" aria-label="Role">
          <option v-for="item in roles" :key="item">{{ item }}</option>
        </UiNativeSelect>
        <UiButton type="submit">Invite</UiButton>
      </form>
      <p v-if="error" class="text-destructive mt-2 text-sm" role="alert">{{ error }}</p>

      <ul v-if="invites.length" class="mt-4 divide-y rounded-lg border">
        <li
          v-for="invite in invites"
          :key="invite.email"
          class="flex items-center gap-3 p-3 text-sm"
        >
          <Icon name="lucide:mail" class="text-muted-foreground size-4" />
          <span class="min-w-0 flex-1 truncate">{{ invite.email }}</span>
          <UiBadge variant="secondary">{{ invite.role }}</UiBadge>
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
        <UiButton variant="outline" size="sm" @click="copy(link)">{{
          copied ? "Copied" : "Copy link"
        }}</UiButton>
      </div>

      <UiButton class="mt-8 w-full" size="lg" @click="finish">
        {{
          invites.length
            ? `Send ${invites.length} ${invites.length === 1 ? "invite" : "invites"} and finish`
            : "Finish without inviting"
        }}
      </UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      link?: string;
    }>(),
    { link: "https://acme.app/join/k3x9-p2mv" }
  );

  const roles = ["Admin", "Member", "Viewer"];

  const email = ref("");
  const role = ref("Member");
  const error = ref("");
  const invites = ref<{ email: string; role: string }[]>([]);

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function add() {
    const value = email.value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    if (!invites.value.some((invite) => invite.email === value)) {
      invites.value.push({ email: value, role: role.value });
    }
    email.value = "";
  }

  function remove(address: string) {
    invites.value = invites.value.filter((invite) => invite.email !== address);
  }

  function finish() {
    useSonner.success(invites.value.length ? `Sent ${invites.value.length} invites` : "All done");
    invites.value = [];
  }
</script>
