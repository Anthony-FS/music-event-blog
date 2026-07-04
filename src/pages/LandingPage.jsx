import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import ArticleSection from '../components/ArticleSection'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  )
}

export default LandingPage
