"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlowingCard, CardContent, CardHeader, CardTitle } from "../../../components/GlowingCard"



export default function AboutusPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto py-16 px-4">
          <motion.h1 
            className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About TechVista
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlowingCard className="h-full">
                <CardHeader>
                  <CardTitle className="text-3xl mb-4">Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-lg text-gray-300">
                    TechVista was founded with a simple mission: to provide a platform for sharing knowledge, ideas, and experiences in the most engaging and visually appealing way possible. Our team of passionate writers and tech enthusiasts work tirelessly to bring you the latest insights and trends in the world of technology and beyond.
                  </p>
                  <p className="text-lg text-gray-300">
                    We believe in the power of words and design to inspire, educate, and connect people from all walks of life. Through our blog, we aim to create a community of lifelong learners and innovators who are always eager to explore new horizons.
                  </p>
                </CardContent>
              </GlowingCard>
            </motion.div>
            <motion.div
              className="relative h-full min-h-[400px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/about.jpg" alt="About TechVista" layout="fill" objectFit="cover" className="rounded-lg" />
            </motion.div>
          </div>

        </div>
      </div>
    )
  }
  



