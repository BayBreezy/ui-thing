import prose from "~~/server/utils/prose";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide the name of the prose component that you need",
    });
  }

  const results = prose.find(
    (p) =>
      p.name.toLowerCase() === name.toLowerCase() ||
      p.value.toLowerCase() === name.toLowerCase() ||
      p.fileName.toLowerCase() === name.toLowerCase()
  );

  if (!results) {
    throw createError({
      statusCode: 404,
      statusMessage: `Prose component '${name}' not found`,
    });
  }

  return results;
});
