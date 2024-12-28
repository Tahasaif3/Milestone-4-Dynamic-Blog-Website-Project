import AboutHero from './components/AboutHero'
import AboutusPage from './components/AboutusSection'
import OurMission from './components/OurMission'
import OurValues from './components/OurValues'
import OurTeam from './components/OurTeam'
import OurHistory from './components/OurHistory'
import ContactCTA from './components/ContactCTA'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AboutHero />
      <AboutusPage/>
      <OurMission />
      <OurValues />
      <OurTeam />
      <OurHistory />
      <ContactCTA />
    </div>
  )
}

