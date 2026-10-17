<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm build
> nuxt build

 ✔ Client built in 4215ms
 ✔ Server built in 1803ms

Route                      Size  Gzip
┌ ○ /                    1.9 kB  0.9 kB
├ ○ /about               993 B   0.5 kB
└ ƒ /api/chat            141 B   0.1 kB`;
</script>
