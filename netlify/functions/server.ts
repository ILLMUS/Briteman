import { createRequestHandler } from "@tanstack/start/server";

export const handler = createRequestHandler({
  build: require("../../.output/server"),
});
