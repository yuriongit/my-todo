import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

export const supabase = createClient<Database>(
	String(process.env.SUPABASE_URL),
	String(process.env.SUPABASE_SECRET),
);
