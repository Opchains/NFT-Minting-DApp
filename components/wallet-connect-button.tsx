"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, ChevronDown, LogOut, Copy, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWallet, type WalletType } from "@/contexts/wallet-context"
import { toast } from "sonner"

const walletOptions: { type: WalletType; name: string; icon: string }[] = [
  { type: "metamask", name: "MetaMask", icon: "🦊" },
  { type: "walletconnect", name: "WalletConnect", icon: "🔗" },
]

export function WalletConnectButton() {
  const { wallet, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      toast.success("Address copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleConnect = async (type: WalletType) => {
    await connectWallet(type)
    setDialogOpen(false)
    toast.success("Wallet connected successfully!")
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast.success("Wallet disconnected")
  }

  if (wallet.isConnected && wallet.address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="glass gap-2 bg-transparent">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm">{shortenAddress(wallet.address)}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 glass">
          <div className="px-2 py-1.5">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="font-mono font-medium">{wallet.balance} ETH</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyAddress}>
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
        disabled={isConnecting}
      >
        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wallet className="mr-2 h-4 w-4" />}
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {walletOptions.map((option) => (
              <motion.button
                key={option.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleConnect(option.type)}
                disabled={isConnecting}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="font-medium">{option.name}</span>
                {isConnecting && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
              </motion.button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
