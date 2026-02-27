"use client"

import { motion } from "framer-motion"
import { useWallet, type NetworkType } from "@/contexts/wallet-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"
import { toast } from "sonner"

const networks: { id: NetworkType; name: string; icon: string; color: string }[] = [
  { id: "ethereum", name: "Ethereum", icon: "⟠", color: "text-blue-400" },
  { id: "sepolia", name: "Sepolia", icon: "⟠", color: "text-purple-400" },
]

export function NetworkSwitcher() {
  const { wallet, switchNetwork } = useWallet()

  if (!wallet.isConnected) return null

  const currentNetwork = networks.find((n) => n.id === wallet.network) || networks[0]

  const handleSwitch = async (network: NetworkType) => {
    if (network === wallet.network) return
    await switchNetwork(network)
    toast.success(`Switched to ${networks.find((n) => n.id === network)?.name}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <motion.span
            key={currentNetwork.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-lg ${currentNetwork.color}`}
          >
            {currentNetwork.icon}
          </motion.span>
          <span className="hidden sm:inline text-sm">{currentNetwork.name}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {networks.map((network) => (
          <DropdownMenuItem key={network.id} onClick={() => handleSwitch(network.id)} className="gap-2">
            <span className={`text-lg ${network.color}`}>{network.icon}</span>
            <span>{network.name}</span>
            {wallet.network === network.id && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
