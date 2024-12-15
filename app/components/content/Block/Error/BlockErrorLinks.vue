<template>
  <div class="relative flex h-screen items-center">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/80%)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/80%)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_70%_at_50%_0%,#000_70%,transparent_110%)]"
    />
    <div class="container relative z-[1]">
      <p class="mb-5 font-bold tracking-tight text-primary">{{ statusCode }} error</p>
      <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
      <UiButton class="mt-5" @click="clearError({ redirect: '#' })">Take me home</UiButton>
      <ul class="mt-10 flex flex-col gap-5">
        <li v-for="(l, i) in links" :key="i">
          <NuxtLink class="group inline-flex flex-col gap-0.5" :to="l.href">
            <span class="font-bold text-primary underline-offset-2 group-hover:underline">{{
              l.title
            }}</span>
            <span class="text-sm text-muted-foreground">{{ l.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      statusCode?: number;
      fatal?: boolean;
      unhandled?: boolean;
      statusMessage?: string;
      message?: string;
      data?: unknown;
      cause?: unknown;
    }>(),
    {
      statusCode: 404,
      fatal: false,
      unhandled: false,
      statusMessage: "",
      message: "We can't find this page",
      data: undefined,
      cause: undefined,
    }
  );

  const title = computed(() => {
    if (!props.message) return "Error";
    return props.message;
  });

  useSeoMeta({ title });

  const links = [
    { title: "Documentation", href: "#", text: "Learn more about the error" },
    { title: "Contact support", href: "#", text: "Get help from our support team" },
    { title: "Our blog", href: "#", text: "Read the latest news" },
  ];
</script>
