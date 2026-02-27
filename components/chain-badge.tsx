"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { NetworkType } from "@/contexts/wallet-context"

interface ChainBadgeProps {
  network: NetworkType
  className?: string
}

export function ChainBadge({ network, className }: ChainBadgeProps) {
  const config = {
    ethereum: { name: "Ethereum", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    sepolia: { name: "Sepolia", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  }

  const { name, color } = config[network]

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        color,
        className,
      )}
    >
      <span className="text-sm">⟠</span>
      {name}
    </motion.span>
  )
}
