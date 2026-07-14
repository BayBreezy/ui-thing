import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide the slug of the changelog entry that you need",
    });
  }

  const entry = await queryCollection(event, "changelog")
    .where("slug", "=", decodeURIComponent(slug))
    .first();

  if (!entry) {
    throw createError({
      statusCode: 404,
      statusMessage: `No changelog entry found for slug "${slug}"`,
    });
  }

  return entry;
});
