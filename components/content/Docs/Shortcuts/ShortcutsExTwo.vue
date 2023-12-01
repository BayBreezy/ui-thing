<template>
  <UiLabel>Enter your name</UiLabel>
  <UiInput v-model="query" name="queryInput" />
</template>

<script setup lang="ts">
  const query = ref("");

  defineShortcuts({
    enter: {
      usingInput: "queryInput",
      handler: () => {
        useSonner.info("Triggered", {
          description: query.value
            ? `You just typed ${query.value} and pressed enter!`
            : `You just pressed enter with nothing typed!`,
        });
      },
    },
  });
</script>
