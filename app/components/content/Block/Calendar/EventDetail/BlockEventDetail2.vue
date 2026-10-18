<template>
  <!--
    Event page
    Features: Cover image, date, place and host, an about section, a schedule list, a map placeholder with a directions button, a sticky ticket card with a quantity stepper and total and a share button that copies the link
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <img
        :src="event.cover"
        :alt="event.title"
        class="aspect-[21/9] w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <div class="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <UiBadge variant="soft" color="blue" shape="pill">{{ event.category }}</UiBadge>
          <h1 class="mt-3 text-3xl font-bold tracking-tight">{{ event.title }}</h1>
          <ul class="text-muted-foreground mt-4 space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <Icon name="lucide:calendar" class="size-4" />{{ event.when }}
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="size-4" />{{ event.place }}
            </li>
          </ul>
          <div class="mt-5 flex items-center gap-3">
            <UiAvatar
              :src="`https://i.pravatar.cc/80?img=${event.host.avatar}`"
              :fallback="event.host.name.slice(0, 1)"
              class="size-9"
            />
            <p class="text-sm">
              Hosted by <span class="font-medium">{{ event.host.name }}</span>
            </p>
          </div>

          <section class="mt-10">
            <h2 class="text-lg font-semibold">About this event</h2>
            <p
              v-for="paragraph in event.about"
              :key="paragraph"
              class="text-muted-foreground mt-3 leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </section>

          <section class="mt-10">
            <h2 class="text-lg font-semibold">Schedule</h2>
            <ol class="mt-4 divide-y rounded-xl border">
              <li v-for="item in event.schedule" :key="item.time" class="flex gap-4 px-4 py-3">
                <span class="text-muted-foreground w-20 shrink-0 text-sm tabular-nums">{{
                  item.time
                }}</span>
                <div>
                  <p class="font-medium">{{ item.title }}</p>
                  <p class="text-muted-foreground text-sm">{{ item.speaker }}</p>
                </div>
              </li>
            </ol>
          </section>

          <section class="mt-10">
            <h2 class="text-lg font-semibold">Location</h2>
            <div
              class="bg-muted text-muted-foreground mt-4 grid aspect-[16/6] place-items-center rounded-xl border bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:20px_20px]"
            >
              <span
                class="bg-background flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm"
                ><Icon name="lucide:map-pin" class="text-primary size-4" />{{ event.place }}</span
              >
            </div>
            <UiButton
              variant="outline"
              size="sm"
              class="mt-3"
              @click="useSonner.info('Open directions in your map app')"
              ><Icon name="lucide:navigation" class="size-4" />Get directions</UiButton
            >
          </section>
        </div>

        <aside class="lg:sticky lg:top-6 lg:self-start">
          <UiCard class="gap-4">
            <UiCardHeader>
              <UiCardTitle class="text-2xl">{{
                event.price === 0 ? "Free" : money(event.price)
              }}</UiCardTitle>
              <UiCardDescription>{{ left }} of {{ event.capacity }} spots left</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <span id="ticket-qty" class="text-sm font-medium">Tickets</span>
                <div class="flex items-center gap-2" role="group" aria-labelledby="ticket-qty">
                  <UiButton
                    variant="outline"
                    size="icon-sm"
                    aria-label="Fewer tickets"
                    :disabled="quantity <= 1"
                    @click="quantity--"
                    ><Icon name="lucide:minus" class="size-4"
                  /></UiButton>
                  <span class="w-6 text-center tabular-nums" aria-live="polite">{{
                    quantity
                  }}</span>
                  <UiButton
                    variant="outline"
                    size="icon-sm"
                    aria-label="More tickets"
                    :disabled="quantity >= Math.min(left, 6)"
                    @click="quantity++"
                    ><Icon name="lucide:plus" class="size-4"
                  /></UiButton>
                </div>
              </div>
              <div class="flex justify-between border-t pt-4 font-semibold">
                <span>Total</span
                ><span class="tabular-nums">{{ money(event.price * quantity) }}</span>
              </div>
            </UiCardContent>
            <UiCardFooter class="flex-col gap-2">
              <UiButton
                class="w-full"
                @click="useSonner.success(`${quantity} ticket${quantity > 1 ? 's' : ''} reserved`)"
                >Reserve</UiButton
              >
              <UiButton variant="outline" class="w-full" @click="share"
                ><Icon :name="copied ? 'lucide:check' : 'lucide:share-2'" class="size-4" />{{
                  copied ? "Link copied" : "Share"
                }}</UiButton
              >
            </UiCardFooter>
          </UiCard>
        </aside>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type EventInfo = {
    title: string;
    category: string;
    cover: string;
    when: string;
    place: string;
    host: { name: string; avatar: number };
    about: string[];
    schedule: { time: string; title: string; speaker: string }[];
    price: number;
    capacity: number;
    booked: number;
  };

  const props = withDefaults(
    defineProps<{
      event?: EventInfo;
    }>(),
    {
      event: () => ({
        title: "Design Systems Meetup",
        category: "Meetup",
        cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
        when: "Thursday, November 5, 6:00 PM to 9:00 PM",
        place: "Northside Hall, 14 Mercer Street, New York",
        host: { name: "Maya Patel", avatar: 32 },
        about: [
          "An evening for people who build and maintain design systems. Three short talks, a long break to meet people and an open panel at the end.",
          "Bring a laptop if you want to join the workshop table. Food and drinks are included with every ticket.",
        ],
        schedule: [
          { time: "6:00 PM", title: "Doors open and welcome drinks", speaker: "Hosts" },
          { time: "6:30 PM", title: "Tokens that survive a rebrand", speaker: "Leo Fischer" },
          {
            time: "7:15 PM",
            title: "Documenting components people read",
            speaker: "Sofia Alvarez",
          },
          { time: "8:00 PM", title: "Open panel and questions", speaker: "All speakers" },
        ],
        price: 25,
        capacity: 120,
        booked: 96,
      }),
    }
  );

  const quantity = ref(1);
  const left = computed(() => props.event.capacity - props.event.booked);
  const money = (value: number) => `$${value.toFixed(2).replace(/\.00$/, "")}`;

  const { copy, copied } = useClipboard({ copiedDuring: 2000 });
  function share() {
    copy(`${window.location.origin}/events/design-systems-meetup`);
  }
</script>
