<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-sm">
      <template v-for="n in 5" :key="n">
        <UiListItem class="items-start px-0">
          <UiAvatar :src="`https://avatar.vercel.sh/${n}`" />
          <UiListContent>
            <UiListTitle :title="`List item #${n}`" />
            <UiListSubtitle
              class="line-clamp-2"
              subtitle=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ex praesentium
                libero commodi obcaecati eligendi hic, ducimus quos saepe harum voluptatem eos qui
                delectus molestias vero enim, magni id quas?"
            />
          </UiListContent>
          <UiButton
            size="icon-sm"
            variant="ghost"
            class="ml-auto shrink-0 self-center rounded-full"
          >
            <Icon name="lucide:chevron-right" />
          </UiButton>
        </UiListItem>
        <UiSeparator class="my-2.5 ml-auto w-[85%] last:hidden" />
      </template>
    </UiList>
  </div>
</template>
