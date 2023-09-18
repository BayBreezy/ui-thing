<template>
  <div>
    <Heading title="OTP" subtext="Displays a set of OTP inputs." />

    <div class="grid gap-5">
      <div>
        <p class="mb-3 text-sm font-medium">Placeholder</p>
        <UIOTP :placeholder="['0', '0', '0', '0']" />
      </div>
      <div>
        <p class="mb-3 text-sm font-medium">Separator</p>
        <UIOTP separator="-" />
      </div>
      <div>
        <p class="mb-3 text-sm font-medium">Disabled</p>
        <UIOTP disabled />
      </div>
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
