<template>
  <Primitive
    v-bind="forwarded"
    role="group"
    data-slot="input-group-addon"
    :data-align="align || undefined"
    :class="inputGroupAddonVariants({ class: normalizeClass(props.class) || undefined, align })"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import type { VariantProps } from "tailwind-variants";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const inputGroupAddonVariants = tv({
    base: "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",

    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end":
          "order-last w-full flex-wrap justify-start gap-y-2 px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  });

  export type InputGroupAddonVariants = PrimitiveProps & {
    /**
     * Alignment of the addon within the input group.
     * @default "inline-start"
     */
    align?: VariantProps<typeof inputGroupAddonVariants>["align"];
    /**
     * Additional classes to apply to the input group addon container.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<InputGroupAddonVariants>(), {
    align: "inline-start",
  });

  const forwarded = reactiveOmit(props, ["align", "class"]);

  const onClick = (e: any) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    // Focus the associated input, textarea, or textbox when the addon is clicked.
    e.currentTarget?.parentElement?.querySelector("input, textarea, [role='textbox']")?.focus();
  };
</script>
