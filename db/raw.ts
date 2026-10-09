import { env } from "cloudflare:workers";
export function rawDb():D1Database {
 if(!env.DB) throw new Error("STORAGE_UNAVAILABLE");
 return env.DB;
}
