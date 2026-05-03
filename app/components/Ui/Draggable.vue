<template>
  <VueDraggable v-bind="fwd">
    <template #item="elProps">
      <Slot>
        <slot name="item" v-bind="elProps" />
      </Slot>
    </template>
    <template #header>
      <Slot>
        <slot name="header" />
      </Slot>
    </template>
    <template #footer>
      <Slot>
        <slot name="footer" />
      </Slot>
    </template>
  </VueDraggable>
</template>

<script lang="ts">
  import { Slot, useForwardPropsEmits } from "reka-ui";
  import * as VueDraggable from "vuedraggable";

  /**
   * Interface for the native Sortable.js options. These options control the underlying
   * drag-and-drop behavior.
   */
  export type SortableOptions = {
    /**
     * String or object that defines drag behavior between lists.
     *
     * - When a string is used, it's treated as the group name. Lists with the same group name can
     *   exchange items.
     * - When an object is used, you can define more complex pull/put behaviors.
     *
     * **Types:**
     *
     * - `string`
     * - `{ name: string; pull?: boolean | "clone" | string[]; put?: boolean | string[]; revertClone?:
     *   boolean; };`
     *
     * **Example (string):**
     *
     * ```html
     * <draggable :list="items" :item-key="item => item.id" group="shared-list">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * **Example (object):**
     *
     * ```html
     * <draggable
     *   :list="items"
     *   :item-key="item => item.id"
     *   :group="{ name: 'shared-list', pull: true, put: ['list1', 'list2'] }"
     * >
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * **📌 Note:** The `put` option can be an array of group names, allowing items to be dragged
     * from multiple lists.
     *
     * @default undefined
     */
    group?:
      | string
      | {
          name: string;
          pull?: boolean | "clone" | string[];
          put?: boolean | string[];
          revertClone?: boolean;
        };

    /**
     * Enable sorting within the list.
     *
     * **Type:** `boolean`
     *
     * @default true
     */
    sort?: boolean;

    /**
     * Time in milliseconds before dragging should start.
     *
     * Useful for touch interfaces to allow scrolling.
     *
     * **Default:** `0`
     *
     * @default 0
     */
    delay?: number;

    /**
     * Only apply delay if user is using touch (mobile devices).
     *
     * **Default:** `false`
     *
     * @default false
     */
    delayOnTouchOnly?: boolean;

    /**
     * Number of pixels the pointer should move before cancelling a delayed drag event.
     *
     * **Default:** `0`
     *
     * @default 0
     */
    touchStartThreshold?: number;

    /**
     * Disables the sortable functionality completely.
     *
     * **Default:** `false`
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Used to save and restore the sort order.
     *
     * **Type:** `null | SortableStore`
     *
     * **Default:** `null`
     *
     * **Example**
     *
     * ```js
     * store: {
     *   get: function(sortable) {
     *     var order = localStorage.getItem(sortable.options.group.name);
     *     return order ? order.split('|') : [];
     *   },
     *   set: function(sortable) {
     *     var order = sortable.toArray();
     *     localStorage.setItem(sortable.options.group.name, order.join('|'));
     *   }
     * }
     * ```
     *
     * @default null
     * @type { null | SortableStore }
     */
    store?: SortableStore | null;

    /**
     * Animation speed in milliseconds when items are sorted.
     *
     * Set to 0 to disable animation.
     *
     * **Default:** `150`
     *
     * @default 150
     */
    animation?: number;

    /**
     * CSS easing for the animation.
     *
     * **Example**
     *
     * ```vue
     * <draggable :list="items" :item-key="item => item.id" easing="cubic-bezier(1, 0, 0, 1)">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * **See**: [Easings.net](https://easings.net/) for examples.
     *
     * @see https://easings.net/ for examples
     */
    easing?: string;

    /**
     * CSS selector for the drag handle element within list items.
     *
     * If specified, dragging can only start from this element.
     *
     * **Example**
     *
     * ```html
     * <draggable handle=".item-handle" :list="items" :item-key="item => item.id">
     *   <template #item="{ element }">
     *     <div class="item-handle">{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     */
    handle?: string;

    /**
     * CSS selector for elements that should not trigger drag start.
     *
     * Can also be a function that returns true for elements to be filtered.
     *
     * @example
     *   filter: ".no-drag, input, textarea";
     *
     * @example
     *   filter: function(element, sortable) {
     *   return element.classList.contains('no-drag');
     *   }
     */
    filter?: string | ((element: HTMLElement, sortable: any) => boolean);

    /**
     * Call `event.preventDefault()` when clicking on a filtered element.
     *
     * **Default:** `true`
     *
     * @default true
     */
    preventOnFilter?: boolean;

    /**
     * CSS selector that specifies which items inside the element should be draggable.
     *
     * @example
     *   draggable: ".item";
     */
    draggable?: string;

    /**
     * HTML attribute that is used by the `toArray()` method to get the id of the item.
     *
     * **Default:** `data-id`
     *
     * @default "data-id"
     */
    dataIdAttr?: string;

    /**
     * Class name for the drop placeholder (element that shows where the item will be dropped).
     *
     * **Default:** `sortable-ghost`
     *
     * @default "sortable-ghost"
     */
    ghostClass?: string;

    /**
     * Class name for the chosen item being dragged.
     *
     * **Default:** `sortable-chosen`
     *
     * @default "sortable-chosen"
     */
    chosenClass?: string;

    /**
     * Class name for the cloned DOM Element when using forceFallback.
     *
     * **Default:** `sortable-drag`
     *
     * @default "sortable-drag"
     */
    dragClass?: string;

    /**
     * Threshold of the swap zone (percentage of the target element height or width).
     *
     * 1 is equal to 100% of the element size.
     *
     * **Default:** `1`
     *
     * @default 1
     */
    swapThreshold?: number;

    /**
     * Always uses inverted swap zone if set to true.
     *
     * This is useful for lists with a lot of items and a small swap threshold.
     *
     * **Default:** `false`
     *
     * @default false
     */
    invertSwap?: boolean;

    /**
     * Threshold of the inverted swap zone.
     *
     * By default, will be set to the value of swapThreshold.
     *
     * **Default:** `1`
     *
     * @default 1
     */
    invertedSwapThreshold?: number;

    /**
     * Direction of the Sortable. Can be 'vertical', 'horizontal', or automatically detected.
     *
     * **Default:** `horizontal`
     *
     * @default "horizontal"
     */
    direction?: "vertical" | "horizontal" | "auto";

    /**
     * Ignore the HTML5 DnD behavior and force the fallback to kick in.
     *
     * This is useful for mobile devices and other scenarios where HTML5 DnD may not work.
     *
     * **Default:** `false`
     *
     * @default false
     */
    forceFallback?: boolean;

    /**
     * Class name for the cloned DOM Element when using forceFallback.
     *
     * **Default:** `sortable-fallback`
     *
     * @default "sortable-fallback"
     */
    fallbackClass?: string;

    /**
     * Appends the cloned DOM Element into the Document's Body during drag.
     *
     * **Default:** `false`
     *
     * @default false
     */
    fallbackOnBody?: boolean;

    /**
     * Specify in pixels how far the mouse should move before it's considered a drag.
     *
     * **Default:** `0`
     *
     * @default 0
     */
    fallbackTolerance?: number;

    /**
     * Whether dragover event bubbles to parent sortable.
     *
     * **Default:** `false`
     *
     * @default false
     */
    dragoverBubble?: boolean;

    /**
     * Remove the clone element when it is not showing, rather than just hiding it.
     *
     * **Default:** `true`
     *
     * @default true
     */
    removeCloneOnHide?: boolean;

    /**
     * Distance in pixels from empty sortable must be from mouse to insert drag element into it.
     *
     * **Default:** `5`
     *
     * @default 5
     */
    emptyInsertThreshold?: number;
  };

  /**
   * Props passed to the item slot in the Draggable component. These props provide access to both
   * the data element and its index in the list.
   *
   * @template T The type of the element in the list.
   */
  export type DraggableItemSlotProps<T = any> = {
    /**
     * The index of the item in the list.
     *
     * Useful for adding keys or tracking the position in the array.
     */
    index: number;

    /**
     * The underlying data model of the item.
     *
     * This is the actual item from your array that you can display in the template.
     */
    element: T;
  };

  /**
   * Slot definition for Vue's defineSlots macro, defining the available slots in the Draggable
   * component.
   *
   * @template T The type of the elements in the list.
   */
  export type DraggableItemSlot<T = any> = {
    /**
     * The main slot for rendering each item in the list. This slot should be used to display items
     * of the list. It receives the element value and its index as slot props.
     *
     * **Type Breakdown**
     *
     * - `element`: The actual item from the list, which will be the type of the list passed in.
     * - `index`: The index of the item in the list, useful for tracking position.
     *
     * **Example**
     *
     * ```html
     * <draggable v-model="items" :item-key="item => item.id">
     *   <template #item="{ element, index }">
     *     <div>{{ index + 1 }}. {{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     */
    item(props: DraggableItemSlotProps<T>): any;

    /**
     * Optional slot that renders content at the beginning of the list. Useful for adding headers,
     * titles, or instructions above the draggable items.
     *
     * **Example**
     *
     * ```html
     * <draggable v-model="items" :item-key="item => item.id">
     *   <template #header>
     *     <div class="list-header">Drag items below to reorder</div>
     *   </template>
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     */
    header?(): any;

    /**
     * Optional slot that renders content at the end of the list. Useful for adding footers,
     * summaries, or action buttons below the draggable items.
     *
     * **Example**
     *
     * ```html
     * <draggable v-model="items" :item-key="item => item.id">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     *   <template #footer>
     *     <div class="list-footer">{{ items.length }} items in the list</div>
     *   </template>
     * </draggable>
     * ```
     */
    footer?(): any;
  };

  /**
   * Interface for the Sortable.js store option. The store allows persisting and retrieving the
   * order of elements.
   */
  export type SortableStore = {
    /**
     * Get the order of elements. Called once during initialization. Should return an array of
     * string IDs in the desired order.
     *
     * @example
     *   // Using localStorage to retrieve saved order
     *   get: function(sortable) {
     *   var order = localStorage.getItem(sortable.options.group.name);
     *   return order ? order.split('|') : [];
     *   }
     *
     * @param sortable - The Sortable instance.
     *
     * @returns An array of element IDs
     */
    get(sortable: any): string[];

    /**
     * Save the order of elements. Called when the sorting operation ends (onEnd).
     *
     * @example
     *   // Using localStorage to save the order
     *   set: function(sortable) {
     *   var order = sortable.toArray();
     *   localStorage.setItem(sortable.options.group.name, order.join('|'));
     *   }
     *
     * @param sortable - The Sortable instance.
     */
    set(sortable: any): void;
  };

  export type DraggableProps<T = any> = {
    /**
     * An alternative to the `modelValue` prop, `list` is an array that is synchronized with
     * drag-and-drop operations.
     *
     * The main difference is that the `list` prop is updated directly by the draggable component
     * using the `splice` method, whereas `modelValue` is immutable and requires two-way binding via
     * `v-model`.
     *
     * **🚨 Important:** Do not use the `list` prop in conjunction with the `modelValue` prop.
     *
     * **Type:** `T[] | null | undefined`
     *
     * **Default:** `undefined`
     *
     * **Example:**
     *
     * ```html
     * <draggable :list="items" :item-key="item => item.id">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * @type { T[] | null | undefined }
     */
    list?: T[] | null;
    /**
     * The array bound to the draggable component. Typically, this is the same array used in the
     * `v-for` directive of its child elements.
     *
     * This is the recommended way to use Vue Draggable, as it ensures compatibility with state
     * management tools.
     *
     * **🚨 Important:** This prop should not be modified directly. Instead, use the `v-model`
     * directive for two-way binding.
     *
     * **🚨 Important:** Do not use this prop along with the `list` prop.
     *
     * **Type:** `T[] | null | undefined`
     *
     * **Default:** `undefined`
     *
     * **Example:**
     *
     * ```html
     * <draggable v-model="items" :item-key="item => item.id">
     *   <template #item="{ element }">
     *     <div>{{ item.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * @type { T[] | null | undefined }
     */
    modelValue?: T[] | null;
    /**
     * The property or function used to uniquely identify each element in the list.
     *
     * This can either be:
     *
     * - A string representing the property name of the element to be used as the key.
     * - A function that receives an element from the list and returns its unique key.
     *
     * **Type:** `((item: T) => string) | keyof T`
     *
     * **Default:** `undefined`
     *
     * **Example (using a property):**
     *
     * ```html
     * <draggable v-model="items" item-key="id">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * **Example (using a function):**
     *
     * ```html
     * <draggable v-model="items" :item-key="item => `${item.type}-${item.id}`">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * @type { ((item: T) => string) | keyof T }
     */
    itemKey: ((item: T) => string) | keyof T;
    /**
     * A function called on the source component to clone an element when the `clone` option is
     * enabled.
     *
     * The function receives the `viewModel` element to be cloned as its only argument and should
     * return the cloned version of the element.
     *
     * By default, Vue Draggable reuses the `viewModel` element. Use this hook if you need to create
     * a new instance of the element or perform a deep clone.
     *
     * **Type:** `((original: T) => any) | undefined`
     *
     * **Default:** `null`
     *
     * **Example:**
     *
     * ```html
     * <draggable
     *   v-model="items"
     *   :item-key="item => item.id"
     *   :clone="original => ({ ...original, id: Date.now() })"
     * >
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * @default null
     * @type { ((original: T) => any) | undefined }
     */
    clone?: (original: T) => any;
    /**
     * The HTML tag or Vue component to be used as the outer element for the draggable component.
     *
     * If a string is provided, it specifies the HTML node type (e.g., `div`, `ul`, `li`).
     * Alternatively, you can pass the name of a Vue component. In this case, the `draggable`
     * attribute will be passed to the created component.
     *
     * To set additional props or events on the created component, use the `componentData` prop.
     *
     * **Type:** `string | undefined`
     *
     * **Default:** `div`
     *
     * **Example (using an HTML tag):**
     *
     * ```html
     * <draggable tag="ul" v-model="items" :item-key="item => item.id">
     *   <template #item="{ element }">
     *     <li>{{ element.name }}</li>
     *   </template>
     * </draggable>
     * ```
     *
     * **Example (using a Vue component):**
     *
     * ```html
     * <draggable
     *   tag="CustomComponent"
     *   v-model="items"
     *   :item-key="item => item.id"
     *   :component-data="{ someProp: true }"
     * >
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     * ```
     *
     * @default "div"
     * @type { string | undefined }
     */
    tag?: string;
    /**
     * A function that is called during the drag operation, similar to Sortable's `onMove` callback.
     *
     * Returning `false` from this function will cancel the drag operation.
     *
     * **Additional Properties in `evt`:**
     *
     * - `draggedContext`: Context of the dragged element.
     *
     *   - `index`: Index of the dragged element.
     *   - `element`: The underlying view model of the dragged element.
     * - `futureIndex`: The potential index of the dragged element if dropped.
     * - `relatedContext`: Context of the target element.
     *
     *   - `index`: Index of the target element.
     *   - `element`: The underlying view model of the target element.
     *   - `list`: The target list.
     *   - `component`: The target Vue component.
     *
     * **Type:** `((event: MoveEvent<T>, originalEvent: Event) => boolean | null | undefined)`
     *
     * **Default:** `null`
     *
     * **Example:**
     *
     * ```html
     * <draggable :list="list" :move="checkMove">
     *   <template #item="{ element }">
     *     <div>{{ element.name }}</div>
     *   </template>
     * </draggable>
     *
     * <script setup>
     *   checkMove(evt) {
     *    return evt.draggedContext.element.name !== 'apple'; // Prevent dragging 'apple'
     *   }
     * <\/script>
     * ```
     *
     * @default null
     * @type { (event: MoveEvent<T>, originalEvent: Event) => boolean | null | undefined }
     */
    move?: (event: MoveEvent<T>, originalEvent: Event) => boolean | null;
    /**
     * An object used to pass additional attributes, props, and events to the child component
     * specified by the `tag` prop.
     *
     * This prop is useful when the `tag` prop specifies a Vue component, allowing you to configure
     * the component with custom props or event listeners.
     *
     * **Type:** `Record<string, any> | null`
     *
     * **Default:** `null`
     *
     * **Example (using Element UI library):**
     *
     * ```html
     * <template>
     *   <draggable
     *     tag="el-collapse"
     *     :list="list"
     *     :component-data="getComponentData()"
     *     item-key="name"
     *   >
     *     <template #item="{ element }">
     *       <el-collapse-item :title="element.title" :name="element.name">
     *         <div>{{ element.description }}</div>
     *       </el-collapse-item>
     *     </template>
     *   </draggable>
     * </template>
     *
     * <script setup>
     * import { ref } from 'vue';
     *
     * const activeNames = ref([]);
     *
     * const handleChange = () => {
     *   console.log('changed');
     * };
     *
     * const inputChanged = (value) => {
     *   activeNames.value = value;
     * };
     *
     * const getComponentData = () => {
     *   return {
     *     onChange: handleChange,
     *     onInput: inputChanged,
     *     wrap: true,
     *     value: activeNames.value
     *   };
     * };
     * <\/script>
     * ```
     *
     * @default null
     * @type { Record<string, any> | null | undefined }
     */
    componentData?: Record<string, any> | null;
  };

  /**
   * Interface for the event object passed to the move function. Combines Sortable's onMove event
   * properties with Vue Draggable's additional context properties.
   */
  export interface MoveEvent<T = any> {
    // Sortable onMove properties
    /** The target container element where the dragged item would be inserted. */
    to: HTMLElement;

    /** The source container element where the dragged item originated from. */
    from: HTMLElement;

    /** The HTML element being dragged. */
    dragged: HTMLElement;

    /** The DOMRect object representing dimensions and position of the dragged element. */
    draggedRect: DOMRect;

    /** The HTML element that the dragged element would be inserted near. */
    related: HTMLElement;

    /** The DOMRect object representing dimensions and position of the related element. */
    relatedRect: DOMRect;

    /**
     * Indicates whether the dragged element will be inserted after (true) or before (false) the
     * related element.
     */
    willInsertAfter: boolean;

    // Vue Draggable additional properties
    /** Context information about the dragged element. */
    draggedContext: {
      /** The original index of the dragged element in its source list. */
      index: number;

      /** The underlying data model of the dragged element. */
      element: T;

      /** The potential index where the dragged element would be inserted if dropped. */
      futureIndex: number;

      /** Additional properties that might be available. */
      [key: string]: any;
    };

    /** Context information about the related target element and its container. */
    relatedContext: {
      /** The index of the target element in its list. */
      index: number;

      /** The underlying data model of the target element. */
      element: T;

      /** The target list array where the dragged element would be inserted. */
      list: T[];

      /** The Vue component instance of the target container. */
      component: any;

      /** Additional properties that might be available. */
      [key: string]: any;
    };

    /** Additional properties that might be available in the event object. */
    [key: string]: any;
  }

  /** Event object from Sortable.js operations. */
  export interface SortableEvent {
    /** The dragged element. */
    item: HTMLElement;
    /** Target list (HTMLElement) */
    to?: HTMLElement;
    /** Source list (HTMLElement) */
    from?: HTMLElement;
    /** Element's original index within old parent. */
    oldIndex?: number;
    /** Element's new index within new parent. */
    newIndex?: number;
    /** Element's old index within old parent, only counting draggable elements. */
    oldDraggableIndex?: number;
    /** Element's new index within new parent, only counting draggable elements. */
    newDraggableIndex?: number;
    /** The clone element if cloning happened during drag. */
    clone?: HTMLElement;
    /** When item moved from another list: "clone" if cloning, true if moving. */
    pullMode?: "clone" | boolean;
    /** Any additional properties from the event. */
    [key: string]: any;
  }

  /** Type definition for all events emitted by the Draggable component. */
  export type DraggableEmits<T = any> = {
    /**
     * This event is triggered when the user starts dragging an item.
     *
     * This event is triggered when the user starts dragging an item.
     */
    (e: "start", event: SortableEvent): void;

    /** Emitted when an element is added to the list from another list. */
    (e: "add", event: SortableEvent): void;

    /** Emitted when an element is removed from the list into another list. */
    (e: "remove", event: SortableEvent): void;

    /** Emitted when the order of an element changes within its list. */
    (e: "update", event: SortableEvent): void;

    /** Emitted when dragging ends. */
    (e: "end", event: SortableEvent): void;

    /** Emitted when an element is selected for dragging. */
    (e: "choose", event: Pick<SortableEvent, "item" | "oldIndex">): void;

    /** Emitted when an element is deselected for dragging. */
    (e: "unchoose", event: SortableEvent): void;

    /** Emitted when any change to the list happens (add/update/remove) */
    (e: "sort", event: SortableEvent): void;

    /** Emitted when attempting to drag a filtered element. */
    (e: "filter", event: Pick<SortableEvent, "item">): void;

    /** Emitted when creating a clone of an element. */
    (e: "clone", event: SortableEvent & { origEl: HTMLElement; cloneEl: HTMLElement }): void;

    /**
     * Emitted when the list changes due to drag-and-drop operations.
     *
     * Contains information about what elements were added, removed, or moved.
     *
     * This event is only triggered when using the `list` prop (not with v-model).
     */
    (e: "change", event: ChangeEvent<T>): void;

    /** Emitted to update the v-model when the list changes. */
    (e: "update:modelValue", newValue: any[]): void;
  };

  /**
   * Event payload for the change event, which is triggered when list prop is altered due to
   * drag-and-drop operations.
   */
  export interface ChangeEvent<T = any> {
    /** Contains information of an element added to the array. */
    added?: {
      /** The index where the element was added. */
      newIndex: number;
      /** The element that was added. */
      element: T;
    };

    /** Contains information of an element removed from the array. */
    removed?: {
      /** The index where the element was before removal. */
      oldIndex: number;
      /** The element that was removed. */
      element: T;
    };

    /** Contains information of an element moved within the array. */
    moved?: {
      /** The new index of the moved element. */
      newIndex: number;
      /** The previous index of the moved element. */
      oldIndex: number;
      /** The element that was moved. */
      element: T;
    };
  }
</script>

<script lang="ts" setup generic="T = any">
  defineSlots<DraggableItemSlot<T>>();
  const emits = defineEmits<DraggableEmits<T>>();
  const props = withDefaults(defineProps<DraggableProps<T> & SortableOptions>(), {
    animation: 150,
    chosenClass: "sortable-chosen",
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    disabled: false,
    dragClass: "sortable-drag",
    dragoverBubble: false,
    emptyInsertThreshold: 5,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    forceFallback: false,
    ghostClass: "sortable-ghost",
    invertedSwapThreshold: 1,
    invertSwap: false,
    preventOnFilter: true,
    removeCloneOnHide: true,
    sort: true,
    swapThreshold: 1,
    tag: "div",
    touchStartThreshold: 0,
  });

  if (!props.itemKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Draggable] You must provide a itemKey prop to the Draggable component",
    });
  }
  if (!props.list && !props.modelValue) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "[Draggable] You must provide a list or modelValue prop to the Draggable component",
    });
  }

  const fwd = useForwardPropsEmits(props, emits);
</script>
