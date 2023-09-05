<template>
  <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
    <div class="container flex h-14 items-center">
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="text-lg font-bold">UI Thing</NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink to="/" class="text-foreground/60 transition-colors hover:text-foreground"
            >Components</NuxtLink
          >
          <UIDropdownMenu>
            <UIDropdownMenuTrigger>
              <div
                class="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
              >
                <span>Examples</span>
                <Icon name="heroicons:chevron-down" class="h-3 w-3" />
              </div>
            </UIDropdownMenuTrigger>
            <UIDropdownMenuContent align="start" :side-offset="5">
              <UIDropdownMenuItem as-child>
                <NuxtLink class="cursor-pointer hover:bg-muted" to="/examples/cards"
                  >Cards</NuxtLink
                >
              </UIDropdownMenuItem>
            </UIDropdownMenuContent>
          </UIDropdownMenu>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>
