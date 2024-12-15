<template>
  <UiContainer class="py-16 lg:py-24">
    <p class="mb-3 font-semibold text-primary">Our blog</p>
    <h1 class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl">Resources and insights</h1>
    <p class="text-lg text-muted-foreground lg:text-xl">
      The latest industry news, interviews, technologies, and resources.
    </p>
    <!-- Featured blog image -->
    <div
      title="Blog page on image"
      class="mt-10 hidden h-60 w-full items-end overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover drop-shadow lg:mt-20 lg:flex lg:h-[720px]"
    >
      <div class="w-full border-t border-white/10 bg-black/40 p-10 text-white backdrop-blur-2xl">
        <NuxtLink to="#">
          <h2 class="mb-2 text-2xl font-semibold">
            Improve your design skills: Develop an "eye" for design
          </h2>
        </NuxtLink>
        <p>
          Tools and trends change, but good design is timeless. Learn how to quickly develop an
          "eye" for design.
        </p>
        <p class="mt-5 text-sm">Written by</p>
        <NuxtLink to="#">
          <div class="mt-2 flex items-center gap-3">
            <UiAvatar
              class="ring-1 ring-white/20"
              src="https://api.dicebear.com/7.x/lorelei/svg?flip=false"
            />
            <span>Jane Doe</span>
          </div>
        </NuxtLink>
        <div class="mt-5 flex flex-wrap items-center gap-2">
          <template v-for="t in ['Design', 'Research', 'Presentation']" :key="t">
            <UiBadge class="border-white px-3 py-1 text-sm text-white" variant="outline">{{
              t
            }}</UiBadge>
          </template>
        </div>
      </div>
    </div>

    <div class="mb-10 mt-16 lg:hidden">
      <NuxtLink :to="link">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          :alt="alt"
          class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
        />
      </NuxtLink>
      <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">{{ headline }}</p>
      <NuxtLink :to="link">
        <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
      </NuxtLink>
      <p v-if="description" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
        {{ description }}
      </p>
      <div class="flex items-center">
        <UiAvatar
          v-if="userImage"
          :src="userImage"
          :alt="userName"
          class="mr-3 rounded-full bg-background shadow ring-1 ring-ring/30"
        />
        <div>
          <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
          <p v-if="date" class="text-sm text-muted-foreground">{{ date }}</p>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <UiTabs class="mt-5" :default-value="categories[0]">
      <UiTabsList :pill="false" class="relative h-auto w-full justify-start gap-3 overflow-x-auto">
        <template v-for="c in categories" :key="c">
          <UiTabsTrigger
            class="p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            :pill="false"
            :value="c"
            >{{ c }}</UiTabsTrigger
          >
        </template>
        <UiTabsIndicator />
      </UiTabsList>
    </UiTabs>

    <!-- Articles -->

    <section class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      <template v-for="n in 9" :key="n">
        <div>
          <NuxtLink :to="link">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              v-if="image"
              :src="image"
              :alt="alt"
              class="mb-5 h-[240px] w-full rounded-lg object-cover shadow"
            />
          </NuxtLink>
          <p v-if="headline" class="mb-2 text-sm font-semibold text-primary">{{ headline }}</p>
          <NuxtLink :to="link">
            <p class="mb-2 text-xl font-semibold lg:text-2xl">{{ title }}</p>
          </NuxtLink>
          <p v-if="description" class="mb-5 line-clamp-2 text-ellipsis text-muted-foreground">
            {{ description }}
          </p>
          <div class="flex items-center">
            <UiAvatar
              v-if="userImage"
              :src="userImage"
              :alt="userName"
              class="mr-3 rounded-full bg-background shadow ring-1 ring-ring/30"
            />
            <div>
              <p v-if="userName" class="text-sm font-semibold">{{ userName }}</p>
              <p v-if="date" class="text-sm text-muted-foreground">{{ date }}</p>
            </div>
          </div>
        </div>
      </template>
    </section>
  </UiContainer>
</template>

<script lang="ts" setup>
  const categories = ["Design", "Research", "Presentation", "Development", "Marketing", "Sales"];

  const headline = "Design";
  const title = "UX review presentations";
  const image =
    "https://images.unsplash.com/photo-1524169220946-12efd782aab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const userImage = "https://api.dicebear.com/7.x/lorelei/svg?flip=false";
  const userName = "John Doe";
  const link = "#";
</script>
