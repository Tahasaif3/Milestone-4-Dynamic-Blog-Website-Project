'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp, Star, Clock, ArrowRight } from 'lucide-react'

interface FeaturedPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  readTime: string
  type: 'trending' | 'featured' | 'recent'
}

const featuredPosts: FeaturedPost[] = [
  {
    id: 32,
    title: "The Future of AI in Content Creation",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we create and consume content.",
    image: "/fac.png?height=400&width=600",
    category: "Technology",
    readTime: "5 min read",
    type: 'trending'
  },
  {
    id: 33,
    title: "10 Essential Writing Tips for Bloggers",
    excerpt: "Unlock your writing potential with these proven tips and techniques for creating engaging blog posts.",
    image: "/wrtp.jpeg?height=400&width=600",
    category: "Writing",
    readTime: "7 min read",
    type: 'featured'
  },
  {
    id: 34,
    title: "Sustainable Living: Small Changes, Big Impact",
    excerpt: "Discover simple ways to adopt a more eco-friendly lifestyle and contribute to a sustainable future.",
    image: "/smch.png?height=400&width=600",
    category: "Lifestyle",
    readTime: "6 min read",
    type: 'recent'
  },
  {
    id: 35,
    title: "The Art of Mindfulness in a Digital Age",
    excerpt: "Learn how to stay present and focused in an increasingly connected and distracted world.",
    image: "/mind.webp?height=400&width=600",
    category: "Wellness",
    readTime: "8 min read",
    type: 'featured'
  },
  {
    id: 36,
    title: "Mastering the Gig Economy: Freelancer's Guide",
    excerpt: "Navigate the world of freelancing with expert tips on finding clients, managing time, and growing your business.",
    image: "/gig.jpeg?height=400&width=600",
    category: "Career",
    readTime: "10 min read",
    type: 'trending'
  }
]

export default function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
    )
  }

  const getTypeIcon = (type: FeaturedPost['type']) => {
    switch (type) {
      case 'trending':
        return <TrendingUp className="w-4 h-4" />
      case 'featured':
        return <Star className="w-4 h-4" />
      case 'recent':
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Inspiring Content
        </motion.h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/2">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <img
                      src={featuredPosts[currentIndex].image}
                      alt={featuredPosts[currentIndex].title}
                      className="w-full h-64 object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-300">
                    {featuredPosts[currentIndex].category}
                  </Badge>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getTypeIcon(featuredPosts[currentIndex].type)}
                      <span className="capitalize">{featuredPosts[currentIndex].type}</span>
                    </Badge>
                    <span className="text-sm text-gray-200">
                      {featuredPosts[currentIndex].readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
                  {featuredPosts[currentIndex].title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base">
                  {featuredPosts[currentIndex].excerpt}
                </p>

                <Link
                  href={`/blog/${featuredPosts[currentIndex].id}`}
                  className="group relative inline-flex items-center overflow-hidden rounded px-8 py-3 focus:outline-none focus:ring"
                >
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-orange-600 to-purple-800 transition-all group-hover:h-full"></span>
                  <span className="relative text-sm font-medium text-white transition-colors group-hover:text-black">
                    Read More
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}