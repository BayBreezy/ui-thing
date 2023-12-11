export default [
  {
    name: "Accordion",
    value: "accordion",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    instructions: ["Remember to add the accordion animations to your tailwind.config.js"],
    files: [
      {
        fileName: "Accordion/Accordion.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AccordionRoot v-bind="forwarded">\r\n    <slot :items="items">\r\n      <template v-for="(item, i) in items" :key="i">\r\n        <UiAccordionItem :disabled="item.disabled" :value="item.value">\r\n          <slot name="header" :items="items">\r\n            <UiAccordionHeader>\r\n              <slot name="trigger" :items="items">\r\n                <UiAccordionTrigger :title="item.title" :icon="item.icon" />\r\n              </slot>\r\n            </UiAccordionHeader>\r\n          </slot>\r\n          <slot name="content" :items="items">\r\n            <UiAccordionContent :content="item.content"></UiAccordionContent>\r\n          </slot>\r\n        </UiAccordionItem>\r\n      </template>\r\n    </slot>\r\n  </AccordionRoot>\r\n</template>\r\n\r\n<script setup lang="ts">\r\n  import { AccordionRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { AccordionRootEmits, AccordionRootProps } from "radix-vue";\r\n\r\n  export interface AccordionItem {\r\n    title?: string;\r\n    content?: string;\r\n    value: string;\r\n    disabled?: boolean;\r\n    icon?: string;\r\n  }\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      AccordionRootProps & {\r\n        items?: AccordionItem[];\r\n      }\r\n    >(),\r\n    { type: "single", collapsible: true }\r\n  );\r\n\r\n  const emits = defineEmits<AccordionRootEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "items"), emits);\r\n</script>\r\n',
      },
      {
        fileName: "Accordion/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AccordionContent\r\n    v-bind="reactiveOmit(props, \'content\', \'class\')"\r\n    :class="styles({ class: props.class })"\r\n  >\r\n    <div class="pb-4 pt-0">\r\n      <slot>{{ content }}</slot>\r\n    </div>\r\n  </AccordionContent>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AccordionContent } from "radix-vue";\r\n  import type { AccordionContentProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    AccordionContentProps & {\r\n      class?: any;\r\n      content?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Accordion/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AccordionHeader v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\r\n    <slot></slot>\r\n  </AccordionHeader>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AccordionHeader } from "radix-vue";\r\n  import type { AccordionHeaderProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    AccordionHeaderProps & {\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "flex",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Accordion/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AccordionItem v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\r\n    <slot></slot>\r\n  </AccordionItem>\r\n</template>\r\n\r\n<script setup lang="ts">\r\n  import { AccordionItem, useForwardProps } from "radix-vue";\r\n  import type { AccordionItemProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    AccordionItemProps & {\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "border-b",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Accordion/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AccordionTrigger\r\n    v-bind="reactiveOmit(props, \'class\', \'icon\', \'title\')"\r\n    :class="styles({ class: props.class })"\r\n  >\r\n    <slot :props="props">\r\n      {{ title }}\r\n    </slot>\r\n    <slot name="icon" :props="props">\r\n      <Icon v-if="icon" :name="icon" class="h-4 w-4 shrink-0 transition-transform duration-200" />\r\n    </slot>\r\n  </AccordionTrigger>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AccordionTrigger } from "radix-vue";\r\n  import type { AccordionTriggerProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      AccordionTriggerProps & {\r\n        class?: any;\r\n        title?: string;\r\n        icon?: string;\r\n      }\r\n    >(),\r\n    {\r\n      icon: "lucide:chevron-down",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert",
    value: "alert",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon", "@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["nuxt-icon", "@vueuse/nuxt"],
    files: [
      {
        fileName: "Alert/Alert.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ variant: variant, class: props.class })" v-if="shown">\n    <slot :props="props" name="icon">\n      <Icon :name="icon" v-if="icon" class="h-4 w-4" />\n    </slot>\n    <div>\n      <slot :props="props">\n        <UiAlertTitle :title="title" v-if="title" />\n        <UiAlertDescription v-if="description" :description="description" />\n      </slot>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      /** Custom class to add to the `Alert` parent */\n      class?: any;\n      /**\n       * Whether or not the `Alert` is shown.\n       * @default true\n       */\n      modelValue?: boolean;\n      /** The variant of the `Alert` */\n      variant?: VariantProps<typeof styles>["variant"];\n      /** The title that is passed to the `AlertTitle` component */\n      title?: string;\n      /** The description that is passed to the `AlertDescription` component */\n      description?: string;\n      /** The icon that should be displayed*/\n      icon?: string;\n    }>(),\n    {\n      modelValue: true,\n    }\n  );\n\n  const emit = defineEmits(["update:modelValue"]);\n  const shown = useVModel(props, "modelValue", emit, { defaultValue: true });\n\n  const styles = tv({\n    base: "relative flex w-full gap-3 rounded-lg border p-4",\n    variants: {\n      variant: {\n        default: "bg-background text-foreground",\n        destructive:\n          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Alert/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive\n    v-bind="reactiveOmit(props, \'description\', \'class\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ description }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: any;\n        /** The description text that should be displayed */\n        description?: string;\n      }\n    >(),\n    { as: "div" }\n  );\n\n  const styles = tv({\n    base: "text-sm [&_p]:leading-relaxed",\n  });\n</script>\n',
      },
      {
        fileName: "Alert/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive v-bind="reactiveOmit(props, \'class\', \'title\')" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class to add to the parent */\n        class?: any;\n        /** The title text that should be displayed */\n        title?: string;\n      }\n    >(),\n    { as: "h5" }\n  );\n\n  const styles = tv({\n    base: "mb-1 font-medium leading-none tracking-tight",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Alert Dialog",
    value: "alert-dialog",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon", "@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["nuxt-icon", "@vueuse/nuxt"],
    utils: [
      {
        fileName: "shared.styles.ts",
        dirPath: "utils",
        fileContent:
          '// Add here because button styles are used in several components\r\nexport const buttonStyles = tv({\r\n  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\r\n  variants: {\r\n    variant: {\r\n      default: "bg-primary text-primary-foreground hover:bg-primary/90",\r\n      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\r\n      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\r\n      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",\r\n      ghost: "hover:bg-accent hover:text-accent-foreground",\r\n      link: "text-primary underline-offset-4 hover:underline",\r\n    },\r\n    size: {\r\n      default: "h-10 px-4 py-2",\r\n      sm: "h-9 rounded-md px-3",\r\n      lg: "h-11 rounded-md px-8",\r\n      "icon-sm": "h-9 w-9",\r\n      icon: "h-10 w-10",\r\n    },\r\n    disabled: {\r\n      true: "pointer-events-none opacity-50",\r\n    },\r\n  },\r\n  defaultVariants: {\r\n    variant: "default",\r\n    size: "default",\r\n  },\r\n});\r\n',
      },
    ],
    files: [
      {
        fileName: "AlertDialog/Action.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AlertDialogAction\r\n    v-bind="reactiveOmit(props, \'class\', \'text\', \'variant\', \'size\')"\r\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\r\n  >\r\n    <slot>{{ text }} </slot>\r\n  </AlertDialogAction>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AlertDialogAction } from "radix-vue";\r\n  import type { AlertDialogActionProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      AlertDialogActionProps & {\r\n        /** Action to perform when the button is clicked */\r\n        onClick?: () => void;\r\n        /** Text to display in the button */\r\n        text?: string;\r\n        /** Custom class(es) to add to the button */\r\n        class?: any;\r\n        /** Whether the button is disabled */\r\n        disabled?: boolean;\r\n        /** The button\'s visual variant */\r\n        variant?: VariantProps<typeof buttonStyles>["variant"];\r\n        /** The button\'s visual size */\r\n        size?: VariantProps<typeof buttonStyles>["size"];\r\n      }\r\n    >(),\r\n    {\r\n      text: "Continue",\r\n      variant: "default",\r\n    }\r\n  );\r\n</script>\r\n',
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
          '<template>\r\n  <AlertDialogCancel\r\n    v-bind="reactiveOmit(props, \'class\', \'text\', \'variant\', \'size\')"\r\n    :class="buttonStyles({ variant, size, disabled, class: props.class })"\r\n  >\r\n    <slot>{{ text }}</slot>\r\n  </AlertDialogCancel>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AlertDialogCancel } from "radix-vue";\r\n  import type { AlertDialogCancelProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      AlertDialogCancelProps & {\r\n        /** Action to perform when the button is clicked */\r\n        onClick?: () => void;\r\n        /** Text to display in the button */\r\n        text?: string;\r\n        /** Custom class(es) to add to the button */\r\n        class?: any;\r\n        /** Whether the button is disabled */\r\n        disabled?: boolean;\r\n        /** The button\'s visual variant */\r\n        variant?: VariantProps<typeof buttonStyles>["variant"];\r\n        /** The button\'s visual size */\r\n        size?: VariantProps<typeof buttonStyles>["size"];\r\n      }\r\n    >(),\r\n    {\r\n      text: "Cancel",\r\n      variant: "outline",\r\n    }\r\n  );\r\n</script>\r\n',
      },
      {
        fileName: "AlertDialog/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiAlertDialogPortal :to="to">\n    <slot name="overlay">\n      <UiAlertDialogOverlay />\n    </slot>\n    <AlertDialogContent\n      :class="styles({ class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot></slot>\n    </AlertDialogContent>\n  </UiAlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { AlertDialogContentEmits, AlertDialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    AlertDialogContentProps & {\n      /** Custom class(es) to add to the `AlertDialogContent` */\n      class?: any;\n      /** The element to render the portal into */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emit = defineEmits<AlertDialogContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emit);\n\n  const styles = tv({\n    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogDescription\n    v-bind="reactiveOmit(props, \'class\', \'description\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ description }}</slot>\n  </AlertDialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogDescription } from "radix-vue";\n  import type { AlertDialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogDescriptionProps & {\n      /** Text to display in the description */\n      description?: string;\n      /** Custom class(es) to add to the description */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n  const styles = tv({\n    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive, useForwardProps } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const styles = tv({\n    base: "flex flex-col gap-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogOverlay\n    v-bind="reactiveOmit(props, \'class\')"\n    :class="styles({ class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogOverlay } from "radix-vue";\n  import type { AlertDialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogOverlayProps & {\n      /** Custom class(es) to add to the overlay */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogPortal v-bind="props">\n    <slot></slot>\n  </AlertDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogPortal } from "radix-vue";\n  import type { AlertDialogPortalProps } from "radix-vue";\n\n  const props = defineProps<AlertDialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "AlertDialog/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogTitle v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot>{{ title }}</slot>\n  </AlertDialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTitle } from "radix-vue";\n  import type { AlertDialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    AlertDialogTitleProps & {\n      /** Text to display in the title */\n      title?: string;\n      /** Custom class(es) to add to the title */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-lg font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "AlertDialog/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <AlertDialogTrigger v-bind="props">\n    <slot></slot>\n  </AlertDialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { AlertDialogTrigger, useForwardProps } from "radix-vue";\n  import type { AlertDialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<AlertDialogTriggerProps>();\n</script>\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Aspect Ratio",
    value: "aspect-ratio",
    deps: ["radix-vue"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "AspectRatio.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AspectRatio v-bind="props">\r\n    <slot />\r\n  </AspectRatio>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AspectRatio } from "radix-vue";\r\n  import type { AspectRatioProps } from "radix-vue";\r\n\r\n  const props = defineProps<AspectRatioProps>();\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Autocomplete",
    value: "autocomplete",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon", "@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["nuxt-icon", "@vueuse/nuxt"],
    files: [
      {
        fileName: "Autocomplete/Anchor.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxAnchor v-bind="props">\n    <slot></slot>\n  </ComboboxAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxAnchor } from "radix-vue";\n  import type { ComboboxAnchorProps } from "radix-vue";\n\n  const props = defineProps<ComboboxAnchorProps>();\n</script>\n',
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
          '<template>\n  <ComboboxRoot v-bind="forwarded">\n    <slot></slot>\n  </ComboboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";\n\n  const props = defineProps<ComboboxRootProps>();\n\n  const emits = defineEmits<ComboboxRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Autocomplete/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxCancel v-bind="props">\n    <slot></slot>\n  </ComboboxCancel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxCancel } from "radix-vue";\n  import type { ComboboxCancelProps } from "radix-vue";\n\n  const props = defineProps<ComboboxCancelProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <UiAutocompleteViewport>\n      <slot></slot>\n    </UiAutocompleteViewport>\n  </ComboboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ComboboxContentProps & {\n        class?: any;\n      }\n    >(),\n    {\n      position: "popper",\n      bodyLock: true,\n      side: "bottom",\n      sideOffset: 8,\n    }\n  );\n\n  const emits = defineEmits<ComboboxContentEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "z-50 w-[var(--radix-combobox-trigger-width)] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Empty.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxEmpty v-bind="props">\n    <slot></slot>\n  </ComboboxEmpty>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxEmpty } from "radix-vue";\n  import type { ComboboxEmptyProps } from "radix-vue";\n\n  const props = defineProps<ComboboxEmptyProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxGroup v-bind="props">\n    <slot></slot>\n  </ComboboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxGroup } from "radix-vue";\n  import type { ComboboxGroupProps } from "radix-vue";\n\n  const props = defineProps<ComboboxGroupProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxInput v-bind="props" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxInput } from "radix-vue";\n  import type { ComboboxInputProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxInputProps & {\n      type?: string;\n      disabled?: boolean;\n      autoFocus?: boolean;\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxItem v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot name="icon">\n      <span class="absolute inset-y-0 left-2 flex items-center justify-center">\n        <UiAutocompleteItemIndicator class="animate-in fade-in-0 zoom-in-0" :icon="icon" />\n      </span>\n    </slot>\n    <slot></slot>\n  </ComboboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxItem, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxItemEmits, ComboboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxItemProps & {\n      class?: any;\n      icon?: string;\n    }\n  >();\n\n  const emits = defineEmits<{\n    select: ComboboxItemEmits["select"];\n  }>();\n  const forwarded = useForwardPropsEmits(props, emits);\n\n  const styles = tv({\n    base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pl-9 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
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
          '<template>\n  <ComboboxLabel :class="styles({ class: props.class })" v-bind="props">\n    <slot></slot>\n  </ComboboxLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxLabel } from "radix-vue";\n  import type { ComboboxLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxLabelProps & {\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "px-2 py-1.5 pl-9 text-sm font-medium text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Autocomplete/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxPortal v-bind="props">\n    <slot></slot>\n  </ComboboxPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxPortal } from "radix-vue";\n  import type { ComboboxPortalProps } from "radix-vue";\n\n  const props = defineProps<ComboboxPortalProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxSeparator v-bind="props">\n    <slot></slot>\n  </ComboboxSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxSeparator } from "radix-vue";\n  import type { ComboboxSeparatorProps } from "radix-vue";\n\n  const props = defineProps<ComboboxSeparatorProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxTrigger v-bind="props">\n    <slot></slot>\n  </ComboboxTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxTrigger } from "radix-vue";\n  import type { ComboboxTriggerProps } from "radix-vue";\n\n  const props = defineProps<ComboboxTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Autocomplete/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxViewport v-bind="props">\n    <slot></slot>\n  </ComboboxViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxViewport } from "radix-vue";\n  import type { ComboboxViewportProps } from "radix-vue";\n\n  const props = defineProps<ComboboxViewportProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Avatar",
    value: "avatar",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Avatar/Avatar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AvatarRoot :as="as" :as-child="asChild" :class="styles({ class: props.class })">\r\n    <slot>\r\n      <slot name="image">\r\n        <UiAvatarImage\r\n          @loading-status-change="emits(\'loadingStatusChange\', $event)"\r\n          v-if="src"\r\n          :src="src"\r\n          :alt="alt"\r\n          :class="imageClass"\r\n        />\r\n      </slot>\r\n      <slot name="fallback">\r\n        <UiAvatarFallback :delay-ms="delayMs" :class="fallbackClass" :fallback="fallback" />\r\n      </slot>\r\n    </slot>\r\n  </AvatarRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AvatarRoot } from "radix-vue";\r\n  import type { AvatarImageEmits, AvatarImageProps, AvatarRootProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      AvatarRootProps &\r\n        Partial<AvatarImageProps> & {\r\n          class?: any;\r\n          imageClass?: any;\r\n          fallbackClass?: any;\r\n          alt?: string;\r\n          fallback?: string;\r\n          delayMs?: number;\r\n        }\r\n    >(),\r\n    {}\r\n  );\r\n\r\n  const emits = defineEmits<AvatarImageEmits>();\r\n  const styles = tv({\r\n    base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Avatar/Fallback.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AvatarFallback\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'fallback\')"\r\n  >\r\n    <slot>\r\n      {{ fallback }}\r\n    </slot>\r\n  </AvatarFallback>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AvatarFallback } from "radix-vue";\r\n  import type { AvatarFallbackProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    AvatarFallbackProps & {\r\n      /** The text to display inside th eavatar */\r\n      fallback?: string;\r\n      /** Custom class(es) to add to the element */\r\n      class?: any;\r\n    }\r\n  >();\r\n  const styles = tv({\r\n    base: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Avatar/Image.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <AvatarImage v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })" />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { AvatarImage } from "radix-vue";\r\n  import type { AvatarImageEmits, AvatarImageProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    AvatarImageProps & {\r\n      /** The alt text for the image */\r\n      alt?: string;\r\n      /** Custom class(es) to add to the element */\r\n      class?: any;\r\n    }\r\n  >();\r\n  const emits = defineEmits<AvatarImageEmits>();\r\n\r\n  const styles = tv({\r\n    base: "aspect-square h-full w-full object-cover",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Badge",
    value: "badge",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Badge.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <component\n    :is="elementType"\n    @click="onClick"\n    :to="to"\n    :href="href"\n    :disabled="disabled"\n    :class="badgeVariants({ disabled, variant, class: props.class })"\n  >\n    <slot></slot>\n  </component>\n</template>\n\n<script lang="ts" setup>\n  const badgeVariants = tv({\n    base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",\n    variants: {\n      variant: {\n        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",\n        secondary:\n          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",\n        destructive:\n          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",\n        outline: "text-foreground",\n      },\n      disabled: {\n        true: "cursor-not-allowed opacity-50",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n\n  type BadgeProps = VariantProps<typeof badgeVariants>;\n\n  const props = defineProps<{\n    class?: any;\n    variant?: BadgeProps["variant"];\n    onClick?: () => void;\n    to?: string;\n    href?: string;\n    disabled?: boolean;\n    tag?: string;\n  }>();\n\n  const elementType = computed(() => {\n    if (props.tag) return props.tag;\n    if (props.href || props.to) return resolveComponent("NuxtLink");\n    return props.tag || "div";\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Breadcrumbs",
    value: "breadcrumbs",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Breadcrumbs.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <template v-for="(item, i) in items" :key="i">\n      <div class="flex items-center gap-3">\n        <div class="flex cursor-pointer items-center gap-2">\n          <slot name="crumbIcon" :item="item" :index="i">\n            <Icon\n              v-if="item.icon"\n              :name="item.icon"\n              :class="[!isNotLastItem(i) && \'text-primary\']"\n            />\n          </slot>\n          <slot :item="item" :isNotLastItem="isNotLastItem" :index="i" name="link">\n            <NuxtLink\n              @click="item?.click?.()"\n              :to="!item?.disabled ? item.link : \'\'"\n              :class="[\n                isNotLastItem(i)\n                  ? \'text-muted-foreground hover:underline\'\n                  : \'font-semibold text-primary\',\n              ]"\n              class="text-sm text-foreground"\n              v-if="item.label"\n              >{{ item.label }}</NuxtLink\n            >\n          </slot>\n        </div>\n        <slot name="separator" :item="item" :index="i">\n          <Icon v-if="isNotLastItem(i)" :name="separator" class="h-3 w-3 text-muted-foreground" />\n        </slot>\n      </div>\n    </template>\n  </div>\n</template>\n\n<script setup lang="ts">\n  export interface Crumbs {\n    label: string;\n    icon?: string;\n    link?: string;\n    disabled?: boolean;\n    click?: Function;\n  }\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The items to display in the breadcrumbs.\n       */\n      items?: Crumbs[];\n      /**\n       * The separator to use between each breadcrumb.\n       */\n      separator?: string;\n      class?: any;\n    }>(),\n    {\n      separator: "heroicons:chevron-right",\n      items: () => [],\n    }\n  );\n\n  const isNotLastItem = (index: number) => {\n    return index !== props?.items?.length - 1;\n  };\n\n  const styles = tv({\n    base: "flex w-full items-center gap-4",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Button",
    value: "button",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    utils: [
      {
        fileName: "shared.styles.ts",
        dirPath: "utils",
        fileContent:
          '// Add here because button styles are used in several components\r\nexport const buttonStyles = tv({\r\n  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\r\n  variants: {\r\n    variant: {\r\n      default: "bg-primary text-primary-foreground hover:bg-primary/90",\r\n      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\r\n      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\r\n      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",\r\n      ghost: "hover:bg-accent hover:text-accent-foreground",\r\n      link: "text-primary underline-offset-4 hover:underline",\r\n    },\r\n    size: {\r\n      default: "h-10 px-4 py-2",\r\n      sm: "h-9 rounded-md px-3",\r\n      lg: "h-11 rounded-md px-8",\r\n      "icon-sm": "h-9 w-9",\r\n      icon: "h-10 w-10",\r\n    },\r\n    disabled: {\r\n      true: "pointer-events-none opacity-50",\r\n    },\r\n  },\r\n  defaultVariants: {\r\n    variant: "default",\r\n    size: "default",\r\n  },\r\n});\r\n',
      },
    ],
    files: [
      {
        fileName: "Button.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <component\r\n    :is="elementType"\r\n    :class="\r\n      buttonStyles({\r\n        disabled: disabled || loading,\r\n        variant: variant,\r\n        size: size,\r\n        class: props.class,\r\n      })\r\n    "\r\n    :disabled="disabled || loading"\r\n    :to="to"\r\n    :href="href"\r\n    :type="type"\r\n    @click="onClick"\r\n  >\r\n    <slot></slot>\r\n  </component>\r\n</template>\r\n\r\n<script setup lang="ts">\r\n  import type { RouteLocationRaw } from "vue-router";\r\n\r\n  type ButtonProps = VariantProps<typeof buttonStyles>;\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      type?: "button" | "submit" | "reset";\r\n      disabled?: boolean;\r\n      loading?: boolean;\r\n      onClick?: any;\r\n      to?: string | RouteLocationRaw;\r\n      href?: string;\r\n      as?: string;\r\n      class?: any;\r\n      variant?: ButtonProps["variant"];\r\n      size?: ButtonProps["size"];\r\n    }>(),\r\n    {\r\n      type: "button",\r\n    }\r\n  );\r\n\r\n  const elementType = computed(() => {\r\n    if (props.as) return props.as;\r\n    if (props.href || props.to) return resolveComponent("NuxtLink");\r\n    return "button";\r\n  });\r\n</script>\r\n',
      },
    ],
    composables: [],
    plugins: [],
  },
  {
    name: "Calendar",
    value: "calendar",
    deps: [],
    devDeps: ["@samk-dev/nuxt-vcalendar"],
    nuxtModules: ["@samk-dev/nuxt-vcalendar"],
    instructions: ["You can customize the calendar by adding options to your nuxt.config.js file"],
    files: [
      {
        fileName: "Calendar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ClientOnly>\r\n    <VCalendar\r\n      :trimWeeks="props.trimWeeks || true"\r\n      :is-dark="$colorMode.value == \'dark\'"\r\n      v-bind="$attrs"\r\n    >\r\n      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">\r\n        <slot :name="slot" v-bind="scope"></slot>\r\n      </template>\r\n    </VCalendar>\r\n  </ClientOnly>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Calendar } from "v-calendar";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  interface Props extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]> {}\r\n\r\n  const props = defineProps<Props & { trimWeeks?: boolean }>();\r\n</script>\r\n\r\n<style>\r\n  :root {\r\n    --vc-font-family: var(--font-sans);\r\n    --vc-rounded-full: var(--radius);\r\n    --vc-font-bold: 500;\r\n    --vc-font-semibold: 600;\r\n    --vc-text-lg: 16px;\r\n  }\r\n\r\n  .vc-light,\r\n  .vc-dark {\r\n    --vc-bg: theme("colors.background");\r\n    --vc-border: theme("colors.border");\r\n    --vc-focus-ring: 0 0 0 3px hsl(var(--primary) / 30%);\r\n    --vc-weekday-color: theme("colors.muted.foreground");\r\n    --vc-popover-content-color: theme("colors.popover.foreground");\r\n    --vc-hover-bg: theme("colors.accent.DEFAULT");\r\n    --vc-popover-content-bg: theme("colors.popover.DEFAULT");\r\n    --vc-popover-content-border: theme("colors.border");\r\n    --vc-header-arrow-hover-bg: theme("colors.accent.DEFAULT");\r\n    --vc-weeknumber-color: theme("colors.muted.foreground");\r\n    --vc-nav-hover-bg: theme("colors.accent.DEFAULT");\r\n\r\n    --vc-nav-item-active-color: theme("colors.primary.foreground");\r\n    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");\r\n\r\n    &.vc-attr,\r\n    & .vc-attr {\r\n      --vc-content-color: theme("colors.primary.DEFAULT");\r\n      --vc-highlight-outline-bg: theme("colors.primary.DEFAULT");\r\n      --vc-highlight-outline-border: theme("colors.primary.DEFAULT");\r\n      --vc-highlight-outline-content-color: theme("colors.primary.foreground");\r\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\r\n      --vc-highlight-light-content-color: theme("colors.secondary.foreground");\r\n      --vc-highlight-solid-bg: theme("colors.primary.DEFAULT");\r\n      --vc-highlight-solid-content-color: theme("colors.primary.foreground");\r\n    }\r\n  }\r\n\r\n  .vc-blue {\r\n    --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\r\n    --vc-accent-400: theme("colors.primary.DEFAULT");\r\n    --vc-accent-500: theme("colors.primary.DEFAULT");\r\n    --vc-accent-600: theme("colors.primary.DEFAULT / 70%");\r\n  }\r\n\r\n  .dark {\r\n    .vc-blue {\r\n      --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\r\n      --vc-accent-400: theme("colors.primary.DEFAULT");\r\n      --vc-accent-500: theme("colors.primary.DEFAULT / 70%");\r\n    }\r\n  }\r\n  .vc-header .vc-title {\r\n    @apply font-medium;\r\n  }\r\n  .vc-weekdays {\r\n    @apply my-2 font-normal;\r\n  }\r\n  .vc-day-content,\r\n  .vc-day,\r\n  .vc-highlight {\r\n    @apply h-9 w-9 rounded-md;\r\n  }\r\n  .vc-focus {\r\n    @apply focus-within:shadow-none;\r\n  }\r\n  .vc-day {\r\n    @apply mb-1.5;\r\n  }\r\n\r\n  .vc-base-icon {\r\n    @apply h-4 w-4 stroke-1;\r\n  }\r\n  .vc-header .vc-arrow,\r\n  .vc-nav-arrow {\r\n    @apply h-7 w-7 rounded-md;\r\n    border: 1px solid hsl(var(--border));\r\n  }\r\n  .vc-header .vc-prev,\r\n  .vc-header .vc-next {\r\n    @apply border;\r\n  }\r\n  .weekday-position-1 .vc-highlights {\r\n    @apply rounded-l-md;\r\n  }\r\n  .weekday-position-7 .vc-highlights {\r\n    @apply rounded-r-md;\r\n  }\r\n  .vc-highlight-bg-light {\r\n    @apply bg-accent;\r\n  }\r\n  .vc-nav-item {\r\n    @apply font-medium;\r\n  }\r\n  .vc-header .vc-title-wrapper {\r\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\r\n  }\r\n  .vc-highlights + .vc-day-content {\r\n    @apply hover:bg-accent/5;\r\n  }\r\n</style>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Card",
    value: "card",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Card/Card.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">\r\n    <slot>\r\n      <slot name="header">\r\n        <UiCardHeader>\r\n          <slot name="title">\r\n            <UiCardTitle v-if="title || $slots.title" :title="title" />\r\n          </slot>\r\n          <slot name="description">\r\n            <UiCardDescription\r\n              v-if="description || $slots.description"\r\n              :description="description"\r\n            />\r\n          </slot>\r\n        </UiCardHeader>\r\n      </slot>\r\n      <slot name="content" v-if="content || $slots.content">\r\n        <UiCardContent>\r\n          <div v-html="content"></div>\r\n        </UiCardContent>\r\n      </slot>\r\n      <slot name="footer"></slot>\r\n    </slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Title that should be displayed. Passed to the `CardTitle` component */\r\n        title?: string;\r\n        /** Description that should be displayed. Passed to the `CardDescription` component */\r\n        description?: string;\r\n        /** Content that should be displayed. Passed to the `CardContent` component */\r\n        content?: string;\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "div",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "rounded-lg border bg-card text-card-foreground shadow-sm",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Card/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">\r\n    <slot>\r\n      {{ content }}\r\n    </slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Content to display in the card */\r\n        content?: string;\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    { as: "div" }\r\n  );\r\n  const styles = tv({\r\n    base: "p-6 [&+*]:pt-0",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Card/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\r\n    <slot>\r\n      {{ description }}\r\n    </slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Description to display in the card */\r\n        description?: string;\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "div",\r\n    }\r\n  );\r\n  const styles = tv({\r\n    base: "text-sm text-muted-foreground",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Card/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\r\n    <slot> </slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    { as: "div" }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex items-center p-6 ",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Card/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\r\n    <slot></slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    { as: "div" }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex flex-col space-y-1.5 p-6 [&+*]:pt-0",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Card/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">\r\n    <slot>\r\n      {{ title }}\r\n    </slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Title to display in the card */\r\n        title?: string;\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "h3",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "text-xl font-semibold leading-none tracking-tight",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Checkbox",
    value: "checkbox",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Checkbox/Checkbox.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <CheckboxRoot v-bind="forwarded" :class="styles({ class: props.class })">\r\n    <slot>\r\n      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">\r\n        <UiCheckboxIndicator :checked="checked" :icon="icon" />\r\n      </Transition>\r\n    </slot>\r\n  </CheckboxRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { CheckboxRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    CheckboxRootProps & {\r\n      /** Custom class(es) to add to the element */\r\n      class?: any;\r\n      /**\r\n       * ID of the checkbox\r\n       */\r\n      id?: string;\r\n      /**\r\n       * Icon to display when the checkbox is checked\r\n       * @default lucide:check\r\n       */\r\n      icon?: string;\r\n    }\r\n  >();\r\n\r\n  const emit = defineEmits<CheckboxRootEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emit);\r\n\r\n  const styles = tv({\r\n    base: "peer h-[18px] w-[18px] shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Checkbox/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <CheckboxIndicator\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'icon\')"\r\n  >\r\n    <slot>\r\n      <Icon :name="checked == \'indeterminate\' ? \'lucide:minus\' : icon" class="h-4 w-4" />\r\n    </slot>\r\n  </CheckboxIndicator>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { CheckboxIndicator } from "radix-vue";\r\n  import type { CheckboxIndicatorProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      CheckboxIndicatorProps & {\r\n        /** The state of the checkbox */\r\n        checked?: boolean | "indeterminate";\r\n        /** Custom class(es) to add to the element */\r\n        class?: any;\r\n        /**\r\n         * Icon to display when the checkbox is checked\r\n         * @default lucide:check\r\n         */\r\n        icon?: string;\r\n      }\r\n    >(),\r\n    {\r\n      icon: "lucide:check",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex items-center justify-center text-current",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Collapsible",
    value: "collapsible",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    instructions: ["Remember to add the collapsile animations to your tailwind.config.js"],
    files: [
      {
        fileName: "Collapsible/Collapsible.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleRoot v-bind="forwarded">\n    <slot></slot>\n  </CollapsibleRoot>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleRoot, useForwardPropsEmits } from "radix-vue";\n  import type { CollapsibleRootEmits, CollapsibleRootProps } from "radix-vue";\n\n  const props = defineProps<CollapsibleRootProps>();\n\n  const emit = defineEmits<CollapsibleRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Collapsible/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleContent :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </CollapsibleContent>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleContent } from "radix-vue";\n  import type { CollapsibleContentProps } from "radix-vue";\n\n  const props = defineProps<\n    CollapsibleContentProps & {\n      /** Customer class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "overflow-hidden transition will-change-auto data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",\n  });\n</script>\n',
      },
      {
        fileName: "Collapsible/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <CollapsibleTrigger v-bind="forwarded">\n    <slot></slot>\n  </CollapsibleTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { CollapsibleTrigger, useForwardProps } from "radix-vue";\n  import type { CollapsibleTriggerProps } from "radix-vue";\n\n  const props = defineProps<CollapsibleTriggerProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Command",
    value: "command",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Command/Cancel.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxCancel v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot>\n      <Icon name="lucide:x" class="h-4 w-4 text-muted-foreground/70" />\n    </slot>\n  </ComboboxCancel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxCancel } from "radix-vue";\n  import type { ComboboxCancelProps } from "radix-vue";\n\n  const props = defineProps<ComboboxCancelProps & { class?: any }>();\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Command.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxRoot v-bind="forwarded" :open="true" :class="styles({ class: props.class })">\n    <slot></slot>\n  </ComboboxRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxRootEmits, ComboboxRootProps } from "radix-vue";\n\n  const props = defineProps<ComboboxRootProps & { class?: any }>();\n  const emits = defineEmits<ComboboxRootEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",\n  });\n</script>\n',
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
          '<template>\n  <ComboboxEmpty :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </ComboboxEmpty>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxEmpty } from "radix-vue";\n  import type { ComboboxEmptyProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxEmptyProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "py-6 text-center text-sm",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxGroup\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'heading\')"\n  >\n    <slot name="heading">\n      <UiCommandLabel v-if="heading" :label="heading" />\n    </slot>\n    <slot> </slot>\n  </ComboboxGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxGroup } from "radix-vue";\n  import type { ComboboxGroupProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxGroupProps & {\n      /**The heading for the group */\n      heading?: any;\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "overflow-hidden p-1 text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="flex items-center border-b px-3" cmdk-input-wrapper="">\n    <Icon :name="icon || \'lucide:search\'" class="mr-2 h-4 w-4 shrink-0 opacity-50" />\n    <ComboboxInput\n      v-bind="$attrs"\n      :type="type ?? \'text\'"\n      :disabled="disabled"\n      auto-focus\n      :class="styles({ class: props.class })"\n    />\n    <UiCommandCancel v-if="showCancel" />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxInput } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<{\n    /**Custom class(es) to add to the input element*/\n    class?: any;\n    /**The icon to render*/\n    icon?: string;\n    /**The input type*/\n    type?: string;\n    /**Whether the input is disabled*/\n    disabled?: boolean;\n    /**Whether to show the cancel button*/\n    showCancel?: boolean;\n  }>();\n\n  const styles = tv({\n    base: "flex h-11 w-full rounded-md bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
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
          '<template>\n  <ComboboxLabel\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'label\')"\n  >\n    <slot>{{ label }}</slot>\n  </ComboboxLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxLabel } from "radix-vue";\n  import type { ComboboxLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxLabelProps & {\n      /**\n       * Class(es) to pass to the ComboboxLabel component.\n       */\n      class?: any;\n      /**\n       * The label to display.\n       */\n      label?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "px-2 py-1.5 text-xs font-medium text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Command/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot></slot>\n  </ComboboxContent>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxContent, useForwardPropsEmits } from "radix-vue";\n  import type { ComboboxContentEmits, ComboboxContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    ComboboxContentProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<ComboboxContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "max-h-[300px] overflow-y-auto overflow-x-hidden",\n  });\n</script>\n',
      },
      {
        fileName: "Command/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ComboboxSeparator :as-child="asChild" :class="styles({ class: props.class })">\n    <slot></slot>\n  </ComboboxSeparator>\n</template>\n\n<script lang="ts" setup>\n  import { ComboboxSeparator, useForwardProps } from "radix-vue";\n  import type { ComboboxSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ComboboxSeparatorProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "-mx-1 h-px bg-border",\n  });\n</script>\n',
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
    name: "Context Menu",
    value: "context-menu",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "ContextMenu/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuArrow v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })" />\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuArrow } from "radix-vue";\n  import type { ContextMenuArrowProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuArrowProps & {\n      /** Custom class(es) to add to teh arrow */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "border bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/CheckboxItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuCheckboxItem\n    v-bind="{ ...reactiveOmit(props, \'class\', \'shortcut\', \'title\'), ...useEmitAsProps(emits) }"\n    :class="styles({ class: props.class })"\n  >\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\n      <UiContextMenuItemIndicator icon="lucide:check" />\n    </span>\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuCheckboxItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuCheckboxItem, useEmitAsProps } from "radix-vue";\n  import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuCheckboxItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /**The shortcut for the item */\n      shortcut?: string;\n      /**The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuCheckboxItemEmits>();\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot></slot>\n    </ContextMenuContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuContent, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuContentEmits, ContextMenuContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      ContextMenuContentProps & {\n        /** Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 5,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ContextMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuRoot v-bind="forwarded">\n    <slot></slot>\n  </ContextMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuRootEmits, ContextMenuRootProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuRootProps>();\n  const emit = defineEmits<ContextMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "ContextMenu/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuGroup v-bind="props">\n    <slot></slot>\n  </ContextMenuGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuGroup } from "radix-vue";\n  import type { ContextMenuGroupProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuGroupProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuItem\n    v-bind="{\n      ...reactiveOmit(props, \'class\', \'inset\', \'shortcut\', \'title\'),\n      ...useEmitAsProps(emits),\n    }"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <slot name="shortcut">\n      <UiContextMenuShortcut v-if="shortcut">{{ shortcut }}</UiContextMenuShortcut>\n    </slot>\n  </ContextMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItem, useEmitAsProps } from "radix-vue";\n  import type { ContextMenuItemEmits, ContextMenuItemProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuItemProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The shortcut for the item */\n      shortcut?: string;\n      /** The title for the item */\n      title?: string;\n    }\n  >();\n\n  const emits = defineEmits<ContextMenuItemEmits>();\n\n  const styles = tv({\n    base: "relative flex cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuItemIndicator v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n  </ContextMenuItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuItemIndicator } from "radix-vue";\n  import type { ContextMenuItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuItemIndicatorProps & {\n      /** The icon to display */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "ContextMenu/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuLabel\n    :class="styles({ inset, class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'inset\', \'label\')"\n  >\n    <slot>{{ label }}</slot>\n  </ContextMenuLabel>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuLabel } from "radix-vue";\n  import type { ContextMenuLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuLabelProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The label for the item */\n      label?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",\n    variants: {\n      inset: { true: "pl-8" },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuPortal v-bind="props">\n    <slot></slot>\n  </ContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuPortal } from "radix-vue";\n  import type { ContextMenuPortalProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuPortalProps>();\n</script>\n',
      },
      {
        fileName: "ContextMenu/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuRadioGroup v-bind="forwarded">\n    <slot></slot>\n  </ContextMenuRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuRadioGroup, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuRadioGroupEmits, ContextMenuRadioGroupProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuRadioGroupProps>();\n\n  const emits = defineEmits<ContextMenuRadioGroupEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
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
          '<template>\n  <ContextMenuSub v-bind="forwarded">\n    <slot></slot>\n  </ContextMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSub, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuSubEmits, ContextMenuSubProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuSubProps>();\n  const emits = defineEmits<ContextMenuSubEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiContextMenuPortal>\n    <ContextMenuSubContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot></slot>\n    </ContextMenuSubContent>\n  </UiContextMenuPortal>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubContent, useForwardPropsEmits } from "radix-vue";\n  import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      ContextMenuSubContentProps & {\n        /**Custom class(es) to add to the element */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<ContextMenuSubContentEmits>();\n\n  const styles = tv({\n    base: "z-50 min-w-[100px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "ContextMenu/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuSubTrigger\n    v-bind="reactiveOmit(props, \'class\', \'inset\', \'icon\', \'title\')"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon class="ml-auto h-4 w-4" :name="icon || \'lucide:chevron-right\'" />\n  </ContextMenuSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuSubTrigger } from "radix-vue";\n  import type { ContextMenuSubTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    ContextMenuSubTriggerProps & {\n      /**Custom class(es) to add to the element */\n      class?: any;\n      /** Wether an indentation should be added to the item or not */\n      inset?: boolean;\n      /** The icon to display */\n      icon?: string;\n      /** The title for the item */\n      title?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ContextMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ContextMenuTrigger v-bind="props">\n    <slot></slot>\n  </ContextMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { ContextMenuTrigger } from "radix-vue";\n  import type { ContextMenuTriggerProps } from "radix-vue";\n\n  const props = defineProps<ContextMenuTriggerProps>();\n</script>\n',
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
    devDeps: [],
    nuxtModules: [],
    plugins: [
      {
        fileName: "datatables.client.ts",
        dirPath: "plugins",
        fileContent:
          'import DataTablesCore from "datatables.net";\r\nimport DataTable from "datatables.net-vue3";\r\nimport JSZip from "jszip";\r\n\r\nimport "datatables.net-buttons-dt";\r\nimport "datatables.net-buttons/js/buttons.colVis.mjs";\r\nimport "datatables.net-buttons/js/buttons.html5.mjs";\r\nimport "datatables.net-buttons/js/buttons.print.mjs";\r\nimport "datatables.net-responsive-dt";\r\nimport "datatables.net-searchbuilder-dt";\r\nimport "datatables.net-select-dt";\r\n\r\n// @ts-ignore\r\nwindow.JSZip = JSZip;\r\n\r\nDataTable.use(DataTablesCore);\r\n\r\nexport default defineNuxtPlugin((nuxtApp) => {\r\n  nuxtApp.vueApp.component("DataTable", DataTable);\r\n});\r\n',
      },
    ],
    files: [
      {
        fileName: "Datatable.client.vue",
        dirPath: "components/UI",
        fileContent:
          "<template>\r\n  <DataTable ref=\"table\" :data=\"data\" :class=\"props.class\" :options=\"options\">\r\n    <slot></slot>\r\n  </DataTable>\r\n</template>\r\n\r\n<script lang=\"ts\" setup generic=\"T\">\r\n  import type DataTableRef from \"datatables.net\";\r\n  import type { Config } from \"datatables.net/types/types\";\r\n\r\n  const table = shallowRef<{ dt: InstanceType<typeof DataTableRef<T[]>> } | null>(null);\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      data?: Config[\"data\"];\r\n      class?: any;\r\n      options?: Config;\r\n    }>(),\r\n    {\r\n      data: () => [],\r\n      class: \"nowrap hover order-column row-border stripe display\",\r\n      options: () => ({}),\r\n    }\r\n  );\r\n\r\n  const emits = defineEmits<{\r\n    ready: [any];\r\n  }>();\r\n\r\n  onMounted(() => {\r\n    nextTick(() => {\r\n      emits(\"ready\", table.value?.dt);\r\n    });\r\n  });\r\n</script>\r\n\r\n<style>\r\n  :root {\r\n    --dt-row-selected: 262.1, 83.3%, 57.8%;\r\n    --dt-row-selected-text: 210, 20%, 98%;\r\n    --dt-row-selected-link: 262.1, 83.3%, 57.8%;\r\n    --dt-row-stripe: 0, 0%, 100%;\r\n    --dt-row-hover: 0, 0%, 100%;\r\n    --dt-column-ordering: 0, 0%, 100%;\r\n    --dt-border: 220, 13%, 91%;\r\n    --dt-foreground: 224, 71.4%, 4.1%;\r\n  }\r\n\r\n  .dark {\r\n    --dt-row-selected: 263.4, 70%, 50.4%;\r\n    --dt-row-selected-text: 210, 20%, 98%;\r\n    --dt-row-selected-link: 263.4, 70%, 50.4%;\r\n    --dt-row-stripe: 224, 71.4%, 4.1%;\r\n    --dt-row-hover: 224, 71.4%, 4.1%;\r\n    --dt-column-ordering: 224, 71.4%, 4.1%;\r\n    --dt-border: 215, 27.9%, 16.9%;\r\n    --dt-foreground: 224, 71.4%, 4.1%;\r\n  }\r\n\r\n  table.dataTable td.dt-control {\r\n    text-align: center;\r\n    cursor: pointer;\r\n  }\r\n  table.dataTable td.dt-control:before {\r\n    display: inline-block;\r\n    color: hsla(var(--dt-foreground), 0.5);\r\n    content: \"►\";\r\n  }\r\n  table.dataTable tr.dt-hasChild td.dt-control:before {\r\n    content: \"▼\";\r\n  }\r\n\r\n  table.dataTable thead > tr > th.sorting,\r\n  table.dataTable thead > tr > th.sorting_asc,\r\n  table.dataTable thead > tr > th.sorting_desc,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled,\r\n  table.dataTable thead > tr > th.sorting_desc_disabled,\r\n  table.dataTable thead > tr > td.sorting,\r\n  table.dataTable thead > tr > td.sorting_asc,\r\n  table.dataTable thead > tr > td.sorting_desc,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled {\r\n    @apply relative cursor-pointer pr-7;\r\n  }\r\n  table.dataTable thead > tr > th.sorting:before,\r\n  table.dataTable thead > tr > th.sorting:after,\r\n  table.dataTable thead > tr > th.sorting_asc:before,\r\n  table.dataTable thead > tr > th.sorting_asc:after,\r\n  table.dataTable thead > tr > th.sorting_desc:before,\r\n  table.dataTable thead > tr > th.sorting_desc:after,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\r\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\r\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\r\n  table.dataTable thead > tr > td.sorting:before,\r\n  table.dataTable thead > tr > td.sorting:after,\r\n  table.dataTable thead > tr > td.sorting_asc:before,\r\n  table.dataTable thead > tr > td.sorting_asc:after,\r\n  table.dataTable thead > tr > td.sorting_desc:before,\r\n  table.dataTable thead > tr > td.sorting_desc:after,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled:before,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled:after {\r\n    @apply absolute right-2.5 block text-xs leading-3 opacity-25;\r\n  }\r\n  table.dataTable thead > tr > th.sorting:before,\r\n  table.dataTable thead > tr > th.sorting_asc:before,\r\n  table.dataTable thead > tr > th.sorting_desc:before,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\r\n  table.dataTable thead > tr > th.sorting_desc_disabled:before,\r\n  table.dataTable thead > tr > td.sorting:before,\r\n  table.dataTable thead > tr > td.sorting_asc:before,\r\n  table.dataTable thead > tr > td.sorting_desc:before,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled:before,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled:before {\r\n    @apply bottom-[43%] h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-up.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-up.svg?color=white')];\r\n  }\r\n  table.dataTable thead > tr > th.sorting:after,\r\n  table.dataTable thead > tr > th.sorting_asc:after,\r\n  table.dataTable thead > tr > th.sorting_desc:after,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled:after,\r\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\r\n  table.dataTable thead > tr > td.sorting:after,\r\n  table.dataTable thead > tr > td.sorting_asc:after,\r\n  table.dataTable thead > tr > td.sorting_desc:after,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled:after,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled:after {\r\n    @apply top-[43%] h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];\r\n  }\r\n  table.dataTable thead > tr > th.sorting_asc:before,\r\n  table.dataTable thead > tr > th.sorting_desc:after,\r\n  table.dataTable thead > tr > td.sorting_asc:before,\r\n  table.dataTable thead > tr > td.sorting_desc:after {\r\n    @apply opacity-80;\r\n  }\r\n  table.dataTable thead > tr > th.sorting_desc_disabled:after,\r\n  table.dataTable thead > tr > th.sorting_asc_disabled:before,\r\n  table.dataTable thead > tr > td.sorting_desc_disabled:after,\r\n  table.dataTable thead > tr > td.sorting_asc_disabled:before {\r\n    @apply hidden;\r\n  }\r\n  table.dataTable thead > tr > th:active,\r\n  table.dataTable thead > tr > td:active {\r\n    @apply outline-none;\r\n  }\r\n\r\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:before,\r\n  div.dataTables_scrollBody > table.dataTable > thead > tr > th:after,\r\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:before,\r\n  div.dataTables_scrollBody > table.dataTable > thead > tr > td:after {\r\n    @apply hidden;\r\n  }\r\n\r\n  div.dataTables_processing {\r\n    @apply absolute left-[50%] top-[50%] ml-[-100px] mt-[-26px] w-[200px] p-0.5 text-center;\r\n  }\r\n  div.dataTables_processing > div:last-child {\r\n    @apply relative mx-auto my-4 h-4 w-20;\r\n  }\r\n  div.dataTables_processing > div:last-child > div {\r\n    @apply absolute top-0 h-3.5 w-3.5 rounded-full;\r\n    background: hsl(var(--dt-row-selected));\r\n    animation-timing-function: cubic-bezier(0, 1, 1, 0);\r\n  }\r\n  div.dataTables_processing > div:last-child > div:nth-child(1) {\r\n    left: 8px;\r\n    animation: datatables-loader-1 0.6s infinite;\r\n  }\r\n  div.dataTables_processing > div:last-child > div:nth-child(2) {\r\n    left: 8px;\r\n    animation: datatables-loader-2 0.6s infinite;\r\n  }\r\n  div.dataTables_processing > div:last-child > div:nth-child(3) {\r\n    left: 32px;\r\n    animation: datatables-loader-2 0.6s infinite;\r\n  }\r\n  div.dataTables_processing > div:last-child > div:nth-child(4) {\r\n    left: 56px;\r\n    animation: datatables-loader-3 0.6s infinite;\r\n  }\r\n\r\n  @keyframes datatables-loader-1 {\r\n    0% {\r\n      transform: scale(0);\r\n    }\r\n    100% {\r\n      transform: scale(1);\r\n    }\r\n  }\r\n  @keyframes datatables-loader-3 {\r\n    0% {\r\n      transform: scale(1);\r\n    }\r\n    100% {\r\n      transform: scale(0);\r\n    }\r\n  }\r\n  @keyframes datatables-loader-2 {\r\n    0% {\r\n      transform: translate(0, 0);\r\n    }\r\n    100% {\r\n      transform: translate(24px, 0);\r\n    }\r\n  }\r\n  table.dataTable.nowrap th,\r\n  table.dataTable.nowrap td {\r\n    white-space: nowrap;\r\n  }\r\n  table.dataTable th.dt-left,\r\n  table.dataTable td.dt-left {\r\n    text-align: left;\r\n  }\r\n  table.dataTable th.dt-center,\r\n  table.dataTable td.dt-center,\r\n  table.dataTable td.dataTables_empty {\r\n    text-align: center;\r\n  }\r\n  table.dataTable th.dt-right,\r\n  table.dataTable td.dt-right {\r\n    text-align: right;\r\n  }\r\n  table.dataTable th.dt-justify,\r\n  table.dataTable td.dt-justify {\r\n    text-align: justify;\r\n  }\r\n  table.dataTable th.dt-nowrap,\r\n  table.dataTable td.dt-nowrap {\r\n    white-space: nowrap;\r\n  }\r\n  table.dataTable thead th,\r\n  table.dataTable thead td,\r\n  table.dataTable tfoot th,\r\n  table.dataTable tfoot td {\r\n    text-align: left;\r\n  }\r\n  table.dataTable thead th.dt-head-left,\r\n  table.dataTable thead td.dt-head-left,\r\n  table.dataTable tfoot th.dt-head-left,\r\n  table.dataTable tfoot td.dt-head-left {\r\n    text-align: left;\r\n  }\r\n  table.dataTable thead th.dt-head-center,\r\n  table.dataTable thead td.dt-head-center,\r\n  table.dataTable tfoot th.dt-head-center,\r\n  table.dataTable tfoot td.dt-head-center {\r\n    text-align: center;\r\n  }\r\n  table.dataTable thead th.dt-head-right,\r\n  table.dataTable thead td.dt-head-right,\r\n  table.dataTable tfoot th.dt-head-right,\r\n  table.dataTable tfoot td.dt-head-right {\r\n    text-align: right;\r\n  }\r\n  table.dataTable thead th.dt-head-justify,\r\n  table.dataTable thead td.dt-head-justify,\r\n  table.dataTable tfoot th.dt-head-justify,\r\n  table.dataTable tfoot td.dt-head-justify {\r\n    text-align: justify;\r\n  }\r\n  table.dataTable thead th.dt-head-nowrap,\r\n  table.dataTable thead td.dt-head-nowrap,\r\n  table.dataTable tfoot th.dt-head-nowrap,\r\n  table.dataTable tfoot td.dt-head-nowrap {\r\n    white-space: nowrap;\r\n  }\r\n  table.dataTable tbody th.dt-body-left,\r\n  table.dataTable tbody td.dt-body-left {\r\n    text-align: left;\r\n  }\r\n  table.dataTable tbody th.dt-body-center,\r\n  table.dataTable tbody td.dt-body-center {\r\n    text-align: center;\r\n  }\r\n  table.dataTable tbody th.dt-body-right,\r\n  table.dataTable tbody td.dt-body-right {\r\n    text-align: right;\r\n  }\r\n  table.dataTable tbody th.dt-body-justify,\r\n  table.dataTable tbody td.dt-body-justify {\r\n    text-align: justify;\r\n  }\r\n  table.dataTable tbody th.dt-body-nowrap,\r\n  table.dataTable tbody td.dt-body-nowrap {\r\n    white-space: nowrap;\r\n  }\r\n\r\n  /* Table Styles */\r\n\r\n  table.dataTable {\r\n    @apply w-full table-auto border-collapse;\r\n  }\r\n\r\n  /* Table header styles */\r\n  table.dataTable thead th,\r\n  table.dataTable tfoot th {\r\n    @apply text-left text-sm font-medium text-muted-foreground;\r\n  }\r\n\r\n  table.dataTable > thead > tr > th {\r\n    @apply border-b border-t-0 px-6 py-3;\r\n  }\r\n  table.dataTable > thead > tr > td {\r\n    @apply border-b px-6 py-3 text-sm;\r\n  }\r\n  table.dataTable > thead > tr > th:active,\r\n  table.dataTable > thead > tr > td:active {\r\n    @apply outline-none;\r\n  }\r\n  table.dataTable > tfoot > tr > th,\r\n  table.dataTable > tfoot > tr > td {\r\n    @apply border-t px-6 py-3;\r\n  }\r\n  table.dataTable tbody tr {\r\n    @apply bg-transparent;\r\n  }\r\n  table.dataTable tbody tr.selected > * {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable tbody tr.selected a {\r\n    @apply text-primary;\r\n  }\r\n  table.dataTable tbody th,\r\n  table.dataTable tbody td {\r\n    @apply px-6 py-3 text-sm;\r\n  }\r\n  table.dataTable.row-border > tbody > tr > th,\r\n  table.dataTable.row-border > tbody > tr > td,\r\n  table.dataTable.display > tbody > tr > th,\r\n  table.dataTable.display > tbody > tr > td {\r\n    @apply border-t;\r\n  }\r\n  table.dataTable.row-border > tbody > tr:first-child > th,\r\n  table.dataTable.row-border > tbody > tr:first-child > td,\r\n  table.dataTable.display > tbody > tr:first-child > th,\r\n  table.dataTable.display > tbody > tr:first-child > td {\r\n    @apply border-t-0;\r\n  }\r\n  table.dataTable.row-border > tbody > tr.selected + tr.selected > td,\r\n  table.dataTable.display > tbody > tr.selected + tr.selected > td {\r\n    @apply border-t-primary/30;\r\n  }\r\n  table.dataTable.cell-border > tbody > tr > th,\r\n  table.dataTable.cell-border > tbody > tr > td {\r\n    @apply border-r border-t;\r\n  }\r\n  table.dataTable.cell-border > tbody > tr > th:first-child,\r\n  table.dataTable.cell-border > tbody > tr > td:first-child {\r\n    @apply border-l;\r\n  }\r\n  table.dataTable.cell-border > tbody > tr:first-child > th,\r\n  table.dataTable.cell-border > tbody > tr:first-child > td {\r\n    @apply border-t-0;\r\n  }\r\n  table.dataTable.stripe > tbody > tr.odd > *,\r\n  table.dataTable.display > tbody > tr.odd > * {\r\n    @apply bg-muted/50;\r\n  }\r\n  table.dataTable.stripe > tbody > tr.odd.selected > *,\r\n  table.dataTable.display > tbody > tr.odd.selected > * {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.hover > tbody > tr:hover > *,\r\n  table.dataTable.display > tbody > tr:hover > * {\r\n    @apply bg-muted;\r\n  }\r\n  table.dataTable.hover > tbody > tr.selected:hover > *,\r\n  table.dataTable.display > tbody > tr.selected:hover > * {\r\n    @apply !bg-primary/10;\r\n  }\r\n  table.dataTable.order-column > tbody tr > .sorting_1,\r\n  table.dataTable.order-column > tbody tr > .sorting_2,\r\n  table.dataTable.order-column > tbody tr > .sorting_3,\r\n  table.dataTable.display > tbody tr > .sorting_1,\r\n  table.dataTable.display > tbody tr > .sorting_2,\r\n  table.dataTable.display > tbody tr > .sorting_3 {\r\n    @apply bg-muted;\r\n  }\r\n  table.dataTable.order-column > tbody tr.selected > .sorting_1,\r\n  table.dataTable.order-column > tbody tr.selected > .sorting_2,\r\n  table.dataTable.order-column > tbody tr.selected > .sorting_3,\r\n  table.dataTable.display > tbody tr.selected > .sorting_1,\r\n  table.dataTable.display > tbody tr.selected > .sorting_2,\r\n  table.dataTable.display > tbody tr.selected > .sorting_3 {\r\n    @apply !bg-primary/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd > .sorting_1,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_1 {\r\n    @apply bg-muted/50;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd > .sorting_2,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_2 {\r\n    @apply bg-muted/30;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd > .sorting_3,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_3 {\r\n    @apply bg-muted/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_1,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_1 {\r\n    @apply bg-muted/50;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_2,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_2 {\r\n    @apply bg-muted/30;\r\n  }\r\n  table.dataTable.display > tbody > tr.odd.selected > .sorting_3,\r\n  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_3 {\r\n    @apply bg-muted/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.even > .sorting_1,\r\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_1 {\r\n    @apply bg-muted/50;\r\n  }\r\n  table.dataTable.display > tbody > tr.even > .sorting_2,\r\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_2 {\r\n    @apply bg-muted/30;\r\n  }\r\n  table.dataTable.display > tbody > tr.even > .sorting_3,\r\n  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_3 {\r\n    @apply bg-muted/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.even.selected > .sorting_1,\r\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_1 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.even.selected > .sorting_2,\r\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_2 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.display > tbody > tr.even.selected > .sorting_3,\r\n  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_3 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.display tbody tr:hover > .sorting_1,\r\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {\r\n    @apply bg-muted;\r\n  }\r\n  table.dataTable.display tbody tr:hover > .sorting_2,\r\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {\r\n    @apply bg-muted;\r\n  }\r\n  table.dataTable.display tbody tr:hover > .sorting_3,\r\n  table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {\r\n    @apply bg-muted;\r\n  }\r\n  table.dataTable.display tbody tr:hover.selected > .sorting_1,\r\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.display tbody tr:hover.selected > .sorting_2,\r\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.display tbody tr:hover.selected > .sorting_3,\r\n  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {\r\n    @apply bg-primary/10;\r\n  }\r\n  table.dataTable.no-footer {\r\n    @apply border-b-0;\r\n  }\r\n  table.dataTable.compact thead th,\r\n  table.dataTable.compact thead td,\r\n  table.dataTable.compact tfoot th,\r\n  table.dataTable.compact tfoot td,\r\n  table.dataTable.compact tbody th,\r\n  table.dataTable.compact tbody td {\r\n    @apply px-4 py-2;\r\n  }\r\n\r\n  table.dataTable th,\r\n  table.dataTable td {\r\n    @apply box-content border-y;\r\n  }\r\n\r\n  table.dataTable tr:last-child td {\r\n    @apply !border-b-0;\r\n  }\r\n\r\n  /* Control feature layout */\r\n  .dataTables_wrapper {\r\n    @apply w-full overflow-x-auto;\r\n  }\r\n\r\n  /* Export button styles */\r\n  .dataTables_wrapper .dt-buttons {\r\n    @apply inline-flex items-center gap-2;\r\n    button {\r\n      @apply inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\r\n    }\r\n  }\r\n\r\n  /*  Copy modal */\r\n  .dt-button-info {\r\n    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur;\r\n  }\r\n\r\n  .dataTables_wrapper .dataTables_length {\r\n    label {\r\n      @apply inline-flex items-center gap-2 text-sm font-normal text-muted-foreground;\r\n      select {\r\n        @apply h-9 w-[70px] cursor-pointer rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;\r\n      }\r\n    }\r\n  }\r\n  .dataTables_wrapper .dataTables_filter {\r\n    label {\r\n      @apply inline-flex w-full cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;\r\n      input {\r\n        @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input sm:text-sm;\r\n      }\r\n    }\r\n  }\r\n  .dataTables_wrapper .dataTables_info {\r\n    @apply flex items-center gap-3 text-sm !text-muted-foreground;\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate {\r\n    .paginate_button {\r\n      @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\r\n    }\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current,\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {\r\n    @apply bg-muted;\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {\r\n    @apply pointer-events-none opacity-50;\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button:hover {\r\n    @apply bg-muted;\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate .paginate_button:active {\r\n    @apply bg-muted;\r\n  }\r\n  .dataTables_wrapper .dataTables_paginate .ellipsis {\r\n    @apply inline-flex h-8 min-w-[32px] items-start justify-center text-sm;\r\n  }\r\n  .dataTables_wrapper .dataTables_scroll {\r\n    clear: both;\r\n  }\r\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {\r\n    -webkit-overflow-scrolling: touch;\r\n  }\r\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th,\r\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td,\r\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th,\r\n  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {\r\n    vertical-align: middle;\r\n  }\r\n  .dataTables_wrapper\r\n    .dataTables_scroll\r\n    div.dataTables_scrollBody\r\n    > table\r\n    > thead\r\n    > tr\r\n    > th\r\n    > div.dataTables_sizing,\r\n  .dataTables_wrapper\r\n    .dataTables_scroll\r\n    div.dataTables_scrollBody\r\n    > table\r\n    > thead\r\n    > tr\r\n    > td\r\n    > div.dataTables_sizing,\r\n  .dataTables_wrapper\r\n    .dataTables_scroll\r\n    div.dataTables_scrollBody\r\n    > table\r\n    > tbody\r\n    > tr\r\n    > th\r\n    > div.dataTables_sizing,\r\n  .dataTables_wrapper\r\n    .dataTables_scroll\r\n    div.dataTables_scrollBody\r\n    > table\r\n    > tbody\r\n    > tr\r\n    > td\r\n    > div.dataTables_sizing {\r\n    height: 0;\r\n    overflow: hidden;\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n  }\r\n  .dataTables_wrapper.no-footer .dataTables_scrollBody {\r\n    @apply border-b;\r\n  }\r\n  .dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,\r\n  .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {\r\n    border-bottom: none;\r\n  }\r\n  .dataTables_wrapper:after {\r\n    visibility: hidden;\r\n    display: block;\r\n    content: \"\";\r\n    clear: both;\r\n    height: 0;\r\n  }\r\n\r\n  /* \r\n  responsive styles\r\n   */\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty {\r\n    cursor: default !important;\r\n  }\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child:before,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child:before,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty:before {\r\n    display: none !important;\r\n  }\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control {\r\n    cursor: pointer;\r\n  }\r\n\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {\r\n    @apply mr-2 inline-flex h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-right.svg')] bg-contain bg-center bg-no-repeat pb-[3px] content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-right.svg?color=white')];\r\n  }\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control.arrow-right::before,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control.arrow-right::before {\r\n    content: \"◄\";\r\n  }\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,\r\n  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before {\r\n    @apply mr-2 inline-block h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];\r\n  }\r\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > td.dtr-control,\r\n  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > th.dtr-control {\r\n    padding-left: 0.333em;\r\n  }\r\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control,\r\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control,\r\n  table.dataTable.dtr-column > tbody > tr > td.control,\r\n  table.dataTable.dtr-column > tbody > tr > th.control {\r\n    cursor: pointer;\r\n  }\r\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,\r\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,\r\n  table.dataTable.dtr-column > tbody > tr > td.control:before,\r\n  table.dataTable.dtr-column > tbody > tr > th.control:before {\r\n    @apply mr-2 inline-flex h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-right.svg')] bg-contain bg-center bg-no-repeat pb-[3px] content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-right.svg?color=white')];\r\n  }\r\n  table.dataTable.dtr-column > tbody > tr > td.dtr-control.arrow-right::before,\r\n  table.dataTable.dtr-column > tbody > tr > th.dtr-control.arrow-right::before,\r\n  table.dataTable.dtr-column > tbody > tr > td.control.arrow-right::before,\r\n  table.dataTable.dtr-column > tbody > tr > th.control.arrow-right::before {\r\n    content: \"◄\";\r\n  }\r\n  table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,\r\n  table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,\r\n  table.dataTable.dtr-column > tbody > tr.parent td.control:before,\r\n  table.dataTable.dtr-column > tbody > tr.parent th.control:before {\r\n    @apply mr-2 inline-block h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];\r\n  }\r\n\r\n  table.dataTable > tbody td.child {\r\n    @apply p-0;\r\n  }\r\n  table.dataTable > tbody > tr.child:hover,\r\n  table.dataTable > tbody > tr.child:hover > td.child {\r\n    background: transparent !important;\r\n  }\r\n  table.dataTable > tbody > tr.child ul.dtr-details {\r\n    @apply m-0 block w-full list-none p-0;\r\n  }\r\n  table.dataTable > tbody > tr.child ul.dtr-details > li {\r\n    @apply border-b p-3 px-7 hover:bg-muted;\r\n  }\r\n\r\n  table.dataTable > tbody > tr.child ul.dtr-details > li:last-child {\r\n    @apply border-b-0;\r\n  }\r\n  table.dataTable > tbody > tr.child span.dtr-title {\r\n    @apply inline-block min-w-[80px] font-bold;\r\n  }\r\n  div.dtr-modal {\r\n    position: fixed;\r\n    box-sizing: border-box;\r\n    top: 0;\r\n    left: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n    z-index: 100;\r\n    padding: 10em 1em;\r\n  }\r\n  div.dtr-modal div.dtr-modal-display {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: 50%;\r\n    height: fit-content;\r\n    max-height: 75%;\r\n    overflow: auto;\r\n    margin: auto;\r\n    z-index: 102;\r\n    overflow: auto;\r\n    background-color: #f5f5f7;\r\n    border: 1px solid black;\r\n    border-radius: 0.5em;\r\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);\r\n  }\r\n  div.dtr-modal div.dtr-modal-content {\r\n    position: relative;\r\n    padding: 2.5em;\r\n  }\r\n  div.dtr-modal div.dtr-modal-content h2 {\r\n    margin-top: 0;\r\n  }\r\n  div.dtr-modal div.dtr-modal-close {\r\n    position: absolute;\r\n    top: 6px;\r\n    right: 6px;\r\n    width: 22px;\r\n    height: 22px;\r\n    text-align: center;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n    z-index: 12;\r\n  }\r\n  div.dtr-modal div.dtr-modal-background {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    z-index: 101;\r\n    background: rgba(0, 0, 0, 0.6);\r\n  }\r\n\r\n  /* Search Builder Styles */\r\n  div.dt-button-collection {\r\n    overflow: visible !important;\r\n    z-index: 2002 !important;\r\n  }\r\n  div.dt-button-collection div.dtsb-searchBuilder {\r\n    padding-left: 1em !important;\r\n    padding-right: 1em !important;\r\n  }\r\n  div.dt-button-collection.dtb-collection-closeable div.dtsb-titleRow {\r\n    padding-right: 40px;\r\n  }\r\n  .dtsb-greyscale {\r\n    @apply !border;\r\n  }\r\n  div.dtsb-logicContainer .dtsb-greyscale {\r\n    border: none !important;\r\n  }\r\n  div.dtsb-searchBuilder {\r\n    @apply mb-4 cursor-default justify-evenly text-left;\r\n  }\r\n  div.dtsb-searchBuilder button.dtsb-button,\r\n  div.dtsb-searchBuilder select {\r\n    @apply text-sm;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-titleRow {\r\n    @apply mb-3 flex items-center justify-between;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {\r\n    @apply inline-block text-sm font-normal;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title:empty {\r\n    display: inline;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-value,\r\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-data,\r\n  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-condition {\r\n    display: block;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group {\r\n    @apply relative clear-both mb-4;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-search {\r\n    float: right;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group button.dtsb-clearGroup {\r\n    margin: 2px;\r\n    text-align: center;\r\n    padding: 0;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\r\n    -webkit-transform: rotate(90deg);\r\n    -moz-transform: rotate(90deg);\r\n    -o-transform: rotate(90deg);\r\n    -ms-transform: rotate(90deg);\r\n    transform: rotate(90deg);\r\n    position: absolute;\r\n    margin-top: 0.8em;\r\n    margin-right: 0.8em;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\r\n    margin-bottom: 0.8em;\r\n    display: flex;\r\n    justify-content: flex-start;\r\n    flex-flow: row wrap;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\r\n    padding: 0.4em;\r\n    margin-right: 0.8em;\r\n    min-width: 5em;\r\n    max-width: 20em;\r\n    color: inherit;\r\n  }\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    select.dtsb-dropDown\r\n    option.dtsb-notItalic,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input option.dtsb-notItalic {\r\n    font-style: normal;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-italic {\r\n    font-style: italic;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\r\n    flex: 1;\r\n    white-space: nowrap;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont span.dtsp-joiner {\r\n    margin-right: 0.8em;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input.dtsb-value {\r\n    width: 33%;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont select,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input {\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\r\n    margin-left: auto;\r\n    display: inline-block;\r\n  }\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-delete,\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-right,\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-left {\r\n    margin-right: 0.8em;\r\n  }\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-delete:last-child,\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-right:last-child,\r\n  div.dtsb-searchBuilder\r\n    div.dtsb-group\r\n    div.dtsb-criteria\r\n    div.dtsb-buttonContainer\r\n    button.dtsb-left:last-child {\r\n    margin-right: 0;\r\n  }\r\n  @media screen and (max-width: 550px) {\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {\r\n      display: flex;\r\n      flex-flow: none;\r\n      flex-direction: column;\r\n      justify-content: flex-start;\r\n      padding-right: calc(35px + 0.8em);\r\n      margin-bottom: 0px;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:first-child),\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:nth-child(2)),\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:last-child) {\r\n      padding-top: 0.8em;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:first-child,\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:nth-child(2),\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:last-child {\r\n      padding-top: 0em;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\r\n      max-width: none;\r\n      width: 100%;\r\n      margin-bottom: 0.8em;\r\n      margin-right: 0.8em;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {\r\n      margin-right: 0.8em;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {\r\n      position: absolute;\r\n      width: 35px;\r\n      display: flex;\r\n      flex-wrap: wrap-reverse;\r\n      right: 0;\r\n    }\r\n    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer button {\r\n      margin-right: 0px !important;\r\n    }\r\n  }\r\n  div.dtsb-searchBuilder button,\r\n  div.dtsb-searchBuilder select.dtsb-dropDown,\r\n  div.dtsb-searchBuilder input {\r\n    @apply bg-background;\r\n  }\r\n  div.dtsb-searchBuilder button.dtsb-button {\r\n    @apply relative box-border inline-flex h-9 cursor-pointer select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm font-normal text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\r\n  }\r\n  div.dtsb-searchBuilder button.dtsb-button:hover {\r\n    @apply cursor-pointer bg-muted;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-logicContainer {\r\n    @apply overflow-hidden rounded-none border;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-logicContainer button {\r\n    @apply rounded-md border-transparent bg-transparent;\r\n  }\r\n  div.dtsb-searchBuilder button.dtsb-clearGroup {\r\n    min-width: 2em;\r\n    padding: 0;\r\n  }\r\n  div.dtsb-searchBuilder button.dtsb-iptbtn {\r\n    min-width: 100px;\r\n    text-align: left;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {\r\n    @apply flex flex-row content-start items-start justify-start rounded-md;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-logic {\r\n    @apply m-0 shrink-0 grow rounded-none border-0;\r\n    flex-basis: 3em;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-clearGroup {\r\n    border: none;\r\n    border-radius: 0px;\r\n    width: 2em;\r\n    margin: 0px;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {\r\n    @apply rounded-md border;\r\n  }\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value {\r\n    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;\r\n  }\r\n\r\n  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {\r\n    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;\r\n  }\r\n</style>\r\n",
      },
    ],
    utils: [],
    composables: [],
  },
  {
    name: "Datepicker",
    value: "datepicker",
    deps: [],
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
          '<template>\n  <ClientOnly>\n    <VDatePicker\n      :trimWeeks="props.trimWeeks || true"\n      :is-dark="$colorMode.value == \'dark\'"\n      v-bind="$attrs"\n    >\n      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">\n        <slot :name="slot" v-bind="scope"></slot>\n      </template>\n    </VDatePicker>\n  </ClientOnly>\n</template>\n\n<script lang="ts" setup>\n  import { Calendar, DatePicker } from "v-calendar";\n\n  defineOptions({ inheritAttrs: false });\n\n  // @ts-ignore\n  interface Props\n    extends /* @vue-ignore */ Partial<InstanceType<typeof Calendar>["$props"]>,\n      /* @vue-ignore */ Omit<Partial<InstanceType<typeof DatePicker>["$props"]>, "attributes"> {}\n\n  const props = defineProps<Props & { trimWeeks?: boolean }>();\n</script>\n\n<style>\n  :root {\n    --vc-font-family: var(--font-sans);\n    --vc-rounded-full: var(--radius);\n    --vc-font-bold: 500;\n    --vc-font-semibold: 600;\n    --vc-text-lg: 16px;\n  }\n\n  .vc-light,\n  .vc-dark {\n    --vc-bg: theme("colors.background");\n    --vc-border: theme("colors.border");\n    --vc-focus-ring: 0 0 0 3px hsl(var(--primary) / 30%);\n    --vc-weekday-color: theme("colors.muted.foreground");\n    --vc-popover-content-color: theme("colors.popover.foreground");\n    --vc-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-popover-content-bg: theme("colors.popover.DEFAULT");\n    --vc-popover-content-border: theme("colors.border");\n    --vc-header-arrow-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-weeknumber-color: theme("colors.muted.foreground");\n    --vc-nav-hover-bg: theme("colors.accent.DEFAULT");\n    --vc-time-year-color: theme("colors.foreground");\n    --vc-time-weekday-color: theme("colors.foreground");\n    --vc-time-month-color: theme("colors.foreground");\n    --vc-time-day-color: theme("colors.foreground");\n\n    --vc-nav-item-active-color: theme("colors.primary.foreground");\n    --vc-nav-item-active-bg: theme("colors.primary.DEFAULT");\n\n    --vc-time-select-group-bg: theme("colors.background");\n    --vc-time-select-group-border: theme("colors.border");\n    --vc-time-picker-border: theme("colors.border");\n\n    &.vc-attr,\n    & .vc-attr {\n      --vc-content-color: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-border: theme("colors.primary.DEFAULT");\n      --vc-highlight-outline-content-color: theme("colors.primary.foreground");\n      --vc-highlight-light-bg: var(--vc-accent-200); /* Highlighted color between two dates */\n      --vc-highlight-light-content-color: theme("colors.secondary.foreground");\n      --vc-highlight-solid-bg: theme("colors.primary.DEFAULT");\n      --vc-highlight-solid-content-color: theme("colors.primary.foreground");\n    }\n  }\n\n  .vc-blue {\n    --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n    --vc-accent-400: theme("colors.primary.DEFAULT");\n    --vc-accent-500: theme("colors.primary.DEFAULT");\n    --vc-accent-600: theme("colors.primary.DEFAULT / 70%");\n  }\n\n  .dark {\n    .vc-blue {\n      --vc-accent-200: theme("colors.primary.DEFAULT / 20%");\n      --vc-accent-400: theme("colors.primary.DEFAULT");\n      --vc-accent-500: theme("colors.primary.DEFAULT / 70%");\n    }\n  }\n  .vc-header .vc-title {\n    @apply font-medium;\n  }\n  .vc-weekdays {\n    @apply my-2 font-normal;\n  }\n  .vc-day-content,\n  .vc-day,\n  .vc-highlight {\n    @apply h-9 w-9 rounded-md;\n  }\n  .vc-focus {\n    @apply focus-within:shadow-none;\n  }\n  .vc-day {\n    @apply mb-1.5;\n  }\n\n  .vc-base-icon {\n    @apply h-4 w-4 stroke-1;\n  }\n  .vc-header .vc-arrow,\n  .vc-nav-arrow {\n    @apply h-7 w-7 rounded-md;\n    border: 1px solid hsl(var(--border));\n  }\n  .vc-header .vc-prev,\n  .vc-header .vc-next {\n    @apply border;\n  }\n  .weekday-position-1 .vc-highlights {\n    @apply rounded-l-md;\n  }\n  .weekday-position-7 .vc-highlights {\n    @apply rounded-r-md;\n  }\n  .vc-highlight-bg-light {\n    @apply bg-accent;\n  }\n  .vc-nav-item {\n    @apply font-medium;\n  }\n  .vc-header .vc-title-wrapper {\n    @apply decoration-accent-foreground/60 underline-offset-2 hover:underline;\n  }\n  .vc-highlights + .vc-day-content {\n    @apply hover:bg-accent/5;\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dialog",
    value: "dialog",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Dialog/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose v-bind="props">\n    <slot> </slot>\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiDialogPortal :to="to">\n    <UiDialogOverlay />\n    <DialogContent :class="styles({ class: props.class })" v-bind="{ ...forwarded, ...$attrs }">\n      <slot>\n        <slot name="header">\n          <UiDialogHeader>\n            <slot name="title">\n              <UiDialogTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiDialogDescription v-if="description" :description="description" />\n            </slot>\n          </UiDialogHeader>\n        </slot>\n        <slot name="content"></slot>\n        <slot name="footer"></slot>\n      </slot>\n      <slot name="close">\n        <UiDialogClose />\n      </slot>\n      <UiDialogClose\n        v-if="!hideClose"\n        class="absolute right-4 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"\n      >\n        <Icon name="lucide:x" class="h-4 w-4" />\n        <span class="sr-only">Close</span>\n      </UiDialogClose>\n    </DialogContent>\n  </UiDialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { DialogContentEmits, DialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    DialogContentProps & {\n      /** Icon to display in the close button */\n      icon?: string;\n      /** Title text */\n      title?: string;\n      /** Description text */\n      description?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Whether to hide the close button */\n      hideClose?: boolean;\n      /** Where to render the dialog */\n      to?: string | HTMLElement;\n    }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "hideClose", "to"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogDescription\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'description\')"\n  >\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "radix-vue";\n  import type { DialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The description text */\n      description?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Dialog.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogRoot v-bind="forwarded">\n    <slot></slot>\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "radix-vue";\n  import type { DialogRootEmits, DialogRootProps } from "radix-vue";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Dialog/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const styles = tv({\n    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const styles = tv({\n    base: "flex flex-col space-y-1.5 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogOverlay :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')" />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "radix-vue";\n  import type { DialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogOverlayProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogPortal v-bind="props">\n    <slot></slot>\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal, useForwardProps } from "radix-vue";\n  import type { DialogPortalProps } from "radix-vue";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Dialog/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTitle\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'title\', \'class\')"\n  >\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "radix-vue";\n  import type { DialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** The title text */\n      title?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-lg font-semibold leading-none tracking-tight",\n  });\n</script>\n',
      },
      {
        fileName: "Dialog/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTrigger v-bind="props">\n    <slot></slot>\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger, useForwardProps } from "radix-vue";\n  import type { DialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dropdown Menu",
    value: "dropdown-menu",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "DropdownMenu/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuArrow\r\n    v-bind="reactiveOmit(props, \'class\')"\r\n    :class="styles({ class: props.class })"\r\n  />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuArrow } from "radix-vue";\r\n  import type { DropdownMenuArrowProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      DropdownMenuArrowProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      asChild: false,\r\n      width: 10,\r\n      height: 5,\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "rotate-45 border bg-muted",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/CheckboxItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuCheckboxItem v-bind="forwarded" :class="styles({ class: props.class })">\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\r\n      <UiDropdownMenuItemIndicator icon="lucide:check" />\r\n    </span>\r\n    <slot>\r\n      <span v-if="title">{{ title }}</span>\r\n    </slot>\r\n    <slot name="shortcut">\r\n      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>\r\n    </slot>\r\n  </DropdownMenuCheckboxItem>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuCheckboxItemProps & {\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n      /** The shorttcut text to display */\r\n      shortcut?: string;\r\n      /** The title text to display */\r\n      title?: string;\r\n    }\r\n  >();\r\n  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "title", "shortcut", "class"), emits);\r\n\r\n  const styles = tv({\r\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <UiDropdownMenuPortal>\r\n    <DropdownMenuContent\r\n      v-bind="{ ...forwarded, ...$attrs }"\r\n      :class="styles({ class: props.class })"\r\n    >\r\n      <slot></slot>\r\n    </DropdownMenuContent>\r\n  </UiDropdownMenuPortal>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuContent, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from "radix-vue";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      DropdownMenuContentProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      loop: true,\r\n      align: "center",\r\n      sideOffset: 5,\r\n      side: "bottom",\r\n      avoidCollisions: true,\r\n      sticky: "partial",\r\n    }\r\n  );\r\n\r\n  const emits = defineEmits<DropdownMenuContentEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\r\n\r\n  const styles = tv({\r\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/DropdownMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuRoot v-bind="forwarded">\r\n    <slot></slot>\r\n  </DropdownMenuRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuRootProps>();\r\n\r\n  const emit = defineEmits<DropdownMenuRootEmits>();\r\n  const forwarded = useForwardPropsEmits(props, emit);\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuGroup v-bind="props">\r\n    <slot></slot>\r\n  </DropdownMenuGroup>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuGroup } from "radix-vue";\r\n  import type { DropdownMenuGroupProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuGroupProps>();\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuItem v-bind="forwarded" :class="styles({ inset, class: props.class })">\r\n    <slot>\r\n      <slot name="icon">\r\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\r\n      </slot>\r\n      <slot name="title">\r\n        <span v-if="title">{{ title }}</span>\r\n      </slot>\r\n    </slot>\r\n    <slot name="shortcut">\r\n      <UiDropdownMenuShortcut v-if="shortcut">{{ shortcut }}</UiDropdownMenuShortcut>\r\n    </slot>\r\n  </DropdownMenuItem>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuItem, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuItemProps & {\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n      /** Whether to inset the content */\r\n      inset?: boolean;\r\n      /** The shorttcut text to display */\r\n      shortcut?: string;\r\n      /** The title text to display */\r\n      title?: string;\r\n      /** The icon to display */\r\n      icon?: string;\r\n    }\r\n  >();\r\n\r\n  const emits = defineEmits<DropdownMenuItemEmits>();\r\n  const forwarded = useForwardPropsEmits(\r\n    reactiveOmit(props, "class", "inset", "shortcut", "title", "icon"),\r\n    emits\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n    variants: {\r\n      inset: {\r\n        true: "pl-8",\r\n      },\r\n    },\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuItemIndicator v-bind="reactiveOmit(props, \'icon\')">\r\n    <slot>\r\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\r\n    </slot>\r\n  </DropdownMenuItemIndicator>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuItemIndicator } from "radix-vue";\r\n  import type { DropdownMenuItemIndicatorProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuItemIndicatorProps & {\r\n      icon?: string;\r\n    }\r\n  >();\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuLabel\r\n    :class="styles({ inset, class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'inset\', \'label\')"\r\n  >\r\n    <slot>{{ label }}</slot>\r\n  </DropdownMenuLabel>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuLabel } from "radix-vue";\r\n  import type { DropdownMenuLabelProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuLabelProps & {\r\n      class?: any;\r\n      inset?: boolean;\r\n      label?: string;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "inline-block w-full px-2 py-1.5 text-sm font-semibold text-foreground",\r\n    variants: {\r\n      inset: { true: "pl-8" },\r\n    },\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuPortal v-bind="props">\r\n    <slot></slot>\r\n  </DropdownMenuPortal>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuPortal } from "radix-vue";\r\n  import type { DropdownMenuPortalProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuPortalProps>();\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuRadioGroup v-bind="forwarded">\r\n    <slot></slot>\r\n  </DropdownMenuRadioGroup>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuRadioGroup, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuRadioGroupProps>();\r\n\r\n  const emits = defineEmits<DropdownMenuRadioGroupEmits>();\r\n\r\n  const forwarded = useForwardPropsEmits(props, emits);\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/RadioItem.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuRadioItem v-bind="forwarded" :class="styles({ class: props.class })">\r\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-primary">\r\n      <UiDropdownMenuItemIndicator>\r\n        <Icon v-if="icon" :name="icon" class="h-4 w-4" />\r\n        <Icon v-else name="ph:circle-fill" class="h-2 w-2" />\r\n      </UiDropdownMenuItemIndicator>\r\n    </span>\r\n    <slot>{{ title }}</slot>\r\n  </DropdownMenuRadioItem>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuRadioItem, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuRadioItemProps & {\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n      /** The icon to display */\r\n      icon?: string;\r\n      /** The title text to display */\r\n      title?: string;\r\n    }\r\n  >();\r\n\r\n  const emits = defineEmits<DropdownMenuRadioItemEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon", "title"), emits);\r\n\r\n  const styles = tv({\r\n    base: "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuSeparator\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\')"\r\n  />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuSeparator } from "radix-vue";\r\n  import type { DropdownMenuSeparatorProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuSeparatorProps & {\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "-mx-1 my-1 h-px bg-border",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot />\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "span",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "ml-auto text-xs tracking-widest opacity-60",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuSub v-bind="forwarded">\r\n    <slot></slot>\r\n  </DropdownMenuSub>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuSub, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuSubEmits, DropdownMenuSubProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuSubProps>();\r\n  const emits = defineEmits<DropdownMenuSubEmits>();\r\n  const forwarded = useForwardPropsEmits(props, emits);\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <UiDropdownMenuPortal :to="to">\r\n    <DropdownMenuSubContent\r\n      v-bind="{ ...forwarded, ...$attrs }"\r\n      :class="styles({ class: props.class })"\r\n    >\r\n      <slot></slot>\r\n    </DropdownMenuSubContent>\r\n  </UiDropdownMenuPortal>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuSubContent, useForwardPropsEmits } from "radix-vue";\r\n  import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from "radix-vue";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n  const props = withDefaults(\r\n    defineProps<\r\n      DropdownMenuSubContentProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n        /** The element to render the portal into */\r\n        to?: string | HTMLElement;\r\n      }\r\n    >(),\r\n    {\r\n      loop: true,\r\n      sideOffset: 8,\r\n      avoidCollisions: true,\r\n      collisionPadding: 5,\r\n      sticky: "partial",\r\n    }\r\n  );\r\n\r\n  const emits = defineEmits<DropdownMenuSubContentEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\r\n\r\n  const styles = tv({\r\n    base: "z-50 min-w-[180px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuSubTrigger\r\n    v-bind="reactiveOmit(props, \'class\', \'inset\', \'icon\', \'title\', \'trailingIcon\')"\r\n    :class="styles({ inset, class: props.class })"\r\n  >\r\n    <slot>\r\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\r\n      <span v-if="title">{{ title }}</span>\r\n    </slot>\r\n    <Icon\r\n      class="ml-auto h-4 w-4 text-muted-foreground"\r\n      :name="trailingIcon || \'lucide:chevron-right\'"\r\n    />\r\n  </DropdownMenuSubTrigger>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuSubTrigger, useForwardProps } from "radix-vue";\r\n  import type { DropdownMenuSubTriggerProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    DropdownMenuSubTriggerProps & {\r\n      /**Custom class(es) to add to the element */\r\n      class?: any;\r\n      /** Wether an indentation should be added to the item or not */\r\n      inset?: boolean;\r\n      /** The icon to display */\r\n      icon?: string;\r\n      /** The title for the item */\r\n      title?: string;\r\n      /** The trailing icon to display */\r\n      trailingIcon?: string;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",\r\n    variants: {\r\n      inset: {\r\n        true: "pl-8",\r\n      },\r\n    },\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "DropdownMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <DropdownMenuTrigger v-bind="props">\r\n    <slot></slot>\r\n  </DropdownMenuTrigger>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { DropdownMenuTrigger } from "radix-vue";\r\n  import type { DropdownMenuTriggerProps } from "radix-vue";\r\n\r\n  const props = defineProps<DropdownMenuTriggerProps>();\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Dropfile",
    value: "dropfile",
    deps: ["tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Dropfile.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div @click="open()" ref="dropZoneRef" :class="styles({ isOverDropZone, class: props.class })">\n    <slot name="message">\n      <div class="py-10 text-center">\n        <slot name="icon">\n          <div\n            v-if="icon"\n            class="inline-flex items-center justify-center rounded-md border p-2 transition"\n            :class="[isOverDropZone && \'animate-bounce border-primary\']"\n          >\n            <Icon\n              :name="icon"\n              class="h-7 w-7 opacity-70"\n              :class="[isOverDropZone && \'text-primary\']"\n            />\n          </div>\n        </slot>\n        <slot name="title">\n          <p class="mt-5 text-sm font-medium" v-html="title"></p>\n        </slot>\n        <slot name="subtext">\n          <p class="mt-1 text-sm text-muted-foreground/60" v-html="subtext"></p>\n        </slot>\n      </div>\n    </slot>\n  </div>\n</template>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * The text to display as the title of the dropzone.\n       */\n      title?: string;\n      /**\n       * The text to display as the subtext of the dropzone.\n       */\n      subtext?: string;\n      /**\n       * The icon to display in the dropzone.\n       */\n      icon?: string;\n      /**\n       * The function to call when files are dropped.\n       */\n      onDrop?: Function;\n      /**\n       * Whether or not to allow multiple files to be picked. Does not affect drag and drop.\n       */\n      multiple?: boolean;\n      /**\n       * The file types to accept. Does not affect drag and drop.\n       */\n      accept?: string;\n      class?: any;\n    }>(),\n    {\n      title: "Click to upload or drag & drop files.",\n      subtext: "All file types accepted",\n      icon: "heroicons:cloud-arrow-up",\n      multiple: true,\n      accept: "*",\n    }\n  );\n\n  const { open, reset, onChange } = useFileDialog({\n    multiple: props.multiple,\n    accept: props.accept,\n  });\n\n  onChange((files: FileList) => {\n    handleDrop(Array.from(files || []));\n    reset();\n  });\n\n  const dropZoneRef = ref<HTMLDivElement>();\n  const emits = defineEmits<{\n    dropped: [any];\n  }>();\n\n  const handleDrop = (files: File[] | null) => {\n    if (!files) return;\n    if (props.onDrop) props.onDrop(files);\n    emits("dropped", files);\n  };\n\n  const { isOverDropZone } = useDropZone(dropZoneRef, handleDrop);\n\n  const styles = tv({\n    base: "flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed transition hover:border-primary",\n    variants: {\n      isOverDropZone: { true: "border-primary bg-primary/10" },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Form",
    value: "form",
    deps: ["radix-vue", "tailwind-variants", "@vee-validate/nuxt"],
    devDeps: [],
    nuxtModules: ["@vee-validate/nuxt"],
    composables: [
      {
        fileName: "useFormField.ts",
        dirPath: "composables",
        fileContent:
          'import { FORM_ITEM_INJECTION_KEY } from "@/components/UI/Form/Item.vue";\r\nimport {\r\n  FieldContextKey,\r\n  useFieldError,\r\n  useIsFieldDirty,\r\n  useIsFieldTouched,\r\n  useIsFieldValid,\r\n} from "vee-validate";\r\nimport { inject } from "vue";\r\n\r\nexport function useFormField() {\r\n  const fieldContext = inject(FieldContextKey);\r\n  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);\r\n\r\n  const fieldState = {\r\n    valid: useIsFieldValid(),\r\n    isDirty: useIsFieldDirty(),\r\n    isTouched: useIsFieldTouched(),\r\n    error: useFieldError(),\r\n  };\r\n\r\n  if (!fieldContext) throw new Error("useFormField should be used within <FormField>");\r\n\r\n  const { name } = fieldContext;\r\n  const id = fieldItemContext;\r\n\r\n  return {\r\n    id,\r\n    name,\r\n    formItemId: `${id}-form-item`,\r\n    formDescriptionId: `${id}-form-item-description`,\r\n    formMessageId: `${id}-form-item-message`,\r\n    ...fieldState,\r\n  };\r\n}\r\n',
      },
    ],
    files: [
      {
        fileName: "Form/Control.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Slot\r\n    :id="formItemId"\r\n    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"\r\n    :aria-invalid="!!error"\r\n  >\r\n    <slot />\r\n  </Slot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Slot } from "radix-vue";\r\n\r\n  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();\r\n</script>\r\n',
      },
      {
        fileName: "Form/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <p :id="formDescriptionId" :class="styles({ class: props.class })" v-bind="$attrs">\r\n    <slot>\r\n      <ClientOnly>\r\n        <p v-html="description"></p>\r\n      </ClientOnly>\r\n    </slot>\r\n  </p>\r\n</template>\r\n<script lang="ts" setup>\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const { formDescriptionId } = useFormField();\r\n  const props = defineProps<{ class?: any; description?: string }>();\r\n  const styles = tv({ base: "text-sm text-muted-foreground" });\r\n</script>\r\n',
      },
      {
        fileName: "Form/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div :class="styles({ class: props.class })" v-bind="$attrs">\r\n    <slot name="label">\r\n      <UiFormLabel v-if="label || hint" :label="label" :hint="hint" />\r\n    </slot>\r\n    <UiFormControl>\r\n      <slot />\r\n    </UiFormControl>\r\n    <slot name="description">\r\n      <UiFormDescription v-if="description" :description="description" />\r\n    </slot>\r\n    <slot name="errorMessage">\r\n      <TransitionSlide tag="p">\r\n        <UiFormMessage v-if="!hideMessage" />\r\n      </TransitionSlide>\r\n    </slot>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts">\r\n  import { type InjectionKey } from "vue";\r\n\r\n  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;\r\n</script>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const id = useId();\r\n  provide(FORM_ITEM_INJECTION_KEY, id);\r\n\r\n  const props = defineProps<{\r\n    class?: any;\r\n    label?: string;\r\n    description?: string;\r\n    hint?: string;\r\n    hideMessage?: boolean;\r\n  }>();\r\n\r\n  const styles = tv({ base: "space-y-1.5" });\r\n</script>\r\n',
      },
      {
        fileName: "Form/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Label\r\n    :class="styles({ error: Boolean(error), class: props.class })"\r\n    :for="formItemId"\r\n    v-bind="$attrs"\r\n  >\r\n    <slot\r\n      >{{ label }}\r\n      <span class="ml-auto font-normal text-muted-foreground/80">{{ hint }}</span></slot\r\n    >\r\n  </Label>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Label } from "radix-vue";\r\n  import type { LabelProps } from "radix-vue";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n  const props = defineProps<LabelProps & { class?: any; label?: string; hint?: string }>();\r\n\r\n  const { error, formItemId } = useFormField();\r\n\r\n  const styles = tv({\r\n    base: "flex w-full items-center justify-between text-left text-sm font-medium tracking-tight text-foreground hover:cursor-pointer",\r\n    variants: {\r\n      error: {\r\n        true: "text-destructive",\r\n      },\r\n    },\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Form/Message.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ErrorMessage\r\n    :id="formMessageId"\r\n    as="p"\r\n    :name="toValue(name)"\r\n    class="text-sm font-medium text-destructive"\r\n  />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  const { name, formMessageId } = useFormField();\r\n</script>\r\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Hover Card",
    value: "hover-card",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "HoverCard/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardArrow :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')" />\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardArrow } from "radix-vue";\n  import type { HoverCardArrowProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardArrowProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      height: 5,\n      width: 10,\n    }\n  );\n\n  const styles = tv({\n    base: " fill-popover",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiHoverCardPortal :to="to">\n    <HoverCardContent\n      v-bind="{ ...reactiveOmit(props, \'class\', \'to\'), ...$attrs }"\n      :class="styles({ class: props.class })"\n    >\n      <slot></slot>\n    </HoverCardContent>\n  </UiHoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardContent } from "radix-vue";\n  import type { HoverCardContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      HoverCardContentProps & {\n        /** Custom class(es) to add to the content */\n        class?: any;\n        /** The element or selector the content should be positioned relative to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 5,\n      align: "center",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const styles = tv({\n    base: "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "HoverCard/HoverCard.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardRoot v-bind="forwarded">\n    <slot></slot>\n  </HoverCardRoot>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardRoot, useForwardPropsEmits } from "radix-vue";\n  import type { HoverCardRootEmits, HoverCardRootProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<HoverCardRootProps>(), {\n    openDelay: 200,\n    closeDelay: 200,\n  });\n\n  const emits = defineEmits<HoverCardRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "HoverCard/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardPortal v-bind="props">\n    <slot></slot>\n  </HoverCardPortal>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardPortal } from "radix-vue";\n  import type { HoverCardPortalProps } from "radix-vue";\n\n  const props = defineProps<HoverCardPortalProps>();\n</script>\n',
      },
      {
        fileName: "HoverCard/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <HoverCardTrigger v-bind="props">\n    <slot></slot>\n  </HoverCardTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { HoverCardTrigger } from "radix-vue";\n  import type { HoverCardTriggerProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<HoverCardTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Input",
    value: "input",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["@vueuse/nuxt"],
    files: [
      {
        fileName: "Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <input :class="styles({ class: props.class })" v-bind="props" v-model="localModel" />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      class?: any;\r\n      id?: string;\r\n      name?: string;\r\n      placeholder?: string;\r\n      disabled?: boolean;\r\n      required?: boolean;\r\n      type?: string;\r\n      modelValue?: any;\r\n    }>(),\r\n    { type: "text" }\r\n  );\r\n  const emits = defineEmits<{\r\n    "update:modelValue": [value: any];\r\n  }>();\r\n  const localModel = useVModel(props, "modelValue", emits);\r\n\r\n  const styles = tv({\r\n    base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Keyboard Key",
    value: "kbd",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Kbd.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive\n    :class="styles({ size, class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'size\')"\n  >\n    <slot />\n  </Primitive>\n</template>\n<script setup lang="ts">\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** The size of the component */\n        size?: VariantProps<typeof styles>["size"];\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      as: "kbd",\n      size: "sm",\n    }\n  );\n\n  const styles = tv({\n    base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-border bg-muted font-sans font-medium",\n    variants: {\n      size: {\n        xs: "h-5 min-h-[16px] px-1 text-[10px]",\n        sm: "h-6 min-h-[20px] px-1.5 text-[11px]",\n        md: "h-7 min-h-[24px] px-2 text-[12px]",\n      },\n    },\n    defaultVariants: {\n      size: "sm",\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Label",
    value: "label",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Label :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot />\r\n  </Label>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Label } from "radix-vue";\r\n  import type { LabelProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    LabelProps & {\r\n      /** Custom class(es) to add to the label */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "inline-block text-base font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "List",
    value: "list",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "List/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot></slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "div",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex flex-col gap-1 leading-none",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "List/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <component\r\n    :is="eltype"\r\n    :href="href"\r\n    :to="to"\r\n    @click="onClick"\r\n    :class="\r\n      styles({\r\n        hover: Boolean(onClick) || Boolean(to) || Boolean(href),\r\n        class: props.class,\r\n      })\r\n    "\r\n  >\r\n    <slot></slot>\r\n  </component>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  const props = defineProps<{\r\n    /**Custom class(es) to add to the element */\r\n    class?: any;\r\n    /** Function called when the item is clicked */\r\n    onClick?: () => void;\r\n    /** The location that the item should navigate to when clicked */\r\n    to?: string;\r\n    /** The href for the `a` tag */\r\n    href?: string;\r\n  }>();\r\n\r\n  const styles = tv({\r\n    base: "flex w-full items-center gap-5 px-4 py-2",\r\n    variants: {\r\n      hover: {\r\n        true: "cursor-pointer outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary/10",\r\n      },\r\n    },\r\n  });\r\n\r\n  const eltype = computed(() => {\r\n    if (props.to || props.href) return resolveComponent("NuxtLink");\r\n    if (props.onClick) return "button";\r\n    return "li";\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "List/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot></slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      as: "ul",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "w-full py-2",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "List/Subtitle.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'subtitle\')"\r\n  >\r\n    <slot>{{ subtitle }}</slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n        /** The subtitle of the component */\r\n        subtitle?: string;\r\n      }\r\n    >(),\r\n    {\r\n      as: "p",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "text-sm text-muted-foreground",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "List/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\', \'title\')">\r\n    <slot>{{ title }}</slot>\r\n  </Primitive>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Primitive } from "radix-vue";\r\n  import type { PrimitiveProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PrimitiveProps & {\r\n        /** Custom class(es) to add to the parent */\r\n        class?: any;\r\n        /** The title of the component */\r\n        title?: string;\r\n      }\r\n    >(),\r\n    {\r\n      as: "p",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "font-semibold",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Menubar",
    value: "menubar",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
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
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot></slot>\n    </MenubarContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarContent, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarContentProps, MenubarSubContentEmits } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      MenubarContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n      side: "bottom",\n      sideOffset: 8,\n      align: "start",\n      alignOffset: -4,\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarGroup v-bind="props">\n    <slot></slot>\n  </MenubarGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarGroup } from "radix-vue";\n  import type { MenubarGroupProps } from "radix-vue";\n\n  const props = defineProps<MenubarGroupProps>();\n</script>\n',
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
          '<template>\n  <MenubarItemIndicator v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n    </slot>\n  </MenubarItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarItemIndicator } from "radix-vue";\n  import type { MenubarItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarItemIndicatorProps & {\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Menubar/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarLabel\n    :class="styles({ inset, class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'inset\')"\n  >\n    <slot></slot>\n  </MenubarLabel>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarLabel } from "radix-vue";\n  import type { MenubarLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarLabelProps & {\n      class?: any;\n      inset?: boolean;\n    }\n  >();\n\n  const styles = tv({\n    base: "px-2 py-1.5 text-sm font-semibold",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Menu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarMenu v-bind="props">\n    <slot></slot>\n  </MenubarMenu>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarMenu } from "radix-vue";\n  import type { MenubarMenuProps } from "radix-vue";\n\n  const props = defineProps<MenubarMenuProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/Menubar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot></slot>\n  </MenubarRoot>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRoot, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarRootEmits, MenubarRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      MenubarRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<MenubarRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "inline-flex h-10 items-center space-x-1 rounded-md border bg-background p-1",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarPortal v-bind="props">\n    <slot></slot>\n  </MenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { type MenubarPortalProps } from "radix-vue";\n\n  const props = defineProps<MenubarPortalProps>();\n</script>\n',
      },
      {
        fileName: "Menubar/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarRadioGroup v-bind="forwarded">\n    <slot></slot>\n  </MenubarRadioGroup>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarRadioGroup, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from "radix-vue";\n\n  const props = defineProps<MenubarRadioGroupProps>();\n  const emits = defineEmits<MenubarRadioGroupEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
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
          '<template>\n  <MenubarSeparator :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')" />\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSeparator } from "radix-vue";\n  import type { MenubarSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-border",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Shortcut.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot />\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    { as: "span" }\n  );\n\n  const styles = tv({\n    base: "ml-auto text-xs tracking-widest opacity-60",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarSub v-bind="forwarded">\n    <slot></slot>\n  </MenubarSub>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSub, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarSubEmits, MenubarSubProps } from "radix-vue";\n\n  const props = defineProps<MenubarSubProps>();\n  const emits = defineEmits<MenubarSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Menubar/SubContent.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiMenubarPortal :to="to">\n    <MenubarSubContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot></slot>\n    </MenubarSubContent>\n  </UiMenubarPortal>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubContent, useForwardPropsEmits } from "radix-vue";\n  import type { MenubarSubContentEmits, MenubarSubContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(\n    defineProps<\n      MenubarSubContentProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        /** The target element to portal the component to */\n        to?: string | HTMLElement;\n      }\n    >(),\n    {\n      loop: true,\n      sideOffset: 5,\n      avoidCollisions: true,\n      collisionPadding: 8,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<MenubarSubContentEmits>();\n\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-accent-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/SubTrigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarSubTrigger\n    v-bind="reactiveOmit(props, \'class\', \'inset\', \'icon\', \'title\', \'trailingIcon\')"\n    :class="styles({ inset, class: props.class })"\n  >\n    <slot>\n      <Icon v-if="icon" :name="icon" class="h-4 w-4" />\n      <span v-if="title">{{ title }}</span>\n    </slot>\n    <Icon\n      class="ml-auto h-4 w-4 text-muted-foreground"\n      :name="trailingIcon || \'lucide:chevron-right\'"\n    />\n  </MenubarSubTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarSubTrigger } from "radix-vue";\n  import type { MenubarSubTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarSubTriggerProps & {\n      class?: any;\n      inset?: boolean;\n      icon?: string;\n      title?: string;\n      trailingIcon?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\n    variants: {\n      inset: {\n        true: "pl-8",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Menubar/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <MenubarTrigger :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </MenubarTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { MenubarTrigger } from "radix-vue";\n  import type { MenubarTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    MenubarTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Native Select",
    value: "native-select",
    deps: ["tailwind-variants"],
    devDeps: ["nuxt-icon", "@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["nuxt-icon", "@vueuse/nuxt"],
    files: [
      {
        fileName: "NativeSelect.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="relative">\n    <select\n      ref="select"\n      :multiple="multiple"\n      :name="name"\n      :size="size"\n      :id="id"\n      :placeholder="placeholder"\n      :disabled="disabled"\n      :required="required"\n      v-model="localModel"\n      :class="styles({ class: props.class })"\n    >\n      <slot></slot>\n    </select>\n    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center justify-center">\n      <slot name="trailingIcon">\n        <Icon\n          :name="trailingIcon || \'lucide:chevrons-up-down\'"\n          class="h-4 w-4 text-muted-foreground"\n        />\n      </slot>\n    </span>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n    id?: string;\n    name?: string;\n    placeholder?: string;\n    disabled?: boolean;\n    required?: boolean;\n    modelValue?: any;\n    multiple?: boolean;\n    size?: number;\n    autofocus?: boolean;\n    trailingIcon?: string;\n  }>();\n  const styles = tv({\n    base: "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 ring-offset-background focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n\n  const select = ref<HTMLSelectElement | null>(null);\n  const emits = defineEmits<{\n    "update:modelValue": [value: any];\n  }>();\n\n  const localModel = useVModel(props, "modelValue", emits);\n\n  onMounted(() => {\n    if (props.autofocus) {\n      select.value?.focus();\n    }\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Navigation Menu",
    value: "navigation-menu",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "NavigationMenu/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuContent v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot></slot>\n  </NavigationMenuContent>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuContent, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuContentEmits, NavigationMenuContentProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuContentProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const emits = defineEmits<NavigationMenuContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuIndicator\n    v-bind="reactiveOmit(props, \'class\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot></slot>\n    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />\n  </NavigationMenuIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuIndicator } from "radix-vue";\n  import type { NavigationMenuIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuItem v-bind="props">\n    <slot></slot>\n  </NavigationMenuItem>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuItem } from "radix-vue";\n  import type { NavigationMenuItemProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuItemProps>();\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Link.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuLink v-bind="forwarded">\n    <slot></slot>\n  </NavigationMenuLink>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuLink, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuLinkProps>();\n  const emits = defineEmits<NavigationMenuLinkEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "NavigationMenu/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuList v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot></slot>\n  </NavigationMenuList>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuList } from "radix-vue";\n  import type { NavigationMenuListProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "group flex flex-1 list-none items-center justify-center space-x-1",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/NavigationMenu.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuRoot :class="styles({ class: props.class })" v-bind="forwarded">\n    <slot></slot>\n    <UiNavigationMenuViewport />\n  </NavigationMenuRoot>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuRoot, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuRootProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const emits = defineEmits<NavigationMenuRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "relative flex max-w-max flex-1 items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Sub.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuSub v-bind="forwarded">\n    <slot></slot>\n  </NavigationMenuSub>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuSub, useForwardPropsEmits } from "radix-vue";\n  import type { NavigationMenuSubEmits, NavigationMenuSubProps } from "radix-vue";\n\n  const props = defineProps<NavigationMenuSubProps>();\n  const emits = defineEmits<NavigationMenuSubEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <NavigationMenuTrigger\n    v-bind="reactiveOmit(props, \'class\', \'icon\', \'title\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot>{{ title }}</slot>\n    <Icon\n      :name="icon || \'lucide:chevron-down\'"\n      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"\n      aria-hidden="true"\n    />\n  </NavigationMenuTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuTrigger } from "radix-vue";\n  import type { NavigationMenuTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    NavigationMenuTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n      /** Title to show */\n      title?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",\n  });\n</script>\n',
      },
      {
        fileName: "NavigationMenu/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="absolute left-0 top-full flex justify-center">\n    <NavigationMenuViewport\n      v-bind="{ ...reactiveOmit(props, \'class\'), ...$attrs }"\n      :class="styles({ class: props.class })"\n    />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { NavigationMenuViewport } from "radix-vue";\n  import type { NavigationMenuViewportProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = defineProps<\n    NavigationMenuViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Pagination",
    value: "pagination",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Pagination/Ellipsis.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationEllipsis v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <div v-if="icon" class="inline-flex h-9 w-9 items-center justify-center hover:bg-transparent">\n        <Icon :name="icon" />\n      </div>\n    </slot>\n  </PaginationEllipsis>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationEllipsis } from "radix-vue";\n  import type { PaginationEllipsisProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationEllipsisProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Pagination/First.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationFirst v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationFirst>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationFirst } from "radix-vue";\n  import type { PaginationFirstProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationFirstProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n</script>\n',
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
          '<template>\n  <PaginationLast v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationLast>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationLast } from "radix-vue";\n  import type { PaginationLastProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationLastProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Pagination/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationList\n    v-slot="{ items }"\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\')"\n  >\n    <slot :items="items"></slot>\n  </PaginationList>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationList } from "radix-vue";\n  import type { PaginationListProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationListProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex items-center gap-1",\n  });\n</script>\n',
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
          '<template>\n  <PaginationRoot v-bind="forwarded">\n    <slot>\n      <UiPaginationList v-slot="{ items }">\n        <slot name="first"><UiPaginationFirst asChild :icon="firstIcon" /> </slot>\n        <slot name="prev"><UiPaginationPrev asChild :icon="prevIcon" /> </slot>\n\n        <template v-for="(page, index) in items" :key="index">\n          <UiPaginationItem asChild v-if="page.type === \'page\'" v-bind="page" />\n          <UiPaginationEllipsis\n            asChild\n            v-else-if="page.type === \'ellipsis\'"\n            v-bind="page"\n            :icon="ellipsisIcon"\n          />\n        </template>\n        <slot name="next"><UiPaginationNext asChild :icon="nextIcon" /> </slot>\n        <slot name="last"><UiPaginationLast asChild :icon="lastIcon" /></slot>\n      </UiPaginationList>\n    </slot>\n  </PaginationRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationRoot, useForwardPropsEmits } from "radix-vue";\n  import type { PaginationRootEmits, PaginationRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PaginationRootProps & {\n        ellipsisIcon?: string;\n        firstIcon?: string;\n        lastIcon?: string;\n        nextIcon?: string;\n        prevIcon?: string;\n      }\n    >(),\n    {\n      defaultPage: 1,\n      total: 10,\n      itemsPerPage: 10,\n      siblingCount: 3,\n      showEdges: true,\n      ellipsisIcon: "lucide:more-horizontal",\n      firstIcon: "lucide:chevrons-left",\n      lastIcon: "lucide:chevrons-right",\n      nextIcon: "lucide:chevron-right",\n      prevIcon: "lucide:chevron-left",\n    }\n  );\n\n  const emits = defineEmits<PaginationRootEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "ellipsisIcon", "firstIcon", "lastIcon", "nextIcon", "prevIcon"),\n    emits\n  );\n</script>\n',
      },
      {
        fileName: "Pagination/Prev.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PaginationPrev v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <UiButton v-if="icon" variant="ghost" size="icon-sm">\n        <Icon :name="icon" />\n      </UiButton>\n    </slot>\n  </PaginationPrev>\n</template>\n\n<script lang="ts" setup>\n  import { PaginationPrev } from "radix-vue";\n  import type { PaginationPrevProps } from "radix-vue";\n\n  const props = defineProps<\n    PaginationPrevProps & {\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Pin Input (OTP)",
    value: "pin-input",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "PinInput/PinInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <PinInputRoot v-bind="forwarded" :class="styles({ class: props.class })">\r\n    <slot>\r\n      <template v-for="(input, k) in inputCount" :key="k">\r\n        <UiPinInputInput :index="k" />\r\n        <template v-if="k < inputCount - 1">\r\n          <span v-if="separator" class="text-muted-foreground">{{ separator }}</span>\r\n        </template>\r\n      </template>\r\n    </slot>\r\n  </PinInputRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { PinInputRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { PinInputRootEmits, PinInputRootProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      PinInputRootProps & {\r\n        /** Custom class(es) to apply to the parent element. */\r\n        class?: any;\r\n        /** The number of inputs to render.  @default 4 */\r\n        inputCount?: number;\r\n        /** The separator to render between inputs.  @default undefined */\r\n        separator?: string;\r\n      }\r\n    >(),\r\n    {\r\n      inputCount: 4,\r\n    }\r\n  );\r\n\r\n  const emits = defineEmits<PinInputRootEmits>();\r\n\r\n  const forwarded = useForwardPropsEmits(\r\n    reactiveOmit(props, "class", "inputCount", "separator"),\r\n    emits\r\n  );\r\n  const styles = tv({\r\n    base: "flex items-center gap-2",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "PinInput/PinInputInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <PinInputInput v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })" />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { PinInputInput } from "radix-vue";\r\n  import type { PinInputInputProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    PinInputInputProps & {\r\n      class?: any;\r\n    }\r\n  >();\r\n  const styles = tv({\r\n    base: "h-10 w-10 rounded-md border border-input bg-background p-1 text-center text-base font-medium placeholder:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Popover",
    value: "popover",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Popover/Anchor.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverAnchor v-bind="forwarded">\n    <slot></slot>\n  </PopoverAnchor>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverAnchor, useForwardProps } from "radix-vue";\n  import type { PopoverAnchorProps } from "radix-vue";\n\n  const props = defineProps<PopoverAnchorProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Arrow.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverArrow v-bind="forwarded" />\n</template>\n\n<script lang="ts" setup>\n  import { PopoverArrow, useForwardProps } from "radix-vue";\n  import type { PopoverArrowProps } from "radix-vue/dist/Popover/PopoverArrow";\n\n  const props = withDefaults(defineProps<PopoverArrowProps>(), {\n    width: 10,\n    height: 5,\n  });\n\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverClose v-bind="forwarded">\n    <slot> </slot>\n  </PopoverClose>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverClose, useForwardProps } from "radix-vue";\n  import type { PopoverCloseProps } from "radix-vue";\n\n  const props = defineProps<PopoverCloseProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiPopoverPortal :to="to">\n    <PopoverContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot></slot>\n    </PopoverContent>\n  </UiPopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverContent, useForwardPropsEmits } from "radix-vue";\n  import type { PopoverContentEmits, PopoverContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      PopoverContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      side: "bottom",\n      sideOffset: 8,\n      align: "start",\n      avoidCollisions: true,\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<PopoverContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "to", "class"), emits);\n\n  const styles = tv({\n    base: "z-50 w-72 rounded-md border bg-popover p-4 text-accent-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Popover/Popover.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverRoot v-bind="forwarded">\n    <slot></slot>\n  </PopoverRoot>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverRoot, useForwardPropsEmits } from "radix-vue";\n  import type { PopoverRootEmits, PopoverRootProps } from "radix-vue";\n\n  const props = defineProps<PopoverRootProps>();\n  const emits = defineEmits<PopoverRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Popover/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverPortal v-bind="forwarded">\n    <slot></slot>\n  </PopoverPortal>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverPortal, useForwardProps } from "radix-vue";\n  import type { PopoverPortalProps } from "radix-vue";\n\n  const props = defineProps<PopoverPortalProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Popover/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <PopoverTrigger v-bind="props">\n    <slot></slot>\n  </PopoverTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { PopoverTrigger } from "radix-vue";\n  import type { PopoverTriggerProps } from "radix-vue";\n\n  const props = defineProps<PopoverTriggerProps>();\n</script>\n',
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
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Progress/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ProgressIndicator v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot></slot>\n  </ProgressIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { ProgressIndicator } from "radix-vue";\n  import type { ProgressIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    ProgressIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",\n  });\n</script>\n',
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
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "RadioGroup/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupIndicator\n    v-bind="reactiveOmit(props, \'class\', \'icon\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <Icon :name="icon || \'ph:circle-fill\'" class="h-2.5 w-2.5 fill-current text-current" />\n    </slot>\n  </RadioGroupIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupIndicator } from "radix-vue";\n  import type { RadioGroupIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupIndicatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "flex items-center justify-center",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupItem\n    v-bind="reactiveOmit(props, \'class\', \'icon\')"\n    :class="styles({ class: props.class })"\n  >\n    <slot>\n      <UiRadioGroupIndicator :icon="props.icon" />\n    </slot>\n  </RadioGroupItem>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupItem } from "radix-vue";\n  import type { RadioGroupItemProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupItemProps & {\n      /** Class to apply to the item */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "RadioGroup/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <RadioGroupRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <slot></slot>\n  </RadioGroupRoot>\n</template>\n\n<script lang="ts" setup>\n  import { RadioGroupRoot, useForwardPropsEmits } from "radix-vue";\n  import type { RadioGroupRootEmits, RadioGroupRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      RadioGroupRootProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n      loop: true,\n    }\n  );\n\n  const emits = defineEmits<RadioGroupRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({ base: "grid gap-3" });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Scroll Area",
    value: "scroll-area",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "ScrollArea/Corner.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaCorner v-bind="props">\n    <slot></slot>\n  </ScrollAreaCorner>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaCorner } from "radix-vue";\n  import type { ScrollAreaCornerProps } from "radix-vue";\n\n  const props = defineProps<ScrollAreaCornerProps>();\n</script>\n',
      },
      {
        fileName: "ScrollArea/ScrollArea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaRoot v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <UiScrollAreaViewport>\n      <slot></slot>\n    </UiScrollAreaViewport>\n    <UiScrollAreaScrollbar :orientation="orientation" />\n    <UiScrollAreaCorner />\n  </ScrollAreaRoot>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaRoot } from "radix-vue";\n  import type { ScrollAreaRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaRootProps & {\n        /** Orientation for scrolling */\n        orientation?: "vertical" | "horizontal";\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n\n  const styles = tv({\n    base: "relative overflow-hidden",\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Scrollbar.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaScrollbar\n    v-bind="reactiveOmit(props, \'class\')"\n    :class="styles({ orientation, class: props.class })"\n  >\n    <slot></slot>\n    <UiScrollAreaThumb />\n  </ScrollAreaScrollbar>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaScrollbar } from "radix-vue";\n  import type { ScrollAreaScrollbarProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaScrollbarProps & {\n        /** Class to apply to the scrollbar */\n        class?: any;\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n\n  const styles = tv({\n    base: "flex touch-none select-none transition-colors",\n    variants: {\n      orientation: {\n        vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",\n        horizontal: "h-2.5 border-t border-t-transparent p-[1px]",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Thumb.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaThumb\n    v-bind="reactiveOmit(props, \'class\')"\n    :class="styles({ orientation, class: props.class })"\n  >\n    <slot></slot>\n  </ScrollAreaThumb>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaThumb } from "radix-vue";\n  import type { ScrollAreaThumbProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      ScrollAreaThumbProps & {\n        /** Custom class(es) to add to the parent */\n        class?: any;\n        orientation?: "vertical" | "horizontal";\n      }\n    >(),\n    {\n      orientation: "vertical",\n    }\n  );\n\n  const styles = tv({\n    base: "relative flex-1 rounded-full bg-border",\n    variants: {\n      orientation: {\n        vertical: "flex-1",\n        horizontal: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "ScrollArea/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ScrollAreaViewport v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot></slot>\n  </ScrollAreaViewport>\n</template>\n\n<script lang="ts" setup>\n  import { ScrollAreaViewport } from "radix-vue";\n  import type { ScrollAreaViewportProps } from "radix-vue";\n\n  const props = defineProps<\n    ScrollAreaViewportProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "h-full w-full rounded-[inherit]",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Select",
    value: "select",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["tailwindcss-animate", "nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
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
          '<template>\n  <UiSelectPortal :to="to">\n    <SelectContent\n      v-bind="{ ...forwarded, ...$attrs }"\n      :class="styles({ position, class: props.class })"\n    >\n      <UiSelectScrollUpButton />\n      <UiSelectViewport :position="position">\n        <slot></slot>\n      </UiSelectViewport>\n      <UiSelectScrollDownButton />\n    </SelectContent>\n  </UiSelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectContent, useForwardPropsEmits } from "radix-vue";\n  import type { SelectContentEmits, SelectContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      SelectContentProps & {\n        /** Where to render the portal */\n        to?: string | HTMLElement;\n        /** Custom class(es) to add to the parent */\n        class?: any;\n      }\n    >(),\n    {\n      position: "popper",\n      side: "bottom",\n      align: "start",\n      avoidCollisions: true,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<SelectContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-accent-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n    variants: {\n      position: {\n        popper:\n          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Select/Group.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectGroup v-bind="forwarded">\n    <slot></slot>\n  </SelectGroup>\n</template>\n\n<script lang="ts" setup>\n  import { SelectGroup, useForwardProps } from "radix-vue";\n  import type { SelectGroupProps } from "radix-vue";\n\n  const props = defineProps<SelectGroupProps>();\n  const forwarded = useForwardProps(props);\n</script>\n',
      },
      {
        fileName: "Select/Icon.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectIcon v-bind="forwarded">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:chevrons-up-down\'" />\n    </slot>\n  </SelectIcon>\n</template>\n\n<script lang="ts" setup>\n  import { SelectIcon, useForwardProps } from "radix-vue";\n  import type { SelectIconProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectIconProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n  const forwarded = useForwardProps(reactiveOmit(props, "class"));\n\n  const styles = tv({\n    base: "h-4 w-4 shrink-0 text-muted-foreground opacity-70",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItem\n    v-bind="reactiveOmit(props, \'class\', \'icon\', \'text\')"\n    :class="styles({ class: props.class })"\n  >\n    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\n      <UiSelectItemIndicator :icon="icon" />\n    </span>\n    <UiSelectItemText>\n      <slot>{{ text }}</slot>\n    </UiSelectItemText>\n  </SelectItem>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItem } from "radix-vue";\n  import type { SelectItemProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectItemProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to show */\n      icon?: string;\n      /** Text to show */\n      text?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemIndicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItemIndicator v-bind="reactiveOmit(props, \'class\', \'icon\')">\n    <slot>\n      <Icon :class="styles({ class: props.class })" :name="icon || \'lucide:check\'" />\n    </slot>\n  </SelectItemIndicator>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemIndicator } from "radix-vue";\n  import type { SelectItemIndicatorProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectItemIndicatorProps & {\n      /** Icon to render */\n      icon?: string;\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "h-4 w-4",\n  });\n</script>\n',
      },
      {
        fileName: "Select/ItemText.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectItemText v-bind="props">\n    <slot></slot>\n  </SelectItemText>\n</template>\n\n<script lang="ts" setup>\n  import { SelectItemText } from "radix-vue";\n  import type { SelectItemTextProps } from "radix-vue";\n\n  const props = defineProps<SelectItemTextProps>();\n</script>\n',
      },
      {
        fileName: "Select/Label.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectLabel :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </SelectLabel>\n</template>\n\n<script lang="ts" setup>\n  import { SelectLabel } from "radix-vue";\n  import type { SelectLabelProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectLabelProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "py-1.5 pl-8 pr-2 text-sm font-semibold",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectPortal v-bind="props">\n    <slot></slot>\n  </SelectPortal>\n</template>\n\n<script lang="ts" setup>\n  import { SelectPortal } from "radix-vue";\n  import type { SelectPortalProps } from "radix-vue";\n\n  const props = defineProps<SelectPortalProps>();\n</script>\n',
      },
      {
        fileName: "Select/ScrollDownButton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectScrollDownButton v-bind="reactiveOmit(props, \'icon\')">\n    <slot> <Icon :name="icon || \'lucide:chevron-down\'" class="h-5 w-5" /></slot>\n  </SelectScrollDownButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollDownButton } from "radix-vue";\n  import type { SelectScrollDownButtonProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectScrollDownButtonProps & {\n      /** Icon to render */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Select/ScrollUpButton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectScrollUpButton v-bind="reactiveOmit(props, \'icon\')">\n    <slot>\n      <Icon :name="icon || \'lucide:chevron-up\'" class="h-5 w-5" />\n    </slot>\n  </SelectScrollUpButton>\n</template>\n\n<script lang="ts" setup>\n  import { SelectScrollUpButton } from "radix-vue";\n  import type { SelectScrollUpButtonProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectScrollUpButtonProps & {\n      /** Icon to render */\n      icon?: string;\n    }\n  >();\n</script>\n',
      },
      {
        fileName: "Select/Select.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectRoot v-bind="forwarded">\n    <slot></slot>\n  </SelectRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SelectRoot, useForwardPropsEmits } from "radix-vue";\n  import type { SelectRootEmits, SelectRootProps } from "radix-vue";\n\n  const props = defineProps<SelectRootProps>();\n\n  const emits = defineEmits<SelectRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Select/Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectSeparator :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')" />\n</template>\n\n<script lang="ts" setup>\n  import { SelectSeparator } from "radix-vue";\n  import type { SelectSeparatorProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectSeparatorProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "-mx-1 my-1 h-px bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectTrigger\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'icon\', \'placeholder\')"\n  >\n    <slot>\n      <UiSelectValue :placeholder="placeholder" />\n    </slot>\n    <UiSelectIcon :icon="icon" />\n  </SelectTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { SelectTrigger } from "radix-vue";\n  import type { SelectTriggerProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectTriggerProps & {\n      /** Custom class(es) to add to the parent */\n      class?: any;\n      /** Icon to render */\n      icon?: string;\n      /** Placeholder text */\n      placeholder?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Select/Value.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectValue v-bind="props">\n    <slot></slot>\n  </SelectValue>\n</template>\n\n<script lang="ts" setup>\n  import { SelectValue } from "radix-vue";\n  import type { SelectValueProps } from "radix-vue";\n\n  const props = defineProps<SelectValueProps>();\n</script>\n',
      },
      {
        fileName: "Select/Viewport.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SelectViewport\n    :class="styles({ position, class: props.class })"\n    v-bind="reactiveOmit(props, \'class\')"\n  >\n    <slot></slot>\n  </SelectViewport>\n</template>\n\n<script lang="ts" setup>\n  import { SelectViewport } from "radix-vue";\n  import type { SelectViewportProps } from "radix-vue";\n\n  const props = defineProps<\n    SelectViewportProps & {\n      position?: "item-aligned" | "popper";\n      /** Custom class(es) to add to the parent */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "p-1",\n    variants: {\n      position: {\n        popper:\n          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",\n        "item-aligned": "",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Separator",
    value: "separator",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Separator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Separator\n    v-bind="useForwardProps(reactiveOmit(props, \'class\'))"\n    :class="styles({ orientation, class: props.class })"\n  />\n</template>\n\n<script lang="ts" setup>\n  import { Separator, useForwardProps } from "radix-vue";\n  import type { SeparatorProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<SeparatorProps & { class?: any }>(), {\n    orientation: "horizontal",\n  });\n\n  const styles = tv({\n    base: "shrink-0 bg-border",\n    variants: {\n      orientation: {\n        horizontal: "h-[1px] w-full",\n        vertical: "h-full w-[1px]",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Sheet",
    value: "sheet",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    files: [
      {
        fileName: "Sheet/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose v-bind="props">\n    <slot> </slot>\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = defineProps<DialogCloseProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiSheetPortal :to="to">\n    <slot name="overlay">\n      <UiSheetOverlay />\n    </slot>\n    <DialogContent\n      :class="styles({ side, class: props.class })"\n      v-bind="{ ...forwarded, ...$attrs }"\n    >\n      <slot>\n        <slot name="header">\n          <UiSheetHeader>\n            <slot name="title">\n              <UiSheetTitle v-if="title" :title="title" />\n            </slot>\n            <slot name="description">\n              <UiSheetDescription v-if="description" :description="description" />\n            </slot>\n          </UiSheetHeader>\n        </slot>\n        <slot name="content"></slot>\n        <slot name="footer"></slot>\n      </slot>\n      <slot name="close">\n        <UiDialogClose :icon="icon" />\n      </slot>\n    </DialogContent>\n  </UiSheetPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogContent, useForwardPropsEmits } from "radix-vue";\n  import type { DialogContentEmits, DialogContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = defineProps<\n    DialogContentProps & {\n      icon?: string;\n      title?: string;\n      description?: string;\n      class?: any;\n      side?: VariantProps<typeof styles>["side"];\n      to?: string | HTMLElement;\n    }\n  >();\n  const emits = defineEmits<DialogContentEmits>();\n  const forwarded = useForwardPropsEmits(\n    reactiveOmit(props, "icon", "title", "description", "class", "to", "side"),\n    emits\n  );\n\n  const styles = tv({\n    base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",\n    variants: {\n      side: {\n        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",\n        bottom:\n          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",\n        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",\n        right:\n          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",\n      },\n    },\n    defaultVariants: {\n      side: "left",\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogDescription\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'description\')"\n  >\n    <slot>{{ description }}</slot>\n  </DialogDescription>\n</template>\n\n<script lang="ts" setup>\n  import { DialogDescription } from "radix-vue";\n  import type { DialogDescriptionProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogDescriptionProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n      /** Description text */\n      description?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const styles = tv({\n    base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n\n  const styles = tv({\n    base: "flex flex-col space-y-2 text-center sm:text-left",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Overlay.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogOverlay :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')" />\n</template>\n\n<script lang="ts" setup>\n  import { DialogOverlay } from "radix-vue";\n  import type { DialogOverlayProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogOverlayProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogPortal v-bind="props">\n    <slot></slot>\n  </DialogPortal>\n</template>\n\n<script lang="ts" setup>\n  import { DialogPortal } from "radix-vue";\n  import type { DialogPortalProps } from "radix-vue";\n\n  const props = defineProps<DialogPortalProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/Sheet.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogRoot v-bind="forwarded">\n    <slot></slot>\n  </DialogRoot>\n</template>\n\n<script lang="ts" setup>\n  import { DialogRoot, useForwardPropsEmits } from "radix-vue";\n  import type { DialogRootEmits, DialogRootProps } from "radix-vue";\n\n  const props = defineProps<DialogRootProps>();\n  const emit = defineEmits<DialogRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emit);\n</script>\n',
      },
      {
        fileName: "Sheet/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTitle\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'title\')"\n  >\n    <slot>{{ title }}</slot>\n  </DialogTitle>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTitle } from "radix-vue";\n  import type { DialogTitleProps } from "radix-vue";\n\n  const props = defineProps<\n    DialogTitleProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n      /** Title text */\n      title?: string;\n    }\n  >();\n\n  const styles = tv({\n    base: "text-lg font-semibold text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Sheet/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogTrigger v-bind="props">\n    <slot></slot>\n  </DialogTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { DialogTrigger } from "radix-vue";\n  import type { DialogTriggerProps } from "radix-vue";\n\n  const props = defineProps<DialogTriggerProps>();\n</script>\n',
      },
      {
        fileName: "Sheet/X.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <DialogClose\n    :class="styles({ class: props.class })"\n    v-bind="reactiveOmit(props, \'srText\', \'class\', \'icon\')"\n  >\n    <slot>\n      <Icon :name="icon" class="h-4 w-4" />\n      <span class="sr-only">{{ srText }}</span>\n    </slot>\n  </DialogClose>\n</template>\n\n<script lang="ts" setup>\n  import { DialogClose } from "radix-vue";\n  import type { DialogCloseProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      DialogCloseProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Icon to display */\n        icon?: string;\n        /** Screen reader text */\n        srText?: string;\n      }\n    >(),\n    {\n      icon: "heroicons:x-mark",\n      srText: "Close",\n    }\n  );\n\n  const styles = tv({\n    base: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Skeleton",
    value: "skeleton",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Skeleton.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <Primitive\n    :class="styles({ loading, class: props.class })"\n    v-bind="reactiveOmit(props, \'class\', \'loading\')"\n  >\n    <slot></slot>\n  </Primitive>\n</template>\n\n<script lang="ts" setup>\n  import { Primitive } from "radix-vue";\n  import type { PrimitiveProps } from "radix-vue";\n\n  const styles = tv({\n    base: "animate-pulse rounded-md bg-muted",\n    variants: {\n      loading: { true: "cursor-wait", false: "cursor-default" },\n    },\n  });\n\n  const props = withDefaults(\n    defineProps<\n      PrimitiveProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Whether the skeleton is loading */\n        loading?: boolean;\n      }\n    >(),\n    {\n      as: "div",\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Slider",
    value: "slider",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Slider/Range.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderRange :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </SliderRange>\n</template>\n\n<script lang="ts" setup>\n  import { SliderRange } from "radix-vue";\n  import type { SliderRangeProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderRangeProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n  const styles = tv({\n    base: "absolute h-full bg-primary",\n  });\n</script>\n',
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
          '<template>\n  <SliderThumb :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </SliderThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SliderThumb } from "radix-vue";\n  import type { SliderThumbProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",\n  });\n</script>\n',
      },
      {
        fileName: "Slider/Track.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SliderTrack :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </SliderTrack>\n</template>\n\n<script lang="ts" setup>\n  import { SliderTrack } from "radix-vue";\n  import type { SliderTrackProps } from "radix-vue";\n\n  const props = defineProps<\n    SliderTrackProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Switch",
    value: "switch",
    deps: ["radix-vue", "tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Switch/Switch.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SwitchRoot v-bind="forwarded" :class="styles({ class: props.class })">\n    <UiSwitchThumb>\n      <slot></slot>\n    </UiSwitchThumb>\n  </SwitchRoot>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchRoot, useForwardPropsEmits } from "radix-vue";\n  import type { SwitchRootEmits, SwitchRootProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      SwitchRootProps & {\n        class?: any;\n        id?: any;\n      }\n    >(),\n    {\n      as: "button",\n    }\n  );\n  const emits = defineEmits<SwitchRootEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\n\n  const styles = tv({\n    base: "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",\n  });\n</script>\n',
      },
      {
        fileName: "Switch/Thumb.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <SwitchThumb :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </SwitchThumb>\n</template>\n\n<script lang="ts" setup>\n  import { SwitchThumb } from "radix-vue";\n  import type { SwitchThumbProps } from "radix-vue";\n\n  const props = defineProps<\n    SwitchThumbProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Table",
    value: "table",
    deps: ["tailwind-variants"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Table/Body.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tbody :class="styles({ class: props.class })">\n    <slot></slot>\n  </tbody>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "[&_tr:last-child]:border-0",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Caption.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <caption :class="styles({ class: props.class })">\n    <slot></slot>\n  </caption>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "mt-4 text-sm text-muted-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Cell.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <td :class="styles({ class: props.class })">\n    <slot></slot>\n  </td>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "whitespace-nowrap p-4 align-middle",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Empty.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiTableRow>\n    <UiTableCell :colspan="colspan" :class="styles({ class: props.class })">\n      <slot></slot>\n    </UiTableCell>\n  </UiTableRow>\n</template>\n\n<script lang="ts" setup>\n  const props = withDefaults(\n    defineProps<{\n      colspan?: number;\n      class?: any;\n    }>(),\n    {\n      colspan: 1,\n    }\n  );\n\n  const styles = tv({\n    base: "whitespace-nowrap p-4 align-middle text-sm text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Footer.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tfoot :class="styles({ class: props.class })">\n    <slot></slot>\n  </tfoot>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "bg-primary font-medium text-primary-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Head.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <th :class="styles({ class: props.class })">\n    <slot></slot>\n  </th>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "h-12 px-4 text-left align-middle font-medium text-muted-foreground hover:text-foreground",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Header.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <thead :class="styles({ class: props.class })">\n    <slot></slot>\n  </thead>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "[&_tr]:border-b",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Row.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <tr :class="styles({ class: props.class })">\n    <slot></slot>\n  </tr>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",\n  });\n</script>\n',
      },
      {
        fileName: "Table/Table.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <table :class="styles({ class: props.class })">\n    <slot></slot>\n  </table>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n  }>();\n\n  const styles = tv({\n    base: "w-full caption-bottom border-collapse text-sm",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tabs",
    value: "tabs",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Tabs/Content.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsContent v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\n    <slot></slot>\n  </TabsContent>\n</template>\n\n<script lang="ts" setup>\n  import { TabsContent } from "radix-vue";\n  import type { TabsContentProps } from "radix-vue";\n\n  const props = defineProps<\n    TabsContentProps & {\n      /** Custom class(es) to add to parent element */\n      class?: any;\n    }\n  >();\n\n  const styles = tv({\n    base: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Indicator.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ClientOnly>\r\n    <TabsIndicator\r\n      v-bind="{ ...reactiveOmit(props, \'class\'), ...$attrs }"\r\n      :class="styles({ class: props.class })"\r\n    >\r\n      <slot>\r\n        <div class="h-full w-full rounded-md bg-primary"></div>\r\n      </slot>\r\n    </TabsIndicator>\r\n  </ClientOnly>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TabsIndicator, withDefault } from "radix-vue";\r\n  import type { TabsIndicatorProps } from "radix-vue";\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const props = defineProps<\r\n    TabsIndicatorProps & {\r\n      /** Custom class(es) to add to parent element */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "absolute bottom-0 left-0 h-[3px] w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full px-1 transition-[width,transform] duration-300",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Tabs/List.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsList :class="styles({ pill, class: props.class })" v-bind="reactiveOmit(props, \'class\')">\n    <slot></slot>\n  </TabsList>\n</template>\n\n<script lang="ts" setup>\n  import { TabsList } from "radix-vue";\n  import type { TabsListProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsListProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        pill?: boolean;\n      }\n    >(),\n    { pill: true }\n  );\n\n  const styles = tv({\n    base: "inline-flex h-10 items-center justify-center rounded-md  p-1 text-muted-foreground",\n    variants: {\n      pill: {\n        true: "bg-muted",\n        false: "",\n      },\n    },\n  });\n</script>\n',
      },
      {
        fileName: "Tabs/Tabs.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsRoot v-bind="forwarded">\n    <slot></slot>\n  </TabsRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TabsRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TabsRootEmits, TabsRootProps } from "radix-vue";\n\n  const props = withDefaults(defineProps<TabsRootProps>(), {\n    orientation: "horizontal",\n    activationMode: "automatic",\n  });\n  const emits = defineEmits<TabsRootEmits>();\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Tabs/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TabsTrigger v-bind="reactiveOmit(props, \'class\')" :class="styles({ pill, class: props.class })">\n    <slot></slot>\n  </TabsTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TabsTrigger } from "radix-vue";\n  import type { TabsTriggerProps } from "radix-vue";\n\n  const props = withDefaults(\n    defineProps<\n      TabsTriggerProps & {\n        /** Custom class(es) to add to parent element */\n        class?: any;\n        /** Whether the trigger should be pill-shaped */\n        pill?: boolean;\n      }\n    >(),\n    {\n      pill: true,\n    }\n  );\n\n  const styles = tv({\n    base: "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",\n    variants: {\n      pill: {\n        true: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",\n        false:\n          "data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",\n      },\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tags Input",
    value: "tags-input",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "TagsInput/Clear.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputClear v-bind="props" :class="styles({ class: props.class })">\r\n    <slot>\r\n      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />\r\n    </slot>\r\n  </TagsInputClear>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputClear } from "radix-vue";\r\n  import type { TagsInputClearProps } from "radix-vue";\r\n\r\n  const props = withDefaults(defineProps<TagsInputClearProps & { icon?: string; class?: any }>(), {\r\n    icon: "lucide:x",\r\n  });\r\n  const styles = tv({\r\n    base: "flex items-center justify-center rounded bg-transparent p-1 opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "TagsInput/Field.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputInput v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\r\n    <slot></slot>\r\n  </TagsInputInput>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputInput } from "radix-vue";\r\n  import type { TagsInputInputProps } from "radix-vue";\r\n\r\n  const props = defineProps<TagsInputInputProps & { class?: any }>();\r\n\r\n  const styles = tv({\r\n    base: "flex-1 bg-transparent focus:outline-none sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "TagsInput/Item.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputItem\r\n    v-bind="reactiveOmit(props, \'class\', \'icon\')"\r\n    :class="styles({ class: props.class })"\r\n  >\r\n    <slot>\r\n      <slot name="text">\r\n        <UiTagsInputItemText />\r\n      </slot>\r\n      <slot name="delete">\r\n        <UiTagsInputItemDelete :icon="icon" />\r\n      </slot>\r\n    </slot>\r\n  </TagsInputItem>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputItem } from "radix-vue";\r\n  import type { TagsInputItemProps } from "radix-vue";\r\n\r\n  const props = defineProps<TagsInputItemProps & { class?: any; icon?: string }>();\r\n  const styles = tv({\r\n    base: "inline-flex h-6 shrink-0 items-center gap-1.5 rounded bg-primary pl-2 pr-1 leading-none text-primary-foreground sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "TagsInput/ItemDelete.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputItemDelete\r\n    v-bind="reactiveOmit(props, \'icon\', \'class\')"\r\n    :class="styles({ class: props.class })"\r\n  >\r\n    <slot>\r\n      <Icon v-if="icon" :name="icon" class="h-3.5 w-3.5" />\r\n    </slot>\r\n  </TagsInputItemDelete>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputItemDelete } from "radix-vue";\r\n  import type { TagsInputItemDeleteProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<TagsInputItemDeleteProps & { icon?: string; class?: any }>(),\r\n    {\r\n      icon: "lucide:x",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "flex items-center justify-center rounded bg-transparent opacity-40 transition hover:bg-muted-foreground hover:opacity-100 focus:opacity-100 focus-visible:outline-none",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "TagsInput/ItemText.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputItemText v-bind="reactiveOmit(props, \'class\')" :class="styles({ class: props.class })">\r\n    <slot></slot>\r\n  </TagsInputItemText>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputItemText } from "radix-vue";\r\n  import type { TagsInputItemTextProps } from "radix-vue";\r\n\r\n  const props = defineProps<TagsInputItemTextProps & { class?: any }>();\r\n\r\n  const styles = tv({\r\n    base: "leading-none sm:text-sm",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "TagsInput/TagsInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <TagsInputRoot v-bind="forwarded" :class="styles({ class: props.class })">\r\n    <slot></slot>\r\n  </TagsInputRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { TagsInputRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { TagsInputRootEmits, TagsInputRootProps } from "radix-vue";\r\n\r\n  const props = defineProps<TagsInputRootProps & { class?: any }>();\r\n  const emits = defineEmits<TagsInputRootEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\r\n\r\n  const styles = tv({\r\n    base: "flex min-h-[40px] w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 leading-none transition focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tanstack Table",
    value: "tanstacktable",
    deps: ["tailwind-variants", "@tanstack/vue-table"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    components: ["checkbox"],
    files: [
      {
        fileName: "TanStackTable.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div>\n    <div :class="styles({ class: props.class })">\n      <UiTable :class="tableClass">\n        <UiTableHeader>\n          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">\n            <UiTableHead\n              v-for="header in headerGroup.headers"\n              :key="header.id"\n              :colspan="header.colSpan"\n              @click="header.column.getToggleSortingHandler()?.($event)"\n              :class="[header.column.getCanSort() && \'cursor-pointer select-none\']"\n            >\n              <template v-if="!header.isPlaceholder">\n                <div class="flex items-center gap-3">\n                  <FlexRender\n                    :render="header.column.columnDef.header"\n                    :props="header.getContext()"\n                  />\n                  <Icon\n                    v-if="header.column.getCanSort() && header.column.getIsSorted() === \'asc\'"\n                    :name="ascIcon"\n                    class="h-4 w-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && header.column.getIsSorted() === \'desc\'"\n                    :name="descIcon"\n                    class="h-4 w-4"\n                  />\n                  <Icon\n                    v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"\n                    :name="unsortedIcon"\n                    class="h-5 w-5"\n                  />\n                </div>\n              </template>\n            </UiTableHead>\n          </UiTableRow>\n        </UiTableHeader>\n\n        <UiTableBody>\n          <UiTableRow\n            v-for="row in table.getRowModel().rows"\n            :key="row.id"\n            :data-state="row.getIsSelected() ? \'selected\' : \'\'"\n          >\n            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">\n              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />\n            </UiTableCell>\n          </UiTableRow>\n\n          <UiTableEmpty\n            v-if="table.getRowModel().rows.length === 0"\n            :colspan="table.getAllLeafColumns().length"\n          >\n            <slot :table="table" name="empty"> No data available. </slot>\n          </UiTableEmpty>\n        </UiTableBody>\n      </UiTable>\n    </div>\n\n    <div\n      v-if="showPagination"\n      class="my-6 flex flex-col justify-between gap-4 px-2 md:flex-row md:items-center"\n    >\n      <div class="flex items-center justify-between gap-3">\n        <slot name="rowsSelected" :table="table">\n          <div v-if="showSelect" class="whitespace-nowrap text-sm text-muted-foreground">\n            <span>\n              {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}\n              {{ table.getFilteredRowModel().rows.length }} row(s) selected\n            </span>\n          </div>\n        </slot>\n        <slot name="rowsPerPage" :table="table">\n          <div class="flex items-center space-x-2 whitespace-nowrap">\n            <p class="hidden text-sm font-medium text-foreground md:inline-block">\n              {{ rowsPerPageText }}\n            </p>\n            <UiSelect v-model="pageSize">\n              <UiSelectTrigger class="h-9 w-[70px]">\n                {{ table.getState().pagination.pageSize }}\n              </UiSelectTrigger>\n              <UiSelectContent side="top" align="start">\n                <UiSelectGroup>\n                  <UiSelectItem\n                    v-for="pageSize in pageSizes"\n                    :key="pageSize"\n                    :value="`${pageSize}`"\n                  >\n                    {{ pageSize }}\n                  </UiSelectItem>\n                </UiSelectGroup>\n              </UiSelectContent>\n            </UiSelect>\n          </div>\n        </slot>\n      </div>\n\n      <div class="flex items-center justify-between gap-3">\n        <slot :table="table" name="page">\n          <div\n            class="flex items-center justify-center whitespace-nowrap text-sm font-medium text-foreground"\n          >\n            Page {{ table.getState().pagination.pageIndex + 1 }} of\n            {{ table.getPageCount() }}\n          </div>\n        </slot>\n\n        <slot :table="table" name="pageButtons">\n          <div class="flex items-center space-x-2">\n            <UiButton\n              variant="outline"\n              title="First page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanPreviousPage()"\n              @click="table.setPageIndex(0)"\n            >\n              <Icon name="lucide:chevrons-left" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Previous page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanPreviousPage()"\n              @click="table.previousPage()"\n            >\n              <Icon name="lucide:chevron-left" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Next page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanNextPage()"\n              @click="table.nextPage()"\n            >\n              <Icon name="lucide:chevron-right" class="h-4 w-4" />\n            </UiButton>\n            <UiButton\n              variant="outline"\n              title="Last page"\n              class="h-9 w-9 p-0"\n              :disabled="!table.getCanNextPage()"\n              @click="table.setPageIndex(table.getPageCount() - 1)"\n            >\n              <Icon name="lucide:chevrons-right" class="h-4 w-4" />\n            </UiButton>\n          </div>\n        </slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup generic="T">\n  import CheckBox from "@/components/UI/Checkbox/Checkbox.vue";\n  import {\n    FlexRender,\n    getCoreRowModel,\n    getFilteredRowModel,\n    getPaginationRowModel,\n    getSortedRowModel,\n    useVueTable,\n  } from "@tanstack/vue-table";\n  import type { ColumnDef, SortingState, Table } from "@tanstack/vue-table";\n\n  const props = withDefaults(\n    defineProps<{\n      data?: T[];\n      columns?: ColumnDef<T>[];\n      search?: string;\n      showSelect?: boolean;\n      pageSizes?: number[];\n      pageSize?: number;\n      sorting?: SortingState;\n      tableClass?: any;\n      ascIcon?: string;\n      descIcon?: string;\n      unsortedIcon?: string;\n      class?: any;\n      showPagination?: boolean;\n      rowsPerPageText?: string;\n    }>(),\n    {\n      pageSizes: () => [10, 20, 30, 40, 50, 100],\n      pageSize: () => 10,\n      columns: () => [],\n      data: () => [],\n      sorting: () => [],\n      ascIcon: "heroicons:chevron-up",\n      descIcon: "heroicons:chevron-down",\n      unsortedIcon: "heroicons:chevron-up-down",\n      showPagination: true,\n      rowsPerPageText: "Rows per page:",\n    }\n  );\n\n  defineOptions({ inheritAttrs: false });\n\n  const styles = tv({\n    base: "w-full overflow-x-auto",\n  });\n\n  const checkBoxHeader: ColumnDef<any> = {\n    id: "checkbox",\n    header: ({ table }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center" },\n        h(CheckBox, {\n          checked: table.getIsAllRowsSelected()\n            ? true\n            : table.getIsSomeRowsSelected()\n              ? "indeterminate"\n              : false,\n          "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),\n          ariaLabel: "Select all",\n        })\n      );\n    },\n    cell: ({ row }) => {\n      return h(\n        "div",\n        { class: "flex items-center justify-center " },\n        h(CheckBox, {\n          checked: row.getIsSelected(),\n          "onUpdate:checked": (value) => row.toggleSelected(!!value),\n          ariaLabel: "Select row",\n        })\n      );\n    },\n    enableSorting: false,\n    enableHiding: false,\n  };\n\n  const localColumns: ColumnDef<T>[] = [...props.columns];\n\n  if (props.showSelect) {\n    localColumns.unshift(checkBoxHeader);\n  }\n\n  const emit = defineEmits<{\n    ready: [table: Table<T>];\n  }>();\n\n  const localSorting = ref(props.sorting);\n  const globalFilter = ref(props.search);\n  const columnVisibility = ref({});\n  const rowSelection = ref({});\n\n  const table = useVueTable({\n    get data() {\n      return props.data;\n    },\n    get columns() {\n      return localColumns;\n    },\n    initialState: {\n      pagination: {\n        pageSize: props.pageSize,\n      },\n      rowSelection: rowSelection.value,\n      globalFilter: props.search,\n    },\n    state: {\n      get sorting() {\n        return localSorting.value;\n      },\n      get globalFilter() {\n        return props.search;\n      },\n      get columnVisibility() {\n        return columnVisibility.value;\n      },\n      get rowSelection() {\n        return rowSelection.value;\n      },\n    },\n    onSortingChange: (updaterOrValue) => {\n      localSorting.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(localSorting.value) : updaterOrValue;\n    },\n    onGlobalFilterChange: (updaterOrValue) => {\n      globalFilter.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;\n    },\n    onRowSelectionChange: (updaterOrValue) => {\n      rowSelection.value =\n        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;\n    },\n    getCoreRowModel: getCoreRowModel(),\n    getSortedRowModel: getSortedRowModel(),\n    getPaginationRowModel: getPaginationRowModel(),\n    getFilteredRowModel: getFilteredRowModel(),\n    enableRowSelection: () => !!props.showSelect,\n  });\n\n  function toggleColumnVisibility(column: any) {\n    columnVisibility.value = {\n      ...columnVisibility.value,\n      [column.id]: !column.getIsVisible(),\n    };\n  }\n\n  const pageSize = computed({\n    get() {\n      return table.getState().pagination.pageSize.toString();\n    },\n    set(value) {\n      table.setPageSize(Number(value));\n    },\n  });\n\n  onMounted(() => {\n    emit("ready", table);\n  });\n\n  defineExpose({ toggleColumnVisibility });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Textarea",
    value: "textarea",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: ["@vueuse/core", "@vueuse/nuxt"],
    nuxtModules: ["@vueuse/nuxt"],
    files: [
      {
        fileName: "Textarea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <textarea :class="styles({ class: props.class })" v-bind="props" v-model="localModel" />\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    class?: any;\n    name?: string;\n    id?: string;\n    placeholder?: string;\n    required?: boolean;\n    disabled?: boolean;\n    rows?: number;\n    modelValue?: string;\n  }>();\n\n  const emits = defineEmits<{\n    "update:modelValue": [value: any];\n  }>();\n\n  const localModel = useVModel(props, "modelValue", emits);\n\n  const styles = tv({\n    base: "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Toast",
    value: "toast",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: ["nuxt-icon"],
    nuxtModules: ["nuxt-icon"],
    composables: [
      {
        fileName: "useToast.ts",
        dirPath: "composables",
        fileContent:
          'import type { ToastProps } from "@/components/UI/Toast/Toast.vue";\n\nconst TOAST_LIMIT = 3;\nconst TOAST_REMOVE_DELAY = 7000;\n\nexport type StringOrVNode = string | VNode | (() => VNode);\n\ntype ToasterToast = ToastProps & {\n  id: string;\n  title?: string;\n  description?: StringOrVNode;\n  action?: Component;\n  icon?: string;\n};\n\nconst actionTypes = {\n  ADD_TOAST: "ADD_TOAST",\n  UPDATE_TOAST: "UPDATE_TOAST",\n  DISMISS_TOAST: "DISMISS_TOAST",\n  REMOVE_TOAST: "REMOVE_TOAST",\n} as const;\n\nlet count = 0;\n\nfunction genId() {\n  count = (count + 1) % Number.MAX_VALUE;\n  return count.toString();\n}\n\ntype ActionType = typeof actionTypes;\n\ntype Action =\n  | {\n      type: ActionType["ADD_TOAST"];\n      toast: ToasterToast;\n    }\n  | {\n      type: ActionType["UPDATE_TOAST"];\n      toast: Partial<ToasterToast>;\n    }\n  | {\n      type: ActionType["DISMISS_TOAST"];\n      toastId?: ToasterToast["id"];\n    }\n  | {\n      type: ActionType["REMOVE_TOAST"];\n      toastId?: ToasterToast["id"];\n    };\n\ninterface State {\n  toasts: ToasterToast[];\n}\n\nconst toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();\n\nfunction addToRemoveQueue(toastId: string) {\n  if (toastTimeouts.has(toastId)) return;\n\n  const timeout = setTimeout(() => {\n    toastTimeouts.delete(toastId);\n    dispatch({\n      type: actionTypes.REMOVE_TOAST,\n      toastId,\n    });\n  }, TOAST_REMOVE_DELAY);\n\n  toastTimeouts.set(toastId, timeout);\n}\n\nconst state = ref<State>({\n  toasts: [],\n});\n\nfunction dispatch(action: Action) {\n  switch (action.type) {\n    case actionTypes.ADD_TOAST:\n      state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT);\n      break;\n\n    case actionTypes.UPDATE_TOAST:\n      state.value.toasts = state.value.toasts.map((t) =>\n        t.id === action.toast.id ? { ...t, ...action.toast } : t\n      );\n      break;\n\n    case actionTypes.DISMISS_TOAST: {\n      const { toastId } = action;\n\n      if (toastId) {\n        addToRemoveQueue(toastId);\n      } else {\n        state.value.toasts.forEach((toast) => {\n          addToRemoveQueue(toast.id);\n        });\n      }\n\n      state.value.toasts = state.value.toasts.map((t) =>\n        t.id === toastId || toastId === undefined\n          ? {\n              ...t,\n              open: false,\n            }\n          : t\n      );\n      break;\n    }\n\n    case actionTypes.REMOVE_TOAST:\n      if (action.toastId === undefined) state.value.toasts = [];\n      else state.value.toasts = state.value.toasts.filter((t) => t.id !== action.toastId);\n\n      break;\n  }\n}\n\nfunction useToast() {\n  return {\n    toasts: computed(() => state.value.toasts),\n    toast,\n    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),\n  };\n}\n\ntype Toast = Omit<ToasterToast, "id">;\n\nfunction toast(props: Toast) {\n  const id = genId();\n\n  const update = (props: ToasterToast) =>\n    dispatch({\n      type: actionTypes.UPDATE_TOAST,\n      toast: { ...props, id },\n    });\n\n  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });\n\n  dispatch({\n    type: actionTypes.ADD_TOAST,\n    toast: {\n      ...props,\n      id,\n      open: true,\n      onOpenChange: (open: boolean) => {\n        if (!open) dismiss();\n      },\n    },\n  });\n\n  return {\n    id,\n    dismiss,\n    update,\n  };\n}\n\nexport { toast, useToast };\n',
      },
    ],
    instructions: ["Remeber to add <UiToastToaster /> to your app.vue/layout file."],
    files: [
      {
        fileName: "Toast/Action.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastAction :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot></slot>\r\n  </ToastAction>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastAction } from "radix-vue";\r\n  import type { ToastActionProps } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<\r\n      ToastActionProps & {\r\n        /**\r\n         * Custom class names to add to the button.\r\n         */\r\n        class?: any;\r\n      }\r\n    >(),\r\n    {\r\n      altText: "Action button",\r\n    }\r\n  );\r\n\r\n  const styles = tv({\r\n    base: "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3  text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Toast/Close.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastClose :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\', \'icon\')">\r\n    <slot>\r\n      <Icon :name="icon || \'lucide:x\'" class="h-4 w-4" />\r\n    </slot>\r\n  </ToastClose>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastClose } from "radix-vue";\r\n  import type { ToastCloseProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    ToastCloseProps & {\r\n      /**\r\n       * Custom class names to add to the button.\r\n       */\r\n      class?: any;\r\n      /**\r\n       * The icon to render.\r\n       */\r\n      icon?: string;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "absolute right-2 top-2 inline-flex items-center justify-center rounded-md p-1 text-foreground/50 opacity-50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus-visible:ring-ring  group-hover:opacity-100",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Toast/Description.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastDescription\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'description\')"\r\n  >\r\n    <slot>{{ description }}</slot>\r\n  </ToastDescription>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastDescription } from "radix-vue";\r\n  import type { ToastDescriptionProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    ToastDescriptionProps & {\r\n      /** The description text to render */\r\n      description?: string;\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "text-sm opacity-90",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Toast/Provider.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastProvider v-bind="props">\r\n    <slot></slot>\r\n  </ToastProvider>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastProvider } from "radix-vue";\r\n  import type { ToastProviderProps } from "radix-vue";\r\n\r\n  const props = withDefaults(defineProps<ToastProviderProps>(), {\r\n    label: "Notification",\r\n    swipeDirection: "right",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Toast/Title.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastTitle\r\n    :class="styles({ class: props.class })"\r\n    v-bind="reactiveOmit(props, \'class\', \'title\')"\r\n  >\r\n    <slot>{{ title }}</slot>\r\n  </ToastTitle>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastTitle } from "radix-vue";\r\n  import type { ToastTitleProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    ToastTitleProps & {\r\n      /** The title text to render */\r\n      title?: string;\r\n      /** Custom class(es) to add to the parent */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "text-sm font-semibold",\r\n  });\r\n</script>\r\n',
      },
      {
        fileName: "Toast/Toast.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <ToastRoot\r\n    v-bind="forwarded"\r\n    :class="styles({ variant, class: props.class })"\r\n    @update:open="onOpenChange"\r\n  >\r\n    <slot></slot>\r\n  </ToastRoot>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastRoot, useForwardPropsEmits } from "radix-vue";\r\n  import type { ToastRootEmits, ToastRootProps } from "radix-vue";\r\n\r\n  export interface ToastProps extends ToastRootProps {\r\n    /**\r\n     * Custom class names to add to the toast.\r\n     */\r\n    class?: any;\r\n    /**\r\n     * The variant of the toast.\r\n     */\r\n    variant?: VariantProps<typeof styles>["variant"];\r\n    /**\r\n     * Callback that fires when the toast is closed.\r\n     */\r\n    onOpenChange?: ((value: boolean) => void) | undefined;\r\n  }\r\n\r\n  const props = withDefaults(defineProps<ToastProps>(), {});\r\n\r\n  const emits = defineEmits<ToastRootEmits>();\r\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);\r\n\r\n  const styles = tv({\r\n    base: "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-md border p-4 pr-9 shadow-sm transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",\r\n    variants: {\r\n      variant: {\r\n        default: "border bg-background text-foreground",\r\n        success:\r\n          "success group border-[var(--success-border)] bg-[--success-bg] text-[--success-text]",\r\n        info: "info group border-[var(--info-border)] bg-[--info-bg] text-[--info-text]",\r\n        warning:\r\n          "warning group border-[var(--warning-border)] bg-[--warning-bg] text-[--warning-text]",\r\n        destructive:\r\n          "destructive group border-[var(--error-border)] bg-[--error-bg] text-[--error-text]",\r\n      },\r\n    },\r\n    defaultVariants: {\r\n      variant: "default",\r\n    },\r\n  });\r\n</script>\r\n',
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
          '<template>\r\n  <ToastViewport :class="styles({ class: props.class })" v-bind="reactiveOmit(props, \'class\')">\r\n    <slot></slot>\r\n  </ToastViewport>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { ToastViewport } from "radix-vue";\r\n  import type { ToastViewportProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    ToastViewportProps & {\r\n      /**\r\n       * Custom class names to add to the button.\r\n       */\r\n      class?: any;\r\n    }\r\n  >();\r\n\r\n  const styles = tv({\r\n    base: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  sm:bottom-auto sm:right-0 sm:flex-col md:max-w-[420px]",\r\n  });\r\n</script>\r\n\r\n<style>\r\n  [aria-label~="Notifications"] {\r\n    display: grid;\r\n  }\r\n</style>\r\n',
      },
    ],
    utils: [],
    plugins: [],
  },
  {
    name: "Toggle",
    value: "toggle",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: [],
    nuxtModules: [],
    files: [
      {
        fileName: "Toggle.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <ToggleRoot v-bind="forwarded" :class="styles({ variant, size, class: props.class })">\n    <slot></slot>\n  </ToggleRoot>\n</template>\n\n<script lang="ts" setup>\n  import { Toggle as ToggleRoot, useForwardPropsEmits } from "radix-vue";\n  import type { ToggleEmits, ToggleProps } from "radix-vue";\n\n  const props = defineProps<\n    ToggleProps & {\n      class?: any;\n      variant?: Props["variant"];\n      size?: Props["size"];\n    }\n  >();\n\n  const emits = defineEmits<ToggleEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"), emits);\n\n  type Props = VariantProps<typeof styles>;\n\n  const styles = tv({\n    base: "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground sm:text-sm",\n    variants: {\n      variant: {\n        default: "bg-transparent",\n        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        default: "h-10 px-3",\n        sm: "h-9 px-2.5",\n        lg: "h-11 px-5",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Tooltip",
    value: "tooltip",
    deps: ["tailwind-variants", "radix-vue"],
    devDeps: [],
    nuxtModules: [],
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
          '<template>\n  <UiTooltipPortal :to="to">\n    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="styles({ class: props.class })">\n      <slot></slot>\n    </TooltipContent>\n  </UiTooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipContent, useForwardPropsEmits } from "radix-vue";\n  import type { TooltipContentEmits, TooltipContentProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n\n  const props = withDefaults(\n    defineProps<\n      TooltipContentProps & {\n        to?: string | HTMLElement;\n        class?: any;\n      }\n    >(),\n    {\n      side: "top",\n      sideOffset: 8,\n      align: "start",\n      alignOffset: -4,\n      avoidCollisions: true,\n      collisionBoundary: () => [],\n      collisionPadding: 0,\n      sticky: "partial",\n    }\n  );\n\n  const emits = defineEmits<TooltipContentEmits>();\n  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "to"), emits);\n\n  const styles = tv({\n    base: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",\n  });\n</script>\n',
      },
      {
        fileName: "Tooltip/Portal.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipPortal v-bind="props">\n    <slot></slot>\n  </TooltipPortal>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipPortal } from "radix-vue";\n  import type { TooltipPortalProps } from "radix-vue";\n\n  const props = defineProps<TooltipPortalProps>();\n</script>\n',
      },
      {
        fileName: "Tooltip/Provider.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipProvider v-bind="props">\n    <slot></slot>\n  </TooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipProvider } from "radix-vue";\n  import type { TooltipProviderProps } from "radix-vue";\n\n  const props = defineProps<TooltipProviderProps>();\n</script>\n',
      },
      {
        fileName: "Tooltip/Tooltip.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <UiTooltipProvider v-bind="props">\n    <TooltipRoot v-bind="{ ...forwarded, ...$attrs }">\n      <slot>\n        <slot name="trigger"></slot>\n        <slot name="content"></slot>\n      </slot>\n    </TooltipRoot>\n  </UiTooltipProvider>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipRoot, useForwardPropsEmits } from "radix-vue";\n  import type { TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from "radix-vue";\n\n  defineOptions({ inheritAttrs: false });\n  const props = withDefaults(defineProps<TooltipRootProps & TooltipProviderProps>(), {\n    delayDuration: 200,\n  });\n\n  const emits = defineEmits<TooltipRootEmits>();\n\n  const forwarded = useForwardPropsEmits(props, emits);\n</script>\n',
      },
      {
        fileName: "Tooltip/Trigger.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <TooltipTrigger v-bind="props">\n    <slot></slot>\n  </TooltipTrigger>\n</template>\n\n<script lang="ts" setup>\n  import { TooltipTrigger } from "radix-vue";\n  import type { TooltipTriggerProps } from "radix-vue";\n\n  const props = defineProps<TooltipTriggerProps>();\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeCheckbox",
    value: "vee-checkbox",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["checkbox", "label"],
    files: [
      {
        fileName: "Vee/Checkbox.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <UiCheckbox\n      :id="inputId"\n      v-bind="$attrs"\n      :icon="icon"\n      :value="value"\n      :name="name"\n      :required="required"\n      :disabled="disabled"\n      :checked="checked"\n      @update:checked="handleChange"\n    />\n    <div class="flex flex-col gap-1.5">\n      <slot name="label" :errorMessage="errorMessage" :checked="checked">\n        <UiLabel\n          :for="inputId"\n          v-if="label"\n          class="leading-none"\n          :class="[errorMessage && \'text-destructive\']"\n          >{{ label }}</UiLabel\n        >\n      </slot>\n      <TransitionSlide tag="div" group>\n        <slot name="hint" :errorMessage="errorMessage" :checked="checked">\n          <p\n            key="hint"\n            class="text-sm leading-none text-muted-foreground"\n            v-if="hint && !errorMessage"\n          >\n            {{ hint }}\n          </p>\n        </slot>\n        <slot name="errorMessage" :errorMessage="errorMessage" :checked="checked">\n          <p key="errorMessage" class="text-sm leading-none text-destructive" v-if="errorMessage">\n            {{ errorMessage }}\n          </p>\n        </slot>\n      </TransitionSlide>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { useId } from "radix-vue";\n\n  const props = defineProps<{\n    label?: string;\n    icon?: string;\n    hint?: string;\n    modelValue?: string;\n    name?: string;\n    id?: string;\n    rules?: any;\n    validateOnMount?: boolean;\n    type?: string;\n    placeholder?: string;\n    value?: any;\n    required?: boolean;\n    disabled?: boolean;\n    class?: any;\n  }>();\n  const styles = tv({\n    base: "flex gap-3",\n  });\n\n  defineOptions({ inheritAttrs: false });\n\n  const inputId = useId(props.id);\n\n  const { errorMessage, checked, handleChange } = useField(\n    () => props.name || inputId,\n    props.rules,\n    {\n      initialValue: props.modelValue,\n      label: props.label,\n      validateOnMount: props.validateOnMount,\n      type: "checkbox",\n      checkedValue: props.value || true,\n      syncVModel: true,\n    }\n  );\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeDatepicker",
    value: "vee-datepicker",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["datepicker", "label", "input"],
    files: [
      {
        fileName: "Vee/Datepicker.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel\r\n      :for="inputId"\r\n      v-if="label"\r\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\r\n      >{{ label }}</UiLabel\r\n    >\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />\r\n        </span>\r\n      </slot>\r\n      <UiDatepicker v-bind="datePickerProps" v-model="value">\r\n        <template #header-title="{ title }">\r\n          <div class="inline-flex items-center gap-1">\r\n            {{ title }} <Icon name="lucide:chevron-down" class="h-4 w-4" />\r\n          </div>\r\n        </template>\r\n        <template #default="{ inputValue, inputEvents }">\r\n          <UiInput\r\n            :readonly="readonly"\r\n            :model-value="inputValue"\r\n            v-on="inputEvents"\r\n            :id="inputId"\r\n            :name="name"\r\n            :disabled="disabled"\r\n            v-bind="$attrs"\r\n            :class="[hasIcon && \'pl-9\']"\r\n            :placeholder="placeholder"\r\n          />\r\n        </template>\r\n      </UiDatepicker>\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      label?: string;\r\n      icon?: string;\r\n      hint?: string;\r\n      disabled?: boolean;\r\n      modelValue?: any;\r\n      name?: string;\r\n      id?: string;\r\n      rules?: any;\r\n      validateOnMount?: boolean;\r\n      placeholder?: string;\r\n      readonly?: boolean;\r\n      datePickerProps?: any;\r\n    }>(),\r\n    {\r\n      icon: "lucide:calendar-days",\r\n    }\r\n  );\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue,\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeFileInput",
    value: "vee-file-input",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/FileInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel :for="inputId" v-if="label" :class="[errorMessage && \'text-destructive\', \'mb-2\']">{{\r\n      label\r\n    }}</UiLabel>\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />\r\n        </span>\r\n      </slot>\r\n      <UiInput\r\n        type="file"\r\n        @change="\r\n          handleChange($event);\r\n          emits(\'change\', $event.target.files);\r\n        "\r\n        @blur="\r\n          handleBlur($event);\r\n          emits(\'blur\', $event);\r\n        "\r\n        :id="inputId"\r\n        :name="name"\r\n        v-bind="$attrs"\r\n        :multiple="multiple"\r\n        :class="[hasIcon && \'pl-9\']"\r\n        :accept="accept"\r\n      />\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = defineProps<{\r\n    label?: string;\r\n    icon?: string;\r\n    hint?: string;\r\n    name: string;\r\n    id?: string;\r\n    rules?: any;\r\n    validateOnMount?: boolean;\r\n    multiple?: boolean;\r\n    accept?: string;\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const emits = defineEmits<{\r\n    change: [files?: FileList | File | File[] | null];\r\n    blur: [event?: FocusEvent];\r\n  }>();\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, handleChange, handleBlur } = useField(() => props.name, props.rules, {\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeInput",
    value: "vee-input",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["input", "label"],
    files: [
      {
        fileName: "Vee/Input.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel\r\n      :for="inputId"\r\n      v-if="label"\r\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\r\n      >{{ label }}</UiLabel\r\n    >\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />\r\n        </span>\r\n      </slot>\r\n      <UiInput\r\n        :type="type"\r\n        v-model="value"\r\n        @blur="handleBlur"\r\n        :id="inputId"\r\n        :name="name"\r\n        :disabled="disabled"\r\n        v-bind="$attrs"\r\n        :class="[hasIcon && \'pl-9\']"\r\n        :placeholder="placeholder"\r\n      />\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = defineProps<{\r\n    label?: string;\r\n    icon?: string;\r\n    hint?: string;\r\n    disabled?: boolean;\r\n    modelValue?: string;\r\n    name?: string;\r\n    id?: string;\r\n    rules?: any;\r\n    validateOnMount?: boolean;\r\n    type?: string;\r\n    placeholder?: string;\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue,\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeMultiSelect",
    value: "vee-multi-select",
    deps: [
      "@vee-validate/nuxt",
      "radix-vue",
      "@morev/vue-transitions",
      "tailwind-variants",
      "@vueform/multiselect",
    ],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["label"],
    files: [
      {
        fileName: "Vee/MultiSelect.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div class="w-full">\n    <UiLabel\n      :for="inputId"\n      v-if="formLabel"\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\n      >{{ formLabel }}</UiLabel\n    >\n    <Multiselect\n      ref="multiselect"\n      :attrs="{\n        id: inputId,\n      }"\n      :disabled="disabled"\n      v-bind="$attrs"\n      :id="inputId"\n      v-model="value"\n      :name="name"\n      :required="required"\n      :classes="{\n        containerActive: \'ring-2 ring-ring ring-offset-2 ring-offset-background transition\',\n      }"\n    >\n      <template v-for="(_, name) in $slots" v-slot:[name]="scope">\n        <slot :name="name" v-bind="scope"></slot>\n      </template>\n      <template #clear="{ clear }">\n        <button @click="clear" class="mr-2 flex items-center justify-center">\n          <Icon name="heroicons:x-mark" size="16" class="text-muted-foreground" />\n        </button>\n      </template>\n    </Multiselect>\n    <TransitionSlide group tag="div">\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\n        {{ hint }}\n      </p>\n\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\n        {{ errorMessage }}\n      </p>\n    </TransitionSlide>\n  </div>\n</template>\n\n<script setup lang="ts">\n  import Multiselect from "@vueform/multiselect";\n  import { useId } from "radix-vue";\n\n  const multiselect = shallowRef<InstanceType<typeof Multiselect> | null>(null);\n\n  interface Props\n    extends /* @vue-ignore */ Partial<Omit<InstanceType<typeof Multiselect>, "$emit">> {}\n\n  const props = defineProps<\n    {\n      modelValue?: any;\n      formLabel?: string;\n      required?: boolean;\n      id?: string;\n      hint?: string;\n      disabled?: boolean;\n      rules?: any;\n      validateOnMount?: boolean;\n      name?: string;\n    } & Props\n  >();\n\n  const emit = defineEmits([\n    "paste",\n    "open",\n    "close",\n    "select",\n    "deselect",\n    "input",\n    "search-change",\n    "tag",\n    "option",\n    "update:modelValue",\n    "change",\n    "clear",\n    "keydown",\n    "keyup",\n    "max",\n    "create",\n    "ready",\n  ]);\n\n  defineOptions({ inheritAttrs: false });\n\n  const inputId = useId(props.id);\n\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    syncVModel: true,\n  });\n\n  onMounted(() => {\n    nextTick(() => {\n      emit("ready", multiselect.value);\n    });\n  });\n</script>\n\n<style src="@vueform/multiselect/themes/default.css"></style>\n<style>\n  :root {\n    --ms-font-size: theme("fontSize.sm");\n    --ms-line-height: 1.5;\n    --ms-bg: theme("colors.background");\n    --ms-bg-disabled: transparent;\n    --ms-border-color: theme("colors.input");\n    --ms-border-width: 1px;\n    --ms-border-color-active: theme("colors.input");\n    --ms-border-width-active: 1px;\n    --ms-radius: theme("borderRadius.md");\n    --ms-py: theme("padding.2");\n    --ms-px: theme("padding.3");\n    --ms-ring-width: 0px;\n    --ms-ring-color: theme("colors.ring");\n    --ms-placeholder-color: theme("colors.muted.foreground");\n    --ms-max-height: theme("height.52");\n\n    --ms-spinner-color: theme("colors.muted.foreground");\n    --ms-caret-color: theme("colors.muted.foreground");\n    --ms-clear-color: theme("colors.muted.foreground");\n    --ms-clear-color-hover: theme("colors.primary.DEFAULT");\n\n    --ms-tag-font-size: theme("fontSize.sm");\n    --ms-tag-line-height: 1.25rem;\n    --ms-tag-font-weight: 500;\n    --ms-tag-bg: theme("colors.primary.DEFAULT");\n    --ms-tag-bg-disabled: transparent;\n    --ms-tag-color: theme("colors.primary.foreground");\n    --ms-tag-color-disabled: theme("colors.muted.foreground");\n    --ms-tag-radius: theme("borderRadius.DEFAULT");\n    --ms-tag-py: theme("padding[0.5]");\n\n    --ms-dropdown-bg: theme("colors.background");\n    --ms-dropdown-border-color: theme("colors.border");\n    --ms-dropdown-border-width: 1px;\n    --ms-dropdown-radius: theme("borderRadius.md");\n\n    --ms-group-label-bg: theme("colors.muted.DEFAULT");\n    --ms-group-label-color: theme("colors.muted.foreground");\n    --ms-group-label-bg-pointed: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-pointed: theme("colors.primary.foreground");\n    --ms-group-label-bg-disabled: theme("colors.muted.DEFAULT / 50%");\n    --ms-group-label-color-disabled: theme("colors.muted.foreground / 50%");\n    --ms-group-label-bg-selected: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-selected: theme("colors.primary.foreground");\n    --ms-group-label-bg-selected-pointed: theme("colors.primary.DEFAULT");\n    --ms-group-label-color-selected-pointed: theme("colors.primary.foreground");\n    --ms-group-label-bg-selected-disabled: theme("colors.muted.DEFAULT / 50%");\n    --ms-group-label-color-selected-disabled: theme("colors.muted.foreground / 50%");\n\n    --ms-option-font-size: theme("fontSize.sm");\n    --ms-option-bg-pointed: theme("colors.primary.DEFAULT");\n    --ms-option-color-pointed: theme("colors.primary.foreground");\n    --ms-option-bg-selected: theme("colors.primary.DEFAULT");\n    --ms-option-color-selected: theme("colors.primary.foreground");\n    --ms-option-bg-disabled: transparent;\n    --ms-option-color-disabled: theme("colors.muted.foreground / 50%");\n    --ms-option-bg-selected-pointed: theme("colors.primary.DEFAULT");\n    --ms-option-color-selected-pointed: theme("colors.primary.foreground");\n    --ms-option-bg-selected-disabled: theme("colors.muted.DEFAULT");\n    --ms-option-color-selected-disabled: theme("colors.muted.foreground");\n\n    --ms-empty-color: theme("colors.muted.foreground");\n  }\n</style>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "Vee Pin Input",
    value: "vee-pin-input",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: [],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt"],
    components: ["label", "pin-input"],
    files: [
      {
        fileName: "Vee/PinInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel\r\n      :for="inputId"\r\n      v-if="label"\r\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\r\n      >{{ label }}</UiLabel\r\n    >\r\n    <div class="relative">\r\n      <UiPinInput\r\n        @complete="emits(\'complete\', $event)"\r\n        :id="inputId"\r\n        v-bind="{\r\n          ...$attrs,\r\n          ...reactiveOmit(props, \'label\', \'hint\', \'id\', \'rules\', \'validateOnMount\', \'modelValue\'),\r\n        }"\r\n        v-model="value"\r\n      />\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n  import type { PinInputRootProps } from "radix-vue";\r\n\r\n  const props = defineProps<\r\n    Omit<PinInputRootProps, "as" | "asChild"> & {\r\n      label?: string;\r\n      hint?: string;\r\n      id?: string;\r\n      rules?: any;\r\n      validateOnMount?: boolean;\r\n      separator?: string;\r\n      inputCount?: number;\r\n    }\r\n  >();\r\n\r\n  const emits = defineEmits<{\r\n    complete: [value: string[]];\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue || [],\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeRadioGroup",
    value: "vee-radio-group",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["radio-group", "label"],
    files: [
      {
        fileName: "Vee/RadioGroup.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\n  <div :class="styles({ class: props.class })">\n    <slot name="label" :errorMessage="errorMessage" :value="value">\n      <UiLabel\n        v-if="label"\n        class="mb-5 leading-none"\n        :class="[errorMessage && \'text-destructive\']"\n        >{{ label }}</UiLabel\n      >\n    </slot>\n    <UiRadioGroup v-bind="{ ...forwarded, ...$attrs }" v-model="value">\n      <slot></slot>\n    </UiRadioGroup>\n    <div class="flex flex-col gap-1.5">\n      <TransitionSlide tag="div" group>\n        <slot name="hint" :errorMessage="errorMessage" :value="value">\n          <p\n            key="hint"\n            class="mt-1.5 text-sm leading-none text-muted-foreground"\n            v-if="hint && !errorMessage"\n          >\n            {{ hint }}\n          </p>\n        </slot>\n        <slot name="errorMessage" :errorMessage="errorMessage" :value="value">\n          <p\n            key="errorMessage"\n            class="mt-1.5 text-sm leading-none text-destructive"\n            v-if="errorMessage"\n          >\n            {{ errorMessage }}\n          </p>\n        </slot>\n      </TransitionSlide>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { useForwardProps } from "radix-vue";\n  import type { RadioGroupRootProps } from "radix-vue";\n\n  const props = defineProps<\n    RadioGroupRootProps & {\n      label?: string;\n      hint?: string;\n      id?: string;\n      rules?: any;\n      validateOnMount?: boolean;\n      class?: any;\n      name: string;\n    }\n  >();\n\n  const forwarded = useForwardProps(props);\n  const styles = tv({\n    base: "flex flex-col",\n  });\n\n  defineOptions({ inheritAttrs: false });\n\n  const { errorMessage, value } = useField(() => props.name, props.rules, {\n    initialValue: props.modelValue,\n    label: props.label,\n    validateOnMount: props.validateOnMount,\n    type: "radio",\n    syncVModel: true,\n  });\n</script>\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeSelect",
    value: "vee-select",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["native-select", "label"],
    files: [
      {
        fileName: "Vee/Select.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel :for="inputId" v-if="label" :class="[errorMessage && \'text-destructive\', \'mb-2\']">{{\r\n      label\r\n    }}</UiLabel>\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" lass="absolute inset-y-0 left-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground" />\r\n        </span>\r\n      </slot>\r\n      <UiNativeSelect\r\n        :trailingIcon="trailingIcon"\r\n        v-model="value"\r\n        @blur="handleBlur"\r\n        :id="inputId"\r\n        :name="name"\r\n        v-bind="$attrs"\r\n        :class="[hasIcon && \'pl-9\']"\r\n      >\r\n        <slot></slot>\r\n      </UiNativeSelect>\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = defineProps<{\r\n    label?: string;\r\n    icon?: string;\r\n    hint?: string;\r\n    modelValue?: string;\r\n    name?: string;\r\n    id?: string;\r\n    rules?: any;\r\n    validateOnMount?: boolean;\r\n    type?: string;\r\n    trailingIcon?: string;\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue,\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeTagsInput",
    value: "vee-tags-input",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["tags-input", "label"],
    files: [
      {
        fileName: "Vee/TagsInput.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel\r\n      :for="inputId"\r\n      v-if="label"\r\n      :class="[disabled && \'text-muted-foreground\', errorMessage && \'text-destructive\', \'mb-2\']"\r\n      >{{ label }}</UiLabel\r\n    >\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" class="absolute inset-y-0 left-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />\r\n        </span>\r\n      </slot>\r\n      <UiTagsInput\r\n        v-model="value"\r\n        :name="name"\r\n        :disabled="disabled"\r\n        v-bind="$attrs"\r\n        :class="[hasIcon && \'pl-9\']"\r\n      >\r\n        <UiTagsInputItem v-for="tag in value" :key="tag" :value="tag" />\r\n        <UiTagsInputField :id="inputId" :placeholder="placeholder" />\r\n      </UiTagsInput>\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = defineProps<{\r\n    label?: string;\r\n    icon?: string;\r\n    hint?: string;\r\n    disabled?: boolean;\r\n    modelValue?: string[];\r\n    name?: string;\r\n    id?: string;\r\n    rules?: any;\r\n    validateOnMount?: boolean;\r\n    type?: string;\r\n    placeholder?: string;\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue,\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
  {
    name: "VeeTextarea",
    value: "vee-textarea",
    deps: ["@vee-validate/nuxt", "radix-vue", "@morev/vue-transitions", "tailwind-variants"],
    askValidator: true,
    devDeps: ["nuxt-icon"],
    nuxtModules: ["@vee-validate/nuxt", "@morev/vue-transitions/nuxt", "nuxt-icon"],
    components: ["textarea", "label"],
    files: [
      {
        fileName: "Vee/Textarea.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <div class="w-full">\r\n    <UiLabel :for="inputId" v-if="label" :class="[errorMessage && \'text-destructive\', \'mb-2\']">{{\r\n      label\r\n    }}</UiLabel>\r\n    <div class="relative">\r\n      <slot name="icon">\r\n        <span v-if="hasIcon" class="absolute left-3 top-3 flex items-center justify-center">\r\n          <Icon :name="icon" v-if="icon" class="h-4 w-4 text-muted-foreground/70" />\r\n        </span>\r\n      </slot>\r\n      <UiTextarea\r\n        :rows="rows"\r\n        v-model="value"\r\n        @blur="handleBlur"\r\n        :id="inputId"\r\n        :name="name"\r\n        v-bind="$attrs"\r\n        :class="[hasIcon && \'pl-9\']"\r\n        :placeholder="placeholder"\r\n      />\r\n    </div>\r\n    <TransitionSlide group tag="div">\r\n      <p key="hint" class="mt-1.5 text-sm text-muted-foreground" v-if="hint && !errorMessage">\r\n        {{ hint }}\r\n      </p>\r\n\r\n      <p key="errorMessage" class="mt-1.5 text-sm text-destructive" v-if="errorMessage">\r\n        {{ errorMessage }}\r\n      </p>\r\n    </TransitionSlide>\r\n  </div>\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { useId } from "radix-vue";\r\n\r\n  const props = defineProps<{\r\n    label?: string;\r\n    icon?: string;\r\n    hint?: string;\r\n    modelValue?: string;\r\n    name?: string;\r\n    id?: string;\r\n    rules?: any;\r\n    validateOnMount?: boolean;\r\n    placeholder?: string;\r\n    rows?: number;\r\n  }>();\r\n\r\n  defineOptions({ inheritAttrs: false });\r\n\r\n  const inputId = useId(props.id);\r\n\r\n  const hasIcon = computed(() => Boolean(props.icon) || Boolean(useSlots().icon));\r\n\r\n  const { errorMessage, value, handleBlur } = useField(() => props.name || inputId, props.rules, {\r\n    initialValue: props.modelValue,\r\n    label: props.label,\r\n    validateOnMount: props.validateOnMount,\r\n    syncVModel: true,\r\n  });\r\n</script>\r\n',
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
    devDeps: [],
    nuxtModules: [],
    instructions: ["Remember to add the <UiVueSonner /> tag to your app.vue/layout file."],
    files: [
      {
        fileName: "VueSonner.client.vue",
        dirPath: "components/UI",
        fileContent:
          '<template>\r\n  <Toaster\r\n    position="top-right"\r\n    :visible-toasts="5"\r\n    rich-colors\r\n    :duration="7000"\r\n    close-button\r\n    :theme="$colorMode.value == \'dark\' ? \'dark\' : \'light\'"\r\n  />\r\n</template>\r\n\r\n<script lang="ts" setup>\r\n  import { Toaster } from "vue-sonner";\r\n</script>\r\n<style scoped>\r\n  :deep([data-sonner-toaster][data-theme="dark"]),\r\n  :deep([data-sonner-toaster][data-theme="light"]) {\r\n    --normal-bg: theme("colors.popover.DEFAULT");\r\n    --normal-border: theme("colors.border");\r\n    --normal-text: theme("colors.popover.foreground");\r\n    --border-radius: theme("borderRadius.md");\r\n  }\r\n  :deep([data-sonner-toaster]) {\r\n    @apply font-sans;\r\n  }\r\n  :deep([data-sonner-toast][data-styled="true"]) {\r\n    @apply items-start;\r\n  }\r\n  :deep([data-sonner-toast] [data-icon]) {\r\n    @apply mt-0.5;\r\n  }\r\n  :deep([data-sonner-toast] [data-title]) {\r\n    @apply text-sm font-semibold;\r\n  }\r\n  :deep([data-sonner-toast] [data-description]) {\r\n    @apply text-sm;\r\n  }\r\n  :deep([data-sonner-toast] [data-close-button]) {\r\n    @apply border border-border bg-background text-foreground hover:border-inherit hover:bg-inherit hover:text-accent-foreground;\r\n  }\r\n  :deep([data-sonner-toast] [data-button]) {\r\n    @apply bg-primary text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;\r\n  }\r\n  :deep(.sonner-loading-bar) {\r\n    @apply bg-muted-foreground;\r\n  }\r\n</style>\r\n',
      },
    ],
    utils: [],
    composables: [],
    plugins: [],
  },
];
