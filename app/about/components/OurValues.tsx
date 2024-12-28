'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Zap, Shield } from 'lucide-react'

export default function OurValues() {
  const values = [
    { icon: Heart, title: 'Passion', description: 'We are driven by our love for technology and innovation.' },
    { icon: Users, title: 'Collaboration', description: 'We believe in the power of teamwork and diverse perspectives.' },
    { icon: Zap, title: 'Excellence', description: 'We strive for the highest quality in everything we do.' },
    { icon: Shield, title: 'Integrity', description: 'We uphold the highest ethical standards in our work.' },
  ]

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <value.icon size={36} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

