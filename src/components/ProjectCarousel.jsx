"use client"
import React, { useState, useEffect, useRef } from "react"
import karkelly from "../IMAGE/karkelly.jpg"
import rushago from "../IMAGE/rusha go.jpg"
import Restor from "../IMAGE/Restoran.jpg"

import Environment from "../IMAGE/environment.jpg"
function ProjectCarousel({ onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [rotating, setRotating] = useState(false)
  const projects = [
    {
      id: 1,
      title: "Karkelly",
      image: karkelly,
      technologies: ["React", "Figma", "PhotoShop"],
      description: "Karkelly is an online platform selling quality school materials efficiently.",
    }
,    
    {
      id: 2,
      title: "Rusha Go App",
      image: rushago,
      technologies: ["React native", "Figma"],
      description: "Rusha Go is an app that connects car owners with individuals seeking for renting vehicles.",
    },
    {
      id: 3,
      title: "Restora",
      image: Restor,
      technologies: ["HTML", "CSS", "JAVASCRIPT"],
      description: "Restora is a website designed for restaurants, enhance customer dining experiences.",
    },
  
    {
      id: 5,
      title: "Environment web",
      image: Environment,
      technologies: ["Figma"],
      description: "Environment web for showing the trees exist",
    },
    
 
  ]
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const rotationChange = deltaX / 5
    setRotationOffset(rotationChange)

    const newIndex = Math.round(((rotationChange / 72) * -1 + selectedIndex + projects.length) % projects.length)
    setSelectedIndex(newIndex)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setRotationOffset(0)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startX])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setSelectedIndex((prev) => (prev + 1) % projects.length)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isDragging])

  const rotateToIndex = (index) => {
    if (isDragging) return
    setRotating(true)
    setSelectedIndex(index)
    setTimeout(() => setRotating(false), 500)
  }

  const getRotation = (index) => {
    const totalCards = projects.length
    const anglePerCard = 360 / totalCards
    const rotation = ((index - selectedIndex) * anglePerCard + 360) % 360
    return rotation
  }

  const getScale = (index) => {
    const rotation = getRotation(index)
    return rotation > 90 && rotation < 270 ? 0.7 : 1
  }

  const getZIndex = (index) => {
    const rotation = getRotation(index)
    return rotation > 90 && rotation < 270 ? 0 : 1
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#111827] bg-opacity-70 backdrop-blur-md"></div>
      <div className="relative w-[90vw] h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-white bg-opacity-20 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full w-full flex items-center justify-center perspective-[1000px]">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span>Hold click to stop card or drag card to rotate</span>
            </div>
          </div>
          <div
            ref={containerRef}
            className="relative w-[300px] h-[400px]"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => !isDragging && rotateToIndex(index)}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
                  rotating || isDragging ? "pointer-events-none" : ""
                }`}
                style={{
                  transform: `rotateY(${
                    getRotation(index) + rotationOffset
                  }deg) translateZ(250px) scale(${getScale(index)})`,
                  zIndex: getZIndex(index),
                }}
              >
                <div className="w-full h-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-30 shadow-xl">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} preview`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-white">
  {project.description}
</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCarousel

