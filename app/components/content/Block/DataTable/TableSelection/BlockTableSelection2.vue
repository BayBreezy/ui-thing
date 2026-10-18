<template>
  <!--
    Table with a row action menu
    Features: Dropdown per row with edit, duplicate, copy ID and delete, destructive item styling, duplicate adds a row, delete removes it and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Webhook</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Endpoint</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="w-12"><span class="sr-only">Actions</span></UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="hook in rows" :key="hook.id">
            <UiTableCell>
              <p class="font-medium">{{ hook.name }}</p>
              <p class="text-muted-foreground font-mono text-xs">{{ hook.id }}</p>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden max-w-64 truncate sm:table-cell">
              {{ hook.url }}
            </UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="hook.active ? 'green' : 'slate'" shape="pill">
                {{ hook.active ? "Active" : "Paused" }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-right">
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" :aria-label="`Actions for ${hook.name}`">
                    <Icon name="lucide:ellipsis" class="size-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end" class="w-44">
                  <UiDropdownMenuLabel>Actions</UiDropdownMenuLabel>
                  <UiDropdownMenuItem @select="useSonner.info(`Editing ${hook.name}`)">
                    <Icon name="lucide:pencil" class="size-4" />
                    Edit
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem @select="duplicate(hook)">
                    <Icon name="lucide:copy" class="size-4" />
                    Duplicate
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem @select="copyId(hook.id)">
                    <Icon name="lucide:clipboard" class="size-4" />
                    Copy ID
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem @select="hook.active = !hook.active">
                    <Icon :name="hook.active ? 'lucide:pause' : 'lucide:play'" class="size-4" />
                    {{ hook.active ? "Pause" : "Resume" }}
                  </UiDropdownMenuItem>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem variant="destructive" @select="remove(hook.id)">
                    <Icon name="lucide:trash-2" class="size-4" />
                    Delete
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4">No webhooks yet.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Hook = { id: string; name: string; url: string; active: boolean };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      hooks?: Hook[];
    }>(),
    {
      title: "Webhooks",
      description: "Every row has a menu with the actions you would expect.",
      hooks: () => [
        {
          id: "wh_1a2b3c",
          name: "Order created",
          url: "https://api.example.com/hooks/orders",
          active: true,
        },
        {
          id: "wh_4d5e6f",
          name: "Payment failed",
          url: "https://api.example.com/hooks/payments",
          active: true,
        },
        {
          id: "wh_7g8h9i",
          name: "Customer updated",
          url: "https://api.example.com/hooks/customers",
          active: false,
        },
      ],
    }
  );

  const rows = ref<Hook[]>(props.hooks.map((hook) => ({ ...hook })));

  const { copy } = useClipboard();

  async function copyId(id: string) {
    await copy(id);
    useSonner.success("ID copied");
  }

  function duplicate(hook: Hook) {
    const index = rows.value.findIndex((row) => row.id === hook.id);
    const suffix = Math.random().toString(36).slice(2, 8);
    rows.value.splice(index + 1, 0, { ...hook, id: `wh_${suffix}`, name: `${hook.name} (copy)` });
  }

  function remove(id: string) {
    rows.value = rows.value.filter((row) => row.id !== id);
    useSonner.success("Webhook deleted");
  }
</script>
