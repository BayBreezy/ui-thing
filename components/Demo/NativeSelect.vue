<template>
  <div>
    <Heading title="Select (Native)" subtext="Displays a native select element." />

    <UINativeSelect name="cars" placeholder="Select a car">
      <option value="" disabled>Select an option</option>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </UINativeSelect>

    <UINativeSelect name="carTypes" class="mt-5">
      <optgroup label="Swedish Cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars">
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </optgroup>
    </UINativeSelect>
  </div>
</template>

<script lang="ts" setup></script>
