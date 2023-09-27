<template>
  <div>
    <Heading
      title="Pagination"
      subtext="Displays data in paged format and provides navigation between pages."
      radix-link="https://www.radix-vue.com/components/pagination.html"
    />

    <UIPagination :total="100" :sibling-count="1"></UIPagination>
  </div>
</template>
