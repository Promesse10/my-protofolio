'use client'

import React, { useState, useEffect } from 'react'

export default function TypeWriter({ words = [], typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000 }) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [delta, setDelta] = useState(typingSpeed)

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, delta)

    return () => clearInterval(ticker)
  }, [text, isDeleting, wordIndex, delta])

  const tick = () => {
    const currentWord = words[wordIndex]
    const shouldDelete = isDeleting
    
    if (shouldDelete) {
      setText(prev => prev.substring(0, prev.length - 1))
      setDelta(deletingSpeed)
    } else {
      setText(currentWord.substring(0, text.length + 1))
      setDelta(typingSpeed)
    }

    if (!shouldDelete && text === currentWord) {
      setDelta(pauseTime)
      setIsDeleting(true)
    } else if (shouldDelete && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      setDelta(typingSpeed)
    }
  }

  return <span className="text-[#00a2e3]">{text}<span className="animate-blink">|</span></span>
}

