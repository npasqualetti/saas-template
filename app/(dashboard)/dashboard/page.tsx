import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { WatchlistCreateButton } from "@/components/watchlist-create-button"
import WatchlistItem from "@/components/watchlist-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Watchlist"
        text="Create and manage your watchlist."
      >
        <WatchlistCreateButton />
      </DashboardHeader>
      <div>

      </div>
    </DashboardShell>
  )
}
