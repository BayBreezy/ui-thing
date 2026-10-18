<template>
  <!--
    Job detail page
    Features: Role header with meta chips, about, responsibilities and requirements lists, sticky apply card with salary and benefits, copy link share button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <UiButton variant="ghost" size="sm" class="-ml-3">
        <Icon name="lucide:arrow-left" class="size-4" />All open roles
      </UiButton>

      <div class="mt-4 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <article class="min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <UiBadge variant="soft" color="primary">{{ job.department }}</UiBadge>
            <span class="text-muted-foreground text-sm">Posted {{ job.posted }}</span>
          </div>
          <h1 class="mt-3 text-3xl font-bold lg:text-4xl">{{ job.title }}</h1>
          <ul class="text-muted-foreground mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li class="flex items-center gap-1.5">
              <Icon name="lucide:map-pin" class="size-4" />{{ job.location }}
            </li>
            <li class="flex items-center gap-1.5">
              <Icon name="lucide:briefcase" class="size-4" />{{ job.type }}
            </li>
            <li class="flex items-center gap-1.5">
              <Icon name="lucide:users" class="size-4" />{{ job.team }}
            </li>
          </ul>

          <UiSeparator class="my-8" />

          <section class="space-y-8">
            <div>
              <h2 class="text-xl font-semibold">About the role</h2>
              <p class="text-muted-foreground mt-3 leading-relaxed">{{ job.about }}</p>
            </div>
            <div>
              <h2 class="text-xl font-semibold">What you will do</h2>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="item in job.responsibilities"
                  :key="item"
                  class="text-muted-foreground flex gap-3"
                >
                  <Icon name="lucide:circle-check" class="text-primary mt-0.5 size-5 shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="text-xl font-semibold">What we are looking for</h2>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="item in job.requirements"
                  :key="item"
                  class="text-muted-foreground flex gap-3"
                >
                  <Icon name="lucide:dot" class="mt-0.5 size-5 shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </section>
        </article>

        <aside class="lg:sticky lg:top-6 lg:self-start">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>{{ job.salary }}</UiCardTitle>
              <UiCardDescription>Base salary, plus equity</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <ul class="space-y-2 text-sm">
                <li v-for="benefit in job.benefits" :key="benefit" class="flex items-center gap-2">
                  <Icon name="lucide:check" class="text-primary size-4 shrink-0" />{{ benefit }}
                </li>
              </ul>
              <UiButton class="w-full" size="lg">Apply for this role</UiButton>
              <UiButton variant="outline" class="w-full" @click="copy(link)">
                <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4" />
                {{ copied ? "Link copied" : "Copy link" }}
              </UiButton>
            </UiCardContent>
          </UiCard>
        </aside>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Job = {
    title: string;
    department: string;
    team: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    about: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };

  withDefaults(
    defineProps<{
      job?: Job;
      link?: string;
    }>(),
    {
      job: () => ({
        title: "Senior Product Designer",
        department: "Design",
        team: "Product Design team of 8",
        location: "Remote (Europe)",
        type: "Full-time",
        salary: "$110k to $135k",
        posted: "2 days ago",
        about:
          "You will own the design of our workflow builder, from the first sketch to the shipped interface. You will pair with engineers every week and talk to customers often, so decisions rest on what people actually do.",
        responsibilities: [
          "Lead end-to-end design for new product areas",
          "Run discovery interviews and turn findings into clear bets",
          "Contribute components and patterns to our shared design system",
          "Mentor mid-level designers through critique and pairing",
        ],
        requirements: [
          "5 or more years designing complex web products",
          "A portfolio that shows your reasoning, not just final screens",
          "Comfort prototyping in code or close collaboration with those who do",
          "Clear written communication across time zones",
        ],
        benefits: [
          "Four-day work week in summer",
          "Home office and learning budget",
          "26 days paid time off",
          "Private health cover",
        ],
      }),
      link: "https://careers.example.com/roles/senior-product-designer",
    }
  );

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });
</script>
