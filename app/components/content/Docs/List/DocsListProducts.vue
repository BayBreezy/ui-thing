<template>
  <div class="flex items-center justify-center">
    <UiList class="max-w-sm">
      <template v-for="n in cartItems" :key="n.product">
        <UiListItem class="items-start px-0">
          <UiAvatar :src="`https://avatar.vercel.sh/${n.product}`" />
          <UiListContent>
            <UiListTitle :title="n.product" />
            <UiListSubtitle>
              <p>Qty: {{ n.quantity }}</p>
            </UiListSubtitle>
          </UiListContent>
          <p class="ml-auto text-sm font-semibold">
            {{
              new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n.price)
            }}
          </p>
        </UiListItem>
        <UiSeparator class="my-2 ml-auto w-[85%] last:hidden" />
      </template>
    </UiList>
  </div>
</template>
<script lang="ts" setup>
  const cartItems = [
    { product: "Pencil", price: 2.0, quantity: 3 },
    { product: "Eraser", price: 1.0, quantity: 2 },
    { product: "Notebook", price: 5.0, quantity: 5 },
    { product: "Pen", price: 3.0, quantity: 6 },
    { product: "Ruler", price: 2.0, quantity: 1 },
  ];
</script>
