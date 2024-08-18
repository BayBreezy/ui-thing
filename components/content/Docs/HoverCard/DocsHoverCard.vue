<template>
  <div class="flex items-center justify-center">
    <UiHoverCard>
      <UiHoverCardTrigger as-child>
        <div
          class="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border bg-background shadow-sm"
        >
          <Icon name="logos:nuxt-icon" class="h-8 w-8" />
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="h-[460px] w-80 overflow-hidden rounded-lg p-0">
        <div class="group relative flex h-full w-full flex-col justify-end overflow-hidden">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 h-full w-full bg-black opacity-50" />
          <div
            class="relative h-[40%] w-full rounded-t-2xl bg-white p-4 text-slate-800 transition-all group-hover:h-[50%]"
          >
            <p class="text-lg font-semibold leading-none">John Doe</p>
            <small class="text-sm opacity-70"
              >Software Engineer @<a
                target="_blank"
                class="underline underline-offset-2"
                href="https://nuxt.com"
                >nuxtjs</a
              ></small
            >
            <p class="mt-2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima non, aut ab inventore
              quod pariatur iste.
            </p>

            <div class="mt-5 hidden transition-all group-hover:block">
              <UiButton class="w-full dark:bg-primary-foreground dark:text-primary"
                >View profile</UiButton
              >
            </div>
          </div>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
