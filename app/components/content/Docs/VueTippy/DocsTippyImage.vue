<template>
  <div class="flex flex-col items-center gap-20">
    <Tippy max-width="290px" interactive>
      <UiButton variant="outline">W/ Image</UiButton>
      <template #content>
        <div class="space-y-2 p-2">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            class="h-[150px] w-full rounded"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=50&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="382"
            height="216"
            alt="Content image"
          />
          <div class="space-y-1">
            <p class="text-[13px] font-medium">Tooltip with title and icon</p>
            <p class="text-xs text-muted-foreground">
              Tooltips are made to be highly customizable, with features like dynamic placement,
              rich content, and a robust API.
            </p>
          </div>
        </div>
      </template>
    </Tippy>
  </div>
</template>
