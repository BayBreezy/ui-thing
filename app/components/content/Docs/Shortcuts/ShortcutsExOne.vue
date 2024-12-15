<template>
  <div />
</template>
<script lang="ts" setup>
  defineShortcuts({
    ctrl_v: {
      usingInput: false,
      handler: () => {
        useSonner("Nice!", { description: "You just used a shortcut!" });
      },
    },
  });
</script>
