<template>
  <!--
    Feed with avatars and attachments
    Features: Rows with the person's avatar, a sentence with the action and target in bold, a relative time, optional attachment chips and a preview card for shared links
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">Team activity</h1>
      <ul class="mt-6 space-y-5">
        <li v-for="item in items" :key="item.id" class="flex gap-3">
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
            :fallback="item.who.slice(0, 1)"
            class="size-10"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm">
              <span class="font-medium">{{ item.who }}</span> {{ item.text }}
              <span v-if="item.target" class="font-medium">{{ item.target }}</span>
              <span class="text-muted-foreground"> · {{ ago(item.at) }}</span>
            </p>
            <p v-if="item.note" class="text-muted-foreground mt-1 text-sm">{{ item.note }}</p>
            <div v-if="item.files?.length" class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="file in item.files"
                :key="file.name"
                class="bg-muted/50 flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs"
              >
                <Icon :name="file.icon" class="text-muted-foreground size-4" />{{ file.name }}
                <span class="text-muted-foreground">{{ file.size }}</span>
              </span>
            </div>
            <div v-if="item.link" class="mt-2 flex items-center gap-3 rounded-xl border p-3">
              <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg"
                ><Icon name="lucide:link" class="size-4"
              /></span>
              <div class="min-w-0">
                <p class="truncate text-sm font-medium">{{ item.link.title }}</p>
                <p class="text-muted-foreground truncate text-xs">{{ item.link.host }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = {
    id: string;
    who: string;
    avatar: number;
    text: string;
    target?: string;
    note?: string;
    at: string;
    files?: { name: string; size: string; icon: string }[];
    link?: { title: string; host: string };
  };

  const props = withDefaults(
    defineProps<{
      now?: string;
      items?: Item[];
    }>(),
    {
      now: "2026-10-18T10:20",
      items: () => [
        {
          id: "a1",
          who: "Maya Patel",
          avatar: 32,
          text: "uploaded 2 files to",
          target: "Homepage redesign",
          at: "2026-10-18T10:02",
          files: [
            { name: "hero-v3.fig", size: "4.2 MB", icon: "lucide:file-image" },
            { name: "copy-notes.pdf", size: "320 KB", icon: "lucide:file-text" },
          ],
        },
        {
          id: "a2",
          who: "Leo Fischer",
          avatar: 12,
          text: "shared a link in",
          target: "Engineering",
          note: "Worth reading before we pick a rate limit strategy.",
          at: "2026-10-18T09:30",
          link: { title: "Designing rate limits that users forgive", host: "blog.example.com" },
        },
        {
          id: "a3",
          who: "Sofia Alvarez",
          avatar: 45,
          text: "moved",
          target: "Q4 planning to In progress",
          at: "2026-10-18T08:10",
        },
        {
          id: "a4",
          who: "Noah Kim",
          avatar: 15,
          text: "attached a report to",
          target: "Release 2.4",
          at: "2026-10-17T17:20",
          files: [{ name: "test-results.csv", size: "88 KB", icon: "lucide:file-spreadsheet" }],
        },
        {
          id: "a5",
          who: "Priya Nair",
          avatar: 44,
          text: "joined the team",
          at: "2026-10-16T09:00",
        },
      ],
    }
  );

  function ago(iso: string) {
    const diff = Math.round(
      (new Date(`${props.now}:00Z`).getTime() - new Date(`${iso}:00Z`).getTime()) / 60000
    );
    if (diff < 60) return `${Math.max(diff, 1)}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    const days = Math.floor(diff / 1440);
    return days === 1 ? "Yesterday" : `${days}d ago`;
  }
</script>
