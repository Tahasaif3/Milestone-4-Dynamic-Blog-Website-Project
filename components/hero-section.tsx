'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ParticleField from './particle-field'

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <ParticleField />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            TechVista Blog
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your gateway to the future of technology and innovation
          </motion.p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > 
          <Link href="/blog" target="_blank" rel="noopener noreferrer">
            <button
              className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">Explore Our Universe of Tech</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute right-4"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

export default HeroSection
