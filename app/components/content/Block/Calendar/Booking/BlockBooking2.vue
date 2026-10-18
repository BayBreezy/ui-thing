<template>
  <!--
    Service selection with staff and add ons
    Features: Radio cards for each service with duration and price, a choice of staff member with an any available option, optional add ons that change the total and a sticky summary with the total time and price
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_20rem]">
      <div class="space-y-10">
        <section>
          <h1 class="text-2xl font-bold tracking-tight">Book an appointment</h1>
          <p class="text-muted-foreground mt-1 text-sm">Choose a service to get started.</p>
          <UiRadioGroup v-model="serviceId" class="mt-5 grid gap-3" aria-label="Service">
            <label
              v-for="service in services"
              :key="service.id"
              class="hover:bg-accent/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
            >
              <UiRadioGroupItem :value="service.id" class="mt-1" />
              <span class="min-w-0 flex-1">
                <span class="block font-medium">{{ service.name }}</span>
                <span class="text-muted-foreground block text-sm">{{ service.blurb }}</span>
                <span class="text-muted-foreground mt-1 block text-xs"
                  >{{ service.minutes }} min</span
                >
              </span>
              <span class="font-semibold tabular-nums">{{ money(service.price) }}</span>
            </label>
          </UiRadioGroup>
        </section>

        <section>
          <h2 class="font-semibold">Who would you like to see?</h2>
          <UiRadioGroup
            v-model="staffId"
            class="mt-3 grid gap-3 sm:grid-cols-2"
            aria-label="Staff member"
          >
            <label
              v-for="person in team"
              :key="person.id"
              class="hover:bg-accent/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors"
            >
              <UiAvatar
                v-if="person.avatar"
                :src="`https://i.pravatar.cc/80?img=${person.avatar}`"
                :fallback="person.name.slice(0, 1)"
                class="size-9"
              />
              <span v-else class="bg-muted grid size-9 place-items-center rounded-full"
                ><Icon name="lucide:users" class="size-4"
              /></span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-medium">{{ person.name }}</span>
                <span class="text-muted-foreground block truncate text-xs">{{ person.role }}</span>
              </span>
              <UiRadioGroupItem :value="person.id" />
            </label>
          </UiRadioGroup>
        </section>

        <section>
          <h2 class="font-semibold">Add ons</h2>
          <ul class="mt-3 space-y-2">
            <li
              v-for="extra in addOns"
              :key="extra.id"
              class="flex items-center gap-3 rounded-lg border px-4 py-3"
            >
              <UiCheckbox
                :id="`extra-${extra.id}`"
                :model-value="picked.includes(extra.id)"
                @update:model-value="toggle(extra.id)"
              />
              <UiLabel :for="`extra-${extra.id}`" class="flex-1 cursor-pointer font-normal">
                {{ extra.name
                }}<span class="text-muted-foreground ml-2 text-xs">+{{ extra.minutes }} min</span>
              </UiLabel>
              <span class="text-sm tabular-nums">+{{ money(extra.price) }}</span>
            </li>
          </ul>
        </section>
      </div>

      <aside class="lg:sticky lg:top-6 lg:self-start">
        <UiCard class="gap-4">
          <UiCardHeader>
            <UiCardTitle class="text-base">Your appointment</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-3 text-sm" aria-live="polite">
            <div class="flex justify-between gap-3">
              <span>{{ selected.name }}</span>
              <span class="tabular-nums">{{ money(selected.price) }}</span>
            </div>
            <div
              v-for="extra in chosenAddOns"
              :key="extra.id"
              class="text-muted-foreground flex justify-between gap-3"
            >
              <span>{{ extra.name }}</span>
              <span class="tabular-nums">{{ money(extra.price) }}</span>
            </div>
            <UiSeparator />
            <div class="text-muted-foreground flex justify-between">
              <span>With</span><span>{{ staff.name }}</span>
            </div>
            <div class="text-muted-foreground flex justify-between">
              <span>Total time</span><span>{{ totalMinutes }} min</span>
            </div>
            <div class="flex justify-between text-base font-semibold">
              <span>Total</span><span class="tabular-nums">{{ money(total) }}</span>
            </div>
          </UiCardContent>
          <UiCardFooter>
            <UiButton
              class="w-full"
              @click="useSonner.success(`${selected.name} selected, pick a time next`)"
              >Choose a time</UiButton
            >
          </UiCardFooter>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Service = { id: string; name: string; blurb: string; minutes: number; price: number };
  type Person = { id: string; name: string; role: string; avatar?: number };
  type AddOn = { id: string; name: string; minutes: number; price: number };

  const props = withDefaults(
    defineProps<{
      services?: Service[];
      team?: Person[];
      addOns?: AddOn[];
    }>(),
    {
      services: () => [
        {
          id: "cut",
          name: "Haircut and style",
          blurb: "Consultation, wash, cut and blow dry.",
          minutes: 45,
          price: 55,
        },
        {
          id: "color",
          name: "Color and gloss",
          blurb: "Full color with a gloss finish and a treatment.",
          minutes: 120,
          price: 140,
        },
        {
          id: "beard",
          name: "Beard trim",
          blurb: "Shape, trim and a hot towel finish.",
          minutes: 20,
          price: 25,
        },
        {
          id: "kids",
          name: "Kids cut",
          blurb: "For ages twelve and under.",
          minutes: 30,
          price: 30,
        },
      ],
      team: () => [
        { id: "any", name: "Any available", role: "The first free stylist" },
        { id: "maya", name: "Maya Patel", role: "Senior stylist", avatar: 32 },
        { id: "leo", name: "Leo Fischer", role: "Barber", avatar: 12 },
        { id: "sofia", name: "Sofia Alvarez", role: "Color specialist", avatar: 45 },
      ],
      addOns: () => [
        { id: "scalp", name: "Scalp massage", minutes: 10, price: 15 },
        { id: "mask", name: "Deep conditioning mask", minutes: 15, price: 20 },
      ],
    }
  );

  const serviceId = ref(props.services[0]?.id ?? "");
  const staffId = ref(props.team[0]?.id ?? "");
  const picked = ref<string[]>([]);

  const selected = computed(
    () => props.services.find((item) => item.id === serviceId.value) ?? props.services[0]!
  );
  const staff = computed(
    () => props.team.find((item) => item.id === staffId.value) ?? props.team[0]!
  );
  const chosenAddOns = computed(() =>
    props.addOns.filter((item) => picked.value.includes(item.id))
  );
  const totalMinutes = computed(
    () => selected.value.minutes + chosenAddOns.value.reduce((sum, item) => sum + item.minutes, 0)
  );
  const total = computed(
    () => selected.value.price + chosenAddOns.value.reduce((sum, item) => sum + item.price, 0)
  );

  const money = (value: number) => `$${value}`;

  function toggle(id: string) {
    picked.value = picked.value.includes(id)
      ? picked.value.filter((item) => item !== id)
      : [...picked.value, id];
  }
</script>
