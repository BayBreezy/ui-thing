<template>
  <UiContextMenu>
    <UiContextMenuTrigger
      as="div"
      class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click to see basic context menu
    </UiContextMenuTrigger>
    <UiContextMenuContent loop class="w-64">
      <UiContextMenuItem title="Back" inset shortcut="⌘[" />
      <UiContextMenuItem title="Forward" disabled inset shortcut="⌘]" />
      <UiContextMenuItem title="Reload" inset shortcut="⌘R" />
      <UiContextMenuSub>
        <UiContextMenuSubTrigger title="More Tools" inset />
        <UiContextMenuSubContent class="w-52">
          <UiContextMenuItem title="New window..." />
          <UiContextMenuItem title="Create shortcut..." />
          <UiContextMenuItem title="Save page as..." shortcut="⌘S" />
          <UiContextMenuItem title="Clear data" shortcut="⌘⇧⌫" />
          <UiContextMenuSeparator />
          <UiContextMenuItem title="Developer tools" shortcut="⌥⌘I" />
        </UiContextMenuSubContent>
      </UiContextMenuSub>
      <UiContextMenuSeparator />
      <UiContextMenuCheckboxItem
        v-model:checked="showBookmark"
        title="Show Bookmarks Bar"
        inset
        shortcut="⌘⇧B"
        @select="(e) => e.preventDefault()"
      />
      <UiContextMenuCheckboxItem
        v-model:checked="showFullUrls"
        title="Show full URLs"
        inset
        shortcut="⌘⇧U"
        @select="(e) => e.preventDefault()"
      />
      <UiContextMenuSeparator />
      <UiContextMenuLabel inset label="Choose a person" />
      <UiContextMenuSeparator />
      <UiContextMenuRadioGroup v-model="person">
        <UiContextMenuRadioItem
          title="Paul Rafael"
          inset
          value="1"
          @select="(e) => e.preventDefault()"
        />
        <UiContextMenuRadioItem
          title="Sarah Lindsey"
          inset
          value="2"
          @select="(e) => e.preventDefault()"
        />
      </UiContextMenuRadioGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");
</script>
