'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, ArrowRight, Github } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const socialIcons = [
  { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100055915432701' },
  { Icon: Instagram, href: 'https://www.instagram.com/taha_saif44/?hl=en' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/taha-saif-842269261/' },
  { Icon: Github, href: 'https://github.com/Tahasaif3' },
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Multimedia', href: '/multimedia' },
  { name: 'About', href: '/about' },
  { name: 'Author', href: '/Author' },
  { name: 'Contact', href: '/contact' },
]

const categories = [
  { name: 'Artificial Intelligence', href: '/blog' },
  { name: 'Blockchain', href: '/blog' },
  { name: 'Internet of Things', href: '/blog' },
  { name: 'Cybersecurity', href: '/blog' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setMessage(null);
    setLoading(true);
  
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Subscription successful!');
      } else {
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">TechVista Blog</h3>
            <p className="mb-4">Exploring the frontiers of technology and innovation.</p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={category.href} className="hover:text-purple-400 transition-colors">
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 transition-colors duration-300"
                required
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Subscribe'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              {message && (
                <p className={`text-sm mt-2 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
            </form>

          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; 2024 TechVista Blog. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

