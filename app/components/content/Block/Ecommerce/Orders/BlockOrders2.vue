<template>
  <!--
    Order tracking timeline
    Features: Vertical timeline for placed, packed, shipped, out for delivery and delivered with the current step highlighted, carrier and tracking number with a copy button, estimated delivery and a log of recent carrier scans
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-muted-foreground text-sm">Order {{ order.id }}</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">{{ currentStep.title }}</h1>
          <p class="text-muted-foreground mt-2">{{ currentStep.description }}</p>
        </div>
        <div class="text-right">
          <p class="text-muted-foreground text-xs tracking-wide uppercase">Estimated delivery</p>
          <p class="text-lg font-semibold">{{ order.eta }}</p>
        </div>
      </div>

      <div
        class="bg-muted/40 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4"
      >
        <div class="flex items-center gap-3">
          <span class="bg-background grid size-10 place-items-center rounded-full border">
            <Icon name="lucide:truck" class="size-5" />
          </span>
          <div>
            <p class="text-sm font-medium">{{ order.carrier }}</p>
            <p class="text-muted-foreground text-xs tabular-nums">{{ order.trackingNumber }}</p>
          </div>
        </div>
        <UiButton variant="outline" size="sm" @click="copy(order.trackingNumber)">
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
          {{ copied ? "Copied" : "Copy tracking number" }}
        </UiButton>
      </div>

      <UiTimeline :model-value="order.currentStep" class="mt-10">
        <UiTimelineItem v-for="step in order.steps" :key="step.id" :step="step.id">
          <UiTimelineHeader>
            <UiTimelineSeparator />
            <UiTimelineDate>{{ step.date }}</UiTimelineDate>
            <UiTimelineTitle>{{ step.title }}</UiTimelineTitle>
            <UiTimelineIndicator />
          </UiTimelineHeader>
          <UiTimelineContent>{{ step.description }}</UiTimelineContent>
        </UiTimelineItem>
      </UiTimeline>

      <section class="mt-12" aria-labelledby="scans-title">
        <h2 id="scans-title" class="font-semibold">Recent activity</h2>
        <ul class="mt-4 divide-y rounded-xl border">
          <li v-for="scan in order.scans" :key="scan.time" class="flex items-start gap-4 p-4">
            <span class="bg-primary mt-1.5 size-2 shrink-0 rounded-full" aria-hidden="true" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium">{{ scan.event }}</p>
              <p class="text-muted-foreground text-xs">{{ scan.location }}</p>
            </div>
            <time class="text-muted-foreground text-xs whitespace-nowrap">{{ scan.time }}</time>
          </li>
        </ul>
      </section>

      <div class="mt-8 flex flex-wrap gap-3">
        <UiButton variant="outline">
          <Icon name="lucide:map-pin" />
          Change delivery address
        </UiButton>
        <UiButton variant="ghost">
          <Icon name="lucide:message-circle" />
          Contact support
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type TrackingStep = { id: number; title: string; date: string; description: string };

  type Tracking = {
    id: string;
    carrier: string;
    trackingNumber: string;
    eta: string;
    /** The step that is currently active, matching a step id. */
    currentStep: number;
    steps: TrackingStep[];
    scans: { event: string; location: string; time: string }[];
  };

  const props = withDefaults(defineProps<{ order?: Tracking }>(), {
    order: () => ({
      id: "AR-48213",
      carrier: "UPS Ground",
      trackingNumber: "1Z999AA10123456784",
      eta: "Tue, Oct 20",
      currentStep: 3,
      steps: [
        {
          id: 1,
          title: "Order placed",
          date: "Oct 14",
          description: "We received your order and payment.",
        },
        {
          id: 2,
          title: "Packed",
          date: "Oct 15",
          description: "Your items were packed at our studio.",
        },
        {
          id: 3,
          title: "Shipped",
          date: "Oct 16",
          description: "The carrier has your package and it is on its way.",
        },
        {
          id: 4,
          title: "Out for delivery",
          date: "Expected Oct 20",
          description: "Your package is on a truck near you.",
        },
        {
          id: 5,
          title: "Delivered",
          date: "Expected Oct 20",
          description: "Delivered to your front door.",
        },
      ],
      scans: [
        {
          event: "Departed regional facility",
          location: "Sacramento, CA",
          time: "Oct 17, 6:42 am",
        },
        {
          event: "Arrived at regional facility",
          location: "Sacramento, CA",
          time: "Oct 16, 9:15 pm",
        },
        { event: "Picked up by carrier", location: "Oakland, CA", time: "Oct 16, 1:30 pm" },
      ],
    }),
  });

  const { copy, copied } = useClipboard({ copiedDuring: 1800 });

  const currentStep = computed(
    () => props.order.steps.find((s) => s.id === props.order.currentStep) ?? props.order.steps[0]!
  );
</script>
