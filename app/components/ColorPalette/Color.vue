<template>
  <button
    :key="color.hex"
    :data-last-copied="lastCopied === color[currentFormat as ColorFormat]"
    class="group relative flex aspect-[3/1] w-full flex-1 cursor-pointer flex-col gap-2 text-(--text) sm:aspect-[2/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:top-4 [&>svg]:right-4 [&>svg]:z-10 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
    :style="{
      '--bg': `${color.oklch}`,
      '--text': color.foreground,
    }"
    @click="
      () => {
        if (currentFormat) {
          copy(color[currentFormat as ColorFormat]);
          lastCopied = color.className;
          useSonner.success(`Copied ${color[currentFormat as ColorFormat]} to clipboard.`);
        }
      }
    "
  >
    <Icon
      v-if="copied"
      name="lucide:check"
      class="group-hover:opacity-100 group-data-[last-copied=true]:opacity-100"
    />
    <Icon v-else name="lucide:clipboard" class="group-hover:opacity-100" />
    <div
      class="w-full flex-1 rounded-md border-input bg-(--bg) after:rounded-lg after:border-input md:rounded-lg"
    />
    <div class="flex w-full flex-col items-center justify-center gap-1">
      <span
        class="font-mono text-xs text-muted-foreground tabular-nums transition-colors group-hover:text-foreground group-data-[last-copied=true]:text-primary sm:hidden xl:flex"
      >
        {{ color.className }}
      </span>
      <span
        class="hidden font-mono text-xs text-muted-foreground tabular-nums transition-colors group-hover:text-foreground group-data-[last-copied=true]:text-primary sm:flex xl:hidden"
      >
        {{ color.scale }}
      </span>
    </div>
  </button>
</template>

<script lang="ts" setup>
  import { useStorage } from "@vueuse/core";

  import type { Color } from "~/utils/registry/colors";

  defineProps<{ color: Color }>();

  type ColorFormat = "hex" | "rgb" | "hsl" | "oklch" | "var";
  const currentFormat = useStorage("ui-things-color-format", "hex");

  const { copied, copy } = useClipboard({ legacy: true });
  const lastCopied = useStorage("ui-things-last-copied", "");
</script>
