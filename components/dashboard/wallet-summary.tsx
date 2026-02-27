"use client"

import { motion } from "framer-motion"
import { Wallet, TrendingUp, Clock, ExternalLink } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { ChainBadge } from "@/components/chain-badge"
import { Button } from "@/components/ui/button"
import { MOCKED_OWNED_NFTS, MOCKED_MINT_HISTORY } from "@/lib/mock-data"

export function WalletSummary() {
  const { wallet } = useWallet()

  if (!wallet.isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl glass gradient-border text-center"
      >
        <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground text-sm">
          Connect your wallet to view your NFT collection and mint history.
        </p>
      </motion.div>
    )
  }

  const totalSpent = MOCKED_MINT_HISTORY.reduce((acc, tx) => acc + Number.parseFloat(tx.totalCost), 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl glass gradient-border"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
          <p className="font-mono text-sm">{wallet.address}</p>
        </div>
        <ChainBadge network={wallet.network} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Balance</span>
          </div>
          <p className="text-xl font-bold font-mono">{wallet.balance} ETH</p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">NFTs Owned</span>
          </div>
          <p className="text-xl font-bold">{MOCKED_OWNED_NFTS.length}</p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-muted-foreground">Transactions</span>
          </div>
          <p className="text-xl font-bold">{MOCKED_MINT_HISTORY.length}</p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-muted-foreground">Total Spent</span>
          </div>
          <p className="text-xl font-bold font-mono">{totalSpent.toFixed(2)} ETH</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, "_blank")}
        >
          View on Etherscan
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  )
}
