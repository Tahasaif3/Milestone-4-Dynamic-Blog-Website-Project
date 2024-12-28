import { motion } from 'framer-motion'

interface Activity {
  id: number
  action: string
  target: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
        >
          <div className="flex-grow">
            <p className="font-semibold">
              {activity.action} <span className="text-purple-400">{activity.target}</span>
            </p>
            <p className="text-sm text-gray-400">{activity.timestamp}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

