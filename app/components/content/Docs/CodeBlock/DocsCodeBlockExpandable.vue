<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock :code="code" language="vue" :max-lines="8">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="components/Chat.vue" />
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers />
      <!-- Only rendered when the code has more lines than `max-lines` -->
      <UiCodeBlockFooter class="justify-center">
        <UiCodeBlockExpandButton />
      </UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const code = `<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <UiInput v-model="input" />
      <UiButton :disabled="chat.status !== 'ready'">Send</UiButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Chat } from "@ai-sdk/vue";

const input = ref("");
const chat = new Chat({});

function onSubmit() {
  chat.sendMessage({ text: input.value });
  input.value = "";
}
<\/script>`;
</script>
