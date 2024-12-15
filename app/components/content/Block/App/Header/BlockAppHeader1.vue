<template>
  <div>
    <slot name="image">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        v-if="props.image"
        :src="props.image"
        class="h-[180px] w-full object-cover md:h-[250px]"
      />
    </slot>
    <UiContainer class="p-4 md:px-8 md:py-6">
      <div class="hidden md:block">
        <slot name="crumbs">
          <UiBreadcrumbs v-if="props.crumbs" :items="props.crumbs" class="mb-5" />
        </slot>
      </div>
      <slot name="back-link">
        <NuxtLink
          class="mb-5 flex items-center gap-3 text-sm underline-offset-2 hover:underline md:hidden"
          to="#"
          ><Icon name="lucide:arrow-left" class="size-4" /> Back</NuxtLink
        >
      </slot>
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-5">
          <slot name="avatar">
            <UiAvatar v-if="props.avatar" :src="props.avatar" class="size-14 md:size-16" />
          </slot>
          <div>
            <slot name="title">
              <h1 v-if="props.title" class="text-2xl font-bold lg:text-3xl" v-html="props.title" />
            </slot>
            <slot name="description">
              <p
                v-if="props.description"
                class="text-muted-foreground"
                v-html="props.description"
              />
            </slot>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <slot>
            <UiButton size="sm" variant="outline">Download</UiButton>
            <UiButton size="sm">Create new</UiButton>
          </slot>
        </div>
      </div>
      <UiDivider class="my-8" />
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "@/components/Ui/Breadcrumbs.vue";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      crumbs?: Crumbs[];
      avatar?: string;
      image?: string;
    }>(),
    {
      image:
        "https://images.unsplash.com/photo-1580610447943-1bfbef5efe07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "John Doe",
      description: "alamage@gojujano.va",
      crumbs: () =>
        [
          {
            icon: "lucide:home",
          },
          {
            label: "Settings",
            link: "#",
          },
          {
            label: "Profile",
            link: "#",
          },
          {
            label: "John Doe",
            link: "#",
          },
        ] as Crumbs[],
      avatar: "https://randomuser.me/api/portraits/med/men/2.jpg",
    }
  );
</script>
