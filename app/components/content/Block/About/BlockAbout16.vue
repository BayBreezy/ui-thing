<template>
  <!-- 
    Team Carousel About Section
    Features: Team showcase with navigation
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Meet Our Team</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        The talented people behind our success
      </p>
    </div>

    <div class="mt-12">
      <swiper-container ref="swiperRef" :modules="[Autoplay]">
        <swiper-slide v-for="member in teamMembers" :key="member.name">
          <UiCard class="group pt-0">
            <div class="h-[300px] overflow-hidden rounded-t-xl">
              <img
                :src="member.image"
                :alt="member.name"
                class="size-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <UiCardContent>
              <h3 class="font-semibold">{{ member.name }}</h3>
              <p class="text-sm text-primary">{{ member.role }}</p>
              <p class="mt-2 text-xs text-muted-foreground">{{ member.department }}</p>
              <div class="mt-3 flex gap-2">
                <a
                  v-for="social in member.socials"
                  :key="social.platform"
                  :href="social.url"
                  class="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon :name="social.icon" class="size-4" />
                </a>
              </div>
            </UiCardContent>
          </UiCard>
        </swiper-slide>
      </swiper-container>

      <div class="mt-8 flex items-center gap-4">
        <UiButton
          :disabled="swiper.isBeginning.value"
          variant="outline"
          size="icon"
          class="size-11 rounded-full"
          @click="swiper.prev()"
        >
          <Icon name="lucide:chevron-left" class="size-4" />
        </UiButton>
        <UiButton
          :disabled="swiper.isEnd.value"
          variant="outline"
          size="icon"
          class="size-11 rounded-full"
          @click="swiper.next()"
        >
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiButton>
      </div>
    </div>

    <div class="mx-auto mt-12 max-w-2xl text-center">
      <h3 class="text-xl font-bold">Join Our Growing Team</h3>
      <p class="mt-2 text-muted-foreground">
        We're always looking for talented individuals who share our passion for innovation and
        excellence.
      </p>
      <UiButton class="mt-6">View Open Positions</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Autoplay } from "swiper/modules";

  const teamMembers = [
    {
      name: "Alice Cooper",
      role: "Senior Designer",
      department: "Design Team",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Bob Anderson",
      role: "Lead Engineer",
      department: "Engineering",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      socials: [
        { platform: "github", icon: "simple-icons:github", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Carol Smith",
      role: "Product Manager",
      department: "Product",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      socials: [
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
        { platform: "twitter", icon: "logos:twitter", url: "#" },
      ],
    },
    {
      name: "David Lee",
      role: "Marketing Director",
      department: "Marketing",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Emma White",
      role: "Data Scientist",
      department: "Analytics",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      socials: [
        { platform: "github", icon: "simple-icons:github", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Frank Green",
      role: "Customer Success",
      department: "Support",
      image: "https://randomuser.me/api/portraits/men/49.jpg",
      socials: [{ platform: "linkedin", icon: "logos:linkedin-icon", url: "#" }],
    },
    {
      name: "Grace Kim",
      role: "UX Researcher",
      department: "Research",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      socials: [
        { platform: "twitter", icon: "logos:twitter", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
    {
      name: "Henry Black",
      role: "DevOps Engineer",
      department: "Operations",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      socials: [
        { platform: "github", icon: "simple-icons:github", url: "#" },
        { platform: "linkedin", icon: "logos:linkedin-icon", url: "#" },
      ],
    },
  ];

  const swiperRef = ref(null);
  const swiper = useSwiper(swiperRef, {
    slidesPerView: 1.2,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 800,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
        slidesPerGroup: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },
    },
  });
</script>
