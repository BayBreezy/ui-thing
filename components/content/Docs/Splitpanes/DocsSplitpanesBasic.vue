<template>
  <div class="flex items-center justify-center">
    <UiSplitpanes withHandle style="height: 350px" class="max-w-md rounded-lg border">
      <UiSplitpanesPane :min-size="10">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </UiSplitpanesPane>
      <UiSplitpanesPane minSize="30">
        <UiSplitpanes horizontal>
          <UiSplitpanesPane minSize="10px" v-for="p in ['Two', 'Three', 'Four']" :key="p">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">{{ p }}</span>
            </div>
          </UiSplitpanesPane>
        </UiSplitpanes>
      </UiSplitpanesPane>
      <UiSplitpanesPane>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Five</span>
        </div>
      </UiSplitpanesPane>
    </UiSplitpanes>
  </div>
</template>
