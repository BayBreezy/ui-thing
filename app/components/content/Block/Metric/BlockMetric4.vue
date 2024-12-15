<template>
  <UiContainer class="py-10 lg:py-20">
    <p class="mb-3 text-center font-semibold text-primary lg:text-left">Launch faster</p>
    <h3 class="mb-4 text-center text-3xl font-semibold lg:mb-5 lg:text-left lg:text-4xl">
      Build something great
    </h3>
    <p
      class="mb-10 max-w-[760px] text-center text-lg text-muted-foreground lg:mb-16 lg:text-left lg:text-xl"
    >
      Everything you need to build modern UI and great products. We've done all the heavy lifting so
      you don't have to — the perfect starting point for any project.
    </p>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:py-16">
      <div
        class="grid grid-cols-1 place-items-center gap-5 gap-y-10 py-10 text-center md:grid-cols-2 lg:text-left"
      >
        <template v-for="(s, i) in stats" :key="i">
          <div>
            <h4 class="mb-2 text-5xl font-bold text-primary lg:mb-3 lg:text-6xl">
              {{ s.value }}
            </h4>
            <p class="text-lg font-medium">
              {{ s.text }}
            </p>
            <p class="mt-2 line-clamp-2 hidden text-muted-foreground lg:block">
              Lorem ipsum, dolor sit amet consectetur adipisicing e
            </p>
          </div>
        </template>
      </div>
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Share team inboxes feature"
        class="h-[300px] w-full rounded-lg object-cover shadow-sm lg:h-[520px]"
      />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Projects completed", value: "230+" },
    { text: "Return on investment", value: "600%" },
    { text: "Global downloads", value: "10K" },
    { text: "5-star reviews", value: "200+" },
  ];
</script>
