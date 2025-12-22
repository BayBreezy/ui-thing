<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="teamMembers" />
  </div>
</template>

<script lang="ts" setup>
  const teamMembers = [
    {
      id: "1",
      title: "John Doe",
      description: "CEO",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      title: "Jane Smith",
      description: "CTO",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      title: "Mike Johnson",
      description: "Lead Developer",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "4",
      title: "Sarah Williams",
      description: "Designer",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "5",
      title: "Tom Brown",
      description: "Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "6",
      title: "Emily Davis",
      description: "Marketing",
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "7",
      title: "David Wilson",
      description: "Sales",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: "8",
      title: "Lisa Anderson",
      description: "HR Manager",
      image: "https://i.pravatar.cc/150?img=16",
    },
  ];
</script>
