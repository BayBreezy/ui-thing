<template>
  <div class="w-full">
    <UiLabel
      v-if="formLabel"
      :for="inputId"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ formLabel }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <Multiselect
      v-bind="$attrs"
      :id="inputId"
      ref="multiselect"
      v-model="value"
      :attrs="{
        id: inputId,
      }"
      :disabled="disabled"
      :name="name"
      :required="required"
      :classes="{
        containerActive: 'ring-2 ring-ring ring-offset-2 ring-offset-background transition',
      }"
    >
      <template v-for="(_, slotName) in $slots" #[slotName]="scope">
        <slot :name="slotName" v-bind="scope" />
      </template>
      <template #clear="{ clear }">
        <button class="mr-2 flex items-center justify-center" @click="clear">
          <Icon name="heroicons:x-mark" size="16" class="text-muted-foreground" />
        </button>
      </template>
    </Multiselect>
    <TransitionSlide group tag="div">
      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">
        {{ hint }}
      </p>

      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script setup lang="ts">
  import Multiselect from "@vueform/multiselect";

  import "@vueform/multiselect/themes/default.css";

  const multiselect = shallowRef<InstanceType<typeof Multiselect> | null>(null);

  interface Props
    extends /* @vue-ignore */ Partial<Omit<InstanceType<typeof Multiselect>, "$emit">> {}

  const props = defineProps<
    {
      modelValue?: any;
      formLabel?: string;
      required?: boolean;
      id?: string;
      hint?: string;
      disabled?: boolean;
      rules?: any;
      validateOnMount?: boolean;
      name?: string;
    } & Props
  >();

  const emit = defineEmits([
    "paste",
    "open",
    "close",
    "select",
    "deselect",
    "input",
    "search-change",
    "tag",
    "option",
    "update:modelValue",
    "change",
    "clear",
    "keydown",
    "keyup",
    "max",
    "create",
    "ready",
  ]);

  const inputId = props.id || useId();

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });

  onMounted(() => {
    nextTick(() => {
      emit("ready", multiselect.value);
    });
  });
</script>

<style>
  :root {
    --ms-font-size: theme("fontSize.sm");
    --ms-line-height: 1.5;
    --ms-bg: theme("colors.background");
    --ms-bg-disabled: transparent;
    --ms-border-color: theme("colors.input");
    --ms-border-width: 1px;
    --ms-border-color-active: theme("colors.input");
    --ms-border-width-active: 1px;
    --ms-radius: theme("borderRadius.md");
    --ms-py: theme("padding.2");
    --ms-px: theme("padding.3");
    --ms-ring-width: 0px;
    --ms-ring-color: theme("colors.ring");
    --ms-placeholder-color: theme("colors.muted.foreground");
    --ms-max-height: theme("height.52");

    --ms-spinner-color: theme("colors.muted.foreground");
    --ms-caret-color: theme("colors.muted.foreground");
    --ms-clear-color: theme("colors.muted.foreground");
    --ms-clear-color-hover: theme("colors.primary.DEFAULT");

    --ms-tag-font-size: theme("fontSize.sm");
    --ms-tag-line-height: 1.25rem;
    --ms-tag-font-weight: 500;
    --ms-tag-bg: theme("colors.primary.DEFAULT");
    --ms-tag-bg-disabled: transparent;
    --ms-tag-color: theme("colors.primary.foreground");
    --ms-tag-color-disabled: theme("colors.muted.foreground");
    --ms-tag-radius: theme("borderRadius.DEFAULT");
    --ms-tag-py: theme("padding[0.5]");

    --ms-dropdown-bg: theme("colors.background");
    --ms-dropdown-border-color: theme("colors.border");
    --ms-dropdown-border-width: 1px;
    --ms-dropdown-radius: theme("borderRadius.md");

    --ms-group-label-bg: theme("colors.muted.DEFAULT");
    --ms-group-label-color: theme("colors.muted.foreground");
    --ms-group-label-bg-pointed: theme("colors.primary.DEFAULT");
    --ms-group-label-color-pointed: theme("colors.primary.foreground");
    --ms-group-label-bg-disabled: theme("colors.muted.DEFAULT / 50%");
    --ms-group-label-color-disabled: theme("colors.muted.foreground / 50%");
    --ms-group-label-bg-selected: theme("colors.primary.DEFAULT");
    --ms-group-label-color-selected: theme("colors.primary.foreground");
    --ms-group-label-bg-selected-pointed: theme("colors.primary.DEFAULT");
    --ms-group-label-color-selected-pointed: theme("colors.primary.foreground");
    --ms-group-label-bg-selected-disabled: theme("colors.muted.DEFAULT / 50%");
    --ms-group-label-color-selected-disabled: theme("colors.muted.foreground / 50%");

    --ms-option-font-size: theme("fontSize.sm");
    --ms-option-bg-pointed: theme("colors.primary.DEFAULT");
    --ms-option-color-pointed: theme("colors.primary.foreground");
    --ms-option-bg-selected: theme("colors.primary.DEFAULT");
    --ms-option-color-selected: theme("colors.primary.foreground");
    --ms-option-bg-disabled: transparent;
    --ms-option-color-disabled: theme("colors.muted.foreground / 50%");
    --ms-option-bg-selected-pointed: theme("colors.primary.DEFAULT");
    --ms-option-color-selected-pointed: theme("colors.primary.foreground");
    --ms-option-bg-selected-disabled: theme("colors.muted.DEFAULT");
    --ms-option-color-selected-disabled: theme("colors.muted.foreground");

    --ms-empty-color: theme("colors.muted.foreground");
  }
</style>
