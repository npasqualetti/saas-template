import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { watchlistPatchSchema } from "@/lib/validations/watchlist"

const routeContextSchema = z.object({
  params: z.object({
    watchlistId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.watchlistId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the post.
    await db.watchlist.delete({
      where: {
        id: params.watchlistId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.watchlistId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = watchlistPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.watchlist.update({
      where: {
        id: params.watchlistId,
      },
      data: {
        symbol: body.symbol,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(watchlistId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.watchlist.count({
    where: {
      id: watchlistId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
