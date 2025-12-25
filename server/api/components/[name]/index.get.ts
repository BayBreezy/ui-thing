export default defineEventHandler(async (event) => {
  // get the name from the route parameters
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name parameter is required",
    });
  }
  const decodedName = decodeURIComponent(name).toLowerCase();

  // check if component name starts with ui prefix and strip it
  const compName = decodedName.replace(/^u[-_]*i[-_]*/i, "");
  // from the list of comps, find the one that matches the name
  const component = comp.find(
    (c) => c.name.toLowerCase() === compName || c.value.toLowerCase() === compName
  );
  if (!component) {
    throw createError({
      statusCode: 404,
      statusMessage: `Component "${name}" not found`,
    });
  }
  return component;
});
