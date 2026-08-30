<template>
  <div
    class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-1.5"
  >
    <div class="bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl">
      <UiTooltip v-for="(option, index) in CONTENT_OPTIONS" :key="option.value">
        <UiTooltipTrigger as-child>
          <UiButton
            variant="ghost"
            size="sm"
            :data-active="params.item.value === option.value"
            class="text-muted-foreground hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground h-7 min-w-7 cursor-pointer rounded-lg px-2 text-xs font-medium transition-colors"
            @click="params.item.value = option.value"
          >
            {{ String(index + 1).padStart(2, "0") }}
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent side="top" :side-offset="10">{{ option.label }}</UiTooltipContent>
      </UiTooltip>
    </div>
    <div class="bg-card/90 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl">
      <UiButton
        :href="openInNewTabHref"
        target="_blank"
        rel="noreferrer"
        variant="ghost"
        size="sm"
        class="text-muted-foreground hover:text-foreground h-7 cursor-pointer rounded-lg px-2.5 text-xs font-medium transition-colors"
      >
        <Icon name="lucide:square-arrow-out-up-right" class="size-3.5 md:hidden" />
        <span class="max-md:sr-only">Open in New Tab</span>
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CONTENT_OPTIONS } from "~/utils/typeset/fixtures";
  import { serializeTypesetSearchParams } from "~/utils/typeset/params";

  const params = useTypesetSearchParams();

  const openInNewTabHref = computed(() =>
    serializeTypesetSearchParams(`/preview/typeset/${params.item.value}`, params.toValues())
  );
</script>
