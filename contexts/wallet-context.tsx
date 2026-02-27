"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types for wallet state
export type WalletType = "metamask" | "walletconnect" | null
export type NetworkType = "ethereum" | "sepolia"

export interface WalletState {
  isConnected: boolean
  address: string | null
  walletType: WalletType
  network: NetworkType
  balance: string
}

interface WalletContextType {
  wallet: WalletState
  connectWallet: (type: WalletType) => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (network: NetworkType) => Promise<void>
  isConnecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const STORAGE_KEY = "nft-wallet-state"

// Mock wallet addresses for demo
const MOCK_ADDRESSES = [
  "0x742d35Cc6634C0532925a3b844Bc9e7595f8fEA1",
  "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
]

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    walletType: null,
    network: "ethereum",
    balance: "0",
  })
  const [isConnecting, setIsConnecting] = useState(false)

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setWallet(parsed)
      } catch (e) {
        console.error("Failed to parse wallet state:", e)
      }
    }
  }, [])

  // Save wallet state to localStorage when it changes
  useEffect(() => {
    if (wallet.isConnected) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [wallet])

  const connectWallet = async (type: WalletType) => {
    setIsConnecting(true)

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    /**
     * REAL BLOCKCHAIN INTEGRATION:
     * Replace this mock logic with actual wallet connection using ethers.js or wagmi
     *
     * Example with ethers.js:
     * const provider = new ethers.BrowserProvider(window.ethereum)
     * const accounts = await provider.send("eth_requestAccounts", [])
     * const address = accounts[0]
     * const balance = await provider.getBalance(address)
     *
     * Example with wagmi:
     * const { connect } = useConnect()
     * await connect({ connector: type === 'metamask' ? injected() : walletConnect() })
     */

    const randomAddress = MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)]
    const mockBalance = (Math.random() * 10).toFixed(4)

    setWallet({
      isConnected: true,
      address: randomAddress,
      walletType: type,
      network: "ethereum",
      balance: mockBalance,
    })

    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    /**
     * REAL BLOCKCHAIN INTEGRATION:
     * Add actual disconnect logic here if needed
     * Most wallets don't require explicit disconnect
     */
    setWallet({
      isConnected: false,
      address: null,
      walletType: null,
      network: "ethereum",
      balance: "0",
    })
  }

  const switchNetwork = async (network: NetworkType) => {
    /**
     * REAL BLOCKCHAIN INTEGRATION:
     * Replace with actual network switching using ethers.js or wagmi
     *
     * Example:
     * await window.ethereum.request({
     *   method: 'wallet_switchEthereumChain',
     *   params: [{ chainId: network === 'ethereum' ? '0x1' : '0xaa36a7' }],
     * })
     */

    await new Promise((resolve) => setTimeout(resolve, 500))
    setWallet((prev) => ({ ...prev, network }))
  }

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, switchNetwork, isConnecting }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
