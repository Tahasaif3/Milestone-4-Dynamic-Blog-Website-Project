import TechNewsSlider from '../components/TechNewsSlider'
import PartnerLogos from '../components/PartnerLogos'
import LatestTechBlogs from '../components/LatestTechBlogs'
import HeroSection from '@/components/hero-section'
import FeaturedSection from '@/components/featured-section'
import FeaturedArticles from '@/components/featured-articles'
import WordScrambleGame from '@/components/scrammbleGame'
import CategoriesSection from '@/components/CategoriesSection'
import RecentPosts from '@/components/RecentPosts'
import RelatedPosts from '@/components/RelatedPosts'
import PopularPosts from '@/components/PopularPosts'
import TestimonialSection from '@/components/TestimonialSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <HeroSection />

      <FeaturedSection/>

      <LatestTechBlogs />

      <RecentPosts />

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Latest Tech News
          </h2>
          <TechNewsSlider />
        </div>
      </section>

      <CategoriesSection />

      <FeaturedArticles />

      <RelatedPosts />

      <PopularPosts />

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600">
            Our Trusted Partners
          </h2>
          <PartnerLogos />
        </div>
      </section>
      <TestimonialSection />

      <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-900">Blog Word Challenge</h1>
          <p className="text-gray-600">
            Unscramble the words related to blogging and writing. Race against time to get the highest score!
          </p>
        </div>
        
        <WordScrambleGame />
        
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">How to Play</h2>
          <ul className="space-y-2 text-gray-400">
            <li>• Unscramble the word shown on the screen</li>
            <li>• Type your answer in the input field</li>
            <li>• Each correct answer gives you 10 points</li>
            <li>• You have 60 seconds to score as high as possible</li>
            <li>• Use the pause button if you need a break</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

