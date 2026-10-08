<template>
  <div :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot name="label" :error-message="errorMessage" :value="value">
      <UiLabel
        v-if="label"
        :id="labelId"
        :hint="labelHint"
        :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
      >
    </slot>
    <UiTagGroup
      :id="inputId"
      v-bind="$attrs"
      :model-value="modelValue"
      :selection-mode="selectionMode"
      :disallow-empty-selection="disallowEmptySelection"
      :disabled="disabled"
      :color="color"
      :variant="variant"
      :size="size"
      :shape="shape"
      :aria-labelledby="label ? labelId : undefined"
      :aria-describedby="errorMessage ? errorId : hint ? hintId : undefined"
      :aria-required="required || undefined"
      :data-invalid="errorMessage ? '' : undefined"
      class="data-invalid:ring-destructive/30 -m-1 rounded-lg p-1 transition-shadow data-invalid:ring-2"
      @update:model-value="onUpdate"
      @focusout="onFocusOut"
    >
      <slot :error-message="errorMessage" :value="value">
        <UiTagGroupItem
          v-for="option in normalized"
          :key="String(option.value)"
          :value="option.value"
          :disabled="option.disabled"
          :color="option.color"
          :variant="option.variant"
          :icon="option.icon"
          :avatar="option.avatar"
          :dot="option.dot"
        >
          <template #default="{ selected, disabled: itemDisabled }">
            <slot name="item" :option="option" :selected="selected" :disabled="itemDisabled">
              {{ option.label }}
            </slot>
          </template>
        </UiTagGroupItem>
      </slot>
    </UiTagGroup>
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

  import type {
    TagGroupColor,
    TagGroupShape,
    TagGroupSize,
    TagGroupVariant,
  } from "../TagGroup/TagGroup.vue";

  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  type Option = {
    /** The value stored in the form when the tag is selected. */
    value: any;
    /** The text of the tag. Defaults to the value. */
    label?: string;
    /** Color of this tag. Defaults to the `color` of the field. */
    color?: TagGroupColor;
    /** Variant of this tag. Defaults to the `variant` of the field. */
    variant?: TagGroupVariant;
    /** Icon shown before the text. */
    icon?: string;
    /** Image shown before the text. */
    avatar?: string;
    /** Show a colored dot before the text. */
    dot?: boolean;
    disabled?: boolean;
    /** Any other field is passed through to the `item` slot. */
    [key: string]: any;
  };

  const props = withDefaults(
    defineProps<{
      label?: string;
      labelHint?: string;
      hint?: string;
      modelValue?: any;
      name?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      /** Shows the required asterisk and sets `aria-required`. Add a rule to enforce it. */
      required?: boolean;
      disabled?: boolean;
      /** Tags to render. Use the default slot for fully custom tags. */
      options?: readonly (string | number | Option)[];
      /**
       * Whether one or several tags can be selected. The value is an array for `multiple`.
       *
       * @default multiple
       */
      selectionMode?: "single" | "multiple";
      /** Prevent the user from deselecting the last selected tag. */
      disallowEmptySelection?: boolean;
      /** Default color of the tags. */
      color?: TagGroupColor;
      /** Default variant of the tags. */
      variant?: TagGroupVariant;
      /** Default size of the tags. */
      size?: TagGroupSize;
      /** Default shape of the tags. */
      shape?: TagGroupShape;
      class?: HTMLAttributes["class"];
    }>(),
    { selectionMode: "multiple" }
  );

  // Every other attribute (`aria-label`, `loop`, `by`, ...) is forwarded to `UiTagGroup`.
  defineOptions({ inheritAttrs: false });

  const inputId = props.id || useId();
  const labelId = `${inputId}-label`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const styles = tv({
    base: "w-full",
  });

  const { errorMessage, value, handleChange, handleBlur } = useField<any>(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue ?? (props.selectionMode === "multiple" ? [] : undefined),
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true,
    }
  );

  // The tag group needs `undefined` (not `null`) while nothing is selected in single mode
  const modelValue = computed(() =>
    props.selectionMode === "multiple" ? (value.value ?? []) : (value.value ?? undefined)
  );

  const onUpdate = (v: any) => handleChange(v ?? undefined);

  // Mark the field as touched once focus leaves the whole group, not between two tags
  const onFocusOut = (e: FocusEvent) => {
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) handleBlur();
  };

  const normalized = computed<Option[]>(() =>
    (props.options ?? []).map((o) =>
      typeof o === "object"
        ? { ...o, label: o.label ?? String(o.value) }
        : { value: o, label: String(o) }
    )
  );
</script>
