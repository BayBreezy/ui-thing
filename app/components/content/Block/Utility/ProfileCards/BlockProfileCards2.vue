<template>
  <!--
    Team member cards
    Features: Department filter, photo cards with role and short bio, social links with labels, email copy button, empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">Meet the team</h2>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
          A small group of people who care a lot about the details.
        </p>
      </div>

      <div
        class="mt-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter by department"
      >
        <UiButton
          v-for="item in ['All', ...departments]"
          :key="item"
          size="sm"
          class="rounded-full"
          :variant="department === item ? 'default' : 'outline'"
          :aria-pressed="department === item"
          @click="department = item"
        >
          {{ item }}
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-4 text-center text-sm" role="status">
        {{ visible.length }} {{ visible.length === 1 ? "person" : "people" }}
      </p>

      <ul class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="member in visible" :key="member.name">
          <UiCard class="h-full gap-0 overflow-hidden py-0">
            <img
              :src="member.photo"
              :alt="`Portrait of ${member.name}`"
              class="aspect-4/3 w-full object-cover"
              loading="lazy"
            />
            <div class="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h3 class="font-semibold">{{ member.name }}</h3>
                <p class="text-muted-foreground text-sm">{{ member.role }}</p>
              </div>
              <p class="text-muted-foreground text-sm">{{ member.bio }}</p>
              <div class="mt-auto flex items-center justify-between gap-2 pt-1">
                <div class="flex gap-1">
                  <UiButton
                    v-for="link in member.links"
                    :key="link.label"
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`${member.name} on ${link.label}`"
                  >
                    <Icon :name="link.icon" class="size-4" />
                  </UiButton>
                </div>
                <UiButton variant="outline" size="sm" @click="copyEmail(member)">
                  <Icon
                    :name="copiedFor === member.name ? 'lucide:check' : 'lucide:mail'"
                    class="size-4"
                  />
                  {{ copiedFor === member.name ? "Copied" : "Email" }}
                </UiButton>
              </div>
            </div>
          </UiCard>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Link = { label: string; icon: string };
  type Member = {
    name: string;
    role: string;
    department: string;
    bio: string;
    email: string;
    photo: string;
    links: Link[];
  };

  const props = withDefaults(
    defineProps<{
      members?: Member[];
    }>(),
    {
      members: () => {
        const links: Link[] = [
          { label: "LinkedIn", icon: "lucide:linkedin" },
          { label: "X", icon: "lucide:twitter" },
          { label: "GitHub", icon: "lucide:github" },
        ];

        return [
          {
            name: "Maya Chen",
            role: "Head of Design",
            department: "Design",
            bio: "Leads product design and our shared design system.",
            email: "maya@example.com",
            photo:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
            links: links.slice(0, 2),
          },
          {
            name: "Leo Martins",
            role: "Staff Engineer",
            department: "Engineering",
            bio: "Builds the real time engine and keeps the pager quiet.",
            email: "leo@example.com",
            photo:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            links,
          },
          {
            name: "Sana Ali",
            role: "Product Manager",
            department: "Product",
            bio: "Talks to customers every week and writes the roadmap.",
            email: "sana@example.com",
            photo:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
            links: links.slice(0, 2),
          },
          {
            name: "Omar Haddad",
            role: "Frontend Engineer",
            department: "Engineering",
            bio: "Cares about performance, accessibility and good defaults.",
            email: "omar@example.com",
            photo:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
            links: [links[2]!],
          },
          {
            name: "Priya Nair",
            role: "Brand Designer",
            department: "Design",
            bio: "Shapes how the company looks, sounds and feels.",
            email: "priya@example.com",
            photo:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
            links: links.slice(0, 2),
          },
          {
            name: "Tom Becker",
            role: "Customer Success Lead",
            department: "Support",
            bio: "Makes sure every customer gets a human reply fast.",
            email: "tom@example.com",
            photo:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
            links: [links[0]!],
          },
        ];
      },
    }
  );

  const department = ref("All");
  const copiedFor = ref("");
  const departments = computed(() => [
    ...new Set(props.members.map((member) => member.department)),
  ]);
  const visible = computed(() =>
    department.value === "All"
      ? props.members
      : props.members.filter((member) => member.department === department.value)
  );

  const { copy } = useClipboard();
  async function copyEmail(member: Member) {
    await copy(member.email);
    copiedFor.value = member.name;
    setTimeout(() => {
      if (copiedFor.value === member.name) copiedFor.value = "";
    }, 1500);
  }
</script>
