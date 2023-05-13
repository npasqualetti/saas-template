import * as z from "zod"

export const watchlistPatchSchema = z.object({
  symbol: z.string().min(1).max(128).optional(),
})
