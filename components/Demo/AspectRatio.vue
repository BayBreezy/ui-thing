<template>
  <div>
    <Heading
      title="Aspect Ratio"
      subtext="Displays content within a desired ratio."
      radix-link="https://www.radix-vue.com/components/aspect-ratio.html"
    />

    <UIAspectRatio :ratio="16 / 9">
      <img
        src="https://cdn.pixabay.com/photo/2023/05/02/21/08/river-7966163_1280.png"
        alt="Snow Lake"
        class="h-full w-full rounded-md object-cover"
      />
    </UIAspectRatio>
  </div>
</template>
