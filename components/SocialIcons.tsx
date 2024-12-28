import { Facebook, Twitter, Instagram } from 'lucide-react'

const SocialIcons = () => {
  return (
    <div className="flex space-x-2 justify-center items-center sm:justify-start">
      <a
        href="#"
        className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
        aria-label="Twitter"
      >
        <Twitter className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
      <a
        href="#"
        className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
        aria-label="Facebook"
      >
        <Facebook className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
      <a
        href="#"
        className="text-gray-600 hover:text-pink-600 transition-colors duration-300"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 sm:w-5 sm:h-5" />
      </a>
    </div>
  )
}

export default SocialIcons
