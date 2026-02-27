"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { CheckCircle2, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TransactionStatus } from "./transaction-status"

interface MintModalProps {
  open: boolean
  onClose: () => void
  txHash: string
  gasUsed: string
  tokenIds: string[]
}

export function MintModal({ open, onClose, txHash, gasUsed, tokenIds }: MintModalProps) {
  useEffect(() => {
    if (open) {
      import("canvas-confetti").then((confettiModule) => {
        confettiModule.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#14b8a6", "#06b6d4", "#8b5cf6"],
        })
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
            Mint Successful!
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Animated checkmark */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                >
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Transaction details */}
          <TransactionStatus txHash={txHash} gasUsed={gasUsed} tokenIds={tokenIds} />

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Close
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
              onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, "_blank")}
            >
              View on Etherscan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
