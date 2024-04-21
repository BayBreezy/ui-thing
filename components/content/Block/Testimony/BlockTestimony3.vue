<template>
  <UiContainer class="py-10 lg:py-16">
    <div class="py-10 lg:py-16">
      <div class="flex flex-col gap-y-6 lg:flex-row lg:gap-x-24">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Testimony user"
          class="h-[200px] w-[200px] shrink-0 rounded-lg object-cover shadow lg:h-[330px] lg:w-[330px]"
        />
        <div>
          <div>
            <template v-for="s in 5" :key="s">
              <Icon name="material-symbols:kid-star" class="h-5 w-5 text-yellow-400" />
            </template>
          </div>
          <h3 class="mb-8 mt-6 max-w-[760px] text-2xl font-semibold lg:text-4xl">
            Love the simplicity of the service and the prompt customer support. We can't imagine
            working without it.
          </h3>
          <p class="mt-4 text-lg font-semibold">Jane Doe</p>
          <p class="mt-1 text-muted-foreground">Head of Design, Layers</p>
        </div>
      </div>
    </div>
  </UiContainer>
</template>
