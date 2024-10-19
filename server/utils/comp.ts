export default [
  {
    name: "Accordion",
    value: "accordion",
    instructions: ["Remember to add the accordion animations to your tailwind.config.js"],
    files: [
      {
        fileName: "Accordion/Accordion.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AccordionRoot v-slot="rootSlotProps" v-bind="forwarded">\n    <slot v-bind="rootSlotProps" :items="items">\n      <template v-for="(item, i) in items" :key="i">\n        <UiAccordionItem v-slot="itemSlotProps" :disabled="item.disabled" :value="item.value">\n          <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="header">\n            <UiAccordionHeader>\n              <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="trigger">\n                <UiAccordionTrigger :title="item.title" :icon="item.icon" />\n              </slot>\n            </UiAccordionHeader>\n          </slot>\n          <slot name="content" v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }">\n            <UiAccordionContent :content="item.content" />\n          </slot>\n        </UiAccordionItem>\n      </template>\n    </slot>\n  </AccordionRoot>\n</template>\n\n<script setup lang="ts">\n  import { AccordionRoot, useForwardPropsEmits } from "radix-vue";\n  import type { AccordionRootEmits, AccordionRootProps } from "radix-vue";\n\n  export interface AccordionItem {\n    title?: string;\n    content?: string;\n    value: string;\n    disabled?: boolean;\n    icon?: string;\n  }\n\n  const props = withDefaults(\n    defineProps<\n      AccordionRootProps & {\n        items?: AccordionItem[];\n      }\n    >(),\n    { type: "single", collapsible: true, items: () => [] }\n  );\n\n  const emits = defineEmits<AccordionRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "items"), emits);\n</script>\n',
      },
      {
        fileName: "Accordion/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AccordionContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <div class="pb-4 pt-0">\n      <slot>{{ content }}</slot>\n    </div>\n  </AccordionContent>\n</template>\n\n<script lang="ts" setup>\n  import { AccordionContent } from "radix-vue";\n  import type { AccordionContentProps } from "radix-vue";\n\n  const props = defineProps<\n    AccordionContentProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The content of the accordion */\n      content?: any;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class", "content");\n\n  const styles = tv({\n    base: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",\n  });\n</script>\n',
      },
      {
        fileName: "Accordion/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AccordionHeader v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </AccordionHeader>\n</template>\n\n<script lang="ts" setup>\n  import { AccordionHeader } from "radix-vue";\n  import type { AccordionHeaderProps } from "radix-vue";\n\n  const props = defineProps<\n    AccordionHeaderProps & {\n      class?: any;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: "flex",\n  });\n</script>\n',
      },
      {
        fileName: "Accordion/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AccordionItem v-slot="slotProps" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot v-bind="slotProps" />\n  </AccordionItem>\n</template>\n\n<script setup lang="ts">\n  import { AccordionItem } from "radix-vue";\n  import type { AccordionItemProps } from "radix-vue";\n\n  const props = defineProps<\n    AccordionItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: "border-b",\n  });\n</script>\n',
      },
      {
        fileName: "Accordion/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AccordionTrigger v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot :props="props">\n      {{ title }}\n    </slot>\n    <slot name="icon" :props="props">\n      <Icon v-if="icon" :name="icon" class="h-4 w-4 shrink-0 transition-transform duration-200" />\n    </slot>\n  </AccordionTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { AccordionTrigger } from "radix-vue";\n  import type { AccordionTriggerProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      AccordionTriggerProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The title of the accordion trigger */\n        title?: string;\n        /** The icon to show next to the title */\n        icon?: string;\n      }\n    >(),\n    {\n      class: undefined,\n      title: "",\n      icon: "lucide:chevron-down",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "icon", "title");\n\n  const styles = tv({\n    base: "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&[data-state=open]>svg]:rotate-180",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert",
    value: "alert",
    devDeps: ["@vueuse/core"],
    files: [
      {
        fileName: "Alert/Alert.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div v-if="shown" :class="styles({ variant: variant, class: props.class })">\n    <slot :props="props" name="icon">\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n    <div>\n      <slot :props="props">\n        <UiAlertTitle v-if="title" :title="title" />\n        <UiAlertDescription v-if="description" :description="description" />\n      </slot>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      /** Custom class to add to the `Alert` parent */\n      class?: any;\n      /**\n       * Whether or not the `Alert` is shown.\n       * @default true\n       */\n      modelValue?: boolean;\n      /** The variant of the `Alert` */\n      variant?: VariantProps<typeof styles>["variant"];\n      /** The title that is passed to the `AlertTitle` component */\n      title?: string;\n      /** The description that is passed to the `AlertDescription` component */\n      description?: string;\n      /** The icon that should be displayed*/\n      icon?: string;\n    }>(),\n    {\n      modelValue: true,\n      variant: "default",\n      title: undefined,\n      description: undefined,\n      icon: undefined,\n      class: undefined,\n    }\n  );\n\n  const emit = defineEmits(["update:modelValue"]);\n  const shown = useVModel(props, "modelValue", emit, { defaultValue: true });\n\n  const styles = tv({\n    base: "relative flex w-full gap-3 rounded-lg border p-4",\n    variants: {\n      variant: {\n        default: "bg-background text-foreground",\n        destructive:\n          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Alert/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ description }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: any;\n        /** The description text that should be displayed */\n        description?: string;\n      }\n    >(),\n    { as: "div", class: undefined, description: undefined }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "description");\n\n  const styles = tv({\n    base: "text-sm [&_p]:leading-relaxed",\n  });\n</script>\n',
      },
      {
        fileName: "Alert/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: any;\n        /** The title text that should be displayed */\n        title?: string;\n      }\n    >(),\n    { as: "h5", class: undefined, title: undefined }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "title");\n\n  const styles = tv({\n    base: "mb-1 font-medium leading-none tracking-tight",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert Dialog",
    value: "alert-dialog",
    devDeps: ["@vueuse/core"],
    utils: [
      {
        fileName: "shared.styles.ts",
        dirPath: "utils",
        fileContent:
          '// Add here because button styles are used in several components\nexport const buttonStyles = tv({\n  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\n  variants: {\n    variant: {\n      default: "bg-primary text-primary-foreground hover:bg-primary/90",\n      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\n      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\n      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",\n      ghost: "hover:bg-accent hover:text-accent-foreground",\n      link: "text-primary underline-offset-4 hover:underline",\n    },\n    size: {\n      default: "h-10 px-4 py-2",\n      xs: "h-7 rounded px-2",\n      sm: "h-9 rounded-md px-3",\n      lg: "h-11 rounded-md px-8",\n      "icon-sm": "h-9 w-9",\n      icon: "h-10 w-10",\n    },\n    disabled: {\n      true: "pointer-events-none opacity-50",\n    },\n  },\n  defaultVariants: {\n    variant: "default",\n    size: "default",\n  },\n});\n',
      },
    ],
    files: [
      {
        fileName: "AlertDialog/Action.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogAction\n    v-bind="forwarded"\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\n  >\n    <slot>{{ text }} </slot>\n  </AlertDialogAction>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogAction } from "radix-vue";\n  import type { AlertDialogActionProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      AlertDialogActionProps & {\n        /** Action to perform when the button is clicked */\n        onClick?: () => void;\n        /** Text to display in the button */\n        text?: string;\n        /** Custom class(es) to add to the button */\n        class?: any;\n        /** Whether the button is disabled */\n        disabled?: boolean;\n        /** The button\'s visual variant */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n        /** The button\'s visual size */\n        size?: VariantProps<typeof buttonStyles>["size"];\n      }\n    >(),\n    {\n      text: "Continue",\n      variant: "default",\n      size: "default",\n      class: undefined,\n      onClick: undefined,\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "text", "variant", "size");\n</script>\n',
      },
      {
        fileName: "AlertDialog/AlertDialog.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogRoot v-bind="forwarded">\n    <slot>\n      <slot name="trigger">\n        <UiAlertDialogTrigger v-if="triggerText" as-child>\n          <UiButton variant="outline">{{ triggerText }}</UiButton>\n        </UiAlertDialogTrigger>\n      </slot>\n      <slot name="content">\n        <UiAlertDialogContent>\n          <slot name="header">\n            <UiAlertDialogHeader>\n              <slot name="title">\n                <UiAlertDialogTitle v-if="title" :title="title" />\n              </slot>\n              <slot name="description">\n                <UiAlertDialogDescription v-if="description" :description="description" />\n              </slot>\n            </UiAlertDialogHeader>\n          </slot>\n          <slot name="footer">\n            <UiAlertDialogFooter>\n              <slot name="cancel">\n                <UiAlertDialogCancel />\n              </slot>\n              <slot name="action">\n                <UiAlertDialogAction />\n              </slot>\n            </UiAlertDialogFooter>\n          </slot>\n        </UiAlertDialogContent>\n      </slot>\n    </slot>\n  </AlertDialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogRoot, useForwardPropsEmits } from "radix-vue";\n  import type { AlertDialogEmits, AlertDialogProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogProps & {\n      /** Text to display in the trigger button */\n      triggerText?: string;\n      /** Text to be passed to the `AlertDialogTitle` */\n      title?: string;\n      /** Text to be passed to the `AlertDialogDescription` */\n      description?: string;\n    }\n  >();\n\n  const emits = defineEmits<AlertDialogEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "description", "title", "triggerText"),\n    emits\n  );\n</script>\n',
      },
      {
        fileName: "AlertDialog/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogCancel\n    v-bind="forwarded"\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\n  >\n    <slot>{{ text }}</slot>\n  </AlertDialogCancel>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogCancel } from "radix-vue";\n  import type { AlertDialogCancelProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      AlertDialogCancelProps & {\n        /** Action to perform when the button is clicked */\n        onClick?: () => void;\n        /** Text to display in the button */\n        text?: string;\n        /** Custom class(es) to add to the button */\n        class?: any;\n        /** Whether the button is disabled */\n        disabled?: boolean;\n        /** The button\'s visual variant */\n        variant?: VariantProps<typeof buttonStyles>["variant"];\n        /** The button\'s visual size */\n        size?: VariantProps<typeof buttonStyles>["size"];\n      }\n    >(),\n    {\n      text: "Cancel",\n      variant: "outline",\n      size: "default",\n      class: undefined,\n      onClick: undefined,\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "text", "variant", "size");\n</script>\n',
      },
      {
        fileName: "AlertDialog/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiAlertDialogPortal :to="to">\n    <slot name="overlay">\n      <UiAlertDialogOverlay />\n    </slot>\n    <AlertDialogContent\n      :class="styles({ class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot />\n    </AlertDialogContent>\n  </UiAlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { AlertDialogContentEmits, AlertDialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    AlertDialogContentProps & {\n      /** Custom class(es) to add to the `AlertDialogContent` */\n      class?: any;\n      /** The element to render the portal into */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emit = defineEmits<AlertDialogContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emit);\n\n  const styles = tv({\n    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogDescription v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ description }}</slot>\n  </AlertDialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogDescription } from "radix-vue";\n  import type { AlertDialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogDescriptionProps & {\n      /** Text to display in the description */\n      description?: string;\n      /** Custom class(es) to add to the description */\n      class?: any;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class", "description");\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n      class: undefined,\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n      class: undefined,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogOverlay v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogOverlay } from "radix-vue";\n  import type { AlertDialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogOverlayProps & {\n      /** Custom class(es) to add to the overlay */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogPortal v-bind="props">\n    <slot />\n  </AlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogPortal } from "radix-vue";\n  import type { AlertDialogPortalProps } from "radix-vue";\n\n  const props = defineProps<AlertDialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "AlertDialog/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogTitle v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n  </AlertDialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTitle } from "radix-vue";\n  import type { AlertDialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogTitleProps & {\n      /** Text to display in the title */\n      title?: string;\n      /** Custom class(es) to add to the title */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "text-lg font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogTrigger v-bind="props">\n    <slot />\n  </AlertDialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTrigger } from "radix-vue";\n  import type { AlertDialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<AlertDialogTriggerProps>();\n</script>\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Aspect Ratio",
    value: "aspect-ratio",
    files: [
      {
        fileName: "AspectRatio.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AspectRatio v-bind="props">\n    <slot />\n  </AspectRatio>\n</template>\n\n<script lang="ts" setup>\n  import { AspectRatio } from "radix-vue";\n  import type { AspectRatioProps } from "radix-vue";\n\n  const props = defineProps<AspectRatioProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Autocomplete",
    value: "autocomplete",
    devDeps: ["@vueuse/core"],
    files: [
      {
        fileName: "Autocomplete/Anchor.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxAnchor v-bind="props" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxAnchor } from "radix-vue";\n  import type { ComboboxAnchorProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxAnchorProps & {\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxArrow v-bind="props" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxArrow } from "radix-vue";\n  import type { ComboboxArrowProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxArrowProps & {\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "rotate-45 border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Autocomplete.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxRootProps & {\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<ComboboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n  const styles = tv({\n    base: "relative",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxCancel v-bind="props">\n    <slot />\n  </ComboboxCancel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxCancel } from "radix-vue";\n  import type { ComboboxCancelProps } from "radix-vue";\n\n  const props = defineProps<ComboboxCancelProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <!-- <UiAutocompletePortal> -->\n  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <UiAutocompleteViewport>\n      <slot />\n    </UiAutocompleteViewport>\n  </ComboboxContent>\n  <!-- </UiAutocompletePortal> -->\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ComboboxContentProps & {\n        class?: any;\n      }\n    >(),\n    {\n      position: "popper",\n      bodyLock: true,\n      side: "bottom",\n      sideOffset: 8,\n      class: undefined,\n    }\n  );\n\n  const emits = defineEmits<ComboboxContentEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "z-50 max-h-[300px] w-[var(--radix-popper-anchor-width)] min-w-[8rem] overflow-hidden overflow-y-auto rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Empty.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxEmpty v-bind="props">\n    <slot />\n  </ComboboxEmpty>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxEmpty } from "radix-vue";\n  import type { ComboboxEmptyProps } from "radix-vue";\n\n  const props = defineProps<ComboboxEmptyProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxGroup v-bind="props">\n    <slot />\n  </ComboboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxGroup } from "radix-vue";\n  import type { ComboboxGroupProps } from "radix-vue";\n\n  const props = defineProps<ComboboxGroupProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxInput v-bind="props" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxInput } from "radix-vue";\n  import type { ComboboxInputProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxInputProps & {\n      placeholder?: string;\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "size-full grow rounded-md bg-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot name="icon">\n      <span class="absolute inset-y-0 left-2 flex items-center justify-center">\n        <UiAutocompleteItemIndicator class="animate-in fade-in-0 zoom-in-0" :icon="icon" />\n      </span>\n    </slot>\n    <slot />\n  </ComboboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxItemProps & {\n      class?: any;\n      icon?: string;\n    }\n  >();\n\n  const emits = defineEmits<{\n    select: ComboboxItemEmits["select"];\n  }>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxItemIndicator v-bind="props">\n    <slot><Icon :name="icon || \'ph:check\'" class="h-4 w-4" /></slot>\n  </ComboboxItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItemIndicator } from "radix-vue";\n  import type { ComboboxItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxItemIndicatorProps & {\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxLabel :class="styles({ class: props.class })" v-bind="props">\n    <slot />\n  </ComboboxLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxLabel } from "radix-vue";\n  import type { ComboboxLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxLabelProps & {\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "px-2 py-1.5 pl-9 text-sm font-medium text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxPortal position="popper" v-bind="props">\n    <slot />\n  </ComboboxPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxPortal } from "radix-vue";\n  import type { ComboboxPortalProps } from "radix-vue";\n\n  const props = defineProps<ComboboxPortalProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxSeparator v-bind="props">\n    <slot />\n  </ComboboxSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxSeparator } from "radix-vue";\n  import type { ComboboxSeparatorProps } from "radix-vue";\n\n  const props = defineProps<ComboboxSeparatorProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxTrigger v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxTrigger } from "radix-vue";\n  import type { ComboboxTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxTriggerProps & {\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex shrink-0 cursor-pointer items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxViewport v-bind="props">\n    <slot />\n  </ComboboxViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxViewport } from "radix-vue";\n  import type { ComboboxViewportProps } from "radix-vue";\n\n  const props = defineProps<ComboboxViewportProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AvatarRoot :as="as" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>\n      <slot name="image">\n        <UiAvatarImage\n          v-if="src"\n          :src="src"\n          :alt="alt"\n          :class="imageClass"\n          @loading-status-change="emits(\'loadingStatusChange\', $event)"\n        />\n      </slot>\n      <slot name="fallback">\n        <UiAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />\n      </slot>\n    </slot>\n  </AvatarRoot>\n</template>\n\n<script lang="ts" setup>\n  import { AvatarRoot } from "radix-vue";\n  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      AvatarRootProps &\n        Partial<AvatarImageProps> & {\n          class?: any;\n          imageClass?: any;\n          fallbackClass?: any;\n          alt?: string;\n          fallback?: string;\n          delayMs?: number;\n        }\n    >(),\n    {\n      class: undefined,\n      imageClass: undefined,\n      fallbackClass: undefined,\n      alt: undefined,\n      fallback: undefined,\n      delayMs: undefined,\n    }\n  );\n\n  const emits = defineEmits<AvatarImageEmits>();\n  const styles = tv({\n    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",\n  });\n</script>\n',
      },
      {
        fileName: "Avatar/Fallback.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AvatarFallback :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      {{ fallback }}\n    </slot>\n  </AvatarFallback>\n</template>\n\n<script lang="ts" setup>\n  import { AvatarFallback } from "radix-vue";\n  import type { AvatarFallbackProps } from "radix-vue";\n\n  const props = defineProps<\n    AvatarFallbackProps & {\n      /** The text to display inside th eavatar */\n      fallback?: string;\n      /** Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "fallback");\n  const styles = tv({\n    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",\n  });\n</script>\n',
      },
      {
        fileName: "Avatar/Image.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AvatarImage v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { AvatarImage, useForwardPropsEmits } from "radix-vue";\n  import type { AvatarImageEmits, AvatarImageProps } from "radix-vue";\n\n  const props = defineProps<\n    AvatarImageProps & {\n      /** The alt text for the image */\n      alt?: string;\n      /** Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const emits = defineEmits<AvatarImageEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "aspect-square h-full w-full object-cover",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <component\n    :is="elementType"\n    :to="to"\n    :href="href"\n    :disabled="disabled"\n    :class="badgeVariants({ disabled, variant, class: props.class })"\n    @click="onClick"\n  >\n    <slot />\n  </component>\n</template>\n\n<script lang="ts" setup>\n  const badgeVariants = tv({\n    base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",\n    variants: {\n      variant: {\n        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",\n        secondary:\n          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",\n        destructive:\n          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",\n        outline: "text-foreground",\n      },\n      disabled: {\n        true: "cursor-not-allowed opacity-50",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n\n  type BadgeProps = VariantProps<typeof badgeVariants>;\n\n  const props = defineProps<{\n    class?: any;\n    variant?: BadgeProps["variant"];\n    onClick?: () => void;\n    to?: string;\n    href?: string;\n    disabled?: boolean;\n    tag?: string;\n  }>();\n\n  const elementType = computed(() => {\n    if (props.tag) return props.tag;\n    if (props.href || props.to) return resolveComponent("NuxtLink");\n    return props.tag || "div";\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <template v-for="(item, i) in items" :key="i">\n      <div class="flex items-center gap-3">\n        <div class="flex cursor-pointer items-center gap-2">\n          <slot name="crumbIcon" :item="item" :index="i">\n            <Icon\n              v-if="item.icon"\n              :name="item.icon"\n              :class="[!isNotLastItem(i) && \'text-primary\']"\n            />\n          </slot>\n          <slot :item="item" :is-not-last-item="isNotLastItem" :index="i" name="link">\n            <NuxtLink\n              v-if="item.label"\n              :to="!item?.disabled ? item.link : \'\'"\n              :class="[\n                isNotLastItem(i)\n                  ? \'text-muted-foreground hover:underline\'\n                  : \'font-semibold text-primary\',\n              ]"\n              class="text-sm text-foreground"\n              @click="item?.click?.()"\n              >{{ item.label }}</NuxtLink\n            >\n          </slot>\n        </div>\n        <slot name="separator" :item="item" :index="i">\n          <Icon v-if="isNotLastItem(i)" :name="separator" class="h-3 w-3 text-muted-foreground" />\n        </slot>\n      </div>\n    </template>\n  </div>\n</template>\n\n<script setup lang="ts">\n  export interface Crumbs {\n    label: string;\n    icon?: string;\n    link?: string;\n    disabled?: boolean;\n    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type\n    click?: Function;\n  }\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The items to display in the breadcrumbs.\n       */\n      items?: Crumbs[];\n      /**\n       * The separator to use between each breadcrumb.\n       */\n      separator?: string;\n      class?: any;\n    }>(),\n    {\n      separator: "heroicons:chevron-right",\n      items: () => [],\n      class: undefined,\n    }\n  );\n\n  const isNotLastItem = (index: number) => {\n    return index !== props?.items?.length - 1;\n  };\n\n  const styles = tv({\n    base: "flex w-full items-center gap-4",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Button",
    value: "button",
    utils: [
      {
        fileName: "shared.styles.ts",
        dirPath: "utils",
        fileContent:
          '// Add here because button styles are used in several components\nexport const buttonStyles = tv({\n  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\n  variants: {\n    variant: {\n      default: "bg-primary text-primary-foreground hover:bg-primary/90",\n      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\n      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\n      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",\n      ghost: "hover:bg-accent hover:text-accent-foreground",\n      link: "text-primary underline-offset-4 hover:underline",\n    },\n    size: {\n      default: "h-10 px-4 py-2",\n      xs: "h-7 rounded px-2",\n      sm: "h-9 rounded-md px-3",\n      lg: "h-11 rounded-md px-8",\n      "icon-sm": "h-9 w-9",\n      icon: "h-10 w-10",\n    },\n    disabled: {\n      true: "pointer-events-none opacity-50",\n    },\n  },\n  defaultVariants: {\n    variant: "default",\n    size: "default",\n  },\n});\n',
      },
    ],
    files: [
      {
        fileName: "Button.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <component\n    :is="elementType"\n    :class="\n      buttonStyles({\n        disabled: disabled || loading,\n        variant: variant,\n        size: size,\n        class: props.class,\n      })\n    "\n    :disabled="disabled || loading"\n    :to="to"\n    :href="href"\n    :type="type"\n    @click="onClick"\n  >\n    <slot>{{ text }}</slot>\n  </component>\n</template>\n\n<script setup lang="ts">\n  import type { RouteLocationRaw } from "vue-router";\n\n  type ButtonProps = VariantProps<typeof buttonStyles>;\n  const props = withDefaults(\n    defineProps<{\n      /** The type fro the button */\n      type?: "button" | "submit" | "reset";\n      /** Whether the button is disabled */\n      disabled?: boolean;\n      /** Whether the button is loading */\n      loading?: boolean;\n      /** The action to perform when the button is clicked */\n      onClick?: any;\n      /** The location to navigate to when the button is clicked */\n      to?: string | RouteLocationRaw;\n      /** The location to navigate to when the button is clicked */\n      href?: string;\n      /** The element to render the button as */\n      as?: string;\n      /** Custom class(es) to add to parent element */\n      class?: any;\n      /** The variant of the button */\n      variant?: ButtonProps["variant"];\n      /** The size of the button */\n      size?: ButtonProps["size"];\n      /** The text to display in the button */\n      text?: string;\n    }>(),\n    {\n      type: "button",\n      onClick: undefined,\n      to: undefined,\n      href: undefined,\n      as: undefined,\n      class: undefined,\n      text: undefined,\n      variant: "default",\n      size: "default",\n    }\n  );\n\n  const elementType = computed(() => {\n    if (props.as) return props.as;\n    if (props.href || props.to) return resolveComponent("NuxtLink");\n    return "button";\n  });\n</script>\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Calendar",
    value: "calendar",
    devDeps: ["@samk-dev/nuxt-vcalendar"],
    nuxtModules: ["@samk-dev/nuxt-vcalendar"],
    instructions: ["You can customize the calendar by adding options to your nuxt.config.js file"],
    files: [
      {
        fileName: "Calendar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ClientOnly>\n    <VCalendar\n      :trim-weeks="props.trimWeeks || true"\n      :is-dark="$colorMode.value == \'dark\'"\n      v-bind="$attrs"\n    >\n      <template v-for="(_, slot) in $slots" #[slot]="scope">\n        <slot :name="slot" v-bind="scope" />\n      </template>\n    </VCalendar>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import type { Calendar } from "v-calendar";\n\n  defineOptions({ inheritAttrs: false });\n\n  interface Props extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]> {}\n\n  const props = defineProps<Props & { trimWeeks?: boolean }>();\n</script>\n\n<style>\n  :root {\n    --vc-font-family: var(--font-sans);\n    --vc-rounded-full: var(--radius);\n    --vc-font-bold: 500;\n    --vc-font-semibold: 600;\n    --vc-text-lg: 16px;\n  }\n\n  .vc-light,\n  .vc-dark {\n    --vc-bg: theme("colors.background");\n    --vc-border: theme("colors.border");\n    --vc-focus-ring: 0 0 0 3px hsl(var(--primary) / 30%);\n    --vc-weekday-color: theme("colors.muted.foreground");\n    --vc-popover-content-color: theme("colors.popover.foreground");\n    --vc-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-popover-content-bg: theme("colors.popover.DEFAULT");\n    --vc-popover-content-border: theme("colors.border");\n    --vc-header-arrow-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-weeknumber-color: theme("colors.muted.foreground");\n    --vc-nav-hover-bg: theme("colors.accent.DEFAULT");\n\n    --vc-nav-item-active-color: theme("colors.primary.foreground");\n    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");\n\n    &.vc-attr,\n    & .vc-attr {\n      --vc-content-color: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-border: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-content-color: theme("colors.primary.foreground");\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\n      --vc-highlight-light-content-color: theme("colors.secondary.foreground");\n      --vc-highlight-solid-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-solid-content-color: theme("colors.primary.foreground");\n    }\n  }\n\n  .vc-blue {\n    --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n    --vc-accent-400: theme("colors.primary.DEFAULT");\n    --vc-accent-500: theme("colors.primary.DEFAULT");\n    --vc-accent-600: theme("colors.primary.DEFAULT / 70%");\n  }\n\n  .dark {\n    .vc-blue {\n      --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n      --vc-accent-400: theme("colors.primary.DEFAULT");\n      --vc-accent-500: theme("colors.primary.DEFAULT / 70%");\n    }\n  }\n  .vc-header .vc-title {\n    @apply font-medium;\n  }\n  .vc-weekdays {\n    @apply my-2 font-normal;\n  }\n  .vc-day-content,\n  .vc-day,\n  .vc-highlight {\n    @apply h-9 w-9 rounded-md;\n  }\n  .vc-focus {\n    @apply focus-within:shadow-none;\n  }\n  .vc-day {\n    @apply mb-1.5;\n  }\n\n  .vc-base-icon {\n    @apply h-4 w-4 stroke-1;\n  }\n  .vc-header .vc-arrow,\n  .vc-nav-arrow {\n    @apply h-7 w-7 rounded-md;\n    border: 1px solid hsl(var(--border));\n  }\n  .vc-header .vc-prev,\n  .vc-header .vc-next {\n    @apply border;\n  }\n  .weekday-position-1 .vc-highlights {\n    @apply rounded-l-md;\n  }\n  .weekday-position-7 .vc-highlights {\n    @apply rounded-r-md;\n  }\n  .vc-highlight-bg-light {\n    @apply bg-accent;\n  }\n  .vc-nav-item {\n    @apply font-medium;\n  }\n  .vc-header .vc-title-wrapper {\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\n  }\n  .vc-highlights + .vc-day-content {\n    @apply hover:bg-accent/5;\n  }\n</style>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>\n      <slot name="header">\n        <UiCardHeader>\n          <slot name="title">\n            <UiCardTitle v-if="title || $slots.title" :title="title" />\n          </slot>\n          <slot name="description">\n            <UiCardDescription\n              v-if="description || $slots.description"\n              :description="description"\n            />\n          </slot>\n        </UiCardHeader>\n      </slot>\n      <slot v-if="content || $slots.content" name="content">\n        <UiCardContent>\n          <div v-html="content" />\n        </UiCardContent>\n      </slot>\n      <slot name="footer" />\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Title that should be displayed. Passed to the `CardTitle` component */\n        title?: string;\n        /** Description that should be displayed. Passed to the `CardDescription` component */\n        description?: string;\n        /** Content that should be displayed. Passed to the `CardContent` component */\n        content?: string;\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n      title: undefined,\n      description: undefined,\n      content: undefined,\n      class: undefined,\n    }\n  );\n\n  const styles = tv({\n    base: "rounded-lg border bg-card text-card-foreground shadow-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>\n      {{ content }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Content to display in the card */\n        content?: string;\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    { as: "div" }\n  );\n  const styles = tv({\n    base: "p-6 [&+*]:pt-0",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\n    <slot>\n      {{ description }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Description to display in the card */\n        description?: string;\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "flex items-center p-6",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "flex flex-col space-y-1.5 p-6 [&+*]:pt-0",\n  });\n</script>\n',
      },
      {
        fileName: "Card/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\n    <slot>\n      {{ title }}\n    </slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Title to display in the card */\n        title?: string;\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "h3",\n    }\n  );\n\n  const styles = tv({\n    base: "text-xl font-semibold leading-none tracking-tight",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Chart",
    value: "chart",
    deps: ["@unovis/ts", "@unovis/vue"],
    components: ["card"],
    utils: [
      {
        fileName: "chart.ts",
        dirPath: "utils",
        fileContent:
          "export function defaultColors(count: number = 3) {\n  const quotient = Math.floor(count / 2);\n  const remainder = count % 2;\n\n  const primaryCount = quotient + remainder;\n  const secondaryCount = quotient;\n  return [\n    ...Array.from(Array(primaryCount).keys()).map(\n      (i) => `hsl(var(--vis-primary-color) / ${1 - (1 / primaryCount) * i})`\n    ),\n    ...Array.from(Array(secondaryCount).keys()).map(\n      (i) => `hsl(var(--vis-secondary-color) / ${1 - (1 / secondaryCount) * i})`\n    ),\n  ];\n}\n",
      },
    ],
    files: [
      {
        fileName: "Chart/Area.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiChartLegend\n      v-if="showLegend"\n      v-model:items="legendItems"\n      @legend-item-click="handleLegendItemClick"\n    />\n\n    <VisXYContainer\n      :style="{ height: isMounted ? \'100%\' : \'auto\' }"\n      :margin="{ left: 20, right: 20 }"\n      :data="data"\n    >\n      <svg width="0" height="0">\n        <defs>\n          <linearGradient\n            v-for="(color, i) in colors"\n            :id="`${chartRef}-color-${i}`"\n            :key="i"\n            x1="0"\n            y1="0"\n            x2="0"\n            y2="1"\n          >\n            <template v-if="showGradiant">\n              <stop offset="5%" :stop-color="color" stop-opacity="0.4" />\n              <stop offset="95%" :stop-color="color" stop-opacity="0" />\n            </template>\n            <template v-else>\n              <stop offset="0%" :stop-color="color" />\n            </template>\n          </linearGradient>\n        </defs>\n      </svg>\n\n      <UiChartCrosshair\n        v-if="showTooltip"\n        :colors="colors"\n        :items="legendItems"\n        :index="index"\n        :custom-tooltip="customTooltip"\n      />\n\n      <template v-for="(category, i) in categories" :key="category">\n        <VisArea\n          :x="(d: Data, i: number) => i"\n          :y="(d: Data) => d[category]"\n          color="auto"\n          :curve-type="curveType"\n          :attributes="{\n            [Area.selectors.area]: {\n              fill: `url(#${chartRef}-color-${i})`,\n            },\n          }"\n          :opacity="\n            legendItems.find((item) => item.name === category)?.inactive ? filterOpacity : 1\n          "\n        />\n      </template>\n\n      <template v-for="(category, i) in categories" :key="category">\n        <VisLine\n          :x="(d: Data, i: number) => i"\n          :y="(d: Data) => d[category]"\n          :color="colors[i]"\n          :curve-type="curveType"\n          :attributes="{\n            [Line.selectors.line]: {\n              opacity: legendItems.find((item) => item.name === category)?.inactive\n                ? filterOpacity\n                : 1,\n            },\n          }"\n        />\n      </template>\n\n      <VisAxis\n        v-if="showXAxis"\n        type="x"\n        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"\n        :grid-line="false"\n        :tick-line="false"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n      <VisAxis\n        v-if="showYAxis"\n        type="y"\n        :tick-line="false"\n        :tick-format="yFormatter"\n        :domain-line="false"\n        :grid-line="showGridLine"\n        :attributes="{\n          [Axis.selectors.grid]: {\n            class: \'text-muted\',\n          },\n        }"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n\n      <slot />\n    </VisXYContainer>\n  </div>\n</template>\n\n<script lang="ts">\n  import { Area, Axis, CurveType, Line } from "@unovis/ts";\n  import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";\n  import type { BulletLegendItemInterface, Spacing } from "@unovis/ts";\n\n  type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;\n\n  export interface AreaChartProps<T extends Record<string, any>> {\n    /**\n     * The source data, in which each entry is a dictionary.\n     */\n    data: T[];\n    /**\n     * Select the categories from your data. Used to populate the legend and toolip.\n     */\n    categories: KeyOf<T>[];\n    /**\n     * Sets the key to map the data to the axis.\n     */\n    index: KeyOf<T>;\n    /**\n     * Change the default colors.\n     */\n    colors?: string[];\n    /**\n     * Margin of each the container\n     */\n    margin?: Spacing;\n    /**\n     * Change the opacity of the non-selected field\n     * @default 0.2\n     */\n    filterOpacity?: number;\n    /**\n     * Function to format X label\n     */\n    xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Function to format Y label\n     */\n    yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Controls the visibility of the X axis.\n     * @default true\n     */\n    showXAxis?: boolean;\n    /**\n     * Controls the visibility of the Y axis.\n     * @default true\n     */\n    showYAxis?: boolean;\n    /**\n     * Controls the visibility of tooltip.\n     * @default true\n     */\n    showTooltip?: boolean;\n    /**\n     * Controls the visibility of legend.\n     * @default true\n     */\n    showLegend?: boolean;\n    /**\n     * Controls the visibility of gridline.\n     * @default true\n     */\n    showGridLine?: boolean;\n  }\n</script>\n\n<script setup lang="ts" generic="T extends Record<string, any>">\n  const styles = tv({\n    base: "flex h-[400px] w-full flex-col items-end",\n  });\n\n  const props = withDefaults(\n    defineProps<\n      AreaChartProps<T> & {\n        /**\n         * Render custom tooltip component.\n         */\n        customTooltip?: Component;\n        /**\n         * Type of curve\n         */\n        curveType?: CurveType;\n        /**\n         * Controls the visibility of gradient.\n         * @default true\n         */\n        showGradiant?: boolean;\n        /**\n         * Additional class to be added to the container.\n         */\n        class?: any;\n      }\n    >(),\n    {\n      curveType: CurveType.MonotoneX,\n      filterOpacity: 0.2,\n      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),\n      showXAxis: true,\n      showYAxis: true,\n      showTooltip: true,\n      showLegend: true,\n      showGridLine: true,\n      showGradiant: true,\n    }\n  );\n\n  const emits = defineEmits<{\n    legendItemClick: [d: BulletLegendItemInterface, i: number];\n  }>();\n\n  type KeyOfT = Extract<keyof T, string>;\n  type Data = (typeof props.data)[number];\n\n  const chartRef = useId();\n\n  const index = computed(() => props.index as KeyOfT);\n  const colors = computed(() =>\n    props.colors?.length ? props.colors : defaultColors(props.categories.length)\n  );\n\n  const legendItems = ref<BulletLegendItemInterface[]>(\n    props.categories.map((category, i) => ({\n      name: category,\n      color: colors.value[i],\n      inactive: false,\n    }))\n  );\n\n  const isMounted = useMounted();\n\n  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {\n    emits("legendItemClick", d, i);\n  }\n</script>\n',
      },
      {
        fileName: "Chart/Bar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiChartLegend\n      v-if="showLegend"\n      v-model:items="legendItems"\n      @legend-item-click="handleLegendItemClick"\n    />\n\n    <VisXYContainer :data="data" :style="{ height: isMounted ? \'100%\' : \'auto\' }" :margin="margin">\n      <UiChartCrosshair\n        v-if="showTooltip"\n        :colors="colors"\n        :items="legendItems"\n        :custom-tooltip="customTooltip"\n        :index="index"\n      />\n\n      <VisBarComponent\n        :x="(d: Data, i: number) => i"\n        :y="categories.map((category) => (d: Data) => d[category])"\n        :color="colors"\n        :rounded-corners="roundedCorners"\n        :bar-padding="0.05"\n        :attributes="{\n          [selectorsBar]: {\n            opacity: (d: Data, i: number) => {\n              const pos = i % categories.length;\n              return legendItems[pos]?.inactive ? filterOpacity : 1;\n            },\n          },\n        }"\n      />\n\n      <VisAxis\n        v-if="showXAxis"\n        type="x"\n        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"\n        :grid-line="false"\n        :tick-line="false"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n      <VisAxis\n        v-if="showYAxis"\n        type="y"\n        :tick-line="false"\n        :tick-format="yFormatter"\n        :domain-line="false"\n        :grid-line="showGridLine"\n        :attributes="{\n          [Axis.selectors.grid]: {\n            class: \'text-muted\',\n          },\n        }"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n\n      <slot />\n    </VisXYContainer>\n  </div>\n</template>\n\n<script lang="ts">\n  import { Axis, GroupedBar, StackedBar } from "@unovis/ts";\n  import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from "@unovis/vue";\n  import type { BulletLegendItemInterface, Spacing } from "@unovis/ts";\n\n  type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;\n\n  export interface BarChartProps<T extends Record<string, any>> {\n    /**\n     * The source data, in which each entry is a dictionary.\n     */\n    data: T[];\n    /**\n     * Select the categories from your data. Used to populate the legend and toolip.\n     */\n    categories: KeyOf<T>[];\n    /**\n     * Sets the key to map the data to the axis.\n     */\n    index: KeyOf<T>;\n    /**\n     * Change the default colors.\n     */\n    colors?: string[];\n    /**\n     * Margin of each the container\n     */\n    margin?: Spacing;\n    /**\n     * Change the opacity of the non-selected field\n     * @default 0.2\n     */\n    filterOpacity?: number;\n    /**\n     * Function to format X label\n     */\n    xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Function to format Y label\n     */\n    yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Controls the visibility of the X axis.\n     * @default true\n     */\n    showXAxis?: boolean;\n    /**\n     * Controls the visibility of the Y axis.\n     * @default true\n     */\n    showYAxis?: boolean;\n    /**\n     * Controls the visibility of tooltip.\n     * @default true\n     */\n    showTooltip?: boolean;\n    /**\n     * Controls the visibility of legend.\n     * @default true\n     */\n    showLegend?: boolean;\n    /**\n     * Controls the visibility of gridline.\n     * @default true\n     */\n    showGridLine?: boolean;\n  }\n</script>\n\n<script setup lang="ts" generic="T extends Record<string, any>">\n  const styles = tv({\n    base: "flex h-[400px] w-full flex-col items-end",\n  });\n  const props = withDefaults(\n    defineProps<\n      BarChartProps<T> & {\n        /**\n         * Render custom tooltip component.\n         */\n        customTooltip?: Component;\n        /**\n         * Change the type of the chart\n         * @default "grouped"\n         */\n        type?: "stacked" | "grouped";\n        /**\n         * Rounded bar corners\n         * @default 0\n         */\n        roundedCorners?: number;\n        /**\n         * Additional class to be added to the container\n         */\n        class?: any;\n      }\n    >(),\n    {\n      type: "grouped",\n      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),\n      filterOpacity: 0.2,\n      roundedCorners: 0,\n      showXAxis: true,\n      showYAxis: true,\n      showTooltip: true,\n      showLegend: true,\n      showGridLine: true,\n    }\n  );\n  const emits = defineEmits<{\n    legendItemClick: [d: BulletLegendItemInterface, i: number];\n  }>();\n\n  type KeyOfT = Extract<keyof T, string>;\n  type Data = (typeof props.data)[number];\n\n  const index = computed(() => props.index as KeyOfT);\n  const colors = computed(() =>\n    props.colors?.length ? props.colors : defaultColors(props.categories.length)\n  );\n  const legendItems = ref<BulletLegendItemInterface[]>(\n    props.categories.map((category, i) => ({\n      name: category,\n      color: colors.value[i],\n      inactive: false,\n    }))\n  );\n\n  const isMounted = useMounted();\n\n  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {\n    emits("legendItemClick", d, i);\n  }\n\n  const VisBarComponent = computed(() =>\n    props.type === "grouped" ? VisGroupedBar : VisStackedBar\n  );\n  const selectorsBar = computed(() =>\n    props.type === "grouped" ? GroupedBar.selectors.bar : StackedBar.selectors.bar\n  );\n</script>\n',
      },
      {
        fileName: "Chart/Crosshair.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <VisTooltip :horizontal-shift="20" :vertical-shift="20" />\n  <VisCrosshair :template="template" :color="color" />\n</template>\n\n<script setup lang="ts">\n  import { omit } from "@unovis/ts";\n  import { VisCrosshair, VisTooltip } from "@unovis/vue";\n  import { UiChartTooltip } from "#components";\n  import { createApp } from "vue";\n  import type { BulletLegendItemInterface } from "@unovis/ts";\n\n  const props = withDefaults(\n    defineProps<{\n      colors: string[];\n      index: string;\n      items: BulletLegendItemInterface[];\n      customTooltip?: Component;\n    }>(),\n    {\n      colors: () => [],\n    }\n  );\n\n  // Use weakmap to store reference to each datapoint for Tooltip\n  const wm = new WeakMap();\n  function template(d: any) {\n    if (wm.has(d)) {\n      return wm.get(d);\n    } else {\n      const componentDiv = document.createElement("div");\n      const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {\n        const legendReference = props.items.find((i) => i.name === key);\n        return { ...legendReference, value };\n      });\n      const TooltipComponent = props.customTooltip ?? UiChartTooltip;\n      createApp(TooltipComponent, { title: d[props.index].toString(), data: omittedData }).mount(\n        componentDiv\n      );\n      wm.set(d, componentDiv.innerHTML);\n      return componentDiv.innerHTML;\n    }\n  }\n\n  function color(d: unknown, i: number) {\n    return props.colors[i] ?? "transparent";\n  }\n</script>\n',
      },
      {
        fileName: "Chart/Donut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <VisSingleContainer\n      :style="{ height: isMounted ? \'100%\' : \'auto\' }"\n      :margin="{ left: 20, right: 20 }"\n      :data="data"\n    >\n      <UiChartSingleTooltip\n        :selector="Donut.selectors.segment"\n        :index="category"\n        :items="legendItems"\n        :value-formatter="valueFormatter"\n        :custom-tooltip="customTooltip"\n      />\n\n      <VisDonut\n        :value="(d: Data) => d[category]"\n        :sort-function="sortFunction"\n        :color="colors"\n        :arc-width="type === \'donut\' ? 20 : 0"\n        :show-background="false"\n        :central-label="type === \'donut\' ? valueFormatter(totalValue) : \'\'"\n        :events="{\n          [Donut.selectors.segment]: {\n            click: (d: Data, ev: PointerEvent, i: number, elements: HTMLElement[]) => {\n              if (d?.data?.[index] === activeSegmentKey) {\n                activeSegmentKey = undefined;\n                elements.forEach((el) => (el.style.opacity = \'1\'));\n              } else {\n                activeSegmentKey = d?.data?.[index];\n                elements.forEach((el) => (el.style.opacity = `${filterOpacity}`));\n                elements[i].style.opacity = \'1\';\n              }\n            },\n          },\n        }"\n      />\n\n      <slot />\n    </VisSingleContainer>\n  </div>\n</template>\n\n<script lang="ts">\n  import { Donut } from "@unovis/ts";\n  import { VisDonut, VisSingleContainer } from "@unovis/vue";\n  import type { Spacing } from "@unovis/ts";\n\n  type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;\n\n  export interface DonutChartProps<T extends Record<string, any>> {\n    /**\n     * The source data, in which each entry is a dictionary.\n     */\n    data: T[];\n    /**\n     * Sets the key to map the data to the axis.\n     */\n    index: KeyOf<T>;\n    /**\n     * Change the default colors.\n     */\n    colors?: string[];\n    /**\n     * Margin of each the container\n     */\n    margin?: Spacing;\n    /**\n     * Change the opacity of the non-selected field\n     * @default 0.2\n     */\n    filterOpacity?: number;\n    /**\n     * Controls the visibility of tooltip.\n     * @default true\n     */\n    showTooltip?: boolean;\n    /**\n     * Controls the visibility of legend.\n     * @default true\n     */\n    showLegend?: boolean;\n  }\n</script>\n<script setup lang="ts" generic="T extends Record<string, any>">\n  const styles = tv({\n    base: "flex h-48 w-full flex-col items-end",\n  });\n  const props = withDefaults(\n    defineProps<\n      Pick<\n        DonutChartProps<T>,\n        "data" | "colors" | "index" | "margin" | "showLegend" | "showTooltip" | "filterOpacity"\n      > & {\n        /**\n         * Sets the name of the key containing the quantitative chart values.\n         */\n        category: KeyOfT;\n        /**\n         * Change the type of the chart\n         * @default "donut"\n         */\n        type?: "donut" | "pie";\n        /**\n         * Function to sort the segment\n         */\n        sortFunction?: (a: any, b: any) => number | undefined;\n        /**\n         * Controls the formatting for the label.\n         */\n        valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;\n        /**\n         * Render custom tooltip component.\n         */\n        customTooltip?: Component;\n        /**\n         * Custom class\n         */\n        class?: any;\n      }\n    >(),\n    {\n      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),\n      sortFunction: () => undefined,\n      valueFormatter: (tick: number) => `${tick}`,\n      type: "donut",\n      filterOpacity: 0.2,\n      showTooltip: true,\n      showLegend: true,\n    }\n  );\n\n  type KeyOfT = Extract<keyof T, string>;\n  type Data = (typeof props.data)[number];\n\n  const category = computed(() => props.category as KeyOfT);\n  const index = computed(() => props.index as KeyOfT);\n\n  const isMounted = useMounted();\n  const activeSegmentKey = ref<string>();\n  const colors = computed(() =>\n    props.colors?.length\n      ? props.colors\n      : defaultColors(props.data.filter((d) => d[props.category]).filter(Boolean).length)\n  );\n  const legendItems = computed(() =>\n    props.data.map((item, i) => ({\n      name: item[props.index],\n      color: colors.value[i],\n      inactive: false,\n    }))\n  );\n\n  const totalValue = computed(() =>\n    props.data.reduce((prev, curr) => {\n      return prev + curr[props.category];\n    }, 0)\n  );\n</script>\n',
      },
      {
        fileName: "Chart/Legend.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div ref="elRef" class="w-max">\n    <VisBulletLegend :items="items" :on-legend-item-click="onLegendItemClick" />\n  </div>\n</template>\n\n<script setup lang="ts">\n  import { BulletLegend } from "@unovis/ts";\n  import { VisBulletLegend } from "@unovis/vue";\n  import type { BulletLegendItemInterface } from "@unovis/ts";\n\n  const props = withDefaults(defineProps<{ items: BulletLegendItemInterface[] }>(), {\n    items: () => [],\n  });\n\n  const emits = defineEmits<{\n    legendItemClick: [d: BulletLegendItemInterface, i: number];\n    "update:items": [payload: BulletLegendItemInterface[]];\n  }>();\n\n  const elRef = ref<HTMLElement>();\n\n  onMounted(() => {\n    const selector = `.${BulletLegend.selectors.item}`;\n    nextTick(() => {\n      const elements = elRef.value?.querySelectorAll(selector);\n      const classes = buttonStyles({ variant: "ghost", size: "xs" }).split(" ");\n      elements?.forEach((el) => el.classList.add(...classes, "!inline-flex", "!mr-2"));\n    });\n  });\n\n  function onLegendItemClick(d: BulletLegendItemInterface, i: number) {\n    emits("legendItemClick", d, i);\n    const isBulletActive = !props.items[i].inactive;\n    const isFilterApplied = props.items.some((i) => i.inactive);\n    if (isFilterApplied && isBulletActive) {\n      // reset filter\n      emits(\n        "update:items",\n        props.items.map((item) => ({ ...item, inactive: false }))\n      );\n    } else {\n      // apply selection, set other item as inactive\n      emits(\n        "update:items",\n        props.items.map((item) =>\n          item.name === d.name ? { ...d, inactive: false } : { ...item, inactive: true }\n        )\n      );\n    }\n  }\n</script>\n',
      },
      {
        fileName: "Chart/Line.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiChartLegend\n      v-if="showLegend"\n      v-model:items="legendItems"\n      @legend-item-click="handleLegendItemClick"\n    />\n\n    <VisXYContainer\n      :margin="{ left: 20, right: 20 }"\n      :data="data"\n      :style="{ height: isMounted ? \'100%\' : \'auto\' }"\n    >\n      <UiChartCrosshair\n        v-if="showTooltip"\n        :colors="colors"\n        :items="legendItems"\n        :index="index"\n        :custom-tooltip="customTooltip"\n      />\n\n      <template v-for="(category, i) in categories" :key="category">\n        <VisLine\n          :x="(d: Data, i: number) => i"\n          :y="(d: Data) => d[category]"\n          :curve-type="curveType"\n          :color="colors[i]"\n          :attributes="{\n            [Line.selectors.line]: {\n              opacity: legendItems.find((item) => item.name === category)?.inactive\n                ? filterOpacity\n                : 1,\n            },\n          }"\n        />\n      </template>\n\n      <VisAxis\n        v-if="showXAxis"\n        type="x"\n        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"\n        :grid-line="false"\n        :tick-line="false"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n      <VisAxis\n        v-if="showYAxis"\n        type="y"\n        :tick-line="false"\n        :tick-format="yFormatter"\n        :domain-line="false"\n        :grid-line="showGridLine"\n        :attributes="{\n          [Axis.selectors.grid]: {\n            class: \'text-muted\',\n          },\n        }"\n        tick-text-color="hsl(var(--vis-text-color))"\n      />\n\n      <slot />\n    </VisXYContainer>\n  </div>\n</template>\n\n<script lang="ts">\n  import { Axis, CurveType, Line } from "@unovis/ts";\n  import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";\n  import type { BulletLegendItemInterface, Spacing } from "@unovis/ts";\n\n  type KeyOf<T extends Record<string, any>> = Extract<keyof T, string>;\n\n  export interface LineChartProps<T extends Record<string, any>> {\n    /**\n     * The source data, in which each entry is a dictionary.\n     */\n    data: T[];\n    /**\n     * Select the categories from your data. Used to populate the legend and toolip.\n     */\n    categories: KeyOf<T>[];\n    /**\n     * Sets the key to map the data to the axis.\n     */\n    index: KeyOf<T>;\n    /**\n     * Change the default colors.\n     */\n    colors?: string[];\n    /**\n     * Margin of each the container\n     */\n    margin?: Spacing;\n    /**\n     * Change the opacity of the non-selected field\n     * @default 0.2\n     */\n    filterOpacity?: number;\n    /**\n     * Function to format X label\n     */\n    xFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Function to format Y label\n     */\n    yFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;\n    /**\n     * Controls the visibility of the X axis.\n     * @default true\n     */\n    showXAxis?: boolean;\n    /**\n     * Controls the visibility of the Y axis.\n     * @default true\n     */\n    showYAxis?: boolean;\n    /**\n     * Controls the visibility of tooltip.\n     * @default true\n     */\n    showTooltip?: boolean;\n    /**\n     * Controls the visibility of legend.\n     * @default true\n     */\n    showLegend?: boolean;\n    /**\n     * Controls the visibility of gridline.\n     * @default true\n     */\n    showGridLine?: boolean;\n  }\n</script>\n\n<script setup lang="ts" generic="T extends Record<string, any>">\n  const styles = tv({\n    base: "flex h-[400px] w-full flex-col items-end",\n  });\n  const props = withDefaults(\n    defineProps<\n      LineChartProps<T> & {\n        /**\n         * Render custom tooltip component.\n         */\n        customTooltip?: Component;\n        /**\n         * Type of curve\n         */\n        curveType?: CurveType;\n        /**\n         * Additional class to be added to the container.\n         */\n        class?: any;\n      }\n    >(),\n    {\n      curveType: CurveType.MonotoneX,\n      filterOpacity: 0.2,\n      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),\n      showXAxis: true,\n      showYAxis: true,\n      showTooltip: true,\n      showLegend: true,\n      showGridLine: true,\n    }\n  );\n\n  const emits = defineEmits<{\n    legendItemClick: [d: BulletLegendItemInterface, i: number];\n  }>();\n\n  type KeyOfT = Extract<keyof T, string>;\n  type Data = (typeof props.data)[number];\n\n  const index = computed(() => props.index as KeyOfT);\n  const colors = computed(() =>\n    props.colors?.length ? props.colors : defaultColors(props.categories.length)\n  );\n\n  const legendItems = ref<BulletLegendItemInterface[]>(\n    props.categories.map((category, i) => ({\n      name: category,\n      color: colors.value[i],\n      inactive: false,\n    }))\n  );\n\n  const isMounted = useMounted();\n\n  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {\n    emits("legendItemClick", d, i);\n  }\n</script>\n',
      },
      {
        fileName: "Chart/SingleTooltip.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <VisTooltip\n    :horizontal-shift="20"\n    :vertical-shift="20"\n    :triggers="{\n      [selector]: template,\n    }"\n  />\n</template>\n<script setup lang="ts">\n  import { omit } from "@unovis/ts";\n  import { VisTooltip } from "@unovis/vue";\n  import { UiChartTooltip } from "#components";\n  import { createApp } from "vue";\n  import type { BulletLegendItemInterface } from "@unovis/ts";\n\n  const props = withDefaults(\n    defineProps<{\n      selector: string;\n      index: string;\n      items?: BulletLegendItemInterface[];\n      valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;\n      customTooltip?: Component;\n    }>(),\n    {\n      valueFormatter: (tick: number) => `${tick}`,\n    }\n  );\n\n  // Use weakmap to store reference to each datapoint for Tooltip\n  const wm = new WeakMap();\n  function template(d: any, i: number, elements: (HTMLElement | SVGElement)[]) {\n    if (props.index in d) {\n      if (wm.has(d)) {\n        return wm.get(d);\n      } else {\n        const componentDiv = document.createElement("div");\n        const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {\n          const legendReference = props.items?.find((i) => i.name === key);\n          return { ...legendReference, value: props.valueFormatter(value) };\n        });\n        const TooltipComponent = props.customTooltip ?? UiChartTooltip;\n        createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(\n          componentDiv\n        );\n        wm.set(d, componentDiv.innerHTML);\n        return componentDiv.innerHTML;\n      }\n    } else {\n      const data = d.data;\n\n      if (wm.has(data)) {\n        return wm.get(data);\n      } else {\n        const style = getComputedStyle(elements[i]);\n        const omittedData = [\n          { name: data.name, value: props.valueFormatter(data[props.index]), color: style.fill },\n        ];\n        const componentDiv = document.createElement("div");\n        const TooltipComponent = props.customTooltip ?? UiChartTooltip;\n        createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(\n          componentDiv\n        );\n        wm.set(d, componentDiv.innerHTML);\n        return componentDiv.innerHTML;\n      }\n    }\n  }\n</script>\n',
      },
      {
        fileName: "Chart/Tooltip.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiCard class="text-sm">\n    <UiCardHeader v-if="title" class="border-b p-3">\n      <UiCardTitle>\n        {{ title }}\n      </UiCardTitle>\n    </UiCardHeader>\n    <UiCardContent class="flex min-w-[180px] flex-col gap-1 !p-3">\n      <div v-for="(item, key) in data" :key="key" class="flex justify-between">\n        <div class="flex items-center">\n          <span class="mr-2 h-2.5 w-2.5">\n            <svg width="100%" height="100%" viewBox="0 0 30 30">\n              <path\n                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"\n                :stroke="item.color"\n                :fill="item.color"\n                stroke-width="1"\n              />\n            </svg>\n          </span>\n          <span>{{ item.name }}</span>\n        </div>\n        <span class="ml-4 font-semibold">{{ item.value }}</span>\n      </div>\n    </UiCardContent>\n  </UiCard>\n</template>\n\n<script setup lang="ts">\n  defineProps<{\n    title?: string;\n    data: {\n      name: string;\n      color: string;\n      value: any;\n    }[];\n  }>();\n</script>\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Checkbox",
    value: "checkbox",
    files: [
      {
        fileName: "Checkbox/Checkbox.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CheckboxRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">\n        <UiCheckboxIndicator :checked="checked" :icon="icon" />\n      </Transition>\n    </slot>\n  </CheckboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { CheckboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";\n\n  const props = defineProps<\n    CheckboxRootProps & {\n      /** Custom class(es) to add to the element */\n      class?: any;\n      /**\n       * ID of the checkbox\n       */\n      id?: string;\n      /**\n       * Icon to display when the checkbox is checked\n       * @default lucide:check\n       */\n      icon?: string;\n    }\n  >();\n\n  const emit = defineEmits<CheckboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emit);\n\n  const styles = tv({\n    base: "peer h-[18px] w-[18px] shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Checkbox/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CheckboxIndicator :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      <Icon :name="checked == \'indeterminate\' ? \'lucide:minus\' : icon" class="h-4 w-4" />\n    </slot>\n  </CheckboxIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { CheckboxIndicator } from "radix-vue";\n  import type { CheckboxIndicatorProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      CheckboxIndicatorProps & {\n        /** The state of the checkbox */\n        checked?: boolean | "indeterminate";\n        /** Custom class(es) to add to the element */\n        class?: any;\n        /**\n         * Icon to display when the checkbox is checked\n         * @default lucide:check\n         */\n        icon?: string;\n      }\n    >(),\n    {\n      icon: "lucide:check",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex items-center justify-center text-current",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="relative inline-flex flex-shrink-0 items-center justify-center">\n    <slot />\n    <TransitionScale>\n      <span\n        v-if="show"\n        :class="[styles({ position, size, inset, class: [props.color, props.class] })]"\n      >\n        <slot name="content">\n          {{ text }}\n        </slot>\n      </span>\n    </TransitionScale>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<{\n      text?: string;\n      color?: string;\n      size?: VariantProps<typeof styles>["size"];\n      position?: VariantProps<typeof styles>["position"];\n      inset?: boolean;\n      show?: boolean;\n      class?: any;\n    }>(),\n    { show: true, color: "bg-primary", inset: false }\n  );\n\n  const styles = tv({\n    base: "absolute flex items-center justify-center whitespace-nowrap rounded-full font-medium text-foreground ring-[2px] ring-background",\n    variants: {\n      position: {\n        "top-right": "right-0 top-0",\n        "bottom-right": "bottom-0 right-0",\n        "top-left": "left-0 top-0",\n        "bottom-left": "bottom-0 left-0",\n      },\n      inset: {\n        true: "",\n        false: "",\n      },\n      size: {\n        "3xs": "h-[4px] min-w-[4px] p-px text-[4px]",\n        "2xs": "h-[5px] min-w-[5px] p-px text-[5px]",\n        xs: "h-1.5 min-w-[0.375rem] p-px text-[6px]",\n        sm: "h-2 min-w-[0.5rem] p-0.5 text-[7px]",\n        md: "h-2.5 min-w-2.5 p-0.5 text-[8px]",\n        lg: "h-3 min-w-[0.75rem] p-0.5 text-[10px]",\n        xl: "h-3.5 min-w-[0.875rem] p-1 text-[11px]",\n        "2xl": "h-4 min-w-[1rem] p-1 text-[12px]",\n        "3xl": "h-5 min-w-[1.25rem] p-1 text-[14px]",\n      },\n    },\n    defaultVariants: {\n      size: "sm",\n      position: "top-right",\n      inset: false,\n    },\n    compoundVariants: [\n      {\n        inset: false,\n        position: "top-right",\n        class: "-translate-y-1/2 translate-x-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "bottom-right",\n        class: "-translate-x-1/2 translate-y-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "top-left",\n        class: "-translate-x-1/2 -translate-y-1/2 transform",\n      },\n      {\n        inset: false,\n        position: "bottom-left",\n        class: "-translate-x-1/2 translate-y-1/2 transform",\n      },\n    ],\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleRoot v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </CollapsibleRoot>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleRoot, useForwardPropsEmits } from "radix-vue";\n  import type { CollapsibleRootEmits, CollapsibleRootProps } from "radix-vue";\n\n  const props = defineProps<CollapsibleRootProps>();\n\n  const emit = defineEmits<CollapsibleRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Collapsible/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleContent :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </CollapsibleContent>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleContent } from "radix-vue";\n  import type { CollapsibleContentProps } from "radix-vue";\n\n  const props = defineProps<\n    CollapsibleContentProps & {\n      /** Customer class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "overflow-hidden transition will-change-auto data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",\n  });\n</script>\n',
      },
      {
        fileName: "Collapsible/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleTrigger v-bind="forwarded">\n    <slot />\n  </CollapsibleTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleTrigger, useForwardProps } from "radix-vue";\n  import type { CollapsibleTriggerProps } from "radix-vue";\n\n  const props = defineProps<CollapsibleTriggerProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Command",
    value: "command",
    files: [
      {
        fileName: "Command/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxCancel v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon name="lucide:x" class="h-4 w-4 text-muted-foreground/70" />\n    </slot>\n  </ComboboxCancel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxCancel } from "radix-vue";\n  import type { ComboboxCancelProps } from "radix-vue";\n\n  const props = defineProps<ComboboxCancelProps & { class?: any }>();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Command.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxRoot v-bind="forwarded" :open="true" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";\n\n  const props = defineProps<ComboboxRootProps & { class?: any }>();\n  const emits = defineEmits<ComboboxRootEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Dialog.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDialog v-bind="forwarded">\n    <UiDialogContent class="overflow-hidden p-0 shadow-lg">\n      <UiCommand>\n        <slot />\n      </UiCommand>\n    </UiDialogContent>\n  </UiDialog>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardPropsEmits } from "radix-vue";\n  import type { DialogRootEmits, DialogRootProps } from "radix-vue";\n\n  const props = defineProps<DialogRootProps>();\n  const emits = defineEmits<DialogRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Command/Empty.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxEmpty :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </ComboboxEmpty>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxEmpty } from "radix-vue";\n  import type { ComboboxEmptyProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxEmptyProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "py-6 text-center text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxGroup :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot name="heading">\n      <UiCommandLabel v-if="heading" :label="heading" />\n    </slot>\n    <slot />\n  </ComboboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxGroup } from "radix-vue";\n  import type { ComboboxGroupProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxGroupProps & {\n      /**The heading for the group */\n      heading?: any;\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "heading");\n  const styles = tv({\n    base: "overflow-hidden p-1 text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="flex items-center border-b px-3">\n    <Icon :name="icon || \'lucide:search\'" class="mr-2 h-4 w-4 shrink-0 opacity-50" />\n    <ComboboxInput\n      v-bind="$attrs"\n      :type="type ?? \'text\'"\n      :disabled="disabled"\n      auto-focus\n      :class="styles({ class: props.class })"\n    />\n    <UiCommandCancel v-if="showCancel" />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxInput } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<{\n    /**Custom class(es) to add to the input element*/\n    class?: any;\n    /**The icon to render*/\n    icon?: string;\n    /**The input type*/\n    type?: string;\n    /**Whether the input is disabled*/\n    disabled?: boolean;\n    /**Whether to show the cancel button*/\n    showCancel?: boolean;\n  }>();\n\n  const styles = tv({\n    base: "flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      </slot>\n      {{ text }}\n      <slot name="shortcut">\n        <UiCommandShortcut v-if="shortcut" :shortcut="shortcut" />\n      </slot>\n    </slot>\n  </ComboboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxItemProps & {\n      /** Class(es) to add to the parent */\n      class?: any;\n      /** Icon to render */\n      icon?: string;\n      /** Text to render */\n      text?: string;\n      /** Shortcut to render */\n      shortcut?: string;\n    }\n  >();\n  const emit = defineEmits<ComboboxItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "icon", "text", "shortcut"),\n    emit\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxLabel :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ label }}</slot>\n  </ComboboxLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxLabel } from "radix-vue";\n  import type { ComboboxLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxLabelProps & {\n      /**\n       * Class(es) to pass to the ComboboxLabel component.\n       */\n      class?: any;\n      /**\n       * The label to display.\n       */\n      label?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "label");\n  const styles = tv({\n    base: "px-2 py-1.5 text-xs font-medium text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Command/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    ComboboxContentProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<ComboboxContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "max-h-[300px] overflow-y-auto overflow-x-hidden",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxSeparator :as-child="asChild" :class="styles({ class: props.class })">\n    <slot />\n  </ComboboxSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxSeparator } from "radix-vue";\n  import type { ComboboxSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxSeparatorProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "-mx-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :as="as || \'span\'" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot>{{ shortcut }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** The shortcut text to render */\n      shortcut?: any;\n    }\n  >();\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest text-muted-foreground",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: "container mx-auto",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuArrow } from "radix-vue";\n  import type { ContextMenuArrowProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuArrowProps & {\n      /** Custom class(es) to add to teh arrow */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/CheckboxItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiContextMenuItemIndicator icon="lucide:check" />\n    </span>\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuCheckboxItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /**The shortcut for the item */\n      shortcut?: string;\n      /**The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuCheckboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "shortcut", "title"), emits);\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </ContextMenuContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuContent, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuContentEmits, ContextMenuContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ContextMenuContentProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 5,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ContextMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuRoot v-bind="forwarded">\n    <slot />\n  </ContextMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuRootEmits, ContextMenuRootProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuRootProps>();\n  const emit = defineEmits<ContextMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "ContextMenu/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuGroup v-bind="props">\n    <slot />\n  </ContextMenuGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuGroup } from "radix-vue";\n  import type { ContextMenuGroupProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuGroupProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuItem v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItem, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuItemEmits, ContextMenuItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The shortcut for the item */\n      shortcut?: string;\n      /** The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n  </ContextMenuItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItemIndicator } from "radix-vue";\n  import type { ContextMenuItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuLabel :class="styles({ inset, class: props.class })" v-bind="forwarded">\n    <slot>{{ label }}</slot>\n  </ContextMenuLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuLabel } from "radix-vue";\n  import type { ContextMenuLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuLabelProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The label for the item */\n      label?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "label");\n  const styles = tv({\n    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",\n    variants: {\n      inset: { true: "pl-8" },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuPortal v-bind="props">\n    <slot />\n  </ContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuPortal } from "radix-vue";\n  import type { ContextMenuPortalProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuPortalProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuRadioGroup v-bind="forwarded">\n    <slot />\n  </ContextMenuRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRadioGroup, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuRadioGroupProps>();\n\n  const emits = defineEmits<ContextMenuRadioGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/RadioItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuRadioItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiContextMenuItemIndicator>\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />\n      </UiContextMenuItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </ContextMenuRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRadioItem, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuRadioItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /**The icon to display */\n      icon?: string;\n      /**The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuSeparator :class="styles({ class: props.class })" v-bind="props" />\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSeparator } from "radix-vue";\n  import type { ContextMenuSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuSeparatorProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :as="as || \'span\'" :as-child="asChild" :class="styles({ class: props.class })">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = defineProps<\n    PrimitiveProps & {\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuSub v-bind="forwarded">\n    <slot />\n  </ContextMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSub, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuSubEmits, ContextMenuSubProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuSubProps>();\n  const emits = defineEmits<ContextMenuSubEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuSubContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </ContextMenuSubContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubContent, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      ContextMenuSubContentProps & {\n        /**Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuSubContentEmits>();\n\n  const styles = tv({\n    base: "z-50 min-w-[100px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuSubTrigger v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon class="ml-auto h-4 w-4" :name="icon || \'lucide:chevron-right\'" />\n  </ContextMenuSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubTrigger } from "radix-vue";\n  import type { ContextMenuSubTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuSubTriggerProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The icon to display */\n      icon?: string;\n      /** The title for the item */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title");\n  const styles = tv({\n    base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuTrigger v-bind="props">\n    <slot />\n  </ContextMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuTrigger } from "radix-vue";\n  import type { ContextMenuTriggerProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <!-- eslint-disable-next-line vue/html-self-closing -->\n  <input ref="inputRef" type="text" :class="styles({ class: props.class })" v-bind="props" />\n</template>\n\n<script lang="ts" setup>\n  import { defu } from "defu";\n  import { useCurrencyInput } from "vue-currency-input";\n  import type { CurrencyInputOptions } from "vue-currency-input";\n\n  const props = defineProps<{\n    class?: any;\n    id?: string;\n    name?: string;\n    placeholder?: string;\n    disabled?: boolean;\n    required?: boolean;\n    modelValue?: any;\n    options?: CurrencyInputOptions;\n  }>();\n\n  const { inputRef } = useCurrencyInput(\n    defu({}, props.options, {\n      currency: "USD",\n      locale: "en-US",\n      hideCurrencySymbolOnFocus: false,\n      hideGroupingSeparatorOnFocus: false,\n    })\n  );\n\n  const styles = tv({\n    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
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
      "datatables.net-vue3",
      "jszip",
    ],
    plugins: [
      {
        fileName: "datatables.client.ts",
        dirPath: "plugins",
        fileContent:
          'import DataTablesCore from "datatables.net";\nimport DataTable from "datatables.net-vue3";\nimport JSZip from "jszip";\n\nimport "datatables.net-buttons";\nimport "datatables.net-buttons-dt";\nimport "datatables.net-buttons/js/buttons.colVis.mjs";\nimport "datatables.net-buttons/js/buttons.html5.mjs";\nimport "datatables.net-buttons/js/buttons.print.mjs";\nimport "datatables.net-responsive-dt";\nimport "datatables.net-searchbuilder-dt";\nimport "datatables.net-select-dt";\n\n// @ts-expect-error - We are not creating a declaration file for this library\nwindow.JSZip = JSZip;\n\nDataTable.use(DataTablesCore);\n\nexport default defineNuxtPlugin((nuxtApp) => {\n  nuxtApp.vueApp.component("DataTable", DataTable);\n});\n',
      },
    ],
    files: [
      {
        fileName: "Datatable.client.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DataTable\n    ref="table"\n    :columns="columns"\n    :ajax="ajax"\n    :data="data"\n    :class="props.class"\n    :options="options"\n  >\n    <template v-for="(_, name) in $slots" #[name]="scope">\n      <slot :name="name" v-bind="scope" />\n    </template>\n  </DataTable>\n</template>\n\n<script lang="ts" setup generic="T extends Record<string, any>">\n  import type DataTableRef from "datatables.net";\n  import type { Config } from "datatables.net";\n\n  export type DataTablesNamedSlotProps<T> = {\n    /** The data to show in the cell (from the `columns.data` configuration) */\n    cellData: keyof T | null;\n    /** The column index for the cell (0-based index) */\n    colIndex: number;\n    /** The data object for the whole row */\n    rowData: T | Record<string, any>;\n    /** Row index for the cell (data index, not the display index) */\n    rowIndex: number;\n    /** Orthogonal data type */\n    type: string;\n  };\n\n  const table = shallowRef<{ dt: InstanceType<typeof DataTableRef<T[]>> } | null>(null);\n\n  const props = withDefaults(\n    defineProps<{\n      data?: Config["data"];\n      class?: any;\n      columns?: Config["columns"];\n      ajax?: Config["ajax"];\n      options?: Config;\n    }>(),\n    {\n      data: () => [],\n      class: "nowrap hover order-column row-border stripe display",\n      options: () => ({}),\n    }\n  );\n\n  const emits = defineEmits<{\n    ready: [any];\n  }>();\n\n  onMounted(() => {\n    nextTick(() => {\n      emits("ready", table.value?.dt);\n    });\n  });\n</script>\n\n<style>\n  :root {\n    --dt-row-selected: 262.1, 83.3%, 57.8%;\n    --dt-row-selected-text: 210, 20%, 98%;\n    --dt-row-selected-link: 262.1, 83.3%, 57.8%;\n    --dt-row-stripe: 0, 0%, 100%;\n    --dt-row-hover: 0, 0%, 100%;\n    --dt-column-ordering: 0, 0%, 100%;\n    --dt-border: 220, 13%, 91%;\n    --dt-foreground: 224, 71.4%, 4.1%;\n  }\n\n  .dark {\n    --dt-row-selected: 263.4, 70%, 50.4%;\n    --dt-row-selected-text: 210, 20%, 98%;\n    --dt-row-selected-link: 263.4, 70%, 50.4%;\n    --dt-row-stripe: 224, 71.4%, 4.1%;\n    --dt-row-hover: 224, 71.4%, 4.1%;\n    --dt-column-ordering: 224, 71.4%, 4.1%;\n    --dt-border: 215, 27.9%, 16.9%;\n    --dt-foreground: 224, 71.4%, 4.1%;\n  }\n\n  table.dataTable td.dt-control {\n    text-align: center;\n    cursor: pointer;\n  }\n  table.dataTable td.dt-control:before {\n    display: inline-block;\n    color: hsla(var(--dt-foreground), 0.5);\n    content: "►";\n  }\n  table.dataTable tr.dt-hasChild td.dt-control:before {\n    content: "▼";\n  }\n\n  table.dataTable thead > tr > th.sorting,\n  table.dataTable thead > tr > th.sorting_asc,\n  table.dataTable thead > tr > th.sorting_desc,\n  table.dataTable thead > tr > th.sorting_asc_disabled,\n  table.dataTable thead > tr > th.sorting_desc_disabled,\n  table.dataTable thead > tr > td.sorting,\n  table.dataTable thead > tr > td.sorting_asc,\n  table.dataTable thead > tr > td.sorting_desc,\n  table.dataTable thead > tr > td.sorting_asc_disabled,\n  table.dataTable thead > tr > td.sorting_desc_disabled,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc,\n  table.dataTable thead > tr > th.dt-orderable-desc,\n  table.dataTable thead > tr > td.dt-orderable-asc,\n  table.dataTable thead > tr > td.dt-orderable-desc {\n    @apply relative cursor-pointer pr-7;\n  }\n  table.dataTable thead > tr > th.sorting:before,\n  table.dataTable thead > tr > th.sorting:after,\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_asc:after,\n  table.dataTable thead > tr > th.sorting_desc:before,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting:before,\n  table.dataTable thead > tr > td.sorting:after,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_asc:after,\n  table.dataTable thead > tr > td.sorting_desc:before,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\n  table.dataTable thead > tr > td.sorting_desc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:before,\n  table.dataTable thead > tr > th.dt-orderable-asc:after,\n  table.dataTable thead > tr > th.dt-orderable-desc:before,\n  table.dataTable thead > tr > th.dt-orderable-desc:after,\n  table.dataTable thead > tr > td.dt-orderable-asc:before,\n  table.dataTable thead > tr > td.dt-orderable-asc:after,\n  table.dataTable thead > tr > td.dt-orderable-desc:before,\n  table.dataTable thead > tr > td.dt-orderable-desc:after {\n    @apply absolute right-2.5 block text-xs leading-3 opacity-25;\n  }\n  table.dataTable thead > tr > th.sorting:before,\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_desc:before,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\n  table.dataTable thead > tr > td.sorting:before,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_desc:before,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:before,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:before,\n  table.dataTable thead > tr > th.dt-orderable-desc:before,\n  table.dataTable thead > tr > td.dt-orderable-asc:before,\n  table.dataTable thead > tr > td.dt-orderable-desc:before {\n    @apply bottom-[43%] h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-up.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-up.svg?color=white\')];\n  }\n  table.dataTable thead > tr > th.sorting:after,\n  table.dataTable thead > tr > th.sorting_asc:after,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting:after,\n  table.dataTable thead > tr > td.sorting_asc:after,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-orderable-asc:after,\n  table.dataTable thead > tr > th.dt-orderable-desc:after,\n  table.dataTable thead > tr > td.dt-orderable-asc:after,\n  table.dataTable thead > tr > td.dt-orderable-desc:after {\n    @apply top-[43%] h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n  table.dataTable thead > tr > th.sorting_asc:before,\n  table.dataTable thead > tr > th.sorting_desc:after,\n  table.dataTable thead > tr > td.sorting_asc:before,\n  table.dataTable thead > tr > td.sorting_desc:after,\n  /* V2 */\n  table.dataTable thead > tr > th.dt-ordering-asc:before,\n  table.dataTable thead > tr > th.dt-ordering-desc:after {\n    @apply opacity-80;\n  }\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\n  table.dataTable thead > tr > td.sorting_asc_disabled:before {\n    @apply hidden;\n  }\n  table.dataTable thead > tr > th:active,\n  table.dataTable thead > tr > td:active {\n    @apply outline-none;\n  }\n\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:before,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:after,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:before,\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:after {\n    @apply hidden;\n  }\n\n  div.dataTables_processing {\n    @apply absolute left-[50%] top-[50%] ml-[-100px] mt-[-26px] w-[200px] p-0.5 text-center;\n  }\n  div.dataTables_processing > div:last-child {\n    @apply relative mx-auto my-4 h-4 w-20;\n  }\n  div.dataTables_processing > div:last-child > div {\n    @apply absolute top-0 h-3.5 w-3.5 rounded-full;\n    background: hsl(var(--dt-row-selected));\n    animation-timing-function: cubic-bezier(0, 1, 1, 0);\n  }\n  div.dataTables_processing > div:last-child > div:nth-child(1) {\n    left: 8px;\n    animation: datatables-loader-1 0.6s infinite;\n  }\n  div.dataTables_processing > div:last-child > div:nth-child(2) {\n    left: 8px;\n    animation: datatables-loader-2 0.6s infinite;\n  }\n  div.dataTables_processing > div:last-child > div:nth-child(3) {\n    left: 32px;\n    animation: datatables-loader-2 0.6s infinite;\n  }\n  div.dataTables_processing > div:last-child > div:nth-child(4) {\n    left: 56px;\n    animation: datatables-loader-3 0.6s infinite;\n  }\n\n  @keyframes datatables-loader-1 {\n    0% {\n      transform: scale(0);\n    }\n    100% {\n      transform: scale(1);\n    }\n  }\n  @keyframes datatables-loader-3 {\n    0% {\n      transform: scale(1);\n    }\n    100% {\n      transform: scale(0);\n    }\n  }\n  @keyframes datatables-loader-2 {\n    0% {\n      transform: translate(0, 0);\n    }\n    100% {\n      transform: translate(24px, 0);\n    }\n  }\n  table.dataTable.nowrap th,\n  table.dataTable.nowrap td {\n    white-space: nowrap;\n  }\n  table.dataTable th.dt-left,\n  table.dataTable td.dt-left {\n    text-align: left;\n  }\n  table.dataTable th.dt-center,\n  table.dataTable td.dt-center,\n  table.dataTable td.dataTables_empty {\n    text-align: center;\n  }\n  table.dataTable th.dt-right,\n  table.dataTable td.dt-right {\n    text-align: right;\n  }\n  table.dataTable th.dt-justify,\n  table.dataTable td.dt-justify {\n    text-align: justify;\n  }\n  table.dataTable th.dt-nowrap,\n  table.dataTable td.dt-nowrap {\n    white-space: nowrap;\n  }\n  table.dataTable thead th,\n  table.dataTable thead td,\n  table.dataTable tfoot th,\n  table.dataTable tfoot td {\n    text-align: left;\n  }\n  table.dataTable thead th.dt-head-left,\n  table.dataTable thead td.dt-head-left,\n  table.dataTable tfoot th.dt-head-left,\n  table.dataTable tfoot td.dt-head-left {\n    text-align: left;\n  }\n  table.dataTable thead th.dt-head-center,\n  table.dataTable thead td.dt-head-center,\n  table.dataTable tfoot th.dt-head-center,\n  table.dataTable tfoot td.dt-head-center {\n    text-align: center;\n  }\n  table.dataTable thead th.dt-head-right,\n  table.dataTable thead td.dt-head-right,\n  table.dataTable tfoot th.dt-head-right,\n  table.dataTable tfoot td.dt-head-right {\n    text-align: right;\n  }\n  table.dataTable thead th.dt-head-justify,\n  table.dataTable thead td.dt-head-justify,\n  table.dataTable tfoot th.dt-head-justify,\n  table.dataTable tfoot td.dt-head-justify {\n    text-align: justify;\n  }\n  table.dataTable thead th.dt-head-nowrap,\n  table.dataTable thead td.dt-head-nowrap,\n  table.dataTable tfoot th.dt-head-nowrap,\n  table.dataTable tfoot td.dt-head-nowrap {\n    white-space: nowrap;\n  }\n  table.dataTable tbody th.dt-body-left,\n  table.dataTable tbody td.dt-body-left {\n    text-align: left;\n  }\n  table.dataTable tbody th.dt-body-center,\n  table.dataTable tbody td.dt-body-center {\n    text-align: center;\n  }\n  table.dataTable tbody th.dt-body-right,\n  table.dataTable tbody td.dt-body-right {\n    text-align: right;\n  }\n  table.dataTable tbody th.dt-body-justify,\n  table.dataTable tbody td.dt-body-justify {\n    text-align: justify;\n  }\n  table.dataTable tbody th.dt-body-nowrap,\n  table.dataTable tbody td.dt-body-nowrap {\n    white-space: nowrap;\n  }\n\n  /* Table Styles */\n\n  table.dataTable {\n    @apply w-full table-auto border-collapse;\n  }\n\n  /* Table header styles */\n  table.dataTable thead th,\n  table.dataTable tfoot th {\n    @apply text-left text-sm font-medium text-muted-foreground;\n  }\n\n  table.dataTable > thead > tr > th {\n    @apply border-b border-t-0 px-6 py-3;\n  }\n  table.dataTable > thead > tr > td {\n    @apply border-b px-6 py-3 text-sm;\n  }\n  table.dataTable > thead > tr > th:active,\n  table.dataTable > thead > tr > td:active {\n    @apply outline-none;\n  }\n  table.dataTable > tfoot > tr > th,\n  table.dataTable > tfoot > tr > td {\n    @apply border-t px-6 py-3;\n  }\n  table.dataTable tbody tr {\n    @apply bg-transparent;\n  }\n  table.dataTable tbody tr.selected > * {\n    @apply bg-primary/10;\n  }\n  table.dataTable tbody tr.selected a {\n    @apply text-primary;\n  }\n  table.dataTable tbody th,\n  table.dataTable tbody td {\n    @apply px-6 py-3 text-sm;\n  }\n  table.dataTable.row-border > tbody > tr > th,\n  table.dataTable.row-border > tbody > tr > td,\n  table.dataTable.display > tbody > tr > th,\n  table.dataTable.display > tbody > tr > td {\n    @apply border-t;\n  }\n  table.dataTable.row-border > tbody > tr:first-child > th,\n  table.dataTable.row-border > tbody > tr:first-child > td,\n  table.dataTable.display > tbody > tr:first-child > th,\n  table.dataTable.display > tbody > tr:first-child > td {\n    @apply border-t-0;\n  }\n  table.dataTable.row-border > tbody > tr.selected + tr.selected > td,\n  table.dataTable.display > tbody > tr.selected + tr.selected > td {\n    @apply border-t-primary/30;\n  }\n  table.dataTable.cell-border > tbody > tr > th,\n  table.dataTable.cell-border > tbody > tr > td {\n    @apply border-r border-t;\n  }\n  table.dataTable.cell-border > tbody > tr > th:first-child,\n  table.dataTable.cell-border > tbody > tr > td:first-child {\n    @apply border-l;\n  }\n  table.dataTable.cell-border > tbody > tr:first-child > th,\n  table.dataTable.cell-border > tbody > tr:first-child > td {\n    @apply border-t-0;\n  }\n  table.dataTable.stripe > tbody > tr.odd > *,\n  table.dataTable.display > tbody > tr.odd > * {\n    @apply bg-muted/50;\n  }\n  table.dataTable.stripe > tbody > tr.odd.selected > *,\n  table.dataTable.display > tbody > tr.odd.selected > * {\n    @apply bg-primary/10;\n  }\n  table.dataTable.hover > tbody > tr:hover > *,\n  table.dataTable.display > tbody > tr:hover > * {\n    @apply bg-muted;\n  }\n  table.dataTable.hover > tbody > tr.selected:hover > *,\n  table.dataTable.display > tbody > tr.selected:hover > * {\n    @apply !bg-primary/10;\n  }\n  table.dataTable.order-column > tbody tr > .sorting_1,\n  table.dataTable.order-column > tbody tr > .sorting_2,\n  table.dataTable.order-column > tbody tr > .sorting_3,\n  table.dataTable.display > tbody tr > .sorting_1,\n  table.dataTable.display > tbody tr > .sorting_2,\n  table.dataTable.display > tbody tr > .sorting_3 {\n    @apply bg-muted;\n  }\n  table.dataTable.order-column > tbody tr.selected > .sorting_1,\n  table.dataTable.order-column > tbody tr.selected > .sorting_2,\n  table.dataTable.order-column > tbody tr.selected > .sorting_3,\n  table.dataTable.display > tbody tr.selected > .sorting_1,\n  table.dataTable.display > tbody tr.selected > .sorting_2,\n  table.dataTable.display > tbody tr.selected > .sorting_3 {\n    @apply !bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.odd > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_1 {\n    @apply bg-muted/50;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_2 {\n    @apply bg-muted/30;\n  }\n  table.dataTable.display > tbody > tr.even > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_3 {\n    @apply bg-muted/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_1,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_1 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_2,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_2 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display > tbody > tr.even.selected > .sorting_3,\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_3 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_1,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_2,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover > .sorting_3,\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {\n    @apply bg-muted;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_1,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_2,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.display tbody tr:hover.selected > .sorting_3,\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {\n    @apply bg-primary/10;\n  }\n  table.dataTable.no-footer {\n    @apply border-b-0;\n  }\n  table.dataTable.compact thead th,\n  table.dataTable.compact thead td,\n  table.dataTable.compact tfoot th,\n  table.dataTable.compact tfoot td,\n  table.dataTable.compact tbody th,\n  table.dataTable.compact tbody td {\n    @apply px-4 py-2;\n  }\n\n  table.dataTable th,\n  table.dataTable td {\n    @apply box-content border-y;\n  }\n\n  table.dataTable tr:last-child td {\n    @apply !border-b-0;\n  }\n\n  /* Control feature layout */\n  .dataTables_wrapper {\n    @apply w-full overflow-x-auto;\n  }\n\n  /* Export button styles - v1 of datatables */\n  .dataTables_wrapper .dt-buttons {\n    @apply inline-flex flex-wrap items-center gap-2;\n    button {\n      @apply inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n    }\n  }\n  /* V2 of datatables button styles. \n  */\n  .dt-buttons {\n    @apply inline-flex flex-wrap items-center gap-2;\n    button {\n      @apply inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n    }\n  }\n\n  /*  Copy modal */\n  .dt-button-info {\n    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur;\n  }\n\n  /* Select box at bottom showing number of records being displayed - v1 of datatables */\n  .dataTables_wrapper .dataTables_length {\n    label {\n      @apply inline-flex items-center gap-2 text-sm font-normal text-muted-foreground;\n      select {\n        @apply h-9 w-[70px] cursor-pointer rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;\n      }\n    }\n  }\n  /* Select box at the bottom showing how many items are being display - v2 */\n  .dt-length {\n    @apply inline-flex items-center gap-2;\n    label {\n      @apply text-sm font-normal text-muted-foreground;\n    }\n    select {\n      @apply h-9 w-[70px] cursor-pointer rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;\n    }\n  }\n\n  /* Search box at the top styles - v1 of datatables */\n  .dataTables_wrapper .dataTables_filter {\n    label {\n      @apply inline-flex w-full cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;\n      input {\n        @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input sm:text-sm;\n      }\n    }\n  }\n\n  /* Search box at the top styles -v2 */\n  .dt-search {\n    @apply flex items-center gap-3;\n    label {\n      @apply inline-flex cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;\n    }\n    input {\n      @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input sm:text-sm md:w-[50%] lg:w-[250px];\n    }\n  }\n\n  /* Info text that shows `Showing X to XX of XXXX entries - v1  */\n  .dataTables_wrapper .dataTables_info,\n  .dt-info {\n    @apply flex items-center gap-3 text-sm !text-muted-foreground;\n  }\n\n  /* Pagination button styles - v1 datatables */\n  .dataTables_wrapper .dataTables_paginate {\n    .paginate_button {\n      @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n    }\n  }\n  /* Pagination button - v2 */\n  .dt-paging-button {\n    @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n    &.current,\n    &:hover {\n      @apply bg-muted;\n    }\n    &.disabled,\n    &.disabled:hover,\n    &.disabled:active {\n      @apply pointer-events-none opacity-50;\n    }\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {\n    @apply pointer-events-none opacity-50;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button:hover {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .paginate_button:active {\n    @apply bg-muted;\n  }\n  .dataTables_wrapper .dataTables_paginate .ellipsis,\n  .dt-paging .ellipsis {\n    @apply inline-flex h-8 min-w-[32px] items-start justify-center text-sm;\n  }\n  .dataTables_wrapper .dataTables_scroll {\n    clear: both;\n  }\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {\n    -webkit-overflow-scrolling: touch;\n  }\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th,\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {\n    vertical-align: middle;\n  }\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > thead\n    > tr\n    > th\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > thead\n    > tr\n    > td\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > tbody\n    > tr\n    > th\n    > div.dataTables_sizing,\n  .dataTables_wrapper\n    .dataTables_scroll\n    div.dataTables_scrollBody\n    > table\n    > tbody\n    > tr\n    > td\n    > div.dataTables_sizing {\n    height: 0;\n    overflow: hidden;\n    margin: 0 !important;\n    padding: 0 !important;\n  }\n  .dataTables_wrapper.no-footer .dataTables_scrollBody {\n    @apply border-b;\n  }\n  .dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,\n  .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {\n    border-bottom: none;\n  }\n  .dataTables_wrapper:after {\n    visibility: hidden;\n    display: block;\n    content: "";\n    clear: both;\n    height: 0;\n  }\n\n  /* \n  responsive styles\n   */\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty {\n    cursor: default !important;\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty:before {\n    display: none !important;\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control {\n    cursor: pointer;\n  }\n\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {\n    @apply mr-2 inline-flex h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg\')] bg-contain bg-center bg-no-repeat pb-[3px] content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control.arrow-right::before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control.arrow-right::before {\n    content: "◄";\n  }\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,\n  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {\n    @apply mr-2 inline-block h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > th.dtr-control {\n    padding-left: 0.333em;\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control,\n  table.dataTable.dtr-column > tbody > tr > td.control,\n  table.dataTable.dtr-column > tbody > tr > th.control {\n    cursor: pointer;\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr > td.control:before,\n  table.dataTable.dtr-column > tbody > tr > th.control:before {\n    @apply mr-2 inline-flex h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg\')] bg-contain bg-center bg-no-repeat pb-[3px] content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-right.svg?color=white\')];\n  }\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > td.control.arrow-right::before,\n  table.dataTable.dtr-column > tbody > tr > th.control.arrow-right::before {\n    content: "◄";\n  }\n  table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.parent td.control:before,\n  table.dataTable.dtr-column > tbody > tr.parent th.control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.dtr-control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.control:before,\n  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.control:before {\n    @apply mr-2 inline-block h-4 w-4 bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg\')] bg-contain bg-center bg-no-repeat content-[\'\'] dark:bg-[url(\'https://api.iconify.design/lucide:chevron-down.svg?color=white\')];\n  }\n\n  table.dataTable > tbody td.child {\n    @apply p-0;\n  }\n  table.dataTable > tbody > tr.child:hover,\n  table.dataTable > tbody > tr.child:hover > td.child {\n    background: transparent !important;\n  }\n  table.dataTable > tbody > tr.child ul.dtr-details {\n    @apply m-0 block w-full list-none p-0;\n  }\n  table.dataTable > tbody > tr.child ul.dtr-details > li {\n    @apply border-b p-3 px-7 hover:bg-muted;\n  }\n\n  table.dataTable > tbody > tr.child ul.dtr-details > li:last-child {\n    @apply border-b-0;\n  }\n  table.dataTable > tbody > tr.child span.dtr-title {\n    @apply inline-block min-w-[80px] font-bold;\n  }\n  /* Responsive modal */\n  div.dtr-modal {\n    @apply fixed left-0 top-0 z-[1000] box-border size-full;\n  }\n  div.dtr-modal div.dtr-modal-display {\n    @apply absolute left-1/2 top-1/2 z-[102] max-h-[80%] w-full max-w-screen-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border bg-background p-4 pb-0 md:px-7 md:py-4 md:pb-0 lg:max-h-[90%];\n  }\n  div.dtr-modal div.dtr-modal-content {\n    @apply relative flex flex-col p-0 text-[15px];\n    h2 {\n      @apply text-lg font-semibold text-foreground;\n    }\n    table tr td {\n      @apply space-x-10 pb-2 first:font-semibold [&:nth-child(2)]:pl-2;\n    }\n  }\n  div.dtr-modal div.dtr-modal-close {\n    @apply absolute right-2 top-2 z-[10] inline-flex size-6 cursor-pointer items-center justify-center rounded-md bg-muted/10 hover:bg-muted;\n  }\n  div.dtr-modal div.dtr-modal-background {\n    @apply fixed inset-0 z-[101] bg-background/20 backdrop-blur;\n  }\n\n  /* Search Builder Styles */\n  div.dt-button-collection {\n    overflow: visible !important;\n    z-index: 2002 !important;\n  }\n  div.dt-button-collection div.dtsb-searchBuilder {\n    padding-left: 1em !important;\n    padding-right: 1em !important;\n  }\n  div.dt-button-collection.dtb-collection-closeable div.dtsb-titleRow {\n    padding-right: 40px;\n  }\n  .dtsb-greyscale {\n    @apply !border;\n  }\n  div.dtsb-logicContainer .dtsb-greyscale {\n    border: none !important;\n  }\n  div.dtsb-searchBuilder {\n    @apply mb-4 cursor-default justify-evenly text-left;\n  }\n  div.dtsb-searchBuilder button.dtsb-button,\n  div.dtsb-searchBuilder select {\n    @apply text-sm;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow {\n    @apply mb-3 flex items-center justify-between;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {\n    @apply inline-block text-sm font-normal;\n  }\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title:empty {\n    display: inline;\n  }\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-value,\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-data,\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-condition {\n    display: block;\n  }\n  div.dtsb-searchBuilder div.dtsb-group {\n    @apply relative clear-both mb-4;\n  }\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-search {\n    float: right;\n  }\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-clearGroup {\n    margin: 2px;\n    text-align: center;\n    padding: 0;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\n    -webkit-transform: rotate(90deg);\n    -moz-transform: rotate(90deg);\n    -o-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n    position: absolute;\n    margin-top: 0.8em;\n    margin-right: 0.8em;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\n    margin-bottom: 0.8em;\n    display: flex;\n    justify-content: flex-start;\n    flex-flow: row wrap;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n    padding: 0.4em;\n    margin-right: 0.8em;\n    min-width: 5em;\n    max-width: 20em;\n    color: inherit;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    select.dtsb-dropDown\n    option.dtsb-notItalic,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input option.dtsb-notItalic {\n    font-style: normal;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-italic {\n    font-style: italic;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\n    flex: 1;\n    white-space: nowrap;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont span.dtsp-joiner {\n    margin-right: 0.8em;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input.dtsb-value {\n    width: 33%;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont select,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input {\n    height: 100%;\n    box-sizing: border-box;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\n    margin-left: auto;\n    display: inline-block;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-delete,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-right,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-left {\n    margin-right: 0.8em;\n  }\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-delete:last-child,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-right:last-child,\n  div.dtsb-searchBuilder\n    div.dtsb-group\n    div.dtsb-criteria\n    div.dtsb-buttonContainer\n    button.dtsb-left:last-child {\n    margin-right: 0;\n  }\n  @media screen and (max-width: 550px) {\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\n      display: flex;\n      flex-flow: none;\n      flex-direction: column;\n      justify-content: flex-start;\n      padding-right: calc(35px + 0.8em);\n      margin-bottom: 0px;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:first-child),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:nth-child(2)),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:last-child) {\n      padding-top: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:first-child,\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:nth-child(2),\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:last-child {\n      padding-top: 0em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n      max-width: none;\n      width: 100%;\n      margin-bottom: 0.8em;\n      margin-right: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\n      margin-right: 0.8em;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\n      position: absolute;\n      width: 35px;\n      display: flex;\n      flex-wrap: wrap-reverse;\n      right: 0;\n    }\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer button {\n      margin-right: 0px !important;\n    }\n  }\n  div.dtsb-searchBuilder button,\n  div.dtsb-searchBuilder select.dtsb-dropDown,\n  div.dtsb-searchBuilder input {\n    @apply bg-background;\n  }\n  div.dtsb-searchBuilder button.dtsb-button {\n    @apply relative box-border inline-flex h-9 cursor-pointer select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm font-normal text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n  }\n  div.dtsb-searchBuilder button.dtsb-button:hover {\n    @apply cursor-pointer bg-muted;\n  }\n  div.dtsb-searchBuilder div.dtsb-logicContainer {\n    @apply overflow-hidden rounded-none border;\n  }\n  div.dtsb-searchBuilder div.dtsb-logicContainer button {\n    @apply rounded-md border-transparent bg-transparent;\n  }\n  div.dtsb-searchBuilder button.dtsb-clearGroup {\n    min-width: 2em;\n    padding: 0;\n  }\n  div.dtsb-searchBuilder button.dtsb-iptbtn {\n    min-width: 100px;\n    text-align: left;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\n    @apply flex flex-row content-start items-start justify-start rounded-md;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-logic {\n    @apply m-0 shrink-0 grow rounded-none border-0;\n    flex-basis: 3em;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-clearGroup {\n    border: none;\n    border-radius: 0px;\n    width: 2em;\n    margin: 0px;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\n    @apply rounded-md border;\n  }\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value {\n    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;\n  }\n\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {\n    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;\n  }\n\n  /* Col vis styles */\n  .dt-button-background {\n    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm;\n  }\n  .dt-button-down-arrow {\n    @apply text-[10px];\n  }\n  .dt-button-collection {\n    @apply relative;\n    [role="menu"] {\n      @apply absolute -left-20 top-7 flex min-w-[200px] flex-col rounded-md border bg-background py-2 shadow before:mx-2 before:mb-2 before:text-xs before:text-muted-foreground/70 before:content-[\'Select_columns\'];\n      button {\n        @apply h-8 rounded-none border-none px-4 text-xs;\n      }\n      .dt-button.buttons-columnVisibility.dt-button-active {\n        @apply text-foreground after:ml-auto after:content-[\'✓\'];\n      }\n    }\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
  },
  {
    name: "Date Field",
    value: "date-field",
    deps: ["@internationalized/date"],
    files: [
      {
        fileName: "DateField.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DateFieldRoot\n    v-slot="{ segments }"\n    v-bind="props"\n    v-model="localModel"\n    :class="styles({ class: props.class })"\n  >\n    <template v-for="item in segments" :key="item.part">\n      <DateFieldInput\n        v-if="item.part === \'literal\'"\n        :part="item.part"\n        class="inline-flex items-center justify-center text-muted-foreground"\n      >\n        <Icon v-if="separatorIcon" :name="separatorIcon" class="text-muted-foreground" />\n        <span v-else-if="separator" class="mx-1 text-muted-foreground">{{ separator }}</span>\n      </DateFieldInput>\n      <DateFieldInput\n        v-else\n        :part="item.part"\n        class="inline-flex cursor-text items-center rounded px-1 transition focus:outline-none focus:ring-1 focus:ring-ring aria-[valuetext=Empty]:text-muted-foreground"\n      >\n        {{ item.value }}\n      </DateFieldInput>\n    </template>\n  </DateFieldRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DateFieldInput, DateFieldRoot } from "radix-vue";\n  import type { DateValue } from "@internationalized/date";\n  import type { DateFieldRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      DateFieldRootProps & {\n        class?: any;\n        separator?: string;\n        separatorIcon?: string;\n      }\n    >(),\n    {\n      separator: "/",\n    }\n  );\n  const localModel = defineModel<DateValue>();\n\n  const styles = tv({\n    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[invalid]:border-destructive data-[disabled]:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Datepicker",
    value: "datepicker",
    devDeps: ["@samk-dev/nuxt-vcalendar"],
    nuxtModules: ["@samk-dev/nuxt-vcalendar"],
    instructions: [
      "You can customize the datepicker by adding options to your nuxt.config.js file",
    ],
    files: [
      {
        fileName: "Datepicker.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ClientOnly>\n    <VDatePicker\n      :trim-weeks="props.trimWeeks || true"\n      :is-dark="$colorMode.value == \'dark\'"\n      v-bind="$attrs"\n    >\n      <template v-for="(_, slot) in $slots" #[slot]="scope">\n        <slot :name="slot" v-bind="scope" />\n      </template>\n    </VDatePicker>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import type { Calendar, DatePicker } from "v-calendar";\n\n  defineOptions({ inheritAttrs: false });\n\n  // @ts-expect-error - This is a hacky way to get the props from the Calendar and DatePicker components\n  interface Props\n    extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]>,\n      /* @vue-ignore */ Omit<Partial<InstanceType<typeof DatePicker>["$props"]>, "attributes"> {}\n\n  const props = defineProps<Props & { trimWeeks?: boolean }>();\n</script>\n\n<style>\n  :root {\n    --vc-font-family: var(--font-sans);\n    --vc-rounded-full: var(--radius);\n    --vc-font-bold: 500;\n    --vc-font-semibold: 600;\n    --vc-text-lg: 16px;\n  }\n\n  .vc-light,\n  .vc-dark {\n    --vc-bg: theme("colors.background");\n    --vc-border: theme("colors.border");\n    --vc-focus-ring: 0 0 0 3px hsl(var(--primary) / 30%);\n    --vc-weekday-color: theme("colors.muted.foreground");\n    --vc-popover-content-color: theme("colors.popover.foreground");\n    --vc-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-popover-content-bg: theme("colors.popover.DEFAULT");\n    --vc-popover-content-border: theme("colors.border");\n    --vc-header-arrow-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-weeknumber-color: theme("colors.muted.foreground");\n    --vc-nav-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-time-year-color: theme("colors.foreground");\n    --vc-time-weekday-color: theme("colors.foreground");\n    --vc-time-month-color: theme("colors.foreground");\n    --vc-time-day-color: theme("colors.foreground");\n\n    --vc-nav-item-active-color: theme("colors.primary.foreground");\n    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");\n\n    --vc-time-select-group-bg: theme("colors.background");\n    --vc-time-select-group-border: theme("colors.border");\n    --vc-time-picker-border: theme("colors.border");\n\n    &.vc-attr,\n    & .vc-attr {\n      --vc-content-color: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-border: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-content-color: theme("colors.primary.foreground");\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\n      --vc-highlight-light-content-color: theme("colors.secondary.foreground");\n      --vc-highlight-solid-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-solid-content-color: theme("colors.primary.foreground");\n    }\n  }\n\n  .vc-blue {\n    --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n    --vc-accent-400: theme("colors.primary.DEFAULT");\n    --vc-accent-500: theme("colors.primary.DEFAULT");\n    --vc-accent-600: theme("colors.primary.DEFAULT / 70%");\n  }\n\n  .dark {\n    .vc-blue {\n      --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n      --vc-accent-400: theme("colors.primary.DEFAULT");\n      --vc-accent-500: theme("colors.primary.DEFAULT / 70%");\n    }\n  }\n  .vc-header .vc-title {\n    @apply font-medium;\n  }\n  .vc-weekdays {\n    @apply my-2 font-normal;\n  }\n  .vc-day-content,\n  .vc-day,\n  .vc-highlight {\n    @apply h-9 w-9 rounded-md;\n  }\n  .vc-focus {\n    @apply focus-within:shadow-none;\n  }\n  .vc-day {\n    @apply mb-1.5;\n  }\n\n  .vc-base-icon {\n    @apply h-4 w-4 stroke-1;\n  }\n  .vc-header .vc-arrow,\n  .vc-nav-arrow {\n    @apply h-7 w-7 rounded-md;\n    border: 1px solid hsl(var(--border));\n  }\n  .vc-header .vc-prev,\n  .vc-header .vc-next {\n    @apply border;\n  }\n  .weekday-position-1 .vc-highlights {\n    @apply rounded-l-md;\n  }\n  .weekday-position-7 .vc-highlights {\n    @apply rounded-r-md;\n  }\n  .vc-highlight-bg-light {\n    @apply bg-accent;\n  }\n  .vc-nav-item {\n    @apply font-medium;\n  }\n  .vc-header .vc-title-wrapper {\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\n  }\n  .vc-highlights + .vc-day-content {\n    @apply hover:bg-accent/5;\n  }\n</style>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose v-bind="props">\n    <slot />\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDialogPortal :to="to">\n    <UiDialogOverlay />\n    <DialogContent :class="styles({ class: props.class })" v-bind="{ ...forwarded, ...$attrs }">\n      <slot>\n        <slot name="header">\n          <UiDialogHeader>\n            <slot name="title">\n              <UiDialogTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiDialogDescription v-if="description" :description="description" />\n            </slot>\n          </UiDialogHeader>\n        </slot>\n        <slot name="content" />\n        <slot name="footer" />\n      </slot>\n      <slot name="close">\n        <UiDialogClose />\n      </slot>\n      <UiDialogClose\n        v-if="!hideClose"\n        class="absolute right-4 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"\n      >\n        <Icon name="lucide:x" class="h-4 w-4" />\n        <span class="sr-only">Close</span>\n      </UiDialogClose>\n    </DialogContent>\n  </UiDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { DialogContentEmits, DialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    DialogContentProps & {\n      /** Icon to display in the close button */\n      icon?: string;\n      /** Title text */\n      title?: string;\n      /** Description text */\n      description?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Whether to hide the close button */\n      hideClose?: boolean;\n      /** Where to render the dialog */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "hideClose", "to"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogDescription :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "radix-vue";\n  import type { DialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The description text */\n      description?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "description");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Dialog.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogRoot v-bind="forwarded">\n    <slot />\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "radix-vue";\n  import type { DialogRootEmits, DialogRootProps } from "radix-vue";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Dialog/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col space-y-1.5 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogOverlay :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "radix-vue";\n  import type { DialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogOverlayProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogPortal v-bind="props">\n    <slot />\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal } from "radix-vue";\n  import type { DialogPortalProps } from "radix-vue";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTitle :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "radix-vue";\n  import type { DialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The title text */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "text-lg font-semibold leading-none tracking-tight",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTrigger v-bind="props">\n    <slot />\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger } from "radix-vue";\n  import type { DialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive as="div" :class="base({ orientation, type, class: props.class })">\n    <Separator :orientation="orientation" :class="border({ orientation, type })" />\n    <template v-if="label || icon || avatar || $slots.default">\n      <div :class="container({ orientation, type })">\n        <slot>\n          <slot name="label">\n            <span v-if="label" :class="labelClass({ orientation, type })">\n              {{ label }}\n            </span>\n          </slot>\n          <slot name="icon">\n            <Icon v-if="icon" :name="icon" :class="iconClass({ orientation, type })" />\n          </slot>\n          <slot name="avatar">\n            <UiAvatar v-if="avatar" :src="avatar" />\n          </slot>\n        </slot>\n      </div>\n    </template>\n    <Separator :orientation="orientation" :class="border({ orientation, type })" />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive, Separator } from "radix-vue";\n\n  const props = defineProps<{\n    class?: any;\n    type?: VariantProps<typeof style>["type"];\n    orientation?: VariantProps<typeof style>["orientation"];\n    icon?: string;\n    label?: string;\n    avatar?: string;\n  }>();\n\n  const style = tv({\n    slots: {\n      base: "flex w-full items-center text-center align-middle",\n      container: "flex font-medium",\n      border: "flex border-border",\n      icon: "h-5 w-5 shrink-0",\n      label: "text-sm",\n    },\n    variants: {\n      orientation: {\n        horizontal: {\n          base: "flex-row",\n          container: "mx-3 whitespace-nowrap",\n          border: "w-full border-t",\n        },\n        vertical: {\n          base: "h-full flex-col",\n          container: "my-3",\n          border: "h-full border-s",\n        },\n      },\n      type: {\n        solid: {\n          border: "border-solid",\n        },\n        dashed: {\n          border: "border-dashed",\n        },\n        dotted: {\n          border: "border-dotted",\n        },\n      },\n    },\n    defaultVariants: {\n      orientation: "horizontal",\n      type: "solid",\n    },\n  });\n\n  const { base, border, container, icon: iconClass, label: labelClass } = style();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerClose v-bind="props">\n    <slot />\n  </DrawerClose>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerClose } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerClose>, "$props">> {}\n  const props = defineProps<Props>();\n</script>\n',
      },
      {
        fileName: "Drawer/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDrawerPortal>\n    <slot name="overlay">\n      <UiDrawerOverlay />\n    </slot>\n    <slot name="content">\n      <DrawerContent v-bind="{ ...props, ...$attrs }" :class="styles({ class: props.class })">\n        <slot name="knob">\n          <div\n            className="mx-auto shrink-0 cursor-grab active:cursor-grabbing my-5 h-2 w-[60px] rounded-full bg-muted"\n          />\n        </slot>\n        <slot />\n      </DrawerContent>\n    </slot>\n  </UiDrawerPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerContent } from "vaul-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerContent>, "$props">> {}\n\n  const props = defineProps<Props & { class?: any }>();\n  const styles = tv({\n    base: "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto max-h-[95%] flex-col rounded-t-[10px] border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerDescription v-bind="props" :class="styles({ class: props.class })">\n    <slot>\n      {{ props.text }}\n    </slot>\n  </DrawerDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerDescription } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerDescription>, "$props">> {\n    class?: any;\n    text?: string;\n  }\n\n  const props = defineProps<Props>();\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Drawer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerRoot v-bind="forwarded">\n    <slot />\n  </DrawerRoot>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardPropsEmits } from "radix-vue";\n  import { DrawerRoot } from "vaul-vue";\n  import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";\n\n  const props = defineProps<DrawerRootProps>();\n  const emits = defineEmits<DrawerRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Drawer/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerOverlay v-bind="props" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { DrawerOverlay } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerOverlay>, "$props">> {}\n\n  const props = defineProps<Props & { class?: any }>();\n\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-black/40 backdrop-blur",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerPortal v-bind="props">\n    <slot />\n  </DrawerPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerPortal } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerPortal>, "$props">> {}\n\n  const props = defineProps<Props>();\n</script>\n',
      },
      {
        fileName: "Drawer/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerTitle v-bind="props" :class="styles({ class: props.class })">\n    <slot>\n      {{ props.text }}\n    </slot>\n  </DrawerTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerTitle } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerTitle>, "$props">> {\n    class?: any;\n    text?: string;\n  }\n\n  const props = defineProps<Props>();\n\n  const styles = tv({\n    base: "text-lg font-semibold leading-none tracking-tight",\n  });\n</script>\n',
      },
      {
        fileName: "Drawer/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DrawerTrigger v-bind="props">\n    <slot />\n  </DrawerTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DrawerTrigger } from "vaul-vue";\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerTrigger>, "$props">> {}\n\n  const props = defineProps<Props>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuArrow } from "radix-vue";\n  import type { DropdownMenuArrowProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuArrowProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      asChild: false,\n      width: 10,\n      height: 5,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "rotate-45 border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/CheckboxItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiDropdownMenuItemIndicator icon="lucide:check" />\n    </span>\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>\n    </slot>\n  </DropdownMenuCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuCheckboxItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The shorttcut text to display */\n      shortcut?: string;\n      /** The title text to display */\n      title?: string;\n    }\n  >();\n  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "title", "shortcut", "class"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDropdownMenuPortal>\n    <DropdownMenuContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </DropdownMenuContent>\n  </UiDropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuContent, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      align: "center",\n      sideOffset: 5,\n      side: "bottom",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<DropdownMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/DropdownMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuRoot v-bind="forwarded">\n    <slot />\n  </DropdownMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRoot, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuRootProps>();\n\n  const emit = defineEmits<DropdownMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuGroup v-bind="props">\n    <slot />\n  </DropdownMenuGroup>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuGroup } from "radix-vue";\n  import type { DropdownMenuGroupProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuGroupProps>();\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuItem v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      </slot>\n      <slot name="title">\n        <span v-if="title">{{ title }}</span>\n      </slot>\n    </slot>\n    <slot name="shortcut">\n      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>\n    </slot>\n  </DropdownMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuItem, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Whether to inset the content */\n      inset?: boolean;\n      /** The shorttcut text to display */\n      shortcut?: string;\n      /** The title text to display */\n      title?: string;\n      /** The icon to display */\n      icon?: string;\n    }\n  >();\n\n  const emits = defineEmits<DropdownMenuItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n  </DropdownMenuItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuItemIndicator } from "radix-vue";\n  import type { DropdownMenuItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuLabel :class="styles({ inset, class: props.class })" v-bind="forwarded">\n    <slot>{{ label }}</slot>\n  </DropdownMenuLabel>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuLabel } from "radix-vue";\n  import type { DropdownMenuLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuLabelProps & {\n      class?: any;\n      inset?: boolean;\n      label?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "label");\n  const styles = tv({\n    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",\n    variants: {\n      inset: { true: "pl-8" },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuPortal v-bind="props">\n    <slot />\n  </DropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuPortal } from "radix-vue";\n  import type { DropdownMenuPortalProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuPortalProps>();\n</script>\n',
      },
      {
        fileName: "DropdownMenu/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuRadioGroup v-bind="forwarded">\n    <slot />\n  </DropdownMenuRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRadioGroup, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuRadioGroupProps>();\n\n  const emits = defineEmits<DropdownMenuRadioGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/RadioItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuRadioItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiDropdownMenuItemIndicator>\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />\n      </UiDropdownMenuItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </DropdownMenuRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuRadioItem, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuRadioItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The icon to display */\n      icon?: string;\n      /** The title text to display */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<DropdownMenuRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuSeparator :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSeparator } from "radix-vue";\n  import type { DropdownMenuSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "span",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest opacity-60",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuSub v-bind="forwarded">\n    <slot />\n  </DropdownMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSub, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuSubEmits, DropdownMenuSubProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuSubProps>();\n  const emits = defineEmits<DropdownMenuSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "DropdownMenu/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDropdownMenuPortal :to="to">\n    <DropdownMenuSubContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </DropdownMenuSubContent>\n  </UiDropdownMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSubContent, useForwardPropsEmits } from "radix-vue";\n  import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      DropdownMenuSubContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The element to render the portal into */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      loop: true,\n      sideOffset: 8,\n      avoidCollisions: true,\n      collisionPadding: 5,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<DropdownMenuSubContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[180px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuSubTrigger v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon\n      class="ml-auto h-4 w-4 text-muted-foreground"\n      :name="trailingIcon || \'lucide:chevron-right\'"\n    />\n  </DropdownMenuSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuSubTrigger } from "radix-vue";\n  import type { DropdownMenuSubTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    DropdownMenuSubTriggerProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The icon to display */\n      icon?: string;\n      /** The title for the item */\n      title?: string;\n      /** The trailing icon to display */\n      trailingIcon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");\n  const styles = tv({\n    base: "flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "DropdownMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DropdownMenuTrigger v-bind="props">\n    <slot />\n  </DropdownMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DropdownMenuTrigger } from "radix-vue";\n  import type { DropdownMenuTriggerProps } from "radix-vue";\n\n  const props = defineProps<DropdownMenuTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div ref="dropZoneRef" :class="styles({ isOverDropZone, class: props.class })" @click="open()">\n    <slot name="message">\n      <div class="py-10 text-center">\n        <slot name="icon">\n          <div\n            v-if="icon"\n            class="inline-flex items-center justify-center rounded-md border p-2 transition"\n            :class="[isOverDropZone && \'animate-bounce border-primary\']"\n          >\n            <Icon\n              :name="icon"\n              class="h-7 w-7 opacity-70"\n              :class="[isOverDropZone && \'text-primary\']"\n            />\n          </div>\n        </slot>\n        <slot name="title">\n          <p class="mt-5 text-sm font-medium" v-html="title" />\n        </slot>\n        <slot name="subtext">\n          <p class="mt-1 text-sm text-muted-foreground/60" v-html="subtext" />\n        </slot>\n      </div>\n    </slot>\n  </div>\n</template>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The text to display as the title of the dropzone.\n       */\n      title?: string;\n      /**\n       * The text to display as the subtext of the dropzone.\n       */\n      subtext?: string;\n      /**\n       * The icon to display in the dropzone.\n       */\n      icon?: string;\n      /**\n       * The function to call when files are dropped.\n       */\n      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type\n      onDrop?: Function;\n      /**\n       * Whether or not to allow multiple files to be picked. Does not affect drag and drop.\n       */\n      multiple?: boolean;\n      /**\n       * The file types to accept. Does not affect drag and drop.\n       */\n      accept?: string;\n      class?: any;\n    }>(),\n    {\n      title: "Click to upload or drag & drop files.",\n      subtext: "All file types accepted",\n      icon: "heroicons:cloud-arrow-up",\n      multiple: true,\n      accept: "*",\n    }\n  );\n\n  const { open, reset, onChange } = useFileDialog({\n    multiple: props.multiple,\n    accept: props.accept,\n  });\n\n  onChange((files: FileList | null) => {\n    if (files?.length) {\n      handleDrop(Array.from(files || []));\n      reset();\n    }\n  });\n\n  const dropZoneRef = ref<HTMLDivElement>();\n  const emits = defineEmits<{\n    dropped: [any];\n  }>();\n\n  const handleDrop = (files: File[] | null) => {\n    if (!files) return;\n    if (props.onDrop) props.onDrop(files);\n    emits("dropped", files);\n  };\n\n  const { isOverDropZone } = useDropZone(dropZoneRef, handleDrop);\n\n  const styles = tv({\n    base: "flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed transition hover:border-primary",\n    variants: {\n      isOverDropZone: { true: "border-primary bg-primary/10" },\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableArea v-bind="props">\n    <slot />\n  </EditableArea>\n</template>\n\n<script lang="ts" setup>\n  import { EditableArea } from "radix-vue";\n  import type { EditableAreaProps } from "radix-vue";\n\n  const props = defineProps<EditableAreaProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableCancelTrigger v-bind="props">\n    <slot />\n  </EditableCancelTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableCancelTrigger } from "radix-vue";\n  import type { EditableCancelTriggerProps } from "radix-vue";\n\n  const props = defineProps<EditableCancelTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Edit.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableEditTrigger v-bind="props">\n    <slot />\n  </EditableEditTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableEditTrigger } from "radix-vue";\n  import type { EditableEditTriggerProps } from "radix-vue";\n\n  const props = defineProps<EditableEditTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Editable.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableRoot :ref="forwardRef" v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </EditableRoot>\n</template>\n\n<script lang="ts" setup>\n  import { EditableRoot, useForwardExpose, useForwardPropsEmits } from "radix-vue";\n  import type { EditableRootEmits, EditableRootProps } from "radix-vue";\n\n  const { currentRef, forwardRef } = useForwardExpose();\n  const props = defineProps<EditableRootProps>();\n  const emit = defineEmits<EditableRootEmits & { ready: [v?: any] }>();\n  const forwarded = useForwardPropsEmits(props, emit);\n\n  onMounted(() => {\n    // Emit the ready event with the current ref value\n    emit("ready", currentRef);\n  });\n</script>\n',
      },
      {
        fileName: "Editable/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableInput v-bind="props">\n    <slot />\n  </EditableInput>\n</template>\n\n<script lang="ts" setup>\n  import { EditableInput } from "radix-vue";\n  import type { EditableInputProps } from "radix-vue";\n\n  const props = defineProps<EditableInputProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Preview.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditablePreview v-bind="props">\n    <slot />\n  </EditablePreview>\n</template>\n\n<script lang="ts" setup>\n  import { EditablePreview } from "radix-vue";\n  import type { EditablePreviewProps } from "radix-vue";\n\n  const props = defineProps<EditablePreviewProps>();\n</script>\n',
      },
      {
        fileName: "Editable/Submit.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <EditableSubmitTrigger v-bind="props">\n    <slot />\n  </EditableSubmitTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { EditableSubmitTrigger } from "radix-vue";\n  import type { EditableSubmitTriggerProps } from "radix-vue";\n\n  const props = defineProps<EditableSubmitTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles().base({ class: props.class, color, type, size, circle })">\n    <slot :styles="styles().icon({ color, type, size, circle })">\n      <Icon :name="icon" :class="styles().icon({ color, type, size, circle })" />\n    </slot>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      class?: any;\n      icon: string;\n      color?: VariantProps<typeof styles>["color"];\n      type?: VariantProps<typeof styles>["type"];\n      size?: VariantProps<typeof styles>["size"];\n      circle?: boolean;\n    }>(),\n    {\n      color: "primary",\n      type: "modern",\n      size: "lg",\n      circle: false,\n    }\n  );\n\n  const styles = tv({\n    slots: {\n      base: "flex shrink-0 items-center justify-center",\n      icon: "",\n    },\n\n    variants: {\n      color: {\n        primary: {\n          base: "",\n          icon: "",\n        },\n        success: {\n          base: "",\n          icon: "",\n        },\n        warning: {\n          base: "",\n          icon: "",\n        },\n        error: {\n          base: "",\n          icon: "",\n        },\n        info: {\n          base: "",\n          icon: "",\n        },\n      },\n      type: {\n        light: {\n          base: "",\n          icon: "",\n        },\n        dark: {\n          base: "",\n          icon: "",\n        },\n        modern: {\n          base: "",\n          icon: "",\n        },\n      },\n      size: {\n        sm: {\n          base: "size-8",\n          icon: "size-4",\n        },\n        md: {\n          base: "size-10",\n          icon: "size-5",\n        },\n        lg: {\n          base: "size-12",\n          icon: "size-6",\n        },\n        xl: {\n          base: "size-14",\n          icon: "size-7",\n        },\n      },\n      circle: {\n        true: {\n          base: "rounded-full",\n        },\n        false: {\n          base: "rounded-lg",\n        },\n      },\n    },\n    compoundVariants: [\n      {\n        color: "primary",\n        type: "light",\n        class: { base: "bg-primary/5", icon: "text-primary" },\n      },\n      {\n        color: "success",\n        type: "light",\n        class: {\n          base: "bg-green-500/10",\n          icon: "text-green-600",\n        },\n      },\n      {\n        color: "warning",\n        type: "light",\n        class: { base: "bg-amber-500/10", icon: "text-amber-600" },\n      },\n      {\n        color: "error",\n        type: "light",\n        class: { base: "bg-destructive/10", icon: "text-destructive" },\n      },\n      {\n        color: "info",\n        type: "light",\n        class: { base: "bg-blue-500/10", icon: "text-blue-600" },\n      },\n      // Dark\n      {\n        color: "primary",\n        type: "dark",\n        class: { base: "bg-primary", icon: "text-primary-foreground" },\n      },\n      {\n        color: "success",\n        type: "dark",\n        class: { base: "bg-green-600", icon: "text-green-50" },\n      },\n      {\n        color: "warning",\n        type: "dark",\n        class: { base: "bg-amber-600", icon: "text-amber-50" },\n      },\n      {\n        color: "error",\n        type: "dark",\n        class: { base: "bg-destructive", icon: "text-destructive-foreground" },\n      },\n      {\n        color: "info",\n        type: "dark",\n        class: { base: "bg-blue-500", icon: "text-blue-50" },\n      },\n      // Modern\n      {\n        type: "modern",\n        class: { base: "border bg-background", icon: "text-muted-foreground" },\n      },\n    ],\n    defaultVariants: {\n      color: "primary",\n      type: "modern",\n      size: "lg",\n      circle: false,\n    },\n  });\n</script>\n',
      },
    ],
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Slot\n    :id="formItemId"\n    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"\n    :aria-invalid="!!error"\n  >\n    <slot />\n  </Slot>\n</template>\n\n<script lang="ts" setup>\n  import { Slot } from "radix-vue";\n\n  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();\n</script>\n',
      },
      {
        fileName: "Form/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <p :id="formDescriptionId" :class="styles({ class: props.class })" v-bind="$attrs">\n    <slot>\n      <ClientOnly>\n        <p v-html="description" />\n      </ClientOnly>\n    </slot>\n  </p>\n</template>\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n\n  const { formDescriptionId } = useFormField();\n  const props = defineProps<{ class?: any; description?: string }>();\n  const styles = tv({ base: "text-sm text-muted-foreground" });\n</script>\n',
      },
      {
        fileName: "Form/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })" v-bind="$attrs">\n    <slot name="label">\n      <UiFormLabel v-if="label || hint" :label="label" :hint="hint" />\n    </slot>\n    <UiFormControl>\n      <slot />\n    </UiFormControl>\n    <slot name="description">\n      <UiFormDescription v-if="description" :description="description" />\n    </slot>\n    <slot name="errorMessage">\n      <TransitionSlide tag="p">\n        <UiFormMessage v-if="!hideMessage" />\n      </TransitionSlide>\n    </slot>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { InjectionKey } from "vue";\n\n  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;\n</script>\n\n<script lang="ts" setup>\n  defineOptions({ inheritAttrs: false });\n\n  const id = useId();\n  provide(FORM_ITEM_INJECTION_KEY, id);\n\n  const props = defineProps<{\n    class?: any;\n    label?: string;\n    description?: string;\n    hint?: string;\n    hideMessage?: boolean;\n  }>();\n\n  const styles = tv({ base: "space-y-1.5" });\n</script>\n',
      },
      {
        fileName: "Form/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Label\n    :class="styles({ error: Boolean(error), class: props.class })"\n    :for="formItemId"\n    v-bind="$attrs"\n  >\n    <slot\n      >{{ label }}\n      <span class="ml-auto font-normal text-muted-foreground/80">{{ hint }}</span></slot\n    >\n  </Label>\n</template>\n\n<script lang="ts" setup>\n  import { Label } from "radix-vue";\n  import type { LabelProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<LabelProps & { class?: any; label?: string; hint?: string }>();\n\n  const { error, formItemId } = useFormField();\n\n  const styles = tv({\n    base: "flex w-full items-center justify-between text-left text-sm font-medium tracking-tight text-foreground hover:cursor-pointer",\n    variants: {\n      error: {\n        true: "text-destructive",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Form/Message.vue",
        dirPath: "components/UI",
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Separator v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { Separator } from "radix-vue";\n  import type { SeparatorProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SeparatorProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "hr",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class");\n\n  const styles = tv({\n    base: \'h-px w-full border-t-0 bg-[linear-gradient(90deg,theme("colors.input/10%"),_theme("colors.input"),_theme("colors.input/10%"))]\',\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardArrow :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardArrow } from "radix-vue";\n  import type { HoverCardArrowProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardArrowProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      height: 5,\n      width: 10,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fill-popover",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiHoverCardPortal :to="to">\n    <HoverCardContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot />\n    </HoverCardContent>\n  </UiHoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardContent } from "radix-vue";\n  import type { HoverCardContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardContentProps & {\n        /** Custom class(es) to add to the content */\n        class?: any;\n        /** The element or selector the content should be positioned relative to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 5,\n      align: "center",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "to");\n  const styles = tv({\n    base: "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/HoverCard.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardRoot v-bind="forwarded">\n    <slot />\n  </HoverCardRoot>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardRoot, useForwardPropsEmits } from "radix-vue";\n  import type { HoverCardRootEmits, HoverCardRootProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<HoverCardRootProps>(), {\n    openDelay: 200,\n    closeDelay: 200,\n  });\n\n  const emits = defineEmits<HoverCardRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "HoverCard/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardPortal v-bind="props">\n    <slot />\n  </HoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardPortal } from "radix-vue";\n  import type { HoverCardPortalProps } from "radix-vue";\n\n  const props = defineProps<HoverCardPortalProps>();\n</script>\n',
      },
      {
        fileName: "HoverCard/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardTrigger v-bind="props">\n    <slot />\n  </HoverCardTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardTrigger } from "radix-vue";\n  import type { HoverCardTriggerProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<HoverCardTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Input",
    value: "input",
    devDeps: ["@vueuse/core"],
    files: [
      {
        fileName: "Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <!-- eslint-disable-next-line vue/html-self-closing -->\n  <input v-bind="props" v-model="localModel" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      class?: any;\n      id?: string;\n      name?: string;\n      placeholder?: string;\n      disabled?: boolean;\n      required?: boolean;\n      type?: string;\n      modelValue?: any;\n    }>(),\n    { type: "text" }\n  );\n  const emits = defineEmits<{\n    "update:modelValue": [value: any];\n  }>();\n  const localModel = useVModel(props, "modelValue", emits);\n\n  const styles = tv({\n    base: "form-input h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Keyboard Key",
    value: "kbd",
    files: [
      {
        fileName: "Kbd.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ size, class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n<script setup lang="ts">\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** The size of the component */\n        size?: VariantProps<typeof styles>["size"];\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "kbd",\n      size: "sm",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "size");\n\n  const styles = tv({\n    base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-border bg-muted font-sans font-medium",\n    variants: {\n      size: {\n        xs: "h-5 min-h-[16px] px-1 text-[10px]",\n        sm: "h-6 min-h-[20px] px-1.5 text-[11px]",\n        md: "h-7 min-h-[24px] px-2 text-[12px]",\n      },\n    },\n    defaultVariants: {\n      size: "sm",\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Label :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n    <slot name="hint">\n      <span v-if="hint">\n        {{ hint }}\n      </span>\n    </slot>\n  </Label>\n</template>\n\n<script lang="ts" setup>\n  import { Label } from "radix-vue";\n  import type { LabelProps } from "radix-vue";\n\n  const props = defineProps<\n    LabelProps & {\n      /** Custom class(es) to add to the label */\n      class?: any;\n      hint?: string;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "class", "hint");\n\n  const styles = tv({\n    base: "flex items-center justify-between text-[15px] font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col gap-1 leading-none",\n  });\n</script>\n',
      },
      {
        fileName: "List/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <component\n    :is="eltype"\n    :href="href"\n    :to="to"\n    :class="\n      styles({\n        hover: Boolean(onClick) || Boolean(to) || Boolean(href),\n        class: props.class,\n      })\n    "\n    @click="onClick"\n  >\n    <slot />\n  </component>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    /**Custom class(es) to add to the element */\n    class?: any;\n    /** Function called when the item is clicked */\n    onClick?: () => void;\n    /** The location that the item should navigate to when clicked */\n    to?: string;\n    /** The href for the `a` tag */\n    href?: string;\n  }>();\n\n  const styles = tv({\n    base: "flex w-full items-center gap-5 px-4 py-2",\n    variants: {\n      hover: {\n        true: "cursor-pointer outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary/10",\n      },\n    },\n  });\n\n  const eltype = computed(() => {\n    if (props.to || props.href) return resolveComponent("NuxtLink");\n    if (props.onClick) return "button";\n    return "li";\n  });\n</script>\n',
      },
      {
        fileName: "List/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "ul",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "w-full py-2",\n  });\n</script>\n',
      },
      {
        fileName: "List/Subtitle.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ subtitle }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The subtitle of the component */\n        subtitle?: string;\n      }\n    >(),\n    {\n      as: "p",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "subtitle");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "List/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The title of the component */\n        title?: string;\n      }\n    >(),\n    {\n      as: "p",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "font-semibold",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ListboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxContent, useForwardProps } from "radix-vue";\n  import type { ListboxContentProps } from "radix-vue";\n\n  const props = defineProps<ListboxContentProps & { class?: any }>();\n  const forwarded = useForwardProps(reactiveOmit(props));\n\n  const styles = tv({\n    base: "max-h-[300px] w-full overflow-y-auto rounded-md border bg-popover px-4 py-2",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Filter.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxFilter v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ListboxFilter, useForwardPropsEmits } from "radix-vue";\n  import type { ListboxFilterEmits, ListboxFilterProps } from "radix-vue";\n\n  const props = defineProps<ListboxFilterProps & { class?: any; placeholder?: string }>();\n  const emits = defineEmits<ListboxFilterEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxGroup v-bind="forwarded">\n    <slot />\n  </ListboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxGroup, useForwardPropsEmits } from "radix-vue";\n  import type { ListboxGroupProps } from "radix-vue";\n\n  const props = defineProps<ListboxGroupProps>();\n  const forwarded = useForwardPropsEmits(props);\n</script>\n',
      },
      {
        fileName: "Listbox/GroupLabel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxGroupLabel v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ListboxGroupLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxGroupLabel, useForwardProps } from "radix-vue";\n  import type { ListboxGroupLabelProps } from "radix-vue";\n\n  const props = defineProps<ListboxGroupLabelProps & { class?: any }>();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "py-1.5 pl-1 pr-8 text-sm font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">\n      <UiListboxItemIndicator :icon="icon" />\n    </span>\n  </ListboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { ListboxItemEmits, ListboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ListboxItemProps & {\n      class?: any;\n      icon?: string;\n    }\n  >();\n  const emits = defineEmits<ListboxItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emits);\n\n  const styles = tv({\n    base: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:ring-1 data-[highlighted]:ring-border",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxItemIndicator v-bind="forwarded">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:circle-check\'" />\n    </slot>\n  </ListboxItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxItemIndicator, useForwardPropsEmits } from "radix-vue";\n  import type { ListboxItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<ListboxItemIndicatorProps & { class?: any; icon?: string }>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "size-5 shrink-0",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Listbox.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxRoot v-slot="{ modelValue }" v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot :model-value="modelValue" />\n  </ListboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ListboxRootEmits, ListboxRootProps } from "radix-vue";\n\n  const props = defineProps<ListboxRootProps & { class?: any }>();\n  const emits = defineEmits<ListboxRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex flex-col gap-4",\n  });\n</script>\n',
      },
      {
        fileName: "Listbox/Virtualizer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ListboxVirtualizer\n    v-slot="{ option }"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :option="option" />\n  </ListboxVirtualizer>\n</template>\n\n<script lang="ts" setup>\n  import { ListboxVirtualizer, useForwardProps } from "radix-vue";\n  import type { ListboxVirtualizerProps } from "radix-vue";\n\n  const props = defineProps<ListboxVirtualizerProps & { class?: any }>();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "",\n  });\n</script>\n',
      },
    ],
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarArrow v-bind="props" />\n</template>\n\n<script lang="ts" setup>\n  import { MenubarArrow } from "radix-vue";\n  import type { MenubarArrowProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<MenubarArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/CheckboxItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiMenubarItemIndicator>\n        <Icon :name="icon || \'lucide:check\'" class="h-4 w-4" />\n      </UiMenubarItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n    <slot name="shortcut">\n      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>\n    </slot>\n  </MenubarCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarCheckboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarCheckboxItemProps & {\n      icon?: string;\n      class?: any;\n      title?: string;\n      shortcut?: string;\n    }\n  >();\n  const emits = defineEmits<MenubarCheckboxItemEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "class", "title", "shortcut"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot />\n    </MenubarContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarContent, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarContentProps, MenubarSubContentEmits } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      MenubarContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      side: "bottom",\n      sideOffset: 8,\n      align: "start",\n      alignOffset: -4,\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarGroup v-bind="props">\n    <slot />\n  </MenubarGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarGroup } from "radix-vue";\n  import type { MenubarGroupProps } from "radix-vue";\n\n  const props = defineProps<MenubarGroupProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarItem v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <slot name="icon">\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      </slot>\n      <slot name="title">\n        <span v-if="title">{{ title }}</span>\n      </slot>\n    </slot>\n    <slot name="shortcut">\n      <UiMenubarShortcut v-if="shortcut">{{ shortcut }}</UiMenubarShortcut>\n    </slot>\n  </MenubarItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarItem, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarItemEmits, MenubarItemProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarItemProps & {\n      inset?: boolean;\n      class?: any;\n      shortcut?: string;\n      title?: string;\n      icon?: string;\n    }\n  >();\n\n  const emits = defineEmits<MenubarItemEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),\n    emits\n  );\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n  </MenubarItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarItemIndicator } from "radix-vue";\n  import type { MenubarItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n      /** The class(es) to apply to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex shrink-0 items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarLabel :class="styles({ inset, class: props.class })" v-bind="forwarded">\n    <slot />\n  </MenubarLabel>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarLabel } from "radix-vue";\n  import type { MenubarLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarLabelProps & {\n      class?: any;\n      inset?: boolean;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset");\n  const styles = tv({\n    base: "px-2 py-1.5 text-sm font-semibold",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Menu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarMenu v-bind="props">\n    <slot />\n  </MenubarMenu>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarMenu } from "radix-vue";\n  import type { MenubarMenuProps } from "radix-vue";\n\n  const props = defineProps<MenubarMenuProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/Menubar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </MenubarRoot>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRoot, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarRootEmits, MenubarRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      MenubarRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<MenubarRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "inline-flex h-10 items-center space-x-1 rounded-md border bg-background p-1",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarPortal v-bind="props">\n    <slot />\n  </MenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import type { MenubarPortalProps } from "radix-vue";\n\n  const props = defineProps<MenubarPortalProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarRadioGroup v-bind="forwarded">\n    <slot />\n  </MenubarRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRadioGroup, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from "radix-vue";\n\n  const props = defineProps<MenubarRadioGroupProps>();\n  const emits = defineEmits<MenubarRadioGroupEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Menubar/RadioItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarRadioItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiMenubarItemIndicator>\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />\n      </UiMenubarItemIndicator>\n    </span>\n    <slot>{{ title }}</slot>\n  </MenubarRadioItem>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRadioItem, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarRadioItemEmits, MenubarRadioItemProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarRadioItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The icon to display */\n      icon?: string;\n      /** The title of the component */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<MenubarRadioItemEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarSeparator :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSeparator } from "radix-vue";\n  import type { MenubarSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    { as: "span" }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest opacity-60",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarSub v-bind="forwarded">\n    <slot />\n  </MenubarSub>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSub, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarSubEmits, MenubarSubProps } from "radix-vue";\n\n  const props = defineProps<MenubarSubProps>();\n  const emits = defineEmits<MenubarSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Menubar/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarSubContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot />\n    </MenubarSubContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubContent, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarSubContentEmits, MenubarSubContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      MenubarSubContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The target element to portal the component to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      loop: true,\n      sideOffset: 5,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarSubTrigger v-bind="forwarded" :class="styles({ inset, class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon\n      class="ml-auto h-4 w-4 text-muted-foreground"\n      :name="trailingIcon || \'lucide:chevron-right\'"\n    />\n  </MenubarSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubTrigger } from "radix-vue";\n  import type { MenubarSubTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarSubTriggerProps & {\n      class?: any;\n      inset?: boolean;\n      icon?: string;\n      title?: string;\n      trailingIcon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "inset", "icon", "title", "trailingIcon");\n  const styles = tv({\n    base: "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarTrigger :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </MenubarTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarTrigger } from "radix-vue";\n  import type { MenubarTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Native Select",
    value: "native-select",
    devDeps: ["@vueuse/core"],
    files: [
      {
        fileName: "NativeSelect.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="relative">\n    <select\n      :id="id"\n      ref="select"\n      v-model="localModel"\n      :multiple="multiple"\n      :name="name"\n      :size="size"\n      :placeholder="placeholder"\n      :disabled="disabled"\n      :required="required"\n      :class="styles({ class: props.class })"\n    >\n      <slot />\n    </select>\n    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center justify-center">\n      <slot name="trailingIcon">\n        <Icon\n          :name="trailingIcon || \'lucide:chevrons-up-down\'"\n          class="h-4 w-4 text-muted-foreground"\n        />\n      </slot>\n    </span>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n    id?: string;\n    name?: string;\n    placeholder?: string;\n    disabled?: boolean;\n    required?: boolean;\n    modelValue?: any;\n    multiple?: boolean;\n    size?: number;\n    autofocus?: boolean;\n    trailingIcon?: string;\n  }>();\n  const styles = tv({\n    base: "h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n\n  const select = ref<HTMLSelectElement | null>(null);\n  const emits = defineEmits<{\n    "update:modelValue": [value: any];\n  }>();\n\n  const localModel = useVModel(props, "modelValue", emits);\n\n  onMounted(() => {\n    if (props.autofocus) {\n      select.value?.focus();\n    }\n  });\n</script>\n',
      },
    ],
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ sticky, class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** Whether the navbar should be sticky */\n        sticky?: boolean;\n      }\n    >(),\n    {\n      as: "header",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "sticky");\n\n  const styles = tv({\n    base: "z-20 border-b bg-background/90 backdrop-blur",\n    variants: {\n      sticky: {\n        true: "sticky top-0",\n      },\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </NavigationMenuContent>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuContent, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuContentEmits, NavigationMenuContentProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuContentProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<NavigationMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />\n  </NavigationMenuIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuIndicator } from "radix-vue";\n  import type { NavigationMenuIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuItem v-bind="props">\n    <slot />\n  </NavigationMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuItem } from "radix-vue";\n  import type { NavigationMenuItemProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuItemProps>();\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Link.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuLink v-bind="forwarded">\n    <slot />\n  </NavigationMenuLink>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuLink, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuLinkProps>();\n  const emits = defineEmits<NavigationMenuLinkEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "NavigationMenu/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuList v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </NavigationMenuList>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuList } from "radix-vue";\n  import type { NavigationMenuListProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "group flex flex-1 list-none items-center justify-center space-x-1",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/NavigationMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuRoot :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n    <slot name="viewport">\n      <UiNavigationMenuViewport />\n    </slot>\n  </NavigationMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuRoot, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuRootProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const emits = defineEmits<NavigationMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex max-w-max flex-1 items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuSub v-bind="forwarded">\n    <slot />\n  </NavigationMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuSub, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuSubEmits, NavigationMenuSubProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuSubProps>();\n  const emits = defineEmits<NavigationMenuSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuTrigger v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n    <slot name="icon">\n      <Icon\n        :name="icon || \'lucide:chevron-down\'"\n        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"\n        aria-hidden="true"\n      />\n    </slot>\n  </NavigationMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuTrigger } from "radix-vue";\n  import type { NavigationMenuTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n      /** Title to show */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon", "title");\n  const styles = tv({\n    base: "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="absolute left-0 top-full flex justify-center">\n    <NavigationMenuViewport\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuViewport } from "radix-vue";\n  import type { NavigationMenuViewportProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    NavigationMenuViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NumberFieldDecrement v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon :name="props.icon" />\n    </slot>\n  </NumberFieldDecrement>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldDecrement, useForwardProps } from "radix-vue";\n  import type { NumberFieldDecrementProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldDecrementProps & {\n        class?: any;\n        icon?: string;\n      }\n    >(),\n    { icon: "lucide:minus" }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/Increment.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NumberFieldIncrement v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon :name="props.icon" />\n    </slot>\n  </NumberFieldIncrement>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldIncrement, useForwardProps } from "radix-vue";\n  import type { NumberFieldIncrementProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldIncrementProps & {\n        class?: any;\n        icon?: string;\n      }\n    >(),\n    { icon: "lucide:plus" }\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "flex h-full shrink-0 items-center justify-center bg-transparent p-3 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NumberFieldInput v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldInput, useForwardProps } from "radix-vue";\n  import type { NumberFieldInputProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldInputProps & {\n        class?: any;\n      }\n    >(),\n    {}\n  );\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "h-full w-full grow bg-transparent text-center text-base placeholder:text-muted-foreground/80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "NumberField/NumberField.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NumberFieldRoot\n    v-slot="rootSlotProps"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot v-bind="rootSlotProps">\n      <slot name="decrement">\n        <UiNumberFieldDecrement />\n      </slot>\n      <slot name="input">\n        <UiNumberFieldInput />\n      </slot>\n      <slot name="increment">\n        <UiNumberFieldIncrement />\n      </slot>\n    </slot>\n  </NumberFieldRoot>\n</template>\n\n<script lang="ts" setup>\n  import { NumberFieldRoot, useForwardPropsEmits } from "radix-vue";\n  import type { NumberFieldRootEmits, NumberFieldRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      NumberFieldRootProps & {\n        class?: any;\n      }\n    >(),\n    {}\n  );\n\n  const emit = defineEmits<NumberFieldRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "flex h-10 w-full items-center gap-1 rounded-md border border-input bg-background text-base focus-within:border-input focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationEllipsis v-bind="forwarded">\n    <slot>\n      <div v-if="icon" class="inline-flex h-9 w-9 items-center justify-center hover:bg-transparent">\n        <Icon :name="icon" />\n      </div>\n    </slot>\n  </PaginationEllipsis>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationEllipsis } from "radix-vue";\n  import type { PaginationEllipsisProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationEllipsisProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/First.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationFirst v-bind="forwarded">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationFirst>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationFirst } from "radix-vue";\n  import type { PaginationFirstProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationFirstProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationListItem v-bind="props">\n    <slot>\n      <UiButton\n        variant="outline"\n        size="icon-sm"\n        class="data-[selected=true]:border-transparent data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"\n      >\n        {{ value }}\n      </UiButton>\n    </slot>\n  </PaginationListItem>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationListItem } from "radix-vue";\n  import type { PaginationListItemProps } from "radix-vue";\n\n  const props = defineProps<PaginationListItemProps>();\n</script>\n',
      },
      {
        fileName: "Pagination/Last.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationLast v-bind="forwarded">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationLast>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationLast } from "radix-vue";\n  import type { PaginationLastProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationLastProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Pagination/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationList v-slot="{ items }" :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot :items="items" />\n  </PaginationList>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationList } from "radix-vue";\n  import type { PaginationListProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex items-center gap-1",\n  });\n</script>\n',
      },
      {
        fileName: "Pagination/Next.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationNext v-bind="props">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationNext>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationNext } from "radix-vue";\n  import type { PaginationNextProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationNextProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Pagination/Pagination.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationRoot v-bind="forwarded">\n    <slot>\n      <UiPaginationList v-slot="{ items }">\n        <slot name="first"><UiPaginationFirst as-child :icon="firstIcon" /> </slot>\n        <slot name="prev"><UiPaginationPrev as-child :icon="prevIcon" /> </slot>\n\n        <template v-for="(page, index) in items" :key="index">\n          <UiPaginationItem v-if="page.type === \'page\'" as-child v-bind="page" />\n          <UiPaginationEllipsis\n            v-else-if="page.type === \'ellipsis\'"\n            as-child\n            v-bind="page"\n            :icon="ellipsisIcon"\n          />\n        </template>\n        <slot name="next"><UiPaginationNext as-child :icon="nextIcon" /> </slot>\n        <slot name="last"><UiPaginationLast as-child :icon="lastIcon" /></slot>\n      </UiPaginationList>\n    </slot>\n  </PaginationRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationRoot, useForwardPropsEmits } from "radix-vue";\n  import type { PaginationRootEmits, PaginationRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationRootProps & {\n        ellipsisIcon?: string;\n        firstIcon?: string;\n        lastIcon?: string;\n        nextIcon?: string;\n        prevIcon?: string;\n      }\n    >(),\n    {\n      defaultPage: 1,\n      total: 10,\n      itemsPerPage: 10,\n      siblingCount: 3,\n      showEdges: true,\n      ellipsisIcon: "lucide:more-horizontal",\n      firstIcon: "lucide:chevrons-left",\n      lastIcon: "lucide:chevrons-right",\n      nextIcon: "lucide:chevron-right",\n      prevIcon: "lucide:chevron-left",\n    }\n  );\n\n  const emits = defineEmits<PaginationRootEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "ellipsisIcon", "firstIcon", "lastIcon", "nextIcon", "prevIcon"),\n    emits\n  );\n</script>\n',
      },
      {
        fileName: "Pagination/Prev.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationPrev v-bind="forwarded">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationPrev>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationPrev } from "radix-vue";\n  import type { PaginationPrevProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationPrevProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
    ],
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PinInputRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <template v-for="(input, k) in inputCount" :key="k">\n        <UiPinInputInput :index="k" />\n        <template v-if="k < inputCount - 1">\n          <span v-if="separator" class="text-muted-foreground">{{ separator }}</span>\n        </template>\n      </template>\n    </slot>\n  </PinInputRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PinInputRoot, useForwardPropsEmits } from "radix-vue";\n  import type { PinInputRootEmits, PinInputRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PinInputRootProps & {\n        /** Custom class(es) to apply to the parent element. */\n        class?: any;\n        /** The number of inputs to render.  @default 4 */\n        inputCount?: number;\n        /** The separator to render between inputs.  @default undefined */\n        separator?: string;\n      }\n    >(),\n    {\n      inputCount: 4,\n    }\n  );\n\n  const emits = defineEmits<PinInputRootEmits>();\n\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "class", "inputCount", "separator"),\n    emits\n  );\n  const styles = tv({\n    base: "flex items-center gap-2",\n  });\n</script>\n',
      },
      {
        fileName: "PinInput/PinInputInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PinInputInput v-bind="forwarded" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { PinInputInput } from "radix-vue";\n  import type { PinInputInputProps } from "radix-vue";\n\n  const props = defineProps<\n    PinInputInputProps & {\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "h-10 w-10 rounded-md border border-input bg-background p-1 text-center text-base font-medium placeholder:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverAnchor v-bind="forwarded">\n    <slot />\n  </PopoverAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverAnchor, useForwardProps } from "radix-vue";\n  import type { PopoverAnchorProps } from "radix-vue";\n\n  const props = defineProps<PopoverAnchorProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverArrow v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { PopoverArrow, useForwardProps } from "radix-vue";\n  import type { PopoverArrowProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<PopoverArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverClose v-bind="forwarded">\n    <slot />\n  </PopoverClose>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverClose, useForwardProps } from "radix-vue";\n  import type { PopoverCloseProps } from "radix-vue";\n\n  const props = defineProps<PopoverCloseProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiPopoverPortal :to="to">\n    <PopoverContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot />\n    </PopoverContent>\n  </UiPopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverContent, useForwardPropsEmits } from "radix-vue";\n  import type { PopoverContentEmits, PopoverContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      PopoverContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 8,\n      align: "start",\n      avoidCollisions: true,\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<PopoverContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "to", "class"), emits);\n\n  const styles = tv({\n    base: "z-50 w-72 rounded-md border bg-popover p-4 text-accent-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Popover/Popover.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverRoot v-bind="forwarded">\n    <slot />\n  </PopoverRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverRoot, useForwardPropsEmits } from "radix-vue";\n  import type { PopoverRootEmits, PopoverRootProps } from "radix-vue";\n\n  const props = defineProps<PopoverRootProps>();\n  const emits = defineEmits<PopoverRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Popover/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverPortal v-bind="forwarded">\n    <slot />\n  </PopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverPortal, useForwardProps } from "radix-vue";\n  import type { PopoverPortalProps } from "radix-vue";\n\n  const props = defineProps<PopoverPortalProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverTrigger v-bind="props">\n    <slot />\n  </PopoverTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverTrigger } from "radix-vue";\n  import type { PopoverTriggerProps } from "radix-vue";\n\n  const props = defineProps<PopoverTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Popover/X.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverClose v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon :name="icon" class="h-4 w-4" />\n      <span class="sr-only">{{ srText }}</span>\n    </slot>\n  </PopoverClose>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverClose, useForwardProps } from "radix-vue";\n  import type { PopoverCloseProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PopoverCloseProps & {\n        class?: any;\n        icon?: string;\n        srText?: string;\n      }\n    >(),\n    {\n      icon: "heroicons:x-mark",\n      srText: "Close",\n    }\n  );\n  const forwarded = useForwardProps(reactiveOmit(props, "icon", "srText", "class"));\n\n  const styles = tv({\n    base: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ProgressIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ProgressIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ProgressIndicator } from "radix-vue";\n  import type { ProgressIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ProgressIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",\n  });\n</script>\n',
      },
      {
        fileName: "Progress/Progress.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ProgressRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <UiProgressIndicator :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }" />\n    </slot>\n  </ProgressRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ProgressRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ProgressRootEmits, ProgressRootProps } from "radix-vue";\n\n  const props = defineProps<\n    ProgressRootProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<ProgressRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative h-3 w-full overflow-hidden rounded-full bg-secondary",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupIndicator v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon :name="icon || \'ph:circle-fill\'" class="h-2.5 w-2.5 fill-current text-current" />\n    </slot>\n  </RadioGroupIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupIndicator } from "radix-vue";\n  import type { RadioGroupIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <UiRadioGroupIndicator :icon="props.icon" />\n    </slot>\n  </RadioGroupItem>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupItem } from "radix-vue";\n  import type { RadioGroupItemProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupItemProps & {\n      /** Class to apply to the item */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </RadioGroupRoot>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupRoot, useForwardPropsEmits } from "radix-vue";\n  import type { RadioGroupRootEmits, RadioGroupRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      RadioGroupRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<RadioGroupRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({ base: "grid gap-3" });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaCorner v-bind="props">\n    <slot />\n  </ScrollAreaCorner>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaCorner } from "radix-vue";\n  import type { ScrollAreaCornerProps } from "radix-vue";\n\n  const props = defineProps<ScrollAreaCornerProps>();\n</script>\n',
      },
      {
        fileName: "ScrollArea/ScrollArea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <UiScrollAreaViewport>\n      <slot />\n    </UiScrollAreaViewport>\n    <UiScrollAreaScrollbar :orientation="orientation" />\n    <UiScrollAreaCorner />\n  </ScrollAreaRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaRoot } from "radix-vue";\n  import type { ScrollAreaRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaRootProps & {\n        /** Orientation for scrolling */\n        orientation?: "vertical" | "horizontal";\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative overflow-hidden",\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Scrollbar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaScrollbar v-bind="forwarded" :class="styles({ orientation, class: props.class })">\n    <slot />\n    <UiScrollAreaThumb />\n  </ScrollAreaScrollbar>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaScrollbar } from "radix-vue";\n  import type { ScrollAreaScrollbarProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaScrollbarProps & {\n        /** Class to apply to the scrollbar */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex touch-none select-none transition-colors",\n    variants: {\n      orientation: {\n        vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",\n        horizontal: "h-2.5 border-t border-t-transparent p-[1px]",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Thumb.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaThumb v-bind="forwarded" :class="styles({ orientation, class: props.class })">\n    <slot />\n  </ScrollAreaThumb>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaThumb } from "radix-vue";\n  import type { ScrollAreaThumbProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaThumbProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        orientation?: "vertical" | "horizontal";\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative flex-1 rounded-full bg-border",\n    variants: {\n      orientation: {\n        vertical: "flex-1",\n        horizontal: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaViewport v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </ScrollAreaViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaViewport } from "radix-vue";\n  import type { ScrollAreaViewportProps } from "radix-vue";\n\n  const props = defineProps<\n    ScrollAreaViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "h-full w-full rounded-[inherit]",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Select",
    value: "select",
    files: [
      {
        fileName: "Select/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectArrow v-bind="useForwardProps(props)" />\n</template>\n\n<script lang="ts" setup>\n  import { SelectArrow, useForwardProps } from "radix-vue";\n  import type { SelectArrowProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<SelectArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n</script>\n',
      },
      {
        fileName: "Select/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiSelectPortal :to="to">\n    <SelectContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ position, class: props.class })"\n    >\n      <UiSelectScrollUpButton />\n      <UiSelectViewport :position="position">\n        <slot />\n      </UiSelectViewport>\n      <UiSelectScrollDownButton />\n    </SelectContent>\n  </UiSelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectContent, useForwardPropsEmits } from "radix-vue";\n  import type { SelectContentEmits, SelectContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      SelectContentProps & {\n        /** Where to render the portal */\n        to?: string | HTMLElement;\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      position: "popper",\n      side: "bottom",\n      align: "start",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<SelectContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n    variants: {\n      position: {\n        popper:\n          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Select/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectGroup v-bind="forwarded">\n    <slot />\n  </SelectGroup>\n</template>\n\n<script lang="ts" setup>\n  import { SelectGroup, useForwardProps } from "radix-vue";\n  import type { SelectGroupProps } from "radix-vue";\n\n  const props = defineProps<SelectGroupProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Select/Icon.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectIcon v-bind="forwarded" class="flex items-center justify-center">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:chevrons-up-down\'" />\n    </slot>\n  </SelectIcon>\n</template>\n\n<script lang="ts" setup>\n  import { SelectIcon, useForwardProps } from "radix-vue";\n  import type { SelectIconProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectIconProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "h-4 w-4 shrink-0 text-muted-foreground opacity-70",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\n      <UiSelectItemIndicator :icon="icon" />\n    </span>\n    <UiSelectItemText>\n      <slot>{{ text }}</slot>\n    </UiSelectItemText>\n  </SelectItem>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItem } from "radix-vue";\n  import type { SelectItemProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n      /** Text to show */\n      text?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon", "text");\n  const styles = tv({\n    base: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItemIndicator v-bind="forwarded" class="flex items-center justify-center">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:check\'" />\n    </slot>\n  </SelectItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemIndicator } from "radix-vue";\n  import type { SelectItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectItemIndicatorProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "h-4 w-4",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemText.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItemText v-bind="props">\n    <slot />\n  </SelectItemText>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemText } from "radix-vue";\n  import type { SelectItemTextProps } from "radix-vue";\n\n  const props = defineProps<SelectItemTextProps>();\n</script>\n',
      },
      {
        fileName: "Select/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectLabel :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SelectLabel>\n</template>\n\n<script lang="ts" setup>\n  import { SelectLabel } from "radix-vue";\n  import type { SelectLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectLabelProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "py-1.5 pl-8 pr-2 text-sm font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectPortal v-bind="props">\n    <slot />\n  </SelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectPortal } from "radix-vue";\n  import type { SelectPortalProps } from "radix-vue";\n\n  const props = defineProps<SelectPortalProps>();\n</script>\n',
      },
      {
        fileName: "Select/ScrollDownButton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectScrollDownButton v-bind="forwarded">\n    <slot> <Icon :name="icon || \'lucide:chevron-down\'" class="h-5 w-5" /></slot>\n  </SelectScrollDownButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollDownButton } from "radix-vue";\n  import type { SelectScrollDownButtonProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectScrollDownButtonProps & {\n      /** Icon to render */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Select/ScrollUpButton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectScrollUpButton v-bind="forwarded">\n    <slot>\n      <Icon :name="icon || \'lucide:chevron-up\'" class="h-5 w-5" />\n    </slot>\n  </SelectScrollUpButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollUpButton } from "radix-vue";\n  import type { SelectScrollUpButtonProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectScrollUpButtonProps & {\n      /** Icon to render */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "icon");\n</script>\n',
      },
      {
        fileName: "Select/Select.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectRoot v-bind="forwarded">\n    <slot />\n  </SelectRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SelectRoot, useForwardPropsEmits } from "radix-vue";\n  import type { SelectRootEmits, SelectRootProps } from "radix-vue";\n\n  const props = defineProps<SelectRootProps>();\n\n  const emits = defineEmits<SelectRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Select/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectSeparator :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { SelectSeparator } from "radix-vue";\n  import type { SelectSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectTrigger :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      <UiSelectValue :placeholder="placeholder" />\n    </slot>\n    <UiSelectIcon :icon="icon" />\n  </SelectTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { SelectTrigger } from "radix-vue";\n  import type { SelectTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to render */\n      icon?: string;\n      /** Placeholder text */\n      placeholder?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon", "placeholder");\n  const styles = tv({\n    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Value.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectValue v-bind="props">\n    <slot />\n  </SelectValue>\n</template>\n\n<script lang="ts" setup>\n  import { SelectValue } from "radix-vue";\n  import type { SelectValueProps } from "radix-vue";\n\n  const props = defineProps<SelectValueProps>();\n</script>\n',
      },
      {
        fileName: "Select/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectViewport :class="styles({ position, class: props.class })" v-bind="forwarded">\n    <slot />\n  </SelectViewport>\n</template>\n\n<script lang="ts" setup>\n  import { SelectViewport } from "radix-vue";\n  import type { SelectViewportProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectViewportProps & {\n      position?: "item-aligned" | "popper";\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "p-1",\n    variants: {\n      position: {\n        popper:\n          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Separator v-bind="forwarded" :class="styles({ orientation, class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { Separator, useForwardProps } from "radix-vue";\n  import type { SeparatorProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<SeparatorProps & { class?: any }>(), {\n    orientation: "horizontal",\n  });\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "shrink-0 bg-border",\n    variants: {\n      orientation: {\n        horizontal: "h-[1px] w-full",\n        vertical: "h-full w-[1px]",\n      },\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose v-bind="props">\n    <slot />\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiSheetPortal :to="to">\n    <slot name="overlay">\n      <UiSheetOverlay />\n    </slot>\n    <DialogContent\n      :class="styles({ side, class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot>\n        <slot name="header">\n          <UiSheetHeader>\n            <slot name="title">\n              <UiSheetTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiSheetDescription v-if="description" :description="description" />\n            </slot>\n          </UiSheetHeader>\n        </slot>\n        <slot name="content" />\n        <slot name="footer" />\n      </slot>\n      <slot name="close">\n        <UiSheetClose :icon="icon" />\n      </slot>\n    </DialogContent>\n  </UiSheetPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { DialogContentEmits, DialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    DialogContentProps & {\n      icon?: string;\n      title?: string;\n      description?: string;\n      class?: any;\n      side?: VariantProps<typeof styles>["side"];\n      to?: string | HTMLElement;\n    }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "to", "side"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",\n    variants: {\n      side: {\n        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",\n        bottom:\n          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",\n        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",\n        right:\n          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",\n      },\n    },\n    defaultVariants: {\n      side: "left",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogDescription :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "radix-vue";\n  import type { DialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n      /** Description text */\n      description?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "description");\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex flex-col space-y-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogOverlay :class="styles({ class: props.class })" v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "radix-vue";\n  import type { DialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogOverlayProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogPortal v-bind="props">\n    <slot />\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal } from "radix-vue";\n  import type { DialogPortalProps } from "radix-vue";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Sheet.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogRoot v-bind="forwarded">\n    <slot />\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "radix-vue";\n  import type { DialogRootEmits, DialogRootProps } from "radix-vue";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Sheet/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTitle :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "radix-vue";\n  import type { DialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n      /** Title text */\n      title?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "text-lg font-semibold text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTrigger v-bind="props">\n    <slot />\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger } from "radix-vue";\n  import type { DialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/X.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      <Icon :name="icon" class="h-4 w-4" />\n      <span class="sr-only">{{ srText }}</span>\n    </slot>\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      DialogCloseProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Icon to display */\n        icon?: string;\n        /** Screen reader text */\n        srText?: string;\n      }\n    >(),\n    {\n      icon: "heroicons:x-mark",\n      srText: "Close",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon", "srText");\n  const styles = tv({\n    base: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Skeleton",
    value: "skeleton",
    files: [
      {
        fileName: "Skeleton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ loading, class: props.class })" v-bind="forwarded">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const styles = tv({\n    base: "animate-pulse rounded-md bg-muted",\n    variants: {\n      loading: { true: "cursor-wait", false: "cursor-default" },\n    },\n  });\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Whether the skeleton is loading */\n        loading?: boolean;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const forwarded = reactiveOmit(props, "class", "loading");\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderRange :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderRange>\n</template>\n\n<script lang="ts" setup>\n  import { SliderRange } from "radix-vue";\n  import type { SliderRangeProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderRangeProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "absolute h-full bg-primary",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Slider.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot :props="props">\n      <slot name="track" :props="props">\n        <UiSliderTrack>\n          <slot name="range" :props="props">\n            <UiSliderRange />\n          </slot>\n        </UiSliderTrack>\n      </slot>\n      <slot name="thumb" :props="props">\n        <UiSliderThumb v-for="(t, i) in modelValue.length" :key="i" />\n      </slot>\n    </slot>\n  </SliderRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SliderRoot, useForwardPropsEmits } from "radix-vue";\n  import type { SliderRootEmits, SliderRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SliderRootProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "horizontal",\n      min: 0,\n      step: 1,\n      max: 100,\n      modelValue: () => [0],\n    }\n  );\n\n  const emits = defineEmits<SliderRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex w-full touch-none select-none items-center",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Thumb.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderThumb :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SliderThumb } from "radix-vue";\n  import type { SliderThumbProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Track.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderTrack :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SliderTrack>\n</template>\n\n<script lang="ts" setup>\n  import { SliderTrack } from "radix-vue";\n  import type { SliderTrackProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderTrackProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SplitterGroup\n    v-slot="{ layout }: { layout: number[] }"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :layout="layout" />\n  </SplitterGroup>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterGroup, useForwardPropsEmits } from "radix-vue";\n  import type { SplitterGroupEmits, SplitterGroupProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SplitterGroupProps & {\n        direction?: "horizontal" | "vertical";\n        class?: any;\n      }\n    >(),\n    {\n      direction: "horizontal",\n      as: "div",\n      keyboardResizeBy: 10,\n    }\n  );\n\n  const emit = defineEmits<SplitterGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "flex h-full w-full data-[orientation=vertical]:flex-col",\n  });\n</script>\n',
      },
      {
        fileName: "Splitter/Panel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SplitterPanel\n    v-bind="forwarded"\n    ref="forwardRef"\n    v-slot="{ isCollapsed, isExpanded }: { isCollapsed: boolean; isExpanded: boolean }"\n  >\n    <slot :is-collapsed="isCollapsed" :is-expanded="isExpanded" />\n  </SplitterPanel>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterPanel, useForwardPropsEmits } from "radix-vue";\n  import type { SplitterPanelEmits, SplitterPanelProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<SplitterPanelProps>(), {});\n\n  const forwardRef = ref<InstanceType<typeof SplitterPanel>>();\n  const emit = defineEmits<\n    SplitterPanelEmits & {\n      ready: [value: InstanceType<typeof SplitterPanel>];\n    }\n  >();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n\n  onMounted(async () => {\n    await nextTick();\n    emit("ready", forwardRef.value!);\n  });\n</script>\n',
      },
      {
        fileName: "Splitter/Handle.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SplitterResizeHandle v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <div\n        v-if="withHandle"\n        class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"\n      >\n        <Icon :name="icon" class="h-2.5 w-2.5" />\n      </div>\n    </slot>\n  </SplitterResizeHandle>\n</template>\n\n<script lang="ts" setup>\n  import { SplitterResizeHandle, useForwardPropsEmits } from "radix-vue";\n  import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SplitterResizeHandleProps & {\n        direction?: "horizontal" | "vertical";\n        class?: any;\n        withHandle?: boolean;\n        icon?: string;\n      }\n    >(),\n    {\n      direction: "horizontal",\n      icon: "lucide:grip-vertical",\n    }\n  );\n\n  const emit = defineEmits<SplitterResizeHandleEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "withHandle", "icon"), emit);\n\n  const styles = tv({\n    base: "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperDescription v-slot="slotProps" v-bind="props">\n    <slot v-bind="slotProps" />\n  </StepperDescription>\n</template>\n\n<script lang="ts" setup>\n  import { StepperDescription } from "radix-vue";\n  import type { StepperDescriptionProps } from "radix-vue";\n\n  const props = defineProps<StepperDescriptionProps>();\n</script>\n',
      },
      {
        fileName: "Stepper/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperIndicator v-bind="props">\n    <slot />\n  </StepperIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { StepperIndicator } from "radix-vue";\n  import type { StepperIndicatorProps } from "radix-vue";\n\n  const props = defineProps<StepperIndicatorProps>();\n</script>\n',
      },
      {
        fileName: "Stepper/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperItem v-slot="slotProps" v-bind="props">\n    <slot v-bind="slotProps" />\n  </StepperItem>\n</template>\n\n<script lang="ts" setup>\n  import { StepperItem } from "radix-vue";\n  import type { StepperItemProps } from "radix-vue";\n\n  const props = defineProps<StepperItemProps>();\n</script>\n',
      },
      {
        fileName: "Stepper/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperSeparator v-bind="props">\n    <slot />\n  </StepperSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { StepperSeparator } from "radix-vue";\n  import type { StepperSeparatorProps } from "radix-vue";\n\n  const props = defineProps<StepperSeparatorProps>();\n</script>\n',
      },
      {
        fileName: "Stepper/Stepper.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperRoot v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </StepperRoot>\n</template>\n\n<script lang="ts" setup>\n  import { StepperRoot, useForwardPropsEmits } from "radix-vue";\n  import type { StepperRootEmits, StepperRootProps } from "radix-vue";\n\n  const props = defineProps<StepperRootProps>();\n  const emit = defineEmits<StepperRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Stepper/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperTitle v-bind="props">\n    <slot />\n  </StepperTitle>\n</template>\n\n<script lang="ts" setup>\n  import { StepperTitle } from "radix-vue";\n  import type { StepperTitleProps } from "radix-vue";\n\n  const props = defineProps<StepperTitleProps>();\n</script>\n',
      },
      {
        fileName: "Stepper/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <StepperTrigger v-bind="props">\n    <slot />\n  </StepperTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { StepperTrigger } from "radix-vue";\n  import type { StepperTriggerProps } from "radix-vue";\n\n  const props = defineProps<StepperTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SwitchRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <UiSwitchThumb>\n      <slot />\n    </UiSwitchThumb>\n  </SwitchRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchRoot, useForwardPropsEmits } from "radix-vue";\n  import type { SwitchRootEmits, SwitchRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SwitchRootProps & {\n        class?: any;\n        id?: any;\n      }\n    >(),\n    {\n      as: "button",\n    }\n  );\n  const emits = defineEmits<SwitchRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",\n  });\n</script>\n',
      },
      {
        fileName: "Switch/Thumb.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SwitchThumb :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </SwitchThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchThumb } from "radix-vue";\n  import type { SwitchThumbProps } from "radix-vue";\n\n  const props = defineProps<\n    SwitchThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tbody :class="styles({ class: props.class })">\n    <slot />\n  </tbody>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "[&_tr:last-child]:border-0",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Caption.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <caption :class="styles({ class: props.class })">\n    <slot />\n  </caption>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "mt-4 text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Cell.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <td :class="styles({ class: props.class })">\n    <slot />\n  </td>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "whitespace-nowrap p-4 align-middle",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Empty.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiTableRow>\n    <UiTableCell :colspan="colspan" :class="styles({ class: props.class })">\n      <slot />\n    </UiTableCell>\n  </UiTableRow>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      colspan?: number;\n      class?: any;\n    }>(),\n    {\n      colspan: 1,\n    }\n  );\n\n  const styles = tv({\n    base: "whitespace-nowrap p-4 align-middle text-sm text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tfoot :class="styles({ class: props.class })">\n    <slot />\n  </tfoot>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "bg-primary font-medium text-primary-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Head.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <th :class="styles({ class: props.class })">\n    <slot />\n  </th>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "h-12 px-4 text-left align-middle font-medium text-muted-foreground hover:text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <thead :class="styles({ class: props.class })">\n    <slot />\n  </thead>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "[&_tr]:border-b",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Row.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tr :class="styles({ class: props.class })">\n    <slot />\n  </tr>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Table.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <table :class="styles({ class: props.class })">\n    <slot />\n  </table>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "w-full caption-bottom border-collapse text-sm",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TabsContent>\n</template>\n\n<script lang="ts" setup>\n  import { TabsContent } from "radix-vue";\n  import type { TabsContentProps } from "radix-vue";\n\n  const props = defineProps<\n    TabsContentProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ClientOnly>\n    <TabsIndicator v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot>\n        <div class="h-full w-full rounded-md bg-primary" />\n      </slot>\n    </TabsIndicator>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import { TabsIndicator } from "radix-vue";\n  import type { TabsIndicatorProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    TabsIndicatorProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "absolute bottom-0 left-0 h-[3px] w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full px-1 transition-[width,transform] duration-300",\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsList :class="styles({ pill, class: props.class })" v-bind="forwarded">\n    <slot />\n  </TabsList>\n</template>\n\n<script lang="ts" setup>\n  import { TabsList } from "radix-vue";\n  import type { TabsListProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsListProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        pill?: boolean;\n      }\n    >(),\n    { pill: true }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground",\n    variants: {\n      pill: {\n        true: "bg-muted",\n        false: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Tabs.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsRoot v-bind="forwarded">\n    <slot />\n  </TabsRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TabsRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TabsRootEmits, TabsRootProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<TabsRootProps>(), {\n    orientation: "horizontal",\n    activationMode: "automatic",\n  });\n  const emits = defineEmits<TabsRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Tabs/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsTrigger v-bind="forwarded" :class="styles({ pill, class: props.class })">\n    <slot />\n  </TabsTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TabsTrigger } from "radix-vue";\n  import type { TabsTriggerProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsTriggerProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Whether the trigger should be pill-shaped */\n        pill?: boolean;\n      }\n    >(),\n    {\n      pill: true,\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",\n    variants: {\n      pill: {\n        true: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",\n        false:\n          "data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",\n      },\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputClear v-bind="props" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />\n    </slot>\n  </TagsInputClear>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputClear } from "radix-vue";\n  import type { TagsInputClearProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<TagsInputClearProps & { icon?: string; class?: any }>(), {\n    icon: "lucide:x",\n  });\n  const styles = tv({\n    base: "flex items-center justify-center rounded bg-transparent p-1 opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/Field.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputInput v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TagsInputInput>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputInput } from "radix-vue";\n  import type { TagsInputInputProps } from "radix-vue";\n\n  const props = defineProps<TagsInputInputProps & { class?: any }>();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "flex-1 bg-transparent focus:outline-none sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <slot name="text">\n        <UiTagsInputItemText />\n      </slot>\n      <slot name="delete">\n        <UiTagsInputItemDelete :icon="icon" />\n      </slot>\n    </slot>\n  </TagsInputItem>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItem } from "radix-vue";\n  import type { TagsInputItemProps } from "radix-vue";\n\n  const props = defineProps<TagsInputItemProps & { class?: any; icon?: string }>();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "inline-flex h-6 shrink-0 items-center gap-1.5 rounded bg-primary pl-2 pr-1 leading-none text-primary-foreground sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/ItemDelete.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputItemDelete v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />\n    </slot>\n  </TagsInputItemDelete>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItemDelete } from "radix-vue";\n  import type { TagsInputItemDeleteProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: any }>(),\n    {\n      icon: "lucide:x",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "flex items-center justify-center rounded bg-transparent opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/ItemText.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputItemText v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TagsInputItemText>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputItemText } from "radix-vue";\n  import type { TagsInputItemTextProps } from "radix-vue";\n\n  const props = defineProps<TagsInputItemTextProps & { class?: any }>();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "leading-none sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "TagsInput/TagsInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TagsInputRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot />\n  </TagsInputRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TagsInputRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TagsInputRootEmits, TagsInputRootProps } from "radix-vue";\n\n  const props = defineProps<TagsInputRootProps & { class?: any }>();\n  const emits = defineEmits<TagsInputRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "flex min-h-[40px] w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 leading-none transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div>\n    <div :class="styles({ class: props.class })">\n      <UiTable :class="tableClass">\n        <UiTableHeader>\n          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">\n            <UiTableHead\n              v-for="header in headerGroup.headers"\n              :key="header.id"\n              :colspan="header.colSpan"\n              :class="[header.column.getCanSort() && \'cursor-pointer select-none\']"\n              @click="header.column.getToggleSortingHandler()?.($event)"\n            >\n              <template v-if="!header.isPlaceholder">\n                <div class="flex items-center gap-3">\n                  <FlexRender\n                    :render="header.column.columnDef.header"\n                    :props="header.getContext()"\n                  />\n                  <Icon\n                    v-if="header.column.getCanSort() && header.column.getIsSorted() === \'asc\'"\n                    :name="ascIcon"\n                    class="h-4 w-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && header.column.getIsSorted() === \'desc\'"\n                    :name="descIcon"\n                    class="h-4 w-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"\n                    :name="unsortedIcon"\n                    class="h-5 w-5"\n                  />\n                </div>\n              </template>\n            </UiTableHead>\n          </UiTableRow>\n        </UiTableHeader>\n\n        <UiTableBody>\n          <UiTableRow\n            v-for="row in table.getRowModel().rows"\n            :key="row.id"\n            :data-state="row.getIsSelected() ? \'selected\' : \'\'"\n          >\n            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">\n              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />\n            </UiTableCell>\n          </UiTableRow>\n\n          <UiTableEmpty\n            v-if="table.getRowModel().rows.length === 0"\n            :colspan="table.getAllLeafColumns().length"\n          >\n            <slot :table="table" name="empty"> No data available. </slot>\n          </UiTableEmpty>\n        </UiTableBody>\n      </UiTable>\n    </div>\n\n    <div\n      v-if="showPagination"\n      class="my-6 flex flex-col justify-between gap-4 px-2 md:flex-row md:items-center"\n    >\n      <div class="flex items-center justify-between gap-3">\n        <slot name="rowsSelected" :table="table">\n          <div v-if="showSelect" class="whitespace-nowrap text-sm text-muted-foreground">\n            <span>\n              {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}\n              {{ table.getFilteredRowModel().rows.length }} row(s) selected\n            </span>\n          </div>\n        </slot>\n        <slot name="rowsPerPage" :table="table">\n          <div class="flex items-center space-x-2 whitespace-nowrap">\n            <p class="hidden text-sm font-medium text-foreground md:inline-block">\n              {{ rowsPerPageText }}\n            </p>\n            <UiSelect v-model="pageSize">\n              <UiSelectTrigger class="h-9 w-[70px]">\n                {{ table.getState().pagination.pageSize }}\n              </UiSelectTrigger>\n              <UiSelectContent side="top" align="start">\n                <UiSelectGroup>\n                  <!-- eslint-disable vue/no-template-shadow -->\n                  <UiSelectItem\n                    v-for="pageSize in pageSizes"\n                    :key="pageSize"\n                    :value="`${pageSize}`"\n                  >\n                    {{ pageSize }}\n                  </UiSelectItem>\n                </UiSelectGroup>\n              </UiSelectContent>\n            </UiSelect>\n          </div>\n        </slot>\n      </div>\n\n      <div class="flex items-center justify-between gap-3">\n        <slot :table="table" name="page">\n          <div\n            class="flex items-center justify-center whitespace-nowrap text-sm font-medium text-foreground"\n          >\n            Page {{ table.getState().pagination.pageIndex + 1 }} of\n            {{ table.getPageCount() }}\n          </div>\n        </slot>\n\n        <slot :table="table" name="pageButtons">\n          <div class="flex items-center space-x-2">\n            <UiButton\n              variant="outline"\n              title="First page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanPreviousPage()"\n              @click="table.setPageIndex(0)"\n            >\n              <Icon name="lucide:chevrons-left" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Previous page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanPreviousPage()"\n              @click="table.previousPage()"\n            >\n              <Icon name="lucide:chevron-left" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Next page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanNextPage()"\n              @click="table.nextPage()"\n            >\n              <Icon name="lucide:chevron-right" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Last page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanNextPage()"\n              @click="table.setPageIndex(table.getPageCount() - 1)"\n            >\n              <Icon name="lucide:chevrons-right" class="h-4 w-4" />\n            </UiButton>\n          </div>\n        </slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup generic="T">\n  import CheckBox from "@/components/Ui/Checkbox/Checkbox.vue";\n  import {\n    FlexRender,\n    getCoreRowModel,\n    getFilteredRowModel,\n    getPaginationRowModel,\n    getSortedRowModel,\n    useVueTable,\n  } from "@tanstack/vue-table";\n  import type { ColumnDef, SortingState, Table } from "@tanstack/vue-table";\n\n  const props = withDefaults(\n    defineProps<{\n      data?: T[];\n      columns?: ColumnDef<T>[];\n      search?: string;\n      showSelect?: boolean;\n      pageSizes?: number[];\n      pageSize?: number;\n      sorting?: SortingState;\n      tableClass?: any;\n      ascIcon?: string;\n      descIcon?: string;\n      unsortedIcon?: string;\n      class?: any;\n      showPagination?: boolean;\n      rowsPerPageText?: string;\n    }>(),\n    {\n      pageSizes: () => [10, 20, 30, 40, 50, 100],\n      pageSize: () => 10,\n      columns: () => [],\n      data: () => [],\n      sorting: () => [],\n      ascIcon: "heroicons:chevron-up",\n      descIcon: "heroicons:chevron-down",\n      unsortedIcon: "heroicons:chevron-up-down",\n      showPagination: true,\n      rowsPerPageText: "Rows per page:",\n    }\n  );\n\n  defineOptions({ inheritAttrs: false });\n\n  const styles = tv({\n    base: "w-full overflow-x-auto",\n  });\n\n  const checkBoxHeader: ColumnDef<any> = {\n    id: "checkbox",\n    header: ({ table }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center" },\n        h(CheckBox, {\n          checked: table.getIsAllRowsSelected()\n            ? true\n            : table.getIsSomeRowsSelected()\n              ? "indeterminate"\n              : false,\n          "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),\n          ariaLabel: "Select all",\n        })\n      );\n    },\n    cell: ({ row }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center " },\n        h(CheckBox, {\n          checked: row.getIsSelected(),\n          "onUpdate:checked": (value) => row.toggleSelected(!!value),\n          ariaLabel: "Select row",\n        })\n      );\n    },\n    enableSorting: false,\n    enableHiding: false,\n  };\n\n  const localColumns: ColumnDef<T>[] = [...props.columns];\n\n  if (props.showSelect) {\n    localColumns.unshift(checkBoxHeader);\n  }\n\n  const emit = defineEmits<{\n    ready: [table: Table<T>];\n  }>();\n\n  const localSorting = ref(props.sorting);\n  const globalFilter = ref(props.search);\n  const columnVisibility = ref({});\n  const rowSelection = ref({});\n\n  const table = useVueTable({\n    get data() {\n      return props.data;\n    },\n    get columns() {\n      return localColumns;\n    },\n    initialState: {\n      pagination: {\n        pageSize: props.pageSize,\n      },\n      rowSelection: rowSelection.value,\n      globalFilter: props.search,\n    },\n    state: {\n      get sorting() {\n        return localSorting.value;\n      },\n      get globalFilter() {\n        return props.search;\n      },\n      get columnVisibility() {\n        return columnVisibility.value;\n      },\n      get rowSelection() {\n        return rowSelection.value;\n      },\n    },\n    onSortingChange: (updaterOrValue) => {\n      localSorting.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(localSorting.value) : updaterOrValue;\n    },\n    onGlobalFilterChange: (updaterOrValue) => {\n      globalFilter.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;\n    },\n    onRowSelectionChange: (updaterOrValue) => {\n      rowSelection.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;\n    },\n    getCoreRowModel: getCoreRowModel(),\n    getSortedRowModel: getSortedRowModel(),\n    getPaginationRowModel: getPaginationRowModel(),\n    getFilteredRowModel: getFilteredRowModel(),\n    enableRowSelection: () => !!props.showSelect,\n  });\n\n  function toggleColumnVisibility(column: any) {\n    columnVisibility.value = {\n      ...columnVisibility.value,\n      [column.id]: !column.getIsVisible(),\n    };\n  }\n\n  // eslint-disable-next-line vue/no-dupe-keys\n  const pageSize = computed({\n    get() {\n      return table.getState().pagination.pageSize.toString();\n    },\n    set(value) {\n      table.setPageSize(Number(value));\n    },\n  });\n\n  onMounted(() => {\n    emit("ready", table);\n  });\n\n  defineExpose({ toggleColumnVisibility });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Textarea",
    value: "textarea",
    devDeps: ["@vueuse/core"],
    files: [
      {
        fileName: "Textarea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <textarea v-bind="props" v-model="localModel" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n    name?: string;\n    id?: string;\n    placeholder?: string;\n    required?: boolean;\n    disabled?: boolean;\n    rows?: number;\n    modelValue?: string;\n  }>();\n\n  const emits = defineEmits<{\n    "update:modelValue": [value: any];\n  }>();\n\n  const localModel = useVModel(props, "modelValue", emits);\n\n  const styles = tv({\n    base: "form-textarea flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:border-input focus:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Toast",
    value: "toast",
    composables: [
      {
        fileName: "useToast.ts",
        dirPath: "composables",
        fileContent:
          'import type { ToastProps } from "@/components/Ui/Toast/Toast.vue";\n\nconst TOAST_LIMIT = 3;\nconst TOAST_REMOVE_DELAY = 7000;\n\nexport type StringOrVNode = string | VNode | (() => VNode);\n\ntype ToasterToast = ToastProps & {\n  id: string;\n  title?: string;\n  description?: StringOrVNode;\n  action?: Component;\n  icon?: string;\n};\n\nconst actionTypes = {\n  ADD_TOAST: "ADD_TOAST",\n  UPDATE_TOAST: "UPDATE_TOAST",\n  DISMISS_TOAST: "DISMISS_TOAST",\n  REMOVE_TOAST: "REMOVE_TOAST",\n} as const;\n\nlet count = 0;\n\nfunction genId() {\n  count = (count + 1) % Number.MAX_VALUE;\n  return count.toString();\n}\n\ntype ActionType = typeof actionTypes;\n\ntype Action =\n  | {\n      type: ActionType["ADD_TOAST"];\n      toast: ToasterToast;\n    }\n  | {\n      type: ActionType["UPDATE_TOAST"];\n      toast: Partial<ToasterToast>;\n    }\n  | {\n      type: ActionType["DISMISS_TOAST"];\n      toastId?: ToasterToast["id"];\n    }\n  | {\n      type: ActionType["REMOVE_TOAST"];\n      toastId?: ToasterToast["id"];\n    };\n\ninterface State {\n  toasts: ToasterToast[];\n}\n\nconst toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();\n\nfunction addToRemoveQueue(toastId: string) {\n  if (toastTimeouts.has(toastId)) return;\n\n  const timeout = setTimeout(() => {\n    toastTimeouts.delete(toastId);\n    dispatch({\n      type: actionTypes.REMOVE_TOAST,\n      toastId,\n    });\n  }, TOAST_REMOVE_DELAY);\n\n  toastTimeouts.set(toastId, timeout);\n}\n\nconst state = ref<State>({\n  toasts: [],\n});\n\nfunction dispatch(action: Action) {\n  switch (action.type) {\n    case actionTypes.ADD_TOAST:\n      state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT);\n      break;\n\n    case actionTypes.UPDATE_TOAST:\n      state.value.toasts = state.value.toasts.map((t) =>\n        t.id === action.toast.id ? { ...t, ...action.toast } : t\n      );\n      break;\n\n    case actionTypes.DISMISS_TOAST: {\n      const { toastId } = action;\n\n      if (toastId) {\n        addToRemoveQueue(toastId);\n      } else {\n        state.value.toasts.forEach((toast) => {\n          addToRemoveQueue(toast.id);\n        });\n      }\n\n      state.value.toasts = state.value.toasts.map((t) =>\n        t.id === toastId || toastId === undefined\n          ? {\n              ...t,\n              open: false,\n            }\n          : t\n      );\n      break;\n    }\n\n    case actionTypes.REMOVE_TOAST:\n      if (action.toastId === undefined) state.value.toasts = [];\n      else state.value.toasts = state.value.toasts.filter((t) => t.id !== action.toastId);\n\n      break;\n  }\n}\n\nfunction useToast() {\n  return {\n    toasts: computed(() => state.value.toasts),\n    toast,\n    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),\n  };\n}\n\ntype Toast = Omit<ToasterToast, "id">;\n\nfunction toast(props: Toast) {\n  const id = genId();\n\n  const update = (props: ToasterToast) =>\n    dispatch({\n      type: actionTypes.UPDATE_TOAST,\n      toast: { ...props, id },\n    });\n\n  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });\n\n  dispatch({\n    type: actionTypes.ADD_TOAST,\n    toast: {\n      ...props,\n      id,\n      open: true,\n      onOpenChange: (open: boolean) => {\n        if (!open) dismiss();\n      },\n    },\n  });\n\n  return {\n    id,\n    dismiss,\n    update,\n  };\n}\n\nexport { toast, useToast };\n',
      },
    ],
    instructions: ["Remeber to add <UiToastToaster /> to your app.vue/layout file."],
    files: [
      {
        fileName: "Toast/Action.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastAction :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </ToastAction>\n</template>\n\n<script lang="ts" setup>\n  import { ToastAction } from "radix-vue";\n  import type { ToastActionProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ToastActionProps & {\n        /**\n         * Custom class names to add to the button.\n         */\n        class?: any;\n      }\n    >(),\n    {\n      altText: "Action button",\n    }\n  );\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastClose :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>\n      <Icon :name="icon || \'lucide:x\'" class="h-4 w-4" />\n    </slot>\n  </ToastClose>\n</template>\n\n<script lang="ts" setup>\n  import { ToastClose } from "radix-vue";\n  import type { ToastCloseProps } from "radix-vue";\n\n  const props = defineProps<\n    ToastCloseProps & {\n      /**\n       * Custom class names to add to the button.\n       */\n      class?: any;\n      /**\n       * The icon to render.\n       */\n      icon?: string;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "icon");\n  const styles = tv({\n    base: "absolute right-2 top-2 inline-flex items-center justify-center rounded-md p-1 text-foreground/50 opacity-50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus-visible:ring-ring group-hover:opacity-100",\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastDescription :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ description }}</slot>\n  </ToastDescription>\n</template>\n\n<script lang="ts" setup>\n  import { ToastDescription } from "radix-vue";\n  import type { ToastDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    ToastDescriptionProps & {\n      /** The description text to render */\n      description?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "description");\n  const styles = tv({\n    base: "text-sm opacity-90",\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Provider.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastProvider v-bind="props">\n    <slot />\n  </ToastProvider>\n</template>\n\n<script lang="ts" setup>\n  import { ToastProvider } from "radix-vue";\n  import type { ToastProviderProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<ToastProviderProps>(), {\n    label: "Notification",\n    swipeDirection: "right",\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastTitle :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot>{{ title }}</slot>\n  </ToastTitle>\n</template>\n\n<script lang="ts" setup>\n  import { ToastTitle } from "radix-vue";\n  import type { ToastTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    ToastTitleProps & {\n      /** The title text to render */\n      title?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class", "title");\n  const styles = tv({\n    base: "text-sm font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Toast.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastRoot\n    v-slot="slotProps"\n    v-bind="forwarded"\n    :class="styles({ variant, class: props.class })"\n    @update:open="onOpenChange"\n  >\n    <slot v-bind="slotProps" />\n  </ToastRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ToastRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ToastRootEmits, ToastRootProps } from "radix-vue";\n\n  export interface ToastProps extends ToastRootProps {\n    /**\n     * Custom class names to add to the toast.\n     */\n    class?: any;\n    /**\n     * The variant of the toast.\n     */\n    variant?: VariantProps<typeof styles>["variant"];\n    /**\n     * Callback that fires when the toast is closed.\n     */\n    onOpenChange?: ((value: boolean) => void) | undefined;\n  }\n\n  const props = withDefaults(defineProps<ToastProps>(), {});\n\n  const emits = defineEmits<ToastRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n  provide("ToastRootProps", readonly(toRef(() => props)));\n\n  const styles = tv({\n    base: "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-9 shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",\n    variants: {\n      variant: {\n        default: "border bg-background text-foreground",\n        success:\n          "success group border-[var(--success-border)] bg-[--success-bg] text-[--success-text]",\n        info: "info group border-[var(--info-border)] bg-[--info-bg] text-[--info-text]",\n        warning:\n          "warning group border-[var(--warning-border)] bg-[--warning-bg] text-[--warning-text]",\n        destructive:\n          "destructive group border-[var(--error-border)] bg-[--error-bg] text-[--error-text]",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Toast/Toaster.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiToastProvider>\n    <template v-for="toast in toasts" :key="toast.id">\n      <UiToast v-bind="toast">\n        <div class="flex gap-3">\n          <Icon\n            v-if="toast.icon"\n            :name="toast.icon"\n            class="h-5 w-5 shrink-0"\n            :class="[!!toast.title && !!toast.description && \'mt-0.5\']"\n          />\n          <div class="flex flex-col gap-1">\n            <UiToastTitle v-if="toast.title" :title="toast.title" />\n            <template v-if="toast.description">\n              <UiToastDescription v-if="isVNode(toast.description)">\n                <component :is="toast.description" />\n              </UiToastDescription>\n              <UiToastDescription v-else>\n                {{ toast.description }}\n              </UiToastDescription>\n            </template>\n            <UiToastClose />\n          </div>\n        </div>\n        <component :is="toast.action" />\n      </UiToast>\n    </template>\n    <UiToastViewport />\n  </UiToastProvider>\n</template>\n\n<script lang="ts" setup>\n  import { isVNode } from "vue";\n\n  const { toasts } = useToast();\n</script>\n\n<style>\n  :root {\n    --success-bg: hsl(143, 85%, 96%);\n    --success-border: hsl(145, 92%, 91%);\n    --success-text: hsl(140, 100%, 27%);\n\n    --info-bg: hsl(208, 100%, 97%);\n    --info-border: hsl(221, 91%, 91%);\n    --info-text: hsl(210, 92%, 45%);\n\n    --warning-bg: hsl(49, 100%, 97%);\n    --warning-border: hsl(49, 91%, 91%);\n    --warning-text: hsl(31, 92%, 45%);\n\n    --error-bg: hsl(359, 100%, 97%);\n    --error-border: hsl(359, 100%, 94%);\n    --error-text: hsl(360, 100%, 45%);\n  }\n  .dark {\n    --success-bg: hsl(150, 100%, 6%);\n    --success-border: hsl(147, 100%, 12%);\n    --success-text: hsl(150, 86%, 65%);\n\n    --info-bg: hsl(215, 100%, 6%);\n    --info-border: hsl(223, 100%, 12%);\n    --info-text: hsl(216, 87%, 65%);\n\n    --warning-bg: hsl(64, 100%, 6%);\n    --warning-border: hsl(60, 100%, 12%);\n    --warning-text: hsl(46, 87%, 65%);\n\n    --error-bg: hsl(358, 76%, 10%);\n    --error-border: hsl(357, 89%, 16%);\n    --error-text: hsl(358, 100%, 81%);\n  }\n</style>\n',
      },
      {
        fileName: "Toast/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToastViewport :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot />\n  </ToastViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ToastViewport } from "radix-vue";\n  import type { ToastViewportProps } from "radix-vue";\n\n  const props = defineProps<\n    ToastViewportProps & {\n      /**\n       * Custom class names to add to the button.\n       */\n      class?: any;\n    }\n  >();\n  const forwarded = reactiveOmit(props, "class");\n  const styles = tv({\n    base: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-auto sm:right-0 sm:flex-col md:max-w-[420px]",\n  });\n</script>\n\n<style>\n  [aria-label~="Notifications"] {\n    display: grid;\n  }\n</style>\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Toggle",
    value: "toggle",
    files: [
      {
        fileName: "Toggle.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToggleRoot\n    v-slot="slotProps"\n    v-bind="forwarded"\n    :class="styles({ variant, size, class: props.class })"\n  >\n    <slot v-bind="slotProps" />\n  </ToggleRoot>\n</template>\n\n<script lang="ts" setup>\n  import { Toggle as ToggleRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ToggleEmits, ToggleProps } from "radix-vue";\n\n  const props = defineProps<\n    ToggleProps & {\n      class?: any;\n      variant?: Props["variant"];\n      size?: Props["size"];\n    }\n  >();\n\n  const emits = defineEmits<ToggleEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emits);\n\n  type Props = VariantProps<typeof styles>;\n\n  const styles = tv({\n    base: "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground sm:text-sm",\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        default: "h-10 px-3",\n        sm: "h-9 px-2.5",\n        lg: "h-11 px-5",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Toggle Group",
    value: "toggle-group",
    files: [
      {
        fileName: "ToggleGroup/ToggleGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToggleGroupRoot\n    v-slot="{ modelValue }"\n    v-bind="forwarded"\n    :class="styles({ class: props.class })"\n  >\n    <slot :model-value="modelValue" />\n  </ToggleGroupRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ToggleGroupRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ToggleGroupRootProps & {\n        /** custom class to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      type: "single",\n    }\n  );\n\n  const emit = defineEmits<ToggleGroupRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit);\n\n  const styles = tv({\n    base: "flex items-center justify-center gap-1",\n  });\n</script>\n',
      },
      {
        fileName: "ToggleGroup/ToggleGroupItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToggleGroupItem v-bind="forwarded" :class="styles({ class: props.class, size, variant })">\n    <slot>\n      <Icon v-if="icon" class="size-4" :name="icon" />\n    </slot>\n  </ToggleGroupItem>\n</template>\n\n<script lang="ts" setup>\n  import { ToggleGroupItem, useForwardProps } from "radix-vue";\n  import type { ToggleGroupItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ToggleGroupItemProps & {\n      /** custom class to add to the toggle */\n      class?: any;\n      /** icon to display */\n      icon?: string;\n      /** variant of the toggle */\n      variant?: VariantProps<typeof styles>["variant"];\n      /** size of the toggle */\n      size?: VariantProps<typeof styles>["size"];\n    }\n  >();\n\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground sm:text-sm",\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        default: "h-10 px-3",\n        sm: "h-9 px-2.5",\n        lg: "h-11 px-5",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipArrow v-bind="props" />\n</template>\n\n<script lang="ts" setup>\n  import { TooltipArrow } from "radix-vue";\n  import type { TooltipArrowProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<TooltipArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n</script>\n',
      },
      {
        fileName: "Tooltip/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiTooltipPortal :to="to">\n    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot />\n    </TooltipContent>\n  </UiTooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipContent, useForwardPropsEmits } from "radix-vue";\n  import type { TooltipContentEmits, TooltipContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      TooltipContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      side: "top",\n      sideOffset: 8,\n      align: "start",\n      alignOffset: -4,\n      avoidCollisions: true,\n      collisionBoundary: () => [],\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<TooltipContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Tooltip/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipPortal v-bind="props">\n    <slot />\n  </TooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipPortal } from "radix-vue";\n  import type { TooltipPortalProps } from "radix-vue";\n\n  const props = defineProps<TooltipPortalProps>();\n</script>\n',
      },
      {
        fileName: "Tooltip/Provider.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipProvider v-bind="props">\n    <slot />\n  </TooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipProvider } from "radix-vue";\n  import type { TooltipProviderProps } from "radix-vue";\n\n  const props = defineProps<TooltipProviderProps>();\n</script>\n',
      },
      {
        fileName: "Tooltip/Tooltip.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiTooltipProvider v-bind="props">\n    <TooltipRoot v-slot="slotProps" v-bind="{ ...forwarded, ...$attrs }">\n      <slot v-bind="slotProps">\n        <slot v-bind="slotProps" name="trigger" />\n        <slot v-bind="slotProps" name="content" />\n      </slot>\n    </TooltipRoot>\n  </UiTooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(defineProps<TooltipRootProps & TooltipProviderProps>(), {\n    delayDuration: 200,\n  });\n\n  const emits = defineEmits<TooltipRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Tooltip/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipTrigger v-bind="props">\n    <slot />\n  </TooltipTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipTrigger } from "radix-vue";\n  import type { TooltipTriggerProps } from "radix-vue";\n\n  const props = defineProps<TooltipTriggerProps>();\n</script>\n',
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
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TreeItem v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeItem>\n</template>\n\n<script lang="ts" setup generic="T extends Record<string, any>">\n  import { TreeItem, useForwardPropsEmits } from "radix-vue";\n  import type { TreeItemEmits, TreeItemProps } from "radix-vue";\n\n  const props = defineProps<TreeItemProps<T>>();\n  const emit = defineEmits<TreeItemEmits<T>>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Tree/Tree.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TreeRoot v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TreeRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TreeRootEmits, TreeRootProps } from "radix-vue";\n\n  const props = defineProps<TreeRootProps>();\n  const emit = defineEmits<TreeRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Tree/Virtualizer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TreeVirtualizer v-slot="slotProps" v-bind="forwarded">\n    <slot v-bind="slotProps" />\n  </TreeVirtualizer>\n</template>\n\n<script lang="ts" setup>\n  import { TreeVirtualizer, useForwardPropsEmits } from "radix-vue";\n  import type { TreeVirtualizerProps } from "radix-vue";\n\n  const props = defineProps<TreeVirtualizerProps>();\n  const forwarded = useForwardPropsEmits(props);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeCheckbox",
    value: "vee-checkbox",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["checkbox", "label"],
    files: [
      {
        fileName: "Vee/Checkbox.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiCheckbox\n      :id="inputId"\n      v-bind="$attrs"\n      :icon="icon"\n      :value="value"\n      :name="name"\n      :required="required"\n      :disabled="disabled"\n      :checked="checked"\n      @update:checked="handleChange"\n    />\n    <div class="flex flex-col gap-1.5">\n      <slot name="label" :error-message="errorMessage" :checked="checked">\n        <UiLabel\n          v-if="label"\n          :for="inputId"\n          class="leading-none"\n          :class="[errorMessage && \'text-destructive\']"\n          >{{ label }}</UiLabel\n        >\n      </slot>\n      <TransitionSlide tag="div" group>\n        <slot name="hint" :error-message="errorMessage" :checked="checked">\n          <p\n            v-if="hint && !errorMessage"\n            key="hint"\n            class="text-sm leading-none text-muted-foreground"\n          >\n            {{ hint }}\n          </p>\n        </slot>\n        <slot name="errorMessage" :error-message="errorMessage" :checked="checked">\n          <p v-if="errorMessage" key="errorMessage" class="text-sm leading-none text-destructive">\n            {{ errorMessage }}\n          </p>\n        </slot>\n      </TransitionSlide>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: any;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    value?: any;\n    required?: boolean;\n    disabled?: boolean;\n    class?: any;\n  }>();\n  const styles = tv({\n    base: "flex gap-3",\n  });\n\n  const inputId = props.id || useId();\n\n  const { errorMessage, checked, handleChange } = useField(\n    () => props.name || inputId,\n    props.rules,\n    {\n      initialValue: props.modelValue,\n      label: props.label,\n      validateOnMount: props.validateOnMount,\n      type: "checkbox",\n      checkedValue: props.value || true,\n      syncVModel: true,\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeCurrencyInput",
    value: "vee-currency-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["currency-input", "label"],
    files: [
      {
        fileName: "Vee/CurrencyInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiCurrencyInput\n        :id="inputId"\n        v-model="value"\n        type="text"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        :placeholder="placeholder"\n        :options="options"\n      />\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { CurrencyInputOptions } from "vue-currency-input";\n\n  const props = defineProps<{\n    label?: string;\n    labelHint?: string;\n    icon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    options?: CurrencyInputOptions;\n    required?: boolean;\n  }>();\n\n  const inputId = useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeDateField",
    value: "vee-date-field",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@internationalized/date"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["date-field", "label"],
    files: [
      {
        fileName: "Vee/DateField.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <UiDateField v-bind="{ ...$attrs, ...props }" v-model="value" />\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { DateFieldRootProps } from "radix-vue";\n\n  const props = defineProps<\n    DateFieldRootProps & {\n      label?: string;\n      labelHint?: string;\n      hint?: string;\n      modelValue?: string;\n      name?: string;\n\n      rules?: any;\n      validateOnMount?: boolean;\n      separator?: string;\n      separatorIcon?: string;\n    }\n  >();\n\n  const inputId = props.id || useId();\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeDatepicker",
    value: "vee-datepicker",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["datepicker", "label", "input"],
    files: [
      {
        fileName: "Vee/Datepicker.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiDatepicker v-bind="datePickerProps" v-model="value">\n        <template #header-title="{ title }">\n          <div class="inline-flex items-center gap-1">\n            {{ title }} <Icon name="lucide:chevron-down" class="h-4 w-4" />\n          </div>\n        </template>\n        <template #default="{ inputValue, inputEvents }">\n          <UiInput\n            :id="inputId"\n            :readonly="readonly"\n            :required="required"\n            :model-value="inputValue"\n            :name="name"\n            :disabled="disabled"\n            v-bind="$attrs"\n            :class="[hasIcon && \'pl-9\']"\n            :placeholder="placeholder"\n            v-on="inputEvents"\n          />\n        </template>\n      </UiDatepicker>\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      label?: string;\n      icon?: string;\n      hint?: string;\n      disabled?: boolean;\n      modelValue?: any;\n      name?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      placeholder?: string;\n      readonly?: boolean;\n      datePickerProps?: any;\n      required?: boolean;\n    }>(),\n    {\n      icon: "lucide:calendar-days",\n    }\n  );\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeFileInput",
    value: "vee-file-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/FileInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiInput\n        :id="inputId"\n        type="file"\n        :required="required"\n        :name="name"\n        v-bind="$attrs"\n        :multiple="multiple"\n        :class="[hasIcon && \'pl-9\']"\n        :accept="accept"\n        @change="\n          handleChange($event);\n          emits(\'change\', $event.target.files);\n        "\n        @blur="\n          handleBlur($event);\n          emits(\'blur\', $event);\n        "\n      />\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    name: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    multiple?: boolean;\n    accept?: string;\n    required?: boolean;\n  }>();\n\n  const emits = defineEmits<{\n    change: [files?: FileList | File | File[] | null];\n    blur: [event?: FocusEvent];\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, handleChange, handleBlur } = useField(() => props.name, props.rules, {\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeInput",
    value: "vee-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiInput\n        :id="inputId"\n        v-model="value"\n        :type="type"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        :placeholder="placeholder"\n        @blur="handleBlur"\n      />\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    labelHint?: string;\n    icon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeMultiSelect",
    value: "vee-multi-select",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@vueform/multiselect"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label"],
    files: [
      {
        fileName: "Vee/MultiSelect.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="formLabel"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ formLabel }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <Multiselect\n      v-bind="$attrs"\n      :id="inputId"\n      ref="multiselect"\n      v-model="value"\n      :attrs="{\n        id: inputId,\n      }"\n      :disabled="disabled"\n      :name="name"\n      :required="required"\n      :classes="{\n        containerActive: \'ring-2 ring-ring ring-offset-2 ring-offset-background transition\',\n      }"\n    >\n      <template v-for="(_, slotName) in $slots" #[slotName]="scope">\n        <slot :name="slotName" v-bind="scope" />\n      </template>\n      <template #clear="{ clear }">\n        <button class="mr-2 flex items-center justify-center" @click="clear">\n          <Icon name="heroicons:x-mark" size="16" class="text-muted-foreground" />\n        </button>\n      </template>\n    </Multiselect>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script setup lang="ts">\n  import Multiselect from "@vueform/multiselect";\n\n  import "@vueform/multiselect/themes/default.css";\n\n  const multiselect = shallowRef<InstanceType<typeof Multiselect> | null>(null);\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Omit<InstanceType<typeof Multiselect>, "$emit">> {}\n\n  const props = defineProps<\n    {\n      modelValue?: any;\n      formLabel?: string;\n      required?: boolean;\n      id?: string;\n      hint?: string;\n      disabled?: boolean;\n      rules?: any;\n      validateOnMount?: boolean;\n      name?: string;\n    } & Props\n  >();\n\n  const emit = defineEmits([\n    "paste",\n    "open",\n    "close",\n    "select",\n    "deselect",\n    "input",\n    "search-change",\n    "tag",\n    "option",\n    "update:modelValue",\n    "change",\n    "clear",\n    "keydown",\n    "keyup",\n    "max",\n    "create",\n    "ready",\n  ]);\n\n  const inputId = props.id || useId();\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n\n  onMounted(() => {\n    nextTick(() => {\n      emit("ready", multiselect.value);\n    });\n  });\n</script>\n\n<style>\n  :root {\n    --ms-font-size: theme("fontSize.sm");\n    --ms-line-height: 1.5;\n    --ms-bg: theme("colors.background");\n    --ms-bg-disabled: transparent;\n    --ms-border-color: theme("colors.input");\n    --ms-border-width: 1px;\n    --ms-border-color-active: theme("colors.input");\n    --ms-border-width-active: 1px;\n    --ms-radius: theme("borderRadius.md");\n    --ms-py: theme("padding.2");\n    --ms-px: theme("padding.3");\n    --ms-ring-width: 0px;\n    --ms-ring-color: theme("colors.ring");\n    --ms-placeholder-color: theme("colors.muted.foreground");\n    --ms-max-height: theme("height.52");\n\n    --ms-spinner-color: theme("colors.muted.foreground");\n    --ms-caret-color: theme("colors.muted.foreground");\n    --ms-clear-color: theme("colors.muted.foreground");\n    --ms-clear-color-hover: theme("colors.primary.DEFAULT");\n\n    --ms-tag-font-size: theme("fontSize.sm");\n    --ms-tag-line-height: 1.25rem;\n    --ms-tag-font-weight: 500;\n    --ms-tag-bg: theme("colors.primary.DEFAULT");\n    --ms-tag-bg-disabled: transparent;\n    --ms-tag-color: theme("colors.primary.foreground");\n    --ms-tag-color-disabled: theme("colors.muted.foreground");\n    --ms-tag-radius: theme("borderRadius.DEFAULT");\n    --ms-tag-py: theme("padding[0.5]");\n\n    --ms-dropdown-bg: theme("colors.background");\n    --ms-dropdown-border-color: theme("colors.border");\n    --ms-dropdown-border-width: 1px;\n    --ms-dropdown-radius: theme("borderRadius.md");\n\n    --ms-group-label-bg: theme("colors.muted.DEFAULT");\n    --ms-group-label-color: theme("colors.muted.foreground");\n    --ms-group-label-bg-pointed: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-pointed: theme("colors.primary.foreground");\n    --ms-group-label-bg-disabled: theme("colors.muted.DEFAULT / 50%");\n    --ms-group-label-color-disabled: theme("colors.muted.foreground / 50%");\n    --ms-group-label-bg-selected: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-selected: theme("colors.primary.foreground");\n    --ms-group-label-bg-selected-pointed: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-selected-pointed: theme("colors.primary.foreground");\n    --ms-group-label-bg-selected-disabled: theme("colors.muted.DEFAULT / 50%");\n    --ms-group-label-color-selected-disabled: theme("colors.muted.foreground / 50%");\n\n    --ms-option-font-size: theme("fontSize.sm");\n    --ms-option-bg-pointed: theme("colors.primary.DEFAULT");\n    --ms-option-color-pointed: theme("colors.primary.foreground");\n    --ms-option-bg-selected: theme("colors.primary.DEFAULT");\n    --ms-option-color-selected: theme("colors.primary.foreground");\n    --ms-option-bg-disabled: transparent;\n    --ms-option-color-disabled: theme("colors.muted.foreground / 50%");\n    --ms-option-bg-selected-pointed: theme("colors.primary.DEFAULT");\n    --ms-option-color-selected-pointed: theme("colors.primary.foreground");\n    --ms-option-bg-selected-disabled: theme("colors.muted.DEFAULT");\n    --ms-option-color-selected-disabled: theme("colors.muted.foreground");\n\n    --ms-empty-color: theme("colors.muted.foreground");\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeNumberField",
    value: "vee-number-field",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions", "@internationalized/number"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label", "number-field"],
    files: [
      {
        fileName: "Vee/NumberField.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :hint="labelHint"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <UiNumberField\n        v-bind="($attrs, props)"\n        :id="inputId"\n        v-model="value"\n        :disabled="disabled"\n        :required="required"\n        :name="name"\n      >\n        <template v-for="(_, slotName) in $slots" #[slotName]="scope">\n          <slot :name="slotName" v-bind="scope" />\n        </template>\n      </UiNumberField>\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { NumberFieldRootProps } from "radix-vue";\n\n  interface Props extends NumberFieldRootProps {\n    label?: string;\n    labelHint?: string;\n    hint?: string;\n    disabled?: boolean;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    required?: boolean;\n  }\n  const props = defineProps<Props>();\n\n  const inputId = computed(() => props.id || useId());\n\n  const { errorMessage, value } = useField(() => props.name || inputId.value, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Pin Input",
    value: "vee-pin-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label", "pin-input"],
    files: [
      {
        fileName: "Vee/PinInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <UiPinInput\n        :id="inputId"\n        v-bind="{ ...$attrs, ...forwarded }"\n        v-model="value"\n        @complete="emits(\'complete\', $event)"\n      />\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import type { PinInputRootProps } from "radix-vue";\n\n  const props = defineProps<\n    Omit<PinInputRootProps, "as" | "asChild"> & {\n      label?: string;\n      hint?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      separator?: string;\n      inputCount?: number;\n    }\n  >();\n\n  const emits = defineEmits<{\n    complete: [value: string[]];\n  }>();\n\n  const forwarded = reactiveOmit(\n    props,\n    "label",\n    "hint",\n    "id",\n    "rules",\n    "validateOnMount",\n    "modelValue"\n  );\n  const inputId = props.id || useId();\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue || [],\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeRadioGroup",
    value: "vee-radio-group",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["radio-group", "label"],
    files: [
      {
        fileName: "Vee/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <slot name="label" :error-message="errorMessage" :value="value">\n      <UiLabel v-if="label" class="mb-5 leading-none" :class="[errorMessage && \'text-destructive\']"\n        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n      >\n    </slot>\n    <UiRadioGroup v-bind="{ ...forwarded, ...$attrs }" v-model="value">\n      <slot />\n    </UiRadioGroup>\n    <div class="flex flex-col gap-1.5">\n      <TransitionSlide tag="div" group>\n        <slot name="hint" :error-message="errorMessage" :value="value">\n          <p\n            v-if="hint && !errorMessage"\n            key="hint"\n            class="mt-1.5 text-sm leading-none text-muted-foreground"\n          >\n            {{ hint }}\n          </p>\n        </slot>\n        <slot name="errorMessage" :error-message="errorMessage" :value="value">\n          <p\n            v-if="errorMessage"\n            key="errorMessage"\n            class="mt-1.5 text-sm leading-none text-destructive"\n          >\n            {{ errorMessage }}\n          </p>\n        </slot>\n      </TransitionSlide>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardProps } from "radix-vue";\n  import type { RadioGroupRootProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupRootProps & {\n      label?: string;\n      hint?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      class?: any;\n      name: string;\n    }\n  >();\n\n  const forwarded = useForwardProps(props);\n  const styles = tv({\n    base: "flex flex-col",\n  });\n\n  defineOptions({ inheritAttrs: false });\n\n  const { errorMessage, value } = useField(() => props.name, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    type: "radio",\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeSelect",
    value: "vee-select",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["native-select", "label"],
    files: [
      {
        fileName: "Vee/Select.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" lass="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground" />\n        </span>\n      </slot>\n      <UiNativeSelect\n        :id="inputId"\n        v-model="value"\n        :required="required"\n        :trailing-icon="trailingIcon"\n        :name="name"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        @blur="handleBlur"\n      >\n        <slot />\n      </UiNativeSelect>\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    trailingIcon?: string;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeTagsInput",
    value: "vee-tags-input",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["tags-input", "label"],
    files: [
      {
        fileName: "Vee/TagsInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      v-if="label"\n      :for="inputId"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel\n    >\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiTagsInput\n        v-model="value"\n        :required="required"\n        :name="name"\n        :disabled="disabled"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n      >\n        <UiTagsInputItem v-for="tag in value" :key="tag" :value="tag" />\n        <UiTagsInputField :id="inputId" :placeholder="placeholder" />\n      </UiTagsInput>\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    disabled?: boolean;\n    modelValue?: string[];\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeTextarea",
    value: "vee-textarea",
    deps: ["@vee-validate/nuxt", "@morev/vue-transitions"],
    askValidator: true,
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["textarea", "label"],
    files: [
      {
        fileName: "Vee/Textarea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel v-if="label" :for="inputId" :class="[errorMessage && \'text-destructive\', \'mb-2\']">\n      <span>{{ label }} <span v-if="required" class="text-destructive">*</span></span>\n    </UiLabel>\n    <div class="relative">\n      <slot name="icon">\n        <span v-if="hasIcon" class="absolute left-3 top-3 flex items-center justify-center">\n          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground/70" />\n        </span>\n      </slot>\n      <UiTextarea\n        :id="inputId"\n        v-model="value"\n        :required="required"\n        :rows="rows"\n        :name="name"\n        v-bind="$attrs"\n        :class="[hasIcon && \'pl-9\']"\n        :placeholder="placeholder"\n        @blur="handleBlur"\n      />\n    </div>\n    <TransitionSlide group tag="div">\n      <p v-if="hint && !errorMessage" key="hint" class="mt-1.5 text-sm text-muted-foreground">\n        {{ hint }}\n      </p>\n\n      <p v-if="errorMessage" key="errorMessage" class="mt-1.5 text-sm text-destructive">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    placeholder?: string;\n    rows?: number;\n    required?: boolean;\n  }>();\n\n  const inputId = props.id || useId();\n\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\n\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vue Sonner",
    value: "vue-sonner",
    deps: ["vue-sonner"],
    instructions: ["Remember to add the <UiVueSonner /> tag to your app.vue/layout file."],
    files: [
      {
        fileName: "VueSonner.client.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Toaster\n    position="top-right"\n    :visible-toasts="5"\n    rich-colors\n    :duration="7000"\n    close-button\n    :theme="$colorMode.value == \'dark\' ? \'dark\' : \'light\'"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { Toaster } from "vue-sonner";\n</script>\n<style scoped>\n  :deep([data-sonner-toaster][data-theme="dark"]),\n  :deep([data-sonner-toaster][data-theme="light"]) {\n    --normal-bg: theme("colors.popover.DEFAULT");\n    --normal-border: theme("colors.border");\n    --normal-text: theme("colors.popover.foreground");\n    --border-radius: theme("borderRadius.md");\n  }\n  :deep([data-sonner-toaster]) {\n    @apply font-sans;\n  }\n  :deep([data-sonner-toast][data-styled="true"]) {\n    @apply items-start;\n  }\n  :deep([data-sonner-toast] [data-icon]) {\n    @apply mt-0.5;\n  }\n  :deep([data-sonner-toast] [data-title]) {\n    @apply text-sm font-semibold;\n  }\n  :deep([data-sonner-toast] [data-description]) {\n    @apply text-sm;\n  }\n  :deep([data-sonner-toast] [data-close-button]) {\n    @apply border border-border bg-background text-foreground hover:!border-inherit hover:!bg-inherit hover:!text-accent-foreground;\n  }\n  :deep([data-sonner-toast] [data-button]) {\n    @apply bg-primary text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\n  }\n  :deep(.sonner-loading-bar) {\n    @apply bg-muted-foreground;\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
];
