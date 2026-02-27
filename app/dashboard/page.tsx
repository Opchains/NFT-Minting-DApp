import React from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { WalletSummary } from "@/components/dashboard/wallet-summary"
import { MintHistory } from "@/components/dashboard/mint-history"
import { NFTGrid } from "@/components/dashboard/nft-grid"

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">View your wallet, collection, and minting history.</p>
        </div>

        <div className="space-y-8">
          <WalletSummary />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NFTGrid />
            </div>
            <div>
              <MintHistory />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
