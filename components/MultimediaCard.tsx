'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MultimediaItem } from '../utils/multimediaData'
import { PlayCircle, Headphones } from 'lucide-react'

interface MultimediaCardProps {
  item: MultimediaItem
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({ item }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/multimedia/${item.id}`}>
        <div className="relative">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={400}
            height={225}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-white"
            >
              {item.type === 'video' ? (
                <PlayCircle size={48} />
              ) : (
                <Headphones size={48} />
              )}
            </motion.div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{item.duration}</span>
            <span>{item.date}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default MultimediaCard

