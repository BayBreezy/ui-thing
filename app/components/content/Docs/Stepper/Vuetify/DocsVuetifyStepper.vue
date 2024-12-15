<template>
  <div>
    <UiCard>
      <UiStepper
        v-model="stepper"
        class="flex w-full items-start justify-between gap-2 border-b p-6"
      >
        <UiStepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="group relative w-full"
          :step="step.step"
          :class="[isLastItem(step.step) && '!w-fit']"
        >
          <UiStepperTrigger
            as="div"
            class="flex items-center gap-3"
            :class="[isLastItem(step.step) && 'justify-end']"
          >
            <UiButton
              :variant="state == 'completed' || state == 'active' ? 'default' : 'outline'"
              size="icon-sm"
              class="z-10 size-8 shrink-0 rounded-full"
              :class="[
                state == 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
              ]"
            >
              <TransitionScale mode="out-in" :scale="0.8" :duration="100">
                <Icon v-if="state == 'active'" name="lucide:pen" class="size-4" />
                <Icon v-else-if="state == 'completed'" name="lucide:check" class="size-4" />
                <span v-else>{{ step.step }}</span>
              </TransitionScale>
            </UiButton>
            <UiStepperTitle
              :class="[state == 'active' && 'text-primary']"
              class="sr-only font-medium transition md:not-sr-only"
              >{{ step.title }}</UiStepperTitle
            >
            <UiStepperSeparator
              v-if="step.step != steps[steps.length - 1].step"
              class="h-0.5 shrink-0 grow rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
            <VisuallyHidden as-child>
              <UiStepperDescription>{{ step.description }}</UiStepperDescription>
            </VisuallyHidden>
          </UiStepperTrigger>
        </UiStepperItem>
      </UiStepper>

      <div class="overflow-hidden">
        <TransitionSlide
          mode="out-in"
          :duration="100"
          :offset="{
            enter: ['10%', 0],
            leave: ['-10%', 0],
          }"
        >
          <UiCardContent v-if="stepper == 1">
            <UiCardTitle class="">Order</UiCardTitle>
            <div class="mt-6 overflow-x-auto rounded-md border">
              <UiTable>
                <UiTableHeader>
                  <UiTableRow>
                    <UiTableHead>Description</UiTableHead>
                    <UiTableHead class="text-end">Quantity</UiTableHead>
                    <UiTableHead class="text-end">Price</UiTableHead>
                  </UiTableRow>
                </UiTableHeader>
                <UiTableBody>
                  <template v-for="(product, index) in products" :key="index">
                    <UiTableRow>
                      <UiTableCell class="font-medium">{{ product.name }} </UiTableCell>
                      <UiTableCell class="text-end">{{ product.quantity }}</UiTableCell>
                      <UiTableCell class="text-end">{{
                        formatPrice(product.price * product.quantity)
                      }}</UiTableCell>
                    </UiTableRow>
                  </template>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Total</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end font-semibold">
                      {{ subTotal }}
                    </UiTableCell>
                  </UiTableRow>
                </UiTableBody>
              </UiTable>
            </div>
          </UiCardContent>
          <UiCardContent v-if="stepper == 2" class="pb-10">
            <UiCardTitle class="">Shipping</UiCardTitle>
            <UiRadioGroup v-model="shippingMethod" class="mt-6">
              <div v-for="m in shippingMethods" :key="m.name" class="flex items-center gap-3">
                <!-- @vue-expect-error - we are storing the price as the value which is a number -->
                <UiRadioGroupItem :id="m.name" :value="m.price" />
                <UiLabel class="gap-3 !text-base" :for="m.name"
                  >{{ m.name }}
                  <span class="text-muted-foreground">{{ formatPrice(m.price) }}</span></UiLabel
                >
              </div>
            </UiRadioGroup>
          </UiCardContent>
          <UiCardContent v-if="stepper == 3">
            <UiCardTitle class="">Submit</UiCardTitle>
            <div class="mt-6 overflow-x-auto rounded-md border">
              <UiTable>
                <UiTableHeader>
                  <UiTableRow>
                    <UiTableHead>Description</UiTableHead>
                    <UiTableHead class="text-end">Quantity</UiTableHead>
                    <UiTableHead class="text-end">Price</UiTableHead>
                  </UiTableRow>
                </UiTableHeader>
                <UiTableBody>
                  <template v-for="(product, index) in products" :key="index">
                    <UiTableRow>
                      <UiTableCell class="font-medium">{{ product.name }} </UiTableCell>
                      <UiTableCell class="text-end">{{ product.quantity }}</UiTableCell>
                      <UiTableCell class="text-end">{{
                        formatPrice(product.price * product.quantity)
                      }}</UiTableCell>
                    </UiTableRow>
                  </template>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Shipping</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end">{{ formatPrice(shippingMethod) }}</UiTableCell>
                  </UiTableRow>
                  <UiTableRow>
                    <UiTableCell class="font-medium">Total</UiTableCell>
                    <UiTableCell />
                    <UiTableCell class="text-end font-semibold">
                      {{ total }}
                    </UiTableCell>
                  </UiTableRow>
                </UiTableBody>
              </UiTable>
            </div>
          </UiCardContent>
        </TransitionSlide>
      </div>

      <UiCardFooter class="flex items-center justify-between gap-5">
        <UiButton :disabled="!canGoBack" variant="outline" size="sm" @click="goBack">Back</UiButton>
        <div class="flex items-center gap-3">
          <UiButton v-if="stepper != 3" :disabled="!canGoNext" size="sm" @click="goNext"
            >Next</UiButton
          >
          <UiButton v-if="stepper == 3" size="sm" @click="useSonner.success('Order submitted')"
            >Submit</UiButton
          >
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { get, set } from "@vueuse/core";
  import { VisuallyHidden } from "radix-vue";

  const stepper = ref(1);
  const steps = [
    {
      step: 1,
      title: "Review Order",
      description: "Ensure your order is correct",
    },
    {
      step: 2,
      title: "Select Shipping",
      description: "Choose the best shipping option for you",
    },
    {
      step: 3,
      title: "Submit",
      description: "Complete your order",
    },
  ];

  const products = ref([
    {
      name: "Product 1",
      price: 10,
      quantity: 2,
    },
    {
      name: "Product 2",
      price: 15,
      quantity: 10,
    },
  ]);

  const shippingMethod = ref(0);

  const shippingMethods = ref([
    { name: "Express Shipping", price: 10 },
    { name: "Standard Shipping", price: 5 },
    { name: "Free Shipping", price: 0 },
  ]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  const subTotal = computed(() =>
    formatPrice(products.value.reduce((acc, product) => acc + product.price * product.quantity, 0))
  );

  const total = computed(() =>
    formatPrice(
      products.value.reduce((acc, product) => acc + product.price * product.quantity, 0) +
        shippingMethod.value
    )
  );

  const isLastItem = (step: number) => step === steps.length;

  const canGoNext = computed(() => stepper.value < steps.length);
  const canGoBack = computed(() => stepper.value > 1);
  const goNext = () => {
    if (get(canGoNext)) {
      set(stepper, stepper.value + 1);
    }
  };
  const goBack = () => {
    if (get(canGoBack)) {
      set(stepper, stepper.value - 1);
    }
  };
</script>
