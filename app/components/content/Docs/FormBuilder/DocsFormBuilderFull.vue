<template>
  <form @submit="submit">
    <fieldset :disabled="isSubmitting">
      <UiFormBuilder class="grid grid-cols-12 gap-5" :fields="form">
        <template #nextInstructions>
          <div class="col-span-full">
            <p class="font-semibold">We can do this too</p>
            <p class="text-sm text-muted-foreground">
              Check the box below to conditionally render a field
            </p>
          </div>
        </template>
      </UiFormBuilder>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import dayjs from "dayjs";
  import { array, bool, number, object, string } from "yup";
  import type { FormBuilder } from "@/components/Ui/FormBuilder/FormBuilder.vue";
  import type { InferType } from "yup";

  const schema = object({
    firstName: string().required().label("First Name").min(2),
    lastName: string().required().label("Last Name").min(2),
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
    age: number().required().label("Age").min(18).max(200).typeError("Invalid age"),
    salePrice: number()
      .typeError("Invalid price")
      .label("Sale Price")
      .when("itemsOnSale", {
        is: true,
        then: (s) => s.required(),
      })
      .transform((v) => (v ? parseFloat(v) : v)),
    fullPrice: number()
      .typeError("Invalid price")
      .label("Full Price")
      .when("itemsOnSale", {
        is: false,
        then: (s) => s.required(),
      })
      .transform((v) => (v ? parseFloat(v) : v)),
    itemsOnSale: bool().label("Items on Sale").default(false),
    multiSelect: array().of(string()).label("Multi Select").min(1),
  });
  const { handleSubmit, isSubmitting, resetForm, values } = useForm<InferType<typeof schema>>({
    name: "form-builder-full",
    validationSchema: schema,
    initialValues: {
      firstName: "Jane",
      // you will get a vue warning cause select with the multiple prop expects an array
      multiSelect: ["Option 1"],
    },
  });

  const submit = handleSubmit((values) => {
    try {
      console.log(values);
      useSonner.success("Form submitted successfully", {
        description: "We will reset the form in 5 seconds",
      });
      promiseTimeout(5000).then(() => {
        resetForm();
      });
    } catch (error) {
      console.log(error);
      useSonner.error("Form submission failed", {
        description: "Please try again",
      });
    }
  });

  const form: FormBuilder[] = [
    { variant: "Divider", name: "divider", wrapperClass: tw`col-span-full`, label: "Input" },
    {
      variant: "Input",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
      required: true,
      hint: "Enter your first name",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Input",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      required: true,
      hint: "Enter your last name",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Input",
      label: "Email",
      name: "email",
      placeholder: "igugowuj@jakomka.edu",
      type: "email",
      required: true,
      icon: "lucide:mail",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Input",
      label: "Password",
      name: "password",
      placeholder: "••••••••",
      icon: "lucide:lock",
      required: true,
      type: "password",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Input",
      type: "number",
      label: "Age",
      min: 18,
      max: 200,
      placeholder: "Enter your age",
      name: "age",
      wrapperClass: tw`col-span-6`,
    },
    {
      variant: "Input",
      type: "date",
      label: "Date of Birth",
      min: dayjs().subtract(100, "year").format("YYYY-MM-DD"),
      max: dayjs().subtract(18, "year").format("YYYY-MM-DD"),
      name: "dob",
      wrapperClass: tw`col-span-6`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Conditional & Currency",
    },
    { variant: "Input", name: "nextInstructions" },
    { variant: "Divider", name: "divider", wrapperClass: tw`col-span-full` },
    {
      variant: "CurrencyInput",
      label: "Full Price",
      name: "fullPrice",
      placeholder: "Enter the full price",
      required: true,
      hint: "Enter the full price",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "CurrencyInput",
      label: "Sale Price",
      name: "salePrice",
      placeholder: "Enter the sale price",
      required: true,
      hint: "Enter the sale price",
      wrapperClass: tw`col-span-full md:col-span-6`,
      renderIf: () => values.itemsOnSale,
    },
    {
      variant: "Checkbox",
      name: "itemsOnSale",
      label: "Items on Sale",
      hint: "Are these items on sale?",
      wrapperClass: tw`col-span-full`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "DateFields",
    },
    {
      variant: "DateField",
      name: "randomDateField",
      label: "Anniversary",
      hint: "When is your anniversary?",
      wrapperClass: tw`col-span-full`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "File Input",
    },
    {
      variant: "FileInput",
      name: "imageFile",
      label: "Image Files",
      hint: "Only image files are allowed",
      multiple: false,
      accept: "image/*",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "FileInput",
      name: "documentFiles",
      label: "Document Files",
      hint: "Only PDF document files are allowed",
      multiple: true,
      accept: "application/pdf",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Selects",
    },
    {
      variant: "Select",
      name: "singleSelect",
      label: "Select Only One",
      wrapperClass: tw`col-span-full md:col-span-6`,
      options: [
        { value: "", label: "Select a value", disabled: true },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
    {
      variant: "Select",
      name: "multiSelect",
      label: "Select Multiple",
      multiple: true,
      class: "h-[100px] mb-5",
      wrapperClass: tw`col-span-full md:col-span-6`,
      options: [
        { value: "none", label: "Select values", disabled: true },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "TextArea",
    },
    {
      variant: "Textarea",
      name: "message",
      label: "Message",
      placeholder: "Enter your message",
      required: true,
      hint: "Enter your message",
      wrapperClass: tw`col-span-full`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "MultiSelect",
    },
    {
      variant: "MultiSelect",
      name: "multiSelectMultiTags",
      // for multi-select, the formLabel prop is needed to display the label
      formLabel: "Select Multiple Tags",
      // The label prop is used when options is an array of objects
      label: "label",
      valueProp: "value",
      wrapperClass: tw`col-span-full md:col-span-6`,
      mode: "tags",
      options: [
        { value: "", label: "Select a value", disabled: true },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
    {
      variant: "MultiSelect",
      name: "multiSelectSingle",
      // for multi-select, the formLabel prop is needed to display the label
      formLabel: "Select One Option",
      wrapperClass: tw`col-span-full md:col-span-6`,
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Pin Input",
    },
    {
      variant: "PinInput",
      name: "pinInput",
      label: "Enter your pin",
      wrapperClass: tw`col-span-full`,
      inputCount: 6,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Tags Input",
    },
    {
      variant: "TagsInput",
      name: "tagInput",
      label: "Car Brands",
      wrapperClass: tw`col-span-full`,
      hint: "Type a brand and press enter to register it",
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Radio Group",
    },
    {
      variant: "RadioGroup",
      name: "radioGroup",
      label: "How would you like to be notified?",
      wrapperClass: tw`col-span-full`,
      options: [
        { label: "Send me emails only", value: "email" },
        { label: "Send me SMS only", value: "sms" },
        { label: "Call me", value: "call" },
        { label: "Don't notify me", value: "none" },
      ],
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Vueform Slider",
    },
    {
      variant: "VueformSlider",
      name: "vueFormSlider",
      label: "How much do you like Nuxt?",
      wrapperClass: tw`col-span-full md:col-span-6`,
      max: 5,
    },
    {
      variant: "VueformSlider",
      name: "volume",
      label: "Volume",
      wrapperClass: tw`col-span-full md:col-span-6`,
    },
    {
      variant: "Divider",
      name: "divider",
      wrapperClass: tw`col-span-full`,
      label: "Native Checkbox",
    },
    {
      variant: "NativeCheckbox",
      name: "vueFormNativeCheckbox",
      label: "Enable Notifications",
      wrapperClass: tw`col-span-full mb-8 mt-2`,
      description: "Receive notifications on your device",
    },
    {
      variant: "NativeCheckbox",
      name: "vueFormNativeCheckbox2",
      label: "Email Notifications",
      value: "email",
      description: "Get updates via email",
      wrapperClass: tw`col-span-full md:col-span-4`,
    },
    {
      variant: "NativeCheckbox",
      name: "vueFormNativeCheckbox2",
      label: "SMS Notifications",
      description: "Get updates via sms",
      value: "sms",
      wrapperClass: tw`col-span-full md:col-span-4`,
    },
    {
      variant: "NativeCheckbox",
      name: "vueFormNativeCheckbox2",
      label: "Call Notifications",
      description: "Get updates via call",
      value: "call",
      wrapperClass: tw`col-span-full md:col-span-4`,
    },
  ];
</script>
