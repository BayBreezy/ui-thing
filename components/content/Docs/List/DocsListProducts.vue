<template>
  <div class="flex items-center justify-center">
    <UIList class="max-w-sm">
      <template v-for="n in cartItems" :key="n.product">
        <UIListItem class="items-start px-0">
          <UIAvatar :src="`https://avatar.vercel.sh/${n.product}`" />
          <UIListContent>
            <UIListTitle :title="n.product" />
            <UIListSubtitle>
              <p>Qty: {{ n.quantity }}</p>
            </UIListSubtitle>
          </UIListContent>
          <p class="ml-auto text-sm font-semibold">
            {{
              new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n.price)
            }}
          </p>
        </UIListItem>
        <UISeparator class="my-2 ml-auto w-[85%] last:hidden" />
      </template>
    </UIList>
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
