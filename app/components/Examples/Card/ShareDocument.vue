<template>
  <UiCard title="Share this document" description="Anyone with the link can view this document.">
    <template #content>
      <UiCardContent>
        <div class="flex items-center gap-2">
          <UiLabel for="link" class="sr-only"> Link </UiLabel>
          <UiInput id="link" readonly value="http://example.com/link/to/document" class="h-8" />
          <UiButton size="sm" variant="outline" class="shadow-none"> Copy Link </UiButton>
        </div>
        <UiSeparator class="my-4" />
        <div class="flex flex-col gap-4">
          <div class="text-sm font-medium">People with access</div>
          <div class="grid gap-6">
            <div
              v-for="person in people"
              :key="person.email"
              class="flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-4">
                <UiAvatar>
                  <UiAvatarImage :src="person.avatar" :alt="person.name" />
                  <UiAvatarFallback>{{ person.name.charAt(0) }}</UiAvatarFallback>
                </UiAvatar>
                <div>
                  <p class="text-sm leading-none font-medium">
                    {{ person.name }}
                  </p>
                  <p class="text-muted-foreground text-sm">
                    {{ person.email }}
                  </p>
                </div>
              </div>
              <UiSelect v-model="person.model" class="w-fit">
                <UiSelectTrigger class="ml-auto w-fit pr-2" aria-label="Edit" size="sm">
                  <UiSelectValue placeholder="Select" />
                </UiSelectTrigger>
                <UiSelectContent align="end">
                  <UiSelectItem value="edit">Can edit</UiSelectItem>
                  <UiSelectItem value="view">Can view</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </div>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  const people = ref([
    {
      name: "Olivia Martin",
      email: "m@example.com",
      avatar: "https://randomuser.me/api/portraits/med/women/85.jpg",
      model: ref("edit"),
    },
    {
      name: "Isabella Nguyen",
      email: "b@example.com",
      avatar: "https://randomuser.me/api/portraits/med/women/75.jpg",
      model: ref("edit"),
    },
    {
      name: "Sofia Davis",
      email: "p@example.com",
      avatar: "https://randomuser.me/api/portraits/med/women/65.jpg",
      model: ref("edit"),
    },
    {
      name: "Ethan Thompson",
      email: "e@example.com",
      avatar: "https://randomuser.me/api/portraits/med/men/1.jpg",
      model: ref("edit"),
    },
  ]);
</script>
