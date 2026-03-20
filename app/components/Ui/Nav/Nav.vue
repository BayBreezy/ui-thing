<template>
  <div v-if="injectedValues.isMobile.value">
    <span class="sr-only" aria-hidden :data-navbar="intent" :data-navbar-sticky="isSticky" />
    <UiSheet
      :open="injectedValues.open.value"
      @update:open="(value) => (injectedValues.open.value = value)"
    >
      <UiSheetContent :side="side" aria-label="Mobile Navbar" class="p-4">
        <VisuallyHidden>
          <DialogTitle>Mobile Navbar</DialogTitle>
          <DialogDescription>Navigation menu for mobile devices</DialogDescription>
        </VisuallyHidden>
        <slot />
      </UiSheetContent>
    </UiSheet>
  </div>
  <div
    v-else
    ref="navRef"
    :data-navbar="intent"
    :data-navbar-sticky="isSticky"
    :class="
      styles().wrapper({ intent, isSticky, class: normalizeClass(wrapperClass) || undefined })
    "
  >
    <div
      data-navbar="child"
      :class="styles().child({ intent, class: normalizeClass(childClass) || undefined })"
    >
      <div
        data-navbar="content"
        :class="styles().content({ intent, class: normalizeClass(innerClass) || undefined })"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { navProviderKey } from "./Provider.vue";

  export type NavbarProps = {
    /** Custom class(es) to add to the wrapper element */
    wrapperClass?: HTMLAttributes["class"];
    /** Custom class(es) to add to the child element */
    childClass?: HTMLAttributes["class"];
    /** Custom class(es) to add to the inner element */
    innerClass?: HTMLAttributes["class"];
    intent?: "default" | "float" | "inset";
    isSticky?: boolean;
    side?: "left" | "right";
  };
</script>

<script lang="ts" setup>
  const injectedValues = inject(navProviderKey);

  if (!injectedValues) {
    throw createError({
      statusCode: 500,
      message: "Nav context not found. Make sure to wrap your component with <NavProvider>.",
    });
  }

  const navRef = useTemplateRef("navRef");

  defineExpose({ navRef });

  withDefaults(defineProps<NavbarProps>(), {
    intent: "default",
    side: "left",
  });

  const styles = tv({
    slots: {
      wrapper: "group/navbar-intent relative isolate",
      child: "relative isolate hidden md:block",
      content: "mx-auto w-full max-w-(--breakpoint-2xl) items-center py-2.5 md:flex",
    },
    variants: {
      intent: {
        default: { child: "border-b bg-background px-6" },
        float: {
          wrapper: "md:px-22 md:pt-10",
          child:
            "*:data-[navbar=content]:max-w-7xl *:data-[navbar=content]:rounded-xl *:data-[navbar=content]:border *:data-[navbar=content]:bg-background *:data-[navbar=content]:px-4 *:data-[navbar=content]:shadow-xs",
        },
        inset: { child: "px-6" },
      },
      isSticky: {
        true: {
          wrapper: "sticky top-0 z-40",
        },
      },
    },
    defaultVariants: {
      intent: "default",
      isSticky: false,
    },
  });
</script>
