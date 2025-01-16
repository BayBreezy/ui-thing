<script lang="ts" setup>
  import type { Config } from "datatables.net";

  const programmingLanguages = [
    {
      id: "1",
      name: "JavaScript",
      releaseYear: "1995",
      developer: "Brendan Eich",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".js",
      latestVersion: "ES2021",
      popularity: "High",
    },
    {
      id: "2",
      name: "Python",
      releaseYear: "1991",
      developer: "Guido van Rossum",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".py",
      latestVersion: "3.10",
      popularity: "High",
    },
    {
      id: "3",
      name: "Java",
      releaseYear: "1995",
      developer: "James Gosling",
      typing: "Static",
      paradigm: "Object-oriented",
      extension: ".java",
      latestVersion: "17",
      popularity: "High",
    },
    {
      id: "4",
      name: "C++",
      releaseYear: "1985",
      developer: "Bjarne Stroustrup",
      typing: "Static",
      paradigm: "Multi-paradigm",
      extension: ".cpp",
      latestVersion: "C++20",
      popularity: "High",
    },
    {
      id: "5",
      name: "Ruby",
      releaseYear: "1995",
      developer: "Yukihiro Matsumoto",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".rb",
      latestVersion: "3.0",
      popularity: "Low",
    },
  ];

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name", className: `font-semibold` },
      { title: "Release Year", data: "releaseYear" },
      { title: "Developer", data: "developer" },
      { title: "Typing", data: "typing" },
      { title: "Paradigm", data: "paradigm" },
      { title: "Extension", data: "extension" },
      { title: "Latest Version", data: "latestVersion" },
      { title: "Popularity", data: "popularity" },
    ],
  };
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-background">
    <UiDatatable class="nowrap compact hover" :data="programmingLanguages" :options />
  </div>
</template>

<style scoped>
  :deep(.dataTable thead tr) {
    @apply bg-muted/50;
  }
</style>
