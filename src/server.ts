import handler from "@tanstack/react-start/server-entry";
import type {RequestOptions} from "@tanstack/react-start/server";
import {paraglideMiddleware} from "@/paraglide/server";

export default {
  fetch(request: Request, opts?: RequestOptions<never>) {
    return paraglideMiddleware(request, () => handler.fetch(request, opts as RequestOptions<never>));
  },
};
