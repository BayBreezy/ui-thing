<template>
  <!--
    Notification preferences as an event by channel matrix
    Features: Table with email, push and SMS checkboxes per event, column toggles, mobile-friendly horizontal scroll
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="p-0">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-6">Event</UiTableHead>
            <UiTableHead v-for="channel in channels" :key="channel.id" class="w-24 text-center">
              <div class="flex flex-col items-center gap-1.5 py-2">
                <span>{{ channel.label }}</span>
                <UiCheckbox
                  :model-value="columnState(channel.id)"
                  :aria-label="`Toggle all ${channel.label}`"
                  @update:model-value="setColumn(channel.id, $event === true)"
                />
              </div>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="row in rows" :key="row.id">
            <UiTableCell class="pl-6">
              <p class="font-medium">{{ row.label }}</p>
              <p class="text-muted-foreground text-xs">{{ row.hint }}</p>
            </UiTableCell>
            <UiTableCell v-for="channel in channels" :key="channel.id" class="text-center">
              <UiCheckbox
                v-model="row.channels[channel.id]"
                :aria-label="`${row.label} by ${channel.label}`"
              />
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Cancel</UiButton>
      <UiButton @click="useSonner.success('Notification settings saved')">Save changes</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  type ChannelId = "email" | "push" | "sms";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Notifications",
      description: "Choose how you want to be told about activity.",
    }
  );

  const channels: { id: ChannelId; label: string }[] = [
    { id: "email", label: "Email" },
    { id: "push", label: "Push" },
    { id: "sms", label: "SMS" },
  ];

  const rows = reactive([
    {
      id: "mentions",
      label: "Mentions",
      hint: "Someone mentions you in a comment.",
      channels: { email: true, push: true, sms: false },
    },
    {
      id: "assigned",
      label: "Assignments",
      hint: "A task is assigned to you.",
      channels: { email: true, push: true, sms: false },
    },
    {
      id: "billing",
      label: "Billing",
      hint: "Invoices and failed payments.",
      channels: { email: true, push: false, sms: true },
    },
    {
      id: "security",
      label: "Security alerts",
      hint: "New sign-ins and password changes.",
      channels: { email: true, push: true, sms: true },
    },
    {
      id: "product",
      label: "Product updates",
      hint: "News about new features.",
      channels: { email: false, push: false, sms: false },
    },
  ]);

  function columnState(channel: ChannelId): boolean | "indeterminate" {
    const count = rows.filter((row) => row.channels[channel]).length;
    if (count === 0) return false;
    return count === rows.length ? true : "indeterminate";
  }

  function setColumn(channel: ChannelId, value: boolean) {
    rows.forEach((row) => {
      row.channels[channel] = value;
    });
  }
</script>
