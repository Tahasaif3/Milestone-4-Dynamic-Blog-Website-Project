'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

interface Member {
  name:string;
  role:string;
  bio:string;
  image:string;
  social: {
   facebook:string
   twitter: string,
   instagram: string,
   youtube: string
  }
}

const teamMembers:Member[] = [
  { 
    name: 'John Doe', 
    role: 'User Interface Designer and Front-end Developer',
    bio: 'Passionate about creating beautiful and intuitive user interfaces. With over 5 years of experience in front-end development, John specializes in React and modern CSS techniques.',
    image: '/team1.webp?height=400&width=400',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    }
  },
  { 
    name: 'Jane Smith', 
    role: 'Senior Full Stack Developer',
    bio: 'Full stack developer with a love for clean code and scalable architecture. Jane has led multiple successful projects and mentors junior developers in her spare time.',
    image: '/team2.webp?height=400&width=400',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    }
  },
  { 
    name: 'Amelia Charlotte', 
    role: 'UX Research Lead',
    bio: 'Dedicated to understanding user needs and translating them into actionable insights. Amelia has conducted over 100 user research sessions and improved conversion rates for numerous clients.',
    image: '/team3.webp?height=400&width=400',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    }
  },
  { 
    name: 'Sarah Brown', 
    role: 'Creative Director',
    bio: 'Award-winning creative director with an eye for detail and a mind for innovation. Sarah brings over a decade of experience in digital design and brand strategy.',
    image: '/team4.jpg?height=400&width=400',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#'
    }
  },
]

interface TeamCardProps {
  member: Member;
}

const TeamCard = ({ member }:TeamCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-full h-[400px] relative cursor-pointer group perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d duration-500 transition-transform"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full bg-gray-900 rounded-2xl p-4 shadow-xl">
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-500">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
              </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-400">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-emerald-600 text-sm">{member.role}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
              {member.bio}
            </p>
            
            <div className="flex justify-center space-x-3 pt-2 border-t border-gray-100">
              <a href={member.social.facebook} className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={member.social.twitter} className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={member.social.instagram} className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={member.social.youtube} className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white hover:bg-emerald-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function OurTeam() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


