<template>
  <!--
    Free shipping progress banner for carts
    Features: Progress bar toward a threshold, message that updates with the amount left, success state with a celebration, add item button and reset for previews
  -->
  <div class="px-4 py-6">
    <div
      class="mx-auto max-w-2xl overflow-hidden rounded-xl border transition-colors"
      :class="reached ? 'border-green-500/40 bg-green-500/5' : 'bg-card'"
    >
      <div class="flex items-center gap-4 p-4">
        <slot name="icon">
          <UiFancyIcon
            :icon="reached ? 'lucide:party-popper' : 'lucide:truck'"
            theme="light"
            :color="reached ? 'success' : 'primary'"
          />
        </slot>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold">
            <template v-if="reached">You've unlocked free shipping!</template>
            <template v-else>
              You're <span class="text-primary tabular-nums">${{ remaining.toFixed(2) }}</span> away
              from free shipping
            </template>
          </p>
          <div class="bg-muted mt-2 h-2 overflow-hidden rounded-full">
            <div
              class="h-full rounded-full transition-[width,background-color] duration-700 ease-out"
              :class="reached ? 'bg-green-500' : 'bg-primary'"
              :style="{ width: `${percent}%` }"
            />
          </div>
          <div class="text-muted-foreground mt-1.5 flex justify-between text-xs tabular-nums">
            <span>${{ cart.toFixed(2) }} in your cart</span>
            <span>${{ props.threshold.toFixed(2) }}</span>
          </div>
        </div>
        <div class="flex shrink-0 flex-col gap-1.5">
          <UiButton size="sm" variant="outline" @click="cart += props.step">
            <Icon name="lucide:plus" class="size-4" />
            ${{ props.step }} item
          </UiButton>
          <UiButton size="xs" variant="ghost" @click="cart = props.start">Reset</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      threshold?: number;
      start?: number;
      step?: number;
    }>(),
    {
      threshold: 75,
      start: 52,
      step: 12,
    }
  );

  const cart = ref(props.start);
  const reached = computed(() => cart.value >= props.threshold);
  const remaining = computed(() => Math.max(0, props.threshold - cart.value));
  const percent = computed(() => Math.min(100, (cart.value / props.threshold) * 100));
</script>
