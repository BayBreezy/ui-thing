<template>
  <UiDropdownMenu :modal="false">
    <UiDropdownMenuTrigger
      :class="mainMenuTriggerStyles({ class: normalizeClass(props.class) || undefined })"
    >
      <span class="font-medium">Menu</span>
      <Icon name="lucide:menu" class="size-5" />
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent side="right" align="start" :align-offset="-8" class="min-w-40">
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem shortcut="R" @click="shuffle">Shuffle</UiDropdownMenuItem>
        <UiDropdownMenuItem shortcut="D" @click="toggleTheme">Light/Dark</UiDropdownMenuItem>
      </UiDropdownMenuGroup>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem
          :disabled="!canGoBack"
          :shortcut="isMac ? '⌘Z' : 'Ctrl+Z'"
          @click="goBack"
        >
          Undo
        </UiDropdownMenuItem>
        <UiDropdownMenuItem
          :disabled="!canGoForward"
          :shortcut="isMac ? '⇧⌘Z' : 'Ctrl+Shift+Z'"
          @click="goForward"
        >
          Redo
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem shortcut="⇧R" @click="reset">Reset</UiDropdownMenuItem>
      </UiDropdownMenuGroup>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { isEditableTarget } from "~/utils/typeset/keyboard";

  const mainMenuTriggerStyles = tv({
    base: "hover:bg-muted data-[state=open]:bg-muted focus-visible:ring-foreground/50 ring-foreground/10 relative flex w-36 shrink-0 touch-manipulation items-center justify-between gap-2 rounded-lg p-3 px-1.75 ring-1 select-none focus-visible:ring-1 focus-visible:outline-none disabled:opacity-50 md:w-full md:rounded-lg md:px-2.5 md:py-2",
  });

  export type TypesetMainMenuProps = {
    /** Additional classes to apply to the trigger. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetMainMenuProps>();

  const isMac = useIsMac();
  const { canGoBack, canGoForward, goBack, goForward } = useTypesetHistory();
  const { toggleTheme } = useTypesetThemeToggle();
  const { shuffle, reset } = useTypesetShuffle();

  // R shuffles, ⇧R resets. Undo/Redo (⌘Z) and Light/Dark (D) are bound in their
  // own composables.
  useEventListener(globalThis.document, "keydown", (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    if (isEditableTarget(event.target)) {
      return;
    }
    if (event.key !== "r" && event.key !== "R") {
      return;
    }
    event.preventDefault();
    if (event.shiftKey) {
      reset();
    } else {
      shuffle();
    }
  });
</script>
