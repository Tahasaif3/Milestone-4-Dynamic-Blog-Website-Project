'use client'

import { useState, useEffect , useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingCard, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/GlowingCard"
import { useUser } from '../contexts/UserContexts'
import BlogForm from '@/components/BlogForm'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, PlusCircle, Settings, Edit, Trash2, BookOpen, ThumbsUp, Users, Activity } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Blog {
  id: string
  title: string
  content: string
  userId: string
  image?: string
  createdAt: string
}

const ProfilePage = () => {
  const { user } = useUser()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showNewBlogForm, setShowNewBlogForm] = useState(false)
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  // const fetchUserBlogs = async () => {
  //   if (!user) return
  //   setIsLoading(true)
  //   try {
  //     const response = await fetch(`/api/blogs?userId=${user.id}`)
  //     if (response.ok) {
  //       const data = await response.json()
  //       setBlogs(data)
  //     } else {
  //       const errorData = await response.json()
  //       toast.error(`Failed to fetch blogs: ${errorData.error || 'Unknown error'}`)
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     toast.error('An error occurred while fetching blogs');
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  const fetchUserBlogs = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        const errorData = await response.json();
        toast.error(`Failed to fetch blogs: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while fetching blogs');
    } finally {
      setIsLoading(false);
    }
  }, [user]); // `user` as a dependency

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchUserBlogs()
    }
  }, [user, router , fetchUserBlogs])

  const handleCreateBlog = async (blogData: { title: string; content: string; image?: string }) => {
    if (!user) return
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blogData, userId: user.id }),
      })
      if (response.ok) {
        const newBlog = await response.json()
        setBlogs(prevBlogs => [newBlog, ...prevBlogs])
        toast.success('Blog created successfully')
        setShowNewBlogForm(false)
      } else {
        const errorData = await response.json()
        toast.error(`Failed to create blog: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while creating the blog');
    }
  }

  const handleUpdateBlog = async (blogData: { title: string; content: string; image?: string }) => {
    if (!editingBlog) return
    try {
      const response = await fetch(`/api/blogs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingBlog.id, ...blogData }),
      })
      if (response.ok) {
        const updatedBlog = await response.json()
        setBlogs(prevBlogs => prevBlogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
        setEditingBlog(null)
        toast.success('Blog updated successfully')
      } else {
        const errorData = await response.json()
        toast.error(`Failed to update blog: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while updating the blog');
    }
  }

  const handleDeleteBlog = async (blogId: string) => {
    setDeletingBlogId(blogId);
  };

  const confirmDeleteBlog = async () => {
    if (!deletingBlogId) return;
    try {
      const response = await fetch(`/api/blogs?id=${deletingBlogId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== deletingBlogId));
        toast.success('Blog deleted successfully');
      } else {
        const errorData = await response.json()
        toast.error(`Failed to delete blog: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while deleting the blog');
    } finally {
      setDeletingBlogId(null);
    }
  };

  if (!user) return null

  const stats = [
    { icon: BookOpen, label: 'Posts', value: blogs.length },
    { icon: ThumbsUp, label: 'Likes', value: '1.2K' },
    { icon: Users, label: 'Followers', value: '850' },
  ]

  const recentActivity = [
    { id: 1, type: 'post', message: 'Created a new blog post', time: '2 hours ago' },
    { id: 2, type: 'like', message: 'Received 50 likes on your post', time: '5 hours ago' },
    { id: 3, type: 'comment', message: 'New comment on your blog', time: '1 day ago' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-400 text-lg">Manage your profile and content</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowingCard className="transform transition-all duration-300 hover:scale-105">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                      <stat.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="blogs" className="space-y-8">
          <TabsList className="w-full grid grid-cols-3 gap-4 bg-gray-800/50 p-1 rounded-lg">
            <TabsTrigger value="blogs" className="data-[state=active]:bg-purple-600">
              My Blogs
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Blogs</h2>
                <Button
                  onClick={() => setShowNewBlogForm(!showNewBlogForm)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  New Blog
                </Button>
              </div>

              <AnimatePresence>
                {showNewBlogForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8"
                  >
                    <GlowingCard>
                      <CardContent className="p-6">
                        <BlogForm onSubmit={handleCreateBlog} />
                      </CardContent>
                    </GlowingCard>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                </div>
              ) : blogs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  layout
                >
                  {blogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlowingCard className="h-full flex flex-col transform transition-all duration-300 hover:scale-105">
                        <CardHeader>
                          <CardTitle className="text-xl font-bold">{blog.title}</CardTitle>
                          <p className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-gray-300 mb-4 line-clamp-3">{blog.content}</p>
                          {blog.image && (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                          )}
                          <div className="flex justify-between mt-4">
                            <Button
                              onClick={() => setEditingBlog(blog)}
                              variant="outline"
                              size="sm"
                              className="text-purple-400 border-purple-400 hover:bg-purple-400/20"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteBlog(blog.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </GlowingCard>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <PlusCircle className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-gray-400 mb-4">Start creating your first blog post!</p>
                  <Button
                    onClick={() => setShowNewBlogForm(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create Your First Blog
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlowingCard>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-white">{activity.message}</p>
                          <p className="text-sm text-gray-400">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </GlowingCard>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 sm:px-6 lg:px-8 py-4"
            >
              <GlowingCard>
                <CardHeader>
                  <CardTitle className="flex items-center text-center sm:text-left">
                    <Settings className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="text-lg sm:text-xl">Profile Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Info Section */}
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                      {/* {user.username[0].toUpperCase()} */}
                      {user.username ? user.username[0].toUpperCase() : ''}

                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-bold">{user.username}</h3>
                      <p className="text-gray-400 text-sm sm:text-base">{user.email}</p>
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-500/50 transition-all duration-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </GlowingCard>
            </motion.div>
          </TabsContent>
        </Tabs>

        <AnimatePresence>
          {editingBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-md"
              >
                <GlowingCard>
                  <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[80vh] overflow-y-auto">
                    <BlogForm blog={editingBlog} onSubmit={handleUpdateBlog} />
                    <Button
                      onClick={() => setEditingBlog(null)}
                      variant="outline"
                      className="mt-4"
                    >
                      Cancel
                    </Button>
                  </CardContent>
                </GlowingCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deletingBlogId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-sm"
              >
                <GlowingCard>
                  <CardHeader>
                    <CardTitle>Confirm Deletion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Are you sure you want to delete this blog post?</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setDeletingBlogId(null)}>Cancel</Button>
                    <Button variant="destructive" onClick={confirmDeleteBlog}>Delete</Button>
                  </CardFooter>
                </GlowingCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProfilePage


