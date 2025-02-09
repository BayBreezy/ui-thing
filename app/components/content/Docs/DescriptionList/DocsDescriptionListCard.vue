<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle title="Product Details" />
      <UiCardDescription
        description="The product details card is a great way to display information about a product."
      />
    </UiCardHeader>
    <UiCardContent>
      <UiDescriptionList>
        <template v-for="item in items" :key="item.term">
          <UiDescriptionListTerm>{{ item.term }}</UiDescriptionListTerm>
          <UiDescriptionListDetails>{{ item.details }}</UiDescriptionListDetails>
        </template>
      </UiDescriptionList>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const items = [
    { term: "Product Name", details: "Wireless Headphones" },
    { term: "Battery Life", details: "20 hours" },
    { term: "Weight", details: "250 grams" },
    { term: "Color", details: "Black" },
    { term: "Warranty", details: "2 years" },
  ];
</script>
