'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Facebook, Mail, GitlabIcon as GitHub, Award, BookOpen, Users, Calendar, Instagram } from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/taha_saif44/?hl=en', color: 'text-orange-300 hover:text-orange-300' },
  { icon: Linkedin, href: 'https://linkedin.com/in/taha-saif-842269261', color: 'text-blue-600 hover:text-blue-700' },
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100055915432701', color: 'text-blue-800 hover:text-blue-900' },
  { icon: GitHub, href: 'https://github.com/Tahasaif3', color: 'text-gray-800 hover:text-gray-900' },
  { icon: Mail, href: 'mailto:tahasaif454@gmail.com', color: 'text-red-500 hover:text-red-600' },
]

const stats = [
  { icon: BookOpen, label: 'Articles', value: '156' },
  { icon: Users, label: 'Followers', value: '2.3K' },
  { icon: Award, label: 'Awards', value: '12' },
  { icon: Calendar, label: 'Years Active', value: '1+' },
]

const skills = [
  'UI/UX Design',
  'Web Development',
  'Product Strategy',
  'User Research',
  'Design Systems',
  'Prototyping',
  'Interaction Design',
  'Visual Design',
]

export default function AuthorPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Author Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="relative"
          >
            {/* <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500 shadow-xl">
              <img
                src="/author.jpg?height=192&width=192"
                alt="Author profile"
                className="w-full h-full object-cover"
              />
            </div> */}

            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-teal-500 shadow-xl">
              <Image
                src="/author.jpg"
                alt="Author profile"
                width={192}  
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-teal-500 rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-800 mb-2">
                Taha Saif
              </h1>
              <p className="text-xl text-teal-600 mb-4">Front-end Developer & UI/UX</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${social.color} transition-colors duration-200`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-transparent hover:bg-gray-900 transition-colors p-4 rounded-lg shadow-md"
                >
                  <stat.icon className="w-6 h-6 text-teal-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-200">{stat.value}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Author Content Tabs */}
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="w-full justify-start bg-transparent text-white p-1 rounded-lg">
            <TabsTrigger value="about" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              About
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              Skills & Expertise
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              Recent Articles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">About Me</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  With over 1 years of experience in UI/UX Design and Front-end Development, I've helped numerous companies transform their digital products. My approach combines user-centered design principles with business strategy to create meaningful and impactful solutions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-3">Experience</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-teal-500" />
                        <div>
                          <p className="font-medium text-gray-400">Juinor UX Designer at TechCorp</p>
                          <p className="text-sm text-gray-400">2023 - Present</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-teal-500" />
                        <div>
                          <p className="font-medium text-gray-400">Product Designer at DesignLab</p>
                          <p className="text-sm text-gray-400">2018 - 2020</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-3">Education</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-teal-500" />
                        <div>
                          <p className="font-medium text-gray-400">FSC in Computer Science</p>
                          <p className="text-sm text-gray-400">Superior College of Sciences, 2022</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-teal-500" />
                        <div>
                          <p className="font-medium text-gray-400">Diploma in Software Engineering</p>
                          <p className="text-sm text-gray-400">Government College of Technology, 2023</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-500 mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-400 mb-4">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge variant="secondary" className="bg-black text-indigo-100 hover:bg-teal-700">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-4">Tools & Technologies</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-400">Figma</span>
                          <span className="text-sm text-gray-600">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-teal-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '95%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-400">Front-end Development</span>
                          <span className="text-sm text-gray-600">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-teal-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '90%' }}
                            transition={{ duration: 1, delay: 0.4 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-400">Content-Writing</span>
                          <span className="text-sm text-gray-600">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-teal-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

                  <TabsContent value="articles" className="space-y-6">
                      <Card>
                          <CardContent className="p-6">
                              <h2 className="text-2xl font-bold text-gray-500 mb-6">Recent Articles</h2>
                              <div className="grid gap-6">
                                  {[
                                      {
                                          id:37,
                                          title: "Mastering Figma: Tips for Streamlined Design",
                                          description:
                                              "A comprehensive guide to using Figma effectively for your design projects.",
                                          category: "Design",
                                          readTime: "5 min read",
                                          image: "/figma-design.jpeg",
                                          date: new Date().toLocaleDateString(),
                                      },
                                      {
                                         id:38,
                                          title: "10 Best Practices for Web Development in 2024",
                                          description:
                                              "Enhance your web development skills with these proven strategies and tools.",
                                          category: "Web Development",
                                          readTime: "7 min read",
                                          image: "/web-dev.jpeg",
                                          date: new Date().toLocaleDateString(),
                                      },
                                      {
                                          id:39,
                                          title: "Content Writing Strategies for Engagement",
                                          description:
                                              "Learn how to create compelling content that captures your audience's attention.",
                                          category: "Content Writing",
                                          readTime: "6 min read",
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                          image: "/content-writing.png",
                                          date: new Date().toLocaleDateString(),
                                      }
                                  ].map((article, index) => (
                                      <motion.div
                                          key={index}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="flex flex-col md:flex-row gap-6 p-4 bg-transparent rounded-lg hover:bg-slate-900 transition-colors duration-200"
                                      >
                                      <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden">
                                        <Image
                                          src={`${article.image}`}
                                          alt={article.title}
                                          width={192}  
                                          height={192} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>

                                          <div className="flex-1">
                                              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                                  {article.title}
                                              </h3>
                                              <p className="text-gray-400 mb-4 line-clamp-2">
                                                  {article.description}
                                              </p>
                                              <div className="flex items-center gap-4">
                                                  <Badge variant="secondary">{article.category}</Badge>
                                                  <span className="text-sm text-gray-400">{article.readTime}</span>
                                                  <span className="text-sm text-gray-400">{article.date}</span>
                                              </div>
                                        <div>
                                          <Link
                                            href={`blog/${article.id}`}
                                            className="inline-block px-6 py-2 mt-10 text-white font-medium text-sm leading-tight uppercase rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300"
                                          >
                                            Read More
                                          </Link>
                                        </div>

                                          </div>
                                      </motion.div>
                                  ))}
                              </div>
                          </CardContent>
                      </Card>
                  </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

