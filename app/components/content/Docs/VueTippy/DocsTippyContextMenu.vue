<template>
  <div>
    <div ref="container">
      <UiPlaceholder class="h-[400px]">
        <p>Right Click Anywhere</p>
      </UiPlaceholder>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTippy } from "vue-tippy";

  const container = ref();
  const items = [
    { title: "Account", icon: "lucide:user", shortcut: "⌘A" },
    { title: "Settings", icon: "lucide:settings", shortcut: "⌘S" },
    { title: "Help", icon: "lucide:life-buoy", shortcut: "⌘H" },
    { title: "Sign out", icon: "lucide:log-out", shortcut: "⌘O" },
  ];
  const ContextMenuComponent = {
    render: () =>
      h("div", { class: `w-[200px]` }, [
        h("p", { class: `font-semibold text-sm pt-2 pb-4 px-1` }, "Context menu"),
        h(resolveComponent("UiDivider")),
        h(
          "ul",
          { class: tw`mt-1 flex w-full flex-col gap-0.5` },
          items.map((item) =>
            h(
              "li",
              {
                class: tw`flex w-full cursor-pointer items-center gap-2 rounded p-2 text-sm transition hover:bg-muted`,
                onClick: hide,
              },
              [
                h(resolveComponent("Icon"), {
                  name: item.icon,
                  size: 16,
                  class: tw`text-muted-foreground`,
                }),
                h("span", item.title),
                h("span", { class: tw`ml-auto text-xs text-muted-foreground` }, item.shortcut),
              ]
            )
          )
        ),
      ]),
  };

  const targetIsVisible = useElementVisibility(container, { threshold: 0.5 });

  const { setProps, show, hide } = useTippy(container, {
    content: ContextMenuComponent,
    placement: "right-start",
    trigger: "manual",
    interactive: true,
    arrow: false,
    offset: [0, 0],
  });

  useEventListener(container, "contextmenu", (event) => {
    event.preventDefault();

    setProps({
      getReferenceClientRect: () => ({
        width: 0,
        height: 0,
        top: event.clientY,
        bottom: event.clientY,
        left: event.clientX,
        right: event.clientX,
      }),
    });

    show();
  });

  useEventListener("scroll", () => {
    if (!targetIsVisible.value) {
      hide();
    }
  });
</script>
