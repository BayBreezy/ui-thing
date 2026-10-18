<template>
  <!--
    Three pane email style inbox
    Features: Folder sidebar with counts, message list with star and unread state, reading pane with reply, archive and delete actions, keyboard friendly rows and responsive collapse of the folder pane
  -->
  <div
    class="mx-auto grid h-[40rem] w-full max-w-6xl overflow-hidden rounded-xl border md:grid-cols-[20rem_1fr] lg:grid-cols-[13rem_20rem_1fr]"
  >
    <nav class="bg-muted/30 hidden flex-col gap-1 border-r p-3 lg:flex" aria-label="Folders">
      <UiButton class="mb-2 justify-start" @click="useSonner.info('Open your compose window here')">
        <Icon name="lucide:pen-line" class="size-4" />
        Compose
      </UiButton>
      <button
        v-for="item in folders"
        :key="item.id"
        type="button"
        class="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none focus-visible:ring-[3px]"
        :class="folder === item.id ? 'bg-accent font-medium' : ''"
        :aria-current="folder === item.id ? 'page' : undefined"
        @click="folder = item.id"
      >
        <Icon :name="item.icon" class="size-4" />
        <span class="flex-1 text-left">{{ item.label }}</span>
        <span class="text-muted-foreground text-xs tabular-nums">{{
          countFor(item.id) || ""
        }}</span>
      </button>
    </nav>

    <section class="flex min-h-0 flex-col border-r" aria-label="Messages">
      <div class="flex items-center justify-between border-b px-4 py-3">
        <h1 class="font-semibold capitalize">{{ folder }}</h1>
        <UiSelect v-model="folder">
          <UiSelectTrigger size="sm" class="w-28 lg:hidden" aria-label="Folder">
            <UiSelectValue />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="item in folders" :key="item.id" :value="item.id">{{
              item.label
            }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
      <ul class="min-h-0 flex-1 divide-y overflow-y-auto" role="list">
        <li v-for="mail in list" :key="mail.id" class="flex">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 min-w-0 flex-1 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            :class="mail.id === selectedId ? 'bg-muted' : ''"
            @click="read(mail)"
          >
            <span class="flex items-center justify-between gap-2">
              <span class="truncate text-sm" :class="mail.unread ? 'font-semibold' : ''">{{
                mail.from
              }}</span>
              <span class="text-muted-foreground shrink-0 text-xs">{{ mail.time }}</span>
            </span>
            <span class="block truncate text-sm" :class="mail.unread ? 'font-medium' : ''">{{
              mail.subject
            }}</span>
            <span class="text-muted-foreground line-clamp-1 text-xs">{{ mail.body }}</span>
          </button>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="mt-2.5 mr-2"
            :aria-label="mail.starred ? `Unstar ${mail.subject}` : `Star ${mail.subject}`"
            :aria-pressed="mail.starred"
            @click="mail.starred = !mail.starred"
          >
            <Icon
              name="lucide:star"
              class="size-4"
              :class="mail.starred ? 'fill-amber-400 text-amber-500' : ''"
            />
          </UiButton>
        </li>
        <li v-if="!list.length" class="text-muted-foreground px-4 py-12 text-center text-sm">
          Nothing here.
        </li>
      </ul>
    </section>

    <article class="hidden min-h-0 flex-col md:flex" aria-label="Message">
      <template v-if="selected">
        <div class="flex items-center gap-1 border-b px-4 py-2">
          <UiButton variant="ghost" size="sm" @click="move(selected, 'archive')"
            ><Icon name="lucide:archive" class="size-4" />Archive</UiButton
          >
          <UiButton variant="ghost" size="sm" @click="move(selected, 'trash')"
            ><Icon name="lucide:trash-2" class="size-4" />Delete</UiButton
          >
          <UiButton
            variant="ghost"
            size="sm"
            class="ml-auto"
            @click="useSonner.info('Open your reply window here')"
            ><Icon name="lucide:reply" class="size-4" />Reply</UiButton
          >
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto p-6">
          <h2 class="text-xl font-semibold">{{ selected.subject }}</h2>
          <div class="mt-4 flex items-center gap-3">
            <UiAvatar :src="selected.avatar" :fallback="selected.from[0]" />
            <div class="text-sm">
              <p class="font-medium">{{ selected.from }}</p>
              <p class="text-muted-foreground">{{ selected.time }}</p>
            </div>
          </div>
          <p class="mt-6 text-sm leading-relaxed">{{ selected.body }}</p>
        </div>
      </template>
      <div v-else class="text-muted-foreground grid flex-1 place-items-center text-sm">
        Select a message to read it.
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
  type Mail = {
    id: string;
    from: string;
    avatar: string;
    subject: string;
    body: string;
    time: string;
    unread: boolean;
    starred: boolean;
    folder: string;
  };

  const props = withDefaults(
    defineProps<{
      mails?: Mail[];
    }>(),
    {
      mails: () => [
        {
          id: "m1",
          from: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          subject: "New onboarding mockups",
          body: "Hi! I have attached the latest mockups for the onboarding flow. The checklist idea tested well with five users and I would love your thoughts before we start building.",
          time: "9:41 AM",
          unread: true,
          starred: false,
          folder: "inbox",
        },
        {
          id: "m2",
          from: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          subject: "Staging deploy finished",
          body: "The fix for the flaky checkout test is live on staging. Everything looks green and I will promote it to production after lunch.",
          time: "9:12 AM",
          unread: true,
          starred: true,
          folder: "inbox",
        },
        {
          id: "m3",
          from: "Aisha Khan",
          avatar: "https://i.pravatar.cc/80?img=44",
          subject: "Campaign results",
          body: "The autumn campaign beat its target by 18 percent. A short report with the breakdown by channel is attached for the leadership update.",
          time: "Yesterday",
          unread: false,
          starred: false,
          folder: "inbox",
        },
        {
          id: "m4",
          from: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          subject: "Invoice 1042",
          body: "Please find the invoice for September attached. Payment terms are 30 days as usual. Let me know if anything needs changing.",
          time: "Mon",
          unread: false,
          starred: true,
          folder: "inbox",
        },
        {
          id: "m5",
          from: "Me",
          avatar: "https://i.pravatar.cc/80?img=45",
          subject: "Re: Budget approval",
          body: "Thanks, approved. Go ahead and place the order and keep finance in copy.",
          time: "Sun",
          unread: false,
          starred: false,
          folder: "sent",
        },
      ],
    }
  );

  const folders = [
    { id: "inbox", label: "Inbox", icon: "lucide:inbox" },
    { id: "starred", label: "Starred", icon: "lucide:star" },
    { id: "sent", label: "Sent", icon: "lucide:send" },
    { id: "archive", label: "Archive", icon: "lucide:archive" },
    { id: "trash", label: "Trash", icon: "lucide:trash-2" },
  ];

  const mails = ref<Mail[]>(props.mails.map((mail) => ({ ...mail })));
  const folder = ref("inbox");
  const selectedId = ref(mails.value[0]?.id ?? "");

  const inFolder = (mail: Mail, id: string) =>
    id === "starred" ? mail.starred && mail.folder !== "trash" : mail.folder === id;
  const list = computed(() => mails.value.filter((mail) => inFolder(mail, folder.value)));
  const selected = computed(() =>
    mails.value.find((mail) => mail.id === selectedId.value && inFolder(mail, folder.value))
  );

  function countFor(id: string) {
    if (id === "inbox")
      return mails.value.filter((mail) => mail.folder === "inbox" && mail.unread).length;
    return 0;
  }

  function read(mail: Mail) {
    selectedId.value = mail.id;
    mail.unread = false;
  }

  function move(mail: Mail, to: string) {
    mail.folder = to;
    selectedId.value = list.value[0]?.id ?? "";
    useSonner.success(`Moved to ${to}`);
  }
</script>
