'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/videos/tech-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About TechVista
        </motion.h1>
       
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pioneering the future of technology, one innovation at a time.
        </motion.p>
      </div>
    </section>
  )
}

