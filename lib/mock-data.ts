// Mock NFT collection data
export interface NFTItem {
  id: number
  name: string
  image: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  description: string
  tokenId?: string
  mintedAt?: string
}

export interface MintHistory {
  id: string
  tokenIds: string[]
  txHash: string
  timestamp: string
  quantity: number
  totalCost: string
  gasUsed: string
}

// Featured NFT for minting
export const FEATURED_NFT: NFTItem = {
  id: 1,
  name: "Nexus Genesis #001",
  image: "/futuristic-cyberpunk-neon-digital-art-nft-legendar.jpg",
  rarity: "Legendary",
  description: "The first of the Nexus collection. A legendary piece representing the dawn of a new digital era.",
}

// Collection stats
export const COLLECTION_STATS = {
  totalSupply: 10000,
  minted: 3847,
  mintPrice: 0.08,
  maxPerWallet: 5,
  maxPerTransaction: 3,
}

// Mock minted NFTs for dashboard
export const MOCKED_OWNED_NFTS: NFTItem[] = [
  {
    id: 1,
    name: "Nexus Genesis #1247",
    image: "/neon-cyberpunk-robot-head-digital-art-blue-lights-.jpg",
    rarity: "Rare",
    description: "A rare digital artifact from the Nexus collection.",
    tokenId: "1247",
    mintedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Nexus Genesis #892",
    image: "/glowing-crystal-orb-digital-fantasy-art-purple-nft.jpg",
    rarity: "Epic",
    description: "An epic piece showcasing digital craftsmanship.",
    tokenId: "892",
    mintedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    name: "Nexus Genesis #3201",
    image: "/abstract-geometric-shapes-neon-pink-blue-digital-a.jpg",
    rarity: "Common",
    description: "A common but beautiful piece from the collection.",
    tokenId: "3201",
    mintedAt: "2024-01-12T09:15:00Z",
  },
]

// Mock mint history
export const MOCKED_MINT_HISTORY: MintHistory[] = [
  {
    id: "1",
    tokenIds: ["1247"],
    txHash: "0x8f7d8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    timestamp: "2024-01-15T10:30:00Z",
    quantity: 1,
    totalCost: "0.08",
    gasUsed: "0.0024",
  },
  {
    id: "2",
    tokenIds: ["892"],
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: "2024-01-14T14:20:00Z",
    quantity: 1,
    totalCost: "0.08",
    gasUsed: "0.0021",
  },
  {
    id: "3",
    tokenIds: ["3201"],
    txHash: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
    timestamp: "2024-01-12T09:15:00Z",
    quantity: 1,
    totalCost: "0.08",
    gasUsed: "0.0019",
  },
]

// Generate random token IDs for minting
export function generateTokenIds(quantity: number): string[] {
  const ids: string[] = []
  for (let i = 0; i < quantity; i++) {
    ids.push(String(Math.floor(Math.random() * 10000)))
  }
  return ids
}

// Generate mock transaction hash
export function generateTxHash(): string {
  const chars = "0123456789abcdef"
  let hash = "0x"
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

// Calculate mock gas fee
export function calculateGasFee(): string {
  return (Math.random() * 0.003 + 0.001).toFixed(4)
}
