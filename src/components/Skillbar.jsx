'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SkillBar({ skill, percentage, isDarkMode  }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1.5, ease: "easeOut" }
      })
    }
  }, [inView, percentage, controls])

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between mb-2">
        <span   className={`font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-950'
        }`}>{skill}</span>
        <span className={`text-[#00a2e3] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full bg-[#00a2e3] rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  )
}

