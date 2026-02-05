import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPPABASE_ANON_KEY!,{
            async accessToken() {
                return ((await auth()).getToken());
            }
        }

    )
}