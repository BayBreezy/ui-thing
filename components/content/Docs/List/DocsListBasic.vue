<template>
  <div class="flex items-center justify-center">
    <UIList class="max-w-sm">
      <template v-for="n in 5" :key="n">
        <UIListItem class="items-start px-0">
          <UIAvatar :src="`https://avatar.vercel.sh/${n}`" />
          <UIListContent>
            <UIListTitle :title="`List item #${n}`" />
            <UIListSubtitle
              class="line-clamp-2"
              subtitle=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ex praesentium
                libero commodi obcaecati eligendi hic, ducimus quos saepe harum voluptatem eos qui
                delectus molestias vero enim, magni id quas?"
            />
          </UIListContent>
          <UIButton
            size="icon-sm"
            variant="ghost"
            class="ml-auto shrink-0 self-center rounded-full"
          >
            <Icon name="lucide:chevron-right" />
          </UIButton>
        </UIListItem>
        <UISeparator class="my-2.5 ml-auto w-[85%] last:hidden" />
      </template>
    </UIList>
  </div>
</template>
