<template>
  <!--
    Feed with comments
    Features: Posts with an author, a time and a like button with a count, a thread of comments under each post, an inline comment box that adds to the thread and a show all comments toggle
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl space-y-5">
      <UiCard v-for="post in posts" :key="post.id" class="gap-4">
        <UiCardContent class="space-y-3">
          <div class="flex items-center gap-3">
            <UiAvatar
              :src="`https://i.pravatar.cc/80?img=${post.avatar}`"
              :fallback="post.who.slice(0, 1)"
              class="size-10"
            />
            <div>
              <p class="text-sm font-medium">{{ post.who }}</p>
              <p class="text-muted-foreground text-xs">{{ post.when }}</p>
            </div>
          </div>
          <p class="text-sm leading-relaxed">{{ post.body }}</p>
          <div class="flex items-center gap-1">
            <UiButton
              variant="ghost"
              size="sm"
              :aria-pressed="post.liked"
              :aria-label="`${post.liked ? 'Unlike' : 'Like'} post by ${post.who}, ${post.likes} likes`"
              @click="like(post)"
              ><Icon
                name="lucide:heart"
                class="size-4"
                :class="post.liked ? 'fill-current text-rose-500' : ''"
              />{{ post.likes }}</UiButton
            >
            <UiButton variant="ghost" size="sm" @click="post.open = !post.open"
              ><Icon name="lucide:message-circle" class="size-4" />{{
                post.comments.length
              }}</UiButton
            >
          </div>
        </UiCardContent>
        <UiCardContent v-if="post.open" class="space-y-3 border-t pt-4">
          <button
            v-if="post.comments.length > 2 && !post.all"
            type="button"
            class="text-muted-foreground hover:text-foreground text-sm"
            @click="post.all = true"
          >
            Show all {{ post.comments.length }} comments
          </button>
          <ul class="space-y-3">
            <li
              v-for="comment in post.all ? post.comments : post.comments.slice(-2)"
              :key="comment.id"
              class="flex gap-2.5"
            >
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${comment.avatar}`"
                :fallback="comment.who.slice(0, 1)"
                class="size-7"
              />
              <div class="bg-muted/60 min-w-0 flex-1 rounded-lg px-3 py-2 text-sm">
                <p class="font-medium">{{ comment.who }}</p>
                <p>{{ comment.text }}</p>
              </div>
            </li>
          </ul>
          <form class="flex gap-2" @submit.prevent="addComment(post)">
            <UiInput
              v-model="post.draft"
              :aria-label="`Comment on post by ${post.who}`"
              placeholder="Write a comment"
            />
            <UiButton type="submit" size="sm" :disabled="!post.draft.trim()">Post</UiButton>
          </form>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Comment = { id: string; who: string; avatar: number; text: string };
  type PostInput = {
    id: string;
    who: string;
    avatar: number;
    when: string;
    body: string;
    likes: number;
    comments: Comment[];
  };

  const props = withDefaults(
    defineProps<{
      posts?: PostInput[];
    }>(),
    {
      posts: () => [
        {
          id: "p1",
          who: "Maya Patel",
          avatar: 32,
          when: "Today, 10:02 AM",
          body: "The new homepage hero is live on staging. Please click around on your phone and tell me what feels off.",
          likes: 8,
          comments: [
            {
              id: "c1",
              who: "Leo Fischer",
              avatar: 12,
              text: "Looks great. The CTA is a bit low on small screens.",
            },
            { id: "c2", who: "Sofia Alvarez", avatar: 45, text: "Loving the new headline." },
            { id: "c3", who: "Noah Kim", avatar: 15, text: "Lighthouse score is up by 12 points." },
          ],
        },
        {
          id: "p2",
          who: "Priya Nair",
          avatar: 44,
          when: "Yesterday, 4:30 PM",
          body: "Weekly metrics are in. Activation is up 4 percent after the onboarding changes.",
          likes: 14,
          comments: [{ id: "c4", who: "Maya Patel", avatar: 32, text: "Fantastic news." }],
        },
      ],
    }
  );

  const posts = ref(
    props.posts.map((post) => ({
      ...post,
      comments: post.comments.map((comment) => ({ ...comment })),
      liked: false,
      open: true,
      all: false,
      draft: "",
    }))
  );

  function like(post: (typeof posts.value)[number]) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  function addComment(post: (typeof posts.value)[number]) {
    const text = post.draft.trim();
    if (!text) return;
    post.comments.push({ id: `new-${post.comments.length}`, who: "You", avatar: 32, text });
    post.draft = "";
    post.all = true;
  }
</script>
