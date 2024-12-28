"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GlowingCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './GlowingCard'
import SocialIcons from './SocialIcons'

const relatedBlogs = [
    {
        id: 29,
        title: "Machine Learning in Finance",
        excerpt: "How ML is transforming financial forecasting and risk management.",
        category: "AI & Finance",
        image: "/aiinfinance.jpeg"
    },
    {
        id: 30,
        title: "The Future of Edge Computing",
        excerpt: "Exploring the potential of edge computing in reducing latency and improving data processing.",
        category: "Cloud Technology",
        image: "/edgec.png"
    },
    {
        id: 31,
        title: "Augmented Reality in Education",
        excerpt: "Revolutionizing learning experiences through AR technology.",
        category: "EdTech",
        image: "/arineducation.jpeg"
    }
];


interface Post {
    id: number
    title: string
    image: string
}

interface RelatedCardProps {
    post: Post
    index: number
}

const RelatedPosts = () => {
        return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Related Posts
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedBlogs.map((post, index) => (
                        <PopularCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const PopularCard = ({ post, index }: RelatedCardProps) => {
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
                        src={post.image}
                        alt={post.title}
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
                    <CardTitle className="text-lg font-semibold mb-2">{post.title}</CardTitle>
                    <CardDescription className="text-sm">Dive deep into this Popular Blogs of our website exploring groundbreaking advancements.</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                    <Link href={`/blog/${post.id}`} className="group relative inline-flex items-center overflow-hidden rounded px-6 py-2 focus:outline-none focus:ring">
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-400 to-orange-600 transition-all group-hover:h-full"></span>
                        <span className="relative text-sm font-medium text-white transition-colors group-hover:text-black">
                            Read More
                        </span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SocialIcons />
                    </motion.div>
                </CardFooter>
            </GlowingCard>
        </motion.div>
    )
}

export default RelatedPosts
