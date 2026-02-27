"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NFTCard } from "./nft-card"
import { QuantitySelector } from "./quantity-selector"
import { MintStatus, type MintState } from "./mint-status"
import { MintModal } from "./mint-modal"
import { useWallet } from "@/contexts/wallet-context"
import { FEATURED_NFT, COLLECTION_STATS, generateTokenIds, generateTxHash, calculateGasFee } from "@/lib/mock-data"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export function MintSection() {
  const { wallet } = useWallet()
  const [quantity, setQuantity] = useState(1)
  const [mintState, setMintState] = useState<MintState>("idle")
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [txDetails, setTxDetails] = useState({
    txHash: "",
    gasUsed: "",
    tokenIds: [] as string[],
  })

  const totalCost = (quantity * COLLECTION_STATS.mintPrice).toFixed(4)
  const remaining = COLLECTION_STATS.totalSupply - COLLECTION_STATS.minted
  const isSoldOut = remaining <= 0

  const handleMint = useCallback(async () => {
    if (!wallet.isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    setIsLoading(true)
    setMintState("loading")

    /**
     * REAL BLOCKCHAIN INTEGRATION:
     * Replace this mock logic with actual contract interaction
     *
     * Example with ethers.js:
     * const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
     * const tx = await contract.mint(quantity, { value: ethers.parseEther(totalCost) })
     * const receipt = await tx.wait()
     *
     * Example with wagmi:
     * const { writeContract } = useWriteContract()
     * await writeContract({
     *   address: CONTRACT_ADDRESS,
     *   abi: contractABI,
     *   functionName: 'mint',
     *   args: [quantity],
     *   value: parseEther(totalCost),
     * })
     */

    // Simulate minting delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate random success/failure (90% success rate)
    const success = Math.random() > 0.1

    if (success) {
      const tokenIds = generateTokenIds(quantity)
      const txHash = generateTxHash()
      const gasUsed = calculateGasFee()

      setTxDetails({ txHash, gasUsed, tokenIds })
      setMintState("success")
      setModalOpen(true)
    } else {
      setMintState("error")
      toast.error("Transaction failed. Please try again.")
    }

    setIsLoading(false)
  }, [wallet.isConnected, quantity])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* NFT Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            {isLoading ? (
              <div className="w-full max-w-[400px] rounded-2xl overflow-hidden glass gradient-border">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ) : (
              <NFTCard nft={FEATURED_NFT} size="lg" />
            )}
          </motion.div>

          {/* Mint Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Collection Info */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Mint Your <span className="text-primary">Nexus Genesis</span> NFT
              </h2>
              <p className="text-muted-foreground text-lg">
                Join the exclusive Nexus collection. Each NFT is uniquely generated with rare traits and attributes.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl glass text-center">
                <p className="text-2xl font-bold text-foreground">{COLLECTION_STATS.minted.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Minted</p>
              </div>
              <div className="p-4 rounded-xl glass text-center">
                <p className="text-2xl font-bold text-foreground">{COLLECTION_STATS.totalSupply.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Supply</p>
              </div>
              <div className="p-4 rounded-xl glass text-center">
                <p className="text-2xl font-bold text-primary">{COLLECTION_STATS.mintPrice} ETH</p>
                <p className="text-xs text-muted-foreground">Mint Price</p>
              </div>
            </div>

            {/* Mint Controls */}
            {isSoldOut ? (
              <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/30 text-center">
                <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                <p className="font-semibold text-destructive">Sold Out!</p>
                <p className="text-sm text-muted-foreground mt-1">Check secondary marketplaces for available NFTs.</p>
              </div>
            ) : (
              <div className="space-y-6 p-6 rounded-2xl glass gradient-border">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Quantity</p>
                    <p className="text-xs text-muted-foreground">
                      Max {COLLECTION_STATS.maxPerTransaction} per transaction
                    </p>
                  </div>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    max={COLLECTION_STATS.maxPerTransaction}
                    disabled={isLoading}
                  />
                </div>

                {/* Total Cost */}
                <div className="flex items-center justify-between py-4 border-t border-border">
                  <p className="font-medium">Total Cost</p>
                  <motion.p
                    key={totalCost}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-primary font-mono"
                  >
                    {totalCost} ETH
                  </motion.p>
                </div>

                {/* Mint Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleMint}
                    disabled={!wallet.isConnected || isLoading}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all relative overflow-hidden group"
                  >
                    {/* Glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

                    <span className="relative flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Minting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          {wallet.isConnected ? "Mint NFT" : "Connect Wallet to Mint"}
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {/* Mint Status */}
                {mintState !== "idle" && <MintStatus state={mintState} />}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <MintModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setMintState("idle")
        }}
        txHash={txDetails.txHash}
        gasUsed={txDetails.gasUsed}
        tokenIds={txDetails.tokenIds}
      />
    </section>
  )
}
