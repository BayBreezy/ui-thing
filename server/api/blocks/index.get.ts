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
  // if no search term was provided, return all blocks
  if (!search) {
    return blockExamples;
  }
  // search for the block using fuse.js
  const fuseInstance = new fuse(blockExamples, {
    keys: ["name", "fileName", "category", "path"],
    threshold: 0.3,
  });
  const results = fuseInstance.search(search);
  return results.map((r) => r.item);
});
