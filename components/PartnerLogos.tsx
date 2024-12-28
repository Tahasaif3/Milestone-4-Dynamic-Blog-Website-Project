'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Database, Globe, Shield, Zap } from 'lucide-react'

const partners = [
  { name: 'TechCorp', icon: Cpu },
  { name: 'InnovateTech', icon: Zap },
  { name: 'FutureSystems', icon: Globe },
  { name: 'NextGen Solutions', icon: Database },
  { name: 'AI Dynamics', icon: Shield },
]

interface Partner {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface PartnerCardProps {
  partner: Partner
  index: number
}

const PartnerLogos = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
      {partners.map((partner, index) => (
        <PartnerCard key={partner.name} partner={partner} index={index} />
      ))}
    </div>
  )
}

const PartnerCard = ({ partner, index }: PartnerCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full sm:w-auto"
    >
      <motion.div
        className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <partner.icon className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mb-2" />
        </motion.div>
        <p className="text-center font-semibold text-white text-sm sm:text-base">{partner.name}</p>
      </motion.div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-purple-600 bg-opacity-90 rounded-lg flex items-center justify-center"
        >
          <p className="text-white text-center px-2 text-xs sm:text-sm">
            Partnering in cutting-edge {partner.name} technologies
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PartnerLogos