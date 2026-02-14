// middleware.ts (or src/middleware.ts)

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Adjust path if src/

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except internals, static, api, etc.
    "/((?!_next|_vercel|api|.*\\..*).*)",
    "/",
  ],
};
