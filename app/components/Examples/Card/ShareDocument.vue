<template>
  <UiCard description="Anyone with the link can view this document.">
    <template #title>
      <UiCardTitle class="text-xl"> Share this document </UiCardTitle>
    </template>
    <template #content>
      <UiCardContent>
        <div class="flex space-x-2">
          <UiInput class="select-all" model-value="http://example.com/link/to/document" read-only />
          <UiButton variant="secondary" class="shrink-0"> Copy Link </UiButton>
        </div>
        <UiSeparator class="my-4" />
        <div class="space-y-4">
          <h4 class="text-sm font-medium">People with access</h4>
          <div class="grid gap-6">
            <template v-for="(p, i) in people" :key="i">
              <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                  <UiAvatar :src="p.avatar" :fallback="p.fallback" />
                  <div>
                    <p class="text-sm font-medium leading-none">{{ p.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ p.email }}</p>
                  </div>
                </div>
                <UiSelect v-model="p.model" :default-value="p.model">
                  <UiSelectTrigger placeholder="Select" class="ml-auto w-[110px]" />
                  <UiSelectContent>
                    <UiSelectItem value="edit" text="Can Edit" />
                    <UiSelectItem value="view" text="Can View" />
                  </UiSelectContent>
                </UiSelect>
              </div>
            </template>
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
      email: "o@example.com",
      avatar: "https://avatar.vercel.sh/oliviamartin",
      fallback: "OM",
      model: ref("edit"),
    },
    {
      name: "Isabella Nguyen",
      email: "i@example.com",
      avatar: "https://avatar.vercel.sh/isabellanguyen",
      fallback: "IG",
      mdoel: ref("view"),
    },
    {
      name: "Sofia Davis",
      email: "s@example.com",
      avatar: "https://avatar.vercel.sh/sofiadavis",
      fallback: "SD",
      model: ref("view"),
    },
  ]);
</script>
