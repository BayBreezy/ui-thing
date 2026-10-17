<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>getWeather output</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`;

  const lines = useHighlightedCode(code, "json");
</script>
