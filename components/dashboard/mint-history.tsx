"use client"

import { motion } from "framer-motion"
import { ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MOCKED_MINT_HISTORY } from "@/lib/mock-data"

export function MintHistory() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  if (MOCKED_MINT_HISTORY.length === 0) {
    return (
      <div className="p-8 rounded-2xl glass text-center">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Mint History</h3>
        <p className="text-muted-foreground text-sm">Your minting transactions will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Mint History</h3>
      <div className="space-y-3">
        {MOCKED_MINT_HISTORY.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl glass hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium">
                  Minted {tx.quantity} NFT{tx.quantity > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  Token{tx.tokenIds.length > 1 ? "s" : ""}: {tx.tokenIds.map((id) => `#${id}`).join(", ")}
                </p>
                <p className="text-xs text-muted-foreground font-mono">{shortenHash(tx.txHash)}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-mono text-sm">{tx.totalCost} ETH</p>
                <p className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
