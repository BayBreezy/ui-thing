import fuse from "fuse.js";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  // accept a search param
  const { search } = await getValidatedQuery(
    event,
    z.object({
      search: z.coerce.string().trim().nullish(),
    }).parse
  );
  // if no search term was provided, return all components
  if (!search) {
    return comp;
  }
  // search for the component using fuse.js
  const fuseInstance = new fuse(comp, {
    keys: ["name", "value", "docsPath"],
    threshold: 0.3,
  });
  const results = fuseInstance.search(search);
  return results.map((r) => r.item);
});
