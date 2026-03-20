<template>
  <component
    :is="componentType"
    v-bind="linkProps"
    data-slot="prose-callout"
    :class="
      calloutStyles().base({ variant, filled, class: normalizeClass(props.class) || undefined })
    "
  >
    <div v-if="hasIcon" :class="calloutStyles().iconWrapper({ variant, filled })">
      <slot name="icon">
        <Icon
          v-if="computedIcon"
          :name="computedIcon"
          :class="
            calloutStyles().icon({ variant, filled, class: [iconClass, !hasTitle && 'mt-[3px]'] })
          "
        />
      </slot>
    </div>

    <div :class="calloutStyles().content()">
      <div
        v-if="hasTitle"
        :class="
          calloutStyles().title({ variant, filled, class: normalizeClass(titleClass) || undefined })
        "
      >
        <slot name="title">{{ title }}</slot>
      </div>

      <div
        v-if="hasDescription || $slots.default"
        :class="
          calloutStyles().description({
            variant,
            filled,
            class: normalizeClass(descriptionClass) || undefined,
          })
        "
      >
        <slot mdc-unwrap="p">{{ description }}</slot>
      </div>
    </div>

    <Icon
      v-if="url"
      :name="target === '_blank' ? 'lucide:external-link' : 'lucide:arrow-up-right'"
      :class="calloutStyles().linkIcon({ variant, filled })"
    />
  </component>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export type CalloutProps = {
    /**
     * The title of the callout
     */
    title?: string;
    /**
     * The description/content of the callout
     */
    description?: string;
    /**
     * The icon to display
     */
    icon?: string;
    /**
     * The variant style of the callout
     */
    variant?: VariantProps<typeof calloutStyles>["variant"];
    /**
     * Whether to use filled style
     */
    filled?: boolean;
    /**
     * Optional URL to make the callout clickable
     */
    url?: string;
    /**
     * Link target (_blank for external links)
     */
    target?: "_blank" | "_self" | "_parent" | "_top";
    /**
     * Additional class for the wrapper
     */
    class?: HTMLAttributes["class"];
    /**
     * Additional class for the title
     */
    titleClass?: HTMLAttributes["class"];
    /**
     * Additional class for the description
     */
    descriptionClass?: HTMLAttributes["class"];
    /**
     * Additional class for the icon
     */
    iconClass?: HTMLAttributes["class"];
  };

  export const calloutStyles = tv({
    slots: {
      base: "group relative flex items-start gap-3 rounded-lg border p-4 no-underline transition-colors not-first:mt-6 not-last:mb-6 [&_code]:bg-inherit! [&_code]:text-inherit! [&_li]:marker:text-inherit! [&_ol]:my-2! [&_ul]:my-2!",
      iconWrapper: "flex items-center justify-center",
      icon: "size-4 shrink-0",
      content: "flex flex-1 flex-col gap-1",
      title: "text-sm leading-none font-semibold",
      description: "text-sm leading-relaxed *:my-0",
      linkIcon:
        "size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-inherit group-hover:opacity-100",
    },
    variants: {
      variant: {
        default: {
          base: "border-border bg-muted/50 text-foreground dark:bg-transparent",
          icon: "text-foreground",
          title: "text-foreground",
        },
        info: {
          base: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
          icon: "text-blue-600 dark:text-blue-400",
          title: "text-blue-900 dark:text-blue-100",
          description: "text-blue-800 dark:text-blue-200",
        },
        success: {
          base: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
          icon: "text-emerald-600 dark:text-emerald-400",
          title: "text-emerald-900 dark:text-emerald-100",
          description: "text-emerald-800 dark:text-emerald-200",
        },
        warning: {
          base: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
          icon: "text-yellow-600 dark:text-yellow-400",
          title: "text-yellow-900 dark:text-yellow-100",
          description: "text-yellow-800 dark:text-yellow-200",
        },
        error: {
          base: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
          icon: "text-red-600 dark:text-red-400",
          title: "text-red-900 dark:text-red-100",
          description: "text-red-800 dark:text-red-200",
        },
        tip: {
          base: "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100",
          icon: "text-purple-600 dark:text-purple-400",
          title: "text-purple-900 dark:text-purple-100",
          description: "text-purple-800 dark:text-purple-200",
        },
        note: {
          base: "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
          icon: "text-gray-600 dark:text-gray-400",
          title: "text-gray-900 dark:text-gray-100",
          description: "text-gray-800 dark:text-gray-200",
        },
        example: {
          base: "border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100",
          icon: "text-teal-600 dark:text-teal-400",
          title: "text-teal-900 dark:text-teal-100",
          description: "text-teal-800 dark:text-teal-200",
        },
      },
      filled: {
        true: {},
      },
    },
    compoundVariants: [
      {
        filled: true,
        class: {
          title: "text-white dark:text-white",
          icon: "text-white dark:text-white",
        },
      },
      {
        variant: "info",
        filled: true,
        class: {
          base: "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500",
          description: "text-blue-50",
        },
      },
      {
        variant: "success",
        filled: true,
        class: {
          base: "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500",
          description: "text-emerald-50",
        },
      },
      {
        variant: "warning",
        filled: true,
        class: {
          base: "border-yellow-600 bg-yellow-600 text-white dark:border-yellow-500 dark:bg-yellow-500",
          description: "text-yellow-50",
        },
      },
      {
        variant: "error",
        filled: true,
        class: {
          base: "border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-500",
          description: "text-red-50",
        },
      },
      {
        variant: "tip",
        filled: true,
        class: {
          base: "border-purple-600 bg-purple-600 text-white dark:border-purple-500 dark:bg-purple-500",

          description: "text-purple-50",
        },
      },
      {
        variant: "note",
        filled: true,
        class: {
          base: "border-gray-600 bg-gray-600 text-white dark:border-gray-500 dark:bg-gray-500",

          description: "text-gray-50",
        },
      },
      {
        variant: "example",
        filled: true,
        class: {
          base: "border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500",
          description: "text-teal-50",
        },
      },
    ],
    defaultVariants: {
      variant: "default",
      filled: false,
    },
  });

  const VARIANT_ICONS: Record<string, string> = {
    info: "lucide:info",
    success: "lucide:circle-check",
    warning: "lucide:triangle-alert",
    error: "lucide:circle-x",
    tip: "lucide:lightbulb",
    note: "lucide:sticky-note",
    example: "lucide:code-2",
    default: "lucide:info",
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<CalloutProps>(), {
    variant: "default",
    filled: false,
    target: "_self",
    noPrefetch: false,
  });

  defineSlots<{
    default?: () => any;
    title?: () => any;
    icon?: () => any;
  }>();

  const slots = useSlots();

  const componentType = computed(() => (props.url ? resolveComponent("NuxtLink") : "div"));

  const linkProps = computed(() => {
    if (!props.url) return {};
    return {
      to: props.url,
      target: props.target,
      rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
      class: "cursor-pointer hover:shadow-md underline-none duration-300 !transition-all",
    };
  });

  const hasIcon = computed(() => props.icon || slots.icon || props.variant);
  const hasTitle = computed(() => props.title || slots.title);
  const hasDescription = computed(() => props.description || slots.default);

  const computedIcon = computed(() => {
    if (props.icon) return props.icon;
    return VARIANT_ICONS[props.variant || "default"] || VARIANT_ICONS.default;
  });
</script>
