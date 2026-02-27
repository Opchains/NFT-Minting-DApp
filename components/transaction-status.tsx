"use client"

import { motion } from "framer-motion"
import { ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface TransactionStatusProps {
  txHash: string
  gasUsed: string
  tokenIds: string[]
}

export function TransactionStatus({ txHash, gasUsed, tokenIds }: TransactionStatusProps) {
  const [copied, setCopied] = useState(false)

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  const copyHash = async () => {
    await navigator.clipboard.writeText(txHash)
    setCopied(true)
    toast.success("Transaction hash copied")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 rounded-xl bg-secondary/30"
    >
      {/* Transaction Hash */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Transaction Hash</p>
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono text-foreground">{shortenHash(txHash)}</code>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyHash}>
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, "_blank")}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Gas Used */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Gas Fee</p>
        <p className="text-sm font-mono">{gasUsed} ETH</p>
      </div>

      {/* Token IDs */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Token IDs Minted</p>
        <div className="flex flex-wrap gap-2">
          {tokenIds.map((id) => (
            <span key={id} className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-mono">
              #{id}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
