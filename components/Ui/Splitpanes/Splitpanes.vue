<template>
  <Splitpanes v-bind="forwarded" :class="styles({ class: props.class, horizontal })">
    <slot />
  </Splitpanes>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "radix-vue";
  import { Splitpanes } from "splitpanes";

  import "splitpanes/dist/splitpanes.css";

  const props = withDefaults(
    defineProps<{
      horizontal?: boolean;
      pushOtherPanes?: boolean;
      dblClickSplitter?: boolean;
      rtl?: boolean;
      firstSplitter?: boolean;
      class?: any;
      withHandle?: boolean;
    }>(),
    {
      horizontal: false,
      pushOtherPanes: true,
      dblClickSplitter: true,
      rtl: false,
      firstSplitter: false,
      withHandle: false,
    }
  );

  const emits = defineEmits([
    "ready",
    "resize",
    "resized",
    "pane-click",
    "pane-maximize",
    "pane-add",
    "pane-remove",
    "splitter-click",
  ]);

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "withHandle"), emits);

  const styles = tv({
    base: "flex h-full w-full",
    variants: {
      horizontal: {
        true: "flex-row",
        false: "flex-col",
      },
    },
  });

  onMounted(() => {
    if (props.withHandle) {
      const splitpanesVertical = document.querySelectorAll(
        ".splitpanes--vertical>.splitpanes__splitter"
      ) as NodeListOf<HTMLElement>;
      const splitpanesHorizontal = document.querySelectorAll(
        ".splitpanes--horizontal>.splitpanes__splitter"
      ) as NodeListOf<HTMLElement>;

      splitpanesVertical.forEach((splitpane) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add(
          `absolute`,
          `top-1/2`,
          `z-[1]`,
          `-ml-1.5`,
          `inline-flex`,
          `h-4`,
          `w-3`,
          `-translate-y-1/2`,
          `items-center`,
          `justify-center`,
          `rounded-sm`,
          `bg-border`,
          `content-[url('https://api.iconify.design/lucide:grip-vertical.svg?width=10&height=10&inline=true')]`,
          `dark:content-[url('https://api.iconify.design/lucide:grip-vertical.svg?color=white&width=10&height=10&inline=true')]`
        );
        splitpane.appendChild(newDiv);
      });
      splitpanesHorizontal.forEach((splitpane) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add(
          `absolute`,
          `left-1/2`,
          `z-[1]`,
          `-mt-1.5`,
          `inline-flex`,
          `h-3`,
          `w-4`,
          `-translate-x-1/2`,
          `items-center`,
          `justify-center`,
          `rounded-sm`,
          `bg-border`,
          `content-[url('https://api.iconify.design/lucide:grip-horizontal.svg?width=10&height=10&inline=true')]`,
          `dark:content-[url('https://api.iconify.design/lucide:grip-horizontal.svg?color=white&width=10&height=10&inline=true')]`
        );
        splitpane.appendChild(newDiv);
      });
    }
  });
</script>

<style>
  .splitpanes__splitter {
    @apply relative before:absolute before:left-0 before:top-0 before:z-[1];
  }

  .splitpanes--vertical > .splitpanes__splitter {
    @apply h-full w-px cursor-ew-resize bg-border before:-left-1 before:-right-1 before:h-full;
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    @apply h-px w-full cursor-ns-resize bg-border before:-bottom-1 before:-top-1 before:w-full;
  }
</style>
