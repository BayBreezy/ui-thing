<template>
  <div :class="styles.root({ class: normalizeClass([props.class]) || undefined, open })">
    <slot />
    <div :class="styles.footer({ open })">
      <button
        :class="styles.trigger({ open })"
        variant="outline"
        :aria-expanded="open"
        :aria-label="`${open ? 'Collapse' : 'Expand'} ${props.name}`"
        :data-state="open ? 'open' : 'closed'"
        @click="open = !open"
      >
        <ProseSmartIcon
          v-if="props.icon"
          :name="props.icon"
          :class="styles.triggerIcon()"
          aria-hidden="true"
        />
        <span>{{ open ? props.closeText : props.openText }} {{ props.name }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export interface ProseCodeCollapseProps {
    /**
     * The icon displayed to toggle the code collapse state
     * @default "lucide:chevron-down"
     * @example "lucide:code" | "heroicons:chevron-down"
     */
    icon?: string;
    /**
     * The name/label displayed in the trigger button
     * @default "Code"
     * @example "Implementation" | "Full Code" | "Example"
     */
    name?: string;
    /**
     * The text displayed when the code is collapsed (clickable to expand)
     * @default "Expand"
     * @example "Show" | "View" | "Display"
     */
    openText?: string;
    /**
     * The text displayed when the code is expanded (clickable to collapse)
     * @default "Collapse"
     * @example "Hide" | "Minimize" | "Close"
     */
    closeText?: string;
    /**
     * Additional CSS classes for the root container
     */
    class?: HTMLAttributes["class"];
  }

  /**
   * Tailwind variant styles for the code collapse component
   * Uses slots pattern for multi-part component styling with open/closed states
   */
  export const proseCodeCollapseStyles = tv({
    slots: {
      root: "relative [&_pre]:h-[200px]",
      footer: "absolute inset-x-px bottom-px flex h-20 items-center justify-center rounded-b-md",
      trigger:
        "group flex items-center gap-2 rounded-md bg-accent py-1.5 ps-1.5 pe-3 text-sm font-medium transition-all duration-200 hover:scale-103 hover:bg-accent hover:text-foreground",
      triggerIcon: "text-muted-foreground transition-transform group-data-[state=open]:rotate-180",
    },
    variants: {
      open: {
        true: {
          root: "[&_pre]:h-auto [&_pre]:max-h-[80vh] [&_pre]:min-h-[200px] [&_pre]:pb-12",
          trigger: "bg-accent ring-1 ring-muted dark:ring-border",
        },
        false: {
          root: "[&_pre]:overflow-hidden",
          footer: "bg-linear-to-t from-code",
        },
      },
    },
  });
</script>

<script lang="ts" setup>
  /**
   * ProseCodeCollapse - Collapsible code block wrapper
   *
   * Wraps code blocks and provides a toggle button to show/hide content.
   * Useful for long code examples that would take up too much vertical space.
   * Initial height is limited to 200px with a gradient fade effect.
   *
   * @example
   * ```vue
   * <ProseCodeCollapse
   *   name="Full Implementation"
   *   icon="lucide:code"
   *   open-text="Show"
   *   close-text="Hide"
   * >
   *   <ProsePre language="typescript" code="..." />
   * </ProseCodeCollapse>
   * ```
   */

  const props = withDefaults(defineProps<ProseCodeCollapseProps>(), {
    icon: "lucide:chevron-down",
    name: "Code",
    openText: "Expand",
    closeText: "Collapse",
  });

  /**
   * Toggle state for the collapse/expand functionality
   * @default false - Starts collapsed
   */
  const open = defineModel<boolean>({ default: false });

  /**
   * Computed styles to avoid recalculating on each render
   */
  const styles = computed(() => proseCodeCollapseStyles());
</script>
