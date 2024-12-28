"use client"

import { motion } from 'framer-motion'
import { GlowingCard, CardContent, CardHeader, CardTitle } from "./GlowingCard"

const testimonials = [
  {
    name: 'John Doe',
    role: 'Tech Enthusiast',
    content: 'TechVista has become my go-to source for staying updated on the latest tech trends. The articles are insightful and well-researched.',
  },
  {
    name: 'Jane Smith',
    role: 'AI Researcher',
    content: 'I appreciate the depth of analysis in TechVista\'s articles. They provide a perfect balance of technical detail and accessibility.',
  },
  {
    name: 'Mike Johnson',
    role: 'Software Developer',
    content: 'The diverse range of topics covered by TechVista keeps me coming back. It\'s a valuable resource for any tech professional.',
  },
]

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowingCard className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="italic">&ldquo;{testimonial.content}&rdquo;</p>
                </CardContent>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

