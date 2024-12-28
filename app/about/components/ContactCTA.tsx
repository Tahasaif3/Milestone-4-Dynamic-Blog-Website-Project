'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Join Our Journey?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are always looking for passionate individuals to join our team.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition duration-300 ease-in-out hover:bg-blue-700 transform hover:-translate-y-1"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

