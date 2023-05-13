import { DashboardHeader } from "@/components/header"
import { WatchlistCreateButton } from "@/components/watchlist-create-button"
import { WatchlistItem } from "@/components/watchlist-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Watchlists" text="Create and manage posts.">
        <WatchlistCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <WatchlistItem.Skeleton />
        <WatchlistItem.Skeleton />
        <WatchlistItem.Skeleton />
        <WatchlistItem.Skeleton />
        <WatchlistItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
