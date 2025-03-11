<template>
  <div class="text-center">
    <UiDrawer v-model:open="isOpen">
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">View image</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-screen-md rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Image</UiDrawerTitle>
          <UiDrawerDescription>
            Right click on the image to see the context menu. This drawer seems to not have the pull
            down issue.
          </UiDrawerDescription>

          <div class="relative min-h-[400px]">
            <UiAspectRatio :ratio="16 / 9" class="mt-6">
              <UiContextMenu>
                <UiContextMenuTrigger as-child>
                  <!-- eslint-disable-next-line vue/html-self-closing -->
                  <img
                    src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
                    alt="Snow Lake"
                    class="h-full w-full rounded-md object-cover"
                  />
                </UiContextMenuTrigger>
                <UiContextMenuContent class="w-[150px]">
                  <UiContextMenuGroup>
                    <UiContextMenuItem @select="showMessage('Now sharing...')"
                      >Share</UiContextMenuItem
                    >
                    <UiContextMenuItem @select="showMessage('Moving image...')"
                      >Move</UiContextMenuItem
                    >
                    <UiContextMenuItem
                      @select="showMessage('Please hold as we rename the image...')"
                      >Rename</UiContextMenuItem
                    >
                  </UiContextMenuGroup>
                  <UiContextMenuSeparator />
                  <UiContextMenuGroup>
                    <UiContextMenuItem @select="showMessage('Deleting the image...')"
                      >Delete</UiContextMenuItem
                    >
                  </UiContextMenuGroup>
                </UiContextMenuContent>
              </UiContextMenu>
            </UiAspectRatio>
          </div>

          <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" as-child>
            <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
              <Icon name="lucide:x" />
            </UiButton>
          </UiDrawerClose>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    useSonner(message);
  };
  const isOpen = defineModel<boolean>();
</script>
