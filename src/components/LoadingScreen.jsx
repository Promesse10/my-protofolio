"use client"
import React, { useState, useEffect } from "react"

function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => {
        setCount((prev) => prev + 1)
      }, 50)
      return () => clearInterval(timer)
    }
  }, [count])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111827]">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 animate-wave1"></div>
        </div>
      
       
        <div
          className={`relative text-white text-6xl font-bold transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-30"
          }`}
        > 
          <span>{`<IP />`}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-white text-xl mb-2 font-mono">{`const loading = ${count}%`}</div>
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#02a3e4] transition-all duration-100 rounded-full"
            style={{ width: `${count}%` }}
          ></div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes wave {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .text-6xl {
          animation: rotate 3s linear infinite, pulse 2s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .animate-wave1 {
          animation: wave 3s infinite;
        }
        
        .animate-wave2 {
          animation: wave 3s infinite;
          animation-delay: 1s;
        }
        
        .animate-wave3 {
          animation: wave 3s infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

