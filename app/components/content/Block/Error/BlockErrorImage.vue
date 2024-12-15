<template>
  <div class="relative flex h-screen items-center">
    <div class="container flex w-full items-center justify-center md:w-1/2">
      <div>
        <p class="mb-5 font-bold tracking-tight text-primary">{{ statusCode }} error</p>
        <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
        <UiButton class="mt-5" @click="clearError({ redirect: '#' })">Take me home</UiButton>
      </div>
    </div>
    <div class="hidden h-screen md:block md:w-1/2 lg:w-1/2">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Login form image"
        class="size-full object-cover"
      />
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
</script>
