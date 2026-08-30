<template>
  <UiCard
    class="bg-card/90 isolate z-10 max-h-full min-h-0 w-full gap-0 self-start rounded-2xl py-0 backdrop-blur-xl md:w-(--customizer-width)"
  >
    <UiCardHeader
      class="hidden items-center justify-between gap-2 border-b px-3 py-2.5 md:flex [.border-b]:pb-2.5"
    >
      <TypesetMainMenu />
    </UiCardHeader>
    <UiCardContent
      class="no-scrollbar scroll-fade-x min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-0 py-3 md:overflow-y-auto md:px-3"
    >
      <UiFieldGroup
        class="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto max-md:px-3 md:flex-col md:gap-3.25"
      >
        <!-- Below ~60ch the viewport already constrains width, so measure does
             nothing: hide it. -->
        <TypesetOptionPicker
          v-model="params.measure.value"
          label="Measure"
          param="measure"
          class="max-[28rem]:hidden"
          icon="lucide:arrow-left-right"
          :options="TYPESET_MEASURES"
          :is-mobile="isMobile"
        />
        <UiFieldSeparator class="hidden md:block" />
        <TypesetFontPicker label="Heading" param="heading" :is-mobile="isMobile" />
        <TypesetFontPicker label="Body" param="body" :is-mobile="isMobile" />
        <TypesetFontPicker label="Mono" param="mono" :is-mobile="isMobile" />
        <UiFieldSeparator class="hidden md:block" />
        <TypesetOptionPicker
          v-model="params.scale.value"
          label="Size"
          param="scale"
          icon="lucide:case-sensitive"
          :options="TYPESET_SIZES"
          :is-mobile="isMobile"
        />
        <TypesetOptionPicker
          v-model="params.leading.value"
          label="Leading"
          param="leading"
          :options="TYPESET_LEADINGS"
          :is-mobile="isMobile"
        >
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" class="size-4.5">
              <path
                d="M4.5 3.5H19.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="1.5"
              />
              <path
                d="M4.5 20.5H19.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="1.5"
              />
              <path
                d="M17 17L14.8905 11.4741C13.9109 8.90801 13.4211 7.625 12.625 7.625C11.8289 7.625 11.3391 8.90801 10.3595 11.4741L8.25 17"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="1.5"
              />
              <path
                d="M9.5 13H15.75"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="1.5"
              />
            </svg>
          </template>
        </TypesetOptionPicker>
        <TypesetOptionPicker
          v-model="params.flow.value"
          label="Flow"
          param="flow"
          icon="lucide:rows-3"
          :options="TYPESET_FLOWS"
          :is-mobile="isMobile"
        />
        <div
          v-if="isDev"
          class="text-muted-foreground hidden px-1 pt-0.5 text-center font-mono text-xs tabular-nums md:block"
        >
          {{ sizePx }}px / {{ leadingPx }}px / {{ flowPx }}px
        </div>
        <!-- Scroll-end spacer: the group is a CQ container (inline-size
             containment), so trailing padding cannot grow it. -->
        <div aria-hidden class="w-0.5 shrink-0 md:hidden" />
      </UiFieldGroup>
    </UiCardContent>
    <UiCardFooter
      class="flex min-w-0 flex-row-reverse gap-2 border-t px-3 py-3 md:flex-col [.border-t]:pt-3 md:**:[button]:w-full"
    >
      <TypesetRandomButton class="min-w-0 flex-1 md:flex-none" />
      <TypesetGetCodeDrawer
        class="hover:bg-muted! min-w-0 flex-1 touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none md:flex-none xl:hidden pointer-coarse:h-10!"
      />
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import {
    TYPESET_FLOWS,
    TYPESET_LEADINGS,
    TYPESET_MEASURES,
    TYPESET_SIZES,
  } from "~/utils/typeset/params";

  const params = useTypesetSearchParams();
  const isMobile = useIsMobile();

  // The resolved px rhythm is a design-time aid, not something to ship.
  const isDev = import.meta.dev;

  // Resolve the rhythm to px off the current size: leading is a multiple, flow is
  // an em value.
  const sizePx = computed(() => Number(params.scale.value));
  const leadingPx = computed(() => Math.round(sizePx.value * Number(params.leading.value)));
  const flowPx = computed(() => Math.round(sizePx.value * Number.parseFloat(params.flow.value)));
</script>
