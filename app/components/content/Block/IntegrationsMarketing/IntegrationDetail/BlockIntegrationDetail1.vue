<template>
  <!--
    Integration detail page
    Features: A header with the logo, name, tagline and an install button that turns into an installed state, tabs for overview, features and reviews, a details sidebar with the developer, category, version and links, and a rating summary
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <nav
        aria-label="Breadcrumb"
        class="text-muted-foreground mb-6 flex items-center gap-1 text-sm"
      >
        <a
          href="#integrations"
          class="hover:text-foreground"
          @click.prevent="useSonner.info('Back to all integrations')"
          >Integrations</a
        >
        <Icon name="lucide:chevron-right" class="size-3.5" />
        <span class="text-foreground" aria-current="page">{{ app.name }}</span>
      </nav>

      <div class="flex flex-wrap items-center gap-5">
        <span class="bg-card grid size-20 shrink-0 place-items-center rounded-2xl border"
          ><Icon :name="app.icon" class="size-12"
        /></span>
        <div class="min-w-0 flex-1">
          <h1 class="text-3xl font-bold tracking-tight">{{ app.name }}</h1>
          <p class="text-muted-foreground mt-1">{{ app.tagline }}</p>
          <p class="mt-2 flex items-center gap-2 text-sm">
            <span class="flex" role="img" :aria-label="`${app.rating} out of 5 stars`"
              ><Icon
                v-for="n in 5"
                :key="n"
                name="lucide:star"
                class="size-4"
                :class="
                  n <= Math.round(app.rating)
                    ? 'text-amber-400 [&_path]:fill-amber-400'
                    : 'text-muted-foreground/40'
                "
            /></span>
            <span class="font-medium">{{ app.rating }}</span>
            <span class="text-muted-foreground"
              >({{ app.reviews.length }} reviews, {{ app.installs }} installs)</span
            >
          </p>
        </div>
        <UiButton v-if="!installed" size="lg" :loading="busy" @click="install">Install</UiButton>
        <div v-else class="flex items-center gap-2">
          <UiBadge variant="soft" color="green" shape="pill">Installed</UiBadge>
          <UiButton variant="outline" @click="installed = false">Uninstall</UiButton>
        </div>
      </div>

      <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <UiTabs v-model="tab">
          <UiTabsList>
            <UiTabsTrigger value="overview">Overview</UiTabsTrigger>
            <UiTabsTrigger value="features">Features</UiTabsTrigger>
            <UiTabsTrigger value="reviews">Reviews</UiTabsTrigger>
          </UiTabsList>
          <UiTabsContent value="overview" class="space-y-4">
            <p v-for="paragraph in app.about" :key="paragraph" class="leading-relaxed">
              {{ paragraph }}
            </p>
          </UiTabsContent>
          <UiTabsContent value="features">
            <ul class="grid gap-3 sm:grid-cols-2">
              <li
                v-for="feature in app.features"
                :key="feature.title"
                class="rounded-xl border p-4"
              >
                <Icon :name="feature.icon" class="size-5" />
                <p class="mt-2 text-sm font-medium">{{ feature.title }}</p>
                <p class="text-muted-foreground mt-1 text-sm">{{ feature.body }}</p>
              </li>
            </ul>
          </UiTabsContent>
          <UiTabsContent value="reviews">
            <ul class="divide-y">
              <li v-for="review in app.reviews" :key="review.who" class="py-4">
                <div class="flex items-center gap-2">
                  <UiAvatar
                    :src="`https://i.pravatar.cc/80?img=${review.avatar}`"
                    :fallback="review.who.slice(0, 1)"
                    class="size-8"
                  />
                  <p class="text-sm font-medium">{{ review.who }}</p>
                  <span class="ml-auto text-xs" aria-label="rating"
                    >{{ "★".repeat(review.stars)
                    }}<span class="text-muted-foreground/40">{{
                      "★".repeat(5 - review.stars)
                    }}</span></span
                  >
                </div>
                <p class="text-muted-foreground mt-2 text-sm">{{ review.text }}</p>
              </li>
            </ul>
          </UiTabsContent>
        </UiTabs>

        <aside>
          <h2 class="text-sm font-semibold">Details</h2>
          <dl class="mt-3 divide-y text-sm">
            <div
              v-for="row in app.details"
              :key="row.label"
              class="flex justify-between gap-3 py-2.5"
            >
              <dt class="text-muted-foreground">{{ row.label }}</dt>
              <dd class="text-right font-medium">{{ row.value }}</dd>
            </div>
          </dl>
          <div class="mt-4 flex flex-col gap-2">
            <UiButton
              variant="outline"
              size="sm"
              @click="useSonner.info('Open the documentation here')"
              ><Icon name="lucide:book-open" class="size-4" />Documentation</UiButton
            >
            <UiButton variant="outline" size="sm" @click="useSonner.info('Open support here')"
              ><Icon name="lucide:life-buoy" class="size-4" />Get support</UiButton
            >
          </div>
        </aside>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type AppInfo = {
    name: string;
    icon: string;
    tagline: string;
    rating: number;
    installs: string;
    about: string[];
    features: { icon: string; title: string; body: string }[];
    reviews: { who: string; avatar: number; stars: number; text: string }[];
    details: { label: string; value: string }[];
  };

  withDefaults(
    defineProps<{
      app?: AppInfo;
    }>(),
    {
      app: () => ({
        name: "Slack",
        icon: "logos:slack-icon",
        tagline: "Get alerts and summaries in the channels where your team already talks.",
        rating: 4.7,
        installs: "12k",
        about: [
          "Connect Acme to Slack and choose which events post to which channel. New tasks, comments and status changes show up the moment they happen.",
          "Reply to a notification without leaving Slack, or use a slash command to create a task from any conversation.",
        ],
        features: [
          {
            icon: "lucide:bell",
            title: "Real time alerts",
            body: "Choose the events and the channel for each one.",
          },
          {
            icon: "lucide:terminal",
            title: "Slash commands",
            body: "Create and find tasks with /acme.",
          },
          {
            icon: "lucide:calendar-clock",
            title: "Daily summary",
            body: "A digest of what changed, every morning.",
          },
          {
            icon: "lucide:message-square-reply",
            title: "Reply from Slack",
            body: "Comments you write in Slack sync back.",
          },
        ],
        reviews: [
          {
            who: "Maya Patel",
            avatar: 32,
            stars: 5,
            text: "Setup took two minutes and my team stopped missing updates.",
          },
          {
            who: "Leo Fischer",
            avatar: 12,
            stars: 4,
            text: "Great integration. I would love per project channels.",
          },
          {
            who: "Sofia Alvarez",
            avatar: 45,
            stars: 5,
            text: "The daily summary is the best part of my morning.",
          },
        ],
        details: [
          { label: "Category", value: "Communication" },
          { label: "Developer", value: "Acme" },
          { label: "Version", value: "2.4.0" },
          { label: "Updated", value: "Oct 14, 2026" },
          { label: "Works with", value: "All plans" },
        ],
      }),
    }
  );

  const tab = ref("overview");
  const installed = ref(false);
  const busy = ref(false);

  function install() {
    busy.value = true;
    setTimeout(() => {
      busy.value = false;
      installed.value = true;
      useSonner.success("Integration installed");
    }, 700);
  }
</script>
