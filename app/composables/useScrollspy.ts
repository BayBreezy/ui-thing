type TargetLike =
  | HTMLElement
  | Window
  | Document
  | null
  | undefined
  | MaybeRefOrGetter<HTMLElement | Window | Document | null | undefined>;

type AnchorRecord = {
  anchor: HTMLElement;
  section: HTMLElement;
  sectionId: string;
  offset: number;
};

export interface UseScrollspyOptions {
  /** Container that actually scrolls (ref or element). Omit to use `window`. */
  target?: TargetLike;
  /** Element containing the ANCHORS (ref or element). If omitted, use the returned `root` ref. */
  root?: HTMLElement | null | Ref<HTMLElement | null | undefined>;
  /** Base data-* name -> anchors should have `data-[name]-anchor="sectionId"`. */
  dataAttribute?: string;
  /** Default offset from top (px) when computing active section / scrolling. */
  offset?: number;
  /** Smooth scroll on click. */
  smooth?: boolean;
  /** Update URL hash as active section changes. */
  history?: boolean;
  /** Throttle time (ms) for scroll handler. */
  throttleTime?: number;
  /** Whether to mark only the current section or every visible section as active. */
  mode?: "single" | "multiple";
  /** Optional callback when active id changes (you can also watch `activeId`). */
  onChange?: (id: string) => void;
}

export function useScrollspy(options: UseScrollspyOptions = {}) {
  const {
    target,
    root: rootOpt,
    dataAttribute = "scrollspy",
    offset = 0,
    smooth = true,
    history = true,
    throttleTime = 50,
    mode = "single",
    onChange,
  } = options;

  // Anchors live inside this container; use returned `root` if none passed
  const root = (rootOpt ?? ref<HTMLElement | null>(null)) as Ref<HTMLElement | null>;
  const anchors = shallowRef<HTMLElement[]>([]);
  const activeId = ref<string | null>(null);
  const activeIds = ref<string[]>([]);
  const prevId = ref<string | null>(null);

  // --- Resolve the scroller (window by default) ---
  const scroller = shallowRef<Window | HTMLElement | null>(null);

  function sectionTopWithinScroller(sectionEl: HTMLElement): number {
    const se = scroller.value;
    const rect = sectionEl.getBoundingClientRect();
    if (!se || se === window) {
      return rect.top + (window.scrollY || document.documentElement.scrollTop);
    }

    const scRect = se.getBoundingClientRect();
    return rect.top - scRect.top + se.scrollTop;
  }

  function resolveScroller() {
    const t = unrefElement(target as any);
    if (!t || t === window || t === document) {
      scroller.value = window;
    } else if (t instanceof HTMLElement) {
      scroller.value = t;
    } else {
      scroller.value = window;
    }
  }

  onMounted(resolveScroller);
  watch(() => unrefElement(target as any), resolveScroller, { immediate: true });

  // --- Discover anchors inside `root` and keep updated on DOM changes ---
  function queryAnchors() {
    anchors.value = root.value
      ? Array.from(root.value.querySelectorAll<HTMLElement>(`[data-${dataAttribute}-anchor]`))
      : [];
  }
  onMounted(queryAnchors);
  useMutationObserver(root, queryAnchors, { childList: true, subtree: true });

  // Helpers for scroll metrics
  function getScrollTop(se: Window | HTMLElement | null) {
    if (!se || se === window) {
      return window.scrollY || document.documentElement.scrollTop;
    }

    return se.scrollTop;
  }

  function getScrollHeight(se: Window | HTMLElement | null) {
    if (!se || se === window) {
      return document.documentElement.scrollHeight;
    }

    return se.scrollHeight;
  }

  function getClientHeight(se: Window | HTMLElement | null) {
    if (!se || se === window) {
      return window.innerHeight;
    }

    return se.clientHeight;
  }

  function getViewportBounds(customOffset: number) {
    const se = scroller.value;
    if (!se || se === window) {
      return {
        top: customOffset,
        bottom: window.innerHeight,
      };
    }

    const rect = se.getBoundingClientRect();

    return {
      top: rect.top + customOffset,
      bottom: rect.bottom,
    };
  }

  function getAnchorRecords() {
    return anchors.value.reduce<AnchorRecord[]>((records, anchor) => {
      const sectionId =
        anchor.getAttribute(`data-${dataAttribute}-anchor`)?.replace("#", "") || null;
      if (!sectionId) return records;

      const section = document.getElementById(sectionId);
      if (!section) return records;

      let customOffset = offset;
      const dataOffset = anchor.getAttribute(`data-${dataAttribute}-offset`);
      if (dataOffset) customOffset = parseInt(dataOffset, 10);

      records.push({
        anchor,
        section,
        sectionId,
        offset: customOffset,
      });

      return records;
    }, []);
  }

  // --- Core: compute active anchor on scroll ---
  function setActive(nextActiveIds: string[], sectionId: string | null, force = false) {
    const activeIdSet = new Set(nextActiveIds);

    anchors.value.forEach((anchor) => {
      const id = anchor.getAttribute(`data-${dataAttribute}-anchor`)?.replace("#", "") || null;
      if (id && activeIdSet.has(id)) anchor.setAttribute("data-active", "true");
      else anchor.removeAttribute("data-active");
    });

    activeIds.value = nextActiveIds;
    activeId.value = sectionId;

    if (sectionId && history && (force || prevId.value !== sectionId)) {
      window.history.replaceState({}, "", `#${sectionId}`);
    }

    if (sectionId && prevId.value !== sectionId) {
      onChange?.(sectionId);
      prevId.value = sectionId;
    }
  }

  function handleScroll() {
    if (!anchors.value.length) {
      setActive([], null);
      return;
    }

    const se = scroller.value;
    const scrollTop = getScrollTop(se);
    const records = getAnchorRecords();
    if (!records.length) {
      setActive([], null);
      return;
    }

    let activeIdx = 0;
    let minDelta = Infinity;

    records.forEach((record, idx) => {
      const top = sectionTopWithinScroller(record.section) - record.offset;
      const delta = Math.abs(top - scrollTop);

      if (top <= scrollTop && delta < minDelta) {
        minDelta = delta;
        activeIdx = idx;
      }
    });

    // At bottom → force last anchor active
    const atBottom = scrollTop + getClientHeight(se) >= getScrollHeight(se) - 2;
    if (atBottom) activeIdx = records.length - 1;

    const currentId = records[activeIdx]?.sectionId || null;
    const nextActiveIds =
      mode === "multiple"
        ? records
            .filter((record) => {
              const rect = record.section.getBoundingClientRect();
              const viewport = getViewportBounds(record.offset);
              return rect.bottom > viewport.top && rect.top < viewport.bottom;
            })
            .map((record) => record.sectionId)
        : currentId
          ? [currentId]
          : [];

    setActive(nextActiveIds, currentId);
  }

  const onScroll = throttleTime
    ? useThrottleFn(handleScroll, throttleTime, true, false)
    : handleScroll;

  // Rebind when scroller changes
  useEventListener(scroller, "scroll", onScroll, { passive: true });

  // --- Click to scroll ---
  function scrollTo(
    idOrEl: string | HTMLElement,
    behavior: ScrollBehavior = smooth ? "smooth" : "auto"
  ) {
    let anchorEl: HTMLElement | null = null;
    let sectionId: string | null = null;

    if (typeof idOrEl === "string") {
      sectionId = idOrEl;
      anchorEl =
        anchors.value.find((a) => a.getAttribute(`data-${dataAttribute}-anchor`) === idOrEl) ||
        anchors.value.find(
          (a) => a.getAttribute(`data-${dataAttribute}-anchor`) === `#${idOrEl}`
        ) ||
        null;
    } else {
      anchorEl = idOrEl;
      sectionId = anchorEl.getAttribute(`data-${dataAttribute}-anchor`)?.replace("#", "") || null;
    }
    if (!sectionId) return;

    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;

    let customOffset = offset;
    const dataOffset = anchorEl?.getAttribute?.(`data-${dataAttribute}-offset`);
    if (dataOffset) customOffset = parseInt(dataOffset, 10);

    const top = sectionTopWithinScroller(sectionEl) - customOffset;
    const se = scroller.value ?? window;

    if ("scrollTo" in se) {
      (se as Window | HTMLElement).scrollTo({ top, left: 0, behavior });
    } else {
      window.scrollTo({ top, left: 0, behavior });
    }
    setActive([sectionId], sectionId, true);
  }

  // Bind click listeners to anchors and auto-clean when the list changes
  watch(
    anchors,
    (list, _old, onCleanup) => {
      const stops: Array<() => void> = [];
      list.forEach((el) => {
        stops.push(
          useEventListener(el, "click", (e) => {
            e.preventDefault();
            scrollTo(el as HTMLElement);
          })
        );
      });
      onCleanup(() => stops.forEach((s) => s()));
    },
    { immediate: true }
  );

  // Initial sync after mount
  onMounted(() => {
    // If URL has a hash, scroll there
    const raw = window.location.hash.replace("#", "");
    if (raw) {
      const safe = window.CSS && "escape" in window.CSS ? (window.CSS as any).escape(raw) : raw;
      const targetAnchor = root.value?.querySelector(
        `[data-${dataAttribute}-anchor="${safe}"], [data-${dataAttribute}-anchor="#${safe}"]`
      ) as HTMLElement | null;
      if (targetAnchor) scrollTo(targetAnchor, "auto");
    }
    // Then compute the initial active anchor
    setTimeout(() => onScroll(), 60);
  });

  return {
    /** Container that holds the anchors (use this if you didn't pass `root`) */
    root,
    /** Currently active section id */
    activeId,
    /** Currently active section ids */
    activeIds,
    /** Programmatically scroll to a section id or anchor element */
    scrollTo,
    /** Force recompute (e.g., after dynamic layout changes) */
    recompute: () => handleScroll(),
  };
}
