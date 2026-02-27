"use client"

import { motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max: number
  disabled?: boolean
}

export function QuantitySelector({ value, onChange, min = 1, max, disabled }: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={decrease}
        disabled={disabled || value <= min}
        className="h-10 w-10 rounded-xl glass bg-transparent"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-16 text-center"
      >
        <span className="text-2xl font-bold tabular-nums">{value}</span>
      </motion.div>

      <Button
        variant="outline"
        size="icon"
        onClick={increase}
        disabled={disabled || value >= max}
        className="h-10 w-10 rounded-xl glass"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
