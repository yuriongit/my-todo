import cors from "cors"
export const corsConfig = cors({
   origin: String(process.env.FRONTEND_URL)
})