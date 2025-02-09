<template>
  <UiDescriptionList>
    <template v-for="item in items" :key="item.term">
      <UiDescriptionListTerm>{{ item.term }}</UiDescriptionListTerm>
      <UiDescriptionListDetails>{{ item.details }}</UiDescriptionListDetails>
    </template>
  </UiDescriptionList>
</template>

<script lang="ts" setup>
  const items = [
    { term: "Invoice Number", details: "INV-12345" },
    { term: "Invoice Date", details: "September 21, 2024" },
    { term: "Due Date", details: "October 21, 2024" },
    { term: "Customer Name", details: "John Doe" },
    { term: "Total Amount", details: "$1,250.00" },
    { term: "Status", details: "Pending" },
  ];
</script>
