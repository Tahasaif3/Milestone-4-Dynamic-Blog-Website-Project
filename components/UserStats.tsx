import { motion } from 'framer-motion'
import { GlowingCard, CardContent } from "./GlowingCard"

interface UserStatsProps {
  postsCount: number
  likesCount: number
  followersCount: number
}

export const UserStats: React.FC<UserStatsProps> = ({ postsCount, likesCount, followersCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Posts', value: postsCount },
        { label: 'Likes', value: likesCount },
        { label: 'Followers', value: followersCount },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <GlowingCard>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </CardContent>
          </GlowingCard>
        </motion.div>
      ))}
    </div>
  )
}

