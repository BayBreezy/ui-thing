<template>
  <div class="min-h-screen">
    <ExamplesLandingHero />
    <ExamplesLandingFeatures />
    <ExamplesLandingTestimonials />
    <ExamplesLandingPricing />
    <ExamplesLandingFAQ />
    <ExamplesLandingCTA />
  </div>
</template>

<script setup lang="ts">
  import ExamplesLandingCTA from "./CTA.vue";
  import ExamplesLandingFAQ from "./FAQ.vue";
  import ExamplesLandingFeatures from "./Features.vue";
  import ExamplesLandingHero from "./Hero.vue";
  import ExamplesLandingPricing from "./Pricing.vue";
  import ExamplesLandingTestimonials from "./Testimonials.vue";
</script>
