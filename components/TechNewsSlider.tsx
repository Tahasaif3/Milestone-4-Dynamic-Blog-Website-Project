'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const newsItems = [
  "Artificial Intelligence breakthrough: New model surpasses human-level performance in complex problem-solving tasks",
  "SpaceX successfully launches first civilian mission to Mars",
  "Quantum computing reaches new milestone with 1000-qubit processor",
  "Revolutionary battery technology triples electric vehicle range",
  "Neuralink receives FDA approval for human trials of brain-computer interface",
]

const TechNewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div className="relative bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <Button 
          onClick={goToPrevious} 
          variant="ghost" 
          size="icon" 
          className="text-white z-10 shrink-0"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <div className="relative flex-1 min-h-[5rem] sm:min-h-[4rem] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="text-center text-sm sm:text-lg px-1 sm:px-4 text-white">
                {newsItems[currentIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <Button 
          onClick={goToNext} 
          variant="ghost" 
          size="icon" 
          className="text-white z-10 shrink-0"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
      </div>
      <div className="mt-2 sm:mt-4 flex justify-center">
        {newsItems.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mx-0.5 sm:mx-1 ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-500'
            }`}
            initial={false}
            animate={{ scale: index === currentIndex ? 1.5 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

export default TechNewsSlider