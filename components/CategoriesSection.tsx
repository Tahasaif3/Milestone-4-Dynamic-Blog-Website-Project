"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GlowingCard, CardContent, CardHeader, CardTitle } from "./GlowingCard"

const categories = [
  { name: 'Artificial Intelligence', icon: '🤖' },
  { name: 'Blockchain', icon: '🔗' },
  { name: 'Cybersecurity', icon: '🔒' },
  { name: 'Internet of Things', icon: '🌐' },
  { name: 'Quantum Computing', icon: '⚛️' },
  { name: 'Virtual Reality', icon: '🥽' },
]

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
          Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog`}>
                <GlowingCard className="h-full text-center hover:bg-gray-800 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-4xl mb-2">{category.icon}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{category.name}</p>
                  </CardContent>
                </GlowingCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection

