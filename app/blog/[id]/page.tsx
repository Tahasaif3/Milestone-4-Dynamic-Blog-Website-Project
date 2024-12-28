'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SocialIcons from '../../../components/SocialIcons'
import { GlowingCard, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/GlowingCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import NeonButton from '../../../components/NeonButton'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import { allBlogPosts } from '../../../data/allBlogPosts'

interface BlogPost {
  id: string | number
  title: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
}

interface Comment {
  name: string
  comment: string
  date: string
}

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ name: '', comment: '' })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true)
      const predefinedPost = allBlogPosts.find(post => post.id.toString() === id)

      if (predefinedPost) {
        setPost(predefinedPost as BlogPost)
        setIsLoading(false)
      } else {
        try {
          const response = await fetch(`/api/blogs?id=${id}`)
          if (response.ok) {
            const data = await response.json()
            setPost(data)
          } else {
            console.error('Failed to fetch blog post')
          }
        } catch (error) {
          console.error('An error occurred while fetching the blog post:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?blogId=${id}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data)
        } else {
          console.error('Failed to fetch comments')
        }
      } catch (error) {
        console.error('An error occurred while fetching comments:', error)
      }
    }

    fetchBlogPost()
    fetchComments()
  }, [id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const date = new Date().toISOString().split('T')[0]
    const newCommentWithDate = { ...newComment, date, blogId: id }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommentWithDate),
      })

      if (response.ok) {
        const savedComment = await response.json()
        setComments([...comments, savedComment])
        setNewComment({ name: '', comment: '' })
      } else {
        console.error('Failed to save comment')
      }
    } catch (error) {
      console.error('An error occurred while saving the comment:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <NeonButton href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </NeonButton>
        </div>
      </div>
    )
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
  >
    <div className="container mx-auto py-16 px-4">
     
        <Link href="/blog">
          <button
            type="button"
            className="h-14 w-48 mt-5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out group"
          >
            <div className="flex items-center justify-center h-full w-full rounded-full bg-gray-900 text-white font-medium text-lg transition-all duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-800 group-hover:to-black">
              Go Back
            </div>
          </button>
        </Link>

      <article className="max-w-4xl mx-auto mt-2">
        <GlowingCard className="mb-12">
          <CardHeader className="p-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
            </motion.div>
          </CardHeader>
          <CardContent className="p-8">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{post.title}</CardTitle>
              <motion.div
                className="flex flex-wrap gap-4 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  {post.category}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="prose prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return <motion.h2
                    key={index}
                    className="text-2xl font-bold mt-8 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {paragraph.replace('## ', '')}
                  </motion.h2>
                }
                if (paragraph.startsWith('###')) {
                  return <motion.h3
                    key={index}
                    className="text-xl font-bold mt-6 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {paragraph.replace('### ', '')}
                  </motion.h3>
                }
                if (paragraph.startsWith('-')) {
                  return <motion.li
                    key={index}
                    className="ml-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {paragraph.replace('- ', '')}
                  </motion.li>
                }
                if (paragraph.trim().length > 0) {
                  return <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {paragraph}
                  </motion.p>
                }
                return null
              })}
            </motion.div>
          </CardContent>
          <CardFooter className="p-8 flex justify-between items-center border-t border-gray-800">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="text-sm text-gray-400">Share this article:</span>
              <SocialIcons />
            </motion.div>
          <motion.span
        className="text-xs sm:text-sm text-gray-400 text-center sm:text-left block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.5, delay: 0.5 }}
     >
Category: {post.category}
</motion.span>

          </CardFooter>
        </GlowingCard>


        {/* Comments Section */}
        <GlowingCard>
            <CardHeader>
              <CardTitle className="text-2xl">Comments ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">{comment.name}</span>
                      <span className="text-sm text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-gray-300">{comment.comment}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
            <CardFooter>
               <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
                 <Input
                  type="text"
                   placeholder="Your name"
                  value={newComment.name}
                   onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                   className="bg-gray-800 text-white"
                   required
                />
                <Textarea
                  placeholder="Your comment"
                 value={newComment.comment}
                   onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                   className="bg-gray-800 text-white min-h-[100px]"
                   required
                 />
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                     Post Comment
                  </Button>
                </motion.div>
               </form>
             </CardFooter>
        </GlowingCard>
        </article>
      </div>
    </motion.div>
  )
}
