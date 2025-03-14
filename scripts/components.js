export default [
  {
    name: "Accordion",
    value: "accordion",
    instructions: ["Remember to add the accordion animations to your tailwind.config.js"],
    files: [
      "Accordion/Accordion.vue",
      "Accordion/Content.vue",
      "Accordion/Header.vue",
      "Accordion/Item.vue",
      "Accordion/Trigger.vue",
    ],
  },
  {
    name: "Alert",
    value: "alert",
    devDeps: ["@vueuse/core"],

    files: ["Alert/Alert.vue", "Alert/Description.vue", "Alert/Title.vue"],
  },
  {
    name: "Alert Dialog",
    value: "alert-dialog",

    devDeps: ["@vueuse/core"],

    utils: ["shared.styles.ts"],
    files: [
      "AlertDialog/Action.vue",
      "AlertDialog/AlertDialog.vue",
      "AlertDialog/Cancel.vue",
      "AlertDialog/Content.vue",
      "AlertDialog/Description.vue",
      "AlertDialog/Footer.vue",
      "AlertDialog/Header.vue",
      "AlertDialog/Overlay.vue",
      "AlertDialog/Portal.vue",
      "AlertDialog/Title.vue",
      "AlertDialog/Trigger.vue",
    ],
  },
  {
    name: "Aspect Ratio",
    value: "aspect-ratio",
    files: ["AspectRatio.vue"],
  },
  {
    name: "Autocomplete",
    value: "autocomplete",
    devDeps: ["@vueuse/core"],
    files: [
      "Autocomplete/Anchor.vue",
      "Autocomplete/Arrow.vue",
      "Autocomplete/Autocomplete.vue",
      "Autocomplete/Cancel.vue",
      "Autocomplete/Content.vue",
      "Autocomplete/Empty.vue",
      "Autocomplete/Group.vue",
      "Autocomplete/Input.vue",
      "Autocomplete/Item.vue",
      "Autocomplete/ItemIndicator.vue",
      "Autocomplete/Label.vue",
      "Autocomplete/Portal.vue",
      "Autocomplete/Separator.vue",
      "Autocomplete/Trigger.vue",
      "Autocomplete/Viewport.vue",
    ],
  },
  {
    name: "Avatar",
    value: "avatar",
    files: ["Avatar/Avatar.vue", "Avatar/Fallback.vue", "Avatar/Image.vue"],
  },
  {
    name: "Badge",
    value: "badge",
    files: ["Badge.vue"],
  },
  {
    name: "Breadcrumbs",
    value: "breadcrumbs",
    files: ["Breadcrumbs.vue"],
  },
  {
    name: "Button",
    value: "button",
    utils: ["shared.styles.ts"],
    files: ["Button.vue"],
  },
  {
    name: "Calendar",
    value: "calendar",
    devDeps: ["@samk-dev/nuxt-vcalendar"],
    nuxtModules: ["@samk-dev/nuxt-vcalendar"],
    instructions: ["You can customize the calendar by adding options to your nuxt.config.js file"],
    files: ["Calendar.vue"],
  },
  {
    name: "Card",
    value: "card",
    files: [
      "Card/Card.vue",
      "Card/Content.vue",
      "Card/Description.vue",
      "Card/Footer.vue",
      "Card/Header.vue",
      "Card/Title.vue",
    ],
  },
  {
    name: "Carousel",
    value: "carousel",
    files: [
      "Carousel/Carousel.vue",
      "Carousel/Content.vue",
      "Carousel/Item.vue",
      "Carousel/Next.vue",
      "Carousel/Previous.vue",
    ],
    deps: ["embla-carousel-vue", "embla-carousel"],
    composables: ["useCarousel.ts"],
  },
  {
    name: "Checkbox",
    value: "checkbox",
    files: ["Checkbox/Checkbox.vue", "Checkbox/Indicator.vue"],
  },
  {
    name: "Chip",
    value: "chip",
    files: ["Chip.vue"],
  },
  {
    name: "Collapsible",
    value: "collapsible",
    files: ["Collapsible/Collapsible.vue", "Collapsible/Content.vue", "Collapsible/Trigger.vue"],
  },
  {
    name: "Command",
    value: "command",
    files: [
      "Command/Cancel.vue",
      "Command/Command.vue",
      "Command/Dialog.vue",
      "Command/Empty.vue",
      "Command/Group.vue",
      "Command/Input.vue",
      "Command/Item.vue",
      "Command/Label.vue",
      "Command/List.vue",
      "Command/Separator.vue",
      "Command/Shortcut.vue",
    ],
  },
  {
    name: "Container",
    value: "container",
    files: ["Container.vue"],
  },
  {
    name: "Context Menu",
    value: "context-menu",
    files: [
      "ContextMenu/Arrow.vue",
      "ContextMenu/CheckboxItem.vue",
      "ContextMenu/Content.vue",
      "ContextMenu/ContextMenu.vue",
      "ContextMenu/Group.vue",
      "ContextMenu/Item.vue",
      "ContextMenu/ItemIndicator.vue",
      "ContextMenu/Label.vue",
      "ContextMenu/Portal.vue",
      "ContextMenu/RadioGroup.vue",
      "ContextMenu/RadioItem.vue",
      "ContextMenu/Separator.vue",
      "ContextMenu/Shortcut.vue",
      "ContextMenu/Sub.vue",
      "ContextMenu/SubContent.vue",
      "ContextMenu/SubTrigger.vue",
      "ContextMenu/Trigger.vue",
    ],
  },
  {
    name: "Currency Input",
    value: "currency-input",
    deps: ["vue-currency-input"],
    files: ["CurrencyInput.vue"],
  },
  {
    name: "DataTables.net",
    value: "datatable",
    deps: [
      "datatables.net-buttons-dt",
      "datatables.net-responsive-dt",
      "datatables.net-searchbuilder-dt",
      "datatables.net-fixedcolumns-dt",
      "datatables.net-fixedheader-dt",
      "datatables.net-select-dt",
      "datatables.net-vue3",
      "jszip",
    ],
    plugins: ["datatables.client.ts"],
    files: ["Datatable.client.vue"],
  },
  {
    name: "Date Field",
    value: "date-field",
    deps: ["@internationalized/date"],
    files: ["DateField.vue"],
  },
  {
    name: "Datepicker",
    value: "datepicker",
    devDeps: ["@samk-dev/nuxt-vcalendar"],
    nuxtModules: ["@samk-dev/nuxt-vcalendar"],
    instructions: [
      "You can customize the datepicker by adding options to your nuxt.config.js file",
    ],
    files: ["Datepicker.vue"],
  },
  {
    name: "Dialog",
    value: "dialog",
    files: [
      "Dialog/Close.vue",
      "Dialog/Content.vue",
      "Dialog/Description.vue",
      "Dialog/Dialog.vue",
      "Dialog/Footer.vue",
      "Dialog/Header.vue",
      "Dialog/Overlay.vue",
      "Dialog/Portal.vue",
      "Dialog/Title.vue",
      "Dialog/Trigger.vue",
    ],
  },
  {
    name: "Description List",
    value: "description-list",
    files: [
      "DescriptionList/DescriptionList.vue",
      "DescriptionList/Details.vue",
      "DescriptionList/Term.vue",
    ],
  },
  {
    name: "Divider",
    value: "divider",
    components: ["avatar"],
    files: ["Divider.vue"],
  },
  {
    name: "Drawer",
    value: "drawer",
    deps: ["vaul-vue"],
    files: [
      "Drawer/Close.vue",
      "Drawer/Content.vue",
      "Drawer/Description.vue",
      "Drawer/Drawer.vue",
      "Drawer/Footer.vue",
      "Drawer/Header.vue",
      "Drawer/Overlay.vue",
      "Drawer/Portal.vue",
      "Drawer/Title.vue",
      "Drawer/Trigger.vue",
    ],
  },
  {
    name: "Dropdown Menu",
    value: "dropdown-menu",
    files: [
      "DropdownMenu/Arrow.vue",
      "DropdownMenu/CheckboxItem.vue",
      "DropdownMenu/Content.vue",
      "DropdownMenu/DropdownMenu.vue",
      "DropdownMenu/Group.vue",
      "DropdownMenu/Item.vue",
      "DropdownMenu/ItemIndicator.vue",
      "DropdownMenu/Label.vue",
      "DropdownMenu/Portal.vue",
      "DropdownMenu/RadioGroup.vue",
      "DropdownMenu/RadioItem.vue",
      "DropdownMenu/Separator.vue",
      "DropdownMenu/Shortcut.vue",
      "DropdownMenu/Sub.vue",
      "DropdownMenu/SubContent.vue",
      "DropdownMenu/SubTrigger.vue",
      "DropdownMenu/Trigger.vue",
    ],
  },
  {
    name: "Dropfile",
    value: "dropfile",
    files: ["Dropfile.vue"],
  },
  {
    name: "Editable",
    value: "editable",
    files: [
      "Editable/Area.vue",
      "Editable/Cancel.vue",
      "Editable/Edit.vue",
      "Editable/Editable.vue",
      "Editable/Input.vue",
      "Editable/Preview.vue",
      "Editable/Submit.vue",
    ],
  },
  {
    name: "Fancy Icon",
    value: "fancy-icon",
    files: ["FancyIcon.vue"],
  },
  {
    name: "Form",
    value: "form",
    deps: ["@vee-validate/nuxt"],
    nuxtModules: ["@vee-validate/nuxt"],
    composables: ["useFormField.ts"],
    files: [
      "Form/Control.vue",
      "Form/Description.vue",
      "Form/Item.vue",
      "Form/Label.vue",
      "Form/Message.vue",
    ],
  },
  {
    name: "Gradient Divider",
    value: "gradient-divider",
    files: ["GradientDivider.vue"],
  },
  {
    name: "Hover Card",
    value: "hover-card",

    files: [
      "HoverCard/Arrow.vue",
      "HoverCard/Content.vue",
      "HoverCard/HoverCard.vue",
      "HoverCard/Portal.vue",
      "HoverCard/Trigger.vue",
    ],
  },
  {
    name: "Input",
    value: "input",
    devDeps: ["@vueuse/core"],
    files: ["Input.vue"],
  },
  {
    name: "Keyboard Key",
    value: "kbd",
    files: ["Kbd.vue"],
  },
  {
    name: "Label",
    value: "label",
    files: ["Label.vue"],
  },
  {
    name: "List",
    value: "list",
    files: [
      "List/Content.vue",
      "List/Item.vue",
      "List/List.vue",
      "List/Subtitle.vue",
      "List/Title.vue",
    ],
  },
  {
    name: "Listbox",
    value: "listbox",
    files: [
      "Listbox/Content.vue",
      "Listbox/Filter.vue",
      "Listbox/Group.vue",
      "Listbox/GroupLabel.vue",
      "Listbox/Item.vue",
      "Listbox/ItemIndicator.vue",
      "Listbox/Listbox.vue",
      "Listbox/Virtualizer.vue",
    ],
  },
  {
    name: "Loader",
    value: "loader",
    files: ["Loader.vue"],
    deps: ["@morev/vue-transitions"],
    nuxtModules: ["@morev/vue-transitions/nuxt"],
    devDeps: ["@iconify-json/svg-spinners"],
  },
  {
    name: "Menubar",
    value: "menubar",
    files: [
      "Menubar/Arrow.vue",
      "Menubar/CheckboxItem.vue",
      "Menubar/Content.vue",
      "Menubar/Group.vue",
      "Menubar/Item.vue",
      "Menubar/ItemIndicator.vue",
      "Menubar/Label.vue",
      "Menubar/Menu.vue",
      "Menubar/Menubar.vue",
      "Menubar/Portal.vue",
      "Menubar/RadioGroup.vue",
      "Menubar/RadioItem.vue",
      "Menubar/Separator.vue",
      "Menubar/Shortcut.vue",
      "Menubar/Sub.vue",
      "Menubar/SubContent.vue",
      "Menubar/SubTrigger.vue",
      "Menubar/Trigger.vue",
    ],
  },
  {
    name: "Navbar",
    value: "navbar",
    files: ["Navbar.vue"],
  },
  {
    name: "Native Select",
    value: "native-select",
    devDeps: ["@vueuse/core"],
    files: ["NativeSelect.vue"],
  },
  {
    name: "Navigation Menu",
    value: "navigation-menu",
    files: [
      "NavigationMenu/Content.vue",
      "NavigationMenu/Indicator.vue",
      "NavigationMenu/Item.vue",
      "NavigationMenu/Link.vue",
      "NavigationMenu/List.vue",
      "NavigationMenu/NavigationMenu.vue",
      "NavigationMenu/Sub.vue",
      "NavigationMenu/Trigger.vue",
      "NavigationMenu/Viewport.vue",
    ],
  },
  {
    name: "Number Field",
    value: "number-field",
    deps: ["@internationalized/number"],
    files: [
      "NumberField/Decrement.vue",
      "NumberField/Increment.vue",
      "NumberField/Input.vue",
      "NumberField/NumberField.vue",
    ],
  },
  {
    name: "Pagination",
    value: "pagination",
    files: [
      "Pagination/Ellipsis.vue",
      "Pagination/First.vue",
      "Pagination/Item.vue",
      "Pagination/Last.vue",
      "Pagination/List.vue",
      "Pagination/Next.vue",
      "Pagination/Pagination.vue",
      "Pagination/Prev.vue",
    ],
  },
  {
    name: "Pin Input (OTP)",
    value: "pin-input",
    files: ["PinInput/PinInput.vue", "PinInput/PinInputInput.vue"],
  },
  {
    name: "Placeholder",
    value: "placeholder",
    files: ["Placeholder.vue"],
  },
  {
    name: "Popover",
    value: "popover",

    files: [
      "Popover/Anchor.vue",
      "Popover/Arrow.vue",
      "Popover/Close.vue",
      "Popover/Content.vue",
      "Popover/Popover.vue",
      "Popover/Portal.vue",
      "Popover/Trigger.vue",
      "Popover/X.vue",
    ],
  },
  {
    name: "Progress",
    value: "progress",
    files: ["Progress/Indicator.vue", "Progress/Progress.vue"],
  },
  {
    name: "Radio Group",
    value: "radio-group",
    files: ["RadioGroup/Indicator.vue", "RadioGroup/Item.vue", "RadioGroup/RadioGroup.vue"],
  },
  {
    name: "Scroll Area",
    value: "scroll-area",
    files: [
      "ScrollArea/Corner.vue",
      "ScrollArea/ScrollArea.vue",
      "ScrollArea/Scrollbar.vue",
      "ScrollArea/Thumb.vue",
      "ScrollArea/Viewport.vue",
    ],
  },
  {
    name: "Select",
    value: "select",
    files: [
      "Select/Arrow.vue",
      "Select/Content.vue",
      "Select/Group.vue",
      "Select/Icon.vue",
      "Select/Item.vue",
      "Select/ItemIndicator.vue",
      "Select/ItemText.vue",
      "Select/Label.vue",
      "Select/Portal.vue",
      "Select/ScrollDownButton.vue",
      "Select/ScrollUpButton.vue",
      "Select/Select.vue",
      "Select/Separator.vue",
      "Select/Trigger.vue",
      "Select/Value.vue",
      "Select/Viewport.vue",
    ],
  },
  {
    name: "Separator",
    value: "separator",
    files: ["Separator.vue"],
  },
  {
    name: "Sheet",
    value: "sheet",
    files: [
      "Sheet/Close.vue",
      "Sheet/Content.vue",
      "Sheet/Description.vue",
      "Sheet/Footer.vue",
      "Sheet/Header.vue",
      "Sheet/Overlay.vue",
      "Sheet/Portal.vue",
      "Sheet/Sheet.vue",
      "Sheet/Title.vue",
      "Sheet/Trigger.vue",
      "Sheet/X.vue",
    ],
  },
  {
    name: "Sidebar",
    value: "sidebar",
    files: [
      "Sidebar/Content.vue",
      "Sidebar/Footer.vue",
      "Sidebar/Group.vue",
      "Sidebar/GroupAction.vue",
      "Sidebar/GroupContent.vue",
      "Sidebar/GroupLabel.vue",
      "Sidebar/Header.vue",
      "Sidebar/Input.vue",
      "Sidebar/Inset.vue",
      "Sidebar/Menu.vue",
      "Sidebar/MenuAction.vue",
      "Sidebar/MenuBadge.vue",
      "Sidebar/MenuButton.vue",
      "Sidebar/MenuButtonChild.vue",
      "Sidebar/MenuItem.vue",
      "Sidebar/MenuSkeleton.vue",
      "Sidebar/MenuSub.vue",
      "Sidebar/MenuSubButton.vue",
      "Sidebar/MenuSubItem.vue",
      "Sidebar/Provider.vue",
      "Sidebar/Rail.vue",
      "Sidebar/Separator.vue",
      "Sidebar/Sidebar.vue",
      "Sidebar/Trigger.vue",
    ],
    components: ["input", "tooltip", "skeleton", "separator", "sheet", "button"],
    utils: ["sidebar.ts"],
  },
  {
    name: "Skeleton",
    value: "skeleton",
    files: ["Skeleton.vue"],
  },
  {
    name: "Slider",
    value: "slider",
    files: ["Slider/Range.vue", "Slider/Slider.vue", "Slider/Thumb.vue", "Slider/Track.vue"],
  },
  {
    name: "Splitter",
    value: "splitter",
    files: ["Splitter/Splitter.vue", "Splitter/Panel.vue", "Splitter/Handle.vue"],
  },
  {
    name: "Stepper",
    value: "stepper",
    files: [
      "Stepper/Description.vue",
      "Stepper/Indicator.vue",
      "Stepper/Item.vue",
      "Stepper/Separator.vue",
      "Stepper/Stepper.vue",
      "Stepper/Title.vue",
      "Stepper/Trigger.vue",
    ],
  },
  {
    name: "Switch",
    value: "switch",
    files: ["Switch/Switch.vue", "Switch/Thumb.vue"],
  },
  {
    name: "Table",
    value: "table",
    files: [
      "Table/Body.vue",
      "Table/Caption.vue",
      "Table/Cell.vue",
      "Table/Empty.vue",
      "Table/Footer.vue",
      "Table/Head.vue",
      "Table/Header.vue",
      "Table/Row.vue",
      "Table/Table.vue",
    ],
  },
  {
    name: "Tabs",
    value: "tabs",
    files: [
      "Tabs/Content.vue",
      "Tabs/Indicator.vue",
      "Tabs/List.vue",
      "Tabs/Tabs.vue",
      "Tabs/Trigger.vue",
    ],
  },
  {
    name: "Tags Input",
    value: "tags-input",
    files: [
      "TagsInput/Clear.vue",
      "TagsInput/Field.vue",
      "TagsInput/Item.vue",
      "TagsInput/ItemDelete.vue",
      "TagsInput/ItemText.vue",
      "TagsInput/TagsInput.vue",
    ],
  },
  {
    name: "Tanstack Table",
    value: "tanstacktable",
    deps: ["@tanstack/vue-table"],
    components: ["checkbox"],
    files: ["TanStackTable.vue"],
  },
  {
    name: "Textarea",
    value: "textarea",
    files: ["Textarea.vue"],
  },
  {
    name: "Timeline",
    value: "timeline",
    files: [
      "Timeline/Content.vue",
      "Timeline/Date.vue",
      "Timeline/Header.vue",
      "Timeline/Indicator.vue",
      "Timeline/Item.vue",
      "Timeline/Separator.vue",
      "Timeline/Timeline.vue",
      "Timeline/Title.vue",
    ],
  },
  {
    name: "Toast",
    value: "toast",
    composables: ["useToast.ts"],
    instructions: ["Remember to add <UiToastToaster /> to your app.vue/layout file."],
    files: [
      "Toast/Action.vue",
      "Toast/Close.vue",
      "Toast/Description.vue",
      "Toast/Provider.vue",
      "Toast/Title.vue",
      "Toast/Toast.vue",
      "Toast/Toaster.vue",
      "Toast/Viewport.vue",
    ],
  },
  {
    name: "Toggle",
    value: "toggle",
    files: ["Toggle.vue"],
  },
  {
    name: "Toggle Group",
    value: "toggle-group",
    files: ["ToggleGroup/ToggleGroup.vue", "ToggleGroup/ToggleGroupItem.vue"],
  },
  {
    name: "Tooltip",
    value: "tooltip",
    files: [
      "Tooltip/Arrow.vue",
      "Tooltip/Content.vue",
      "Tooltip/Portal.vue",
      "Tooltip/Provider.vue",
      "Tooltip/Tooltip.vue",
      "Tooltip/Trigger.vue",
    ],
  },
  {
    name: "Tree",
    value: "tree",
    files: ["Tree/Item.vue", "Tree/Tree.vue", "Tree/Virtualizer.vue"],
  },
  {
    name: "Vue Sonner",
    value: "vue-sonner",
    deps: ["vue-sonner"],
    instructions: ["Remember to add the <UiVueSonner /> tag to your app.vue/layout file."],
    files: ["VueSonner.client.vue"],
  },
  {
    name: "Vee Form Builder",
    value: "vee-form-builder",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: [
      "label",
      "vee-checkbox",
      "Vee-input",
      "divider",
      "vee-currency-input",
      "vee-date-field",
      "vee-textarea",
      "vee-file-input",
      "vee-multi-select",
      "vee-select",
      "vee-pin-input",
      "vee-tags-input",
      "vee-radio-group",
      "vee-vue-form-slider",
      "vee-native-checkbox",
    ],
    files: ["FormBuilder/FormBuilder.vue"],
  },
  {
    name: "Vee Checkbox",
    value: "vee-checkbox",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["checkbox", "label"],
    files: ["Vee/Checkbox.vue"],
  },
  {
    name: "Vee Checkbox - Native",
    value: "vee-native-checkbox",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label"],
    files: ["Vee/NativeCheckbox.vue"],
  },
  {
    name: "Vee CurrencyInput",
    value: "vee-currency-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["currency-input", "label"],
    files: ["Vee/CurrencyInput.vue"],
  },
  {
    name: "Vee DateField",
    value: "vee-date-field",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@internationalized/date"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["date-field", "label"],
    files: ["Vee/DateField.vue"],
  },
  {
    name: "Vee Datepicker",
    value: "vee-datepicker",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["datepicker", "label", "input"],
    files: ["Vee/Datepicker.vue"],
  },
  {
    name: "Vee FileInput",
    value: "vee-file-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["input", "label"],
    files: ["Vee/FileInput.vue"],
  },
  {
    name: "Vee Input",
    value: "vee-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["input", "label"],
    files: ["Vee/Input.vue"],
  },
  {
    name: "Vee RadioGroup",
    value: "vee-radio-group",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["radio-group", "label"],
    files: ["Vee/RadioGroup.vue"],
  },
  {
    name: "Vee Select",
    value: "vee-select",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["native-select", "label"],
    files: ["Vee/Select.vue"],
  },
  {
    name: "Vee Textarea",
    value: "vee-textarea",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["textarea", "label"],
    files: ["Vee/Textarea.vue"],
  },
  {
    name: "Vee Tags-Input",
    value: "vee-tags-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["tags-input", "label"],
    files: ["Vee/TagsInput.vue"],
  },
  {
    name: "Vee MultiSelect",
    value: "vee-multi-select",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@vueform/multiselect"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label"],
    files: ["Vee/MultiSelect.vue"],
  },
  {
    name: "Vee VueFormSlider",
    value: "vee-vue-form-slider",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@vueform/slider"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: [],
    files: ["Vee/VueFormSlider.vue"],
  },
  {
    name: "Vee NumberField",
    value: "vee-number-field",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@internationalized/number"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label", "number-field"],
    files: ["Vee/NumberField.vue"],
  },
  {
    name: "Vee Pin-Input",
    value: "vee-pin-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label", "pin-input"],
    files: ["Vee/PinInput.vue"],
  },
  {
    name: "Chart",
    value: "chart",
    deps: ["@unovis/ts", "@unovis/vue"],
    components: ["card"],
    utils: ["chart.ts"],
    files: [
      "Chart/Area.vue",
      "Chart/Bar.vue",
      "Chart/Crosshair.vue",
      "Chart/Donut.vue",
      "Chart/Legend.vue",
      "Chart/Line.vue",
      "Chart/SingleTooltip.vue",
      "Chart/Tooltip.vue",
    ],
  },
];
