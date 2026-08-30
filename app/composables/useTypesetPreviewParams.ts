import type { TypesetSearchParams } from "~/utils/typeset/params";
import {
  coerceTypesetValue,
  TYPESET_DEFAULTS,
  TYPESET_PARAM_KEYS,
  TYPESET_PARAMS_MESSAGE,
  TYPESET_READY_MESSAGE,
} from "~/utils/typeset/params";

/**
 * Param state for the preview iframe.
 *
 * The URL only _seeds_ this: deep links and "Open in New Tab" carry the design in their query
 * string, but once the designer is driving over postMessage the updates land in local reactive
 * state and never touch the router.
 *
 * Writing them back through the router instead is what the designer does, and it does not work
 * here: the iframe's first `router.replace` lands while Vue Router is still settling its initial
 * navigation and is silently dropped, so the first pick after load never applies.
 */
export function useTypesetPreviewParams() {
  const route = useRoute();

  const seed = {} as TypesetSearchParams;
  for (const key of TYPESET_PARAM_KEYS) {
    const raw = route.query[key];
    const value = coerceTypesetValue(key, typeof raw === "string" ? raw : null);
    seed[key] = (value ?? TYPESET_DEFAULTS[key]) as never;
  }

  const params = reactive<TypesetSearchParams>(seed);

  // Announce as soon as the listener below is attached, so the designer can
  // send the current design instead of racing the iframe's `load` event.
  onMounted(() => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: TYPESET_READY_MESSAGE }, window.location.origin);
    }
  });

  // The preview is its own document, so it never sees @nuxtjs/color-mode
  // updates the designer makes in the parent window. The designer rides its
  // current theme along on this same channel, so the preview stays in sync
  // regardless of whether the toggle came from a click or a keyboard shortcut.
  const colorMode = useColorMode();

  useEventListener(globalThis.window, "message", (event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      return;
    }
    if (event.data?.type !== TYPESET_PARAMS_MESSAGE || !event.data.data) {
      return;
    }

    // Validate on the way in: the payload crosses a window boundary, so it is
    // untrusted input even though it is same-origin.
    for (const key of TYPESET_PARAM_KEYS) {
      const value = coerceTypesetValue(key, event.data.data[key]);
      if (value !== null) {
        params[key] = value as never;
      }
    }

    if (event.data.theme === "dark" || event.data.theme === "light") {
      colorMode.preference = event.data.theme;
    }
  });

  return params;
}
