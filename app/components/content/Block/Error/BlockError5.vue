<template>
  <!-- 
    Animated error with gradient background
    Features: Gradient background, GSAP text animation, animated blobs
  -->
  <div
    ref="container"
    class="from-primary/10 via-background to-background relative flex min-h-screen items-center overflow-hidden bg-linear-to-br"
  >
    <div
      class="bg-primary/20 absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full blur-[100px]"
      style="animation: blob-float 8s ease-in-out infinite"
    />
    <div
      class="bg-primary/10 absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full blur-[120px]"
      style="animation: blob-float 10s ease-in-out infinite reverse"
    />
    <div class="relative z-1 container">
      <p ref="errorCode" class="text-primary mb-5 font-bold tracking-tight">
        {{ statusCode }} error
      </p>
      <h1 ref="errorTitle" class="text-4xl font-bold tracking-tight lg:text-6xl">
        {{ title }}
      </h1>
      <p ref="errorDesc" class="text-muted-foreground mt-5 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div ref="errorButton" class="mt-8 flex items-center gap-3">
        <UiButton @click="clearError({ redirect: '#' })">
          <Icon name="lucide:home" class="mr-2 h-4 w-4" />
          Go Home
        </UiButton>
        <UiButton variant="outline" @click="clearError({ redirect: '#' })">
          <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
          Go Back
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import gsap from "gsap";

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

  const container = ref<HTMLElement | null>(null);
  const errorCode = ref<HTMLElement | null>(null);
  const errorTitle = ref<HTMLElement | null>(null);
  const errorDesc = ref<HTMLElement | null>(null);
  const errorButton = ref<HTMLElement | null>(null);

  onMounted(() => {
    const tl = gsap.timeline();
    tl.from(errorCode.value, {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: "power2.out",
    })
      .from(
        errorTitle.value,
        {
          opacity: 0,
          y: 10,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        errorDesc.value,
        {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        errorButton.value,
        {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );
  });
</script>

<style>
  @keyframes blob-float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -30px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }
</style>
