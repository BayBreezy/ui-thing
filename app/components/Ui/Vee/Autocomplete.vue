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
    <UiAutocomplete
      v-bind="$attrs"
      :model-value="value ?? ''"
      :name="name"
      :disabled="disabled"
      @update:model-value="handleChange"
    >
      <UiAutocompleteAnchor
        :aria-invalid="errorMessage ? true : undefined"
        class="aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 has-disabled:cursor-not-allowed has-disabled:opacity-50"
      >
        <slot name="icon">
          <Icon v-if="icon" :name="icon" class="text-muted-foreground/70 mr-2 size-4 shrink-0" />
        </slot>
        <UiAutocompleteInput
          :id="inputId"
          :placeholder="placeholder"
          :aria-describedby="errorMessage ? errorId : hint ? hintId : undefined"
          :aria-required="required || undefined"
          :aria-invalid="errorMessage ? true : undefined"
          @blur="handleBlur"
        />
        <UiAutocompleteCancel
          v-if="clearable && value"
          class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiAutocompleteCancel>
        <UiAutocompleteTrigger v-if="showTrigger">
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent :hide-when-empty="!emptyText && !$slots.empty">
        <slot name="empty">
          <UiAutocompleteEmpty
            v-if="emptyText"
            class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
          >
            {{ emptyText }}
          </UiAutocompleteEmpty>
        </slot>
        <slot :error-message="errorMessage" :value="value">
          <UiAutocompleteGroup v-for="(group, i) in groups" :key="group.label ?? i">
            <UiAutocompleteLabel v-if="group.label">{{ group.label }}</UiAutocompleteLabel>
            <UiAutocompleteItem
              v-for="option in group.items"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.value }}
            </UiAutocompleteItem>
          </UiAutocompleteGroup>
        </slot>
      </UiAutocompleteContent>
    </UiAutocomplete>
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
    /** The text that fills the input when the suggestion is selected. */
    value: string;
    disabled?: boolean;
    /** Suggestions with the same group are rendered together under a label. */
    group?: string;
  };

  const props = defineProps<{
    label?: string;
    labelHint?: string;
    hint?: string;
    icon?: string;
    placeholder?: string;
    modelValue?: string;
    name?: string;
    id?: string;
    rules?: any;
    validateOnMount?: boolean;
    /** Shows the required asterisk and sets `aria-required`. Add a rule to enforce it. */
    required?: boolean;
    disabled?: boolean;
    /** Suggestions to render. Use the default slot for fully custom items. */
    options?: (string | Option)[];
    /**
     * Text shown when nothing matches. The popup stays hidden when there is no match and this is
     * empty.
     */
    emptyText?: string;
    /** Show a button that clears the input. */
    clearable?: boolean;
    /** Show a chevron button that toggles the suggestions. */
    showTrigger?: boolean;
    class?: HTMLAttributes["class"];
  }>();

  // Every other attribute (`open-on-focus`, `open-on-click`, `ignore-filter`, ...) is forwarded to
  // `UiAutocomplete`.
  defineOptions({ inheritAttrs: false });

  const inputId = props.id || useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const styles = tv({
    base: "w-full",
  });

  const { errorMessage, value, handleChange, handleBlur } = useField<string | undefined>(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );

  // Ungrouped suggestions are rendered first, followed by each named group in order of appearance
  const groups = computed(() => {
    const map = new Map<string | undefined, Option[]>();
    for (const o of props.options ?? []) {
      const option = typeof o === "string" ? { value: o } : o;
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
