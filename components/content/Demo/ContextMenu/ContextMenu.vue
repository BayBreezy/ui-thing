<template>
  <div>
    <Heading
      title="Context Menu"
      subtext="Displays a menu located at the pointer, triggered by a right-click or a long-press."
      radix-link="https://www.radix-vue.com/components/context-menu.html"
    />
    <div class="flex flex-wrap gap-5">
      <DemoContextMenuBasic />
      <DemoContextMenuCheckItems />
      <DemoContextMenuRadioItems />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
