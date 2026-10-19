<template>
  <!--
    Before and after sliders
    Features: Drag or keyboard comparison slider with a visible divider, before and after labels, arrow keys and home and end support, reset button, several examples
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">See the difference</h2>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
          Drag the handle, or focus it and use the arrow keys.
        </p>
      </div>

      <ul class="mt-10 grid gap-8 md:grid-cols-2">
        <li v-for="(item, index) in items" :key="item.title">
          <div
            class="has-focus-visible:ring-ring/50 bg-muted relative aspect-4/3 touch-none overflow-hidden rounded-xl select-none has-focus-visible:ring-[3px]"
          >
            <img
              :src="item.image"
              :alt="item.afterAlt"
              class="absolute inset-0 size-full object-cover"
            />
            <img
              :src="item.image"
              alt=""
              aria-hidden="true"
              class="absolute inset-0 size-full object-cover"
              :class="item.beforeClass"
              :style="{ clipPath: `inset(0 ${100 - positions[index]!}% 0 0)` }"
            />
            <span
              class="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-0.5 text-xs font-medium text-white"
              >{{ item.beforeLabel }}</span
            >
            <span
              class="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-0.5 text-xs font-medium text-white"
              >{{ item.afterLabel }}</span
            >
            <div
              class="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
              :style="{ left: `${positions[index]}%` }"
              aria-hidden="true"
            >
              <span
                class="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-md"
                ><Icon name="lucide:chevrons-left-right" class="size-5"
              /></span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              :value="positions[index]"
              :aria-label="`Compare ${item.title}: ${item.beforeLabel} and ${item.afterLabel}`"
              :aria-valuetext="`${positions[index]}% ${item.beforeLabel}`"
              class="absolute inset-0 size-full cursor-ew-resize opacity-0"
              @input="set(index, ($event.target as HTMLInputElement).value)"
            />
          </div>
          <div class="mt-3 flex items-start justify-between gap-3">
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ item.description }}</p>
            </div>
            <UiButton
              variant="ghost"
              size="sm"
              :disabled="positions[index] === 50"
              :aria-label="`Reset ${item.title}`"
              @click="set(index, 50)"
            >
              <Icon name="lucide:rotate-ccw" class="size-4" />Reset
            </UiButton>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = {
    title: string;
    description: string;
    image: string;
    afterAlt: string;
    beforeLabel: string;
    afterLabel: string;
    beforeClass: string;
  };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          title: "Colour grade",
          description: "A flat, desaturated scan against the finished grade.",
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80",
          afterAlt: "Sunlit hills with a lone hiker, finished colour grade",
          beforeLabel: "Before",
          afterLabel: "After",
          beforeClass: "grayscale contrast-75 brightness-90",
        },
        {
          title: "Retouch and sharpen",
          description: "Soft focus and a dull exposure against the final retouch.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
          afterAlt: "Blue valley with pine trees at dawn, sharpened and retouched",
          beforeLabel: "Original",
          afterLabel: "Edited",
          beforeClass: "blur-[3px] brightness-75 saturate-50",
        },
      ],
    }
  );

  const positions = ref<number[]>(props.items.map(() => 50));

  function set(index: number, value: number | string) {
    const next = [...positions.value];
    next[index] = Math.min(100, Math.max(0, Number(value)));
    positions.value = next;
  }
</script>
