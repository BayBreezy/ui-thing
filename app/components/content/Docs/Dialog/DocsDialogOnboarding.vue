<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Onboarding</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="max-w-[450px] gap-0 overflow-x-clip p-0 [&>button:last-child]:text-white"
      >
        <div class="p-2">
          <TransitionFade>
            <img
              v-if="showImage"
              class="h-[282px] w-full rounded-lg object-cover"
              :src="currentImage"
              width="382"
              height="216"
              alt="dialog"
            />
          </TransitionFade>
        </div>
        <div class="space-y-6 overflow-x-hidden px-6 pb-6 pt-3">
          <TransitionFade mode="out-in">
            <UiDialogHeader v-if="showImage">
              <UiDialogTitle>{{ stepContent[step - 1].title }}</UiDialogTitle>
              <UiDialogDescription>{{ stepContent[step - 1].description }}</UiDialogDescription>
            </UiDialogHeader>
          </TransitionFade>
          <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div class="flex justify-center space-x-1.5 max-sm:order-1">
              <div
                v-for="(_, index) in Array(totalSteps)"
                :key="index"
                :class="[
                  'h-1.5 w-1.5 rounded-full bg-primary',
                  index + 1 === step ? 'bg-primary' : 'opacity-20',
                ]"
              />
            </div>
            <UiDialogFooter>
              <UiDialogClose as-child>
                <UiButton type="button" variant="ghost"> Skip </UiButton>
              </UiDialogClose>
              <UiButton v-if="step > 1" variant="outline" type="button" @click="goPrev">
                <Icon
                  name="lucide:arrow-left"
                  class="-ms-1 me-2 size-4 opacity-60 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Prev
              </UiButton>
              <UiButton v-if="step < totalSteps" class="group" type="button" @click="goNext">
                Next
                <Icon
                  name="lucide:arrow-right"
                  class="-me-1 ms-2 size-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </UiButton>

              <UiDialogClose v-else as-child>
                <UiButton type="button">Okay</UiButton>
              </UiDialogClose>
            </UiDialogFooter>
          </div>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const stepContent = [
    {
      img: "https://ui-thing.behonbaker.com/cover.png",
      title: "Welcome to UI Thing",
      description:
        "Discover a powerful collection of components designed to enhance your development workflow.",
    },
    {
      img: "https://images.unsplash.com/4/madebyvadim.jpg?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Customizable Components",
      description:
        "Each component is fully customizable and built with modern web standards in mind.",
    },
    {
      img: "https://images.unsplash.com/photo-1517976547714-720226b864c1?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Ready to Start?",
      description: "Begin building amazing interfaces with our comprehensive component library.",
    },
    {
      img: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?q=80&w=3022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Get Support",
      description:
        "Access our extensive documentation and community resources to make the most of UI Thing.",
    },
  ];
  const step = ref(1);
  const totalSteps = ref(stepContent.length);
  const open = defineModel<boolean>({ default: false });
  const showImage = ref(true);
  const currentImage = computed(() => stepContent[step.value - 1].img);

  watch(step, () => {
    showImage.value = false;
    setTimeout(() => {
      showImage.value = true;
    }, 100);
  });
  const goNext = () => {
    if (step.value < totalSteps.value) {
      step.value += 1;
    }
  };
  const goPrev = () => {
    if (step.value > 1) {
      step.value -= 1;
    }
  };

  watch(open, (value) => {
    if (value) {
      step.value = 1;
    }
  });
</script>
