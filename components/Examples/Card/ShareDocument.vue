<template>
  <UICard description="Anyone with the link can view this document.">
    <template #title>
      <UICardTitle class="text-xl"> Share this document </UICardTitle>
    </template>
    <template #content>
      <UICardContent>
        <div class="flex space-x-2">
          <UIInput class="select-all" model-value="http://example.com/link/to/document" readOnly />
          <UIButton variant="secondary" class="shrink-0"> Copy Link </UIButton>
        </div>
        <UISeparator class="my-4" />
        <div class="space-y-4">
          <h4 class="text-sm font-medium">People with access</h4>
          <div class="grid gap-6">
            <template v-for="(p, i) in people" :key="i">
              <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                  <UIAvatar :src="p.avatar" :fallback="p.fallback" />
                  <div>
                    <p class="text-sm font-medium leading-none">{{ p.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ p.email }}</p>
                  </div>
                </div>
                <UISelect default-value="Can Edit">
                  <UISelectTrigger placeholder="Select" class="ml-auto w-[110px]" />
                  <UISelectContent>
                    <UISelectItem value="Can Edit" text="Can Edit" />
                    <UISelectItem value="Can View" text="Can View" />
                  </UISelectContent>
                </UISelect>
              </div>
            </template>
          </div>
        </div>
      </UICardContent>
    </template>
  </UICard>
</template>

<script lang="ts" setup>
  const people = [
    {
      name: "Olivia Martin",
      email: "o@example.com",
      avatar: "https://avatar.vercel.sh/oliviamartin",
      fallback: "OM",
    },
    {
      name: "Isabella Nguyen",
      email: "i@example.com",
      avatar: "https://avatar.vercel.sh/isabellanguyen",
      fallback: "IG",
    },
    {
      name: "Sofia Davis",
      email: "s@example.com",
      avatar: "https://avatar.vercel.sh/sofiadavis",
      fallback: "SD",
    },
  ];
</script>
