<template>
  <div class="w-full">
    <UiLabel
      v-if="formLabel"
      :for="inputId"
      :class="[disabled && 'text-muted-foreground', errorMessage && 'text-destructive', 'mb-2']"
      ><span>{{ formLabel }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
    >
    <Multiselect
      v-bind="{ ...$attrs, ...forwarded }"
      :id="inputId"
      ref="multiselect"
      v-model="value"
      :attrs="{
        id: inputId,
      }"
      :name="name"
      :classes="{
        containerActive: 'ring-[3px]! ring-ring/50! transition border-primary!',
        containerOpen: 'rounded-b-md',
        containerOpenTop: 'rounded-t-md',
      }"
    >
      <template v-for="(_, slotName) in slots" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps ?? {}" />
      </template>
      <template #clear="{ clear }">
        <button class="mr-2 flex items-center justify-center" @click="clear">
          <Icon name="heroicons:x-mark" size="16" class="text-muted-foreground" />
        </button>
      </template>
    </Multiselect>
    <AnimatePresence as="div" multiple mode="wait">
      <motion.p
        v-if="hint && !errorMessage"
        :variants
        initial="initial"
        exit="initial"
        animate="animate"
        :transition="{ type: 'keyframes' }"
        class="text-muted-foreground mt-1.5 text-sm"
      >
        {{ hint }}
      </motion.p>

      <motion.p
        v-if="errorMessage"
        :variants
        initial="initial"
        exit="initial"
        animate="animate"
        :transition="{ type: 'keyframes' }"
        class="text-destructive mt-1.5 text-sm"
      >
        {{ errorMessage }}
      </motion.p>
    </AnimatePresence>
  </div>
</template>

<script lang="ts">
  import Multiselect from "@vueform/multiselect";
  import { motion } from "motion-v";
  import { useForwardPropsEmits } from "reka-ui";

  import "@vueform/multiselect/themes/default.css";

  type OptionValue = string | number | boolean | Record<string, any>;
  type OptionItem = OptionValue | Record<string, any>;

  export interface MultiselectInstance {
    /** Opens the options dropdown. */
    open(): void;

    /** Closes the options dropdown. */
    close(): void;

    /** Selects a given option by object. */
    select(option: any): void;

    /** Deselects a given option by object. */
    deselect(option: any): void;

    /** Alias for `deselect`. */
    remove(option: any): void;

    /** Selects all options (if using `multiple` or `tags` mode). */
    selectAll(): void;

    /** Deselects all selected options. */
    clear(): void;

    /** Clears the current search input. */
    clearSearch(): void;

    /**
     * Refreshes async options list.
     *
     * @param callback Function to call after refreshing.
     */
    refreshOptions(callback?: () => void): void;

    /** Sets the active pointer to a specific option. */
    setPointer(option: any): void;
  }

  export type MultiselectSlots = {
    /** Rendered as placeholder when no value is selected and the `placeholder` prop is defined. */
    placeholder(): any;

    /** Rendered before the options list. */
    beforelist(): any;

    /** Rendered after the options list. */
    afterlist(): any;

    /**
     * Rendered when using `multiple` mode and options are selected.
     *
     * @param values The selected values array.
     */
    multiplelabel(props: { values: any[] }): any;

    /** Rendered when the options list is empty. Defaults to `noOptionsText`. */
    nooptions(): any;

    /** Rendered when search yields no matching results. Defaults to `noResultsText`. */
    noresults(): any;

    /**
     * Renders the group label for an option group.
     *
     * @param group The group object.
     * @param isPointed Function to check if the group is pointed.
     * @param isSelected Function to check if the group is selected.
     */
    grouplabel(props: {
      group: any;
      isPointed: (option: any) => boolean;
      isSelected: (option: any) => boolean;
    }): any;

    /**
     * Renders a single option in the dropdown.
     *
     * @param option The option object.
     * @param isPointed Function to check if the option is pointed.
     * @param isSelected Function to check if the option is selected.
     * @param search Current search query string.
     */
    option(props: {
      option: any;
      isPointed: (option: any) => boolean;
      isSelected: (option: any) => boolean;
      search: string;
    }): any;

    /**
     * Renders the label in single-select mode.
     *
     * @param value The selected option object.
     */
    singlelabel(props: { value: any }): any;

    /**
     * Renders each tag in `tags` mode.
     *
     * @param option The tag/option object.
     * @param handleTagRemove Function to remove the tag.
     * @param disabled Whether the tag is disabled.
     */
    tag(props: { option: any; handleTagRemove: () => void; disabled: boolean }): any;

    /**
     * Renders the caret (dropdown arrow).
     *
     * @param handleCaretClick Function to toggle dropdown.
     * @param isOpen Whether the dropdown is open.
     */
    caret(props: { handleCaretClick: () => void; isOpen: boolean }): any;

    /**
     * Renders the clear (remove) icon.
     *
     * @param clear Method to clear the current value(s).
     */
    clear(props: { clear: () => void }): any;

    /** Renders a loader icon during async fetching. */
    spinner(): any;

    /** Renders a loader icon during infinite scroll loading. */
    infinite(): any;
  };

  export interface MultiselectEmits<T = any> {
    /**
     * Emitted when the model value changes.
     *
     * @param value - The updated value.
     * @param select$ - The Multiselect component instance.
     */
    change: [value: any, select$: MultiselectInstance];

    /**
     * Emitted after an option or tag is selected.
     *
     * @param value - The updated value.
     * @param option - The option object that was selected.
     * @param select$ - The Multiselect component instance.
     */
    select: [value: any, option: any, select$: MultiselectInstance];

    /**
     * Emitted after an option or tag is deselected or removed.
     *
     * @param value - The updated value.
     * @param option - The option object that was deselected.
     * @param select$ - The Multiselect component instance.
     */

    deselect: [value: any, option: any, select$: any];

    /**
     * Emitted when the options dropdown is opened.
     *
     * @param select$ - The Multiselect component instance.
     */
    open: [select$: MultiselectInstance];

    /**
     * Emitted when the options dropdown is closed.
     *
     * @param select$ - The Multiselect component instance.
     */
    close: [select$: MultiselectInstance];

    /**
     * Emitted when the search input query changes.
     *
     * @param query - The current search query.
     * @param select$ - The Multiselect component instance.
     */
    "search-change": [query: string, select$: MultiselectInstance];

    /**
     * Emitted when a new tag is being created by pressing Enter.
     *
     * @deprecated since v2.3.0 - Use `@create` instead.
     * @param query - The search input that triggered tag creation.
     * @param select$ - The Multiselect component instance.
     */

    tag: [query: string, select$: MultiselectInstance];

    /**
     * Emitted when a new option is being created by pressing Enter.
     *
     * @deprecated since v2.6.0 - Use `@create` instead.
     * @param query - The search input that triggered option creation.
     * @param select$ - The Multiselect component instance.
     */

    option: [query: string, select$: MultiselectInstance];

    /**
     * Emitted when a new tag or option is created using the search query.
     *
     * @param query - The input used to create the option.
     * @param select$ - The Multiselect component instance.
     */

    create: [query: string, select$: MultiselectInstance];

    /**
     * Emitted when the selection is cleared via the clear button.
     *
     * @param select$ - The Multiselect component instance.
     */

    clear: [select$: MultiselectInstance];

    /**
     * Emitted when the user pastes text into the search field.
     *
     * @param event - The native paste event.
     * @param select$ - The Multiselect component instance.
     */
    paste: [event: ClipboardEvent, select$: MultiselectInstance];

    /**
     * Emitted when a key is pressed down inside the search field.
     *
     * @param event - The native keyboard event.
     * @param select$ - The Multiselect component instance.
     */
    keydown: [event: KeyboardEvent, select$: MultiselectInstance];

    /**
     * Emitted when a key is released inside the search field.
     *
     * @param event - The native keyboard event.
     * @param select$ - The Multiselect component instance.
     */

    keyup: [event: KeyboardEvent, select$: MultiselectInstance];

    /**
     * Emitted when the maximum number of selected options is reached in `multiple` or `tags` mode.
     *
     * @param select$ - The Multiselect component instance.
     */

    max: [select$: MultiselectInstance];

    /**
     * Emitted when the component is ready and mounted.
     *
     * @param select$ - The Multiselect component instance.
     */
    ready: [select$?: MultiselectInstance];
    /** Emitted when the model value changes. */
    "update:modelValue": [value: T | T[]];
  }

  /** Multiselect component class names used for styling and customization. */
  export type MultiselectClasses = {
    container: string;
    containerDisabled: string;
    containerOpen: string;
    containerOpenTop: string;
    containerActive: string;
    wrapper: string;
    singleLabel: string;
    singleLabelText: string;
    multipleLabel: string;
    search: string;
    tags: string;
    tag: string;
    tagDisabled: string;
    tagWrapper: string;
    tagWrapperBreak: string;
    tagRemove: string;
    tagRemoveIcon: string;
    tagsSearchWrapper: string;
    tagsSearch: string;
    tagsSearchCopy: string;
    placeholder: string;
    caret: string;
    caretOpen: string;
    clear: string;
    clearIcon: string;
    spinner: string;
    infinite: string;
    infiniteSpinner: string;
    dropdown: string;
    dropdownTop: string;
    dropdownHidden: string;
    options: string;
    optionsTop: string;
    group: string;
    groupLabel: string;
    groupLabelPointable: string;
    groupLabelPointed: string;
    groupLabelSelected: string;
    groupLabelDisabled: string;
    groupLabelSelectedPointed: string;
    groupLabelSelectedDisabled: string;
    groupOptions: string;
    option: string;
    optionPointed: string;
    optionSelected: string;
    optionDisabled: string;
    optionSelectedPointed: string;
    optionSelectedDisabled: string;
    noOptions: string;
    noResults: string;
    fakeInput: string;
    assist: string;
    spacer: string;
  };

  /** Advanced props for the @vueform/multiselect component. */
  export interface MultiselectAdvancedProps {
    /**
     * Whether values not present in the options list should be allowed. Useful when using async
     * options and string values where label and value are the same.
     *
     * @example
     *   allowAbsent: true;
     *
     * @default false
     */
    allowAbsent?: boolean;

    /**
     * Whether a selected option can be deselected in single-select mode.
     *
     * @default true
     */
    canDeselect?: boolean;

    /**
     * Whether selected option(s) can be cleared using the clear button.
     *
     * @default true
     */
    canClear?: boolean;

    /**
     * Whether to clear the option list before loading new async options on search input.
     *
     * @default false
     */
    clearOnSearch?: boolean;

    /**
     * Whether to clear the option list after selecting an option. Primarily useful for async
     * loading.
     *
     * @default true
     */
    clearOnSelect?: boolean;

    /**
     * Whether to close the option list after selecting an option.
     *
     * @default true
     */
    closeOnSelect?: boolean;

    /**
     * Whether to close the option list after deselecting an option.
     *
     * @default true
     */
    closeOnDeselect?: boolean;

    /**
     * Whether the search query should be cleared when the input loses focus.
     *
     * @default true
     */
    clearOnBlur?: boolean;

    /**
     * Delay in milliseconds between the last typed character and the refresh of the async option
     * list. Use -1 to disable automatic refresh, 0 for no delay.
     *
     * @default -1
     */
    delay?: number;

    /**
     * Whether the results should be filtered by the search query.
     *
     * Set to false when you handle filtering on the server side.
     *
     * @default true
     */
    filterResults?: boolean;

    /**
     * Minimum number of characters required to trigger async loading.
     *
     * Set to 0 to trigger on empty input as well.
     *
     * @default 0
     */
    minChars?: number;

    /**
     * Whether async options should be resolved immediately on component mount.
     *
     * Required for non-object default values in async mode.
     *
     * @default true
     */
    resolveOnLoad?: boolean;

    /**
     * Whether long tags should wrap onto new lines instead of being truncated.
     *
     * @default false
     */
    breakTags?: boolean;

    /**
     * Whether new tags should be automatically appended to the option list when using `tags` mode.
     *
     * @deprecated since v2.3.0 - use `appendNewOption` instead.
     * @default true
     */
    appendNewTag?: boolean;

    /**
     * Whether new tags should be creatable based on the search query when using `tags` mode.
     *
     * @deprecated since v2.3.0 - use `createOption` instead.
     * @default false
     */
    createTag?: boolean;

    /**
     * Keys that trigger tag creation in `tags` mode with `createTag` enabled.
     *
     * @deprecated since v2.3.0 - use `addOptionOn` instead.
     * @example
     *   addTagOn: ["enter", "comma"];
     *
     * @default ["enter"]
     */
    addTagOn?: Array<"enter" | "space" | "tab" | ";" | ",">;

    /**
     * Whether new options should be automatically added to the list when `searchable` and
     * `createOption` are enabled.
     *
     * @default true
     */
    appendNewOption?: boolean;

    /**
     * Whether users can create new options via the search field.
     *
     * Must be used with `searchable: true`.
     *
     * @default false
     */
    createOption?: boolean;

    /**
     * Keys that trigger the creation of a new option when `createOption` is enabled.
     *
     * @default ["enter"]
     */
    addOptionOn?: Array<"enter" | "space" | "tab" | ";" | ",">;

    /**
     * Callback for transforming the created option before it gets added to the option list.
     *
     * Return false to cancel creation and handle it manually.
     *
     * @example
     *   onCreate(option, select$) {
     *   return {
     *   value: option.label.toLowerCase(),
     *   label: option.label,
     *   trackBy: 'value'
     *   }
     *   }
     *
     * @param option - The original object to be added (`{ value, label }`)
     * @param select$ - The Multiselect component instance.
     *
     * @returns A transformed object with required keys or `false` to cancel.
     */
    onCreate?: (option: any, select$: MultiselectInstance) => any | false;

    /**
     * Whether selected options should be hidden from the options list.
     *
     * Applies to `multiple` and `tags` modes.
     *
     * @default true
     */
    hideSelected?: boolean;

    /**
     * Whether the options list should be shown at all.
     *
     * Useful for creating free-type entries (e.g., tags).
     *
     * @default true
     */
    showOptions?: boolean;

    /**
     * Whether to treat `value` as a complex object.
     *
     * @example
     *   object: true; // Value will be an array of objects: [{ value, label }]
     *
     * @default false
     */
    object?: boolean;

    /**
     * Additional HTML attributes to pass to the native search `input` element.
     *
     * @example
     *   attrs: {
     *   'aria-label': 'Search options',
     *   'data-custom': 'value'
     *   }
     *
     * @default {}
     */
    attrs?: Record<string, any>;

    /**
     * Whether to add hidden inputs for form support (native submit).
     *
     * @default false
     */
    nativeSupport?: boolean;
  }

  export type MultiselectProps = {
    /**
     * Determines the selection mode.
     *
     * @example
     *   "multiple";
     *
     * @default "single"
     */
    mode?: "single" | "multiple" | "tags";

    /**
     * The list of selectable options. Can be an array, object, or async function.
     *
     * @example
     *   ["Apple", "Banana"];
     *
     * @example
     *   { a: 1, b: 2 }
     *
     * @example
     *   (query, instance) => Promise.resolve([{ value: 1, label: "One" }]);
     *
     * @default [ ]
     */
    options?:
      | OptionItem[]
      | Record<string, any>
      | ((query?: string, select$?: MultiselectInstance) => Promise<OptionItem[]>);

    /**
     * Whether the options should be grouped.
     *
     * @example
     *   ```js
     *   const options = [
     *     {
     *       label: "DC",
     *       options: ["Batman", "Robin", "Joker"],
     *     },
     *     {
     *       label: "Marvel",
     *       options: ["Spider-man", "Iron Man", "Captain America"],
     *     },
     *   ];
     *   ```;
     *
     * @default false
     */
    groups?: boolean;

    /**
     * Property name for group label. Used when `groups` is true.
     *
     * @default "label"
     */
    groupLabel?: string;

    /**
     * Property name for group options. Used when `groups` is true.
     *
     * @default "options"
     */
    groupOptions?: string;

    /**
     * Whether group headers can be selected. Only applies to `multiple` or `tags` mode.
     *
     * @default true
     */
    groupSelect?: boolean;

    /**
     * Hide groups that have no options.
     *
     * @default false
     */
    groupHideEmpty?: boolean;

    /**
     * Use the native HTML5 `required` attribute.
     *
     * @default false
     */
    required?: boolean;

    /**
     * Enables infinite scroll loading.
     *
     * The `limit` option defines how many options are loaded initially and in each new batch.
     *
     * @default false
     */
    infinite?: boolean;

    /**
     * Whether to append the dropdown to <body>.
     *
     * @default false
     */
    appendToBody?: boolean;

    /**
     * Append dropdown to a custom element using query selector.
     *
     * @example
     *   "#my-container";
     */
    appendTo?: string;

    /**
     * Close dropdown on parent scroll when `appendToBody` is true.
     *
     * @default false
     */
    closeOnScroll?: boolean;

    /**
     * Enable search input in the dropdown.
     *
     * @default false
     */
    searchable?: boolean;

    /**
     * Property used for the value in object-based options.
     *
     * @example
     *   "id";
     *
     * @example
     *   ```js
     *   const options = [
     *     { id: 1, label: "Apple" },
     *     { id: 2, label: "Banana" },
     *   ];
     *   ```;
     *
     * @default "value"
     */
    valueProp?: string;

    /**
     * Property or list of properties to use for searching.
     *
     * @example
     *   "name";
     *
     * @example
     *   ["name", "email"];
     */
    trackBy?: string | string[];

    /**
     * Property used for displaying the label.
     *
     * @default "label"
     */
    label?: string;

    /**
     * Property used to mark options as disabled.
     *
     * @default "disabled"
     */
    disabledProp?: string;

    /**
     * Placeholder text before selection.
     *
     * @default null
     */
    placeholder?: string | null;

    /**
     * Custom label renderer for multiple selected options.
     *
     * @example
     *   (value, select$) => `${value.length} selected`;
     */
    multipleLabel?: (value: OptionValue[], select$: MultiselectInstance) => string;

    /**
     * Whether the component is disabled.
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * `type` attribute for the search input.
     *
     * @default "text"
     */
    inputType?: string;

    /** `autocomplete` attribute for the search input. */
    autocomplete?: string;

    /**
     * Enables RTL support.
     *
     * @default false
     */
    rtl?: boolean;

    /**
     * Max number of selections allowed. Applies to `multiple` and `tags` modes.
     *
     * @default -1 (no limit)
     */
    max?: number;

    /**
     * Max number of options displayed.
     *
     * @default -1 (no limit)
     */
    limit?: number;

    /**
     * Whether a loading spinner should be shown.
     *
     * @default false
     */
    loading?: boolean;

    /**
     * ID of the outer container.
     *
     * @default "multiselect"
     */
    id?: string;

    /**
     * Show the dropdown caret icon.
     *
     * @default true
     */
    caret?: boolean;

    /**
     * Multiselect locale key (e.g., 'en', 'fr').
     *
     * @default null
     */
    locale?: string;

    /**
     * Text displayed when options list is empty.
     *
     * @default "The list is empty"
     */
    noOptionsText?: string | Record<string, string>;

    /**
     * Text displayed when no search results are found.
     *
     * @default "No results found"
     */
    noResultsText?: string | Record<string, string>;

    /**
     * Position of the dropdown relative to the input.
     *
     * @default "bottom"
     */
    openDirection?: "top" | "bottom";

    /**
     * Whether to reverse the dropdown options.
     *
     * Only applies when `groups: false`.
     *
     * @default false
     */
    reverse?: boolean;

    /**
     * Regex pattern for validating input.
     *
     * @example
     *   /^[A-Z]/;
     */
    regex?: string | RegExp;

    /**
     * Respect accents/diacritics in search.
     *
     * @default true
     */
    strict?: boolean;

    /**
     * Match search term from the beginning of string.
     *
     * @default false
     */
    searchStart?: boolean;

    /** Override default search algorithm. */
    searchFilter?: (option: OptionItem, query: string, select$: MultiselectInstance) => boolean;

    /**
     * ARIA attributes for accessibility.
     *
     * @example
     *   { "aria-label": "Select fruit" }
     */
    aria?: Record<string, string>;

    /**
     * Object to customize classes.
     *
     * Accepts partial override of all component parts.
     */
    classes?: Partial<MultiselectClasses>;
  };
</script>

<script setup lang="ts" generic="T extends any">
  const variants = {
    initial: { opacity: 0, y: -2 },
    animate: { opacity: 1, y: 0 },
  };

  const multiselect = useTemplateRef<MultiselectInstance>("multiselect");

  const props = defineProps<
    {
      /** Default value for the multiselect. */
      modelValue?: T | T[];
      /** The label to display above the components. */
      formLabel?: string;
      /** The default `id` for the input element. */
      id?: string;
      /**
       * Hint to display below the input.
       *
       * Can be used to provide additional information or instructions.
       */
      hint?: string;
      /** Any custom rule to pass to `vee-validate` for validation. */
      rules?: any;
      /** Whether the field should be validated as soon as the component is mounted. */
      validateOnMount?: boolean;
      /** The name of the field. Used for validation. */
      name?: string;
    } & MultiselectProps &
      MultiselectAdvancedProps
  >();

  const emits = defineEmits<MultiselectEmits<T>>();
  const _forwarded = useForwardPropsEmits(
    reactiveOmit(props, [
      "modelValue",
      "formLabel",
      "hint",
      "id",
      "name",
      "rules",
      "validateOnMount",
    ]),
    emits
  );

  const forwarded = computed(() => {
    const { "onUpdate:modelValue": _omit, ...rest } = _forwarded.value as any;
    if (props.onCreate !== undefined) {
      rest.onCreate = props.onCreate;
    } else {
      delete rest.onCreate;
    }
    return rest;
  });

  const inputId = props.id || useId();
  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    syncVModel: true,
  });

  defineExpose({
    multiselect: multiselect.value,
    open: multiselect.value?.open,
    close: multiselect.value?.close,
    select: multiselect.value?.select,
    deselect: multiselect.value?.deselect,
    remove: multiselect.value?.remove,
    selectAll: multiselect.value?.selectAll,
    clear: multiselect.value?.clear,
    clearSearch: multiselect.value?.clearSearch,
    refreshOptions: multiselect.value?.refreshOptions,
    setPointer: multiselect.value?.setPointer,
  });

  defineSlots<MultiselectSlots>();

  const slots = useSlots();
</script>

<style>
  :root {
    --ms-font-size: var(--text-sm);
    --ms-line-height: 1.35;
    --ms-bg: transparent;
    --ms-bg-disabled: transparent;
    --ms-border-color: var(--color-input);
    --ms-border-width: 1px;
    --ms-border-color-active: var(--color-primary);
    --ms-border-width-active: 1px;
    --ms-radius: var(--radius-md);
    --ms-py: calc(var(--spacing) * 2);
    --ms-px: calc(var(--spacing) * 3);
    --ms-ring-width: 3px;
    --ms-ring-color: --alpha(var(--color-ring) / 50%);
    --ms-placeholder-color: var(--color-muted-foreground);
    --ms-max-height: 300px;

    --ms-spinner-color: var(--color-muted-foreground);
    --ms-caret-color: var(--color-muted-foreground);
    --ms-clear-color: var(--color-muted-foreground);
    --ms-clear-color-hover: var(--color-primary);

    --ms-tag-font-size: var(--text-xs);
    --ms-tag-line-height: 1.3rem;
    --ms-tag-font-weight: 500;
    --ms-tag-bg: transparent;
    --ms-tag-bg-disabled: var(--color-muted);
    --ms-tag-color: var(--color-foreground);
    --ms-tag-color-disabled: var(--color-muted-foreground);
    --ms-tag-radius: calc(var(--radius) - 4px);
    --ms-tag-py: 2px;

    --ms-dropdown-bg: var(--color-background);
    --ms-dropdown-border-color: var(--color-border);
    --ms-dropdown-border-width: 1px;
    --ms-dropdown-radius: var(--radius-md);

    --ms-group-label-bg: transparent;
    --ms-group-label-color: var(--color-muted-foreground);
    --ms-group-label-bg-pointed: var(--color-accent);
    --ms-group-label-color-pointed: var(--color-accent-foreground);
    --ms-group-label-bg-disabled: transparent;
    --ms-group-label-color-disabled: --alpha(var(--color-accent-foreground) / 50%);
    --ms-group-label-bg-selected: var(--color-accent);
    --ms-group-label-color-selected: var(--color-accent-foreground);
    --ms-group-label-bg-selected-pointed: var(--color-accent);
    --ms-group-label-color-selected-pointed: var(--color-accent-foreground);
    --ms-group-label-bg-selected-disabled: transparent;
    --ms-group-label-color-selected-disabled: --alpha(var(--color-accent-foreground) / 50%);

    --ms-option-font-size: var(--text-sm);
    --ms-option-bg-pointed: var(--color-accent);
    --ms-option-color-pointed: var(--color-accent-foreground);
    --ms-option-bg-selected: var(--color-accent);
    --ms-option-color-selected: var(--color-accent-foreground);
    --ms-option-bg-disabled: transparent;
    --ms-option-color-disabled: --alpha(var(--color-accent-foreground) / 50%);
    --ms-option-bg-selected-pointed: var(--color-accent);
    --ms-option-color-selected-pointed: var(--color-accent-foreground);
    --ms-option-bg-selected-disabled: transparent;
    --ms-option-color-selected-disabled: var(--color-muted-foreground);

    --ms-empty-color: var(--color-muted-foreground);
  }

  .dark {
    --ms-bg: --alpha(var(--color-input) / 30%);
    --ms-dropdown-bg: var(--color-popover);
  }

  .multiselect-group-label {
    padding: 8px 8px;
    font-weight: normal;
    font-size: 12px;
    color: var(--color-muted-foreground);
  }
  .multiselect-options {
    padding: 4px;
  }

  .multiselect-option {
    border-radius: var(--radius-md);
    margin-bottom: 3px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .multiselect-dropdown {
    bottom: -8px;
  }

  .multiselect-tag {
    border: 1px solid var(--color-border);
  }

  .multiselect {
    box-shadow: 0 1px 2px 0 --alpha(var(--color-black) / 5%);
  }
</style>
