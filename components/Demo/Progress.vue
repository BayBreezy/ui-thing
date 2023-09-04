<template>
  <div>
    <Heading
      title="Progress"
      subtext="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
      radix-link="https://www.radix-vue.com/components/progress.html"
    />

    <UIProgress v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(10);

  onMounted(() => {
    let timer = setTimeout(() => {
      value.value = 60;
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });
</script>
