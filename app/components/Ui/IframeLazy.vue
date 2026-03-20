<template>
  <div ref="root" :class="styles().wrapper({ class: normalizeClass(props.class) || undefined })">
    <div v-if="!visible && placeholder" class="size-full">
      <slot name="placeholder"> <div class="size-full bg-muted" /> </slot>
    </div>

    <iframe
      v-show="visible"
      :src="visible ? src : undefined"
      :class="styles().iframe({ class: normalizeClass(iframeClass) || undefined })"
      :loading
      frameborder="0"
      allowfullscreen
      :scrolling="disableScroll ? 'no' : 'yes'"
      @load="$emit('load', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineEmits<{ load: [event: Event] }>();

  type IFrameLazyProps = {
    /**
     * The URL of the page to embed in the iframe.
     */
    src?: string;
    /**
     * Additional classes to apply to the wrapper element.
     */
    class?: HTMLAttributes["class"];
    /**
     * Additional classes to apply to the iframe element.
     */
    iframeClass?: HTMLAttributes["class"];
    /**
     * Indicates when the browser should load the iframe
     *
     * - `lazy`: Load the iframe when it is about to come into view.
     * - `eager`: Load the iframe immediately.
     *
     * @default "lazy"
     */
    loading?: "lazy" | "eager";
    /**
     * Whether to show a placeholder before the iframe is loaded.
     *
     * @default true
     */
    placeholder?: boolean;
    /**
     * A string which specifies a set of offsets to add to the root's bounding box when calculating intersections.
     *
     * @default "150px"
     */
    rootMargin?: string;
    /**
     * Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area for the observed target.
     * @default 0
     */
    threshold?: number | number[];
    /**
     * Disable scrolling within the iframe.
     */
    disableScroll?: boolean;
  };

  const props = withDefaults(defineProps<IFrameLazyProps>(), {
    loading: "lazy",
    rootMargin: "150px",
    placeholder: true,
  });

  const styles = tv({
    slots: {
      wrapper: "relative size-full",
      iframe: "size-full",
    },
  });

  const root = useTemplateRef("root");
  const visible = shallowRef(false);

  useIntersectionObserver(
    root,
    ([entry], observerElement) => {
      if (entry?.isIntersecting) {
        visible.value = true;
        observerElement?.disconnect();
      }
    },
    { root: null, rootMargin: props.rootMargin, threshold: props.threshold }
  );
</script>
