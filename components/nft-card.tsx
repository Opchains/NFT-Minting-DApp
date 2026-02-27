"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { NFTItem } from "@/lib/mock-data"

interface NFTCardProps {
  nft: NFTItem
  size?: "sm" | "md" | "lg"
  showDetails?: boolean
  className?: string
}

const rarityColors = {
  Common: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  Rare: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Epic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Legendary: "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

export function NFTCard({ nft, size = "md", showDetails = true, className }: NFTCardProps) {
  const sizeClasses = {
    sm: "w-full max-w-[200px]",
    md: "w-full max-w-[300px]",
    lg: "w-full max-w-[400px]",
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("group relative rounded-2xl overflow-hidden glass gradient-border", sizeClasses[size], className)}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none z-10" />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image || "/placeholder.svg?height=400&width=400&query=NFT digital art"}
          alt={nft.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Rarity badge */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
              rarityColors[nft.rarity],
            )}
          >
            {nft.rarity}
          </span>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="p-4 space-y-2 relative z-10">
          <h3 className="font-semibold text-foreground truncate">{nft.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
          {nft.tokenId && <p className="text-xs font-mono text-muted-foreground">Token ID: #{nft.tokenId}</p>}
        </div>
      )}
    </motion.div>
  )
}
