<template>
  <div class="py-5 min-[1400px]:container max-[1400px]:px-10">
    <div class="grid grid-cols-1 items-start justify-center gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div class="grid gap-6">
        <!-- Create account -->
        <Form @submit="submitCard" :validation-schema="CardSchema">
          <UICard description="Enter your email below to create your account">
            <template #title>
              <UICardTitle class="text-xl"> Create an account </UICardTitle>
            </template>
            <template #content>
              <UICardContent class="grid gap-4">
                <!-- Login buttons -->
                <div class="flex items-center gap-4">
                  <UIButton variant="outline" class="w-full"
                    ><Icon class="h-4 w-4" name="mdi:github" /> Github</UIButton
                  >
                  <UIButton variant="outline" class="w-full"
                    ><Icon class="h-4 w-4" name="uim:google" /> Google</UIButton
                  >
                </div>
                <!-- Separator -->
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <UISeparator />
                  </div>
                  <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">or continue with</span>
                  </div>
                </div>
                <!-- Form -->
                <UIFormInput type="email" label="Email" name="email" hint="Enter your email" />
                <UIFormInput
                  label="Password"
                  name="password"
                  type="password"
                  hint="8 characters or more"
                />
              </UICardContent>
            </template>
            <template #footer>
              <UICardFooter>
                <UIButton type="submit" class="w-full">Create account</UIButton>
              </UICardFooter>
            </template>
          </UICard>
        </Form>

        <!-- Payment Method -->
        <Form @submit="submitPayment" :validation-schema="PaymentSchema">
          <UICard description="Add a new payment method to your account.">
            <template #title>
              <UICardTitle class="text-xl"> Payment Method </UICardTitle>
            </template>
            <template #content>
              <UICardContent>
                <!-- Payment methods -->
                <div class="grid gap-4">
                  <UIRadioGroup orientation="horizontal" class="grid grid-cols-3 gap-4">
                    <template v-for="(p, i) in paymentMethods" :key="`payment-method-${i}`">
                      <div>
                        <UIRadioGroupItem :value="p.id" :id="p.id" class="peer sr-only" />
                        <UILabel
                          :for="p.id"
                          class="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Icon class="h-6 w-6" :name="p.icon" />
                          <span class="text-sm">{{ p.name }}</span>
                        </UILabel>
                      </div>
                    </template>
                  </UIRadioGroup>
                  <!-- Form -->
                  <UIFormInput label="Name" name="name" placeholder="First & last name" />
                  <UIFormInput label="Card number" name="cardNumber" type="number" />
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <UIFormSelect name="expires" placeholder="Month" label="Expires">
                      <template #content>
                        <UISelectContent>
                          <UISelectItem
                            v-for="m in monthsOfYear"
                            :key="m"
                            :value="m"
                            :text-value="m"
                            :text="m"
                          />
                        </UISelectContent>
                      </template>
                    </UIFormSelect>
                    <UIFormSelect name="year" placeholder="Year" label="Year">
                      <template #content>
                        <UISelectContent>
                          <UISelectItem
                            v-for="m in years"
                            :key="m"
                            :value="m"
                            :text-value="m"
                            :text="m"
                          />
                        </UISelectContent>
                      </template>
                    </UIFormSelect>
                    <UIFormInput label="CVC" name="cvc" maxlength="3" placeholder="CVC" />
                  </div>
                </div>
              </UICardContent>
            </template>
            <template #footer>
              <UICardFooter>
                <UIButton type="submit" class="w-full">Continue</UIButton>
              </UICardFooter>
            </template>
          </UICard>
        </Form>
      </div>

      <div class="grid gap-6">
        <UICard description="Invite your team members to collaborate.">
          <template #title>
            <UICardTitle class="text-xl"> Team Members </UICardTitle>
          </template>
          <template #content>
            <UICardContent class="grid gap-6">
              <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                  <UIAvatar src="https://avatar.vercel.sh/mary" />
                  <div class="text-sm">
                    <p class="font-medium leading-none">Mary Davis</p>
                    <p class="text-muted-foreground">m@example.com</p>
                  </div>
                </div>
                <UIPopover>
                  <UIPopoverTrigger as-child>
                    <UIButton variant="outline"
                      >Owner
                      <Icon name="heroicons:chevron-down" class="h-4 w-4 text-muted-foreground"
                    /></UIButton>
                    <UIPopoverContent class="p-1" align="end">
                      <ul>
                        <PopoverClose>
                          <li
                            class="flex cursor-pointer flex-col gap-1 rounded-md px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                            v-for="(m, i) in memberOptions"
                            :key="i"
                          >
                            <p class="font-medium">{{ m.title }}</p>
                            <p class="text-muted-foreground">{{ m.description }}</p>
                          </li>
                        </PopoverClose>
                      </ul>
                    </UIPopoverContent>
                  </UIPopoverTrigger>
                </UIPopover>
              </div>
              <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                  <UIAvatar src="https://avatar.vercel.sh/jackson" />
                  <div class="text-sm">
                    <p class="font-medium leading-none">Jackson Lee</p>
                    <p class="text-muted-foreground">j@example.com</p>
                  </div>
                </div>
                <UIPopover>
                  <UIPopoverTrigger as-child>
                    <UIButton variant="outline"
                      >Member
                      <Icon name="heroicons:chevron-down" class="h-4 w-4 text-muted-foreground"
                    /></UIButton>
                    <UIPopoverContent class="p-1" align="end">
                      <ul>
                        <PopoverClose>
                          <li
                            class="flex cursor-pointer flex-col gap-1 rounded-md px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                            v-for="(m, i) in memberOptions"
                            :key="i"
                          >
                            <p class="font-medium">{{ m.title }}</p>
                            <p class="text-muted-foreground">{{ m.description }}</p>
                          </li>
                        </PopoverClose>
                      </ul>
                    </UIPopoverContent>
                  </UIPopoverTrigger>
                </UIPopover>
              </div>
            </UICardContent>
          </template>
        </UICard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { addYears } from "date-fns";
  import { object, string } from "yup";
  definePageMeta({
    layout: "examples",
  });

  const CardSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string().required("Password is required").min(8, "Password is too short"),
  });

  const submitCard = (values: any) => {
    console.log(values);
  };

  const PaymentSchema = object({
    name: string().required("Name is required"),
    cardNumber: string().required("Card number is required"),
    expires: string().required("Required"),
    year: string().required("Required"),
    cvc: string().required("Required").min(3, "CVC is too short"),
  });

  const submitPayment = (values: any) => {
    console.log(values);
  };

  const paymentMethods = [
    {
      id: "payment-card",
      name: "Card",
      icon: "mdi:credit-card",
    },
    {
      id: "payment-paypal",
      name: "Paypal",
      icon: "mdi:paypal",
    },
    {
      id: "payment-apple",
      name: "Apple",
      icon: "mdi:apple",
    },
  ];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, i) =>
    addYears(new Date(), i).getFullYear().toString()
  );

  const memberOptions = [
    {
      title: "Viewer",
      description: "Can view & comment.",
    },
    {
      title: "Developer",
      description: "Can view, comment & edit.",
    },
    {
      title: "Billing",
      description: "Can view, comment & manage billing.",
    },
    {
      title: "Owner",
      description: "Admin-level access to all resources",
    },
  ];
</script>
