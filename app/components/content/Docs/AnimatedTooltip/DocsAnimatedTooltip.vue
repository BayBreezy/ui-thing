<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="people" />
  </div>
</template>

<script lang="ts" setup>
  const people = [
    {
      id: "1",
      title: "John Doe",
      description: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      title: "Jane Smith",
      description: "Product Designer",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      title: "Mike Johnson",
      description: "DevOps Engineer",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "4",
      title: "Sarah Williams",
      description: "UX Researcher",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "5",
      title: "Tom Brown",
      description: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
  ];
</script>
