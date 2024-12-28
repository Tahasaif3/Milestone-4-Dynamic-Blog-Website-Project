'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GlowingCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./GlowingCard"

const latestTechBlogs = [
  {
    id: 1,
    title: "The Rise of Quantum Computing",
    description: "Exploring the potential of quantum computers and their impact on various industries.",
    image: "/quantumc.jpg",
  },
  {
    id: 2,
    title: "AI in Healthcare: Revolutionizing Patient Care",
    description: "How artificial intelligence is transforming diagnosis, treatment, and patient outcomes.",
    image: "/aiinhealth.jpg",
  },
  {
    id: 3,
    title: "5G and the Future of Connectivity",
    description: "Understanding the capabilities of 5G networks and their potential to reshape our digital landscape.",
    image: "/5gtech.png",
  },
  {
    id: 4,
    title: "Blockchain Beyond Cryptocurrency",
    description: "Exploring innovative applications of blockchain technology in various sectors.",
    image: "/blockchain.jpeg",
  },
]

interface Blog {
  id: number
  title: string
  description: string
  image: string
}

interface BlogCardProps {
  blog: Blog
  index: number
}


const LatestTechBlogs = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest in Technology
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestTechBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlowingCard 
        className="group transform transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0 relative overflow-hidden">
          <Image 
            src={blog.image} 
            alt={blog.title} 
            width={400} 
            height={200} 
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 transform group-hover:scale-110" 
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2">{blog.title}</CardTitle>
          <CardDescription className="text-sm">{blog.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4">
          <Link href={`/blog/${blog.id}`} className="group relative inline-flex items-center overflow-hidden rounded px-8 py-3 focus:outline-none focus:ring">
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-600 transition-all group-hover:h-full"></span>
            <span className="relative text-sm font-medium text-white transition-colors group-hover:text-black">
              Read More
            </span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardFooter>
      </GlowingCard>
    </motion.div>
  )
}

export default LatestTechBlogs

