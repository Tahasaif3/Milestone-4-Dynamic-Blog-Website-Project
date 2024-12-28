import Link from 'next/link'

interface GlowingButtonProps {
  href: string
  children: React.ReactNode
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} className="relative inline-block px-8 py-3 font-bold text-white bg-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:scale-105 group">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></span>
      <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-0 transition-opacity duration-300 animate-pulse"></span>
    </Link>
  )
}

export default GlowingButton

