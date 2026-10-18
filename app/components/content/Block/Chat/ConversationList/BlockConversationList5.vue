<template>
  <!--
    Team channels and direct messages sidebar
    Features: Collapsible channels and direct messages sections, hash icons, unread channels in bold with a count, presence dots on people, a create channel action and a selected row
  -->
  <UiContainer class="py-12 lg:py-20">
    <nav
      class="bg-muted/30 mx-auto w-72 overflow-hidden rounded-xl border"
      aria-label="Conversations"
    >
      <div class="flex items-center gap-2 border-b px-4 py-3 font-semibold">
        <span class="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md">
          <Icon name="lucide:layers" class="size-4" />
        </span>
        {{ team }}
      </div>

      <UiCollapsible v-model:open="channelsOpen" class="px-2 py-3">
        <div class="flex items-center justify-between px-2">
          <UiCollapsibleTrigger as-child>
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-semibold tracking-wide uppercase"
            >
              <Icon
                name="lucide:chevron-down"
                class="size-3.5 transition-transform"
                :class="channelsOpen ? '' : '-rotate-90'"
              />
              Channels
            </button>
          </UiCollapsibleTrigger>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-6"
            aria-label="Create channel"
            @click="useSonner.info('Open your create channel dialog here')"
          >
            <Icon name="lucide:plus" class="size-3.5" />
          </UiButton>
        </div>
        <UiCollapsibleContent>
          <ul class="mt-1 space-y-0.5">
            <li v-for="channel in channels" :key="channel.name">
              <button
                type="button"
                class="hover:bg-accent focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus-visible:ring-[3px]"
                :class="[
                  active === channel.name ? 'bg-accent' : '',
                  channel.unread ? 'font-semibold' : 'text-muted-foreground',
                ]"
                :aria-current="active === channel.name ? 'true' : undefined"
                @click="select(channel)"
              >
                <Icon name="lucide:hash" class="size-4 shrink-0" />
                <span class="flex-1 truncate text-left">{{ channel.name }}</span>
                <UiBadge v-if="channel.unread" shape="pill">
                  {{ channel.unread }}
                  <span class="sr-only">unread messages</span>
                </UiBadge>
              </button>
            </li>
          </ul>
        </UiCollapsibleContent>
      </UiCollapsible>

      <UiCollapsible v-model:open="peopleOpen" class="px-2 pb-3">
        <div class="px-2">
          <UiCollapsibleTrigger as-child>
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-semibold tracking-wide uppercase"
            >
              <Icon
                name="lucide:chevron-down"
                class="size-3.5 transition-transform"
                :class="peopleOpen ? '' : '-rotate-90'"
              />
              Direct messages
            </button>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent>
          <ul class="mt-1 space-y-0.5">
            <li v-for="person in people" :key="person.name">
              <button
                type="button"
                class="hover:bg-accent focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus-visible:ring-[3px]"
                :class="active === person.name ? 'bg-accent' : ''"
                @click="active = person.name"
              >
                <span class="relative">
                  <UiAvatar :src="person.avatar" :fallback="person.name[0]" class="size-6" />
                  <span
                    class="ring-background absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2"
                    :class="person.online ? 'bg-green-500' : 'bg-muted-foreground/40'"
                  />
                </span>
                <span class="flex-1 truncate text-left">{{ person.name }}</span>
                <span class="sr-only">{{ person.online ? "Online" : "Offline" }}</span>
              </button>
            </li>
          </ul>
        </UiCollapsibleContent>
      </UiCollapsible>
    </nav>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Channel = { name: string; unread: number };
  type Person = { name: string; avatar: string; online: boolean };

  withDefaults(
    defineProps<{
      team?: string;
    }>(),
    { team: "Acme" }
  );

  const channels = ref<Channel[]>([
    { name: "general", unread: 0 },
    { name: "design", unread: 4 },
    { name: "engineering", unread: 0 },
    { name: "launch-plan", unread: 2 },
    { name: "random", unread: 0 },
  ]);

  const people: Person[] = [
    { name: "Sofia Alvarez", avatar: "https://i.pravatar.cc/80?img=32", online: true },
    { name: "Liam Carter", avatar: "https://i.pravatar.cc/80?img=12", online: true },
    { name: "Noah Williams", avatar: "https://i.pravatar.cc/80?img=15", online: false },
    { name: "Aisha Khan", avatar: "https://i.pravatar.cc/80?img=44", online: false },
  ];

  const channelsOpen = ref(true);
  const peopleOpen = ref(true);
  const active = ref("general");

  function select(channel: Channel) {
    active.value = channel.name;
    channel.unread = 0;
  }
</script>
