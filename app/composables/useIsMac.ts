/** Whether the client is running macOS, for picking ⌘ vs Ctrl in shortcut hints. */
export function useIsMac() {
  const isMac = ref(true);

  onMounted(() => {
    isMac.value = navigator.platform.toUpperCase().includes("MAC");
  });

  return isMac;
}
