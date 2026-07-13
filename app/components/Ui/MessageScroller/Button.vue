<template>
  <UiButton
    data-slot="message-scroller-button"
    :data-direction="direction"
    :data-active="active ? 'true' : 'false'"
    :variant="variant"
    :size="size"
    :inert="!active"
    :tabindex="active ? undefined : -1"
    :class="messageScrollerButtonStyles({ class: normalizeClass(props.class) || undefined })"
    @click="onClick"
  >
    <slot>
      <Icon name="lucide:arrow-down" />
      <span class="sr-only">{{ direction === "end" ? "Scroll to end" : "Scroll to start" }}</span>
    </slot>
  </UiButton>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { buttonStyles } from "~/components/Ui/Button.vue";

  export const messageScrollerButtonStyles = tv({
    base: "border-border bg-background text-foreground hover:bg-muted hover:text-foreground absolute inset-s-1/2 -translate-x-1/2 transition-[translate,scale,opacity] duration-200 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
  });

  export type MessageScrollerButtonProps = {
    /**
     * Direction the button scrolls toward.
     *
     * @default "end"
     */
    direction?: MessageScrollerButtonDirection;
    /**
     * Scroll behavior for the jump.
     *
     * @default "smooth"
     */
    behavior?: ScrollBehavior;
    /**
     * The button variant.
     *
     * @default "secondary"
     */
    variant?: VariantProps<typeof buttonStyles>["variant"];
    /**
     * The button size.
     *
     * @default "icon-sm"
     */
    size?: VariantProps<typeof buttonStyles>["size"];
    /** Additional classes to apply to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<MessageScrollerButtonProps>(), {
    direction: "end",
    behavior: "smooth",
    variant: "secondary",
    size: "icon-sm",
  });

  const { scrollToEnd, scrollToStart } = useMessageScroller();
  const scrollable = useMessageScrollerScrollable();

  const active = computed(() =>
    props.direction === "start" ? scrollable.value.start : scrollable.value.end
  );

  function onClick(event: MouseEvent) {
    if (!active.value) return;
    const target = event.currentTarget as HTMLElement | null;
    target?.blur();
    if (event.defaultPrevented) return;
    if (props.direction === "start") scrollToStart({ behavior: props.behavior });
    else scrollToEnd({ behavior: props.behavior });
  }
</script>
