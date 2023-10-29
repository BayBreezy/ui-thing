<template>
  <div>
    <Heading
      title="Avatar"
      subtext="An image element with a fallback for representing the user."
      radix-link="https://www.radix-vue.com/components/avatar.html"
    />
    <div class="flex flex-wrap items-center gap-3">
      <UIAvatar
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
        fallback="CT"
        :delay-ms="600"
      />
      <UIAvatar fallback="JD" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
