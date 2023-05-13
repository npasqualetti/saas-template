import Link from "next/link"
import { Watchlist } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { WatchlistOperations } from "@/components/watchlist-operations"

interface WatchlistItemProps {
  watchlist: Pick<Watchlist, "id" | "symbol" | "createdAt">
}

export default function WatchlistItem({ watchlist }: WatchlistItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${watchlist.id}`}
          className="font-semibold hover:underline"
        >
          {watchlist.symbol}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(watchlist.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <WatchlistOperations watchlist={{ id: watchlist.id, symbol: watchlist.symbol }} />
    </div>
  )
}

WatchlistItem.Skeleton = function WatchlistItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
