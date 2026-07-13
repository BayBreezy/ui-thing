import { useIntervalFn } from "@vueuse/core";
import { computed, ref, shallowRef } from "vue";

// Shared helpers for the MessageScroller documentation demos: a lean
// stand-in for an ai-sdk-style `useChat` hook. A scripted conversation
// reveals a user turn instantly, then streams the assistant reply chunk by
// chunk so the demos have something realistic to scroll against.

export type MessageAnimationId =
  | "fade"
  | "slide-up"
  | "slide-side"
  | "pop"
  | "spring-bounce"
  | "blur-fade"
  | "scale-fade";

export const MESSAGE_ANIMATION_PRESETS: { id: MessageAnimationId; name: string }[] = [
  { id: "fade", name: "Fade" },
  { id: "slide-up", name: "Slide Up" },
  { id: "slide-side", name: "Slide Side" },
  { id: "pop", name: "Pop" },
  { id: "spring-bounce", name: "Spring Bounce" },
  { id: "blur-fade", name: "Blur Fade" },
  { id: "scale-fade", name: "Scale Fade" },
];

export type DemoRole = "user" | "assistant";

export interface DemoMessage {
  id: string;
  role: DemoRole;
  text: string;
}

export type DemoStatus = "ready" | "streaming";

interface DemoTurn {
  role: DemoRole;
  text: string;
}

export interface DemoChat {
  user: (text: string) => DemoChat;
  assistant: (text: string) => DemoChat;
  turns: DemoTurn[];
}

export function createDemoChat(): DemoChat {
  const turns: DemoTurn[] = [];
  const chat: DemoChat = {
    user(text) {
      turns.push({ role: "user", text });
      return chat;
    },
    assistant(text) {
      turns.push({ role: "assistant", text });
      return chat;
    },
    turns,
  };
  return chat;
}

function toMessages(turns: DemoTurn[], count: number): DemoMessage[] {
  return turns.slice(0, count).map((turn, index) => ({
    id: `demo-${index}`,
    role: turn.role,
    text: turn.text,
  }));
}

export interface UseDemoChatOptions {
  /** Number of turns shown before the first send. Defaults to 0 (empty). */
  initialCount?: number;
  /** Delay between streamed chunks, in ms. */
  chunkDelayMs?: number;
  /** Characters revealed per chunk while streaming. */
  chunkSize?: number;
}

export function useMessageScrollerDemoChat(chat: DemoChat, options: UseDemoChatOptions = {}) {
  const { initialCount = 0, chunkDelayMs = 20, chunkSize = 3 } = options;
  const turns = chat.turns;

  const messages = ref<DemoMessage[]>(toMessages(turns, initialCount));
  const status = shallowRef<DemoStatus>("ready");

  let streamMessageId = "";
  let streamText = "";
  let streamCursor = 0;

  // `useIntervalFn` is created once, here at setup time, so its automatic
  // unmount cleanup is wired up correctly; `send()` just seeds the stream
  // state below and resumes it.
  const { pause, resume } = useIntervalFn(
    () => {
      streamCursor = Math.min(streamText.length, streamCursor + chunkSize);
      const target = messages.value[messages.value.length - 1];
      if (target && target.id === streamMessageId) target.text = streamText.slice(0, streamCursor);
      if (streamCursor >= streamText.length) {
        pause();
        status.value = "ready";
      }
    },
    chunkDelayMs,
    { immediate: false }
  );

  // The next turn to send is the next scripted user turn after what's shown.
  const nextMessage = computed<DemoMessage | null>(() => {
    const turn = turns[messages.value.length];
    if (!turn || turn.role !== "user") return null;
    return { id: `demo-${messages.value.length}`, role: "user", text: turn.text };
  });

  function send() {
    if (status.value === "streaming") return;
    const index = messages.value.length;
    const userTurn = turns[index];
    if (!userTurn || userTurn.role !== "user") return;
    messages.value = [
      ...messages.value,
      { id: `demo-${index}`, role: "user", text: userTurn.text },
    ];

    const assistantTurn = turns[index + 1];
    if (!assistantTurn || assistantTurn.role !== "assistant") return;

    streamMessageId = `demo-${index + 1}`;
    streamText = assistantTurn.text;
    streamCursor = 0;
    messages.value = [...messages.value, { id: streamMessageId, role: "assistant", text: "" }];
    status.value = "streaming";
    resume();
  }

  function reset() {
    pause();
    status.value = "ready";
    messages.value = toMessages(turns, initialCount);
  }

  return { messages, status, nextMessage, send, reset };
}
