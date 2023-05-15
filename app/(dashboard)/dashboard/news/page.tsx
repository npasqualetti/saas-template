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

async function getData() {
  const res = await fetch(
    "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  console.log(res.json())
  return res.json()
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const data = await getData()
  console.log(data)

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
      <DashboardHeader heading="News" text="Read the latest news." />
      <div>
        <div className="divide-y divide-border rounded-md border">
          <NewsItem />
        </div>

        {watchlist?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {watchlist.map((watchlist) => (
              <WatchlistItem key={watchlist.id} watchlist={watchlist} />
            ))}{" "}
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
