<template>
  <!--
    Billing overview with current plan, usage and payment method
    Features: Plan summary with renewal date, usage meters with progress bars, default card, billing email, upgrade and cancel actions
  -->
  <div class="space-y-6">
    <UiCard>
      <UiCardHeader>
        <div class="flex flex-wrap items-center gap-2">
          <UiCardTitle>{{ props.planName }}</UiCardTitle>
          <UiBadge variant="secondary">Monthly</UiBadge>
        </div>
        <UiCardDescription>
          Your plan renews on <span class="text-foreground font-medium">{{ props.renewsOn }}</span
          >.
        </UiCardDescription>
        <UiCardAction class="text-right">
          <p class="text-2xl font-bold">
            {{ props.price }}
            <span class="text-muted-foreground text-sm font-normal">/ month</span>
          </p>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent class="grid gap-6 sm:grid-cols-3">
        <div v-for="meter in props.usage" :key="meter.label" class="space-y-2">
          <div class="flex items-baseline justify-between text-sm">
            <span class="font-medium">{{ meter.label }}</span>
            <span class="text-muted-foreground">{{ meter.used }} / {{ meter.limit }}</span>
          </div>
          <UiProgress :model-value="(meter.used / meter.limit) * 100" class="h-2" />
        </div>
      </UiCardContent>
      <UiCardFooter class="justify-end gap-2 border-t">
        <UiButton variant="ghost" class="text-destructive hover:text-destructive">
          Cancel plan
        </UiButton>
        <UiButton @click="useSonner.info('Open your plan picker here')">
          <Icon name="lucide:sparkles" class="size-4" />
          Upgrade plan
        </UiButton>
      </UiCardFooter>
    </UiCard>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Payment method</UiCardTitle>
        <UiCardDescription>This card is charged on every renewal.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="space-y-5">
        <div class="flex items-center gap-4 rounded-lg border p-4">
          <div class="bg-muted flex h-9 w-14 items-center justify-center rounded-md border">
            <Icon name="logos:visa" class="size-6" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Visa ending in 4242</p>
            <p class="text-muted-foreground text-sm">Expires 08/2028</p>
          </div>
          <UiButton variant="outline" size="sm">Update</UiButton>
        </div>
        <div class="grid gap-2">
          <UiLabel for="billing-email">Billing email</UiLabel>
          <UiInput id="billing-email" v-model="email" type="email" />
          <p class="text-muted-foreground text-xs">Invoices are sent to this address.</p>
        </div>
      </UiCardContent>
      <UiCardFooter class="justify-end border-t">
        <UiButton size="sm" @click="useSonner.success('Billing email updated')">Save</UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  type Meter = { label: string; used: number; limit: number };

  const props = withDefaults(
    defineProps<{
      planName?: string;
      price?: string;
      renewsOn?: string;
      usage?: Meter[];
    }>(),
    {
      planName: "Pro plan",
      price: "$29",
      renewsOn: "March 14, 2026",
      usage: () => [
        { label: "Seats", used: 8, limit: 10 },
        { label: "Projects", used: 23, limit: 50 },
        { label: "Storage (GB)", used: 41, limit: 100 },
      ],
    }
  );

  const email = ref("billing@uithing.com");
</script>
