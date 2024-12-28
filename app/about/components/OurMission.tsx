'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Rocket, Globe } from 'lucide-react'

export default function OurMission() {
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lightbulb, title: 'Innovate', description: 'Push the boundaries of whats possible in technology.' },
            { icon: Rocket, title: 'Accelerate', description: 'Drive rapid advancement in tech solutions.' },
            { icon: Globe, title: 'Impact', description: 'Create positive change on a global scale.' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } },
              }}
            >
              <motion.div variants={iconVariants} className="inline-block">
                <item.icon size={48} className="text-blue-500 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

