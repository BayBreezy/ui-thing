<template>
  <VOtpInput
    ref="otp"
    v-model:value="localModel"
    :input-classes="styles({ separator: Boolean(separator), class: inputClasses })"
    :separator="separator"
    :num-inputs="numInputs"
    :input-type="inputType"
    :inputmode="inputmode"
    :should-auto-focus="shouldAutoFocus"
    :placeholder="placeholder"
    :is-disabled="disabled"
    @on-change="emits('change', $event)"
    @on-complete="emits('complete', $event)"
  />
</template>

<script lang="ts" setup>
  import VOtpInput from "vue3-otp-input";

  const otp = ref<InstanceType<typeof VOtpInput> | null>(null);

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      numInputs?: number;
      separator?: string;
      inputClasses?: any;
      conditionalClass?: any[];
      inputType?: "number" | "tel" | "letter-numeric" | "password";
      inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
      shouldAutoFocus?: boolean;
      placeholder?: string[];
      disabled?: boolean;
    }>(),
    {
      numInputs: 4,
      inputType: "letter-numeric",
      inputmode: "text",
      separator: "",
    }
  );
  const emits = defineEmits<{
    "update:modelValue": [any];
    change: [any];
    complete: [any];
    ready: [any];
  }>();
  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "mr-3 h-10 w-10 rounded-md border border-input bg-background p-1 text-center font-medium [-moz-appearance:_textfield] selection:bg-primary selection:text-primary-foreground  placeholder:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    variants: {
      separator: {
        true: "mx-2",
      },
    },
  });

  onMounted(() => {
    emits("ready", otp.value);
  });
</script>
