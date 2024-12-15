<template>
  <UiContainer class="py-16 lg:py-24">
    <div>
      <h3 class="mb-5 text-center text-3xl font-semibold lg:text-4xl">From the blog</h3>
      <p class="text-center text-lg text-muted-foreground lg:text-xl">
        Tool and strategies modern teams need to help their companies grow.
      </p>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2">
      <div v-for="item in 4" :key="item">
        <div class="flex flex-col gap-5 md:flex-row">
          <NuxtLink :to="link" class="shrink-0">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              v-if="image"
              :src="image"
              :alt="alt"
              class="h-[240px] w-full rounded-lg object-cover shadow md:h-[200px]"
            />
          </NuxtLink>
          <div>
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
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const headline = "Design";
  const title = "UX review presentations";
  const image = "http://unsplash.it/500/500?random=2&gravity=center";
  const alt = "UX review presentations";
  const description =
    "How do you create compelling presentations that wow your colleagues and impress your managers?";
  const date = "30 Jan 2024";
  const userImage = "https://api.dicebear.com/7.x/lorelei/svg?flip=false";
  const userName = "John Doe";
  const link = "#";
</script>
