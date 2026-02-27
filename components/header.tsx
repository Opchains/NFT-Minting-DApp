"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Hexagon } from "lucide-react"
import { cn } from "@/lib/utils"
import { WalletConnectButton } from "./wallet-connect-button"
import { NetworkSwitcher } from "./network-switcher"

const navItems = [
  { href: "/", label: "Mint" },
  { href: "/dashboard", label: "Dashboard" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full glass"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Hexagon className="h-8 w-8 text-primary fill-primary/20 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-lg tracking-tight">NexusNFT</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-secondary rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Wallet Controls */}
        <div className="flex items-center gap-3">
          <NetworkSwitcher />
          <WalletConnectButton />
        </div>
      </div>
    </motion.header>
  )
}
