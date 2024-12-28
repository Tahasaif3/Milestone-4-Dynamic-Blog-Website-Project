'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingCard, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/GlowingCard"
import NeonButton from '../../components/NeonButton'
import SocialIcons from '../../components/SocialIcons'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp, Star, Clock, ArrowRight } from 'lucide-react'


interface Blog {
  id: string | number
  title: string
  content: string
  userId: string
  image?: string
  createdAt: string
  author: string
  readTime: string
  category: string
}

interface FeaturedPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  readTime: string
  type: 'trending' | 'featured' | 'recent'
}

// Latest Tech Blogs
const latestTechBlogs = [
  {
    id: 1,
    title: "The Quantum Revolution in Computing",
    description: "Explore how quantum computing is set to transform industries from cryptography to drug discovery, potentially solving problems that are intractable for classical computers.",
    image: "/quantumc.jpg",
  },
  {
    id: 2,
    title: "AI's Role in Personalized Medicine",
    description: "Discover how artificial intelligence is enabling tailored medical treatments based on individual genetic profiles, revolutionizing healthcare outcomes of Ai in Healthcare industry.",
    image: "/aiinhealth.jpg",
  },
  {
    id: 3,
    title: "5G: Powering the Internet of Things",
    description: "Uncover the potential of 5G networks in creating smart cities, enhancing autonomous vehicles, and enabling real-time remote surgeries with 5g spped and its connectivity.",
    image: "/5gtech.png",
  },
  {
    id: 4,
    title: "Blockchain: Beyond Cryptocurrencies",
    description: "Learn about blockchain's applications in supply chain management, voting systems, and digital identity verification, reshaping trust in digital transactions.",
    image: "/blockchain.jpeg",
  },
]

const recentPosts = [
  {
    id: 2,
    title: "The Future of AI in Healthcare",
    description: "Exploring how artificial intelligence is revolutionizing medical diagnoses and treatment plans.",
    date: "2023-05-15",
    readTime: "5 min read",
    image: "/aiinhealth.jpg"
  },
  {
    id: 3,
    title: "5G Technology: A New Era of Connectivity",
    description: "Diving into the potential of 5G and its impact on various industries.",
    date: "2023-05-10",
    readTime: "4 min read",
    image: "/5gtech.png"
  },
  {
    id: 4,
    title: "Blockchain Beyond Cryptocurrency",
    description: "Uncovering the diverse applications of blockchain technology in different sectors.",
    date: "2023-05-05",
    readTime: "6 min read",
    image: "/blockchain.jpeg"
  }
];

// Featured Blogs
const featuredBlogs = [
  {
    id: 5,
    title: "The Ethics of Artificial Intelligence",
    description: "Delve into the moral implications of AI decision-making in autonomous systems and the need for responsible AI development to ensure fairness and transparency to dive into the ethics of Ai.",
    image: "/ethics.png",
  },
  {
    id: 6,
    title: "Cybersecurity in the Age of Quantum Computing",
    description: "Examine the challenges quantum computing poses to current encryption methods and the race to develop quantum-resistant cryptography.",
    image: "/quantumc.jpg",
  },
  {
    id: 7,
    title: "The Future of Work: AI and Automation",
    description: "Analyze how AI and automation are reshaping job markets, creating new roles, and the skills needed to thrive in an AI-augmented workplace.",
    image: "/aifuture.jpg",
  },
];

const relatedBlogs = [
  {
    id: 29,
    title: "Machine Learning in Finance",
    description: "How ML is transforming financial forecasting and risk management.",
    category: "AI & Finance",
    image: "/aiinfinance.jpeg"
  },
  {
    id: 30,
    title: "The Future of Edge Computing",
    description: "Exploring the potential of edge computing in reducing latency and improving data processing.",
    category: "Cloud Technology",
    image: "/edgec.png"
  },
  {
    id: 31,
    title: "Augmented Reality in Education",
    description: "Revolutionizing learning experiences through AR technology.",
    category: "EdTech",
    image: "/arineducation.jpeg"
  }
];

const popularBlogs = [
  {
    id: 26,
    title: "The Rise of Quantum Computing",
    description: "Understanding the potential and challenges of quantum computing in solving complex problems.",
    views: 15000,
    image: "/quantumc.jpg"
  },
  {
    id: 27,
    title: "Cybersecurity in the Age of IoT",
    description: "Exploring the security challenges and solutions in the growing Internet of Things landscape.",
    views: 12000,
    image: "/cyberiot.png"
  },
  {
    id: 28,
    title: "The Ethics of Artificial Intelligence",
    description: "Delving into the moral implications and responsibilities in AI development and deployment.",
    views: 10000,
    image: "/ethics.png"
  }
];

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
    image: "/writing-tips-bloggers-800.jpg?height=400&width=600",
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

// Other Technology Blogs Titles
const specificTitles = [
  "The Future of Edge Computing in Internet of Things",
  "Augmented Reality in Education and Training",
  "The Impact of 3D Printing and AI in Manufacturing",
  "Advancements in Natural Language Processing",
  "Sustainable and Eco-Friendly Tech Solutions",
  "Biotechnology and AI in Drug Discovery"
];

// Other Technology Blogs
const otherBlogs = Array.from({ length: 18 }, (_, i) => ({
  id: i + 8,
  title: specificTitles[i % specificTitles.length],
  description: [
    "Exploring the potential of edge computing in reducing latency for IoT devices and improving real-time data processing in the field of IoT.",
    "Investigating the role of augmented reality in enhancing educational experiences and professional training.",
    "Analyzing the impact of 3D printing technology on manufacturing, medicine, and consumer products and the effects of AI on it.",
    "Examining the advancements in natural language processing and its applications in chatbots and virtual assistants.",
    "Discussing the challenges and opportunities in developing sustainable and eco-friendly tech solutions.",
    "Exploring the intersection of biotechnology and AI in accelerating drug discovery and personalized medicine.",
  ][i % 6],
  image: `/tech-blog-${(i % 6) + 1}.jpg`,
}))

export default function BlogPage() {
  const [, setHoveredCard] = useState<string | null>(null)
  const [userBlogs, setUserBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        if (response.ok) {
          const data = await response.json()
          setUserBlogs(data)
        } else {
          console.error('Failed to fetch user blogs')
        }
      } catch (error) {
        console.error('An error occurred while fetching user blogs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserBlogs()
  }, [])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          TechVista: Exploring the Digital Frontier
        </motion.h1>

        {/* Latest Technology Blogs */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Cutting-Edge Tech Insights
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {latestTechBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* User-created Blogs */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Recent Created Blog
          </motion.h2>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {userBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <GlowingCard
                    className="group h-full flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredCard(String(blog.id))}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <CardHeader className="p-0">
                      <Image src={blog.image || "/placeholder.svg"} alt={blog.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                      <CardTitle className="text-xl font-semibold mb-3">{blog.title}</CardTitle>
                      <CardDescription className="text-sm">{blog.content.substring(0, 150)}...</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-6">
                      <NeonButton href={`/blog/${blog.id}`}>
                        Read More
                      </NeonButton>
                      <SocialIcons />
                    </CardFooter>
                  </GlowingCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Recent Posts */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Featured Recent Deep Dives in Tech
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                    <SocialIcons />
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Posts */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Featured Tech Deep Dives
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                    <SocialIcons />
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Related Posts */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Explore Related Tech Blogs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {relatedBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                    <SocialIcons />
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Popular Posts */}
        <section className="mb-20">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            See our Featured Popular Blogs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {popularBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                    <SocialIcons />
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

      {/* Discover Inspiring Content */}
      <section className="bg-transparent">
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
              <CardContent className="p-0 relative h-64 md:h-80">
                <Image
                  src={featuredPosts[currentIndex].image}
                  alt={featuredPosts[currentIndex].title}
                  width={800}
                  height={800}
                  className="object-cover"
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


        {/* Other Technology Blogs */}
        <section className='mt-4'>
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600"
          >
            More Tech Explorations
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlowingCard
                  className="group h-full flex flex-col"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(String(post.id))}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <CardHeader className="p-0">
                    <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-3">{post.title}</CardTitle>
                    <CardDescription className="text-sm">{post.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6">
                    <NeonButton href={`/blog/${post.id}`}>
                      Read More
                    </NeonButton>
                    <SocialIcons />
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}


