<template>
  <!--
    Task discussion with comments and activity
    Features: Tabs for comments and activity, comment composer that posts at the top or bottom, relative authors with avatars, a timeline of changes, empty state and counts on the tabs
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">{{ title }}</h1>
      <UiTabs v-model="tab" class="mt-6">
        <UiTabsList>
          <UiTabsTrigger value="comments"
            >Comments
            <UiBadge variant="secondary" class="ml-1.5">{{
              comments.length
            }}</UiBadge></UiTabsTrigger
          >
          <UiTabsTrigger value="activity"
            >Activity
            <UiBadge variant="secondary" class="ml-1.5">{{
              activity.length
            }}</UiBadge></UiTabsTrigger
          >
        </UiTabsList>

        <UiTabsContent value="comments" class="mt-4">
          <form class="flex gap-3" @submit.prevent="post">
            <UiAvatar src="https://i.pravatar.cc/80?img=45" fallback="Y" class="size-9" />
            <div class="flex-1 space-y-2">
              <UiLabel for="td3-comment" class="sr-only">Add a comment</UiLabel>
              <UiTextarea id="td3-comment" v-model="draft" :rows="3" placeholder="Add a comment" />
              <div class="flex justify-end">
                <UiButton type="submit" size="sm" :disabled="!draft.trim()">Comment</UiButton>
              </div>
            </div>
          </form>
          <ul class="mt-6 space-y-5">
            <li v-for="comment in comments" :key="comment.id" class="flex gap-3">
              <UiAvatar :src="comment.avatar" :fallback="comment.author[0]" class="size-9" />
              <div class="bg-muted/50 flex-1 rounded-xl p-3">
                <p class="text-sm">
                  <span class="font-semibold">{{ comment.author }}</span>
                  <span class="text-muted-foreground text-xs">{{ comment.time }}</span>
                </p>
                <p class="mt-1 text-sm whitespace-pre-wrap">{{ comment.text }}</p>
              </div>
            </li>
            <li v-if="!comments.length" class="text-muted-foreground py-8 text-center text-sm">
              No comments yet. Start the conversation.
            </li>
          </ul>
        </UiTabsContent>

        <UiTabsContent value="activity" class="mt-4">
          <ol class="relative space-y-5 border-l pl-6">
            <li v-for="item in activity" :key="item.id" class="relative">
              <span
                class="bg-background absolute top-0.5 -left-[34px] grid size-6 place-items-center rounded-full border"
                ><Icon :name="item.icon" class="text-muted-foreground size-3.5"
              /></span>
              <p class="text-sm">
                <span class="font-semibold">{{ item.who }}</span> {{ item.text }}
              </p>
              <p class="text-muted-foreground text-xs">{{ item.time }}</p>
            </li>
          </ol>
        </UiTabsContent>
      </UiTabs>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Comment = { id: string; author: string; avatar: string; time: string; text: string };
  type Activity = { id: string; who: string; text: string; time: string; icon: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initialComments?: Comment[];
      activity?: Activity[];
    }>(),
    {
      title: "Redesign the pricing page",
      initialComments: () => [
        {
          id: "c1",
          author: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          time: "2 hours ago",
          text: "I pushed the plan cards to the preview branch. Can someone check them on a phone?",
        },
        {
          id: "c2",
          author: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          time: "1 hour ago",
          text: "On it. The yearly switch looks great, but the badge wraps on small screens.",
        },
      ],
      activity: () => [
        {
          id: "a1",
          who: "Sofia",
          text: "changed the status to In progress",
          time: "Yesterday, 4:12 PM",
          icon: "lucide:arrow-right-left",
        },
        {
          id: "a2",
          who: "Maya",
          text: "set the due date to Oct 24",
          time: "Oct 12, 10:03 AM",
          icon: "lucide:calendar",
        },
        {
          id: "a3",
          who: "Maya",
          text: "assigned this to Sofia",
          time: "Oct 9, 9:30 AM",
          icon: "lucide:user",
        },
        {
          id: "a4",
          who: "Maya",
          text: "created this task",
          time: "Oct 9, 9:28 AM",
          icon: "lucide:plus",
        },
      ],
    }
  );

  const tab = ref("comments");
  const draft = ref("");
  const comments = ref<Comment[]>(props.initialComments.map((comment) => ({ ...comment })));

  function post() {
    const text = draft.value.trim();
    if (!text) return;
    comments.value.push({
      id: `n${comments.value.length}`,
      author: "You",
      avatar: "https://i.pravatar.cc/80?img=45",
      time: "Just now",
      text,
    });
    draft.value = "";
  }
</script>
