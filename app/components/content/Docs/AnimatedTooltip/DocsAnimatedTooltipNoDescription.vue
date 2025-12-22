<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="team" />
  </div>
</template>

<script lang="ts" setup>
  const team = [
    {
      id: "1",
      title: "Alex Turner",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "2",
      title: "Emma Davis",
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "3",
      title: "Chris Martin",
      image: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "4",
      title: "Lisa Anderson",
      image: "https://i.pravatar.cc/150?img=16",
    },
  ];
</script>
