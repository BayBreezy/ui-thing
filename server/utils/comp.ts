export default [
  {
    name: "Accordion",
    value: "accordion",
    files: [
      {
        fileName: "Accordion/Accordion.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AccordionRoot v-slot="rootSlotProps" data-slot="accordion" v-bind="forwarded">\n    <slot v-bind="rootSlotProps" :items="items">\n      <template v-for="(item, i) in items" :key="i">\n        <UiAccordionItem v-slot="itemSlotProps" :disabled="item.disabled" :value="item.value">\n          <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="header">\n            <UiAccordionHeader>\n              <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="trigger">\n                <UiAccordionTrigger :title="item.title" :icon="item.icon" />\n              </slot>\n            </UiAccordionHeader>\n          </slot>\n          <slot name="content" v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }">\n            <UiAccordionContent :content="item.content" />\n          </slot>\n        </UiAccordionItem>\n      </template>\n    </slot>\n  </AccordionRoot>\n</template>\n\n<script lang="ts">\n  import { AccordionRoot, useForwardPropsEmits } from "reka-ui";\n  import type { AccordionRootEmits, AccordionRootProps } from "reka-ui";\n\n  /**\n   * Interface that represents a single item in the accordion\n   */\n  export interface AccordionItem {\n    title?: string;\n    content?: string;\n    value: string;\n    disabled?: boolean;\n    icon?: string;\n    [key: string]: any;\n  }\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<\n      AccordionRootProps & {\n        items?: AccordionItem[];\n      }\n    >(),\n    { type: "single", collapsible: true, items: () => [] }\n  );\n\n  const emits = defineEmits<AccordionRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "items"), emits);\n</script>\n',
      },
      {
        fileName: "Accordion/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AccordionContent\n    data-slot="accordion-content"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <div class="pt-0 pb-4">\n      <slot>{{ content }}</slot>\n    </div>\n  </AccordionContent>\n</template>\n\n<script lang="ts"></script>\n\n<script lang="ts" setup>\n  import { AccordionContent } from "reka-ui";\n  import type { AccordionContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AccordionContentProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The content of the accordion */\n      content?: any;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class", "content");\n\n  const styles = tv({\n    base: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",\n  });\n</script>\n',
      },
      {
        fileName: "Accordion/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AccordionHeader\n    data-slot="accordion-header"\n    v-bind="forwarded"\n    :class="accordionHeaderStyle({ class: props.class })"\n  >\n    <slot />\n  </AccordionHeader>\n</template>\n\n<script lang="ts">\n  import { AccordionHeader } from "reka-ui";\n  import type { AccordionHeaderProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const accordionHeaderStyle = tv({ base: "flex" });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<\n    AccordionHeaderProps & {\n      /**\n       * Custom class to apply to the component\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n</script>\n',
      },
      {
        fileName: "Accordion/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AccordionItem\n    v-slot="slotProps"\n    data-slot="accordion-item"\n    v-bind="forwarded"\n    :class="accordionItemStyle({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </AccordionItem>\n</template>\n\n<script lang="ts">\n  import { AccordionItem } from "reka-ui";\n  import type { AccordionItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const accordionItemStyle = tv({ base: "border-b last:border-b-0" });\n</script>\n\n<script setup lang="ts">\n  const props = defineProps<\n    AccordionItemProps & {\n      /**\n       * Custom class to apply to the component\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n</script>\n',
      },
      {
        fileName: "Accordion/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AccordionTrigger\n    data-slot="accordion-trigger"\n    v-bind="forwarded"\n    :class="accordionTriggerStyle({ class: props.class })"\n  >\n    <slot :props="props">\n      {{ title }}\n    </slot>\n    <slot name="icon" :props="props">\n      <Icon\n        v-if="icon"\n        data-slot="accordion-trigger-icon"\n        mode="svg"\n        :name="icon"\n        class="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200"\n      />\n    </slot>\n  </AccordionTrigger>\n</template>\n\n<script lang="ts">\n  import { AccordionTrigger } from "reka-ui";\n  import type { AccordionTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const accordionTriggerStyle = tv({\n    base: "flex w-full flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<\n      AccordionTriggerProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The title of the accordion trigger */\n        title?: string;\n        /** The icon to show next to the title */\n        icon?: string;\n      }\n    >(),\n    {\n      class: undefined,\n      title: "",\n      icon: "lucide:chevron-down",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "icon", "title");\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert",
    value: "alert",
    files: [
      {
        fileName: "Alert/Alert.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    v-if="shown"\n    data-slot="alert"\n    :class="alertStyles().base({ variant, filled, class: props.class })"\n  >\n    <slot :props="props" name="icon">\n      <Icon\n        v-if="icon"\n        data-slot="alert-icon"\n        :name="icon"\n        :class="alertStyles().icon({ variant, filled, class: props.iconClass })"\n      />\n    </slot>\n    <div data-slot="alert-content" :class="alertStyles().content({ variant, filled })">\n      <slot :props="props">\n        <slot name="title">\n          <UiAlertTitle v-if="title" :title="title" />\n        </slot>\n        <slot name="description">\n          <UiAlertDescription v-if="description" :description="description" />\n        </slot>\n      </slot>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export type AlertProps = {\n    /** Custom class to add to the `Alert` parent */\n    class?: HTMLAttributes["class"];\n    /** Classes to add to the icon */\n    iconClass?: HTMLAttributes["class"];\n    /** Whether the alert should have a filled/colored background */\n    filled?: boolean;\n    /**\n     * Whether or not the `Alert` is shown.\n     * @default true\n     */\n    modelValue?: boolean;\n    /** The variant of the `Alert` */\n    variant?: VariantProps<typeof alertStyles>["variant"];\n    /** The title that is passed to the `AlertTitle` component */\n    title?: string;\n    /** The description that is passed to the `AlertDescription` component */\n    description?: string;\n    /** The icon that should be displayed*/\n    icon?: string;\n  };\n\n  export const alertStyles = tv({\n    slots: {\n      base: "relative flex w-full gap-3 rounded-lg border p-4",\n      icon: "size-4 shrink-0",\n      content: "grow",\n    },\n    variants: {\n      variant: {\n        default: {\n          base: "bg-background text-foreground shadow-xs",\n          icon: "text-foreground",\n        },\n        destructive: {\n          base: "border-destructive/50 text-destructive dark:border-destructive",\n          icon: "text-destructive",\n        },\n        info: {\n          base: "border-blue-500/50 text-blue-600",\n          icon: "text-blue-600",\n        },\n        success: {\n          base: "border-emerald-500/50 text-emerald-600",\n          icon: "text-emerald-500",\n        },\n        warning: {\n          base: "border-amber-500/50 text-amber-600",\n          icon: "text-amber-600",\n        },\n      },\n      filled: {\n        true: {},\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      filled: false,\n    },\n    compoundVariants: [\n      {\n        filled: true,\n        variant: "default",\n        class: { base: "bg-muted/50 text-foreground", icon: "text-foreground" },\n      },\n      {\n        filled: true,\n        variant: "destructive",\n        class: {\n          base: "bg-destructive text-destructive-foreground shadow-xs",\n          icon: "text-destructive-foreground",\n        },\n      },\n      {\n        filled: true,\n        variant: "info",\n        class: { base: "bg-blue-500 text-blue-50 shadow-xs", icon: "text-blue-50" },\n      },\n      {\n        filled: true,\n        variant: "success",\n        class: { base: "bg-emerald-500 text-emerald-50 shadow-xs", icon: "text-emerald-50" },\n      },\n      {\n        filled: true,\n        variant: "warning",\n        class: { base: "bg-amber-500 text-amber-50 shadow-xs", icon: "text-amber-50" },\n      },\n    ],\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<AlertProps>(), {\n    modelValue: true,\n    variant: "default",\n  });\n\n  const shown = defineModel<boolean>({ default: true });\n</script>\n',
      },
      {
        fileName: "Alert/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="alert-description"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ description }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The description text that should be displayed */\n        description?: string;\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "description");\n\n  const styles = tv({\n    base: "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",\n  });\n</script>\n',
      },
      {
        fileName: "Alert/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="alert-title" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The title text that should be displayed */\n        title?: string;\n      }\n    >(),\n    { as: "h5" }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "title");\n\n  const styles = tv({\n    base: "mb-1 line-clamp-1 min-h-4 leading-none font-medium tracking-tight",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert Dialog",
    value: "alert-dialog",
    components: ["button"],
    files: [
      {
        fileName: "AlertDialog/Action.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogAction\n    data-slot="alert-dialog-action"\n    v-bind="forwarded"\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\n  >\n    <slot>{{ text }} </slot>\n  </AlertDialogAction>\n</template>\n\n<script lang="ts" setup>\n  import { buttonStyles } from "~/components/Ui/Button.vue";\n  import { AlertDialogAction } from "reka-ui";\n  import type { AlertDialogActionProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      AlertDialogActionProps & {\n        /** Action to perform when the button is clicked */\n        onClick?: () => void;\n        /** Text to display in the button */\n        text?: string;\n        /** Custom class(es) to add to the button */\n        class?: HTMLAttributes["class"];\n        /** Whether the button is disabled */\n        disabled?: boolean;\n        /** The button\'s visual variant */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n        /** The button\'s visual size */\n        size?: VariantProps<typeof buttonStyles>["size"];\n      }\n    >(),\n    {\n      text: "Continue",\n      variant: "default",\n      size: "default",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "text", "variant", "size");\n</script>\n',
      },
      {
        fileName: "AlertDialog/AlertDialog.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogRoot data-slot="alert-dialog" v-bind="forwarded">\n    <slot>\n      <slot name="trigger">\n        <UiAlertDialogTrigger v-if="triggerText" as-child>\n          <UiButton variant="outline">{{ triggerText }}</UiButton>\n        </UiAlertDialogTrigger>\n      </slot>\n      <slot name="content">\n        <UiAlertDialogContent>\n          <slot name="header">\n            <UiAlertDialogHeader>\n              <slot name="title">\n                <UiAlertDialogTitle v-if="title" :title="title" />\n              </slot>\n              <slot name="description">\n                <UiAlertDialogDescription v-if="description" :description="description" />\n              </slot>\n            </UiAlertDialogHeader>\n          </slot>\n          <slot name="footer">\n            <UiAlertDialogFooter>\n              <slot name="cancel">\n                <UiAlertDialogCancel />\n              </slot>\n              <slot name="action">\n                <UiAlertDialogAction />\n              </slot>\n            </UiAlertDialogFooter>\n          </slot>\n        </UiAlertDialogContent>\n      </slot>\n    </slot>\n  </AlertDialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogRoot, useForwardPropsEmits } from "reka-ui";\n  import type { AlertDialogEmits, AlertDialogProps } from "reka-ui";\n\n  const props = defineProps<\n    AlertDialogProps & {\n      /** Text to display in the trigger button */\n      triggerText?: string;\n      /** Text to be passed to the `AlertDialogTitle` */\n      title?: string;\n      /** Text to be passed to the `AlertDialogDescription` */\n      description?: string;\n    }\n  >();\n\n  const emits = defineEmits<AlertDialogEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "description", "title", "triggerText"),\n    emits\n  );\n</script>\n',
      },
      {
        fileName: "AlertDialog/Cancel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogCancel\n    data-slot="alert-dialog-cancel"\n    v-bind="forwarded"\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\n  >\n    <slot>{{ text }}</slot>\n  </AlertDialogCancel>\n</template>\n\n<script lang="ts" setup>\n  import { buttonStyles } from "~/components/Ui/Button.vue";\n  import { AlertDialogCancel } from "reka-ui";\n  import type { AlertDialogCancelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      AlertDialogCancelProps & {\n        /** Action to perform when the button is clicked */\n        onClick?: () => void;\n        /** Text to display in the button */\n        text?: string;\n        /** Custom class(es) to add to the button */\n        class?: HTMLAttributes["class"];\n        /** Whether the button is disabled */\n        disabled?: boolean;\n        /** The button\'s visual variant */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n        /** The button\'s visual size */\n        size?: VariantProps<typeof buttonStyles>["size"];\n      }\n    >(),\n    {\n      text: "Cancel",\n      variant: "outline",\n      size: "default",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "text", "variant", "size");\n</script>\n',
      },
      {
        fileName: "AlertDialog/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiAlertDialogPortal :to="to">\n    <slot name="overlay">\n      <UiAlertDialogOverlay />\n    </slot>\n    <AlertDialogContent\n      data-slot="alert-dialog-content"\n      :class="styles({ class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot />\n    </AlertDialogContent>\n  </UiAlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogContent, useForwardPropsEmits } from "reka-ui";\n  import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    AlertDialogContentProps & {\n      /** Custom class(es) to add to the `AlertDialogContent` */\n      class?: HTMLAttributes["class"];\n      /** The element to render the portal into */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emit = defineEmits<AlertDialogContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emit);\n\n  const styles = tv({\n    base: "fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogDescription\n    data-slot="alert-dialog-description"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ description }}</slot>\n  </AlertDialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogDescription } from "reka-ui";\n  import type { AlertDialogDescriptionProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AlertDialogDescriptionProps & {\n      /** Text to display in the description */\n      description?: string;\n      /** Custom class(es) to add to the description */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class", "description");\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="alert-dialog-footer"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n      class: undefined,\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="alert-dialog-header"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n      class: undefined,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Overlay.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogOverlay\n    data-slot="alert-dialog-overlay"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogOverlay } from "reka-ui";\n  import type { AlertDialogOverlayProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AlertDialogOverlayProps & {\n      /** Custom class(es) to add to the overlay */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogPortal data-slot="alert-dialog-portal" v-bind="props">\n    <slot />\n  </AlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogPortal } from "reka-ui";\n  import type { AlertDialogPortalProps } from "reka-ui";\n\n  const props = defineProps<AlertDialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "AlertDialog/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogTitle\n    data-slot="alert-dialog-title"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ title }}</slot>\n  </AlertDialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTitle } from "reka-ui";\n  import type { AlertDialogTitleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AlertDialogTitleProps & {\n      /** Text to display in the title */\n      title?: string;\n      /** Custom class(es) to add to the title */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({ base: "text-lg font-semibold" });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AlertDialogTrigger data-slot="alert-dialog-trigger" v-bind="props">\n    <slot />\n  </AlertDialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTrigger } from "reka-ui";\n  import type { AlertDialogTriggerProps } from "reka-ui";\n\n  const props = defineProps<AlertDialogTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Animated Tooltip",
    value: "animated-tooltip",
    files: [
      {
        fileName: "AnimatedTooltip.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    v-for="item in constructedItems"\n    :key="item.id"\n    class="group relative -mr-4"\n    @mouseenter="(e) => handleMouseEnter(e, item.id)"\n    @mouseleave="hoveredIndex = null"\n    @mousemove="handleMouseMove"\n  >\n    <!-- Tooltip -->\n    <Motion\n      v-if="hoveredIndex === item.id"\n      :initial="{\n        opacity: 0,\n        y: 20,\n        scale: 0.6,\n      }"\n      :animate="{\n        opacity: 1,\n        y: 0,\n        scale: 1,\n      }"\n      :transition="{\n        type: \'spring\',\n        stiffness: 260,\n        damping: 10,\n      }"\n      :exit="{\n        opacity: 0,\n        y: 20,\n        scale: 0.6,\n      }"\n      :style="{\n        translateX: `${translation}px`,\n        rotate: `${rotation}deg`,\n      }"\n      class="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs whitespace-nowrap shadow-xl"\n    >\n      <div\n        class="absolute right-1/2 -bottom-px z-30 me-1 h-px w-2/5 translate-x-1/2 bg-linear-to-r from-transparent via-emerald-500 to-transparent"\n      />\n      <div\n        class="absolute -bottom-px left-1/2 z-30 ms-1 h-px w-2/5 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-500 to-transparent"\n      />\n      <div class="relative z-30 text-base font-bold text-white">\n        {{ item.title }}\n      </div>\n      <div v-if="item.description" class="text-xs text-white">{{ item.description }}</div>\n    </Motion>\n\n    <!-- Avatar Image -->\n    <img\n      :src="item.image"\n      :alt="item.title"\n      class="relative !m-0 size-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"\n    />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import { Motion } from "motion-v";\n\n  interface Item {\n    id?: string;\n    title: string;\n    description?: string;\n    image: string;\n  }\n\n  const props = defineProps<{\n    items: Item[];\n  }>();\n\n  // create ids for items\n  const constructedItems = props.items.map((item) => ({\n    ...item,\n    id: item.id || useId(),\n  }));\n\n  const hoveredIndex = ref<string | null>(null);\n  const mouseX = ref<number>(0);\n\n  // Calculate rotation and translation based on mouse position\n  const rotation = computed<number>(() => {\n    const x = mouseX.value;\n    return (x / 100) * 50;\n  });\n\n  const translation = computed<number>(() => {\n    const x = mouseX.value;\n    return (x / 100) * 50;\n  });\n\n  // Handle initial mouse position and hover\n  function handleMouseEnter(event: MouseEvent, itemId: string) {\n    hoveredIndex.value = itemId;\n    // Calculate initial position immediately\n    const rect = (event.target as HTMLElement)?.getBoundingClientRect();\n    const halfWidth = rect.width / 2;\n    mouseX.value = event.clientX - rect.left - halfWidth;\n  }\n\n  // Handle mouse movement\n  function handleMouseMove(event: MouseEvent) {\n    const rect = (event.target as HTMLElement)?.getBoundingClientRect();\n    const halfWidth = rect.width / 2;\n    mouseX.value = event.clientX - rect.left - halfWidth;\n  }\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Apexcharts",
    value: "apexcharts",
    deps: ["apexcharts", "vue3-apexcharts"],
    components: ["card"],
    files: [
      {
        fileName: "Apexchart.client.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <VueApexCharts v-bind="forwarded" ref="chart" />\n</template>\n\n<script lang="ts">\n  import { useForwardPropsEmits } from "reka-ui";\n  import VueApexCharts from "vue3-apexcharts";\n  import type { ApexOptions } from "apexcharts";\n\n  declare global {\n    interface Window {\n      Apex: ApexOptions;\n    }\n  }\n\n  /**\n   * This is the default configuration for ApexCharts, which can be overridden by the `options` prop.\n   *\n   * It sets the default styles, colors, and other properties for the charts.\n   */\n  window.Apex = {\n    chart: {\n      animations: { enabled: true },\n      fontFamily: "var(--font-sans)",\n      foreColor: "var(--color-foreground)",\n      selection: {\n        fill: { color: "var(--color-blue-500)", opacity: 0.1 },\n        stroke: { color: "var(--color-blue-500)", width: 1, opacity: 0.5 },\n      },\n      toolbar: {\n        show: false,\n        tools: {\n          download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"/></svg>`,\n          reset: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5m-5 4a9 9 0 0 0 9 9a9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></g></svg>`,\n          pan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2m0 4V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2m0 4.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g></svg>`,\n          zoom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/></g></svg>`,\n          zoomout: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.35-4.35M8 11h6"/></g></svg>`,\n          zoomin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21l-4.35-4.35M11 8v6m-3-3h6"/></g></svg>`,\n          selection: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033zM5 3a2 2 0 0 0-2 2m16-2a2 2 0 0 1 2 2M5 21a2 2 0 0 1-2-2M9 3h1M9 21h2m3-18h1M3 9v1m18-1v2M3 14v1"/></svg>`,\n        },\n      },\n      zoom: { enabled: false },\n    },\n    stroke: { curve: "smooth", lineCap: "round" },\n    dataLabels: { enabled: false },\n    grid: { borderColor: "var(--color-border)" },\n    legend: {\n      show: false,\n      itemMargin: { horizontal: 8 },\n      markers: { strokeWidth: 0, size: 6, offsetX: -3 },\n    },\n    markers: { strokeWidth: 0 },\n    yaxis: {\n      axisBorder: { color: "var(--color-border)" },\n      axisTicks: { color: "var(--color-border)" },\n      crosshairs: { stroke: { width: 1, color: "var(--color-border)" } },\n      labels: { style: { colors: "var(--color-muted-foreground)", fontSize: "12px" } },\n      title: { style: { color: "var(--color-muted-foreground)", fontSize: "12px" } },\n    },\n    xaxis: {\n      axisBorder: { color: "var(--color-border)" },\n      axisTicks: { color: "var(--color-border)" },\n      crosshairs: { stroke: { width: 1, color: "var(--color-border)" } },\n      labels: {\n        style: { colors: "var(--color-muted-foreground)", fontSize: "12px" },\n        hideOverlappingLabels: true,\n        rotateAlways: false,\n        rotate: 0,\n      },\n      title: { style: { color: "var(--color-muted-foreground)", fontSize: "12px" } },\n    },\n    plotOptions: {\n      radialBar: {\n        track: { background: "var(--color-muted)" },\n        hollow: { size: "30px" },\n      },\n      polarArea: {\n        rings: { strokeColor: "var(--color-border)" },\n        spokes: { connectorColors: "var(--color-border)" },\n      },\n      radar: {\n        polygons: {\n          strokeColors: "var(--color-border)",\n          connectorColors: "var(--color-border)",\n        },\n      },\n    },\n    // Hex values are best. If you need to convert your oklch values, use the `culori` package.\n    colors: ["#93c5fd", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"],\n  };\n\n  export type ApexChartProps = {\n    /**\n     * All the optional configuration of the chart goes in this property\n     *\n     * @default {}\n     */\n    options?: ApexOptions;\n    /**\n     * The chart type\n     *\n     * @default line\n     */\n    type?:\n      | "line"\n      | "area"\n      | "bar"\n      | "histogram"\n      | "pie"\n      | "donut"\n      | "radialBar"\n      | "rangeBar"\n      | "scatter"\n      | "bubble"\n      | "heatmap"\n      | "candlestick"\n      | "radar"\n      | "polarArea"\n      | "treemap";\n    /**\n     * The data which you want to display in the chart\n     *\n     * @default []\n     */\n    series?: ApexOptions["series"];\n    /**\n     * Width of the chart\n     *\n     * @default \'100%\'\n     */\n    width?: string | number;\n    /**\n     * Height of the chart\n     *\n     * @default \'100%\'\n     */\n    height?: string | number;\n  };\n  export type ChartInstanceMethods = {\n    init(): Promise<void>;\n    refresh(): Promise<void>;\n    destroy(): void;\n    updateOptions(\n      options: any,\n      redrawPaths?: boolean,\n      animate?: boolean,\n      updateSyncedCharts?: boolean\n    ): Promise<void>;\n    updateSeries(newSeries: any, animate?: boolean): Promise<void>;\n    toggleSeries(seriesName: string): any;\n    highlightSeries(seriesName: string): any;\n    showSeries(seriesName: string): void;\n    hideSeries(seriesName: string): void;\n    resetSeries(): void;\n    zoomX(min: number, max: number): void;\n    toggleDataPointSelection(seriesIndex: number, dataPointIndex?: number): any;\n    appendData(newData: any): Promise<void>;\n    appendSeries(newSeries: any, animate?: boolean): Promise<void>;\n    addXaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;\n    addYaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;\n    addPointAnnotation(options: any, pushToMemory?: boolean, context?: any): void;\n    removeAnnotation(id: string, options?: any): void;\n    clearAnnotations(): void;\n    dataURI(options?: { scale?: number; width?: number }): Promise<void>;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ApexChartProps>(), {\n    series: () => [],\n    type: "line",\n    width: "100%",\n    height: "100%",\n    options: () => ({}),\n  });\n\n  /**\n   * The ApexCharts instance.\n   *\n   * You can use this to call methods on the chart instance, such as `chart.updateOptions()`, `chart.refresh()`, etc.\n   */\n  const chart = useTemplateRef<ChartInstanceMethods>("chart");\n\n  const emits = defineEmits([\n    "animationEnd",\n    "beforeMount",\n    "mounted",\n    "updated",\n    "click",\n    "mouseMove",\n    "mouseLeave",\n    "legendClick",\n    "markerClick",\n    "selection",\n    "dataPointSelection",\n    "dataPointMouseEnter",\n    "dataPointMouseLeave",\n    "beforeZoom",\n    "beforeResetZoom",\n    "zoomed",\n    "scrolled",\n    "brushScrolled",\n  ]);\n\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  defineExpose({ chart });\n</script>\n\n<style scoped>\n  :deep(.apexcharts-tooltip) {\n    border: 1px solid --alpha(var(--color-border) / 50%) !important;\n    background: var(--color-background) !important;\n    box-shadow: var(--shadow-xl);\n    border-radius: var(--radius-lg) !important;\n\n    .apexcharts-tooltip-title {\n      padding: 8px 12px !important;\n      background: var(--color-popover) !important;\n      border-bottom: 1px solid --alpha(var(--color-border) / 50%) !important;\n      font-weight: var(--font-weight-semibold);\n    }\n  }\n\n  :deep(.apexcharts-xaxistooltip),\n  :deep(.apexcharts-yaxistooltip) {\n    background: var(--color-popover) !important;\n    border: 1px solid var(--color-border) !important;\n    box-shadow: var(--shadow-xl);\n    color: var(--color-popover-foreground) !important;\n    border-radius: var(--radius-md);\n  }\n  :deep(.apexcharts-yaxistooltip-left:before) {\n    border-left-color: var(--color-border) !important;\n  }\n  :deep(.apexcharts-yaxistooltip-left:after) {\n    border-left-color: var(--color-popover) !important;\n  }\n  :deep(.apexcharts-xaxistooltip-bottom:after) {\n    border-bottom-color: var(--color-popover) !important;\n  }\n  :deep(.apexcharts-xaxistooltip-bottom:before) {\n    border-bottom-color: var(--color-border) !important;\n  }\n\n  :deep(.apexcharts-toolbar) {\n    gap: 10px;\n    align-items: center;\n    max-width: fit-content;\n\n    > [class*="icon"] {\n      width: auto;\n      height: auto;\n      transform: scale(1);\n      margin: auto;\n      transition: all 0.2s ease-in-out;\n      color: var(--color-muted-foreground);\n      &:hover {\n        color: var(--color-blue-400);\n      }\n\n      &.apexcharts-selected {\n        color: var(--color-blue-500);\n      }\n\n      svg {\n        fill: var(--color-muted-foreground);\n        width: 16px;\n        height: 16px;\n        transform: scale(1);\n      }\n    }\n\n    .apexcharts-menu {\n      background: var(--color-popover);\n      border: 1px solid --alpha(var(--color-border) / 50%);\n      border-radius: var(--radius-lg);\n      box-shadow: var(--shadow-lg);\n      width: auto;\n      min-width: 110px;\n      text-align: center;\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n\n      .apexcharts-menu-item {\n        color: var(--color-popover-foreground);\n        border-radius: var(--radius-sm);\n        cursor: pointer;\n        padding: 4px;\n        font-size: 12px;\n        font-weight: var(--font-weight-normal);\n        &:hover {\n          background: var(--color-muted);\n        }\n      }\n    }\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Aspect Ratio",
    value: "aspect-ratio",
    files: [
      {
        fileName: "AspectRatio.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AspectRatio v-slot="slotProps" data-slot="aspect-ratio" v-bind="props">\n    <slot v-bind="slotProps" />\n  </AspectRatio>\n</template>\n\n<script lang="ts" setup>\n  import { AspectRatio } from "reka-ui";\n  import type { AspectRatioProps } from "reka-ui";\n\n  const props = defineProps<AspectRatioProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Autocomplete",
    value: "autocomplete",
    files: [
      {
        fileName: "Autocomplete/Anchor.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxAnchor\n    data-slot="autocomplete-anchor"\n    v-bind="props"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ComboboxAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxAnchor } from "reka-ui";\n  import type { ComboboxAnchorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxAnchorProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({\n    base: "flex h-9 w-full items-center rounded-md border border-input bg-background px-3 text-base shadow-xs transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:outline-none dark:bg-input/30",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxArrow\n    data-slot="autocomplete-arrow"\n    v-bind="props"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxArrow } from "reka-ui";\n  import type { ComboboxArrowProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxArrowProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({ base: "fill-muted stroke-border" });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Autocomplete.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxRoot\n    v-slot="slotProps"\n    data-slot="autocomplete"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </ComboboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxRootProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const emits = defineEmits<ComboboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n  const styles = tv({ base: "relative" });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Cancel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxCancel data-slot="autocomplete-cancel" v-bind="props">\n    <slot />\n  </ComboboxCancel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxCancel } from "reka-ui";\n  import type { ComboboxCancelProps } from "reka-ui";\n\n  const props = defineProps<ComboboxCancelProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxContent\n    data-slot="autocomplete-content"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <UiAutocompleteViewport>\n      <slot />\n    </UiAutocompleteViewport>\n  </ComboboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxContent, useForwardPropsEmits } from "reka-ui";\n  import type { ComboboxContentEmits, ComboboxContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ComboboxContentProps & {\n        /** Custom class(es) to add to the content */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      position: "popper",\n      bodyLock: true,\n      side: "bottom",\n      sideOffset: 8,\n      class: undefined,\n    }\n  );\n\n  const emits = defineEmits<ComboboxContentEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "z-50 max-h-[300px] w-(--reka-combobox-trigger-width) min-w-[8rem] overflow-hidden overflow-y-auto rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Empty.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxEmpty data-slot="autocomplete-empty" v-bind="props">\n    <slot />\n  </ComboboxEmpty>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxEmpty } from "reka-ui";\n  import type { ComboboxEmptyProps } from "reka-ui";\n\n  const props = defineProps<ComboboxEmptyProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxGroup data-slot="autocomplete-group" v-bind="props">\n    <slot />\n  </ComboboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxGroup } from "reka-ui";\n  import type { ComboboxGroupProps } from "reka-ui";\n\n  const props = defineProps<ComboboxGroupProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxInput\n    data-slot="autocomplete-input"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxInput, useForwardPropsEmits } from "reka-ui";\n  import type { ComboboxInputEmits, ComboboxInputProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxInputProps & {\n      /** Custom placeholder text for the input */\n      placeholder?: HTMLAttributes["placeholder"];\n      /** Custom class(es) to add to the input */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const emits = defineEmits<ComboboxInputEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "size-full min-w-0 grow rounded bg-transparent selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxItem\n    data-slot="autocomplete-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot name="icon">\n      <span class="absolute inset-y-0 left-2 flex items-center justify-center">\n        <UiAutocompleteItemIndicator\n          class="flex animate-in items-center justify-center fade-in-0 zoom-in-0"\n          :icon="icon"\n        />\n      </span>\n    </slot>\n    <slot />\n  </ComboboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItem, useForwardPropsEmits } from "reka-ui";\n  import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxItemProps & {\n      /** Custom class(es) to add to the item */\n      class?: HTMLAttributes["class"];\n      /** Icon to display in the item indicator */\n      icon?: string;\n    }\n  >();\n\n  const emits = defineEmits<{\n    select: ComboboxItemEmits["select"];\n  }>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none select-none aria-selected:bg-accent aria-selected:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxItemIndicator data-slot="autocomplete-item-indicator" v-bind="props">\n    <slot><Icon :name="icon || \'lucide:check\'" class="size-4" /></slot>\n  </ComboboxItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItemIndicator } from "reka-ui";\n  import type { ComboboxItemIndicatorProps } from "reka-ui";\n\n  const props = defineProps<\n    ComboboxItemIndicatorProps & {\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxLabel\n    data-slot="autocomplete-label"\n    :class="styles({ class: props.class })"\n    v-bind="props"\n  >\n    <slot />\n  </ComboboxLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxLabel } from "reka-ui";\n  import type { ComboboxLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxLabelProps & {\n      /** Custom class(es) to add to the label */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({ base: "px-2 py-1.5 pl-9 text-sm font-medium text-muted-foreground" });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxPortal data-slot="autocomplete-portal" position="popper" v-bind="props">\n    <slot />\n  </ComboboxPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxPortal } from "reka-ui";\n  import type { ComboboxPortalProps } from "reka-ui";\n\n  const props = defineProps<ComboboxPortalProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxSeparator data-slot="autocomplete-separator" v-bind="props">\n    <slot />\n  </ComboboxSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxSeparator } from "reka-ui";\n  import type { ComboboxSeparatorProps } from "reka-ui";\n\n  const props = defineProps<ComboboxSeparatorProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxTrigger\n    data-slot="autocomplete-trigger"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ComboboxTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxTrigger } from "reka-ui";\n  import type { ComboboxTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ComboboxTriggerProps & {\n      /** Custom class(es) to add to the trigger */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({ base: "inline-flex shrink-0 cursor-pointer items-center justify-center" });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Viewport.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ComboboxViewport data-slot="autocomplete-viewport" v-bind="props">\n    <slot />\n  </ComboboxViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxViewport } from "reka-ui";\n  import type { ComboboxViewportProps } from "reka-ui";\n\n  const props = defineProps<ComboboxViewportProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Avatar",
    value: "avatar",
    files: [
      {
        fileName: "Avatar/Avatar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AvatarRoot\n    data-slot="avatar"\n    :as="as"\n    :as-child="asChild"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <slot name="image">\n        <UiAvatarImage\n          v-if="src"\n          :src="src"\n          :alt="alt"\n          :class="imageClass"\n          @loading-status-change="emits(\'loadingStatusChange\', $event)"\n        />\n      </slot>\n      <slot name="fallback">\n        <UiAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />\n      </slot>\n    </slot>\n  </AvatarRoot>\n</template>\n\n<script lang="ts" setup>\n  import { AvatarRoot } from "reka-ui";\n  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AvatarRootProps &\n      Partial<AvatarImageProps> & {\n        /**\n         * Class to add to the root element\n         */\n        class?: HTMLAttributes["class"];\n        /**\n         * Class to pass to the image element\n         */\n        imageClass?: HTMLAttributes["class"];\n        /**\n         * Class to pass to the fallback element\n         */\n        fallbackClass?: HTMLAttributes["class"];\n        /**\n         * The `alt` attribute value for the image\n         */\n        alt?: string;\n        /**\n         * The fallback text to display when the image fails to load\n         */\n        fallback?: string;\n        /**\n         * Useful for delaying rendering so it only appears for those with slower connections.\n         */\n        delayMs?: number;\n      }\n  >();\n\n  const emits = defineEmits<AvatarImageEmits>();\n  const styles = tv({\n    base: "relative flex size-8 shrink-0 overflow-hidden rounded-full",\n  });\n</script>\n',
      },
      {
        fileName: "Avatar/Fallback.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AvatarFallback\n    data-slot="avatar-fallback"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>\n      {{ fallback }}\n    </slot>\n  </AvatarFallback>\n</template>\n\n<script lang="ts" setup>\n  import { AvatarFallback } from "reka-ui";\n  import type { AvatarFallbackProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AvatarFallbackProps & {\n      /** The text to display inside the avatar */\n      fallback?: string;\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "fallback");\n  const styles = tv({\n    base: "flex size-full items-center justify-center rounded-full bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Avatar/Image.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AvatarImage\n    data-slot="avatar-image"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { AvatarImage, useForwardPropsEmits } from "reka-ui";\n  import type { AvatarImageEmits, AvatarImageProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    AvatarImageProps & {\n      /** The alt text for the image */\n      alt?: string;\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const emits = defineEmits<AvatarImageEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "aspect-square size-full object-cover",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Badge",
    value: "badge",
    files: [
      {
        fileName: "Badge.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <component\n    :is="elementType"\n    :class="badgeVariants({ disabled, size, variant, class: props.class })"\n    v-bind="forwarded"\n    @click="onClick"\n  >\n    <slot />\n  </component>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { useForwardProps } from "reka-ui";\n  import type { NuxtLinkProps } from "#app/components";\n  import type { HTMLAttributes } from "vue";\n</script>\n\n<script lang="ts" setup>\n  const badgeVariants = tv({\n    base: "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",\n    variants: {\n      variant: {\n        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",\n        secondary:\n          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",\n        destructive:\n          "border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",\n        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",\n        success:\n          "border-transparent bg-green-500 text-white focus-visible:ring-green-500/20 dark:bg-green-500/60 dark:focus-visible:ring-green-500/40 [a&]:hover:bg-green-600",\n        warning:\n          "border-transparent bg-yellow-500 text-white focus-visible:ring-yellow-500/20 dark:bg-yellow-500/60 dark:focus-visible:ring-yellow-500/40 [a&]:hover:bg-yellow-600",\n        info: "border-transparent bg-blue-500 text-white focus-visible:ring-blue-500/20 dark:bg-blue-500/60 dark:focus-visible:ring-blue-500/40 [a&]:hover:bg-blue-600",\n        ghost: "border-transparent bg-transparent text-foreground [a&]:hover:bg-accent/50",\n        error:\n          "border-transparent bg-red-500 text-white focus-visible:ring-red-500/20 dark:bg-red-500/60 dark:focus-visible:ring-red-500/40 [a&]:hover:bg-red-600",\n      },\n      disabled: {\n        true: "cursor-not-allowed opacity-50",\n      },\n      size: {\n        sm: "px-2 py-0.5 text-xs font-medium",\n        md: "px-2.5 py-[3px] text-sm font-medium",\n        lg: "px-2.5 py-1 text-sm font-semibold",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      disabled: false,\n      size: "sm",\n    },\n  });\n\n  type BadgeProps = VariantProps<typeof badgeVariants>;\n\n  const props = defineProps<\n    NuxtLinkProps & {\n      /** Any additional class that should be added to the badge */\n      class?: HTMLAttributes["class"];\n      /** The variant of the badge */\n      variant?: BadgeProps["variant"];\n      /** The size of the badge */\n      size?: BadgeProps["size"];\n      /** The action to perform when the badge is clicked */\n      onClick?: () => void;\n      /** Should the badge be disabled or not */\n      disabled?: boolean;\n      /** The element to render the badge as */\n      tag?: string;\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class", "variant", "onClick", "disabled"));\n\n  const elementType = computed(() => {\n    if (props.tag) return props.tag;\n    if (props.href || props.to) return resolveComponent("NuxtLink");\n    if (props.onClick) return "button";\n    return props.tag || "div";\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Border Beam",
    value: "border-beam",
    files: [
      {
        fileName: "BorderBeam.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    class="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"\n  >\n    <motion.div\n      :class="styles({ class: props.class })"\n      :style="\n        {\n          width: `${size}px`,\n          offsetPath: `rect(0 auto auto 0 round ${size}px)`,\n          \'--color-from\': colorFrom,\n          \'--color-to\': colorTo,\n          ...style,\n        } as MotionStyle\n      "\n      :initial="{ offsetDistance: `${initialOffset}%` }"\n      :animate="{\n        offsetDistance: reverse\n          ? [`${100 - initialOffset}%`, `${-initialOffset}%`]\n          : [`${initialOffset}%`, `${100 + initialOffset}%`],\n      }"\n      :transition="{\n        repeat: Infinity,\n        ease: \'linear\',\n        duration,\n        delay: -delay,\n        ...transition,\n      }"\n    />\n  </div>\n</template>\n\n<script lang="ts">\n  import { motion } from "motion-v";\n  import type { MotionStyle, Transition } from "motion-v";\n  import type { CSSProperties, HTMLAttributes } from "vue";\n\n  interface BorderBeamProps {\n    /**\n     * The size of the border beam.\n     */\n    size?: number;\n    /**\n     * The duration of the border beam.\n     */\n    duration?: number;\n    /**\n     * The delay of the border beam.\n     */\n    delay?: number;\n    /**\n     * The color of the border beam from.\n     */\n    colorFrom?: string;\n    /**\n     * The color of the border beam to.\n     */\n    colorTo?: string;\n    /**\n     * The motion transition of the border beam.\n     */\n    transition?: Transition;\n    /**\n     * The class name of the border beam.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The style of the border beam.\n     */\n    style?: CSSProperties;\n    /**\n     * Whether to reverse the animation direction.\n     */\n    reverse?: boolean;\n    /**\n     * The initial offset position (0-100).\n     */\n    initialOffset?: number;\n  }\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<BorderBeamProps>(), {\n    size: 50,\n    delay: 0,\n    duration: 6,\n    colorFrom: "#ffaa40",\n    colorTo: "#9c40ff",\n    reverse: false,\n    initialOffset: 0,\n  });\n\n  const styles = tv({\n    base: "absolute aspect-square bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Breadcrumbs",
    value: "breadcrumbs",
    files: [
      {
        fileName: "Breadcrumbs.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <nav data-slot="breadcrumb" aria-label="breadcrumb" :class="styles({ class: props.class })">\n    <template v-for="(item, i) in items" :key="i">\n      <slot :name="item.slot || \'default\'">\n        <div data-slot="breadcrumb-item" class="flex items-center gap-3">\n          <div class="group flex items-center gap-2">\n            <slot name="crumbIcon" :item="item" :index="i">\n              <Icon\n                v-if="item.icon"\n                data-slot="breadcrumb-icon"\n                :name="item.icon"\n                class="size-3.5 shrink-0"\n                :class="[\n                  isNotLastItem(i)\n                    ? \'text-muted-foreground group-hover:text-foreground\'\n                    : \'text-primary\',\n                ]"\n              />\n            </slot>\n            <slot :item="item" :is-not-last-item="isNotLastItem" :index="i" name="link">\n              <NuxtLink\n                v-if="item.label"\n                :to="!item?.disabled ? item.link : \'\'"\n                data-slot="breadcrumb-label"\n                :class="[\n                  item.link && !item.disabled && \'underline-offset-2 group-hover:underline\',\n                  isNotLastItem(i)\n                    ? \'text-muted-foreground group-hover:text-foreground\'\n                    : \'font-medium text-primary\',\n                ]"\n                class="text-sm text-foreground transition-colors"\n                @click="item?.click?.()"\n                >{{ item.label }}</NuxtLink\n              >\n            </slot>\n          </div>\n        </div>\n      </slot>\n      <slot name="separator" :item="item" :index="i">\n        <Icon\n          v-if="isNotLastItem(i)"\n          data-slot="breadcrumb-separator"\n          :name="separator"\n          class="h-3 w-3 text-muted-foreground"\n        />\n      </slot>\n    </template>\n  </nav>\n</template>\n\n<script lang="ts"></script>\n\n<script setup lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export interface BreadcrumbItem {\n    label?: string;\n    icon?: string;\n    link?: string;\n    disabled?: boolean;\n    slot?: string;\n    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type\n    click?: Function;\n  }\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The items to display in the breadcrumbs.\n       */\n      items?: BreadcrumbItem[];\n      /**\n       * The separator to use between each breadcrumb.\n       */\n      separator?: string;\n      /**\n       * Custom class(es) to add to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      separator: "lucide:chevron-right",\n      items: () => [],\n    }\n  );\n\n  /**\n   * Detects if the current item is not the last item in the breadcrumbs.\n   * @param index - The index of the current item.\n   */\n  const isNotLastItem = (index: number) => {\n    return index !== props?.items?.length - 1;\n  };\n\n  const styles = tv({\n    base: "flex w-full flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Button",
    value: "button",
    files: [
      {
        fileName: "Button.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <component\n    :is="elementType"\n    :class="\n      buttonStyles({\n        hasIcon: !!icon,\n        disabled: disabled || loading,\n        variant: variant,\n        size: size,\n        class: props.class,\n        effect: props.effect,\n      })\n    "\n    :disabled="disabled || loading"\n    v-bind="forwarded"\n  >\n    <slot name="iconLeft">\n      <div\n        v-if="icon && iconPlacement == \'left\'"\n        class="flex w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-[0%] group-hover:pr-2 group-hover:opacity-100"\n      >\n        <Icon :name="icon" class="size-4" />\n      </div>\n    </slot>\n    <slot name="loading">\n      <Icon v-if="loading" class="size-4 shrink-0" :name="loadingIcon" />\n    </slot>\n    <slot>\n      <span v-if="text">{{ text }}</span>\n    </slot>\n    <slot name="iconRight">\n      <div\n        v-if="icon && iconPlacement == \'right\'"\n        class="flex w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100"\n      >\n        <Icon :name="icon" class="size-4" />\n      </div>\n    </slot>\n  </component>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { useForwardProps } from "reka-ui";\n  import type { NuxtLinkProps } from "#app/components";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  /**\n   * Exported button styles that can be used by other components\n   */\n  export const buttonStyles = tv({\n    base: "group inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n    variants: {\n      variant: {\n        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",\n        destructive:\n          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",\n        outline:\n          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",\n        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",\n        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",\n        link: "text-primary underline-offset-4 hover:underline",\n      },\n      effect: {\n        expandIcon: "group relative gap-0",\n        ringHover: "transition-all duration-300 hover:ring-3 hover:ring-ring/50",\n        shine:\n          "relative overflow-hidden [background-position:0s_ease] before:absolute before:inset-0 before:animate-shine before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat",\n        shineHover:\n          "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0]",\n        gooeyRight:\n          "relative z-0 overflow-hidden duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:from-white/40 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]",\n        gooeyLeft:\n          "relative z-0 overflow-hidden duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:from-white/40 after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]",\n        underline:\n          "relative !no-underline after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0",\n        hoverUnderline:\n          "relative !no-underline after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",\n        gradientSlideShow:\n          "animate-gradient-flow bg-[linear-gradient(-45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] bg-[size:400%] text-white",\n      },\n      size: {\n        xs: "h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2",\n        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",\n        default: "h-9 px-4 py-2 has-[>svg]:px-3",\n        lg: "h-10 px-6 has-[>svg]:px-4",\n        "icon-xs": "size-7",\n        "icon-sm": "size-8",\n        icon: "size-9",\n        "icon-lg": "size-10",\n      },\n      disabled: {\n        true: "pointer-events-none opacity-50",\n      },\n      hasIcon: {\n        false: "gap-2",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n  export type ButtonVariants = VariantProps<typeof buttonStyles>;\n  export type ButtonProps = NuxtLinkProps & {\n    /** The type for the button */\n    type?: "button" | "submit" | "reset";\n    /** Whether the button is disabled */\n    disabled?: boolean;\n    /** Whether the button is loading */\n    loading?: boolean;\n    /** The action to perform when the button is clicked */\n    onClick?: any;\n    /** The element to render the button as */\n    as?: string;\n    /** Custom class(es) to add to parent element */\n    class?: HtmlHTMLAttributes["class"];\n    /** The variant of the button */\n    variant?: ButtonVariants["variant"];\n    /** The size of the button */\n    size?: ButtonVariants["size"];\n    /**\n     * The effect to apply to the button.\n     */\n    effect?: ButtonVariants["effect"];\n    /** The text to display in the button */\n    text?: string;\n    /** Should the icon be displayed on the `left` or the `right`? */\n    iconPlacement?: "left" | "right";\n    /** The icon to display in the button */\n    icon?: string;\n    /** The icon to display when the button is loading */\n    loadingIcon?: string;\n  };\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(defineProps<ButtonProps>(), {\n    type: "button",\n    loadingIcon: "line-md:loading-loop",\n    iconPlacement: "left",\n    loading: false,\n  });\n\n  const elementType = computed(() => {\n    if (props.as) return props.as;\n    if (props.href || props.to || props.target) return resolveComponent("NuxtLink");\n    return "button";\n  });\n\n  const forwarded = useForwardProps(\n    reactiveOmit(\n      props,\n      "class",\n      "text",\n      "icon",\n      "iconPlacement",\n      "size",\n      "variant",\n      "as",\n      "loading",\n      "disabled",\n      "loadingIcon",\n      "effect"\n    )\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Button Group",
    value: "button-group",
    files: [
      {
        fileName: "ButtonGroup/ButtonGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="forwarded"\n    role="group"\n    data-slot="button-group"\n    :data-orientation="orientation"\n    :class="buttonGroupVariants({ orientation, class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const buttonGroupVariants = tv({\n    base: "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*=\'w-\'])]:w-fit [&>input]:flex-1",\n    variants: {\n      orientation: {\n        horizontal:\n          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",\n        vertical:\n          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",\n      },\n    },\n    defaultVariants: {\n      orientation: "horizontal",\n    },\n  });\n\n  export type ButtonGroupProps = PrimitiveProps & {\n    /**\n     * The orientation of the button group.\n     * @default \'horizontal\'\n     */\n    orientation?: VariantProps<typeof buttonGroupVariants>["orientation"];\n    /**\n     * Additional classes to apply to the button group.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ButtonGroupProps>(), {\n    orientation: "horizontal",\n  });\n\n  const forwarded = reactiveOmit(props, ["orientation", "class"]);\n</script>\n',
      },
      {
        fileName: "ButtonGroup/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSeparator\n    v-bind="forwarded"\n    data-slot="button-group-separator"\n    :orientation="orientation"\n    :class="buttonGroupSeparatorStyles({ class: props.class })"\n  >\n    <slot />\n  </UiSeparator>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const buttonGroupSeparatorStyles = tv({\n    base: "relative !m-0 self-stretch bg-input data-[orientation=vertical]:h-auto",\n  });\n\n  export type ButtonGroupSeparatorProps = {\n    /**\n     * The orientation of the separator.\n     */\n    orientation?: "horizontal" | "vertical";\n    /**\n     * Additional classes to apply to the button group text.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ButtonGroupSeparatorProps>(), {\n    orientation: "vertical",\n  });\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "ButtonGroup/Text.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="forwarded"\n    data-slot="button-group-text"\n    :class="buttonGroupTextStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const buttonGroupTextStyles = tv({\n    base: "flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n\n  export type ButtonGroupTextProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the button group text.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<ButtonGroupTextProps>();\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
    ],
    components: ["button", "separator"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Calendar",
    value: "calendar",
    devDeps: ["@yuta-inoue-ph/nuxt-vcalendar"],
    nuxtModules: ["@yuta-inoue-ph/nuxt-vcalendar"],
    instructions: ["You can customize the calendar by adding options to your nuxt.config.js file"],
    files: [
      {
        fileName: "Calendar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ClientOnly>\n    <VCalendar\n      v-bind="{ ...forwarded, ...$attrs }"\n      ref="calendarRef"\n      :attributes="props.attributes"\n      :trim-weeks="props.trimWeeks || true"\n      :is-dark="$colorMode.value == \'dark\'"\n    >\n      <template v-for="(_, slot) in $slots" #[slot]="scope">\n        <slot :name="slot" v-bind="scope" />\n      </template>\n    </VCalendar>\n  </ClientOnly>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { useForwardPropsEmits } from "reka-ui";\n  import type { Placement } from "@popperjs/core";\n  import type { Calendar } from "v-calendar";\n\n  export interface AttributeConfig {\n    key?: string | number;\n    content?: string | Partial<Content | Profile<Partial<Content>>>;\n    highlight?: boolean | string | Partial<Highlight | Profile<Partial<Highlight>>>;\n    dot?: boolean | string | Partial<Dot | Profile<Partial<Dot>>>;\n    bar?: boolean | string | Partial<Bar | Profile<Partial<Bar>>>;\n    popover?: PopoverConfig;\n    dates: DateRangeSource[] | DateRangeSource;\n    customData?: any;\n    order?: number;\n  }\n\n  interface Profile<T> {\n    start: T;\n    base: T;\n    end: T;\n    startEnd?: T;\n  }\n\n  interface Content {\n    key: string | number;\n    color: string;\n    class: string | any[];\n    style: Record<string, any>;\n  }\n\n  interface Highlight {\n    key: string | number;\n    color: string;\n    class: string | any[];\n    style: Record<string, any>;\n    contentClass: string | any[];\n    contentStyle: Record<string, any>;\n    fillMode: "solid" | "light" | "outline";\n  }\n\n  interface Dot {\n    key: string | number;\n    color: string;\n    class: string | any[];\n    style: Record<string, any>;\n  }\n\n  interface Bar {\n    key: string | number;\n    color: string;\n    class: string | any[];\n    style: Record<string, any>;\n  }\n\n  type PopoverConfig = Partial<{\n    label: string;\n    customData: any;\n    visibility: "click" | "hover" | "hover-focus" | "focus";\n    placement: Placement;\n    hideIndicator: boolean;\n    isInteractive: boolean;\n  }>;\n\n  export interface DateRepeatConfig {\n    every: RepeatIntervalShort | [number, RepeatInterval];\n    until: Date;\n    weekdays: SingleOrArray<DayOfWeek>;\n    days: SingleOrArray<DayInMonth>;\n    weeks: SingleOrArray<WeekInMonth>;\n    months: SingleOrArray<MonthInYear>;\n    years: SingleOrArray<number>;\n    ordinalWeekdays: SingleOrArray<number>;\n    on: SingleOrArray<DateRepeatFn | Partial<DateRepeatConfig>>;\n  }\n\n  type DateRepeatFn = (dayParts: DayParts) => boolean;\n\n  export interface DayParts {\n    dayIndex: number;\n    day: number;\n    dayFromEnd: number;\n    weekday: number;\n    weekdayOrdinal: number;\n    weekdayOrdinalFromEnd: number;\n    week: number;\n    weekFromEnd: number;\n    weeknumber: number;\n    month: number;\n    year: number;\n    date: Date;\n  }\n\n  type SingleOrArray<T> = T | T[];\n  type RepeatIntervalShort = "day" | "week" | "month" | "year";\n  type RepeatInterval = "days" | "weeks" | "months" | "years";\n  type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;\n  // -31 to 31\n  type DayInMonth =\n    | -31\n    | -30\n    | -29\n    | -28\n    | -27\n    | -26\n    | -25\n    | -24\n    | -23\n    | -22\n    | -21\n    | -20\n    | -19\n    | -18\n    | -17\n    | -16\n    | -15\n    | -14\n    | -13\n    | -12\n    | -11\n    | -10\n    | -9\n    | -8\n    | -7\n    | -6\n    | -5\n    | -4\n    | -3\n    | -2\n    | -1\n    | 1\n    | 2\n    | 3\n    | 4\n    | 5\n    | 6\n    | 7\n    | 8\n    | 9\n    | 10\n    | 11\n    | 12\n    | 13\n    | 14\n    | 15\n    | 16\n    | 17\n    | 18\n    | 19\n    | 20\n    | 21\n    | 22\n    | 23\n    | 24\n    | 25\n    | 26\n    | 27\n    | 28\n    | 29\n    | 30\n    | 31;\n  type WeekInMonth = -6 | -5 | -4 | -3 | -2 | -1 | 1 | 2 | 3 | 4 | 5 | 6;\n  type MonthInYear = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;\n\n  type DateRangeSource = DateRangeDate | [DateRangeDate, DateRangeDate] | Partial<DateRangeConfig>;\n\n  type DateRangeDate = Date | null | string;\n\n  interface DateRangeConfig {\n    start: DateRangeDate;\n    end: DateRangeDate;\n    span: number;\n    repeat?: Partial<DateRepeatConfig>;\n  }\n</script>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n\n  const calendarRef = useTemplateRef("calendarRef");\n\n  interface Props extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]> {}\n\n  const props = defineProps<\n    Props & { trimWeeks?: boolean; attributes?: Partial<AttributeConfig> }\n  >();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, ["trimWeeks", "attributes"]));\n  defineExpose({ calendarRef });\n</script>\n\n<style>\n  @reference "~/assets/css/tailwind.css";\n\n  :root {\n    --vc-font-family: var(--font-sans);\n    --vc-rounded-full: var(--radius);\n    --vc-font-bold: 500;\n    --vc-font-semibold: 600;\n    --vc-text-lg: 16px;\n  }\n\n  .vc-light,\n  .vc-dark {\n    --vc-bg: var(--color-background);\n    --vc-border: var(--color-border);\n    --vc-focus-ring: 0 0 0 3px --alpha(var(--color-primary) / 30%);\n    --vc-weekday-color: var(--color-muted-foreground);\n    --vc-popover-content-color: var(--color-popover-foreground);\n    --vc-hover-bg: var(--color-accent);\n    --vc-popover-content-bg: var(--color-popover);\n    --vc-popover-content-border: var(--color-border);\n    --vc-header-arrow-hover-bg: var(--color-accent);\n    --vc-weeknumber-color: var(--color-muted-foreground);\n    --vc-nav-hover-bg: var(--color-accent);\n\n    --vc-day-content-disabled-color: --alpha(var(--color-muted-foreground) / 80%);\n\n    --vc-nav-item-active-color: var(--color-primary-foreground);\n    --vc-nav-item-active-bg: var(--color-primary);\n\n    &.vc-attr,\n    & .vc-attr {\n      --vc-content-color: var(--color-primary);\n      --vc-highlight-outline-bg: var(--color-primary);\n      --vc-highlight-outline-border: var(--color-primary);\n      --vc-highlight-outline-content-color: var(--color-primary-foreground);\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\n      --vc-highlight-light-content-color: var(--color-secondary-foreground);\n      --vc-highlight-solid-bg: var(--color-primary);\n      --vc-highlight-solid-content-color: var(--color-primary-foreground);\n    }\n  }\n\n  .vc-blue {\n    --vc-accent-200: --alpha(var(--color-primary) / 20%);\n    --vc-accent-400: var(--color-primary);\n    --vc-accent-500: var(--color-primary);\n    --vc-accent-600: --alpha(var(--color-primary) / 70%);\n  }\n\n  .dark {\n    .vc-blue {\n      --vc-accent-200: --alpha(var(--color-primary) / 20%);\n      --vc-accent-400: var(--color-primary);\n      --vc-accent-500: --alpha(var(--color-primary) / 70%);\n    }\n  }\n  .vc-disabled {\n    @apply pointer-events-none line-through;\n  }\n  .vc-header .vc-title {\n    @apply text-sm font-medium;\n  }\n  .vc-weekday {\n    @apply rounded-md text-[0.8rem] font-normal text-muted-foreground;\n  }\n  .vc-weekdays {\n    @apply my-2 font-normal;\n  }\n  .vc-day-content,\n  .vc-day,\n  .vc-highlight {\n    @apply size-9 rounded-md;\n  }\n  .vc-focus {\n    @apply focus-within:shadow-none;\n  }\n  .vc-day {\n    @apply mb-0.5;\n  }\n\n  .vc-base-icon {\n    @apply size-4 stroke-1;\n  }\n  .vc-header .vc-arrow,\n  .vc-nav-arrow {\n    @apply size-7 rounded-md;\n    border: 1px solid var(--color-border);\n  }\n  .vc-header .vc-prev,\n  .vc-header .vc-next {\n    @apply border;\n  }\n  .weekday-position-1 .vc-highlights {\n    @apply rounded-l-md;\n  }\n  .weekday-position-7 .vc-highlights {\n    @apply rounded-r-md;\n  }\n  .vc-highlight-bg-light {\n    @apply bg-accent;\n  }\n  .vc-nav-item {\n    @apply font-medium;\n  }\n  .vc-header .vc-title-wrapper {\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\n  }\n  .vc-highlights + .vc-day-content {\n    @apply hover:bg-accent/5;\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Card",
    value: "card",
    files: [
      {
        fileName: "Card/Card.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="card" :as="as" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>\n      <slot name="header">\n        <UiCardHeader>\n          <slot name="title">\n            <UiCardTitle v-if="title || $slots.title" :title="title" />\n          </slot>\n          <slot name="description">\n            <UiCardDescription\n              v-if="description || $slots.description"\n              :description="description"\n            />\n          </slot>\n        </UiCardHeader>\n      </slot>\n      <slot v-if="content || $slots.content" name="content">\n        <UiCardContent>\n          <div v-html="content" />\n        </UiCardContent>\n      </slot>\n      <slot name="footer" />\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Title that should be displayed. Passed to the `CardTitle` component */\n        title?: string;\n        /** Description that should be displayed. Passed to the `CardDescription` component */\n        description?: string;\n        /** Content that should be displayed. Passed to the `CardContent` component */\n        content?: string;\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="card-content"\n    :as="as"\n    :as-child="asChild"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      {{ content }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Content to display in the card */\n        content?: string;\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    { as: "div" }\n  );\n  const styles = tv({\n    base: "px-6",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="card-description"\n    :class="styles({ class: props.class })"\n    :as="as"\n    :as-child="asChild"\n  >\n    <slot>\n      {{ description }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Description to display in the card */\n        description?: string;\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="card-footer"\n    :class="styles({ class: props.class })"\n    :as="as"\n    :as-child="asChild"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "flex items-center px-6 [.border-t]:pt-6",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="card-header"\n    :class="styles({ class: props.class })"\n    :as="as"\n    :as-child="asChild"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="card-title"\n    :class="styles({ class: props.class })"\n    :as="as"\n    :as-child="asChild"\n  >\n    <slot>\n      {{ title }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Title to display in the card */\n        title?: string;\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "h3",\n    }\n  );\n\n  const styles = tv({\n    base: "leading-none font-semibold tracking-tight",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Carousel",
    value: "carousel",
    files: [
      {
        fileName: "Carousel/Carousel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    :class="styles({ class: props.class })"\n    data-slot="carousel"\n    role="region"\n    aria-roledescription="carousel"\n    tabindex="0"\n    @keydown="onKeyDown"\n  >\n    <slot\n      :can-scroll-next\n      :can-scroll-prev\n      :carousel-api\n      :carousel-ref\n      :orientation\n      :scroll-next\n      :scroll-prev\n    />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import type { CarouselEmits, CarouselProps, WithClassAsProps } from "~/composables/useCarousel";\n\n  const styles = tv({\n    base: "relative focus-visible:ring-1 focus-visible:ring-border focus-visible:outline-none",\n  });\n  const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {\n    orientation: "horizontal",\n  });\n  const emits = defineEmits<CarouselEmits>();\n\n  const {\n    canScrollNext,\n    canScrollPrev,\n    carouselApi,\n    carouselRef,\n    orientation,\n    scrollNext,\n    scrollPrev,\n  } = useProvideCarousel(props, emits);\n\n  defineExpose({\n    canScrollNext,\n    canScrollPrev,\n    carouselApi,\n    carouselRef,\n    orientation: props.orientation,\n    scrollNext,\n    scrollPrev,\n  });\n\n  function onKeyDown(event: KeyboardEvent) {\n    const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";\n    const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";\n\n    if (event.key === prevKey) {\n      event.preventDefault();\n      scrollPrev();\n      return;\n    }\n\n    if (event.key === nextKey) {\n      event.preventDefault();\n      scrollNext();\n    }\n  }\n</script>\n',
      },
      {
        fileName: "Carousel/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div ref="carouselRef" data-slot="carousel-content" :class="styles().base({ orientation })">\n    <div :class="styles().content({ orientation, class: props.class })" v-bind="$attrs">\n      <slot />\n    </div>\n  </div>\n</template>\n\n<script setup lang="ts">\n  import type { WithClassAsProps } from "~/composables/useCarousel";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<WithClassAsProps>();\n  const { carouselRef, orientation } = useCarousel();\n\n  const styles = tv({\n    slots: {\n      base: "overflow-hidden",\n      content: "flex",\n    },\n    variants: {\n      orientation: {\n        horizontal: { content: "-ml-4" },\n        vertical: { content: "-mt-4 flex-col" },\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Carousel/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    role="group"\n    aria-roledescription="slide"\n    data-slot="carousel-item"\n    :class="styles({ orientation, class: `${props.class} ${grabbingClass}` })"\n    @mousedown="isGrabbing = true"\n    @mouseup="isGrabbing = false"\n    @mouseleave="isGrabbing = false"\n  >\n    <slot />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import type { WithClassAsProps } from "~/composables/useCarousel";\n\n  const props = defineProps<\n    WithClassAsProps & {\n      /**\n       * Whether to show the grab cursor when hovering over the item.\n       * @default false\n       */\n      grabCursor?: boolean;\n    }\n  >();\n\n  const { orientation } = useCarousel();\n\n  const styles = tv({\n    base: "min-w-0 shrink-0 grow-0 basis-full",\n    variants: {\n      orientation: {\n        horizontal: "pl-4",\n        vertical: "pt-4",\n      },\n    },\n  });\n\n  const isGrabbing = ref(false);\n\n  const grabbingClass = computed(() => {\n    if (!props.grabCursor) return "";\n    return isGrabbing.value ? "cursor-grabbing" : "cursor-grab";\n  });\n</script>\n',
      },
      {
        fileName: "Carousel/Next.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiButton\n    :disabled="!canScrollNext"\n    data-slot="carousel-next"\n    :class="styles().base({ orientation, class: props.class })"\n    :variant\n    @click="scrollNext"\n  >\n    <slot>\n      <Icon :name="props.icon" :class="styles().icon({ orientation, class: props.iconClass })" />\n      <span class="sr-only">{{ props.srText }}</span>\n    </slot>\n  </UiButton>\n</template>\n\n<script setup lang="ts">\n  import type { buttonStyles } from "~/components/Ui/Button.vue";\n  import type { WithClassAsProps } from "~/composables/useCarousel";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      WithClassAsProps & {\n        /** The icon to display in the button */\n        icon?: string;\n        /** The screen reader text\n         *\n         * @default "Next Slide"\n         */\n        srText?: string;\n        /** Custom class(es) to add to the icon */\n        iconClass?: HTMLAttributes["class"];\n        /** The variant of the button\n         *\n         * @default "outline"\n         */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n      }\n    >(),\n    {\n      icon: "lucide:arrow-right",\n      srText: "Next Slide",\n      variant: "outline",\n    }\n  );\n\n  const { orientation, canScrollNext, scrollNext } = useCarousel();\n\n  const styles = tv({\n    slots: {\n      base: "absolute h-8 w-8 touch-manipulation rounded-full p-0",\n      icon: "size-4 text-current",\n    },\n    variants: {\n      orientation: {\n        horizontal: { base: "top-1/2 -right-12 -translate-y-1/2" },\n        vertical: { base: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90" },\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Carousel/Previous.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiButton\n    :disabled="!canScrollPrev"\n    data-slot="carousel-previous"\n    :class="styles().base({ orientation, class: props.class })"\n    :variant\n    @click="scrollPrev"\n  >\n    <slot>\n      <Icon :name="props.icon" :class="styles().icon({ orientation, class: props.iconClass })" />\n      <span class="sr-only">{{ props.srText }}</span>\n    </slot>\n  </UiButton>\n</template>\n\n<script setup lang="ts">\n  import type { buttonStyles } from "~/components/Ui/Button.vue";\n  import type { WithClassAsProps } from "~/composables/useCarousel";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      WithClassAsProps & {\n        /** The icon to display in the button\n         *\n         * @default "lucide:arrow-left"\n         */\n        icon?: string;\n        /** The screen reader text\n         *\n         * @default "Previous Slide"\n         */\n        srText?: string;\n        /** Custom class(es) to add to the icon */\n        iconClass?: HTMLAttributes["class"];\n        /** The variant of the button\n         *\n         * @default "outline"\n         */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n      }\n    >(),\n    {\n      icon: "lucide:arrow-left",\n      srText: "Previous Slide",\n      variant: "outline",\n    }\n  );\n\n  const { orientation, canScrollPrev, scrollPrev } = useCarousel();\n\n  const styles = tv({\n    slots: {\n      base: "absolute h-8 w-8 touch-manipulation rounded-full p-0",\n      icon: "size-4 text-current",\n    },\n    variants: {\n      orientation: {\n        horizontal: { base: "top-1/2 -left-12 -translate-y-1/2" },\n        vertical: { base: "-top-12 left-1/2 -translate-x-1/2 rotate-90" },\n      },\n    },\n  });\n</script>\n',
      },
    ],
    components: ["button"],
    deps: ["embla-carousel-vue", "embla-carousel"],
    composables: [
      {
        fileName: "useCarousel.ts",
        dirPath: "composables",
        fileContent:
          'import { createInjectionState } from "@vueuse/core";\nimport emblaCarouselVue from "embla-carousel-vue";\nimport type useEmblaCarousel from "embla-carousel-vue";\nimport type { EmblaCarouselVueType } from "embla-carousel-vue";\nimport type { HTMLAttributes, UnwrapRef } from "vue";\n\ntype CApi = EmblaCarouselVueType[1];\ntype UseCarouselParameters = Parameters<typeof useEmblaCarousel>;\ntype CarouselOptions = UseCarouselParameters[0];\ntype CarouselPlugin = UseCarouselParameters[1];\n\nexport type CarouselApi = UnwrapRef<CApi>;\n\nexport interface CarouselProps {\n  /**\n   * The options to be passed to the EmblaCarousel instance\n   */\n  opts?: CarouselOptions;\n  /**\n   * The plugins to be passed to the EmblaCarousel instance\n   */\n  plugins?: CarouselPlugin;\n  /**\n   * The orientation of the carousel\n   * @default "horizontal"\n   */\n  orientation?: "horizontal" | "vertical";\n}\n\nexport interface CarouselEmits {\n  (e: "init-api", payload: CarouselApi): void;\n}\n\nexport interface WithClassAsProps {\n  /**\n   * The class name to be applied to the root element of the component\n   * @default undefined\n   */\n  class?: HTMLAttributes["class"];\n}\n\nconst [useProvideCarousel, useInjectCarousel] = createInjectionState(\n  ({ opts, orientation, plugins }: CarouselProps, emits: CarouselEmits) => {\n    const [emblaNode, emblaApi] = emblaCarouselVue(\n      {\n        ...opts,\n        axis: orientation === "horizontal" ? "x" : "y",\n      },\n      plugins\n    );\n\n    /**\n     * Scroll to the previous slide\n     */\n    function scrollPrev() {\n      emblaApi.value?.scrollPrev();\n    }\n    /**\n     * Scroll to the next slide\n     */\n    function scrollNext() {\n      emblaApi.value?.scrollNext();\n    }\n    /**\n     * Whether the carousel can scroll to the next slide\n     */\n    const canScrollNext = ref(false);\n    /**\n     * Whether the carousel can scroll to the previous slide\n     */\n    const canScrollPrev = ref(false);\n    /**\n     * Method used to update the canScrollNext and canScrollPrev values\n     */\n    function onSelect(api: CarouselApi) {\n      canScrollNext.value = api?.canScrollNext() || false;\n      canScrollPrev.value = api?.canScrollPrev() || false;\n    }\n\n    onMounted(() => {\n      if (!emblaApi.value) return;\n      emblaApi.value?.on("init", onSelect);\n      emblaApi.value?.on("reInit", onSelect);\n      emblaApi.value?.on("select", onSelect);\n\n      emits("init-api", emblaApi.value);\n    });\n\n    return {\n      carouselRef: emblaNode,\n      carouselApi: emblaApi,\n      canScrollPrev,\n      canScrollNext,\n      scrollPrev,\n      scrollNext,\n      orientation,\n    };\n  }\n);\n\n/**\n * A composable function to be used within a <UiCarousel /> component\n */\nfunction useCarousel() {\n  const carouselState = useInjectCarousel();\n  if (!carouselState) throw new Error("useCarousel must be used within a <UiCarousel />");\n  return carouselState;\n}\n\nexport { useCarousel, useProvideCarousel };\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Checkbox",
    value: "checkbox",
    files: [
      {
        fileName: "Checkbox/Checkbox.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CheckboxRoot\n    v-slot="slotProps"\n    data-slot="checkbox"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps">\n      <UiCheckboxIndicator v-bind="slotProps" :icon :indeterminate-icon />\n    </slot>\n  </CheckboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { CheckboxRoot, useForwardPropsEmits } from "reka-ui";\n  import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    CheckboxRootProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /**\n       * ID of the checkbox\n       */\n      id?: string;\n      /**\n       * Icon to display when the checkbox is checked\n       * @default lucide:check\n       */\n      icon?: string;\n      /**\n       * Icon to display when the checkbox is in indeterminate state\n       * @default lucide:minus\n       */\n      indeterminateIcon?: string;\n    }\n  >();\n\n  const emit = defineEmits<CheckboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emit);\n\n  const styles = tv({\n    base: "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",\n  });\n</script>\n',
      },
      {
        fileName: "Checkbox/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CheckboxIndicator\n    data-slot="checkbox-indicator"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>\n      <Icon\n        :name="state == \'indeterminate\' ? indeterminateIcon : icon"\n        :class="[state == \'indeterminate\' ? \'size-3\' : \'size-3.5\']"\n      />\n    </slot>\n  </CheckboxIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { CheckboxIndicator } from "reka-ui";\n  import type { CheckboxCheckedState, CheckboxIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      CheckboxIndicatorProps & {\n        /** The state of the checkbox */\n        modelValue?: CheckboxCheckedState;\n        /**\n         * The state of the checkbox\n         */\n        state?: CheckboxCheckedState;\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n        /**\n         * Icon to display when the checkbox is checked\n         * @default lucide:check\n         */\n        icon?: string;\n        /**\n         * Icon to display when the checkbox is in indeterminate state\n         * @default lucide:minus\n         */\n        indeterminateIcon?: string;\n      }\n    >(),\n    {\n      icon: "lucide:check",\n      indeterminateIcon: "lucide:minus",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "group flex items-center justify-center text-current transition-none",\n  });\n</script>\n',
      },
      {
        fileName: "Checkbox/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CheckboxGroupRoot v-bind="forwarded">\n    <slot />\n  </CheckboxGroupRoot>\n</template>\n\n<script lang="ts">\n  import { CheckboxGroupRoot, useForwardPropsEmits } from "reka-ui";\n  import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from "reka-ui";\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<CheckboxGroupRootProps>(), {\n    loop: true,\n    orientation: "horizontal",\n  });\n\n  const emit = defineEmits<CheckboxGroupRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Chip",
    value: "chip",
    files: [
      {
        fileName: "Chip.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div data-slot="chip" class="relative inline-flex shrink-0 items-center justify-center">\n    <slot />\n    <span\n      v-if="localModel"\n      :class="[styles({ position, size, inset, class: [props.color, props.class] })]"\n    >\n      <slot name="content">\n        {{ text }}\n      </slot>\n    </span>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The text to display in the chip.\n       *\n       * Can be overridden by the `content` slot.\n       */\n      text?: string;\n      /**\n       * The color of the chip.\n       *\n       * @default `bg-primary`\n       */\n      color?: string;\n      /**\n       * The size of the chip.\n       *\n       * @default `sm`\n       */\n      size?: VariantProps<typeof styles>["size"];\n      /**\n       * The position of the chip.\n       *\n       * @default `top-right`\n       */\n      position?: VariantProps<typeof styles>["position"];\n      /**\n       * Whether the chip should be inset.\n       *\n       * @default `false`\n       */\n      inset?: boolean;\n      /**\n       * Whether the chip should be visible.\n       *\n       * Can be used with `v-model` to control visibility.\n       *\n       * @default `true`\n       */\n      show?: boolean;\n      /**\n       * Additional classes to apply to the chip.\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    { show: true, color: "bg-primary", inset: false }\n  );\n\n  const localModel = defineModel<boolean>("show", { default: true });\n\n  const styles = tv({\n    base: "absolute flex items-center justify-center rounded-full font-medium whitespace-nowrap text-foreground ring-[2px] ring-background",\n    variants: {\n      position: {\n        "top-right": "top-0 right-0",\n        "bottom-right": "right-0 bottom-0",\n        "top-left": "top-0 left-0",\n        "bottom-left": "bottom-0 left-0",\n      },\n      inset: {\n        true: "",\n        false: "",\n      },\n      size: {\n        "3xs": "h-[4px] min-w-[4px] p-px text-[4px]",\n        "2xs": "h-[5px] min-w-[5px] p-px text-[5px]",\n        xs: "h-1.5 min-w-[0.375rem] p-px text-[6px]",\n        sm: "h-2 min-w-[0.5rem] p-0.5 text-[7px]",\n        md: "h-2.5 min-w-2.5 p-0.5 text-[8px]",\n        lg: "h-3 min-w-[0.75rem] p-0.5 text-[10px]",\n        xl: "h-3.5 min-w-[0.875rem] p-1 text-[11px]",\n        "2xl": "h-4 min-w-[1rem] p-1 text-[12px]",\n        "3xl": "h-5 min-w-[1.25rem] p-1 text-[14px]",\n      },\n    },\n    defaultVariants: {\n      size: "sm",\n      position: "top-right",\n      inset: false,\n    },\n    compoundVariants: [\n      {\n        inset: false,\n        position: "top-right",\n        class: "translate-x-1/2 -translate-y-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "bottom-right",\n        class: "-translate-x-1/2 translate-y-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "top-left",\n        class: "-translate-x-1/2 -translate-y-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "bottom-left",\n        class: "-translate-x-1/2 translate-y-1/2 transform",\n      },\n    ],\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Collapsible",
    value: "collapsible",
    files: [
      {
        fileName: "Collapsible/Collapsible.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CollapsibleRoot v-slot="slotProps" data-slot="collapsible" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </CollapsibleRoot>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleRoot, useForwardPropsEmits } from "reka-ui";\n  import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui";\n\n  const props = defineProps<CollapsibleRootProps>();\n\n  const emit = defineEmits<CollapsibleRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Collapsible/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CollapsibleContent\n    data-slot="collapsible-content"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </CollapsibleContent>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleContent } from "reka-ui";\n  import type { CollapsibleContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    CollapsibleContentProps & {\n      /** Customer class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "overflow-hidden transition duration-200 will-change-auto data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",\n  });\n</script>\n',
      },
      {
        fileName: "Collapsible/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <CollapsibleTrigger data-slot="collapsible-trigger" v-bind="forwarded">\n    <slot />\n  </CollapsibleTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleTrigger, useForwardProps } from "reka-ui";\n  import type { CollapsibleTriggerProps } from "reka-ui";\n\n  const props = defineProps<CollapsibleTriggerProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Command",
    value: "command",
    components: ["dialog"],
    files: [
      {
        fileName: "Command/Command.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxRoot\n    cmdk-root\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n    data-slot="command"\n  >\n    <slot />\n  </ListboxRoot>\n</template>\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { createContext, ListboxRoot, useFilter, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxRootEmits, ListboxRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const [useCommand, provideCommandContext] = createContext<{\n    allItems: Ref<Map<string, string>>;\n    allGroups: Ref<Map<string, Set<string>>>;\n    filterState: {\n      search: string;\n      filtered: { count: number; items: Map<string, number>; groups: Set<string> };\n    };\n  }>("Command");\n\n  export const [useCommandGroup, provideCommandGroupContext] = createContext<{\n    id?: string;\n  }>("CommandGroup");\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<ListboxRootProps & { class?: HTMLAttributes["class"] }>(),\n    {\n      modelValue: "",\n    }\n  );\n\n  const emits = defineEmits<ListboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",\n  });\n\n  const allItems = ref<Map<string, string>>(new Map());\n  const allGroups = ref<Map<string, Set<string>>>(new Map());\n\n  const { contains } = useFilter({ sensitivity: "base" });\n  const filterState = reactive({\n    search: "",\n    filtered: {\n      /** The count of all visible items. */\n      count: 0,\n      /** Map from visible item id to its search score. */\n      items: new Map() as Map<string, number>,\n      /** Set of groups with at least one visible item. */\n      groups: new Set() as Set<string>,\n    },\n  });\n\n  function filterItems() {\n    if (!filterState.search) {\n      filterState.filtered.count = allItems.value.size;\n      // Do nothing, each item will know to show itself because search is empty\n      return;\n    }\n\n    // Reset the groups\n    filterState.filtered.groups = new Set();\n    let itemCount = 0;\n\n    // Check which items should be included\n    for (const [id, value] of allItems.value) {\n      const score = contains(value, filterState.search);\n      filterState.filtered.items.set(id, score ? 1 : 0);\n      if (score) itemCount++;\n    }\n\n    // Check which groups have at least 1 item shown\n    for (const [groupId, group] of allGroups.value) {\n      for (const itemId of group) {\n        if (filterState.filtered.items.get(itemId)! > 0) {\n          filterState.filtered.groups.add(groupId);\n          break;\n        }\n      }\n    }\n\n    filterState.filtered.count = itemCount;\n  }\n\n  watch(\n    () => filterState.search,\n    () => {\n      filterItems();\n    }\n  );\n  provideCommandContext({ allItems, allGroups, filterState });\n</script>\n',
      },
      {
        fileName: "Command/Dialog.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiDialog v-bind="forwarded">\n    <UiDialogContent :hide-close="showCloseButton" class="overflow-hidden p-0 shadow-lg">\n      <UiDialogHeader class="sr-only">\n        <UiDialogTitle :title />\n        <UiDialogDescription :description />\n      </UiDialogHeader>\n      <UiCommand\n        class="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"\n      >\n        <slot />\n      </UiCommand>\n    </UiDialogContent>\n  </UiDialog>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardPropsEmits } from "reka-ui";\n  import type { DialogRootEmits, DialogRootProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      DialogRootProps & {\n        /**\n         * The title of the command dialog.\n         *\n         * @default "Command Palette"\n         */\n        title?: string;\n        /**\n         * The description of the command dialog.\n         *\n         * @default "Search for a command to run...".\n         */\n        description?: string;\n        /**\n         * Whether to show the close button in the dialog header.\n         *\n         * @default true\n         */\n        showCloseButton?: boolean;\n      }\n    >(),\n    {\n      title: "Command Palette",\n      description: "Search for a command to run...",\n    }\n  );\n  const emits = defineEmits<DialogRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Command/Empty.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-if="isRender"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n    data-slot="command-empty"\n    cmdk-empty\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { useCommand } from "./Command.vue";\n\n  const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>();\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const { filterState } = useCommand();\n  const isRender = computed(() => !!filterState.search && filterState.filtered.count === 0);\n\n  const styles = tv({\n    base: "py-6 text-center text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxGroup\n    v-bind="forwarded"\n    :id="id"\n    :class="styles({ class: props.class })"\n    data-slot="command-group"\n    :hidden="isRender ? undefined : true"\n    cmdk-group\n  >\n    <ListboxGroupLabel\n      v-if="heading"\n      cmdk-group-heading\n      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"\n    >\n      {{ heading }}\n    </ListboxGroupLabel>\n    <slot />\n  </ListboxGroup>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { ListboxGroup, ListboxGroupLabel } from "reka-ui";\n  import type { ListboxGroupProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { provideCommandGroupContext, useCommand } from "./Command.vue";\n\n  const props = defineProps<\n    ListboxGroupProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      heading?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",\n  });\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const { allGroups, filterState } = useCommand();\n  const id = useId();\n\n  const isRender = computed(() =>\n    !filterState.search ? true : filterState.filtered.groups.has(id)\n  );\n\n  provideCommandGroupContext({ id });\n  onMounted(() => {\n    if (!allGroups.value.has(id)) allGroups.value.set(id, new Set());\n  });\n  onUnmounted(() => {\n    allGroups.value.delete(id);\n  });\n</script>\n',
      },
      {
        fileName: "Command/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="command-input-wrapper"\n    class="flex h-9 items-center gap-2 border-b px-3"\n    cmdk-input-wrapper\n  >\n    <Icon name="lucide:search" class="size-4 shrink-0 opacity-50" />\n    <ListboxFilter\n      v-bind="{ ...forwardedProps, ...$attrs }"\n      v-model="filterState.search"\n      data-slot="command-input"\n      auto-focus\n      cmdk-input\n      :class="styles({ class: props.class })"\n    />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { ListboxFilter, useForwardProps } from "reka-ui";\n  import type { ListboxFilterProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { useCommand } from "./Command.vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    ListboxFilterProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({\n    base: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",\n  });\n\n  const forwardedProps = useForwardProps(reactiveOmit(props, "class"));\n\n  const { filterState } = useCommand();\n</script>\n',
      },
      {
        fileName: "Command/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxItem\n    v-if="isRender"\n    v-bind="forwarded"\n    :id="id"\n    ref="itemRef"\n    :class="styles({ class: props.class })"\n    data-slot="command-item"\n    cmdk-item\n    @select="\n      () => {\n        filterState.search = \'\';\n      }\n    "\n  >\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" />\n      </slot>\n      {{ text }}\n      <slot name="shortcut">\n        <UiCommandShortcut v-if="shortcut" :shortcut="shortcut" />\n      </slot>\n    </slot>\n  </ListboxItem>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit, useCurrentElement } from "@vueuse/core";\n  import { ListboxItem, useForwardPropsEmits, useId } from "reka-ui";\n  import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { useCommand, useCommandGroup } from "./Command.vue";\n\n  const props = defineProps<\n    ListboxItemProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /** Icon to render */\n      icon?: string;\n      /** Text to render */\n      text?: string;\n      /** Shortcut to render */\n      shortcut?: string;\n    }\n  >();\n  const emits = defineEmits<ListboxItemEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "icon", "text", "shortcut"),\n    emits\n  );\n\n  const id = useId();\n  const { filterState, allItems, allGroups } = useCommand();\n  const groupContext = useCommandGroup();\n\n  const styles = tv({\n    base: "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground",\n  });\n\n  const isRender = computed(() => {\n    if (!filterState.search) {\n      return true;\n    } else {\n      const filteredCurrentItem = filterState.filtered.items.get(id);\n      // If the filtered items is undefined means not in the all times map yet\n      // Do the first render to add into the map\n      if (filteredCurrentItem === undefined) {\n        return true;\n      }\n\n      // Check with filter\n      return filteredCurrentItem > 0;\n    }\n  });\n\n  const itemRef = ref();\n  const currentElement = useCurrentElement(itemRef);\n  onMounted(() => {\n    if (!(currentElement.value instanceof HTMLElement)) return;\n\n    // textValue to perform filter\n    allItems.value.set(id, currentElement.value.textContent ?? props?.value!.toString());\n\n    const groupId = groupContext?.id;\n    if (groupId) {\n      if (!allGroups.value.has(groupId)) {\n        allGroups.value.set(groupId, new Set([id]));\n      } else {\n        allGroups.value.get(groupId)?.add(id);\n      }\n    }\n  });\n  onUnmounted(() => {\n    allItems.value.delete(id);\n  });\n</script>\n',
      },
      {
        fileName: "Command/List.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxContent\n    data-slot="command-list"\n    v-bind="forwarded"\n    cmdk-list\n    :class="styles({ class: props.class })"\n  >\n    <div role="presentation">\n      <slot />\n    </div>\n  </ListboxContent>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { ListboxContent, useForwardProps } from "reka-ui";\n  import type { ListboxContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ListboxContentProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Separator\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n    data-slot="command-separator"\n    cmdk-separator\n  >\n    <slot />\n  </Separator>\n</template>\n\n<script setup lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Separator } from "reka-ui";\n  import type { SeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SeparatorProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Shortcut.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :as="as || \'span\'" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>{{ shortcut }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /** The shortcut text to render */\n      shortcut?: any;\n    }\n  >();\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest text-muted-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Container",
    value: "container",
    files: [
      {
        fileName: "Container.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="container"\n    :data-constrained="constrained"\n    :class="styles({ class: props.class, constrained })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n        /** Whether to constrain the width of the container */\n        constrained?: boolean;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "constrained");\n\n  const styles = tv({\n    base: "mx-auto w-full max-w-7xl 2xl:max-w-(--breakpoint-2xl)",\n    variants: {\n      constrained: {\n        true: "sm:px-6",\n        false: "px-4 sm:px-6",\n      },\n    },\n    defaultVariants: {\n      constrained: false,\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Context Menu",
    value: "context-menu",
    files: [
      {
        fileName: "ContextMenu/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuArrow } from "reka-ui";\n  import type { ContextMenuArrowProps } from "reka-ui";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuArrowProps & {\n      /** Custom class(es) to add to the arrow */\n      class?: HtmlHTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/CheckboxItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuCheckboxItem\n    data-slot="context-menu-checkbox-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">\n      <UiContextMenuItemIndicator icon="lucide:check" />\n    </span>\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuCheckboxItem, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuCheckboxItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /**The shortcut for the item */\n      shortcut?: string;\n      /**The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuCheckboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "shortcut", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuContent\n      data-slot="context-menu-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </ContextMenuContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuContent, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuContentEmits, ContextMenuContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ContextMenuContentProps & {\n        /** Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 5,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "z-50 max-h-(--reka-context-menu-content-available-height) min-w-[8rem] origin-(--reka-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ContextMenu.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuRoot data-slot="context-menu" v-bind="forwarded">\n    <slot />\n  </ContextMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuRootEmits, ContextMenuRootProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuRootProps>();\n  const emit = defineEmits<ContextMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "ContextMenu/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuGroup data-slot="context-menu-group" v-bind="props">\n    <slot />\n  </ContextMenuGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuGroup } from "reka-ui";\n  import type { ContextMenuGroupProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuGroupProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuItem\n    data-slot="context-menu-item"\n    v-bind="forwarded"\n    :data-inset="inset"\n    :data-variant="variant"\n    :class="styles({ inset, class: props.class, variant })"\n  >\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItem, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      ContextMenuItemProps & {\n        /**Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n        /** Wether an indentation should be added to the item or not */\n        inset?: boolean;\n        /** The shortcut for the item */\n        shortcut?: string;\n        /** The title for the item */\n        title?: string;\n        /**\n         * The variant of the item.\n         */\n        variant?: "default" | "destructive";\n      }\n    >(),\n    {\n      variant: "default",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n      variant: {\n        default: "",\n        destructive:\n          "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="size-4" />\n    </slot>\n  </ContextMenuItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItemIndicator } from "reka-ui";\n  import type { ContextMenuItemIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuLabel\n    data-slot="context-menu-label"\n    :data-inset="inset"\n    :class="styles({ inset, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>{{ label }}</slot>\n  </ContextMenuLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuLabel } from "reka-ui";\n  import type { ContextMenuLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuLabelProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The label for the item */\n      label?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "label");\n  const styles = tv({\n    base: "px-2 py-1.5 text-sm font-medium text-foreground data-[inset=true]:pl-8",\n    variants: {\n      inset: { true: "pl-8" },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuPortal data-slot="context-menu-portal" v-bind="props">\n    <slot />\n  </ContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuPortal } from "reka-ui";\n  import type { ContextMenuPortalProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuPortalProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/RadioGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuRadioGroup data-slot="context-menu-radio-group" v-bind="forwarded">\n    <slot />\n  </ContextMenuRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRadioGroup, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuRadioGroupProps>();\n\n  const emits = defineEmits<ContextMenuRadioGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/RadioItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuRadioItem\n    data-slot="context-menu-radio-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">\n      <UiContextMenuItemIndicator>\n        <Icon v-if="icon" :name="icon" class="size-4" />\n        <Icon v-else name="ph:circle-fill" class="size-2" />\n      </UiContextMenuItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </ContextMenuRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRadioItem, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuRadioItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /**The icon to display */\n      icon?: string;\n      /**The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuSeparator\n    data-slot="context-menu-separator"\n    :class="styles({ class: props.class })"\n    v-bind="props"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSeparator } from "reka-ui";\n  import type { ContextMenuSeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuSeparatorProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Shortcut.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="context-menu-shortcut"\n    :as="as || \'span\'"\n    :as-child="asChild"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * The custom class(es) to add to the element\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Sub.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuSub data-slot="context-menu-sub" v-bind="forwarded">\n    <slot />\n  </ContextMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSub, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuSubEmits, ContextMenuSubProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuSubProps>();\n  const emits = defineEmits<ContextMenuSubEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubContent.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuSubContent\n      data-slot="context-menu-sub-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </ContextMenuSubContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubContent, useForwardPropsEmits } from "reka-ui";\n  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      ContextMenuSubContentProps & {\n        /**Custom class(es) to add to the element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuSubContentEmits>();\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubTrigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuSubTrigger\n    data-slot="context-menu-sub-trigger"\n    :data-inset="inset"\n    v-bind="forwarded"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon class="ml-auto size-4" :name="icon || \'lucide:chevron-right\'" />\n  </ContextMenuSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubTrigger } from "reka-ui";\n  import type { ContextMenuSubTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ContextMenuSubTriggerProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The icon to display */\n      icon?: string;\n      /** The title for the item */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title");\n  const styles = tv({\n    base: "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset=true]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ContextMenuTrigger data-slot="context-menu-trigger" v-bind="props">\n    <slot />\n  </ContextMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuTrigger } from "reka-ui";\n  import type { ContextMenuTriggerProps } from "reka-ui";\n\n  const props = defineProps<ContextMenuTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Currency Input",
    value: "currency-input",
    deps: ["vue-currency-input"],
    files: [
      {
        fileName: "CurrencyInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<!-- eslint-disable vue/html-self-closing -->\n<template>\n  <input\n    :id\n    ref="inputRef"\n    type="text"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { defu } from "defu";\n  import { useCurrencyInput } from "vue-currency-input";\n  import type { HTMLAttributes } from "vue";\n  import type { CurrencyInputOptions } from "vue-currency-input";\n\n  const props = defineProps<{\n    /**\n     * Custom class(es) to add to the input element\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The id of the input element\n     */\n    id?: string;\n    /**\n     * The name of the input element\n     */\n    name?: string;\n    /**\n     * The placeholder text for the input element\n     */\n    placeholder?: string;\n    /**\n     * Whether the input is disabled\n     */\n    disabled?: boolean;\n    /**\n     * Whether the input is required\n     */\n    required?: boolean;\n    modelValue?: any;\n    /**\n     * Options for the currency input\n     *\n     * @see https://dm4t2.github.io/vue-currency-input/config.html\n     */\n    options?: CurrencyInputOptions;\n  }>();\n\n  const { inputRef, formattedValue, numberValue, setOptions, setValue } = useCurrencyInput(\n    defu({}, props.options, {\n      currency: "USD",\n      locale: "en-US",\n      hideCurrencySymbolOnFocus: false,\n      hideGroupingSeparatorOnFocus: false,\n    })\n  );\n\n  const forwarded = reactiveOmit(props, "class", "options", "id", "modelValue");\n  const id = computed(() => props.id || `currency-input-${useId()}`);\n\n  const styles = tv({\n    base: "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",\n  });\n\n  defineExpose({ inputRef, formattedValue, numberValue, setOptions, setValue });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "DataTables.net",
    value: "datatable",
    deps: [
      "datatables.net-buttons-dt",
      "datatables.net-responsive-dt",
      "datatables.net-searchbuilder-dt",
      "datatables.net-select-dt",
      "datatables.net-fixedcolumns-dt",
      "datatables.net-fixedheader-dt",
      "datatables.net-colreorder-dt",
      "datatables.net-vue3",
      "jszip",
    ],
    files: [
      {
        fileName: "Datatable.client.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DataTable\n    ref="table"\n    :columns="columns"\n    :ajax="ajax"\n    :data="data"\n    :class="props.class"\n    :options="options"\n  >\n    <template v-for="(_, name) in $slots" #[name]="scope">\n      <slot :name="name" v-bind="scope" />\n    </template>\n  </DataTable>\n</template>\n\n<script lang="ts">\n  import DataTablesCore from "datatables.net";\n  import DataTable from "datatables.net-vue3";\n  import JSZip from "jszip";\n\n  import "datatables.net-buttons-dt";\n  import "datatables.net-buttons/js/buttons.colVis.mjs";\n  import "datatables.net-buttons/js/buttons.html5.mjs";\n  import "datatables.net-buttons/js/buttons.print.mjs";\n  import "datatables.net-responsive-dt";\n  import "datatables.net-searchbuilder-dt";\n  import "datatables.net-select-dt";\n  import "datatables.net-fixedcolumns-dt";\n  import "datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css";\n  import "datatables.net-fixedheader-dt";\n  import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css";\n  import "datatables.net-colreorder-dt";\n  import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";\n\n  import type { Api, Config } from "datatables.net";\n  import type { HTMLAttributes } from "vue";\n\n  export type DataTablesNamedSlotProps<T> = {\n    /** The data to show in the cell (from the `columns.data` configuration) */\n    cellData: keyof T | null;\n    /** The column index for the cell (0-based index) */\n    colIndex: number;\n    /** The data object for the whole row */\n    rowData: T | Record<string, any>;\n    /** Row index for the cell (data index, not the display index) */\n    rowIndex: number;\n    /** Orthogonal data type */\n    type: string;\n  };\n\n  // @ts-expect-error - We are not creating a declaration file for this library\n  window.JSZip = JSZip;\n</script>\n\n<script lang="ts" setup generic="T extends Record<string, any>">\n  DataTable.use(DataTablesCore);\n\n  const table = shallowRef<{ dt: InstanceType<typeof DataTablesCore<T[]>> } | null>(null);\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The data to display in the table\n       */\n      data?: Config["data"];\n      /**\n       * The CSS class to apply to the table\n       *\n       * @default "nowrap hover order-column row-border stripe display"\n       * @see https://datatables.net/manual/styling/classes\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * The columns to display in the table\n       */\n      columns?: Config["columns"];\n      /**\n       * Load data for the table\'s content from an Ajax source.\n       *\n       * @see https://datatables.net/manual/ajax#Ajax-configuration\n       */\n      ajax?: Config["ajax"];\n      /**\n       * Additional options for the DataTable\n       *\n       * @see https://datatables.net/manual/options\n       */\n      options?: Config;\n    }>(),\n    {\n      data: () => [],\n      class: "nowrap hover order-column row-border stripe display",\n    }\n  );\n\n  const emits = defineEmits<{ ready: [Api<T[]> | undefined] }>();\n\n  onMounted(() => {\n    nextTick(() => {\n      emits("ready", table.value?.dt);\n    });\n  });\n\n  defineExpose({\n    /**\n     * The DataTable instance\n     */\n    table,\n    /**\n     * The DataTable instance\'s DataTables API\n     */\n    dt: computed(() => table.value?.dt),\n  });\n</script>\n\n<style>\n  @reference "~/assets/css/tailwind.css";\n\n  :root {\n    --dt-row-selected: 262.1, 83.3%, 57.8%;\n    --dt-row-selected-text: 210, 20%, 98%;\n    --dt-row-selected-link: 262.1, 83.3%, 57.8%;\n    --dt-row-stripe: 0, 0%, 100%;\n    --dt-row-hover: 0, 0%, 100%;\n    --dt-column-ordering: 0, 0%, 100%;\n    --dt-border: 220, 13%, 91%;\n    --dt-foreground: 224, 71.4%, 4.1%;\n  }\n\n  .dark {\n    --dt-row-selected: 263.4, 70%, 50.4%;\n    --dt-row-selected-text: 210, 20%, 98%;\n    --dt-row-selected-link: 263.4, 70%, 50.4%;\n    --dt-row-stripe: 224, 71.4%, 4.1%;\n    --dt-row-hover: 224, 71.4%, 4.1%;\n    --dt-column-ordering: 224, 71.4%, 4.1%;\n    --dt-border: 215, 27.9%, 16.9%;\n    --dt-foreground: 224, 71.4%, 4.1%;\n  }\n\n  table.dataTable td.dt-control {\n    text-align: center;\n    cursor: pointer;\n  }\n  table.dataTable td.dt-control:before {\n    display: inline-block;\n    color: hsla(var(--dt-foreground), 0.5);\n    content: "►";\n  }\n  table.dataTable tr.dt-hasChild td.dt-control:before {\n    content: "▼";\n  }\n\n  table.dataTable thead > tr > th.sorting,\n  table.dataTable thead > tr > th.sorting_asc,\n  table.dataTable thead > tr > th.sorting_desc,\n  table.dataTable thead > tr > th.sorting_asc_disabled,\n  table.dataTable thead > tr > th.sorting_desc_disabled,\n  table.dataTable thead > tr > td.sorting,\n  table.dataTable thead > tr > td.sorting_asc,\n  table.dataTable thead > tr > td.sorting_desc,\n  table.dataTable thead > tr > td.sorting_asc_disabled,\n  table.dataTable thead > tr > td.sorting_desc_disabled,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc,\n  table.dataTable thead > tr > th.dt-orderable-desc,\n  table.dataTable thead > tr > td.dt-orderable-asc,\n  table.dataTable thead > tr > td.dt-orderable-desc {\n    @apply relative cursor-pointer pr-7;\n  }\n  table.dataTable thead > tr > th.sorting:before,\n  table.dataTable thead > tr > th.sorting:after,\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_asc:after,\n  table.dataTable thead > tr > th.sorting_desc:before,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting:before,\n  table.dataTable thead > tr > td.sorting:after,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_asc:after,\n  table.dataTable thead > tr > td.sorting_desc:before,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\n  table.dataTable thead > tr > td.sorting_desc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:before,\n  table.dataTable thead > tr > th.dt-orderable-asc:after,\n  table.dataTable thead > tr > th.dt-orderable-desc:before,\n  table.dataTable thead > tr > th.dt-orderable-desc:after,\n  table.dataTable thead > tr > td.dt-orderable-asc:before,\n  table.dataTable thead > tr > td.dt-orderable-asc:after,\n  table.dataTable thead > tr > td.dt-orderable-desc:before,\n  table.dataTable thead > tr > td.dt-orderable-desc:after {\n    @apply absolute right-2.5 block text-xs leading-3 opacity-25;\n  }\n  table.dataTable thead > tr > th.sorting:before,\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_desc:before,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\n  table.dataTable thead > tr > td.sorting:before,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_desc:before,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:before,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:before,\n  table.dataTable thead > tr > th.dt-orderable-desc:before,\n  table.dataTable thead > tr > td.dt-orderable-asc:before,\n  table.dataTable thead > tr > td.dt-orderable-desc:before {\n    @apply bottom-[43%] size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-up.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:!bg-[url(\'https://api.iconify.design/lucide:chevron-up.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable thead > tr > th.dt-orderable-asc:before,\n    table.dataTable thead > tr > th.dt-orderable-desc:before,\n    table.dataTable thead > tr > td.dt-orderable-asc:before,\n    table.dataTable thead > tr > td.dt-orderable-desc:before {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-up.svg?color=white\')];\n    }\n  }\n  table.dataTable thead > tr > th.sorting:after,\n  table.dataTable thead > tr > th.sorting_asc:after,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting:after,\n  table.dataTable thead > tr > td.sorting_asc:after,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:after,\n  table.dataTable thead > tr > th.dt-orderable-desc:after,\n  table.dataTable thead > tr > td.dt-orderable-asc:after,\n  table.dataTable thead > tr > td.dt-orderable-desc:after {\n    @apply top-[43%] size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:!bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable thead > tr > th.dt-orderable-asc:after,\n    table.dataTable thead > tr > th.dt-orderable-desc:after,\n    table.dataTable thead > tr > td.dt-orderable-asc:after,\n    table.dataTable thead > tr > td.dt-orderable-desc:after {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n    }\n  }\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-ordering-asc:before,\n  table.dataTable thead > tr > th.dt-ordering-desc:after {\n    @apply opacity-80;\n  }\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before {\n    @apply hidden;\n  }\n  table.dataTable thead > tr > th:active,\n  table.dataTable thead > tr > td:active {\n    @apply outline-none;\n  }\n\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:before,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:after,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:before,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:after {\n    @apply hidden;\n  }\n\n  div.dataTables_processing,\n  div.dt-processing {\n    @apply absolute inset-0 z-[999] flex size-full items-center justify-center bg-background/50 backdrop-blur-sm transition;\n\n    > div:last-child {\n      @apply relative mx-auto my-4 h-4 w-20;\n\n      > div {\n        @apply absolute top-0 h-3.5 w-3.5 rounded-full bg-primary;\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\n      }\n\n      > div:nth-child(1) {\n        left: 8px;\n        animation: datatables-loader-1 0.6s infinite;\n      }\n\n      > div:nth-child(2) {\n        left: 8px;\n        animation: datatables-loader-2 0.6s infinite;\n      }\n\n      > div:nth-child(3) {\n        left: 32px;\n        animation: datatables-loader-2 0.6s infinite;\n      }\n\n      > div:nth-child(4) {\n        left: 56px;\n        animation: datatables-loader-3 0.6s infinite;\n      }\n    }\n  }\n  @keyframes datatables-loader-1 {\n    0% {\n      transform: scale(0);\n    }\n    100% {\n      transform: scale(1);\n    }\n  }\n  @keyframes datatables-loader-3 {\n    0% {\n      transform: scale(1);\n    }\n    100% {\n      transform: scale(0);\n    }\n  }\n  @keyframes datatables-loader-2 {\n    0% {\n      transform: translate(0, 0);\n    }\n    100% {\n      transform: translate(24px, 0);\n    }\n  }\n  .dtfh-floatingparent.dtfh-floatingparent-head {\n    @apply z-10 bg-background/90 backdrop-blur;\n  }\n  table.dataTable.nowrap th,\n  table.dataTable.nowrap td {\n    white-space: nowrap;\n  }\n  table.dataTable th.dt-left,\n  table.dataTable td.dt-left {\n    text-align: left;\n  }\n  table.dataTable th.dt-center,\n  table.dataTable td.dt-center,\n  table.dataTable td.dataTables_empty {\n    text-align: center;\n  }\n  table.dataTable th.dt-right,\n  table.dataTable td.dt-right {\n    text-align: right;\n  }\n  table.dataTable th.dt-justify,\n  table.dataTable td.dt-justify {\n    text-align: justify;\n  }\n  table.dataTable th.dt-nowrap,\n  table.dataTable td.dt-nowrap {\n    white-space: nowrap;\n  }\n  table.dataTable thead th,\n  table.dataTable thead td,\n  table.dataTable tfoot th,\n  table.dataTable tfoot td {\n    text-align: left;\n  }\n  table.dataTable thead th.dt-head-left,\n  table.dataTable thead td.dt-head-left,\n  table.dataTable tfoot th.dt-head-left,\n  table.dataTable tfoot td.dt-head-left {\n    text-align: left;\n  }\n  table.dataTable thead th.dt-head-center,\n  table.dataTable thead td.dt-head-center,\n  table.dataTable tfoot th.dt-head-center,\n  table.dataTable tfoot td.dt-head-center {\n    text-align: center;\n  }\n  table.dataTable thead th.dt-head-right,\n  table.dataTable thead td.dt-head-right,\n  table.dataTable tfoot th.dt-head-right,\n  table.dataTable tfoot td.dt-head-right {\n    text-align: right;\n  }\n  table.dataTable thead th.dt-head-justify,\n  table.dataTable thead td.dt-head-justify,\n  table.dataTable tfoot th.dt-head-justify,\n  table.dataTable tfoot td.dt-head-justify {\n    text-align: justify;\n  }\n  table.dataTable thead th.dt-head-nowrap,\n  table.dataTable thead td.dt-head-nowrap,\n  table.dataTable tfoot th.dt-head-nowrap,\n  table.dataTable tfoot td.dt-head-nowrap {\n    white-space: nowrap;\n  }\n  table.dataTable tbody th.dt-body-left,\n  table.dataTable tbody td.dt-body-left {\n    text-align: left;\n  }\n  table.dataTable tbody th.dt-body-center,\n  table.dataTable tbody td.dt-body-center {\n    text-align: center;\n  }\n  table.dataTable tbody th.dt-body-right,\n  table.dataTable tbody td.dt-body-right {\n    text-align: right;\n  }\n  table.dataTable tbody th.dt-body-justify,\n  table.dataTable tbody td.dt-body-justify {\n    text-align: justify;\n  }\n  table.dataTable tbody th.dt-body-nowrap,\n  table.dataTable tbody td.dt-body-nowrap {\n    white-space: nowrap;\n  }\n\n  /* Table Styles */\n\n  table.dataTable {\n    @apply w-full table-auto border-collapse;\n  }\n\n  /* Table header styles */\n  table.dataTable thead th,\n  table.dataTable tfoot th {\n    @apply text-left text-sm font-medium text-muted-foreground;\n  }\n\n  table.dataTable > thead > tr > th {\n    @apply border-t-0 border-b px-6 py-3;\n  }\n  table.dataTable > thead > tr > td {\n    @apply border-b px-6 py-3 text-sm;\n  }\n  table.dataTable > thead > tr > th:active,\n  table.dataTable > thead > tr > td:active {\n    @apply outline-none;\n  }\n  table.dataTable > tfoot > tr > th,\n  table.dataTable > tfoot > tr > td {\n    @apply border-t px-6 py-3;\n  }\n  table.dataTable tbody tr {\n    @apply bg-transparent;\n  }\n  table.dataTable tbody tr.selected > * {\n    @apply bg-primary/10;\n  }\n  table.dataTable tbody tr.selected a {\n    @apply text-primary;\n  }\n  table.dataTable tbody th,\n  table.dataTable tbody td {\n    @apply px-6 py-3 text-sm;\n  }\n  table.dataTable.row-border > tbody > tr > th,\n  table.dataTable.row-border > tbody > tr > td,\n  table.dataTable.display > tbody > tr > th,\n  table.dataTable.display > tbody > tr > td {\n    @apply border-t;\n  }\n  table.dataTable.row-border > tbody > tr:first-child > th,\n  table.dataTable.row-border > tbody > tr:first-child > td,\n  table.dataTable.display > tbody > tr:first-child > th,\n  table.dataTable.display > tbody > tr:first-child > td {\n    @apply border-t-0;\n  }\n  table.dataTable.row-border > tbody > tr.selected + tr.selected > td,\n  table.dataTable.display > tbody > tr.selected + tr.selected > td {\n    @apply border-t-primary/30;\n  }\n  table.dataTable.cell-border > tbody > tr > th,\n  table.dataTable.cell-border > tbody > tr > td {\n    @apply border-t border-r;\n  }\n  table.dataTable.cell-border > tbody > tr > th:first-child,\n  table.dataTable.cell-border > tbody > tr > td:first-child {\n    @apply border-l;\n  }\n  table.dataTable.cell-border > tbody > tr:first-child > th,\n  table.dataTable.cell-border > tbody > tr:first-child > td {\n    @apply border-t-0;\n  }\n  table.dataTable.stripe > tbody > tr.odd > *,\n  table.dataTable.display > tbody > tr.odd > * {\n    @apply bg-muted/50;\n  }\n  table.dataTable.stripe > tbody > tr.odd.selected > *,\n  table.dataTable.display > tbody > tr.odd.selected > * {\n    @apply bg-primary/10;\n  }\n  table.dataTable.hover > tbody > tr:hover > *,\n  table.dataTable.display > tbody > tr:hover > * {\n    @apply bg-muted;\n  }\n  table.dataTable.hover > tbody > tr.selected:hover > *,\n  table.dataTable.display > tbody > tr.selected:hover > * {\n    @apply !bg-primary/10;\n  }\n  table.dataTable.order-column > tbody tr > .sorting_1,\n  table.dataTable.order-column > tbody tr > .sorting_2,\n  table.dataTable.order-column > tbody tr > .sorting_3,\n  table.dataTable.display > tbody tr > .sorting_1,\n  table.dataTable.display > tbody tr > .sorting_2,\n  table.dataTable.display > tbody tr > .sorting_3 {\n    @apply bg-muted;\n  }\n  table.dataTable.order-column > tbody tr.selected > .sorting_1,\n  table.dataTable.order-column > tbody tr.selected > .sorting_2,\n  table.dataTable.order-column > tbody tr.selected > .sorting_3,\n  table.dataTable.display > tbody tr.selected > .sorting_1,\n  table.dataTable.display > tbody tr.selected > .sorting_2,\n  table.dataTable.display > tbody tr.selected > .sorting_3 {\n    @apply !bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_1 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_2 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_3 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_1,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_2,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_3,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_1,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_2,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_3,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.no-footer {\n    @apply border-b-0;\n  }\n  table.dataTable.compact thead th,\n  table.dataTable.compact thead td,\n  table.dataTable.compact tfoot th,\n  table.dataTable.compact tfoot td,\n  table.dataTable.compact tbody th,\n  table.dataTable.compact tbody td {\n    @apply px-4 py-2;\n  }\n\n  table.dataTable th,\n  table.dataTable td {\n    @apply box-content border-y;\n  }\n\n  table.dataTable tr:last-child td {\n    @apply !border-b-0;\n  }\n\n  /* Control feature layout */\n  .dataTables_wrapper {\n    @apply w-full overflow-x-auto;\n  }\n\n  /* V2 of datatables button styles. \n  */\n  .dt-buttons {\n    @apply inline-flex flex-wrap items-center gap-2;\n    button {\n      @apply inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4;\n    }\n  }\n\n  /*  Copy modal */\n  .dt-button-info {\n    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur;\n  }\n\n  /* Select box at bottom showing number of records being displayed - v1 of datatables */\n  .dataTables_wrapper .dataTables_length {\n    label {\n      @apply inline-flex items-center gap-2 text-sm font-normal text-muted-foreground;\n      select {\n        @apply h-9 w-[70px] cursor-pointer rounded-md border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;\n      }\n    }\n  }\n  /* Select box at the bottom showing how many items are being display - v2 */\n  .dt-length {\n    @apply inline-flex items-center gap-2;\n    label {\n      @apply text-sm font-normal text-muted-foreground;\n    }\n    select {\n      @apply flex h-9 w-[70px] min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40;\n    }\n  }\n\n  /* Checkbox styles - Used when select is enabled */\n  .dt-select-checkbox {\n    @apply form-checkbox size-4 cursor-pointer rounded border-border bg-background text-primary checked:bg-primary checked:text-primary indeterminate:bg-primary/80 hover:indeterminate:bg-primary focus:ring-ring/50 focus:ring-offset-0 focus:outline-none checked:focus:bg-primary dark:bg-input/30 dark:checked:bg-primary dark:indeterminate:bg-primary/80;\n  }\n\n  /* Search box at the top styles - v1 of datatables */\n  .dataTables_wrapper .dataTables_filter {\n    label {\n      @apply inline-flex w-full cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;\n      input {\n        @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none focus-visible:border-input sm:text-sm;\n      }\n    }\n  }\n\n  /* Search box at the top styles -v2 */\n  .dt-search {\n    @apply flex items-center gap-3;\n    label {\n      @apply inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground;\n    }\n    input {\n      @apply flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40;\n    }\n  }\n\n  /* Info text that shows `Showing X to XX of XXXX entries - v1  */\n  .dataTables_wrapper .dataTables_info,\n  .dt-info {\n    @apply flex items-center gap-3 text-sm !text-muted-foreground;\n  }\n\n  .dt-paging nav {\n    @apply flex items-center gap-1;\n  }\n\n  /* Pagination button styles - v1 datatables */\n  .dataTables_wrapper .dataTables_paginate {\n    .paginate_button {\n      @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n    }\n  }\n  /* Pagination button - v2 */\n  .dt-paging-button {\n    @apply inline-flex h-8 min-w-8 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm whitespace-nowrap shadow-xs transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4;\n    &.current,\n    &:hover {\n      @apply bg-muted;\n    }\n    &.disabled,\n    &.disabled:hover,\n    &.disabled:active {\n      @apply pointer-events-none opacity-50;\n    }\n    &.previous,\n    &.next,\n    &.first,\n    &.last {\n      @apply text-base;\n    }\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {\n    @apply pointer-events-none opacity-50;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button:hover {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button:active {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .ellipsis,\n  .dt-paging .ellipsis {\n    @apply inline-flex h-8 min-w-[32px] items-start justify-center text-sm;\n  }\n  .dataTables_wrapper .dataTables_scroll {\n    clear: both;\n  }\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {\n    -webkit-overflow-scrolling: touch;\n  }\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {\n    vertical-align: middle;\n  }\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > thead\n    > tr\n    > th\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > thead\n    > tr\n    > td\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > tbody\n    > tr\n    > th\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > tbody\n    > tr\n    > td\n    > div.dataTables_sizing {\n    height: 0;\n    overflow: hidden;\n    margin: 0 !important;\n    padding: 0 !important;\n  }\n  .dataTables_wrapper.no-footer .dataTables_scrollBody {\n    @apply border-b;\n  }\n  .dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,\n  .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {\n    border-bottom: none;\n  }\n  .dataTables_wrapper:after {\n    visibility: hidden;\n    display: block;\n    content: "";\n    clear: both;\n    height: 0;\n  }\n\n  /* \n  responsive styles\n   */\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty {\n    cursor: default !important;\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty:before {\n    display: none !important;\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control {\n    cursor: pointer;\n  }\n\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {\n    @apply mr-2 inline-flex size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg\')] bg-contain bg-center bg-no-repeat pb-[3px] content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,\n    table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n    }\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control.arrow-right::before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control.arrow-right::before {\n    content: "◄";\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {\n    @apply mr-2 inline-block size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,\n    table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,\n    table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,\n    table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n    }\n  }\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > th.dtr-control {\n    padding-left: 0.333em;\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control,\n  table.dataTable.dtr-column > tbody > tr > td.control,\n  table.dataTable.dtr-column > tbody > tr > th.control {\n    cursor: pointer;\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr > td.control:before,\n  table.dataTable.dtr-column > tbody > tr > th.control:before {\n    @apply mr-2 inline-flex size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg\')] bg-contain bg-center bg-no-repeat pb-[3px] content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr > td.control:before,\n    table.dataTable.dtr-column > tbody > tr > th.control:before {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n    }\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > td.control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > th.control.arrow-right::before {\n    content: "◄";\n  }\n  table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.parent td.control:before,\n  table.dataTable.dtr-column > tbody > tr.parent th.control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.control:before {\n    @apply mr-2 inline-block size-[14px] shrink-0 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n  .dark {\n    table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr.parent td.control:before,\n    table.dataTable.dtr-column > tbody > tr.parent th.control:before,\n    table.dataTable.dtr-column > tbody > tr.dtr-expanded td.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr.dtr-expanded th.dtr-control:before,\n    table.dataTable.dtr-column > tbody > tr.dtr-expanded td.control:before,\n    table.dataTable.dtr-column > tbody > tr.dtr-expanded th.control:before {\n      @apply bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n    }\n  }\n\n  table.dataTable > tbody td.child {\n    @apply p-0;\n  }\n  table.dataTable > tbody > tr.child:hover,\n  table.dataTable > tbody > tr.child:hover > td.child {\n    background: transparent !important;\n  }\n  table.dataTable > tbody > tr.child ul.dtr-details {\n    @apply m-0 block w-full list-none p-0;\n  }\n  table.dataTable > tbody > tr.child ul.dtr-details > li {\n    @apply flex items-center gap-6 border-b p-3 px-7 hover:bg-muted;\n  }\n\n  table.dataTable > tbody > tr.child ul.dtr-details > li:last-child {\n    @apply border-b-0;\n  }\n  table.dataTable > tbody > tr.child span.dtr-title {\n    @apply inline-block min-w-[80px] font-bold;\n  }\n  /* Responsive modal */\n  div.dtr-modal {\n    @apply fixed top-0 left-0 z-[1000] box-border size-full;\n  }\n  div.dtr-modal div.dtr-modal-display {\n    @apply absolute top-1/2 left-1/2 z-[102] max-h-[80%] w-full max-w-screen-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border bg-background p-4 md:px-7 md:py-4 lg:max-h-[90%];\n  }\n  div.dtr-modal div.dtr-modal-content {\n    @apply relative flex flex-col p-0 text-[15px];\n    h2 {\n      @apply text-lg font-semibold text-foreground;\n    }\n    table tr td {\n      @apply space-x-10 pb-2 first:font-semibold [&:nth-child(2)]:pl-2;\n    }\n  }\n  div.dtr-modal div.dtr-modal-close {\n    @apply absolute top-2 right-2 z-[10] inline-flex size-6 cursor-pointer items-center justify-center rounded-md bg-muted/10 hover:bg-muted;\n  }\n  div.dtr-modal div.dtr-modal-background {\n    @apply fixed inset-0 z-[101] bg-background/20 backdrop-blur;\n  }\n\n  /* Search Builder Styles */\n  div.dt-button-collection {\n    @apply z-2002! overflow-visible!;\n  }\n  div.dt-button-collection div.dtsb-searchBuilder {\n    @apply p-4!;\n  }\n  div.dt-button-collection.dtb-collection-closeable div.dtsb-titleRow {\n    @apply pr-10;\n  }\n  .dtsb-greyscale {\n    @apply !border;\n  }\n  div.dtsb-logicContainer .dtsb-greyscale {\n    @apply border-none!;\n  }\n  div.dtsb-searchBuilder {\n    @apply mb-4 cursor-default justify-evenly text-left;\n  }\n  div.dtsb-searchBuilder button.dtsb-button,\n  div.dtsb-searchBuilder select {\n    @apply text-sm;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow {\n    @apply mb-3 flex items-center justify-between;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {\n    @apply inline-block text-sm font-normal;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title:empty {\n    @apply inline;\n  }\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-value,\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-data,\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-condition {\n    @apply block;\n  }\n  div.dtsb-searchBuilder div.dtsb-group {\n    @apply relative clear-both mb-4;\n  }\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-search {\n    @apply float-right;\n  }\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-clearGroup {\n    @apply m-0.5 p-0 text-center;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\n    @apply absolute mt-3.5 mr-3.5 rotate-90;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\n    margin-bottom: 0.8em;\n    display: flex;\n    justify-content: flex-start;\n    flex-flow: row wrap;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n    padding: 0.4em;\n    margin-right: 0.8em;\n    min-width: 5em;\n    max-width: 20em;\n    color: inherit;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    select.dtsb-dropDown\n    option.dtsb-notItalic,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input option.dtsb-notItalic {\n    font-style: normal;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-italic {\n    font-style: italic;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\n    flex: 1;\n    white-space: nowrap;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont span.dtsp-joiner {\n    margin-right: 0.8em;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input.dtsb-value {\n    width: 33%;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont select,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input {\n    height: 100%;\n    box-sizing: border-box;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\n    margin-left: auto;\n    display: inline-block;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-delete,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-right,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-left {\n    margin-right: 0.8em;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-delete:last-child,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-right:last-child,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-left:last-child {\n    margin-right: 0;\n  }\n  @media screen and (max-width: 550px) {\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\n      display: flex;\n      flex-flow: none;\n      flex-direction: column;\n      justify-content: flex-start;\n      padding-right: calc(35px + 0.8em);\n      margin-bottom: 0px;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:first-child),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:nth-child(2)),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:last-child) {\n      padding-top: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:first-child,\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:nth-child(2),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:last-child {\n      padding-top: 0em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n      max-width: none;\n      width: 100%;\n      margin-bottom: 0.8em;\n      margin-right: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\n      margin-right: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\n      position: absolute;\n      width: 35px;\n      display: flex;\n      flex-wrap: wrap-reverse;\n      right: 0;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer button {\n      margin-right: 0px !important;\n    }\n  }\n  div.dtsb-searchBuilder button,\n  div.dtsb-searchBuilder select.dtsb-dropDown,\n  div.dtsb-searchBuilder input {\n    @apply bg-background dark:bg-input/30 dark:hover:bg-input/50;\n  }\n  div.dtsb-searchBuilder button.dtsb-button {\n    @apply inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm whitespace-nowrap shadow-xs transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4;\n  }\n  div.dtsb-searchBuilder button.dtsb-button:hover {\n    @apply cursor-pointer bg-accent text-accent-foreground dark:hover:bg-input/50;\n  }\n  div.dtsb-searchBuilder div.dtsb-logicContainer {\n    @apply overflow-hidden rounded-none border;\n  }\n  div.dtsb-searchBuilder div.dtsb-logicContainer button {\n    @apply rounded-md border-transparent;\n  }\n  div.dtsb-searchBuilder button.dtsb-clearGroup {\n    min-width: 2em;\n    padding: 0;\n  }\n  div.dtsb-searchBuilder button.dtsb-iptbtn {\n    min-width: 100px;\n    text-align: left;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\n    @apply flex flex-row content-start items-start justify-start rounded-md;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-logic {\n    @apply m-0 shrink-0 grow rounded-none border-0;\n    flex-basis: 3em;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-clearGroup {\n    border: none;\n    border-radius: 0px;\n    width: 2em;\n    margin: 0px;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n    @apply rounded-md border;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value {\n    @apply flex h-9 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40;\n  }\n\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {\n    @apply h-9 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40;\n  }\n\n  /* Col vis styles */\n  .dt-button-background {\n    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm;\n  }\n  .dt-button-down-arrow {\n    @apply text-[10px];\n  }\n  .dt-button-collection {\n    @apply relative;\n    [role="menu"] {\n      @apply absolute top-7 -left-20 flex min-w-[200px] flex-col gap-1 rounded-lg border bg-background p-2 shadow-lg before:mx-2 before:mb-2 before:text-xs before:text-muted-foreground/70 before:content-[\'Select_columns\'];\n      button {\n        @apply h-8 justify-between rounded-sm border-none bg-transparent px-4 text-xs hover:bg-accent/30;\n      }\n      .dt-button.buttons-columnVisibility.dt-button-active {\n        @apply bg-accent text-accent-foreground after:ml-auto after:content-[\'✓\'] dark:bg-accent/50;\n      }\n    }\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Date Field",
    value: "date-field",
    deps: ["@internationalized/date"],
    files: [
      {
        fileName: "DateField.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DateFieldRoot\n    v-slot="{ segments }"\n    v-bind="props"\n    v-model="localModel"\n    :class="styles({ class: props.class })"\n  >\n    <template v-for="item in segments" :key="item.part">\n      <DateFieldInput\n        v-if="item.part === \'literal\'"\n        :part="item.part"\n        class="inline-flex items-center justify-center text-muted-foreground"\n      >\n        <Icon v-if="separatorIcon" :name="separatorIcon" class="text-muted-foreground" />\n        <span v-else-if="separator" class="mx-1 text-muted-foreground">{{ separator }}</span>\n      </DateFieldInput>\n      <DateFieldInput\n        v-else\n        :part="item.part"\n        class="inline-flex cursor-text items-center rounded px-1 transition focus:ring-1 focus:ring-ring focus:outline-none aria-[valuetext=Empty]:text-muted-foreground"\n      >\n        {{ item.value }}\n      </DateFieldInput>\n    </template>\n  </DateFieldRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DateFieldInput, DateFieldRoot } from "reka-ui";\n  import type { DateValue } from "@internationalized/date";\n  import type { DateFieldRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      DateFieldRootProps & {\n        /**\n         * Any additional class that should be added to the date field\n         */\n        class?: HTMLAttributes["class"];\n        /**\n         * The separator to use between date segments\n         *\n         * @default "/"\n         */\n        separator?: string;\n        /**\n         * The icon to use as a separator\n         */\n        separatorIcon?: string;\n      }\n    >(),\n    {\n      separator: "/",\n    }\n  );\n  const localModel = defineModel<DateValue>();\n\n  const styles = tv({\n    base: "h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background selection:bg-primary selection:text-primary-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive dark:bg-input/30",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Datepicker",
    value: "datepicker",
    devDeps: ["@yuta-inoue-ph/nuxt-vcalendar"],
    nuxtModules: ["@yuta-inoue-ph/nuxt-vcalendar"],
    instructions: [
      "You can customize the datepicker by adding options to your nuxt.config.js file",
    ],
    files: [
      {
        fileName: "Datepicker.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ClientOnly>\n    <VDatePicker\n      ref="datepickerRef"\n      :trim-weeks="props.trimWeeks || true"\n      :is-dark="$colorMode.value == \'dark\'"\n      v-bind="$attrs"\n    >\n      <template v-for="(_, slot) in $slots" #[slot]="scope">\n        <slot :name="slot" v-bind="scope" />\n      </template>\n    </VDatePicker>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import type { Calendar, DatePicker } from "v-calendar";\n\n  defineOptions({ inheritAttrs: false });\n\n  const datepickerRef = useTemplateRef("datepickerRef");\n\n  // @ts-expect-error - This is a hacky way to get the props from the Calendar and DatePicker components\n  interface Props\n    /* @vue-ignore */\n    extends\n      Partial<InstanceType<typeof Calendar>["$props"]>,\n      /* @vue-ignore */ Omit<Partial<InstanceType<typeof DatePicker>["$props"]>, "attributes"> {}\n\n  const props = defineProps<Props & { trimWeeks?: boolean }>();\n  defineExpose({ datepickerRef });\n</script>\n\n<style>\n  @reference "~/assets/css/tailwind.css";\n\n  :root {\n    --vc-font-family: var(--font-sans);\n    --vc-rounded-full: var(--radius);\n    --vc-font-bold: 500;\n    --vc-font-semibold: 500;\n    --vc-text-lg: 16px;\n  }\n\n  .vc-light,\n  .vc-dark {\n    --vc-bg: var(--color-background);\n    --vc-border: var(--color-border);\n    --vc-focus-ring: 0 0 0 3px --alpha(var(--color-primary) / 30%);\n    --vc-weekday-color: var(--color-muted-foreground);\n    --vc-popover-content-color: var(--color-popover-foreground);\n    --vc-hover-bg: var(--color-accent);\n    --vc-popover-content-bg: var(--color-popover);\n    --vc-popover-content-border: var(--color-border);\n    --vc-header-arrow-hover-bg: var(--color-accent);\n    --vc-weeknumber-color: var(--color-muted-foreground);\n    --vc-nav-hover-bg: var(--color-accent);\n    --vc-time-year-color: var(--color-foreground);\n    --vc-time-weekday-color: var(--color-foreground);\n    --vc-time-month-color: var(--color-foreground);\n    --vc-time-day-color: var(--color-foreground);\n\n    --vc-nav-item-active-color: var(--color-primary-foreground);\n    --vc-nav-item-active-bg: var(--color-primary);\n\n    --vc-time-select-group-bg: var(--color-background);\n    --vc-time-select-group-border: var(--color-border);\n    --vc-time-picker-border: var(--color-border);\n    --vc-select-hover-bg: var(--vc-hover-bg);\n\n    &.vc-attr,\n    & .vc-attr {\n      --vc-content-color: var(--color-primary);\n      --vc-highlight-outline-bg: var(--color-primary);\n      --vc-highlight-outline-border: var(--color-primary);\n      --vc-highlight-outline-content-color: var(--color-primary-foreground);\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\n      --vc-highlight-light-content-color: var(--color-secondary-foreground);\n      --vc-highlight-solid-bg: var(--color-primary);\n      --vc-highlight-solid-content-color: var(--color-primary-foreground);\n    }\n  }\n\n  .vc-blue {\n    --vc-accent-200: --alpha(var(--color-primary) / 20%);\n    --vc-accent-400: var(--color-primary);\n    --vc-accent-500: var(--color-primary);\n    --vc-accent-600: --alpha(var(--color-primary) / 70%);\n  }\n\n  .dark {\n    .vc-blue {\n      --vc-accent-200: --alpha(var(--color-primary) / 20%);\n      --vc-accent-400: var(--color-primary);\n      --vc-accent-500: --alpha(var(--color-primary) / 70%);\n    }\n  }\n  .vc-disabled {\n    @apply pointer-events-none line-through;\n  }\n  .vc-header .vc-title {\n    @apply text-sm font-medium;\n  }\n  .vc-weekdays {\n    @apply my-2 font-normal;\n  }\n  .vc-day-content,\n  .vc-day,\n  .vc-highlight {\n    @apply size-9 rounded-md;\n  }\n  .vc-focus {\n    @apply ring-ring/40 focus-within:shadow-none focus-visible:ring-2;\n  }\n  .vc-day {\n    @apply mb-0.5;\n  }\n\n  .vc-base-icon {\n    @apply size-4 stroke-1;\n  }\n  .vc-header .vc-arrow,\n  .vc-nav-arrow {\n    @apply size-7 rounded-md;\n    border: 1px solid var(--color-border);\n  }\n  .vc-header .vc-prev,\n  .vc-header .vc-next {\n    @apply border;\n  }\n  .weekday-position-1 .vc-highlights {\n    @apply rounded-l-md;\n  }\n  .weekday-position-7 .vc-highlights {\n    @apply rounded-r-md;\n  }\n  .vc-highlight-bg-light {\n    @apply bg-accent;\n  }\n  .vc-nav-item {\n    @apply font-medium;\n  }\n  .vc-header .vc-title-wrapper {\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\n  }\n  .vc-highlights + .vc-day-content {\n    @apply hover:bg-accent/5;\n  }\n  .vc-time-header,\n  .vc-time-select-group {\n    @apply capitalize lining-nums slashed-zero tabular-nums;\n  }\n  .vc-expanded {\n    .vc-day {\n      @apply h-[50px] w-full;\n      .vc-day-content,\n      .vc-highlight,\n      .vc-highlights {\n        @apply size-full;\n      }\n    }\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Description List",
    value: "description-list",
    files: [
      {
        fileName: "DescriptionList/DescriptionList.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="description-list"\n    v-bind="reactiveOmit(props, \'class\')"\n    :class="descriptionListDetailsStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type DescriptionDetailsProps = PrimitiveProps & {\n    /**\n     * Custom class(es) to add to the element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const descriptionListDetailsStyles = tv({\n    base: "grid grid-cols-1 text-sm/6 sm:grid-cols-2",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {\n    as: "dl",\n  });\n</script>\n',
      },
      {
        fileName: "DescriptionList/Details.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="description-list-details"\n    v-bind="reactiveOmit(props, \'class\', \'text\')"\n    :class="descriptionListDetailsStyles({ class: props.class })"\n  >\n    <slot>{{ text }}</slot>\n  </Primitive>\n</template>\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type DescriptionDetailsProps = PrimitiveProps & {\n    /**\n     * Text to display in the description details\n     */\n    text?: string;\n    /**\n     * Custom class(es) to add to the element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const descriptionListDetailsStyles = tv({\n    base: "pt-1 pb-3 text-foreground sm:border-t sm:py-3 sm:[&:nth-child(2)]:border-none",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {\n    as: "dd",\n  });\n</script>\n',
      },
      {
        fileName: "DescriptionList/Term.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="description-list-term"\n    v-bind="reactiveOmit(props, \'class\', \'text\')"\n    :class="descriptionListDetailsStyles({ class: props.class })"\n  >\n    <slot>{{ text }}</slot>\n  </Primitive>\n</template>\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type DescriptionDetailsProps = PrimitiveProps & {\n    /**\n     * Text to display in the description term\n     */\n    text?: string;\n    /**\n     * Custom class(es) to add to the element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const descriptionListDetailsStyles = tv({\n    base: "border-t pt-3 text-muted-foreground first:border-none sm:py-3",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {\n    as: "dt",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dialog",
    value: "dialog",
    files: [
      {
        fileName: "Dialog/Close.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogClose data-slot="dialog-close" v-bind="props">\n    <slot />\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "reka-ui";\n  import type { DialogCloseProps } from "reka-ui";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiDialogPortal :to="to">\n    <UiDialogOverlay />\n    <DialogContent\n      data-slot="dialog-content"\n      :class="styles({ class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot>\n        <slot name="header">\n          <UiDialogHeader>\n            <slot name="title">\n              <UiDialogTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiDialogDescription v-if="description" :description="description" />\n            </slot>\n          </UiDialogHeader>\n        </slot>\n        <slot name="content" />\n        <slot name="footer" />\n      </slot>\n      <slot name="close" />\n      <UiDialogClose\n        v-if="!hideClose"\n        class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4"\n      >\n        <Icon name="lucide:x" class="size-4" />\n        <span class="sr-only">Close</span>\n      </UiDialogClose>\n    </DialogContent>\n  </UiDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "reka-ui";\n  import type { DialogContentEmits, DialogContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    DialogContentProps & {\n      /** Icon to display in the close button */\n      icon?: string;\n      /** Title text */\n      title?: string;\n      /** Description text */\n      description?: string;\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Whether to hide the close button */\n      hideClose?: boolean;\n      /** Where to render the dialog */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "hideClose", "to"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-100",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogDescription\n    data-slot="dialog-description"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "reka-ui";\n  import type { DialogDescriptionProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The description text */\n      description?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "description");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Dialog.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogRoot data-slot="dialog" v-bind="forwarded">\n    <slot />\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "reka-ui";\n  import type { DialogRootEmits, DialogRootProps } from "reka-ui";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Dialog/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="dialog-footer" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="dialog-header" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Overlay.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogOverlay\n    data-slot="dialog-overlay"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "reka-ui";\n  import type { DialogOverlayProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DialogOverlayProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogPortal data-slot="dialog-portal" v-bind="props">\n    <slot />\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal } from "reka-ui";\n  import type { DialogPortalProps } from "reka-ui";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogTitle data-slot="dialog-title" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "reka-ui";\n  import type { DialogTitleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The title text */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "text-lg leading-none font-semibold tracking-tight",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogTrigger data-slot="dialog-trigger" v-bind="props">\n    <slot />\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger } from "reka-ui";\n  import type { DialogTriggerProps } from "reka-ui";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Divider",
    value: "divider",
    components: ["avatar"],
    files: [
      {
        fileName: "Divider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive as="div" :class="base({ orientation, type, class: props.class })">\n    <Separator :orientation="orientation" :class="border({ orientation, type })" />\n    <template v-if="label || icon || avatar || $slots.default">\n      <div :class="container({ orientation, type })">\n        <slot>\n          <slot name="label">\n            <span v-if="label" :class="labelClass({ orientation, type })">\n              {{ label }}\n            </span>\n          </slot>\n          <slot name="icon">\n            <Icon v-if="icon" :name="icon" :class="iconClass({ orientation, type })" />\n          </slot>\n          <slot name="avatar">\n            <UiAvatar v-if="avatar" :src="avatar" />\n          </slot>\n        </slot>\n      </div>\n    </template>\n    <Separator :orientation="orientation" :class="border({ orientation, type })" />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive, Separator } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    /**\n     * Custom class for the divider\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The type of the divider\n     * @default "solid"\n     */\n    type?: VariantProps<typeof style>["type"];\n    /**\n     * The orientation of the divider\n     * @default "horizontal"\n     */\n    orientation?: VariantProps<typeof style>["orientation"];\n    /**\n     * The icon to display in the divider\n     */\n    icon?: string;\n    /**\n     * The label to display in the divider\n     */\n    label?: string;\n    /**\n     * The avatar to display in the divider\n     */\n    avatar?: string;\n  }>();\n\n  const style = tv({\n    slots: {\n      base: "flex w-full items-center text-center align-middle",\n      container: "flex font-medium",\n      border: "flex border-border",\n      icon: "h-5 w-5 shrink-0",\n      label: "text-sm",\n    },\n    variants: {\n      orientation: {\n        horizontal: {\n          base: "flex-row",\n          container: "mx-3 whitespace-nowrap",\n          border: "w-full border-t",\n        },\n        vertical: {\n          base: "h-full flex-col",\n          container: "my-3",\n          border: "h-full border-s",\n        },\n      },\n      type: {\n        solid: {\n          border: "border-solid",\n        },\n        dashed: {\n          border: "border-dashed",\n        },\n        dotted: {\n          border: "border-dotted",\n        },\n      },\n    },\n    defaultVariants: {\n      orientation: "horizontal",\n      type: "solid",\n    },\n  });\n\n  const { base, border, container, icon: iconClass, label: labelClass } = style();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Draggable",
    value: "draggable",
    deps: ["vuedraggable@next"],
    files: [
      {
        fileName: "Draggable.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <VueDraggable v-bind="fwd">\n    <template #item="elProps">\n      <Slot>\n        <slot name="item" v-bind="elProps" />\n      </Slot>\n    </template>\n    <template #header>\n      <Slot>\n        <slot name="header" />\n      </Slot>\n    </template>\n    <template #footer>\n      <Slot>\n        <slot name="footer" />\n      </Slot>\n    </template>\n  </VueDraggable>\n</template>\n\n<script lang="ts">\n  import { Slot, useForwardPropsEmits } from "reka-ui";\n  import * as VueDraggable from "vuedraggable";\n\n  /**\n   * Interface for the native Sortable.js options.\n   * These options control the underlying drag-and-drop behavior.\n   */\n  export type SortableOptions = {\n    /**\n     * String or object that defines drag behavior between lists.\n     * - When a string is used, it\'s treated as the group name. Lists with the same group name can exchange items.\n     * - When an object is used, you can define more complex pull/put behaviors.\n     *\n     * **Types:**\n     * - `string`\n     * - `{\n     *    name: string;\n     *    pull?: boolean | "clone" | string[];\n     *    put?: boolean | string[];\n     *    revertClone?: boolean;\n     *  };`\n     *\n     *\n     * **Example (string):**\n     *```html Group with string value\n     * <draggable :list="items" :item-key="item => item.id" group="shared-list">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * **Example (object):**\n     *```html Group with object value\n     * <draggable :list="items" :item-key="item => item.id" :group="{ name: \'shared-list\', pull: true, put: [\'list1\', \'list2\'] }">\n     *  <template #item="{ element }">\n     *    <div>{{ element.name }}</div>\n     *  </template>\n     * </draggable>\n     * ```\n     *\n     * **📌 Note:** The `put` option can be an array of group names, allowing items to be dragged from multiple lists.\n     *\n     * @default undefined\n     *\n     */\n    group?:\n      | string\n      | {\n          name: string;\n          pull?: boolean | "clone" | string[];\n          put?: boolean | string[];\n          revertClone?: boolean;\n        };\n\n    /**\n     * Enable sorting within the list.\n     *\n     * **Type:** `boolean`\n     *\n     * @default true\n     */\n    sort?: boolean;\n\n    /**\n     * Time in milliseconds before dragging should start.\n     *\n     * Useful for touch interfaces to allow scrolling.\n     *\n     * **Default:** `0`\n     *\n     * @default 0\n     */\n    delay?: number;\n\n    /**\n     * Only apply delay if user is using touch (mobile devices).\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    delayOnTouchOnly?: boolean;\n\n    /**\n     * Number of pixels the pointer should move before cancelling a delayed drag event.\n     *\n     * **Default:** `0`\n     *\n     * @default 0\n     */\n    touchStartThreshold?: number;\n\n    /**\n     * Disables the sortable functionality completely.\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    disabled?: boolean;\n\n    /**\n     * Used to save and restore the sort order.\n     *\n     * **Type:** `null | SortableStore`\n     *\n     * **Default:** `null`\n     *\n     * **Example**\n     * ```js Store in localStorage\n     * store: {\n     *   get: function(sortable) {\n     *     var order = localStorage.getItem(sortable.options.group.name);\n     *     return order ? order.split(\'|\') : [];\n     *   },\n     *   set: function(sortable) {\n     *     var order = sortable.toArray();\n     *     localStorage.setItem(sortable.options.group.name, order.join(\'|\'));\n     *   }\n     * }\n     * ```\n     *\n     * @default null\n     *\n     * @type {null | SortableStore}\n     */\n    store?: SortableStore | null;\n\n    /**\n     * Animation speed in milliseconds when items are sorted.\n     *\n     * Set to 0 to disable animation.\n     *\n     * **Default:** `150`\n     *\n     * @default 150\n     */\n    animation?: number;\n\n    /**\n     * CSS easing for the animation.\n     *\n     * **Example**\n     * ```vue Custom Easing\n     * <draggable :list="items" :item-key="item => item.id" easing="cubic-bezier(1, 0, 0, 1)">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * **See**: [Easings.net](https://easings.net/) for examples.\n     *\n     * @see https://easings.net/ for examples\n     */\n    easing?: string;\n\n    /**\n     * CSS selector for the drag handle element within list items.\n     *\n     * If specified, dragging can only start from this element.\n     *\n     * **Example**\n     * ```html Apply Handle\n     * <draggable handle=".item-handle" :list="items" :item-key="item => item.id">\n     *   <template #item="{ element }">\n     *     <div class="item-handle">{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     */\n    handle?: string;\n\n    /**\n     * CSS selector for elements that should not trigger drag start.\n     *\n     * Can also be a function that returns true for elements to be filtered.\n     *\n     * @example\n     * filter: ".no-drag, input, textarea"\n     *\n     * @example\n     * filter: function(element, sortable) {\n     *   return element.classList.contains(\'no-drag\');\n     * }\n     */\n    filter?: string | ((element: HTMLElement, sortable: any) => boolean);\n\n    /**\n     * Call `event.preventDefault()` when clicking on a filtered element.\n     *\n     * **Default:** `true`\n     *\n     * @default true\n     */\n    preventOnFilter?: boolean;\n\n    /**\n     * CSS selector that specifies which items inside the element should be draggable.\n     *\n     * @example\n     * draggable: ".item"\n     */\n    draggable?: string;\n\n    /**\n     * HTML attribute that is used by the `toArray()` method to get the id of the item.\n     *\n     * **Default:** `data-id`\n     *\n     * @default \'data-id\'\n     */\n    dataIdAttr?: string;\n\n    /**\n     * Class name for the drop placeholder (element that shows where the item will be dropped).\n     *\n     * **Default:** `sortable-ghost`\n     *\n     * @default "sortable-ghost"\n     */\n    ghostClass?: string;\n\n    /**\n     * Class name for the chosen item being dragged.\n     *\n     * **Default:** `sortable-chosen`\n     *\n     * @default "sortable-chosen"\n     */\n    chosenClass?: string;\n\n    /**\n     * Class name for the cloned DOM Element when using forceFallback.\n     *\n     * **Default:** `sortable-drag`\n     *\n     * @default "sortable-drag"\n     */\n    dragClass?: string;\n\n    /**\n     * Threshold of the swap zone (percentage of the target element height or width).\n     *\n     * 1 is equal to 100% of the element size.\n     *\n     * **Default:** `1`\n     *\n     * @default 1\n     */\n    swapThreshold?: number;\n\n    /**\n     * Always uses inverted swap zone if set to true.\n     *\n     * This is useful for lists with a lot of items and a small swap threshold.\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    invertSwap?: boolean;\n\n    /**\n     * Threshold of the inverted swap zone.\n     *\n     * By default, will be set to the value of swapThreshold.\n     *\n     * **Default:** `1`\n     *\n     * @default 1\n     */\n    invertedSwapThreshold?: number;\n\n    /**\n     * Direction of the Sortable. Can be \'vertical\', \'horizontal\', or automatically detected.\n     *\n     * **Default:** `horizontal`\n     *\n     * @default \'horizontal\'\n     */\n    direction?: "vertical" | "horizontal" | "auto";\n\n    /**\n     * Ignore the HTML5 DnD behavior and force the fallback to kick in.\n     *\n     * This is useful for mobile devices and other scenarios where HTML5 DnD may not work.\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    forceFallback?: boolean;\n\n    /**\n     * Class name for the cloned DOM Element when using forceFallback.\n     *\n     * **Default:** `sortable-fallback`\n     *\n     * @default "sortable-fallback"\n     */\n    fallbackClass?: string;\n\n    /**\n     * Appends the cloned DOM Element into the Document\'s Body during drag.\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    fallbackOnBody?: boolean;\n\n    /**\n     * Specify in pixels how far the mouse should move before it\'s considered a drag.\n     *\n     * **Default:** `0`\n     *\n     * @default 0\n     */\n    fallbackTolerance?: number;\n\n    /**\n     * Whether dragover event bubbles to parent sortable.\n     *\n     * **Default:** `false`\n     *\n     * @default false\n     */\n    dragoverBubble?: boolean;\n\n    /**\n     * Remove the clone element when it is not showing, rather than just hiding it.\n     *\n     * **Default:** `true`\n     *\n     * @default true\n     */\n    removeCloneOnHide?: boolean;\n\n    /**\n     * Distance in pixels from empty sortable must be from mouse to insert drag element into it.\n     *\n     * **Default:** `5`\n     *\n     * @default 5\n     */\n    emptyInsertThreshold?: number;\n  };\n\n  /**\n   * Props passed to the item slot in the Draggable component.\n   * These props provide access to both the data element and its index in the list.\n   *\n   * @template T The type of the element in the list\n   */\n  export type DraggableItemSlotProps<T = any> = {\n    /**\n     * The index of the item in the list.\n     *\n     * Useful for adding keys or tracking the position in the array.\n     */\n    index: number;\n\n    /**\n     * The underlying data model of the item.\n     *\n     * This is the actual item from your array that you can display in the template.\n     */\n    element: T;\n  };\n\n  /**\n   * Slot definition for Vue\'s defineSlots macro, defining the available slots in the Draggable component.\n   *\n   * @template T The type of the elements in the list\n   */\n  export type DraggableItemSlot<T = any> = {\n    /**\n     * The main slot for rendering each item in the list.\n     * This slot should be used to display items of the list.\n     * It receives the element value and its index as slot props.\n     *\n     * **Type Breakdown**\n     *\n     * - `element`: The actual item from the list, which will be the type of the list passed in.\n     * - `index`: The index of the item in the list, useful for tracking position.\n     *\n     *\n     * **Example**\n     * ```html Item Slot\n     * <draggable v-model="items" :item-key="item => item.id">\n     *   <template #item="{ element, index }">\n     *     <div>{{ index + 1 }}. {{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     */\n    item(props: DraggableItemSlotProps<T>): any;\n\n    /**\n     * Optional slot that renders content at the beginning of the list.\n     * Useful for adding headers, titles, or instructions above the draggable items.\n     *\n     * **Example**\n     * ```html Header Slot\n     * <draggable v-model="items" :item-key="item => item.id">\n     *   <template #header>\n     *     <div class="list-header">Drag items below to reorder</div>\n     *   </template>\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     */\n    header?(): any;\n\n    /**\n     * Optional slot that renders content at the end of the list.\n     * Useful for adding footers, summaries, or action buttons below the draggable items.\n     *\n     * **Example**\n     * ```html Footer Slot\n     * <draggable v-model="items" :item-key="item => item.id">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     *   <template #footer>\n     *     <div class="list-footer">{{ items.length }} items in the list</div>\n     *   </template>\n     * </draggable>\n     * ```\n     */\n    footer?(): any;\n  };\n\n  /**\n   * Interface for the Sortable.js store option.\n   * The store allows persisting and retrieving the order of elements.\n   */\n  export type SortableStore = {\n    /**\n     * Get the order of elements. Called once during initialization.\n     * Should return an array of string IDs in the desired order.\n     *\n     * @param sortable - The Sortable instance\n     * @returns An array of element IDs\n     *\n     * @example\n     * // Using localStorage to retrieve saved order\n     * get: function(sortable) {\n     *   var order = localStorage.getItem(sortable.options.group.name);\n     *   return order ? order.split(\'|\') : [];\n     * }\n     */\n    get(sortable: any): string[];\n\n    /**\n     * Save the order of elements. Called when the sorting operation ends (onEnd).\n     *\n     * @param sortable - The Sortable instance\n     *\n     * @example\n     * // Using localStorage to save the order\n     * set: function(sortable) {\n     *   var order = sortable.toArray();\n     *   localStorage.setItem(sortable.options.group.name, order.join(\'|\'));\n     * }\n     */\n    set(sortable: any): void;\n  };\n\n  export type DraggableProps<T = any> = {\n    /**\n     * An alternative to the `modelValue` prop, `list` is an array that is synchronized\n     * with drag-and-drop operations.\n     *\n     * The main difference is that the `list` prop is updated directly by the draggable\n     * component using the `splice` method, whereas `modelValue` is immutable and requires\n     * two-way binding via `v-model`.\n     *\n     * **🚨 Important:** Do not use the `list` prop in conjunction with the `modelValue` prop.\n     *\n     * **Type:** `T[] | null | undefined`\n     *\n     * **Default:** `undefined`\n     *\n     * **Example:**\n     * ```html Using List Prop\n     * <draggable :list="items" :item-key="item => item.id">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * @type {T[] | null | undefined}\n     */\n    list?: T[] | null;\n    /**\n     * The array bound to the draggable component.\n     * Typically, this is the same array used in the `v-for` directive of its child elements.\n     *\n     * This is the recommended way to use Vue Draggable, as it ensures compatibility with\n     * state management tools.\n     *\n     * **🚨 Important:** This prop should not be modified directly. Instead, use the `v-model`\n     * directive for two-way binding.\n     *\n     * **🚨 Important:** Do not use this prop along with the `list` prop\n     *\n     * **Type:** `T[] | null | undefined`\n     *\n     * **Default:** `undefined`\n     *\n     * **Example:**\n     * ```html Binding with v-model\n     * <draggable v-model="items" :item-key="item => item.id">\n     *   <template #item="{ element }">\n     *     <div>{{ item.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * @type {T[] | null | undefined}\n     */\n    modelValue?: T[] | null;\n    /**\n     * The property or function used to uniquely identify each element in the list.\n     *\n     * This can either be:\n     * - A string representing the property name of the element to be used as the key.\n     * - A function that receives an element from the list and returns its unique key.\n     *\n     * **Type:** `((item: T) => string) | keyof T`\n     *\n     * **Default:** `undefined`\n     *\n     * **Example (using a property):**\n     * ```html Plain string usage\n     * <draggable v-model="items" item-key="id">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * **Example (using a function):**\n     * ```html Function usage\n     * <draggable v-model="items" :item-key="item => `${item.type}-${item.id}`">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * @type {((item: T) => string) | keyof T}\n     *\n     */\n    itemKey: ((item: T) => string) | keyof T;\n    /**\n     * A function called on the source component to clone an element when the `clone` option is enabled.\n     *\n     * The function receives the `viewModel` element to be cloned as its only argument and should return\n     * the cloned version of the element.\n     *\n     * By default, Vue Draggable reuses the `viewModel` element. Use this hook if you need to create a\n     * new instance of the element or perform a deep clone.\n     *\n     * **Type:** `((original: T) => any) | undefined`\n     *\n     * **Default:** `null`\n     *\n     * **Example:**\n     * ```html Cloning Example\n     * <draggable\n     *   v-model="items"\n     *   :item-key="item => item.id"\n     *   :clone="original => ({ ...original, id: Date.now() })"\n     * >\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * @type {((original: T) => any) | undefined}\n     *\n     * @default null\n     */\n    clone?: (original: T) => any;\n    /**\n     * The HTML tag or Vue component to be used as the outer element for the draggable component.\n     *\n     * If a string is provided, it specifies the HTML node type (e.g., `div`, `ul`, `li`).\n     * Alternatively, you can pass the name of a Vue component. In this case, the `draggable`\n     * attribute will be passed to the created component.\n     *\n     * To set additional props or events on the created component, use the `componentData` prop.\n     *\n     * **Type:** `string | undefined`\n     *\n     * **Default:** `div`\n     *\n     * **Example (using an HTML tag):**\n     * ```html HTML Tag Example\n     * <draggable tag="ul" v-model="items" :item-key="item => item.id">\n     *   <template #item="{ element }">\n     *     <li>{{ element.name }}</li>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * **Example (using a Vue component):**\n     * ```html Vue Component Example\n     * <draggable tag="CustomComponent" v-model="items" :item-key="item => item.id" :component-data="{ someProp: true }">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     * ```\n     *\n     * @type {string | undefined}\n     *\n     * @default \'div\'\n     */\n    tag?: string;\n    /**\n     * A function that is called during the drag operation, similar to Sortable\'s `onMove` callback.\n     *\n     * Returning `false` from this function will cancel the drag operation.\n     *\n     * **Additional Properties in `evt`:**\n     * - `draggedContext`: Context of the dragged element.\n     *   - `index`: Index of the dragged element.\n     *   - `element`: The underlying view model of the dragged element.\n     * - `futureIndex`: The potential index of the dragged element if dropped.\n     * - `relatedContext`: Context of the target element.\n     *   - `index`: Index of the target element.\n     *   - `element`: The underlying view model of the target element.\n     *   - `list`: The target list.\n     *   - `component`: The target Vue component.\n     *\n     * **Type:** `((event: MoveEvent<T>, originalEvent: Event) => boolean | null | undefined)`\n     *\n     * **Default:** `null`\n     *\n     * **Example:**\n     * ```html Move Function Example\n     * <draggable :list="list" :move="checkMove">\n     *   <template #item="{ element }">\n     *     <div>{{ element.name }}</div>\n     *   </template>\n     * </draggable>\n     *\n     * <script setup>\n     *   checkMove(evt) {\n     *    return evt.draggedContext.element.name !== \'apple\'; // Prevent dragging \'apple\'\n     *   }\n     * <\\/script>\n     * ```\n     *\n     * @type {(event: MoveEvent<T>, originalEvent: Event) => boolean | null | undefined}\n     *\n     * @default null\n     */\n    move?: (event: MoveEvent<T>, originalEvent: Event) => boolean | null;\n    /**\n     * An object used to pass additional attributes, props, and events to the child component\n     * specified by the `tag` prop.\n     *\n     * This prop is useful when the `tag` prop specifies a Vue component, allowing you to\n     * configure the component with custom props or event listeners.\n     *\n     * **Type:** `Record<string, any> | null`\n     *\n     * **Default:** `null`\n     *\n     * **Example (using Element UI library):**\n     * ```html Vue Component Example\n     * <template>\n     *   <draggable\n     *     tag="el-collapse"\n     *     :list="list"\n     *     :component-data="getComponentData()"\n     *     item-key="name"\n     *   >\n     *     <template #item="{ element }">\n     *       <el-collapse-item :title="element.title" :name="element.name">\n     *         <div>{{ element.description }}</div>\n     *       </el-collapse-item>\n     *     </template>\n     *   </draggable>\n     * </template>\n     *\n     * <script setup>\n     * import { ref } from \'vue\';\n     *\n     * const activeNames = ref([]);\n     *\n     * const handleChange = () => {\n     *   console.log(\'changed\');\n     * };\n     *\n     * const inputChanged = (value) => {\n     *   activeNames.value = value;\n     * };\n     *\n     * const getComponentData = () => {\n     *   return {\n     *     onChange: handleChange,\n     *     onInput: inputChanged,\n     *     wrap: true,\n     *     value: activeNames.value\n     *   };\n     * };\n     * <\\/script>\n     * ```\n     *\n     * @type {Record<string, any> | null | undefined}\n     * @default null\n     */\n    componentData?: Record<string, any> | null;\n  };\n\n  /**\n   * Interface for the event object passed to the move function.\n   * Combines Sortable\'s onMove event properties with Vue Draggable\'s additional context properties.\n   */\n  export interface MoveEvent<T = any> {\n    // Sortable onMove properties\n    /**\n     * The target container element where the dragged item would be inserted\n     */\n    to: HTMLElement;\n\n    /**\n     * The source container element where the dragged item originated from\n     */\n    from: HTMLElement;\n\n    /**\n     * The HTML element being dragged\n     */\n    dragged: HTMLElement;\n\n    /**\n     * The DOMRect object representing dimensions and position of the dragged element\n     */\n    draggedRect: DOMRect;\n\n    /**\n     * The HTML element that the dragged element would be inserted near\n     */\n    related: HTMLElement;\n\n    /**\n     * The DOMRect object representing dimensions and position of the related element\n     */\n    relatedRect: DOMRect;\n\n    /**\n     * Indicates whether the dragged element will be inserted after (true) or before (false) the related element\n     */\n    willInsertAfter: boolean;\n\n    // Vue Draggable additional properties\n    /**\n     * Context information about the dragged element\n     */\n    draggedContext: {\n      /**\n       * The original index of the dragged element in its source list\n       */\n      index: number;\n\n      /**\n       * The underlying data model of the dragged element\n       */\n      element: T;\n\n      /**\n       * The potential index where the dragged element would be inserted if dropped\n       */\n      futureIndex: number;\n\n      /**\n       * Additional properties that might be available\n       */\n      [key: string]: any;\n    };\n\n    /**\n     * Context information about the related target element and its container\n     */\n    relatedContext: {\n      /**\n       * The index of the target element in its list\n       */\n      index: number;\n\n      /**\n       * The underlying data model of the target element\n       */\n      element: T;\n\n      /**\n       * The target list array where the dragged element would be inserted\n       */\n      list: T[];\n\n      /**\n       * The Vue component instance of the target container\n       */\n      component: any;\n\n      /**\n       * Additional properties that might be available\n       */\n      [key: string]: any;\n    };\n\n    /**\n     * Additional properties that might be available in the event object\n     */\n    [key: string]: any;\n  }\n\n  /**\n   * Event object from Sortable.js operations\n   */\n  export interface SortableEvent {\n    /** The dragged element */\n    item: HTMLElement;\n    /** Target list (HTMLElement) */\n    to?: HTMLElement;\n    /** Source list (HTMLElement) */\n    from?: HTMLElement;\n    /** Element\'s original index within old parent */\n    oldIndex?: number;\n    /** Element\'s new index within new parent */\n    newIndex?: number;\n    /** Element\'s old index within old parent, only counting draggable elements */\n    oldDraggableIndex?: number;\n    /** Element\'s new index within new parent, only counting draggable elements */\n    newDraggableIndex?: number;\n    /** The clone element if cloning happened during drag */\n    clone?: HTMLElement;\n    /** When item moved from another list: "clone" if cloning, true if moving */\n    pullMode?: "clone" | boolean;\n    /** Any additional properties from the event */\n    [key: string]: any;\n  }\n\n  /**\n   * Type definition for all events emitted by the Draggable component\n   */\n  export type DraggableEmits<T = any> = {\n    /**\n     * This event is triggered when the user starts dragging an item.\n     *\n     * @description This event is triggered when the user starts dragging an item.\n     */\n    (e: "start", event: SortableEvent): void;\n\n    /**\n     * Emitted when an element is added to the list from another list\n     */\n    (e: "add", event: SortableEvent): void;\n\n    /**\n     * Emitted when an element is removed from the list into another list\n     */\n    (e: "remove", event: SortableEvent): void;\n\n    /** Emitted when the order of an element changes within its list */\n    (e: "update", event: SortableEvent): void;\n\n    /** Emitted when dragging ends */\n    (e: "end", event: SortableEvent): void;\n\n    /** Emitted when an element is selected for dragging */\n    (e: "choose", event: Pick<SortableEvent, "item" | "oldIndex">): void;\n\n    /** Emitted when an element is deselected for dragging */\n    (e: "unchoose", event: SortableEvent): void;\n\n    /** Emitted when any change to the list happens (add/update/remove) */\n    (e: "sort", event: SortableEvent): void;\n\n    /** Emitted when attempting to drag a filtered element */\n    (e: "filter", event: Pick<SortableEvent, "item">): void;\n\n    /** Emitted when creating a clone of an element */\n    (e: "clone", event: SortableEvent & { origEl: HTMLElement; cloneEl: HTMLElement }): void;\n\n    /**\n     * Emitted when the list changes due to drag-and-drop operations.\n     *\n     * Contains information about what elements were added, removed, or moved.\n     *\n     * This event is only triggered when using the `list` prop (not with v-model).\n     */\n    (e: "change", event: ChangeEvent<T>): void;\n\n    /** Emitted to update the v-model when the list changes */\n    (e: "update:modelValue", newValue: any[]): void;\n  };\n\n  /**\n   * Event payload for the change event, which is triggered when list prop is altered due to drag-and-drop operations\n   */\n  export interface ChangeEvent<T = any> {\n    /**\n     * Contains information of an element added to the array\n     */\n    added?: {\n      /**\n       * The index where the element was added\n       */\n      newIndex: number;\n      /**\n       * The element that was added\n       */\n      element: T;\n    };\n\n    /**\n     * Contains information of an element removed from the array\n     */\n    removed?: {\n      /**\n       * The index where the element was before removal\n       */\n      oldIndex: number;\n      /**\n       * The element that was removed\n       */\n      element: T;\n    };\n\n    /**\n     * Contains information of an element moved within the array\n     */\n    moved?: {\n      /**\n       * The new index of the moved element\n       */\n      newIndex: number;\n      /**\n       * The previous index of the moved element\n       */\n      oldIndex: number;\n      /**\n       * The element that was moved\n       */\n      element: T;\n    };\n  }\n</script>\n\n<script lang="ts" setup generic="T = any">\n  defineSlots<DraggableItemSlot<T>>();\n  const emits = defineEmits<DraggableEmits<T>>();\n  const props = withDefaults(defineProps<DraggableProps<T> & SortableOptions>(), {\n    animation: 150,\n    chosenClass: "sortable-chosen",\n    dataIdAttr: "data-id",\n    delay: 0,\n    delayOnTouchOnly: false,\n    disabled: false,\n    dragClass: "sortable-drag",\n    dragoverBubble: false,\n    emptyInsertThreshold: 5,\n    fallbackClass: "sortable-fallback",\n    fallbackOnBody: false,\n    fallbackTolerance: 0,\n    forceFallback: false,\n    ghostClass: "sortable-ghost",\n    invertedSwapThreshold: 1,\n    invertSwap: false,\n    preventOnFilter: true,\n    removeCloneOnHide: true,\n    sort: true,\n    swapThreshold: 1,\n    tag: "div",\n    touchStartThreshold: 0,\n  });\n\n  if (!props.itemKey) {\n    throw createError({\n      statusCode: 500,\n      statusMessage: "[Draggable] You must provide a itemKey prop to the Draggable component",\n    });\n  }\n  if (!props.list && !props.modelValue) {\n    throw createError({\n      statusCode: 500,\n      statusMessage:\n        "[Draggable] You must provide a list or modelValue prop to the Draggable component",\n    });\n  }\n\n  const fwd = useForwardPropsEmits(props, emits);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Drawer",
    value: "drawer",
    deps: ["vaul-vue"],
    files: [
      {
        fileName: "Drawer/Close.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerClose data-slot="drawer-close" v-bind="props">\n    <slot />\n  </DrawerClose>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerClose } from "vaul-vue";\n  import type { DrawerCloseProps } from "vaul-vue";\n\n  const props = defineProps<DrawerCloseProps>();\n</script>\n',
      },
      {
        fileName: "Drawer/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiDrawerPortal>\n    <slot name="overlay">\n      <UiDrawerOverlay />\n    </slot>\n    <slot name="content">\n      <DrawerContent\n        data-slot="drawer-content"\n        v-bind="{ ...forwarded, ...$attrs }"\n        :class="styles({ class: props.class })"\n      >\n        <slot name="knob">\n          <div\n            v-if="!hideKnob"\n            data-slot="drawer-knob"\n            class="mx-auto mt-4 h-1.5 w-[60px] shrink-0 cursor-grab rounded-full bg-muted active:cursor-grabbing"\n          />\n        </slot>\n\n        <slot />\n      </DrawerContent>\n    </slot>\n  </UiDrawerPortal>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardPropsEmits } from "reka-ui";\n  import { DrawerContent } from "vaul-vue";\n  import type { DialogContentEmits, DialogContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    DialogContentProps & { class?: HTMLAttributes["class"]; hideKnob?: boolean }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: [\n      "group/drawer-content fixed z-50 flex h-auto flex-col bg-background",\n      "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",\n      "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",\n      "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",\n      "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerDescription\n    data-slot="drawer-description"\n    v-bind="props"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      {{ props.text }}\n    </slot>\n  </DrawerDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerDescription } from "vaul-vue";\n  import type { DrawerDescriptionProps } from "vaul-vue";\n  import type { HTMLAttributes } from "vue";\n\n  interface Props extends DrawerDescriptionProps {\n    /**\n     * Custom class(es) to add to the parent.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The text content of the description.\n     */\n    text?: string;\n  }\n\n  const props = defineProps<Props>();\n\n  const styles = tv({ base: "text-sm text-muted-foreground" });\n</script>\n',
      },
      {
        fileName: "Drawer/Drawer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerRoot data-slot="drawer" v-bind="forwarded">\n    <slot />\n  </DrawerRoot>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardPropsEmits } from "reka-ui";\n  import { DrawerRoot } from "vaul-vue";\n  import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";\n\n  const props = withDefaults(defineProps<DrawerRootProps>(), {\n    shouldScaleBackground: true,\n  });\n  const emits = defineEmits<DrawerRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Drawer/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="drawer-footer"\n    v-bind="forwarded"\n    :class="drawerFooterStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const drawerFooterStyles = tv({\n    base: "mt-auto flex flex-col gap-2 p-4",\n  });\n\n  export type DrawerHeaderProps = PrimitiveProps & {\n    /**\n     * Classes to add to the parent.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<DrawerHeaderProps>(), {\n    as: "div",\n  });\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Drawer/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="drawer-header"\n    v-bind="forwarded"\n    :class="drawerHeaderStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const drawerHeaderStyles = tv({\n    base: "grid gap-1.5 p-4 text-center sm:text-left",\n  });\n\n  export type DrawerHeaderProps = PrimitiveProps & {\n    /**\n     * Classes to add to the header.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<DrawerHeaderProps>(), {\n    as: "div",\n  });\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Drawer/Overlay.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerOverlay\n    data-slot="drawer-overlay"\n    v-bind="props"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { DrawerOverlay } from "vaul-vue";\n  import type { DialogOverlayProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>();\n\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/40 backdrop-blur",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerPortal data-slot="drawer-portal" v-bind="props">\n    <slot />\n  </DrawerPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerPortal } from "vaul-vue";\n  import type { DrawerPortalProps } from "vaul-vue";\n\n  const props = defineProps<DrawerPortalProps>();\n</script>\n',
      },
      {
        fileName: "Drawer/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerTitle data-slot="drawer-title" v-bind="props" :class="styles({ class: props.class })">\n    <slot>\n      {{ props.text }}\n    </slot>\n  </DrawerTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerTitle } from "vaul-vue";\n  import type { DrawerTitleProps } from "vaul-vue";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DrawerTitleProps & {\n      /**\n       * Custom class(es) to add to the parent.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * The text content of the title.\n       */\n      text?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-lg leading-none font-semibold tracking-tight",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DrawerTrigger data-slot="drawer-trigger" v-bind="props">\n    <slot />\n  </DrawerTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerTrigger } from "vaul-vue";\n  import type { DrawerTriggerProps } from "vaul-vue";\n\n  const props = defineProps<DrawerTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dropdown Menu",
    value: "dropdown-menu",
    files: [
      {
        fileName: "DropdownMenu/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuArrow\n    data-slot="dropdown-menu-arrow"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuArrow } from "reka-ui";\n  import type { DropdownMenuArrowProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuArrowProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      asChild: false,\n      width: 10,\n      height: 5,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "rotate-45 border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/CheckboxItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuCheckboxItem\n    data-slot="dropdown-menu-checkbox-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="absolute left-2 flex size-3.5 items-center justify-center text-primary">\n      <UiDropdownMenuItemIndicator icon="lucide:check" />\n    </span>\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>\n    </slot>\n  </DropdownMenuCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuCheckboxItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The shortcut text to display */\n      shortcut?: string;\n      /** The title text to display */\n      title?: string;\n    }\n  >();\n  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "title", "shortcut", "class"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiDropdownMenuPortal>\n    <DropdownMenuContent\n      data-slot="dropdown-menu-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </DropdownMenuContent>\n  </UiDropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuContent, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      loop: true,\n      align: "center",\n      sideOffset: 4,\n      side: "bottom",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<DropdownMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-[8rem] origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/DropdownMenu.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuRoot data-slot="dropdown-menu" v-bind="forwarded">\n    <slot />\n  </DropdownMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRoot, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuRootProps>();\n\n  const emit = defineEmits<DropdownMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuGroup data-slot="dropdown-menu-group" v-bind="props">\n    <slot />\n  </DropdownMenuGroup>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuGroup } from "reka-ui";\n  import type { DropdownMenuGroupProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuGroupProps>();\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuItem\n    data-slot="dropdown-menu-item"\n    v-bind="forwarded"\n    :data-inset="inset"\n    :data-variant="variant"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" class="size-4" />\n      </slot>\n      <slot name="title">\n        <span v-if="title">{{ title }}</span>\n      </slot>\n    </slot>\n    <slot name="shortcut">\n      <UiDropdownMenuShortcut v-if="shortcut" :variant>{{ shortcut }}</UiDropdownMenuShortcut>\n    </slot>\n  </DropdownMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuItem, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Whether to inset the content */\n      inset?: boolean;\n      /** The shortcut text to display */\n      shortcut?: string;\n      /** The title text to display */\n      title?: string;\n      /** The icon to display */\n      icon?: string;\n      /**\n       * The variant of the item.\n       *\n       * @default "default"\n       */\n      variant?: "default" | "destructive";\n    }\n  >();\n\n  const emits = defineEmits<DropdownMenuItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuItemIndicator\n    data-slot="dropdown-menu-item-indicator"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="size-4" />\n    </slot>\n  </DropdownMenuItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuItemIndicator } from "reka-ui";\n  import type { DropdownMenuItemIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuLabel\n    data-slot="dropdown-menu-label"\n    :class="styles({ inset, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>{{ label }}</slot>\n  </DropdownMenuLabel>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuLabel } from "reka-ui";\n  import type { DropdownMenuLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuLabelProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Whether to inset the content */\n      inset?: boolean;\n      /** The label text to display */\n      label?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "label");\n  const styles = tv({\n    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",\n    variants: {\n      inset: { true: "pl-8" },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuPortal data-slot="dropdown-menu-portal" v-bind="props">\n    <slot />\n  </DropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuPortal } from "reka-ui";\n  import type { DropdownMenuPortalProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuPortalProps>();\n</script>\n',
      },
      {
        fileName: "DropdownMenu/RadioGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuRadioGroup data-slot="dropdown-menu-radio-group" v-bind="forwarded">\n    <slot />\n  </DropdownMenuRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRadioGroup, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuRadioGroupProps>();\n\n  const emits = defineEmits<DropdownMenuRadioGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/RadioItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuRadioItem\n    data-slot="dropdown-menu-radio-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="absolute left-2 flex size-3.5 items-center justify-center text-primary">\n      <UiDropdownMenuItemIndicator>\n        <Icon v-if="icon" :name="icon" class="size-4" />\n        <Icon v-else name="ph:circle-fill" class="size-2" />\n      </UiDropdownMenuItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </DropdownMenuRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRadioItem, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuRadioItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The icon to display */\n      icon?: string;\n      /** The title text to display */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<DropdownMenuRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuSeparator\n    data-slot="dropdown-menu-separator"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSeparator } from "reka-ui";\n  import type { DropdownMenuSeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Shortcut.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="dropdown-menu-shortcut"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /**\n         * The variant of the item.\n         *\n         * @default "default"\n         */\n        variant?: "default" | "destructive";\n      }\n    >(),\n    {\n      as: "span",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest",\n    variants: {\n      variant: {\n        default: "text-muted-foreground",\n        destructive: "text-destructive",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Sub.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuSub data-slot="dropdown-menu-sub" v-bind="forwarded">\n    <slot />\n  </DropdownMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSub, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuSubEmits, DropdownMenuSubProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuSubProps>();\n  const emits = defineEmits<DropdownMenuSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/SubContent.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiDropdownMenuPortal :to="to">\n    <DropdownMenuSubContent\n      data-slot="dropdown-menu-sub-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </DropdownMenuSubContent>\n  </UiDropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSubContent, useForwardPropsEmits } from "reka-ui";\n  import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuSubContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The element to render the portal into */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      loop: true,\n      sideOffset: 8,\n      avoidCollisions: true,\n      collisionPadding: 5,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<DropdownMenuSubContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] origin-(--reka-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/SubTrigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuSubTrigger\n    data-slot="dropdown-menu-sub-trigger"\n    v-bind="forwarded"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="size-4" />\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon\n      class="ml-auto size-4 text-muted-foreground"\n      :name="trailingIcon || \'lucide:chevron-right\'"\n    />\n  </DropdownMenuSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSubTrigger } from "reka-ui";\n  import type { DropdownMenuSubTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DropdownMenuSubTriggerProps & {\n      /**Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The icon to display */\n      icon?: string;\n      /** The title for the item */\n      title?: string;\n      /** The trailing icon to display */\n      trailingIcon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");\n  const styles = tv({\n    base: "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DropdownMenuTrigger data-slot="dropdown-menu-trigger" v-bind="props">\n    <slot />\n  </DropdownMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuTrigger } from "reka-ui";\n  import type { DropdownMenuTriggerProps } from "reka-ui";\n\n  const props = defineProps<DropdownMenuTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dropfile",
    value: "dropfile",
    files: [
      {
        fileName: "Dropfile.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    ref="dropZoneRef"\n    data-slot="dropfile"\n    :class="styles({ isOverDropZone, class: props.class })"\n    @click="open()"\n  >\n    <slot>\n      <slot name="message">\n        <div data-slot="dropfile-message" class="py-10 text-center">\n          <slot name="icon">\n            <div\n              v-if="icon"\n              data-slot="dropfile-icon-wrapper"\n              class="inline-flex items-center justify-center rounded-md border p-2 transition"\n              :class="[isOverDropZone && \'animate-bounce border-primary\']"\n            >\n              <Icon\n                data-slot="dropfile-icon"\n                :name="icon"\n                class="h-7 w-7 opacity-70"\n                :class="[isOverDropZone && \'text-primary\']"\n              />\n            </div>\n          </slot>\n          <slot name="title">\n            <p\n              v-if="title"\n              data-slot="dropfile-title"\n              class="mt-5 text-sm font-medium"\n              v-html="title"\n            />\n          </slot>\n          <slot name="subtext">\n            <p\n              v-if="subtext"\n              data-slot="dropfile-subtext"\n              class="mt-1 text-sm text-muted-foreground/60"\n              v-html="subtext"\n            />\n          </slot>\n        </div>\n      </slot>\n    </slot>\n  </div>\n</template>\n\n<script setup lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The text to display as the title of the dropzone.\n       *\n       * @default "Click to upload or drag & drop files."\n       */\n      title?: string;\n      /**\n       * The text to display as the subtext of the dropzone.\n       *\n       * @default "All file types accepted"\n       */\n      subtext?: string;\n      /**\n       * The icon to display in the dropzone.\n       *\n       * @default "lucide:cloud-upload"\n       */\n      icon?: string;\n      /**\n       * The function to call when files are dropped.\n       */\n      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type\n      onDrop?: Function;\n      /**\n       * Whether or not to allow multiple files to be picked. Does not affect drag and drop.\n       *\n       * @default true\n       */\n      multiple?: boolean;\n      /**\n       * The file types to accept. Does not affect drag and drop.\n       *\n       * @default "*"\n       */\n      accept?: string;\n      /**\n       * Any additional class that should be added to the dropzone.\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      title: "Click to upload or drag & drop files.",\n      subtext: "All file types accepted",\n      icon: "lucide:cloud-upload",\n      multiple: true,\n      accept: "*",\n    }\n  );\n\n  const { open, reset, onChange } = useFileDialog({\n    multiple: props.multiple,\n    accept: props.accept,\n  });\n\n  onChange((files: FileList | null) => {\n    if (files?.length) {\n      handleDrop(Array.from(files || []));\n      reset();\n    }\n  });\n\n  const dropZoneRef = useTemplateRef("dropZoneRef");\n  const emits = defineEmits<{\n    dropped: [any];\n  }>();\n\n  const handleDrop = (files: File[] | null) => {\n    if (!files) return;\n    if (props.onDrop) props.onDrop(files);\n    emits("dropped", files);\n  };\n\n  const { isOverDropZone } = useDropZone(dropZoneRef, handleDrop);\n\n  const styles = tv({\n    base: "flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed transition hover:border-primary",\n    variants: {\n      isOverDropZone: { true: "border-primary bg-primary/10" },\n    },\n  });\n\n  defineExpose({ dropZoneRef });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Editable",
    value: "editable",
    files: [
      {
        fileName: "Editable/Area.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableArea v-bind="props">\n    <slot />\n  </EditableArea>\n</template>\n\n<script lang="ts" setup>\n  import { EditableArea } from "reka-ui";\n  import type { EditableAreaProps } from "reka-ui";\n\n  const props = defineProps<EditableAreaProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Cancel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableCancelTrigger v-bind="props">\n    <slot />\n  </EditableCancelTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableCancelTrigger } from "reka-ui";\n  import type { EditableCancelTriggerProps } from "reka-ui";\n\n  const props = defineProps<EditableCancelTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Edit.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableEditTrigger v-bind="props">\n    <slot />\n  </EditableEditTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableEditTrigger } from "reka-ui";\n  import type { EditableEditTriggerProps } from "reka-ui";\n\n  const props = defineProps<EditableEditTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Editable.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableRoot :ref="forwardRef" v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </EditableRoot>\n</template>\n\n<script lang="ts" setup>\n  import { EditableRoot, useForwardExpose, useForwardPropsEmits } from "reka-ui";\n  import type { EditableRootEmits, EditableRootProps } from "reka-ui";\n\n  const { currentRef, forwardRef } = useForwardExpose();\n  const props = defineProps<EditableRootProps>();\n  const emit = defineEmits<EditableRootEmits & { ready: [v?: any] }>();\n  const forwarded = useForwardPropsEmits(props, emit);\n\n  onMounted(() => {\n    // Emit the ready event with the current ref value\n    emit("ready", currentRef);\n  });\n</script>\n',
      },
      {
        fileName: "Editable/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableInput v-bind="props">\n    <slot />\n  </EditableInput>\n</template>\n\n<script lang="ts" setup>\n  import { EditableInput } from "reka-ui";\n  import type { EditableInputProps } from "reka-ui";\n\n  const props = defineProps<EditableInputProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Preview.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditablePreview v-bind="props">\n    <slot />\n  </EditablePreview>\n</template>\n\n<script lang="ts" setup>\n  import { EditablePreview } from "reka-ui";\n  import type { EditablePreviewProps } from "reka-ui";\n\n  const props = defineProps<EditablePreviewProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Submit.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <EditableSubmitTrigger v-bind="props">\n    <slot />\n  </EditableSubmitTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableSubmitTrigger } from "reka-ui";\n  import type { EditableSubmitTriggerProps } from "reka-ui";\n\n  const props = defineProps<EditableSubmitTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Empty",
    value: "empty",
    files: [
      {
        fileName: "Empty/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="empty-content"\n    :class="emptyContentStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyContentStyles = tv({\n    base: "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",\n  });\n\n  export type EmptyContentProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyContentProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Empty/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="empty-description"\n    :class="emptyDescriptionStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyDescriptionStyles = tv({\n    base: "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",\n  });\n\n  export type EmptyDescriptionProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyDescriptionProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Empty/Empty.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="empty" :class="emptyStyles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyStyles = tv({\n    base: "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",\n  });\n\n  export type EmptyProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the empty state container.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Empty/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="empty-header"\n    :class="emptyHeaderStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyHeaderStyles = tv({\n    base: "flex max-w-sm flex-col items-center gap-2 text-center",\n  });\n\n  export type EmptyHeaderProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyHeaderProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Empty/Media.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="empty-icon"\n    :data-variant="props.variant"\n    :class="emptyMediaStyles({ class: props.class, variant })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyMediaStyles = tv({\n    base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*=\'size-\'])]:size-6",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n\n  export type EmptyMediaProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the empty media container.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The variant of the empty media component.\n     * @default \'default\'\n     */\n    variant?: VariantProps<typeof emptyMediaStyles>["variant"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyMediaProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Empty/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="empty-title"\n    :class="emptyTitleStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const emptyTitleStyles = tv({\n    base: "text-lg font-medium tracking-tight",\n  });\n\n  export type EmptyTitleProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<EmptyTitleProps>();\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Fancy Icon",
    value: "fancy-icon",
    files: [
      {
        fileName: "FancyIcon.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="fancy-icon"\n    :class="styles().base({ class: props.class, color, type, size, circle })"\n  >\n    <slot :styles="styles().icon({ color, type, size, circle })">\n      <Icon\n        v-if="icon"\n        data-slot="fancy-icon-icon"\n        :name="icon"\n        :class="styles().icon({ color, type, size, circle })"\n      />\n    </slot>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Custom class(es) to add to the icon container.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * The icon to display.\n       */\n      icon?: string;\n      /**\n       * The color variant of the icon.\n       */\n      color?: VariantProps<typeof styles>["color"];\n      /**\n       * The type variant of the icon.\n       */\n      type?: VariantProps<typeof styles>["type"];\n      /**\n       * The size variant of the icon.\n       */\n      size?: VariantProps<typeof styles>["size"];\n      /**\n       * Whether the icon should be circular.\n       *\n       * @default false\n       */\n      circle?: boolean;\n    }>(),\n    {\n      color: "primary",\n      type: "modern",\n      size: "lg",\n      circle: false,\n    }\n  );\n\n  const styles = tv({\n    slots: {\n      base: "flex shrink-0 items-center justify-center",\n      icon: "",\n    },\n\n    variants: {\n      color: {\n        primary: {\n          base: "",\n          icon: "",\n        },\n        success: {\n          base: "",\n          icon: "",\n        },\n        warning: {\n          base: "",\n          icon: "",\n        },\n        error: {\n          base: "",\n          icon: "",\n        },\n        info: {\n          base: "",\n          icon: "",\n        },\n      },\n      type: {\n        light: {\n          base: "",\n          icon: "",\n        },\n        dark: {\n          base: "",\n          icon: "",\n        },\n        modern: {\n          base: "",\n          icon: "",\n        },\n      },\n      size: {\n        sm: {\n          base: "size-8",\n          icon: "size-4",\n        },\n        md: {\n          base: "size-10",\n          icon: "size-5",\n        },\n        lg: {\n          base: "size-12",\n          icon: "size-6",\n        },\n        xl: {\n          base: "size-14",\n          icon: "size-7",\n        },\n      },\n      circle: {\n        true: {\n          base: "rounded-full",\n        },\n        false: {\n          base: "rounded-lg",\n        },\n      },\n    },\n    compoundVariants: [\n      {\n        color: "primary",\n        type: "light",\n        class: { base: "bg-primary/5", icon: "text-primary" },\n      },\n      {\n        color: "success",\n        type: "light",\n        class: {\n          base: "bg-green-500/10",\n          icon: "text-green-600",\n        },\n      },\n      {\n        color: "warning",\n        type: "light",\n        class: { base: "bg-amber-500/10", icon: "text-amber-600" },\n      },\n      {\n        color: "error",\n        type: "light",\n        class: { base: "bg-destructive/10", icon: "text-destructive" },\n      },\n      {\n        color: "info",\n        type: "light",\n        class: { base: "bg-blue-500/10", icon: "text-blue-600" },\n      },\n      // Dark\n      {\n        color: "primary",\n        type: "dark",\n        class: { base: "bg-primary", icon: "text-primary-foreground" },\n      },\n      {\n        color: "success",\n        type: "dark",\n        class: { base: "bg-green-600", icon: "text-green-50" },\n      },\n      {\n        color: "warning",\n        type: "dark",\n        class: { base: "bg-amber-600", icon: "text-amber-50" },\n      },\n      {\n        color: "error",\n        type: "dark",\n        class: { base: "bg-destructive", icon: "text-destructive-foreground" },\n      },\n      {\n        color: "info",\n        type: "dark",\n        class: { base: "bg-blue-500", icon: "text-blue-50" },\n      },\n      // Modern\n      {\n        type: "modern",\n        class: { base: "border bg-background", icon: "text-muted-foreground" },\n      },\n    ],\n    defaultVariants: {\n      color: "primary",\n      type: "modern",\n      size: "lg",\n      circle: false,\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Field",
    value: "field",
    files: [
      {
        fileName: "Field/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    data-slot="field-content"\n    :class="fieldContentStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldContentStyles = tv({\n    base: ["group/field-content flex flex-1 flex-col gap-1.5 leading-snug"],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Field/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    data-slot="field-description"\n    :class="fieldDescriptionStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldDescriptionStyles = tv({\n    base: [\n      "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",\n      "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",\n      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",\n    ],\n  });\n</script>\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /**\n         * Additional classes to apply to the element.\n         */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "p",\n    }\n  );\n</script>\n',
      },
      {
        fileName: "Field/Error.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    role="alert"\n    data-slot="field-error"\n    :class="fieldErrorStyles({ class: props.class })"\n  >\n    <slot>\n      <template v-if="errors">\n        <template v-if="Array.isArray(errors)">\n          <ul class="ml-4 flex list-disc flex-col gap-1">\n            <template v-for="(item, i) in errors" :key="i">\n              <li>\n                {{\n                  typeof item === "object" && item !== null && "message" in item\n                    ? item.message\n                    : item\n                }}\n              </li>\n            </template>\n          </ul>\n        </template>\n        <template v-else>\n          <span>{{ errors }}</span>\n        </template>\n      </template>\n    </slot>\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldErrorStyles = tv({\n    base: ["text-sm font-normal text-destructive"],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the element.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * Error message(s) to display.\n       */\n      errors?: string | string[] | Array<{ message: string }>;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Field/Field.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    role="group"\n    data-slot="field"\n    :data-orientation="orientation"\n    :class="fieldStyles({ class: props.class, orientation })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldStyles = tv({\n    base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",\n    variants: {\n      orientation: {\n        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],\n        horizontal: [\n          "flex-row items-center",\n          "[&>[data-slot=field-label]]:flex-auto",\n          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",\n        ],\n        responsive: [\n          "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",\n          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",\n          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",\n        ],\n      },\n    },\n    defaultVariants: {\n      orientation: "vertical",\n    },\n  });\n\n  export type FieldProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the fieldset element.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The orientation of the field, either "vertical", "horizontal", or "responsive".\n     * @default "vertical"\n     */\n    orientation?: VariantProps<typeof fieldStyles>["orientation"];\n  };\n</script>\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<FieldProps>(), {\n    orientation: "vertical",\n  });\n</script>\n',
      },
      {
        fileName: "Field/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    data-slot="field-group"\n    :class="fieldGroupStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldGroupStyles = tv({\n    base: [\n      "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",\n    ],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the fieldset element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Field/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiLabel v-bind="props" data-slot="field-label" :class="fieldLabelStyles({ class: props.class })">\n    <slot />\n  </UiLabel>\n</template>\n<script lang="ts">\n  import type { LabelProps } from "@/components/Ui/Label.vue";\n\n  export const fieldLabelStyles = tv({\n    base: [\n      "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",\n      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",\n      "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",\n    ],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<LabelProps>();\n</script>\n',
      },
      {
        fileName: "Field/Legend.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    data-slot="field-legend"\n    :data-variant="variant"\n    :class="fieldLegendStyles({ class: props.class, variant })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldLegendStyles = tv({\n    base: ["mb-3 font-medium", "data-[variant=legend]:text-base", "data-[variant=label]:text-sm"],\n    variants: {\n      variant: {\n        legend: "text-base",\n        label: "text-sm",\n      },\n    },\n    defaultVariants: {\n      variant: "legend",\n    },\n  });\n\n  export type FieldLegendProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the fieldset element.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * The variant of the legend, either "legend" or "label".\n     * @default "legend"\n     */\n    variant?: VariantProps<typeof fieldLegendStyles>["variant"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<FieldLegendProps>(), {\n    as: "legend",\n    variant: "legend",\n  });\n</script>\n',
      },
      {
        fileName: "Field/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="field-separator"\n    :data-content="!!$slots.default"\n    :class="fieldSeparatorStyles({ class: props.class })"\n  >\n    <UiSeparator class="absolute inset-0 top-1/2" />\n    <span\n      v-if="$slots.default"\n      className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"\n      data-slot="field-separator-content"\n    >\n      <slot />\n    </span>\n  </div>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldSeparatorStyles = tv({\n    base: ["relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2"],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Field/Set.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :as :as-child data-slot="field-set" :class="fieldSetStyles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldSetStyles = tv({\n    base: [\n      "flex flex-col gap-6",\n      "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",\n    ],\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /**\n         * Additional classes to apply to the fieldset element.\n         */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "fieldset",\n    }\n  );\n</script>\n',
      },
      {
        fileName: "Field/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    data-slot="field-label"\n    :class="fieldTitleStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const fieldTitleStyles = tv({\n    base: [\n      "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",\n    ],\n  });\n</script>\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
    ],
    components: ["label", "separator"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Form",
    value: "form",
    deps: ["@vee-validate/nuxt"],
    nuxtModules: ["@vee-validate/nuxt"],
    composables: [
      {
        fileName: "useFormField.ts",
        dirPath: "composables",
        fileContent:
          'import { FORM_ITEM_INJECTION_KEY } from "@/components/Ui/Form/Item.vue";\nimport {\n  FieldContextKey,\n  useFieldError,\n  useIsFieldDirty,\n  useIsFieldTouched,\n  useIsFieldValid,\n} from "vee-validate";\nimport { inject } from "vue";\n\nexport function useFormField() {\n  const fieldContext = inject(FieldContextKey);\n  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);\n\n  const fieldState = {\n    valid: useIsFieldValid(),\n    isDirty: useIsFieldDirty(),\n    isTouched: useIsFieldTouched(),\n    error: useFieldError(),\n  };\n\n  if (!fieldContext) throw new Error("useFormField should be used within <FormField>");\n\n  const { name } = fieldContext;\n  const id = fieldItemContext;\n\n  return {\n    id,\n    name,\n    formItemId: `${id}-form-item`,\n    formDescriptionId: `${id}-form-item-description`,\n    formMessageId: `${id}-form-item-message`,\n    ...fieldState,\n  };\n}\n',
      },
    ],
    files: [
      {
        fileName: "Form/Control.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Slot\n    :id="formItemId"\n    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"\n    :aria-invalid="!!error"\n  >\n    <slot :id="formItemId" />\n  </Slot>\n</template>\n\n<script lang="ts" setup>\n  import { Slot } from "reka-ui";\n\n  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();\n</script>\n',
      },
      {
        fileName: "Form/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <p :id="formDescriptionId" :class="styles({ class: props.class })" v-bind="$attrs">\n    <slot>\n      <ClientOnly>\n        <p v-html="description" />\n      </ClientOnly>\n    </slot>\n  </p>\n</template>\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const { formDescriptionId } = useFormField();\n  const props = defineProps<{ class?: HTMLAttributes["class"]; description?: string }>();\n  const styles = tv({ base: "text-sm text-muted-foreground" });\n</script>\n',
      },
      {
        fileName: "Form/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })" v-bind="$attrs">\n    <slot name="label">\n      <UiFormLabel v-if="label || hint" :label="label" :hint="hint" />\n    </slot>\n    <UiFormControl>\n      <slot />\n    </UiFormControl>\n    <slot name="description">\n      <UiFormDescription v-if="description" :description="description" />\n    </slot>\n    <slot name="errorMessage">\n      <TransitionSlide tag="p">\n        <UiFormMessage v-if="!hideMessage" />\n      </TransitionSlide>\n    </slot>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes, InjectionKey } from "vue";\n\n  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;\n</script>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n\n  const id = useId();\n  provide(FORM_ITEM_INJECTION_KEY, id);\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n    label?: string;\n    description?: string;\n    hint?: string;\n    hideMessage?: boolean;\n  }>();\n\n  const styles = tv({ base: "space-y-1.5" });\n</script>\n',
      },
      {
        fileName: "Form/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Label\n    :class="styles({ error: Boolean(error), class: props.class })"\n    :for="formItemId"\n    v-bind="$attrs"\n  >\n    <slot\n      >{{ label }}\n      <span class="ml-auto font-normal text-muted-foreground/80">{{ hint }}</span></slot\n    >\n  </Label>\n</template>\n\n<script lang="ts" setup>\n  import { Label } from "reka-ui";\n  import type { LabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    LabelProps & { class?: HTMLAttributes["class"]; label?: string; hint?: string }\n  >();\n\n  const { error, formItemId } = useFormField();\n\n  const styles = tv({\n    base: "flex w-full items-center justify-between text-left text-sm font-medium tracking-tight text-foreground hover:cursor-pointer",\n    variants: {\n      error: {\n        true: "text-destructive",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Form/Message.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ErrorMessage\n    :id="formMessageId"\n    as="p"\n    :name="toValue(name)"\n    class="text-sm font-medium text-destructive"\n  />\n</template>\n\n<script lang="ts" setup>\n  const { name, formMessageId } = useFormField();\n</script>\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Gradient Divider",
    value: "gradient-divider",
    files: [
      {
        fileName: "GradientDivider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Separator v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { Separator } from "reka-ui";\n  import type { SeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SeparatorProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: "h-px w-full border-t-0 bg-[linear-gradient(90deg,--alpha(var(--input)/10%),_var(--input),_--alpha(var(--input)/10%))]",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Heading",
    value: "heading",
    files: [
      {
        fileName: "Heading.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :as="hTag" v-bind="forwarded" :class="headingStyles({ level, class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  /**\n   * Styles for the heading component\n   */\n  export const headingStyles = tv({\n    base: "font-sans text-foreground",\n    variants: {\n      level: {\n        1: "text-xl font-semibold sm:text-2xl",\n        2: "text-lg font-semibold sm:text-xl",\n        3: "text-base font-semibold sm:text-lg",\n        4: "text-base font-semibold",\n        5: "text-base font-medium",\n        6: "text-base",\n      },\n    },\n    defaultVariants: {\n      level: 1,\n    },\n  });\n\n  /**\n   * Props for the heading component\n   */\n  export type HeadingProps = Omit<PrimitiveProps, "as"> & {\n    /**\n     * The heading level to use, which will determine the HTML tag used.\n     *\n     * @default 1\n     */\n    level?: VariantProps<typeof headingStyles>["level"];\n    /**\n     * Custom class(es) to apply to the heading element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<HeadingProps>(), {\n    level: 1,\n  });\n  // The element to use\n  const hTag = computed(() => `h${props.level}`);\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Hover Card",
    value: "hover-card",
    files: [
      {
        fileName: "HoverCard/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <HoverCardArrow :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardArrow } from "reka-ui";\n  import type { HoverCardArrowProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardArrowProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      height: 5,\n      width: 10,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fill-popover",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiHoverCardPortal :to="to">\n    <HoverCardContent\n      data-slot="hover-card-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </HoverCardContent>\n  </UiHoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardContent } from "reka-ui";\n  import type { HoverCardContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardContentProps & {\n        /** Custom class(es) to add to the content */\n        class?: HTMLAttributes["class"];\n        /** The element or selector the content should be positioned relative to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 5,\n      align: "center",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "to");\n  const styles = tv({\n    base: "z-50 w-64 origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/HoverCard.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <HoverCardRoot data-slot="hover-card" v-bind="forwarded">\n    <slot />\n  </HoverCardRoot>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardRoot, useForwardPropsEmits } from "reka-ui";\n  import type { HoverCardRootEmits, HoverCardRootProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<HoverCardRootProps>(), {\n    openDelay: 200,\n    closeDelay: 200,\n  });\n\n  const emits = defineEmits<HoverCardRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "HoverCard/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <HoverCardPortal data-slot="hover-card-portal" v-bind="props">\n    <slot />\n  </HoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardPortal } from "reka-ui";\n  import type { HoverCardPortalProps } from "reka-ui";\n\n  const props = defineProps<HoverCardPortalProps>();\n</script>\n',
      },
      {
        fileName: "HoverCard/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <HoverCardTrigger data-slot="hover-card-trigger" v-bind="props">\n    <slot />\n  </HoverCardTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardTrigger } from "reka-ui";\n  import type { HoverCardTriggerProps } from "reka-ui";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<HoverCardTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Icon",
    value: "icon",
    files: [
      {
        fileName: "Icon.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Icon v-bind="props" :icon="props.name" />\n</template>\n\n<script lang="ts" setup>\n  import { Icon } from "@iconify/vue";\n  import type { IconProps } from "@iconify/vue";\n\n  const props = defineProps<\n    Omit<IconProps, "icon"> & {\n      /**\n       * The name of the icon to display.\n       */\n      name: string;\n    }\n  >();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Input",
    value: "input",
    files: [
      {
        fileName: "Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<!-- eslint-disable vue/html-self-closing -->\n<template>\n  <input\n    v-bind="props"\n    ref="input"\n    data-slot="input"\n    :class="styles({ class: props.class, type: props.type as any })"\n    :value="modelValue"\n    @input="handleInput"\n  />\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes, InputHTMLAttributes } from "vue";\n\n  export type InputProps = {\n    /** Additional classes to add to the input */\n    class?: HTMLAttributes["class"];\n    /** The id of the input */\n    id?: string;\n    /** The name of the input */\n    name?: string;\n    /** The placeholder of the input */\n    placeholder?: string;\n    /** Whether the input is disabled */\n    disabled?: boolean;\n    /** Whether the input is required */\n    required?: boolean;\n    /** The type of the input */\n    type?: InputHTMLAttributes["type"];\n    /** The value of the input */\n    modelValue?: any;\n    /** The maximum length of the input */\n    maxlength?: number;\n    /** The `RegExp` pattern of the input */\n    pattern?: string;\n    /** When `true`, the input will be focused when mounted */\n    autofocus?: boolean;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<InputProps>(), {\n    type: "text",\n    modelValue: "",\n  });\n\n  const inputRef = useTemplateRef("input");\n\n  const emit = defineEmits<{\n    "update:modelValue": [value: string];\n  }>();\n\n  const handleInput = (event: Event) => {\n    const target = event.target as HTMLInputElement;\n    let value = target.value;\n\n    /* val input with pattern */\n    if (props.pattern) {\n      const regex = new RegExp(props.pattern);\n      value = Array.from(value)\n        .filter((char) => regex.test(char))\n        .join("");\n    }\n\n    /* Handle maxlength */\n    if (props.maxlength) {\n      value = value.slice(0, props.maxlength);\n    }\n\n    target.value = value;\n    emit("update:modelValue", value);\n  };\n\n  const styles = tv({\n    base: [\n      "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",\n      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",\n      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",\n    ],\n    variants: {\n      type: {\n        search:\n          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",\n        file: "p-0 pr-3 text-muted-foreground/70 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-foreground file:not-italic",\n      },\n    },\n  });\n\n  onMounted(() => {\n    if (props.autofocus) {\n      inputRef.value?.focus();\n    }\n  });\n\n  defineExpose({ inputRef });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Input Group",
    value: "input-group",
    files: [
      {
        fileName: "InputGroup/Addon.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="forwarded"\n    role="group"\n    data-slot="input-group-addon"\n    :data-align="align || undefined"\n    :class="inputGroupAddonVariants({ class: props.class, align })"\n    @click="onClick"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  const inputGroupAddonVariants = tv({\n    base: "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*=\'size-\'])]:size-4",\n\n    variants: {\n      align: {\n        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",\n        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",\n        "block-start":\n          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",\n        "block-end":\n          "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",\n      },\n    },\n    defaultVariants: {\n      align: "inline-start",\n    },\n  });\n\n  export type InputGroupAddonVariants = PrimitiveProps & {\n    /**\n     * Alignment of the addon within the input group.\n     * @default "inline-start"\n     */\n    align?: VariantProps<typeof inputGroupAddonVariants>["align"];\n    /**\n     * Additional classes to apply to the input group addon container.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<InputGroupAddonVariants>(), {\n    align: "inline-start",\n  });\n\n  const forwarded = reactiveOmit(props, ["align", "class"]);\n\n  const onClick = (e: any) => {\n    if ((e.target as HTMLElement).closest("button")) {\n      return;\n    }\n    // Focus the associated input, textarea, or textbox when the addon is clicked.\n    e.currentTarget?.parentElement?.querySelector("input, textarea, [role=\'textbox\']")?.focus();\n  };\n</script>\n',
      },
      {
        fileName: "InputGroup/Button.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiButton\n    data-slot="input-group-button"\n    v-bind="forwarded"\n    :data-size="size"\n    :class="inputGroupButtonVariants({ class: props.class, size })"\n  >\n    <slot />\n  </UiButton>\n</template>\n\n<script lang="ts">\n  import type { ButtonProps } from "@/components/Ui/Button.vue";\n  import type { VariantProps } from "tailwind-variants";\n\n  export const inputGroupButtonVariants = tv({\n    base: "flex items-center gap-2 text-sm shadow-none",\n    variants: {\n      size: {\n        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*=\'size-\'])]:size-3.5",\n        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",\n        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",\n        "icon-sm": "size-8 p-0 has-[>svg]:p-0",\n      },\n    },\n    defaultVariants: {\n      size: "xs",\n    },\n  });\n\n  export type InputGroupAddonVariants = Omit<ButtonProps, "size"> & {\n    /**\n     * The size of the button within the input group.\n     * @default "xs"\n     */\n    size?: VariantProps<typeof inputGroupButtonVariants>["size"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<InputGroupAddonVariants>(), {\n    size: "xs",\n    variant: "ghost",\n    type: "button",\n  });\n\n  const forwarded = reactiveOmit(props, ["size", "class"]);\n</script>\n',
      },
      {
        fileName: "InputGroup/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiInput\n    v-bind="forwarded"\n    data-slot="input-group-input"\n    :class="inputGroupInputStyles({ class: props.class })"\n  >\n    <slot />\n  </UiInput>\n</template>\n\n<script lang="ts">\n  import type { InputProps } from "@/components/Ui/Input.vue";\n\n  const inputGroupInputStyles = tv({\n    base: "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<InputProps>();\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "InputGroup/InputGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="props"\n    data-slot="input-group"\n    role="group"\n    :class="inputGroupStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const inputGroupStyles = tv({\n    base: [\n      "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",\n      "h-9 has-[>textarea]:h-auto",\n      // Variants based on alignment.\n      "has-[>[data-align=inline-start]]:[&>input]:pl-2",\n      "has-[>[data-align=inline-end]]:[&>input]:pr-2",\n      "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",\n      "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",\n      // Focus state.\n      "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",\n      // Error state.\n      "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",\n    ],\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the input group container.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "InputGroup/Text.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="forwarded"\n    data-slot="input-group-text"\n    :class="inputGroupTextStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const inputGroupTextStyles = tv({\n    base: "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n\n  export type InputGroupText = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the input group addon container.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<InputGroupText>();\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "InputGroup/Textarea.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiTextarea\n    v-bind="forwarded"\n    data-slot="input-group-textarea"\n    :class="inputGroupTextareaStyles({ class: props.class })"\n  >\n    <slot />\n  </UiTextarea>\n</template>\n\n<script lang="ts">\n  import type { TextareaProps } from "@/components/Ui/Textarea.vue";\n\n  const inputGroupTextareaStyles = tv({\n    base: "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<TextareaProps>();\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
    ],
    components: ["input", "button", "textarea"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Item",
    value: "item",
    files: [
      {
        fileName: "Item/Actions.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-actions"\n    v-bind="forwarded"\n    :class="itemActionsStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemActionsStyles = tv({\n    base: "flex items-center gap-2",\n  });\n\n  export type ItemActionsProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemActionsProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-content"\n    v-bind="forwarded"\n    :class="itemContentStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemContentStyles = tv({\n    base: "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",\n  });\n\n  export type ItemContentProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemContentProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-description"\n    v-bind="forwarded"\n    :class="itemDescriptionStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemDescriptionStyles = tv({\n    base: [\n      "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",\n      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",\n    ],\n  });\n\n  export type ItemDescriptionProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemDescriptionProps>(), {\n    as: "p",\n  });\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-footer"\n    v-bind="forwarded"\n    :class="itemFooterStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemFooterStyles = tv({\n    base: "flex basis-full items-center justify-between gap-2",\n  });\n\n  export type ItemFooterProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemFooterProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    role="list"\n    data-slot="item-group"\n    v-bind="forwarded"\n    :class="itemGroupStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemGroupStyles = tv({\n    base: "group/item-group flex flex-col",\n  });\n\n  export type ItemGroupProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemGroupProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-header"\n    v-bind="forwarded"\n    :class="itemHeaderStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemHeaderStyles = tv({\n    base: "flex basis-full items-center justify-between gap-2",\n  });\n\n  export type ItemHeaderProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemHeaderProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
      {
        fileName: "Item/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item"\n    :data-variant="variant"\n    :data-size="size"\n    v-bind="forwarded"\n    :class="itemStyles({ variant, size, class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemStyles = tv({\n    base: "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",\n\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        outline: "border-border",\n        muted: "bg-muted/50",\n      },\n      size: {\n        default: "gap-4 p-4",\n        sm: "gap-2.5 px-4 py-3",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n\n  export type ItemProps = PrimitiveProps & {\n    /**\n     * The variant of the item.\n     * @default \'default\'\n     */\n    variant?: VariantProps<typeof itemStyles>["variant"];\n    /**\n     * The size of the item.\n     * @default \'default\'\n     */\n    size?: VariantProps<typeof itemStyles>["size"];\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemProps>(), {\n    variant: "default",\n    size: "default",\n  });\n\n  const forwarded = reactiveOmit(props, ["variant", "size", "class"]);\n</script>\n',
      },
      {
        fileName: "Item/Media.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-media"\n    :data-variant="variant"\n    v-bind="forwarded"\n    :class="itemMediaStyles({ variant, class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  const itemMediaStyles = tv({\n    base: "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",\n\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*=\'size-\'])]:size-4",\n        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n\n  export type ItemMediaProps = PrimitiveProps & {\n    /**\n     * The variant of the item media.\n     * @default \'default\'\n     */\n    variant?: VariantProps<typeof itemMediaStyles>["variant"];\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemMediaProps>(), {\n    variant: "default",\n  });\n\n  const forwarded = reactiveOmit(props, ["variant", "class"]);\n</script>\n',
      },
      {
        fileName: "Item/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSeparator\n    orientation="horizontal"\n    data-slot="item-separator"\n    :decorative="props.decorative"\n    :class="itemSeparatorStyles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts">\n  import type { UiSeparatorProps } from "@/components/Ui/Separator.vue";\n\n  export const itemSeparatorStyles = tv({\n    base: "my-0",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<Omit<UiSeparatorProps, "orientation">>(), {});\n</script>\n',
      },
      {
        fileName: "Item/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="item-title"\n    v-bind="forwarded"\n    :class="itemTitleStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const itemTitleStyles = tv({\n    base: "flex w-fit items-center gap-2 text-sm leading-snug font-medium",\n  });\n\n  export type ItemTitleProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ItemTitleProps>(), {});\n\n  const forwarded = reactiveOmit(props, ["class"]);\n</script>\n',
      },
    ],
    components: ["separator"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Keyboard Key",
    value: "kbd",
    files: [
      {
        fileName: "Kbd/Kbd.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="kbd"\n    :class="styles({ size, variant, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script setup lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /**\n         * The size of the component\n         * @default "sm"\n         * */\n        size?: VariantProps<typeof styles>["size"];\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /**\n         * The variant of the component\n         * @default "solid"\n         * */\n        variant?: VariantProps<typeof styles>["variant"];\n      }\n    >(),\n    {\n      as: "kbd",\n      size: "sm",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "size");\n\n  const styles = tv({\n    base: [\n      "pointer-events-none inline-flex w-fit min-w-5 items-center justify-center gap-1 rounded-sm font-sans font-medium select-none",\n      "[&_svg:not([class*=\'size-\'])]:size-3",\n    ],\n    variants: {\n      size: {\n        xs: "h-4 px-1 text-[11px]",\n        sm: "h-5 px-1 text-xs",\n        md: "h-[22px] px-1 text-sm",\n      },\n      variant: {\n        solid: "bg-muted text-foreground/80",\n        outline: "border bg-transparent",\n      },\n    },\n    defaultVariants: {\n      size: "sm",\n      variant: "solid",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Kbd/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="kbd-group"\n    v-bind="forwarded"\n    :class="kbdGroupStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const kbdGroupStyles = tv({\n    base: "inline-flex items-center gap-1",\n  });\n\n  export type KbdGroupProps = PrimitiveProps & {\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<KbdGroupProps>(), {});\n  const forwarded = reactiveOmit(props, "class");\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Label",
    value: "label",
    files: [
      {
        fileName: "Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Label data-slot="label" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n    <slot name="hint">\n      <span v-if="hint" data-slot="label-hint" class="text-xs font-normal text-muted-foreground">\n        {{ hint }}\n      </span>\n    </slot>\n  </Label>\n</template>\n\n<script lang="ts">\n  import { Label } from "reka-ui";\n  import type { LabelProps as LP } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type LabelProps = LP & {\n    /** Custom class(es) to add to the label */\n    class?: HTMLAttributes["class"];\n    /**\n     * Optional hint text to display alongside the label.\n     */\n    hint?: string;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<LabelProps>();\n\n  const forwarded = reactiveOmit(props, "class", "hint");\n\n  const styles = tv({\n    base: "flex items-center justify-between gap-2 text-sm leading-none font-medium select-none not-peer-disabled:cursor-pointer group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "List",
    value: "list",
    files: [
      {
        fileName: "List/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-1 leading-none",\n  });\n</script>\n',
      },
      {
        fileName: "List/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <component\n    :is="eltype"\n    :href="href"\n    :to="to"\n    :class="\n      styles({\n        hover: Boolean(onClick) || Boolean(to) || Boolean(href),\n        class: props.class,\n      })\n    "\n    @click="onClick"\n  >\n    <slot />\n  </component>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    /**Custom class(es) to add to the element */\n    class?: HTMLAttributes["class"];\n    /** Function called when the item is clicked */\n    onClick?: () => void;\n    /** The location that the item should navigate to when clicked */\n    to?: string;\n    /** The href for the `a` tag */\n    href?: string;\n  }>();\n\n  const styles = tv({\n    base: "flex w-full items-center gap-5 px-4 py-2",\n    variants: {\n      hover: {\n        true: "cursor-pointer outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary/10",\n      },\n    },\n  });\n\n  const eltype = computed(() => {\n    if (props.to || props.href) return resolveComponent("NuxtLink");\n    if (props.onClick) return "button";\n    return "li";\n  });\n</script>\n',
      },
      {
        fileName: "List/List.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "ul",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "w-full py-2",\n  });\n</script>\n',
      },
      {
        fileName: "List/Subtitle.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ subtitle }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The subtitle of the component */\n        subtitle?: string;\n      }\n    >(),\n    {\n      as: "p",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "subtitle");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "List/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The title of the component */\n        title?: string;\n      }\n    >(),\n    {\n      as: "p",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "font-semibold",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Listbox",
    value: "listbox",
    files: [
      {
        fileName: "Listbox/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxContent\n    data-slot="listbox-content"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ListboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxContent, useForwardProps } from "reka-ui";\n  import type { ListboxContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>();\n  const forwarded = useForwardProps(reactiveOmit(props));\n\n  const styles = tv({\n    base: "max-h-[300px] w-full overflow-y-auto rounded-md border bg-popover px-3 py-1.5",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Filter.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxFilter\n    data-slot="listbox-filter"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { ListboxFilter, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxFilterEmits, ListboxFilterProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ListboxFilterProps & { class?: HTMLAttributes["class"]; placeholder?: string }\n  >();\n  const emits = defineEmits<ListboxFilterEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: [\n      "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",\n      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",\n      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxGroup data-slot="listbox-group" v-bind="forwarded">\n    <slot />\n  </ListboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxGroup, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxGroupProps } from "reka-ui";\n\n  const props = defineProps<ListboxGroupProps>();\n  const forwarded = useForwardPropsEmits(props);\n</script>\n',
      },
      {
        fileName: "Listbox/GroupLabel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxGroupLabel\n    data-slot="listbox-group-label"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ListboxGroupLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxGroupLabel, useForwardProps } from "reka-ui";\n  import type { ListboxGroupLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<ListboxGroupLabelProps & { class?: HTMLAttributes["class"] }>();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "py-1.5 pr-8 pl-1 text-sm font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxItem data-slot="listbox-item" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">\n      <UiListboxItemIndicator :icon="icon" />\n    </span>\n  </ListboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxItem, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxItemEmits, ListboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ListboxItemProps & {\n      class?: HTMLAttributes["class"];\n      icon?: string;\n    }\n  >();\n  const emits = defineEmits<ListboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emits);\n\n  const styles = tv({\n    base: "relative flex w-full cursor-pointer items-center rounded-sm py-2 pr-8 pl-3 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:ring-1 data-[highlighted]:ring-border",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxItemIndicator data-slot="listbox-indicator" v-bind="forwarded">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:check\'" />\n    </slot>\n  </ListboxItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxItemIndicator, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxItemIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ListboxItemIndicatorProps & { class?: HTMLAttributes["class"]; icon?: string }\n  >();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "size-4 shrink-0 text-primary",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Listbox.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxRoot\n    v-slot="{ modelValue }"\n    data-slot="listbox"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :model-value="modelValue" />\n  </ListboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ListboxRootEmits, ListboxRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<ListboxRootProps & { class?: HTMLAttributes["class"] }>();\n  const emits = defineEmits<ListboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex flex-col gap-4",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Virtualizer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ListboxVirtualizer\n    v-slot="{ option }"\n    data-slot="listbox-virtualizer"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :option="option" />\n  </ListboxVirtualizer>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxVirtualizer, useForwardProps } from "reka-ui";\n  import type { ListboxVirtualizerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<ListboxVirtualizerProps & { class?: HTMLAttributes["class"] }>();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Loader",
    value: "loader",
    files: [
      {
        fileName: "Loader.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <AnimatePresence>\n    <motion.div\n      v-if="fullPage && open"\n      :initial="{ opacity: 0 }"\n      :animate="{ opacity: 1 }"\n      :exit="{ opacity: 0, scale: 0.95 }"\n      :class="loaderStyles().backdrop({ class: backdropClass, fullPage })"\n    >\n      <Icon :class="loaderStyles().icon({ class: props.class })" :name="props.icon" />\n      <slot :open>{{ text }}</slot>\n    </motion.div>\n    <motion.div\n      v-if="!fullPage && open"\n      :initial="{ opacity: 0 }"\n      :exit="{ opacity: 0 }"\n      :animate="{ opacity: 1 }"\n      :transition="{ duration: 0.5 }"\n      :class="loaderStyles().backdrop({ class: props.backdropClass, fullPage })"\n    >\n      <Icon :class="loaderStyles().icon({ class: props.class })" :name="props.icon" />\n      <slot :open>{{ text }}</slot>\n    </motion.div>\n  </AnimatePresence>\n</template>\n\n<script lang="ts">\n  import { useMagicKeys } from "@vueuse/core";\n  import { AnimatePresence, motion } from "motion-v";\n  import { useBodyScrollLock } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  export type LoaderProps = PrimitiveProps & {\n    /**\n     * The icon to display in the loader.\n     *\n     * @default "svg-spinners:bars-rotate-fade"\n     */\n    icon?: string;\n    /**\n     * The class to apply to the loader Icon\n     */\n    class?: HtmlHTMLAttributes["class"];\n    /**\n     * The class to apply to the backdrop\n     */\n    backdropClass?: HtmlHTMLAttributes["class"];\n    /**\n     * Whether the loader should take up the full page.\n     *\n     * When this is `true`, the loader will be displayed in a fixed position that covers the entire page. You can press the `esc` key to close the loader.\n     */\n    fullPage?: boolean;\n    /**\n     * Whether to lock the scroll when the loader is open.\n     *\n     * @default true\n     */\n    lockScroll?: boolean;\n    /**\n     * The role of the component.\n     *\n     * @default "progressbar"\n     */\n    role?: string;\n    /**\n     * The text to display in the loader.\n     *\n     * This is displayed below the loader icon.\n     */\n    text?: string;\n    /**\n     * Whether to close the loader when the `esc` key is pressed.\n     *\n     * @default true\n     */\n    closeOnEscape?: boolean;\n  };\n\n  export const loaderStyles = tv({\n    slots: {\n      icon: "size-5",\n      backdrop: "flex flex-col items-center justify-center gap-3",\n    },\n    variants: {\n      fullPage: {\n        true: {\n          backdrop:\n            "pointer-events-auto fixed inset-0 z-[999] size-full bg-background/80 backdrop-blur-md",\n        },\n        false: {\n          backdrop: "relative",\n        },\n      },\n    },\n  });\n</script>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(defineProps<LoaderProps>(), {\n    icon: "svg-spinners:bars-rotate-fade",\n    role: "progressbar",\n    closeOnEscape: true,\n  });\n\n  const open = defineModel<boolean>({ default: true });\n  const isLocked = useBodyScrollLock();\n\n  const { escape } = useMagicKeys();\n\n  watchEffect(() => {\n    if (props.fullPage && open.value && escape?.value && props.closeOnEscape) {\n      open.value = false;\n    }\n    if (props.lockScroll && !open.value) {\n      isLocked.value = false;\n    }\n    if (props.lockScroll && open.value) {\n      isLocked.value = true;\n    }\n  });\n</script>\n',
      },
    ],
    devDeps: ["@iconify-json/svg-spinners"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Menubar",
    value: "menubar",
    files: [
      {
        fileName: "Menubar/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarArrow v-bind="props" />\n</template>\n\n<script lang="ts" setup>\n  import { MenubarArrow } from "reka-ui";\n  import type { MenubarArrowProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<MenubarArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/CheckboxItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarCheckboxItem\n    data-slot="menubar-checkbox-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">\n      <UiMenubarItemIndicator>\n        <Icon :name="icon || \'lucide:check\'" />\n      </UiMenubarItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n    <slot name="shortcut">\n      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>\n    </slot>\n  </MenubarCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarCheckboxItem, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarCheckboxItemProps & {\n      icon?: string;\n      class?: HTMLAttributes["class"];\n      title?: string;\n      shortcut?: string;\n    }\n  >();\n  const emits = defineEmits<MenubarCheckboxItemEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "class", "title", "shortcut"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarContent\n      data-slot="menubar-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </MenubarContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarContent, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarContentProps, MenubarSubContentEmits } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      MenubarContentProps & {\n        to?: string | HTMLElement;\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      loop: true,\n      side: "bottom",\n      sideOffset: 8,\n      align: "start",\n      alignOffset: -4,\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[12rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarGroup data-slot="menubar-group" v-bind="props">\n    <slot />\n  </MenubarGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarGroup } from "reka-ui";\n  import type { MenubarGroupProps } from "reka-ui";\n\n  const props = defineProps<MenubarGroupProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarItem\n    data-slot="menubar-item"\n    v-bind="forwarded"\n    :data-inset="inset"\n    :data-variant="variant"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" class="size-4" />\n      </slot>\n      <slot name="title">\n        <span v-if="title" data-slot="menubar-item-title">{{ title }}</span>\n      </slot>\n    </slot>\n    <slot name="shortcut">\n      <UiMenubarShortcut v-if="shortcut" data-slot="menubar-item-shortcut">{{\n        shortcut\n      }}</UiMenubarShortcut>\n    </slot>\n  </MenubarItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarItem, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarItemEmits, MenubarItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarItemProps & {\n      inset?: boolean;\n      class?: HTMLAttributes["class"];\n      shortcut?: string;\n      title?: string;\n      icon?: string;\n      variant?: "default" | "destructive";\n    }\n  >();\n\n  const emits = defineEmits<MenubarItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon", "variant"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset=true]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="size-4" />\n    </slot>\n  </MenubarItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarItemIndicator } from "reka-ui";\n  import type { MenubarItemIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      /** The class(es) to apply to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex shrink-0 items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarLabel\n    data-slot="menubar-label"\n    :class="styles({ inset, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </MenubarLabel>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarLabel } from "reka-ui";\n  import type { MenubarLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarLabelProps & {\n      class?: HTMLAttributes["class"];\n      inset?: boolean;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset");\n  const styles = tv({\n    base: "px-2 py-1.5 text-sm font-medium data-[inset=true]:pl-8",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Menu.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarMenu data-slot="menubar-menu" v-bind="props">\n    <slot />\n  </MenubarMenu>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarMenu } from "reka-ui";\n  import type { MenubarMenuProps } from "reka-ui";\n\n  const props = defineProps<MenubarMenuProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/Menubar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarRoot data-slot="menubar" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </MenubarRoot>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRoot, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarRootEmits, MenubarRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      MenubarRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<MenubarRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarPortal data-slot="menubar-portal" v-bind="props">\n    <slot />\n  </MenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import type { MenubarPortalProps } from "reka-ui";\n\n  const props = defineProps<MenubarPortalProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/RadioGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarRadioGroup data-slot="menubar-radio-group" v-bind="forwarded">\n    <slot />\n  </MenubarRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRadioGroup, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from "reka-ui";\n\n  const props = defineProps<MenubarRadioGroupProps>();\n  const emits = defineEmits<MenubarRadioGroupEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Menubar/RadioItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarRadioItem\n    data-slot="menubar-radio-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">\n      <UiMenubarItemIndicator>\n        <Icon v-if="icon" :name="icon" class="size-4" />\n        <Icon v-else name="ph:circle-fill" class="size-2" />\n      </UiMenubarItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </MenubarRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRadioItem, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarRadioItemEmits, MenubarRadioItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarRadioItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** The icon to display */\n      icon?: string;\n      /** The title of the component */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<MenubarRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarSeparator\n    data-slot="menubar-separator"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSeparator } from "reka-ui";\n  import type { MenubarSeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Shortcut.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="menubar-shortcut"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    { as: "span" }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Sub.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarSub data-slot="menubar-sub" v-bind="forwarded">\n    <slot />\n  </MenubarSub>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSub, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarSubEmits, MenubarSubProps } from "reka-ui";\n\n  const props = defineProps<MenubarSubProps>();\n  const emits = defineEmits<MenubarSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Menubar/SubContent.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarSubContent\n      data-slot="menubar-sub-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </MenubarSubContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubContent, useForwardPropsEmits } from "reka-ui";\n  import type { MenubarSubContentEmits, MenubarSubContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      MenubarSubContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** The target element to portal the component to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      loop: true,\n      sideOffset: 5,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/SubTrigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarSubTrigger\n    data-slot="menubar-sub-trigger"\n    v-bind="forwarded"\n    :data-inset="inset"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="size-4" />\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon\n      class="ml-auto size-4 text-muted-foreground"\n      :name="trailingIcon || \'lucide:chevron-right\'"\n    />\n  </MenubarSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubTrigger } from "reka-ui";\n  import type { MenubarSubTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarSubTriggerProps & {\n      class?: HTMLAttributes["class"];\n      inset?: boolean;\n      icon?: string;\n      title?: string;\n      trailingIcon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");\n  const styles = tv({\n    base: "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[inset=true]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <MenubarTrigger\n    data-slot="menubar-trigger"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </MenubarTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarTrigger } from "reka-ui";\n  import type { MenubarTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    MenubarTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Native Select",
    value: "native-select",
    files: [
      {
        fileName: "NativeSelect.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="relative flex">\n    <select\n      :id="id"\n      ref="select"\n      v-model="localModel"\n      data-slot="native-select"\n      :multiple="multiple"\n      :name="name"\n      :size="size"\n      :placeholder="placeholder"\n      :disabled="disabled"\n      :required="required"\n      v-bind="$attrs"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </select>\n    <span\n      v-if="!multiple"\n      class="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50 peer-aria-invalid:text-destructive/80"\n    >\n      <slot name="trailingIcon">\n        <Icon :name="trailingIcon || \'lucide:chevron-down\'" class="size-4" aria-hidden="true" />\n      </slot>\n    </span>\n  </div>\n</template>\n\n<script lang="ts" setup generic="T extends any">\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n    id?: string;\n    name?: string;\n    placeholder?: string;\n    disabled?: boolean;\n    required?: boolean;\n    modelValue?: any;\n    multiple?: boolean;\n    size?: number;\n    autofocus?: boolean;\n    trailingIcon?: string;\n  }>();\n  const styles = tv({\n    base: "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-md border border-input bg-transparent text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",\n    variants: {\n      multiple: {\n        true: "py-1 *:px-3 *:py-1 [&_option:checked]:bg-accent",\n        false: "h-9 ps-3 pe-8",\n      },\n    },\n  });\n\n  defineOptions({ inheritAttrs: false });\n  const select = ref<HTMLSelectElement | null>(null);\n  defineEmits<{ "update:modelValue": [value: T] }>();\n  const localModel = defineModel<T>();\n\n  onMounted(() => {\n    if (props.autofocus) {\n      select.value?.focus();\n    }\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Nav",
    value: "nav",
    files: [
      {
        fileName: "Nav/Gap.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({ base: "mx-2" });\n</script>\n',
      },
      {
        fileName: "Nav/Inset.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-navbar-inset="true" :class="styles({ class: props.class })" v-bind="forwarded">\n    <div\n      class="grow bg-background p-6 md:rounded-lg md:p-12 md:shadow-xs md:ring-1 md:ring-foreground/15 md:dark:bg-background md:dark:ring-border"\n    >\n      <div class="mx-auto max-w-7xl">\n        <slot />\n      </div>\n    </div>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: ["flex flex-1 flex-col bg-background pb-2 md:px-2"],\n  });\n</script>\n',
      },
      {
        fileName: "Nav/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NuxtLink\n    v-bind="forwarded"\n    data-slot="navbar-item"\n    :class="styles().wrapper({ class: props.class })"\n  >\n    <slot />\n    <span data-navbar="current-indicator" :class="styles().indicator()" />\n  </NuxtLink>\n</template>\n\n<script lang="ts" setup>\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    Omit<NuxtLinkProps, "noPrefetch"> & {\n      /** custom t\\class(es) to add to the link */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    slots: {\n      wrapper: [\n        "group/sidebar-item hover:bg-secondary",\n        "aria-[current=page]:text-foreground aria-[current=page]*:data-[slot=icon]:text-foreground",\n        "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid md:supports-[grid-template-columns:subgrid]:grid-cols-none",\n        "relative min-w-0 items-center gap-x-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5 md:gap-x-2.5",\n        "*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-muted-foreground sm:*:data-[slot=icon]:size-4",\n        "*:data-[slot=loader]:size-5 *:data-[slot=loader]:shrink-0 sm:*:data-[slot=loader]:size-4",\n        "*:not-nth-2:last:data-[slot=icon]:row-start-1 *:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",\n        "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5",\n        "pressed:*:data-[slot=icon]:text-foreground *:data-[slot=icon]:text-muted-foreground hover:*:data-[slot=icon]:text-foreground",\n        "outline-hidden focus-visible:ring-2 focus-visible:inset-ring focus-visible:ring-ring/20 focus-visible:inset-ring-ring",\n        "text-left disabled:cursor-default disabled:opacity-50",\n      ],\n      indicator: [\n        "hidden group-aria-[current=page]/sidebar-item:inline-block",\n        "absolute rounded-full bg-foreground [--gutter:--spacing(0.5)]",\n        "inset-y-2 -left-4 w-(--gutter) md:inset-y-auto md:w-auto",\n        "md:inset-x-2 md:-bottom-[--spacing(3.4)] md:h-(--gutter) md:group-data-[navbar=inset]/navbar-intent:-bottom-[--spacing(3.1)]",\n      ],\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Nav/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })" data-slot="navbar-label">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({ base: "col-start-2 row-start-1 truncate" });\n</script>\n',
      },
      {
        fileName: "Nav/Mobile.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="navbar-mobile" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: [\n      "group/navbar-mobile flex items-center gap-x-3 px-4 py-2.5 md:hidden",\n      "group-has-data-navbar-sticky/navbar:sticky group-has-data-navbar-sticky/navbar:top-0 group-has-data-navbar-sticky/navbar:border-b group-has-data-navbar-sticky/navbar:bg-background",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "Nav/Nav.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div v-if="injectedValues.isMobile.value">\n    <span class="sr-only" aria-hidden :data-navbar="intent" :data-navbar-sticky="isSticky" />\n    <UiSheet\n      :open="injectedValues.open.value"\n      @update:open="(value) => (injectedValues.open.value = value)"\n    >\n      <UiSheetContent :side="side" aria-label="Mobile Navbar" class="p-4">\n        <VisuallyHidden>\n          <DialogTitle>Mobile Navbar</DialogTitle>\n          <DialogDescription>Navigation menu for mobile devices</DialogDescription>\n        </VisuallyHidden>\n        <slot />\n      </UiSheetContent>\n    </UiSheet>\n  </div>\n  <div\n    v-else\n    ref="navRef"\n    :data-navbar="intent"\n    :data-navbar-sticky="isSticky"\n    :class="styles().wrapper({ intent, isSticky, class: wrapperClass })"\n  >\n    <div data-navbar="child" :class="styles().child({ intent, class: childClass })">\n      <div data-navbar="content" :class="styles().content({ intent, class: innerClass })">\n        <slot />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  import { navProviderKey } from "./Provider.vue";\n\n  export type NavbarProps = {\n    /** Custom class(es) to add to the wrapper element */\n    wrapperClass?: HTMLAttributes["class"];\n    /** Custom class(es) to add to the child element */\n    childClass?: HTMLAttributes["class"];\n    /** Custom class(es) to add to the inner element */\n    innerClass?: HTMLAttributes["class"];\n    intent?: "default" | "float" | "inset";\n    isSticky?: boolean;\n    side?: "left" | "right";\n  };\n</script>\n\n<script lang="ts" setup>\n  const injectedValues = inject(navProviderKey);\n\n  if (!injectedValues) {\n    throw createError({\n      statusCode: 500,\n      message: "Nav context not found. Make sure to wrap your component with <NavProvider>.",\n    });\n  }\n\n  const navRef = useTemplateRef("navRef");\n\n  defineExpose({ navRef });\n\n  withDefaults(defineProps<NavbarProps>(), {\n    intent: "default",\n    side: "left",\n  });\n\n  const styles = tv({\n    slots: {\n      wrapper: "group/navbar-intent relative isolate",\n      child: "relative isolate hidden md:block",\n      content: "mx-auto w-full max-w-(--breakpoint-2xl) items-center py-2.5 md:flex",\n    },\n    variants: {\n      intent: {\n        default: { child: "border-b bg-background px-6" },\n        float: {\n          wrapper: "md:px-22 md:pt-10",\n          child:\n            "*:data-[navbar=content]:max-w-7xl *:data-[navbar=content]:rounded-xl *:data-[navbar=content]:border *:data-[navbar=content]:bg-background *:data-[navbar=content]:px-4 *:data-[navbar=content]:shadow-xs",\n        },\n        inset: { child: "px-6" },\n      },\n      isSticky: {\n        true: {\n          wrapper: "sticky top-0 z-40",\n        },\n      },\n    },\n    defaultVariants: {\n      intent: "default",\n      isSticky: false,\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Nav/Provider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="nav-provider"\n    :data-state="open ? \'open\' : \'closed\'"\n    v-bind="forwarded"\n    :class="navProviderStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes, ModelRef } from "vue";\n\n  export interface NavContextProps {\n    open: Ref<boolean>;\n    isMobile: Ref<boolean>;\n    toggleNavbar: () => void;\n  }\n\n  export type NavProviderProps = PrimitiveProps & {\n    /** Custom class(es) to add to the element */\n    class?: HTMLAttributes["class"];\n    /**\n     * The controlled open state of the nav component.\n     */\n    modelValue?: boolean;\n    /**\n     * A function to call when the nav is opened\n     */\n    onOpenChange?: (open: boolean) => void;\n  };\n\n  /**\n   * Injection key for the NavProvider.\n   *\n   * This key is used to provide and inject the navigation state\n   * and methods throughout the application.\n   */\n  export const navProviderKey = Symbol() as InjectionKey<{\n    open: ModelRef<boolean, string, boolean, boolean>;\n    isMobile: ComputedRef<boolean>;\n    toggleNav: () => void;\n  }>;\n\n  export const navProviderStyles = tv({\n    base: [\n      "peer/navbar group/navbar @container/nav-provider relative isolate z-10 flex w-full flex-col",\n      "has-data-navbar-inset:min-h-svh has-data-navbar-inset:bg-background dark:has-data-navbar-inset:bg-background",\n    ],\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<NavProviderProps>(), {\n    as: "div",\n    onOpenChange: () => {},\n  });\n\n  const forwarded = reactiveOmit(props, "class", "modelValue", "onOpenChange");\n  /** Open state for the navigation */\n  const open = defineModel<boolean>({ default: false });\n  /** Mobile state for the navigation */\n  const isMobile = useMediaQuery("(max-width: 767px)"); /** Toggle the navigation state */\n  const toggleNav = () => (open.value = !open.value);\n  // Watch for changes in the open state and emit the model change event\n  // if the onOpenChange prop is provided.\n  watch(open, (v) => {\n    if (props.onOpenChange) {\n      props.onOpenChange(v);\n    }\n  });\n\n  provide(navProviderKey, {\n    open,\n    isMobile,\n    toggleNav,\n  });\n</script>\n',
      },
      {
        fileName: "Nav/Section.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" data-slot="navbar-section" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const styles = tv({\n    base: "col-span-full grid grid-cols-[auto_1fr] flex-col gap-3 gap-y-0.5 md:flex md:flex-none md:grid-cols-none md:flex-row md:items-center md:gap-2.5",\n  });\n\n  const forwarded = reactiveOmit(props, "class");\n</script>\n',
      },
      {
        fileName: "Nav/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSeparator orientation="vertical" v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    /** Custom class(es) to add to the element */\n    class?: HTMLAttributes["class"];\n  }>();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({ base: "h-5" });\n</script>\n',
      },
      {
        fileName: "Nav/Spacer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({ base: "-ml-4 flex-1" });\n</script>\n',
      },
      {
        fileName: "Nav/Start.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /** Custom class(es) to add to the element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({ base: "p-2 py-4 md:p-2" });\n</script>\n',
      },
      {
        fileName: "Nav/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiButton\n    data-slot="navbar-trigger"\n    variant="ghost"\n    :aria-label="ariaLabel"\n    size="icon-sm"\n    :class="styles({ class: props.class })"\n    @click="\n      ($event: MouseEvent) => {\n        injectedValues?.toggleNav();\n        props.onClick?.($event);\n      }\n    "\n  >\n    <Icon :name="icon" />\n    <span class="sr-only">Toggle Navbar</span>\n  </UiButton>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  import { navProviderKey } from "./Provider.vue";\n\n  const injectedValues = inject(navProviderKey);\n\n  if (!injectedValues) {\n    throw createError({\n      statusCode: 500,\n      message: "Nav context not found. Make sure to wrap your component with <NavProvider>.",\n    });\n  }\n\n  const props = withDefaults(\n    defineProps<{\n      ariaLabel?: string;\n      class?: HTMLAttributes["class"];\n      onClick?: (event: MouseEvent) => void;\n      icon?: string;\n    }>(),\n    {\n      ariaLabel: "Toggle Navbar",\n      icon: "lucide:menu",\n    }\n  );\n\n  const styles = tv({\n    base: "-ml-2 min-lg:hidden",\n  });\n</script>\n',
      },
    ],
    components: ["separator", "sheet", "button"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Navbar",
    value: "navbar",
    files: [
      {
        fileName: "Navbar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :class="styles({ sticky, class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** Whether the navbar should be sticky */\n        sticky?: boolean;\n      }\n    >(),\n    {\n      as: "header",\n    }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class", "sticky"));\n\n  const styles = tv({\n    base: "z-20 border-b bg-background/90 backdrop-blur",\n    variants: {\n      sticky: {\n        true: "sticky top-0",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Navigation Menu",
    value: "navigation-menu",
    files: [
      {
        fileName: "NavigationMenu/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuContent\n    data-slot="navigation-menu-content"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </NavigationMenuContent>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuContent, useForwardPropsEmits } from "reka-ui";\n  import type { NavigationMenuContentEmits, NavigationMenuContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    NavigationMenuContentProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const emits = defineEmits<NavigationMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: [\n      "top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto",\n      "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuIndicator\n    data-slot="navigation-menu-indicator"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />\n  </NavigationMenuIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuIndicator } from "reka-ui";\n  import type { NavigationMenuIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    NavigationMenuIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuItem\n    :class="styles({ class: props.class })"\n    data-slot="navigation-menu-item"\n    v-bind="props"\n  >\n    <slot />\n  </NavigationMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuItem } from "reka-ui";\n  import type { NavigationMenuItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({ base: "relative" });\n\n  const props = defineProps<\n    NavigationMenuItemProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Link.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuLink\n    :class="styles({ class: props.class })"\n    data-slot="navigation-menu-link"\n    v-bind="forwarded"\n  >\n    <slot />\n  </NavigationMenuLink>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuLink, useForwardPropsEmits } from "reka-ui";\n  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    NavigationMenuLinkProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const emits = defineEmits<NavigationMenuLinkEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n  const styles = tv({\n    base: "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/List.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuList\n    data-slot="navigation-menu-list"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </NavigationMenuList>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuList } from "reka-ui";\n  import type { NavigationMenuListProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    NavigationMenuListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "group flex flex-1 list-none items-center justify-center gap-1",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/NavigationMenu.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuRoot\n    data-slot="navigation-menu"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n    :data-viewport="viewport"\n  >\n    <slot />\n    <slot name="viewport">\n      <UiNavigationMenuViewport v-if="viewport" />\n    </slot>\n  </NavigationMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuRoot, useForwardPropsEmits } from "reka-ui";\n  import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      NavigationMenuRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        viewport?: boolean;\n      }\n    >(),\n    {\n      viewport: true,\n    }\n  );\n  const emits = defineEmits<NavigationMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Sub.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuSub data-slot="navigation-menu-sub" v-bind="forwarded">\n    <slot />\n  </NavigationMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuSub, useForwardPropsEmits } from "reka-ui";\n  import type { NavigationMenuSubEmits, NavigationMenuSubProps } from "reka-ui";\n\n  const props = defineProps<NavigationMenuSubProps>();\n  const emits = defineEmits<NavigationMenuSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NavigationMenuTrigger\n    data-slot="navigation-menu-trigger"\n    v-bind="forwarded"\n    :class="navigationMenuTriggerStyle({ class: props.class })"\n  >\n    <slot>{{ title }}</slot>\n    <slot name="icon">\n      <Icon\n        :name="icon || \'lucide:chevron-down\'"\n        class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"\n        aria-hidden="true"\n      />\n    </slot>\n  </NavigationMenuTrigger>\n</template>\n\n<script lang="ts">\n  import { NavigationMenuTrigger } from "reka-ui";\n  import type { NavigationMenuTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const navigationMenuTriggerStyle = tv({\n    base: "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<\n    NavigationMenuTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Icon to show */\n      icon?: string;\n      /** Title to show */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon", "title");\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Viewport.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="absolute top-full left-0 isolate z-50 flex justify-center">\n    <NavigationMenuViewport\n      data-slot="navigation-menu-viewport"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuViewport } from "reka-ui";\n  import type { NavigationMenuViewportProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    NavigationMenuViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "origin-top-center relative mt-1.5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--reka-navigation-menu-viewport-width)]",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Neon Gradient Card",
    value: "neon-gradient-card",
    files: [
      {
        fileName: "NeonGradientCard.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    ref="containerRef"\n    :style="\n      {\n        \'--border-size\': `${borderSize}px`,\n        \'--border-radius\': `${borderRadius}px`,\n        \'--neon-first-color\': neonColors.firstColor,\n        \'--neon-second-color\': neonColors.secondColor,\n        \'--card-width\': `${dimensions.width}px`,\n        \'--card-height\': `${dimensions.height}px`,\n        \'--card-content-radius\': `${borderRadius - borderSize}px`,\n        \'--pseudo-element-background-image\': `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,\n        \'--pseudo-element-width\': `${dimensions.width + borderSize * 2}px`,\n        \'--pseudo-element-height\': `${dimensions.height + borderSize * 2}px`,\n        \'--after-blur\': `${dimensions.width / 3}px`,\n      } as CSSProperties\n    "\n    :class="neonGradientCardStyles().wrapper({ class: props.class })"\n  >\n    <div :class="neonGradientCardStyles().inner()">\n      <slot />\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { CSSProperties, HTMLAttributes } from "vue";\n\n  export interface NeonColorsProps {\n    firstColor: string;\n    secondColor: string;\n  }\n\n  export interface NeonGradientCardProps extends PrimitiveProps {\n    /**\n     * @default ""\n     * @type string\n     * @description\n     * The className of the card\n     */\n    class?: HTMLAttributes["class"];\n\n    /**\n     * @default 5\n     * @type number\n     * @description\n     * The size of the border in pixels\n     * */\n    borderSize?: number;\n\n    /**\n     * @default 20\n     * @type number\n     * @description\n     * The size of the radius in pixels\n     * */\n    borderRadius?: number;\n\n    /**\n     * @default "{ firstColor: \'#ff00aa\', secondColor: \'#00FFF1\' }"\n     * @type string\n     * @description\n     * The colors of the neon gradient\n     * */\n    neonColors?: NeonColorsProps;\n\n    [key: string]: any;\n  }\n\n  export const neonGradientCardStyles = tv({\n    slots: {\n      wrapper: "relative z-10 size-full rounded-[var(--border-radius)]",\n      inner: [\n        "relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-gray-100 p-6",\n        "before:absolute before:-top-[var(--border-size)] before:-left-[var(--border-size)] before:-z-10 before:block",\n        "before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-[\'\']",\n        "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]",\n        "before:animate-background-position-spin",\n        "after:absolute after:-top-[var(--border-size)] after:-left-[var(--border-size)] after:-z-10 after:block",\n        "after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-[\'\']",\n        "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80",\n        "after:animate-background-position-spin",\n        "dark:bg-neutral-900",\n      ],\n    },\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<NeonGradientCardProps>(), {\n    borderSize: 2,\n    borderRadius: 20,\n    neonColors: () => ({\n      firstColor: "#ff00aa",\n      secondColor: "#00FFF1",\n    }),\n  });\n\n  const containerRef = useTemplateRef("containerRef");\n  const dimensions = ref({ width: 0, height: 0 });\n\n  const updateDimensions = () => {\n    if (containerRef.value) {\n      const { offsetWidth, offsetHeight } = containerRef.value;\n      dimensions.value = { width: offsetWidth, height: offsetHeight };\n    }\n  };\n\n  useEventListener("resize", updateDimensions);\n\n  onMounted(() => {\n    updateDimensions();\n  });\n  watchEffect(updateDimensions);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Number Field",
    value: "number-field",
    deps: ["@internationalized/number"],
    files: [
      {
        fileName: "NumberField/Decrement.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NumberFieldDecrement\n    data-slot="number-field-decrement"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon :name="props.icon" />\n    </slot>\n  </NumberFieldDecrement>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldDecrement, useForwardProps } from "reka-ui";\n  import type { NumberFieldDecrementProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldDecrementProps & {\n        class?: HTMLAttributes["class"];\n        icon?: string;\n      }\n    >(),\n    { icon: "lucide:minus" }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/Increment.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NumberFieldIncrement\n    data-slot="number-field-increment"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon :name="props.icon" />\n    </slot>\n  </NumberFieldIncrement>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldIncrement, useForwardProps } from "reka-ui";\n  import type { NumberFieldIncrementProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldIncrementProps & {\n        class?: HTMLAttributes["class"];\n        icon?: string;\n      }\n    >(),\n    { icon: "lucide:plus" }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NumberFieldInput\n    data-slot="number-field-input"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldInput, useForwardProps } from "reka-ui";\n  import type { NumberFieldInputProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldInputProps & {\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {}\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "h-full w-full grow bg-transparent text-center text-sm placeholder:text-muted-foreground/80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/NumberField.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <NumberFieldRoot\n    v-slot="rootSlotProps"\n    data-slot="number-field"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="rootSlotProps">\n      <slot name="decrement">\n        <UiNumberFieldDecrement />\n      </slot>\n      <slot name="input">\n        <UiNumberFieldInput />\n      </slot>\n      <slot name="increment">\n        <UiNumberFieldIncrement />\n      </slot>\n    </slot>\n  </NumberFieldRoot>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldRoot, useForwardPropsEmits } from "reka-ui";\n  import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldRootProps & {\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {}\n  );\n\n  const emit = defineEmits<NumberFieldRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "flex h-9 w-full items-center gap-1 rounded-md border border-input bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Pagination",
    value: "pagination",
    files: [
      {
        fileName: "Pagination/Ellipsis.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationEllipsis data-slot="pagination-ellipsis" v-bind="forwarded">\n    <slot>\n      <div v-if="icon" class="flex size-9 items-center justify-center hover:bg-transparent">\n        <Icon :name="icon" />\n      </div>\n    </slot>\n  </PaginationEllipsis>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationEllipsis } from "reka-ui";\n  import type { PaginationEllipsisProps } from "reka-ui";\n\n  const props = defineProps<\n    PaginationEllipsisProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/First.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationFirst\n    data-slot="pagination-first"\n    aria-label="Go to the first page"\n    v-bind="forwarded"\n  >\n    <slot>\n      <UiButton v-if="icon" :variant :size>\n        <span class="sr-only">First page</span>\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationFirst>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationFirst } from "reka-ui";\n  import type { ButtonProps } from "~/components/Ui/Button.vue";\n  import type { PaginationFirstProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationFirstProps & {\n        /** Icon to show */\n        icon?: string;\n        /** The variant of the button */\n        variant?: ButtonProps["variant"];\n        /** The size of the button */\n        size?: ButtonProps["size"];\n      }\n    >(),\n    {\n      variant: "ghost",\n      size: "icon-sm",\n    }\n  );\n  const forwarded = reactiveOmit(props, "icon", "variant", "size");\n</script>\n',
      },
      {
        fileName: "Pagination/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationListItem data-slot="pagination-item" v-bind="props">\n    <slot>\n      <UiButton\n        :variant\n        :size\n        class="data-[selected=true]:border-transparent! data-[selected=true]:bg-primary! data-[selected=true]:text-primary-foreground!"\n      >\n        {{ value }}\n      </UiButton>\n    </slot>\n  </PaginationListItem>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationListItem } from "reka-ui";\n  import type { ButtonProps } from "~/components/Ui/Button.vue";\n  import type { PaginationListItemProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationListItemProps & {\n        /** The variant of the button */\n        variant?: ButtonProps["variant"];\n        /** The size of the button */\n        size?: ButtonProps["size"];\n      }\n    >(),\n    {\n      variant: "outline",\n      size: "icon-sm",\n    }\n  );\n</script>\n',
      },
      {
        fileName: "Pagination/Last.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationLast data-slot="pagination-last" aria-label="Go to the last page" v-bind="forwarded">\n    <slot>\n      <UiButton v-if="icon" :variant :size>\n        <span class="sr-only">Last page</span>\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationLast>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationLast } from "reka-ui";\n  import type { ButtonProps } from "~/components/Ui/Button.vue";\n  import type { PaginationLastProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationLastProps & {\n        /** Icon to show */\n        icon?: string;\n        /** The variant of the button */\n        variant?: ButtonProps["variant"];\n        /** The size of the button */\n        size?: ButtonProps["size"];\n      }\n    >(),\n    {\n      variant: "ghost",\n      size: "icon-sm",\n    }\n  );\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/List.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationList\n    v-slot="{ items }"\n    data-slot="pagination-list"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot :items="items" />\n  </PaginationList>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationList } from "reka-ui";\n  import type { PaginationListProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PaginationListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-row items-center gap-1",\n  });\n</script>\n',
      },
      {
        fileName: "Pagination/Next.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationNext data-slot="pagination-next" aria-label="Go to next page" v-bind="forwarded">\n    <slot>\n      <UiButton v-if="icon" :variant :size>\n        <span class="sr-only">Next page</span>\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationNext>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationNext } from "reka-ui";\n  import type { ButtonProps } from "~/components/Ui/Button.vue";\n  import type { PaginationNextProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationNextProps & {\n        /** Icon to show */\n        icon?: string;\n        /** The variant of the button */\n        variant?: ButtonProps["variant"];\n        /** The size of the button */\n        size?: ButtonProps["size"];\n      }\n    >(),\n    {\n      variant: "ghost",\n      size: "icon-sm",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/Pagination.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationRoot\n    role="navigation"\n    aria-label="pagination"\n    data-slot="pagination"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <UiPaginationList v-slot="{ items }">\n        <slot name="first"><UiPaginationFirst as-child :icon="firstIcon" /> </slot>\n        <slot name="prev"><UiPaginationPrev as-child :icon="prevIcon" /> </slot>\n\n        <template v-for="(page, index) in items" :key="index">\n          <UiPaginationItem v-if="page.type === \'page\'" as-child v-bind="page" />\n          <UiPaginationEllipsis\n            v-else-if="page.type === \'ellipsis\'"\n            as-child\n            v-bind="page"\n            :icon="ellipsisIcon"\n          />\n        </template>\n        <slot name="next"><UiPaginationNext as-child :icon="nextIcon" /> </slot>\n        <slot name="last"><UiPaginationLast as-child :icon="lastIcon" /></slot>\n      </UiPaginationList>\n    </slot>\n  </PaginationRoot>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationRoot, useForwardPropsEmits } from "reka-ui";\n  import type { PaginationRootEmits, PaginationRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationRootProps & {\n        ellipsisIcon?: string;\n        firstIcon?: string;\n        lastIcon?: string;\n        nextIcon?: string;\n        prevIcon?: string;\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      defaultPage: 1,\n      total: 10,\n      itemsPerPage: 10,\n      siblingCount: 3,\n      showEdges: true,\n      ellipsisIcon: "lucide:ellipsis",\n      firstIcon: "lucide:chevrons-left",\n      lastIcon: "lucide:chevrons-right",\n      nextIcon: "lucide:chevron-right",\n      prevIcon: "lucide:chevron-left",\n    }\n  );\n\n  const emits = defineEmits<PaginationRootEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "ellipsisIcon", "firstIcon", "lastIcon", "nextIcon", "prevIcon"),\n    emits\n  );\n\n  const styles = tv({ base: "mx-auto flex w-full justify-center" });\n</script>\n',
      },
      {
        fileName: "Pagination/Prev.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PaginationPrev\n    data-slot="pagination-previous"\n    aria-label="Go to previous page"\n    v-bind="forwarded"\n  >\n    <slot>\n      <UiButton v-if="icon" :variant :size>\n        <span class="sr-only">Previous page</span>\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationPrev>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { PaginationPrev } from "reka-ui";\n  import type { ButtonProps } from "~/components/Ui/Button.vue";\n  import type { PaginationPrevProps } from "reka-ui";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationPrevProps & {\n        /** Icon to show */\n        icon?: string;\n        /** The variant of the button */\n        variant?: ButtonProps["variant"];\n        /** The size of the button */\n        size?: ButtonProps["size"];\n      }\n    >(),\n    {\n      variant: "ghost",\n      size: "icon-sm",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
    ],
    components: ["button"],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Pin Input (OTP)",
    value: "pin-input",
    files: [
      {
        fileName: "PinInput/PinInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PinInputRoot data-slot="pin-input" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <template v-for="(input, k) in inputCount" :key="k">\n        <UiPinInputInput :aria-invalid :index="k" />\n        <template v-if="k < inputCount - 1">\n          <span v-if="separator" class="text-muted-foreground">{{ separator }}</span>\n        </template>\n      </template>\n    </slot>\n  </PinInputRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PinInputRoot, useForwardPropsEmits } from "reka-ui";\n  import type { PinInputRootEmits, PinInputRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PinInputRootProps & {\n        /** Custom class(es) to apply to the parent element. */\n        class?: HTMLAttributes["class"];\n        /** The number of inputs to render.  @default 4 */\n        inputCount?: number;\n        /** The separator to render between inputs.  @default undefined */\n        separator?: string;\n        /**\n         * Whether the input should be marked as invalid for accessibility purposes.\n         */\n        ariaInvalid?: boolean;\n      }\n    >(),\n    {\n      inputCount: 4,\n    }\n  );\n\n  const emits = defineEmits<PinInputRootEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inputCount", "separator"),\n    emits\n  );\n  const styles = tv({\n    base: "flex items-center gap-2",\n  });\n</script>\n',
      },
      {
        fileName: "PinInput/PinInputInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PinInputInput\n    data-slot="pin-input-input"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { PinInputInput } from "reka-ui";\n  import type { PinInputInputProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PinInputInputProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: [\n      "size-9 rounded-md border border-input bg-transparent p-1 text-center text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",\n      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",\n      "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "PinInput/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })" data-slot="pin-input-group">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({ base: "flex items-center" });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Placeholder",
    value: "placeholder",
    files: [
      {
        fileName: "Placeholder.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :as :as-child :class="placeHolderStyles().wrapper({ class: props.class })">\n    <svg :class="placeHolderStyles().svg()" fill="none">\n      <defs>\n        <pattern\n          id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"\n          x="0"\n          y="0"\n          width="10"\n          height="10"\n          patternUnits="userSpaceOnUse"\n        >\n          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />\n        </pattern>\n      </defs>\n      <rect\n        stroke="none"\n        fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"\n        width="100%"\n        height="100%"\n      />\n    </svg>\n\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const placeHolderStyles = tv({\n    slots: {\n      wrapper:\n        "relative flex items-center justify-center overflow-hidden rounded-md border border-dashed px-4 opacity-75",\n      svg: "absolute inset-0 size-full stroke-foreground/10",\n    },\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to add to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Popover",
    value: "popover",
    files: [
      {
        fileName: "Popover/Anchor.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverAnchor data-slot="popover-anchor" v-bind="forwarded">\n    <slot />\n  </PopoverAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverAnchor, useForwardProps } from "reka-ui";\n  import type { PopoverAnchorProps } from "reka-ui";\n\n  const props = defineProps<PopoverAnchorProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverArrow data-slot="popover-arrow" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { PopoverArrow, useForwardProps } from "reka-ui";\n  import type { PopoverArrowProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<PopoverArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Close.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverClose data-slot="popover-close" v-bind="forwarded">\n    <slot />\n  </PopoverClose>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverClose, useForwardProps } from "reka-ui";\n  import type { PopoverCloseProps } from "reka-ui";\n\n  const props = defineProps<PopoverCloseProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiPopoverPortal :to="to">\n    <PopoverContent\n      data-slot="popover-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </PopoverContent>\n  </UiPopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverContent, useForwardPropsEmits } from "reka-ui";\n  import type { PopoverContentEmits, PopoverContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      PopoverContentProps & {\n        to?: string | HTMLElement;\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 4,\n      align: "center",\n      avoidCollisions: true,\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<PopoverContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "to", "class"), emits);\n\n  const styles = tv({\n    base: "z-50 w-72 origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n  });\n</script>\n',
      },
      {
        fileName: "Popover/Popover.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverRoot data-slot="popover" v-bind="forwarded">\n    <slot />\n  </PopoverRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverRoot, useForwardPropsEmits } from "reka-ui";\n  import type { PopoverRootEmits, PopoverRootProps } from "reka-ui";\n\n  const props = defineProps<PopoverRootProps>();\n  const emits = defineEmits<PopoverRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Popover/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverPortal data-slot="popover-portal" v-bind="forwarded">\n    <slot />\n  </PopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverPortal, useForwardProps } from "reka-ui";\n  import type { PopoverPortalProps } from "reka-ui";\n\n  const props = defineProps<PopoverPortalProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverTrigger data-slot="popover-trigger" v-bind="props">\n    <slot />\n  </PopoverTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverTrigger } from "reka-ui";\n  import type { PopoverTriggerProps } from "reka-ui";\n\n  const props = defineProps<PopoverTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Popover/X.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <PopoverClose data-slot="popover-x" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon :name="icon" class="size-4" />\n      <span class="sr-only">{{ srText }}</span>\n    </slot>\n  </PopoverClose>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverClose, useForwardProps } from "reka-ui";\n  import type { PopoverCloseProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PopoverCloseProps & {\n        class?: HTMLAttributes["class"];\n        icon?: string;\n        srText?: string;\n      }\n    >(),\n    {\n      icon: "heroicons:x-mark",\n      srText: "Close",\n    }\n  );\n  const forwarded = useForwardProps(reactiveOmit(props, "icon", "srText", "class"));\n\n  const styles = tv({\n    base: "absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Progress",
    value: "progress",
    files: [
      {
        fileName: "Progress/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ProgressIndicator\n    data-slot="progress-indicator"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ProgressIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ProgressIndicator } from "reka-ui";\n  import type { ProgressIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ProgressIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",\n  });\n</script>\n',
      },
      {
        fileName: "Progress/Progress.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ProgressRoot\n    data-slot="progress"\n    v-bind="{ ...forwarded, ...$attrs }"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <UiProgressIndicator\n        :style="{ transform: `translateX(-${100 - ((modelValue || 0) / max) * 100}%)` }"\n      />\n    </slot>\n  </ProgressRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ProgressRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ProgressRootEmits, ProgressRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ProgressRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      max: 100,\n      modelValue: 0,\n    }\n  );\n\n  const emits = defineEmits<ProgressRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Radio Group",
    value: "radio-group",
    files: [
      {
        fileName: "RadioGroup/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <RadioGroupIndicator\n    data-slot="radio-group-indicator"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon\n        :name="icon || \'lucide:circle\'"\n        mode="svg"\n        class="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary fill-primary stroke-primary"\n      />\n    </slot>\n  </RadioGroupIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupIndicator } from "reka-ui";\n  import type { RadioGroupIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    RadioGroupIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "relative flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <RadioGroupItem\n    data-slot="radio-group-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <UiRadioGroupIndicator :icon="props.icon" />\n    </slot>\n  </RadioGroupItem>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupItem } from "reka-ui";\n  import type { RadioGroupItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    RadioGroupItemProps & {\n      /** Class to apply to the item */\n      class?: HTMLAttributes["class"];\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/RadioGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <RadioGroupRoot\n    data-slot="radio-group"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </RadioGroupRoot>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui";\n  import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      RadioGroupRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      orientation: "vertical",\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<RadioGroupRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({ base: "grid gap-3" });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Rating",
    value: "rating",
    files: [
      {
        fileName: "Rating.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div data-slot="rating" :class="ratingClasses">\n    <div class="flex items-center">\n      <div\n        v-for="(star, index) in props.maxRating"\n        :key="star"\n        :class="[\'relative\', props.editable ? \'cursor-pointer\' : \'\']"\n        @click="handleStarClick(star)"\n        @mouseenter="handleStarMouseEnter(star)"\n        @mouseleave="handleStarMouseLeave"\n      >\n        <!-- Background star (empty) -->\n        <Icon\n          v-if="props.icon"\n          :name="props.icon"\n          data-slot="rating-star-empty"\n          :class="emptyStarClasses"\n        />\n        <!-- Filled star -->\n        <div class="absolute inset-0 overflow-hidden" :style="{ width: starWidths[index] }">\n          <Icon\n            v-if="props.icon"\n            :name="props.icon"\n            data-slot="rating-star-filled"\n            :class="filledStarClasses"\n          />\n        </div>\n      </div>\n    </div>\n\n    <template v-if="showValue">\n      <span data-slot="rating-value" :class="valueClasses">\n        {{ displayRating?.toFixed(1) }}\n      </span>\n    </template>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const ratingStyles = tv({\n    slots: {\n      rating: "inline-flex items-center",\n      star: "",\n      value: "w-5 text-muted-foreground",\n    },\n    variants: {\n      size: {\n        sm: { rating: "gap-2", star: "size-4", value: "text-xs" },\n        md: { rating: "gap-2.5", star: "size-5", value: "text-sm" },\n        lg: { rating: "gap-3", star: "size-6", value: "text-base" },\n      },\n    },\n    defaultVariants: {\n      size: "md",\n    },\n  });\n\n  export type RatingProps = {\n    /**\n     * Maximum rating value (number of stars to show)\n     */\n    maxRating?: number;\n    /**\n     * Additional classes to apply to the wrapper element.\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * Class name for the value span\n     */\n    valueClassName?: HTMLAttributes["class"];\n    /**\n     * Class name for the empty star icon\n     */\n    emptyIconClassName?: HTMLAttributes["class"];\n    /**\n     * Class name for the filled star icon\n     */\n    filledIconClassName?: HTMLAttributes["class"];\n    /**\n     * Size of the rating component\n     * @default "md"\n     */\n    size?: VariantProps<typeof ratingStyles>["size"];\n    /**\n     * Whether to show the numeric rating value\n     * @default false\n     */\n    showValue?: boolean;\n    /**\n     * Whether the rating is editable (clickable)\n     * @default false\n     */\n    editable?: boolean;\n    /**\n     * Callback function called when rating changes\n     */\n    onRatingChange?: (rating: number) => void;\n    /**\n     * Name of the icon to use for the stars (defaults to a star icon)\n     * @default "lucide:star"\n     */\n    icon?: string;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<RatingProps>(), {\n    maxRating: 5,\n    size: "md",\n    showValue: false,\n    editable: false,\n    icon: "lucide:star",\n  });\n\n  const modelValue = defineModel<number>({ default: 0 });\n\n  if (modelValue.value < 0 || modelValue.value > props.maxRating) {\n    console.warn(`Rating value ${modelValue.value} is out of bounds (0 - ${props.maxRating})`);\n  }\n  if (!props.icon) {\n    console.warn(`No icon provided for Rating component, defaulting to \'lucide:star\'`);\n  }\n\n  const emit = defineEmits<{\n    ratingChange: [payload: number];\n    starHover: [payload: number | null];\n  }>();\n\n  const hoveredRating = ref<number | null>(null);\n  const displayRating = computed(() =>\n    props.editable && hoveredRating.value !== null ? hoveredRating.value : modelValue.value\n  );\n\n  // Memoize style calculations to avoid recalculating on every render\n  const ratingClasses = computed(() =>\n    ratingStyles().rating({ class: props.class, size: props.size })\n  );\n  const emptyStarClasses = computed(() =>\n    ratingStyles().star({\n      class: ["text-muted-foreground/30", props.emptyIconClassName],\n      size: props.size,\n    })\n  );\n  const filledStarClasses = computed(() =>\n    ratingStyles().star({\n      class: ["fill-yellow-400 text-yellow-400", props.filledIconClassName],\n      size: props.size,\n    })\n  );\n  const valueClasses = computed(() =>\n    ratingStyles().value({ class: props.valueClassName, size: props.size })\n  );\n\n  // Pre-calculate star widths for better performance\n  const starWidths = computed(() => {\n    const rating = displayRating.value;\n    return Array.from({ length: props.maxRating }, (_, i) => {\n      const star = i + 1;\n      if (rating >= star) return "100%";\n      if (rating > star - 1 && rating < star) return `${(rating - (star - 1)) * 100}%`;\n      return "0%";\n    });\n  });\n\n  const handleStarClick = (starRating: number) => {\n    if (props.editable) {\n      props.onRatingChange?.(starRating);\n      emit("ratingChange", starRating);\n      modelValue.value = starRating;\n    }\n  };\n\n  const handleStarMouseEnter = (starRating: number) => {\n    if (props.editable) {\n      hoveredRating.value = starRating;\n      emit("starHover", starRating);\n    }\n  };\n\n  const handleStarMouseLeave = () => {\n    if (props.editable) {\n      hoveredRating.value = null;\n      emit("starHover", null);\n    }\n  };\n\n  defineExpose({ displayRating, starWidths, modelValue });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Retro Grid",
    value: "retro-grid",
    files: [
      {
        fileName: "RetroGrid.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :as\n    :as-child\n    :class="styles({ class: props.class })"\n    :style="{\n      \'--grid-angle\': `${angle}deg`,\n      \'--cell-size\': `${cellSize}px`,\n      \'--opacity\': opacity,\n      \'--light-line\': lightLineColor,\n      \'--dark-line\': darkLineColor,\n    }"\n  >\n    <div class="absolute inset-0 transform-[rotateX(var(--grid-angle))]">\n      <div\n        class="inset-[0%_0px] -ml-[200%] h-[300vh] w-[600vw] origin-[100%_0_0] animate-grid bg-[linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] bg-size-[var(--cell-size)_var(--cell-size)] bg-repeat dark:bg-[linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]"\n      />\n    </div>\n\n    <div class="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type RetroGridProps = PrimitiveProps & {\n    /**\n     * Additional CSS classes to apply to the grid container\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * Rotation angle of the grid in degrees\n     * @default 65\n     */\n    angle?: number;\n    /**\n     * Grid cell size in pixels\n     * @default 60\n     */\n    cellSize?: number;\n    /**\n     * Grid opacity value between 0 and 1\n     * @default 0.5\n     */\n    opacity?: number;\n    /**\n     * Grid line color in light mode\n     * @default "gray"\n     */\n    lightLineColor?: string;\n    /**\n     * Grid line color in dark mode\n     * @default "gray"\n     */\n    darkLineColor?: string;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<RetroGridProps>(), {\n    angle: 65,\n    cellSize: 60,\n    opacity: 0.5,\n    lightLineColor: "gray",\n    darkLineColor: "gray",\n  });\n  const styles = tv({\n    base: [\n      "pointer-events-none absolute size-full overflow-hidden perspective-[200px]",\n      "opacity-(--opacity)",\n    ],\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Scroll Area",
    value: "scroll-area",
    files: [
      {
        fileName: "ScrollArea/Corner.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ScrollAreaCorner data-slot="scroll-area-corner" v-bind="props">\n    <slot />\n  </ScrollAreaCorner>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaCorner } from "reka-ui";\n  import type { ScrollAreaCornerProps } from "reka-ui";\n\n  const props = defineProps<ScrollAreaCornerProps>();\n</script>\n',
      },
      {
        fileName: "ScrollArea/ScrollArea.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ScrollAreaRoot\n    data-slot="scroll-area"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <UiScrollAreaViewport>\n      <slot />\n    </UiScrollAreaViewport>\n    <UiScrollAreaScrollbar :orientation="orientation" />\n    <UiScrollAreaCorner />\n  </ScrollAreaRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaRoot } from "reka-ui";\n  import type { ScrollAreaRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaRootProps & {\n        /** Orientation for scrolling */\n        orientation?: "vertical" | "horizontal";\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative",\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Scrollbar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ScrollAreaScrollbar\n    data-slot="scroll-area-scrollbar"\n    v-bind="forwarded"\n    :class="styles({ orientation, class: props.class })"\n  >\n    <slot />\n    <UiScrollAreaThumb />\n  </ScrollAreaScrollbar>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaScrollbar } from "reka-ui";\n  import type { ScrollAreaScrollbarProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaScrollbarProps & {\n        /** Class to apply to the scrollbar */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex touch-none transition-colors select-none",\n    variants: {\n      orientation: {\n        vertical: "h-full w-2.5 border-l border-l-transparent px-px",\n        horizontal: "h-2.5 flex-col border-t border-t-transparent px-px",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Thumb.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ScrollAreaThumb\n    data-slot="scroll-area-thumb"\n    v-bind="forwarded"\n    :class="styles({ orientation, class: props.class })"\n  >\n    <slot />\n  </ScrollAreaThumb>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaThumb } from "reka-ui";\n  import type { ScrollAreaThumbProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaThumbProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        orientation?: "vertical" | "horizontal";\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative flex-1 rounded-full bg-border",\n    variants: {\n      orientation: {\n        vertical: "flex-1",\n        horizontal: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Viewport.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ScrollAreaViewport\n    data-slot="scroll-area-viewport"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </ScrollAreaViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaViewport } from "reka-ui";\n  import type { ScrollAreaViewportProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    ScrollAreaViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Scrollspy",
    value: "scrollspy",
    files: [
      {
        fileName: "Scrollspy.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <!-- Wrap only the ANCHORS (links/buttons) inside this component -->\n  <div ref="root" data-slot="scrollspy" v-bind="$attrs" :class="props.class">\n    <slot />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import { unrefElement, useEventListener, useMutationObserver, useThrottleFn } from "@vueuse/core";\n  import type { HTMLAttributes } from "vue";\n\n  type TargetLike = HTMLElement | Window | Document | null | undefined;\n\n  const props = withDefaults(\n    defineProps<{\n      /** Optional scroll container (pass a ref to a scrollable element). Defaults to window. */\n      target?: MaybeRefOrGetter<TargetLike>;\n      /** Default offset in px from the top when computing active section / scrolling. */\n      offset?: number;\n      /** Smooth scrolling on anchor click. */\n      smooth?: boolean;\n      /** Base data-* attribute, e.g. data-scrollspy-anchor. */\n      dataAttribute?: string;\n      /** Reflect active id in URL hash. */\n      history?: boolean;\n      /** Throttle time (ms) for scroll handler. */\n      throttleTime?: number;\n      /** Optional callback on change (also emits \'change\'). */\n      onUpdate?: (id: string) => void;\n      /**\n       * Additional classes to apply to the wrapper element.\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      offset: 0,\n      smooth: true,\n      dataAttribute: "scrollspy",\n      history: true,\n      throttleTime: 50,\n    }\n  );\n\n  const emit = defineEmits<{ (e: "change", id: string): void }>();\n\n  const root = ref<HTMLDivElement | null>(null);\n  const anchors = shallowRef<Element[]>([]);\n  const prevId = ref<string | null>(null);\n\n  /* ------------------------------- scroller -------------------------------- */\n  const scroller = shallowRef<Window | HTMLElement>(window as any);\n\n  function resolveScroller() {\n    const t = unrefElement(props.target as any);\n    scroller.value = !t || t === document || t === window ? window : (t as HTMLElement);\n  }\n  onMounted(resolveScroller);\n  watch(() => unrefElement(props.target as any), resolveScroller, { immediate: true });\n\n  /* ------------------------------ discovery -------------------------------- */\n  function queryAnchors() {\n    anchors.value = root.value\n      ? Array.from(root.value.querySelectorAll(`[data-${props.dataAttribute}-anchor]`))\n      : [];\n  }\n  onMounted(queryAnchors);\n  useMutationObserver(root, queryAnchors, { childList: true, subtree: true });\n\n  /* ----------------------------- calculations ------------------------------ */\n  function getScrollTop(se: Window | HTMLElement) {\n    return se === window\n      ? window.scrollY || document.documentElement.scrollTop\n      : (se as HTMLElement).scrollTop;\n  }\n  function getScrollHeight(se: Window | HTMLElement) {\n    return se === window ? document.documentElement.scrollHeight : (se as HTMLElement).scrollHeight;\n  }\n  function getClientHeight(se: Window | HTMLElement) {\n    return se === window ? window.innerHeight : (se as HTMLElement).clientHeight;\n  }\n  /** section top relative to scroller\'s content */\n  function sectionTopWithinScroller(sectionEl: HTMLElement): number {\n    const se = scroller.value;\n    const rect = sectionEl.getBoundingClientRect();\n    if (se === window) {\n      return rect.top + (window.scrollY || document.documentElement.scrollTop);\n    } else {\n      const scRect = (se as HTMLElement).getBoundingClientRect();\n      return rect.top - scRect.top + (se as HTMLElement).scrollTop;\n    }\n  }\n\n  /* ------------------------------ core logic -------------------------------- */\n  function setActive(sectionId: string | null, force = false) {\n    if (!sectionId) return;\n\n    anchors.value.forEach((el) => {\n      const id = el.getAttribute(`data-${props.dataAttribute}-anchor`);\n      if (id === sectionId) el.setAttribute("data-active", "true");\n      else el.removeAttribute("data-active");\n    });\n\n    if (props.history && (force || prevId.value !== sectionId)) {\n      window.history.replaceState({}, "", `#${sectionId}`);\n    }\n\n    if (prevId.value !== sectionId) {\n      props.onUpdate?.(sectionId);\n      emit("change", sectionId);\n      prevId.value = sectionId;\n    }\n  }\n\n  function handleScroll() {\n    if (!anchors.value.length) return;\n\n    const se = scroller.value;\n    const scrollTop = getScrollTop(se);\n\n    let activeIdx = 0;\n    let minDelta = Infinity;\n\n    anchors.value.forEach((anchor, idx) => {\n      const sectionId = anchor.getAttribute(`data-${props.dataAttribute}-anchor`);\n      if (!sectionId) return;\n      const sectionEl = document.getElementById(sectionId);\n      if (!sectionEl) return;\n\n      let customOffset = props.offset;\n      const dataOffset = anchor.getAttribute(`data-${props.dataAttribute}-offset`);\n      if (dataOffset) customOffset = parseInt(dataOffset, 10);\n\n      const top = sectionTopWithinScroller(sectionEl) - customOffset;\n      const delta = Math.abs(top - scrollTop);\n\n      if (top <= scrollTop && delta < minDelta) {\n        minDelta = delta;\n        activeIdx = idx;\n      }\n    });\n\n    // At bottom → force last anchor active\n    const atBottom = scrollTop + getClientHeight(se) >= getScrollHeight(se) - 2;\n    if (atBottom) activeIdx = anchors.value.length - 1;\n\n    const activeAnchor = anchors.value[activeIdx];\n    const sectionId = activeAnchor?.getAttribute(`data-${props.dataAttribute}-anchor`) || null;\n    setActive(sectionId);\n\n    // Safety: ensure only one active\n    anchors.value.forEach((el, idx) => {\n      if (idx !== activeIdx) el.removeAttribute("data-active");\n    });\n  }\n\n  const onScroll = props.throttleTime\n    ? useThrottleFn(handleScroll, props.throttleTime, true, false)\n    : handleScroll;\n\n  // Attach scroll listener to current scroller (reactive to scroller changes)\n  useEventListener(scroller, "scroll", onScroll, { passive: true });\n\n  /* ------------------------------ navigation -------------------------------- */\n  function scrollToAnchor(anchorEl: HTMLElement, ev?: Event) {\n    if (ev) ev.preventDefault();\n\n    const raw = anchorEl.getAttribute(`data-${props.dataAttribute}-anchor`) || "";\n    const sectionId = raw.replace("#", "");\n    if (!sectionId) return;\n\n    const sectionEl = document.getElementById(sectionId);\n    if (!sectionEl) return;\n\n    const se = scroller.value;\n    let customOffset = props.offset;\n    const dataOffset = anchorEl.getAttribute(`data-${props.dataAttribute}-offset`);\n    if (dataOffset) customOffset = parseInt(dataOffset, 10);\n\n    const top = sectionTopWithinScroller(sectionEl) - customOffset;\n\n    if ("scrollTo" in se) {\n      (se as any).scrollTo({\n        top,\n        left: 0,\n        behavior: props.smooth ? "smooth" : "auto",\n      });\n    } else {\n      window.scrollTo({ top, left: 0, behavior: props.smooth ? "smooth" : "auto" });\n    }\n\n    setActive(sectionId, true);\n  }\n\n  // Bind click listeners to anchors and auto-cleanup when list changes\n  watch(anchors, (list, _, onCleanup) => {\n    const stops: Array<() => void> = [];\n    list.forEach((el) => {\n      stops.push(useEventListener(el, "click", (e) => scrollToAnchor(el as HTMLElement, e)));\n    });\n    onCleanup(() => stops.forEach((s) => s()));\n  });\n\n  /* ------------------------------ initial sync ------------------------------ */\n  onMounted(() => {\n    // Delay to let layout settle (mirrors your React timeouts)\n    setTimeout(() => {\n      // If URL has a hash, scroll there\n      const raw = window.location.hash.replace("#", "");\n      if (raw) {\n        const target = root.value?.querySelector(\n          `[data-${props.dataAttribute}-anchor="${raw}"]`\n        ) as HTMLElement | null;\n        if (target) scrollToAnchor(target);\n      }\n      // Then compute the initial active anchor\n      setTimeout(() => onScroll(), 80);\n    }, 80);\n  });\n</script>\n',
      },
    ],
    composables: [
      {
        fileName: "useScrollspy.ts",
        dirPath: "composables",
        fileContent:
          'type TargetLike =\n  | HTMLElement\n  | Window\n  | Document\n  | null\n  | undefined\n  | MaybeRefOrGetter<HTMLElement | Window | Document | null | undefined>;\n\nexport interface UseScrollspyOptions {\n  /** Container that actually scrolls (ref or element). Omit to use `window`. */\n  target?: TargetLike;\n  /** Element containing the ANCHORS (ref or element). If omitted, use the returned `root` ref. */\n  root?: HTMLElement | null | Ref<HTMLElement | null | undefined>;\n  /** Base data-* name -> anchors should have `data-[name]-anchor="sectionId"`. */\n  dataAttribute?: string;\n  /** Default offset from top (px) when computing active section / scrolling. */\n  offset?: number;\n  /** Smooth scroll on click. */\n  smooth?: boolean;\n  /** Update URL hash as active section changes. */\n  history?: boolean;\n  /** Throttle time (ms) for scroll handler. */\n  throttleTime?: number;\n  /** Optional callback when active id changes (you can also watch `activeId`). */\n  onChange?: (id: string) => void;\n}\n\nexport function useScrollspy(options: UseScrollspyOptions = {}) {\n  const {\n    target,\n    root: rootOpt,\n    dataAttribute = "scrollspy",\n    offset = 0,\n    smooth = true,\n    history = true,\n    throttleTime = 50,\n    onChange,\n  } = options;\n\n  // Anchors live inside this container; use returned `root` if none passed\n  const root = (rootOpt ?? ref<HTMLElement | null>(null)) as Ref<HTMLElement | null>;\n  const anchors = shallowRef<Element[]>([]);\n  const activeId = ref<string | null>(null);\n  const prevId = ref<string | null>(null);\n\n  // --- Resolve the scroller (window by default) ---\n  const scroller = shallowRef<Window | HTMLElement>(window as any);\n\n  function sectionTopWithinScroller(sectionEl: HTMLElement): number {\n    const se = scroller.value;\n    const rect = sectionEl.getBoundingClientRect();\n    if (se === window) {\n      return rect.top + (window.scrollY || document.documentElement.scrollTop);\n    } else {\n      const scRect = (se as HTMLElement).getBoundingClientRect();\n      return rect.top - scRect.top + (se as HTMLElement).scrollTop;\n    }\n  }\n\n  function resolveScroller() {\n    const t = unrefElement(target as any);\n    if (!t || t === window || t === document) {\n      scroller.value = window;\n    } else if (t instanceof HTMLElement) {\n      // Prefer explicitly passed element; if not scrollable, still use it\n      scroller.value = t;\n    } else {\n      scroller.value = window;\n    }\n  }\n\n  onMounted(resolveScroller);\n  watch(() => unrefElement(target as any), resolveScroller, { immediate: true });\n\n  // --- Discover anchors inside `root` and keep updated on DOM changes ---\n  function queryAnchors() {\n    anchors.value = root.value\n      ? Array.from(root.value.querySelectorAll(`[data-${dataAttribute}-anchor]`))\n      : [];\n  }\n  onMounted(queryAnchors);\n  useMutationObserver(root, queryAnchors, { childList: true, subtree: true });\n\n  // Helpers for scroll metrics\n  function getScrollTop(se: Window | HTMLElement) {\n    return se === window\n      ? window.scrollY || document.documentElement.scrollTop\n      : (se as HTMLElement).scrollTop;\n  }\n  function getScrollHeight(se: Window | HTMLElement) {\n    return se === window ? document.documentElement.scrollHeight : (se as HTMLElement).scrollHeight;\n  }\n  function getClientHeight(se: Window | HTMLElement) {\n    return se === window ? window.innerHeight : (se as HTMLElement).clientHeight;\n  }\n\n  // --- Core: compute active anchor on scroll ---\n  function setActive(sectionId: string | null, force = false) {\n    if (!sectionId) return;\n\n    anchors.value.forEach((el) => {\n      const id = el.getAttribute(`data-${dataAttribute}-anchor`);\n      if (id === sectionId) el.setAttribute("data-active", "true");\n      else el.removeAttribute("data-active");\n    });\n\n    if (history && (force || prevId.value !== sectionId)) {\n      window.history.replaceState({}, "", `#${sectionId}`);\n    }\n\n    if (prevId.value !== sectionId) {\n      activeId.value = sectionId;\n      onChange?.(sectionId);\n      prevId.value = sectionId;\n    }\n  }\n\n  function handleScroll() {\n    if (!anchors.value.length) return;\n\n    const se = scroller.value;\n    const scrollTop = getScrollTop(se);\n\n    let activeIdx = 0;\n    let minDelta = Infinity;\n\n    anchors.value.forEach((anchor, idx) => {\n      const sectionId = anchor.getAttribute(`data-${dataAttribute}-anchor`);\n      if (!sectionId) return;\n      const sectionEl = document.getElementById(sectionId);\n      if (!sectionEl) return;\n\n      let customOffset = offset;\n      const dataOffset = anchor.getAttribute(`data-${dataAttribute}-offset`);\n      if (dataOffset) customOffset = parseInt(dataOffset, 10);\n\n      const top = sectionTopWithinScroller(sectionEl) - customOffset;\n      const delta = Math.abs(top - scrollTop);\n\n      if (top <= scrollTop && delta < minDelta) {\n        minDelta = delta;\n        activeIdx = idx;\n      }\n    });\n\n    // At bottom → force last anchor active\n    const atBottom = scrollTop + getClientHeight(se) >= getScrollHeight(se) - 2;\n    if (atBottom) activeIdx = anchors.value.length - 1;\n\n    const activeAnchor = anchors.value[activeIdx];\n    const id = activeAnchor?.getAttribute(`data-${dataAttribute}-anchor`) || null;\n    setActive(id);\n\n    // Safety: only one active\n    anchors.value.forEach((el, idx) => {\n      if (idx !== activeIdx) el.removeAttribute("data-active");\n    });\n  }\n\n  const onScroll = throttleTime\n    ? useThrottleFn(handleScroll, throttleTime, true, false)\n    : handleScroll;\n\n  // Rebind when scroller changes\n  useEventListener(scroller, "scroll", onScroll, { passive: true });\n\n  // --- Click to scroll ---\n  function scrollTo(\n    idOrEl: string | HTMLElement,\n    behavior: ScrollBehavior = smooth ? "smooth" : "auto"\n  ) {\n    const se = scroller.value;\n    let anchorEl: HTMLElement | null = null;\n    let sectionId: string | null = null;\n\n    if (typeof idOrEl === "string") {\n      sectionId = idOrEl;\n      anchorEl = anchors.value.find(\n        (a) => a.getAttribute(`data-${dataAttribute}-anchor`) === idOrEl\n      ) as HTMLElement | null;\n    } else {\n      anchorEl = idOrEl;\n      sectionId = anchorEl.getAttribute(`data-${dataAttribute}-anchor`)?.replace("#", "") || null;\n    }\n    if (!sectionId) return;\n\n    const sectionEl = document.getElementById(sectionId);\n    if (!sectionEl) return;\n\n    let customOffset = offset;\n    const dataOffset = anchorEl?.getAttribute?.(`data-${dataAttribute}-offset`);\n    if (dataOffset) customOffset = parseInt(dataOffset, 10);\n\n    const top = sectionTopWithinScroller(sectionEl) - customOffset;\n\n    if ("scrollTo" in se) {\n      (se as any).scrollTo({ top, left: 0, behavior });\n    } else {\n      window.scrollTo({ top, left: 0, behavior });\n    }\n    setActive(sectionId, true);\n  }\n\n  // Bind click listeners to anchors and auto-clean when the list changes\n  watch(\n    anchors,\n    (list, _old, onCleanup) => {\n      const stops: Array<() => void> = [];\n      list.forEach((el) => {\n        stops.push(\n          useEventListener(el, "click", (e) => {\n            e.preventDefault();\n            scrollTo(el as HTMLElement);\n          })\n        );\n      });\n      onCleanup(() => stops.forEach((s) => s()));\n    },\n    { immediate: true }\n  );\n\n  // Initial sync after mount\n  onMounted(() => {\n    // If URL has a hash, scroll there\n    const raw = window.location.hash.replace("#", "");\n    if (raw) {\n      const safe = window.CSS && "escape" in window.CSS ? (window.CSS as any).escape(raw) : raw;\n      const targetAnchor = root.value?.querySelector(\n        `[data-${dataAttribute}-anchor="${safe}"]`\n      ) as HTMLElement | null;\n      if (targetAnchor) scrollTo(targetAnchor, "auto");\n    }\n    // Then compute the initial active anchor\n    setTimeout(() => onScroll(), 60);\n  });\n\n  return {\n    /** Container that holds the anchors (use this if you didn\'t pass `root`) */\n    root,\n    /** Currently active section id */\n    activeId,\n    /** Programmatically scroll to a section id or anchor element */\n    scrollTo,\n    /** Force recompute (e.g., after dynamic layout changes) */\n    recompute: () => handleScroll(),\n  };\n}\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Select",
    value: "select",
    files: [
      {
        fileName: "Select/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectArrow data-slot="select-arrow" v-bind="useForwardProps(props)" />\n</template>\n\n<script lang="ts" setup>\n  import { SelectArrow, useForwardProps } from "reka-ui";\n  import type { SelectArrowProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<SelectArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n</script>\n',
      },
      {
        fileName: "Select/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSelectPortal :to="to">\n    <SelectContent\n      data-slot="select-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ position, class: props.class })"\n    >\n      <UiSelectScrollUpButton />\n      <UiSelectViewport :position="position">\n        <slot />\n      </UiSelectViewport>\n      <UiSelectScrollDownButton />\n    </SelectContent>\n  </UiSelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectContent, useForwardPropsEmits } from "reka-ui";\n  import type { SelectContentEmits, SelectContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      SelectContentProps & {\n        /** Where to render the portal */\n        to?: string | HTMLElement;\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      position: "popper",\n      side: "bottom",\n      align: "center",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<SelectContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] origin-(--reka-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",\n    variants: {\n      position: {\n        popper:\n          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Select/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectGroup data-slot="select-group" v-bind="forwarded">\n    <slot />\n  </SelectGroup>\n</template>\n\n<script lang="ts" setup>\n  import { SelectGroup, useForwardProps } from "reka-ui";\n  import type { SelectGroupProps } from "reka-ui";\n\n  const props = defineProps<SelectGroupProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Select/Icon.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectIcon data-slot="select-icon" v-bind="forwarded" class="flex items-center justify-center">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:chevron-down\'" />\n    </slot>\n  </SelectIcon>\n</template>\n\n<script lang="ts" setup>\n  import { SelectIcon, useForwardProps } from "reka-ui";\n  import type { SelectIconProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectIconProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "size-4 shrink-0 opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectItem data-slot="select-item" v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute right-2 flex size-3.5 items-center justify-center">\n      <UiSelectItemIndicator :icon="icon" />\n    </span>\n    <UiSelectItemText>\n      <slot>{{ text }}</slot>\n    </UiSelectItemText>\n  </SelectItem>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItem } from "reka-ui";\n  import type { SelectItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n      /** Icon to show */\n      icon?: string;\n      /** Text to show */\n      text?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon", "text");\n  const styles = tv({\n    base: "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemIndicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectItemIndicator\n    data-slot="select-item-indicator"\n    v-bind="forwarded"\n    class="flex items-center justify-center"\n  >\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:check\'" />\n    </slot>\n  </SelectItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemIndicator } from "reka-ui";\n  import type { SelectItemIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectItemIndicatorProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "size-4",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemText.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectItemText data-slot="select-item-text" v-bind="props">\n    <slot />\n  </SelectItemText>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemText } from "reka-ui";\n  import type { SelectItemTextProps } from "reka-ui";\n\n  const props = defineProps<SelectItemTextProps>();\n</script>\n',
      },
      {
        fileName: "Select/Label.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectLabel data-slot="select-label" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SelectLabel>\n</template>\n\n<script lang="ts" setup>\n  import { SelectLabel } from "reka-ui";\n  import type { SelectLabelProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectLabelProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "px-2 py-1.5 text-xs text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectPortal data-slot="select-portal" v-bind="props">\n    <slot />\n  </SelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectPortal } from "reka-ui";\n  import type { SelectPortalProps } from "reka-ui";\n\n  const props = defineProps<SelectPortalProps>();\n</script>\n',
      },
      {
        fileName: "Select/ScrollDownButton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectScrollDownButton\n    data-slot="select-scroll-down-button"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot> <Icon :name="icon || \'lucide:chevron-down\'" class="size-4" /></slot>\n  </SelectScrollDownButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollDownButton } from "reka-ui";\n  import type { SelectScrollDownButtonProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectScrollDownButtonProps & {\n      /** Icon to render */\n      icon?: string;\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n  const styles = tv({\n    base: "flex cursor-default items-center justify-center py-1",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ScrollUpButton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectScrollUpButton\n    :class="styles({ class: props.class })"\n    data-slot="select-scroll-up-button"\n    v-bind="forwarded"\n  >\n    <slot>\n      <Icon :name="icon || \'lucide:chevron-up\'" class="size-4" />\n    </slot>\n  </SelectScrollUpButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollUpButton } from "reka-ui";\n  import type { SelectScrollUpButtonProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectScrollUpButtonProps & {\n      /** Icon to render */\n      icon?: string;\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n  const styles = tv({\n    base: "flex cursor-default items-center justify-center py-1",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Select.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectRoot v-slot="slotProps" data-slot="select" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </SelectRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SelectRoot, useForwardPropsEmits } from "reka-ui";\n  import type { SelectRootEmits, SelectRootProps } from "reka-ui";\n\n  const props = defineProps<SelectRootProps>();\n\n  const emits = defineEmits<SelectRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Select/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectSeparator\n    data-slot="select-separator"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { SelectSeparator } from "reka-ui";\n  import type { SelectSeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "pointer-events-none -mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectTrigger\n    data-slot="select-trigger"\n    :data-size="size"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>\n      <UiSelectValue :placeholder="placeholder" />\n    </slot>\n    <UiSelectIcon :icon="icon" />\n  </SelectTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { SelectTrigger } from "reka-ui";\n  import type { SelectTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      SelectTriggerProps & {\n        /** Custom class(es) to add to the parent */\n        class?: HTMLAttributes["class"];\n        /** Icon to render */\n        icon?: string;\n        /** Placeholder text */\n        placeholder?: string;\n        /** Size of the select */\n        size?: "sm" | "default";\n      }\n    >(),\n    {\n      size: "default",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon", "placeholder", "size");\n  const styles = tv({\n    base: "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 [&_svg:not([class*=\'text-\'])]:text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Value.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectValue v-slot="slotProps" data-slot="select-value" v-bind="props">\n    <slot v-bind="slotProps" />\n  </SelectValue>\n</template>\n\n<script lang="ts" setup>\n  import { SelectValue } from "reka-ui";\n  import type { SelectValueProps } from "reka-ui";\n\n  const props = defineProps<SelectValueProps>();\n</script>\n',
      },
      {
        fileName: "Select/Viewport.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SelectViewport\n    data-slot="select-viewport"\n    :class="styles({ position, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </SelectViewport>\n</template>\n\n<script lang="ts" setup>\n  import { SelectViewport } from "reka-ui";\n  import type { SelectViewportProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SelectViewportProps & {\n      position?: "item-aligned" | "popper";\n      /** Custom class(es) to add to the parent */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "p-1",\n    variants: {\n      position: {\n        popper:\n          "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Separator",
    value: "separator",
    files: [
      {
        fileName: "Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Separator\n    data-slot="separator"\n    v-bind="forwarded"\n    :class="styles({ orientation, class: props.class })"\n  />\n</template>\n\n<script lang="ts">\n  import { Separator, useForwardProps } from "reka-ui";\n  import type { SeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export type UiSeparatorProps = SeparatorProps & {\n    /**\n     * Custom class(es) to add to the separator\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<UiSeparatorProps>(), {\n    orientation: "horizontal",\n    decorative: true,\n  });\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "shrink-0 bg-border",\n    variants: {\n      orientation: {\n        horizontal: "h-px w-full",\n        vertical: "h-full w-px",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Sheet",
    value: "sheet",
    files: [
      {
        fileName: "Sheet/Close.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogClose data-slot="sheet-close" v-bind="props">\n    <slot />\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "reka-ui";\n  import type { DialogCloseProps } from "reka-ui";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSheetPortal :to="to">\n    <slot name="overlay">\n      <UiSheetOverlay :is-blurred />\n    </slot>\n    <DialogContent\n      data-slot="sheet-content"\n      :class="styles({ side, isBlurred, class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot>\n        <slot name="header">\n          <UiSheetHeader>\n            <slot name="title">\n              <UiSheetTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiSheetDescription v-if="description" :description="description" />\n            </slot>\n          </UiSheetHeader>\n        </slot>\n        <slot name="content" />\n        <slot name="footer" />\n      </slot>\n      <slot name="close">\n        <UiSheetClose :icon="icon" />\n      </slot>\n    </DialogContent>\n  </UiSheetPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "reka-ui";\n  import type { DialogContentEmits, DialogContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      DialogContentProps & {\n        icon?: string;\n        title?: string;\n        description?: string;\n        class?: HTMLAttributes["class"];\n        side?: VariantProps<typeof styles>["side"];\n        to?: string | HTMLElement;\n        isBlurred?: boolean;\n      }\n    >(),\n    { isBlurred: true }\n  );\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "to", "side", "isBlurred"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",\n    variants: {\n      side: {\n        top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",\n        bottom:\n          "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",\n        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",\n        right:\n          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",\n      },\n      isBlurred: {\n        true: "backdrop-blur-sm",\n        false: "backdrop-blur-none",\n      },\n    },\n    defaultVariants: {\n      side: "left",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogDescription\n    data-slot="sheet-description"\n    :class="styles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "reka-ui";\n  import type { DialogDescriptionProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n      /** Description text */\n      description?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "description");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="sheet-footer" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "mt-auto flex flex-col gap-2 p-4",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="sheet-header" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-1.5 p-4",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Overlay.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogOverlay\n    data-slot="sheet-overlay"\n    :class="styles({ isBlurred, class: props.class })"\n    v-bind="forwarded"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "reka-ui";\n  import type { DialogOverlayProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      DialogOverlayProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        isBlurred?: boolean;\n      }\n    >(),\n    {\n      isBlurred: true,\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",\n    variants: {\n      isBlurred: {\n        true: "backdrop-blur-sm",\n        false: "backdrop-blur-none",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogPortal data-slot="sheet-portal" v-bind="props">\n    <slot />\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal } from "reka-ui";\n  import type { DialogPortalProps } from "reka-ui";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Sheet.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogRoot data-slot="sheet" v-bind="forwarded">\n    <slot />\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "reka-ui";\n  import type { DialogRootEmits, DialogRootProps } from "reka-ui";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Sheet/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogTitle data-slot="sheet-title" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "reka-ui";\n  import type { DialogTitleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n      /** Title text */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "font-semibold text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogTrigger data-slot="sheet-trigger" v-bind="props">\n    <slot />\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger } from "reka-ui";\n  import type { DialogTriggerProps } from "reka-ui";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/X.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <DialogClose data-slot="sheet-close-x" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      <Icon :name="icon" class="size-4" />\n      <span class="sr-only">{{ srText }}</span>\n    </slot>\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "reka-ui";\n  import type { DialogCloseProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      DialogCloseProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        /** Icon to display */\n        icon?: string;\n        /** Screen reader text */\n        srText?: string;\n      }\n    >(),\n    {\n      icon: "lucide:x",\n      srText: "Close",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon", "srText");\n  const styles = tv({\n    base: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Sidebar",
    value: "sidebar",
    files: [
      {
        fileName: "Sidebar/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="sidebar-content"\n    data-sidebar="content"\n    :class="sideBarContentStyles({ class: props.class })"\n  >\n    <slot />\n  </div>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarContentStyles = tv({\n    base: "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the sidebar content.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="sidebar-footer"\n    data-sidebar="footer"\n    :class="sideBarFooterStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarFooterStyles = tv({\n    base: "flex flex-col gap-2 p-2",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Sidebar/Group.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="sidebar-group"\n    data-sidebar="group"\n    :class="sideBarGroupStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarGroupStyles = tv({\n    base: "relative flex w-full min-w-0 flex-col p-2",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Sidebar/GroupAction.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-sidebar="group-action"\n    data-slot="sidebar-group-action"\n    :as="as"\n    :as-child="asChild"\n    :class="sideBarGroupActionStyles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarGroupActionStyles = tv({\n    base: "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Sidebar/GroupContent.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="sidebar-group-content"\n    data-sidebar="group-content"\n    :class="sideBarGroupContentStyles({ class: props.class })"\n  >\n    <slot />\n  </div>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarGroupContentStyles = tv({\n    base: "w-full text-sm",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/GroupLabel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-sidebar="group-label"\n    data-slot="sidebar-group-label"\n    :as="as"\n    :as-child="asChild"\n    :class="sideBarGroupLabelStyles({ class: props.class })"\n  >\n    <slot>{{ props.label }}</slot>\n  </Primitive>\n</template>\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarGroupLabelStyles = tv({\n    base: "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * The label for the group.\n       */\n      label?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Sidebar/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="sidebar-header"\n    data-sidebar="header"\n    :class="sideBarHeaderStyles({ class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarHeaderStyles = tv({\n    base: "flex flex-col gap-2 p-2",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<\n    PrimitiveProps & {\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Sidebar/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiInput\n    v-model="model"\n    data-slot="sidebar-input"\n    data-sidebar="input"\n    :class="sideBarInputStyles({ class: props.class })"\n  >\n    <slot />\n  </UiInput>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarInputStyles = tv({\n    base: "h-8 w-full bg-background shadow-none",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const model = defineModel<any>();\n</script>\n',
      },
      {
        fileName: "Sidebar/Inset.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <main data-slot="sidebar-inset" :class="sideBarInsetStyles({ class: props.class })">\n    <slot />\n  </main>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarInsetStyles = tv({\n    base: "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/Menu.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ul\n    data-slot="sidebar-menu"\n    data-sidebar="menu"\n    :class="sideBarMenuStyles({ class: props.class })"\n  >\n    <slot />\n  </ul>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuStyles = tv({\n    base: "flex w-full min-w-0 flex-col gap-1",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuAction.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="sidebar-menu-action"\n    data-sidebar="menu-action"\n    :class="sideBarMenuAction({ showOnHover, class: props.class })"\n    :as="as"\n    :as-child="asChild"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuAction = tv({\n    base: [\n      "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",\n      "after:absolute after:-inset-2 md:after:hidden",\n      "peer-data-[size=sm]/menu-button:top-1",\n      "peer-data-[size=default]/menu-button:top-1.5",\n      "peer-data-[size=lg]/menu-button:top-2.5",\n      "group-data-[collapsible=icon]:hidden",\n    ],\n    variants: {\n      showOnHover: {\n        true: "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",\n      },\n    },\n  });\n\n  export type SidebarMenuActionProps = PrimitiveProps & {\n    /**\n     * Whether the menu should be shown on hover.\n     */\n    showOnHover?: VariantProps<typeof sideBarMenuAction>["showOnHover"];\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n<script setup lang="ts">\n  const props = withDefaults(defineProps<SidebarMenuActionProps>(), {\n    as: "button",\n  });\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuBadge.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="sidebar-menu-badge"\n    data-sidebar="menu-badge"\n    :class="sideBarMenuBadgeStyles({ class: props.class })"\n  >\n    <slot />\n  </div>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuBadgeStyles = tv({\n    base: [\n      "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",\n      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",\n      "peer-data-[size=sm]/menu-button:top-1",\n      "peer-data-[size=default]/menu-button:top-1.5",\n      "peer-data-[size=lg]/menu-button:top-2.5",\n      "group-data-[collapsible=icon]:hidden",\n    ],\n  });\n</script>\n\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuButton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSidebarMenuButtonChild v-if="!tooltip" v-bind="{ ...forwarded, ...$attrs }">\n    <slot />\n  </UiSidebarMenuButtonChild>\n\n  <UiTooltip v-else>\n    <UiTooltipTrigger as-child>\n      <UiSidebarMenuButtonChild v-bind="{ ...forwarded, ...$attrs }">\n        <slot />\n      </UiSidebarMenuButtonChild>\n    </UiTooltipTrigger>\n    <UiTooltipContent side="right" align="center" :hidden="state !== \'collapsed\' || isMobile">\n      <template v-if="typeof tooltip === \'string\'">\n        {{ tooltip }}\n      </template>\n      <component :is="tooltip" v-else />\n    </UiTooltipContent>\n  </UiTooltip>\n</template>\n\n<script lang="ts">\n  import { useForwardProps } from "reka-ui";\n  import type { SidebarMenuButtonProps } from "./MenuButtonChild.vue";\n  import type { Component } from "vue";\n</script>\n<script setup lang="ts">\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      SidebarMenuButtonProps & {\n        tooltip?: string | Component;\n      }\n    >(),\n    {\n      as: "button",\n      variant: "default",\n      size: "default",\n    }\n  );\n\n  const { isMobile, state } = useSidebar();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["tooltip"]));\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuButtonChild.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-sidebar="menu-button"\n    data-slot="sidebar-menu-button"\n    :data-size="size"\n    :data-active="isActive"\n    :class="sidebarMenuButtonVariants({ variant, size, class: props.class })"\n    :as="as"\n    :as-child="asChild"\n    v-bind="$attrs"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export interface SidebarMenuButtonProps extends PrimitiveProps {\n    /**\n     * The variant of the button.\n     * @default "default"\n     */\n    variant?: SidebarMenuButtonVariants["variant"];\n    /**\n     * The size of the button.\n     * @default "default"\n     */\n    size?: SidebarMenuButtonVariants["size"];\n    /**\n     * Whether the button is active.\n     */\n    isActive?: boolean;\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {\n    as: "button",\n    variant: "default",\n    size: "default",\n  });\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <li\n    data-slot="sidebar-menu-item"\n    data-sidebar="menu-item"\n    :class="sideBarMenuItemStyles({ class: props.class })"\n  >\n    <slot />\n  </li>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuItemStyles = tv({\n    base: "group/menu-item relative",\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuSkeleton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    data-slot="sidebar-menu-skeleton"\n    data-sidebar="menu-skeleton"\n    :class="sideBarMenuSkeletonStyles().wrapper({ class: props.class })"\n  >\n    <UiSkeleton\n      v-if="showIcon"\n      :class="sideBarMenuSkeletonStyles().skeleton1()"\n      data-sidebar="menu-skeleton-icon"\n    />\n\n    <UiSkeleton\n      :class="sideBarMenuSkeletonStyles().skeleton2()"\n      data-sidebar="menu-skeleton-text"\n      :style="{ \'--skeleton-width\': width }"\n    />\n  </div>\n</template>\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuSkeletonStyles = tv({\n    slots: {\n      wrapper: "flex h-8 items-center gap-2 rounded-md px-2",\n      skeleton1: "size-4 rounded-md",\n      skeleton2: "h-4 max-w-(--skeleton-width) flex-1",\n    },\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Whether to show the icon skeleton.\n     */\n    showIcon?: boolean;\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const width = computed(() => {\n    return `${Math.floor(Math.random() * 40) + 50}%`;\n  });\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuSub.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ul\n    data-slot="sidebar-menu-sub"\n    data-sidebar="menu-badge"\n    :class="sideBarMenuSubStyles({ class: props.class })"\n  >\n    <slot />\n  </ul>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuSubStyles = tv({\n    base: [\n      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",\n      "group-data-[collapsible=icon]:hidden",\n    ],\n  });\n</script>\n\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuSubButton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="sidebar-menu-sub-button"\n    data-sidebar="menu-sub-button"\n    :as="as"\n    :as-child="asChild"\n    :data-size="size"\n    :data-active="isActive"\n    :class="sideBarMenuSubButtonStyles({ size, class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarMenuSubButtonStyles = tv({\n    base: [\n      "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",\n      "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",\n      "group-data-[collapsible=icon]:hidden",\n    ],\n    variants: {\n      size: {\n        sm: "text-xs",\n        md: "text-sm",\n      },\n    },\n  });\n\n  export type SideBarMenuSubButtonProps = PrimitiveProps & {\n    /**\n     * The size of the button.\n     * @default "md"\n     */\n    size?: VariantProps<typeof sideBarMenuSubButtonStyles>["size"];\n    /**\n     * Whether the button is active.\n     */\n    isActive?: boolean;\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(defineProps<SideBarMenuSubButtonProps>(), {\n    as: "a",\n    size: "md",\n  });\n</script>\n',
      },
      {
        fileName: "Sidebar/MenuSubItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <li\n    data-slot="sidebar-menu-sub-item"\n    data-sidebar="menu-sub-item"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </li>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "group/menu-sub-item relative",\n  });\n\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/Provider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiTooltipProvider :delay-duration="0">\n    <div\n      data-slot="sidebar-wrapper"\n      :style="{\n        \'--sidebar-width\': SIDEBAR_WIDTH,\n        \'--sidebar-width-icon\': SIDEBAR_WIDTH_ICON,\n      }"\n      :class="sideBarProviderStyles({ class: props.class })"\n    >\n      <slot v-bind="{ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }" />\n    </div>\n  </UiTooltipProvider>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes, Ref } from "vue";\n\n  export const sideBarProviderStyles = tv({\n    base: "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",\n  });\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Default open state of the sidebar.\n       * @default true\n       */\n      defaultOpen?: boolean;\n      /**\n       * Open state of the sidebar (controlled).\n       * @default undefined\n       */\n      open?: boolean;\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      defaultOpen: true,\n      open: undefined,\n    }\n  );\n\n  // This sets the cookie to keep the sidebar state.\n  const SIDEBAR_COOKIE = useCookie<boolean>(SIDEBAR_COOKIE_NAME, {\n    path: "/",\n    maxAge: SIDEBAR_COOKIE_MAX_AGE,\n    default: () => false,\n  });\n\n  const emits = defineEmits<{ "update:open": [open: boolean] }>();\n\n  const isMobile = useMediaQuery("(max-width: 768px)");\n  const openMobile = ref(false);\n\n  const open = useVModel(props, "open", emits, {\n    defaultValue: props.defaultOpen ? props.defaultOpen : SIDEBAR_COOKIE.value,\n    passive: (props.open === undefined) as false,\n  }) as Ref<boolean>;\n\n  function setOpen(value: MaybeRefOrGetter<boolean>) {\n    value = toValue(value);\n    open.value = value; // emits(\'update:open\', value)\n    SIDEBAR_COOKIE.value = value;\n  }\n\n  function setOpenMobile(value: MaybeRefOrGetter<boolean>) {\n    value = toValue(value);\n    openMobile.value = value;\n  }\n\n  // Helper to toggle the sidebar.\n  function toggleSidebar() {\n    return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);\n  }\n\n  useEventListener("keydown", (event: KeyboardEvent) => {\n    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {\n      event.preventDefault();\n      toggleSidebar();\n    }\n  });\n\n  // We add a state so that we can do data-state="expanded" or "collapsed".\n  // This makes it easier to style the sidebar with Tailwind classes.\n  const state = computed(() => (open.value ? "expanded" : "collapsed"));\n\n  provideSidebarContext({\n    state,\n    open,\n    setOpen,\n    isMobile,\n    openMobile,\n    setOpenMobile,\n    toggleSidebar,\n  });\n</script>\n',
      },
      {
        fileName: "Sidebar/Rail.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <button\n    data-sidebar="rail"\n    data-slot="sidebar-rail"\n    aria-label="Toggle Sidebar"\n    :tabindex="-1"\n    title="Toggle Sidebar"\n    :class="sideBarRailStyles({ class: props.class })"\n    @click="toggleSidebar"\n  >\n    <slot />\n  </button>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarRailStyles = tv({\n    base: [\n      "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",\n      "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",\n      "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",\n      "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",\n      "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",\n      "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",\n    ],\n  });\n</script>\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const { toggleSidebar } = useSidebar();\n</script>\n',
      },
      {
        fileName: "Sidebar/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiSeparator\n    data-slot="sidebar-separator"\n    data-sidebar="separator"\n    :class="sideBarSeparatorStyles({ class: props.class })"\n  >\n    <slot />\n  </UiSeparator>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarSeparatorStyles = tv({\n    base: "mx-2 w-auto bg-sidebar-border",\n  });\n</script>\n\n<script setup lang="ts">\n  const props = defineProps<{\n    /**\n     * Additional classes to apply to the parent element.\n     */\n    class?: HTMLAttributes["class"];\n  }>();\n</script>\n',
      },
      {
        fileName: "Sidebar/Sidebar.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div\n    v-if="collapsible === \'none\'"\n    data-slot="sidebar"\n    :class="sideBarStyles().collapsible({ class: props.class })"\n    v-bind="$attrs"\n  >\n    <slot />\n  </div>\n\n  <UiSheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">\n    <UiSheetContent\n      data-sidebar="sidebar"\n      data-slot="sidebar"\n      data-mobile="true"\n      :side="side"\n      :class="sideBarStyles().mobileSheet()"\n      :style="{\n        \'--sidebar-width\': SIDEBAR_WIDTH_MOBILE,\n      }"\n    >\n      <VisuallyHidden>\n        <UiSheetTitle>Mobile Sidebar</UiSheetTitle>\n        <UiSheetDescription>\n          This is the mobile sidebar. You can use this to navigate the site.\n        </UiSheetDescription>\n      </VisuallyHidden>\n      <div :class="sideBarStyles().mobileInner()">\n        <slot />\n      </div>\n    </UiSheetContent>\n  </UiSheet>\n\n  <div\n    v-else\n    class="group peer hidden text-sidebar-foreground md:block"\n    data-slot="sidebar"\n    :data-state="state"\n    :data-collapsible="state === \'collapsed\' ? collapsible : \'\'"\n    :data-variant="variant"\n    :data-side="side"\n  >\n    <!-- This is what handles the sidebar gap on desktop  -->\n    <div data-slot="sidebar-gap" :class="sideBarStyles().sideBarWrapper({ variant })" />\n\n    <div\n      :class="sideBarStyles().sideBarWrapper2({ collapsible, side, variant, class: props.class })"\n      v-bind="$attrs"\n    >\n      <div data-sidebar="sidebar" :class="sideBarStyles().sideBarInner()">\n        <slot />\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import { VisuallyHidden } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarStyles = tv({\n    slots: {\n      collapsible:\n        "flex h-full w-(--sidebar-width) flex-col bg-sidebar-background text-sidebar-foreground",\n      mobileSheet:\n        "w-(--sidebar-width) bg-sidebar-background p-0 text-sidebar-foreground [&>button]:hidden",\n      mobileInner: "flex size-full flex-col",\n      sideBarWrapper:\n        "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",\n      sideBarWrapper2:\n        "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",\n      sideBarInner:\n        "flex h-full w-full flex-col bg-sidebar-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",\n    },\n    variants: {\n      side: {\n        left: {\n          sideBarWrapper2:\n            "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",\n        },\n        right: {\n          sideBarWrapper2:\n            "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",\n        },\n      },\n      variant: {\n        sidebar: {\n          sideBarWrapper: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",\n          sideBarWrapper2:\n            "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",\n        },\n        floating: {\n          sideBarWrapper:\n            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",\n          sideBarWrapper2:\n            "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",\n        },\n        inset: {\n          sideBarWrapper:\n            "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",\n          sideBarWrapper2:\n            "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",\n        },\n      },\n      collapsible: {\n        offcanvas: {},\n        icon: {},\n        none: {},\n      },\n    },\n    defaultVariants: {\n      side: "left",\n      variant: "sidebar",\n      collapsible: "offcanvas",\n    },\n  });\n\n  export type SideBarProps = {\n    /**\n     * The side that the sidebar is on\n     * @default "left"\n     */\n    side?: VariantProps<typeof sideBarStyles>["side"];\n    /**\n     * The variant of the sidebar\n     * @default "sidebar"\n     */\n    variant?: VariantProps<typeof sideBarStyles>["variant"];\n    /**\n     * The collapsible state of the sidebar\n     * @default "offcanvas"\n     */\n    collapsible?: VariantProps<typeof sideBarStyles>["collapsible"];\n    /**\n     * Additional classes to add to the sidebar\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script setup lang="ts">\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(defineProps<SideBarProps>(), {\n    side: "left",\n    variant: "sidebar",\n    collapsible: "offcanvas",\n  });\n\n  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();\n</script>\n',
      },
      {
        fileName: "Sidebar/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiButton\n    :title="label"\n    data-sidebar="trigger"\n    data-slot="sidebar-trigger"\n    variant="ghost"\n    size="icon"\n    :class="sideBarTriggerStyles({ class: props.class })"\n    @click="toggleSidebar"\n  >\n    <slot v-bind="{ state }">\n      <Icon v-if="icon" :name="icon" />\n      <span class="sr-only">{{ label }}</span>\n    </slot>\n  </UiButton>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export const sideBarTriggerStyles = tv({\n    base: "size-7",\n  });\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The icon to display in the trigger.\n       * @default "lucide:panel-left"\n       */\n      icon?: string;\n      /**\n       * Additional classes to apply to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * The label for the trigger.\n       * @default "Toggle Sidebar"\n       */\n      label?: string;\n    }>(),\n    {\n      icon: "lucide:panel-left",\n      label: "Toggle Sidebar",\n    }\n  );\n\n  const { toggleSidebar, state } = useSidebar();\n</script>\n',
      },
    ],
    components: ["input", "tooltip", "skeleton", "separator", "sheet", "button"],
    utils: [
      {
        fileName: "sidebar.ts",
        dirPath: "utils",
        fileContent:
          'import { createContext } from "reka-ui";\nimport type { ComputedRef, Ref } from "vue";\n\nexport const SIDEBAR_COOKIE_NAME = "sidebar:state";\nexport const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;\nexport const SIDEBAR_WIDTH = "16rem";\nexport const SIDEBAR_WIDTH_MOBILE = "18rem";\nexport const SIDEBAR_WIDTH_ICON = "3rem";\nexport const SIDEBAR_KEYBOARD_SHORTCUT = "b";\n\nexport const sidebarMenuButtonVariants = tv({\n  base: "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",\n\n  variants: {\n    variant: {\n      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",\n      outline:\n        "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",\n    },\n    size: {\n      default: "h-8 text-sm",\n      sm: "h-7 text-xs",\n      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",\n    },\n  },\n  defaultVariants: {\n    variant: "default",\n    size: "default",\n  },\n});\n\nexport type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;\n\nexport const [useSidebar, provideSidebarContext] = createContext<{\n  state: ComputedRef<"expanded" | "collapsed">;\n  open: Ref<boolean>;\n  setOpen: (value: MaybeRefOrGetter<boolean>) => void;\n  isMobile: Ref<boolean>;\n  openMobile: Ref<boolean>;\n  setOpenMobile: (value: MaybeRefOrGetter<boolean>) => void;\n  toggleSidebar: () => void;\n}>("Sidebar");\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Skeleton",
    value: "skeleton",
    files: [
      {
        fileName: "Skeleton.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="skeleton"\n    :class="styles({ loading, class: props.class })"\n    v-bind="forwarded"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "animate-pulse rounded-md bg-muted",\n    variants: {\n      loading: { true: "cursor-wait", false: "cursor-default" },\n    },\n  });\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        /** Whether the skeleton is loading */\n        loading?: boolean;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "loading");\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Slider",
    value: "slider",
    files: [
      {
        fileName: "Slider/Range.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SliderRange data-slot="slider-range" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderRange>\n</template>\n\n<script lang="ts" setup>\n  import { SliderRange } from "reka-ui";\n  import type { SliderRangeProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SliderRangeProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Slider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SliderRoot data-slot="slider" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot :props="props">\n      <slot name="track" :props="props">\n        <UiSliderTrack>\n          <slot name="range" :props="props">\n            <UiSliderRange />\n          </slot>\n        </UiSliderTrack>\n      </slot>\n      <slot name="thumb" :props="props">\n        <template v-if="showTooltip">\n          <UiTooltipProvider v-for="(_, key) in modelValue?.length" :key="key">\n            <UiTooltip :open="showTooltipState">\n              <UiTooltipTrigger as-child>\n                <UiSliderThumb\n                  as="span"\n                  class="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] outline-none hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"\n                  data-slot="slider-thumb"\n                  @pointerdown="handlePointerDown"\n                />\n              </UiTooltipTrigger>\n              <UiTooltipContent\n                :side-offset="8"\n                :side="props.orientation === \'vertical\' ? \'right\' : \'top\'"\n                class="px-2 py-1 text-xs"\n              >\n                {{ modelValue?.[key] }}\n              </UiTooltipContent>\n            </UiTooltip>\n          </UiTooltipProvider>\n        </template>\n        <template v-else>\n          <UiSliderThumb v-for="(t, i) in modelValue?.length" :key="i" />\n        </template>\n      </slot>\n    </slot>\n  </SliderRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SliderRoot, useForwardPropsEmits } from "reka-ui";\n  import type { SliderRootEmits, SliderRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      SliderRootProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        showTooltip?: boolean;\n      }\n    >(),\n    {\n      orientation: "horizontal",\n      min: 0,\n      step: 1,\n      max: 100,\n      modelValue: () => [0],\n      minStepsBetweenThumbs: 1,\n    }\n  );\n\n  const emits = defineEmits<SliderRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",\n  });\n\n  const showTooltipState = ref(false);\n\n  const handlePointerDown = () => {\n    if (props.showTooltip) {\n      showTooltipState.value = true;\n    }\n  };\n\n  const handlePointerUp = () => {\n    if (props.showTooltip) {\n      showTooltipState.value = false;\n    }\n  };\n\n  onMounted(() => {\n    if (props.showTooltip) {\n      document.addEventListener("pointerup", handlePointerUp);\n    }\n  });\n\n  onUnmounted(() => {\n    if (props.showTooltip) {\n      document.removeEventListener("pointerup", handlePointerUp);\n    }\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Thumb.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SliderThumb data-slot="slider-thumb" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SliderThumb } from "reka-ui";\n  import type { SliderThumbProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SliderThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Track.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SliderTrack data-slot="slider-track" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderTrack>\n</template>\n\n<script lang="ts" setup>\n  import { SliderTrack } from "reka-ui";\n  import type { SliderTrackProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SliderTrackProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Sonner",
    value: "sonner",
    deps: ["vue-sonner"],
    instructions: ["Remember to add the <UiSonner /> tag to your app.vue/layout file."],
    nuxtModules: ["vue-sonner/nuxt"],
    files: [
      {
        fileName: "Sonner.vue",
        dirPath: "app/components/Ui",
        fileContent:
          "<template>\n  <Toaster\n    class=\"toaster group\"\n    :visible-toasts=\"5\"\n    close-button\n    :duration=\"7000\"\n    :theme=\"$colorMode.value == 'dark' ? 'dark' : 'light'\"\n    :style=\"{\n      '--normal-bg': 'var(--popover)',\n      '--normal-text': 'var(--popover-foreground)',\n      '--normal-border': 'var(--border)',\n    }\"\n    :toast-options=\"{\n      class: 'items-start!',\n      classes: {\n        icon: 'mt-0.5',\n        toast:\n          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',\n        description: 'group-[.toast]:text-muted-foreground',\n        actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',\n        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',\n      },\n    }\"\n  />\n</template>\n",
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Splitter",
    value: "splitter",
    files: [
      {
        fileName: "Splitter/Splitter.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SplitterGroup\n    v-slot="{ layout }: { layout: number[] }"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :layout="layout" />\n  </SplitterGroup>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterGroup, useForwardPropsEmits } from "reka-ui";\n  import type { SplitterGroupEmits, SplitterGroupProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      SplitterGroupProps & {\n        direction?: "horizontal" | "vertical";\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      direction: "horizontal",\n      as: "div",\n      keyboardResizeBy: 10,\n    }\n  );\n\n  const emit = defineEmits<SplitterGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "flex h-full w-full data-[orientation=vertical]:flex-col",\n  });\n</script>\n',
      },
      {
        fileName: "Splitter/Panel.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SplitterPanel\n    v-bind="forwarded"\n    ref="forwardRef"\n    v-slot="{ isCollapsed, isExpanded }: { isCollapsed: boolean; isExpanded: boolean }"\n  >\n    <slot :is-collapsed="isCollapsed" :is-expanded="isExpanded" />\n  </SplitterPanel>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterPanel, useForwardPropsEmits } from "reka-ui";\n  import type { SplitterPanelEmits, SplitterPanelProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<SplitterPanelProps>(), {});\n\n  const forwardRef = ref<InstanceType<typeof SplitterPanel>>();\n  const emit = defineEmits<\n    SplitterPanelEmits & {\n      ready: [value: InstanceType<typeof SplitterPanel>];\n    }\n  >();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n\n  onMounted(async () => {\n    await nextTick();\n    emit("ready", forwardRef.value!);\n  });\n</script>\n',
      },
      {
        fileName: "Splitter/Handle.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SplitterResizeHandle v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <div\n        v-if="withHandle"\n        class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"\n      >\n        <Icon :name="icon" class="h-2.5 w-2.5" />\n      </div>\n    </slot>\n  </SplitterResizeHandle>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterResizeHandle, useForwardPropsEmits } from "reka-ui";\n  import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      SplitterResizeHandleProps & {\n        direction?: "horizontal" | "vertical";\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        withHandle?: boolean;\n        icon?: string;\n      }\n    >(),\n    {\n      direction: "horizontal",\n      icon: "lucide:grip-vertical",\n    }\n  );\n\n  const emit = defineEmits<SplitterResizeHandleEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "withHandle", "icon"), emit);\n\n  const styles = tv({\n    base: "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2 [&[data-orientation=vertical]>div]:rotate-90",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Stepper",
    value: "stepper",
    files: [
      {
        fileName: "Stepper/Description.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperDescription\n    v-slot="slotProps"\n    data-slot="stepper-description"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </StepperDescription>\n</template>\n\n<script lang="ts" setup>\n  import { StepperDescription, useForwardProps } from "reka-ui";\n  import type { StepperDescriptionProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperDescriptionProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({ base: "text-sm text-muted-foreground" });\n</script>\n',
      },
      {
        fileName: "Stepper/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperIndicator v-slot="{ step }" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot :step>\n      <span\n        class="transition-all group-data-loading/step:scale-0 group-data-loading/step:opacity-0 group-data-loading/step:transition-none group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0"\n      >\n        {{ step }}\n      </span>\n      <Icon\n        name="lucide:check"\n        class="absolute size-4 scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"\n        aria-hidden="true"\n      />\n      <span\n        v-if="isLoading"\n        class="absolute opacity-0 transition-all group-data-[state=active]/step:opacity-100 group-data-[state=active]/step:transition-none"\n      >\n        <Icon name="lucide:loader-circle" class="size-3.5 animate-spin" aria-hidden="true" />\n      </span>\n    </slot>\n  </StepperIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { StepperIndicator, useForwardProps } from "reka-ui";\n  import type { StepperIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperIndicatorProps & {\n      class?: HTMLAttributes["class"];\n      isLoading?: boolean;\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class", "isLoading"));\n\n  const styles = tv({\n    base: "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground group-data-[state=active]/step:bg-primary group-data-[state=active]/step:text-primary-foreground group-data-[state=completed]/step:bg-primary group-data-[state=completed]/step:text-primary-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Stepper/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperItem\n    v-slot="slotProps"\n    data-slot="stepper-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </StepperItem>\n</template>\n\n<script lang="ts" setup>\n  import { StepperItem, useForwardProps } from "reka-ui";\n  import type { StepperItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperItemProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n  const styles = tv({\n    base: "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",\n  });\n</script>\n',
      },
      {
        fileName: "Stepper/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperSeparator\n    data-slot="stepper-separator"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </StepperSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { StepperSeparator, useForwardProps } from "reka-ui";\n  import type { StepperSeparatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperSeparatorProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "m-0.5 bg-muted group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5 group-data-[state=completed]/step:bg-primary",\n  });\n</script>\n',
      },
      {
        fileName: "Stepper/Stepper.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperRoot\n    v-slot="slotProps"\n    data-slot="stepper"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </StepperRoot>\n</template>\n\n<script lang="ts" setup>\n  import { StepperRoot, useForwardPropsEmits } from "reka-ui";\n  import type { StepperRootEmits, StepperRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperRootProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const emit = defineEmits<StepperRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",\n  });\n</script>\n',
      },
      {
        fileName: "Stepper/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperTitle\n    v-bind="forwarded"\n    data-slot="stepper-title"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </StepperTitle>\n</template>\n\n<script lang="ts" setup>\n  import { StepperTitle, useForwardProps } from "reka-ui";\n  import type { StepperTitleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    StepperTitleProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n  const styles = tv({ base: "text-sm font-medium" });\n</script>\n',
      },
      {
        fileName: "Stepper/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <StepperTrigger\n    v-bind="forwarded"\n    data-slot="stepper-trigger"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </StepperTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { StepperTrigger, useForwardProps } from "reka-ui";\n  import type { StepperTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes["class"] }>();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "inline-flex items-center gap-3 rounded-full outline-none focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Switch",
    value: "switch",
    files: [
      {
        fileName: "Switch/Switch.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SwitchRoot\n    v-slot="slotProps"\n    data-slot="switch"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <UiSwitchThumb>\n      <slot v-bind="slotProps" />\n    </UiSwitchThumb>\n  </SwitchRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchRoot, useForwardPropsEmits } from "reka-ui";\n  import type { SwitchRootEmits, SwitchRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      SwitchRootProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        id?: HTMLAttributes["id"];\n      }\n    >(),\n    {\n      as: "button",\n    }\n  );\n  const emits = defineEmits<SwitchRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",\n  });\n</script>\n',
      },
      {
        fileName: "Switch/Thumb.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <SwitchThumb data-slot="switch-thumb" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SwitchThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchThumb } from "reka-ui";\n  import type { SwitchThumbProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    SwitchThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Table",
    value: "table",
    files: [
      {
        fileName: "Table/Body.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <tbody data-slot="table-body" :class="styles({ class: props.class })">\n    <slot />\n  </tbody>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "[&_tr:last-child]:border-0",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Caption.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <caption data-slot="table-caption" :class="styles({ class: props.class })">\n    <slot />\n  </caption>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "mt-4 text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Cell.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <td data-slot="table-cell" :class="styles({ class: props.class })">\n    <slot />\n  </td>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Empty.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiTableRow>\n    <UiTableCell :colspan="colspan" :class="styles({ class: props.class })">\n      <div data-slot="table-empty" class="flex items-center justify-center py-10">\n        <slot />\n      </div>\n    </UiTableCell>\n  </UiTableRow>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      colspan?: number;\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      colspan: 1,\n    }\n  );\n\n  const styles = tv({\n    base: "p-4 align-middle text-sm whitespace-nowrap text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Footer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <tfoot data-slot="table-footer" :class="styles({ class: props.class })">\n    <slot />\n  </tfoot>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Head.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <th data-slot="table-head" :class="styles({ class: props.class })">\n    <slot />\n  </th>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "h-12 px-3 text-left align-middle font-medium whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <thead data-slot="table-header" :class="styles({ class: props.class })">\n    <slot />\n  </thead>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "[&_tr]:border-b",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Row.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <tr data-slot="table-row" :class="styles({ class: props.class })">\n    <slot />\n  </tr>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({\n    base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Table.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div data-slot="table-container" class="relative w-full overflow-x-auto">\n    <table data-slot="table" :class="styles({ class: props.class })" v-bind="$attrs">\n      <slot />\n    </table>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<{\n    class?: HTMLAttributes["class"];\n  }>();\n\n  const styles = tv({ base: "w-full caption-bottom text-sm" });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tabs",
    value: "tabs",
    files: [
      {
        fileName: "Tabs/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TabsContent data-slot="tabs-content" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TabsContent>\n</template>\n\n<script lang="ts" setup>\n  import { TabsContent } from "reka-ui";\n  import type { TabsContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    TabsContentProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex-1 outline-none",\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ClientOnly>\n    <TabsIndicator\n      data-slot="tabs-indicator"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n      :style="{\n        width: \'var(--reka-tabs-indicator-size)\',\n        transform: \'translateX(var(--reka-tabs-indicator-position))\',\n      }"\n    >\n      <slot>\n        <div class="h-full w-full rounded-md bg-primary" />\n      </slot>\n    </TabsIndicator>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import { TabsIndicator } from "reka-ui";\n  import type { TabsIndicatorProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    TabsIndicatorProps & {\n      /** Custom class(es) to add to parent element */\n      class?: HTMLAttributes["class"];\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "absolute bottom-0 left-0 h-[3px] rounded-full px-2 transition-[width,transform] duration-300",\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/List.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TabsList data-slot="tabs-list" :class="styles({ pill, class: props.class })" v-bind="forwarded">\n    <slot />\n  </TabsList>\n</template>\n\n<script lang="ts" setup>\n  import { TabsList } from "reka-ui";\n  import type { TabsListProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsListProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        pill?: boolean;\n      }\n    >(),\n    { pill: true }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex w-fit items-center justify-center rounded-md p-0.5 text-muted-foreground/70",\n    variants: {\n      pill: {\n        true: "bg-muted",\n        false: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Tabs.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TabsRoot data-slot="tabs" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TabsRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TabsRoot, useForwardPropsEmits } from "reka-ui";\n  import type { TabsRootEmits, TabsRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>(), {\n    orientation: "horizontal",\n    activationMode: "automatic",\n  });\n  const emits = defineEmits<TabsRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({ base: "flex flex-col gap-2" });\n</script>\n',
      },
      {
        fileName: "Tabs/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TabsTrigger\n    data-slot="tabs-trigger"\n    v-bind="forwarded"\n    :class="styles({ pill, class: props.class })"\n  >\n    <slot />\n  </TabsTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TabsTrigger } from "reka-ui";\n  import type { TabsTriggerProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsTriggerProps & {\n        /** Custom class(es) to add to parent element */\n        class?: HTMLAttributes["class"];\n        /** Whether the trigger should be pill-shaped */\n        pill?: boolean;\n      }\n    >(),\n    {\n      pill: true,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all outline-none hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs [&_svg]:shrink-0",\n    variants: {\n      pill: {\n        true: "",\n        false:\n          "hover:text-foreground focus-visible:border-none focus-visible:ring-1 data-[state=active]:shadow-none",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tags Input",
    value: "tags-input",
    files: [
      {
        fileName: "TagsInput/Clear.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputClear\n    data-slot="tags-input-clear"\n    v-bind="props"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />\n    </slot>\n  </TagsInputClear>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputClear } from "reka-ui";\n  import type { TagsInputClearProps } from "reka-ui";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<TagsInputClearProps & { icon?: string; class?: HtmlHTMLAttributes["class"] }>(),\n    {\n      icon: "lucide:x",\n    }\n  );\n  const styles = tv({\n    base: "flex items-center justify-center rounded bg-transparent p-1 opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputItem\n    data-slot="tags-input-item"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <slot name="text">\n        <UiTagsInputItemText />\n      </slot>\n      <slot name="delete">\n        <UiTagsInputItemDelete :icon="icon" />\n      </slot>\n    </slot>\n  </TagsInputItem>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItem } from "reka-ui";\n  import type { TagsInputItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<\n    TagsInputItemProps & { class?: HTMLAttributes["class"]; icon?: string }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "relative flex h-7 items-center gap-1 rounded-sm border border-input bg-transparent px-2 text-xs font-medium hover:bg-background dark:bg-accent",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/ItemDelete.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputItemDelete\n    data-slot="tags-input-item-delete"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="m-auto size-3" />\n    </slot>\n  </TagsInputItemDelete>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItemDelete } from "reka-ui";\n  import type { TagsInputItemDeleteProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: HTMLAttributes["class"] }>(),\n    {\n      icon: "lucide:x",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex items-center justify-center p-0 text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/ItemText.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputItemText\n    data-slot="tags-input-item-text"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </TagsInputItemText>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItemText } from "reka-ui";\n  import type { TagsInputItemTextProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes["class"] }>();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/TagsInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputRoot\n    v-slot="slotProps"\n    data-slot="tags-input"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </TagsInputRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputRoot, useForwardPropsEmits } from "reka-ui";\n  import type { TagsInputRootEmits, TagsInputRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes["class"] }>();\n  const emits = defineEmits<TagsInputRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: [\n      "flex h-9 flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-1 text-sm shadow-xs dark:bg-input/30",\n      "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",\n    ],\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/TagsInputInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TagsInputInput\n    data-slot="tags-input-input"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </TagsInputInput>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputInput } from "reka-ui";\n  import type { TagsInputInputProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes["class"] }>();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "min-h-6 w-full flex-1 bg-transparent px-1 text-sm focus:outline-none dark:bg-input/30",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tanstack Table",
    value: "tanstacktable",
    deps: ["@tanstack/vue-table"],
    components: ["checkbox"],
    files: [
      {
        fileName: "TanStackTable.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div>\n    <div :class="styles({ class: props.class })">\n      <UiTable :class="tableClass">\n        <UiTableHeader>\n          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">\n            <UiTableHead\n              v-for="header in headerGroup.headers"\n              :key="header.id"\n              :colspan="header.colSpan"\n              :class="[header.column.getCanSort() && \'cursor-pointer select-none\']"\n              @click="header.column.getToggleSortingHandler()?.($event)"\n            >\n              <template v-if="!header.isPlaceholder">\n                <div class="flex items-center gap-3">\n                  <FlexRender\n                    :render="header.column.columnDef.header"\n                    :props="header.getContext()"\n                  />\n                  <Icon\n                    v-if="header.column.getCanSort() && header.column.getIsSorted() === \'asc\'"\n                    :name="ascIcon"\n                    class="size-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && header.column.getIsSorted() === \'desc\'"\n                    :name="descIcon"\n                    class="size-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"\n                    :name="unsortedIcon"\n                    class="h-5 w-5"\n                  />\n                </div>\n              </template>\n            </UiTableHead>\n          </UiTableRow>\n        </UiTableHeader>\n\n        <UiTableBody>\n          <UiTableRow\n            v-for="row in table.getRowModel().rows"\n            :key="row.id"\n            :data-state="row.getIsSelected() ? \'selected\' : \'\'"\n          >\n            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">\n              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />\n            </UiTableCell>\n          </UiTableRow>\n\n          <UiTableEmpty\n            v-if="table.getRowModel().rows.length === 0"\n            :colspan="table.getAllLeafColumns().length"\n          >\n            <slot :table="table" name="empty"> No data available. </slot>\n          </UiTableEmpty>\n        </UiTableBody>\n      </UiTable>\n    </div>\n\n    <div v-if="showPagination" class="@container">\n      <div\n        class="my-6 flex flex-col justify-between gap-4 px-2 @[700px]:flex-row @[700px]:items-center"\n      >\n        <div class="flex items-center justify-between gap-3">\n          <slot name="rowsSelected" :table="table">\n            <div v-if="showSelect" class="text-sm whitespace-nowrap text-muted-foreground">\n              <span>\n                {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}\n                {{ table.getFilteredRowModel().rows.length }} row(s) selected\n              </span>\n            </div>\n          </slot>\n          <slot name="rowsPerPage" :table="table">\n            <div class="flex items-center space-x-2 whitespace-nowrap">\n              <p class="hidden text-sm font-medium text-foreground md:inline-block">\n                {{ rowsPerPageText }}\n              </p>\n              <UiSelect v-model="pageSize">\n                <UiSelectTrigger class="h-9 w-fit">\n                  {{ table.getState().pagination.pageSize }}\n                </UiSelectTrigger>\n                <UiSelectContent class="min-w-fit" side="top" align="start">\n                  <UiSelectGroup>\n                    <!-- eslint-disable vue/no-template-shadow -->\n                    <UiSelectItem\n                      v-for="pageSize in pageSizes"\n                      :key="pageSize"\n                      :value="`${pageSize}`"\n                    >\n                      {{ pageSize }}\n                    </UiSelectItem>\n                  </UiSelectGroup>\n                </UiSelectContent>\n              </UiSelect>\n            </div>\n          </slot>\n        </div>\n\n        <div class="flex items-center justify-between gap-3">\n          <slot :table="table" name="page">\n            <div\n              class="flex items-center justify-center text-sm font-medium whitespace-nowrap text-foreground"\n            >\n              Page {{ table.getState().pagination.pageIndex + 1 }} of\n              {{ table.getPageCount() }}\n            </div>\n          </slot>\n\n          <slot :table="table" name="pageButtons">\n            <div class="flex items-center space-x-2">\n              <UiButton\n                variant="outline"\n                title="First page"\n                class="h-9 w-9 p-0"\n                :disabled="!table.getCanPreviousPage()"\n                @click="table.setPageIndex(0)"\n              >\n                <Icon name="lucide:chevrons-left" class="size-4" />\n              </UiButton>\n              <UiButton\n                variant="outline"\n                title="Previous page"\n                class="h-9 w-9 p-0"\n                :disabled="!table.getCanPreviousPage()"\n                @click="table.previousPage()"\n              >\n                <Icon name="lucide:chevron-left" class="size-4" />\n              </UiButton>\n              <UiButton\n                variant="outline"\n                title="Next page"\n                class="h-9 w-9 p-0"\n                :disabled="!table.getCanNextPage()"\n                @click="table.nextPage()"\n              >\n                <Icon name="lucide:chevron-right" class="size-4" />\n              </UiButton>\n              <UiButton\n                variant="outline"\n                title="Last page"\n                class="h-9 w-9 p-0"\n                :disabled="!table.getCanNextPage()"\n                @click="table.setPageIndex(table.getPageCount() - 1)"\n              >\n                <Icon name="lucide:chevrons-right" class="size-4" />\n              </UiButton>\n            </div>\n          </slot>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup generic="T extends object">\n  import CheckBox from "@/components/Ui/Checkbox/Checkbox.vue";\n  import {\n    FlexRender,\n    getCoreRowModel,\n    getFilteredRowModel,\n    getPaginationRowModel,\n    getSortedRowModel,\n    useVueTable,\n  } from "@tanstack/vue-table";\n  import type { ColumnDef, SortingState, Table } from "@tanstack/vue-table";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The data to display in the table.\n       */\n      data?: T[];\n      /**\n       * The columns to display in the table.\n       */\n      columns?: ColumnDef<T>[];\n      /**\n       * The search term to filter the table data.\n       */\n      search?: string;\n      /**\n       * Whether to show the select checkbox column.\n       */\n      showSelect?: boolean;\n      /**\n       * The page sizes to display in the pagination dropdown.\n       */\n      pageSizes?: number[];\n      /**\n       * The initial page size for the table.\n       */\n      pageSize?: number;\n      /**\n       * The initial sorting state of the table.\n       */\n      sorting?: SortingState;\n      /**\n       * The class(es) to apply to the table.\n       */\n      tableClass?: HTMLAttributes["class"];\n      /**\n       * The icon to display for ascending sorting.\n       */\n      ascIcon?: string;\n      /**\n       * The icon to display for descending sorting.\n       */\n      descIcon?: string;\n      /**\n       * The icon to display for unsorted columns.\n       */\n      unsortedIcon?: string;\n      /**\n       * Custom class(es) to add to the parent element.\n       */\n      class?: HTMLAttributes["class"];\n      /**\n       * Whether to show pagination controls.\n       *\n       * @default true\n       */\n      showPagination?: boolean;\n      /**\n       * The text to display for the rows per page label.\n       *\n       * @default "Rows per page:"\n       */\n      rowsPerPageText?: string;\n    }>(),\n    {\n      pageSizes: () => [10, 20, 30, 40, 50, 100],\n      pageSize: () => 10,\n      columns: () => [],\n      data: () => [],\n      sorting: () => [],\n      ascIcon: "lucide:chevron-up",\n      descIcon: "lucide:chevron-down",\n      unsortedIcon: "lucide:chevrons-up-down",\n      showPagination: true,\n      rowsPerPageText: "Rows per page:",\n    }\n  );\n\n  defineOptions({ inheritAttrs: false });\n\n  const styles = tv({\n    base: "w-full overflow-x-auto",\n  });\n\n  const checkBoxHeader: ColumnDef<any> = {\n    id: "checkbox",\n    header: ({ table }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center" },\n        h(CheckBox, {\n          modelValue: table.getIsAllRowsSelected()\n            ? true\n            : table.getIsSomeRowsSelected()\n              ? "indeterminate"\n              : false,\n          "onUpdate:modelValue": (value: boolean | "indeterminate") =>\n            table.toggleAllPageRowsSelected(!!value),\n          ariaLabel: "Select all",\n        })\n      );\n    },\n    cell: ({ row }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center " },\n        h(CheckBox, {\n          modelValue: row.getIsSelected(),\n          "onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),\n          ariaLabel: "Select row",\n        })\n      );\n    },\n    enableSorting: false,\n    enableHiding: false,\n  };\n\n  const localColumns: ColumnDef<T>[] = [...props.columns];\n\n  if (props.showSelect) {\n    localColumns.unshift(checkBoxHeader);\n  }\n\n  const emit = defineEmits<{\n    ready: [table: Table<T>];\n  }>();\n\n  const localSorting = ref(props.sorting);\n  const globalFilter = ref(props.search);\n  const columnVisibility = ref({});\n  const rowSelection = ref({});\n\n  const updateFn = (updaterOrValue: any, v: MaybeRefOrGetter) => {\n    if (typeof updaterOrValue === "function") {\n      return updaterOrValue(toValue(v));\n    }\n    return updaterOrValue;\n  };\n\n  const table = useVueTable({\n    get data() {\n      return props.data;\n    },\n    get columns() {\n      return localColumns;\n    },\n    initialState: {\n      pagination: {\n        pageSize: props.pageSize,\n      },\n      rowSelection: rowSelection.value,\n      globalFilter: props.search,\n    },\n    state: {\n      get sorting() {\n        return localSorting.value;\n      },\n      get globalFilter() {\n        return props.search;\n      },\n      get columnVisibility() {\n        return columnVisibility.value;\n      },\n      get rowSelection() {\n        return rowSelection.value;\n      },\n    },\n    onSortingChange: (updaterOrValue) => {\n      localSorting.value = updateFn(updaterOrValue, localSorting);\n    },\n    onGlobalFilterChange: (updaterOrValue) => {\n      globalFilter.value = updateFn(updaterOrValue, globalFilter);\n    },\n    onRowSelectionChange: (updaterOrValue) => {\n      rowSelection.value = updateFn(updaterOrValue, rowSelection);\n    },\n    getCoreRowModel: getCoreRowModel(),\n    getSortedRowModel: getSortedRowModel(),\n    getPaginationRowModel: getPaginationRowModel(),\n    getFilteredRowModel: getFilteredRowModel(),\n    enableRowSelection: () => !!props.showSelect,\n  });\n\n  function toggleColumnVisibility(column: any) {\n    columnVisibility.value = {\n      ...columnVisibility.value,\n      [column.id]: !column.getIsVisible(),\n    };\n  }\n\n  // eslint-disable-next-line vue/no-dupe-keys\n  const pageSize = computed({\n    get() {\n      return table.getState().pagination.pageSize.toString();\n    },\n    set(value) {\n      table.setPageSize(Number(value));\n    },\n  });\n\n  onMounted(() => {\n    emit("ready", table);\n  });\n\n  defineExpose({ toggleColumnVisibility });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Terminal",
    value: "terminal",
    files: [
      {
        fileName: "Terminal/AnimatedSpan.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <motion.div\n    :initial="{ opacity: 0, y: -5 }"\n    :animate="{ opacity: 1, y: 0 }"\n    :transition="{ duration: 0.3, delay: delay / 1000 }"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </motion.div>\n</template>\n<script lang="ts">\n  import { motion } from "motion-v";\n  import type { MotionProps } from "motion-v";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export interface AnimatedSpanProps extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {\n    class?: HTMLAttributes["class"];\n    delay?: number;\n  }\n\n  const styles = tv({ base: "grid text-sm font-normal tracking-tight" });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<AnimatedSpanProps>(), {\n    delay: 0,\n    as: "span",\n  });\n</script>\n',
      },
      {
        fileName: "Terminal/Terminal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive :as :as-child :class="styles({ class: props.class })">\n    <div class="flex flex-col gap-y-2 border-b border-border p-4">\n      <div class="flex flex-row gap-x-2">\n        <div\n          v-for="(item, i) in buttonColors"\n          :key="i"\n          class="size-2 rounded-full"\n          :class="[item]"\n        />\n      </div>\n    </div>\n    <pre class="overflow-auto p-4"><code class="grid gap-y-1 overflow-auto"><slot /></code></pre>\n  </Primitive>\n</template>\n<script lang="ts">\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "z-0 h-full max-h-[400px] w-full max-w-lg rounded-lg border border-border bg-background",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        class?: HTMLAttributes["class"];\n        buttonColors?: string[];\n      }\n    >(),\n    {\n      buttonColors: () => ["bg-red-500", "bg-yellow-500", "bg-green-500"],\n    }\n  );\n</script>\n',
      },
      {
        fileName: "Terminal/TypingAnimation.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Motion ref="elementRef" :class="styles({ class: props.class })">{{ displayedText }}</Motion>\n</template>\n<script lang="ts">\n  import type { MotionProps } from "motion-v";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export interface TypingAnimationProps\n    extends Omit<MotionProps, "as" | "asChild">, PrimitiveProps {\n    text?: string;\n    class?: HTMLAttributes["class"];\n    duration?: number;\n    delay?: number;\n  }\n\n  const styles = tv({\n    base: "text-sm font-normal tracking-tight",\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<TypingAnimationProps>(), {\n    duration: 60,\n    delay: 0,\n    as: "span",\n  });\n\n  if (!props.text) {\n    createError({\n      message: "[Terminal - TypingAnimation]: Text prop is required",\n      fatal: false,\n      statusCode: 400,\n    });\n  }\n\n  const displayedText = ref("");\n  const started = ref(false);\n\n  let typingInterval: ReturnType<typeof setInterval> | null = null;\n  let startTimeout: ReturnType<typeof setTimeout> | null = null;\n\n  onMounted(() => {\n    startTimeout = setTimeout(() => {\n      started.value = true;\n    }, props.delay);\n  });\n\n  onUnmounted(() => {\n    if (startTimeout) clearTimeout(startTimeout);\n    if (typingInterval) clearInterval(typingInterval);\n  });\n\n  watch(\n    () => started.value,\n    (value) => {\n      if (!value) return;\n\n      let i = 0;\n      typingInterval = setInterval(() => {\n        const text = props.text ?? "";\n        if (i < text.length) {\n          displayedText.value = text.substring(0, i + 1);\n          i++;\n        } else {\n          if (typingInterval) clearInterval(typingInterval);\n        }\n      }, props.duration);\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Textarea",
    value: "textarea",
    files: [
      {
        fileName: "Textarea.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <textarea\n    v-bind="props"\n    ref="textarea"\n    data-slot="textarea"\n    :value="modelValue"\n    :class="styles({ class: props.class })"\n    @input="handleInput"\n  />\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes, TextareaHTMLAttributes } from "vue";\n\n  export type TextareaProps = {\n    /** Additional classes to add to the textarea */\n    class?: HTMLAttributes["class"];\n    /** The name of the textarea */\n    name?: TextareaHTMLAttributes["name"];\n    /** The id of the textarea */\n    id?: TextareaHTMLAttributes["id"];\n    /** The placeholder of the textarea */\n    placeholder?: TextareaHTMLAttributes["placeholder"];\n    /** Whether the textarea is required */\n    required?: boolean;\n    /** Whether the textarea is disabled */\n    disabled?: boolean;\n    /** The number of rows to display */\n    rows?: number;\n    /** The value of the textarea */\n    modelValue?: string;\n    /** The maximum number of characters allowed */\n    maxlength?: number;\n    /** The `RegExp` pattern of the textarea */\n    pattern?: string;\n    /** Whether the textarea should be focused when mounted. */\n    autofocus?: boolean;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<TextareaProps>(), {\n    modelValue: "",\n  });\n\n  const emit = defineEmits<{\n    "update:modelValue": [value: string];\n  }>();\n\n  const textarea = useTemplateRef("textarea");\n\n  const handleInput = (event: Event) => {\n    const target = event.target as HTMLTextAreaElement;\n    let value = target.value;\n\n    /* Validate input with pattern */\n    if (props.pattern) {\n      const regex = new RegExp(props.pattern);\n      value = Array.from(value)\n        .filter((char) => regex.test(char))\n        .join("");\n    }\n\n    /* Handle maxlength */\n    if (props.maxlength) {\n      value = value.slice(0, props.maxlength);\n    }\n\n    target.value = value;\n    emit("update:modelValue", value);\n  };\n\n  const styles = tv({\n    base: "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",\n  });\n\n  onMounted(() => {\n    if (props.autofocus) textarea.value?.focus();\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Timeline",
    value: "timeline",
    files: [
      {
        fileName: "Timeline/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="timeline-content"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Timeline/Date.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="timeline-date" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "mb-1 block text-xs font-medium text-muted-foreground group-data-[orientation=vertical]/timeline:max-sm:h-4",\n  });\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      as: "time",\n    }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Timeline/Header.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive data-slot="timeline-header" :as :as-child>\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n\n  defineProps<PrimitiveProps>();\n</script>\n',
      },
      {
        fileName: "Timeline/Indicator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="timeline-indicator"\n    aria-hidden="true"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "absolute size-4 rounded-full border-2 border-primary/20 group-data-completed/timeline-item:border-primary group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2",\n  });\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Timeline/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :data-completed="step <= timelineData?.model?.value || undefined"\n    :data-step="step"\n    data-slot="timeline-item"\n    aria-hidden="true"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { TimelineData } from "./Timeline.vue";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { timelineDataSymbol } from "./Timeline.vue";\n\n  const timelineData = inject<TimelineData>(timelineDataSymbol);\n\n  const styles = tv({\n    base: "group/timeline-item relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12 has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-primary",\n  });\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n      step: number;\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class", "step"]));\n</script>\n',
      },
      {
        fileName: "Timeline/Separator.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="timeline-separator"\n    aria-hidden="true"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "absolute self-start bg-primary/10 group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:translate-x-4.5 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=vertical]/timeline:translate-y-4.5",\n  });\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
      {
        fileName: "Timeline/Timeline.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    :data-orientation="orientation"\n    data-slot="timeline"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes, ModelRef } from "vue";\n\n  export type TimelineData = {\n    model: ModelRef<number | undefined, string, number | undefined, number | undefined>;\n    orientation: "horizontal" | "vertical";\n  };\n  export type TimelineProps = PrimitiveProps & {\n    class?: HTMLAttributes["class"];\n    orientation?: "horizontal" | "vertical";\n    modelValue?: number | undefined;\n  };\n  export const timelineDataSymbol = Symbol("timeline-data");\n</script>\n\n<script lang="ts" setup>\n  const styles = tv({\n    base: "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",\n  });\n  const model = defineModel<number | undefined>({ default: 1 });\n  const props = withDefaults(defineProps<TimelineProps>(), {\n    orientation: "vertical",\n  });\n  const forwarded = useForwardProps(reactiveOmit(props, ["modelValue", "class", "orientation"]));\n  provide<TimelineData>(timelineDataSymbol, {\n    model,\n    orientation: props.orientation,\n  });\n</script>\n',
      },
      {
        fileName: "Timeline/Title.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <Primitive\n    data-slot="timeline-title"\n    aria-hidden="true"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { reactiveOmit } from "@vueuse/core";\n  import { Primitive, useForwardProps } from "reka-ui";\n  import type { PrimitiveProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const styles = tv({\n    base: "text-sm font-medium",\n  });\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: HTMLAttributes["class"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, ["class"]));\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Toggle",
    value: "toggle",
    files: [
      {
        fileName: "Toggle.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ToggleRoot\n    v-slot="slotProps"\n    data-slot="toggle"\n    v-bind="forwarded"\n    :class="toggleStyles({ variant, size, class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </ToggleRoot>\n</template>\n\n<script lang="ts">\n  import { Toggle as ToggleRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ToggleEmits, ToggleProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  export const toggleStyles = tv({\n    base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        xs: "h-7 min-w-7 px-2",\n        default: "h-9 min-w-9 px-3",\n        sm: "h-8 min-w-8 px-2.5",\n        lg: "h-10 min-w-10 px-5",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n\n  export type ToggleVariants = VariantProps<typeof toggleStyles>;\n</script>\n\n<script lang="ts" setup>\n  const props = defineProps<\n    ToggleProps & {\n      /** Additional classes for the toggle */\n      class?: HTMLAttributes["class"];\n      /** Variant of the toggle */\n      variant?: ToggleVariants["variant"];\n      /** Size of the toggle */\n      size?: ToggleVariants["size"];\n    }\n  >();\n\n  const emits = defineEmits<ToggleEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emits);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Toggle Group",
    value: "toggle-group",
    components: ["toggle"],
    files: [
      {
        fileName: "ToggleGroup/ToggleGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ToggleGroupRoot\n    v-slot="{ modelValue }"\n    data-slot="toggle-group"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :model-value="modelValue" />\n  </ToggleGroupRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui";\n  import type { ToggleVariants } from "../Toggle.vue";\n  import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      ToggleGroupRootProps & {\n        /** custom class to add to the parent */\n        class?: HTMLAttributes["class"];\n        variant?: ToggleVariants["variant"];\n        size?: ToggleVariants["size"];\n      }\n    >(),\n    {\n      type: "single",\n    }\n  );\n\n  const emit = defineEmits<ToggleGroupRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emit);\n\n  const styles = tv({\n    base: "flex items-center justify-center gap-1",\n  });\n\n  provide("toggleGroup", { variant: props.variant, size: props.size });\n</script>\n',
      },
      {
        fileName: "ToggleGroup/ToggleGroupItem.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <ToggleGroupItem\n    data-slot="toggle-group-item"\n    v-bind="forwarded"\n    :class="toggleStyles({ class: props.class, size, variant })"\n  >\n    <slot>\n      <Icon v-if="icon" class="size-4" :name="icon" />\n    </slot>\n  </ToggleGroupItem>\n</template>\n\n<script lang="ts" setup>\n  import { ToggleGroupItem, useForwardProps } from "reka-ui";\n  import type { ToggleGroupItemProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  import { toggleStyles } from "../Toggle.vue";\n\n  const props = defineProps<\n    ToggleGroupItemProps & {\n      /** custom class to add to the toggle */\n      class?: HTMLAttributes["class"];\n      /** icon to display */\n      icon?: string;\n      /** variant of the toggle */\n      variant?: VariantProps<typeof toggleStyles>["variant"];\n      /** size of the toggle */\n      size?: VariantProps<typeof toggleStyles>["size"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class", "icon", "variant", "size"));\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tooltip",
    value: "tooltip",
    files: [
      {
        fileName: "Tooltip/Arrow.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TooltipArrow\n    data-slot="tooltip-arrow"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { TooltipArrow, useForwardProps } from "reka-ui";\n  import type { TooltipArrowProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<\n      TooltipArrowProps & {\n        /** Additional classes for the tooltip arrow */\n        class?: HTMLAttributes["class"];\n      }\n    >(),\n    {\n      width: 12,\n      height: 6,\n    }\n  );\n\n  const styles = tv({ base: "fill-popover stroke-border" });\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n</script>\n',
      },
      {
        fileName: "Tooltip/Content.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiTooltipPortal :to="to">\n    <TooltipContent\n      data-slot="tooltip-content"\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n      <slot name="arrow">\n        <UiTooltipArrow v-if="showArrow" />\n      </slot>\n    </TooltipContent>\n  </UiTooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipContent, useForwardPropsEmits } from "reka-ui";\n  import type { TooltipContentEmits, TooltipContentProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      TooltipContentProps & {\n        to?: string | HTMLElement;\n        class?: HTMLAttributes["class"];\n        showArrow?: boolean;\n      }\n    >(),\n    {\n      side: "top",\n      sideOffset: 4,\n      align: "center",\n      alignOffset: -4,\n      avoidCollisions: true,\n      collisionBoundary: () => [],\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<TooltipContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "relative z-50 max-w-70 animate-in rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",\n  });\n</script>\n',
      },
      {
        fileName: "Tooltip/Portal.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TooltipPortal data-slot="tooltip-portal" v-bind="props">\n    <slot />\n  </TooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipPortal } from "reka-ui";\n  import type { TooltipPortalProps } from "reka-ui";\n\n  const props = defineProps<TooltipPortalProps>();\n</script>\n',
      },
      {
        fileName: "Tooltip/Provider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TooltipProvider data-slot="tooltip-provider" v-bind="props">\n    <slot />\n  </TooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipProvider } from "reka-ui";\n  import type { TooltipProviderProps } from "reka-ui";\n\n  const props = withDefaults(defineProps<TooltipProviderProps>(), {\n    delayDuration: 0,\n  });\n</script>\n',
      },
      {
        fileName: "Tooltip/Tooltip.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <UiTooltipProvider v-bind="props">\n    <TooltipRoot v-slot="slotProps" data-slot="tooltip" v-bind="{ ...forwarded, ...$attrs }">\n      <slot v-bind="slotProps">\n        <slot v-bind="slotProps" name="trigger" />\n        <slot v-bind="slotProps" name="content" />\n      </slot>\n    </TooltipRoot>\n  </UiTooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipRoot, useForwardPropsEmits } from "reka-ui";\n  import type { TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from "reka-ui";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(defineProps<TooltipRootProps & TooltipProviderProps>(), {\n    delayDuration: 0,\n  });\n\n  const emits = defineEmits<TooltipRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Tooltip/Trigger.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TooltipTrigger data-slot="tooltip-trigger" v-bind="props">\n    <slot />\n  </TooltipTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipTrigger } from "reka-ui";\n  import type { TooltipTriggerProps } from "reka-ui";\n\n  const props = defineProps<TooltipTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tree",
    value: "tree",
    files: [
      {
        fileName: "Tree/Item.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TreeItem v-slot="slotProps" data-slot="tree-item" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeItem>\n</template>\n\n<script lang="ts" setup generic="T extends Record<string, any>">\n  import { TreeItem, useForwardPropsEmits } from "reka-ui";\n  import type { TreeItemEmits, TreeItemProps } from "reka-ui";\n\n  const props = defineProps<TreeItemProps<T>>();\n  const emit = defineEmits<TreeItemEmits<T>>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Tree/Tree.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TreeRoot v-slot="slotProps" data-slot="tree" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TreeRoot, useForwardPropsEmits } from "reka-ui";\n  import type { TreeRootEmits, TreeRootProps } from "reka-ui";\n\n  const props = defineProps<TreeRootProps>();\n  const emit = defineEmits<TreeRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Tree/Virtualizer.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <TreeVirtualizer v-slot="slotProps" data-slot="tree-virtualizer" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeVirtualizer>\n</template>\n\n<script lang="ts" setup>\n  import { TreeVirtualizer, useForwardPropsEmits } from "reka-ui";\n  import type { TreeVirtualizerProps } from "reka-ui";\n\n  const props = defineProps<TreeVirtualizerProps>();\n  const forwarded = useForwardPropsEmits(props);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Checkbox",
    value: "vee-checkbox",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["checkbox", "label"],
    files: [
      {
        fileName: "Vee/Checkbox.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiCheckbox\n      :id="inputId"\n      v-bind="$attrs"\n      :icon="icon"\n      :value="value"\n      :name="name"\n      :required="required"\n      :disabled="disabled"\n      :model-value="checked"\n      @update:model-value="handleChange"\n    />\n    <div class="flex flex-col gap-1.5 leading-[1.25]">\n      <slot name="label" :error-message="errorMessage" :checked="checked">\n        <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\']">{{\n          label\n        }}</UiLabel>\n      </slot>\n      <AnimatePresence as="div" multiple mode="wait">\n        <slot name="hint" :error-message="errorMessage" :checked="checked">\n          <motion.p\n            v-if="hint && !errorMessage"\n            :variants\n            initial="initial"\n            exit="initial"\n            animate="animate"\n            :transition="{ type: \'keyframes\' }"\n            class="text-sm leading-none text-muted-foreground"\n          >\n            {{ hint }}\n          </motion.p>\n        </slot>\n        <slot name="errorMessage" :error-message="errorMessage" :checked="checked">\n          <motion.p\n            v-if="errorMessage"\n            :variants\n            initial="initial"\n            exit="initial"\n            animate="animate"\n            :transition="{ type: \'keyframes\' }"\n            class="text-sm leading-none text-destructive"\n          >\n            {{ errorMessage }}\n          </motion.p>\n        </slot>\n      </AnimatePresence>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n  import type { HTMLAttributes } from "vue";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: any;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    value?: any;\n    required?: boolean;\n    disabled?: boolean;\n    class?: HTMLAttributes["class"];\n  }>();\n  const styles = tv({\n    base: "flex gap-3",\n  });\n\n  const inputId = props.id || useId();\n\n  const { errorMessage, checked, handleChange } = useField(\n    () => props.name || inputId,\n    props.rules,\n    {\n      initialValue: props.modelValue,\n      label: props.label,\n      validateOnMount: props.validateOnMount,\n      type: "checkbox",\n      checkedValue: props.value || true,\n      syncVModel: true,\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee CurrencyInput",
    value: "vee-currency-input",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["currency-input", "label"],
    files: [
      {
        fileName: "Vee/CurrencyInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiCurrencyInput\n        :id="inputId"\n        v-model="value"\n        type="text"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        :placeholder="placeholder"\n        :options="options"\n      />\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n  import type { CurrencyInputOptions } from "vue-currency-input";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    labelHint?: string;\n    icon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    options?: CurrencyInputOptions;\n    required?: boolean;\n  }>();\n\n  const inputId = useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee DateField",
    value: "vee-date-field",
    deps: ["@vee-validate/nuxt", "@internationalized/date"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["date-field", "label"],
    files: [
      {
        fileName: "Vee/DateField.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <UiDateField v-bind="{ ...$attrs, ...props }" v-model="value" />\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n  import type { DateFieldRootProps } from "reka-ui";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<\n    DateFieldRootProps & {\n      label?: string;\n      labelHint?: string;\n      hint?: string;\n      modelValue?: string;\n      name?: string;\n\n      rules?: any;\n      validateOnMount?: boolean;\n      separator?: string;\n      separatorIcon?: string;\n    }\n  >();\n\n  const inputId = props.id || useId();\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Datepicker",
    value: "vee-datepicker",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["datepicker", "label", "input"],
    files: [
      {
        fileName: "Vee/Datepicker.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiDatepicker v-bind="datePickerProps" v-model="value">\n        <template #header-title="{ title }">\n          <div class="inline-flex items-center gap-1">\n            {{ title }} <Icon name="lucide:chevron-down" class="size-4" />\n          </div>\n        </template>\n        <template #default="{ inputValue, inputEvents }">\n          <UiInput\n            :id="inputId"\n            :readonly="readonly"\n            :required="required"\n            :model-value="inputValue"\n            :name="name"\n            :disabled="disabled"\n            v-bind="$attrs"\n            :class="[hasIcon && \'pl-9\']"\n            :placeholder="placeholder"\n            v-on="inputEvents"\n          />\n        </template>\n      </UiDatepicker>\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n  const props = withDefaults(\n    defineProps<{\n      label?: string;\n      icon?: string;\n      hint?: string;\n      disabled?: boolean;\n      modelValue?: any;\n      name?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      placeholder?: string;\n      readonly?: boolean;\n      datePickerProps?: any;\n      required?: boolean;\n    }>(),\n    {\n      icon: "lucide:calendar-days",\n    }\n  );\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee FileInput",
    value: "vee-file-input",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/FileInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiInput\n        :id="inputId"\n        type="file"\n        :required="required"\n        :name="name"\n        v-bind="$attrs"\n        :multiple="multiple"\n        :class="[hasIcon && \'pl-9\']"\n        :accept="accept"\n        @change="\n          handleChange($event);\n          emits(\'change\', $event.target.files);\n        "\n        @blur="\n          handleBlur($event);\n          emits(\'blur\', $event);\n        "\n      />\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage">\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage">\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    name: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    multiple?: boolean;\n    accept?: string;\n    required?: boolean;\n  }>();\n\n  const emits = defineEmits<{\n    change: [files?: FileList | File | File[] | null];\n    blur: [event?: FocusEvent];\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, handleChange, handleBlur } = useField(() => props.name, props.rules, {\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Form Builder",
    value: "vee-form-builder",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
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
    files: [
      {
        fileName: "FormBuilder/FormBuilder.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div>\n    <template v-for="(field, index) in fields" :key="index">\n      <template v-if="field.variant === \'Checkbox\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeCheckbox v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'Input\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeInput v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'Divider\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiDivider v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'CurrencyInput\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeCurrencyInput v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'DateField\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeDateField v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'Textarea\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeTextarea v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'FileInput\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeFileInput :name="field.name" v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'MultiSelect\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeMultiSelect v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'Select\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeSelect v-bind="removeFields(field)">\n              <template v-for="(option, optIndex) in field.options" :key="optIndex">\n                <option v-bind="option">{{ option.label }}</option>\n              </template>\n            </UiVeeSelect>\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'RadioGroup\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeRadioGroup :name="field.name" v-bind="removeFields(field)">\n              <template v-for="(option, optIndex) in field.options" :key="optIndex">\n                <div class="mb-2 flex items-center gap-3">\n                  <UiRadioGroupItem :id="option.value" :value="option.value" />\n                  <UiLabel :for="option.value">{{ option.label }}</UiLabel>\n                </div>\n              </template>\n            </UiVeeRadioGroup>\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'PinInput\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeePinInput v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'TagsInput\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeTagsInput v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'VueformSlider\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeVueFormSlider v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n      <template v-if="field.variant === \'NativeCheckbox\'">\n        <slot\n          v-if="field.renderIf ? field.renderIf() : true"\n          :name="field.slot ? field.slot : field.name"\n          v-bind="field"\n        >\n          <div :class="field.wrapperClass">\n            <UiVeeNativeCheckbox v-bind="removeFields(field)" />\n          </div>\n        </slot>\n      </template>\n    </template>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export type FormBuilder = {\n    description?: string;\n    hint?: string;\n    disabled?: boolean;\n    label?: string;\n    name: string;\n    placeholder?: string;\n    required?: boolean;\n    type?: string;\n    value?: any;\n    rules?: any;\n    class?: HTMLAttributes["class"];\n    slot?: string;\n    wrapperClass?: HTMLAttributes["class"];\n    renderIf?: () => boolean;\n    options?: any[];\n    variant:\n      | "Checkbox"\n      | "NativeCheckbox"\n      | "Input"\n      | "Divider"\n      | "CurrencyInput"\n      | "DateField"\n      | "FileInput"\n      | "Select"\n      | "Textarea"\n      | "MultiSelect"\n      | "PinInput"\n      | "TagsInput"\n      | "RadioGroup"\n      | "VueformSlider";\n    [key: string]: any;\n  };\n  export type FormBuilderProps = {\n    fields: FormBuilder[];\n  };\n</script>\n\n<script lang="ts" setup>\n  defineProps<FormBuilderProps>();\n\n  const omit = (obj: FormBuilder, keys: Array<keyof FormBuilder>) =>\n    Object.fromEntries(\n      Object.entries(obj).filter(([key]) => !keys.includes(key as keyof FormBuilder))\n    );\n\n  const removeFields = (field: FormBuilder) => {\n    return omit(field, ["wrapperClass", "renderIf", "variant", "slot"]);\n  };\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Input",
    value: "vee-input",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/Input.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <slot name="trailingIcon">\n        <span\n          v-if="hasTrailingIcon"\n          class="absolute inset-y-0 right-3 flex items-center justify-center"\n        >\n          <Icon v-if="trailingIcon" :name="trailingIcon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiInput\n        :id="inputId"\n        v-model="value"\n        :type="type"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\', hasTrailingIcon && \'pr-9\']"\n        :placeholder="placeholder"\n        @blur="handleBlur"\n      />\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    labelHint?: string;\n    icon?: string;\n    trailingIcon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    required?: boolean;\n  }>();\n\n  defineOptions({ inheritAttrs: false });\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n  const hasTrailingIcon = computed(\n    () => Boolean(props.trailingIcon) || Boolean(useSlots().trailingIcon)\n  );\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee MultiSelect",
    value: "vee-multi-select",
    deps: ["@vee-validate/nuxt", "@vueform/multiselect"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["label"],
    files: [
      {
        fileName: "Vee/MultiSelect.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="formLabel"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ formLabel }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <Multiselect\n      v-bind="{ ...$attrs, ...forwarded }"\n      :id="inputId"\n      ref="multiselect"\n      v-model="value"\n      :attrs="{\n        id: inputId,\n      }"\n      :name="name"\n      :classes="{\n        containerActive: \'ring-[3px]! ring-ring/50! transition border-primary!\',\n        containerOpen: \'rounded-b-md\',\n        containerOpenTop: \'rounded-t-md\',\n      }"\n    >\n      <template v-for="(_, slotName) in slots" #[slotName]="slotProps">\n        <slot :name="slotName" v-bind="slotProps ?? {}" />\n      </template>\n      <template #clear="{ clear }">\n        <button class="mr-2 flex items-center justify-center" @click="clear">\n          <Icon name="heroicons:x-mark" size="16" class="text-muted-foreground" />\n        </button>\n      </template>\n    </Multiselect>\n    <AnimatePresence as="div" multiple mode="wait">\n      <motion.p\n        v-if="hint && !errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-muted-foreground"\n      >\n        {{ hint }}\n      </motion.p>\n\n      <motion.p\n        v-if="errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-destructive"\n      >\n        {{ errorMessage }}\n      </motion.p>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts">\n  import Multiselect from "@vueform/multiselect";\n  import { motion } from "motion-v";\n  import { useForwardPropsEmits } from "reka-ui";\n\n  import "@vueform/multiselect/themes/default.css";\n\n  type OptionValue = string | number | boolean | Record<string, any>;\n  type OptionItem = OptionValue | Record<string, any>;\n\n  export interface MultiselectInstance {\n    /**\n     * Opens the options dropdown.\n     */\n    open(): void;\n\n    /**\n     * Closes the options dropdown.\n     */\n    close(): void;\n\n    /**\n     * Selects a given option by object.\n     */\n    select(option: any): void;\n\n    /**\n     * Deselects a given option by object.\n     */\n    deselect(option: any): void;\n\n    /**\n     * Alias for `deselect`.\n     */\n    remove(option: any): void;\n\n    /**\n     * Selects all options (if using `multiple` or `tags` mode).\n     */\n    selectAll(): void;\n\n    /**\n     * Deselects all selected options.\n     */\n    clear(): void;\n\n    /**\n     * Clears the current search input.\n     */\n    clearSearch(): void;\n\n    /**\n     * Refreshes async options list.\n     * @param callback Function to call after refreshing\n     */\n    refreshOptions(callback?: () => void): void;\n\n    /**\n     * Sets the active pointer to a specific option.\n     */\n    setPointer(option: any): void;\n  }\n\n  export type MultiselectSlots = {\n    /**\n     * Rendered as placeholder when no value is selected\n     * and the `placeholder` prop is defined.\n     */\n    placeholder(): any;\n\n    /**\n     * Rendered before the options list.\n     */\n    beforelist(): any;\n\n    /**\n     * Rendered after the options list.\n     */\n    afterlist(): any;\n\n    /**\n     * Rendered when using `multiple` mode and options are selected.\n     * @param values The selected values array.\n     */\n    multiplelabel(props: { values: any[] }): any;\n\n    /**\n     * Rendered when the options list is empty.\n     * Defaults to `noOptionsText`.\n     */\n    nooptions(): any;\n\n    /**\n     * Rendered when search yields no matching results.\n     * Defaults to `noResultsText`.\n     */\n    noresults(): any;\n\n    /**\n     * Renders the group label for an option group.\n     *\n     * @param group The group object.\n     * @param isPointed Function to check if the group is pointed.\n     * @param isSelected Function to check if the group is selected.\n     */\n    grouplabel(props: {\n      group: any;\n      isPointed: (option: any) => boolean;\n      isSelected: (option: any) => boolean;\n    }): any;\n\n    /**\n     * Renders a single option in the dropdown.\n     *\n     * @param option The option object.\n     * @param isPointed Function to check if the option is pointed.\n     * @param isSelected Function to check if the option is selected.\n     * @param search Current search query string.\n     */\n    option(props: {\n      option: any;\n      isPointed: (option: any) => boolean;\n      isSelected: (option: any) => boolean;\n      search: string;\n    }): any;\n\n    /**\n     * Renders the label in single-select mode.\n     * @param value The selected option object.\n     */\n    singlelabel(props: { value: any }): any;\n\n    /**\n     * Renders each tag in `tags` mode.\n     *\n     * @param option The tag/option object.\n     * @param handleTagRemove Function to remove the tag.\n     * @param disabled Whether the tag is disabled.\n     */\n    tag(props: { option: any; handleTagRemove: () => void; disabled: boolean }): any;\n\n    /**\n     * Renders the caret (dropdown arrow).\n     *\n     * @param handleCaretClick Function to toggle dropdown.\n     * @param isOpen Whether the dropdown is open.\n     */\n    caret(props: { handleCaretClick: () => void; isOpen: boolean }): any;\n\n    /**\n     * Renders the clear (remove) icon.\n     *\n     * @param clear Method to clear the current value(s).\n     */\n    clear(props: { clear: () => void }): any;\n\n    /**\n     * Renders a loader icon during async fetching.\n     */\n    spinner(): any;\n\n    /**\n     * Renders a loader icon during infinite scroll loading.\n     */\n    infinite(): any;\n  };\n\n  export interface MultiselectEmits<T = any> {\n    /**\n     * Emitted when the model value changes.\n     *\n     * @param value - The updated value.\n     * @param select$ - The Multiselect component instance.\n     */\n    change: [value: any, select$: MultiselectInstance];\n\n    /**\n     * Emitted after an option or tag is selected.\n     *\n     * @param value - The updated value.\n     * @param option - The option object that was selected.\n     * @param select$ - The Multiselect component instance.\n     */\n    select: [value: any, option: any, select$: MultiselectInstance];\n\n    /**\n     * Emitted after an option or tag is deselected or removed.\n     *\n     * @param value - The updated value.\n     * @param option - The option object that was deselected.\n     * @param select$ - The Multiselect component instance.\n     */\n\n    deselect: [value: any, option: any, select$: any];\n\n    /**\n     * Emitted when the options dropdown is opened.\n     *\n     * @param select$ - The Multiselect component instance.\n     */\n    open: [select$: MultiselectInstance];\n\n    /**\n     * Emitted when the options dropdown is closed.\n     *\n     * @param select$ - The Multiselect component instance.\n     */\n    close: [select$: MultiselectInstance];\n\n    /**\n     * Emitted when the search input query changes.\n     *\n     * @param query - The current search query.\n     * @param select$ - The Multiselect component instance.\n     */\n    "search-change": [query: string, select$: MultiselectInstance];\n\n    /**\n     * Emitted when a new tag is being created by pressing Enter.\n     *\n     * @param query - The search input that triggered tag creation.\n     * @param select$ - The Multiselect component instance.\n     *\n     * @deprecated since v2.3.0 - Use `@create` instead.\n     */\n\n    tag: [query: string, select$: MultiselectInstance];\n\n    /**\n     * Emitted when a new option is being created by pressing Enter.\n     *\n     * @param query - The search input that triggered option creation.\n     * @param select$ - The Multiselect component instance.\n     *\n     * @deprecated since v2.6.0 - Use `@create` instead.\n     */\n\n    option: [query: string, select$: MultiselectInstance];\n\n    /**\n     * Emitted when a new tag or option is created using the search query.\n     *\n     * @param query - The input used to create the option.\n     * @param select$ - The Multiselect component instance.\n     */\n\n    create: [query: string, select$: MultiselectInstance];\n\n    /**\n     * Emitted when the selection is cleared via the clear button.\n     *\n     * @param select$ - The Multiselect component instance.\n     */\n\n    clear: [select$: MultiselectInstance];\n\n    /**\n     * Emitted when the user pastes text into the search field.\n     *\n     * @param event - The native paste event.\n     * @param select$ - The Multiselect component instance.\n     */\n    paste: [event: ClipboardEvent, select$: MultiselectInstance];\n\n    /**\n     * Emitted when a key is pressed down inside the search field.\n     *\n     * @param event - The native keyboard event.\n     * @param select$ - The Multiselect component instance.\n     */\n    keydown: [event: KeyboardEvent, select$: MultiselectInstance];\n\n    /**\n     * Emitted when a key is released inside the search field.\n     *\n     * @param event - The native keyboard event.\n     * @param select$ - The Multiselect component instance.\n     */\n\n    keyup: [event: KeyboardEvent, select$: MultiselectInstance];\n\n    /**\n     * Emitted when the maximum number of selected options is reached\n     * in `multiple` or `tags` mode.\n     *\n     * @param select$ - The Multiselect component instance.\n     */\n\n    max: [select$: MultiselectInstance];\n\n    /**\n     * Emitted when the component is ready and mounted.\n     *\n     * @param select$ - The Multiselect component instance.\n     */\n    ready: [select$?: MultiselectInstance];\n    /**\n     * Emitted when the model value changes.\n     */\n    "update:modelValue": [value: T | T[]];\n  }\n\n  /**\n   * Multiselect component class names used for styling and customization.\n   */\n  export type MultiselectClasses = {\n    container: string;\n    containerDisabled: string;\n    containerOpen: string;\n    containerOpenTop: string;\n    containerActive: string;\n    wrapper: string;\n    singleLabel: string;\n    singleLabelText: string;\n    multipleLabel: string;\n    search: string;\n    tags: string;\n    tag: string;\n    tagDisabled: string;\n    tagWrapper: string;\n    tagWrapperBreak: string;\n    tagRemove: string;\n    tagRemoveIcon: string;\n    tagsSearchWrapper: string;\n    tagsSearch: string;\n    tagsSearchCopy: string;\n    placeholder: string;\n    caret: string;\n    caretOpen: string;\n    clear: string;\n    clearIcon: string;\n    spinner: string;\n    infinite: string;\n    infiniteSpinner: string;\n    dropdown: string;\n    dropdownTop: string;\n    dropdownHidden: string;\n    options: string;\n    optionsTop: string;\n    group: string;\n    groupLabel: string;\n    groupLabelPointable: string;\n    groupLabelPointed: string;\n    groupLabelSelected: string;\n    groupLabelDisabled: string;\n    groupLabelSelectedPointed: string;\n    groupLabelSelectedDisabled: string;\n    groupOptions: string;\n    option: string;\n    optionPointed: string;\n    optionSelected: string;\n    optionDisabled: string;\n    optionSelectedPointed: string;\n    optionSelectedDisabled: string;\n    noOptions: string;\n    noResults: string;\n    fakeInput: string;\n    assist: string;\n    spacer: string;\n  };\n\n  /**\n   * Advanced props for the @vueform/multiselect component.\n   */\n  export interface MultiselectAdvancedProps {\n    /**\n     * Whether values not present in the options list should be allowed.\n     * Useful when using async options and string values where label and value are the same.\n     *\n     * @default false\n     * @example\n     * allowAbsent: true\n     */\n    allowAbsent?: boolean;\n\n    /**\n     * Whether a selected option can be deselected in single-select mode.\n     *\n     * @default true\n     */\n    canDeselect?: boolean;\n\n    /**\n     * Whether selected option(s) can be cleared using the clear button.\n     *\n     * @default true\n     */\n    canClear?: boolean;\n\n    /**\n     * Whether to clear the option list before loading new async options on search input.\n     *\n     * @default false\n     */\n    clearOnSearch?: boolean;\n\n    /**\n     * Whether to clear the option list after selecting an option.\n     * Primarily useful for async loading.\n     *\n     * @default true\n     */\n    clearOnSelect?: boolean;\n\n    /**\n     * Whether to close the option list after selecting an option.\n     *\n     * @default true\n     */\n    closeOnSelect?: boolean;\n\n    /**\n     * Whether to close the option list after deselecting an option.\n     *\n     * @default true\n     */\n    closeOnDeselect?: boolean;\n\n    /**\n     * Whether the search query should be cleared when the input loses focus.\n     *\n     * @default true\n     */\n    clearOnBlur?: boolean;\n\n    /**\n     * Delay in milliseconds between the last typed character and the refresh of the async option list.\n     * Use -1 to disable automatic refresh, 0 for no delay.\n     *\n     * @default -1\n     */\n    delay?: number;\n\n    /**\n     * Whether the results should be filtered by the search query.\n     *\n     * Set to false when you handle filtering on the server side.\n     *\n     * @default true\n     */\n    filterResults?: boolean;\n\n    /**\n     * Minimum number of characters required to trigger async loading.\n     *\n     * Set to 0 to trigger on empty input as well.\n     *\n     * @default 0\n     */\n    minChars?: number;\n\n    /**\n     * Whether async options should be resolved immediately on component mount.\n     *\n     * Required for non-object default values in async mode.\n     *\n     * @default true\n     */\n    resolveOnLoad?: boolean;\n\n    /**\n     * Whether long tags should wrap onto new lines instead of being truncated.\n     *\n     * @default false\n     */\n    breakTags?: boolean;\n\n    /**\n     * Whether new tags should be automatically appended to the option list when using `tags` mode.\n     *\n     * @default true\n     *\n     * @deprecated since v2.3.0 - use `appendNewOption` instead.\n     */\n    appendNewTag?: boolean;\n\n    /**\n     * Whether new tags should be creatable based on the search query when using `tags` mode.\n     *\n     * @default false\n     *\n     * @deprecated since v2.3.0 - use `createOption` instead.\n     */\n    createTag?: boolean;\n\n    /**\n     *\n     * Keys that trigger tag creation in `tags` mode with `createTag` enabled.\n     *\n     * @default [\'enter\']\n     *\n     * @example\n     * addTagOn: [\'enter\', \'comma\']\n     *\n     * @deprecated since v2.3.0 - use `addOptionOn` instead.\n     */\n    addTagOn?: Array<"enter" | "space" | "tab" | ";" | ",">;\n\n    /**\n     * Whether new options should be automatically added to the list when `searchable` and `createOption` are enabled.\n     *\n     * @default true\n     */\n    appendNewOption?: boolean;\n\n    /**\n     * Whether users can create new options via the search field.\n     *\n     * Must be used with `searchable: true`.\n     *\n     * @default false\n     */\n    createOption?: boolean;\n\n    /**\n     * Keys that trigger the creation of a new option when `createOption` is enabled.\n     *\n     * @default [\'enter\']\n     */\n    addOptionOn?: Array<"enter" | "space" | "tab" | ";" | ",">;\n\n    /**\n     * Callback for transforming the created option before it gets added to the option list.\n     *\n     * Return false to cancel creation and handle it manually.\n     *\n     * @param option - The original object to be added (`{ value, label }`)\n     * @param select$ - The Multiselect component instance\n     *\n     * @returns A transformed object with required keys or `false` to cancel.\n     *\n     * @example\n     * onCreate(option, select$) {\n     *   return {\n     *     value: option.label.toLowerCase(),\n     *     label: option.label,\n     *     trackBy: \'value\'\n     *   }\n     * }\n     */\n    onCreate?: (option: any, select$: MultiselectInstance) => any | false;\n\n    /**\n     * Whether selected options should be hidden from the options list.\n     *\n     * Applies to `multiple` and `tags` modes.\n     *\n     * @default true\n     */\n    hideSelected?: boolean;\n\n    /**\n     * Whether the options list should be shown at all.\n     *\n     * Useful for creating free-type entries (e.g., tags).\n     *\n     * @default true\n     */\n    showOptions?: boolean;\n\n    /**\n     * Whether to treat `value` as a complex object.\n     *\n     * @default false\n     *\n     * @example\n     * object: true // Value will be an array of objects: [{ value, label }]\n     */\n    object?: boolean;\n\n    /**\n     * Additional HTML attributes to pass to the native search `input` element.\n     *\n     * @default {}\n     * @example\n     * attrs: {\n     *   \'aria-label\': \'Search options\',\n     *   \'data-custom\': \'value\'\n     * }\n     */\n    attrs?: Record<string, any>;\n\n    /**\n     * Whether to add hidden inputs for form support (native submit).\n     *\n     * @default false\n     */\n    nativeSupport?: boolean;\n  }\n\n  export type MultiselectProps = {\n    /**\n     * Determines the selection mode.\n     *\n     * @default \'single\'\n     * @example \'multiple\'\n     */\n    mode?: "single" | "multiple" | "tags";\n\n    /**\n     * The list of selectable options.\n     * Can be an array, object, or async function.\n     *\n     * @default []\n     * @example [\'Apple\', \'Banana\']\n     * @example { a: 1, b: 2 }\n     * @example (query, instance) => Promise.resolve([{ value: 1, label: \'One\' }])\n     */\n    options?:\n      | OptionItem[]\n      | Record<string, any>\n      | ((query?: string, select$?: MultiselectInstance) => Promise<OptionItem[]>);\n\n    /**\n     * Whether the options should be grouped.\n     *\n     * @default false\n     * \n     * @example\n     * ```js\n     * const options = [\n        {\n          label: "DC",\n          options: ["Batman", "Robin", "Joker"],\n        },\n        {\n          label: "Marvel",\n          options: ["Spider-man", "Iron Man", "Captain America"],\n        },\n      ];\n      * ```\n     */\n    groups?: boolean;\n\n    /**\n     * Property name for group label.\n     * Used when `groups` is true.\n     *\n     * @default \'label\'\n     */\n    groupLabel?: string;\n\n    /**\n     * Property name for group options.\n     * Used when `groups` is true.\n     *\n     * @default \'options\'\n     */\n    groupOptions?: string;\n\n    /**\n     * Whether group headers can be selected.\n     * Only applies to `multiple` or `tags` mode.\n     *\n     * @default true\n     */\n    groupSelect?: boolean;\n\n    /**\n     * Hide groups that have no options.\n     *\n     * @default false\n     */\n    groupHideEmpty?: boolean;\n\n    /**\n     * Use the native HTML5 `required` attribute.\n     *\n     * @default false\n     */\n    required?: boolean;\n\n    /**\n     * Enables infinite scroll loading.\n     *\n     * The `limit` option defines how many options are loaded initially and in each new batch.\n     *\n     * @default false\n     */\n    infinite?: boolean;\n\n    /**\n     * Whether to append the dropdown to <body>.\n     *\n     * @default false\n     */\n    appendToBody?: boolean;\n\n    /**\n     * Append dropdown to a custom element using query selector.\n     *\n     * @example \'#my-container\'\n     */\n    appendTo?: string;\n\n    /**\n     * Close dropdown on parent scroll when `appendToBody` is true.\n     *\n     * @default false\n     */\n    closeOnScroll?: boolean;\n\n    /**\n     * Enable search input in the dropdown.\n     *\n     * @default false\n     */\n    searchable?: boolean;\n\n    /**\n     * Property used for the value in object-based options.\n     *\n     * @default \'value\'\n     *\n     * @example \'id\'\n     *\n     * @example\n     * \n     * ```js\n     const options = [\n        { id: 1, label: \'Apple\' },\n        { id: 2, label: \'Banana\' },\n      ];\n      ```\n     */\n    valueProp?: string;\n\n    /**\n     * Property or list of properties to use for searching.\n     *\n     * @example \'name\'\n     * @example [\'name\', \'email\']\n     */\n    trackBy?: string | string[];\n\n    /**\n     * Property used for displaying the label.\n     *\n     * @default \'label\'\n     */\n    label?: string;\n\n    /**\n     * Property used to mark options as disabled.\n     *\n     * @default \'disabled\'\n     */\n    disabledProp?: string;\n\n    /**\n     * Placeholder text before selection.\n     *\n     * @default null\n     */\n    placeholder?: string | null;\n\n    /**\n     * Custom label renderer for multiple selected options.\n     *\n     * @example (value, select$) => `${value.length} selected`\n     */\n    multipleLabel?: (value: OptionValue[], select$: MultiselectInstance) => string;\n\n    /**\n     * Whether the component is disabled.\n     *\n     * @default false\n     */\n    disabled?: boolean;\n\n    /**\n     * `type` attribute for the search input.\n     *\n     * @default \'text\'\n     */\n    inputType?: string;\n\n    /**\n     * `autocomplete` attribute for the search input.\n     */\n    autocomplete?: string;\n\n    /**\n     * Enables RTL support.\n     *\n     * @default false\n     */\n    rtl?: boolean;\n\n    /**\n     * Max number of selections allowed.\n     * Applies to `multiple` and `tags` modes.\n     *\n     * @default -1 (no limit)\n     */\n    max?: number;\n\n    /**\n     * Max number of options displayed.\n     *\n     * @default -1 (no limit)\n     */\n    limit?: number;\n\n    /**\n     * Whether a loading spinner should be shown.\n     *\n     * @default false\n     */\n    loading?: boolean;\n\n    /**\n     * ID of the outer container.\n     *\n     * @default \'multiselect\'\n     */\n    id?: string;\n\n    /**\n     * Show the dropdown caret icon.\n     *\n     * @default true\n     */\n    caret?: boolean;\n\n    /**\n     * Multiselect locale key (e.g., \'en\', \'fr\').\n     *\n     * @default null\n     */\n    locale?: string;\n\n    /**\n     * Text displayed when options list is empty.\n     *\n     * @default \'The list is empty\'\n     */\n    noOptionsText?: string | Record<string, string>;\n\n    /**\n     * Text displayed when no search results are found.\n     *\n     * @default \'No results found\'\n     */\n    noResultsText?: string | Record<string, string>;\n\n    /**\n     * Position of the dropdown relative to the input.\n     *\n     * @default \'bottom\'\n     */\n    openDirection?: "top" | "bottom";\n\n    /**\n     * Whether to reverse the dropdown options.\n     *\n     * Only applies when `groups: false`.\n     *\n     * @default false\n     */\n    reverse?: boolean;\n\n    /**\n     * Regex pattern for validating input.\n     *\n     * @example /^[A-Z]/\n     */\n    regex?: string | RegExp;\n\n    /**\n     * Respect accents/diacritics in search.\n     *\n     * @default true\n     */\n    strict?: boolean;\n\n    /**\n     * Match search term from the beginning of string.\n     *\n     * @default false\n     */\n    searchStart?: boolean;\n\n    /**\n     * Override default search algorithm.\n     */\n    searchFilter?: (option: OptionItem, query: string, select$: MultiselectInstance) => boolean;\n\n    /**\n     * ARIA attributes for accessibility.\n     *\n     * @example { \'aria-label\': \'Select fruit\' }\n     */\n    aria?: Record<string, string>;\n\n    /**\n     * Object to customize classes.\n     *\n     * Accepts partial override of all component parts.\n     */\n    classes?: Partial<MultiselectClasses>;\n  };\n</script>\n\n<script setup lang="ts" generic="T extends any">\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const multiselect = useTemplateRef<MultiselectInstance>("multiselect");\n\n  const props = defineProps<\n    {\n      /**\n       * Default value for the multiselect.\n       */\n      modelValue?: T | T[];\n      /**\n       * The label to display above the components\n       */\n      formLabel?: string;\n      /**\n       * The default `id` for the input element.\n       */\n      id?: string;\n      /**\n       * Hint to display below the input.\n       *\n       * Can be used to provide additional information or instructions.\n       */\n      hint?: string;\n      /**\n       * Any custom rule to pass to `vee-validate` for validation.\n       */\n      rules?: any;\n      /**\n       * Whether the field should be validated as soon as the component is mounted.\n       *\n       */\n      validateOnMount?: boolean;\n      /**\n       * The name of the field. Used for validation.\n       */\n      name?: string;\n    } & MultiselectProps &\n      MultiselectAdvancedProps\n  >();\n\n  const emits = defineEmits<MultiselectEmits<T>>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, ["modelValue", "formLabel", "hint", "id", "name"]),\n    emits\n  );\n\n  const inputId = props.id || useId();\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n\n  defineExpose({\n    multiselect: multiselect.value,\n    open: multiselect.value?.open,\n    close: multiselect.value?.close,\n    select: multiselect.value?.select,\n    deselect: multiselect.value?.deselect,\n    remove: multiselect.value?.remove,\n    selectAll: multiselect.value?.selectAll,\n    clear: multiselect.value?.clear,\n    clearSearch: multiselect.value?.clearSearch,\n    refreshOptions: multiselect.value?.refreshOptions,\n    setPointer: multiselect.value?.setPointer,\n  });\n\n  defineSlots<MultiselectSlots>();\n\n  const slots = useSlots();\n</script>\n\n<style>\n  :root {\n    --ms-font-size: var(--text-sm);\n    --ms-line-height: 1.35;\n    --ms-bg: transparent;\n    --ms-bg-disabled: transparent;\n    --ms-border-color: var(--color-input);\n    --ms-border-width: 1px;\n    --ms-border-color-active: var(--color-primary);\n    --ms-border-width-active: 1px;\n    --ms-radius: var(--radius-md);\n    --ms-py: calc(var(--spacing) * 2);\n    --ms-px: calc(var(--spacing) * 3);\n    --ms-ring-width: 3px;\n    --ms-ring-color: --alpha(var(--color-ring) / 50%);\n    --ms-placeholder-color: var(--color-muted-foreground);\n    --ms-max-height: 300px;\n\n    --ms-spinner-color: var(--color-muted-foreground);\n    --ms-caret-color: var(--color-muted-foreground);\n    --ms-clear-color: var(--color-muted-foreground);\n    --ms-clear-color-hover: var(--color-primary);\n\n    --ms-tag-font-size: var(--text-xs);\n    --ms-tag-line-height: 1.3rem;\n    --ms-tag-font-weight: 500;\n    --ms-tag-bg: transparent;\n    --ms-tag-bg-disabled: var(--color-muted);\n    --ms-tag-color: var(--color-foreground);\n    --ms-tag-color-disabled: var(--color-muted-foreground);\n    --ms-tag-radius: calc(var(--radius) - 4px);\n    --ms-tag-py: 2px;\n\n    --ms-dropdown-bg: var(--color-background);\n    --ms-dropdown-border-color: var(--color-border);\n    --ms-dropdown-border-width: 1px;\n    --ms-dropdown-radius: var(--radius-md);\n\n    --ms-group-label-bg: transparent;\n    --ms-group-label-color: var(--color-muted-foreground);\n    --ms-group-label-bg-pointed: var(--color-accent);\n    --ms-group-label-color-pointed: var(--color-accent-foreground);\n    --ms-group-label-bg-disabled: transparent;\n    --ms-group-label-color-disabled: --alpha(var(--color-accent-foreground) / 50%);\n    --ms-group-label-bg-selected: var(--color-accent);\n    --ms-group-label-color-selected: var(--color-accent-foreground);\n    --ms-group-label-bg-selected-pointed: var(--color-accent);\n    --ms-group-label-color-selected-pointed: var(--color-accent-foreground);\n    --ms-group-label-bg-selected-disabled: transparent;\n    --ms-group-label-color-selected-disabled: --alpha(var(--color-accent-foreground) / 50%);\n\n    --ms-option-font-size: var(--text-sm);\n    --ms-option-bg-pointed: var(--color-accent);\n    --ms-option-color-pointed: var(--color-accent-foreground);\n    --ms-option-bg-selected: var(--color-accent);\n    --ms-option-color-selected: var(--color-accent-foreground);\n    --ms-option-bg-disabled: transparent;\n    --ms-option-color-disabled: --alpha(var(--color-accent-foreground) / 50%);\n    --ms-option-bg-selected-pointed: var(--color-accent);\n    --ms-option-color-selected-pointed: var(--color-accent-foreground);\n    --ms-option-bg-selected-disabled: transparent;\n    --ms-option-color-selected-disabled: var(--color-muted-foreground);\n\n    --ms-empty-color: var(--color-muted-foreground);\n  }\n\n  .dark {\n    --ms-bg: --alpha(var(--color-input) / 30%);\n    --ms-dropdown-bg: var(--color-popover);\n  }\n\n  .multiselect-group-label {\n    padding: 8px 8px;\n    font-weight: normal;\n    font-size: 12px;\n    color: var(--color-muted-foreground);\n  }\n  .multiselect-options {\n    padding: 4px;\n  }\n\n  .multiselect-option {\n    border-radius: var(--radius-md);\n    margin-bottom: 3px;\n    &:last-child {\n      margin-bottom: 0px;\n    }\n  }\n  .multiselect-dropdown {\n    bottom: -8px;\n  }\n\n  .multiselect-tag {\n    border: 1px solid var(--color-border);\n  }\n\n  .multiselect {\n    box-shadow: 0 1px 2px 0 --alpha(var(--color-black) / 5%);\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Checkbox - Native",
    value: "vee-native-checkbox",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["label"],
    files: [
      {
        fileName: "Vee/NativeCheckbox.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div>\n    <div :class="nativeCheckboxStyles().wrapper({ class: props.wrapperClass })">\n      <input\n        :id="inputId"\n        :checked="checked"\n        type="checkbox"\n        :data-indeterminate="indeterminate"\n        :data-checked="checked"\n        :data-disabled="disabled"\n        :data-required="required"\n        :class="\n          nativeCheckboxStyles().checkbox({\n            error: !!errorMessage,\n            disabled,\n            size,\n            color,\n            class: props.class,\n          })\n        "\n        v-bind="{ ...forwarded, ...$attrs }"\n        @change="handleChange"\n        @input="handleChange"\n      />\n      <label\n        v-if="hasLabel || hasDescription || errorMessage"\n        :for="inputId"\n        class="flex flex-col gap-1 text-sm leading-[1.25]"\n      >\n        <slot name="label">\n          <span\n            v-if="label"\n            :class="nativeCheckboxStyles().label({ disabled, class: props.labelClass })"\n            >{{ label }}</span\n          >\n        </slot>\n        <slot name="description">\n          <span\n            v-if="description"\n            :class="nativeCheckboxStyles().description({ disabled, class: props.descriptionClass })"\n            >{{ description }}</span\n          >\n        </slot>\n        <AnimatePresence>\n          <motion.p\n            v-if="errorMessage"\n            :variants\n            initial="initial"\n            exit="initial"\n            animate="animate"\n            :transition="{ type: \'keyframes\' }"\n            :class="nativeCheckboxStyles().error({ disabled })"\n          >\n            {{ errorMessage }}\n          </motion.p>\n        </AnimatePresence>\n      </label>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import { reactiveOmit } from "@vueuse/core";\n  import { motion } from "motion-v";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n  export const nativeCheckboxStyles = tv({\n    slots: {\n      checkbox:\n        "peer form-checkbox shrink-0 cursor-pointer rounded-[4px] border border-input bg-background shadow-xs transition duration-200 focus:ring-[3px] focus:ring-ring/50 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",\n      label: "cursor-pointer font-medium",\n      description: "text-pretty text-muted-foreground",\n      wrapper: "flex items-start gap-3",\n      error: "text-destructive",\n    },\n    variants: {\n      size: { sm: { checkbox: "size-3.5" }, md: { checkbox: "size-4" } },\n      color: {\n        red: { checkbox: "border-red-500 text-red-500 focus:ring-red-500/50" },\n        orange: { checkbox: "border-orange-500 text-orange-500 focus:ring-orange-500/50" },\n        amber: { checkbox: "border-amber-500 text-amber-500 focus:ring-amber-500/50" },\n        yellow: { checkbox: "border-yellow-500 text-yellow-500 focus:ring-yellow-500/50" },\n        lime: { checkbox: "border-lime-500 text-lime-500 focus:ring-lime-500/50" },\n        green: { checkbox: "border-green-500 text-green-500 focus:ring-green-500/50" },\n        emerald: { checkbox: "border-emerald-500 text-emerald-500 focus:ring-emerald-500/50" },\n        teal: { checkbox: "border-teal-500 text-teal-500 focus:ring-teal-500/50" },\n        cyan: { checkbox: "border-cyan-500 text-cyan-500 focus:ring-cyan-500/50" },\n        sky: { checkbox: "border-sky-500 text-sky-500 focus:ring-sky-500/50" },\n        blue: { checkbox: "border-blue-500 text-blue-500 focus:ring-blue-500/50" },\n        indigo: { checkbox: "border-indigo-500 text-indigo-500 focus:ring-indigo-500/50" },\n        violet: { checkbox: "border-violet-500 text-violet-500 focus:ring-violet-500/50" },\n        purple: { checkbox: "border-purple-500 text-purple-500 focus:ring-purple-500/50" },\n        fuchsia: { checkbox: "border-fuchsia-500 text-fuchsia-500 focus:ring-fuchsia-500/50" },\n        pink: { checkbox: "border-pink-500 text-pink-500 focus:ring-pink-500/50" },\n        rose: { checkbox: "border-rose-500 text-rose-500 focus:ring-rose-500/50" },\n        slate: { checkbox: "border-slate-600 text-slate-600 focus:ring-slate-600/50" },\n        gray: { checkbox: "border-gray-600 text-gray-600 focus:ring-gray-600/50" },\n        zinc: { checkbox: "border-zinc-600 text-zinc-600 focus:ring-zinc-600/50" },\n        neutral: { checkbox: "border-neutral-600 text-neutral-600 focus:ring-neutral-600/50" },\n        stone: { checkbox: "border-stone-600 text-stone-600 focus:ring-stone-600/50" },\n      },\n      error: {\n        true: { checkbox: "border-destructive text-destructive focus:ring-destructive/30" },\n      },\n      disabled: {\n        true: {\n          checkbox: "pointer-events-none opacity-50",\n          label: "cursor-not-allowed opacity-50",\n          description: "cursor-not-allowed opacity-50",\n          error: "cursor-not-allowed opacity-70",\n        },\n      },\n    },\n    defaultVariants: {\n      color: "blue",\n      size: "md",\n    },\n  });\n\n  export type NativeCheckboxProps = {\n    /** Custom class(es) to add to the element */\n    class?: HTMLAttributes["class"];\n    /** Custom class(es) to add to the label element */\n    labelClass?: HTMLAttributes["class"];\n    /** Custom class(es) to add to the description element */\n    descriptionClass?: HTMLAttributes["class"];\n    /** Custom class(es) to add to the wrapper element */\n    wrapperClass?: HTMLAttributes["class"];\n    /** The id of the checkbox input element */\n    id?: string;\n    /** The v-model binding for the checkbox */\n    modelValue?: any;\n    /** The name of the checkbox input element */\n    name?: string;\n    /** The value of the checkbox input element */\n    value?: any;\n    /** Whether the checkbox is disabled */\n    disabled?: boolean;\n    /** Whether the checkbox is required */\n    required?: boolean;\n    /** Whether the checkbox is indeterminate */\n    indeterminate?: boolean;\n    /**\n     * The color variant of the checkbox\n     *\n     * @default blue\n     */\n    color?: VariantProps<typeof nativeCheckboxStyles>["color"];\n    /**\n     * The size variant of the checkbox\n     *\n     * @default md\n     */\n    size?: VariantProps<typeof nativeCheckboxStyles>["size"];\n    /** The label for the checkbox */\n    label?: string;\n    /** The description for the checkbox */\n    description?: string;\n    /** The validation rules for the checkbox */\n    rules?: any;\n    /** Whether to validate the checkbox on mount */\n    validateOnMount?: boolean;\n    /** The value to use when the checkbox is unchecked */\n    unCheckedValue?: any;\n  };\n</script>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(defineProps<NativeCheckboxProps>(), {});\n  const inputId = props.id || `checkbox-${useId()}`;\n\n  const forwarded = reactiveOmit(\n    props,\n    "class",\n    "id",\n    "modelValue",\n    "label",\n    "description",\n    "color",\n    "size",\n    "labelClass",\n    "descriptionClass",\n    "wrapperClass",\n    "rules",\n    "validateOnMount",\n    "unCheckedValue"\n  );\n  const slots = useSlots();\n  const hasLabel = computed(() => !!slots.label || !!props.label);\n  const hasDescription = computed(() => !!slots.description || !!props.description);\n\n  const { errorMessage, checked, handleChange } = useField(\n    () => props.name || inputId,\n    props.rules,\n    {\n      initialValue: props.modelValue,\n      syncVModel: true,\n      label: props.label,\n      validateOnMount: props.validateOnMount,\n      type: "checkbox",\n      checkedValue: props.value || true,\n      uncheckedValue: props.unCheckedValue || false,\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee NumberField",
    value: "vee-number-field",
    deps: ["@vee-validate/nuxt", "@internationalized/number"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["label", "number-field"],
    files: [
      {
        fileName: "Vee/NumberField.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <UiNumberField\n        v-bind="($attrs, props)"\n        :id="inputId"\n        v-model="value"\n        :disabled="disabled"\n        :required="required"\n        :aria-invalid="!!errorMessage"\n        :name="name"\n      >\n        <template v-for="(_, slotName) in $slots" #[slotName]="scope">\n          <slot :name="slotName" v-bind="scope" />\n        </template>\n      </UiNumberField>\n    </div>\n    <AnimatePresence as="div" multiple mode="wait">\n      <motion.p\n        v-if="hint && !errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-muted-foreground"\n      >\n        {{ hint }}\n      </motion.p>\n\n      <motion.p\n        v-if="errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-destructive"\n      >\n        {{ errorMessage }}\n      </motion.p>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { motion } from "motion-v";\n  import type { NumberFieldRootProps } from "reka-ui";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  interface Props extends NumberFieldRootProps {\n    /**\n     * The label to display above the field\n     */\n    label?: string;\n    /**\n     * The label hint to display next to the label.\n     */\n    labelHint?: string;\n    /**\n     * Hint to display below the input field.\n     */\n    hint?: string;\n    /**\n     * Whether the field is disabled.\n     */\n    disabled?: boolean;\n    /**\n     * The name of the field, used for form submission.\n     */\n    name?: string;\n    /**\n     * The id of the input element.\n     */\n    id?: string;\n    /**\n     * Rules for the field validation.\n     */\n    rules?: any;\n    /**\n     * Whether to validate the field on mount.\n     */\n    validateOnMount?: boolean;\n    /**\n     * Whether the field is required.\n     */\n    required?: boolean;\n  }\n  const props = defineProps<Props>();\n\n  const inputId = computed(() => props.id || useId());\n\n  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Pin-Input",
    value: "vee-pin-input",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["label", "pin-input"],
    files: [
      {
        fileName: "Vee/PinInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <UiPinInput\n        :id="inputId"\n        v-bind="{ ...$attrs, ...forwarded }"\n        v-model="value"\n        :aria-invalid="!!errorMessage"\n        @complete="emits(\'complete\', $event)"\n      />\n    </div>\n    <AnimatePresence as="div" multiple mode="wait">\n      <motion.p\n        v-if="hint && !errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-muted-foreground"\n      >\n        {{ hint }}\n      </motion.p>\n\n      <motion.p\n        v-if="errorMessage"\n        :variants\n        initial="initial"\n        exit="initial"\n        animate="animate"\n        :transition="{ type: \'keyframes\' }"\n        class="mt-1.5 text-sm text-destructive"\n      >\n        {{ errorMessage }}\n      </motion.p>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { motion } from "motion-v";\n  import type { PinInputRootProps } from "reka-ui";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<\n    Omit<PinInputRootProps, "as" | "asChild"> & {\n      label?: string;\n      hint?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      separator?: string;\n      inputCount?: number;\n    }\n  >();\n\n  const emits = defineEmits<{\n    complete: [value: string[]];\n    "update:modelValue": [value: string[]];\n  }>();\n\n  const forwarded = reactiveOmit(\n    props,\n    "label",\n    "hint",\n    "id",\n    "rules",\n    "validateOnMount",\n    "modelValue"\n  );\n  const inputId = props.id || useId();\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue || [],\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee RadioGroup",
    value: "vee-radio-group",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["radio-group", "label"],
    files: [
      {
        fileName: "Vee/RadioGroup.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <slot name="label" :error-message="errorMessage" :value="value">\n      <UiLabel v-if="label" class="mb-5 leading-none" :class="[errorMessage && \'text-destructive\']"\n        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n      >\n    </slot>\n    <UiRadioGroup v-bind="{ ...forwarded, ...$attrs }" v-model="value">\n      <slot />\n    </UiRadioGroup>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n  import { useForwardProps } from "reka-ui";\n  import type { RadioGroupRootProps } from "reka-ui";\n  import type { HTMLAttributes } from "vue";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<\n    RadioGroupRootProps & {\n      label?: string;\n      hint?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      class?: HTMLAttributes["class"];\n      name: string;\n    }\n  >();\n\n  const forwarded = useForwardProps(props);\n  const styles = tv({\n    base: "flex flex-col",\n  });\n\n  defineOptions({ inheritAttrs: false });\n\n  const { errorMessage, value } = useField(() => props.name, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    type: "radio",\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Select",
    value: "vee-select",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["native-select", "label"],
    files: [
      {
        fileName: "Vee/Select.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" lass="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground" />\n        </span>\n      </slot>\n      <UiNativeSelect\n        :id="inputId"\n        v-model="value"\n        :required="required"\n        :trailing-icon="trailingIcon"\n        :aria-invalid="!!errorMessage"\n        :name="name"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        @blur="handleBlur"\n      >\n        <slot />\n      </UiNativeSelect>\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    trailingIcon?: string;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Tags-Input",
    value: "vee-tags-input",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["tags-input", "label"],
    files: [
      {
        fileName: "Vee/TagsInput.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiTagsInput\n        v-model="value"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n      >\n        <UiTagsInputItem\n          v-for="tag in value"\n          :key="tag"\n          :aria-invalid="!!errorMessage"\n          :value="tag"\n        />\n        <UiTagsInputInput\n          :id="inputId"\n          class="dark:bg-transparent"\n          :aria-invalid="!!errorMessage"\n          :placeholder="placeholder"\n        />\n      </UiTagsInput>\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string[];\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Textarea",
    value: "vee-textarea",
    deps: ["@vee-validate/nuxt"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: ["textarea", "label"],
    files: [
      {
        fileName: "Vee/Textarea.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute top-3 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="size-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiTextarea\n        :id="inputId"\n        v-model="value"\n        :required="required"\n        :rows="rows"\n        :name="name"\n        :aria-invalid="!!errorMessage"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        :placeholder="placeholder"\n        @blur="handleBlur"\n      />\n    </div>\n    <AnimatePresence multiple as="div" mode="wait">\n      <slot name="hint" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="hint && !errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-muted-foreground"\n        >\n          {{ hint }}\n        </motion.p>\n      </slot>\n      <slot name="errorMessage" :error-message="errorMessage" :value>\n        <motion.p\n          v-if="errorMessage"\n          :variants\n          initial="initial"\n          exit="initial"\n          animate="animate"\n          :transition="{ type: \'keyframes\' }"\n          class="mt-1.5 text-sm text-destructive"\n        >\n          {{ errorMessage }}\n        </motion.p>\n      </slot>\n    </AnimatePresence>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { AnimatePresence, motion } from "motion-v";\n\n  const variants = {\n    initial: { opacity: 0, y: -2 },\n    animate: { opacity: 1, y: 0 },\n  };\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    placeholder?: string;\n    rows?: number;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee VueFormSlider",
    value: "vee-vue-form-slider",
    deps: ["@vee-validate/nuxt", "@vueform/slider"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt"],
    components: [],
    files: [
      {
        fileName: "Vee/VueFormSlider.vue",
        dirPath: "app/components/Ui",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <Slider v-bind="{ ...forwarded, ...$attrs }" v-model="model" />\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts">\n  import Slider from "@vueform/slider";\n  import { useForwardPropsEmits } from "reka-ui";\n\n  export type SliderFormatObject = {\n    /**\n     * Prefix to prepend to the value.\n     * @example "$"\n     */\n    prefix?: string;\n    /**\n     * Suffix to append to the value.\n     * @example "USD"\n     */\n    suffix?: string;\n    /**\n     * Number of decimals to show.\n     * @example 2\n     */\n    decimals?: number;\n    /**\n     * Character to use as thousand separator.\n     * @example ","\n     */\n    thousand?: string;\n  };\n\n  export interface SliderProps {\n    /**\n     * The hint to display below the slider.\n     */\n    hint?: string;\n    /**\n     * The rules for the slider. Used with vee-validate for validation.\n     */\n    rules?: any;\n    /**\n     * Whether the slider should be validated on mount.\n     */\n    validateOnMount?: boolean;\n    /**\n     * The label of the slider. Used with vee-validate for error messages\n     */\n    label?: string;\n    /**\n     * The name we want to give this slider in the form.\n     */\n    name?: string;\n    /**\n     * The id attribute of slider container DOM.\n     * @default "slider"\n     */\n    id?: string;\n    /**\n     * Whether to update v-model only when the slider value is set and not while dragging.\n     *\n     * If disabled you must not use inline objects as props (eg. format, options, classes) but outsource them to a data property.\n     *\n     * @default true\n     */\n    lazy?: boolean;\n    /**\n     * Whether the slider should be disabled.\n     * @default false\n     */\n    disabled?: boolean;\n    /**\n     * Minimum value of the slider.\n     * @default 0\n     */\n    min?: number;\n    /**\n     * Maximum value of the slider.\n     * @default 100\n     */\n    max?: number;\n    /**\n     * The jump between intervals. If `-1` it enables fractions (eg. `1.23`).\n     * @default 1\n     */\n    step?: number;\n    /**\n     * Whether tooltips should show above handlers.\n     * @default true\n     */\n    tooltips?: boolean;\n    /**\n     * When tooltips should be shown.\n     * @default "always"\n     */\n    showTooltip?: "always" | "focus" | "drag";\n    /**\n     * The step distance between two handles when their tooltips should be merged (when step is `-1` then `1` is assumed).\n     *\n     * @example\n     *\n     * ```js\n     * { merge: 5, step: 10 }\n     * // values: 0, <=50 will merge\n     * // values: 0, 60 will not merge\n     *\n     * { merge: 5, step: -1 }\n     *\n     * // values: 0, <=5 will merge\n     * // values: 0, 5.01 will not merge\n     *\n     * ```\n     * @default -1\n     */\n    merge?: number;\n    /**\n     * Formats the tooltip.\n     *\n     * It can be either a function that receives a `value` param and expects a string or number as return or an object with the following properties:\n     *\n     *\n     * prefix - eg $ -> $100\n     *\n     * suffix - eg USD -> 100USD\n     *\n     * decimals - eg 2 -> 100.00\n     *\n     * thousand - eg , - 1,000\n     */\n    format?: SliderFormatObject | ((value: number) => string | number);\n    /**\n     * The orientation of the slider.\n     * @default "horizontal"\n     */\n    orientation?: "horizontal" | "vertical";\n    /**\n     * The direction of the slider.\n     *\n     * By default value increases left-to-right and top-to-bottom, which is reversed when using `rtl`.\n     *\n     * @default "ltr"\n     */\n    direction?: "ltr" | "rtl";\n    /**\n     * The position of the slider tooltips.\n     *\n     * Possible values: `null` | `top` | `bottom` | `left` | `right` depending on orientation prop.\n     *\n     * When null it equals to orientation default (`top` for `horizontal` and `left` for `vertical`).\n     * @default null\n     */\n    tooltipPosition?: null | "top" | "bottom" | "left" | "right";\n    /**\n     * An object containing aria attributes to be added for each handle.\n     */\n    aria?: Record<string, any>;\n    /**\n     * Sets the aria-labelledby attribute of handles.\n     */\n    ariaLabelledby?: string;\n    /**\n     * Additional options for noUiSlider.\n     * @see https://refreshless.com/nouislider/slider-options/\n     */\n    options?: Record<string, any>;\n    /**\n     * Initial value of the slider.\n     */\n    modelValue?: any;\n    value?: any;\n    /**\n     * An object of class names that gets merged with the default values\n     */\n    classes?: Record<string, any>;\n    /**\n     * Whether the slider is required.\n     *\n     * @default false\n     */\n    required?: boolean;\n  }\n\n  export type SliderEmits = {\n    /**\n     * Emitted when dragging the slider is finished or it\'s value changed by clicking, keyboard or programmatically set.\n     */\n    change: [v: any];\n    /**\n     * Emitted in the same scenarios as in `@change`, but also when the slider is being dragged if `lazy` option is disabled.\n     */\n    update: [v: any];\n    /**\n     * Emitted in the same scenarios as in `@change`, but also when the slider\'s `.set()` method is called.\n     */\n    set: [v: any];\n    /**\n     * Emitted while the slider moves.\n     */\n    slide: [v: any];\n    /**\n     * Emitted the slider connect moves while dragging.\n     */\n    drag: [v: any];\n    /**\n     * Emitted when the handle is activated and dragging started.\n     */\n    start: [v: any];\n    /**\n     * Emitted when the dragging ended.\n     */\n    end: [v: any];\n    /**\n     * Emitted when the slider\'s value is updated.\n     */\n    "update:modelValue": [v: any];\n  };\n</script>\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(defineProps<SliderProps>(), {\n    showTooltip: "drag",\n  });\n\n  const emits = defineEmits<SliderEmits>();\n\n  const inputId = props.id || useId();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const { errorMessage, value: model } = useField(\n    () => props.name || props.id || useId(),\n    props.rules,\n    {\n      initialValue: props.modelValue,\n      label: props.label,\n      validateOnMount: props.validateOnMount,\n      syncVModel: true,\n    }\n  );\n</script>\n\n<style src="@vueform/slider/themes/default.css"></style>\n\n<style>\n  :root {\n    --slider-bg: var(--color-muted);\n    --slider-connect-bg: var(--color-primary);\n    --slider-connect-bg-disabled: --alpha(var(--color-primary) / 45%);\n    --slider-height: 6px;\n    --slider-vertical-height: 300px;\n    --slider-radius: 999999px;\n\n    --slider-handle-bg: var(--color-background);\n    --slider-handle-border: 1px solid var(--color-primary);\n    --slider-handle-width: 16px;\n    --slider-handle-height: 16px;\n    --slider-handle-radius: 99999px;\n    --slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);\n    --slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.42);\n    --slider-handle-ring-width: 3px;\n    --slider-handle-ring-color: --alpha(var(--color-ring) / 50%);\n\n    --slider-tooltip-font-size: 12px;\n    --slider-tooltip-line-height: 1.33rem;\n    --slider-tooltip-font-weight: 500;\n    --slider-tooltip-min-width: fit-content;\n    --slider-tooltip-bg: var(--color-popover);\n    --slider-tooltip-bg-disabled: --alpha(var(--color-popover) / 90%);\n    --slider-tooltip-color: var(--color-popover-foreground);\n    --slider-tooltip-radius: var(--radius-md);\n    --slider-tooltip-py: 2px;\n    --slider-tooltip-px: 8px;\n    --slider-tooltip-arrow-size: 0px;\n    --slider-tooltip-distance: 4px;\n  }\n\n  .slider-tooltip {\n    border: 1px solid var(--color-border);\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
];
