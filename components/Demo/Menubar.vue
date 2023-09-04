<template>
  <div>
    <Heading
      title="Menubar"
      subtext="A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands."
      radix-link="https://www.radix-vue.com/components/menubar.html"
    />

    <UIMenubar>
      <template v-for="(item, i) in menu" :key="i">
        <UIMenubarMenu :value="item.value">
          <UIMenubarTrigger>
            {{ item.trigger }}
          </UIMenubarTrigger>

          <UIMenubarContent>
            <template v-for="(child, k) in item.items" :key="`child-${k}`">
              <UIMenubarSeparator v-if="child.divider" />
              <UIMenubarCheckboxItem
                @select="(e) => e.preventDefault()"
                v-else-if="child.type === 'check'"
                :title="child.title"
                :shortcut="child.shortcut"
                v-model:checked="child.model.value"
              />
              <UIMenubarRadioGroup v-else-if="child.type === 'radio'" v-model="child.model.value">
                <template v-for="(o, m) in child.options" :key="m">
                  <UIMenubarRadioItem
                    @select="(e) => e.preventDefault()"
                    :title="o.title"
                    :shortcut="o.shortcut"
                    :value="o.value"
                  />
                </template>
              </UIMenubarRadioGroup>
              <UIMenubarItem
                v-else-if="!child.divider && !child.items"
                :title="child.title"
                :inset="child.inset"
                :shortcut="child.shortcut"
                :disabled="child.disabled"
              />
              <UIMenubarSub v-else-if="child.items">
                <UIMenubarSubTrigger :title="child.title" />
                <UIMenubarSubContent class="w-44">
                  <template v-for="(kid, j) in child.items" :key="`kid-${j}`">
                    <UIMenubarSeparator v-if="kid.divider" />
                    <UIMenubarItem :inset="kid.inset" v-else :title="kid.title" :icon="kid.icon" />
                  </template>
                </UIMenubarSubContent>
              </UIMenubarSub>
            </template>
          </UIMenubarContent>
        </UIMenubarMenu>
      </template>
    </UIMenubar>
  </div>
</template>

<script lang="ts" setup>
  const showBookmarks = ref(false);
  const showURLs = ref(false);
  const person = ref();
  const menu = [
    {
      trigger: "File",
      value: "file",
      items: [
        { title: "New Tab", shortcut: "⌘T" },
        { title: "New Window", shortcut: "⌘NW" },
        { title: "New Incognito Window", disabled: true },
        { divider: true },
        {
          title: "Share",
          items: [
            { title: "WhatsApp", icon: "logos:whatsapp-icon" },
            { title: "Facebook", icon: "logos:facebook" },
            { title: "Twitter", icon: "logos:twitter" },
          ],
        },
        { divider: true },
        { title: "Print", shortcut: "⌘P" },
      ],
    },
    {
      trigger: "Edit",
      value: "edit",
      items: [
        { title: "Undo", shortcut: "⌘Z" },
        { title: "Redo", shortcut: "⇧⌘Z" },
        { divider: true },
        {
          title: "Find",
          items: [
            { title: "Search the web" },
            { divider: true },
            { title: "Find..." },
            { title: "Find Next" },
            { title: "Find Previous" },
          ],
        },
        { divider: true },
        { title: "Cut" },
        { title: "Copy" },
        { title: "Paste" },
      ],
    },
    {
      trigger: "View",
      value: "view",
      items: [
        { title: "Always show bookmarks bar", model: showBookmarks, type: "check" },
        { title: "Always show full URLs", model: showURLs, type: "check" },
        { divider: true },
        { title: "Reload", shortcut: "⌘R", inset: true },
        { title: "Force reload", shortcut: "⇧⌘R", disabled: true, inset: true },
        { divider: true },
        { title: "Toggle fullscreen", inset: true },
        { title: "Hide sidebar", inset: true },
      ],
    },
    {
      trigger: "Profile",
      value: "profile",
      items: [
        {
          model: person,
          type: "radio",
          options: [
            { title: "Andy", value: "andy" },
            { title: "Bob", value: "bob" },
            { title: "Charlie", value: "charlie" },
          ],
        },
        { divider: true },
        { title: "Edit", shortcut: "⌘E", inset: true },
        { title: "Add profile", shortcut: "⇧⌘P", inset: true },
      ],
    },
  ];
</script>
