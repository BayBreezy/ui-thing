<template>
  <div :class="optionPickerStyles({ class: normalizeClass(props.class) || undefined })">
    <UiDropdownMenu :modal="false" @update:open="(open: boolean) => !open && clearOverride()">
      <UiDropdownMenuTrigger :class="triggerStyles()">
        <div class="flex min-w-0 flex-col justify-start pr-8 text-left">
          <div class="text-muted-foreground text-xs">{{ label }}</div>
          <div class="text-foreground line-clamp-1 text-sm font-medium">{{ current?.label }}</div>
        </div>
        <div
          v-if="icon || $slots.icon"
          class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center select-none md:right-2.5"
        >
          <slot name="icon">
            <Icon v-if="icon" :name="icon" class="size-4.5" />
          </slot>
        </div>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
        :class="contentStyles()"
        @mouseleave="clearOverride"
      >
        <UiDropdownMenuRadioGroup v-model="model">
          <UiDropdownMenuRadioItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            @mousemove="previewItem(option.value)"
            @focus="previewItem(option.value)"
          >
            {{ option.label }}
          </UiDropdownMenuRadioItem>
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
    <TypesetLockButton
      v-if="param"
      :param="param"
      class="absolute top-1/2 right-8 -translate-y-1/2"
    />
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { TypesetLockableParam, TypesetParamKey } from "~/utils/typeset/params";
  import { coerceTypesetValue } from "~/utils/typeset/params";

  const optionPickerStyles = tv({
    base: "group/picker relative",
  });

  const triggerStyles = tv({
    base: "hover:bg-muted data-[state=open]:bg-muted ring-foreground/10 focus-visible:ring-foreground/50 relative w-36 shrink-0 touch-manipulation rounded-xl p-3 ring-1 select-none focus-visible:outline-none disabled:opacity-50 md:w-full md:rounded-lg md:px-2.5 md:py-2",
  });

  const contentStyles = tv({
    base: "no-scrollbar z-50 min-w-32 overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl md:w-52 dark:bg-neutral-800/90 dark:ring-neutral-700/50",
  });

  export type TypesetOptionPickerProps = {
    label: string;
    /** Omit to render a picker that neither locks nor previews on hover. */
    param?: TypesetLockableParam;
    icon?: string;
    options: readonly { label: string; value: string }[];
    isMobile: boolean;
    /** Additional classes to apply to the picker wrapper. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetOptionPickerProps>();

  const model = defineModel<string>({ required: true });

  const { setOverride, clearOverride } = useTypesetPreviewOverride();

  const current = computed(() => props.options.find((option) => option.value === model.value));

  // Previews apply when the pointer settles: every mousemove re-arms the trailing
  // timer in useTypesetPreviewOverride, so nothing applies while the cursor is in
  // motion. Reka moves DOM focus to the highlighted item, so `focus` covers
  // keyboard (arrow key) browsing. Touch gets no preview — there is no hover.
  function previewItem(value: string) {
    if (props.isMobile || !props.param) {
      return;
    }
    const coerced = coerceTypesetValue(props.param as TypesetParamKey, value);
    if (coerced !== null) {
      setOverride({ [props.param]: coerced });
    }
  }
</script>
