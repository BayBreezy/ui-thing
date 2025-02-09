<template>
  <div>
    <template v-for="(field, index) in fields" :key="index">
      <template v-if="field.variant === 'Checkbox'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeCheckbox v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Input'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeInput v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Divider'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiDivider v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'CurrencyInput'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeCurrencyInput v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'DateField'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeDateField v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Textarea'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeTextarea v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'FileInput'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeFileInput :name="field.name" v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'MultiSelect'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeMultiSelect v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Select'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeSelect v-bind="removeFields(field)">
              <template v-for="(option, optIndex) in field.options" :key="optIndex">
                <option v-bind="option">{{ option.label }}</option>
              </template>
            </UiVeeSelect>
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'RadioGroup'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeRadioGroup :name="field.name" v-bind="removeFields(field)">
              <template v-for="(option, optIndex) in field.options" :key="optIndex">
                <div class="mb-2 flex items-center gap-3">
                  <UiRadioGroupItem :id="option.value" :value="option.value" />
                  <UiLabel :for="option.value">{{ option.label }}</UiLabel>
                </div>
              </template>
            </UiVeeRadioGroup>
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'PinInput'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeePinInput v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'TagsInput'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeTagsInput v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'VueformSlider'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeVueFormSlider v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'NativeCheckbox'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeNativeCheckbox v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  export type FormBuilder = {
    description?: string;
    hint?: string;
    disabled?: boolean;
    label?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    value?: any;
    rules?: any;
    class?: any;
    slot?: string;
    wrapperClass?: any;
    renderIf?: () => boolean;
    options?: any[];
    variant:
      | "Checkbox"
      | "NativeCheckbox"
      | "Input"
      | "Divider"
      | "CurrencyInput"
      | "DateField"
      | "FileInput"
      | "Select"
      | "Textarea"
      | "MultiSelect"
      | "PinInput"
      | "TagsInput"
      | "RadioGroup"
      | "VueformSlider";
    [key: string]: any;
  };
  export type FormBuilderProps = {
    fields: FormBuilder[];
  };
</script>
<script lang="ts" setup>
  defineProps<FormBuilderProps>();

  const omit = (obj: FormBuilder, keys: Array<keyof FormBuilder>) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as keyof FormBuilder))
    );

  const removeFields = (field: FormBuilder) => {
    return omit(field, ["wrapperClass", "renderIf", "variant", "slot"]);
  };
</script>
