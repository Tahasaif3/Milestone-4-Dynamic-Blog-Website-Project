'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {PlayCircle, Headphones, Calendar, Clock } from 'lucide-react'
import { MultimediaItem } from '../../../utils/multimediaData'

interface MultimediaItemPageProps {
  item: MultimediaItem
}

const getItemDescription = (id: number): string => {
  const descriptions: Record<number, string> = {
    1: `Artificial Intelligence is revolutionizing healthcare in unprecedented ways. This podcast explores how AI-powered systems are enhancing medical diagnoses accuracy and developing personalized treatment plans. We discuss real-world applications, from radiology image analysis to predictive healthcare analytics, and examine how these technologies are improving patient outcomes while reducing healthcare costs.`,
    2: `Dive deep into the world of 5G technology in this comprehensive video guide. We break down the technical aspects of 5G networks, explore their potential impact on various industries, and discuss how this revolutionary technology will transform our daily lives. From smart cities to autonomous vehicles, discover the endless possibilities that 5G brings to our connected world.`,
    3: `Quantum computing represents a paradigm shift in computational power. This podcast session explores the fundamental principles of quantum computing, its current state of development, and its potential to solve complex problems that are beyond the reach of classical computers. We discuss applications in cryptography, drug discovery, and climate modeling.`,
    4: `Step into the metaverse with this detailed exploration of virtual worlds. This video examines how the metaverse is reshaping social interactions, business operations, and entertainment. We discuss the technology behind it, its potential impact on various sectors, and what the future holds for this digital frontier.`,
    5: `Join us on an exciting journey through the latest developments in space exploration. This podcast covers everything from commercial space travel to Mars colonization plans. We discuss the challenges, technologies, and possibilities that lie ahead as humanity ventures further into the final frontier.`,
    6: `Beyond cryptocurrency, blockchain technology has the potential to revolutionize numerous industries. This video explores practical applications in supply chain management, healthcare records, voting systems, and more. Learn how this distributed ledger technology is creating more transparent and efficient systems across sectors.`,
    7: `The future of transportation is autonomous. This podcast delves into the latest developments in self-driving technology, discussing the technical challenges, safety considerations, and societal implications of autonomous vehicles. We explore how this technology will reshape urban planning and transportation systems.`,
    8: `As AI becomes more prevalent in our lives, ethical considerations become increasingly important. This podcast examines key ethical challenges in AI development, including bias in algorithms, privacy concerns, accountability, and the impact on employment. We discuss frameworks for responsible AI development and deployment.`,
    9: `Virtual Reality is transforming education by creating immersive learning experiences. This video showcases innovative applications of VR in classrooms, from virtual field trips to interactive 3D models. Learn how this technology is making learning more engaging and effective for students of all ages.`,
    10: `Discover how AI is revolutionizing creative industries. This podcast explores AI's role in art generation, music composition, and content creation. We discuss the balance between human creativity and AI assistance, and how these technologies are opening new possibilities for artists and creators.`,
    11: `Climate change requires innovative solutions, and AI is playing a crucial role. This video examines how AI technologies are being used to monitor environmental changes, optimize energy consumption, and develop sustainable solutions. Learn about real-world applications and future possibilities.`,
    12: `The rise of AI is reshaping the global job market. This podcast explores how automation and AI are affecting different industries, what new jobs are emerging, and how workers can adapt to this changing landscape. We discuss strategies for future-proofing careers in an AI-driven world.`
  }
  return descriptions[id] || 'Description not available.'
}

export default function MultimediaItemPage({ item }: MultimediaItemPageProps) {
  const [, setIsPlaying] = React.useState(false)
  const fullDescription = getItemDescription(item.id)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         <Link href="/multimedia">
          <button
            type="button"
            className="h-14 w-48 mt-5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out group"
          >
            <div className="flex items-center justify-center h-full w-full rounded-full bg-gray-900 text-white font-medium text-lg transition-all duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-800 group-hover:to-black">
              Go Back
            </div>
          </button>
        </Link>
          <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                >
                  {item.type === 'video' ? (
                    <PlayCircle size={80} className="filter drop-shadow-lg" />
                  ) : (
                    <Headphones size={80} className="filter drop-shadow-lg" />
                  )}
                </motion.a>
              </motion.div>
            </div>

            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {item.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {fullDescription}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}