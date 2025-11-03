<template>
  <!-- 
    Office Locations About Section
    Features: Multi-location showcase
  -->
  <div class="container py-16 md:py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Our Global Presence</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
        Operating across continents to serve you better
      </p>
    </div>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <UiCard
        v-for="office in offices"
        :key="office.city"
        class="group py-0 pb-6 transition-shadow hover:shadow-lg"
      >
        <div class="overflow-hidden rounded-t-xl">
          <img
            :src="office.image"
            :alt="`${office.city} office`"
            class="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <UiCardContent>
          <div class="flex items-start justify-between">
            <div>
              <UiBadge v-if="office.isHQ" variant="default" class="mb-2">Headquarters</UiBadge>
              <h3 class="text-xl font-bold">{{ office.city }}</h3>
              <p class="text-sm text-muted-foreground">{{ office.country }}</p>
            </div>
            <div class="rounded-lg bg-primary/10 p-2">
              <Icon name="lucide:map-pin" class="size-5 text-primary" />
            </div>
          </div>

          <div class="mt-4 space-y-3 text-sm">
            <div class="flex items-start gap-2 text-muted-foreground">
              <Icon name="lucide:building" class="mt-0.5 size-4 shrink-0" />
              <span>{{ office.address }}</span>
            </div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Icon name="lucide:users" class="size-4 shrink-0" />
              <span>{{ office.employees }} employees</span>
            </div>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Icon name="lucide:phone" class="size-4 shrink-0" />
              <span>{{ office.phone }}</span>
            </div>
          </div>

          <div class="mt-4">
            <h4 class="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Departments
            </h4>
            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="dept in office.departments"
                :key="dept"
                variant="outline"
                class="text-xs"
              >
                {{ dept }}
              </UiBadge>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="mx-auto mt-12 max-w-3xl rounded-2xl border bg-card p-8 text-center">
      <Icon name="lucide:globe" class="mx-auto size-12 text-primary" />
      <h3 class="mt-4 text-xl font-semibold">Looking to expand globally?</h3>
      <p class="mt-2 text-muted-foreground">
        We're constantly growing and opening new offices. Check back to see where we're headed next.
      </p>
      <UiButton class="mt-6">View Career Opportunities</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const offices = [
    {
      city: "San Francisco",
      country: "United States",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&auto=format&fit=crop&q=80",
      address: "123 Market Street, Suite 500, CA 94103",
      employees: 250,
      phone: "+1 (415) 555-0100",
      isHQ: true,
      departments: ["Engineering", "Sales", "Marketing", "Support"],
    },
    {
      city: "London",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&auto=format&fit=crop&q=80",
      address: "45 Liverpool Street, EC2M 7AE",
      employees: 120,
      phone: "+44 20 7946 0958",
      isHQ: false,
      departments: ["Sales", "Marketing", "Support"],
    },
    {
      city: "Singapore",
      country: "Singapore",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&auto=format&fit=crop&q=80",
      address: "1 Marina Boulevard, #28-00, 018989",
      employees: 85,
      phone: "+65 6789 1234",
      isHQ: false,
      departments: ["Engineering", "Sales", "Support"],
    },
    {
      city: "Berlin",
      country: "Germany",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&auto=format&fit=crop&q=80",
      address: "Friedrichstraße 100, 10117",
      employees: 95,
      phone: "+49 30 1234 5678",
      isHQ: false,
      departments: ["Engineering", "Product"],
    },
    {
      city: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop&q=80",
      address: "1-2-3 Shibuya, Tokyo 150-0002",
      employees: 70,
      phone: "+81 3-1234-5678",
      isHQ: false,
      departments: ["Sales", "Support"],
    },
    {
      city: "Sydney",
      country: "Australia",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&auto=format&fit=crop&q=80",
      address: "100 George Street, NSW 2000",
      employees: 60,
      phone: "+61 2 9876 5432",
      isHQ: false,
      departments: ["Sales", "Marketing"],
    },
  ];
</script>
