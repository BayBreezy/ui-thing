<template>
  <!--
    Hover profile cards
    Features: Mentions in a comment that open a profile card on hover or keyboard focus, follow button inside the card, follower count that updates, avatar group of contributors
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl">
      <UiCardHeader>
        <UiCardTitle>Project retrospective</UiCardTitle>
        <UiCardDescription>Hover or focus a name to see who they are.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="space-y-5">
        <p class="leading-relaxed">
          Big thanks to
          <template v-for="(person, index) in people" :key="person.handle">
            <UiHoverCard :open-delay="150">
              <UiHoverCardTrigger as-child>
                <a
                  href="#profile"
                  class="text-primary font-medium underline-offset-4 hover:underline focus-visible:underline"
                  @click.prevent
                  >@{{ person.handle }}</a
                >
              </UiHoverCardTrigger>
              <UiHoverCardContent class="w-72">
                <div class="flex items-start gap-3">
                  <UiAvatar class="size-12">
                    <UiAvatarImage :src="person.avatar" :alt="person.name" />
                    <UiAvatarFallback>{{ person.name.slice(0, 1) }}</UiAvatarFallback>
                  </UiAvatar>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold">{{ person.name }}</p>
                    <p class="text-muted-foreground text-sm">@{{ person.handle }}</p>
                  </div>
                  <UiButton
                    size="xs"
                    :variant="followed.has(person.handle) ? 'outline' : 'default'"
                    :aria-pressed="followed.has(person.handle)"
                    @click="toggle(person.handle)"
                  >
                    {{ followed.has(person.handle) ? "Following" : "Follow" }}
                  </UiButton>
                </div>
                <p class="mt-3 text-sm">{{ person.bio }}</p>
                <p class="text-muted-foreground mt-3 flex items-center gap-4 text-xs">
                  <span class="flex items-center gap-1"
                    ><Icon name="lucide:map-pin" class="size-3.5" />{{ person.location }}</span
                  >
                  <span class="flex items-center gap-1"
                    ><Icon name="lucide:users" class="size-3.5" />{{
                      followers(person)
                    }}
                    followers</span
                  >
                </p>
              </UiHoverCardContent>
            </UiHoverCard>
            <template v-if="index < people.length - 2">, </template>
            <template v-else-if="index === people.length - 2"> and </template>
          </template>
          for shipping the new editor on time. The team handled three launches in a single quarter.
        </p>

        <div class="flex items-center gap-3 border-t pt-4">
          <UiAvatarGroup>
            <UiAvatar v-for="person in people" :key="person.handle" class="size-8">
              <UiAvatarImage :src="person.avatar" :alt="person.name" />
              <UiAvatarFallback>{{ person.name.slice(0, 1) }}</UiAvatarFallback>
            </UiAvatar>
          </UiAvatarGroup>
          <p class="text-muted-foreground text-sm">{{ people.length }} contributors</p>
        </div>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Person = {
    name: string;
    handle: string;
    avatar: string;
    bio: string;
    location: string;
    followers: number;
  };

  withDefaults(
    defineProps<{
      people?: Person[];
    }>(),
    {
      people: () => [
        {
          name: "Maya Chen",
          handle: "mayachen",
          avatar: "https://i.pravatar.cc/120?img=47",
          bio: "Design lead. Loves quiet interfaces and good typography.",
          location: "Lisbon",
          followers: 1284,
        },
        {
          name: "Leo Martins",
          handle: "leomartins",
          avatar: "https://i.pravatar.cc/120?img=12",
          bio: "Staff engineer building the real time engine.",
          location: "São Paulo",
          followers: 960,
        },
        {
          name: "Sana Ali",
          handle: "sanaali",
          avatar: "https://i.pravatar.cc/120?img=32",
          bio: "Product manager. Talks to customers more than is healthy.",
          location: "Toronto",
          followers: 2105,
        },
      ],
    }
  );

  const followed = ref(new Set<string>());

  function toggle(handle: string) {
    const next = new Set(followed.value);
    if (next.has(handle)) next.delete(handle);
    else next.add(handle);
    followed.value = next;
  }

  function followers(person: Person) {
    return (person.followers + (followed.value.has(person.handle) ? 1 : 0)).toLocaleString("en-US");
  }
</script>
