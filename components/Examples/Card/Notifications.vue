<template>
  <UiCard description="Choose what you want to be notified about.">
    <template #title>
      <UiCardTitle class="text-xl">Notifications </UiCardTitle>
    </template>
    <template #content>
      <UiCardContent class="grid gap-1">
        <template v-for="(n, k) in notez" :key="k">
          <div
            class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
            :class="[k === 1 ? 'bg-accent text-accent-foreground' : '']"
          >
            <Icon :name="n.icon" class="mt-px h-5 w-5" />
            <div class="space-y-1">
              <p class="text-sm font-medium leading-none">{{ n.title }}</p>
              <p class="text-sm text-muted-foreground">{{ n.description }}</p>
            </div>
          </div>
        </template>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  const notez = [
    {
      icon: "lucide:bell",
      title: "Everything",
      description: "Email digest, mentions & all activity.",
    },
    {
      icon: "lucide:user",
      title: "Available",
      description: "Only mentions and comments.",
    },
    {
      icon: "lucide:eye-off",
      title: "Ignoring",
      description: "Turn off all notifications.",
    },
  ];
</script>
