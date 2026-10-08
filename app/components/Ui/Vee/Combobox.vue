<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot name="label" :error-message="errorMessage" :value="value">
      <UiLabel
        v-if="label"
        :for="inputId"
        :hint="labelHint"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
      >
    </slot>
    <UiCombobox
      v-bind="$attrs"
      :model-value="modelValue"
      :by="by"
      :multiple="multiple"
      :name="name"
      :disabled="disabled"
      :reset-model-value-on-clear="clearable"
      @update:model-value="onUpdate"
    >
      <UiComboboxAnchor
        :as-child="multiple"
        :aria-invalid="errorMessage ? true : undefined"
        class="aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 has-disabled:cursor-not-allowed has-disabled:opacity-50"
      >
        <!-- Multiple: the selected items are rendered as removable tags next to the input -->
        <UiTagsInput
          v-if="multiple"
          :model-value="selected"
          :disabled="disabled"
          delimiter=""
          class="h-auto! min-h-9 w-full gap-1.5 px-3! py-1.5 pr-2!"
          @update:model-value="onUpdate"
        >
          <slot name="icon">
            <Icon v-if="icon" :name="icon" class="text-muted-foreground/70 size-4 shrink-0" />
          </slot>
          <UiTagsInputItem v-for="item in selected" :key="String(item)" :value="item">
            <UiTagsInputItemText>{{ labelOf(item) }}</UiTagsInputItemText>
            <UiTagsInputItemDelete />
          </UiTagsInputItem>
          <UiComboboxInput v-model="searchTerm" as-child>
            <UiTagsInputInput
              :id="inputId"
              :placeholder="selected.length ? undefined : placeholder"
              :aria-describedby="errorMessage ? errorId : hint ? hintId : undefined"
              :aria-required="required || undefined"
              :aria-invalid="errorMessage ? true : undefined"
              class="min-w-24 flex-1 p-0"
              @keydown.enter.prevent
              @blur="handleBlur"
            />
          </UiComboboxInput>
          <div
            v-if="(clearable && selected.length) || showTrigger"
            class="ml-auto flex items-center gap-1"
          >
            <UiComboboxCancel
              v-if="clearable && selected.length"
              class="text-muted-foreground hover:text-foreground inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
              aria-label="Clear"
            >
              <Icon name="lucide:x" class="size-4" />
            </UiComboboxCancel>
            <UiComboboxTrigger v-if="showTrigger">
              <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
            </UiComboboxTrigger>
          </div>
        </UiTagsInput>
        <template v-else>
          <slot name="icon">
            <Icon v-if="icon" :name="icon" class="text-muted-foreground/70 mr-2 size-4 shrink-0" />
          </slot>
          <UiComboboxInput
            :id="inputId"
            :placeholder="placeholder"
            :display-value="labelOf"
            :aria-describedby="errorMessage ? errorId : hint ? hintId : undefined"
            :aria-required="required || undefined"
            :aria-invalid="errorMessage ? true : undefined"
            @update:model-value="emit('search', $event)"
            @blur="handleBlur"
          />
          <UiComboboxCancel
            v-if="clearable && hasValue"
            class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
            aria-label="Clear"
          >
            <Icon name="lucide:x" class="size-4" />
          </UiComboboxCancel>
          <UiComboboxTrigger v-if="showTrigger">
            <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
          </UiComboboxTrigger>
        </template>
      </UiComboboxAnchor>

      <UiComboboxContent :hide-when-empty="!emptyText && !$slots.empty">
        <slot name="empty">
          <UiComboboxEmpty
            v-if="emptyText"
            class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
          >
            {{ emptyText }}
          </UiComboboxEmpty>
        </slot>
        <slot :error-message="errorMessage" :value="value">
          <UiComboboxGroup v-for="(group, i) in groups" :key="group.label ?? i">
            <UiComboboxLabel v-if="group.label">{{ group.label }}</UiComboboxLabel>
            <UiComboboxItem
              v-for="option in group.items"
              :key="String(option.value)"
              :value="option.value"
              :text-value="option.label"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </UiComboboxItem>
          </UiComboboxGroup>
        </slot>
      </UiComboboxContent>
    </UiCombobox>
    <AnimatePresence multiple as="div" mode="wait">
      <slot name="hint" :error-message="errorMessage" :value>
        <motion.p
          v-if="hint && !errorMessage"
          :id="hintId"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-muted-foreground mt-1.5 text-sm"
        >
          {{ hint }}
        </motion.p>
      </slot>
      <slot name="errorMessage" :error-message="errorMessage" :value>
        <motion.p
          v-if="errorMessage"
          :id="errorId"
          :variants
          initial="initial"
          exit="initial"
          animate="animate"
          :transition="{ type: 'keyframes' }"
          class="text-destructive mt-1.5 text-sm"
        >
          {{ errorMessage }}
        </motion.p>
      </slot>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  import { AnimatePresence, motion } from "motion-v";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  type Option = {
    /** The value stored in the form when the option is selected. */
    value: any;
    /** The text shown in the list and in the input. Defaults to the value. */
    label?: string;
    disabled?: boolean;
    /** Options with the same group are rendered together under a label. */
    group?: string;
  };

  const props = defineProps<{
    label?: string;
    labelHint?: string;
    hint?: string;
    icon?: string;
    placeholder?: string;
    modelValue?: any;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    /** Shows the required asterisk and sets `aria-required`. Add a rule to enforce it. */
    required?: boolean;
    disabled?: boolean;
    /** Allow selecting more than one option. The value is an array and shown as tags. */
    multiple?: boolean;
    /** Property (or comparator) used to match object values. */
    by?: string | ((a: any, b: any) => boolean);
    /** Options to render. Use the default slot for fully custom items. */
    options?: (string | number | Option)[];
    /**
     * Text shown in the input for the selected value. Defaults to the label of the matching option,
     * or the value itself. Use it with object values.
     */
    displayValue?: (value: any) => string;
    /**
     * Text shown when nothing matches. The popup stays hidden when there is no match and this is
     * empty.
     */
    emptyText?: string;
    /** Show a button that clears the selection. */
    clearable?: boolean;
    /** Show a chevron button that toggles the list. */
    showTrigger?: boolean;
    class?: HTMLAttributes["class"];
  }>();

  const emit = defineEmits<{
    /** Emitted when the value changes (used by `v-model`). */
    "update:modelValue": [value: any];
    /** Emitted with the text in the input as the user types. Use it to load options from an API. */
    search: [term: string];
  }>();

  // Every other attribute (`open-on-focus`, `ignore-filter`, ...) is forwarded to `UiCombobox`.
  defineOptions({ inheritAttrs: false });

  const inputId = props.id || useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const styles = tv({
    base: "w-full",
  });

  const { errorMessage, value, handleChange, handleBlur } = useField<any>(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );

  const searchTerm = ref("");
  watch(searchTerm, (term) => emit("search", term));

  // The combobox needs `null` (not `undefined`) to be controlled while nothing is selected
  const modelValue = computed(() => value.value ?? (props.multiple ? [] : null));
  const selected = computed<any[]>(() => (Array.isArray(value.value) ? value.value : []));
  const hasValue = computed(() => value.value != null && value.value !== "");

  // Clearing resets the combobox to `null`. Store `undefined` so schemas see an empty field.
  const onUpdate = (v: any) => {
    // Reka does not reset the text of the tags input when an item is picked
    if (props.multiple) searchTerm.value = "";
    handleChange(v ?? undefined);
  };

  const normalized = computed<Option[]>(() =>
    (props.options ?? []).map((o) =>
      typeof o === "object"
        ? { ...o, label: o.label ?? String(o.value) }
        : { value: o, label: String(o) }
    )
  );

  const labelOf = (v: any): string => {
    if (props.displayValue) return props.displayValue(v);
    if (v == null) return "";
    const match = normalized.value.find((o) =>
      typeof props.by === "function"
        ? props.by(o.value, v)
        : typeof v === "object" && props.by
          ? o.value?.[props.by] === v[props.by]
          : o.value === v
    );
    return match?.label ?? (typeof v === "object" ? "" : String(v));
  };

  // Ungrouped options are rendered first, followed by each named group in order of appearance
  const groups = computed(() => {
    const map = new Map<string | undefined, Option[]>();
    for (const option of normalized.value) {
      map.set(option.group, [...(map.get(option.group) ?? []), option]);
    }
    const ungrouped = map.get(undefined);
    map.delete(undefined);
    return [
      ...(ungrouped ? [{ label: undefined, items: ungrouped }] : []),
      ...[...map].map(([label, items]) => ({ label, items })),
    ];
  });
</script>
