<template>
  <!--
    Commit style activity feed
    Features: Commits grouped by day, message, author avatar and time, a verified badge, a short hash with a copy button, branch tags and a link style icon to view the change
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex items-center gap-2">
        <Icon name="lucide:git-branch" class="size-5" />
        <h1 class="text-2xl font-bold tracking-tight">{{ branch }}</h1>
      </div>

      <div class="mt-6 space-y-8">
        <section
          v-for="group in groups"
          :key="group.date"
          :aria-label="`Commits on ${group.label}`"
        >
          <h2 class="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
            <Icon name="lucide:git-commit-horizontal" class="size-4" />Commits on {{ group.label }}
          </h2>
          <ul class="divide-y rounded-xl border">
            <li
              v-for="commit in group.items"
              :key="commit.hash"
              class="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap"
            >
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${commit.avatar}`"
                :fallback="commit.author.slice(0, 1)"
                class="size-8"
              />
              <div class="min-w-0 flex-1 basis-40">
                <p class="text-sm font-medium break-words sm:truncate">{{ commit.message }}</p>
                <p class="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
                  <span>{{ commit.author }} committed {{ commit.time }}</span>
                  <UiBadge v-if="commit.verified" variant="soft" color="green" shape="pill"
                    >Verified</UiBadge
                  >
                  <UiBadge v-for="tag in commit.tags" :key="tag" variant="outline" shape="pill">{{
                    tag
                  }}</UiBadge>
                </p>
              </div>
              <div class="ml-auto flex shrink-0 items-center gap-1">
                <code class="bg-muted rounded-md px-2 py-1 font-mono text-xs">{{
                  commit.hash
                }}</code>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  :aria-label="`Copy hash ${commit.hash}`"
                  @click="copyHash(commit.hash)"
                  ><Icon
                    :name="copiedHash === commit.hash ? 'lucide:check' : 'lucide:copy'"
                    class="size-4"
                /></UiButton>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  :aria-label="`View changes for ${commit.hash}`"
                  @click="useSonner.info(`Open the diff for ${commit.hash}`)"
                  ><Icon name="lucide:code-xml" class="size-4"
                /></UiButton>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Commit = {
    hash: string;
    message: string;
    author: string;
    avatar: number;
    date: string;
    time: string;
    verified?: boolean;
    tags?: string[];
  };

  const props = withDefaults(
    defineProps<{
      branch?: string;
      commits?: Commit[];
    }>(),
    {
      branch: "main",
      commits: () => [
        {
          hash: "a3f9c21",
          message: "feat(billing): add proration preview",
          author: "Maya Patel",
          avatar: 32,
          date: "2026-10-18",
          time: "2 hours ago",
          verified: true,
          tags: ["v2.4.0"],
        },
        {
          hash: "7be10d4",
          message: "fix(auth): refresh the session before it expires",
          author: "Leo Fischer",
          avatar: 12,
          date: "2026-10-18",
          time: "5 hours ago",
          verified: true,
        },
        {
          hash: "c92e5aa",
          message: "chore: bump dependencies",
          author: "Noah Kim",
          avatar: 15,
          date: "2026-10-17",
          time: "yesterday",
        },
        {
          hash: "1d4b8f0",
          message: "docs: explain the rate limit headers",
          author: "Sofia Alvarez",
          avatar: 45,
          date: "2026-10-17",
          time: "yesterday",
          verified: true,
        },
        {
          hash: "e60a7b3",
          message: "refactor(table): extract the column menu",
          author: "Priya Nair",
          avatar: 44,
          date: "2026-10-15",
          time: "3 days ago",
        },
      ],
    }
  );

  const groups = computed(() =>
    [...new Set(props.commits.map((commit) => commit.date))]
      .sort()
      .reverse()
      .map((date) => ({
        date,
        label: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }),
        items: props.commits.filter((commit) => commit.date === date),
      }))
  );

  const { copy } = useClipboard();
  const copiedHash = ref("");

  async function copyHash(hash: string) {
    await copy(hash);
    copiedHash.value = hash;
    setTimeout(() => (copiedHash.value = ""), 1500);
  }
</script>
