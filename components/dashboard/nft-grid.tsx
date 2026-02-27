"use client"

import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"
import { NFTCard } from "@/components/nft-card"
import { MOCKED_OWNED_NFTS } from "@/lib/mock-data"

export function NFTGrid() {
  if (MOCKED_OWNED_NFTS.length === 0) {
    return (
      <div className="p-8 rounded-2xl glass text-center">
        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No NFTs Yet</h3>
        <p className="text-muted-foreground text-sm">Your minted NFTs will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Collection</h3>
        <span className="text-sm text-muted-foreground">{MOCKED_OWNED_NFTS.length} NFTs</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCKED_OWNED_NFTS.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NFTCard nft={nft} size="md" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
