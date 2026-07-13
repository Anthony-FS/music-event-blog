import NavBar from '../components/layout/NavBar'
import HeroSection from '../components/blog/HeroSection'
import ArticleSection from '../components/blog/ArticleSection'
import Footer from '../components/layout/Footer'

function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  )
}

export default LandingPage
