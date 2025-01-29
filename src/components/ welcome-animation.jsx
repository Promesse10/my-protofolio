'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export function WelcomeAnimation({ onClose }) {
  return (
    <motion.div
      className="w-64 h-64 mx-auto mb-6 relative"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1e2836] to-[#2d3748]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-[#2d3748] to-[#4a5568]"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.3
          }}
        />
        <motion.div 
          className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#4a5568] to-[#1e2836]"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Welcome</span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    </motion.div>
  )
}

