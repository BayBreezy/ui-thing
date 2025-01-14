<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-border bg-background">
      <UiTable>
        <UiTableHeader>
          <UiTableRow class="bg-muted/50">
            <UiTableHead v-for="h in headers" :key="h" class="h-9 whitespace-nowrap py-2">{{
              h
            }}</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="language in programmingLanguages" :key="language.id">
            <UiTableCell class="py-2 font-medium">{{ language.name }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.releaseYear }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.developer }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.typing }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.paradigm }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.extension }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.latestVersion }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.popularity }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="mt-4 text-center text-sm text-muted-foreground">Dense table</p>
  </div>
</template>

<script lang="ts" setup>
  const headers = [
    "Name",
    "Release Year",
    "Developer",
    "Typing",
    "Paradigm",
    "Extension",
    "Latest Version",
    "Popularity",
  ];
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
</script>
