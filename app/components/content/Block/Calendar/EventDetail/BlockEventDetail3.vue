<template>
  <!--
    RSVP card
    Features: Going, maybe and can not go choices, a guest stepper, a dietary note, live counts that update with your answer, who is going avatars and a saved state with a change answer button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-md gap-5">
      <UiCardHeader>
        <UiCardTitle>{{ event.title }}</UiCardTitle>
        <UiCardDescription>{{ event.when }}</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="space-y-5">
        <div v-if="!saved" class="space-y-5">
          <div class="space-y-2">
            <p id="rsvp-label" class="text-sm font-medium">Will you come?</p>
            <UiToggleGroup
              :model-value="answer"
              type="single"
              variant="outline"
              class="w-full"
              aria-labelledby="rsvp-label"
              @update:model-value="(value) => (answer = (value as Answer) || '')"
            >
              <UiToggleGroupItem value="going" class="flex-1"
                ><Icon name="lucide:check" class="size-4" />Going</UiToggleGroupItem
              >
              <UiToggleGroupItem value="maybe" class="flex-1"
                ><Icon name="lucide:circle-help" class="size-4" />Maybe</UiToggleGroupItem
              >
              <UiToggleGroupItem value="no" class="flex-1"
                ><Icon name="lucide:x" class="size-4" />Can not go</UiToggleGroupItem
              >
            </UiToggleGroup>
          </div>

          <div v-if="answer === 'going'" class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p id="guest-label" class="text-sm font-medium">Guests</p>
                <p class="text-muted-foreground text-xs">
                  Up to {{ event.maxGuests }} extra people
                </p>
              </div>
              <div class="flex items-center gap-2" role="group" aria-labelledby="guest-label">
                <UiButton
                  variant="outline"
                  size="icon-sm"
                  aria-label="Fewer guests"
                  :disabled="guests === 0"
                  @click="guests--"
                  ><Icon name="lucide:minus" class="size-4"
                /></UiButton>
                <span class="w-5 text-center tabular-nums" aria-live="polite">{{ guests }}</span>
                <UiButton
                  variant="outline"
                  size="icon-sm"
                  aria-label="More guests"
                  :disabled="guests >= event.maxGuests"
                  @click="guests++"
                  ><Icon name="lucide:plus" class="size-4"
                /></UiButton>
              </div>
            </div>
            <div class="space-y-2">
              <UiLabel for="rsvp-diet">Dietary needs (optional)</UiLabel>
              <UiInput id="rsvp-diet" v-model="diet" placeholder="Vegetarian, nut allergy" />
            </div>
          </div>

          <UiButton class="w-full" :disabled="!answer" @click="save">Send my answer</UiButton>
        </div>

        <div v-else class="bg-muted/50 rounded-xl p-4 text-center" role="status">
          <Icon :name="answerIcon" class="mx-auto size-6" />
          <p class="mt-2 font-medium">{{ summary }}</p>
          <UiButton variant="link" size="sm" @click="saved = false">Change my answer</UiButton>
        </div>

        <div class="border-t pt-5">
          <div class="grid grid-cols-3 text-center" aria-live="polite">
            <div v-for="item in counts" :key="item.label">
              <p class="text-2xl font-bold tabular-nums">{{ item.value }}</p>
              <p class="text-muted-foreground text-xs">{{ item.label }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2">
            <div class="flex -space-x-1.5">
              <UiAvatar
                v-for="person in event.going"
                :key="person"
                :src="`https://i.pravatar.cc/80?img=${person}`"
                fallback="?"
                class="ring-background size-7 ring-2"
              />
            </div>
            <span class="text-muted-foreground text-xs"
              >and {{ goingTotal - event.going.length }} others are going</span
            >
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Answer = "going" | "maybe" | "no" | "";

  const props = withDefaults(
    defineProps<{
      event?: {
        title: string;
        when: string;
        maxGuests: number;
        going: number[];
        counts: { going: number; maybe: number; no: number };
      };
    }>(),
    {
      event: () => ({
        title: "Team offsite dinner",
        when: "Friday, October 30, 7:00 PM",
        maxGuests: 3,
        going: [32, 12, 45, 15, 44],
        counts: { going: 24, maybe: 6, no: 3 },
      }),
    }
  );

  const answer = ref<Answer>("");
  const guests = ref(0);
  const diet = ref("");
  const saved = ref(false);

  const counts = computed(() => {
    const base = { ...props.event.counts };
    if (saved.value && answer.value)
      base[answer.value] += answer.value === "going" ? 1 + guests.value : 1;
    return [
      { label: "Going", value: base.going },
      { label: "Maybe", value: base.maybe },
      { label: "Can not go", value: base.no },
    ];
  });
  const goingTotal = computed(() => counts.value[0]!.value);

  const answerIcon = computed(
    () =>
      ({
        going: "lucide:party-popper",
        maybe: "lucide:circle-help",
        no: "lucide:heart-crack",
        "": "lucide:circle",
      })[answer.value]
  );
  const summary = computed(() => {
    if (answer.value === "going")
      return guests.value
        ? `You are going with ${guests.value} guest${guests.value > 1 ? "s" : ""}.`
        : "You are going.";
    if (answer.value === "maybe") return "You said maybe. We will keep a spot for you.";
    return "You can not make it. Thanks for letting us know.";
  });

  function save() {
    saved.value = true;
    useSonner.success("Answer sent");
  }
</script>
