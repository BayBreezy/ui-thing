<template>
  <div class="group/picker relative">
    <UiDropdownMenu :modal="false" @update:open="(open: boolean) => !open && clearOverride()">
      <UiDropdownMenuTrigger :class="triggerStyles()">
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">{{ label }}</div>
          <div class="text-foreground line-clamp-1 max-w-[80%] truncate text-sm font-medium">
            {{ currentFont.label }}
          </div>
        </div>
        <div
          class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5"
          :style="{ fontFamily: currentFont.value }"
        >
          Aa
        </div>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        :class="contentStyles()"
        @mouseleave="clearOverride"
      >
        <UiDropdownMenuRadioGroup
          :model-value="currentValue"
          @update:model-value="(value) => selectFont(value as string)"
        >
          <template v-if="param === 'heading'">
            <UiDropdownMenuGroup>
              <UiDropdownMenuRadioItem
                value="inherit"
                @mousemove="previewFont('inherit')"
                @focus="previewFont('inherit')"
              >
                {{ bodyFont.label }}
              </UiDropdownMenuRadioItem>
            </UiDropdownMenuGroup>
            <UiDropdownMenuSeparator />
          </template>
          <UiDropdownMenuGroup v-for="group in groupedFonts" :key="group.label">
            <UiDropdownMenuLabel>{{ group.label }}</UiDropdownMenuLabel>
            <UiDropdownMenuRadioItem
              v-for="font in group.fonts"
              :key="font.id"
              :value="font.id"
              @mousemove="previewFont(font.id)"
              @focus="previewFont(font.id)"
            >
              {{ font.label }}
            </UiDropdownMenuRadioItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
    <TypesetLockButton :param="param" class="absolute top-1/2 right-8 -translate-y-1/2" />
  </div>
</template>

<script lang="ts">
  import { findTypesetFont, TYPESET_FONTS } from "~/utils/typeset/fonts";
  import { coerceTypesetValue } from "~/utils/typeset/params";

  const triggerStyles = tv({
    base: "hover:bg-muted data-[state=open]:bg-muted ring-foreground/10 focus-visible:ring-foreground/50 relative w-36 shrink-0 touch-manipulation rounded-xl p-3 ring-1 select-none focus-visible:outline-none disabled:opacity-50 md:w-full md:rounded-lg md:px-2.5 md:py-2",
  });

  const contentStyles = tv({
    base: "no-scrollbar z-50 max-h-96 min-w-32 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl md:w-52 dark:bg-neutral-800/90 dark:ring-neutral-700/50",
  });

  export type TypesetFontPickerProps = {
    label: string;
    param: "body" | "heading" | "mono";
    isMobile: boolean;
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetFontPickerProps>();

  const params = useTypesetSearchParams();
  const { setOverride, clearOverride } = useTypesetPreviewOverride();

  const currentValue = computed(() => params[props.param].value);

  const bodyFont = computed(() => findTypesetFont(params.body.value) ?? TYPESET_FONTS[0]!);

  // The heading picker's first entry is "inherit": it follows whatever the body
  // font is, so it renders under the body font's name rather than "Inherit".
  const inheritsBodyFont = computed(
    () => props.param === "heading" && currentValue.value === "inherit"
  );

  const currentFont = computed(() =>
    inheritsBodyFont.value
      ? bodyFont.value
      : (findTypesetFont(currentValue.value) ?? bodyFont.value)
  );

  // Every picker offers every font (no type filter); grouping is just labels.
  const groupedFonts = computed(() => [
    { label: "Sans", fonts: TYPESET_FONTS.filter((font) => font.type === "sans") },
    { label: "Serif", fonts: TYPESET_FONTS.filter((font) => font.type === "serif") },
    { label: "Mono", fonts: TYPESET_FONTS.filter((font) => font.type === "mono") },
  ]);

  function selectFont(value: string) {
    const coerced = coerceTypesetValue(props.param, value);
    if (coerced !== null) {
      params[props.param].value = coerced as never;
    }
  }

  function previewFont(value: string) {
    if (props.isMobile) {
      return;
    }
    const coerced = coerceTypesetValue(props.param, value);
    if (coerced !== null) {
      setOverride({ [props.param]: coerced });
    }
  }
</script>
