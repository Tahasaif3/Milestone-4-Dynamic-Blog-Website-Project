"use client"

import React from 'react'
import { motion } from 'framer-motion'
import MultimediaCard from '../../components/MultimediaCard'
import { multimediaContent } from '../../utils/multimediaData'

export default function MultimediaPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-12 mt-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          MultiMedia: Exploring Latest Technologies
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {multimediaContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MultimediaCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

