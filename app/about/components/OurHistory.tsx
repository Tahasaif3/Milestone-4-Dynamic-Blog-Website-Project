'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const milestones = [
  { year: 2010, event: 'TechVista founded' },
  { year: 2013, event: 'Launched our first AI product' },
  { year: 2016, event: 'Expanded to international markets' },
  { year: 2019, event: 'Reached 1 million users' },
  { year: 2022, event: 'Introduced groundbreaking VR technology' },
]

export default function OurHistory() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our History
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CheckCircle size={24} className="text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">{milestone.year}</h3>
                <p className="text-gray-400">{milestone.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

