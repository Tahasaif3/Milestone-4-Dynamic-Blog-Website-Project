'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2, X } from 'lucide-react'

interface BlogFormProps {
  blog?: {
    id: string
    title: string
    content: string
    image?: string
  }
  onSubmit: (blog: { title: string; content: string; image?: string }) => void
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit }) => {
  const [title, setTitle] = useState(blog?.title || '')
  const [content, setContent] = useState(blog?.content || '')
  const [image, setImage] = useState(blog?.image || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit({ title, content, image })
      setTitle('')
      setContent('')
      setImage('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <motion.div
      className="p-8 rounded-2xl shadow-2xl bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            type="text"
            placeholder="Enter an inspiring title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 text-lg py-3 px-4 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px] bg-gray-800 border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 text-lg py-3 px-4 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </motion.div>

        <motion.div
          className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
            dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <ImagePlus className="w-16 h-16 text-gray-400" />
            </motion.div>
            <div className="text-center">
              <p className="text-lg text-gray-400">
                Drag and drop an image, or click to select
              </p>
            </div>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file)
              }}
              id="image-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Select Image
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                onClick={() => setImage('')}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 text-lg py-3 rounded-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                {blog ? 'Updating...' : 'Creating...'}
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {blog ? 'Update Blog' : 'Create Blog'}
              </motion.span>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

export default BlogForm
