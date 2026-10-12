// Compiles src/paraglide with the same options as the Vite plugin, so
// type-aware lint can resolve it before `vp build` runs.
import {compile} from "@inlang/paraglide-js";
import {paraglideOptions} from "../src/lib/paraglide-config.ts";

await compile(paraglideOptions);
