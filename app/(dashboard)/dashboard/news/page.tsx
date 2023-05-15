import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { WatchlistCreateButton } from "@/components/watchlist-create-button"
import WatchlistItem from "@/components/watchlist-item"
import { NewsItem } from "@/components/news-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="News" text="Read the latest news." />
      <div>
        {true ? (
          <div className="divide-y divide-border rounded-md border">
            hi
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No watchlist created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any items in your watchlist yet. Start by
              adding tickers.
            </EmptyPlaceholder.Description>
            <WatchlistCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
