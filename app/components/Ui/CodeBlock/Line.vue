<template>
  <span
    data-slot="code-block-line"
    :data-variant="variant"
    :class="
      codeBlockLineStyles({
        variant,
        marker: props.marker,
        class: normalizeClass(props.class) || undefined,
      })
    "
    ><span data-slot="code-block-line-content" class="min-w-0"
      ><template v-if="isEmpty()">{{ "\n" }}</template
      ><slot v-else /></span
  ></span>
</template>

<script lang="ts">
  import { Comment, Fragment, Text, normalizeClass, useSlots } from "vue";
  import type { HTMLAttributes, VNode } from "vue";

  export type CodeBlockLineVariant = "default" | "added" | "removed" | "highlighted";

  export const codeBlockLineStyles = tv({
    base: "before:text-muted-foreground after:text-muted-foreground relative -mx-3 block min-h-lh px-3 group-data-[size=sm]/code-block:-mx-2.5 group-data-[size=sm]/code-block:px-2.5 before:min-w-6 before:text-end after:absolute after:start-1 after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
    variants: {
      variant: {
        default: "",
        added:
          "bg-emerald-500/10 after:text-emerald-600 after:content-['+'] dark:after:text-emerald-400",
        removed: "bg-destructive/10 after:text-destructive after:content-['−']",
        highlighted: "bg-muted",
      },
      // `false` hides the +/− gutter marker, for lines whose text already starts with + or -
      marker: {
        true: "",
        false: "after:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      marker: true,
    },
  });

  export type CodeBlockLineProps = {
    /** Marks the line as added, removed or highlighted. */
    variant?: CodeBlockLineVariant;
    /**
     * Show the + / − gutter marker on added and removed lines. Turn it off when the text already
     * starts with + or -.
     */
    marker?: boolean;
    /** Custom class(es) to add to the line. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockLineProps>(), {
    variant: "default",
    marker: true,
  });

  const slots = useSlots();

  function hasContent(nodes: VNode[]): boolean {
    return nodes.some((node) => {
      if (node.type === Comment) return false;
      if (node.type === Text) return node.children !== "";
      if (node.type === Fragment) {
        return Array.isArray(node.children) && hasContent(node.children as VNode[]);
      }
      return true;
    });
  }

  // An empty line holds a newline so copying a selection keeps blank lines.
  function isEmpty() {
    return !hasContent(slots.default?.() ?? []);
  }
</script>
