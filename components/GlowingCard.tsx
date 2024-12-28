/* eslint-disable react/display-name */
import React, { ReactNode, forwardRef } from 'react'
import { motion, HTMLMotionProps, MotionValue } from 'framer-motion'

type GlowingCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode | MotionValue<number> | MotionValue<string> | (() => ReactNode)
}

export const GlowingCard = forwardRef<HTMLDivElement, GlowingCardProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-px shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-pink-500 to-purple-600 opacity-[0.15]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-gray-900 to-gray-950 p-4" />
      <div className="relative">
        {typeof children === 'function' ? 
          (children as () => ReactNode)() : 
          children instanceof MotionValue ? (
            <motion.div>{children}</motion.div>
          ) : (
            children
          )
        }
      </div>
    </motion.div>
  )
)

GlowingCard.displayName = 'GlowingCard'

export const CardHeader = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref}
      className={`relative p-6 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

export const CardContent = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref}
      className={`relative p-6 pt-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      {...props}
    />
  )
)

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div 
      ref={ref}
      className={`relative flex items-center p-6 pt-0 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLMotionProps<"h3">>(
  ({ className, ...props }, ref) => (
    <motion.h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLMotionProps<"p">>(
  ({ className, ...props }, ref) => (
    <motion.p
      ref={ref}
      className={`text-sm text-gray-400 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      {...props}
    />
  )
)

CardDescription.displayName = 'CardDescription'

