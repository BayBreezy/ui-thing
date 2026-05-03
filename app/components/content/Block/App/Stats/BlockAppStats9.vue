<template>
  <UiCard>
    <UiCardContent>
      <div class="mb-4 flex items-center justify-between">
        <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
        <UiButton variant="ghost" size="icon-sm">
          <Icon name="lucide:info" class="size-4" />
        </UiButton>
      </div>
      <div class="space-y-3">
        <div class="flex items-end justify-between">
          <h3 class="text-4xl font-bold tracking-tight" v-html="props.value" />
          <div class="flex items-center gap-1">
            <Icon
              :name="props.trend === 'up' ? 'lucide:arrow-up' : 'lucide:arrow-down'"
              :class="[
                'size-5',
                props.trend === 'up'
                  ? 'text-green-600 dark:text-green-500'
                  : 'text-red-600 dark:text-red-500',
              ]"
            />
            <span
              :class="[
                'text-lg font-bold',
                props.trend === 'up'
                  ? 'text-green-600 dark:text-green-500'
                  : 'text-red-600 dark:text-red-500',
              ]"
              v-html="props.change"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <UiAvatar size="sm">
            <UiAvatarImage :src="props.avatar" />
            <UiAvatarFallback>{{ props.avatarFallback }}</UiAvatarFallback>
          </UiAvatar>
          <div class="text-xs">
            <p class="font-medium" v-html="props.assignedTo" />
            <p class="text-muted-foreground" v-html="props.role" />
          </div>
        </div>
        <div class="flex gap-2">
          <UiChip size="sm" class="ring-card">
            <UiBadge variant="warning">
              {{ props.tag1 }}
            </UiBadge>
          </UiChip>
          <UiChip size="sm" variant="outline" class="ring-card">
            <UiBadge variant="outline">
              {{ props.tag2 }}
            </UiBadge>
          </UiChip>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      change?: string;
      trend?: "up" | "down";
      avatar?: string;
      avatarFallback?: string;
      assignedTo?: string;
      role?: string;
      tag1?: string;
      tag2?: string;
    }>(),
    {
      label: "Project Progress",
      value: "68%",
      change: "+5%",
      trend: "up",
      avatar: "https://i.pravatar.cc/150?img=3",
      avatarFallback: "JD",
      assignedTo: "John Doe",
      role: "Project Manager",
      tag1: "In Progress",
      tag2: "High Priority",
    }
  );
</script>
