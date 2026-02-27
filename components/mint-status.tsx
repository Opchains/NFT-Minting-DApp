"use client"

import { motion } from "framer-motion"
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type MintState = "idle" | "loading" | "success" | "error"

interface MintStatusProps {
  state: MintState
  message?: string
  className?: string
}

const statusConfig = {
  idle: {
    icon: Clock,
    color: "text-muted-foreground",
    label: "Ready to mint",
  },
  loading: {
    icon: Loader2,
    color: "text-primary",
    label: "Minting...",
  },
  success: {
    icon: CheckCircle2,
    color: "text-green-500",
    label: "Minted successfully!",
  },
  error: {
    icon: XCircle,
    color: "text-destructive",
    label: "Mint failed",
  },
}

export function MintStatus({ state, message, className }: MintStatusProps) {
  const config = statusConfig[state]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center gap-2", className)}
    >
      <Icon className={cn("h-5 w-5", config.color, state === "loading" && "animate-spin")} />
      <span className={cn("text-sm", config.color)}>{message || config.label}</span>
    </motion.div>
  )
}
