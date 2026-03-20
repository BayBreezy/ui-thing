/**
 * List of available prose components with their files, composables, plugins, and dependencies
 */
export default [
  {
    name: "Link <a>",
    value: "a",
    description:
      "A prose component that displays styled anchor link elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseA.global.vue",
    fileName: "ProseA.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseA.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <NuxtLink\n    data-slot="prose-a"\n    v-bind="rest"\n    :class="proseAStyles({ class: normalizeClass(_class) || undefined })"\n  >\n    <slot />\n  </NuxtLink>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseAProps = NuxtLinkProps & {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseAStyles = tv({\n    base: "inline-block font-semibold text-inherit underline underline-offset-4",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class, ...rest } = defineProps<ProseAProps>();\n</script>\n',
    },
  },
  {
    name: "Blockquote",
    value: "blockquote",
    description:
      "A prose component that displays styled blockquote elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseBlockquote.global.vue",
    fileName: "ProseBlockquote.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseBlockquote.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <blockquote\n    data-slot="prose-blockquote"\n    :class="proseBlockquoteStyles({ class: normalizeClass(_class) || undefined })"\n  >\n    <slot />\n  </blockquote>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseBlockquoteProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseBlockquoteStyles = tv({\n    base: "border-l-2 pl-6 text-pretty italic not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseBlockquoteProps>();\n</script>\n',
    },
  },
  {
    name: "Callout",
    value: "callout",
    description:
      "A prose component that displays important information with icons and variants for different message types.",
    filePath: "app/components/content/prose/Callout/ProseCallout.global.vue",
    fileName: "ProseCallout.global.vue",
    docsUrl: "/prose/callout",
    file: {
      fileName: "ProseCallout.global.vue",
      dirPath: "app/components/content/prose/Callout",
      fileContent:
        '<template>\n  <component\n    :is="componentType"\n    v-bind="linkProps"\n    data-slot="prose-callout"\n    :class="\n      calloutStyles().base({ variant, filled, class: normalizeClass(props.class) || undefined })\n    "\n  >\n    <div v-if="hasIcon" :class="calloutStyles().iconWrapper({ variant, filled })">\n      <slot name="icon">\n        <Icon\n          v-if="computedIcon"\n          :name="computedIcon"\n          :class="\n            calloutStyles().icon({ variant, filled, class: [iconClass, !hasTitle && \'mt-[3px]\'] })\n          "\n        />\n      </slot>\n    </div>\n\n    <div :class="calloutStyles().content()">\n      <div\n        v-if="hasTitle"\n        :class="\n          calloutStyles().title({ variant, filled, class: normalizeClass(titleClass) || undefined })\n        "\n      >\n        <slot name="title">{{ title }}</slot>\n      </div>\n\n      <div\n        v-if="hasDescription || $slots.default"\n        :class="\n          calloutStyles().description({\n            variant,\n            filled,\n            class: normalizeClass(descriptionClass) || undefined,\n          })\n        "\n      >\n        <slot mdc-unwrap="p">{{ description }}</slot>\n      </div>\n    </div>\n\n    <Icon\n      v-if="url"\n      :name="target === \'_blank\' ? \'lucide:external-link\' : \'lucide:arrow-up-right\'"\n      :class="calloutStyles().linkIcon({ variant, filled })"\n    />\n  </component>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export type CalloutProps = {\n    /**\n     * The title of the callout\n     */\n    title?: string;\n    /**\n     * The description/content of the callout\n     */\n    description?: string;\n    /**\n     * The icon to display\n     */\n    icon?: string;\n    /**\n     * The variant style of the callout\n     */\n    variant?: VariantProps<typeof calloutStyles>["variant"];\n    /**\n     * Whether to use filled style\n     */\n    filled?: boolean;\n    /**\n     * Optional URL to make the callout clickable\n     */\n    url?: string;\n    /**\n     * Link target (_blank for external links)\n     */\n    target?: "_blank" | "_self" | "_parent" | "_top";\n    /**\n     * Additional class for the wrapper\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * Additional class for the title\n     */\n    titleClass?: HTMLAttributes["class"];\n    /**\n     * Additional class for the description\n     */\n    descriptionClass?: HTMLAttributes["class"];\n    /**\n     * Additional class for the icon\n     */\n    iconClass?: HTMLAttributes["class"];\n  };\n\n  export const calloutStyles = tv({\n    slots: {\n      base: "group relative flex items-start gap-3 rounded-lg border p-4 no-underline transition-colors not-first:mt-6 not-last:mb-6 [&_code]:bg-inherit! [&_code]:text-inherit! [&_li]:marker:text-inherit! [&_ol]:my-2! [&_ul]:my-2!",\n      iconWrapper: "flex items-center justify-center",\n      icon: "size-4 shrink-0",\n      content: "flex flex-1 flex-col gap-1",\n      title: "text-sm leading-none font-semibold",\n      description: "text-sm leading-relaxed *:my-0",\n      linkIcon:\n        "size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-inherit group-hover:opacity-100",\n    },\n    variants: {\n      variant: {\n        default: {\n          base: "border-border bg-muted/50 text-foreground dark:bg-transparent",\n          icon: "text-foreground",\n          title: "text-foreground",\n        },\n        info: {\n          base: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",\n          icon: "text-blue-600 dark:text-blue-400",\n          title: "text-blue-900 dark:text-blue-100",\n          description: "text-blue-800 dark:text-blue-200",\n        },\n        success: {\n          base: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",\n          icon: "text-emerald-600 dark:text-emerald-400",\n          title: "text-emerald-900 dark:text-emerald-100",\n          description: "text-emerald-800 dark:text-emerald-200",\n        },\n        warning: {\n          base: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",\n          icon: "text-yellow-600 dark:text-yellow-400",\n          title: "text-yellow-900 dark:text-yellow-100",\n          description: "text-yellow-800 dark:text-yellow-200",\n        },\n        error: {\n          base: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",\n          icon: "text-red-600 dark:text-red-400",\n          title: "text-red-900 dark:text-red-100",\n          description: "text-red-800 dark:text-red-200",\n        },\n        tip: {\n          base: "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100",\n          icon: "text-purple-600 dark:text-purple-400",\n          title: "text-purple-900 dark:text-purple-100",\n          description: "text-purple-800 dark:text-purple-200",\n        },\n        note: {\n          base: "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",\n          icon: "text-gray-600 dark:text-gray-400",\n          title: "text-gray-900 dark:text-gray-100",\n          description: "text-gray-800 dark:text-gray-200",\n        },\n        example: {\n          base: "border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100",\n          icon: "text-teal-600 dark:text-teal-400",\n          title: "text-teal-900 dark:text-teal-100",\n          description: "text-teal-800 dark:text-teal-200",\n        },\n      },\n      filled: {\n        true: {},\n      },\n    },\n    compoundVariants: [\n      {\n        filled: true,\n        class: {\n          title: "text-white dark:text-white",\n          icon: "text-white dark:text-white",\n        },\n      },\n      {\n        variant: "info",\n        filled: true,\n        class: {\n          base: "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500",\n          description: "text-blue-50",\n        },\n      },\n      {\n        variant: "success",\n        filled: true,\n        class: {\n          base: "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500",\n          description: "text-emerald-50",\n        },\n      },\n      {\n        variant: "warning",\n        filled: true,\n        class: {\n          base: "border-yellow-600 bg-yellow-600 text-white dark:border-yellow-500 dark:bg-yellow-500",\n          description: "text-yellow-50",\n        },\n      },\n      {\n        variant: "error",\n        filled: true,\n        class: {\n          base: "border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-500",\n          description: "text-red-50",\n        },\n      },\n      {\n        variant: "tip",\n        filled: true,\n        class: {\n          base: "border-purple-600 bg-purple-600 text-white dark:border-purple-500 dark:bg-purple-500",\n\n          description: "text-purple-50",\n        },\n      },\n      {\n        variant: "note",\n        filled: true,\n        class: {\n          base: "border-gray-600 bg-gray-600 text-white dark:border-gray-500 dark:bg-gray-500",\n\n          description: "text-gray-50",\n        },\n      },\n      {\n        variant: "example",\n        filled: true,\n        class: {\n          base: "border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500",\n          description: "text-teal-50",\n        },\n      },\n    ],\n    defaultVariants: {\n      variant: "default",\n      filled: false,\n    },\n  });\n\n  const VARIANT_ICONS: Record<string, string> = {\n    info: "lucide:info",\n    success: "lucide:circle-check",\n    warning: "lucide:triangle-alert",\n    error: "lucide:circle-x",\n    tip: "lucide:lightbulb",\n    note: "lucide:sticky-note",\n    example: "lucide:code-2",\n    default: "lucide:info",\n  };\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(defineProps<CalloutProps>(), {\n    variant: "default",\n    filled: false,\n    target: "_self",\n    noPrefetch: false,\n  });\n\n  defineSlots<{\n    default?: () => any;\n    title?: () => any;\n    icon?: () => any;\n  }>();\n\n  const slots = useSlots();\n\n  const componentType = computed(() => (props.url ? resolveComponent("NuxtLink") : "div"));\n\n  const linkProps = computed(() => {\n    if (!props.url) return {};\n    return {\n      to: props.url,\n      target: props.target,\n      rel: props.target === "_blank" ? "noopener noreferrer" : undefined,\n      class: "cursor-pointer hover:shadow-md underline-none duration-300 !transition-all",\n    };\n  });\n\n  const hasIcon = computed(() => props.icon || slots.icon || props.variant);\n  const hasTitle = computed(() => props.title || slots.title);\n  const hasDescription = computed(() => props.description || slots.default);\n\n  const computedIcon = computed(() => {\n    if (props.icon) return props.icon;\n    return VARIANT_ICONS[props.variant || "default"] || VARIANT_ICONS.default;\n  });\n</script>\n',
    },
  },
  {
    name: "Card",
    value: "card",
    description:
      "A prose component that display content in elegant cards with animated border beam effects, perfect for features, navigation, and content highlights.",
    filePath: "app/components/content/prose/Card/ProseCard.global.vue",
    fileName: "ProseCard.global.vue",
    components: ["border-beam"],
    prose: ["smart-icon"],
    docsUrl: "/prose/card",
    file: {
      fileName: "ProseCard.global.vue",
      dirPath: "app/components/content/prose/Card",
      fileContent:
        '<template>\n  <component\n    v-bind="linkProps"\n    :is="as"\n    :class="proseCardStyles().base({ class: normalizeClass(props.class) || undefined })"\n    data-slot="prose-card"\n  >\n    <slot name="icon" mdc-unwrap="p">\n      <ProseSmartIcon v-if="icon" :name="icon" :class="proseCardStyles().icon()" />\n    </slot>\n    <slot name="title" mdc-unwrap="p">\n      <h3 v-if="title" data-slot="prose-card-title" :class="proseCardStyles().title()">\n        {{ title }}\n      </h3>\n    </slot>\n    <slot mdc-unwrap="p">\n      <p\n        v-if="description"\n        data-slot="prose-card-description"\n        :class="proseCardStyles().description()"\n      >\n        {{ description }}\n      </p>\n    </slot>\n    <slot name="footer"></slot>\n    <div v-if="to || href" class="absolute top-4 right-4">\n      <Icon\n        name="lucide:arrow-up-right"\n        class="size-5 scale-0 opacity-80 transition-all duration-200 group-hover:scale-100"\n      />\n    </div>\n    <ui-border-beam :duration="20" :size="100" class="opacity-0 group-hover:opacity-100" />\n  </component>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export const proseCardStyles = tv({\n    slots: {\n      base: "group relative flex flex-col gap-2 rounded-lg border border-border/50 bg-card p-6 text-card-foreground no-underline shadow-xs *:my-0!",\n      icon: "size-6 text-muted-foreground",\n      title: "not-prose text-lg font-semibold tracking-tight text-foreground",\n      description: "text-[15px] text-muted-foreground first:mt-0 last:mb-0",\n    },\n  });\n\n  export type ProseCardProps = NuxtLinkProps & {\n    /**\n     * Additional classes for the card wrapper\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * Title of the card\n     */\n    title?: string;\n    /**\n     * Description/content of the card\n     */\n    description?: string;\n    /**\n     * Icon name to display in the card\n     */\n    icon?: string;\n  };\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ProseCardProps>(), {});\n\n  defineSlots<{\n    /**\n     * Slot for the card title\n     */\n    title: () => any;\n    /**\n     * Slot for the card description/content\n     */\n    default: () => any;\n    /**\n     * Slot for an icon to display in the card\n     */\n    icon: () => any;\n    /**\n     * Slot for the card footer\n     */\n    footer: () => any;\n  }>();\n\n  const linkProps = computed(() => {\n    if (!(props.to || props.href)) return {};\n\n    return reactiveOmit(props, ["class", "title", "description", "icon"]);\n  });\n\n  const as = computed(() => (props.to || props.href ? resolveComponent("NuxtLink") : "div"));\n</script>\n',
    },
  },
  {
    name: "Code Collapse",
    value: "code-collapse",
    description:
      "A prose component that is a collapsible code block wrapper, perfect for showing long code examples without overwhelming your documentation.",
    filePath: "app/components/content/prose/Code/ProseCodeCollapse.global.vue",
    fileName: "ProseCodeCollapse.global.vue",
    prose: ["smart-icon"],
    docsUrl: "/prose/code-collapse",
    file: {
      fileName: "ProseCodeCollapse.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <div :class="styles.root({ class: normalizeClass([props.class]) || undefined, open })">\n    <slot />\n    <div :class="styles.footer({ open })">\n      <button\n        :class="styles.trigger({ open })"\n        variant="outline"\n        :aria-expanded="open"\n        :aria-label="`${open ? \'Collapse\' : \'Expand\'} ${props.name}`"\n        :data-state="open ? \'open\' : \'closed\'"\n        @click="open = !open"\n      >\n        <ProseSmartIcon\n          v-if="props.icon"\n          :name="props.icon"\n          :class="styles.triggerIcon()"\n          aria-hidden="true"\n        />\n        <span>{{ open ? props.closeText : props.openText }} {{ props.name }}</span>\n      </button>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export interface ProseCodeCollapseProps {\n    /**\n     * The icon displayed to toggle the code collapse state\n     * @default "lucide:chevron-down"\n     * @example "lucide:code" | "heroicons:chevron-down"\n     */\n    icon?: string;\n    /**\n     * The name/label displayed in the trigger button\n     * @default "Code"\n     * @example "Implementation" | "Full Code" | "Example"\n     */\n    name?: string;\n    /**\n     * The text displayed when the code is collapsed (clickable to expand)\n     * @default "Expand"\n     * @example "Show" | "View" | "Display"\n     */\n    openText?: string;\n    /**\n     * The text displayed when the code is expanded (clickable to collapse)\n     * @default "Collapse"\n     * @example "Hide" | "Minimize" | "Close"\n     */\n    closeText?: string;\n    /**\n     * Additional CSS classes for the root container\n     */\n    class?: HTMLAttributes["class"];\n  }\n\n  /**\n   * Tailwind variant styles for the code collapse component\n   * Uses slots pattern for multi-part component styling with open/closed states\n   */\n  export const proseCodeCollapseStyles = tv({\n    slots: {\n      root: "relative [&_pre]:h-[200px]",\n      footer: "absolute inset-x-px bottom-px flex h-20 items-center justify-center rounded-b-md",\n      trigger:\n        "group flex items-center gap-2 rounded-md bg-accent py-1.5 ps-1.5 pe-3 text-sm font-medium transition-all duration-200 hover:scale-103 hover:bg-accent hover:text-foreground",\n      triggerIcon: "text-muted-foreground transition-transform group-data-[state=open]:rotate-180",\n    },\n    variants: {\n      open: {\n        true: {\n          root: "[&_pre]:h-auto [&_pre]:max-h-[80vh] [&_pre]:min-h-[200px] [&_pre]:pb-12",\n          trigger: "bg-accent ring-1 ring-muted dark:ring-border",\n        },\n        false: {\n          root: "[&_pre]:overflow-hidden",\n          footer: "bg-linear-to-t from-code",\n        },\n      },\n    },\n  });\n</script>\n\n<script lang="ts" setup>\n  /**\n   * ProseCodeCollapse - Collapsible code block wrapper\n   *\n   * Wraps code blocks and provides a toggle button to show/hide content.\n   * Useful for long code examples that would take up too much vertical space.\n   * Initial height is limited to 200px with a gradient fade effect.\n   *\n   * @example\n   * ```vue\n   * <ProseCodeCollapse\n   *   name="Full Implementation"\n   *   icon="lucide:code"\n   *   open-text="Show"\n   *   close-text="Hide"\n   * >\n   *   <ProsePre language="typescript" code="..." />\n   * </ProseCodeCollapse>\n   * ```\n   */\n\n  const props = withDefaults(defineProps<ProseCodeCollapseProps>(), {\n    icon: "lucide:chevron-down",\n    name: "Code",\n    openText: "Expand",\n    closeText: "Collapse",\n  });\n\n  /**\n   * Toggle state for the collapse/expand functionality\n   * @default false - Starts collapsed\n   */\n  const open = defineModel<boolean>({ default: false });\n\n  /**\n   * Computed styles to avoid recalculating on each render\n   */\n  const styles = computed(() => proseCodeCollapseStyles());\n</script>\n',
    },
  },
  {
    name: "Code Copy",
    value: "code-copy",
    description:
      "A prose component that adds a copy-to-clipboard button to code blocks, enhancing user experience in documentation and tutorials.",
    filePath: "app/components/content/prose/Code/ProseCodeCopy.global.vue",
    fileName: "ProseCodeCopy.global.vue",
    components: ["tooltip", "button", "sonner"],
    file: {
      fileName: "ProseCodeCopy.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <UiTooltip>\n    <UiTooltipTrigger as-child>\n      <UiButton\n        variant="ghost"\n        size="icon-xs"\n        :aria-label="copied ? \'Copied\' : \'Copy to clipboard\'"\n        :disabled="copied"\n        v-bind="$attrs"\n        @click="onCopy"\n      >\n        <AnimatePresence mode="wait">\n          <Motion\n            v-if="!copied"\n            as-child\n            as="svg"\n            :initial="{ opacity: 0, scale: 0.8 }"\n            :animate="{ opacity: 1, scale: 1 }"\n            :exit="{ opacity: 0, scale: 0.8 }"\n            :transition="{ duration: 0.2 }"\n          >\n            <Icon name="lucide:clipboard" aria-hidden="true" class="size-4 text-muted-foreground" />\n          </Motion>\n          <Motion\n            v-if="copied"\n            as-child\n            as="svg"\n            :initial="{ opacity: 0, scale: 0.8 }"\n            :animate="{ opacity: 1, scale: 1 }"\n            :exit="{ opacity: 0, scale: 0.8 }"\n            :transition="{ duration: 0.2 }"\n          >\n            <Icon name="lucide:check" aria-hidden="true" class="size-4 text-emerald-500" />\n          </Motion>\n        </AnimatePresence>\n      </UiButton>\n    </UiTooltipTrigger>\n    <UiTooltipContent>\n      <p>Copy to clipboard</p>\n      <UiTooltipArrow />\n    </UiTooltipContent>\n  </UiTooltip>\n</template>\n\n<script lang="ts" setup>\n  const props = defineProps<{\n    /**\n     * The code that should be copied\n     */\n    code?: string;\n  }>();\n\n  defineOptions({ inheritAttrs: false });\n\n  const { copied, copy } = useClipboard();\n\n  const emit = defineEmits<{\n    codeCopied: [];\n  }>();\n\n  const onCopy = () => {\n    if (!props.code) return;\n    copy(props.code);\n    useSonner("Copied to clipboard!");\n    emit("codeCopied");\n  };\n</script>\n',
    },
  },
  {
    name: "Code Group",
    value: "code-group",
    description:
      "A prose component that displays multiple code snippets in a tabbed interface with automatic language detection, custom icons, and sync support across groups.",
    filePath: "app/components/content/prose/Code/ProseCodeGroup.global.vue",
    fileName: "ProseCodeGroup.global.vue",
    prose: ["tabs"],
    docsUrl: "/prose/code-group",
    composables: [
      {
        fileName: "useDefaultSlotItems.ts",
        dirPath: "app/composables",
        fileContent:
          'import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";\nimport type { Slots, VNode, VNodeArrayChildren } from "vue";\n\ntype SlotMetaContext = {\n  vnode: VNode;\n  index: number;\n  props: Record<string, any>;\n};\n\nexport type SlotItem<TMeta = Record<string, any>> = {\n  vnode: VNode;\n  index: number;\n  key: VNode["key"];\n  props: Record<string, any>;\n  meta: TMeta;\n};\n\nexport type UseDefaultSlotItemsOptions<TMeta> = {\n  slots?: Slots;\n  filter?: (ctx: SlotMetaContext) => boolean;\n  mapMeta?: (ctx: SlotMetaContext) => TMeta;\n};\n\n/**\n * Composable to extract and manage items from the default slot\n */\nexport function useDefaultSlotItems<TMeta = Record<string, any>>(\n  options: UseDefaultSlotItemsOptions<TMeta> = {}\n) {\n  const instance = getCurrentInstance();\n  const slots = options.slots ?? instance?.slots;\n\n  const items = computed<SlotItem<TMeta>[]>(() => {\n    const rawChildren = slots?.default?.() ?? [];\n    const nodes = flattenVNodes(rawChildren);\n\n    return nodes\n      .map((vnode, index) => {\n        const props = (vnode.props ?? {}) as Record<string, any>;\n        const ctx: SlotMetaContext = { vnode, index, props };\n\n        if (options.filter && !options.filter(ctx)) {\n          return undefined;\n        }\n\n        return {\n          vnode,\n          index,\n          key: vnode.key ?? index,\n          props,\n          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),\n        };\n      })\n      .filter(Boolean) as SlotItem<TMeta>[];\n  });\n\n  return {\n    items,\n    first: computed(() => items.value[0]),\n    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),\n  };\n}\n\nfunction flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {\n  children.forEach((child) => {\n    if (!child) return;\n\n    if (Array.isArray(child)) {\n      flattenVNodes(child, acc);\n      return;\n    }\n\n    if (!isVNode(child)) {\n      return;\n    }\n\n    if (child.type === Comment) {\n      return;\n    }\n\n    if (child.type === Fragment && Array.isArray(child.children)) {\n      flattenVNodes(child.children as VNodeArrayChildren, acc);\n      return;\n    }\n\n    acc.push(child);\n  });\n\n  return acc;\n}\n',
      },
    ],
    file: {
      fileName: "ProseCodeGroup.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <ClientOnly>\n    <render />\n  </ClientOnly>\n</template>\n\n<script setup lang="ts">\n  import { ProseTabs } from "#components";\n  import { normalizeClass } from "vue";\n  import type { SetupContext } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Whether the code group is in a stack layout\n       * @default false\n       */\n      inStack?: boolean;\n      /**\n       * Sync identifier for syncing with other tab groups\n       */\n      sync?: string;\n      /**\n       * Whether to add padding around the tabs\n       * @default true\n       */\n      padded?: boolean;\n      /**\n       * Disable the search functionality\n       * @default false\n       */\n      disableSearch?: boolean;\n      /**\n       * Placeholder text for the search input\n       * @default \'Search Tab...\'\n       */\n      searchPlaceholder?: string;\n      /**\n       * Text to display when no tab is found\n       * @default \'No tab found.\'\n       */\n      searchEmpty?: string;\n      /**\n       * Whether the combobox should take the full width of the container\n       * @default false\n       */\n      comboBoxFullWidth?: boolean;\n      /**\n       * Additional classes to add to the wrapper\n       */\n      class?: string;\n    }>(),\n    {\n      inStack: false,\n      padded: true,\n      disableSearch: false,\n      searchPlaceholder: "Search Tab...",\n      searchEmpty: "No tab found.",\n      comboBoxFullWidth: false,\n    }\n  );\n\n  const _slots: SetupContext["slots"] = useSlots();\n  const { items: slotItems } = useDefaultSlotItems({\n    slots: _slots,\n    mapMeta: ({ props, index }) => ({\n      id: props.filename ?? `tab-${index}`,\n      label: props.label ?? props.filename ?? `Tab ${index + 1}`,\n      icon: props.icon,\n    }),\n  });\n\n  const isMobile = useMediaQuery("(max-width: 640px)", {\n    ssrWidth: 639,\n  });\n\n  // Determine the variant based on number of tabs and screen size\n  // If there are 5 or more tabs, use the combobox variant\n  // If on mobile and more than 4 tabs, use the combobox variant\n  const variant = computed(() => {\n    if (slotItems.value.length >= 5) return "combobox";\n    if (isMobile.value && slotItems.value.length > 4) return "combobox";\n    return "card";\n  });\n\n  function render() {\n    return h(\n      ProseTabs,\n      {\n        variant: variant.value,\n        inStack: props.inStack,\n        sync: props.sync,\n        padded: props.padded,\n        disableSearch: props.disableSearch,\n        searchPlaceholder: props.searchPlaceholder,\n        searchEmpty: props.searchEmpty,\n        comboBoxFullWidth: props.comboBoxFullWidth,\n        class: normalizeClass(props.class) || undefined,\n      },\n      () => slotItems.value.map(({ vnode }) => vnode)\n    );\n  }\n</script>\n',
    },
  },
  {
    name: "Code Snippet",
    value: "code-snippet",
    description:
      "A prose component that dynamically import and display code from your project files or external URLs without duplicating content in your documentation.",
    filePath: "app/components/content/prose/Code/ProseCodeSnippet.global.vue",
    fileName: "ProseCodeSnippet.global.vue",
    prose: ["callout"],
    docsUrl: "/prose/code-snippet",
    file: {
      fileName: "ProseCodeSnippet.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <MDC v-if="loadedCode" :value="md" class="not-first:mt-5" />\n  <ProseCallout v-else variant="error" title="Code Snippet Error">\n    Cannot load code: <code>{{ file || url }}</code>\n  </ProseCallout>\n</template>\n\n<script setup lang="ts">\n  /**\n   * ProseCodeSnippet - Dynamically import and display code from files or URLs\n   *\n   * This component allows you to import code snippets from your project files or external URLs\n   * and display them with syntax highlighting. Useful for documentation where you want to show\n   * actual source code without duplicating content.\n   *\n   * @example\n   * ```mdc\n   * ::code-snippet{file="/app/components/Button.vue" language="vue" title="Button Component"}\n   * ::\n   *\n   * ::code-snippet{url="https://example.com/code.js" language="javascript" start="10" offset="5"}\n   * ::\n   * ```\n   */\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Relative path to a file in your project to import\n       * Must match a pattern in the import.meta.glob array\n       * @example "/app/components/Button.vue"\n       */\n      file?: string;\n      /**\n       * External URL to fetch code from\n       * @example "https://raw.githubusercontent.com/user/repo/main/file.js"\n       */\n      url?: string;\n      /**\n       * Programming language for syntax highlighting\n       * @example "vue", "typescript", "javascript"\n       */\n      language: string;\n      /**\n       * Optional title displayed above the code block\n       * @example "Button Component"\n       */\n      title?: string;\n      /**\n       * Line numbers or ranges to highlight (comma-separated)\n       * @example "1,3-5,10"\n       */\n      highlights?: string;\n      /**\n       * Additional metadata for the code block (passed to ProsePre)\n       * @example "icon=vue noFormat"\n       */\n      meta?: string;\n      /**\n       * Starting line number to extract from the file (1-indexed)\n       * @example 10\n       */\n      start?: number | string;\n      /**\n       * Number of lines to extract from the starting line\n       * @example 5\n       */\n      offset?: number | string;\n    }>(),\n    {\n      file: undefined,\n      url: undefined,\n      title: undefined,\n      highlights: undefined,\n      meta: undefined,\n      start: undefined,\n      offset: undefined,\n    }\n  );\n\n  const loadedCode = ref("");\n\n  /**\n   * Import all files matching the glob patterns\n   *\n   * ⚠️ PERFORMANCE WARNING:\n   * Using broad patterns like \'/app/**\' will bundle ALL matching files into your build,\n   * significantly increasing bundle size. Be as specific as possible with your patterns.\n   *\n   * For a large app, consider:\n   * 1. Only glob specific directories you need (e.g., \'/app/components/**\' instead of \'/app/**\')\n   * 2. Use specific file extensions (e.g., \'*.vue\' instead of \'*\')\n   * 3. Exclude unnecessary paths with negative patterns\n   * 4. Consider lazy-loading via URL fetching for large files\n   *\n   * @example\n   * // ❌ BAD - Bundles entire app folder\n   * import.meta.glob(\'/app/**\')\n   *\n   * // ✅ GOOD - Specific directory and file types\n   * import.meta.glob([\n   *   \'/app/components/**\\/*.{vue,ts}\',\n   *   \'/app/composables/**\\/*.ts\',\n   *   \'!/app/**\\/*.test.ts\', // Exclude test files\n   * ])\n   */\n  const rawFiles = import.meta.glob(\n    [\n      // Add your specific patterns here\n      "~/**/*.{vue,ts,css,json}",\n      "!~/**/*.{test,spec}.{vue,ts}",\n    ],\n    {\n      query: "?raw",\n      import: "default",\n      eager: false, // Lazy load to reduce initial bundle\n    }\n  );\n\n  /**\n   * Load code from file or URL\n   */\n  async function loadCode() {\n    if (props.file) {\n      const importer = rawFiles[props.file];\n      if (importer) {\n        try {\n          loadedCode.value = (await importer()) as string;\n        } catch (error) {\n          console.error(`Failed to load file: ${props.file}`, error);\n        }\n      } else {\n        console.warn(`File not found in glob patterns: ${props.file}`);\n      }\n    } else if (props.url) {\n      try {\n        const data = await $fetch(props.url, { parseResponse: (txt) => txt });\n        if (data) {\n          loadedCode.value = data as string;\n        }\n      } catch (error) {\n        console.error(`Failed to fetch URL: ${props.url}`, error);\n      }\n    }\n  }\n\n  /**\n   * Extract specific lines from the loaded code if start and offset are provided\n   */\n  function extractLines() {\n    if (loadedCode.value && props.start !== undefined && props.offset !== undefined) {\n      const lines = loadedCode.value.split("\\n");\n      const startIndex = Number(props.start) - 1; // Convert to 0-indexed\n      const endIndex = startIndex + Number(props.offset);\n      loadedCode.value = lines.slice(startIndex, endIndex).join("\\n");\n    }\n  }\n\n  /**\n   * Generate markdown for MDC to render\n   */\n  const md = computed(() => {\n    const titlePart = props.title ? `[${props.title}]` : "";\n    const highlightsPart = props.highlights ? `{${props.highlights}}` : "";\n    const metaPart = props.meta || "";\n\n    return `\n::div\n\\`\\`\\`\\`${props.language} ${titlePart} ${highlightsPart} ${metaPart}\n${loadedCode.value}\n\\`\\`\\`\\`\n::\n`.trim();\n  });\n\n  // Load code on mount\n  await loadCode();\n  extractLines();\n</script>\n',
    },
  },
  {
    name: "Code Tree",
    value: "code-tree",
    description:
      "A prose component that displays a hierarchical file structure with expandable folders and file preview, perfect for showcasing project structures and code organization.",
    filePath: "app/components/content/prose/CodeTree/ProseCodeTree.global.vue",
    fileName: "ProseCodeTree.global.vue",
    docsUrl: "/prose/code-tree",
    prose: ["pre"],
    deps: ["@baybreezy/file-extension-icon"],
    composables: [
      {
        fileName: "useDefaultSlotItems.ts",
        dirPath: "app/composables",
        fileContent:
          'import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";\nimport type { Slots, VNode, VNodeArrayChildren } from "vue";\n\ntype SlotMetaContext = {\n  vnode: VNode;\n  index: number;\n  props: Record<string, any>;\n};\n\nexport type SlotItem<TMeta = Record<string, any>> = {\n  vnode: VNode;\n  index: number;\n  key: VNode["key"];\n  props: Record<string, any>;\n  meta: TMeta;\n};\n\nexport type UseDefaultSlotItemsOptions<TMeta> = {\n  slots?: Slots;\n  filter?: (ctx: SlotMetaContext) => boolean;\n  mapMeta?: (ctx: SlotMetaContext) => TMeta;\n};\n\n/**\n * Composable to extract and manage items from the default slot\n */\nexport function useDefaultSlotItems<TMeta = Record<string, any>>(\n  options: UseDefaultSlotItemsOptions<TMeta> = {}\n) {\n  const instance = getCurrentInstance();\n  const slots = options.slots ?? instance?.slots;\n\n  const items = computed<SlotItem<TMeta>[]>(() => {\n    const rawChildren = slots?.default?.() ?? [];\n    const nodes = flattenVNodes(rawChildren);\n\n    return nodes\n      .map((vnode, index) => {\n        const props = (vnode.props ?? {}) as Record<string, any>;\n        const ctx: SlotMetaContext = { vnode, index, props };\n\n        if (options.filter && !options.filter(ctx)) {\n          return undefined;\n        }\n\n        return {\n          vnode,\n          index,\n          key: vnode.key ?? index,\n          props,\n          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),\n        };\n      })\n      .filter(Boolean) as SlotItem<TMeta>[];\n  });\n\n  return {\n    items,\n    first: computed(() => items.value[0]),\n    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),\n  };\n}\n\nfunction flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {\n  children.forEach((child) => {\n    if (!child) return;\n\n    if (Array.isArray(child)) {\n      flattenVNodes(child, acc);\n      return;\n    }\n\n    if (!isVNode(child)) {\n      return;\n    }\n\n    if (child.type === Comment) {\n      return;\n    }\n\n    if (child.type === Fragment && Array.isArray(child.children)) {\n      flattenVNodes(child.children as VNodeArrayChildren, acc);\n      return;\n    }\n\n    acc.push(child);\n  });\n\n  return acc;\n}\n',
      },
    ],
    components: ["gradient-divider"],
    file: {
      fileName: "ProseCodeTree.global.vue",
      dirPath: "app/components/content/prose/CodeTree",
      fileContent:
        '<template>\n  <define-tree-child v-slot="{ items: childItems, level }">\n    <li v-for="item in childItems" :key="item.path">\n      <TreeItem v-slot="{ isExpanded, isSelected }" as-child :level="level" :value="item">\n        <button\n          type="button"\n          :aria-expanded="item.children?.length ? isExpanded : undefined"\n          :aria-label="item.children?.length ? `${item.label} folder` : `${item.label} file`"\n          class="inline-flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"\n          :class="[\n            isSelected || lastSelectedItem?.path === item.path ? \'bg-muted text-primary\' : \'\',\n          ]"\n        >\n          <!-- Folder/File Icon -->\n          <img\n            v-if="item.children?.length"\n            :src="getMaterialFolderIcon(item.label, isExpanded)"\n            :alt="`${item.label} folder ${isExpanded ? \'expanded\' : \'collapsed\'}`"\n            class="size-4 shrink-0"\n          />\n          <img\n            v-else\n            :src="getMaterialFileIcon(item.label)"\n            :alt="`${item.label} file`"\n            class="size-4 shrink-0"\n          />\n\n          <!-- Label -->\n          <span class="truncate">{{ item.label }}</span>\n\n          <!-- Chevron for folders -->\n          <Icon\n            v-if="item.children?.length"\n            name="lucide:chevron-down"\n            class="ml-auto size-4 shrink-0 text-muted-foreground transition-transform"\n            :class="[isExpanded ? \'rotate-0\' : \'-rotate-90\']"\n            aria-hidden="true"\n          />\n        </button>\n\n        <!-- Nested children -->\n        <ul v-if="item.children?.length && isExpanded" role="group" class="pl-4">\n          <TreeChild :items="item.children" :level="level + 1" />\n        </ul>\n      </TreeItem>\n    </li>\n  </define-tree-child>\n\n  <div\n    data-slot="prose-code-tree"\n    class="grid overflow-hidden rounded-lg border lg:grid-cols-3"\n    :class="props.class"\n  >\n    <nav class="not-prose h-full overflow-hidden px-2" aria-label="File tree navigation">\n      <template v-if="props.title">\n        <div class="p-2 py-4 text-sm font-medium">\n          <span>\n            {{ props.title }}\n          </span>\n        </div>\n        <UiGradientDivider />\n      </template>\n      <!-- Tree Navigation -->\n      <div class="max-h-[520px] overflow-y-auto py-2">\n        <TreeRoot\n          v-model="selectedItem"\n          :items="treeItems"\n          :get-key="(item) => item.path"\n          :default-expanded="expandedPaths"\n        >\n          <ul class="space-y-1" role="tree">\n            <TreeChild :items="treeItems" :level="0" />\n          </ul>\n        </TreeRoot>\n      </div>\n    </nav>\n\n    <!-- Content Display -->\n    <div\n      class="grid min-h-[240px] grid-cols-1 lg:col-span-2"\n      role="region"\n      aria-label="File content"\n      aria-live="polite"\n    >\n      <component\n        :is="lastSelectedItem?.component"\n        v-if="lastSelectedItem"\n        meta="noFormat"\n        class="mt-0 data-[slot=prose-pre-wrapper]:h-full data-[slot=prose-pre-wrapper]:rounded-none data-[slot=prose-pre-wrapper]:border-0 data-[slot=prose-pre-wrapper]:border-t lg:data-[slot=prose-pre-wrapper]:border-t-0 lg:data-[slot=prose-pre-wrapper]:border-l [&_pre]:h-[calc(100%-45px)] [&_pre]:flex-1 [&>*:first-child]:mt-0"\n      />\n      <div v-else class="flex h-full items-center justify-center text-sm text-muted-foreground">\n        Select a file to view its content\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { getMaterialFileIcon, getMaterialFolderIcon } from "@baybreezy/file-extension-icon";\n  import type { HTMLAttributes } from "vue";\n\n  /**\n   * TreeItem represents a node in the file tree structure\n   */\n  type TreeItem = {\n    /** Display label for the node */\n    label: string;\n    /** Full path from root */\n    path: string;\n    /** Child nodes (only for directories) */\n    children?: TreeItem[];\n    /** Vue component to render when selected (only for files) */\n    component?: any;\n  };\n\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Default file path to select on mount\n       * @example "src/components/Button.vue"\n       */\n      defaultValue?: string;\n      /**\n       * Expand all directories by default instead of just the path to defaultValue\n       * @default false\n       */\n      expandAll?: boolean;\n      /**\n       * Optional title displayed above the file tree\n       * @example "Project Structure"\n       */\n      title?: string;\n      /**\n       * Additional CSS classes for the root container\n       */\n      class?: HTMLAttributes["class"];\n    }>(),\n    {\n      defaultValue: undefined,\n      expandAll: false,\n    }\n  );\n\n  const [DefineTreeChild, TreeChild] = createReusableTemplate<{\n    items: TreeItem[];\n    level: number;\n  }>();\n\n  const selectedItem = ref<TreeItem>();\n  const lastSelectedItem = ref<TreeItem>();\n  const rerenderCount = ref(0);\n\n  // Get slot items from default slot - these are the code blocks passed as children\n  const { items: slotItems } = useDefaultSlotItems({\n    slots: useSlots(),\n    mapMeta: ({ props, vnode }) => ({\n      path: props.path || props.filename || props.label,\n      icon: props.icon,\n      component: vnode,\n    }),\n  });\n\n  /**\n   * Build hierarchical tree structure from flat slot items\n   * Converts flat file paths like "src/components/Button.vue" into nested tree nodes\n   */\n  const treeItems = computed(() => {\n    // Trigger rerender when slots change\n    void rerenderCount.value;\n\n    const flatItems = slotItems.value.map((item) => ({\n      label: item.meta.path,\n      icon: item.meta.icon,\n      component: item.meta.component,\n    }));\n\n    return buildTree(flatItems);\n  });\n\n  /**\n   * Build tree structure from flat file paths\n   * Automatically creates parent directory nodes and sorts alphabetically\n   */\n  function buildTree(items: { label: string; icon?: string; component?: any }[]): TreeItem[] {\n    const map = new Map<string, TreeItem>();\n    const root: TreeItem[] = [];\n\n    items.forEach((item) => {\n      const parts = item.label.split("/");\n      let path = "";\n\n      parts.forEach((part, i) => {\n        path = path ? `${path}/${part}` : part;\n\n        if (!map.has(path)) {\n          const isLeaf = i === parts.length - 1;\n          const node: TreeItem = {\n            label: part,\n            path,\n            ...(isLeaf ? { component: item.component, icon: item.icon } : { children: [] }),\n          };\n\n          map.set(path, node);\n\n          if (i === 0) {\n            root.push(node);\n          } else {\n            const parentPath = parts.slice(0, i).join("/");\n            map.get(parentPath)?.children?.push(node);\n          }\n        }\n      });\n    });\n\n    // Sort function\n    const sort = (nodes: TreeItem[]): TreeItem[] =>\n      nodes\n        .sort((a, b) =>\n          !!a.children === !!b.children ? a.label.localeCompare(b.label) : a.children ? -1 : 1\n        )\n        .map((n) => ({ ...n, children: n.children && sort(n.children) }));\n\n    return sort(root);\n  }\n\n  /**\n   * Calculate which paths should be expanded based on the selected item or expandAll prop\n   */\n  const expandedPaths = computed(() => {\n    if (props.expandAll) {\n      const allPaths = new Set<string>();\n      slotItems.value.forEach((item) => {\n        const parts = item.meta.path.split("/");\n        for (let i = 1; i < parts.length; i++) {\n          allPaths.add(parts.slice(0, i).join("/"));\n        }\n      });\n      return Array.from(allPaths);\n    }\n\n    const path = selectedItem.value?.path || props.defaultValue;\n    if (!path) return [];\n\n    const parts = path.split("/");\n    return parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join("/"));\n  });\n\n  /**\n   * Watch for selection changes and update lastSelectedItem if a file (not folder) is selected\n   */\n  watch(selectedItem, (newVal) => {\n    if (newVal && !newVal.children?.length) {\n      lastSelectedItem.value = newVal;\n    }\n  });\n\n  /**\n   * Set initial selection on mount if defaultValue is provided\n   */\n  onMounted(() => {\n    if (props.defaultValue) {\n      const findItem = (items: TreeItem[]): TreeItem | undefined => {\n        for (const item of items) {\n          if (item.path === props.defaultValue) return item;\n          if (item.children) {\n            const found = findItem(item.children);\n            if (found) return found;\n          }\n        }\n      };\n      const initial = findItem(treeItems.value);\n      if (initial) {\n        selectedItem.value = initial;\n      }\n    }\n  });\n</script>\n',
    },
  },
  {
    name: "Collapsible",
    value: "collapsible",
    description:
      "A prose component that hide and reveal content with a collapsible component featuring customizable icons and labels.",
    filePath: "app/components/content/prose/ProseCollapsible.global.vue",
    fileName: "ProseCollapsible.global.vue",
    docsUrl: "/prose/collapsible",
    prose: ["smart-icon"],
    components: ["collapsible"],
    file: {
      fileName: "ProseCollapsible.global.vue",
      dirPath: "app/components/content/prose",
      fileContent:
        '<template>\n  <UiCollapsible v-slot="{ open }" :default-open="defaultOpen" class="my-4">\n    <UiCollapsibleTrigger\n      class="group relative inline-flex items-center gap-1.5 rounded-xs text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"\n      :class="triggerClass"\n    >\n      <ProseSmartIcon v-if="open ? openIcon : closeIcon" :name="open ? openIcon! : closeIcon!" />\n      <span>{{ open ? closeTitle : openTitle }}</span>\n    </UiCollapsibleTrigger>\n    <UiCollapsibleContent :class="contentClass" class="*:my-1.5 *:first:mt-2 *:last:mb-0">\n      <slot />\n    </UiCollapsibleContent>\n  </UiCollapsible>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseCollapsibleProps = {\n    /**\n     * Icon to show when collapsible is open\n     * @default "lucide:minus"\n     */\n    openIcon?: string;\n    /**\n     * Icon to show when collapsible is closed\n     * @default "lucide:plus"\n     */\n    closeIcon?: string;\n    /**\n     * Text to show when collapsible is closed (trigger to open)\n     * @default "Show more"\n     */\n    openTitle?: string;\n    /**\n     * Text to show when collapsible is open (trigger to close)\n     * @default "Show less"\n     */\n    closeTitle?: string;\n    /**\n     * Whether the collapsible should be open by default\n     * @default false\n     */\n    defaultOpen?: boolean;\n    /**\n     * Additional CSS classes for the trigger button\n     */\n    triggerClass?: HTMLAttributes["class"];\n    /**\n     * Additional CSS classes for the content area\n     */\n    contentClass?: HTMLAttributes["class"];\n  };\n</script>\n\n<script lang="ts" setup>\n  withDefaults(defineProps<ProseCollapsibleProps>(), {\n    openIcon: "lucide:minus",\n    closeIcon: "lucide:plus",\n    openTitle: "Show more",\n    closeTitle: "Show less",\n    defaultOpen: false,\n  });\n</script>\n',
    },
  },
  {
    name: "Color Mode Image",
    value: "color-mode-image",
    description:
      "A prose component that allows you to use images in your content with zoom and styling options that adapt to light and dark color modes.",
    filePath: "app/components/content/prose/Images/ProseColorModeImage.global.vue",
    fileName: "ProseColorModeImage.global.vue",
    docsUrl: "/prose/image",
    prose: ["image"],
    file: {
      fileName: "ProseColorModeImage.global.vue",
      dirPath: "app/components/content/prose/Images",
      fileContent:
        '<template>\n  <div class="not-first:mt-6">\n    <div class="dark:hidden">\n      <ProseImg v-bind="forwarded" :src="srcLight" />\n    </div>\n    <div class="hidden dark:block">\n      <ProseImg v-bind="forwarded" :src="srcDark" />\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseColorModeImageProps = {\n    /**\n     * Source URL for light mode image\n     */\n    srcLight?: string;\n    /**\n     * Source URL for dark mode image\n     */\n    srcDark?: string;\n    /**\n     * Alt text for the image\n     */\n    alt?: string;\n    /**\n     * Width of the image\n     */\n    width?: string | number;\n    /**\n     * Height of the image\n     */\n    height?: string | number;\n    /**\n     * Whether the image should have a lifted style\n     */\n    lifted?: boolean;\n    /**\n     * Whether the image should have zoom effect on hover\n     * @default true\n     */\n    zoom?: boolean;\n    /**\n     * Additional CSS classes for the image element\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script setup lang="ts">\n  const props = withDefaults(defineProps<ProseColorModeImageProps>(), {\n    zoom: true,\n    lifted: false,\n  });\n  const forwarded = reactiveOmit(props, "srcLight", "srcDark");\n</script>\n',
    },
  },
  {
    name: "Emphasis <em>",
    value: "em",
    description:
      "A prose component that displays styled emphasis elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseEm.global.vue",
    fileName: "ProseEm.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseEm.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent: '<template>\n  <em data-slot="prose-em">\n    <slot />\n  </em>\n</template>\n',
    },
  },
  {
    name: "Field",
    value: "field",
    description:
      "A prose component that displays component props or configuration options in a beautiful, readable format instead of traditional tables.",
    filePath: "app/components/content/prose/Field/ProseField.global.vue",
    fileName: "ProseField.global.vue",
    docsUrl: "/prose/field",
    prose: ["smart-icon", "pre"],
    components: ["tooltip"],
    file: {
      fileName: "ProseField.global.vue",
      dirPath: "app/components/content/prose/Field",
      fileContent:
        '<template>\n  <div :class="styles.base()">\n    <!-- Name Section -->\n    <div v-if="$slots.name || name" :class="styles.name()">\n      <slot mdc-unwrap="p" name="name">\n        <span v-if="name" :class="styles.nameText()">{{ name }}</span>\n      </slot>\n      <!-- Tooltip Section -->\n      <slot mdc-unwrap="p" name="tip">\n        <UiTooltip v-if="tip">\n          <UiTooltipTrigger>\n            <prose-smart-icon v-if="tipIcon" class="text-muted-foreground" :name="tipIcon" />\n          </UiTooltipTrigger>\n          <UiTooltipContent>\n            <span>{{ tip }}</span>\n            <UiTooltipArrow />\n          </UiTooltipContent>\n        </UiTooltip>\n      </slot>\n      <code v-if="type" :class="styles.typeBadge()">{{ type }}</code>\n      <code v-if="required" :class="styles.requiredBadge()">required</code>\n    </div>\n\n    <!-- Default Value Section -->\n    <div v-if="$slots[\'default-value\'] || defaultValue" :class="styles.defaultValue()">\n      <span :class="styles.defaultLabel()">Default</span>\n      <slot mdc-unwrap="p" name="default-value">\n        <code :class="styles.defaultCode()">{{ defaultValue }}</code>\n      </slot>\n    </div>\n    <!-- Description Section -->\n    <div v-if="$slots.default || description" :class="styles.description()">\n      <slot mdc-unwrap="p">\n        {{ description }}\n      </slot>\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import { tv } from "tailwind-variants";\n\n  /**\n   * Field styles configuration using tailwind-variants\n   */\n  export const fieldStyles = tv({\n    slots: {\n      base: "flex flex-col gap-2 py-4",\n      name: "flex flex-wrap items-center gap-2",\n      nameText: "font-semibold text-foreground",\n      typeBadge: "rounded-md px-1.5 py-0.5 text-[11px]",\n      requiredBadge:\n        "rounded-md border-red-500/50 bg-red-500/10! px-1.5 py-0.5 text-[11px] text-red-500",\n      description: "max-w-none text-[15px] text-muted-foreground",\n      defaultValue: "flex items-center gap-2 text-sm",\n      defaultLabel: "font-medium text-muted-foreground",\n      defaultCode:\n        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-[11px] text-foreground",\n    },\n  });\n\n  /**\n   * Field component props type\n   */\n  export type ProseFieldProps = {\n    /**\n     * The name/title of the field\n     * @example "variant"\n     */\n    name?: string;\n\n    /**\n     * Description of what this field does\n     * @example "The variant style of the button"\n     */\n    description?: string;\n\n    /**\n     * The default value for this field\n     * @example "default"\n     */\n    defaultValue?: string | number | boolean | Record<string, any>;\n\n    /**\n     * The type of value this field accepts\n     * @example "string | number"\n     */\n    type?: string;\n\n    /**\n     * A brief tip or note about this field\n     *\n     * Will be displayed in a tooltip\n     */\n    tip?: string;\n\n    /**\n     * Icon that will be displayed in the tip tooltip\n     * @default \'lucide:circle-question-mark\'\n     */\n    tipIcon?: string;\n\n    /**\n     * Whether this field is required\n     * @default false\n     */\n    required?: boolean;\n  };\n</script>\n\n<script lang="ts" setup>\n  withDefaults(defineProps<ProseFieldProps>(), {\n    required: false,\n    tipIcon: "lucide:circle-question-mark",\n  });\n\n  const styles = fieldStyles();\n</script>\n',
    },
  },
  {
    name: "Field Group",
    value: "field-group",
    description:
      "A prose component that displays component props or configuration options in a beautiful, readable format instead of traditional tables.",
    filePath: "app/components/content/prose/Field/ProseFieldGroup.global.vue",
    fileName: "ProseFieldGroup.global.vue",
    docsUrl: "/prose/field",
    prose: ["field"],
    file: {
      fileName: "ProseFieldGroup.global.vue",
      dirPath: "app/components/content/prose/Field",
      fileContent:
        '<template>\n  <div :class="styles.base({ variant })">\n    <slot />\n  </div>\n</template>\n\n<script lang="ts">\n  import { tv } from "tailwind-variants";\n\n  /**\n   * Field group styles configuration using tailwind-variants\n   */\n  export const fieldGroupStyles = tv({\n    slots: {\n      base: "flex flex-col",\n    },\n    variants: {\n      variant: {\n        /**\n         * Add dividers between fields\n         */\n        divided: "[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border",\n        /**\n         * Add striped background to alternate fields\n         */\n        striped: "*:pl-4 [&>*:nth-child(even)]:bg-muted dark:[&>*:nth-child(even)]:bg-muted/50",\n        /**\n         * Add border around the group\n         */\n        bordered:\n          "overflow-hidden rounded-lg border border-border *:pl-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border",\n        /**\n         * A combination of all variants\n         */\n        all: "overflow-hidden rounded-lg border border-border *:pl-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border [&>*:nth-child(even)]:bg-muted dark:[&>*:nth-child(even)]:bg-muted/50",\n      },\n    },\n    defaultVariants: {\n      variant: "divided",\n    },\n  });\n\n  /**\n   * Field group component props type\n   */\n  export type ProseFieldGroupProps = {\n    /**\n     * The variant style of the field group\n     */\n    variant?: VariantProps<typeof fieldGroupStyles>["variant"];\n  };\n</script>\n\n<script lang="ts" setup>\n  withDefaults(defineProps<ProseFieldGroupProps>(), {\n    variant: "divided",\n  });\n\n  const styles = fieldGroupStyles();\n</script>\n',
    },
  },
  {
    name: "Heading 1",
    value: "h1",
    description:
      "A prose component that displays styled heading level 1 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH1.global.vue",
    fileName: "ProseH1.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH1.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h1 :id="id" :class="proseH1Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink\n      v-if="generate"\n      data-slot="h1-link"\n      v-bind="linkProps"\n      class="relative inline-block"\n      :to="`#${id}`"\n    >\n      <Icon\n        name="lucide:link"\n        aria-hidden="true"\n        class="absolute top-2 -left-6 h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"\n      />\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h1>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH1Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH1Styles = tv({\n    base: "group scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH1Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h1))\n  );\n</script>\n',
    },
  },
  {
    name: "Heading 2",
    value: "h2",
    description:
      "A prose component that displays styled heading level 2 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH2.global.vue",
    fileName: "ProseH2.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH2.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h2 :id="id" :class="proseH2Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink\n      v-if="generate"\n      data-slot="h2-link"\n      v-bind="linkProps"\n      class="group relative inline-block"\n      :to="`#${id}`"\n    >\n      <Icon\n        name="lucide:link"\n        aria-hidden="true"\n        class="absolute top-2 -left-8 hidden size-5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"\n      />\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h2>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH2Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH2Styles = tv({\n    base: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-balance transition-colors first:mt-0",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH2Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2))\n  );\n</script>\n',
    },
  },
  {
    name: "Heading 3",
    value: "h3",
    description:
      "A prose component that displays styled heading level 3 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH3.global.vue",
    fileName: "ProseH3.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH3.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h3 :id="id" :class="proseH3Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink\n      v-if="generate"\n      data-slot="h3-link"\n      v-bind="linkProps"\n      class="group relative inline-block"\n      :to="`#${id}`"\n    >\n      <Icon\n        name="lucide:link"\n        aria-hidden="true"\n        class="absolute top-1.5 -left-8 hidden size-5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"\n      />\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h3>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH3Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH3Styles = tv({\n    base: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-balance not-first:mt-8",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH3Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h3))\n  );\n</script>\n',
    },
  },
  {
    name: "Heading 4",
    value: "h4",
    description:
      "A prose component that displays styled heading level 4 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH4.global.vue",
    fileName: "ProseH4.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH4.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h4 :id="id" :class="proseH4Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink\n      v-if="generate"\n      data-slot="h4-link"\n      v-bind="linkProps"\n      class="group relative inline-block"\n      :to="`#${id}`"\n    >\n      <Icon\n        name="lucide:link"\n        aria-hidden="true"\n        class="absolute top-1.5 -left-6 hidden size-3.5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"\n      />\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h4>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH4Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH4Styles = tv({\n    base: "scroll-m-20 text-xl font-semibold tracking-tight text-balance not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH4Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h4))\n  );\n</script>\n',
    },
  },
  {
    name: "Heading 5",
    value: "h5",
    description:
      "A prose component that displays styled heading level 5 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH5.global.vue",
    fileName: "ProseH5.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH5.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h5 :id="id" :class="proseH5Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink v-if="generate" data-slot="h5-link" v-bind="linkProps" :to="`#${id}`">\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h5>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH5Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH5Styles = tv({\n    base: "scroll-m-20 text-lg font-semibold tracking-tight text-balance not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH5Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h5))\n  );\n</script>\n',
    },
  },
  {
    name: "Heading 6",
    value: "h6",
    description:
      "A prose component that displays styled heading level 6 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH6.global.vue",
    fileName: "ProseH6.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseH6.global.vue",
      dirPath: "app/components/content/prose/Typography/Headings",
      fileContent:
        '<template>\n  <h6 :id="id" :class="proseH6Styles({ class: normalizeClass(_class) || undefined })">\n    <NuxtLink v-if="generate" data-slot="h6-link" v-bind="linkProps" :to="`#${id}`">\n      <slot />\n    </NuxtLink>\n    <slot v-else />\n  </h6>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { NuxtLinkProps } from "#app";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseH6Props = {\n    /**\n     * Optional ID for anchor links\n     */\n    id?: string;\n    /**\n     * Props to pass to NuxtLink when anchor links are enabled\n     */\n    linkProps?: NuxtLinkProps;\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseH6Styles = tv({\n    base: "scroll-m-20 text-lg font-semibold tracking-tight text-balance not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { id, linkProps, class: _class } = defineProps<ProseH6Props>();\n\n  // Determine if we should generate anchor links\n  const { headings } = useRuntimeConfig().public.mdc;\n  const generate = computed(\n    () =>\n      id &&\n      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||\n        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h6))\n  );\n</script>\n',
    },
  },
  {
    name: "Horizontal Rule",
    value: "hr",
    description:
      "A prose component that displays styled horizontal rule elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseHr.global.vue",
    fileName: "ProseHr.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseHr.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <hr data-slot="prose-hr" :class="proseHrStyles({ class: normalizeClass(_class) || undefined })" />\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseHrProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseHrStyles = tv({\n    base: "mb-6 not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseHrProps>();\n</script>\n',
    },
  },
  {
    name: "Icon List",
    value: "icon-list",
    description:
      "A prose component that displays lists with custom icons and variants for each item.",
    filePath: "app/components/content/prose/Typography/Lists/ProseIconList.global.vue",
    fileName: "ProseIconList.global.vue",
    docsUrl: "/prose/icon-list",
    composables: [
      {
        fileName: "useDefaultSlotItems.ts",
        dirPath: "app/composables",
        fileContent:
          'import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";\nimport type { Slots, VNode, VNodeArrayChildren } from "vue";\n\ntype SlotMetaContext = {\n  vnode: VNode;\n  index: number;\n  props: Record<string, any>;\n};\n\nexport type SlotItem<TMeta = Record<string, any>> = {\n  vnode: VNode;\n  index: number;\n  key: VNode["key"];\n  props: Record<string, any>;\n  meta: TMeta;\n};\n\nexport type UseDefaultSlotItemsOptions<TMeta> = {\n  slots?: Slots;\n  filter?: (ctx: SlotMetaContext) => boolean;\n  mapMeta?: (ctx: SlotMetaContext) => TMeta;\n};\n\n/**\n * Composable to extract and manage items from the default slot\n */\nexport function useDefaultSlotItems<TMeta = Record<string, any>>(\n  options: UseDefaultSlotItemsOptions<TMeta> = {}\n) {\n  const instance = getCurrentInstance();\n  const slots = options.slots ?? instance?.slots;\n\n  const items = computed<SlotItem<TMeta>[]>(() => {\n    const rawChildren = slots?.default?.() ?? [];\n    const nodes = flattenVNodes(rawChildren);\n\n    return nodes\n      .map((vnode, index) => {\n        const props = (vnode.props ?? {}) as Record<string, any>;\n        const ctx: SlotMetaContext = { vnode, index, props };\n\n        if (options.filter && !options.filter(ctx)) {\n          return undefined;\n        }\n\n        return {\n          vnode,\n          index,\n          key: vnode.key ?? index,\n          props,\n          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),\n        };\n      })\n      .filter(Boolean) as SlotItem<TMeta>[];\n  });\n\n  return {\n    items,\n    first: computed(() => items.value[0]),\n    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),\n  };\n}\n\nfunction flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {\n  children.forEach((child) => {\n    if (!child) return;\n\n    if (Array.isArray(child)) {\n      flattenVNodes(child, acc);\n      return;\n    }\n\n    if (!isVNode(child)) {\n      return;\n    }\n\n    if (child.type === Comment) {\n      return;\n    }\n\n    if (child.type === Fragment && Array.isArray(child.children)) {\n      flattenVNodes(child.children as VNodeArrayChildren, acc);\n      return;\n    }\n\n    acc.push(child);\n  });\n\n  return acc;\n}\n',
      },
    ],
    file: {
      fileName: "ProseIconList.global.vue",
      dirPath: "app/components/content/prose/Typography/Lists",
      fileContent:
        '<template>\n  <div\n    role="list"\n    data-slot="prose-icon-list"\n    :class="proseIconListStyles().base({ class: normalizeClass(props.class) || undefined })"\n  >\n    <div\n      v-for="item in slottedItems"\n      :key="item.key ?? item.index"\n      role="listitem"\n      :class="proseIconListStyles().item()"\n    >\n      <Icon\n        v-if="item.meta.icon"\n        data-slot="icon"\n        :name="item.meta.icon"\n        :class="proseIconListStyles().icon({ variant: item.meta.variant })"\n      />\n      <component :is="item.vnode" />\n    </div>\n  </div>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { VariantProps } from "tailwind-variants";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseIconListProps = {\n    /**\n     * Additional classes for the list element\n     */\n    class?: HTMLAttributes["class"];\n    /**\n     * Default variant for all list items (can be overridden per item)\n     */\n    variant?: VariantProps<typeof proseIconListStyles>["variant"];\n    /**\n     * Default icon for all list items (can be overridden per item)\n     */\n    icon?: string;\n  };\n\n  type ListItemMeta = {\n    icon: string;\n    variant?: VariantProps<typeof proseIconListStyles>["variant"];\n  };\n\n  export const proseIconListStyles = tv({\n    slots: {\n      base: "ml-4 flex list-none flex-col gap-3",\n      item: "flex items-start gap-2 *:my-0! *:leading-normal **:[[role=list]]:mt-2 **:[[role=list]]:mb-2 [&>svg]:mt-1! has-[>*_code]:[&>svg]:mt-1!",\n      icon: "mt-0.5 inline-block size-4 shrink-0",\n    },\n    variants: {\n      variant: {\n        success: {\n          icon: "text-emerald-500",\n        },\n        error: {\n          icon: "text-destructive",\n        },\n        warning: {\n          icon: "text-yellow-500",\n        },\n        info: {\n          icon: "text-blue-500",\n        },\n        default: {\n          icon: "text-muted-foreground",\n        },\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n    },\n  });\n</script>\n\n<script setup lang="ts">\n  const props = defineProps<ProseIconListProps>();\n\n  function getDefaultIcon(variant?: ProseIconListProps["variant"]): string {\n    if (props.icon) return props.icon;\n\n    switch (variant ?? props.variant) {\n      case "success":\n        return "lucide:circle-check";\n      case "error":\n        return "lucide:circle-x";\n      case "warning":\n        return "lucide:triangle-alert";\n      case "info":\n        return "lucide:info";\n      default:\n        return "radix-icons:dot-filled";\n    }\n  }\n\n  const { items: slottedItems } = useDefaultSlotItems<ListItemMeta>({\n    slots: useSlots(),\n    mapMeta({ props: itemProps }) {\n      // Each li can have its own icon and variant\n      const itemVariant = (itemProps.variant as ProseIconListProps["variant"]) ?? props.variant;\n      const itemIcon = (itemProps.icon as string) ?? getDefaultIcon(itemVariant);\n\n      return {\n        icon: itemIcon,\n        variant: itemVariant,\n      };\n    },\n  });\n</script>\n',
    },
  },
  {
    name: "Image",
    value: "image",
    description:
      "A prose component that allows you to use images in your content with zoom and styling options.",
    filePath: "app/components/content/prose/Images/ProseImg.global.vue",
    fileName: "ProseImg.global.vue",
    docsUrl: "/prose/image",
    modules: ["image"],
    deps: ["ufo"],
    file: {
      fileName: "ProseImg.global.vue",
      dirPath: "app/components/content/prose/Images",
      fileContent:
        '<template>\n  <DefineImg>\n    <NuxtImg\n      :src="refinedSrc"\n      :alt\n      :width\n      :height\n      :class="proseImgStyles({ lifted, zoom, class: normalizeClass(props.class) || undefined })"\n    />\n  </DefineImg>\n\n  <DialogRoot v-if="zoom">\n    <DialogTrigger class="block w-full">\n      <ReuseImg />\n    </DialogTrigger>\n    <DialogPortal>\n      <DialogOverlay\n        class="fixed inset-0 z-50 bg-background/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"\n      />\n      <DialogContent\n        class="fixed top-1/2 left-1/2 z-50 grid -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:rounded-lg"\n      >\n        <DialogTitle class="sr-only">{{ props.alt || "Image Preview" }}</DialogTitle>\n        <DialogDescription class="sr-only">{{ props.alt || "Image Preview" }}</DialogDescription>\n        <DialogClose>\n          <NuxtImg\n            :src="refinedSrc"\n            :alt\n            :width\n            :height\n            class="max-h-svh max-w-svw cursor-zoom-out md:rounded-lg"\n          />\n        </DialogClose>\n      </DialogContent>\n    </DialogPortal>\n  </DialogRoot>\n  <ReuseImg v-else />\n</template>\n\n<script lang="ts">\n  import {\n    DialogClose,\n    DialogContent,\n    DialogOverlay,\n    DialogPortal,\n    DialogRoot,\n    DialogTrigger,\n  } from "reka-ui";\n  import { joinURL, withLeadingSlash, withTrailingSlash } from "ufo";\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseImgProps = {\n    /**\n     * Image source URL\n     */\n    src?: string;\n    /**\n     * Alt text for the image\n     */\n    alt?: string;\n    /**\n     * Width of the image\n     * @default "100%"\n     */\n    width?: string | number;\n    /**\n     * Height of the image\n     */\n    height?: string | number;\n    /**\n     * Whether the image should have a lifted style\n     */\n    lifted?: boolean;\n    /**\n     * Whether the image should have zoom effect on hover\n     * @default true\n     */\n    zoom?: boolean;\n    /**\n     * Additional CSS classes for the image element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseImgStyles = tv({\n    base: "w-full rounded-md object-cover",\n    variants: {\n      lifted: {\n        true: "rounded-lg border bg-card text-card-foreground shadow-xs",\n      },\n      zoom: {\n        true: "cursor-zoom-in",\n      },\n    },\n    defaultVariants: {\n      lifted: false,\n      zoom: true,\n    },\n  });\n</script>\n\n<script lang="ts" setup>\n  const props = withDefaults(defineProps<ProseImgProps>(), {\n    lifted: false,\n    zoom: true,\n    width: "100%",\n  });\n\n  const [DefineImg, ReuseImg] = createReusableTemplate();\n\n  const refinedSrc = computed(() => {\n    if (props.src?.startsWith("/") && !props.src.startsWith("//")) {\n      const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));\n      if (_base !== "/" && !props.src.startsWith(_base)) return joinURL(_base, props.src);\n    }\n    return props.src;\n  });\n</script>\n',
    },
  },
  {
    name: "Lead",
    value: "lead",
    description:
      "A prose component that displays styled lead text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseLead.global.vue",
    fileName: "ProseLead.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseLead.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <p\n    data-slot="prose-lead"\n    :class="proseLeadStyles({ class: normalizeClass(_class) || undefined })"\n  >\n    <slot />\n  </p>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseLeadProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseLeadStyles = tv({\n    base: "text-xl leading-7 text-pretty text-muted-foreground not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseLeadProps>();\n</script>\n',
    },
  },
  {
    name: "List Item",
    value: "li",
    description:
      "A prose component that displays styled list item elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseLi.global.vue",
    fileName: "ProseLi.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseLi.global.vue",
      dirPath: "app/components/content/prose/Typography/Lists",
      fileContent:
        '<template>\n  <li data-slot="prose-li" :class="proseLiStyles({ class: normalizeClass(_class) || undefined })">\n    <slot mdc-unwrap="p" />\n  </li>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseListItemProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseLiStyles = tv({\n    base: "text-pretty [&>ol]:mt-2! [&>ul]:mt-2!",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseListItemProps>();\n</script>\n',
    },
  },
  {
    name: "Mermaid",
    value: "mermaid",
    description:
      "A prose component that renders interactive diagrams and flowcharts using Mermaid syntax with automatic theme detection and lazy loading.",
    filePath: "app/components/content/prose/Code/ProseMermaid.global.vue",
    fileName: "ProseMermaid.global.vue",
    prose: ["callout", "pre"],
    docsUrl: "/prose/mermaid",
    deps: ["mermaid"],
    plugins: [
      {
        fileName: "mermaid.client.ts",
        dirPath: "app/plugins",
        fileContent:
          'import mermaid from "mermaid";\nimport type { MermaidConfig } from "mermaid";\n\nexport default defineNuxtPlugin(() => {\n  /**\n   * Mermaid initialization configuration\n   */\n  const mermaidInitConfig = {\n    startOnLoad: false,\n    themeVariables: {\n      fontFamily: "var(--font-sans)",\n      fontSize: "13px",\n    },\n    flowchart: {\n      curve: "basis",\n      useMaxWidth: true,\n    },\n    sequence: {\n      actorMargin: 50,\n      showSequenceNumbers: false,\n    },\n    suppressErrorRendering: true,\n  } as MermaidConfig;\n  /**\n   * Initialize Mermaid with the specified configuration\n   */\n  mermaid.initialize(mermaidInitConfig);\n\n  return {\n    provide: {\n      mermaidInstance: mermaid,\n      mermaidInitConfig,\n    },\n  };\n});\n',
      },
    ],
    file: {
      fileName: "ProseMermaid.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <ProseCallout v-if="error" variant="error" title="Mermaid Chart Error" :description="error" />\n  <div v-else class="rounded-lg p-4 text-card-foreground not-first:mt-5 not-last:mb-5">\n    <div v-if="loading" class="flex items-center justify-center">\n      <div class="flex flex-col items-center gap-2 p-4">\n        <Icon name="lucide:loader-circle" class="size-6! animate-spin" />\n        <span class="text-sm text-muted-foreground">Rendering Chart</span>\n      </div>\n    </div>\n    <div\n      ref="mermaidContainer"\n      class="flex justify-center overflow-x-auto transition-all"\n      v-html="svgContent"\n    />\n  </div>\n</template>\n\n<script setup lang="ts">\n  const props = defineProps<{\n    /** The Mermaid diagram definition code */\n    code?: string;\n  }>();\n\n  const mermaidContainer = useTemplateRef("mermaidContainer");\n  const svgContent = ref<string>("");\n  const error = ref<string | null>(null);\n  const loading = ref(true);\n  const hasRenderedOnce = ref(false);\n  const mermaidDefinition = ref("");\n\n  const colorMode = useColorMode();\n  const { $mermaidInstance, $mermaidInitConfig } = useNuxtApp();\n  const slots = useSlots();\n\n  const mermaidTheme = computed(() => (colorMode.value === "dark" ? "dark" : "default"));\n  // Generate unique IDs\n  const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;\n  /**\n   * Renders the Mermaid diagram with the current theme and configuration\n   */\n  async function renderMermaid() {\n    if (!$mermaidInstance) {\n      error.value = "Mermaid instance not initialized";\n      loading.value = false;\n      return;\n    }\n\n    try {\n      loading.value = true;\n      error.value = null;\n\n      // Get diagram definition from props or slot content\n      mermaidDefinition.value =\n        props.code?.trim() ||\n        slots\n          .default?.()\n          .map((vnode) => vnode.children)\n          .join("")\n          .trim() ||\n        "";\n\n      if (!mermaidDefinition.value) {\n        error.value = "No Mermaid definition provided";\n        loading.value = false;\n        return;\n      }\n\n      // Initialize Mermaid with current theme\n      $mermaidInstance.initialize({\n        ...$mermaidInitConfig,\n        theme: mermaidTheme.value,\n      });\n\n      await nextTick();\n\n      // Render the diagram with a unique ID\n      const { svg } = await $mermaidInstance.render(`mermaid-${uniqueId}`, mermaidDefinition.value);\n\n      svgContent.value = svg;\n      hasRenderedOnce.value = true;\n    } catch (e) {\n      console.error("Error rendering Mermaid chart:", e);\n      error.value = (e as any)?.message || String(e);\n    } finally {\n      loading.value = false;\n    }\n  }\n\n  useIntersectionObserver(\n    mermaidContainer,\n    ([entry]) => {\n      if (entry?.isIntersecting && !hasRenderedOnce.value) {\n        renderMermaid();\n      }\n    },\n    { threshold: 0.1 }\n  );\n\n  // Re-render when theme changes (only if already rendered once)\n  watch(mermaidTheme, () => {\n    if (hasRenderedOnce.value) {\n      renderMermaid();\n    }\n  });\n\n  // Re-render when code prop changes (only if already rendered once)\n  watch(\n    () => props.code,\n    () => {\n      if (hasRenderedOnce.value) {\n        renderMermaid();\n      }\n    }\n  );\n\n  const emit = defineEmits<{\n    mermaidError: [payload?: string];\n  }>();\n\n  // Watch error and emit event\n  watch(error, (newError) => {\n    if (newError) {\n      // Emit an event or handle the error as needed\n      emit("mermaidError", newError);\n    }\n  });\n</script>\n',
    },
  },
  {
    name: "Ordered List",
    value: "ol",
    description:
      "A prose component that displays styled ordered list elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseOl.global.vue",
    fileName: "ProseOl.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseOl.global.vue",
      dirPath: "app/components/content/prose/Typography/Lists",
      fileContent:
        '<template>\n  <ol data-slot="prose-ol" :class="proseOlStyles({ class: normalizeClass(_class) || undefined })">\n    <slot mdc-unwrap="p" />\n  </ol>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseOlProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseOlStyles = tv({\n    base: "ml-4 list-decimal not-first:mt-6 not-last:mb-6 [&>li:not(:first-child)]:mt-2",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseOlProps>();\n</script>\n',
    },
  },
  {
    name: "Paragraph",
    value: "p",
    description:
      "A prose component that displays styled paragraph text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseP.global.vue",
    fileName: "ProseP.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseP.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <p data-slot="prose-p" :class="prosePStyles({ class: normalizeClass(_class) || undefined })">\n    <slot />\n  </p>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProsePProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const prosePStyles = tv({\n    base: "leading-7 text-pretty not-first:mt-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProsePProps>();\n</script>\n',
    },
  },
  {
    name: "PM Install",
    value: "pm-install",
    description:
      "A prose component that displays an install command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmInstall.global.vue",
    fileName: "ProsePmInstall.global.vue",
    docsUrl: "/prose/package-manager",
    composables: [
      {
        fileName: "usePm.ts",
        dirPath: "app/composables",
        fileContent:
          '/**\n * Package manager name type\n */\nexport type PackageManagerName = "npm" | "pnpm" | "bun" | "yarn";\n\n/**\n * Package manager interface\n */\nexport interface PackageManager {\n  name: PackageManagerName;\n  command: string;\n  install: string;\n  installEmpty: string;\n  run: string;\n  x: string;\n  saveDev: string;\n  icon: string;\n}\n\n/**\n * List of supported package managers\n */\nconst PACKAGE_MANAGERS: readonly PackageManager[] = [\n  {\n    name: "npm",\n    command: "npm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "npx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:npm",\n  },\n  {\n    name: "pnpm",\n    command: "pnpm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "pnpm dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:pnpm",\n  },\n  {\n    name: "bun",\n    command: "bun ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "bun x ",\n    saveDev: "-d ",\n    icon: "material-icon-theme:bun",\n  },\n  {\n    name: "yarn",\n    command: "yarn ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "yarn dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:yarn",\n  },\n] as const;\n\n/**\n * Composable to access package manager data\n */\nexport function usePm() {\n  return {\n    packageManagers: PACKAGE_MANAGERS,\n  };\n}\n',
      },
    ],
    prose: ["pre", "code-group"],
    file: {
      fileName: "ProsePmInstall.global.vue",
      dirPath: "app/components/content/prose/PackageManager",
      fileContent:
        '<template>\n  <MDC :value="md" class="not-first:mt-5" />\n</template>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Whether to render in a stack layout\n       * @default false\n       */\n      inStack?: boolean;\n      /**\n       * Package name to install\n       */\n      name?: string;\n      /**\n       * Sync identifier for syncing with other code groups\n       * @default "_pm"\n       */\n      sync?: string;\n      /**\n       * Add --save-dev flag for dev dependencies\n       * @default false\n       */\n      saveDev?: boolean;\n      /**\n       * Disable syncing between code groups\n       * @default false\n       */\n      noSync?: boolean;\n    }>(),\n    {\n      inStack: false,\n      sync: "_pm",\n      saveDev: false,\n      noSync: false,\n    }\n  );\n\n  const { packageManagers } = usePm();\n\n  const md = computed(() => {\n    const codeBlocks = packageManagers\n      .map((pm) => {\n        const command = props.name\n          ? `${pm.command}${pm.install}${props.saveDev ? pm.saveDev : ""}${props.name}`\n          : `${pm.command}${pm.installEmpty}`;\n\n        return `\\`\\`\\`bash icon="${pm.icon}" noFormat hideHeader [${pm.name}]\\n${command}\\n\\`\\`\\``;\n      })\n      .join("\\n\\n");\n\n    const attributes = [props.inStack && "in-stack", !props.noSync && `sync="${props.sync}"`]\n      .filter(Boolean)\n      .join(" ");\n\n    return `::prose-code-group${attributes ? `{${attributes}}` : ""}\\n${codeBlocks}\\n::`;\n  });\n</script>\n',
    },
  },
  {
    name: "PM Run",
    value: "pm-run",
    description:
      "A prose component that displays a run command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmRun.global.vue",
    fileName: "ProsePmRun.global.vue",
    docsUrl: "/prose/package-manager",
    composables: [
      {
        fileName: "usePm.ts",
        dirPath: "app/composables",
        fileContent:
          '/**\n * Package manager name type\n */\nexport type PackageManagerName = "npm" | "pnpm" | "bun" | "yarn";\n\n/**\n * Package manager interface\n */\nexport interface PackageManager {\n  name: PackageManagerName;\n  command: string;\n  install: string;\n  installEmpty: string;\n  run: string;\n  x: string;\n  saveDev: string;\n  icon: string;\n}\n\n/**\n * List of supported package managers\n */\nconst PACKAGE_MANAGERS: readonly PackageManager[] = [\n  {\n    name: "npm",\n    command: "npm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "npx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:npm",\n  },\n  {\n    name: "pnpm",\n    command: "pnpm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "pnpm dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:pnpm",\n  },\n  {\n    name: "bun",\n    command: "bun ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "bun x ",\n    saveDev: "-d ",\n    icon: "material-icon-theme:bun",\n  },\n  {\n    name: "yarn",\n    command: "yarn ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "yarn dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:yarn",\n  },\n] as const;\n\n/**\n * Composable to access package manager data\n */\nexport function usePm() {\n  return {\n    packageManagers: PACKAGE_MANAGERS,\n  };\n}\n',
      },
    ],
    prose: ["pre", "code-group"],
    file: {
      fileName: "ProsePmRun.global.vue",
      dirPath: "app/components/content/prose/PackageManager",
      fileContent:
        '<template>\n  <MDC :value="md" class="not-first:mt-5" />\n</template>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Whether to render in a stack layout\n       * @default false\n       */\n      inStack?: boolean;\n      /**\n       * Script name to run (e.g., "dev", "build", "test")\n       */\n      script: string;\n      /**\n       * Sync identifier for syncing with other code groups\n       * @default "_pm"\n       */\n      sync?: string;\n      /**\n       * Disable syncing between code groups\n       * @default false\n       */\n      noSync?: boolean;\n    }>(),\n    {\n      inStack: false,\n      sync: "_pm",\n      noSync: false,\n    }\n  );\n\n  const { packageManagers } = usePm();\n\n  const md = computed(() => {\n    const codeBlocks = packageManagers\n      .map((pm) => {\n        const command = `${pm.command}${pm.run}${props.script}`;\n        return `\\`\\`\\`bash icon="${pm.icon}" noFormat hideHeader [${pm.name}]\\n${command}\\n\\`\\`\\``;\n      })\n      .join("\\n\\n");\n\n    const attributes = [props.inStack && "in-stack", !props.noSync && `sync="${props.sync}"`]\n      .filter(Boolean)\n      .join(" ");\n\n    return `::prose-code-group${attributes ? `{${attributes}}` : ""}\\n${codeBlocks}\\n::`;\n  });\n</script>\n',
    },
  },
  {
    name: "PM X",
    value: "pm-x",
    description:
      "A prose component that displays an execute command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmX.global.vue",
    fileName: "ProsePmX.global.vue",
    docsUrl: "/prose/package-manager",
    composables: [
      {
        fileName: "usePm.ts",
        dirPath: "app/composables",
        fileContent:
          '/**\n * Package manager name type\n */\nexport type PackageManagerName = "npm" | "pnpm" | "bun" | "yarn";\n\n/**\n * Package manager interface\n */\nexport interface PackageManager {\n  name: PackageManagerName;\n  command: string;\n  install: string;\n  installEmpty: string;\n  run: string;\n  x: string;\n  saveDev: string;\n  icon: string;\n}\n\n/**\n * List of supported package managers\n */\nconst PACKAGE_MANAGERS: readonly PackageManager[] = [\n  {\n    name: "npm",\n    command: "npm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "npx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:npm",\n  },\n  {\n    name: "pnpm",\n    command: "pnpm ",\n    install: "i ",\n    installEmpty: "install",\n    run: "run ",\n    x: "pnpm dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:pnpm",\n  },\n  {\n    name: "bun",\n    command: "bun ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "bun x ",\n    saveDev: "-d ",\n    icon: "material-icon-theme:bun",\n  },\n  {\n    name: "yarn",\n    command: "yarn ",\n    install: "add ",\n    installEmpty: "install",\n    run: "run ",\n    x: "yarn dlx ",\n    saveDev: "-D ",\n    icon: "material-icon-theme:yarn",\n  },\n] as const;\n\n/**\n * Composable to access package manager data\n */\nexport function usePm() {\n  return {\n    packageManagers: PACKAGE_MANAGERS,\n  };\n}\n',
      },
    ],
    prose: ["pre", "code-group"],
    file: {
      fileName: "ProsePmX.global.vue",
      dirPath: "app/components/content/prose/PackageManager",
      fileContent:
        '<template>\n  <MDC :value="md" class="not-first:mt-5" />\n</template>\n\n<script setup lang="ts">\n  const props = withDefaults(\n    defineProps<{\n      /**\n       * Whether to render in a stack layout\n       * @default false\n       */\n      inStack?: boolean;\n      /**\n       * Command to execute (e.g., "create-vue@latest", "nuxi init")\n       */\n      command: string;\n      /**\n       * Sync identifier for syncing with other code groups\n       * @default "_pm"\n       */\n      sync?: string;\n      /**\n       * Disable syncing between code groups\n       * @default false\n       */\n      noSync?: boolean;\n    }>(),\n    {\n      inStack: false,\n      sync: "_pm",\n      noSync: false,\n    }\n  );\n\n  const { packageManagers } = usePm();\n\n  const md = computed(() => {\n    const codeBlocks = packageManagers\n      .map((pm) => {\n        const command = `${pm.x}${props.command}`;\n        return `\\`\\`\\`bash icon="${pm.icon}" noFormat hideHeader [${pm.name}]\\n${command}\\n\\`\\`\\``;\n      })\n      .join("\\n\\n");\n\n    const attributes = [\n      props.inStack && "in-stack",\n      !props.noSync && `sync="${props.sync}"`,\n      `noFormat`,\n      "hideHeaderMeta",\n    ]\n      .filter(Boolean)\n      .join(" ");\n\n    return `::prose-code-group${attributes ? `{${attributes}}` : ""}\\n${codeBlocks}\\n::`;\n  });\n</script>\n',
    },
  },
  {
    name: "Pre",
    value: "pre",
    description:
      "A prose component that renders code snippets with syntax highlighting, line numbers, and optional copy-to-clipboard functionality.",
    filePath: "app/components/content/prose/Code/ProsePre.global.vue",
    fileName: "ProsePre.global.vue",
    prose: ["smart-icon", "code-copy", "mermaid"],
    deps: ["@baybreezy/file-extension-icon", "lodash-es"],
    composables: [
      {
        fileName: "useDocPage.ts",
        dirPath: "app/composables",
        fileContent:
          'import { kebabCase } from "lodash-es";\n\nexport const useDocPage = async () => {\n  const route = useRoute();\n  const { data } = await useAsyncData(kebabCase(route.path) + "-page", async () => {\n    const content = await queryCollection("content").path(route.path).first();\n    return { content };\n  });\n  return { contentPage: data.value?.content };\n};\n',
      },
    ],
    modules: ["gtag"],
    file: {
      fileName: "ProsePre.global.vue",
      dirPath: "app/components/content/prose/Code",
      fileContent:
        '<template>\n  <div data-slot="prose-pre-wrapper" :class="styles().wrapper({ class: $attrs?.class as any })">\n    <template v-if="hasFileName">\n      <div data-slot="prose-pre-file-name-wrapper" :class="styles().fileNameWrapper()">\n        <prose-smart-icon v-if="iconFromMeta" :name="iconFromMeta" class="size-4 shrink-0" />\n        <img\n          v-else-if="language || filename"\n          :src="getMaterialFileIcon(language! || filename!)"\n          :alt="language || filename"\n          class="size-4 shrink-0"\n        />\n\n        <p data-slot="prose-pre-file-name" :class="styles().fileName()">{{ fileNameEdited }}</p>\n      </div>\n    </template>\n    <div\n      v-if="!hideCopyButton"\n      class="absolute right-3.5 flex items-center justify-center"\n      :class="[hasFileName ? \'top-[11px]\' : \'top-[12px]\']"\n    >\n      <prose-code-copy :code @code-copied="onCopy" />\n    </div>\n    <ProseMermaid v-if="isMermaid" :code="code" @mermaid-error="onMermaidError">\n      <slot />\n    </ProseMermaid>\n    <pre v-else :class="[$attrs?.class, \'shadow-xs ring-1 ring-border/60\']"><slot /></pre>\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { getMaterialFileIcon } from "@baybreezy/file-extension-icon";\n  import { startCase } from "lodash-es";\n\n  const { contentPage } = await useDocPage();\n  const route = useRoute();\n\n  const props = defineProps<{\n    /**\n     * The code content to display\n     */\n    code?: string;\n    /**\n     * The programming language of the code block\n     */\n    language?: string;\n    /**\n     * The filename to display in the header (if any)\n     */\n    filename?: string;\n    /**\n     * An array of line numbers to highlight\n     */\n    highlights?: Array<number>;\n    /**\n     * Additional meta information for the code block\n     */\n    meta?: string;\n    /**\n     * Optional icon name to display next to the filename\n     */\n    icon?: string;\n  }>();\n\n  /**\n   * Parse meta string and create a lowercase key map for easy checking\n   * Example: "noFormat hideHeader icon=\'lucide:code\'" => Map { \'noformat\' => true, \'hideheader\' => true, \'icon\' => \'lucide:code\' }\n   */\n  const metaMap = computed(() => {\n    const map = new Map<string, string | boolean>();\n    if (!props.meta) return map;\n\n    // Split by spaces but preserve quoted values\n    const parts = props.meta.match(/(?:[^\\s"\']+|"[^"]*"|\'[^\']*\')+/g) || [];\n\n    parts.forEach((part) => {\n      // Check if it\'s a key=value pair\n      const keyValueMatch = part.match(/^([^=]+)=(.+)$/);\n      if (keyValueMatch) {\n        const key = keyValueMatch[1]!.toLowerCase();\n        // Remove quotes from value if present\n        const value = keyValueMatch[2]!.replace(/^["\']|["\']$/g, "");\n        map.set(key, value);\n      } else {\n        // It\'s just a flag (boolean)\n        map.set(part.toLowerCase(), true);\n      }\n    });\n\n    return map;\n  });\n\n  const hideCopyButton = ref(false);\n  const noFormatMeta = computed(() => metaMap.value.has("noformat"));\n  const hideHeaderMeta = computed(\n    () => metaMap.value.has("hideheader") || metaMap.value.has("noheader")\n  );\n  const hasLinesInMeta = computed(() => metaMap.value.has("lines"));\n  const metaHasMermaid = computed(() => metaMap.value.has("mermaid"));\n\n  const iconFromMeta = computed(() => {\n    // First check if icon is passed as a direct prop\n    if (props.icon) return props.icon;\n    // Then check metaMap for icon key\n    const icon = metaMap.value.get("icon");\n    return typeof icon === "string" ? icon : undefined;\n  });\n\n  const fileNameEdited = computed(() => {\n    if (!props.filename) return;\n    if (noFormatMeta.value) return props.filename;\n\n    let processedName = props.filename;\n\n    // Check if it looks like a filename (ends with .[anything])\n    const hasFileExtension = /\\.[^.]+$/.test(processedName);\n\n    if (hasFileExtension) {\n      // It\'s a filename - remove the extension\n      processedName = processedName.split(".").slice(0, -1).join(".");\n      // if we have something like .env or .gitignore, we might end up with an empty string\n      if (!processedName) {\n        processedName = props.filename;\n      }\n    }\n\n    // Clean up any extra spaces and apply startCase\n    return startCase(processedName.trim());\n  });\n\n  const hasFileName = computed(() => !!props.filename && !hideHeaderMeta.value);\n  const isMermaid = computed(() => props.language === "mermaid" || metaHasMermaid.value);\n\n  const onMermaidError = (errorMessage?: string) => {\n    if (errorMessage) {\n      hideCopyButton.value = true;\n    } else {\n      hideCopyButton.value = false;\n    }\n  };\n\n  const onCopy = () => {\n    // Track copied code event\n    useTrackEvent("copy_code", {\n      code_source: "inline",\n      code_language: props.language,\n      file_name: props.filename,\n      block_path: "N/A",\n      component: props.filename,\n      page_title: contentPage?.title || "unknown",\n      page_path: route.path,\n      page_location: window.location.href,\n    });\n  };\n\n  const styles = tv({\n    slots: {\n      wrapper: [\n        "relative mt-3 rounded-lg border bg-muted/60 p-1.5 dark:bg-muted/10",\n        hasLinesInMeta.value && "show-line-number",\n      ],\n      fileNameWrapper: "not-prose flex items-center gap-2 p-2 pb-4",\n      fileName: "truncate text-sm font-medium text-ellipsis",\n    },\n  });\n</script>\n\n<style>\n  .show-line-number .line::before {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n    width: calc(var(--spacing) * 5);\n    display: inline-block;\n    text-align: center;\n    margin-right: calc(var(--spacing) * 4);\n    color: var(--muted-foreground);\n  }\n\n  .show-line-number .line:not(.diff)::before {\n    content: attr(line);\n  }\n</style>\n',
    },
  },
  {
    name: "ShowCase",
    value: "show-case",
    description:
      "A prose component that shows a Preview of a component along with its code snippets in a tabbed interface.",
    filePath: "app/components/content/ShowCase.global.vue",
    fileName: "ShowCase.global.vue",
    components: ["tabs"],
    file: {
      fileName: "ShowCase.global.vue",
      dirPath: "app/components/content",
      fileContent:
        '<template>\n  <TabsRoot v-model="tab">\n    <TabsList class="relative inline-flex items-center">\n      <UiTabsTrigger aria-label="Preview" :pill="false" value="preview"> Preview </UiTabsTrigger>\n      <UiTabsTrigger aria-label="Code" :pill="false" value="code"> Code </UiTabsTrigger>\n      <UiTabsIndicator class="px-3" />\n    </TabsList>\n    <LayoutGroup>\n      <AnimatePresence mode="wait">\n        <Motion\n          v-if="tab == \'preview\'"\n          layout="position"\n          :initial="false"\n          :animate="{ opacity: 1 }"\n          :exit="{ opacity: 0 }"\n          :transition="{ duration: 0.2 }"\n        >\n          <TabsContent force-mount value="preview">\n            <div\n              class="mt-4 flex min-h-[300px] items-center justify-center rounded-lg border p-3 lg:p-10"\n            >\n              <div class="mx-auto w-full" :class="[!props.prose ? \'not-prose\' : \'\']">\n                <slot />\n              </div>\n            </div>\n          </TabsContent>\n        </Motion>\n        <Motion\n          v-else\n          layout="position"\n          :initial="{ opacity: 0 }"\n          :animate="{ opacity: 1 }"\n          :exit="{ opacity: 0 }"\n          :transition="{ duration: 0.2 }"\n        >\n          <TabsContent force-mount value="code">\n            <slot name="code" mdc-unwrap="p" />\n          </TabsContent>\n        </Motion>\n      </AnimatePresence>\n    </LayoutGroup>\n  </TabsRoot>\n</template>\n\n<script lang="ts" setup>\n  import { TabsContent, TabsList, TabsRoot } from "reka-ui";\n\n  const tab = ref("preview");\n\n  const props = defineProps<{\n    prose?: boolean;\n  }>();\n</script>\n',
    },
  },
  {
    name: "Smart Icon",
    value: "smart-icon",
    description:
      "A prose component that displays icons intelligently based on provided names, enhancing visual appeal and user experience in your content.",
    filePath: "app/components/content/prose/ProseSmartIcon.global.vue",
    fileName: "ProseSmartIcon.global.vue",
    deps: ["@iconify/utils"],
    modules: ["image"],
    file: {
      fileName: "ProseSmartIcon.global.vue",
      dirPath: "app/components/content/prose",
      fileContent:
        '<template>\n  <!-- Iconify Icons -->\n  <Icon v-if="checkIcon(name)" :name :size />\n  <!-- Emojis -->\n  <span\n    v-else-if="\n      /(\\u00a9|\\u00ae|[\\u2000-\\u3300]|\\ud83c[\\ud000-\\udfff]|\\ud83d[\\ud000-\\udfff]|\\ud83e[\\ud000-\\udfff])/g.test(\n        name\n      )\n    "\n    :style="`font-size: ${size}px;`"\n    aria-hidden="true"\n    >{{ name }}</span\n  >\n  <!-- Link -->\n  <NuxtImg\n    v-else\n    :src="name"\n    :style="`width: ${size}px; height: ${size}px;`"\n    :class="[\'not-prose inline\', $attrs.class]"\n  />\n</template>\n\n<script lang="ts">\n  import { stringToIcon, validateIconName } from "@iconify/utils";\n\n  export type SmartIconProps = {\n    /**\n     * This can be on of the following:\n     *\n     * - An [Iconify](https://icon-sets.iconify.design/) icon name, e.g. `mdi:home`\n     * - An emoji, e.g. `😀`\n     * - A link to an image, e.g. `https://example.com/icon.png`\n     */\n    name: string;\n    /**\n     * Size of the icon in pixels (default: 16)\n     * @default 16\n     */\n    size?: number;\n  };\n</script>\n\n<script setup lang="ts">\n  const { size = 16 } = defineProps<SmartIconProps>();\n\n  /**\n   * Check if the provided name is a valid Iconify icon name\n   */\n  function checkIcon(name: string): boolean {\n    if (name.includes("http") || name.startsWith("data:image/")) return false;\n    return validateIconName(stringToIcon(name));\n  }\n</script>\n',
    },
  },
  {
    name: "Step",
    value: "step",
    description:
      "A prose component that displays numbered sequential steps with auto-incrementing counters, perfect for tutorials, installation guides, and multi-step processes.",
    filePath: "app/components/content/prose/Step/Step.global.vue",
    fileName: "Step.global.vue",
    docsUrl: "/prose/steps",
    prose: ["steps"],
    file: {
      fileName: "Step.global.vue",
      dirPath: "app/components/content/prose/Step",
      fileContent:
        '<template>\n  <div :class="styles({ class: normalizeClass(props.class) || undefined })">\n    <slot />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { normalizeClass } from "vue";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /** Additional CSS classes to apply to the step item */\n      class?: HtmlHTMLAttributes["class"];\n    }>(),\n    {}\n  );\n\n  const styles = tv({\n    base: "before:absolute before:-left-4 before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:bg-secondary before:text-sm before:text-secondary-foreground before:content-[counter(step)] before:[counter-increment:step]",\n  });\n</script>\n',
    },
  },
  {
    name: "Steps",
    value: "steps",
    description:
      "A prose component that displays numbered sequential steps with auto-incrementing counters, perfect for tutorials, installation guides, and multi-step processes.",
    filePath: "app/components/content/prose/Step/Steps.global.vue",
    fileName: "Steps.global.vue",
    docsUrl: "/prose/steps",
    prose: ["step"],
    file: {
      fileName: "Steps.global.vue",
      dirPath: "app/components/content/prose/Step",
      fileContent:
        '<template>\n  <div :class="styles({ class: normalizeClass(props.class) || undefined })">\n    <slot />\n  </div>\n</template>\n\n<script lang="ts" setup>\n  import { normalizeClass } from "vue";\n  import type { HtmlHTMLAttributes } from "vue";\n\n  const props = withDefaults(\n    defineProps<{\n      /** Additional CSS classes to apply to the steps container */\n      class?: HtmlHTMLAttributes["class"];\n    }>(),\n    {}\n  );\n\n  const styles = tv({\n    base: "relative ml-4 border-l pl-7 [counter-reset:step]",\n  });\n</script>\n',
    },
  },
  {
    name: "Strong <strong>",
    value: "strong",
    description:
      "A prose component that displays styled strong text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseStrong.global.vue",
    fileName: "ProseStrong.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseStrong.global.vue",
      dirPath: "app/components/content/prose/Typography",
      fileContent:
        '<template>\n  <strong\n    data-slot="prose-strong"\n    :class="proseStrongStyles({ class: normalizeClass(_class) || undefined })"\n  >\n    <slot />\n  </strong>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseStrongProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseStrongStyles = tv({\n    base: "font-semibold text-inherit",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseStrongProps>();\n</script>\n',
    },
  },
  {
    name: "Table",
    value: "table",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTable.global.vue",
    fileName: "ProseTable.global.vue",
    docsUrl: "/prose/typography",
    prose: ["thead", "tbody", "tr", "th", "td"],
    file: {
      fileName: "ProseTable.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <div :class="proseTableStyles({ class: normalizeClass(_class) || undefined })">\n    <table class="relative mt-0 mb-0 w-full overflow-hidden border-none" data-slot="prose-table">\n      <slot />\n    </table>\n  </div>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseTableProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseTableStyles = tv({\n    base: "w-full overflow-y-auto rounded-md border not-last:mb-6",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseTableProps>();\n</script>\n',
    },
  },
  {
    name: "Tabs",
    value: "tabs",
    description:
      "A prose component that displays content in a tabbed interface, perfect for organizing information and improving readability in documentation.",
    filePath: "app/components/content/prose/Tabs/ProseTabs.global.vue",
    fileName: "ProseTabs.global.vue",
    docsUrl: "/prose/tabs",
    prose: ["tabs-inner"],
    composables: [
      {
        fileName: "useDefaultSlotItems.ts",
        dirPath: "app/composables",
        fileContent:
          'import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";\nimport type { Slots, VNode, VNodeArrayChildren } from "vue";\n\ntype SlotMetaContext = {\n  vnode: VNode;\n  index: number;\n  props: Record<string, any>;\n};\n\nexport type SlotItem<TMeta = Record<string, any>> = {\n  vnode: VNode;\n  index: number;\n  key: VNode["key"];\n  props: Record<string, any>;\n  meta: TMeta;\n};\n\nexport type UseDefaultSlotItemsOptions<TMeta> = {\n  slots?: Slots;\n  filter?: (ctx: SlotMetaContext) => boolean;\n  mapMeta?: (ctx: SlotMetaContext) => TMeta;\n};\n\n/**\n * Composable to extract and manage items from the default slot\n */\nexport function useDefaultSlotItems<TMeta = Record<string, any>>(\n  options: UseDefaultSlotItemsOptions<TMeta> = {}\n) {\n  const instance = getCurrentInstance();\n  const slots = options.slots ?? instance?.slots;\n\n  const items = computed<SlotItem<TMeta>[]>(() => {\n    const rawChildren = slots?.default?.() ?? [];\n    const nodes = flattenVNodes(rawChildren);\n\n    return nodes\n      .map((vnode, index) => {\n        const props = (vnode.props ?? {}) as Record<string, any>;\n        const ctx: SlotMetaContext = { vnode, index, props };\n\n        if (options.filter && !options.filter(ctx)) {\n          return undefined;\n        }\n\n        return {\n          vnode,\n          index,\n          key: vnode.key ?? index,\n          props,\n          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),\n        };\n      })\n      .filter(Boolean) as SlotItem<TMeta>[];\n  });\n\n  return {\n    items,\n    first: computed(() => items.value[0]),\n    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),\n  };\n}\n\nfunction flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {\n  children.forEach((child) => {\n    if (!child) return;\n\n    if (Array.isArray(child)) {\n      flattenVNodes(child, acc);\n      return;\n    }\n\n    if (!isVNode(child)) {\n      return;\n    }\n\n    if (child.type === Comment) {\n      return;\n    }\n\n    if (child.type === Fragment && Array.isArray(child.children)) {\n      flattenVNodes(child.children as VNodeArrayChildren, acc);\n      return;\n    }\n\n    acc.push(child);\n  });\n\n  return acc;\n}\n',
      },
    ],
    file: {
      fileName: "ProseTabs.global.vue",
      dirPath: "app/components/content/prose/Tabs",
      fileContent:
        '<template>\n  <render />\n</template>\n\n<script lang="ts">\n  import { ProseTabsInner } from "#components";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseTabsProps = {\n    /**\n     * The variant of the tabs\n     * @default \'separate\'\n     */\n    variant?: "separate" | "card" | "line" | "combobox";\n    /**\n     * Whether to add padding around the tabs\n     * @default true\n     */\n    padded?: boolean;\n    /**\n     * Whether the tabs are in a stack (e.g. accordion)\n     * @default false\n     */\n    inStack?: boolean;\n    /**\n     * Disable the search functionality\n     * @default false\n     */\n    disableSearch?: boolean;\n    /**\n     * Placeholder text for the search input\n     * @default \'Search Tab...\'\n     */\n    searchPlaceholder?: string;\n    /**\n     * Text to display when no tab is found\n     * @default \'No tab found.\'\n     */\n    searchEmpty?: string;\n    /**\n     * Whether the combobox should take the full width of the container\n     * @default false\n     */\n    comboBoxFullWidth?: boolean;\n    /**\n     * A scope to sync the active tab state with other tab groups\n     */\n    sync?: string;\n    /**\n     * Additional classes to add to the wrapper div\n     */\n    class?: HTMLAttributes["class"];\n  };\n</script>\n\n<script setup lang="ts">\n  const {\n    variant = "separate",\n    padded = true,\n    inStack = false,\n    disableSearch = false,\n    searchPlaceholder = "Search Tab...",\n    searchEmpty = "No tab found.",\n    ...rest\n  } = defineProps<ProseTabsProps>();\n\n  const _slots = useSlots();\n  const { items: slotItems } = useDefaultSlotItems({\n    slots: _slots,\n    mapMeta: ({ props, index }) => ({\n      label: props.label ?? props.filename ?? `Tab ${index + 1}`,\n      icon: props?.icon,\n    }),\n  });\n\n  const slotsData = computed(() =>\n    slotItems.value.map(({ index, meta, props }) => ({\n      index,\n      label: meta.label,\n      icon: props.icon || meta.icon,\n    }))\n  );\n\n  /**\n   * Render function to pass slots as props to ProseTabsInner\n   */\n  function render() {\n    return h(\n      ProseTabsInner,\n      {\n        variant,\n        padded,\n        inStack,\n        disableSearch,\n        searchEmpty,\n        searchPlaceholder,\n        slotsData: slotsData.value,\n        ...rest,\n      },\n      () => slotItems.value.map(({ vnode }) => vnode)\n    );\n  }\n</script>\n',
    },
  },
  {
    name: "Tabs Inner",
    value: "tabs-inner",
    description:
      "A prose component that displays content in a tabbed interface, perfect for organizing information and improving readability in documentation.",
    filePath: "app/components/content/prose/Tabs/ProseTabsInner.global.vue",
    fileName: "ProseTabsInner.global.vue",
    docsUrl: "/prose/tabs",
    prose: ["tabs", "smart-icon"],
    components: ["tabs", "card", "scroll-area", "popover", "button", "command"],
    deps: ["@baybreezy/file-extension-icon"],
    composables: [
      {
        fileName: "useDefaultSlotItems.ts",
        dirPath: "app/composables",
        fileContent:
          'import { Comment, computed, Fragment, getCurrentInstance, isVNode } from "vue";\nimport type { Slots, VNode, VNodeArrayChildren } from "vue";\n\ntype SlotMetaContext = {\n  vnode: VNode;\n  index: number;\n  props: Record<string, any>;\n};\n\nexport type SlotItem<TMeta = Record<string, any>> = {\n  vnode: VNode;\n  index: number;\n  key: VNode["key"];\n  props: Record<string, any>;\n  meta: TMeta;\n};\n\nexport type UseDefaultSlotItemsOptions<TMeta> = {\n  slots?: Slots;\n  filter?: (ctx: SlotMetaContext) => boolean;\n  mapMeta?: (ctx: SlotMetaContext) => TMeta;\n};\n\n/**\n * Composable to extract and manage items from the default slot\n */\nexport function useDefaultSlotItems<TMeta = Record<string, any>>(\n  options: UseDefaultSlotItemsOptions<TMeta> = {}\n) {\n  const instance = getCurrentInstance();\n  const slots = options.slots ?? instance?.slots;\n\n  const items = computed<SlotItem<TMeta>[]>(() => {\n    const rawChildren = slots?.default?.() ?? [];\n    const nodes = flattenVNodes(rawChildren);\n\n    return nodes\n      .map((vnode, index) => {\n        const props = (vnode.props ?? {}) as Record<string, any>;\n        const ctx: SlotMetaContext = { vnode, index, props };\n\n        if (options.filter && !options.filter(ctx)) {\n          return undefined;\n        }\n\n        return {\n          vnode,\n          index,\n          key: vnode.key ?? index,\n          props,\n          meta: options.mapMeta ? options.mapMeta(ctx) : (props as TMeta),\n        };\n      })\n      .filter(Boolean) as SlotItem<TMeta>[];\n  });\n\n  return {\n    items,\n    first: computed(() => items.value[0]),\n    find: (predicate: (item: SlotItem<TMeta>) => boolean) => items.value.find(predicate),\n  };\n}\n\nfunction flattenVNodes(children: VNodeArrayChildren, acc: VNode[] = []): VNode[] {\n  children.forEach((child) => {\n    if (!child) return;\n\n    if (Array.isArray(child)) {\n      flattenVNodes(child, acc);\n      return;\n    }\n\n    if (!isVNode(child)) {\n      return;\n    }\n\n    if (child.type === Comment) {\n      return;\n    }\n\n    if (child.type === Fragment && Array.isArray(child.children)) {\n      flattenVNodes(child.children as VNodeArrayChildren, acc);\n      return;\n    }\n\n    acc.push(child);\n  });\n\n  return acc;\n}\n',
      },
    ],
    file: {
      fileName: "ProseTabsInner.global.vue",
      dirPath: "app/components/content/prose/Tabs",
      fileContent:
        '<template>\n  <UiTabs v-if="variant === \'separate\'" v-model="activeTabIndex" class="not-first:mt-5">\n    <UiTabsList>\n      <UiTabsTrigger\n        v-for="(slot, i) in defaultSlots"\n        :key="slot.key"\n        :value="i"\n        class="items-center gap-2"\n      >\n        <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="self-center" />\n        {{ label(slot) }}\n      </UiTabsTrigger>\n    </UiTabsList>\n\n    <div\n      v-for="(slot, i) in defaultSlots"\n      v-show="activeTabIndex === i"\n      :key="slot.key"\n      class="mt-2"\n    >\n      <component :is="slot.vnode" class="[&>*:first-child]:mt-0" />\n    </div>\n  </UiTabs>\n\n  <UiTabs\n    v-else-if="variant === \'line\'"\n    v-model="activeTabIndex"\n    class="relative mr-auto w-full not-first:mt-5"\n  >\n    <div class="flex items-center justify-between overflow-x-auto pb-3">\n      <UiTabsList :pill="false" class="relative h-9 w-full justify-start rounded-none border-b p-0">\n        <UiTabsTrigger\n          v-for="(slot, i) in defaultSlots"\n          :key="slot.key"\n          class="gap-2"\n          :pill="false"\n          :value="i"\n        >\n          <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="self-center" />\n          {{ label(slot) }}\n        </UiTabsTrigger>\n        <UiTabsIndicator />\n      </UiTabsList>\n    </div>\n\n    <div\n      v-for="(slot, i) in defaultSlots"\n      v-show="activeTabIndex === i"\n      :key="slot.key"\n      class="relative space-y-10"\n    >\n      <component :is="slot.vnode" class="mt-0 [&>*:first-child]:mt-0" />\n    </div>\n  </UiTabs>\n\n  <UiCard\n    v-else-if="variant === \'card\'"\n    class="gap-0 rounded-lg py-0 not-first:mt-5"\n    :class="[inStack && \'mb-0 rounded-none border-none shadow-none\']"\n  >\n    <TabsRoot v-model="activeTabIndex">\n      <UiScrollArea orientation="horizontal" class="**:data-[slot=\'scroll-area-scrollbar\']:h-1.5">\n        <TabsList class="relative flex w-full p-1">\n          <TabsTrigger\n            v-for="(slot, i) in defaultSlots"\n            :key="slot.key"\n            :value="i"\n            class="relative z-20 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-75 hover:text-foreground focus-visible:outline-none data-active:text-foreground"\n          >\n            <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="shrink-0" />\n            <span class="truncate">{{ label(slot) }}</span>\n          </TabsTrigger>\n          <UiTabsIndicator class="inset-0 size-full px-0 py-1 [&>div]:bg-muted" />\n        </TabsList>\n      </UiScrollArea>\n\n      <div\n        v-for="(slot, i) in defaultSlots"\n        v-show="activeTabIndex === i"\n        :key="slot.key"\n        :value="label(slot)"\n        class="mt-0"\n        :class="[\n          padded && ($slots.default?.()[activeTabIndex]?.type as any).tag !== \'pre\' && \'p-3\',\n        ]"\n      >\n        <component\n          :is="slot.vnode"\n          :in-group="true"\n          class="mt-0 border-none [&>*:first-child]:mt-0"\n        />\n      </div>\n    </TabsRoot>\n  </UiCard>\n\n  <div v-else-if="variant === \'combobox\'">\n    <UiPopover v-model:open="dropDownOpen">\n      <UiPopoverTrigger as-child>\n        <UiButton\n          variant="outline"\n          role="combobox"\n          :aria-expanded="dropDownOpen"\n          class="justify-between"\n          :class="[comboBoxFullWidth ? \'w-full\' : \'w-[250px]\']"\n        >\n          <div class="flex items-center gap-2">\n            <ProseSmartIcon\n              v-if="icon(defaultSlots?.[activeTabIndex])"\n              :name="icon(defaultSlots?.[activeTabIndex])!"\n              :size="14"\n            />\n            <span>\n              {{ label(defaultSlots?.[activeTabIndex]) }}\n            </span>\n          </div>\n          <Icon class="text-muted-foreground" name="lucide:chevrons-up-down" />\n        </UiButton>\n      </UiPopoverTrigger>\n      <UiPopoverContent class="w-(--reka-popover-trigger-width) p-0">\n        <UiCommand>\n          <UiCommandInput v-if="!disableSearch" class="h-9" :placeholder="searchPlaceholder" />\n          <UiCommandEmpty>{{ searchEmpty }}</UiCommandEmpty>\n          <UiCommandList>\n            <UiCommandGroup>\n              <UiCommandItem\n                v-for="(slot, i) in defaultSlots"\n                :key="slot.key"\n                :value="label(slot)"\n                @select="\n                  () => {\n                    activeTabIndex = i;\n                    dropDownOpen = false;\n                  }\n                "\n              >\n                <ProseSmartIcon\n                  v-if="icon(slot)"\n                  :name="icon(slot)!"\n                  :size="14"\n                  class="mr-2 self-center"\n                />\n                {{ label(slot) }}\n                <Icon\n                  name="lucide:check"\n                  :class="[\'ml-auto h-4 w-4\', activeTabIndex === i ? \'opacity-100\' : \'opacity-0\']"\n                />\n              </UiCommandItem>\n            </UiCommandGroup>\n          </UiCommandList>\n        </UiCommand>\n      </UiPopoverContent>\n    </UiPopover>\n\n    <div\n      v-for="(slot, i) in defaultSlots"\n      v-show="activeTabIndex === i"\n      :key="slot.key"\n      :value="label(slot)"\n      class="mt-4"\n    >\n      <component :is="slot.vnode" :in-group="true" class="[&>*:first-child]:mt-0" />\n    </div>\n  </div>\n</template>\n<script lang="ts">\n  import { getMaterialFileIcon } from "@baybreezy/file-extension-icon";\n  import type { ProseTabsProps } from "./ProseTabs.global.vue";\n\n  export type ProseTabsInnerSlotData = {\n    label: string;\n    index: number;\n  };\n\n  export type ProseTabsInnerProps = ProseTabsProps & {\n    /**\n     * Data to be used for rendering tabs\n     */\n    slotsData: ProseTabsInnerSlotData[];\n  };\n</script>\n\n<script setup lang="ts">\n  const { sync } = defineProps<ProseTabsInnerProps>();\n\n  const syncState = useCookie<{ scope: string; value?: string }[]>("tabs-sync-state", {\n    default: () => [],\n  });\n\n  const syncScopeIndex = computed(() => syncState.value.findIndex((x) => x.scope === sync));\n\n  const activeTabIndexData = ref(0);\n\n  const { items: slotItems } = useDefaultSlotItems({\n    mapMeta: ({ props, index }) => {\n      const filename = props.filename as string | undefined;\n      const language = props.language as string | undefined;\n      const meta = props.meta as string | undefined;\n\n      const normalizedLabel = props.label ?? filename ?? `Tab ${index + 1}`;\n\n      // Extract icon from multiple sources:\n      // 1. Direct icon prop\n      // 2. Icon in meta string (e.g., icon="lucide:terminal")\n      // 3. Language-based icon\n      let normalizedIcon = props.icon as string | undefined;\n\n      if (!normalizedIcon && meta) {\n        const iconMatch = meta.match(/icon="?([a-zA-Z0-9-_:]+)"?/);\n        normalizedIcon = iconMatch ? iconMatch[1] : undefined;\n      }\n\n      if (!normalizedIcon && language) {\n        normalizedIcon = getMaterialFileIcon(language);\n      }\n\n      return {\n        label: normalizedLabel,\n        icon: normalizedIcon,\n      };\n    },\n  });\n\n  const tabItems = computed(() =>\n    slotItems.value.map((item) => ({\n      key: item.key ?? `${item.index}${item.meta.label}`,\n      index: item.index,\n      vnode: item.vnode,\n      props: item.props,\n      label: item.meta.label,\n      icon: item.meta.icon,\n    }))\n  );\n\n  const activeTabIndex = computed<number>({\n    get: () => {\n      if (sync === undefined || syncScopeIndex.value === -1) return activeTabIndexData.value;\n\n      return (\n        tabItems.value.find((item) => item.label === syncState.value[syncScopeIndex.value]?.value)\n          ?.index ?? activeTabIndexData.value\n      );\n    },\n    set(index: number) {\n      if (sync === undefined) {\n        activeTabIndexData.value = index;\n        return;\n      }\n\n      let scopeIndex = syncScopeIndex.value;\n\n      if (scopeIndex === -1) {\n        syncState.value.push({ scope: sync, value: undefined });\n        scopeIndex = syncState.value.length - 1;\n      }\n\n      const label = tabItems.value[index]?.label;\n      if (syncState.value[scopeIndex] !== undefined) {\n        syncState.value[scopeIndex]!.value = label;\n      }\n      activeTabIndexData.value = index;\n    },\n  });\n\n  const defaultSlots = computed(() => tabItems.value);\n  function icon(slot?: (typeof tabItems.value)[number]) {\n    return slot?.icon;\n  }\n  function label(slot?: (typeof tabItems.value)[number]) {\n    return slot?.label ?? "";\n  }\n\n  const dropDownOpen = ref(false);\n</script>\n',
    },
  },
  {
    name: "Table Body",
    value: "tbody",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTbody.global.vue",
    fileName: "ProseTbody.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseTbody.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <tbody data-slot="prose-tbody">\n    <slot />\n  </tbody>\n</template>\n',
    },
  },
  {
    name: "Table Data",
    value: "td",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTd.global.vue",
    fileName: "ProseTd.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseTd.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <td data-slot="prose-td" :class="proseTdStyles({ class: normalizeClass(_class) || undefined })">\n    <slot />\n  </td>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseTdProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseTdStyles = tv({\n    base: "px-4 py-2 text-left text-pretty [[align=center]]:text-center [[align=right]]:text-right",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseTdProps>();\n</script>\n',
    },
  },
  {
    name: "Table Data",
    value: "td",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTd.global.vue",
    fileName: "ProseTd.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseTd.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <td data-slot="prose-td" :class="proseTdStyles({ class: normalizeClass(_class) || undefined })">\n    <slot />\n  </td>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseTdProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseTdStyles = tv({\n    base: "px-4 py-2 text-left text-pretty [[align=center]]:text-center [[align=right]]:text-right",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseTdProps>();\n</script>\n',
    },
  },
  {
    name: "Table Header",
    value: "th",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTh.global.vue",
    fileName: "ProseTh.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseTh.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <th data-slot="prose-th" :class="proseThStyles({ class: normalizeClass(_class) || undefined })">\n    <slot />\n  </th>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseThProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseThStyles = tv({\n    base: "px-4 py-2 text-left font-bold text-pretty [[align=center]]:text-center [[align=right]]:text-right",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseThProps>();\n</script>\n',
    },
  },
  {
    name: "Table Head",
    value: "thead",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseThead.global.vue",
    fileName: "ProseThead.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseThead.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <thead data-slot="prose-thead">\n    <slot />\n  </thead>\n</template>\n',
    },
  },
  {
    name: "Table Row",
    value: "tr",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTr.global.vue",
    fileName: "ProseTr.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
    file: {
      fileName: "ProseTr.global.vue",
      dirPath: "app/components/content/prose/Typography/Table",
      fileContent:
        '<template>\n  <tr data-slot="prose-tr" :class="proseTrStyles({ class: normalizeClass(_class) || undefined })">\n    <slot />\n  </tr>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseTrProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseTrStyles = tv({\n    base: "m-0 p-0 even:bg-muted/70 dark:even:bg-muted/50 [&:not(:has(th)):hover]:bg-muted dark:[&:not(:has(th)):hover]:bg-muted/50",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseTrProps>();\n</script>\n',
    },
  },
  {
    name: "Unordered List",
    value: "ul",
    description:
      "A prose component that displays styled unordered list elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseUl.global.vue",
    fileName: "ProseUl.global.vue",
    docsUrl: "/prose/typography",
    file: {
      fileName: "ProseUl.global.vue",
      dirPath: "app/components/content/prose/Typography/Lists",
      fileContent:
        '<template>\n  <ul data-slot="prose-ul" :class="proseUlStyles({ class: normalizeClass(_class) || undefined })">\n    <slot mdc-unwrap="p" />\n  </ul>\n</template>\n\n<script lang="ts">\n  import { normalizeClass } from "vue";\n  import type { HTMLAttributes } from "vue";\n\n  export type ProseUlProps = {\n    /**\n     * Additional classes for the parent element\n     */\n    class?: HTMLAttributes["class"];\n  };\n\n  export const proseUlStyles = tv({\n    base: "ml-4 list-disc not-first:mt-6 not-last:mb-6 [&>li:not(:first-child)]:mt-2",\n  });\n</script>\n\n<script setup lang="ts">\n  const { class: _class } = defineProps<ProseUlProps>();\n</script>\n',
    },
  },
];
