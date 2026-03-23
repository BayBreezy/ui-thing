<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="insert">
        <UiMenubarTrigger class="cursor-pointer">Insert</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarLabel>Media</UiMenubarLabel>
          <UiMenubarItem title="Image..." icon="lucide:image" />
          <UiMenubarItem title="Video..." icon="lucide:video" />
          <UiMenubarItem title="Audio..." icon="lucide:music" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Content</UiMenubarLabel>
          <UiMenubarItem title="Table" icon="lucide:table" />
          <UiMenubarItem title="Code Block" icon="lucide:code" />
          <UiMenubarItem title="Blockquote" icon="lucide:quote" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Other</UiMenubarLabel>
          <UiMenubarItem title="Horizontal Rule" icon="lucide:minus" />
          <UiMenubarItem title="Page Break" icon="lucide:file-plus" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="view">
        <UiMenubarTrigger class="cursor-pointer">View</UiMenubarTrigger>
        <UiMenubarContent class="w-48">
          <UiMenubarLabel>Layout</UiMenubarLabel>
          <UiMenubarItem title="Sidebar" shortcut="⌘B" icon="lucide:panel-left" />
          <UiMenubarItem title="Activity Bar" icon="lucide:layout-dashboard" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Appearance</UiMenubarLabel>
          <UiMenubarItem title="Zoom In" shortcut="⌘+" icon="lucide:zoom-in" />
          <UiMenubarItem title="Zoom Out" shortcut="⌘-" icon="lucide:zoom-out" />
          <UiMenubarItem title="Reset Zoom" shortcut="⌘0" icon="lucide:maximize" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="tools">
        <UiMenubarTrigger class="cursor-pointer">Tools</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarLabel>Analysis</UiMenubarLabel>
          <UiMenubarItem title="Word Count" icon="lucide:hash" />
          <UiMenubarItem title="Spell Check" shortcut="⌘;" icon="lucide:spell-check" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Automation</UiMenubarLabel>
          <UiMenubarItem title="Macros" icon="lucide:play-circle" />
          <UiMenubarItem title="Extensions" icon="lucide:puzzle" />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
