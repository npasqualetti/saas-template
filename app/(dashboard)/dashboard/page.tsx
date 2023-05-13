import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { WatchlistCreateButton } from "@/components/watchlist-create-button"
import { WatchlistItem } from "@/components/watchlist-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const watchlist = await db.watchlist.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      symbol: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Watchlist" text="Create and manage your watchlist.">
        <WatchlistCreateButton />
      </DashboardHeader>
      <div>
        {watchlist?.length ? (
          <div className="divide-y divide-border rounded-md border">
            holding
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No watchlist created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any watchlist yet. Start creating content.
            </EmptyPlaceholder.Description>
            <WatchlistCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
