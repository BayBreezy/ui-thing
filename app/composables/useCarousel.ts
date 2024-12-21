import { createInjectionState } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import type useEmblaCarousel from "embla-carousel-vue";
import type { EmblaCarouselVueType } from "embla-carousel-vue";
import type { HTMLAttributes, UnwrapRef } from "vue";

type CApi = EmblaCarouselVueType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselApi = UnwrapRef<CApi>;

export interface CarouselProps {
  /**
   * The options to be passed to the EmblaCarousel instance
   */
  opts?: CarouselOptions;
  /**
   * The plugins to be passed to the EmblaCarousel instance
   */
  plugins?: CarouselPlugin;
  /**
   * The orientation of the carousel
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

export interface CarouselEmits {
  (e: "init-api", payload: CarouselApi): void;
}

export interface WithClassAsProps {
  /**
   * The class name to be applied to the root element of the component
   * @default undefined
   */
  class?: HTMLAttributes["class"];
}

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({ opts, orientation, plugins }: CarouselProps, emits: CarouselEmits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    /**
     * Scroll to the previous slide
     */
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    /**
     * Scroll to the next slide
     */
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }
    /**
     * Whether the carousel can scroll to the next slide
     */
    const canScrollNext = ref(false);
    /**
     * Whether the carousel can scroll to the previous slide
     */
    const canScrollPrev = ref(false);
    /**
     * Method used to update the canScrollNext and canScrollPrev values
     */
    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }

    onMounted(() => {
      if (!emblaApi.value) return;
      emblaApi.value?.on("init", onSelect);
      emblaApi.value?.on("reInit", onSelect);
      emblaApi.value?.on("select", onSelect);

      emits("init-api", emblaApi.value);
    });

    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      orientation,
    };
  }
);

/**
 * A composable function to be used within a <UiCarousel /> component
 */
function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState) throw new Error("useCarousel must be used within a <UiCarousel />");
  return carouselState;
}

export { useCarousel, useProvideCarousel };
