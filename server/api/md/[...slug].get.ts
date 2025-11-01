import { stringify } from "minimark/stringify";
import { withLeadingSlash } from "ufo";
import { object, string } from "yup";

const slugSchema = object({
  slug: string().min(2).max(100).required().label("Slug"),
});

export default defineEventHandler(async (event) => {
  // validate the slug parameter from the request
  const { slug } = await getValidatedRouterParams(event, (d) => slugSchema.validateSync(d));
  // get the page from the docs collection
  const page = await queryCollection(event, "content").path(withLeadingSlash(slug)).first();
  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      message: `No page found for slug: ${slug}`,
      data: { slug },
    });
  }

  // Add title and description to the top of the page if missing
  if (page.body.value[0]?.[0] !== "h1") {
    page.body.value.unshift(["blockquote", {}, page.description]);
    page.body.value.unshift(["h1", {}, page.title]);
  }
  // Add link to the md file on github at the bottom of the page
  page.body.value.push([
    "p",
    {},
    "For more details, see the ",
    [
      "a",
      { href: `https://github.com/BayBreezy/ui-thing/blob/v2/content/${page.stem}.md?plain=1` },
      "markdown source file on GitHub",
    ],
    ".",
  ]);

  setHeader(event, "Content-Type", "text/markdown; charset=utf-8");

  return stringify({ ...page.body, type: "minimark" }, { format: "markdown/html" });
});
