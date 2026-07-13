import type { InjectionKey, Ref } from "vue";
import { getCurrentInstance, inject, onUnmounted, provide, shallowRef } from "vue";

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type MessageScrollerDefaultScrollPosition = "start" | "end" | "last-anchor";
export type MessageScrollerButtonDirection = "start" | "end";
export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest";

export interface MessageScrollerScrollOptions {
  align?: MessageScrollerScrollAlign;
  behavior?: ScrollBehavior;
  scrollMargin?: number;
}

export interface MessageScrollerScrollable {
  start: boolean;
  end: boolean;
}

export interface MessageScrollerVisibilityState {
  currentAnchorId: string | null;
  visibleMessageIds: string[];
}

export interface MessageScrollerProviderProps {
  /**
   * Follow the live edge while the reader is pinned to the bottom.
   *
   * @default false
   */
  autoScroll?: boolean;
  /**
   * Opening position for the transcript.
   *
   * @default "end"
   */
  defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
  /**
   * Distance in px from an edge before it is considered scrollable.
   *
   * @default 8
   */
  scrollEdgeThreshold?: number;
  /**
   * Amount in px of the previous turn kept visible when anchoring.
   *
   * @default 64
   */
  scrollPreviousItemPeek?: number;
  /**
   * Extra offset in px applied when scrolling to an element.
   *
   * @default 0
   */
  scrollMargin?: number;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const DEFAULT_SCROLL_EDGE_THRESHOLD = 8;
const DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK = 64;
const DEFAULT_SCROLL_MARGIN = 0;
const SCROLL_EPSILON = 0.5;
const AUTOSCROLLING_TIMEOUT = 180;

const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

const EMPTY_SCROLLABLE: MessageScrollerScrollable = { start: false, end: false };
const EMPTY_VISIBLE_IDS: string[] = [];
const EMPTY_VISIBILITY: MessageScrollerVisibilityState = {
  currentAnchorId: null,
  visibleMessageIds: EMPTY_VISIBLE_IDS,
};

type Mode = "following-bottom" | "free-scrolling" | "anchored-to-message" | "settling-jump";

interface PrependRestore {
  element: HTMLElement;
  viewportTop: number;
}

interface PendingScrollToMessage {
  messageId: string;
  options?: MessageScrollerScrollOptions;
}

function scrollableEqual(a: MessageScrollerScrollable, b: MessageScrollerScrollable) {
  return a.start === b.start && a.end === b.end;
}

function visibilityEqual(a: MessageScrollerVisibilityState, b: MessageScrollerVisibilityState) {
  if (
    a.currentAnchorId !== b.currentAnchorId ||
    a.visibleMessageIds.length !== b.visibleMessageIds.length
  ) {
    return false;
  }
  return a.visibleMessageIds.every((id, index) => id === b.visibleMessageIds[index]);
}

// -----------------------------------------------------------------------------
// DOM measurement helpers
// -----------------------------------------------------------------------------

function parseNumber(value: string | null | undefined): number {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getPadding(element: HTMLElement): { start: number; end: number } {
  const style = window.getComputedStyle(element);
  return {
    end: parseNumber(style.paddingBlockEnd || style.paddingBottom),
    start: parseNumber(style.paddingBlockStart || style.paddingTop),
  };
}

function getContentPadding(spacer: HTMLElement | null): { start: number; end: number } {
  const parent = spacer?.parentElement;
  return parent ? getPadding(parent) : { end: 0, start: 0 };
}

function getRowGap(element: HTMLElement | null): number {
  if (!element) return 0;
  const style = window.getComputedStyle(element);
  const gap = style.rowGap === "normal" ? style.gap : style.rowGap;
  return parseNumber(gap);
}

function getMessageChildren(content: HTMLElement, spacer: HTMLElement | null): HTMLElement[] {
  return Array.from(content.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && child !== spacer
  );
}

function getElementOffsetTop(element: HTMLElement, viewport: HTMLElement): number {
  const elementRect = element.getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();
  return elementRect.top - viewportRect.top + viewport.scrollTop;
}

function getRelativeTop(element: HTMLElement, viewport: HTMLElement): number {
  return element.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
}

function measureContentHeight({
  content,
  spacer,
  viewport,
}: {
  content: HTMLElement;
  spacer: HTMLElement | null;
  viewport: HTMLElement;
}): number {
  const children = getMessageChildren(content, spacer);
  const padding = getPadding(content);
  const viewportRect = viewport.getBoundingClientRect();
  const scrollTop = viewport.scrollTop;
  let height = padding.start + padding.end;
  for (const child of children) {
    const rect = child.getBoundingClientRect();
    height = Math.max(height, rect.bottom - viewportRect.top + scrollTop + padding.end);
  }
  return height;
}

function maxScrollTop(element: HTMLElement): number {
  return Math.max(0, element.scrollHeight - element.clientHeight);
}

function computeSpacerHeight({
  content,
  scrollTop,
  spacer,
  viewport,
}: {
  content: HTMLElement;
  scrollTop: number;
  spacer: HTMLElement | null;
  viewport: HTMLElement;
}): number {
  const contentHeight = measureContentHeight({ content, spacer, viewport });
  return scrollTop + viewport.clientHeight - contentHeight;
}

function computeScrollTopForElement({
  align,
  element,
  scrollMargin,
  spacer,
  viewport,
}: {
  align: MessageScrollerScrollAlign;
  element: HTMLElement;
  scrollMargin: number;
  spacer: HTMLElement | null;
  viewport: HTMLElement;
}): number {
  const offsetTop = getElementOffsetTop(element, viewport);
  const height = element.getBoundingClientRect().height;
  const padding = getContentPadding(spacer);

  if (align === "center") {
    const available = Math.max(0, viewport.clientHeight - padding.start - padding.end);
    return offsetTop - padding.start - (available - height) / 2 - scrollMargin;
  }
  if (align === "end")
    return offsetTop - viewport.clientHeight + height + padding.end + scrollMargin;
  if (align === "nearest") {
    const bottom = offsetTop + height;
    const visibleTop = viewport.scrollTop + padding.start;
    const visibleBottom = viewport.scrollTop + viewport.clientHeight - padding.end;
    if (offsetTop >= visibleTop && bottom <= visibleBottom) return viewport.scrollTop;
    return offsetTop < visibleTop
      ? offsetTop - padding.start - scrollMargin
      : bottom - viewport.clientHeight + padding.end + scrollMargin;
  }
  return offsetTop - padding.start - scrollMargin;
}

function computeScrollable({
  content,
  scrollEdgeThreshold,
  spacer,
  viewport,
}: {
  content: HTMLElement | null;
  scrollEdgeThreshold: number;
  spacer: HTMLElement | null;
  viewport: HTMLElement | null;
}): MessageScrollerScrollable {
  if (!viewport || !content) return EMPTY_SCROLLABLE;
  const contentHeight = measureContentHeight({ content, spacer, viewport });
  return {
    start: viewport.scrollTop > scrollEdgeThreshold,
    end: contentHeight - viewport.scrollTop - viewport.clientHeight > scrollEdgeThreshold,
  };
}

function computeVisibility({
  content,
  scrollMargin,
  scrollPreviousItemPeek,
  spacer,
  viewport,
  visibleMessageIds,
}: {
  content: HTMLElement | null;
  scrollMargin: number;
  scrollPreviousItemPeek: number;
  spacer: HTMLElement | null;
  viewport: HTMLElement | null;
  visibleMessageIds: Set<string>;
}): MessageScrollerVisibilityState {
  if (!content || !viewport) return EMPTY_VISIBILITY;
  const viewportRect = viewport.getBoundingClientRect();
  const anchorLine = viewportRect.top + scrollMargin + scrollPreviousItemPeek;
  const noIntersectionObserver = typeof IntersectionObserver === "undefined";
  const visible: string[] = [];
  let currentAnchorId: string | null = null;

  for (const child of getMessageChildren(content, spacer)) {
    const messageId = child.dataset.messageId;
    if (!messageId) continue;
    const isAnchor = child.dataset.scrollAnchor === "true";
    const rect = isAnchor || noIntersectionObserver ? child.getBoundingClientRect() : null;
    const isVisible =
      noIntersectionObserver && rect
        ? rect.bottom > anchorLine && rect.top < viewportRect.bottom
        : visibleMessageIds.has(messageId);
    if (isVisible) visible.push(messageId);
    if (isAnchor && rect && rect.top <= anchorLine + SCROLL_EPSILON) currentAnchorId = messageId;
  }

  return visible.length === 0 && currentAnchorId === null
    ? EMPTY_VISIBILITY
    : { currentAnchorId, visibleMessageIds: visible };
}

function findFirstAnchorFrom(elements: HTMLElement[], startIndex: number): HTMLElement | null {
  for (let i = startIndex; i < elements.length; i++) {
    const element = elements[i];
    if (element?.dataset.scrollAnchor === "true") return element;
  }
  return null;
}

function findFirstUnhandledAnchor(
  elements: HTMLElement[],
  handled: WeakSet<HTMLElement>
): HTMLElement | null {
  for (const element of elements) {
    if (element.dataset.scrollAnchor === "true" && !handled.has(element)) return element;
  }
  return null;
}

function hasMultipleAnchorsFrom(elements: HTMLElement[], startIndex: number): boolean {
  let count = 0;
  for (let i = startIndex; i < elements.length; i++) {
    if (elements[i]?.dataset.scrollAnchor === "true") {
      count += 1;
      if (count > 1) return true;
    }
  }
  return false;
}

function findLastAnchor(elements: HTMLElement[]): HTMLElement | null {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    if (element?.dataset.scrollAnchor === "true") return element;
  }
  return null;
}

function findFirstVisibleMessage({
  content,
  spacer,
  viewport,
}: {
  content: HTMLElement;
  spacer: HTMLElement | null;
  viewport: HTMLElement;
}): HTMLElement | null {
  const viewportRect = viewport.getBoundingClientRect();
  for (const child of getMessageChildren(content, spacer)) {
    if (!child.dataset.messageId) continue;
    const rect = child.getBoundingClientRect();
    if (rect.bottom > viewportRect.top && rect.top < viewportRect.bottom) return child;
  }
  return null;
}

// -----------------------------------------------------------------------------
// Engine
//
// `createEngine()` runs exactly once per `MessageScrollerProvider` instance
// (unlike a React hook, which re-runs on every render), so plain closure
// variables replace what the original port modeled as React-style refs, and
// native `shallowRef`s replace the hand-rolled external-store subscription
// shim — Vue's reactivity already does that job.
// -----------------------------------------------------------------------------

export interface MessageScrollerContext {
  handleContentChange: () => void;
  handleResize: () => void;
  registerViewport: (element: HTMLElement | null) => void;
  scrollableState: Ref<MessageScrollerScrollable>;
  scrollToEnd: (options?: { behavior?: ScrollBehavior }) => boolean;
  scrollToMessage: (messageId: string, options?: MessageScrollerScrollOptions) => boolean;
  scrollToStart: (options?: { behavior?: ScrollBehavior }) => boolean;
  setContentElement: (element: HTMLElement | null) => void;
  setPreserveScrollOnPrepend: (value: boolean) => void;
  setRootElement: (element: HTMLElement | null) => void;
  setSpacerElement: (element: HTMLElement | null) => void;
  subscribeVisibility: () => void;
  syncAfterScroll: () => void;
  unsubscribeVisibility: () => void;
  userScrollIntent: () => void;
  visibilityState: Ref<MessageScrollerVisibilityState>;
  applyDefaultScrollPosition: () => void;
  onAutoScrollChange: () => void;
}

export type RegisterMessage = (
  messageId: string,
  element: HTMLElement | null,
  previousElement: HTMLElement | null
) => void;

const CONTEXT_KEY: InjectionKey<MessageScrollerContext> = Symbol("MessageScrollerContext");
const REGISTER_KEY: InjectionKey<RegisterMessage> = Symbol("MessageScrollerRegister");

function createEngine(props: Required<MessageScrollerProviderProps>) {
  let autoScroll = props.autoScroll;
  let isAutoscrolling = false;
  let autoscrollingTimeout: number | null = null;
  let streamingTurn: HTMLElement | null = null;
  let contentEl: HTMLElement | null = null;
  let defaultScrollPositionApplied = false;
  let firstItem: HTMLElement | null = null;
  let itemCount = 0;
  let lastScrollTop = 0;
  let mode: Mode = autoScroll ? "following-bottom" : "free-scrolling";
  let pendingScrollFrame: number | null = null;
  let pendingScrollToMessage: PendingScrollToMessage | null = null;
  let prependRestore: PrependRestore | null = null;
  let preserveScrollOnPrepend = true;
  let rootEl: HTMLElement | null = null;
  let scrollEdgeThreshold = props.scrollEdgeThreshold;
  let scrollMargin = props.scrollMargin;
  let scrollPreviousItemPeek = props.scrollPreviousItemPeek;
  let spacerGap = 0;
  let spacerHeightValue = 0;
  let spacerEl: HTMLElement | null = null;
  let stateFrame: number | null = null;
  let viewportEl: HTMLElement | null = null;
  let visibilityFrame: number | null = null;
  let visibilityObserver: IntersectionObserver | null = null;
  let visibilitySubscriberCount = 0;
  const messageElements = new Map<string, HTMLElement>();
  const visibleMessageIds = new Set<string>();
  const handledScrollAnchors = new WeakSet<HTMLElement>();

  const scrollableState = shallowRef<MessageScrollerScrollable>(EMPTY_SCROLLABLE);
  const visibilityState = shallowRef<MessageScrollerVisibilityState>(EMPTY_VISIBILITY);

  // --- scroll-state commit / visibility scheduling ---------------------------

  function applyScrollableAttributes(scrollable: MessageScrollerScrollable) {
    const attr = [scrollable.start && "start", scrollable.end && "end"].filter(Boolean).join(" ");
    for (const element of [rootEl, viewportEl]) {
      if (!element) continue;
      if (attr) element.setAttribute("data-scrollable", attr);
      else element.removeAttribute("data-scrollable");
      element.toggleAttribute("data-autoscrolling", isAutoscrolling);
    }
  }

  function updateModeFromScroll(scrollable: MessageScrollerScrollable) {
    const scrollTopValue = viewportEl?.scrollTop ?? 0;
    const scrolledUp = scrollTopValue < lastScrollTop - SCROLL_EPSILON;
    lastScrollTop = scrollTopValue;
    if (
      autoScroll &&
      !scrollable.end &&
      mode !== "settling-jump" &&
      mode !== "anchored-to-message"
    ) {
      mode = "following-bottom";
    } else if (mode === "following-bottom" && scrollable.end && scrolledUp && !isAutoscrolling) {
      mode = "free-scrolling";
    }
  }

  function commitScrollState() {
    const scrollable = computeScrollable({
      content: contentEl,
      scrollEdgeThreshold,
      spacer: spacerEl,
      viewport: viewportEl,
    });
    updateModeFromScroll(scrollable);
    const next = mode === "following-bottom" ? { ...scrollable, end: false } : scrollable;
    applyScrollableAttributes(next);
    if (!scrollableEqual(scrollableState.value, next)) scrollableState.value = next;
  }

  function scheduleStateCommit() {
    if (stateFrame === null) {
      stateFrame = window.requestAnimationFrame(() => {
        stateFrame = null;
        commitScrollState();
      });
    }
  }

  function syncVisibilityState() {
    const next = computeVisibility({
      content: contentEl,
      scrollMargin,
      scrollPreviousItemPeek,
      spacer: spacerEl,
      viewport: viewportEl,
      visibleMessageIds,
    });
    if (!visibilityEqual(visibilityState.value, next)) visibilityState.value = next;
  }

  function scheduleVisibilitySync() {
    if (visibilitySubscriberCount === 0) return;
    if (visibilityFrame === null) {
      visibilityFrame = window.requestAnimationFrame(() => {
        visibilityFrame = null;
        if (visibilitySubscriberCount > 0) syncVisibilityState();
      });
    }
  }

  // --- imperative scroll primitives ------------------------------------------

  function setAutoscrolling(active: boolean) {
    if (autoscrollingTimeout !== null) {
      window.clearTimeout(autoscrollingTimeout);
      autoscrollingTimeout = null;
    }
    if (isAutoscrolling !== active) {
      isAutoscrolling = active;
      commitScrollState();
    }
    if (active) {
      autoscrollingTimeout = window.setTimeout(() => {
        autoscrollingTimeout = null;
        isAutoscrolling = false;
        commitScrollState();
      }, AUTOSCROLLING_TIMEOUT);
    }
  }

  function setSpacerHeight(height: number) {
    const spacer = spacerEl;
    if (!spacer) return;
    const next = Math.max(0, Math.ceil(height));
    if (spacerHeightValue !== next) {
      spacerHeightValue = next;
      spacer.hidden = next === 0;
      spacer.style.height = `${next}px`;
      spacer.style.marginTop = next > 0 ? `${-spacerGap}px` : "";
    }
  }

  function scrollTo(
    top: number,
    {
      behavior = "auto",
      autoscrolling = false,
    }: { behavior?: ScrollBehavior; autoscrolling?: boolean } = {}
  ) {
    const viewport = viewportEl;
    if (!viewport) return;
    const target = Math.max(0, top);
    if (Math.abs(viewport.scrollTop - target) <= SCROLL_EPSILON) {
      viewport.scrollTop = target;
      commitScrollState();
      return;
    }
    if (autoscrolling) setAutoscrolling(true);
    viewport.scrollTo({ top: target, behavior });
    scheduleStateCommit();
  }

  function scrollToStart({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}): boolean {
    if (!viewportEl) return false;
    setSpacerHeight(0);
    streamingTurn = null;
    mode = "free-scrolling";
    scrollTo(0, { behavior });
    scheduleVisibilitySync();
    return true;
  }

  function scrollToEnd({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}): boolean {
    const viewport = viewportEl;
    if (!viewport) return false;
    setSpacerHeight(0);
    streamingTurn = null;
    mode = autoScroll ? "following-bottom" : "free-scrolling";
    scrollTo(maxScrollTop(viewport), { autoscrolling: true, behavior });
    scheduleVisibilitySync();
    return true;
  }

  function scrollToElement(
    element: HTMLElement,
    {
      align = "start",
      behavior = "auto",
      scrollMargin: margin = scrollMargin,
    }: MessageScrollerScrollOptions = {},
    { keepPreviousPeek = false }: { keepPreviousPeek?: boolean } = {}
  ): boolean {
    const content = contentEl;
    const viewport = viewportEl;
    if (!content || !viewport || !content.contains(element)) return false;
    const targetScrollTop = computeScrollTopForElement({
      align,
      element,
      scrollMargin: keepPreviousPeek ? margin + scrollPreviousItemPeek : margin,
      spacer: spacerEl,
      viewport,
    });
    const nextSpacerHeight = computeSpacerHeight({
      content,
      scrollTop: targetScrollTop,
      spacer: spacerEl,
      viewport,
    });
    setSpacerHeight(nextSpacerHeight);
    prependRestore = { element, viewportTop: getRelativeTop(element, viewport) };
    mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump";
    streamingTurn = keepPreviousPeek ? element : null;
    scrollTo(targetScrollTop, { behavior });
    scheduleVisibilitySync();
    return true;
  }

  function reanchorToAnchoredMessage(): boolean {
    const element = streamingTurn;
    if (!element || !element.isConnected || mode !== "anchored-to-message") return false;
    return scrollToElement(element, { align: "start" }, { keepPreviousPeek: true });
  }

  function scrollToMessage(messageId: string, options?: MessageScrollerScrollOptions): boolean {
    const element = messageElements.get(messageId);
    if (element) {
      defaultScrollPositionApplied = true;
      if (scrollToElement(element, options)) {
        pendingScrollToMessage = null;
        return true;
      }
      pendingScrollToMessage = { messageId, options };
      return true;
    }
    if (itemCount === 0) {
      pendingScrollToMessage = { messageId, options };
      defaultScrollPositionApplied = true;
      return true;
    }
    return false;
  }

  function flushPendingScrollToMessage(): boolean {
    const pending = pendingScrollToMessage;
    if (!pending) return false;
    const element = messageElements.get(pending.messageId);
    if (!element || !scrollToElement(element, pending.options)) return false;
    pendingScrollToMessage = null;
    defaultScrollPositionApplied = true;
    return true;
  }

  // --- prepend preservation --------------------------------------------------

  function applyPrependRestore(): boolean {
    const restore = prependRestore;
    const viewport = viewportEl;
    if (!restore || !viewport || !restore.element.isConnected) return false;
    const delta = getRelativeTop(restore.element, viewport) - restore.viewportTop;
    if (Math.abs(delta) <= SCROLL_EPSILON) return false;
    viewport.scrollTop += delta;
    restore.viewportTop = getRelativeTop(restore.element, viewport);
    scheduleStateCommit();
    scheduleVisibilitySync();
    return true;
  }

  function capturePrependAnchor() {
    const content = contentEl;
    const viewport = viewportEl;
    if (!content || !viewport) {
      prependRestore = null;
      return;
    }
    const element = findFirstVisibleMessage({ content, spacer: spacerEl, viewport });
    prependRestore = element ? { element, viewportTop: getRelativeTop(element, viewport) } : null;
  }

  function schedulePrependFlush() {
    if (pendingScrollFrame === null) {
      pendingScrollFrame = window.requestAnimationFrame(() => {
        pendingScrollFrame = null;
        if (flushPendingScrollToMessage()) capturePrependAnchor();
      });
    }
  }

  // --- default scroll position -----------------------------------------------

  function applyDefaultScrollPosition(): boolean {
    if (!props.defaultScrollPosition || defaultScrollPositionApplied || itemCount === 0) {
      return false;
    }
    let applied: boolean;
    if (props.defaultScrollPosition === "last-anchor") {
      const content = contentEl;
      const viewport = viewportEl;
      const lastAnchor =
        content && viewport ? findLastAnchor(getMessageChildren(content, spacerEl)) : null;
      if (!content || !viewport || !lastAnchor) {
        applied = scrollToEnd({ behavior: "auto" });
      } else {
        const anchorOffset = getElementOffsetTop(lastAnchor, viewport);
        const contentHeight = measureContentHeight({ content, spacer: spacerEl, viewport });
        applied =
          contentHeight - anchorOffset <= viewport.clientHeight
            ? scrollToEnd({ behavior: "auto" })
            : scrollToElement(lastAnchor, { align: "start" }, { keepPreviousPeek: true });
      }
    } else {
      applied =
        props.defaultScrollPosition === "end"
          ? scrollToEnd({ behavior: "auto" })
          : scrollToStart({ behavior: "auto" });
    }
    if (applied) {
      defaultScrollPositionApplied = true;
      return true;
    }
    return false;
  }

  // --- content / resize handling ---------------------------------------------

  function handleContentChange() {
    const content = contentEl;
    if (!content) return;
    const children = getMessageChildren(content, spacerEl);
    const previousCount = itemCount;
    const previousFirst = firstItem;
    itemCount = children.length;
    firstItem = children[0] ?? null;

    (() => {
      if (flushPendingScrollToMessage()) return;
      if (previousCount === 0) {
        if (
          applyDefaultScrollPosition() ||
          (children.length > 0 && autoScroll && scrollToEnd({ behavior: "auto" }))
        ) {
          return;
        }
        commitScrollState();
        scheduleVisibilitySync();
        return;
      }
      const previousIndex = previousFirst ? children.indexOf(previousFirst) : -1;
      if (preserveScrollOnPrepend && previousIndex > 0) {
        applyPrependRestore();
        return;
      }
      if (children.length > previousCount) {
        const anchor = findFirstAnchorFrom(children, previousCount);
        if (anchor) {
          if (
            autoScroll &&
            mode === "following-bottom" &&
            hasMultipleAnchorsFrom(children, previousCount)
          ) {
            scrollToEnd({ behavior: "auto" });
            return;
          }
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
          handledScrollAnchors.add(anchor);
          return;
        }
      }
      if (children.length === previousCount) {
        const anchor = findFirstUnhandledAnchor(children, handledScrollAnchors);
        if (anchor) {
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true });
          handledScrollAnchors.add(anchor);
          return;
        }
      }
      if (mode === "following-bottom" && autoScroll) {
        scrollToEnd({ behavior: "auto" });
      } else {
        commitScrollState();
        scheduleVisibilitySync();
      }
    })();

    capturePrependAnchor();
  }

  function handleResize() {
    if (mode === "following-bottom" && autoScroll) {
      scrollToEnd({ behavior: "auto" });
      return;
    }
    const previousStartScrollable = scrollableState.value.start;
    if (reanchorToAnchoredMessage()) {
      if (autoScroll && previousStartScrollable && !scrollableState.value.start) {
        scrollToEnd({ behavior: "auto" });
      }
      return;
    }
    scheduleStateCommit();
    scheduleVisibilitySync();
  }

  // --- visibility observation ------------------------------------------------

  function observeVisibility() {
    const viewport = viewportEl;
    if (!viewport || visibilitySubscriberCount === 0) return;
    if (typeof IntersectionObserver === "undefined") {
      scheduleVisibilitySync();
      return;
    }
    if (!visibilityObserver) {
      visibilityObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const messageId = (entry.target as HTMLElement).dataset.messageId;
            if (!messageId) continue;
            if (entry.isIntersecting) visibleMessageIds.add(messageId);
            else visibleMessageIds.delete(messageId);
          }
          scheduleVisibilitySync();
        },
        {
          root: viewport,
          rootMargin: `${-(scrollMargin + scrollPreviousItemPeek)}px 0px 0px 0px`,
          threshold: [0, 0.01, 0.5, 1],
        }
      );
    }
    messageElements.forEach((element) => {
      visibilityObserver?.observe(element);
    });
    scheduleVisibilitySync();
  }

  function unobserveVisibility() {
    if (visibilityFrame !== null) {
      window.cancelAnimationFrame(visibilityFrame);
      visibilityFrame = null;
    }
    visibilityObserver?.disconnect();
    visibilityObserver = null;
    visibleMessageIds.clear();
    if (!visibilityEqual(visibilityState.value, EMPTY_VISIBILITY)) {
      visibilityState.value = EMPTY_VISIBILITY;
    }
  }

  function subscribeVisibility() {
    visibilitySubscriberCount += 1;
    if (visibilitySubscriberCount === 1) observeVisibility();
  }

  function unsubscribeVisibility() {
    visibilitySubscriberCount = Math.max(0, visibilitySubscriberCount - 1);
    if (visibilitySubscriberCount === 0) unobserveVisibility();
  }

  const registerMessage: RegisterMessage = (messageId, element, previousElement) => {
    if (element) {
      messageElements.set(messageId, element);
      visibilityObserver?.observe(element);
      scheduleVisibilitySync();
      if (pendingScrollToMessage?.messageId === messageId) schedulePrependFlush();
      return;
    }
    if (previousElement && messageElements.get(messageId) === previousElement) {
      messageElements.delete(messageId);
      visibleMessageIds.delete(messageId);
      visibilityObserver?.unobserve(previousElement);
      scheduleVisibilitySync();
    }
  };

  // --- user intent + element setters -----------------------------------------

  function userScrollIntent() {
    if (mode === "following-bottom" || mode === "anchored-to-message" || mode === "settling-jump") {
      streamingTurn = null;
      mode = "free-scrolling";
    }
  }

  function reapplyAttributes() {
    applyScrollableAttributes(scrollableState.value);
  }

  function setRootElement(element: HTMLElement | null) {
    rootEl = element;
    if (element) reapplyAttributes();
  }

  function registerViewport(element: HTMLElement | null) {
    viewportEl = element;
    if (element) {
      reapplyAttributes();
      // A visibility consumer may have subscribed before the viewport mounted,
      // in which case observeVisibility() bailed out. Retry now it exists.
      observeVisibility();
    }
  }

  function setContentElement(element: HTMLElement | null) {
    contentEl = element;
  }

  function setSpacerElement(element: HTMLElement | null) {
    spacerEl = element;
    spacerGap = getRowGap(element?.parentElement ?? null);
  }

  function setPreserveScrollOnPrepend(value: boolean) {
    preserveScrollOnPrepend = value;
  }

  function syncAfterScroll() {
    commitScrollState();
    scheduleVisibilitySync();
    capturePrependAnchor();
  }

  function onAutoScrollChange() {
    if (autoScroll && mode === "following-bottom" && itemCount > 0) {
      scrollToEnd({ behavior: "auto" });
      return;
    }
    commitScrollState();
  }

  function destroy() {
    if (stateFrame !== null) {
      window.cancelAnimationFrame(stateFrame);
      stateFrame = null;
    }
    if (visibilityFrame !== null) {
      window.cancelAnimationFrame(visibilityFrame);
      visibilityFrame = null;
    }
    if (autoscrollingTimeout !== null) {
      window.clearTimeout(autoscrollingTimeout);
      autoscrollingTimeout = null;
    }
    if (pendingScrollFrame !== null) {
      window.cancelAnimationFrame(pendingScrollFrame);
      pendingScrollFrame = null;
    }
    visibilityObserver?.disconnect();
    visibilityObserver = null;
  }

  const context: MessageScrollerContext = {
    handleContentChange,
    handleResize,
    registerViewport,
    scrollableState,
    scrollToEnd,
    scrollToMessage,
    scrollToStart,
    setContentElement,
    setPreserveScrollOnPrepend,
    setRootElement,
    setSpacerElement,
    subscribeVisibility,
    syncAfterScroll,
    unsubscribeVisibility,
    userScrollIntent,
    visibilityState,
    applyDefaultScrollPosition,
    onAutoScrollChange,
  };

  return {
    context,
    registerMessage,
    destroy,
    setProps(next: Required<MessageScrollerProviderProps>) {
      autoScroll = next.autoScroll;
      scrollEdgeThreshold = next.scrollEdgeThreshold;
      scrollMargin = next.scrollMargin;
      scrollPreviousItemPeek = next.scrollPreviousItemPeek;
    },
  };
}

// -----------------------------------------------------------------------------
// Provider wiring (provide/inject)
// -----------------------------------------------------------------------------

export function provideMessageScroller(props: Required<MessageScrollerProviderProps>) {
  const engine = createEngine(props);
  provide(CONTEXT_KEY, engine.context);
  provide(REGISTER_KEY, engine.registerMessage);
  if (getCurrentInstance()) onUnmounted(() => engine.destroy());
  return engine;
}

export function useMessageScrollerContext(): MessageScrollerContext {
  const context = inject(CONTEXT_KEY, null);
  if (!context) throw new Error("useMessageScroller must be used within a MessageScroller.");
  return context;
}

export function useMessageScrollerRegister(): RegisterMessage {
  const register = inject(REGISTER_KEY, null);
  if (!register) throw new Error("MessageScrollerItem must be used within a MessageScroller.");
  return register;
}

// -----------------------------------------------------------------------------
// Public composables
// -----------------------------------------------------------------------------

export function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScrollerContext();
  return { scrollToEnd, scrollToMessage, scrollToStart };
}

export function useMessageScrollerScrollable(): Ref<MessageScrollerScrollable> {
  const { scrollableState } = useMessageScrollerContext();
  return scrollableState;
}

export function useMessageScrollerVisibility(): Ref<MessageScrollerVisibilityState> {
  const { subscribeVisibility, unsubscribeVisibility, visibilityState } =
    useMessageScrollerContext();
  subscribeVisibility();
  if (getCurrentInstance()) onUnmounted(unsubscribeVisibility);
  return visibilityState;
}

export const DEFAULTS = {
  scrollEdgeThreshold: DEFAULT_SCROLL_EDGE_THRESHOLD,
  scrollPreviousItemPeek: DEFAULT_SCROLL_PREVIOUS_ITEM_PEEK,
  scrollMargin: DEFAULT_SCROLL_MARGIN,
};

export { SCROLL_KEYS };
