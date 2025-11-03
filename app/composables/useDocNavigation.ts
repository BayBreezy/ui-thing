import { kebabCase } from "lodash-es";

export const useDocNavigation = async () => {
  const route = useRoute();
  const { data } = await useAsyncData(kebabCase(route.path) + "-navigation", async () => {
    const content = await queryCollectionNavigation("content", [
      "icon",
      "label",
      "links",
      "layout",
    ]);
    // find the "examples" section and add extra links
    const examplesSection = content.find((section) => section.title?.toLowerCase() === "examples");
    if (examplesSection && examplesSection.children) {
      examplesSection.children.push(
        {
          title: "Settings Dashboard",
          path: "https://settings-dash.behonbaker.com/",
          target: "_blank",
        },
        {
          title: "T-Tag UI",
          path: "https://etag-ui.behonbaker.com/",
          target: "_blank",
        },
        {
          title: "UI Todo",
          path: "https://ui-todo.behonbaker.com/",
          target: "_blank",
        }
      );
    }
    return { content };
  });
  return { content: data.value?.content };
};
