---
title: Description List
description: A description list is typically used to display pairs of terms and details, like in invoices or product specifications, enhancing clarity and organization of information.
label: New
---

## Source code

Click :SourceCodeLink{component="Description"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add description-list
```

## Usage

### Basic

::ShowCase

:DocsDescriptionListBasic

#code

<!-- automd:file src="../../app/components/content/Docs/DescriptionList/DocsDescriptionListBasic.vue" code lang="vue" -->

```vue [DocsDescriptionListBasic.vue]
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
```

<!-- /automd -->

::

### With Card

::ShowCase

:DocsDescriptionListCard

#code

<!-- automd:file src="../../app/components/content/Docs/DescriptionList/DocsDescriptionListCard.vue" code lang="vue" -->

```vue [DocsDescriptionListCard.vue]
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
```

<!-- /automd -->

::
