<template>
  <!--
    Invite your team empty state with an inline invite form
    Features: Overlapping dashed avatar placeholders, email field with validation and invite button, copyable invite link, list of pending invites
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-md flex-col items-center text-center">
      <div class="flex -space-x-3" aria-hidden="true">
        <span
          v-for="(avatar, i) in avatars"
          :key="i"
          class="bg-background flex size-14 items-center justify-center rounded-full border-2"
          :class="avatar.invited ? 'border-primary' : 'border-dashed'"
          :style="{ zIndex: avatars.length - i }"
        >
          <img
            v-if="avatar.src"
            :src="avatar.src"
            alt=""
            class="size-full rounded-full object-cover"
          />
          <Icon v-else name="lucide:user-plus" class="text-muted-foreground size-5" />
        </span>
      </div>

      <div class="mt-6 flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <form class="mt-6 w-full" novalidate @submit.prevent="invite">
        <div class="flex gap-2">
          <UiInput
            v-model="email"
            type="email"
            placeholder="teammate@company.com"
            aria-label="Teammate email"
            :aria-invalid="!!error"
          />
          <UiButton type="submit">Invite</UiButton>
        </div>
        <p v-if="error" class="text-destructive mt-2 text-left text-sm">{{ error }}</p>
      </form>

      <ul v-if="pending.length" class="mt-4 w-full space-y-2">
        <li
          v-for="address in pending"
          :key="address"
          class="bg-card flex items-center gap-3 rounded-lg border p-2.5 text-left text-sm"
        >
          <span class="bg-muted flex size-8 items-center justify-center rounded-full">
            <Icon name="lucide:mail" class="size-4" />
          </span>
          <span class="min-w-0 flex-1 truncate">{{ address }}</span>
          <UiBadge variant="secondary">Pending</UiBadge>
        </li>
      </ul>

      <div class="my-6 flex w-full items-center gap-3">
        <div class="bg-border h-px flex-1" />
        <span class="text-muted-foreground text-xs">or share a link</span>
        <div class="bg-border h-px flex-1" />
      </div>

      <slot>
        <UiButton variant="outline" class="w-full" @click="copy">
          <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4" />
          {{ copied ? "Link copied" : "Copy invite link" }}
        </UiButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      inviteLink?: string;
    }>(),
    {
      title: "It's quiet in here",
      description:
        "You're the only one in this workspace. Invite teammates to start collaborating.",
      inviteLink: "https://uithing.com/join/8f3k2a",
    }
  );

  const email = ref("");
  const error = ref("");
  const pending = ref<string[]>([]);
  const copied = ref(false);

  const avatars = computed(() => [
    { src: "https://i.pravatar.cc/120?img=47", invited: true },
    ...pending.value.slice(0, 2).map(() => ({ src: "", invited: true })),
    ...Array.from({ length: Math.max(0, 3 - pending.value.length) }, () => ({
      src: "",
      invited: false,
    })),
  ]);

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function invite() {
    const value = email.value.trim();
    if (!EMAIL.test(value)) {
      error.value = "Enter a valid email address.";
      return;
    }
    if (pending.value.includes(value)) {
      error.value = "That address has already been invited.";
      return;
    }
    error.value = "";
    pending.value.push(value);
    email.value = "";
    useSonner.success("Invite sent", { description: value });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(props.inviteLink);
    } catch {
      // Clipboard access can be blocked inside an iframe; the UI still confirms.
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }
</script>
