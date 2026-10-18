<template>
  <!--
    Notifications with inline actions
    Features: Invitations with accept and decline buttons that settle into a result with an undo, join requests, comments with an inline reply box and a plain update, all with unread markers
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">Notifications</h1>
      <ul class="mt-6 space-y-3" aria-live="polite">
        <li v-for="item in items" :key="item.id" class="rounded-xl border p-4">
          <div class="flex items-start gap-3">
            <UiAvatar
              :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
              :fallback="item.actor.slice(0, 1)"
              class="size-10"
            />
            <div class="min-w-0 flex-1">
              <p class="text-sm">
                <span class="font-medium">{{ item.actor }}</span> {{ item.text }}
                <span class="font-medium">{{ item.target }}</span>
              </p>
              <p
                v-if="item.quote"
                class="text-muted-foreground bg-muted/50 mt-2 rounded-md border-l-2 px-3 py-2 text-sm"
              >
                {{ item.quote }}
              </p>
              <p class="text-muted-foreground mt-1 text-xs">{{ item.time }}</p>

              <div v-if="item.kind === 'invite' || item.kind === 'request'" class="mt-3">
                <div v-if="!item.result" class="flex gap-2">
                  <UiButton
                    size="sm"
                    @click="resolve(item, item.kind === 'invite' ? 'Accepted' : 'Approved')"
                    >{{ item.kind === "invite" ? "Accept" : "Approve" }}</UiButton
                  >
                  <UiButton variant="outline" size="sm" @click="resolve(item, 'Declined')"
                    >Decline</UiButton
                  >
                </div>
                <p v-else class="flex items-center gap-2 text-sm">
                  <UiBadge
                    variant="soft"
                    shape="pill"
                    :color="item.result === 'Declined' ? 'red' : 'green'"
                    >{{ item.result }}</UiBadge
                  >
                  <UiButton variant="link" size="sm" class="h-auto p-0" @click="item.result = ''"
                    >Undo</UiButton
                  >
                </p>
              </div>

              <div v-if="item.kind === 'comment'" class="mt-3">
                <UiButton
                  v-if="replying !== item.id"
                  variant="outline"
                  size="sm"
                  @click="replying = item.id"
                  ><Icon name="lucide:reply" class="size-4" />Reply</UiButton
                >
                <form v-else class="flex gap-2" @submit.prevent="send(item)">
                  <UiInput
                    v-model="draft"
                    :aria-label="`Reply to ${item.actor}`"
                    placeholder="Write a reply"
                    autofocus
                  />
                  <UiButton type="submit" size="sm" :disabled="!draft.trim()">Send</UiButton>
                  <UiButton type="button" variant="ghost" size="sm" @click="replying = ''"
                    >Cancel</UiButton
                  >
                </form>
              </div>
            </div>
            <span
              v-if="item.unread"
              class="bg-primary mt-2 size-2 shrink-0 rounded-full"
              aria-label="Unread"
            />
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "invite" | "request" | "comment" | "update";
  type Notification = {
    id: string;
    kind: Kind;
    actor: string;
    avatar: number;
    text: string;
    target: string;
    quote?: string;
    time: string;
    unread: boolean;
    result?: string;
  };

  const props = withDefaults(
    defineProps<{
      notifications?: Notification[];
    }>(),
    {
      notifications: () => [
        {
          id: "a1",
          kind: "invite",
          actor: "Sofia Alvarez",
          avatar: 45,
          text: "invited you to join the workspace",
          target: "Product team",
          time: "12 minutes ago",
          unread: true,
        },
        {
          id: "a2",
          kind: "request",
          actor: "Tom Becker",
          avatar: 33,
          text: "asked to join",
          target: "Support rota",
          time: "1 hour ago",
          unread: true,
        },
        {
          id: "a3",
          kind: "comment",
          actor: "Maya Patel",
          avatar: 32,
          text: "commented on",
          target: "Homepage redesign",
          quote: "Can we try a larger hero image on mobile?",
          time: "3 hours ago",
          unread: true,
        },
        {
          id: "a4",
          kind: "update",
          actor: "Noah Kim",
          avatar: 15,
          text: "moved",
          target: "Release 2.4 to Done",
          time: "Yesterday",
          unread: false,
        },
      ],
    }
  );

  const items = ref<Notification[]>(
    props.notifications.map((item) => ({ ...item, result: item.result ?? "" }))
  );
  const replying = ref("");
  const draft = ref("");

  function resolve(item: Notification, result: string) {
    item.result = result;
    item.unread = false;
  }

  function send(item: Notification) {
    useSonner.success(`Reply sent to ${item.actor}`);
    item.unread = false;
    draft.value = "";
    replying.value = "";
  }
</script>
