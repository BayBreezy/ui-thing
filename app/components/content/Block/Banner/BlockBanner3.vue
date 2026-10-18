<template>
  <!--
    Sale banner with a live countdown and a copyable code
    Features: Countdown to a set end time that ticks every second, promo code chip that copies on click, call to action, dismiss with a collapse animation
  -->
  <div>
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <div
          class="relative overflow-hidden bg-linear-to-r from-rose-600 via-orange-500 to-amber-500 px-4 py-4 text-white"
        >
          <div class="absolute -top-10 left-1/4 size-40 rounded-full bg-white/20 blur-3xl" />
          <div
            class="relative mx-auto flex max-w-5xl flex-col items-center gap-4 pr-8 lg:flex-row lg:justify-between"
          >
            <div class="text-center lg:text-left">
              <p class="flex items-center justify-center gap-2 text-lg font-bold lg:justify-start">
                <Icon name="lucide:flame" class="size-5" />
                {{ props.title }}
              </p>
              <p class="text-sm text-white/85">{{ props.description }}</p>
            </div>

            <div class="flex items-center gap-2" role="timer" :aria-label="label">
              <template v-for="(unit, i) in units" :key="unit.label">
                <div class="min-w-14 rounded-lg bg-black/20 px-2 py-1.5 text-center backdrop-blur">
                  <div class="text-xl leading-none font-bold tabular-nums">{{ unit.value }}</div>
                  <div class="mt-1 text-[10px] tracking-wide text-white/75 uppercase">
                    {{ unit.label }}
                  </div>
                </div>
                <span v-if="i < units.length - 1" class="font-bold text-white/60">:</span>
              </template>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="flex items-center gap-2 rounded-lg border border-dashed border-white/60 px-3 py-2 font-mono text-sm font-semibold transition-colors hover:bg-white/15"
                :aria-label="`Copy code ${props.code}`"
                @click="copy"
              >
                {{ props.code }}
                <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
              </button>
              <UiButton variant="secondary" class="text-foreground shrink-0">
                Shop now
                <Icon name="lucide:arrow-right" class="size-4" />
              </UiButton>
            </div>
          </div>
          <button
            type="button"
            class="absolute top-3 right-3 flex size-7 items-center justify-center rounded-md transition-colors hover:bg-white/20"
            aria-label="Dismiss banner"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="p-4 text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      code?: string;
      /** Hours from now that the sale ends. */
      hours?: number;
    }>(),
    {
      title: "Summer sale: up to 50% off",
      description: "Free shipping on every order. Ends soon.",
      code: "SUMMER50",
      hours: 62,
    }
  );

  const visible = ref(true);
  const copied = ref(false);
  const end = Date.now() + props.hours * 3600 * 1000;
  const remaining = ref(Math.max(0, end - Date.now()));

  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    timer = setInterval(() => {
      remaining.value = Math.max(0, end - Date.now());
    }, 1000);
  });
  onBeforeUnmount(() => clearInterval(timer));

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = computed(() => {
    const total = Math.floor(remaining.value / 1000);
    return [
      { label: "Days", value: pad(Math.floor(total / 86400)) },
      { label: "Hours", value: pad(Math.floor((total % 86400) / 3600)) },
      { label: "Mins", value: pad(Math.floor((total % 3600) / 60)) },
      { label: "Secs", value: pad(total % 60) },
    ];
  });
  const label = computed(() => units.value.map((u) => `${u.value} ${u.label}`).join(" "));

  async function copy() {
    try {
      await navigator.clipboard.writeText(props.code);
    } catch {
      // Clipboard access can be blocked inside an iframe; the UI still confirms.
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }
</script>
