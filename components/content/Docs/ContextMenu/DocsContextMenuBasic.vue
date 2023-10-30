<template>
  <UIContextMenu>
    <UIContextMenuTrigger
      as="div"
      class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click to see basic context menu
    </UIContextMenuTrigger>
    <UIContextMenuContent loop class="w-64">
      <UIContextMenuItem title="Back" inset shortcut="⌘[" />
      <UIContextMenuItem title="Forward" disabled inset shortcut="⌘]" />
      <UIContextMenuItem title="Reload" inset shortcut="⌘R" />
      <UIContextMenuSub>
        <UIContextMenuSubTrigger title="More Tools" inset />
        <UIContextMenuSubContent class="w-52">
          <UIContextMenuItem title="New window..." />
          <UIContextMenuItem title="Create shortcut..." />
          <UIContextMenuItem title="Save page as..." shortcut="⌘S" />
          <UIContextMenuItem title="Clear data" shortcut="⌘⇧⌫" />
          <UIContextMenuSeparator />
          <UIContextMenuItem title="Developer tools" shortcut="⌥⌘I" />
        </UIContextMenuSubContent>
      </UIContextMenuSub>
      <UIContextMenuSeparator />
      <UIContextMenuCheckboxItem
        v-model:checked="showBookmark"
        @select="(e) => e.preventDefault()"
        title="Show Bookmarks Bar"
        inset
        shortcut="⌘⇧B"
      />
      <UIContextMenuCheckboxItem
        v-model:checked="showFullUrls"
        @select="(e) => e.preventDefault()"
        title="Show full URLs"
        inset
        shortcut="⌘⇧U"
      />
      <UIContextMenuSeparator />
      <UIContextMenuLabel inset label="Choose a person" />
      <UIContextMenuSeparator />
      <UIContextMenuRadioGroup v-model="person">
        <UIContextMenuRadioItem
          @select="(e) => e.preventDefault()"
          title="Paul Rafael"
          inset
          value="1"
        />
        <UIContextMenuRadioItem
          @select="(e) => e.preventDefault()"
          title="Sarah Lindsey"
          inset
          value="2"
        />
      </UIContextMenuRadioGroup>
    </UIContextMenuContent>
  </UIContextMenu>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");
</script>
