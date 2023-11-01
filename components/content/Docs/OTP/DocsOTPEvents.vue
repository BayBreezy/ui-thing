<template>
  <div class="flex items-center justify-center">
    <div class="grid gap-5">
      <div>
        <p class="mb-3 text-sm font-medium">Events with 6 inputs</p>
        <UIOTP :num-inputs="6" v-model="otp" @complete="handleComplete" @change="handleChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const otp = ref("124");

  const handleComplete = (value: string) => {
    alert(`OTP: ${value}`);
  };

  const handleChange = (value: string) => {
    console.log(`OTP: ${value}`);
  };
</script>
