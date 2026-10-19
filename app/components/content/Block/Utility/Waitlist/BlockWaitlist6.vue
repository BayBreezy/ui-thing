<template>
  <!--
    Waitlist with social proof
    Features: Overlapping avatar stack with signup count, join form, rotating testimonial with previous and next controls, trust points
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl text-center">
      <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div class="flex -space-x-2" aria-hidden="true">
          <UiAvatar
            v-for="person in people"
            :key="person.name"
            class="ring-background size-9 ring-2"
          >
            <UiAvatarImage :src="person.avatar" :alt="person.name" />
            <UiAvatarFallback>{{ person.name.slice(0, 1) }}</UiAvatarFallback>
          </UiAvatar>
        </div>
        <p class="text-muted-foreground text-sm">
          Joined by
          <span class="text-foreground font-semibold">{{ count.toLocaleString("en-US") }}</span>
          people this month
        </p>
      </div>

      <h1 class="mt-6 text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>
      <p class="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">{{ description }}</p>

      <form v-if="!joined" class="mx-auto mt-8 max-w-md" novalidate @submit.prevent="join">
        <div class="flex flex-col gap-2 sm:flex-row">
          <UiLabel for="proof-email" class="sr-only">Email address</UiLabel>
          <UiInput
            id="proof-email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            class="h-10 flex-1"
            :aria-invalid="!!error"
          />
          <UiButton type="submit" size="lg">Join the waitlist</UiButton>
        </div>
        <p v-if="error" class="text-destructive mt-2 text-left text-sm">{{ error }}</p>
      </form>
      <p v-else class="mt-8 flex items-center justify-center gap-2 font-medium" role="status">
        <Icon name="lucide:circle-check" class="text-primary size-5" />
        You are on the list. Check your inbox.
      </p>

      <figure
        class="bg-muted/50 mx-auto mt-12 max-w-2xl rounded-xl border p-6 text-left"
        aria-live="polite"
      >
        <blockquote class="text-lg leading-relaxed">“{{ quotes[current]!.text }}”</blockquote>
        <figcaption class="mt-4 flex items-center justify-between gap-3">
          <span class="flex items-center gap-3">
            <UiAvatar class="size-10">
              <UiAvatarImage :src="quotes[current]!.avatar" :alt="quotes[current]!.name" />
              <UiAvatarFallback>{{ quotes[current]!.name.slice(0, 1) }}</UiAvatarFallback>
            </UiAvatar>
            <span class="text-sm">
              <span class="block font-medium">{{ quotes[current]!.name }}</span>
              <span class="text-muted-foreground block">{{ quotes[current]!.role }}</span>
            </span>
          </span>
          <span class="flex items-center gap-1">
            <UiButton variant="outline" size="icon-sm" aria-label="Previous quote" @click="step(-1)"
              ><Icon name="lucide:chevron-left" class="size-4"
            /></UiButton>
            <span class="text-muted-foreground w-10 text-center text-xs tabular-nums"
              >{{ current + 1 }} / {{ quotes.length }}</span
            >
            <UiButton variant="outline" size="icon-sm" aria-label="Next quote" @click="step(1)"
              ><Icon name="lucide:chevron-right" class="size-4"
            /></UiButton>
          </span>
        </figcaption>
      </figure>

      <ul class="text-muted-foreground mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <li v-for="point in points" :key="point" class="flex items-center gap-2">
          <Icon name="lucide:shield-check" class="size-4" />{{ point }}
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Person = { name: string; avatar: string };
  type Quote = Person & { role: string; text: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      count?: number;
      people?: Person[];
      quotes?: Quote[];
      points?: string[];
    }>(),
    {
      title: "Be first in line for Orbit",
      description:
        "Teams from small studios to large startups are already waiting for their invite.",
      count: 4280,
      people: () => [
        { name: "Maya", avatar: "https://i.pravatar.cc/80?img=47" },
        { name: "Leo", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Sana", avatar: "https://i.pravatar.cc/80?img=32" },
        { name: "Omar", avatar: "https://i.pravatar.cc/80?img=15" },
        { name: "Priya", avatar: "https://i.pravatar.cc/80?img=45" },
      ],
      quotes: () => [
        {
          name: "Maya Chen",
          role: "Head of Product, Fernwood",
          avatar: "https://i.pravatar.cc/80?img=47",
          text: "The beta replaced three tools for us in the first week. I would not go back.",
        },
        {
          name: "Leo Martins",
          role: "Founder, Tilework",
          avatar: "https://i.pravatar.cc/80?img=12",
          text: "Planning used to take a day. With Orbit it takes the length of a coffee.",
        },
        {
          name: "Sana Ali",
          role: "Design lead, Paperboat",
          avatar: "https://i.pravatar.cc/80?img=32",
          text: "Finally a tool my whole team opens without being asked.",
        },
      ],
      points: () => ["No credit card", "Unsubscribe any time", "Your email is never shared"],
    }
  );

  const email = ref("");
  const error = ref("");
  const joined = ref(false);
  const current = ref(0);

  function step(by: number) {
    const total = props.quotes.length;
    current.value = (current.value + by + total) % total;
  }

  function join() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    joined.value = true;
  }
</script>
